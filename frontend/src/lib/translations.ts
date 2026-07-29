export type Language = "pt-br" | "pt-pt" | "en" | "es" | "it" | "sg";

export interface Translations {
  whatsappNumber: string;
  seo: {
    title: string;
    description: string;
  };
  header: {
    solutionsDropdown: {
      websiteCreation: string;
      softwareDevelopment: string;
      artificialIntelligence: string;
      technicalSEO: string;
    };
    languages: {
      portugueseBrazil: string;
      portuguesePortugal: string;
      english: string;
      spanish: string;
      italian: string;
      singapore: string;
    };
    cta: string;
    ctaMobile: string;
  };
  hero: {
    badge: {
      chosenBy: string;
      clients: string;
      in: string;
    };
    rotatingTexts: string[];
    heading: {
      line1: string;
      line2: string;
      line3: string;
    };
    description: string;
    cta: {
      primary: string;
      secondary: string;
    };
    features: {
      performance: {
        title: string;
        description: string;
      };
      optimized: {
        title: string;
        description: string;
      };
    };
  };
  trustedBy: {
    label: string;
  };
  services: {
    title: string;
    metrics: {
      projectsDelivered: string;
      nichesServed: string;
    };
    items: {
      webDesign: {
        title: string;
        description: string;
      };
      customSoftware: {
        title: string;
        description: string;
      };
      aiAutomation: {
        title: string;
        description: string;
      };
      seoGrowth: {
        title: string;
        description: string;
      };
    };
  };
  mockup: {
    navigation: {
      services: string;
      benefits: string;
      projects: string;
      prices: string;
      clients: string;
    };
    badge: string;
    heading: {
      line1: string;
      line2: string;
    };
    description: string;
    cta: {
      viewPrices: string;
      scheduleNow: string;
    };
    trust: string;
  };
  expertise: {
    label: string;
    heading: {
      line1: string;
      line2: string;
    };
    description: string;
    cta: string;
  };
  solutionsSuite: {
    heading: string;
    description: string;
    items: {
      antiFraud: {
        title: string;
        description: string;
      };
      checkout: {
        title: string;
        description: string;
      };
      subscriptions: {
        title: string;
        description: string;
      };
    };
  };
  faq: {
    heading: string;
    description: string;
    items: Array<{
      question: string;
      answer: string;
    }>;
  };
  finalCTA: {
    heading: string;
    description: string;
    cta: string;
  };
  footer: {
    copyright: string;
  };
}

type TranslationCopy = Omit<Translations, "whatsappNumber">;

const year = new Date().getFullYear();

