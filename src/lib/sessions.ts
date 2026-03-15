export interface TranscriptChunk {
  id: string;
  timestamp: number;
  original: string;
  translations: Record<string, string>;
}

export interface Session {
  id: string;
  createdAt: number;
  active: boolean;
  sourceLanguage: string;
  targetLanguages: string[];
  domain?: string;
  customGlossary?: Record<string, Record<string, string>>;
}

const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL!;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN!;

export async function redis(command: string, ...args: (string | number)[]) {
  const url = `${REDIS_URL}/${command}/${args.map(encodeURIComponent).join("/")}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${REDIS_TOKEN}` },
  });
  const data = await res.json();
  return data.result;
}

export async function createSession(
  targetLanguages: string[],
  sourceLanguage = "en",
  domain?: string,
  customGlossary?: Record<string, Record<string, string>>
): Promise<Session> {
  const id = Math.random().toString(36).slice(2, 8).toUpperCase();
  const session: Session = {
    id,
    createdAt: Date.now(),
    active: true,
    sourceLanguage,
    targetLanguages,
    domain,
    customGlossary,
  };
  // Store session for 24 hours
  await redis("set", `session:${id}`, JSON.stringify(session));
  await redis("expire", `session:${id}`, 86400);
  return session;
}

export async function getSession(id: string): Promise<Session | null> {
  const raw = await redis("get", `session:${id.toUpperCase()}`);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as Session;
  } catch {
    return null;
  }
}

export async function addChunk(sessionId: string, chunk: TranscriptChunk): Promise<void> {
  const key = `chunks:${sessionId.toUpperCase()}`;
  await redis("rpush", key, JSON.stringify(chunk));
  await redis("expire", key, 86400);
}

export async function getChunksSince(
  sessionId: string,
  since: number
): Promise<TranscriptChunk[]> {
  const raw = await redis("lrange", `chunks:${sessionId.toUpperCase()}`, 0, -1);
  if (!Array.isArray(raw)) return [];
  return raw
    .map((s: string) => {
      try { return JSON.parse(s) as TranscriptChunk; } catch { return null; }
    })
    .filter((c): c is TranscriptChunk => c !== null && c.timestamp > since);
}

export async function endSession(sessionId: string): Promise<void> {
  const session = await getSession(sessionId);
  if (!session) return;
  session.active = false;
  await redis("set", `session:${sessionId.toUpperCase()}`, JSON.stringify(session));
}
