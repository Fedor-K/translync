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
    .filter(([, v]) => v > 0)
    .sort((a, b) => b[1] - a[1])
    .slice(0, n);
}

// Coerce a Redis hash (values may come back as strings) to numbers.
function toNumberMap(h: Record<string, unknown> | null): Record<string, number> {
  const out: Record<string, number> = {};
  if (!h) return out;
  for (const [k, v] of Object.entries(h)) {
    const n = typeof v === "number" ? v : parseInt(String(v), 10);
    if (!Number.isNaN(n)) out[k] = n;
  }
  return out;
}

// UTC date string (YYYY-MM-DD) offset by `daysAgo` from now.
function dayKey(now: number, daysAgo: number): string {
  return new Date(now - daysAgo * 86400_000).toISOString().slice(0, 10);
}

export async function GET(req: NextRequest) {
  const authError = checkAdminAuth(req);
  if (authError) return authError;

  try {
    const now = Date.now();

    // ── 1. Durable counters (authoritative all-time usage) ──────────────
    // Written on every createSession(), never expire. Only count sessions
    // created after this feature deployed.
    const totalRaw = await redis.get("stats:sessions:total");
    const allTimeSessions =
      typeof totalRaw === "number" ? totalRaw : parseInt(String(totalRaw ?? 0), 10) || 0;

    const last7Keys = Array.from({ length: 7 }, (_, i) => `stats:sessions:day:${dayKey(now, i)}`);
    const last30Keys = Array.from({ length: 30 }, (_, i) => `stats:sessions:day:${dayKey(now, i)}`);
    const sumDays = async (keys: string[]) => {
      if (keys.length === 0) return 0;
      const vals = await redis.mget<(number | string | null)[]>(...keys);
      return (vals || []).reduce<number>((s, v) => s + (parseInt(String(v ?? 0), 10) || 0), 0);
    };
    const durableLast7d = await sumDays(last7Keys);
    const durableLast30d = await sumDays(last30Keys);

    // Real audio processed (live durable counters written by the RT server).
    const audioMsRaw = await redis.get("stats:audio:ms:total");
    const audioMsTotal =
      typeof audioMsRaw === "number" ? audioMsRaw : parseInt(String(audioMsRaw ?? 0), 10) || 0;
    const audioMs7d = await sumDays(
      Array.from({ length: 7 }, (_, i) => `stats:audio:ms:day:${dayKey(now, i)}`)
    );
    const audioMs30d = await sumDays(
      Array.from({ length: 30 }, (_, i) => `stats:audio:ms:day:${dayKey(now, i)}`)
    );

    const bySourceDurable = toNumberMap(await redis.hgetall("stats:sessions:by_source"));
    const byTargetDurable = toNumberMap(await redis.hgetall("stats:sessions:by_target"));
    const byDomainDurable = toNumberMap(await redis.hgetall("stats:sessions:by_domain"));

    // ── 2. Registered users ─────────────────────────────────────────────
    const userKeys = (await scanKeys("user:*")).filter((k) => k.split(":").length === 2);
    const registeredUsers = userKeys.length;

    // ── 3. Per-user attribution (user:*:sessions, ~30-day retention) ─────
    const sessionListKeys = await scanKeys("user:*:sessions");
    let attributedSessions = 0;
    let registeredCreators = 0;
    let anonymousCreators = 0;

    for (const key of sessionListKeys) {
      const uid = key.split(":")[1] || "";
      const raw = await redis.lrange(key, 0, -1);
      if (!Array.isArray(raw) || raw.length === 0) continue;

      let hasSession = false;
      for (const item of raw) {
        let meta: SessionMeta | null = null;
        try {
          meta = typeof item === "string" ? (JSON.parse(item) as SessionMeta) : (item as SessionMeta);
        } catch {
          continue;
        }
        if (!meta || !meta.id) continue;
        hasSession = true;
        attributedSessions++;
      }
      if (hasSession) {
        if (uid.startsWith("u_")) anonymousCreators++;
        else registeredCreators++;
      }
    }

    // ── 4. Live/started session objects (session:* keys) ────────────────
    // NOTE: server-side updates currently SET without KEEPTTL, so these keys
    // lose their 24h TTL and accumulate. Treat this as "started sessions seen"
    // (all-time, approximate), not a 24h window.
    const liveKeys = await scanKeys("session:*");
    let startedSessionsSeen = 0;
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

      startedSessionsSeen++;
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
        allTimeSessions,
        sessionsLast7d: durableLast7d,
        sessionsLast30d: durableLast30d,
        registeredCreators,
        anonymousCreators,
        attributedSessions,
        activationRate:
          registeredUsers > 0
            ? Math.round((registeredCreators / registeredUsers) * 100) / 100
            : 0,
        note: "allTimeSessions/last7d/last30d come from durable counters and only include sessions created after this feature deployed. attributedSessions is the older list-based figure (~30-day retention, web route only).",
      },
      translationMinutes: {
        allTime: Math.round(audioMsTotal / 60000),
        last7d: Math.round(audioMs7d / 60000),
        last30d: Math.round(audioMs30d / 60000),
        note: "Real audio processed, counted live from PCM bytes on the RT server (updates during active sessions). Only counts audio streamed after this feature deployed to the RT server.",
      },
      sessionObjects: {
        note: "session:* objects currently accumulate (server SET drops the 24h TTL), so these are all-time 'started/used' figures, not a 24h window.",
        startedSessionsSeen,
        activeSessions,
        sessionsWithDuration,
        totalMinutes: Math.round(totalDurationMs / 60000),
        peakListenersMax,
      },
      breakdown: {
        topSourceLanguages: topN(bySourceDurable),
        topTargetLanguages: topN(byTargetDurable),
        topDomains: topN(byDomainDurable),
      },
    });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
