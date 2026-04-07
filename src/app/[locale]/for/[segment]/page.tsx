import { notFound } from "next/navigation";
import { SEGMENTS, SEGMENT_SLUGS } from "@/lib/segments";
import { TRANSLATIONS, LOCALE_NAMES, RTL_LOCALES, type Locale } from "@/lib/i18n";
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

const VALID_LOCALES = ["es", "zh", "ar"];

interface Props {
  params: Promise<{ locale: string; segment: string }>;
}

export async function generateStaticParams() {
  const params = [];
  for (const locale of VALID_LOCALES) {
    for (const segment of SEGMENT_SLUGS) {
      params.push({ locale, segment });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, segment } = await params;
  const data = SEGMENTS[segment];
  if (!data || !VALID_LOCALES.includes(locale)) return {};
  return {
    title: data.meta.title,
    description: data.meta.description,
    alternates: {
      canonical: `https://translync.app/${locale}/for/${segment}`,
      languages: {
        en: `https://translync.app/for/${segment}`,
        es: `https://translync.app/es/for/${segment}`,
        zh: `https://translync.app/zh/for/${segment}`,
        ar: `https://translync.app/ar/for/${segment}`,
      },
    },
  };
}

export default async function LocalizedSegmentPage({ params }: Props) {
  const { locale, segment } = await params;
  if (!VALID_LOCALES.includes(locale)) notFound();
  const data = SEGMENTS[segment];
  if (!data) notFound();

  const isRTL = RTL_LOCALES.includes(locale as Locale);

  return (
    <main className="min-h-screen bg-white" dir={isRTL ? "rtl" : "ltr"}>
      <SegmentHero hero={data.hero} />
      <div className="max-w-5xl mx-auto px-6 pt-6">
        <Breadcrumbs items={[{ label: LOCALE_NAMES[locale as Locale], href: `/${locale}` }, { label: data.label }]} />
      </div>
      <SegmentSocialProof orgs={data.socialProof} />
      <HowItWorks />
      <Features />
      <SegmentGlossary glossary={data.glossaryFeature} />
      <SegmentTestimonial testimonial={data.testimonial} />
      <Pricing />
      <SegmentFAQ faqs={data.faq} />
      <SegmentCTA cta={data.cta} />
      <Footer />
    </main>
  );
}
