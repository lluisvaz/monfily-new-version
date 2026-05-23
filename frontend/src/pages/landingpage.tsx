import { useEffect, useMemo, useState } from "react";
import { SectionLayout } from "@/components/landing/section-layout";
import { detectLocationData } from "@/lib/geo-location";
import { trackMetaPurchase } from "@/lib/meta-pixel";
import { getWhatsAppNumber, type Language } from "@/lib/translations";

export type MarketKey = "PT" | "IT" | "ES" | "IL" | "SG" | "BR" | "GB" | "US";

type Copy = {
  eyebrow: string;
  titlePrefix: string;
  titlePriceConnector: string;
  subtitle: string;
  step: string;
  question: string;
  options: string[];
  next: string;
  formTitle: string;
  formSubtitle: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  instagram: string;
  instagramPlaceholder: string;
  back: string;
  submit: string;
  footer: string;
  reserved: string;
};

type SeoCopy = {
  title: string;
  description: string;
  ogLocale: string;
};

type LandingPurchaseResult = {
  eventId?: string;
  message?: string;
  purchase?: {
    value?: number;
    currency?: string;
  };
};

const MARKET_BY_COUNTRY: Record<string, MarketKey> = {
  PT: "PT",
  IT: "IT",
  ES: "ES",
  IL: "IL",
  SG: "SG",
  BR: "BR",
  GB: "GB",
  UK: "GB",
  US: "US",
};

const SEO_BY_MARKET: Record<MarketKey, SeoCopy> = {
  PT: {
    title: "Landing page premium para vender online | Monfily",
    description: "Criação de landing page premium para produtos, serviços e negócios em Portugal. Responda ao quiz e receba uma proposta para vender mais online.",
    ogLocale: "pt_PT",
  },
  IT: {
    title: "Landing page premium per vendere online | Monfily",
    description: "Creazione di landing page premium per prodotti, servizi e business in Italia. Rispondi al quiz e ricevi una proposta per vendere di più online.",
    ogLocale: "it_IT",
  },
  ES: {
    title: "Landing page premium para vender online | Monfily",
    description: "Creación de landing page premium para productos, servicios y negocios en España. Responde al quiz y recibe una propuesta para vender más online.",
    ogLocale: "es_ES",
  },
  IL: {
    title: "דף נחיתה פרימיום למכירה באינטרנט | Monfily",
    description: "יצירת דף נחיתה פרימיום למוצרים, שירותים ועסקים בישראל. ענו על השאלון וקבלו הצעה שתעזור לכם למכור יותר באינטרנט.",
    ogLocale: "he_IL",
  },
  SG: {
    title: "Premium landing page to sell online | Monfily",
    description: "Premium landing page creation for products, services and businesses in Singapore. Answer the quiz and get a proposal to sell more online.",
    ogLocale: "en_SG",
  },
  BR: {
    title: "Landing page premium para vender online | Monfily",
    description: "Criação de landing page premium para produtos, serviços e negócios no Brasil. Responda ao quiz e receba uma proposta para vender mais pela internet.",
    ogLocale: "pt_BR",
  },
  GB: {
    title: "Premium landing page to sell online | Monfily",
    description: "Premium landing page creation for products, services and businesses in the United Kingdom. Answer the quiz and get a proposal to sell more online.",
    ogLocale: "en_GB",
  },
  US: {
    title: "Premium landing page to sell online | Monfily",
    description: "Premium landing page creation for products, services and businesses in the United States. Answer the quiz and get a proposal to sell more online.",
    ogLocale: "en_US",
  },
};

