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
      title: 'Criação de Sites, Softwares e Automações com IA | Monfily',
      description: 'Desenvolvemos sites rápidos, sistemas sob medida e automações com IA para empresas que precisam de eficiência operacional e presença digital profissional.',
    },
    header: {
      nav: {
        solutions: 'Soluções',
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
      title: 'Soluções digitais para diferentes mercados.',
      metrics: {
        projectsDelivered: 'Projetos entregues',
        nichesServed: 'Segmentos atendidos',
      },
      items: {
        webDesign: {
          title: 'Criação de Sites',
          description: 'Sites rápidos e adaptados para dispositivos móveis. Focamos na clareza das informações para facilitar o contato do seu cliente.',
        },
        customSoftware: {
          title: 'Sistemas Sob Medida',
          description: 'Desenvolvemos ferramentas para organizar processos internos ou criar novos produtos digitais, com foco em segurança e usabilidade.',
        },
        aiAutomation: {
          title: 'Automação com IA',
          description: 'Integração de assistentes inteligentes para atendimento e fluxos de trabalho, reduzindo o tempo gasto em tarefas manuais e repetitivas.',
        },
        seoGrowth: {
          title: 'SEO Técnico',
          description: 'Otimização da estrutura técnica do site para melhorar o posicionamento nos motores de busca de forma orgânica.',
        },
      },
    },
    mockup: {
      navigation: {
        services: 'Serviços',
        benefits: 'Vantagens',
        projects: 'Portfólio',
        prices: 'Orçamento',
        clients: 'Clientes',
      },
      badge: 'Disponível para novos projetos',
      heading: {
        line1: 'Desenvolvimento de Software',
        line2: 'Para Empresas e Startups',
      },
      description: 'Entregamos tecnologia de forma clara, com prazos reais e suporte contínuo para o seu crescimento digital.',
      cta: {
        viewPrices: 'Ver Portfólio',
        scheduleNow: 'Agendar Reunião',
      },
      trust: 'Mais de 50 empresas atendidas',
    },
    expertise: {
      label: 'Nossa Expertise',
      heading: {
        line1: 'Desenvolvimento técnico',
        line2: 'focado em utilidade.',
      },
      description: 'Não criamos apenas telas. Construímos a lógica por trás do seu negócio, garantindo que cada linha de código tenha um propósito prático para sua empresa.',
      cta: 'Falar com Especialista',
    },
    solutionsSuite: {
      heading: 'Tecnologia que organiza sua operação.',
      description: 'Mais do que um site, entregamos ferramentas que ajudam na gestão e no crescimento do seu negócio.',
      items: {
        antiFraud: {
          title: 'Segurança de Dados',
          description: 'Implementamos protocolos de segurança para proteger as informações da sua empresa e dos seus clientes.',
        },
        checkout: {
          title: 'Integrações',
          description: 'Conectamos seu site ou sistema com as ferramentas que você já usa, como CRMs, meios de pagamento e ERPs.',
        },
        subscriptions: {
          title: 'Escalabilidade',
          description: 'Desenvolvemos sistemas preparados para suportar o aumento de acessos e dados sem perda de velocidade.',
          badge: '',
        },
      },
    },
    faq: {
      heading: 'Dúvidas Frequentes',
      description: 'Respostas diretas sobre como trabalhamos e o que você pode esperar de nossos serviços.',
      items: [
        {
          question: 'Como funciona o processo de criação?',
          answer: 'O processo é dividido em quatro etapas: entendimento das necessidades, desenho da solução (design), desenvolvimento do código e entrega final com treinamento, se necessário.',
        },
        {
          question: 'O que eu preciso enviar para começar o projeto?',
          answer: 'Basicamente as informações sobre seus serviços, sua logomarca e o acesso ao seu domínio, caso já possua um.',
        },
        {
          question: 'Vocês oferecem suporte após a entrega?',
          answer: 'Sim. Oferecemos suporte técnico para correções e atualizações, garantindo que sua plataforma continue funcionando sem interrupções.',
        },
        {
          question: 'O site será otimizado para celulares?',
          answer: 'Sim. Todos os nossos projetos são desenvolvidos com tecnologia responsiva, garantindo que funcionem perfeitamente em smartphones, tablets e computadores.',
        },
        {
          question: 'Vocês cuidam da hospedagem do site?',
          answer: 'Nós auxiliamos na escolha e configuração da melhor hospedagem para o seu projeto, mas a contratação do serviço é feita diretamente por você para garantir total autonomia.',
        },
        {
          question: 'Vocês fazem a identidade visual/logotipo?',
          answer: 'Focamos no desenvolvimento digital (sites e sistemas). Caso você não tenha uma identidade visual, podemos indicar parceiros de design ou trabalhar com o que você já possui.',
        },
        {
          question: 'Como é feita a comunicação durante o projeto?',
          answer: 'Utilizamos canais diretos como WhatsApp e reuniões agendadas para garantir que você acompanhe cada evolução do desenvolvimento.',
        },
      ],
    },
    finalCTA: {
      heading: 'Pronto para tirar seu projeto do papel?',
      description: 'Fale com um de nossos especialistas e receba uma análise técnica preliminar para o seu negócio.',
      cta: 'Falar com Especialista',
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
      title: 'Website Creation, Software & AI Automation | Monfily',
      description: 'We develop fast websites, custom systems, and AI automations for companies looking for operational efficiency and a professional digital presence.',
    },
    header: {
      nav: {
        solutions: 'Solutions',
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
      description: 'Complete digital infrastructure for your business. We combine high-performance Website Creation design, Software engineering, Artificial Intelligence (IA), and technical SEO to generate revenue and efficiency.',
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
      title: 'Digital solutions for different markets.',
      metrics: {
        projectsDelivered: 'Projects delivered',
        nichesServed: 'Industries served',
      },
      items: {
        webDesign: {
          title: 'Website Creation',
          description: 'Fast, mobile-friendly websites. We focus on clear information to make it easier for customers to reach you.',
        },
        customSoftware: {
          title: 'Custom Systems',
          description: 'We develop tools to organize internal processes or create new digital products, focusing on security and usability.',
        },
        aiAutomation: {
          title: 'AI Automation',
          description: 'Integration of intelligent assistants for customer service and workflows, reducing time spent on manual tasks.',
        },
        seoGrowth: {
          title: 'Technical SEO',
          description: 'Optimizing the technical structure of the site to improve organic search engine rankings.',
        },
      },
    },
    mockup: {
      navigation: {
        services: 'Services',
        benefits: 'Advantages',
        projects: 'Portfolio',
        prices: 'Quote',
        clients: 'Clients',
      },
      badge: 'Available for new projects',
      heading: {
        line1: 'Software Development',
        line2: 'For Companies and Startups',
      },
      description: 'We deliver technology clearly, with realistic deadlines and continuous support for your digital growth.',
      cta: {
        viewPrices: 'View Portfolio',
        scheduleNow: 'Book a Meeting',
      },
      trust: 'More than 50 companies served',
    },
    expertise: {
      label: 'Our Expertise',
      heading: {
        line1: 'Technical development',
        line2: 'focused on utility.',
      },
      description: 'We don\'t just create screens. We build the logic behind your business, ensuring every line of code has a practical purpose for your company.',
      cta: 'Talk to an Expert',
    },
    solutionsSuite: {
      heading: 'Technology that organizes your operation.',
      description: 'More than just a website, we deliver tools that help manage and grow your business.',
      items: {
        antiFraud: {
          title: 'Data Security',
          description: 'We implement security protocols to protect your company\'s and your clients\' information.',
        },
        checkout: {
          title: 'Integrations',
          description: 'We connect your site or system with the tools you already use, such as CRMs, payment gateways, and ERPs.',
        },
        subscriptions: {
          title: 'Scalability',
          description: 'We develop systems prepared to handle increased traffic and data without losing speed.',
          badge: '',
        },
      },
    },
    faq: {
      heading: 'Frequently Asked Questions',
      description: 'Straight answers about how we work and what you can expect from our services.',
      items: [
        {
          question: 'How does the creation process work?',
          answer: 'The process is divided into four stages: understanding needs, solution design, code development, and final delivery with training if necessary.',
        },
        {
          question: 'What do I need to send to start the project?',
          answer: 'Basically, information about your services, your logo, and access to your domain if you already have one.',
        },
        {
          question: 'Do you offer support after delivery?',
          answer: 'Yes. We offer technical support for fixes and updates, ensuring your platform continues to run smoothly.',
        },
        {
          question: 'Will the website be mobile-friendly?',
          answer: 'Yes. All our projects are developed with responsive technology, ensuring they work perfectly on smartphones, tablets, and computers.',
        },
        {
          question: 'Do you handle website hosting?',
          answer: 'We assist in choosing and configuring the best hosting for your project, but the service is contracted directly by you to ensure total autonomy.',
        },
        {
          question: 'Do you create visual identities or logos?',
          answer: 'We focus on digital development (websites and systems). If you don\'t have a visual identity, we can recommend design partners or work with what you already have.',
        },
        {
          question: 'How is communication handled during the project?',
          answer: 'We use direct channels like WhatsApp and scheduled meetings to ensure you follow every stage of the development evolution.',
        },
      ],
    },
    finalCTA: {
      heading: 'Ready to bring your project to life?',
      description: 'Talk to one of our experts and receive a preliminary technical analysis for your business.',
      cta: 'Talk to an Expert',
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

