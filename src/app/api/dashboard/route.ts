import { NextRequest, NextResponse } from "next/server";
import { redis, getSession } from "@/lib/sessions";

export const dynamic = "force-dynamic";

interface SessionMeta {
  id: string;
  sourceLanguage: string;
  targetLanguages: string[];
  domain: string;
  createdAt: number;
}

export async function GET(req: NextRequest) {
  try {
    const uid = req.cookies.get("translync_uid")?.value;
    if (!uid) {
      return NextResponse.json({ sessions: [], stats: { totalMinutes: 0, languagesUsed: [] } });
    }

    // Get all session metas for this user
    const rawList = await redis("lrange", `user:${uid}:sessions`, 0, -1);
    const sessionMetas: SessionMeta[] = [];

    if (Array.isArray(rawList)) {
      for (const raw of rawList) {
        try {
          sessionMetas.push(JSON.parse(raw) as SessionMeta);
        } catch {
          // skip malformed entries
        }
      }
    }

    // Enrich with live session status from Redis
    const sessions = await Promise.all(
      sessionMetas.map(async (meta) => {
        const liveSession = await getSession(meta.id);
        return {
          id: meta.id,
          sourceLanguage: meta.sourceLanguage,
          targetLanguages: meta.targetLanguages,
          domain: meta.domain,
          createdAt: meta.createdAt,
          active: liveSession?.active ?? false,
          // Session exists in Redis means it hasn't expired (24h TTL)
          exists: liveSession !== null,
        };
      })
    );

    // Compute stats
    const now = Date.now();
    const monthStart = new Date(now);
    monthStart.setDate(1);
    monthStart.setHours(0, 0, 0, 0);
    const monthStartTs = monthStart.getTime();

    const thisMonthSessions = sessions.filter((s) => s.createdAt >= monthStartTs);
    const languagesUsed = new Set<string>();
    let totalMinutes = 0;

    for (const s of thisMonthSessions) {
      s.targetLanguages.forEach((l) => languagesUsed.add(l));
      languagesUsed.add(s.sourceLanguage);
      // Estimate ~15 min per session as placeholder
      totalMinutes += 15;
    }

    return NextResponse.json({
      sessions: sessions.reverse(), // newest first
      stats: {
        totalMinutes,
        totalSessions: thisMonthSessions.length,
        languagesUsed: Array.from(languagesUsed),
      },
    });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

// DELETE a session from user's list
export async function DELETE(req: NextRequest) {
  try {
    const uid = req.cookies.get("translync_uid")?.value;
    if (!uid) {
      return NextResponse.json({ error: "No user ID" }, { status: 401 });
    }

    const { sessionId } = await req.json();
    if (!sessionId) {
      return NextResponse.json({ error: "sessionId required" }, { status: 400 });
    }

    // Remove matching entry from user's session list
    const rawList = await redis("lrange", `user:${uid}:sessions`, 0, -1);
    if (Array.isArray(rawList)) {
      for (const raw of rawList) {
        try {
          const meta = JSON.parse(raw);
          if (meta.id === sessionId) {
            await redis("lrem", `user:${uid}:sessions`, 1, raw);
            break;
          }
        } catch {
          // skip
        }
      }
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
