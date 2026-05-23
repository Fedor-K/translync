import { NextRequest, NextResponse } from "next/server";
import { generateBlogContent } from "@/services/content-generator";
import { processContent } from "@/services/content-processor";
import { publishPost, listSlugs } from "@/services/blog-publisher";
import { pickNextTopic, topicId as getTopicId } from "@/config/topics";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    // Simple auth — check for secret key
    const authHeader = req.headers.get("authorization");
    const expectedKey = process.env.BLOG_API_KEY || "translync-blog-secret";
    if (authHeader !== `Bearer ${expectedKey}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json().catch(() => ({}));
    const usedSlugs = await listSlugs();

    // Either use provided topic or pick from pool
    let topic: string;
    let keywords: string[];
    let category: string;
    let segment: string | undefined;
    let seedTopicId: string | undefined;

    if (body.topic) {
      topic = body.topic;
      keywords = body.keywords || [];
      category = body.category || "guides";
      segment = body.segment;
    } else {
      const next = pickNextTopic(usedSlugs);
      if (!next) {
        return NextResponse.json({ error: "No more topics in pool" }, { status: 404 });
      }
      topic = next.topic;
      keywords = next.keywords;
      category = next.category;
      segment = next.segment;
      seedTopicId = getTopicId(next.topic);
    }

    // 1. Generate content via AI
    const { title, content } = await generateBlogContent(topic, keywords, segment);

    // 2. Process content (extract ToC, FAQ, meta, etc.)
    const post = processContent(title, content, keywords, category, segment);
    if (seedTopicId) post.topicId = seedTopicId;

    // 3. Publish to Redis
    await publishPost(post);

    return NextResponse.json({
      ok: true,
      slug: post.slug,
      title: post.title,
      url: `/blog/${post.slug}`,
      readingTime: post.readingTime,
      faqCount: post.faq.length,
      tocCount: post.toc.length,
    });
  } catch (e) {
    console.error("[blog:generate]", e);
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
