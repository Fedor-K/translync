import { notFound } from "next/navigation";
import { SEGMENTS, SEGMENT_SLUGS, INDEXED_SEGMENTS } from "@/lib/segments";
import type { Metadata } from "next";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";
import SegmentHero from "@/components/SegmentHero";
import SegmentSocialProof from "@/components/SegmentSocialProof";
import SegmentTestimonial from "@/components/SegmentTestimonial";
import SegmentFAQ from "@/components/SegmentFAQ";
import SegmentCTA from "@/components/SegmentCTA";
import SegmentGlossary from "@/components/SegmentGlossary";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedPosts from "@/components/RelatedPosts";

interface Props {
  params: Promise<{ segment: string }>;
}

// This page now links to blog posts, which are published continuously. Rebuild
// hourly so the links reflect what exists, not what existed at the last deploy.
export const revalidate = 3600;

export async function generateStaticParams() {
  return SEGMENT_SLUGS.map((segment) => ({ segment }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { segment } = await params;
  const data = SEGMENTS[segment];
  if (!data) return {};
  return {
    title: data.meta.title,
    description: data.meta.description,
    // The root layout hardcodes the homepage as canonical, so without this
    // override each segment page tells Google to index the homepage instead of
    // itself — and Google obeys ("Alternate page with proper canonical tag").
    alternates: { canonical: `https://translync.app/for/${segment}` },
    // Segments the site does not compete for in search are noindexed rather than
    // deleted: the page is still where outreach and ads land, and conversion
    // matters more than coverage. See INDEXED_SEGMENTS for the measured reason.
    ...(INDEXED_SEGMENTS.includes(segment) ? {} : { robots: { index: false, follow: true } }),
  };
}

export default async function SegmentPage({ params }: Props) {
  const { segment } = await params;
  const data = SEGMENTS[segment];
  if (!data) notFound();

  return (
    <main className="min-h-screen bg-white">
      <SegmentHero hero={data.hero} />
      <div className="max-w-5xl mx-auto px-6 pt-6">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: data.label }]} />
      </div>
      <SegmentSocialProof orgs={data.socialProof} />
      <HowItWorks />
      <Features />
      <SegmentGlossary glossary={data.glossaryFeature} />
      <SegmentTestimonial testimonial={data.testimonial} />
      <Pricing />
      <SegmentFAQ faqs={data.faq} />
      <div className="max-w-5xl mx-auto px-6 pt-12">
        <RelatedPosts
          match={[segment, segment.replace(/s$/, ""), data.label.toLowerCase()]}
          heading={`Guides for ${data.label.toLowerCase()}`}
          limit={4}
        />
      </div>
      <SegmentCTA cta={data.cta} />
      <Footer />
    </main>
  );
}
