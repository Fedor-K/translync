import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { checkAdminAuth } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

interface SessionMeta {
  id: string;
  name?: string;
  sourceLanguage?: string;
  targetLanguages?: string[];
  domain?: string;
  createdAt?: number;
}

interface StoredSession {
  createdAt?: number;
  durationMs?: number;
  peakListeners?: number;
}

async function scanKeys(match: string): Promise<string[]> {
  const out: string[] = [];
  let cursor = 0;
  do {
    const [next, keys] = await redis.scan(cursor, { match, count: 100 });
    cursor = typeof next === "number" ? next : parseInt(next as string, 10);
    out.push(...(keys as string[]));
  } while (cursor !== 0);
  return out;
}

function asObject<T>(data: unknown): T | null {
  if (typeof data === "string") {
    try {
      return JSON.parse(data) as T;
    } catch {
      return null;
    }
  }
  if (data && typeof data === "object") return data as T;
  return null;
}

/**
 * Per-user usage breakdown: who (email), when, and how much.
 *
 * Joins user:{uid} (email) ↔ user:{uid}:sessions (session list + timestamps)
 * ↔ session:{id} (durationMs, listeners). Only sessions still present in a
 * user's session list (~30-day retention) can be attributed; session objects
 * whose list entry expired are reported as "unattributable".
 *
 * Note: per-user minutes rely on durationMs, which the server only records on
 * a clean session end — so they are a lower bound.
 */
export async function GET(req: NextRequest) {
  const authError = checkAdminAuth(req);
  if (authError) return authError;

  try {
    const listKeys = await scanKeys("user:*:sessions");

    const users: Array<Record<string, unknown>> = [];

    for (const key of listKeys) {
      const uid = key.split(":")[1] || "";
      const raw = await redis.lrange(key, 0, -1);
      if (!Array.isArray(raw) || raw.length === 0) continue;

      // Resolve identity.
      const isAnon = uid.startsWith("u_");
      let email: string | null = null;
      let name: string | null = null;
      if (!isAnon) {
        const u = asObject<{ email?: string; name?: string }>(await redis.get(`user:${uid}`));
        email = u?.email ?? null;
        name = u?.name ?? null;
      }

      let sessionCount = 0;
      let sessionsWithAudio = 0;
      let totalMs = 0;
      let firstSeen: number | null = null;
      let lastSeen: number | null = null;
      const langs = new Set<string>();
      const domains = new Set<string>();
      const detail: Array<Record<string, unknown>> = [];

      for (const item of raw) {
        const meta = asObject<SessionMeta>(item);
        if (!meta || !meta.id) continue;
        sessionCount++;

        const created = typeof meta.createdAt === "number" ? meta.createdAt : null;
        if (created !== null) {
          firstSeen = firstSeen === null ? created : Math.min(firstSeen, created);
          lastSeen = lastSeen === null ? created : Math.max(lastSeen, created);
        }
        if (meta.sourceLanguage) langs.add(meta.sourceLanguage);
        for (const t of meta.targetLanguages || []) langs.add(t);
        if (meta.domain) domains.add(meta.domain);

        // Pull live/stored session for duration.
        const s = asObject<StoredSession>(await redis.get(`session:${meta.id.toUpperCase()}`));
        const durMs = typeof s?.durationMs === "number" && s.durationMs > 0 ? s.durationMs : 0;
        if (durMs > 0) {
          sessionsWithAudio++;
          totalMs += durMs;
        }

        detail.push({
          id: meta.id,
          name: meta.name || null,
          createdAt: created ? new Date(created).toISOString() : null,
          minutes: durMs > 0 ? Math.round((durMs / 60000) * 10) / 10 : 0,
          langs: `${meta.sourceLanguage || "?"}→${(meta.targetLanguages || []).join(",")}`,
          domain: meta.domain || "general",
          peakListeners: typeof s?.peakListeners === "number" ? s.peakListeners : 0,
        });
      }

      detail.sort((a, b) => String(a.createdAt).localeCompare(String(b.createdAt)));

      users.push({
        identity: email || (isAnon ? `anonymous (${uid})` : `user:${uid}`),
        email,
        name,
        type: isAnon ? "anonymous" : "registered",
        sessions: sessionCount,
        sessionsWithAudio,
        totalMinutes: Math.round((totalMs / 60000) * 10) / 10,
        firstSeen: firstSeen ? new Date(firstSeen).toISOString() : null,
        lastSeen: lastSeen ? new Date(lastSeen).toISOString() : null,
        languages: [...langs],
        domains: [...domains],
        sessionDetail: detail,
      });
    }

    // Sort: most minutes first, then most sessions.
    users.sort(
      (a, b) =>
        (b.totalMinutes as number) - (a.totalMinutes as number) ||
        (b.sessions as number) - (a.sessions as number)
    );

    // Attribution coverage vs all session objects.
    const sessionObjectKeys = (await scanKeys("session:*")).filter(
      (k) => k.split(":").length === 2
    );
    const attributed = users.reduce((s, u) => s + (u.sessions as number), 0);

    return NextResponse.json({
      users,
      coverage: {
        sessionObjectsTotal: sessionObjectKeys.length,
        attributedSessions: attributed,
        unattributableSessions: Math.max(0, sessionObjectKeys.length - attributed),
        note: "Sessions whose user:{uid}:sessions list entry expired (~30-day retention) cannot be tied to an email. Per-user minutes come from durationMs (clean-end only) and are a lower bound. Deepgram cannot attribute per user (single shared API key).",
      },
    });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
