"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { use } from "react";

const RT_URL = process.env.NEXT_PUBLIC_RT_URL || "http://localhost:3001";

const LANGUAGE_NAMES: Record<string, string> = {
  en: "English", es: "Español", fr: "Français", de: "Deutsch",
  it: "Italiano", pt: "Português", ru: "Русский", zh: "中文",
  ja: "日本語", ko: "한국어", ar: "العربية", hi: "हिन्दी",
  nl: "Nederlands", pl: "Polski", tr: "Türkçe", sv: "Svenska",
  uk: "Українська", ro: "Română", cs: "Čeština", hu: "Magyar",
};

interface Chunk {
  id: string;
  timestamp: number;
  text: string;
  speaker: number | null;
}

// Cancel-and-replace audio player: always plays only the latest TTS
class AudioPlayer {
  private ctx: AudioContext;
  private currentSource: AudioBufferSourceNode | null = null;

  constructor() {
    this.ctx = new AudioContext({ sampleRate: 24000 });
  }

  // Cancel current playback and play new audio
  play(pcm16: ArrayBuffer) {
    if (this.ctx.state === "suspended") this.ctx.resume();

    // Cancel whatever is playing now
    if (this.currentSource) {
      try { this.currentSource.stop(); } catch {}
      this.currentSource = null;
    }

    const byteLen = pcm16.byteLength & ~1;
    if (byteLen < 2) return;

    const int16 = new Int16Array(pcm16, 0, byteLen / 2);
    const float32 = new Float32Array(int16.length);
    for (let i = 0; i < int16.length; i++) {
      float32[i] = int16[i] / 32768;
    }

    const buffer = this.ctx.createBuffer(1, float32.length, 24000);
    buffer.getChannelData(0).set(float32);

    const source = this.ctx.createBufferSource();
    source.buffer = buffer;
    source.connect(this.ctx.destination);
    source.onended = () => { this.currentSource = null; };
    source.start();
    this.currentSource = source;
  }

  stop() {
    if (this.currentSource) {
      try { this.currentSource.stop(); } catch {}
      this.currentSource = null;
    }
  }

  close() {
    this.stop();
    this.ctx.close();
  }
}

