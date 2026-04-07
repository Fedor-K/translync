import { RTL_LOCALES, type Locale } from "@/lib/i18n";

const VALID_LOCALES = ["es", "zh", "ar"];

interface Props {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  const isRTL = RTL_LOCALES.includes(locale as Locale);

  return (
    <div lang={locale} dir={isRTL ? "rtl" : "ltr"}>
      {children}
    </div>
  );
}