const english: TranslationCopy = {
  seo: {
    title: "Home Services Marketing Agency in the USA | Monfily",
    description:
      "Google-first marketing for U.S. home service companies: landing pages, branding, qualified leads, local SEO, Google Business Profile, Google Ads and conversion testing.",
  },
  header: {
    solutionsDropdown: {
      websiteCreation: "Landing pages & branding",
      softwareDevelopment: "Google Business Profile",
      artificialIntelligence: "Google Ads & qualified leads",
      technicalSEO: "Local SEO & conversion testing",
    },
    languages: {
      portugueseBrazil: "Portuguese (Brazil)",
      portuguesePortugal: "Portuguese (Portugal)",
      english: "English",
      spanish: "Spanish",
      italian: "Italian",
      singapore: "English (Singapore)",
    },
    cta: "Get a growth plan",
    ctaMobile: "Let's talk",
  },
  hero: {
    badge: {
      chosenBy: "Marketing for U.S. Home Services",
      clients: " — ",
      in: "",
    },
    rotatingTexts: ["HVAC", "Roofing", "Plumbing", "Electrical", "Landscaping"],
    heading: {
      line1: "Own your market.",
      line2: "Win more ",
      line3: "local jobs.",
    },
    description:
      "Google-first growth systems for U.S. home service companies. We turn local searches into booked calls with high-converting pages, local SEO, Google Ads, branding and rigorous user testing.",
    cta: {
      primary: "Start growing",
      secondary: "Explore our system",
    },
    features: {
      performance: {
        title: "Built to convert",
        description: "Fast pages focused on calls and estimates.",
      },
      optimized: {
        title: "Google-first",
        description: "Local visibility across Search, Maps and Ads.",
      },
    },
  },
  trustedBy: {
    label: "One Google-first growth system across:",
  },
  services: {
    title: "Everything a home service brand needs to dominate locally.",
    metrics: {
      projectsDelivered: "growth projects delivered",
      nichesServed: "home service verticals served",
    },
    items: {
      webDesign: {
        title: "Landing Pages & Branding",
        description:
          "Clear positioning, memorable identity and mobile-first landing pages engineered to turn high-intent traffic into calls and estimate requests.",
      },
      customSoftware: {
        title: "Google Business Profile & Local SEO",
        description:
          "Profile optimization, service-area strategy, local pages, citations and review systems that improve visibility in Google Search and Maps.",
      },
      aiAutomation: {
        title: "Google Ads & Qualified Leads",
        description:
          "Search, Local Services and remarketing campaigns with accurate tracking, intent-led keywords and lead quality controls.",
      },
      seoGrowth: {
        title: "User Testing & Conversion",
        description:
          "Real-user feedback, call-path analysis and continuous testing to remove friction and increase booked jobs from every channel.",
      },
    },
  },
  mockup: {
    navigation: {
      services: "Services",
      benefits: "Why us",
      projects: "Reviews",
      prices: "Financing",
      clients: "Service areas",
    },
    badge: "24/7 emergency HVAC service",
    heading: {
      line1: "Comfort restored.",
      line2: " Fast, honest, local.",
    },
    description:
      "Licensed HVAC experts for repairs, tune-ups and installations. Upfront pricing and same-day availability.",
    cta: {
      viewPrices: "Request service",
      scheduleNow: "Call now",
    },
    trust: "4.9 from local homeowners",
  },
  expertise: {
    label: "Our Google expertise",
    heading: {
      line1: "Be visible at the exact moment",
      line2: "homeowners need your service.",
    },
    description:
      "We connect Google Business Profile, Search, Maps, Ads, Analytics and call tracking into one measurable system built around booked jobs—not vanity metrics.",
    cta: "Talk to a growth strategist",
  },
  solutionsSuite: {
    heading: "A complete local growth engine.",
    description:
      "Each part works together so your brand is found, trusted and chosen across the entire homeowner journey.",
    items: {
      antiFraud: {
        title: "Local Authority",
        description:
          "Service-area content, reputation strategy and consistent business signals that help Google and homeowners trust your company.",
      },
      checkout: {
        title: "Lead Intelligence",
        description:
          "Call, form and campaign tracking that shows which searches generate qualified opportunities—not just clicks.",
      },
      subscriptions: {
        title: "Continuous Optimization",
        description:
          "Monthly testing across pages, offers, keywords and audiences to lower acquisition costs and keep job volume growing.",
      },
    },
  },
  faq: {
    heading: "Frequently asked questions",
    description:
      "Straight answers about growing a home service company with a Google-first marketing system.",
    items: [
      {
        question: "Which home service niches do you work with?",
        answer:
          "We specialize in HVAC, roofing, plumbing, electrical, landscaping, remodeling, cleaning, pest control and other local service businesses across the United States.",
      },
      {
        question: "Do you manage Google Business Profile?",
        answer:
          "Yes. We optimize categories, services, service areas, photos, posts, Q&A, reviews and local relevance while keeping the profile compliant with Google guidelines.",
      },
      {
        question: "Can you generate exclusive leads?",
        answer:
          "Yes. Leads generated through your landing pages, Google Ads and local presence belong to your business. We focus on quality, tracking and booked-job potential.",
      },
      {
        question: "Do you build landing pages and branding?",
        answer:
          "Yes. We create the positioning, visual direction, copy and responsive landing pages needed to make your company look credible and convert traffic.",
      },
      {
        question: "How do you measure results?",
        answer:
          "We track qualified calls, forms, booked estimates, lead source and acquisition cost using Google Analytics, Ads data and call tracking.",
      },
      {
        question: "Do you work with one company per market?",
        answer:
          "We review service areas before engagement and avoid direct conflicts whenever exclusivity is part of the agreed growth plan.",
      },
      {
        question: "How soon can we start?",
        answer:
          "After the discovery call and access handoff, we can begin the audit immediately and deliver a prioritized launch roadmap.",
      },
    ],
  },
  finalCTA: {
    heading: "Ready to win more local jobs?",
    description:
      "Tell us your trade and service area. We will map the fastest Google-first path to more qualified calls and booked estimates.",
    cta: "Get your growth plan",
  },
  footer: {
    copyright: `© ${year} Monfily Digital. Google-first marketing for U.S. home services.`,
  },
};

