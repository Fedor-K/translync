import { NextRequest, NextResponse } from "next/server";
import { processContent } from "@/services/content-processor";
import { publishPost, deletePost } from "@/services/blog-publisher";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    // Auth
    const authHeader = req.headers.get("authorization");
    const expectedKey = process.env.BLOG_API_KEY || "translync-blog-secret";
    if (authHeader !== `Bearer ${expectedKey}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    // Required fields
    const { title, content } = body;
    if (!title || !content) {
      return NextResponse.json({ error: "title and content are required" }, { status: 400 });
    }

    // Optional fields
    const keywords: string[] = body.keywords || [];
    const category: string = body.category || "guides";
    const segment: string | undefined = body.segment;
    const metaDescription: string | undefined = body.metaDescription;
    const excerpt: string | undefined = body.excerpt;

    // Process content (extract ToC, FAQ, reading time, etc.)
    const post = processContent(title, content, keywords, category, segment);

    // Override meta/excerpt/cover if provided
    if (metaDescription) post.metaDescription = metaDescription;
    if (excerpt) post.excerpt = excerpt;
    if (body.coverImage) post.coverImage = body.coverImage;

    // Publish to Redis
    await publishPost(post);

    return NextResponse.json({
      ok: true,
      id: post.slug,
      slug: post.slug,
      title: post.title,
      url: `/blog/${post.slug}`,
      readingTime: post.readingTime,
      faqCount: post.faq.length,
      tocCount: post.toc.length,
    });
  } catch (e) {
    console.error("[blog:create]", e);
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    const expectedKey = process.env.BLOG_API_KEY || "translync-blog-secret";
    if (authHeader !== `Bearer ${expectedKey}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { slug } = await req.json();
    if (!slug) {
      return NextResponse.json({ error: "slug is required" }, { status: 400 });
    }

    const found = await deletePost(slug);
    return NextResponse.json({ ok: true, deleted: found });
  } catch (e) {
    console.error("[blog:delete]", e);
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
