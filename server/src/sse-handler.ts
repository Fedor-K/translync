import type { IncomingMessage, ServerResponse } from "node:http";
import { getChunksSince, getSession, subscribeToLanguage } from "./redis.js";

export async function handleSSE(
  req: IncomingMessage,
  res: ServerResponse
): Promise<void> {
  const url = new URL(req.url || "/", `http://${req.headers.host}`);
  const pathParts = url.pathname.split("/").filter(Boolean);
  // Expected: /session/:id/stream
  const sessionId = pathParts[1]?.toUpperCase();
  const lang = url.searchParams.get("lang") || "en";
  const since = parseInt(url.searchParams.get("since") || "0", 10);

  if (!sessionId) {
    res.writeHead(400, { "Content-Type": "text/plain" });
    res.end("Missing session ID");
    return;
  }

  const session = await getSession(sessionId);
  if (!session) {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Session not found");
    return;
  }

  // SSE headers — EventSource doesn't support custom headers,
  // so we allow any origin (data is not sensitive, session IDs are short-lived)
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache, no-transform",
    Connection: "keep-alive",
    "Access-Control-Allow-Origin": "*",
  });

  // Send initial connected event
  res.write(`event: connected\ndata: ${JSON.stringify({ sessionId, lang })}\n\n`);

  // Send historical chunks (for reconnection / late joiners)
  const history = await getChunksSince(sessionId, since);
  for (const chunk of history) {
    const text = chunk.translations[lang] || chunk.original;
    res.write(
      `event: transcript\ndata: ${JSON.stringify({
        type: "final",
        chunkId: chunk.id,
        text,
        timestamp: chunk.timestamp,
      })}\n\n`
    );
  }

  // Subscribe to live updates
  const unsubscribe = await subscribeToLanguage(sessionId, lang, (data) => {
    res.write(`event: transcript\ndata: ${data}\n\n`);
  });

  // Keep-alive every 15 seconds
  const keepAlive = setInterval(() => {
    res.write(": keepalive\n\n");
  }, 15000);

  // Cleanup on client disconnect
  req.on("close", () => {
    clearInterval(keepAlive);
    unsubscribe();
    console.log(`[sse] Listener disconnected: session=${sessionId}, lang=${lang}`);
  });

  console.log(
    `[sse] Listener connected: session=${sessionId}, lang=${lang}, since=${since}`
  );
}
