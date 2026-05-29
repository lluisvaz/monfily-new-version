import { useEffect, useMemo, useState } from "react";
import { useLocation } from "wouter";
import { SectionLayout } from "@/components/landing/section-layout";
import { detectLocationData } from "@/lib/geo-location";
import { trackMetaLandingLead } from "@/lib/meta-pixel";
import { getWhatsAppNumber, type Language } from "@/lib/translations";
import { useWhatsAppNumber } from "@/hooks/use-whatsapp";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export type MarketKey = "PT" | "IT" | "ES" | "IL" | "SG" | "BR" | "GB" | "US";

type Copy = {
  eyebrow: string;
  titlePrefix: string;
  titlePriceConnector: string;
  subtitle: string;
  features: string[];
  cardHeadline: string;
  qualifierLabel: string;
  benefits: string[];
  step: string;
  question: string;
  options: string[];
  next: string;
  formTitle: string;
  formSubtitle: string;
  name: string;
  phone: string;
  instagram: string;
  instagramPlaceholder: string;
  currentSite: string;
  back: string;
  submit: string;
  footer: string;
  reserved: string;
  advance: string;
  domainQuestion: string;
  domainHint: string;
  domainOptions: string[];
  domainExplanation: string;
  logoQuestion: string;
  logoOptions: string[];
  budgetQuestion: string;
  budgetOptions: string[];
  timelineQuestion: string;
  timelineOptions: string[];
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

const CLIENT_WHATSAPP_MESSAGE_BY_MARKET: Record<MarketKey, string> = {
  BR: "Olá! Gostaria de criar um site profissional para o meu negócio e entender como a Monfily pode me ajudar.",
  PT: "Olá! Gostaria de criar um site profissional para o meu negócio e perceber como a Monfily me pode ajudar.",
  ES: "¡Hola! Me gustaría crear un sitio web profesional para mi negocio y entender cómo Monfily puede ayudarme.",
  IT: "Ciao! Vorrei creare un sito web professionale per la mia attività e capire come Monfily può aiutarmi.",
  IL: "Hello! I would like to create a professional website for my business and understand how Monfily can help me.",
  SG: "Hello! I would like to create a professional website for my business and understand how Monfily can help me.",
  GB: "Hello! I would like to create a professional website for my business and understand how Monfily can help me.",
  US: "Hello! I would like to create a professional website for my business and understand how Monfily can help me.",
};

const MARKETS: Record<MarketKey, {
  locale: string;
  price: string;
  phonePrefix: string;
  phonePlaceholder: string;
  phoneDigits: number;
  mobilePattern: RegExp;
  copy: Copy;
}> = {
  PT: {
    locale: "pt-PT",
    price: "397 €",
    phonePrefix: "+351 ",
    phonePlaceholder: "+351 912 345 678",
    phoneDigits: 9,
    mobilePattern: /^9\d{8}$/,
    copy: {
      eyebrow: "RESPOSTA RÁPIDA",
      titlePrefix: "Site profissional e moderno",
      titlePriceConnector: "por apenas",
      subtitle: "Pronto em até 72h, sem mensalidades obrigatórias e sem complicação.",
      features: [
        "Só paga se aprovar o resultado final, risco zero para si",
        "Domínio próprio durante 1 ano totalmente por nossa conta, já incluído",
        "Otimização do Perfil de Empresa no Google incluída no valor",
        "Entrega rápida em até 72 horas, sem longas esperas",
      ],
      cardHeadline: "Precisa de um site profissional para o seu negócio?",
      qualifierLabel: "Uma pergunta rápida para percebermos melhor o seu momento:",
      benefits: [
        "Sem mensalidades obrigatórias para manter o site online",
        "Design profissional e personalizado para a identidade da sua marca",
        "100% responsivo e otimizado para aparecer no Google",
        "Suporte direto pelo WhatsApp durante todo o processo",
      ],
      step: "Etapa",
      question: "Você já tem um produto, serviço ou negócio que quer vender pela internet?",
      options: ["Sim, ainda não tenho um site profissional", "Tenho um site mas quero melhorá-lo"],
      next: "Continuar",
      formTitle: "Vamos continuar pelo WhatsApp?",
      formSubtitle: "Deixe o seu nome e telefone para abrirmos a conversa com o contexto certo.",
      name: "Nome",
      instagram: "Instagram do seu negócio",
      instagramPlaceholder: "seu_usuario",
      currentSite: "Site atual do seu negócio",
      phone: "Telefone",
      back: "Voltar",
      submit: "FALAR NO WHATSAPP AGORA",
      footer: "Monfily Digital",
      reserved: "Todos os Direitos Reservados",
      advance: "Avançar",
      domainQuestion: "Você já possui um domínio próprio?",
      domainHint: "Exemplos: meusite.pt, minhaempresa.com",
      domainOptions: ["Sim, já tenho", "Não tenho", "Não sei o que é domínio"],
      domainExplanation: "Domínio é o endereço do seu site na internet. Por exemplo: minhaempresa.pt. Pode registar um novo por cerca de 10 a 20 euros por ano.",
      logoQuestion: "Já possui logótipo ou identidade visual?",
      logoOptions: ["Sim, tenho tudo pronto", "Não tenho nada", "Tenho apenas redes sociais"],
      budgetQuestion: "Está pronto para investir no seu site profissional?",
      budgetOptions: ["Sim, estou pronto", "Preciso de mais informação"],
      timelineQuestion: "Quando gostaria de ter o seu site pronto?",
      timelineOptions: ["O mais rápido possível", "Esta semana", "Este mês", "Ainda estou a pesquisar"],
    },
  },
  IT: {
    locale: "it-IT",
    price: "397 €",
    phonePrefix: "+39 ",
    phonePlaceholder: "+39 312 345 6789",
    phoneDigits: 10,
    mobilePattern: /^3\d{9}$/,
    copy: {
      eyebrow: "RISPOSTA RAPIDA",
      titlePrefix: "Sito professionale e moderno",
      titlePriceConnector: "a soli",
      subtitle: "Pronto in 72h, senza canone mensile obbligatorio e senza complicazioni.",
      features: [
        "Paghi solo se approvi il risultato finale, rischio zero",
        "Dominio personale per 1 anno intero completamente offerto da noi, già incluso",
        "Ottimizzazione del Profilo dell'attività su Google inclusa nel prezzo",
        "Consegna rapida entro 72 ore, senza lunghe attese",
      ],
      cardHeadline: "Hai bisogno di un sito professionale per la tua attività?",
      qualifierLabel: "Una domanda veloce per capire meglio la tua situazione:",
      benefits: [
        "Senza abbonamenti obbligatori per mantenere il sito online",
        "Design professionale e personalizzato per l'identità del tuo brand",
        "100% responsive e ottimizzato per apparire su Google",
        "Supporto diretto su WhatsApp durante tutto il processo",
      ],
      step: "Passo",
      question: "Hai già un prodotto, servizio o business che vuoi vendere online?",
      options: ["Sì, non ho ancora un sito professionale", "Ho un sito ma voglio migliorarlo"],
      next: "Continua",
      formTitle: "Continuiamo su WhatsApp?",
      formSubtitle: "Lascia nome e telefono per aprire la conversazione con il contesto giusto.",
      name: "Nome",
      instagram: "Instagram della tua attività",
      instagramPlaceholder: "tuo_utente",
      currentSite: "Sito web attuale della tua attività",
      phone: "Telefono",
      back: "Indietro",
      submit: "PARLA SU WHATSAPP ORA",
      footer: "Monfily Digital",
      reserved: "Tutti i diritti riservati",
      advance: "Avanti",
      domainQuestion: "Hai già un tuo dominio?",
      domainHint: "Esempi: miosito.it, miazienda.com",
      domainOptions: ["Sì, ce l'ho già", "Non ce l'ho", "Non so cos'è un dominio"],
      domainExplanation: "Il dominio è l'indirizzo del tuo sito su internet. Esempio: miazienda.it. Puoi registrarne uno nuovo per circa 10-20 euro all'anno.",
      logoQuestion: "Hai già un logotipo o un'identità visiva?",
      logoOptions: ["Sì, ho tutto pronto", "Non ho nulla", "Ho solo i social media"],
      budgetQuestion: "Sei pronto a investire nel tuo sito professionale?",
      budgetOptions: ["Sì, sono pronto", "Ho bisogno di più informazioni"],
      timelineQuestion: "Quando vorresti avere il tuo sito pronto?",
      timelineOptions: ["Il prima possibile", "Questa settimana", "Questo mese", "Sto ancora valutando"],
    },
  },
  ES: {
    locale: "es-ES",
    price: "597 €",
    phonePrefix: "+34 ",
    phonePlaceholder: "+34 612 345 678",
    phoneDigits: 9,
    mobilePattern: /^[67]\d{8}$/,
    copy: {
      eyebrow: "RESPUESTA RÁPIDA",
      titlePrefix: "Sitio profesional y moderno",
      titlePriceConnector: "por solo",
      subtitle: "Listo en 72h, sin mensualidades obligatorias y sin complicaciones.",
      features: [
        "Solo pagas si apruebas el resultado final, riesgo cero",
        "Dominio propio durante 1 año completo totalmente por nuestra cuenta, ya incluido",
        "Optimización del Perfil de Empresa en Google incluida en el precio",
        "Entrega rápida en hasta 72 horas, sin largas esperas",
      ],
      cardHeadline: "¿Necesitas un sitio profesional para tu negocio?",
      qualifierLabel: "Una pregunta rápida para entenderte mejor:",
      benefits: [
        "Sin mensualidades obligatorias para mantener el sitio online",
        "Diseño profesional y personalizado para la identidad de tu marca",
        "100% responsive y optimizado para aparecer en Google",
        "Soporte directo por WhatsApp durante todo el proceso",
      ],
      step: "Paso",
      question: "¿Ya tienes un producto, servicio o negocio que quieres vender por internet?",
      options: ["Sí, aún no tengo un sitio profesional", "Tengo un sitio pero quiero mejorarlo"],
      next: "Continuar",
      formTitle: "¿Seguimos por WhatsApp?",
      formSubtitle: "Deja tu nombre y teléfono para abrir la conversación con el contexto correcto.",
      name: "Nombre",
      instagram: "Instagram de tu negocio",
      instagramPlaceholder: "tu_usuario",
      currentSite: "Sitio web actual de tu negocio",
      phone: "Teléfono",
      back: "Volver",
      submit: "HABLAR POR WHATSAPP AHORA",
      footer: "Monfily Digital",
      reserved: "Todos los derechos reservados",
      advance: "Avanzar",
      domainQuestion: "¿Ya tienes tu propio dominio?",
      domainHint: "Ejemplos: miempresa.com, misitioweb.es",
      domainOptions: ["Sí, ya lo tengo", "No lo tengo", "No sé qué es un dominio"],
      domainExplanation: "El dominio es la dirección de tu sitio web en internet. Ejemplo: miempresa.es. Puedes registrar uno nuevo por unos 10-20 euros al año.",
      logoQuestion: "¿Ya tienes logotipo o identidad visual?",
      logoOptions: ["Sí, tengo todo listo", "No tengo nada", "Solo tengo redes sociales"],
      budgetQuestion: "¿Estás listo para invertir en tu sitio profesional?",
      budgetOptions: ["Sí, estoy listo", "Necesito más información"],
      timelineQuestion: "¿Cuándo te gustaría tener tu sitio listo?",
      timelineOptions: ["Lo antes posible", "Esta semana", "Este mes", "Todavía estoy investigando"],
    },
  },
  IL: {
    locale: "he-IL",
    price: "₪1.700",
    phonePrefix: "+972 ",
    phonePlaceholder: "+972 50 123 4567",
    phoneDigits: 9,
    mobilePattern: /^5\d{8}$/,
    copy: {
      eyebrow: "תשובה מהירה",
      titlePrefix: "אתר מקצועי ומודרני",
      titlePriceConnector: "במחיר",
      subtitle: "מוכן תוך 72 שעות, ללא דמי מנוי חובה וללא סיבוכים.",
      features: [
        "משלמים רק אם תאשרו את התוצאה הסופית, אפס סיכון",
        "דומיין אישי לשנה שלמה על חשבוננו, כבר כלול במחיר",
        "אופטימיזציה של פרופיל העסק בגוגל כלולה במחיר",
        "מסירה מהירה תוך 72 שעות, ללא המתנה ארוכה",
      ],
      cardHeadline: "צריך אתר מקצועי לעסק שלך?",
      qualifierLabel: "שאלה אחת מהירה כדי שנוכל להבין אותך טוב יותר:",
      benefits: [
        "ללא דמי מנוי חובה לתחזוקת האתר",
        "עיצוב מקצועי ומותאם אישית לזהות המותג שלך",
        "100% רספונסיבי ומותאם להופעה בגוגל",
        "תמיכה ישירה בוואטסאפ לאורך כל התהליך",
      ],
      step: "שלב",
      question: "כבר יש לך מוצר, שירות או עסק שברצונך למכור באינטרנט?",
      options: ["כן, עדיין אין לי אתר מקצועי", "יש לי אתר אבל אני רוצה לשדרג אותו"],
      next: "המשך",
      formTitle: "נמשיך בוואטסאפ?",
      formSubtitle: "השאירו שם וטלפון כדי שנפתח את השיחה עם ההקשר הנכון.",
      name: "שם",
      instagram: "האינסטגרם של העסק שלך",
      instagramPlaceholder: "שם_משתמש",
      currentSite: "האתר הנוכחי של העסק שלך",
      phone: "טלפון",
      back: "חזרה",
      submit: "דברו איתי בוואטסאפ",
      footer: "Monfily Digital",
      reserved: "כל הזכויות שמורות",
      advance: "המשך",
      domainQuestion: "כבר יש לך דומיין משלך?",
      domainHint: "דוגמאות: haeshev.co.il, hashev.com",
      domainOptions: ["כן, כבר יש לי", "אין לי", "לא יודע מה זה דומיין"],
      domainExplanation: "דומיין הוא כתובת האתר שלך באינטרנט. לדוגמה: haeshev.co.il. ניתן לרשום דומיין חדש בכ-30 עד 50 שקל לשנה.",
      logoQuestion: "כבר יש לך לוגו או זהות ויזואלית?",
      logoOptions: ["כן, יש לי הכל מוכן", "אין לי כלום", "יש לי רק רשתות חברתיות"],
      budgetQuestion: "מוכן להשקיע באתר המקצועי שלך?",
      budgetOptions: ["כן, אני מוכן", "אני צריך יותר מידע"],
      timelineQuestion: "מתי היית רוצה שהאתר שלך יהיה מוכן?",
      timelineOptions: ["בהקדם האפשרי", "השבוע", "החודש הזה", "עדיין חוקר"],
    },
  },
  SG: {
    locale: "en-SG",
    price: "S$1.100",
    phonePrefix: "+65 ",
    phonePlaceholder: "+65 8123 4567",
    phoneDigits: 8,
    mobilePattern: /^[89]\d{7}$/,
    copy: {
      eyebrow: "FAST REPLY",
      titlePrefix: "Professional & modern website",
      titlePriceConnector: "for only",
      subtitle: "Delivered in 72h, with no mandatory monthly fees and no hassle.",
      features: [
        "You only pay if you approve the final result, zero risk",
        "Your own domain for 1 full year completely on us, already included",
        "Google Business Profile optimisation included in the price",
        "Fast delivery within 72 hours, no long waits",
      ],
      cardHeadline: "Need a professional website for your business?",
      qualifierLabel: "One quick question to better understand your situation:",
      benefits: [
        "No mandatory monthly fees to keep your site online",
        "Professional design tailored to your brand identity",
        "100% responsive and optimised to rank on Google",
        "Direct WhatsApp support throughout the entire process",
      ],
      step: "Step",
      question: "Do you already have a product, service, or business you want to sell online?",
      options: ["Yes, I don't have a professional website yet", "I have a website but want to upgrade it"],
      next: "Continue",
      formTitle: "Continue on WhatsApp?",
      formSubtitle: "Leave your name and phone so we can start the conversation with the right context.",
      name: "Name",
      instagram: "Your business Instagram",
      instagramPlaceholder: "your_username",
      currentSite: "Your current business website",
      phone: "Phone",
      back: "Back",
      submit: "TALK ON WHATSAPP NOW",
      footer: "Monfily Digital",
      reserved: "All Rights Reserved",
      advance: "Next",
      domainQuestion: "Do you already have your own domain?",
      domainHint: "Examples: mybusiness.com, mysite.co",
      domainOptions: ["Yes, I already have one", "No, I don't", "I'm not sure what a domain is"],
      domainExplanation: "A domain is your website's address on the internet. For example: mybusiness.com. You can register a new one for around S$15-30 per year.",
      logoQuestion: "Do you already have a logo or brand identity?",
      logoOptions: ["Yes, I have everything ready", "No, I don't have anything", "I only have social media"],
      budgetQuestion: "Are you ready to invest in your professional website?",
      budgetOptions: ["Yes, I'm ready", "I need more information"],
      timelineQuestion: "When would you like your website to be ready?",
      timelineOptions: ["As soon as possible", "This week", "This month", "I'm still researching"],
    },
  },
  BR: {
    locale: "pt-BR",
    price: "R$ 697",
    phonePrefix: "+55 ",
    phonePlaceholder: "+55 11 91234-5678",
    phoneDigits: 11,
    mobilePattern: /^\d{2}9\d{8}$/,
    copy: {
      eyebrow: "RESPOSTA RÁPIDA",
      titlePrefix: "Site profissional e moderno",
      titlePriceConnector: "por apenas",
      subtitle: "Pronto em até 72h, sem mensalidades obrigatórias e sem complicação.",
      features: [
        "Você só paga se aprovar o resultado final, risco zero",
        "Domínio próprio por 1 ano totalmente por nossa conta, já incluso",
        "Otimização do Google Meu Negócio incluída no valor",
        "Entrega rápida em até 72 horas, sem longas esperas",
      ],
      cardHeadline: "Precisa de um site profissional para o seu negócio?",
      qualifierLabel: "Uma pergunta rápida para entendermos você melhor:",
      benefits: [
        "Sem mensalidades obrigatórias para manter o site no ar",
        "Design profissional e personalizado para a identidade da sua marca",
        "100% responsivo e otimizado para aparecer no Google",
        "Suporte direto pelo WhatsApp durante todo o processo",
      ],
      step: "Etapa",
      question: "Você já tem um produto, serviço ou negócio que quer vender pela internet?",
      options: ["Sim, ainda não tenho um site profissional", "Tenho um site mas quero melhorá-lo"],
      next: "Continuar",
      formTitle: "Vamos continuar pelo WhatsApp?",
      formSubtitle: "Deixe seu nome e telefone para abrirmos a conversa com o contexto certo.",
      name: "Nome",
      instagram: "Instagram do seu negócio",
      instagramPlaceholder: "seu_usuario",
      currentSite: "Site atual do seu negócio",
      phone: "Telefone",
      back: "Voltar",
      submit: "FALAR NO WHATSAPP AGORA",
      footer: "Monfily Digital",
      reserved: "Todos os Direitos Reservados",
      advance: "Avançar",
      domainQuestion: "Você já possui domínio próprio?",
      domainHint: "Exemplos: meusite.com.br, minhaempresa.com",
      domainOptions: ["Sim, já tenho", "Não tenho", "Não sei o que é domínio"],
      domainExplanation: "Domínio é o endereço do seu site na internet. Por exemplo: minhaempresa.com.br. Você pode registrar um novo por cerca de R$ 40 a R$ 80 por ano.",
      logoQuestion: "Já possui logotipo ou identidade visual?",
      logoOptions: ["Sim, tenho tudo pronto", "Não tenho nada", "Tenho apenas redes sociais"],
      budgetQuestion: "Está pronto para investir no seu site profissional?",
      budgetOptions: ["Sim, estou pronto", "Preciso entender melhor"],
      timelineQuestion: "Quando gostaria de ter o seu site pronto?",
      timelineOptions: ["O mais rápido possível", "Esta semana", "Este mês", "Ainda estou pesquisando"],
    },
  },
  GB: {
    locale: "en-GB",
    price: "£697",
    phonePrefix: "+44 ",
    phonePlaceholder: "+44 7400 123456",
    phoneDigits: 10,
    mobilePattern: /^7\d{9}$/,
    copy: {
      eyebrow: "FAST REPLY",
      titlePrefix: "Professional & modern website",
      titlePriceConnector: "for only",
      subtitle: "Delivered in 72h, with no mandatory monthly fees and no hassle.",
      features: [
        "You only pay if you approve the final result, zero risk",
        "Your own domain for 1 full year completely on us, already included",
        "Google Business Profile optimisation included in the price",
        "Fast delivery within 72 hours, no long waits",
      ],
      cardHeadline: "Need a professional website for your business?",
      qualifierLabel: "One quick question to better understand your situation:",
      benefits: [
        "No mandatory monthly fees to keep your site online",
        "Professional design tailored to your brand identity",
        "100% responsive and optimised to rank on Google",
        "Direct WhatsApp support throughout the entire process",
      ],
      step: "Step",
      question: "Do you already have a product, service, or business you want to sell online?",
      options: ["Yes, I don't have a professional website yet", "I have a website but want to upgrade it"],
      next: "Continue",
      formTitle: "Continue on WhatsApp?",
      formSubtitle: "Leave your name and phone so we can start the conversation with the right context.",
      name: "Name",
      instagram: "Your business Instagram",
      instagramPlaceholder: "your_username",
      currentSite: "Your current business website",
      phone: "Phone",
      back: "Back",
      submit: "TALK ON WHATSAPP NOW",
      footer: "Monfily Digital",
      reserved: "All Rights Reserved",
      advance: "Next",
      domainQuestion: "Do you already have your own domain?",
      domainHint: "Examples: mybusiness.com, mysite.co",
      domainOptions: ["Yes, I already have one", "No, I don't", "I'm not sure what a domain is"],
      domainExplanation: "A domain is your website's address on the internet. For example: mybusiness.co.uk. You can register a new one for around £10-15 per year.",
      logoQuestion: "Do you already have a logo or brand identity?",
      logoOptions: ["Yes, I have everything ready", "No, I don't have anything", "I only have social media"],
      budgetQuestion: "Are you ready to invest in your professional website?",
      budgetOptions: ["Yes, I'm ready", "I need more information"],
      timelineQuestion: "When would you like your website to be ready?",
      timelineOptions: ["As soon as possible", "This week", "This month", "I'm still researching"],
    },
  },
  US: {
    locale: "en-US",
    price: "$497",
    phonePrefix: "+1 ",
    phonePlaceholder: "+1 (415) 555-0198",
    phoneDigits: 10,
    mobilePattern: /^\d{10}$/,
    copy: {
      eyebrow: "FAST REPLY",
      titlePrefix: "Professional & modern website",
      titlePriceConnector: "for only",
      subtitle: "Delivered in 72h, with no mandatory monthly fees and no hassle.",
      features: [
        "You only pay if you approve the final result, zero risk",
        "Your own domain for 1 full year completely on us, already included",
        "Google Business Profile optimisation included in the price",
        "Fast delivery within 72 hours, no long waits",
      ],
      cardHeadline: "Need a professional website for your business?",
      qualifierLabel: "One quick question to better understand your situation:",
      benefits: [
        "No mandatory monthly fees to keep your site online",
        "Professional design tailored to your brand identity",
        "100% responsive and optimised to rank on Google",
        "Direct WhatsApp support throughout the entire process",
      ],
      step: "Step",
      question: "Do you already have a product, service, or business you want to sell online?",
      options: ["Yes, I don't have a professional website yet", "I have a website but want to upgrade it"],
      next: "Continue",
      formTitle: "Continue on WhatsApp?",
      formSubtitle: "Leave your name and phone so we can start the conversation with the right context.",
      name: "Name",
      instagram: "Your business Instagram",
      instagramPlaceholder: "your_username",
      currentSite: "Your current business website",
      phone: "Phone",
      back: "Back",
      submit: "TALK ON WHATSAPP NOW",
      footer: "Monfily Digital",
      reserved: "All Rights Reserved",
      advance: "Next",
      domainQuestion: "Do you already have your own domain?",
      domainHint: "Examples: mybusiness.com, mysite.co",
      domainOptions: ["Yes, I already have one", "No, I don't", "I'm not sure what a domain is"],
      domainExplanation: "A domain is your website's address on the internet. For example: mybusiness.com. You can register a new one for around $10-20 per year.",
      logoQuestion: "Do you already have a logo or brand identity?",
      logoOptions: ["Yes, I have everything ready", "No, I don't have anything", "I only have social media"],
      budgetQuestion: "Are you ready to invest in your professional website?",
      budgetOptions: ["Yes, I'm ready", "I need more information"],
      timelineQuestion: "When would you like your website to be ready?",
      timelineOptions: ["As soon as possible", "This week", "This month", "I'm still researching"],
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
const WEBSITE_PREFIX = "https://";
const LANDING_TOTAL_STEPS = 6;

function normalizeInstagramHandle(value: string): string {
  return value
    .replace(/^https?:\/\/(www\.)?instagram\.com\//i, "")
    .replace(/^www\.instagram\.com\//i, "")
    .replace(/^instagram\.com\//i, "")
    .replace(/^@+/, "")
    .replace(/\s/g, "")
    .replace(/[^A-Za-z0-9._]/g, "")
    .toLowerCase()
    .slice(0, INSTAGRAM_HANDLE_MAX_LENGTH);
}

function normalizeWebsiteHandle(value: string): string {
  return value
    .replace(/^https?:\/\//i, "")
    .replace(/\s/g, "")
    .toLowerCase();
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

function getThankYouPath(pathname: string) {
  const current = pathname.replace(/\/$/, "");
  return current.endsWith("/landingpage") ? `${current}/obrigado` : "/landingpage/obrigado";
}

export default function LandingPage({ fixedMarketKey }: LandingPageProps = {}) {
  const [, setLocation] = useLocation();
  const initialMarketKey = fixedMarketKey ?? "US";
  const [marketKey, setMarketKey] = useState<MarketKey>(initialMarketKey);
  const [step, setStep] = useState(1);
  const [selectedOption, setSelectedOption] = useState("");
  const [domainOption, setDomainOption] = useState("");
  const [logoOption, setLogoOption] = useState("");
  const [budgetOption, setBudgetOption] = useState("");
  const [timelineOption, setTimelineOption] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", instagram: "", currentSite: "", phone: MARKETS[initialMarketKey].phonePrefix });
  const market = MARKETS[marketKey];
  const destinationNumber = useWhatsAppNumber(
    marketKey,
    getWhatsAppNumber(getLanguageForMarket(marketKey))
  );
  const copy = market.copy;
  const seo = SEO_BY_MARKET[marketKey];
  const textDirection = market.locale === "he-IL" ? "rtl" : "ltr";
  const localPhoneDigits = form.phone.replace(/\D/g, "").slice(market.phonePrefix.replace(/\D/g, "").length);
  const isFormComplete =
    form.name.trim().length > 0 &&
    form.instagram.length > 0 &&
    market.mobilePattern.test(localPhoneDigits);

  const handleSubmit = async () => {
    if (isSubmitting) return;

    const whatsappUrl = buildWhatsAppUrl(destinationNumber, CLIENT_WHATSAPP_MESSAGE_BY_MARKET[marketKey]);

    setIsSubmitting(true);

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
          domainAnswer: domainOption,
          logoAnswer: logoOption,
          budgetAnswer: budgetOption,
          timelineAnswer: timelineOption,
          name: form.name.trim(),
          instagram: form.instagram.trim(),
          currentSiteUrl: form.currentSite.trim() ? `${WEBSITE_PREFIX}${form.currentSite.trim()}` : undefined,
          phone: form.phone,
          pageUrl: window.location.href,
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

      trackMetaLandingLead({
        marketKey,
        eventId: result.eventId,
        value: purchase.value,
        currency: purchase.currency,
      });

      const params = new URLSearchParams({ redirect: whatsappUrl });
      setLocation(`${getThankYouPath(window.location.pathname)}?${params.toString()}`);
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

  const displayedStep = step === 2 ? LANDING_TOTAL_STEPS : step > 2 ? step - 1 : step;
  const progress = useMemo(() => Math.round((displayedStep / LANDING_TOTAL_STEPS) * 100), [displayedStep]);

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
          <div className="elevate-progress" aria-label={`${copy.step} ${displayedStep} / ${LANDING_TOTAL_STEPS}`}>
            <span>{copy.step} {displayedStep}/{LANDING_TOTAL_STEPS}</span>
            <div>
              <i style={{ width: `${progress}%` }} />
            </div>
          </div>

          {step === 1 ? (
            <>
              <h2 id="elevate-question" className="elevate-card__question">
                {copy.cardHeadline}
              </h2>

              <div className="elevate-card__perks">
                {[...copy.features, ...copy.benefits].map((item, index) => (
                  <div key={index} className="elevate-card__perk">
                    <span className="elevate-card__perk-check" aria-hidden="true">
                      <svg width="12" height="12" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 5.5L5 9.5L13 1.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

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
                  onClick={() => setStep(3)}
                >
                  <span className="elevate-cta__shine" aria-hidden="true" />
                  <span>{copy.next}</span>
                </button>
              </div>
            </>
          ) : step === 2 ? (
            <>
              <h2 id="elevate-question" className="elevate-card__question">
                {copy.formTitle}
              </h2>
              <p className="elevate-card__helper">{copy.formSubtitle}</p>

              <form
                className="elevate-form"
                onSubmit={(event) => {
                  event.preventDefault();
                  if (isFormComplete) void handleSubmit();
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

                {selectedOption === copy.options[1] && (
                  <label className="elevate-field">
                    <span>{copy.currentSite}</span>
                    <div className="elevate-instagram-input">
                      <span aria-hidden="true">{WEBSITE_PREFIX}</span>
                      <input
                        type="text"
                        name="currentSite"
                        autoComplete="off"
                        inputMode="url"
                        aria-label={`${copy.currentSite} ${WEBSITE_PREFIX}`}
                        placeholder="example.com"
                        value={form.currentSite}
                        onChange={(event) => setForm((current) => ({ ...current, currentSite: normalizeWebsiteHandle(event.target.value) }))}
                        onKeyDown={(event) => {
                          if (event.key === " ") {
                            event.preventDefault();
                          }
                        }}
                      />
                    </div>
                  </label>
                )}

                <div className="elevate-actions">
                  <button type="button" className="elevate-back" onClick={() => setStep(6)}>
                    {copy.back}
                  </button>
                  <button type="submit" className="elevate-cta" disabled={!isFormComplete || isSubmitting}>
                    <span className="elevate-cta__shine" aria-hidden="true" />
                    <span>{copy.submit}</span>
                  </button>
                </div>
              </form>
            </>
          ) : step === 3 ? (
            <>
              <h2 id="elevate-question" className="elevate-card__question">{copy.domainQuestion}</h2>
              {copy.domainHint && <p className="elevate-card__helper">{copy.domainHint}</p>}
              <div className="elevate-form">
                <fieldset className="elevate-form__options">
                  <legend className="sr-only">{copy.domainQuestion}</legend>
                  {copy.domainOptions.map((option, i) => (
                    <label key={option} className="elevate-option" data-selected={domainOption === option}>
                      <input type="radio" className="sr-only" name="domain" value={option} checked={domainOption === option} onChange={() => setDomainOption(option)} />
                      <span className="elevate-option__letter" aria-hidden="true">{String.fromCharCode(65 + i)}</span>
                      <span>{option}</span>
                    </label>
                  ))}
                </fieldset>
                {domainOption === copy.domainOptions[2] && (
                  <div className="elevate-info-card" role="note">
                    <svg className="elevate-info-card__icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    <p>{copy.domainExplanation}</p>
                  </div>
                )}
                <div className="elevate-actions">
                  <button type="button" className="elevate-back" onClick={() => setStep(1)}>{copy.back}</button>
                  <button type="button" className="elevate-cta" disabled={!domainOption} onClick={() => setStep(4)}>
                    <span className="elevate-cta__shine" aria-hidden="true" />
                    <span>{copy.advance}</span>
                  </button>
                </div>
              </div>
            </>
          ) : step === 4 ? (
            <>
              <h2 id="elevate-question" className="elevate-card__question">{copy.logoQuestion}</h2>
              <div className="elevate-form">
                <fieldset className="elevate-form__options">
                  <legend className="sr-only">{copy.logoQuestion}</legend>
                  {copy.logoOptions.map((option, i) => (
                    <label key={option} className="elevate-option" data-selected={logoOption === option}>
                      <input type="radio" className="sr-only" name="logo" value={option} checked={logoOption === option} onChange={() => setLogoOption(option)} />
                      <span className="elevate-option__letter" aria-hidden="true">{String.fromCharCode(65 + i)}</span>
                      <span>{option}</span>
                    </label>
                  ))}
                </fieldset>
                <div className="elevate-actions">
                  <button type="button" className="elevate-back" onClick={() => setStep(3)}>{copy.back}</button>
                  <button type="button" className="elevate-cta" disabled={!logoOption} onClick={() => setStep(5)}>
                    <span className="elevate-cta__shine" aria-hidden="true" />
                    <span>{copy.advance}</span>
                  </button>
                </div>
              </div>
            </>
          ) : step === 5 ? (
            <>
              <h2 id="elevate-question" className="elevate-card__question">{copy.budgetQuestion}</h2>
              <div className="elevate-form">
                <fieldset className="elevate-form__options">
                  <legend className="sr-only">{copy.budgetQuestion}</legend>
                  {copy.budgetOptions.map((option, i) => (
                    <label key={option} className="elevate-option" data-selected={budgetOption === option}>
                      <input type="radio" className="sr-only" name="budget" value={option} checked={budgetOption === option} onChange={() => setBudgetOption(option)} />
                      <span className="elevate-option__letter" aria-hidden="true">{String.fromCharCode(65 + i)}</span>
                      <span>{option}</span>
                    </label>
                  ))}
                </fieldset>
                <div className="elevate-actions">
                  <button type="button" className="elevate-back" onClick={() => setStep(4)}>{copy.back}</button>
                  <button type="button" className="elevate-cta" disabled={!budgetOption} onClick={() => setStep(6)}>
                    <span className="elevate-cta__shine" aria-hidden="true" />
                    <span>{copy.advance}</span>
                  </button>
                </div>
              </div>
            </>
          ) : step === 6 ? (
            <>
              <h2 id="elevate-question" className="elevate-card__question">{copy.timelineQuestion}</h2>
              <div className="elevate-form">
                <fieldset className="elevate-form__options">
                  <legend className="sr-only">{copy.timelineQuestion}</legend>
                  {copy.timelineOptions.map((option, i) => (
                    <label key={option} className="elevate-option" data-selected={timelineOption === option}>
                      <input type="radio" className="sr-only" name="timeline" value={option} checked={timelineOption === option} onChange={() => setTimelineOption(option)} />
                      <span className="elevate-option__letter" aria-hidden="true">{String.fromCharCode(65 + i)}</span>
                      <span>{option}</span>
                    </label>
                  ))}
                </fieldset>
                <div className="elevate-actions">
                  <button type="button" className="elevate-back" onClick={() => setStep(5)}>{copy.back}</button>
                  <button type="button" className="elevate-cta" disabled={!timelineOption} onClick={() => setStep(2)}>
                    <span className="elevate-cta__shine" aria-hidden="true" />
                    <span>{copy.advance}</span>
                  </button>
                </div>
              </div>
            </>
          ) : null}
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
