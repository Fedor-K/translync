import { NextRequest, NextResponse } from "next/server";
import QRCode from "qrcode";
import { getSession } from "@/lib/sessions";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const sessionId = id.toUpperCase();

  // Try to get session info for building the full URL
  const session = await getSession(sessionId);
  const src = req.nextUrl.searchParams.get("src") || session?.sourceLanguage || "en";
  const langs = req.nextUrl.searchParams.get("langs") || session?.targetLanguages?.join(",") || "";

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://translync.vercel.app";
  const listenUrl = `${baseUrl}/listen/${sessionId}?src=${src}&langs=${langs}`;

  try {
    const pngBuffer = await QRCode.toBuffer(listenUrl, {
      type: "png",
      width: 400,
      margin: 2,
      color: {
        dark: "#1a1a2e",
        light: "#ffffff",
      },
    });

    return new NextResponse(new Uint8Array(pngBuffer), {
      status: 200,
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
