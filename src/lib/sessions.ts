export interface TranscriptChunk {
  id: string;
  timestamp: number;
  original: string;
  translations: Record<string, string>; // lang code -> translated text
}

export interface Session {
  id: string;
  createdAt: number;
  active: boolean;
  sourceLanguage: string;
  targetLanguages: string[];
  chunks: TranscriptChunk[];
  totalMinutes: number;
}

// In-memory store for MVP
const sessions = new Map<string, Session>();

export function createSession(targetLanguages: string[], sourceLanguage = "en"): Session {
  const id = Math.random().toString(36).slice(2, 8).toUpperCase();
  const session: Session = {
    id,
    createdAt: Date.now(),
    active: true,
    sourceLanguage,
    targetLanguages,
    chunks: [],
    totalMinutes: 0,
  };
  sessions.set(id, session);
  return session;
}

export function getSession(id: string): Session | undefined {
  return sessions.get(id.toUpperCase());
}

export function addChunk(sessionId: string, chunk: TranscriptChunk): void {
  const session = sessions.get(sessionId.toUpperCase());
  if (!session) return;
  session.chunks.push(chunk);
  // Update total minutes (rough estimate)
  session.totalMinutes = (Date.now() - session.createdAt) / 60000;
}

export function endSession(sessionId: string): void {
  const session = sessions.get(sessionId.toUpperCase());
  if (session) session.active = false;
}

export function getChunksSince(sessionId: string, since: number): TranscriptChunk[] {
  const session = sessions.get(sessionId.toUpperCase());
  if (!session) return [];
  return session.chunks.filter((c) => c.timestamp > since);
}
