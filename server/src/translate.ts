const LANGUAGE_NAMES: Record<string, string> = {
  en: "English", es: "Spanish", fr: "French", de: "German",
  it: "Italian", pt: "Portuguese", ru: "Russian", zh: "Chinese",
  ja: "Japanese", ko: "Korean", ar: "Arabic", hi: "Hindi",
  nl: "Dutch", pl: "Polish", tr: "Turkish", sv: "Swedish",
  uk: "Ukrainian", ro: "Romanian", cs: "Czech", hu: "Hungarian",
};

let openaiKey: string | undefined;

async function translateOne(
  text: string,
  sourceLang: string,
  targetLang: string
): Promise<string> {
  openaiKey ??= process.env.OPENAI_API_KEY;
  if (!openaiKey) throw new Error("OPENAI_API_KEY not set");

  const targetName = LANGUAGE_NAMES[targetLang] || targetLang;

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
          content: `You are a professional interpreter. Translate the following speech excerpt to ${targetName}. Output ONLY the translation, nothing else. Preserve tone and meaning.`,
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

export async function translateToMany(
  text: string,
  sourceLang: string,
  targetLangs: string[]
): Promise<Record<string, string>> {
  const results: Record<string, string> = { [sourceLang]: text };

  await Promise.all(
    targetLangs
      .filter((lang) => lang !== sourceLang)
      .map(async (lang) => {
        try {
          results[lang] = await translateOne(text, sourceLang, lang);
        } catch (err) {
          console.error(`[translate] ${lang} failed:`, (err as Error).message);
          results[lang] = text;
        }
      })
  );

  return results;
}
