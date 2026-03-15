import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
import { WebSocketServer, type WebSocket } from "ws";
import { handleAudioWebSocket } from "./ws-handler.js";
import { handleSSE } from "./sse-handler.js";

const PORT = parseInt(process.env.PORT || "3001", 10);
const ALLOWED_ORIGINS = (
  process.env.ALLOWED_ORIGINS || "http://localhost:3000"
).split(",");

function corsHeaders(req: IncomingMessage): Record<string, string> {
  const origin = req.headers.origin || "";
  const allowed = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allowed,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Credentials": "true",
  };
}

const server = createServer(async (req: IncomingMessage, res: ServerResponse) => {
  const url = new URL(req.url || "/", `http://${req.headers.host}`);

  // CORS preflight
  if (req.method === "OPTIONS") {
    res.writeHead(204, corsHeaders(req));
    res.end();
    return;
  }

  // Health check
  if (url.pathname === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: "ok", uptime: process.uptime() }));
    return;
  }

  // SSE endpoint: GET /session/:id/stream?lang=es&since=0
  if (req.method === "GET" && url.pathname.match(/^\/session\/[^/]+\/stream$/)) {
    // Add CORS headers
    for (const [k, v] of Object.entries(corsHeaders(req))) {
      res.setHeader(k, v);
    }
    try {
      await handleSSE(req, res);
    } catch (err) {
      console.error("[http] SSE error:", err);
      if (!res.headersSent) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Internal server error");
      }
    }
    return;
  }

  // 404 for everything else
  res.writeHead(404, {
    "Content-Type": "text/plain",
    ...corsHeaders(req),
  });
  res.end("Not found");
});

// WebSocket server — handles audio from speakers
const wss = new WebSocketServer({ noServer: true });

server.on("upgrade", (req: IncomingMessage, socket, head) => {
  const url = new URL(req.url || "/", `http://${req.headers.host}`);

  // Only upgrade for audio endpoint: /session/:id/audio
  if (!url.pathname.match(/^\/session\/[^/]+\/audio$/)) {
    socket.destroy();
    return;
  }

  wss.handleUpgrade(req, socket, head, (ws: WebSocket) => {
    handleAudioWebSocket(ws, req);
  });
});

server.listen(PORT, () => {
  console.log(`[translync-rt] Listening on port ${PORT}`);
  console.log(`[translync-rt] WebSocket: ws://localhost:${PORT}/session/:id/audio`);
  console.log(`[translync-rt] SSE:       http://localhost:${PORT}/session/:id/stream`);
});
