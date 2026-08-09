import { Redis } from "ioredis";

const REDIS_URL = process.env.REDIS_URL;
if (!REDIS_URL) {
  console.error("REDIS_URL is required (Upstash native Redis endpoint)");
  process.exit(1);
}

// Command client (GET, SET, RPUSH, PUBLISH)
export const redis = new Redis(REDIS_URL, { maxRetriesPerRequest: 3 });

redis.on("error", (err: Error) => console.error("[redis:cmd]", err.message));

export interface Session {
  id: string;
  createdAt: number;
  active: boolean;
  sourceLanguage: string;
  targetLanguages: string[];
  domain?: string;
  customGlossary?: Record<string, Record<string, string>>;
  startedAt?: number;
  endedAt?: number;
  durationMs?: number;
  peakListeners?: number;
}

export interface TranscriptChunk {
  id: string;
  timestamp: number;
  original: string;
  translations: Record<string, string>;
}

export async function getSession(id: string): Promise<Session | null> {
  const raw = await redis.get(`session:${id.toUpperCase()}`);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as Session;
  } catch {
    return null;
  }
}

export async function storeChunk(
  sessionId: string,
  chunk: TranscriptChunk
): Promise<void> {
  const key = `chunks:${sessionId.toUpperCase()}`;
  await redis.rpush(key, JSON.stringify(chunk));
  await redis.expire(key, 86400);
}

export async function getChunksSince(
  sessionId: string,
  since: number
): Promise<TranscriptChunk[]> {
  const raw = await redis.lrange(
    `chunks:${sessionId.toUpperCase()}`,
    0,
    -1
  );
  return raw
    .map((s: string) => {
      try {
        return JSON.parse(s) as TranscriptChunk;
      } catch {
        return null;
      }
    })
    .filter((c): c is TranscriptChunk => c !== null && c.timestamp > since);
}

export async function setSessionStarted(sessionId: string): Promise<void> {
  const session = await getSession(sessionId);
  if (!session) return;
  session.startedAt = Date.now();
  await redis.set(`session:${sessionId.toUpperCase()}`, JSON.stringify(session));
}

export async function setSessionInactive(sessionId: string): Promise<void> {
  const session = await getSession(sessionId);
  if (!session) return;
  session.active = false;
  session.endedAt = Date.now();
  if (session.startedAt) {
    session.durationMs = session.endedAt - session.startedAt;
  }
  await redis.set(
    `session:${sessionId.toUpperCase()}`,
    JSON.stringify(session)
  );
}

// Durable, never-expiring counters of real audio processed (milliseconds).
// Written live as audio streams, so "minutes of translation" is accurate and
// available during a session — not only on a clean disconnect.
export async function incrAudioMs(deltaMs: number, day: string): Promise<void> {
  const delta = Math.round(deltaMs);
  if (delta <= 0) return;
  await redis.incrby("stats:audio:ms:total", delta);
  await redis.incrby(`stats:audio:ms:day:${day}`, delta);
}

// Live-update a session's translated duration from real audio streamed.
// Uses KEEPTTL so the 24h TTL on the session object is preserved (a plain SET
// would clear it — the cause of session:* keys never expiring).
export async function setSessionAudioDurationMs(
  sessionId: string,
  durationMs: number
): Promise<void> {
  const session = await getSession(sessionId);
  if (!session) return;
  session.durationMs = Math.round(durationMs);
  await redis.set(
    `session:${sessionId.toUpperCase()}`,
    JSON.stringify(session),
    "KEEPTTL"
  );
}

// Listener tracking per session
const LISTENER_KEY_PREFIX = "listeners:";

export async function incrementListeners(sessionId: string): Promise<number> {
  const key = `${LISTENER_KEY_PREFIX}${sessionId.toUpperCase()}`;
  const count = await redis.incr(key);
  await redis.expire(key, 86400);
  // Update peak in session
  const session = await getSession(sessionId);
  if (session && (!session.peakListeners || count > session.peakListeners)) {
    session.peakListeners = count;
    await redis.set(`session:${sessionId.toUpperCase()}`, JSON.stringify(session));
  }
  return count;
}

export async function decrementListeners(sessionId: string): Promise<number> {
  const key = `${LISTENER_KEY_PREFIX}${sessionId.toUpperCase()}`;
  const count = await redis.decr(key);
  return Math.max(0, count);
}

export async function getListenerCount(sessionId: string): Promise<number> {
  const key = `${LISTENER_KEY_PREFIX}${sessionId.toUpperCase()}`;
  const count = await redis.get(key);
  return Math.max(0, parseInt(count || "0", 10));
}

// Pub/Sub helpers
export function channelName(sessionId: string, lang: string): string {
  return `session:${sessionId.toUpperCase()}:lang:${lang}`;
}

export async function publishTranslation(
  sessionId: string,
  lang: string,
  data: object
): Promise<void> {
  await redis.publish(channelName(sessionId, lang), JSON.stringify(data));
}

// Creates a dedicated subscriber connection per listener.
// ioredis requires a separate client for subscribe mode.
export async function subscribeToLanguage(
  sessionId: string,
  lang: string,
  callback: (data: string) => void
): Promise<() => void> {
  const sub = new Redis(REDIS_URL!, { maxRetriesPerRequest: 3 });
  const channel = channelName(sessionId, lang);

  sub.on("error", (err: Error) =>
    console.error(`[redis:sub:${channel}]`, err.message)
  );

  await sub.subscribe(channel);

  sub.on("message", (ch: string, message: string) => {
    if (ch === channel) callback(message);
  });

  return async () => {
    await sub.unsubscribe(channel);
    sub.disconnect();
  };
}
