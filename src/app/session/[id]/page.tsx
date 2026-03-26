"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { use } from "react";

const RT_URL = process.env.NEXT_PUBLIC_RT_URL || "http://localhost:3001";

export default function SessionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [status, setStatus] = useState<"idle" | "requesting" | "recording" | "ended">("idle");
  const [transcript, setTranscript] = useState<string[]>([]);
  const [interimText, setInterimText] = useState("");
  const [error, setError] = useState("");
  const [sessionUrl, setSessionUrl] = useState("");
  const [volume, setVolume] = useState(0);
  const [connected, setConnected] = useState(false);

  const wsRef = useRef<WebSocket | null>(null);
  const mediaRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const workletRef = useRef<AudioWorkletNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const sseRef = useRef<EventSource | null>(null);
  const sseCleanupRef = useRef<(() => void) | null>(null);

  // Parse URL params
  const getParams = useCallback(() => {
    const p = new URLSearchParams(window.location.search);
    return {
      src: p.get("src") || "en",
      langs: p.get("langs") || "",
    };
  }, []);

  useEffect(() => {
    const search = window.location.search;
    setSessionUrl(`${window.location.origin}/listen/${id}${search}`);
  }, [id]);

  const startVolumeMonitor = (stream: MediaStream) => {
    const ctx = new AudioContext();
    const source = ctx.createMediaStreamSource(stream);
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 256;
    source.connect(analyser);
    analyserRef.current = analyser;

    const data = new Uint8Array(analyser.frequencyBinCount);
    const tick = () => {
      analyser.getByteFrequencyData(data);
      const avg = data.reduce((a, b) => a + b, 0) / data.length;
      setVolume(Math.min(100, avg * 2.5));
      animFrameRef.current = requestAnimationFrame(tick);
    };
    tick();
  };

  const stopVolumeMonitor = () => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    setVolume(0);
  };

  // Connect SSE to receive own transcript back (interim + final)
  const lastTsRef = useRef(0);
  const connectSSE = useCallback(() => {
    const { src } = getParams();
    let closed = false;

    function connect() {
      if (closed) return;
      const url = `${RT_URL}/session/${id}/stream?lang=${src}&since=${lastTsRef.current}`;
      const sse = new EventSource(url);
      sseRef.current = sse;

      sse.addEventListener("transcript", (e) => {
        const data = JSON.parse(e.data);
        if (data.type === "interim") {
          setInterimText(data.text);
        } else if (data.type === "final") {
          setInterimText("");
          lastTsRef.current = data.timestamp;
          setTranscript((prev) => [...prev, data.text]);
        } else if (data.type === "end") {
          setStatus("ended");
        }
      });

      sse.onerror = () => {
        sse.close();
        if (!closed) setTimeout(connect, 2000);
      };
    }

    connect();
    return () => { closed = true; sseRef.current?.close(); };
  }, [id, getParams]);

  // Connect WebSocket for audio streaming
  const connectWS = useCallback(() => {
    const { src, langs } = getParams();
    const wsUrl = `${RT_URL.replace(/^http/, "ws")}/session/${id}/audio?src=${src}&langs=${langs}`;
    const ws = new WebSocket(wsUrl);
    ws.binaryType = "arraybuffer";
    wsRef.current = ws;

    ws.onopen = () => {
      setConnected(true);
      console.log("[ws] Connected to RT server");
    };

    ws.onclose = () => {
      setConnected(false);
      console.log("[ws] Disconnected from RT server");
    };

    ws.onerror = (err) => {
      console.error("[ws] Error:", err);
      setConnected(false);
    };

    return ws;
  }, [id, getParams]);

  const startRecording = async () => {
    setError("");
    setStatus("requesting");

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { channelCount: 1, echoCancellation: true, noiseSuppression: true },
      });
      streamRef.current = stream;

      // Detect actual sample rate
      const audioCtx = new AudioContext();
      audioCtxRef.current = audioCtx;
      const actualSampleRate = audioCtx.sampleRate;
      console.log(`[audio] Native sample rate: ${actualSampleRate}`);

      // Connect WebSocket to RT server — pass actual sample rate
      const { src, langs } = getParams();
      const wsUrl = `${RT_URL.replace(/^http/, "ws")}/session/${id}/audio?src=${src}&langs=${langs}&sr=${actualSampleRate}`;
      const ws = new WebSocket(wsUrl);
      ws.binaryType = "arraybuffer";
      wsRef.current = ws;

      // Wait for WS to open
      await new Promise<void>((resolve, reject) => {
        ws.onopen = () => {
          setConnected(true);
          resolve();
        };
        ws.onerror = () => reject(new Error("Failed to connect to translation server"));
        setTimeout(() => reject(new Error("Connection timeout")), 10000);
      });

      // Connect SSE to receive transcripts
      sseCleanupRef.current = connectSSE();

      startVolumeMonitor(stream);
      setStatus("recording");

      // Capture raw PCM audio and send as linear16 via WebSocket
      const source = audioCtx.createMediaStreamSource(stream);

      // ScriptProcessorNode: capture raw float32 → convert to int16 → send
      const processor = audioCtx.createScriptProcessor(4096, 1, 1);
      processor.onaudioprocess = (e) => {
        if (ws.readyState !== WebSocket.OPEN) return;
        const float32 = e.inputBuffer.getChannelData(0);
        const int16 = new Int16Array(float32.length);
        for (let i = 0; i < float32.length; i++) {
          const s = Math.max(-1, Math.min(1, float32[i]));
          int16[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
        }
        ws.send(int16.buffer);
      };

      source.connect(processor);
      processor.connect(audioCtx.destination);
    } catch (e: unknown) {
      const err = e as Error;
      setStatus("idle");
      if (err?.name === "NotAllowedError") {
        setError("blocked");
      } else if (err?.name === "NotFoundError") {
        setError("No microphone found on this device.");
      } else {
        setError(err?.message || "Could not start recording.");
      }
    }
  };

  const stopRecording = () => {
    audioCtxRef.current?.close();
    audioCtxRef.current = null;
    streamRef.current?.getTracks().forEach((t) => t.stop());
    wsRef.current?.close();
    sseCleanupRef.current?.();
    sseCleanupRef.current = null;
    stopVolumeMonitor();
    setStatus("ended");
    setConnected(false);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      wsRef.current?.close();
      sseCleanupRef.current?.();
      streamRef.current?.getTracks().forEach((t) => t.stop());
      stopVolumeMonitor();
    };
  }, []);

  const listenUrl = sessionUrl || `https://translync.com/listen/${id}`;

  // Volume bar — 8 segments
  const bars = Array.from({ length: 8 }, (_, i) => {
    const threshold = (i / 8) * 100;
    const active = volume > threshold;
    const color = i < 4 ? "bg-green-400" : i < 6 ? "bg-yellow-400" : "bg-red-400";
    return { active, color };
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-blue-900 text-white px-6 py-4 flex items-center justify-between">
        <div>
          <span className="font-bold text-lg">Translync</span>
          <span className="ml-3 text-blue-300 text-sm">Session #{id}</span>
        </div>
        <div className="flex items-center gap-3">
          {connected && (
            <span className="text-xs text-green-300 bg-green-900/30 px-2 py-0.5 rounded">
              WS
            </span>
          )}
          {status === "recording" && (
            <span className="flex items-center gap-2 text-green-400 text-sm font-medium">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              LIVE
            </span>
          )}
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Share + QR */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6 shadow-sm">
          <h2 className="font-bold text-gray-900 mb-1">Share with audience</h2>
          <p className="text-gray-500 text-sm mb-4">Attendees scan QR or open the link on their phone</p>

          <div className="flex flex-col sm:flex-row gap-5">
            {/* QR Code */}
            <div className="flex-shrink-0 flex flex-col items-center">
              <img
                src={`/api/qr/${id}?src=${getParams().src}&langs=${getParams().langs}`}
                alt="QR code"
                className="w-36 h-36 rounded-xl border border-gray-100"
              />
              <a
                href={`/api/qr/${id}?src=${getParams().src}&langs=${getParams().langs}`}
                download={`translync-${id}.png`}
                className="text-xs text-blue-600 hover:underline mt-2"
              >
                Download QR
              </a>
            </div>

            {/* Link + actions */}
            <div className="flex-1 min-w-0">
              <div className="bg-gray-50 rounded-xl px-3 py-2.5 text-sm text-gray-600 break-all font-mono mb-3 border border-gray-100">
                {listenUrl}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => navigator.clipboard.writeText(listenUrl)}
                  className="bg-blue-600 text-white text-sm px-4 py-2 rounded-xl hover:bg-blue-700 font-medium"
                >
                  Copy Link
                </button>
                <a
                  href={`/listen/${id}?${new URLSearchParams(getParams()).toString()}`}
                  target="_blank"
                  className="bg-gray-100 text-gray-700 text-sm px-4 py-2 rounded-xl hover:bg-gray-200 font-medium"
                >
                  Preview
                </a>
              </div>
              <p className="text-xs text-gray-400 mt-3">
                Session #{id} · {getParams().src.toUpperCase()} → {getParams().langs.toUpperCase().replace(/,/g, ", ")}
              </p>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6 shadow-sm text-center">
          {status === "idle" && error !== "blocked" && (
            <>
              <div className="mb-6">
                <h3 className="font-bold text-gray-900 text-lg mb-3">Ready to start</h3>
                <ol className="text-sm text-gray-600 text-left space-y-2 max-w-xs mx-auto">
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">1</span>
                    <span>Share the QR code above with your audience</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">2</span>
                    <span>Click <strong>Start Translation</strong> below</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">3</span>
                    <span>Allow microphone access when your browser asks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">4</span>
                    <span>Speak naturally — translations appear live for your audience</span>
                  </li>
                </ol>
              </div>
              <button
                onClick={startRecording}
                className="bg-green-500 hover:bg-green-600 text-white font-bold px-10 py-4 rounded-2xl text-lg transition shadow-lg shadow-green-500/25"
              >
                Start Translation
              </button>
              <p className="text-gray-400 text-xs mt-3">Your browser will ask for microphone permission</p>
              {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
            </>
          )}
          {status === "requesting" && (
            <>
              <div className="text-4xl mb-3 animate-pulse">...</div>
              <p className="text-blue-600 font-semibold">Connecting...</p>
            </>
          )}
          {error === "blocked" && (
            <div className="text-left">
              <p className="font-bold text-gray-900 text-center mb-4">Microphone access blocked</p>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-900 mb-4">
                <p className="font-semibold mb-2">On iPhone / Safari:</p>
                <ol className="list-decimal list-inside space-y-1">
                  <li>Open <strong>Settings</strong> app</li>
                  <li>Scroll to <strong>Safari</strong></li>
                  <li>Tap <strong>Microphone</strong></li>
                  <li>Set to <strong>Allow</strong></li>
                  <li>Come back and tap Start again</li>
                </ol>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-900 mb-4">
                <p className="font-semibold mb-2">On Chrome/Desktop:</p>
                <p>Click the lock icon in address bar → Microphone → Allow</p>
              </div>
              <button
                onClick={() => { setError(""); setStatus("idle"); }}
                className="w-full bg-green-500 text-white font-bold py-3 rounded-xl hover:bg-green-600 transition"
              >
                Try Again
              </button>
            </div>
          )}
          {status === "recording" && (
            <>
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="text-4xl">🎙️</div>
                <div className="flex items-end gap-1 h-10">
                  {bars.map((bar, i) => (
                    <div
                      key={i}
                      className={`w-3 rounded-sm transition-all duration-75 ${
                        bar.active ? bar.color : "bg-gray-200"
                      }`}
                      style={{ height: `${30 + i * 5}%` }}
                    />
                  ))}
                </div>
              </div>
              <p className="text-green-600 font-semibold mb-4">
                {volume > 5 ? "Hearing you..." : "Speak into microphone"}
              </p>
              <button
                onClick={stopRecording}
                className="bg-red-500 hover:bg-red-600 text-white font-bold px-8 py-3 rounded-2xl transition"
              >
                Stop Session
              </button>
            </>
          )}
          {status === "ended" && (
            <div className="text-gray-500">
              <p className="font-semibold">Session ended</p>
              <p className="text-sm mt-1">Total segments: {transcript.length}</p>
            </div>
          )}
        </div>

        {/* Stream via OBS */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6 shadow-sm">
          <div className="flex items-center gap-2 mb-1">
            <h2 className="font-bold text-gray-900">Stream via OBS</h2>
            <span className="bg-gray-100 text-gray-500 text-xs font-medium px-2 py-0.5 rounded-full">Alternative</span>
          </div>
          <p className="text-gray-500 text-sm mb-4">Use OBS Studio instead of browser microphone for professional audio</p>

          <div className="space-y-3 mb-5">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">RTMP URL</label>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-gray-50 rounded-xl px-3 py-2.5 text-sm text-gray-700 font-mono border border-gray-100">
                  rtmp://rtmp.translync.app/live
                </div>
                <button
                  onClick={() => navigator.clipboard.writeText("rtmp://rtmp.translync.app/live")}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs font-medium px-3 py-2.5 rounded-xl transition"
                >
                  Copy
                </button>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Stream Key</label>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-gray-50 rounded-xl px-3 py-2.5 text-sm text-gray-900 font-mono font-bold border border-gray-100">
                  {id}
                </div>
                <button
                  onClick={() => navigator.clipboard.writeText(id)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs font-medium px-3 py-2.5 rounded-xl transition"
                >
                  Copy
                </button>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-xl p-4 text-sm text-blue-800">
            <p className="font-semibold mb-2">OBS Setup (3 steps):</p>
            <ol className="list-decimal list-inside space-y-1.5 text-blue-700">
              <li>Open OBS → Settings → Stream → Service: <strong>Custom</strong></li>
              <li>Paste the RTMP URL as <strong>Server</strong> and the Stream Key above</li>
              <li>Click <strong>Start Streaming</strong> in OBS — translation begins automatically</li>
            </ol>
            <p className="text-blue-500 text-xs mt-3">
              Tip: For best results, use Audio Output Capture in OBS sources for clean audio without background noise.
            </p>
          </div>
        </div>

        {/* Live Transcript */}
        {(transcript.length > 0 || interimText) && (
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h2 className="font-bold text-gray-900 mb-3">Live Transcript</h2>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {transcript.map((t, i) => (
                <p key={i} className="text-gray-700 text-sm py-2 border-b border-gray-50 last:border-0">
                  {t}
                </p>
              ))}
              {interimText && (
                <p className="text-gray-400 text-sm py-2 italic">
                  {interimText}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
