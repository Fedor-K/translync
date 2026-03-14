"use client";
import { useState, useEffect, useRef } from "react";
import { use } from "react";

export default function SessionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [status, setStatus] = useState<"idle" | "recording" | "ended">("idle");
  const [transcript, setTranscript] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [sessionUrl, setSessionUrl] = useState("");
  const mediaRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    // Pass langs from current URL to listen URL
    const search = window.location.search;
    setSessionUrl(`${window.location.origin}/listen/${id}${search}`);
  }, [id]);

  const getMimeType = () => {
    const types = ["audio/webm;codecs=opus", "audio/webm", "audio/mp4", "audio/ogg"];
    for (const type of types) {
      if (MediaRecorder.isTypeSupported(type)) return type;
    }
    return ""; // browser default
  };

  const startRecording = async () => {
    setError("");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mimeType = getMimeType();
      const recorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);
      mediaRef.current = recorder;

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      recorder.start(3000); // collect 3s chunks
      setStatus("recording");

      // Send chunks every 4 seconds
      intervalRef.current = setInterval(async () => {
        if (chunksRef.current.length === 0) return;
        const actualType = mimeType || "audio/webm";
        const blob = new Blob(chunksRef.current, { type: actualType });
        chunksRef.current = [];
        try {
          const search = window.location.search;
          const res = await fetch(`/api/sessions/${id}/chunk${search}`, {
            method: "POST",
            headers: { "x-audio-type": actualType },
            body: blob,
          });
          const data = await res.json();
          if (data.transcript) {
            setTranscript((prev) => [...prev, data.transcript]);
          }
        } catch (e) {
          console.error("Send error:", e);
        }
      }, 4000);
    } catch (e: unknown) {
      const err = e as Error;
      if (err?.name === "NotAllowedError") {
        setError("Microphone blocked. On iPhone: Settings → Safari → Microphone → Allow for translync.vercel.app");
      } else if (err?.name === "NotFoundError") {
        setError("No microphone found on this device.");
      } else {
        setError("Could not access microphone. Please try in Chrome or Safari.");
      }
    }
  };

  const stopRecording = () => {
    if (mediaRef.current) {
      mediaRef.current.stop();
      mediaRef.current.stream.getTracks().forEach((t) => t.stop());
    }
    if (intervalRef.current) clearInterval(intervalRef.current);
    setStatus("ended");
  };

  const listenUrl = sessionUrl || `https://translync.com/listen/${id}`;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-900 text-white px-6 py-4 flex items-center justify-between">
        <div>
          <span className="font-bold text-lg">Translync</span>
          <span className="ml-3 text-blue-300 text-sm">Session #{id}</span>
        </div>
        {status === "recording" && (
          <span className="flex items-center gap-2 text-green-400 text-sm font-medium">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            LIVE
          </span>
        )}
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* QR / Share */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6 shadow-sm">
          <h2 className="font-bold text-gray-900 mb-1">Share with audience</h2>
          <p className="text-gray-500 text-sm mb-3">Attendees open this link on their phone</p>
          <div className="flex items-center gap-3">
            <input
              readOnly
              value={listenUrl}
              className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-700 bg-gray-50"
            />
            <button
              onClick={() => navigator.clipboard.writeText(listenUrl)}
              className="bg-blue-700 text-white text-sm px-4 py-2 rounded-xl hover:bg-blue-800"
            >
              Copy
            </button>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6 shadow-sm text-center">
          {status === "idle" && (
            <>
              <p className="text-gray-500 mb-4">Press Start to begin capturing audio</p>
              <button
                onClick={startRecording}
                className="bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-4 rounded-2xl text-lg transition"
              >
                🎙️ Start Translation
              </button>
            </>
          )}
          {status === "recording" && (
            <>
              <div className="text-5xl mb-3 animate-pulse">🎙️</div>
              <p className="text-green-600 font-semibold mb-4">Recording — speak into your microphone</p>
              <button
                onClick={stopRecording}
                className="bg-red-500 hover:bg-red-600 text-white font-bold px-8 py-3 rounded-2xl transition"
              >
                ⏹ Stop Session
              </button>
            </>
          )}
          {status === "ended" && (
            <div className="text-gray-500">
              <div className="text-4xl mb-3">✅</div>
              <p className="font-semibold">Session ended</p>
              <p className="text-sm mt-1">Total segments: {transcript.length}</p>
            </div>
          )}
          {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
        </div>

        {/* Live Transcript */}
        {transcript.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h2 className="font-bold text-gray-900 mb-3">Live Transcript</h2>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {transcript.map((t, i) => (
                <p key={i} className="text-gray-700 text-sm py-2 border-b border-gray-50 last:border-0">
                  {t}
                </p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