const portugueseBrazil: TranslationCopy = {
  seo: {
    title: "Marketing para Home Services nos EUA | Monfily",
    description:
      "Marketing focado em Google para empresas de home services nos EUA: landing pages, branding, leads, SEO local, Google Meu Negócio, Google Ads e testes de conversão.",
  },
  header: {
    solutionsDropdown: {
      websiteCreation: "Landing pages e branding",
      softwareDevelopment: "Google Meu Negócio",
      artificialIntelligence: "Google Ads e leads qualificados",
      technicalSEO: "SEO local e testes de conversão",
    },
    languages: {
      portugueseBrazil: "Português (Brasil)",
      portuguesePortugal: "Português (Portugal)",
      english: "Inglês",
      spanish: "Espanhol",
      italian: "Italiano",
      singapore: "Inglês (Singapura)",
    },
    cta: "Receber plano de crescimento",
    ctaMobile: "Falar agora",
  },
  hero: {
    badge: {
      chosenBy: "Marketing para Home Services nos EUA",
      clients: " — ",
      in: "",
    },
    rotatingTexts: ["HVAC", "Roofing", "Plumbing", "Electrical", "Landscaping"],
    heading: {
      line1: "Domine sua região.",
      line2: "Conquiste mais ",
      line3: "clientes locais.",
    },
    description:
      "Sistemas de crescimento focados em Google para empresas de home services nos EUA. Transformamos buscas locais em ligações e orçamentos com landing pages, SEO local, Google Ads, branding e testes reais de conversão.",
    cta: {
      primary: "Começar agora",
      secondary: "Conhecer nosso método",
    },
    features: {
      performance: {
        title: "Feito para converter",
        description: "Páginas rápidas focadas em ligações e orçamentos.",
      },
      optimized: {
        title: "Especialistas em Google",
        description: "Presença local em Search, Maps e Ads.",
      },
    },
  },
  trustedBy: {
    label: "Um único sistema de crescimento em todo o Google:",
  },
  services: {
    title: "Tudo o que uma empresa de home services precisa para dominar sua região.",
    metrics: {
      projectsDelivered: "projetos de crescimento entregues",
      nichesServed: "nichos de home services atendidos",
    },
    items: {
      webDesign: {
        title: "Landing Pages e Branding",
        description:
          "Posicionamento claro, identidade memorável e landing pages mobile-first criadas para transformar tráfego de alta intenção em ligações e pedidos de orçamento.",
      },
      customSoftware: {
        title: "Google Meu Negócio e SEO Local",
        description:
          "Otimização de perfil, estratégia por área de atendimento, páginas locais, citações e avaliações para crescer no Google Search e Maps.",
      },
      aiAutomation: {
        title: "Google Ads e Leads Qualificados",
        description:
          "Campanhas de Search, Local Services e remarketing com rastreamento preciso, palavras-chave de intenção e controle de qualidade dos leads.",
      },
      seoGrowth: {
        title: "User Testing e Conversão",
        description:
          "Testes com usuários reais, análise da jornada de contato e otimização contínua para aumentar os serviços agendados em cada canal.",
      },
    },
  },
  mockup: {
    navigation: {
      services: "Serviços",
      benefits: "Por que nós",
      projects: "Avaliações",
      prices: "Financiamento",
      clients: "Áreas atendidas",
    },
    badge: "Atendimento HVAC de emergência 24/7",
    heading: {
      line1: "Conforto restaurado.",
      line2: " Rápido, honesto e local.",
    },
    description:
      "Especialistas licenciados em HVAC para reparos, manutenção e instalação. Preço transparente e atendimento no mesmo dia.",
    cta: {
      viewPrices: "Solicitar serviço",
      scheduleNow: "Ligar agora",
    },
    trust: "Nota 4,9 entre clientes locais",
  },
  expertise: {
    label: "Nossa especialidade em Google",
    heading: {
      line1: "Apareça no momento exato",
      line2: "em que o cliente precisa de você.",
    },
    description:
      "Conectamos Google Meu Negócio, Search, Maps, Ads, Analytics e call tracking em um sistema mensurável focado em serviços agendados — não em métricas de vaidade.",
    cta: "Falar com um estrategista",
  },
  solutionsSuite: {
    heading: "Um motor completo de crescimento local.",
    description:
      "Cada parte trabalha em conjunto para sua empresa ser encontrada, transmitir confiança e ser escolhida em toda a jornada do cliente.",
    items: {
      antiFraud: {
        title: "Autoridade Local",
        description:
          "Conteúdo por área de serviço, estratégia de reputação e sinais consistentes que aumentam a confiança do Google e dos clientes.",
      },
      checkout: {
        title: "Inteligência de Leads",
        description:
          "Rastreamento de ligações, formulários e campanhas para descobrir quais buscas geram oportunidades qualificadas — não apenas cliques.",
      },
      subscriptions: {
        title: "Otimização Contínua",
        description:
          "Testes mensais em páginas, ofertas, palavras-chave e públicos para reduzir o custo de aquisição e aumentar o volume de serviços.",
      },
    },
  },
  faq: {
    heading: "Perguntas frequentes",
    description:
      "Respostas diretas sobre como crescer uma empresa de home services com marketing focado em Google.",
    items: [
      {
        question: "Quais nichos de home services vocês atendem?",
        answer:
          "Somos especializados em HVAC, roofing, plumbing, elétrica, landscaping, reformas, limpeza, controle de pragas e outros serviços locais nos Estados Unidos.",
      },
      {
        question: "Vocês gerenciam o Google Meu Negócio?",
        answer:
          "Sim. Otimizamos categorias, serviços, áreas atendidas, fotos, posts, perguntas, avaliações e relevância local seguindo as diretrizes do Google.",
      },
      {
        question: "Os leads são exclusivos para minha empresa?",
        answer:
          "Sim. Os leads gerados pelas suas páginas, campanhas e presença local pertencem à sua empresa. Nosso foco é qualidade, rastreamento e potencial de agendamento.",
      },
      {
        question: "Vocês criam landing pages e branding?",
        answer:
          "Sim. Criamos posicionamento, identidade visual, copy e páginas responsivas para sua empresa transmitir credibilidade e converter tráfego.",
      },
      {
        question: "Como os resultados são medidos?",
        answer:
          "Rastreamos ligações qualificadas, formulários, orçamentos agendados, origem do lead e custo de aquisição com Analytics, Ads e call tracking.",
      },
      {
        question: "Vocês trabalham com uma empresa por região?",
        answer:
          "Analisamos as áreas de atendimento antes do início e evitamos conflitos diretos quando a exclusividade faz parte do plano contratado.",
      },
      {
        question: "Em quanto tempo podemos começar?",
        answer:
          "Após a reunião inicial e liberação dos acessos, iniciamos a auditoria e entregamos um plano priorizado de lançamento.",
      },
    ],
  },
  finalCTA: {
    heading: "Pronto para conquistar mais serviços locais?",
    description:
      "Conte seu nicho e área de atendimento. Vamos mapear o caminho mais rápido no Google para gerar ligações qualificadas e mais orçamentos.",
    cta: "Receber plano de crescimento",
  },
  footer: {
    copyright: `© ${year} Monfily Digital. Marketing focado em Google para home services nos EUA.`,
  },
};

