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

export async function setSessionInactive(sessionId: string): Promise<void> {
  const session = await getSession(sessionId);
  if (!session) return;
  session.active = false;
  await redis.set(
    `session:${sessionId.toUpperCase()}`,
    JSON.stringify(session)
  );
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
