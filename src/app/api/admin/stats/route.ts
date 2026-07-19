import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

export const dynamic = "force-dynamic";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

interface SessionMeta {
  id: string;
  name?: string;
  sourceLanguage: string;
  targetLanguages: string[];
  domain: string;
  createdAt: number;
}

// Scan all keys matching a pattern (handles cursor pagination).
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

// Sort a count map into a descending [key, count] array.
function topN(map: Record<string, number>, n = 10): Array<[string, number]> {
  return Object.entries(map)
    .sort((a, b) => b[1] - a[1])
    .slice(0, n);
}

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  const expectedKey = process.env.BLOG_API_KEY || "translync-blog-secret";
  if (authHeader !== `Bearer ${expectedKey}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // 1. Registered users (primary user:* keys only, skip user:email:* etc.)
    const userKeys = (await scanKeys("user:*")).filter(
      (k) => k.split(":").length === 2
    );
    const registeredUsers = userKeys.length;

    // 2. Session history from user:{uid}:sessions lists (30-day retention).
    //    Covers both registered (uuid) and anonymous (u_...) creators.
    const sessionListKeys = await scanKeys("user:*:sessions");

    let totalSessions = 0;
    let sessionsLast7d = 0;
    let sessionsLast30d = 0;
    let registeredCreators = 0;
    let anonymousCreators = 0;
    const bySourceLang: Record<string, number> = {};
    const byTargetLang: Record<string, number> = {};
    const byDomain: Record<string, number> = {};

    const now = Date.now();
    const day = 86400_000;

    for (const key of sessionListKeys) {
      const parts = key.split(":");
      const uid = parts[1] || "";
      const raw = await redis.lrange(key, 0, -1);
      if (!Array.isArray(raw) || raw.length === 0) continue;

      let creatorHasSession = false;
      for (const item of raw) {
        let meta: SessionMeta | null = null;
        try {
          meta =
            typeof item === "string"
              ? (JSON.parse(item) as SessionMeta)
              : (item as SessionMeta);
        } catch {
          continue;
        }
        if (!meta || !meta.id) continue;

        creatorHasSession = true;
        totalSessions++;
        if (typeof meta.createdAt === "number") {
          if (now - meta.createdAt <= 7 * day) sessionsLast7d++;
          if (now - meta.createdAt <= 30 * day) sessionsLast30d++;
        }
        if (meta.sourceLanguage) {
          bySourceLang[meta.sourceLanguage] =
            (bySourceLang[meta.sourceLanguage] || 0) + 1;
        }
        for (const t of meta.targetLanguages || []) {
          byTargetLang[t] = (byTargetLang[t] || 0) + 1;
        }
        const d = meta.domain || "general";
        byDomain[d] = (byDomain[d] || 0) + 1;
      }

      if (creatorHasSession) {
        if (uid.startsWith("u_")) anonymousCreators++;
        else registeredCreators++;
      }
    }

    // 3. Live sessions (session:* keys, 24h TTL) — active count, duration, peak listeners.
    const liveKeys = await scanKeys("session:*");
    let liveSessionsTracked = 0;
    let activeSessions = 0;
    let totalDurationMs = 0;
    let sessionsWithDuration = 0;
    let peakListenersMax = 0;

    for (const key of liveKeys) {
      const data = await redis.get(key);
      let s: Record<string, unknown> | null = null;
      if (typeof data === "string") {
        try {
          s = JSON.parse(data);
        } catch {
          continue;
        }
      } else if (data && typeof data === "object") {
        s = data as Record<string, unknown>;
      }
      if (!s) continue;

      liveSessionsTracked++;
      if (s.active) activeSessions++;
      if (typeof s.durationMs === "number" && s.durationMs > 0) {
        totalDurationMs += s.durationMs;
        sessionsWithDuration++;
      }
      if (typeof s.peakListeners === "number") {
        peakListenersMax = Math.max(peakListenersMax, s.peakListeners);
      }
    }

    return NextResponse.json({
      registeredUsers,
      usage: {
        totalSessions,
        sessionsLast7d,
        sessionsLast30d,
        registeredCreators,
        anonymousCreators,
        activationRate:
          registeredUsers > 0
            ? Math.round((registeredCreators / registeredUsers) * 100) / 100
            : 0,
      },
      live: {
        note: "Live session objects expire after 24h; duration/listeners reflect only the last 24h.",
        liveSessionsTracked,
        activeSessions,
        totalMinutesLast24h: Math.round(totalDurationMs / 60000),
        sessionsWithDuration,
        peakListenersMax,
      },
      breakdown: {
        topSourceLanguages: topN(bySourceLang),
        topTargetLanguages: topN(byTargetLang),
        topDomains: topN(byDomain),
      },
      note: "Session history retained ~30 days (user:*:sessions); older sessions are not counted.",
    });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
