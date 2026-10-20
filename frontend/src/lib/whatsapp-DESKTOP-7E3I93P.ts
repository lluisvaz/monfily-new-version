import type { Language } from "@/lib/translations";

export type MarketKey = "PT" | "IT" | "ES" | "SG" | "BR" | "GB" | "US";

export const SITE_WHATSAPP_CTA_NUMBER = "12139948185";

/** ISO country code -> contact market. */
export const MARKET_BY_COUNTRY: Record<string, MarketKey> = {
  PT: "PT",
  IT: "IT",
  ES: "ES",
  SG: "SG",
  BR: "BR",
  GB: "GB",
  UK: "GB",
  US: "US",
};

/** Market each site language talks to. `en` defaults to GB to match the legacy default number. */
export function marketForLanguage(language: Language): MarketKey {
  switch (language) {
    case "pt-br":
      return "BR";
    case "pt-pt":
      return "PT";
    case "es":
      return "ES";
    case "it":
      return "IT";
    case "sg":
      return "SG";
    case "en":
    default:
      return "GB";
  }
}

/** Resolve the market from the detected country first, falling back to the page language. */
export function resolveMarketKey(language: Language, country?: string | null): MarketKey {
  const upper = country?.toUpperCase();
  if (upper && MARKET_BY_COUNTRY[upper]) return MARKET_BY_COUNTRY[upper];
  return marketForLanguage(language);
}

/** Generic, translated WhatsApp opener message used by the site-wide CTA buttons (no form). */
export const WHATSAPP_CTA_BY_LANGUAGE: Record<Language, string> = {
  "pt-br": "Olá! Vim pelo site da Monfily e gostaria de saber mais.",
  "pt-pt": "Olá! Vim pelo site da Monfily e gostaria de saber mais.",
  en: "Hi! I came from the Monfily website and would like to know more.",
  es: "¡Hola! Vengo del sitio de Monfily y me gustaría saber más.",
  it: "Ciao! Vengo dal sito di Monfily e vorrei saperne di più.",
  sg: "Hi! I came from the Monfily website and would like to know more.",
};

export function getWhatsAppCtaMessage(language: Language): string {
  return WHATSAPP_CTA_BY_LANGUAGE[language] ?? WHATSAPP_CTA_BY_LANGUAGE.en;
}

export function buildWhatsAppUrl(number: string, message?: string): string {
  const base = `https://wa.me/${number}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
