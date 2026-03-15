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

  ws.send(JSON.stringify({ type: "connected", sessionId, lang }));

  // Send historical chunks (text only, no TTS)
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
  }

  // TTS queue — generates in parallel, sends in order
  // Each entry is a Promise<Buffer>. We process them sequentially
  // but START generation immediately (don't wait for previous to finish).
  let ttsChain = Promise.resolve();

  function enqueueTTS(text: string): void {
    // Start generating NOW (parallel with previous)
    const audioPromise = synthesize(text);

    // But send in order (chain)
    ttsChain = ttsChain.then(async () => {
      try {
        const audio = await audioPromise;
        if (ws.readyState === 1) ws.send(audio);
      } catch (err) {
        console.error(`[tts] Failed:`, (err as Error).message);
      }
    });
  }

  // Subscribe to live updates
  const unsubscribe = await subscribeToLanguage(
    sessionId,
    lang,
    (data: string) => {
      if (ws.readyState !== 1) return;

      const parsed = JSON.parse(data);

      // Forward text immediately
      ws.send(data);

      // Start TTS generation immediately (parallel), send in order
      if (ttsEnabled && parsed.type === "final" && parsed.text) {
        enqueueTTS(parsed.text);
      }
    }
  );

  const pingTimer = setInterval(() => {
    if (ws.readyState === 1) ws.ping();
  }, 30000);

  ws.on("close", () => {
    clearInterval(pingTimer);
    unsubscribe();
    console.log(`[listener] Disconnected: session=${sessionId}, lang=${lang}`);
  });

  ws.on("error", (err) => {
    console.error(`[listener] Error: session=${sessionId}`, err);
    clearInterval(pingTimer);
    unsubscribe();
  });
}
