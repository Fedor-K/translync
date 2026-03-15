import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
import { WebSocketServer, type WebSocket } from "ws";
import { handleAudioWebSocket } from "./ws-handler.js";
import { handleListenerWebSocket } from "./listener-handler.js";
import { handleSSE } from "./sse-handler.js";

const PORT = parseInt(process.env.PORT || "3001", 10);

const server = createServer(async (req: IncomingMessage, res: ServerResponse) => {
  const url = new URL(req.url || "/", `http://${req.headers.host}`);

  // CORS preflight
  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    });
    res.end();
    return;
  }

  // Health check
  if (url.pathname === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: "ok", uptime: process.uptime() }));
    return;
  }

  // SSE endpoint (kept for speaker transcript): GET /session/:id/stream
  if (req.method === "GET" && url.pathname.match(/^\/session\/[^/]+\/stream$/)) {
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

  // 404
  res.writeHead(404, {
    "Content-Type": "text/plain",
    "Access-Control-Allow-Origin": "*",
  });
  res.end("Not found");
});

// WebSocket server — handles both speaker audio and listener connections
const wss = new WebSocketServer({ noServer: true });

server.on("upgrade", (req: IncomingMessage, socket, head) => {
  const url = new URL(req.url || "/", `http://${req.headers.host}`);

  // Speaker: /session/:id/audio
  if (url.pathname.match(/^\/session\/[^/]+\/audio$/)) {
    wss.handleUpgrade(req, socket, head, (ws: WebSocket) => {
      handleAudioWebSocket(ws, req);
    });
    return;
  }

  // Listener: /session/:id/listen
  if (url.pathname.match(/^\/session\/[^/]+\/listen$/)) {
    wss.handleUpgrade(req, socket, head, (ws: WebSocket) => {
      handleListenerWebSocket(ws, req);
    });
    return;
  }

  socket.destroy();
});

server.listen(PORT, () => {
  console.log(`[translync-rt] Listening on port ${PORT}`);
  console.log(`[translync-rt] Speaker WS:  ws://localhost:${PORT}/session/:id/audio`);
  console.log(`[translync-rt] Listener WS: ws://localhost:${PORT}/session/:id/listen`);
  console.log(`[translync-rt] Speaker SSE: http://localhost:${PORT}/session/:id/stream`);
});
