import { type Locale, LOCALES } from "./i18n";

/**
 * Get user's preferred locale from cookie or Accept-Language header.
 * Returns "en" if no match found.
 *
 * Currently unused: its only caller was the translated marketing routes, which
 * have been removed. Kept because the app's own interface is still multilingual
 * and server-side detection is the natural way to pick its default.
 */
export function detectLocale(cookieValue?: string, acceptLanguage?: string): Locale {
  // 1. Check cookie first (user's explicit choice)
  if (cookieValue && LOCALES.includes(cookieValue as Locale)) {
    return cookieValue as Locale;
  }

  // 2. Parse Accept-Language header
  if (acceptLanguage) {
    const preferred = acceptLanguage
      .split(",")
      .map((part) => {
        const [lang, q] = part.trim().split(";q=");
        return { lang: lang.trim().split("-")[0].toLowerCase(), q: q ? parseFloat(q) : 1 };
      })
      .sort((a, b) => b.q - a.q);

    for (const { lang } of preferred) {
      if (LOCALES.includes(lang as Locale)) {
        return lang as Locale;
      }
    }
  }

  return "en";
}

export const LOCALE_COOKIE = "translync_locale";
