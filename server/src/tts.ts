// OpenAI TTS — stream PCM in server-buffered blocks
// Buffers ~200ms of audio before sending each block (no client-side hissing)

import type { WebSocket } from "ws";

let openaiKey: string | undefined;

const MIN_BLOCK_BYTES = 9600; // ~200ms at 24kHz 16-bit mono (4800 samples * 2)

export async function streamTTS(text: string, ws: WebSocket): Promise<void> {
  openaiKey ??= process.env.OPENAI_API_KEY;
  if (!openaiKey) throw new Error("OPENAI_API_KEY not set");

  const res = await fetch("https://api.openai.com/v1/audio/speech", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${openaiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "tts-1",
      voice: "nova",
      input: text,
      response_format: "pcm",
      speed: 1.4,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`OpenAI TTS ${res.status}: ${body}`);
  }

  const reader = res.body?.getReader();
  if (!reader) throw new Error("No response body");

  // Buffer small chunks from OpenAI, send in ~200ms blocks
  let pending: Uint8Array[] = [];
  let pendingLen = 0;

  function flush() {
    if (pendingLen === 0) return;
    const merged = new Uint8Array(pendingLen);
    let offset = 0;
    for (const chunk of pending) {
      merged.set(chunk, offset);
      offset += chunk.length;
    }
    pending = [];
    pendingLen = 0;
    // Ensure even byte alignment
    const len = merged.length & ~1;
    if (len > 0 && ws.readyState === 1) {
      ws.send(merged.subarray(0, len));
    }
  }

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    if (ws.readyState !== 1) { reader.cancel(); break; }

    pending.push(value);
    pendingLen += value.length;

    if (pendingLen >= MIN_BLOCK_BYTES) {
      flush();
    }
  }

  // Send remaining audio
  flush();
}
