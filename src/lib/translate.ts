import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const LANGUAGE_NAMES: Record<string, string> = {
  en: "English", es: "Spanish", fr: "French", de: "German",
  it: "Italian", pt: "Portuguese", ru: "Russian", zh: "Chinese",
  ja: "Japanese", ko: "Korean", ar: "Arabic", hi: "Hindi",
  nl: "Dutch", pl: "Polish", tr: "Turkish", sv: "Swedish",
  uk: "Ukrainian", ro: "Romanian", cs: "Czech", hu: "Hungarian",
};

export async function translateText(
  text: string,
  targetLang: string,
  sourceLang = "en"
): Promise<string> {
  if (!text.trim()) return "";
  if (targetLang === sourceLang) return text;

  const targetName = LANGUAGE_NAMES[targetLang] || targetLang;

  const response = await client.chat.completions.create({
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
  });

  return response.choices[0]?.message?.content?.trim() || text;
}

export async function translateToMany(
  text: string,
  targetLangs: string[],
  sourceLang = "en"
): Promise<Record<string, string>> {
  const results: Record<string, string> = { [sourceLang]: text };

  await Promise.all(
    targetLangs
      .filter((lang) => lang !== sourceLang)
      .map(async (lang) => {
        try {
          results[lang] = await translateText(text, lang, sourceLang);
        } catch {
          results[lang] = text; // fallback to original
        }
      })
  );

  return results;
}

export { LANGUAGE_NAMES };
