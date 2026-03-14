"use client";
import { useState, useEffect, useRef } from "react";
import { use } from "react";

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
}

export default function ListenPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [lang, setLang] = useState("");
  const [targetLangs, setTargetLangs] = useState<string[]>([]);
  const [chunks, setChunks] = useState<Chunk[]>([]);
  const [active, setActive] = useState(true);
  const [started, setStarted] = useState(false);
  const [lastTs, setLastTs] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Fetch session info
  useEffect(() => {
    fetch(`/api/sessions/${id}/poll?since=0`)
      .then((r) => r.json())
      .then((data) => {
        if (data.targetLanguages) {
          setTargetLangs([data.sourceLanguage, ...data.targetLanguages]);
        }
      })
      .catch(console.error);
  }, [id]);

  // Poll for new chunks
  useEffect(() => {
    if (!started || !lang) return;
    const poll = async () => {
      try {
        const res = await fetch(`/api/sessions/${id}/poll?since=${lastTs}&lang=${lang}`);
        const data = await res.json();
        if (data.chunks?.length > 0) {
          setChunks((prev) => [...prev, ...data.chunks]);
          setLastTs(data.chunks[data.chunks.length - 1].timestamp);
        }
        setActive(data.active !== false);
      } catch {}
    };
    const timer = setInterval(poll, 1500);
    return () => clearInterval(timer);
  }, [started, lang, id, lastTs]);

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chunks]);

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
            Start Listening →
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
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
              LIVE
            </span>
          ) : (
            <span className="text-gray-400 text-xs">ended</span>
          )}
        </div>
        <button
          onClick={() => { setStarted(false); setChunks([]); setLastTs(0); }}
          className="text-gray-400 text-sm hover:text-white"
        >
          {LANGUAGE_NAMES[lang] || lang} ↕
        </button>
      </div>

      {/* Transcript */}
      <div className="flex-1 px-4 py-6 overflow-y-auto">
        {chunks.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <div className="text-4xl mb-3 animate-pulse">⏳</div>
            <p>Waiting for speaker...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {chunks.map((chunk) => (
              <div key={chunk.id} className="bg-gray-800 rounded-xl p-4">
                <p className="text-white leading-relaxed">{chunk.text}</p>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-gray-800 px-4 py-2 text-center text-xs text-gray-500">
        Powered by Translync · translync.com
      </div>
    </div>
  );
}
