import { notFound } from "next/navigation";
import { SEGMENTS, SEGMENT_SLUGS } from "@/lib/segments";
import { SEGMENT_TRANSLATIONS } from "@/lib/segments-i18n";
import { TRANSLATIONS, LOCALE_NAMES, RTL_LOCALES, type Locale } from "@/lib/i18n";
import type { Metadata } from "next";
import LocalizedFooter from "@/components/LocalizedFooter";
import SegmentHero from "@/components/SegmentHero";
import SegmentSocialProof from "@/components/SegmentSocialProof";
import SegmentTestimonial from "@/components/SegmentTestimonial";
import SegmentFAQ from "@/components/SegmentFAQ";
import SegmentCTA from "@/components/SegmentCTA";
import SegmentGlossary from "@/components/SegmentGlossary";
import Breadcrumbs from "@/components/Breadcrumbs";

const VALID_LOCALES = ["es", "zh", "ar", "pt"];

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
  if (!VALID_LOCALES.includes(locale)) return {};
  // Use translated meta if available, fallback to English
  const data = SEGMENT_TRANSLATIONS[locale]?.[segment] || SEGMENTS[segment];
  if (!data) return {};
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
        pt: `https://translync.app/pt/for/${segment}`,
      },
    },
  };
}

export default async function LocalizedSegmentPage({ params }: Props) {
  const { locale, segment } = await params;
  if (!VALID_LOCALES.includes(locale)) notFound();

  // Use translated content, fallback to English
  const data = SEGMENT_TRANSLATIONS[locale]?.[segment] || SEGMENTS[segment];
  if (!data) notFound();

  const isRTL = RTL_LOCALES.includes(locale as Locale);

  return (
    <main className="min-h-screen bg-white" dir={isRTL ? "rtl" : "ltr"}>
      <SegmentHero hero={data.hero} />
      <div className="max-w-5xl mx-auto px-6 pt-6">
        <Breadcrumbs items={[{ label: LOCALE_NAMES[locale as Locale], href: `/${locale}` }, { label: data.label }]} />
      </div>
      <SegmentSocialProof orgs={data.socialProof} />
      <SegmentGlossary glossary={data.glossaryFeature} />
      <SegmentTestimonial testimonial={data.testimonial} />
      <SegmentFAQ faqs={data.faq} />
      <SegmentCTA cta={data.cta} />
      <LocalizedFooter t={TRANSLATIONS[locale as keyof typeof TRANSLATIONS].footer} locale={locale} />
    </main>
  );
}