const portuguesePortugal: TranslationCopy = {
  ...portugueseBrazil,
  seo: {
    title: "Marketing para Home Services nos EUA | Monfily",
    description:
      "Marketing orientado para o Google para empresas de home services nos EUA: landing pages, branding, leads, SEO local, Perfil da Empresa no Google, Google Ads e testes de conversão.",
  },
  header: {
    ...portugueseBrazil.header,
    solutionsDropdown: {
      websiteCreation: "Landing pages e branding",
      softwareDevelopment: "Perfil da Empresa no Google",
      artificialIntelligence: "Google Ads e leads qualificados",
      technicalSEO: "SEO local e testes de conversão",
    },
    cta: "Receber plano de crescimento",
    ctaMobile: "Falar agora",
  },
  hero: {
    ...portugueseBrazil.hero,
    description:
      "Sistemas de crescimento orientados para o Google para empresas de home services nos EUA. Transformamos pesquisas locais em chamadas e pedidos de orçamento através de landing pages, SEO local, Google Ads, branding e testes reais de conversão.",
  },
  trustedBy: {
    label: "Um único sistema de crescimento em todo o ecossistema Google:",
  },
  services: {
    ...portugueseBrazil.services,
    title: "Tudo o que uma empresa de home services precisa para liderar a sua região.",
    items: {
      ...portugueseBrazil.services.items,
      customSoftware: {
        title: "Perfil da Empresa no Google e SEO Local",
        description:
          "Otimização do perfil, estratégia por área de serviço, páginas locais, citações e avaliações para crescer no Google Search e Maps.",
      },
    },
  },
  expertise: {
    ...portugueseBrazil.expertise,
    description:
      "Ligamos o Perfil da Empresa no Google, Search, Maps, Ads, Analytics e call tracking num sistema mensurável focado em serviços marcados — não em métricas de vaidade.",
  },
  finalCTA: {
    heading: "Preparado para conquistar mais serviços locais?",
    description:
      "Partilhe o seu nicho e área de serviço. Vamos mapear o caminho mais rápido no Google para gerar chamadas qualificadas e mais orçamentos.",
    cta: "Receber plano de crescimento",
  },
  footer: {
    copyright: `© ${year} Monfily Digital. Marketing orientado para o Google para home services nos EUA.`,
  },
};