const MARKETS: Record<MarketKey, {
  locale: string;
  price: string;
  phonePrefix: string;
  phonePlaceholder: string;
  phoneDigits: number;
  copy: Copy;
}> = {
  PT: {
    locale: "pt-PT",
    price: "397 €",
    phonePrefix: "+351 ",
    phonePlaceholder: "+351 912 345 678",
    phoneDigits: 9,
    copy: {
      eyebrow: "RESPOSTA RÁPIDA",
      titlePrefix: "Landing page premium",
      titlePriceConnector: "por apenas",
      subtitle: "Responda a duas perguntas rápidas e entramos em contacto consigo.",
      step: "Etapa",
      question: "Você já tem um produto, serviço ou negócio que quer vender pela internet?",
      options: ["Sim, já tenho e quero vender mais", "Ainda estou a começar e quero estruturar"],
      next: "Continuar",
      formTitle: "Agora deixe os seus dados",
      formSubtitle: "Vamos analisar o seu momento e contactar pelo canal correto.",
      name: "Nome",
      company: "Nome da empresa",
      email: "Email",
      instagram: "Instagram do seu negócio",
      instagramPlaceholder: "seu_usuario",
      phone: "Telefone",
      back: "Voltar",
      submit: "FALAR NO WHATSAPP AGORA",
      footer: "Monfily Digital",
      reserved: "Todos os Direitos Reservados",
    },
  },
  IT: {
    locale: "it-IT",
    price: "397 €",
    phonePrefix: "+39 ",
    phonePlaceholder: "+39 312 345 6789",
    phoneDigits: 10,
    copy: {
      eyebrow: "RISPOSTA RAPIDA",
      titlePrefix: "Landing page premium",
      titlePriceConnector: "a soli",
      subtitle: "Rispondi a due domande rapide e ti contatteremo subito.",
      step: "Passo",
      question: "Hai già un prodotto, servizio o business che vuoi vendere online?",
      options: ["Sì, ce l'ho già e voglio vendere di più", "Sto iniziando e voglio strutturarlo"],
      next: "Continua",
      formTitle: "Ora lascia i tuoi dati",
      formSubtitle: "Analizzeremo il tuo momento e ti contatteremo dal canale giusto.",
      name: "Nome",
      company: "Nome dell'azienda",
      email: "Email",
      instagram: "Instagram della tua attività",
      instagramPlaceholder: "tuo_utente",
      phone: "Telefono",
      back: "Indietro",
      submit: "PARLA SU WHATSAPP ORA",
      footer: "Monfily Digital",
      reserved: "Tutti i diritti riservati",
    },
  },
  ES: {
    locale: "es-ES",
    price: "597 €",
    phonePrefix: "+34 ",
    phonePlaceholder: "+34 612 345 678",
    phoneDigits: 9,
    copy: {
      eyebrow: "RESPUESTA RÁPIDA",
      titlePrefix: "Landing page premium",
      titlePriceConnector: "por solo",
      subtitle: "Responde dos preguntas rápidas y te contactamos enseguida.",
      step: "Paso",
      question: "¿Ya tienes un producto, servicio o negocio que quieres vender por internet?",
      options: ["Sí, ya lo tengo y quiero vender más", "Estoy empezando y quiero estructurarlo"],
      next: "Continuar",
      formTitle: "Ahora deja tus datos",
      formSubtitle: "Analizaremos tu momento y te contactaremos por el canal correcto.",
      name: "Nombre",
      company: "Nombre de la empresa",
      email: "Email",
      instagram: "Instagram de tu negocio",
      instagramPlaceholder: "tu_usuario",
      phone: "Teléfono",
      back: "Volver",
      submit: "HABLAR POR WHATSAPP AHORA",
      footer: "Monfily Digital",
      reserved: "Todos los derechos reservados",
    },
  },
  IL: {
    locale: "he-IL",
    price: "₪1.700",
    phonePrefix: "+972 ",
    phonePlaceholder: "+972 50 123 4567",
    phoneDigits: 9,
    copy: {
      eyebrow: "תשובה מהירה",
      titlePrefix: "דף נחיתה פרימיום",
      titlePriceConnector: "במחיר",
      subtitle: "ענה על שתי שאלות קצרות וניצור איתך קשר מיד.",
      step: "שלב",
      question: "כבר יש לך מוצר, שירות או עסק שברצונך למכור באינטרנט?",
      options: ["כן, יש לי ואני רוצה למכור יותר", "אני רק מתחיל ורוצה לבנות את זה נכון"],
      next: "המשך",
      formTitle: "עכשיו השאר פרטים",
      formSubtitle: "נבדוק את הצורך שלך ונחזור אליך בערוץ המתאים.",
      name: "שם",
      company: "שם החברה",
      email: "אימייל",
      instagram: "האינסטגרם של העסק שלך",
      instagramPlaceholder: "שם_משתמש",
      phone: "טלפון",
      back: "חזרה",
      submit: "דברו איתי בוואטסאפ",
      footer: "Monfily Digital",
      reserved: "כל הזכויות שמורות",
    },
  },
  SG: {
    locale: "en-SG",
    price: "S$1.100",
    phonePrefix: "+65 ",
    phonePlaceholder: "+65 8123 4567",
    phoneDigits: 8,
    copy: {
      eyebrow: "FAST REPLY",
      titlePrefix: "Premium landing page",
      titlePriceConnector: "for only",
      subtitle: "Answer two quick questions and we will contact you right away.",
      step: "Step",
      question: "Do you already have a product, service, or business you want to sell online?",
      options: ["Yes, I already have one and want to sell more", "I am starting and want to structure it"],
      next: "Continue",
      formTitle: "Now leave your details",
      formSubtitle: "We will review your stage and contact you through the right channel.",
      name: "Name",
      company: "Company name",
      email: "Email",
      instagram: "Your business Instagram",
      instagramPlaceholder: "your_username",
      phone: "Phone",
      back: "Back",
      submit: "TALK ON WHATSAPP NOW",
      footer: "Monfily Digital",
      reserved: "All Rights Reserved",
    },
  },
  BR: {
    locale: "pt-BR",
    price: "R$ 697",
    phonePrefix: "+55 ",
    phonePlaceholder: "+55 11 91234-5678",
    phoneDigits: 11,
    copy: {
      eyebrow: "RESPOSTA RÁPIDA",
      titlePrefix: "Landing page premium",
      titlePriceConnector: "por apenas",
      subtitle: "Responda duas perguntas rápidas e te chamo no WhatsApp agora.",
      step: "Etapa",
      question: "Você já tem um produto, serviço ou negócio que quer vender pela internet?",
      options: ["Sim, já tenho e quero vender mais", "Ainda estou começando e quero estruturar"],
      next: "Continuar",
      formTitle: "Agora deixe seus dados",
      formSubtitle: "Vamos entender seu momento e chamar você pelo canal certo.",
      name: "Nome",
      company: "Nome da empresa",
      email: "Email",
      instagram: "Instagram do seu negócio",
      instagramPlaceholder: "seu_usuario",
      phone: "Telefone",
      back: "Voltar",
      submit: "FALAR NO WHATSAPP AGORA",
      footer: "Monfily Digital",
      reserved: "Todos os Direitos Reservados",
    },
  },
  GB: {
    locale: "en-GB",
    price: "£697",
    phonePrefix: "+44 ",
    phonePlaceholder: "+44 7400 123456",
    phoneDigits: 10,
    copy: {
      eyebrow: "FAST REPLY",
      titlePrefix: "Premium landing page",
      titlePriceConnector: "for only",
      subtitle: "Answer two quick questions and we will contact you right away.",
      step: "Step",
      question: "Do you already have a product, service, or business you want to sell online?",
      options: ["Yes, I already have one and want to sell more", "I am starting and want to structure it"],
      next: "Continue",
      formTitle: "Now leave your details",
      formSubtitle: "We will review your stage and contact you through the right channel.",
      name: "Name",
      company: "Company name",
      email: "Email",
      instagram: "Your business Instagram",
      instagramPlaceholder: "your_username",
      phone: "Phone",
      back: "Back",
      submit: "TALK ON WHATSAPP NOW",
      footer: "Monfily Digital",
      reserved: "All Rights Reserved",
    },
  },
  US: {
    locale: "en-US",
    price: "$497",
    phonePrefix: "+1 ",
    phonePlaceholder: "+1 (415) 555-0198",
    phoneDigits: 10,
    copy: {
      eyebrow: "FAST REPLY",
      titlePrefix: "Premium landing page",
      titlePriceConnector: "for only",
      subtitle: "Answer two quick questions and we will contact you right away.",
      step: "Step",
      question: "Do you already have a product, service, or business you want to sell online?",
      options: ["Yes, I already have one and want to sell more", "I am starting and want to structure it"],
      next: "Continue",
      formTitle: "Now leave your details",
      formSubtitle: "We will review your stage and contact you through the right channel.",
      name: "Name",
      company: "Company name",
      email: "Email",
      instagram: "Your business Instagram",
      instagramPlaceholder: "your_username",
      phone: "Phone",
      back: "Back",
      submit: "TALK ON WHATSAPP NOW",
      footer: "Monfily Digital",
      reserved: "All Rights Reserved",
    },
  },
};