export default function ListenPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [lang, setLang] = useState("");
  const [targetLangs, setTargetLangs] = useState<string[]>([]);
  const [chunks, setChunks] = useState<Chunk[]>([]);
  const [interimText, setInterimText] = useState("");
  const [active, setActive] = useState(true);
  const [started, setStarted] = useState(false);
  const [connected, setConnected] = useState(false);
  const [ttsEnabled, setTtsEnabled] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const audioPlayerRef = useRef<AudioPlayer | null>(null);
  const lastTsRef = useRef(0);

  // Read languages from URL params
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const src = p.get("src") || "en";
    const langs = p.get("langs")?.split(",").filter(Boolean) || [];
    const all = [src, ...langs.filter((l) => l !== src)];
    setTargetLangs(all);
  }, [id]);

  // Connect WebSocket when started
  useEffect(() => {
    if (!started || !lang) return;
    let closed = false;
    let reconnectTimer: ReturnType<typeof setTimeout>;

    // Init audio player
    if (!audioPlayerRef.current) {
      audioPlayerRef.current = new AudioPlayer();
    }

    function connect() {
      if (closed) return;
      const since = lastTsRef.current;
      const tts = ttsEnabled ? "1" : "0";
      const wsUrl = `${RT_URL.replace(/^http/, "ws")}/session/${id}/listen?lang=${lang}&since=${since}&tts=${tts}`;
      const ws = new WebSocket(wsUrl);
      ws.binaryType = "arraybuffer";
      wsRef.current = ws;

      ws.onopen = () => setConnected(true);

      ws.onmessage = (e) => {
        // Binary frame = TTS audio (cancel current, play new)
        if (e.data instanceof ArrayBuffer) {
          if (ttsEnabled && audioPlayerRef.current) {
            audioPlayerRef.current.play(e.data);
          }
          return;
        }

        const data = JSON.parse(e.data);

        if (data.type === "connected") {
          setConnected(true);
        } else if (data.type === "tts") {
          // Server is about to send new audio — cancel current playback
          audioPlayerRef.current?.stop();
        } else if (data.type === "interim") {
          setInterimText(data.text);
        } else if (data.type === "final") {
          setInterimText("");
          const chunk: Chunk = {
            id: data.chunkId,
            timestamp: data.timestamp,
            text: data.text,
            speaker: data.speaker ?? null,
          };
          setChunks((prev) => {
            if (prev.some((c) => c.id === chunk.id)) return prev;
            return [...prev, chunk];
          });
          lastTsRef.current = data.timestamp;
        } else if (data.type === "end") {
          setActive(false);
        }
      };

      ws.onclose = () => {
        setConnected(false);
        if (!closed) {
          reconnectTimer = setTimeout(connect, 2000);
        }
      };

      ws.onerror = () => {
        setConnected(false);
      };
    }

    connect();

    return () => {
      closed = true;
      clearTimeout(reconnectTimer);
      wsRef.current?.close();
      wsRef.current = null;
      setConnected(false);
    };
  }, [started, lang, id, ttsEnabled]);

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chunks, interimText]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      wsRef.current?.close();
      audioPlayerRef.current?.close();
    };
  }, []);

  if (!started) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm text-center">
          <div className="text-4xl mb-4">🌍</div>
          <h1 className="text-xl font-bold text-gray-900 mb-2">Translync</h1>
          <p className="text-gray-500 text-sm mb-6">Session #{id} · Choose your language</p>

          {targetLangs.length > 0 ? (
            <div className="space-y-2 mb-6">
              {targetLangs.map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`w-full py-3 rounded-xl border-2 font-medium transition ${
                    lang === l
                      ? "border-blue-600 bg-blue-50 text-blue-700"
                      : "border-gray-200 text-gray-700 hover:border-blue-300"
                  }`}
                >
                  {LANGUAGE_NAMES[l] || l}
                </button>
              ))}
            </div>
          ) : (
            <div className="text-gray-400 text-sm mb-6">Loading session...</div>
          )}

          <button
            disabled={!lang}
            onClick={() => setStarted(true)}
            className="w-full bg-blue-700 text-white font-bold py-3 rounded-xl disabled:opacity-40 hover:bg-blue-800 transition"
          >
            Start Listening
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Header */}
      <div className="bg-gray-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-bold">Translync</span>
          {active ? (
            <span className="flex items-center gap-1 text-green-400 text-xs">
              <span className={`w-1.5 h-1.5 rounded-full ${connected ? "bg-green-400 animate-pulse" : "bg-yellow-400"}`}></span>
              {connected ? "LIVE" : "reconnecting..."}
            </span>
          ) : (
            <span className="text-gray-400 text-xs">ended</span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setTtsEnabled((v) => {
                if (v) audioPlayerRef.current?.stop();
                return !v;
              });
            }}
            className="text-gray-400 text-sm hover:text-white"
            title={ttsEnabled ? "Mute voice" : "Enable voice"}
          >
            {ttsEnabled ? "🔊" : "🔇"}
          </button>
          <button
            onClick={() => {
              wsRef.current?.close();
              audioPlayerRef.current?.stop();
              setStarted(false);
              setChunks([]);
              setInterimText("");
            }}
            className="text-gray-400 text-sm hover:text-white"
          >
            {LANGUAGE_NAMES[lang] || lang} ↕
          </button>
        </div>
      </div>

      {/* Transcript */}
      <div className="flex-1 px-4 py-6 overflow-y-auto">
        {chunks.length === 0 && !interimText ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <div className="text-4xl mb-3 animate-pulse">...</div>
            <p>Waiting for speaker...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {chunks.map((chunk) => (
              <div key={chunk.id} className="bg-gray-800 rounded-xl p-4">
                {chunk.speaker !== null && (
                  <span className={`text-xs font-medium mb-1 inline-block px-2 py-0.5 rounded-full ${
                    chunk.speaker === 0 ? "bg-blue-900 text-blue-300" :
                    chunk.speaker === 1 ? "bg-emerald-900 text-emerald-300" :
                    chunk.speaker === 2 ? "bg-purple-900 text-purple-300" :
                    "bg-orange-900 text-orange-300"
                  }`}>
                    Speaker {chunk.speaker + 1}
                  </span>
                )}
                <p className="text-white leading-relaxed">{chunk.text}</p>
              </div>
            ))}
            {interimText && (
              <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                <p className="text-gray-400 leading-relaxed italic">{interimText}</p>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-gray-800 px-4 py-2 text-center text-xs text-gray-500">
        Powered by Translync
      </div>
    </div>
  );
}
