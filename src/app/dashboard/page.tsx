"use client";
import { useState } from "react";
import { LANGUAGE_NAMES } from "@/lib/translate";
import { useRouter } from "next/navigation";

const POPULAR_LANGS = ["es", "fr", "de", "ru", "zh", "ar", "pt", "it", "uk", "pl"];

export default function Dashboard() {
  const router = useRouter();
  const [selectedLangs, setSelectedLangs] = useState<string[]>(["es"]);
  const [sourceLang, setSourceLang] = useState("en");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const toggle = (lang: string) => {
    setSelectedLangs((prev) =>
      prev.includes(lang) ? prev.filter((l) => l !== lang) : [...prev, lang]
    );
  };

  const startSession = async () => {
    if (selectedLangs.length === 0) {
      setError("Select at least one target language");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetLanguages: selectedLangs, sourceLanguage: sourceLang }),
      });
      const data = await res.json();
      if (data.sessionId) {
        router.push(`/session/${data.sessionId}`);
      } else {
        setError(data.error || "Failed to create session");
      }
    } catch (e) {
      setError(String(e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg">
        <div className="mb-6">
          <a href="/" className="text-blue-600 text-sm hover:underline">← Back</a>
          <h1 className="text-2xl font-bold text-gray-900 mt-2">Create a Translation Session</h1>
          <p className="text-gray-500 text-sm mt-1">Select languages and start translating</p>
        </div>

        {/* Source language */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Speaker language</label>
          <select
            value={sourceLang}
            onChange={(e) => setSourceLang(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {Object.entries(LANGUAGE_NAMES).map(([code, name]) => (
              <option key={code} value={code}>{name}</option>
            ))}
          </select>
        </div>

        {/* Target languages */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-3">Translate to</label>
          <div className="grid grid-cols-2 gap-2">
            {POPULAR_LANGS.map((lang) => (
              <button
                key={lang}
                onClick={() => toggle(lang)}
                disabled={lang === sourceLang}
                className={`px-3 py-2 rounded-xl text-sm font-medium border-2 transition ${
                  selectedLangs.includes(lang)
                    ? "border-blue-600 bg-blue-50 text-blue-700"
                    : lang === sourceLang
                    ? "border-gray-100 bg-gray-50 text-gray-300 cursor-not-allowed"
                    : "border-gray-200 text-gray-600 hover:border-blue-300"
                }`}
              >
                {LANGUAGE_NAMES[lang]}
              </button>
            ))}
          </div>
        </div>

        {/* Cost estimate */}
        {selectedLangs.length > 0 && (
          <div className="bg-blue-50 rounded-xl px-4 py-3 mb-6 text-sm text-blue-700">
            💰 Est. cost: <strong>${(selectedLangs.length * 3).toFixed(0)}/hour</strong>
            {" "}· {selectedLangs.length} language{selectedLangs.length > 1 ? "s" : ""}
          </div>
        )}

        {error && (
          <div className="bg-red-50 text-red-600 rounded-xl px-4 py-3 mb-4 text-sm">{error}</div>
        )}

        <button
          onClick={startSession}
          disabled={loading || selectedLangs.length === 0}
          className="w-full bg-blue-700 text-white font-semibold py-3 rounded-xl hover:bg-blue-800 transition disabled:opacity-50"
        >
          {loading ? "Starting..." : "▶ Start Translation Session"}
        </button>

        <p className="text-center text-gray-400 text-xs mt-4">
          30 minutes free · No credit card required
        </p>
      </div>
    </div>
  );
}