function resolveMarket(country?: string | null): MarketKey {
  const upper = country?.toUpperCase();
  if (upper && MARKET_BY_COUNTRY[upper]) return MARKET_BY_COUNTRY[upper];
  return "US";
}

function getLanguageForMarket(market: MarketKey): Language {
  if (market === "BR") return "pt-br";
  if (market === "PT") return "pt-pt";
  if (market === "ES") return "es";
  if (market === "IT") return "it";
  if (market === "SG") return "sg";
  if (market === "IL") return "he";
  return "en";
}

function formatLocalPhoneDigits(market: MarketKey, digits: string): string {
  if (market === "BR") {
    return digits.replace(/^(\d{0,2})(\d{0,5})(\d{0,4}).*/, (_, ddd, first, last) =>
      [ddd, first && `${first}${last ? `-${last}` : ""}`].filter(Boolean).join(" ")
    );
  }

  if (market === "US") {
    return digits.replace(/^(\d{0,3})(\d{0,3})(\d{0,4}).*/, (_, area, first, last) => {
      if (!first) return area ? `(${area}` : "";
      return `(${area}) ${first}${last ? `-${last}` : ""}`;
    });
  }

  if (market === "GB") {
    return digits.replace(/^(\d{0,4})(\d{0,6}).*/, (_, first, second) =>
      [first, second].filter(Boolean).join(" ")
    );
  }

  if (market === "SG") {
    return digits.replace(/^(\d{0,4})(\d{0,4}).*/, (_, first, second) =>
      [first, second].filter(Boolean).join(" ")
    );
  }

  if (market === "IL") {
    return digits.replace(/^(\d{0,2})(\d{0,3})(\d{0,4}).*/, (_, first, second, third) =>
      [first, second, third].filter(Boolean).join(" ")
    );
  }

  if (market === "IT") {
    return digits.replace(/^(\d{0,3})(\d{0,3})(\d{0,4}).*/, (_, first, second, third) =>
      [first, second, third].filter(Boolean).join(" ")
    );
  }

  return digits.replace(/^(\d{0,3})(\d{0,3})(\d{0,3}).*/, (_, first, second, third) =>
    [first, second, third].filter(Boolean).join(" ")
  );
}

