import type { IncomingMessage } from "node:http";
import type { WebSocket } from "ws";
import {
  getSession,
  getChunksSince,
  subscribeToLanguage,
} from "./redis.js";
import { synthesize } from "./tts.js";

export async function handleListenerWebSocket(
  ws: WebSocket,
  req: IncomingMessage
): Promise<void> {
  const url = new URL(req.url || "/", `http://${req.headers.host}`);
  const pathParts = url.pathname.split("/").filter(Boolean);
  // Expected: /session/:id/listen
  const sessionId = pathParts[1]?.toUpperCase();
  const lang = url.searchParams.get("lang") || "en";
  const since = parseInt(url.searchParams.get("since") || "0", 10);
  const ttsEnabled = url.searchParams.get("tts") !== "0";

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
    `[listener] Connected: session=${sessionId}, lang=${lang}, tts=${ttsEnabled}`
  );

  // Send connected event
  ws.send(JSON.stringify({ type: "connected", sessionId, lang }));

  // Send historical chunks
  const history = await getChunksSince(sessionId, since);
  for (const chunk of history) {
    const text = chunk.translations[lang] || chunk.original;
    ws.send(
      JSON.stringify({
        type: "final",
        chunkId: chunk.id,
        text,
        timestamp: chunk.timestamp,
      })
    );
    // Don't TTS history — would be too much audio at once
  }

  // Subscribe to live updates
  const unsubscribe = await subscribeToLanguage(
    sessionId,
    lang,
    async (data: string) => {
      if (ws.readyState !== 1) return; // OPEN

      const parsed = JSON.parse(data);

      // Forward text as JSON frame
      ws.send(data);

      // Generate TTS for final translations only
      if (ttsEnabled && parsed.type === "final" && parsed.text) {
        try {
          const audio = await synthesize(parsed.text);
          // Send audio marker (so client knows audio follows)
          ws.send(
            JSON.stringify({
              type: "audio_start",
              chunkId: parsed.chunkId,
              sampleRate: 24000,
              channels: 1,
              encoding: "pcm16",
            })
          );
          // Send raw PCM audio as binary frame
          ws.send(audio);
          // Send audio end marker
          ws.send(JSON.stringify({ type: "audio_end", chunkId: parsed.chunkId }));
        } catch (err) {
          console.error(
            `[tts] Failed for chunk ${parsed.chunkId}:`,
            (err as Error).message
          );
        }
      }
    }
  );

  // Keep-alive ping every 30 seconds
  const pingTimer = setInterval(() => {
    if (ws.readyState === 1) ws.ping();
  }, 30000);

  ws.on("close", () => {
    clearInterval(pingTimer);
    unsubscribe();
    console.log(
      `[listener] Disconnected: session=${sessionId}, lang=${lang}`
    );
  });

  ws.on("error", (err) => {
    console.error(`[listener] Error: session=${sessionId}`, err);
    clearInterval(pingTimer);
    unsubscribe();
  });
}
