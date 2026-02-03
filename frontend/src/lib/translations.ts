export type Language = 'pt' | 'en';

export interface Translations {
  // SEO Meta Tags
  seo: {
    title: string;
    description: string;
  };
  
  // Header
  header: {
    nav: {
      solutions: string;
      about: string;
      methodology: string;
      support: string;
      insights: string;
      menu: string;
      menuDescription: string;
    };
    solutionsDropdown: {
      websiteCreation: string;
      softwareDevelopment: string;
      artificialIntelligence: string;
      technicalSEO: string;
    };
    languages: {
      portuguese: string;
      english: string;
    };
    cta: string;
  };
  
  // Hero Section
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
  
  // Trusted By Section
  trustedBy: {
    label: string;
  };
  
  // Services Section
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
  
  // Website Mockups
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

  // Expertise Section
  expertise: {
    label: string;
    heading: {
      line1: string;
      line2: string;
    };
    description: string;
    cta: string;
  };

  // Solutions Suite Section
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
        badge: string;
      };
    };
  };
  faq: {
    heading: string;
    description: string;
    items: {
      question: string;
      answer: string;
    }[];
  };
  finalCTA: {
    heading: string;
    description: string;
    cta: string;
  };
  footer: {
    columns: {
      account: {
        title: string;
        signup: string;
        login: string;
      };
      support: {
        title: string;
        email: string;
        talkToSupport: string;
        joinDiscord: string;
      };
      website: {
        title: string;
        docs: string;
        integrations: string;
        products: string;
        fees: string;
        privacy: string;
        terms: string;
        status: string;
      };
      ai: {
        title: string;
        chat: string;
        llms: string;
      };
    };
    copyright: string;
  };
}

