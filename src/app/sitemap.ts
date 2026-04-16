import { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/programmatic-seo";
import { COMPETITOR_SLUGS } from "@/lib/competitors";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://translync.app";
  const locales = ["es", "zh", "ar", "pt"];
  const segments = ["churches", "ngos", "universities", "communities"];

  const entries: MetadataRoute.Sitemap = [
    // English pages
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/login`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/blog`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
    { url: `${base}/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/terms`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];

  // English segment pages
  for (const seg of segments) {
    entries.push({ url: `${base}/for/${seg}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 });
  }

  // Localized homepages
  for (const locale of locales) {
    entries.push({ url: `${base}/${locale}`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 });
  }

  // Localized segment pages
  for (const locale of locales) {
    for (const seg of segments) {
      entries.push({ url: `${base}/${locale}/for/${seg}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 });
    }
  }

  // Comparison pages
  entries.push({ url: `${base}/vs`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 });
  for (const comp of COMPETITOR_SLUGS) {
    entries.push({ url: `${base}/vs/${comp}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 });
  }
  entries.push({ url: `${base}/best-church-translation-app`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 });
  entries.push({ url: `${base}/zoom-interpretation-alternative`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 });

  // Localized Zoom pages
  for (const locale of locales) {
    entries.push({ url: `${base}/${locale}/zoom-interpretation-alternative`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
  }

  // Programmatic SEO pages
  entries.push({ url: `${base}/translation`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 });
  for (const slug of getAllSlugs()) {
    entries.push({ url: `${base}/translation/${slug}`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 });
  }

  return entries;
}
