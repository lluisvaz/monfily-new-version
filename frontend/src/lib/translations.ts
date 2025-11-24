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
  },
};

