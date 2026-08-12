import { listPosts, type PostSummary } from "@/services/blog-publisher";

/**
 * listPosts() that cannot take a page or a build down with it.
 *
 * The Redis helper calls fetch with no timeout, so an unreachable or slow store
 * does not fail — it hangs. That turned out to matter the moment blog links were
 * added to statically-generated pages: a build that used to be independent of
 * Redis now waits on it, and Next kills a page that takes over 60 seconds. A
 * try/catch is no defence against hanging, only against throwing.
 *
 * Blog links are an enhancement, never the reason a page exists, so the right
 * failure is to render the page without them.
 */
const TIMEOUT_MS = 5000;

export async function safeListPosts(timeoutMs = TIMEOUT_MS): Promise<PostSummary[]> {
  try {
    return await Promise.race([
      listPosts(),
      new Promise<PostSummary[]>((_, reject) => {
        const timer = setTimeout(() => reject(new Error("listPosts timed out")), timeoutMs);
        // Don't hold the process open just for the loser of the race.
        (timer as unknown as { unref?: () => void }).unref?.();
      }),
    ]);
  } catch {
    return [];
  }
}
