import { NextRequest, NextResponse } from "next/server";
import { createSession } from "@/lib/sessions";

export async function POST(req: NextRequest) {
  try {
    const { targetLanguages, sourceLanguage } = await req.json();

    if (!targetLanguages || !Array.isArray(targetLanguages) || targetLanguages.length === 0) {
      return NextResponse.json({ error: "targetLanguages required" }, { status: 400 });
    }

    const session = createSession(targetLanguages, sourceLanguage || "en");

    return NextResponse.json({
      sessionId: session.id,
      listenUrl: `/listen/${session.id}`,
      organizerUrl: `/session/${session.id}`,
    });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
