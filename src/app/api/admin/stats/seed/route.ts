import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { checkAdminAuth } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

interface StoredSession {
  id?: string;
  createdAt?: number;
  sourceLanguage?: string;
  targetLanguages?: string[];
  domain?: string;
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

/**
 * One-time backfill of durable usage counters from existing session:* objects.
 *
 * The durable counters (stats:sessions:*) start at zero when the counters
 * feature deploys and therefore miss sessions created before it. This endpoint
 * replays whatever session:* objects still exist into those counters.
 *
 * Idempotent: guarded by the `stats:seeded` flag. Pass ?force=1 to run again
 * (only do this if you know the counters were reset, or it will double-count).
 */
export async function POST(req: NextRequest) {
  const authError = checkAdminAuth(req);
  if (authError) return authError;

  const force = req.nextUrl.searchParams.get("force") === "1";

  try {
    const already = await redis.get("stats:seeded");
    if (already && !force) {
      return NextResponse.json({
        seeded: false,
        reason: "Already seeded. Pass ?force=1 to override (may double-count).",
      });
    }

    const keys = await scanKeys("session:*");
    let backfilled = 0;
    let skipped = 0;

    for (const key of keys) {
      // Only replay top-level session objects, not derived keys like
      // session:ID:lang:xx (those are pub/sub channels, not stored objects).
      if (key.split(":").length !== 2) {
        skipped++;
        continue;
      }

      const data = await redis.get(key);
      let s: StoredSession | null = null;
      if (typeof data === "string") {
        try {
          s = JSON.parse(data);
        } catch {
          skipped++;
          continue;
        }
      } else if (data && typeof data === "object") {
        s = data as StoredSession;
      }
      if (!s) {
        skipped++;
        continue;
      }

      await redis.incr("stats:sessions:total");
      if (typeof s.createdAt === "number") {
        const day = new Date(s.createdAt).toISOString().slice(0, 10);
        await redis.incr(`stats:sessions:day:${day}`);
      }
      if (s.sourceLanguage) {
        await redis.hincrby("stats:sessions:by_source", s.sourceLanguage, 1);
      }
      for (const t of s.targetLanguages || []) {
        await redis.hincrby("stats:sessions:by_target", t, 1);
      }
      await redis.hincrby("stats:sessions:by_domain", s.domain || "general", 1);
      backfilled++;
    }

    await redis.set("stats:seeded", new Date().toISOString());

    const total = await redis.get("stats:sessions:total");

    return NextResponse.json({
      seeded: true,
      backfilled,
      skipped,
      newTotal:
        typeof total === "number" ? total : parseInt(String(total ?? 0), 10) || 0,
      note: "Backfill replayed existing session:* objects into durable counters. Sessions whose objects already expired cannot be recovered.",
    });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
