import { spawn, type ChildProcess } from "node:child_process";
import { DeepgramStream, type TranscriptEvent } from "./deepgram.js";
import { translateToMany, clearContext, setSessionDomain, clearSessionDomain } from "./translate.js";
import {
  getSession,
  storeChunk,
  publishTranslation,
  setSessionInactive,
} from "./redis.js";

const RTMP_BASE = process.env.RTMP_URL || "rtmp://localhost:1935";

// Active RTMP ingest processes
const activeIngests = new Map<string, { ffmpeg: ChildProcess; dg: DeepgramStream }>();

export async function startRtmpIngest(
  sessionId: string
): Promise<{ ok: boolean; error?: string }> {
  if (activeIngests.has(sessionId)) {
    return { ok: false, error: "RTMP ingest already running for this session" };
  }

  const session = await getSession(sessionId);
  if (!session) {
    return { ok: false, error: "Session not found" };
  }

  const sourceLang = session.sourceLanguage || "en";
  const targetLangs = session.targetLanguages || [];

  // Load domain config
  if (session.domain) {
    setSessionDomain(sessionId, session.domain, session.customGlossary);
    console.log(`[rtmp] Domain: ${session.domain}`);
  }

  // Start Deepgram at 16kHz (ffmpeg will resample to 16kHz)
  const dg = new DeepgramStream(sourceLang, 16000);
  let chunkCounter = 0;

  async function translateAndPublish(text: string, speaker: number | null): Promise<void> {
    if (!text.trim()) return;
    text = text.trim();

    const chunkId = `${sessionId}-rtmp-${++chunkCounter}`;
    const timestamp = Date.now();

    const translations = await translateToMany(text, sourceLang, targetLangs, sessionId);

    await storeChunk(sessionId, {
      id: chunkId,
      timestamp,
      original: text,
      translations,
    });

    for (const [lang, translatedText] of Object.entries(translations)) {
      await publishTranslation(sessionId, lang, {
        type: "final",
        chunkId,
        text: translatedText,
        speaker,
        timestamp,
      });
    }
  }

  dg.on("transcript", (event: TranscriptEvent) => {
    if (event.isFinal) {
      publishTranslation(sessionId, sourceLang, {
        type: "interim",
        text: event.text,
        speaker: event.speaker,
        timestamp: Date.now(),
      });
      translateAndPublish(event.text, event.speaker);
    } else {
      publishTranslation(sessionId, sourceLang, {
        type: "interim",
        text: event.text,
        speaker: event.speaker,
        timestamp: Date.now(),
      });
    }
  });

  dg.on("error", (err) => {
    console.error(`[rtmp] Deepgram error for session ${sessionId}:`, err);
  });

  await dg.start();

  // Start ffmpeg: pull RTMP stream → PCM int16 16kHz mono → stdout
  const rtmpUrl = `${RTMP_BASE}/${sessionId}`;
  console.log(`[rtmp] Starting ffmpeg: ${rtmpUrl}`);

  const ffmpeg = spawn("ffmpeg", [
    "-i", rtmpUrl,
    "-f", "s16le",
    "-ar", "16000",
    "-ac", "1",
    "pipe:1",
  ], {
    stdio: ["ignore", "pipe", "pipe"],
  });

  ffmpeg.stdout.on("data", (data: Buffer) => {
    dg.send(data);
  });

  ffmpeg.stderr.on("data", (data: Buffer) => {
    const line = data.toString().trim();
    if (line && !line.startsWith("frame=") && !line.startsWith("size=")) {
      console.log(`[rtmp:ffmpeg:${sessionId}] ${line}`);
    }
  });

  ffmpeg.on("close", async (code) => {
    console.log(`[rtmp] ffmpeg exited for session ${sessionId} (code=${code})`);
    cleanup(sessionId, targetLangs, sourceLang);
  });

  ffmpeg.on("error", (err) => {
    console.error(`[rtmp] ffmpeg spawn error for ${sessionId}:`, err);
    cleanup(sessionId, targetLangs, sourceLang);
  });

  activeIngests.set(sessionId, { ffmpeg, dg });
  console.log(`[rtmp] Ingest started for session ${sessionId}`);

  return { ok: true };
}

export async function stopRtmpIngest(
  sessionId: string
): Promise<{ ok: boolean; error?: string }> {
  const ingest = activeIngests.get(sessionId);
  if (!ingest) {
    return { ok: false, error: "No active RTMP ingest for this session" };
  }

  ingest.ffmpeg.kill("SIGTERM");
  // cleanup happens in the 'close' handler

  return { ok: true };
}

async function cleanup(
  sessionId: string,
  targetLangs: string[],
  sourceLang: string,
): Promise<void> {
  const ingest = activeIngests.get(sessionId);
  if (ingest) {
    ingest.dg.close();
    activeIngests.delete(sessionId);
  }

  clearContext(sessionId);
  clearSessionDomain(sessionId);
  await setSessionInactive(sessionId);

  // Notify listeners that session ended
  for (const lang of [...targetLangs, sourceLang]) {
    await publishTranslation(sessionId, lang, {
      type: "end",
      timestamp: Date.now(),
    });
  }

  console.log(`[rtmp] Cleanup done for session ${sessionId}`);
}
