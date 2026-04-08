import { type Locale, RTL_LOCALES } from "@/lib/i18n";

interface FooterTranslations {
  product: string;
  solutions: string;
  legal: string;
  privacyPolicy: string;
  termsOfService: string;
  contact: string;
  forChurches: string;
  forNGOs: string;
  forUniversities: string;
  forCommunities: string;
  copyright: string;
  blog: string;
}

export default function LocalizedFooter({
  t,
  locale,
}: {
  t: FooterTranslations;
  locale: string;
}) {
  const prefix = `/${locale}`;

  return (
    <footer className="bg-gray-900 text-gray-400 py-12">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-10">
          <div>
            <div className="text-white font-bold text-xl mb-2">Translync</div>
            <p className="text-sm max-w-xs leading-relaxed">
              {t.copyright.replace("© 2026 Translync. ", "").replace("All rights reserved.", "").trim() ||
                "Real-time AI translation for events, churches, NGOs, and conferences."}
            </p>
          </div>

          <div className="flex flex-wrap gap-12 sm:gap-16">
            <div>
              <h4 className="text-white text-sm font-semibold mb-3">{t.product}</h4>
              <ul className="space-y-2 text-sm">
                <li><a href={`${prefix}#how-it-works`} className="hover:text-white transition-colors">{t.product === "Producto" ? "Cómo funciona" : t.product === "产品" ? "工作原理" : t.product === "المنتج" ? "كيف يعمل" : "How it works"}</a></li>
                <li><a href={`${prefix}#pricing`} className="hover:text-white transition-colors">{t.product === "Producto" ? "Precios" : t.product === "产品" ? "价格" : t.product === "المنتج" ? "الأسعار" : "Pricing"}</a></li>
                <li><a href={`${prefix}#faq`} className="hover:text-white transition-colors">{t.product === "Producto" ? "Preguntas frecuentes" : t.product === "产品" ? "常见问题" : t.product === "المنتج" ? "الأسئلة الشائعة" : "FAQ"}</a></li>
                <li><a href="/blog" className="hover:text-white transition-colors">{t.blog}</a></li>
                <li><a href="/translation" className="hover:text-white transition-colors">{t.product === "Producto" ? "Servicios de traducción" : t.product === "产品" ? "翻译服务" : t.product === "المنتج" ? "خدمات الترجمة" : "Translation Services"}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white text-sm font-semibold mb-3">{t.solutions}</h4>
              <ul className="space-y-2 text-sm">
                <li><a href={`${prefix}/for/churches`} className="hover:text-white transition-colors">{t.forChurches}</a></li>
                <li><a href={`${prefix}/for/ngos`} className="hover:text-white transition-colors">{t.forNGOs}</a></li>
                <li><a href={`${prefix}/for/universities`} className="hover:text-white transition-colors">{t.forUniversities}</a></li>
                <li><a href={`${prefix}/for/communities`} className="hover:text-white transition-colors">{t.forCommunities}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white text-sm font-semibold mb-3">{t.legal}</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/privacy" className="hover:text-white transition-colors">{t.privacyPolicy}</a></li>
                <li><a href="/terms" className="hover:text-white transition-colors">{t.termsOfService}</a></li>
                <li><a href="mailto:hello@translync.app" className="hover:text-white transition-colors">{t.contact}</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-8 text-center text-sm">
          <span>{t.copyright}</span>
        </div>
      </div>
    </footer>
  );
}