export const translations: Record<Language, Translations> = {
  pt: {
    seo: {
      title: 'Desenvolvimento de Software, Sites e Automação com IA | Monfily',
      description: 'Especialistas em transformação digital. Oferecemos criação de websites, sistemas web personalizados, automação de processos com IA e consultoria de SEO para alavancar seus resultados. Peça um orçamento.',
    },
    header: {
      nav: {
        solutions: 'Soluções',
        about: 'Sobre',
        methodology: 'Metodologia',
        support: 'Suporte',
        insights: 'Insights',
        menu: 'Menu de Navegação',
        menuDescription: 'Menu principal de navegação do site',
      },
      solutionsDropdown: {
        websiteCreation: 'Criação de Sites',
        softwareDevelopment: 'Desenvolvimento de Software',
        artificialIntelligence: 'Inteligência Artificial',
        technicalSEO: 'SEO Técnico',
      },
      languages: {
        portuguese: 'Português (Brasil)',
        english: 'Inglês (Estados Unidos)',
      },
      cta: 'Falar com Especialista',
    },
    hero: {
      badge: {
        chosenBy: 'Escolhido por ',
        clients: '+50 Clientes em ',
        in: '',
      },
      rotatingTexts: [
        'Varejo & E-commerce',
        'Saúde & Clínicas',
        'Imobiliária & Construção',
        'Advocacia & Consultoria',
        'Serviços & Startups',
      ],
      heading: {
        line1: 'Código Puro.',
        line2: 'Resultados ',
        line3: 'Reais.',
      },
      description: 'A infraestrutura digital completa para o seu negócio. Unimos design de Criação de Sites de alta performance, engenharia de Software, Inteligência Artificial (IA) e SEO técnico para gerar receita e eficiência.',
      cta: {
        primary: 'Iniciar Meu Projeto',
        secondary: 'Por que nós?',
      },
      features: {
        performance: {
          title: 'Performance',
          description: 'Sites rápidos que convertem.',
        },
        optimized: {
          title: 'Otimizado',
          description: 'Estrutura preparada para SEO.',
        },
      },
    },
    trustedBy: {
      label: 'Utilizamos as melhores tecnologias:',
    },
    services: {
      title: 'Soluções validadas em dezenas de mercados.',
      metrics: {
        projectsDelivered: 'Projetos entregues',
        nichesServed: 'Nichos atendidos',
      },
      items: {
        webDesign: {
          title: 'Web Design Premium',
          description: 'Sites ultra-rápidos e visualmente impactantes. Transformamos visitantes em leads qualificados com UX de ponta.',
        },
        customSoftware: {
          title: 'Software Sob Medida',
          description: 'Do sistema interno ao SaaS complexo. Desenvolvemos a ferramenta exata que sua operação precisa para escalar sem travas.',
        },
        aiAutomation: {
          title: 'Automação com IA',
          description: 'Reduza custos operacionais. Implementamos agentes inteligentes que trabalham 24/7 no atendimento e processos repetitivos.',
        },
        seoGrowth: {
          title: 'SEO Técnico & Growth',
          description: 'Pare de caçar clientes. Posicionamos sua marca no topo do Google para atrair tráfego orgânico e intencional.',
        },
      },
    },
    mockup: {
      navigation: {
        services: 'Serviços',
        benefits: 'Benefícios',
        projects: 'Projetos',
        prices: 'Preços',
        clients: 'Clientes',
      },
      badge: 'Disponível Para Projetos',
      heading: {
        line1: 'Parceiro de Design de Classe Mundial ',
        line2: 'Para Startups de IA',
      },
      description: 'Soluções de design rápidas, confiáveis e escaláveis adaptadas para sua startup em crescimento.',
      cta: {
        viewPrices: 'Ver Preços',
        scheduleNow: 'Agendar Agora',
      },
      trust: 'Confiado Por Mais de 50 Empresas',
    },
    expertise: {
      label: 'Nossa Expertise',
      heading: {
        line1: 'Desenvolvimento robusto.',
        line2: 'Performance escalável.',
      },
      description: 'Criamos ecossistemas digitais seguros e velozes. Unimos engenharia de software avançada com as melhores práticas de SEO Técnico para garantir que sua empresa cresça sem travas.',
      cta: 'Falar com Especialista',
    },
    solutionsSuite: {
      heading: 'Uma suíte de soluções para o seu negócio.',
      description: 'Centralize as operações da sua empresa com uma suíte completa que une pagamentos, dados e automações. Nossa tecnologia foi desenvolvida para garantir eficiência, segurança e escalabilidade à medida que o seu negócio evolui.',
      items: {
        antiFraud: {
          title: 'Proteção antifraude.',
          description: 'Detecte e previna fraudes automaticamente, garantindo segurança para você e seus clientes e principalmente seu negócio.',
        },
        checkout: {
          title: 'Check-out integrado.',
          description: 'Ofereça um processo de pagamento rápido e intuitivo, totalmente integrado à sua plataforma ou site totalmente customizável.',
        },
        subscriptions: {
          title: 'Assinaturas.',
          description: 'Gerencie planos recorrentes de forma simples, garantindo pagamentos previsíveis e fidelização de clientes.',
          badge: 'Em breve',
        },
      },
    },
    faq: {
      heading: 'Tem dúvidas? Relaxa, nós temos as respostas.',
      description: 'Selecionamos algumas dúvidas que recebemos com frequência sobre nossos serviços, elas podem ser úteis para você!',
      items: [
        {
          question: 'O que é a AbacatePay e para quem ela serve?',
          answer: 'A AbacatePay é uma plataforma de pagamentos completa desenvolvida para facilitar transações online para empresas de todos os tamanhos, desde startups até grandes corporações.',
        },
        {
          question: 'Quais formas de pagamento são aceitas (PIX, cartão de crédito, boleto)?',
          answer: 'Aceitamos as principais formas de pagamento do mercado, incluindo PIX com confirmação instantânea, cartões de crédito de diversas bandeiras e boleto bancário.',
        },
        {
          question: 'Posso usar com pessoa física ou é necessário CNPJ?',
          answer: 'Sim, a AbacatePay permite o cadastro tanto para pessoas físicas (CPF) quanto para pessoas jurídicas (CNPJ), facilitando o início de qualquer projeto.',
        },
        {
          question: 'A AbacatePay pode ser integrada apps feitos em lovable?',
          answer: 'Com certeza! Nossa API foi desenvolvida para ser flexível e pode ser integrada facilmente com aplicações criadas no Lovable e outras ferramentas no-code/low-code.',
        },
        {
          question: 'É possível fazer split de pagamento entre diferentes recebedores?',
          answer: 'Sim, possuímos uma funcionalidade robusta de split de pagamento que permite dividir os valores entre diferentes contas de forma automática e segura.',
        },
        {
          question: 'Quanto tempo demora para a minha conta ser verificada?',
          answer: 'Nosso processo de verificação é ágil e geralmente leva de 24 a 48 horas úteis após o envio de toda a documentação necessária.',
        },
      ],
    },
    finalCTA: {
      heading: 'Você chegou no fim da página.',
      description: 'Se chegou até aqui, é porque tá interessado. Então vai lá, faz logo o cadastro.',
      cta: 'Vai, clica nesse botão',
    },
    footer: {
      columns: {
        account: {
          title: 'Soluções',
          signup: 'Criação de Sites',
          login: 'Desenvolvimento de Software',
        },
        support: {
          title: 'Contato',
          email: 'contato@monfily.com',
          talkToSupport: 'Falar com especialista',
          joinDiscord: 'Agendar reunião',
        },
        website: {
          title: 'Recursos',
          docs: 'Sobre',
          integrations: 'Metodologia',
          products: 'Insights',
          fees: 'Portfólio',
          privacy: 'Privacidade',
          terms: 'Termos e condições',
          status: 'FAQ',
        },
        ai: {
          title: 'IA',
          chat: 'Assistente IA',
          llms: 'Modelos e LLMs',
        },
      },
      copyright: `© ${new Date().getFullYear()} Monfily Digital. Todos os direitos reservados.`,
    },
  },
  en: {
    seo: {
      title: 'Software Development, Websites & AI Automation | Monfily',
      description: 'Digital transformation experts. We offer website creation, custom web systems, AI process automation, and SEO consulting to boost your results. Get a quote.',
    },
    header: {
      nav: {
        solutions: 'Solutions',
        about: 'About',
        methodology: 'Methodology',
        support: 'Support',
        insights: 'Insights',
        menu: 'Navigation Menu',
        menuDescription: 'Main site navigation menu',
      },
      solutionsDropdown: {
        websiteCreation: 'Website Creation',
        softwareDevelopment: 'Software Development',
        artificialIntelligence: 'Artificial Intelligence',
        technicalSEO: 'Technical SEO',
      },
      languages: {
        portuguese: 'Portuguese (Brazil)',
        english: 'English (United States)',
      },
      cta: 'Talk to an Expert',
    },
    hero: {
      badge: {
        chosenBy: 'Chosen by ',
        clients: '+50 Clients in ',
        in: '',
      },
      rotatingTexts: [
        'Retail & E-commerce',
        'Healthcare & Clinics',
        'Real Estate & Construction',
        'Law & Consulting',
        'Services & Startups',
      ],
      heading: {
        line1: 'Pure Code.',
        line2: 'Real ',
        line3: 'Results.',
      },
      description: 'Complete digital infrastructure for your business. We combine high-performance Website Creation design, Software engineering, Artificial Intelligence (AI), and technical SEO to generate revenue and efficiency.',
      cta: {
        primary: 'Start My Project',
        secondary: 'Why us?',
      },
      features: {
        performance: {
          title: 'Performance',
          description: 'Fast sites that convert.',
        },
        optimized: {
          title: 'Optimized',
          description: 'SEO-ready structure.',
        },
      },
    },
    trustedBy: {
      label: 'We use the best technologies:',
    },
    services: {
      title: 'Solutions validated across dozens of markets.',
      metrics: {
        projectsDelivered: 'Projects delivered',
        nichesServed: 'Niches served',
      },
      items: {
        webDesign: {
          title: 'Premium Web Design',
          description: 'Ultra-fast and visually impactful websites. We turn visitors into qualified leads with cutting-edge UX.',
        },
        customSoftware: {
          title: 'Custom Software',
          description: 'From internal systems to complex SaaS. We develop the exact tool your operation needs to scale without bottlenecks.',
        },
        aiAutomation: {
          title: 'AI Automation',
          description: 'Reduce operational costs. We implement intelligent agents that work 24/7 on customer service and repetitive processes.',
        },
        seoGrowth: {
          title: 'Technical SEO & Growth',
          description: 'Stop hunting for clients. We position your brand at the top of Google to attract organic and intentional traffic.',
        },
      },
    },
    mockup: {
      navigation: {
        services: 'Services',
        benefits: 'Benefits',
        projects: 'Projects',
        prices: 'Prices',
        clients: 'Clients',
      },
      badge: 'Available For Projects',
      heading: {
        line1: 'World-Class Design Partner ',
        line2: 'For AI Startups',
      },
      description: 'Fast, reliable, and scalable design solutions tailored for your growing startup.',
      cta: {
        viewPrices: 'View Prices',
        scheduleNow: 'Schedule Now',
      },
      trust: 'Trusted By More Than 50 Companies',
    },
    expertise: {
      label: 'Our Expertise',
      heading: {
        line1: 'Robust development.',
        line2: 'Scalable performance.',
      },
      description: 'We create secure and fast digital ecosystems. We combine advanced software engineering with best practices in Technical SEO to ensure your company grows without bottlenecks.',
      cta: 'Talk to an Expert',
    },
    solutionsSuite: {
      heading: 'A suite of solutions for your business.',
      description: 'Centralize your company operations with a complete suite that combines payments, data and automation. Our technology was developed to ensure efficiency, security and scalability as your business evolves.',
      items: {
        antiFraud: {
          title: 'Anti-fraud protection.',
          description: 'Automatically detect and prevent fraud, ensuring security for you and your customers and especially your business.',
        },
        checkout: {
          title: 'Integrated check-out.',
          description: 'Offer a fast and intuitive payment process, fully integrated into your platform or fully customizable website.',
        },
        subscriptions: {
          title: 'Subscriptions.',
          description: 'Manage recurring plans simply, ensuring predictable payments and customer loyalty.',
          badge: 'Coming soon',
        },
      },
    },
    faq: {
      heading: 'Got questions? Relax, we have the answers.',
      description: "We've selected some common questions we receive about our services, they might be useful for you!",
      items: [
        {
          question: 'What is AbacatePay and who is it for?',
          answer: 'AbacatePay is a complete payment platform designed to facilitate online transactions for companies of all sizes, from startups to large corporations.',
        },
        {
          question: 'What payment methods are accepted (PIX, credit card, bank slip)?',
          answer: 'We accept the main payment methods on the market, including PIX with instant confirmation, credit cards from various brands, and bank slips.',
        },
        {
          question: 'Can I use it as an individual or do I need a CNPJ (Business ID)?',
          answer: 'Yes, AbacatePay allows registration for both individuals (CPF) and legal entities (CNPJ), making it easy to start any project.',
        },
        {
          question: 'Can AbacatePay be integrated with apps made in lovable?',
          answer: 'Absolutely! Our API was developed to be flexible and can be easily integrated with applications created in Lovable and other no-code/low-code tools.',
        },
        {
          question: 'Is it possible to split payments between different recipients?',
          answer: 'Yes, we have a robust payment split functionality that allows you to divide values between different accounts automatically and securely.',
        },
        {
          question: 'How long does it take for my account to be verified?',
          answer: 'Our verification process is agile and usually takes 24 to 48 business hours after submitting all the necessary documentation.',
        },
      ],
    },
    finalCTA: {
      heading: "You've reached the end of the page.",
      description: "If you've made it this far, it's because you're interested. So go ahead, sign up now.",
      cta: 'Go on, click this button',
    },
    footer: {
      columns: {
        account: {
          title: 'Solutions',
          signup: 'Website Creation',
          login: 'Software Development',
        },
        support: {
          title: 'Contact',
          email: 'contact@monfily.com',
          talkToSupport: 'Talk to an expert',
          joinDiscord: 'Book a meeting',
        },
        website: {
          title: 'Resources',
          docs: 'About',
          integrations: 'Methodology',
          products: 'Insights',
          fees: 'Portfolio',
          privacy: 'Privacy',
          terms: 'Terms & Conditions',
          status: 'FAQ',
        },
        ai: {
          title: 'AI',
          chat: 'AI Assistant',
          llms: 'Models & LLMs',
        },
      },
      copyright: `© ${new Date().getFullYear()} Monfily Digital. All rights reserved.`,
    },
  },
};

