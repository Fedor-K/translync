import type { NextConfig } from "next";
import { LEGACY_REDIRECTS } from "./src/lib/programmatic-seo";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // The retired event × language matrix: 240 URLs, 25 impressions and zero
      // clicks between them. Each one 301s to the page that now covers it.
      ...LEGACY_REDIRECTS.map((r) => ({ ...r, permanent: true })),

      { source: "/auth/signup", destination: "/login", permanent: true },
      { source: "/register", destination: "/login", permanent: true },
      { source: "/signup", destination: "/login", permanent: true },

      // The translated marketing pages are gone. Google had indexed 19 of them
      // and shown them to nobody in 28 days, so they were costing crawl budget
      // and returning nothing. 301 rather than 404: whatever little authority
      // they hold moves to the English page instead of evaporating, and anyone
      // holding an old link still lands somewhere real.
      { source: "/:locale(es|zh|ar|pt)", destination: "/", permanent: true },
      { source: "/:locale(es|zh|ar|pt)/:path*", destination: "/:path*", permanent: true },
    ];
  },
};

export default nextConfig;
