import { BLOG_SYSTEM_PROMPT, buildTopicPrompt } from "@/config/prompts";

export async function generateBlogContent(
  topic: string,
  keywords: string[],
  segment?: string,
): Promise<{ title: string; content: string }> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("OPENAI_API_KEY not set");

  const userPrompt = buildTopicPrompt(topic, keywords, segment);

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4.1-mini",
      messages: [
        { role: "system", content: BLOG_SYSTEM_PROMPT },
        { role: "user", content: userPrompt },
      ],
      max_tokens: 4000,
      temperature: 0.7,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`OpenAI ${res.status}: ${body}`);
  }

  const data = (await res.json()) as {
    choices: { message: { content: string } }[];
  };

  const raw = data.choices[0]?.message?.content?.trim() || "";

  // Parse: first line is title, rest is content
  const lines = raw.split("\n");
  const title = lines[0].replace(/^#\s*/, "").trim();
  const content = lines.slice(1).join("\n").trim();

  return { title, content };
}