const spanish: TranslationCopy = {
  seo: {
    title: "Marketing para Home Services en EE. UU. | Monfily",
    description:
      "Marketing centrado en Google para empresas de servicios para el hogar en EE. UU.: landing pages, branding, leads, SEO local, Perfil de Empresa, Google Ads y testing.",
  },
  header: {
    solutionsDropdown: {
      websiteCreation: "Landing pages y branding",
      softwareDevelopment: "Perfil de Empresa en Google",
      artificialIntelligence: "Google Ads y leads cualificados",
      technicalSEO: "SEO local y optimización",
    },
    languages: {
      portugueseBrazil: "Portugués (Brasil)",
      portuguesePortugal: "Portugués (Portugal)",
      english: "Inglés",
      spanish: "Español",
      italian: "Italiano",
      singapore: "Inglés (Singapur)",
    },
    cta: "Recibir plan de crecimiento",
    ctaMobile: "Hablemos",
  },
  hero: {
    badge: {
      chosenBy: "Marketing para Home Services en EE. UU.",
      clients: " — ",
      in: "",
    },
    rotatingTexts: ["HVAC", "Roofing", "Plumbing", "Electrical", "Landscaping"],
    heading: {
      line1: "Domina tu zona.",
      line2: "Consigue más ",
      line3: "clientes locales.",
    },
    description:
      "Sistemas de crecimiento centrados en Google para empresas de servicios del hogar en EE. UU. Convertimos búsquedas locales en llamadas y presupuestos con landing pages, SEO local, Google Ads, branding y pruebas de conversión.",
    cta: {
      primary: "Empezar ahora",
      secondary: "Conocer el sistema",
    },
    features: {
      performance: {
        title: "Diseñado para convertir",
        description: "Páginas rápidas enfocadas en llamadas y presupuestos.",
      },
      optimized: {
        title: "Especialistas en Google",
        description: "Visibilidad local en Search, Maps y Ads.",
      },
    },
  },
  trustedBy: {
    label: "Un sistema de crecimiento en todo Google:",
  },
  services: {
    title: "Todo lo que una marca de home services necesita para dominar su zona.",
    metrics: {
      projectsDelivered: "proyectos de crecimiento entregados",
      nichesServed: "nichos de servicios atendidos",
    },
    items: {
      webDesign: {
        title: "Landing Pages y Branding",
        description:
          "Posicionamiento claro, identidad memorable y páginas mobile-first creadas para convertir tráfico de alta intención en llamadas y presupuestos.",
      },
      customSoftware: {
        title: "Perfil de Empresa y SEO Local",
        description:
          "Optimización del perfil, estrategia por zona, páginas locales, citaciones y reseñas para crecer en Google Search y Maps.",
      },
      aiAutomation: {
        title: "Google Ads y Leads Cualificados",
        description:
          "Campañas de Search, Local Services y remarketing con medición precisa, keywords de intención y control de calidad.",
      },
      seoGrowth: {
        title: "User Testing y Conversión",
        description:
          "Pruebas con usuarios reales, análisis de la ruta de contacto y optimización continua para aumentar los trabajos reservados.",
      },
    },
  },
  mockup: {
    navigation: {
      services: "Servicios",
      benefits: "Por qué nosotros",
      projects: "Reseñas",
      prices: "Financiación",
      clients: "Zonas de servicio",
    },
    badge: "Servicio HVAC de emergencia 24/7",
    heading: {
      line1: "Confort restaurado.",
      line2: " Rápido, honesto y local.",
    },
    description:
      "Expertos certificados en HVAC para reparaciones, mantenimiento e instalación. Precios claros y servicio el mismo día.",
    cta: {
      viewPrices: "Solicitar servicio",
      scheduleNow: "Llamar ahora",
    },
    trust: "4,9 según clientes locales",
  },
  expertise: {
    label: "Nuestra experiencia en Google",
    heading: {
      line1: "Aparece en el momento exacto",
      line2: "en que el cliente te necesita.",
    },
    description:
      "Conectamos Perfil de Empresa, Search, Maps, Ads, Analytics y call tracking en un sistema medible centrado en trabajos reservados, no en métricas vacías.",
    cta: "Hablar con un estratega",
  },
  solutionsSuite: {
    heading: "Un motor completo de crecimiento local.",
    description:
      "Cada pieza trabaja en conjunto para que tu empresa sea encontrada, genere confianza y sea elegida durante todo el recorrido del cliente.",
    items: {
      antiFraud: {
        title: "Autoridad Local",
        description:
          "Contenido por zona, estrategia de reputación y señales consistentes que aumentan la confianza de Google y de los clientes.",
      },
      checkout: {
        title: "Inteligencia de Leads",
        description:
          "Medición de llamadas, formularios y campañas para identificar qué búsquedas generan oportunidades cualificadas, no solo clics.",
      },
      subscriptions: {
        title: "Optimización Continua",
        description:
          "Pruebas mensuales de páginas, ofertas, keywords y audiencias para reducir costes y aumentar el volumen de trabajos.",
      },
    },
  },
  faq: {
    heading: "Preguntas frecuentes",
    description:
      "Respuestas claras sobre cómo hacer crecer una empresa de home services con un sistema centrado en Google.",
    items: [
      {
        question: "¿Con qué nichos de home services trabajáis?",
        answer:
          "Nos especializamos en HVAC, roofing, plumbing, electricidad, landscaping, reformas, limpieza, control de plagas y otros servicios locales en Estados Unidos.",
      },
      {
        question: "¿Gestionáis el Perfil de Empresa en Google?",
        answer:
          "Sí. Optimizamos categorías, servicios, zonas, fotos, publicaciones, preguntas, reseñas y relevancia local siguiendo las directrices de Google.",
      },
      {
        question: "¿Los leads son exclusivos?",
        answer:
          "Sí. Los leads generados por tus páginas, campañas y presencia local pertenecen a tu empresa. Priorizamos calidad, trazabilidad y potencial de reserva.",
      },
      {
        question: "¿Creáis landing pages y branding?",
        answer:
          "Sí. Creamos posicionamiento, identidad visual, copy y páginas responsive para transmitir credibilidad y convertir el tráfico.",
      },
      {
        question: "¿Cómo medís los resultados?",
        answer:
          "Medimos llamadas cualificadas, formularios, presupuestos reservados, origen del lead y coste de adquisición con Analytics, Ads y call tracking.",
      },
      {
        question: "¿Trabajáis con una empresa por zona?",
        answer:
          "Revisamos las áreas de servicio antes de empezar y evitamos conflictos directos cuando la exclusividad forma parte del plan acordado.",
      },
      {
        question: "¿Cuándo podemos empezar?",
        answer:
          "Tras la reunión inicial y el acceso a las cuentas, iniciamos la auditoría y entregamos una hoja de ruta priorizada.",
      },
    ],
  },
  finalCTA: {
    heading: "¿Listo para conseguir más trabajos locales?",
    description:
      "Cuéntanos tu especialidad y zona. Trazaremos la ruta más rápida en Google para generar llamadas cualificadas y más presupuestos.",
    cta: "Recibir plan de crecimiento",
  },
  footer: {
    copyright: `© ${year} Monfily Digital. Marketing Google-first para home services en EE. UU.`,
  },
};

