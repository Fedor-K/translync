import { notFound } from "next/navigation";
import { SEGMENTS, SEGMENT_SLUGS } from "@/lib/segments";
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

interface Props {
  params: Promise<{ segment: string }>;
}

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
  };
}

export default async function SegmentPage({ params }: Props) {
  const { segment } = await params;
  const data = SEGMENTS[segment];
  if (!data) notFound();

  return (
    <main className="min-h-screen bg-white">
      <SegmentHero hero={data.hero} />
      <SegmentSocialProof orgs={data.socialProof} />
      <HowItWorks />
      <Features />
      <SegmentTestimonial testimonial={data.testimonial} />
      <Pricing />
      <SegmentFAQ faqs={data.faq} />
      <SegmentCTA cta={data.cta} />
      <Footer />
    </main>
  );
}
