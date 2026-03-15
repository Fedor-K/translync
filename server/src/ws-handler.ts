import type { IncomingMessage } from "node:http";
import type { WebSocket } from "ws";
import { DeepgramStream, type TranscriptEvent } from "./deepgram.js";
import { translateToMany, clearContext, setSessionDomain, clearSessionDomain } from "./translate.js";
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
  const sampleRate = parseInt(url.searchParams.get("sr") || "48000", 10);

  if (!sessionId) {
    ws.close(4000, "Missing session ID");
    return;
  }

  const session = await getSession(sessionId);
  if (!session) {
    ws.close(4001, "Session not found");
    return;
  }

  // Load domain config from session
  if (session.domain) {
    setSessionDomain(sessionId, session.domain, session.customGlossary);
    console.log(`[ws] Domain: ${session.domain}`);
  }

  console.log(
    `[ws] Speaker connected: session=${sessionId}, src=${sourceLang}, langs=${targetLangs.join(",")}, sr=${sampleRate}`
  );

  const dg = new DeepgramStream(sourceLang, sampleRate);
  let chunkCounter = 0;

  async function translateAndPublish(text: string, speaker: number | null): Promise<void> {
    if (!text.trim()) return;
    text = text.trim();

    const chunkId = `${sessionId}-${++chunkCounter}`;
    const timestamp = Date.now();

    const translations = await translateToMany(text, sourceLang, targetLangs, sessionId);

    await storeChunk(sessionId, {
      id: chunkId,
      timestamp,
      original: text,
      translations,
    });

    for (const [lang, translatedText] of Object.entries(translations)) {
      await publishTranslation(sessionId, lang, {
        type: "final",
        chunkId,
        text: translatedText,
        speaker,
        timestamp,
      });
    }
  }

  dg.on("transcript", (event: TranscriptEvent) => {
    if (event.isFinal) {
      publishTranslation(sessionId, sourceLang, {
        type: "interim",
        text: event.text,
        speaker: event.speaker,
        timestamp: Date.now(),
      });
      translateAndPublish(event.text, event.speaker);
    } else {
      publishTranslation(sessionId, sourceLang, {
        type: "interim",
        text: event.text,
        speaker: event.speaker,
        timestamp: Date.now(),
      });
    }
  });

  dg.on("error", (err) => {
    console.error(`[ws] Deepgram error for session ${sessionId}:`, err);
  });

  // Start Deepgram streaming
  await dg.start();

  // Forward audio from WebSocket to Deepgram
  let msgCount = 0;
  ws.on("message", (data: Buffer) => {
    msgCount++;
    if (msgCount === 1) {
      console.log(`[ws] First audio chunk: ${data.byteLength} bytes`);
    }
    if (msgCount % 100 === 0) {
      console.log(`[ws] Audio chunks received: ${msgCount}`);
    }
    dg.send(data);
  });

  ws.on("close", async () => {
    console.log(`[ws] Speaker disconnected: session=${sessionId}`);
    dg.close();
    clearContext(sessionId);
    clearSessionDomain(sessionId);
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