const italian: TranslationCopy = {
  seo: {
    title: "Marketing per Home Services negli USA | Monfily",
    description:
      "Marketing Google-first per aziende di servizi per la casa negli USA: landing page, branding, lead, SEO locale, Profilo dell'attività, Google Ads e user testing.",
  },
  header: {
    solutionsDropdown: {
      websiteCreation: "Landing page e branding",
      softwareDevelopment: "Profilo dell'attività su Google",
      artificialIntelligence: "Google Ads e lead qualificati",
      technicalSEO: "SEO locale e conversione",
    },
    languages: {
      portugueseBrazil: "Portoghese (Brasile)",
      portuguesePortugal: "Portoghese (Portogallo)",
      english: "Inglese",
      spanish: "Spagnolo",
      italian: "Italiano",
      singapore: "Inglese (Singapore)",
    },
    cta: "Ricevi il piano di crescita",
    ctaMobile: "Parliamone",
  },
  hero: {
    badge: {
      chosenBy: "Marketing per Home Services negli USA",
      clients: " — ",
      in: "",
    },
    rotatingTexts: ["HVAC", "Roofing", "Plumbing", "Electrical", "Landscaping"],
    heading: {
      line1: "Domina la tua zona.",
      line2: "Ottieni più ",
      line3: "clienti locali.",
    },
    description:
      "Sistemi di crescita Google-first per aziende di servizi per la casa negli USA. Trasformiamo le ricerche locali in chiamate e preventivi con landing page, SEO locale, Google Ads, branding e test di conversione.",
    cta: {
      primary: "Inizia ora",
      secondary: "Scopri il sistema",
    },
    features: {
      performance: {
        title: "Progettato per convertire",
        description: "Pagine veloci focalizzate su chiamate e preventivi.",
      },
      optimized: {
        title: "Specialisti Google",
        description: "Visibilità locale su Search, Maps e Ads.",
      },
    },
  },
  trustedBy: {
    label: "Un unico sistema di crescita in tutto Google:",
  },
  services: {
    title: "Tutto ciò che un brand di home services necessita per dominare localmente.",
    metrics: {
      projectsDelivered: "progetti di crescita consegnati",
      nichesServed: "settori home services serviti",
    },
    items: {
      webDesign: {
        title: "Landing Page e Branding",
        description:
          "Posizionamento chiaro, identità memorabile e landing page mobile-first create per trasformare il traffico ad alta intenzione in chiamate e preventivi.",
      },
      customSoftware: {
        title: "Profilo Google e SEO Locale",
        description:
          "Ottimizzazione del profilo, strategia per area, pagine locali, citazioni e recensioni per crescere su Google Search e Maps.",
      },
      aiAutomation: {
        title: "Google Ads e Lead Qualificati",
        description:
          "Campagne Search, Local Services e remarketing con tracking preciso, keyword ad alta intenzione e controllo qualità dei lead.",
      },
      seoGrowth: {
        title: "User Testing e Conversione",
        description:
          "Test con utenti reali, analisi del percorso di contatto e ottimizzazione continua per aumentare i lavori prenotati.",
      },
    },
  },
  mockup: {
    navigation: {
      services: "Servizi",
      benefits: "Perché noi",
      projects: "Recensioni",
      prices: "Finanziamenti",
      clients: "Aree servite",
    },
    badge: "Assistenza HVAC di emergenza 24/7",
    heading: {
      line1: "Comfort ripristinato.",
      line2: " Rapido, onesto, locale.",
    },
    description:
      "Tecnici HVAC certificati per riparazioni, manutenzione e installazioni. Prezzi trasparenti e disponibilità in giornata.",
    cta: {
      viewPrices: "Richiedi assistenza",
      scheduleNow: "Chiama ora",
    },
    trust: "4,9 dai clienti locali",
  },
  expertise: {
    label: "La nostra esperienza Google",
    heading: {
      line1: "Fatti trovare nel momento esatto",
      line2: "in cui il cliente ha bisogno di te.",
    },
    description:
      "Colleghiamo Profilo dell'attività, Search, Maps, Ads, Analytics e call tracking in un sistema misurabile focalizzato sui lavori prenotati, non sulle vanity metrics.",
    cta: "Parla con uno strategist",
  },
  solutionsSuite: {
    heading: "Un motore completo di crescita locale.",
    description:
      "Ogni elemento lavora insieme affinché la tua azienda venga trovata, ispiri fiducia e venga scelta lungo tutto il percorso del cliente.",
    items: {
      antiFraud: {
        title: "Autorità Locale",
        description:
          "Contenuti per area, strategia di reputazione e segnali coerenti che aumentano la fiducia di Google e dei clienti.",
      },
      checkout: {
        title: "Lead Intelligence",
        description:
          "Tracking di chiamate, moduli e campagne per capire quali ricerche generano opportunità qualificate, non solo clic.",
      },
      subscriptions: {
        title: "Ottimizzazione Continua",
        description:
          "Test mensili su pagine, offerte, keyword e pubblici per ridurre i costi di acquisizione e aumentare i lavori.",
      },
    },
  },
  faq: {
    heading: "Domande frequenti",
    description:
      "Risposte chiare su come far crescere un'azienda di home services con un sistema Google-first.",
    items: [
      {
        question: "Con quali settori home services lavorate?",
        answer:
          "Siamo specializzati in HVAC, roofing, plumbing, elettricità, landscaping, ristrutturazioni, pulizie, pest control e altri servizi locali negli USA.",
      },
      {
        question: "Gestite il Profilo dell'attività su Google?",
        answer:
          "Sì. Ottimizziamo categorie, servizi, aree, foto, post, Q&A, recensioni e rilevanza locale nel rispetto delle linee guida Google.",
      },
      {
        question: "I lead sono esclusivi?",
        answer:
          "Sì. I lead generati dalle tue pagine, campagne e presenza locale appartengono alla tua azienda. Puntiamo su qualità, tracking e potenziale di prenotazione.",
      },
      {
        question: "Create landing page e branding?",
        answer:
          "Sì. Creiamo posizionamento, identità visiva, copy e pagine responsive per comunicare autorevolezza e convertire il traffico.",
      },
      {
        question: "Come misurate i risultati?",
        answer:
          "Monitoriamo chiamate qualificate, moduli, preventivi prenotati, origine del lead e costo di acquisizione con Analytics, Ads e call tracking.",
      },
      {
        question: "Lavorate con una sola azienda per zona?",
        answer:
          "Valutiamo le aree di servizio prima dell'incarico ed evitiamo conflitti diretti quando l'esclusività fa parte del piano concordato.",
      },
      {
        question: "Quando possiamo iniziare?",
        answer:
          "Dopo la call iniziale e la consegna degli accessi, avviamo subito l'audit e prepariamo una roadmap di lancio prioritaria.",
      },
    ],
  },
  finalCTA: {
    heading: "Pronto a conquistare più lavori locali?",
    description:
      "Indicaci il tuo settore e l'area servita. Tracceremo il percorso più rapido su Google per ottenere chiamate qualificate e preventivi.",
    cta: "Ricevi il piano di crescita",
  },
  footer: {
    copyright: `© ${year} Monfily Digital. Marketing Google-first per home services negli USA.`,
  },
};


