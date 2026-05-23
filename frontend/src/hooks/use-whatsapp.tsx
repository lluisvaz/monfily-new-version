import { useCallback, useEffect, useState } from "react";
import { useLanguage } from "@/hooks/use-language";
import { translations } from "@/lib/translations";
import { trackMetaLead } from "@/lib/meta-pixel";
import {
  buildWhatsAppUrl,
  getWhatsAppCtaMessage,
  resolveMarketKey,
  type MarketKey,
} from "@/lib/whatsapp";

/**
 * Resolves the destination WhatsApp number for a market from the backend
 * (EVOLUTION_{COUNTRY}_NUMBER, served by /api/whatsapp-number). Returns the
 * provided fallback immediately and upgrades to the backend number once it
 * loads, so links are never broken and click handlers stay synchronous
 * (avoiding popup blockers).
 */
export function useWhatsAppNumber(market: MarketKey, fallback: string): string {
  const [number, setNumber] = useState(fallback);

  useEffect(() => {
    setNumber(fallback);
    let active = true;

    fetch(`/api/whatsapp-number?market=${market}`)
      .then((response) => (response.ok ? response.json() : null))
      .then((data: { number?: string | null } | null) => {
        if (active && data?.number) {
          setNumber(String(data.number));
        }
      })
      .catch(() => {
        /* keep fallback */
      });

    return () => {
      active = false;
    };
  }, [market, fallback]);

  return number;
}

/**
 * Site-wide WhatsApp CTA used by the Home page buttons (header/hero/services).
 * Resolves the country number + a translated opener message, fires the Meta
 * Lead pixel and opens WhatsApp.
 */
export function useWhatsAppCta() {
  const { language, detectedCountry } = useLanguage();
  const market = resolveMarketKey(language, detectedCountry);
  const fallback = translations[language].whatsappNumber;
  const number = useWhatsAppNumber(market, fallback);

  const open = useCallback(() => {
    trackMetaLead({ marketKey: market });
    window.open(buildWhatsAppUrl(number, getWhatsAppCtaMessage(language)), "_blank");
  }, [number, market, language]);

  return { number, market, open };
}
