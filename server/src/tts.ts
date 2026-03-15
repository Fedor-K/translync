// OpenAI TTS — streams PCM audio chunks as they arrive
// PCM 24kHz 16-bit mono, $0.015/1K chars

import type { WebSocket } from "ws";

let openaiKey: string | undefined;

// Stream TTS audio directly to a WebSocket as binary frames
export async function streamTTS(
  text: string,
  ws: WebSocket,
  chunkId: string
): Promise<void> {
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
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`OpenAI TTS ${res.status}: ${body}`);
  }

  const reader = res.body?.getReader();
  if (!reader) throw new Error("No response body");

  // Send audio_start marker
  if (ws.readyState === 1) {
    ws.send(
      JSON.stringify({
        type: "audio_start",
        chunkId,
        sampleRate: 24000,
        channels: 1,
        encoding: "pcm16",
      })
    );
  }

  // Stream binary audio chunks as they arrive from OpenAI
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    if (ws.readyState === 1) {
      ws.send(value);
    } else {
      reader.cancel();
      break;
    }
  }

  // Send audio_end marker
  if (ws.readyState === 1) {
    ws.send(JSON.stringify({ type: "audio_end", chunkId }));
  }
}
