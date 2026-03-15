import type { IncomingMessage } from "node:http";
import type { WebSocket } from "ws";
import { DeepgramStream, type TranscriptEvent } from "./deepgram.js";
import { translateToMany } from "./translate.js";
import {
  getSession,
  storeChunk,
  publishTranslation,
  setSessionInactive,
} from "./redis.js";

export async function handleAudioWebSocket(
  ws: WebSocket,
  req: IncomingMessage
): Promise<void> {
  const url = new URL(req.url || "/", `http://${req.headers.host}`);
  const pathParts = url.pathname.split("/").filter(Boolean);
  // Expected: /session/:id/audio
  const sessionId = pathParts[1]?.toUpperCase();
  const sourceLang = url.searchParams.get("src") || "en";
  const targetLangs = (url.searchParams.get("langs") || "")
    .split(",")
    .filter(Boolean);

  if (!sessionId) {
    ws.close(4000, "Missing session ID");
    return;
  }

  const session = await getSession(sessionId);
  if (!session) {
    ws.close(4001, "Session not found");
    return;
  }

  console.log(
    `[ws] Speaker connected: session=${sessionId}, src=${sourceLang}, langs=${targetLangs.join(",")}`
  );

  const dg = new DeepgramStream(sourceLang);
  let chunkCounter = 0;

  // Buffer final transcripts for sentence-level translation
  let sentenceBuffer = "";
  let sentenceTimer: ReturnType<typeof setTimeout> | null = null;

  async function flushSentence(): Promise<void> {
    if (!sentenceBuffer.trim()) return;
    const text = sentenceBuffer.trim();
    sentenceBuffer = "";

    const chunkId = `${sessionId}-${++chunkCounter}`;
    const timestamp = Date.now();

    // Translate to all target languages in parallel
    const translations = await translateToMany(text, sourceLang, targetLangs);

    // Store for persistence / late joiners
    await storeChunk(sessionId, {
      id: chunkId,
      timestamp,
      original: text,
      translations,
    });

    // Publish each language to its Redis channel
    for (const [lang, translatedText] of Object.entries(translations)) {
      await publishTranslation(sessionId, lang, {
        type: "final",
        chunkId,
        text: translatedText,
        timestamp,
      });
    }

    // Also publish original to source language channel
    await publishTranslation(sessionId, sourceLang, {
      type: "final",
      chunkId,
      text,
      timestamp,
    });
  }

  dg.on("transcript", (event: TranscriptEvent) => {
    if (event.isFinal) {
      sentenceBuffer += " " + event.text;

      // Publish interim of accumulated sentence to source channel
      publishTranslation(sessionId, sourceLang, {
        type: "interim",
        text: sentenceBuffer.trim(),
        timestamp: Date.now(),
      });

      // If speech_final (pause detected), flush immediately
      if (event.speechFinal) {
        if (sentenceTimer) clearTimeout(sentenceTimer);
        sentenceTimer = null;
        flushSentence();
      } else {
        // Otherwise debounce: flush after 1.5s of no new finals
        if (sentenceTimer) clearTimeout(sentenceTimer);
        sentenceTimer = setTimeout(() => {
          sentenceTimer = null;
          flushSentence();
        }, 1500);
      }
    } else {
      // Interim result — show to speaker immediately
      const interimText = sentenceBuffer
        ? sentenceBuffer.trim() + " " + event.text
        : event.text;

      publishTranslation(sessionId, sourceLang, {
        type: "interim",
        text: interimText,
        timestamp: Date.now(),
      });
    }
  });

  dg.on("utterance_end", () => {
    if (sentenceTimer) clearTimeout(sentenceTimer);
    sentenceTimer = null;
    flushSentence();
  });

  dg.on("error", (err) => {
    console.error(`[ws] Deepgram error for session ${sessionId}:`, err);
  });

  // Start Deepgram streaming
  await dg.start();

  // Forward audio from WebSocket to Deepgram
  ws.on("message", (data: Buffer) => {
    dg.send(data);
  });

  ws.on("close", async () => {
    console.log(`[ws] Speaker disconnected: session=${sessionId}`);
    // Flush any remaining text
    if (sentenceTimer) clearTimeout(sentenceTimer);
    await flushSentence();
    dg.close();
    await setSessionInactive(sessionId);

    // Notify listeners that session ended
    for (const lang of [...targetLangs, sourceLang]) {
      await publishTranslation(sessionId, lang, {
        type: "end",
        timestamp: Date.now(),
      });
    }
  });

  ws.on("error", (err) => {
    console.error(`[ws] WebSocket error for session ${sessionId}:`, err);
    dg.close();
  });
}
