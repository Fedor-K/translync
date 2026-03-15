const LANGUAGE_NAMES: Record<string, string> = {
  en: "English", es: "Spanish", fr: "French", de: "German",
  it: "Italian", pt: "Portuguese", ru: "Russian", zh: "Chinese",
  ja: "Japanese", ko: "Korean", ar: "Arabic", hi: "Hindi",
  nl: "Dutch", pl: "Polish", tr: "Turkish", sv: "Swedish",
  uk: "Ukrainian", ro: "Romanian", cs: "Czech", hu: "Hungarian",
};

export interface ContextEntry {
  original: string;
  translation: string;
}

let openaiKey: string | undefined;

async function translateOne(
  text: string,
  sourceLang: string,
  targetLang: string,
  context: ContextEntry[] = []
): Promise<string> {
  openaiKey ??= process.env.OPENAI_API_KEY;
  if (!openaiKey) throw new Error("OPENAI_API_KEY not set");

  const sourceName = LANGUAGE_NAMES[sourceLang] || sourceLang;
  const targetName = LANGUAGE_NAMES[targetLang] || targetLang;

  // Build context block from previous translations
  let contextBlock = "";
  if (context.length > 0) {
    contextBlock = "\n\nPrevious context (already translated, do NOT re-translate):\n" +
      context.map((c, i) => `[${i + 1}] "${c.original}" → "${c.translation}"`).join("\n") +
      "\n";
  }

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${openaiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4.1-nano",
      messages: [
        {
          role: "system",
          content: `You are a professional simultaneous interpreter translating live speech from ${sourceName} to ${targetName}. Output ONLY the translation, nothing else. Preserve tone, meaning, and style. Keep translations natural for spoken delivery.${contextBlock}`,
        },
        { role: "user", content: text },
      ],
      max_tokens: 500,
      temperature: 0.1,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`OpenAI ${res.status}: ${body}`);
  }

  const data = (await res.json()) as {
    choices: { message: { content: string } }[];
  };
  return data.choices[0]?.message?.content?.trim() || text;
}

// Per-session, per-language context windows
const contextWindows = new Map<string, ContextEntry[]>();
const CONTEXT_WINDOW_SIZE = 5;

function getContextKey(sessionId: string, lang: string): string {
  return `${sessionId}:${lang}`;
}

export function addContext(
  sessionId: string,
  lang: string,
  original: string,
  translation: string
): void {
  const key = getContextKey(sessionId, lang);
  let window = contextWindows.get(key);
  if (!window) {
    window = [];
    contextWindows.set(key, window);
  }
  window.push({ original, translation });
  if (window.length > CONTEXT_WINDOW_SIZE) {
    window.shift();
  }
}

export function getContext(sessionId: string, lang: string): ContextEntry[] {
  return contextWindows.get(getContextKey(sessionId, lang)) || [];
}

export function clearContext(sessionId: string): void {
  for (const key of contextWindows.keys()) {
    if (key.startsWith(`${sessionId}:`)) {
      contextWindows.delete(key);
    }
  }
}

export async function translateToMany(
  text: string,
  sourceLang: string,
  targetLangs: string[],
  sessionId?: string
): Promise<Record<string, string>> {
  const results: Record<string, string> = { [sourceLang]: text };

  await Promise.all(
    targetLangs
      .filter((lang) => lang !== sourceLang)
      .map(async (lang) => {
        try {
          const ctx = sessionId ? getContext(sessionId, lang) : [];
          const translation = await translateOne(text, sourceLang, lang, ctx);
          results[lang] = translation;

          // Update context window for this language
          if (sessionId) {
            addContext(sessionId, lang, text, translation);
          }
        } catch (err) {
          console.error(`[translate] ${lang} failed:`, (err as Error).message);
          results[lang] = text;
        }
      })
  );

  return results;
}
