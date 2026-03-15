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

const LANG_BCP47: Record<string, string> = {
  en: "en-US", es: "es-ES", fr: "fr-FR", de: "de-DE",
  it: "it-IT", pt: "pt-PT", ru: "ru-RU", zh: "zh-CN",
  ja: "ja-JP", ko: "ko-KR", ar: "ar-SA", hi: "hi-IN",
  nl: "nl-NL", pl: "pl-PL", tr: "tr-TR", sv: "sv-SE",
  uk: "uk-UA", ro: "ro-RO", cs: "cs-CZ", hu: "hu-HU",
};

interface Chunk {
  id: string;
  timestamp: number;
  text: string;
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
  const sseRef = useRef<EventSource | null>(null);
  const lastTsRef = useRef(0);

  const speak = useCallback((text: string, langCode: string) => {
    if (!ttsEnabled || !window.speechSynthesis) return;
    const utt = new SpeechSynthesisUtterance(text);
    utt.lang = LANG_BCP47[langCode] || langCode;
    utt.rate = 1.1;
    window.speechSynthesis.speak(utt);
  }, [ttsEnabled]);

  // Read languages from URL params
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const src = p.get("src") || "en";
    const langs = p.get("langs")?.split(",").filter(Boolean) || [];
    const all = [src, ...langs.filter((l) => l !== src)];
    setTargetLangs(all);
  }, [id]);

  // Connect SSE when started — manual reconnect to update `since` param
  useEffect(() => {
    if (!started || !lang) return;
    let closed = false;
    let reconnectTimer: ReturnType<typeof setTimeout>;

    function connect() {
      if (closed) return;
      const since = lastTsRef.current;
      const url = `${RT_URL}/session/${id}/stream?lang=${lang}&since=${since}`;
      const sse = new EventSource(url);
      sseRef.current = sse;

      sse.addEventListener("connected", () => {
        setConnected(true);
      });

      sse.addEventListener("transcript", (e) => {
        const data = JSON.parse(e.data);

        if (data.type === "interim") {
          setInterimText(data.text);
        } else if (data.type === "final") {
          setInterimText("");
          const chunk: Chunk = {
            id: data.chunkId,
            timestamp: data.timestamp,
            text: data.text,
          };
          setChunks((prev) => {
            if (prev.some((c) => c.id === chunk.id)) return prev;
            return [...prev, chunk];
          });
          lastTsRef.current = data.timestamp;
          speak(data.text, lang);
        } else if (data.type === "end") {
          setActive(false);
        }
      });

      sse.onerror = () => {
        setConnected(false);
        sse.close();
        // Reconnect after 2s with updated `since` to avoid duplicate history
        if (!closed) {
          reconnectTimer = setTimeout(connect, 2000);
        }
      };
    }

    connect();

    return () => {
      closed = true;
      clearTimeout(reconnectTimer);
      sseRef.current?.close();
      sseRef.current = null;
      setConnected(false);
    };
  }, [started, lang, id, speak]);

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chunks, interimText]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      sseRef.current?.close();
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
                if (v) window.speechSynthesis?.cancel();
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
              sseRef.current?.close();
              setStarted(false);
              setChunks([]);
              setInterimText("");
              // Don't reset lastTsRef — on new language, only get NEW chunks
              // (prevents TTS from replaying all history)
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
