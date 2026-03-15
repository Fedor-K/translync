import { createClient, LiveTranscriptionEvents } from "@deepgram/sdk";
import type { LiveClient } from "@deepgram/sdk";
import { EventEmitter } from "node:events";

const DEEPGRAM_API_KEY = process.env.DEEPGRAM_API_KEY;
if (!DEEPGRAM_API_KEY) {
  console.error("DEEPGRAM_API_KEY is required");
  process.exit(1);
}

const deepgram = createClient(DEEPGRAM_API_KEY);

export interface TranscriptEvent {
  text: string;
  isFinal: boolean;
  speechFinal: boolean;
}

export class DeepgramStream extends EventEmitter {
  private connection: LiveClient | null = null;
  private language: string;
  private keepAliveTimer: ReturnType<typeof setInterval> | null = null;

  constructor(language: string) {
    super();
    this.language = language;
  }

  async start(): Promise<void> {
    this.connection = deepgram.listen.live({
      model: "nova-2",
      language: this.language,
      punctuate: true,
      interim_results: true,
      utterance_end_ms: 1000,
      vad_events: true,
      encoding: "linear16",
      sample_rate: 16000,
      channels: 1,
    });

    this.connection.on(LiveTranscriptionEvents.Open, () => {
      console.log(`[deepgram] Connected (lang=${this.language})`);
      // Keep alive every 8 seconds
      this.keepAliveTimer = setInterval(() => {
        this.connection?.keepAlive();
      }, 8000);
    });

    this.connection.on(LiveTranscriptionEvents.Transcript, (data) => {
      const alt = data.channel?.alternatives?.[0];
      if (!alt?.transcript) return;

      const event: TranscriptEvent = {
        text: alt.transcript,
        isFinal: data.is_final ?? false,
        speechFinal: data.speech_final ?? false,
      };
      this.emit("transcript", event);
    });

    this.connection.on(LiveTranscriptionEvents.UtteranceEnd, () => {
      this.emit("utterance_end");
    });

    this.connection.on(LiveTranscriptionEvents.Error, (err) => {
      console.error("[deepgram] Error:", err);
      this.emit("error", err);
    });

    this.connection.on(LiveTranscriptionEvents.Close, () => {
      console.log("[deepgram] Connection closed");
      this.cleanup();
      this.emit("close");
    });
  }

  send(audioData: Buffer | ArrayBuffer | Uint8Array): void {
    if (!this.connection) return;
    // Ensure we pass an ArrayBuffer which Deepgram SDK accepts
    const buf = audioData instanceof ArrayBuffer
      ? audioData
      : audioData.buffer.slice(audioData.byteOffset, audioData.byteOffset + audioData.byteLength);
    this.connection.send(buf as ArrayBuffer);
  }

  close(): void {
    this.connection?.requestClose();
    this.cleanup();
  }

  private cleanup(): void {
    if (this.keepAliveTimer) {
      clearInterval(this.keepAliveTimer);
      this.keepAliveTimer = null;
    }
  }
}