function normalizePhoneValue(value: string, marketKey: MarketKey): string {
  const market = MARKETS[marketKey];
  const prefixDigits = market.phonePrefix.replace(/\D/g, "");
  let digits = value.replace(/\D/g, "");

  if (digits.startsWith(prefixDigits)) {
    digits = digits.slice(prefixDigits.length);
  }

  const localDigits = digits.slice(0, market.phoneDigits);
  return `${market.phonePrefix}${formatLocalPhoneDigits(marketKey, localDigits)}`;
}

const INSTAGRAM_PREFIX = "instagram.com/";
const INSTAGRAM_HANDLE_MAX_LENGTH = 30;

function normalizeInstagramHandle(value: string): string {
  return value
    .replace(/^https?:\/\/(www\.)?instagram\.com\//i, "")
    .replace(/^www\.instagram\.com\//i, "")
    .replace(/^instagram\.com\//i, "")
    .replace(/^@+/, "")
    .replace(/\s/g, "")
    .replace(/[^A-Za-z0-9._]/g, "")
    .slice(0, INSTAGRAM_HANDLE_MAX_LENGTH);
}

function updateMetaTag(name: string, content: string, attribute: "name" | "property" = "name") {
  let meta = document.querySelector(`meta[${attribute}="${name}"]`);

  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute(attribute, name);
    document.head.appendChild(meta);
  }

  meta.setAttribute("content", content);
}

type LandingPageProps = {
  fixedMarketKey?: MarketKey;
};

function isDefaultPhoneValue(value: string) {
  return Object.values(MARKETS).some((market) => value === market.phonePrefix);
}

export default function LandingPage({ fixedMarketKey }: LandingPageProps = {}) {
  const initialMarketKey = fixedMarketKey ?? "US";
  const [marketKey, setMarketKey] = useState<MarketKey>(initialMarketKey);
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedOption, setSelectedOption] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", company: "", email: "", instagram: "", phone: MARKETS[initialMarketKey].phonePrefix });
  const market = MARKETS[marketKey];
  const copy = market.copy;
  const seo = SEO_BY_MARKET[marketKey];
  const textDirection = market.locale === "he-IL" ? "rtl" : "ltr";
  const localPhoneDigits = form.phone.replace(/\D/g, "").slice(market.phonePrefix.replace(/\D/g, "").length);
  const isFormComplete =
    form.name.trim().length > 0 &&
    form.company.trim().length > 0 &&
    form.email.trim().length > 0 &&
    form.instagram.length > 0 &&
    localPhoneDigits.length === market.phoneDigits;

  const handleSubmit = async () => {
    if (!isFormComplete || isSubmitting) return;

    const message = [
      `${copy.titlePrefix} - ${market.price}`,
      `${copy.question}: ${selectedOption}`,
      `${copy.name}: ${form.name}`,
      `${copy.company}: ${form.company}`,
      `${copy.email}: ${form.email}`,
      `${copy.instagram}: ${INSTAGRAM_PREFIX}${form.instagram}`,
      `${copy.phone}: ${form.phone}`,
    ].join("\n");
    const whatsappNumber = getWhatsAppNumber(getLanguageForMarket(marketKey));
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    setIsSubmitting(true);
    const whatsappWindow = window.open(whatsappUrl, "_blank");

    try {
      const response = await fetch("/api/landingpage-purchase", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          marketKey,
          locale: market.locale,
          selectedOption,
          name: form.name.trim(),
          company: form.company.trim(),
          email: form.email.trim(),
          instagram: form.instagram.trim(),
          phone: form.phone,
        }),
      });
      const result = (await response.json().catch(() => null)) as LandingPurchaseResult | null;
      const purchase = result?.purchase;

      if (
        !response.ok ||
        !result?.eventId ||
        !purchase ||
        typeof purchase.value !== "number" ||
        typeof purchase.currency !== "string"
      ) {
        throw new Error(result?.message || "Landing page purchase request failed");
      }

      trackMetaPurchase({
        marketKey,
        eventId: result.eventId,
        value: purchase.value,
        currency: purchase.currency,
      });

      if (!whatsappWindow) {
        window.open(whatsappUrl, "_blank");
      }
    } catch (error) {
      console.error("Landing page purchase failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (fixedMarketKey) {
      setMarketKey(fixedMarketKey);
      setForm((current) => ({
        ...current,
        phone: isDefaultPhoneValue(current.phone)
          ? MARKETS[fixedMarketKey].phonePrefix
          : normalizePhoneValue(current.phone, fixedMarketKey),
      }));
      return;
    }

    let cancelled = false;

    detectLocationData().then(({ country }) => {
      if (cancelled) return;
      const nextMarketKey = resolveMarket(country);
      setMarketKey(nextMarketKey);
      setForm((current) => ({
        ...current,
        phone: current.phone === MARKETS.US.phonePrefix ? MARKETS[nextMarketKey].phonePrefix : normalizePhoneValue(current.phone, nextMarketKey),
      }));
    });

    return () => {
      cancelled = true;
    };
  }, [fixedMarketKey]);

  useEffect(() => {
    document.title = seo.title;
    document.documentElement.lang = market.locale;
    document.documentElement.dir = "ltr";

    updateMetaTag("title", seo.title);
    updateMetaTag("description", seo.description);
    updateMetaTag("og:title", seo.title, "property");
    updateMetaTag("og:description", seo.description, "property");
    updateMetaTag("og:locale", seo.ogLocale, "property");
    updateMetaTag("twitter:title", seo.title);
    updateMetaTag("twitter:description", seo.description);
  }, [market.locale, seo]);

  const progress = useMemo(() => (step === 1 ? 50 : 100), [step]);

  return (
    <main className="elevate-page" aria-label="Monfily landing page" lang={market.locale} dir="ltr" data-text-direction={textDirection}>
      <SectionLayout showStripes={false} className="elevate-page__frame" containerClassName="elevate-page__section">
        <div className="elevate-page__inner">
          <span className="elevate-line-marker elevate-line-marker--divider-top" aria-hidden="true" />
          <header className="elevate-hero">
          <img
            src="https://res.cloudinary.com/dopp0v9eq/image/upload/f_auto,q_auto,w_180/v1763574787/monfily-black-nobg_risk6t.png"
            alt="Monfily"
            className="elevate-hero__mark elevate-hero__mark--monfily"
            draggable={false}
          />
          <p className="elevate-hero__eyebrow">{copy.eyebrow}</p>
          <h1 className="elevate-hero__title">
            <span className="elevate-hero__title-main">{copy.titlePrefix},</span>{" "}
            <span className="elevate-hero__title-price">{copy.titlePriceConnector} {market.price}</span>
          </h1>
          <p className="elevate-hero__subtitle">{copy.subtitle}</p>
          </header>

          <section className="elevate-card" aria-labelledby="elevate-question">
          <span className="elevate-line-marker elevate-line-marker--progress-left" aria-hidden="true" />
          <span className="elevate-line-marker elevate-line-marker--progress-right" aria-hidden="true" />
          <div className="elevate-progress" aria-label={`${copy.step} ${step} de 2`}>
            <span>{copy.step} {step}/2</span>
            <div>
              <i style={{ width: `${progress}%` }} />
            </div>
          </div>

          {step === 1 ? (
            <>
              <h2 id="elevate-question" className="elevate-card__question">
                {copy.question}
              </h2>

              <div className="elevate-form">
                <fieldset className="elevate-form__options">
                  <legend className="sr-only">{copy.question}</legend>
                  {copy.options.map((option) => (
                    <label
                      key={option}
                      className="elevate-option"
                      data-selected={selectedOption === option}
                    >
                      <input
                        type="radio"
                        name="landingpage-interest"
                        value={option}
                        checked={selectedOption === option}
                        onChange={() => setSelectedOption(option)}
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </fieldset>

                <button
                  type="button"
                  className="elevate-cta"
                  disabled={!selectedOption}
                  onClick={() => setStep(2)}
                >
                  <span className="elevate-cta__shine" aria-hidden="true" />
                  <span>{copy.next}</span>
                </button>
              </div>
            </>
          ) : (
            <>
              <h2 id="elevate-question" className="elevate-card__question">
                {copy.formTitle}
              </h2>
              <p className="elevate-card__helper">{copy.formSubtitle}</p>

              <form
                className="elevate-form"
                onSubmit={(event) => {
                  event.preventDefault();
                  handleSubmit();
                }}
              >
                <label className="elevate-field">
                  <span>{copy.name}</span>
                  <input
                    type="text"
                    name="name"
                    autoComplete="name"
                    required
                    value={form.name}
                    onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                  />
                </label>

                <label className="elevate-field">
                  <span>{copy.company}</span>
                  <input
                    type="text"
                    name="company"
                    autoComplete="organization"
                    required
                    value={form.company}
                    onChange={(event) => setForm((current) => ({ ...current, company: event.target.value }))}
                  />
                </label>

                <label className="elevate-field">
                  <span>{copy.email}</span>
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    inputMode="email"
                    required
                    value={form.email}
                    onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                  />
                </label>

                <label className="elevate-field">
                  <span>{copy.instagram}</span>
                  <div className="elevate-instagram-input">
                    <span aria-hidden="true">{INSTAGRAM_PREFIX}</span>
                    <input
                      type="text"
                      name="instagram"
                      autoComplete="off"
                      inputMode="text"
                      maxLength={INSTAGRAM_HANDLE_MAX_LENGTH}
                      required
                      aria-label={`${copy.instagram} ${INSTAGRAM_PREFIX}`}
                      placeholder={copy.instagramPlaceholder}
                      value={form.instagram}
                      onChange={(event) => {
                        setForm((current) => ({
                          ...current,
                          instagram: normalizeInstagramHandle(event.target.value),
                        }));
                      }}
                      onKeyDown={(event) => {
                        if (event.key === " ") {
                          event.preventDefault();
                        }
                      }}
                    />
                  </div>
                </label>

                <label className="elevate-field">
                  <span>{copy.phone}</span>
                  <input
                    type="tel"
                    name="phone"
                    autoComplete="tel"
                    inputMode="tel"
                    required
                    placeholder={market.phonePlaceholder}
                    value={form.phone}
                    onChange={(event) => setForm((current) => ({ ...current, phone: normalizePhoneValue(event.target.value, marketKey) }))}
                    onKeyDown={(event) => {
                      const input = event.currentTarget;
                      const selectionStartsInPrefix = (input.selectionStart ?? 0) <= market.phonePrefix.length;
                      const selectionEndsInPrefix = (input.selectionEnd ?? 0) <= market.phonePrefix.length;
                      if ((event.key === "Backspace" && selectionStartsInPrefix) || (event.key === "Delete" && selectionEndsInPrefix)) {
                        event.preventDefault();
                      }
                    }}
                    onFocus={() => {
                      setForm((current) => ({
                        ...current,
                        phone: current.phone.startsWith(market.phonePrefix) ? current.phone : market.phonePrefix,
                      }));
                    }}
                  />
                </label>

                <div className="elevate-actions">
                  <button type="button" className="elevate-back" onClick={() => setStep(1)}>
                    {copy.back}
                  </button>
                  <button type="submit" className="elevate-cta" disabled={!isFormComplete || isSubmitting}>
                    <span className="elevate-cta__shine" aria-hidden="true" />
                    <span>{copy.submit}</span>
                  </button>
                </div>
              </form>
            </>
          )}
          </section>

          <footer className="elevate-footer">
            <span className="elevate-line-marker elevate-line-marker--footer-left" aria-hidden="true" />
            <span className="elevate-line-marker elevate-line-marker--footer-divider" aria-hidden="true" />
            <span className="elevate-line-marker elevate-line-marker--footer-right" aria-hidden="true" />
            <div className="elevate-separator" />
          <div className="elevate-footer__content">
            <p className="elevate-footer__copy">
              {copy.footer}
              <br />
              {copy.reserved}
            </p>
          </div>
          <div className="elevate-separator elevate-separator--bottom" />
          </footer>
        </div>
      </SectionLayout>
    </main>
  );
}
