import { NextRequest, NextResponse } from "next/server";
import { createSession, redis } from "@/lib/sessions";
import { cookies } from "next/headers";
import { auth } from "@/auth";

export const dynamic = "force-dynamic";

function generateUid(): string {
  return "u_" + Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

export async function POST(req: NextRequest) {
  try {
    const { targetLanguages, sourceLanguage, domain, customGlossary, name } = await req.json();

    if (!targetLanguages || !Array.isArray(targetLanguages) || targetLanguages.length === 0) {
      return NextResponse.json({ error: "targetLanguages required" }, { status: 400 });
    }

    const src = sourceLanguage || "en";
    const sessionName = typeof name === "string" ? name.trim().slice(0, 100) : undefined;
    const session = await createSession(targetLanguages, src, domain, customGlossary, sessionName);
    const langsParam = targetLanguages.join(",");

    const rtUrl = process.env.NEXT_PUBLIC_RT_URL || "http://localhost:3001";

    // Use auth session user ID, or fallback to cookie
    const authSession = await auth();
    const cookieStore = await cookies();
    let uid = authSession?.user?.id || cookieStore.get("translync_uid")?.value;
    if (!uid) {
      uid = generateUid();
    }

    // Store session association for this user (expire in 30 days)
    const sessionMeta = JSON.stringify({
      id: session.id,
      name: sessionName || undefined,
      sourceLanguage: src,
      targetLanguages,
      domain: domain || "general",
      createdAt: session.createdAt,
    });
    await redis("rpush", `user:${uid}:sessions`, sessionMeta);
    await redis("expire", `user:${uid}:sessions`, 2592000); // 30 days

    const response = NextResponse.json({
      sessionId: session.id,
      rtUrl,
      listenUrl: `/listen/${session.id}?src=${src}&langs=${langsParam}`,
      organizerUrl: `/session/${session.id}?src=${src}&langs=${langsParam}`,
    });

    // Set cookie if new
    response.cookies.set("translync_uid", uid, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 365, // 1 year
      path: "/",
    });

    return response;
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
