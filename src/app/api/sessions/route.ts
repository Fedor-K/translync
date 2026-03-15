import { NextRequest, NextResponse } from "next/server";
import { createSession } from "@/lib/sessions";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { targetLanguages, sourceLanguage, domain, customGlossary } = await req.json();

    if (!targetLanguages || !Array.isArray(targetLanguages) || targetLanguages.length === 0) {
      return NextResponse.json({ error: "targetLanguages required" }, { status: 400 });
    }

    const src = sourceLanguage || "en";
    const session = await createSession(targetLanguages, src, domain, customGlossary);
    const langsParam = targetLanguages.join(",");

    const rtUrl = process.env.NEXT_PUBLIC_RT_URL || "http://localhost:3001";

    return NextResponse.json({
      sessionId: session.id,
      rtUrl,
      listenUrl: `/listen/${session.id}?src=${src}&langs=${langsParam}`,
      organizerUrl: `/session/${session.id}?src=${src}&langs=${langsParam}`,
    });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
