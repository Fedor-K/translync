import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { checkAdminAuth } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export async function GET(req: NextRequest) {
  const authError = checkAdminAuth(req);
  if (authError) return authError;

  try {
    const users: Record<string, unknown>[] = [];
    let cursor = 0;

    do {
      const [nextCursor, keys] = await redis.scan(cursor, { match: "user:*", count: 100 });
      cursor = typeof nextCursor === "number" ? nextCursor : parseInt(nextCursor as string);

      for (const key of keys) {
        try {
          // Skip non-primary user keys (user:email:*, user:account:*, etc.)
          if ((key as string).split(":").length > 2) continue;

          const data = await redis.get(key);
          if (data && typeof data === "object") {
            users.push({ key, ...(data as Record<string, unknown>) });
          } else if (data && typeof data === "string") {
            try {
              const parsed = JSON.parse(data);
              users.push({ key, ...parsed });
            } catch {
              // skip non-JSON values
            }
          }
        } catch {
          // skip keys that error (wrong type)
        }
      }
    } while (cursor !== 0);

    return NextResponse.json({
      total: users.length,
      users: users.map((u) => ({
        id: u.id,
        email: u.email,
        name: u.name,
        emailVerified: u.emailVerified,
        key: u.key,
      })),
    });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
