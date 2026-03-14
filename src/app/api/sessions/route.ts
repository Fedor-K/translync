import { NextRequest, NextResponse } from "next/server";
import { createSession } from "@/lib/sessions";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { targetLanguages, sourceLanguage } = await req.json();

    if (!targetLanguages || !Array.isArray(targetLanguages) || targetLanguages.length === 0) {
      return NextResponse.json({ error: "targetLanguages required" }, { status: 400 });
    }

    const src = sourceLanguage || "en";
    const session = await createSession(targetLanguages, src);
    const langsParam = targetLanguages.join(",");

    return NextResponse.json({
      sessionId: session.id,
      listenUrl: `/listen/${session.id}?src=${src}&langs=${langsParam}`,
      organizerUrl: `/session/${session.id}?src=${src}&langs=${langsParam}`,
    });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