const defaultWhatsAppNumbers: Record<Language, string> = {
  "pt-br": "5511978267321",
  "pt-pt": "351927327279",
  en: "13057918189",
  es: "34613484139",
  it: "393511740751",
  sg: "6591366447",
};

const envWhatsAppNumbers: Partial<Record<Language, string | undefined>> = {
  "pt-br": import.meta.env.VITE_WHATSAPP_PHONE_BR,
  "pt-pt": import.meta.env.VITE_WHATSAPP_PHONE_PT,
  en: import.meta.env.VITE_WHATSAPP_PHONE_US,
  es: import.meta.env.VITE_WHATSAPP_PHONE_ES,
  it: import.meta.env.VITE_WHATSAPP_PHONE_IT,
  sg: import.meta.env.VITE_WHATSAPP_PHONE_SG,
};

function withNumber(language: Language, copy: TranslationCopy): Translations {
  return {
    ...copy,
    whatsappNumber: envWhatsAppNumbers[language] || defaultWhatsAppNumbers[language],
  };
}

export const translations: Record<Language, Translations> = {
  "pt-br": withNumber("pt-br", portugueseBrazil),
  "pt-pt": withNumber("pt-pt", portuguesePortugal),
  en: withNumber("en", english),
  es: withNumber("es", spanish),
  it: withNumber("it", italian),
  sg: withNumber("sg", english),
};
