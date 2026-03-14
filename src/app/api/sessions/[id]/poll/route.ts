import { NextRequest, NextResponse } from "next/server";
import { getSession, getChunksSince } from "@/lib/sessions";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = getSession(id);
  if (!session) {
    return NextResponse.json({ error: "Session not found" }, { status: 404 });
  }

  const since = Number(req.nextUrl.searchParams.get("since") || "0");
  const lang = req.nextUrl.searchParams.get("lang") || session.sourceLanguage;

  const chunks = getChunksSince(id, since);

  return NextResponse.json({
    sessionId: session.id,
    active: session.active,
    sourceLanguage: session.sourceLanguage,
    targetLanguages: session.targetLanguages,
    chunks: chunks.map((c) => ({
      id: c.id,
      timestamp: c.timestamp,
      text: c.translations[lang] || c.original,
    })),
    serverTime: Date.now(),
  });
}
