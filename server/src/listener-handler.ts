import type { IncomingMessage } from "node:http";
import type { WebSocket } from "ws";
import {
  getSession,
  getChunksSince,
  subscribeToLanguage,
} from "./redis.js";
// TTS handled client-side via browser Speech Synthesis

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

  // Subscribe to live updates
  const unsubscribe = await subscribeToLanguage(
    sessionId,
    lang,
    async (data: string) => {
      if (ws.readyState !== 1) return;

      const parsed = JSON.parse(data);

      // Forward text immediately
      ws.send(data);

      // TTS disabled server-side — client uses browser Speech Synthesis
      // (instant, no latency, decent quality on modern browsers)
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
