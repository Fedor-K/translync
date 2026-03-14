import { NextRequest, NextResponse } from "next/server";
import { getSession, addChunk } from "@/lib/sessions";
import { translateToMany } from "@/lib/translate";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = getSession(id);
    if (!session) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }
    if (!session.active) {
      return NextResponse.json({ error: "Session ended" }, { status: 400 });
    }

    // Get audio blob from request
    const audioBuffer = await req.arrayBuffer();
    if (!audioBuffer.byteLength) {
      return NextResponse.json({ error: "No audio data" }, { status: 400 });
    }

    // Transcribe with Deepgram
    const deepgramKey = process.env.DEEPGRAM_API_KEY;
    if (!deepgramKey) {
      return NextResponse.json({ error: "DEEPGRAM_API_KEY not set" }, { status: 500 });
    }

    const contentType = req.headers.get("x-audio-type") || "audio/webm";

    const dgResponse = await fetch(
      `https://api.deepgram.com/v1/listen?language=${session.sourceLanguage}&punctuate=true&model=nova-3`,
      {
        method: "POST",
        headers: {
          Authorization: `Token ${deepgramKey}`,
          "Content-Type": contentType,
        },
        body: audioBuffer,
      }
    );

    if (!dgResponse.ok) {
      const err = await dgResponse.text();
      return NextResponse.json({ error: `Deepgram error: ${err}` }, { status: 500 });
    }

    const dgData = await dgResponse.json();
    const transcript =
      dgData?.results?.channels?.[0]?.alternatives?.[0]?.transcript || "";

    if (!transcript.trim()) {
      return NextResponse.json({ transcript: "", translations: {} });
    }

    // Translate to all target languages
    const translations = await translateToMany(
      transcript,
      session.targetLanguages,
      session.sourceLanguage
    );

    const chunk = {
      id: Math.random().toString(36).slice(2),
      timestamp: Date.now(),
      original: transcript,
      translations,
    };

    addChunk(id, chunk);

    return NextResponse.json({ transcript, translations, chunkId: chunk.id });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
