import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/session/", "/listen/", "/api/"],
    },
    sitemap: "https://translync.app/sitemap.xml",
  };
}
