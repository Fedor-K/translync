"use client";
import { useState, useEffect, useCallback } from "react";
import { LANGUAGE_NAMES } from "@/lib/translate";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

/* ── Constants ────────────────────────────────────────────────── */

const POPULAR_LANGS = ["en", "es", "fr", "de", "ru", "zh", "ar", "pt", "it", "uk"];

const DOMAINS = [
  { id: "general", name: "General", icon: "G" },
  { id: "ngo", name: "NGO / Humanitarian", icon: "H" },
  { id: "churches", name: "Churches", icon: "C" },
  { id: "universities", name: "Universities", icon: "U" },
  { id: "communities", name: "Communities", icon: "I" },
];

/* ── Types ────────────────────────────────────────────────────── */

interface SessionInfo {
  id: string;
  name?: string;
  sourceLanguage: string;
  targetLanguages: string[];
  domain: string;
  createdAt: number;
  active: boolean;
  exists: boolean;
}

interface DashboardData {
  sessions: SessionInfo[];
  stats: {
    totalMinutes: number;
    totalSessions: number;
    languagesUsed: string[];
  };
}

/* ── QR Code Modal ───────────────────────────────────────────── */

function QRModal({
  session,
  onClose,
}: {
  session: SessionInfo;
  onClose: () => void;
}) {
  const langsParam = session.targetLanguages.join(",");
  const listenUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/listen/${session.id}?src=${session.sourceLanguage}&langs=${langsParam}`
      : "";
  const qrUrl = `/api/qr/${session.id}?src=${session.sourceLanguage}&langs=${langsParam}`;
  const [copied, setCopied] = useState(false);

  const copyLink = () => {
    navigator.clipboard.writeText(listenUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadQR = () => {
    const a = document.createElement("a");
    a.href = qrUrl;
    a.download = `translync-${session.id}.png`;
    a.click();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-900 text-lg">Share Session</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl leading-none"
          >
            x
          </button>
        </div>

        <p className="text-sm text-gray-500 mb-4">
          Attendees scan this QR code to join session{" "}
          <span className="font-mono font-semibold text-gray-700">#{session.id}</span>
        </p>

        <div className="flex justify-center mb-4">
          <img
            src={qrUrl}
            alt={`QR code for session ${session.id}`}
            className="w-48 h-48 rounded-xl border border-gray-100"
          />
        </div>

        <div className="bg-gray-50 rounded-xl px-3 py-2 mb-4 text-xs text-gray-500 break-all font-mono">
          {listenUrl}
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={copyLink}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-xl text-sm transition"
          >
            {copied ? "Copied!" : "Copy Link"}
          </button>
          <button
            onClick={downloadQR}
            className="bg-gray-800 hover:bg-gray-900 text-white font-semibold py-2.5 rounded-xl text-sm transition"
          >
            Download QR
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Create Session Modal ────────────────────────────────────── */

function CreateSessionModal({
  onClose,
  onCreated,
}: {
  onClose: () => void;
  onCreated: () => void;
}) {
  const router = useRouter();
  const [sessionName, setSessionName] = useState("");
  const [selectedLangs, setSelectedLangs] = useState<string[]>(["es"]);
  const [sourceLang, setSourceLang] = useState("en");
  const [domain, setDomain] = useState("general");
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
        body: JSON.stringify({
          targetLanguages: selectedLangs,
          sourceLanguage: sourceLang,
          domain: domain !== "general" ? domain : undefined,
          name: sessionName || undefined,
        }),
      });
      const data = await res.json();
      if (data.organizerUrl) {
        onCreated();
        router.push(data.organizerUrl);
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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-900 text-lg">New Translation Stream</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl leading-none"
          >
            x
          </button>
        </div>

        {/* Session name */}
        <div className="mb-5">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Session name</label>
          <input
            type="text"
            value={sessionName}
            onChange={(e) => setSessionName(e.target.value)}
            placeholder="e.g. Sunday Service, Annual Conference"
            maxLength={100}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-xs text-gray-400 mt-1">Optional — helps you identify this session later</p>
        </div>

        {/* Domain selection */}
        <div className="mb-5">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Domain</label>
          <div className="grid grid-cols-2 gap-2">
            {DOMAINS.map((d) => (
              <button
                key={d.id}
                onClick={() => setDomain(d.id)}
                className={`px-3 py-3 rounded-xl text-sm font-medium border-2 transition text-left ${
                  domain === d.id
                    ? "border-blue-600 bg-blue-50 text-blue-700"
                    : "border-gray-200 text-gray-600 hover:border-blue-300"
                }`}
              >
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold mr-2">
                  {d.icon}
                </span>
                {d.name}
              </button>
            ))}
          </div>
          {domain === "ngo" && (
            <p className="text-xs text-blue-600 mt-2">
              Includes humanitarian terminology glossary (UNHCR, IASC, Sphere Standards)
            </p>
          )}
        </div>

        {/* Source language */}
        <div className="mb-5">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Speaker language
          </label>
          <select
            value={sourceLang}
            onChange={(e) => setSourceLang(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            {Object.entries(LANGUAGE_NAMES).map(([code, name]) => (
              <option key={code} value={code}>
                {name}
              </option>
            ))}
          </select>
        </div>

        {/* Target languages */}
        <div className="mb-5">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Translate to</label>
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
          <div className="bg-blue-50 rounded-xl px-4 py-3 mb-5 text-sm text-blue-700">
            Est. cost: <strong>${(selectedLangs.length * 3).toFixed(0)}/hour</strong> ·{" "}
            {selectedLangs.length} language{selectedLangs.length > 1 ? "s" : ""}
          </div>
        )}

        {error && (
          <div className="bg-red-50 text-red-600 rounded-xl px-4 py-3 mb-4 text-sm">{error}</div>
        )}

        <button
          onClick={startSession}
          disabled={loading || selectedLangs.length === 0}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition disabled:opacity-50"
        >
          {loading ? "Starting..." : "Start Translation Session"}
        </button>

        <p className="text-center text-gray-400 text-xs mt-3">
          30 minutes free · No credit card required
        </p>
      </div>
    </div>
  );
}

/* ── Session Row ─────────────────────────────────────────────── */

function SessionRow({
  session,
  onQR,
  onDelete,
}: {
  session: SessionInfo;
  onQR: () => void;
  onDelete: () => void;
}) {
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const langsParam = session.targetLanguages.join(",");
  const listenUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/listen/${session.id}?src=${session.sourceLanguage}&langs=${langsParam}`
      : "";
  const organizerUrl = `/session/${session.id}?src=${session.sourceLanguage}&langs=${langsParam}`;

  const age = Date.now() - session.createdAt;
  const hoursAgo = Math.floor(age / 3600000);
  const timeLabel =
    hoursAgo < 1
      ? "< 1h ago"
      : hoursAgo < 24
      ? `${hoursAgo}h ago`
      : `${Math.floor(hoursAgo / 24)}d ago`;

  const copyLink = () => {
    navigator.clipboard.writeText(listenUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="border border-gray-100 rounded-xl p-4 hover:border-blue-200 hover:bg-blue-50/30 transition group">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            {session.name && (
              <span className="font-semibold text-gray-900 text-sm">{session.name}</span>
            )}
            <span className={`font-mono font-bold text-sm ${session.name ? "text-gray-400" : "text-gray-900"}`}>#{session.id}</span>
            {session.active && session.exists ? (
              <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 text-xs font-semibold px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                Live
              </span>
            ) : session.exists ? (
              <span className="bg-gray-100 text-gray-500 text-xs font-medium px-2 py-0.5 rounded-full">
                Ended
              </span>
            ) : (
              <span className="bg-gray-100 text-gray-400 text-xs font-medium px-2 py-0.5 rounded-full">
                Expired
              </span>
            )}
          </div>
          <div className="text-xs text-gray-500 mb-2">
            {LANGUAGE_NAMES[session.sourceLanguage] || session.sourceLanguage}
            {" -> "}
            {session.targetLanguages.map((l) => LANGUAGE_NAMES[l] || l).join(", ")}
            <span className="ml-2 text-gray-400">· {timeLabel}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-1">
        {session.exists && (
          <button
            onClick={() => router.push(organizerUrl)}
            className="bg-green-500 hover:bg-green-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition"
          >
            Open
          </button>
        )}
        <button
          onClick={copyLink}
          className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium px-3 py-1.5 rounded-lg transition"
        >
          {copied ? "Copied!" : "Copy Link"}
        </button>
        <button
          onClick={onQR}
          className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium px-3 py-1.5 rounded-lg transition"
          title="Show QR Code"
        >
          QR
        </button>
        <button
          onClick={onDelete}
          className="bg-gray-100 hover:bg-red-100 text-gray-400 hover:text-red-500 text-xs font-medium px-3 py-1.5 rounded-lg transition ml-auto"
          title="Remove from list"
        >
          Remove
        </button>
      </div>
    </div>
  );
}

/* ── Main Dashboard ──────────────────────────────────────────── */

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [qrSession, setQrSession] = useState<SessionInfo | null>(null);

  const fetchDashboard = useCallback(async () => {
    try {
      const res = await fetch("/api/dashboard");
      const json = await res.json();
      setData(json);
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  const deleteSession = async (sessionId: string) => {
    try {
      await fetch("/api/dashboard", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
      });
      fetchDashboard();
    } catch {
      // silently fail
    }
  };

  const { data: session } = useSession();
  const userEmail = session?.user?.email || "";
  const userInitial = userEmail ? userEmail[0].toUpperCase() : "U";

  const sessions_list = data?.sessions || [];
  const stats = data?.stats || { totalMinutes: 0, totalSessions: 0, languagesUsed: [] };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">T</span>
              </div>
              <span className="font-bold text-gray-900 text-lg">Translync</span>
            </a>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500 hidden sm:block">{userEmail}</span>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="text-sm text-gray-400 hover:text-gray-600"
            >
              Sign out
            </button>
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-blue-700 font-semibold text-sm">{userInitial}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Title row */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Manage your translation streams
            </p>
          </div>
          <button
            onClick={() => setShowCreate(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2.5 rounded-xl text-sm transition hidden sm:block"
          >
            + New Stream
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ── Left column: Sessions ──────────────────────── */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-50 flex items-center justify-between">
                <div>
                  <h2 className="font-bold text-gray-900">Your Streams</h2>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {sessions_list.length} session{sessions_list.length !== 1 ? "s" : ""} total
                  </p>
                </div>
                <button
                  onClick={() => setShowCreate(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-3 py-1.5 rounded-lg text-xs transition sm:hidden"
                >
                  + New
                </button>
              </div>

              <div className="p-4">
                {loading ? (
                  <div className="text-center py-12 text-gray-400">
                    <div className="animate-pulse text-lg mb-2">...</div>
                    <p className="text-sm">Loading sessions</p>
                  </div>
                ) : sessions_list.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mx-auto mb-4">
                      <span className="text-blue-500 text-2xl font-bold">+</span>
                    </div>
                    <p className="text-gray-500 font-medium mb-1">No streams yet</p>
                    <p className="text-gray-400 text-sm mb-4">
                      Create your first translation stream to get started
                    </p>
                    <button
                      onClick={() => setShowCreate(true)}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition"
                    >
                      Create First Stream
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {sessions_list.map((session) => (
                      <SessionRow
                        key={session.id}
                        session={session}
                        onQR={() => setQrSession(session)}
                        onDelete={() => deleteSession(session.id)}
                      />
                    ))}

                    {/* Create new button at bottom */}
                    <button
                      onClick={() => setShowCreate(true)}
                      className="w-full border-2 border-dashed border-gray-200 hover:border-blue-400 rounded-xl py-3 text-sm font-medium text-gray-400 hover:text-blue-600 transition"
                    >
                      + Create new stream
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ── Right column: Stats ────────────────────────── */}
          <div className="space-y-6">
            {/* Usage card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h2 className="font-bold text-gray-900 mb-1">Usage This Month</h2>
              <p className="text-xs text-gray-400 mb-4">
                {new Date().toLocaleString("en", { month: "long", year: "numeric" })}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-blue-50 rounded-xl p-3 text-center">
                  <div className="text-2xl font-bold text-blue-600">{stats.totalMinutes}</div>
                  <div className="text-xs text-blue-500 font-medium mt-0.5">Minutes</div>
                </div>
                <div className="bg-gray-100 rounded-xl p-3 text-center">
                  <div className="text-2xl font-bold text-gray-700">{stats.totalSessions}</div>
                  <div className="text-xs text-gray-500 font-medium mt-0.5">Sessions</div>
                </div>
              </div>

              {/* Simple usage bar */}
              <div>
                <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                  <span>Free tier</span>
                  <span>{stats.totalMinutes} / 30 min</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-400 rounded-full transition-all"
                    style={{ width: `${Math.min(100, (stats.totalMinutes / 30) * 100)}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Languages card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h2 className="font-bold text-gray-900 mb-1">Languages This Month</h2>
              <p className="text-xs text-gray-400 mb-4">Languages used in your sessions</p>

              {stats.languagesUsed.length === 0 ? (
                <p className="text-sm text-gray-400 italic">No languages used yet</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {stats.languagesUsed.map((lang) => (
                    <span
                      key={lang}
                      className="bg-gray-100 text-gray-700 text-sm font-medium px-3 py-1.5 rounded-full"
                    >
                      {LANGUAGE_NAMES[lang] || lang}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Quick help card */}
            <div className="bg-gradient-to-br from-blue-600 to-green-500 rounded-2xl p-5 text-white">
              <h3 className="font-bold mb-1">How it works</h3>
              <ol className="text-sm text-white/90 space-y-1.5 list-decimal list-inside">
                <li>Create a translation stream</li>
                <li>Share the QR code with attendees</li>
                <li>Start speaking -- translations appear live</li>
              </ol>
              <a
                href="/"
                className="inline-block mt-3 bg-white/20 hover:bg-white/30 text-sm font-semibold px-4 py-2 rounded-xl transition"
              >
                Learn more
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Modals */}
      {showCreate && (
        <CreateSessionModal
          onClose={() => setShowCreate(false)}
          onCreated={() => {
            setShowCreate(false);
            fetchDashboard();
          }}
        />
      )}

      {qrSession && <QRModal session={qrSession} onClose={() => setQrSession(null)} />}

      {/* Mobile FAB */}
      <button
        onClick={() => setShowCreate(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center text-2xl font-bold transition sm:hidden z-40"
        aria-label="New stream"
      >
        +
      </button>
    </div>
  );
}
