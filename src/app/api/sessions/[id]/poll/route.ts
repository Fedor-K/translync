import { NextRequest, NextResponse } from "next/server";
import { getSession, getChunksSince } from "@/lib/sessions";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const since = Number(req.nextUrl.searchParams.get("since") || "0");
  const lang = req.nextUrl.searchParams.get("lang") || "en";

  const session = getSession(id);
  const chunks = session ? getChunksSince(id, since) : [];

  return NextResponse.json({
    sessionId: id,
    active: session ? session.active : true,
    chunks: chunks.map((c) => ({
      id: c.id,
      timestamp: c.timestamp,
      text: c.translations[lang] || c.original,
    })),
    serverTime: Date.now(),
  });
}
