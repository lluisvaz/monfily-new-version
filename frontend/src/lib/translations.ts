export type Language = 'pt-br' | 'pt-pt' | 'en' | 'es' | 'it' | 'sg' | 'he';
type BaseLanguage = 'pt-br' | 'pt-pt' | 'en' | 'es';
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends Array<infer U>
    ? U[]
    : T[K] extends object
      ? DeepPartial<T[K]>
      : T[K];
};

export interface Translations {
  whatsappNumber: string;
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
      portugueseBrazil: string;
      portuguesePortugal: string;
      english: string;
      spanish: string;
      italian?: string;
      singapore?: string;
      hebrew?: string;
    };
    cta: string;
    ctaMobile: string;
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

const baseTranslations: Record<BaseLanguage, Translations> = {
  'pt-br': {
    whatsappNumber: '5511978267321',
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
        portugueseBrazil: 'Português (Brasil)',
        portuguesePortugal: 'Português (Portugal)',
        english: 'Ingles',
        spanish: 'Espanhol',
      },
      cta: 'Falar com Especialista',
      ctaMobile: 'Contato',
    },
    hero: {
      badge: {
        chosenBy: 'Escolhido por ',
        clients: '+560 Clientes em ',
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
      trust: 'Mais de 560 empresas atendidas',
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
  'pt-pt': {
    whatsappNumber: '351927327279',
    seo: {
      title: 'Criação de Websites, Software e Automações com IA | Monfily',
      description: 'Desenvolvemos websites rápidos, sistemas à medida e automações com IA para empresas que precisam de eficiência operacional e presença digital profissional.',
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
        websiteCreation: 'Criação de Websites',
        softwareDevelopment: 'Desenvolvimento de Software',
        artificialIntelligence: 'Inteligência Artificial',
        technicalSEO: 'SEO Técnico',
      },
      languages: {
        portugueseBrazil: 'Português (Brasil)',
        portuguesePortugal: 'Português (Portugal)',
        english: 'Ingles',
        spanish: 'Espanhol',
      },
      cta: 'Falar com Especialista',
      ctaMobile: 'Contacto',
    },
    hero: {
      badge: {
        chosenBy: 'Escolhido por ',
        clients: '+560 Clientes em ',
        in: '',
      },
      rotatingTexts: [
        'Retalho & E-commerce',
        'Saúde & Clínicas',
        'Imobiliário & Construção',
        'Advocacia & Consultoria',
        'Serviços & Startups',
      ],
      heading: {
        line1: 'Código Puro.',
        line2: 'Resultados ',
        line3: 'Reais.',
      },
      description: 'A infraestrutura digital completa para o seu negócio. Combinamos design de Criação de Websites de alta performance, engenharia de Software, Inteligência Artificial (IA) e SEO técnico para gerar receita e eficiência.',
      cta: {
        primary: 'Iniciar o Meu Projeto',
        secondary: 'Porquê nós?',
      },
      features: {
        performance: {
          title: 'Performance',
          description: 'Websites rápidos que convertem.',
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
          title: 'Criação de Websites',
          description: 'Websites rápidos e adaptados para dispositivos móveis. Focamos na clareza das informações para facilitar o contacto do seu cliente.',
        },
        customSoftware: {
          title: 'Sistemas à Medida',
          description: 'Desenvolvemos ferramentas para organizar processos internos ou criar novos produtos digitais, com foco em segurança e usabilidade.',
        },
        aiAutomation: {
          title: 'Automação com IA',
          description: 'Integração de assistentes inteligentes para atendimento e fluxos de trabalho, reduzindo o tempo gasto em tarefas manuais e repetitivas.',
        },
        seoGrowth: {
          title: 'SEO Técnico',
          description: 'Otimização da estrutura técnica do website para melhorar o posicionamento nos motores de busca de forma orgânica.',
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
      trust: 'Mais de 560 empresas atendidas',
    },
    expertise: {
      label: 'A Nossa Expertise',
      heading: {
        line1: 'Desenvolvimento técnico',
        line2: 'focado em utilidade.',
      },
      description: 'Não criamos apenas ecrãs. Construímos a lógica por trás do seu negócio, garantindo que cada linha de código tenha um propósito prático para a sua empresa.',
      cta: 'Falar com Especialista',
    },
    solutionsSuite: {
      heading: 'Tecnologia que organiza a sua operação.',
      description: 'Mais do que um website, entregamos ferramentas que ajudam na gestão e no crescimento do seu negócio.',
      items: {
        antiFraud: {
          title: 'Segurança de Dados',
          description: 'Implementamos protocolos de segurança para proteger as informações da sua empresa e dos seus clientes.',
        },
        checkout: {
          title: 'Integrações',
          description: 'Ligamos o seu website ou sistema às ferramentas que já utiliza, como CRMs, meios de pagamento e ERPs.',
        },
        subscriptions: {
          title: 'Escalabilidade',
          description: 'Desenvolvemos sistemas preparados para suportar o aumento de acessos e dados sem perda de velocidade.',
          badge: '',
        },
      },
    },
    faq: {
      heading: 'Perguntas Frequentes',
      description: 'Respostas diretas sobre como trabalhamos e o que pode esperar dos nossos serviços.',
      items: [
        {
          question: 'Como funciona o processo de criação?',
          answer: 'O processo divide-se em quatro etapas: compreensão das necessidades, desenho da solução (design), desenvolvimento do código e entrega final com formação, se necessário.',
        },
        {
          question: 'O que preciso de enviar para começar o projeto?',
          answer: 'Basicamente as informações sobre os seus serviços, o seu logótipo e o acesso ao seu domínio, caso já possua um.',
        },
        {
          question: 'Oferecem suporte após a entrega?',
          answer: 'Sim. Oferecemos suporte técnico para correções e atualizações, garantindo que a sua plataforma continue a funcionar sem interrupções.',
        },
        {
          question: 'O website será otimizado para telemóveis?',
          answer: 'Sim. Todos os nossos projetos são desenvolvidos com tecnologia responsiva, garantindo que funcionem perfeitamente em smartphones, tablets e computadores.',
        },
        {
          question: 'Tratam do alojamento do website?',
          answer: 'Auxiliamos na escolha e configuração do melhor alojamento para o seu projeto, mas a contratação do serviço é feita diretamente por si para garantir total autonomia.',
        },
        {
          question: 'Fazem a identidade visual/logótipo?',
          answer: 'Focamo-nos no desenvolvimento digital (websites e sistemas). Caso não tenha uma identidade visual, podemos indicar parceiros de design ou trabalhar com o que já possui.',
        },
        {
          question: 'Como é feita a comunicação durante o projeto?',
          answer: 'Utilizamos canais diretos como WhatsApp e reuniões agendadas para garantir que acompanha cada evolução do desenvolvimento.',
        },
      ],
    },
    finalCTA: {
      heading: 'Pronto para tirar o seu projeto do papel?',
      description: 'Fale com um dos nossos especialistas e receba uma análise técnica preliminar para o seu negócio.',
      cta: 'Falar com Especialista',
    },
    footer: {
      columns: {
        account: {
          title: 'Soluções',
          signup: 'Criação de Websites',
          login: 'Desenvolvimento de Software',
        },
        support: {
          title: 'Contacto',
          email: 'contacto@monfily.com',
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
    whatsappNumber: '447888865199',
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
        portugueseBrazil: 'Portuguese (Brazil)',
        portuguesePortugal: 'Portuguese (Portugal)',
        english: 'English',
        spanish: 'Spanish',
      },
      cta: 'Talk to an Expert',
      ctaMobile: 'Contact',
    },
    hero: {
      badge: {
        chosenBy: 'Chosen by ',
        clients: '+560 Clients in ',
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
      trust: 'More than 560 companies served',
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
  es: {
    whatsappNumber: '34613588340',
    seo: {
      title: 'Creación de Sitios Web, Software y Automatizaciones con IA | Monfily',
      description: 'Desarrollamos sitios rápidos, sistemas a medida y automatizaciones con IA para empresas que necesitan eficiencia operativa y presencia digital profesional.',
    },
    header: {
      nav: {
        solutions: 'Soluciones',
        support: 'Soporte',
        insights: 'Insights',
        menu: 'Menú de Navegación',
        menuDescription: 'Menú principal de navegación del sitio',
      },
      solutionsDropdown: {
        websiteCreation: 'Creación de Sitios Web',
        softwareDevelopment: 'Desarrollo de Software',
        artificialIntelligence: 'Inteligencia Artificial',
        technicalSEO: 'SEO Técnico',
      },
      languages: {
        portugueseBrazil: 'Portugués (Brasil)',
        portuguesePortugal: 'Portugués (Portugal)',
        english: 'Ingles',
        spanish: 'Español',
      },
      cta: 'Hablar con Especialista',
      ctaMobile: 'Contacto',
    },
    hero: {
      badge: {
        chosenBy: 'Elegido por ',
        clients: '+560 Clientes en ',
        in: '',
      },
      rotatingTexts: [
        'Retail y E-commerce',
        'Salud y Clínicas',
        'Inmobiliaria y Construcción',
        'Abogacía y Consultoría',
        'Servicios y Startups',
      ],
      heading: {
        line1: 'Código Puro.',
        line2: 'Resultados ',
        line3: 'Reales.',
      },
      description: 'La infraestructura digital completa para tu negocio. Unimos diseño de creación de sitios de alto rendimiento, ingeniería de software, inteligencia artificial (IA) y SEO técnico para generar ingresos y eficiencia.',
      cta: {
        primary: 'Iniciar Mi Proyecto',
        secondary: '¿Por qué nosotros?',
      },
      features: {
        performance: {
          title: 'Rendimiento',
          description: 'Sitios rápidos que convierten.',
        },
        optimized: {
          title: 'Optimizado',
          description: 'Estructura preparada para SEO.',
        },
      },
    },
    trustedBy: {
      label: 'Utilizamos las mejores tecnologías:',
    },
    services: {
      title: 'Soluciones digitales para diferentes mercados.',
      metrics: {
        projectsDelivered: 'Proyectos entregados',
        nichesServed: 'Sectores atendidos',
      },
      items: {
        webDesign: {
          title: 'Creación de Sitios Web',
          description: 'Sitios rápidos y adaptados para dispositivos móviles. Nos enfocamos en la claridad de la información para facilitar el contacto de tu cliente.',
        },
        customSoftware: {
          title: 'Sistemas a Medida',
          description: 'Desarrollamos herramientas para organizar procesos internos o crear nuevos productos digitales, con enfoque en seguridad y usabilidad.',
        },
        aiAutomation: {
          title: 'Automatización con IA',
          description: 'Integración de asistentes inteligentes para atención y flujos de trabajo, reduciendo el tiempo dedicado a tareas manuales y repetitivas.',
        },
        seoGrowth: {
          title: 'SEO Técnico',
          description: 'Optimización de la estructura técnica del sitio para mejorar el posicionamiento en los motores de búsqueda de forma orgánica.',
        },
      },
    },
    mockup: {
      navigation: {
        services: 'Servicios',
        benefits: 'Ventajas',
        projects: 'Portfolio',
        prices: 'Presupuesto',
        clients: 'Clientes',
      },
      badge: 'Disponible para nuevos proyectos',
      heading: {
        line1: 'Desarrollo de Software',
        line2: 'Para Empresas y Startups',
      },
      description: 'Entregamos tecnología de forma clara, con plazos reales y soporte continuo para tu crecimiento digital.',
      cta: {
        viewPrices: 'Ver Portfolio',
        scheduleNow: 'Agendar Reunión',
      },
      trust: 'Más de 560 empresas atendidas',
    },
    expertise: {
      label: 'Nuestra Expertise',
      heading: {
        line1: 'Desarrollo técnico',
        line2: 'enfocado en utilidad.',
      },
      description: 'No creamos solo pantallas. Construimos la lógica detrás de tu negocio, garantizando que cada línea de código tenga un propósito práctico para tu empresa.',
      cta: 'Hablar con Especialista',
    },
    solutionsSuite: {
      heading: 'Tecnología que organiza tu operación.',
      description: 'Más que un sitio, entregamos herramientas que ayudan en la gestión y el crecimiento de tu negocio.',
      items: {
        antiFraud: {
          title: 'Seguridad de Datos',
          description: 'Implementamos protocolos de seguridad para proteger la información de tu empresa y de tus clientes.',
        },
        checkout: {
          title: 'Integraciones',
          description: 'Conectamos tu sitio o sistema con las herramientas que ya usas, como CRMs, medios de pago y ERPs.',
        },
        subscriptions: {
          title: 'Escalabilidad',
          description: 'Desarrollamos sistemas preparados para soportar el aumento de accesos y datos sin pérdida de velocidad.',
          badge: '',
        },
      },
    },
    faq: {
      heading: 'Preguntas Frecuentes',
      description: 'Respuestas directas sobre cómo trabajamos y qué puedes esperar de nuestros servicios.',
      items: [
        {
          question: '¿Cómo funciona el proceso de creación?',
          answer: 'El proceso se divide en cuatro etapas: entendimiento de las necesidades, diseño de la solución, desarrollo del código y entrega final con capacitación, si es necesario.',
        },
        {
          question: '¿Qué necesito enviar para comenzar el proyecto?',
          answer: 'Básicamente la información sobre tus servicios, tu logotipo y el acceso a tu dominio, si ya tienes uno.',
        },
        {
          question: '¿Ofrecen soporte después de la entrega?',
          answer: 'Sí. Ofrecemos soporte técnico para correcciones y actualizaciones, garantizando que tu plataforma continúe funcionando sin interrupciones.',
        },
        {
          question: '¿El sitio estará optimizado para celulares?',
          answer: 'Sí. Todos nuestros proyectos se desarrollan con tecnología responsive, garantizando que funcionen perfectamente en smartphones, tablets y computadoras.',
        },
        {
          question: '¿Se encargan del hosting del sitio?',
          answer: 'Ayudamos en la elección y configuración del mejor hosting para tu proyecto, pero la contratación del servicio se hace directamente por ti para garantizar total autonomía.',
        },
        {
          question: '¿Hacen la identidad visual/logotipo?',
          answer: 'Nos enfocamos en el desarrollo digital (sitios y sistemas). Si no tienes una identidad visual, podemos indicar socios de diseño o trabajar con lo que ya tienes.',
        },
        {
          question: '¿Cómo es la comunicación durante el proyecto?',
          answer: 'Utilizamos canales directos como WhatsApp y reuniones agendadas para garantizar que acompañes cada evolución del desarrollo.',
        },
      ],
    },
    finalCTA: {
      heading: '¿Listo para sacar tu proyecto del papel?',
      description: 'Habla con uno de nuestros especialistas y recibe un análisis técnico preliminar para tu negocio.',
      cta: 'Hablar con Especialista',
    },
    footer: {
      columns: {
        account: {
          title: 'Soluciones',
          signup: 'Creación de Sitios Web',
          login: 'Desarrollo de Software',
        },
        support: {
          title: 'Contacto',
          email: 'contacto@monfily.com',
          talkToSupport: 'Hablar con especialista',
          joinDiscord: 'Agendar reunión',
        },
        website: {
          title: 'Recursos',
          products: 'Insights',
          fees: 'Portfolio',
          privacy: 'Privacidad',
          terms: 'Términos y condiciones',
          status: 'FAQ',
        },
        ai: {
          title: 'IA',
          chat: 'Asistente IA',
          llms: 'Modelos y LLMs',
        },
      },
      copyright: `© ${new Date().getFullYear()} Monfily Digital. Todos los derechos reservados.`,
    },
  },
};

const DEFAULT_WHATSAPP_NUMBERS: Record<Language, string> = {
  'pt-br': '5511978267321',
  'pt-pt': '351927327279',
  en: '447888865199',
  es: '34613588340',
  it: '390000000000',
  sg: '6500000000',
  he: '972000000000',
};

const WHATSAPP_ENV_BY_LANGUAGE: Record<Language, string | undefined> = {
  'pt-br': import.meta.env.VITE_WHATSAPP_PHONE_BR,
  'pt-pt': import.meta.env.VITE_WHATSAPP_PHONE_PT,
  en: import.meta.env.VITE_WHATSAPP_PHONE_EN,
  es: import.meta.env.VITE_WHATSAPP_PHONE_ES,
  it: import.meta.env.VITE_WHATSAPP_PHONE_IT,
  sg: import.meta.env.VITE_WHATSAPP_PHONE_SG,
  he: import.meta.env.VITE_WHATSAPP_PHONE_IL,
};

function sanitizeWhatsAppNumber(value?: string): string | null {
  const digits = value?.replace(/\D/g, '') ?? '';
  return digits.length >= 8 ? digits : null;
}

export function getWhatsAppNumber(language: Language): string {
  return sanitizeWhatsAppNumber(WHATSAPP_ENV_BY_LANGUAGE[language]) ?? DEFAULT_WHATSAPP_NUMBERS[language];
}

function mergeDeep<T extends Record<string, any>>(base: T, override: DeepPartial<T>): T {
  const result: Record<string, any> = { ...base };

  for (const [key, value] of Object.entries(override)) {
    if (value === undefined) continue;

    const baseValue = result[key];
    if (
      value &&
      baseValue &&
      typeof value === 'object' &&
      typeof baseValue === 'object' &&
      !Array.isArray(value) &&
      !Array.isArray(baseValue)
    ) {
      result[key] = mergeDeep(baseValue, value as Record<string, any>);
    } else {
      result[key] = value;
    }
  }

  return result as T;
}

const italianTranslation: DeepPartial<Translations> = {
  seo: {
    title: 'Creazione di Siti Web, Software e Automazioni AI | Monfily',
    description: 'Sviluppiamo siti web veloci, sistemi su misura e automazioni AI per aziende che cercano efficienza operativa e una presenza digitale professionale.',
  },
  header: {
    languages: {
      portugueseBrazil: 'Portoghese (Brasile)',
      portuguesePortugal: 'Portoghese (Portogallo)',
      english: 'Inglese',
      spanish: 'Spagnolo',
      italian: 'Italiano',
      singapore: 'Inglese (Singapore)',
      hebrew: 'Ebraico (Israele)',
    },
    cta: 'Parla con un esperto',
    ctaMobile: 'Contatto',
  },
  hero: {
    badge: {
      chosenBy: 'Scelto da ',
      clients: '+560 clienti in ',
      in: '',
    },
    rotatingTexts: ['Retail & E-commerce', 'Salute & Cliniche', 'Immobiliare & Costruzioni', 'Legale & Consulenza', 'Servizi & Startup'],
    heading: {
      line1: 'Codice Puro.',
      line2: 'Risultati ',
      line3: 'Reali.',
    },
    description: 'Infrastruttura digitale completa per la tua azienda. Uniamo siti web ad alte prestazioni, ingegneria software, intelligenza artificiale e SEO tecnico per generare ricavi ed efficienza.',
    cta: {
      primary: 'Avvia il mio progetto',
      secondary: 'Perche noi?',
    },
    features: {
      performance: {
        title: 'Performance',
        description: 'Siti veloci che convertono.',
      },
      optimized: {
        title: 'Ottimizzato',
        description: 'Struttura pronta per la SEO.',
      },
    },
  },
  trustedBy: {
    label: 'Usiamo le migliori tecnologie:',
  },
  services: {
    title: 'Soluzioni digitali per mercati diversi.',
    metrics: {
      projectsDelivered: 'Progetti consegnati',
      nichesServed: 'Settori serviti',
    },
    items: {
      webDesign: {
        title: 'Creazione di Siti Web',
        description: 'Siti veloci e mobile-friendly. Puntiamo su informazioni chiare per facilitare il contatto dei clienti.',
      },
      customSoftware: {
        title: 'Sistemi su Misura',
        description: 'Sviluppiamo strumenti per organizzare processi interni o creare nuovi prodotti digitali, con attenzione a sicurezza e usabilita.',
      },
      aiAutomation: {
        title: 'Automazione AI',
        description: 'Integriamo assistenti intelligenti per assistenza e flussi di lavoro, riducendo il tempo speso in attivita manuali.',
      },
      seoGrowth: {
        title: 'SEO Tecnico',
        description: 'Ottimizziamo la struttura tecnica del sito per migliorare il posizionamento organico sui motori di ricerca.',
      },
    },
  },
  mockup: {
    navigation: {
      services: 'Servizi',
      benefits: 'Vantaggi',
      projects: 'Portfolio',
      prices: 'Preventivo',
      clients: 'Clienti',
    },
    badge: 'Disponibile per nuovi progetti',
    heading: {
      line1: 'Sviluppo Software',
      line2: ' per Aziende e Startup',
    },
    description: 'Consegniamo tecnologia in modo chiaro, con scadenze realistiche e supporto continuo per la crescita digitale.',
    cta: {
      viewPrices: 'Vedi Portfolio',
      scheduleNow: 'Prenota una riunione',
    },
    trust: 'Oltre 560 aziende servite',
  },
  expertise: {
    label: 'La nostra esperienza',
    heading: {
      line1: 'Sviluppo tecnico',
      line2: 'orientato all utilita.',
    },
    description: 'Non creiamo solo schermate. Costruiamo la logica dietro il tuo business, affinche ogni riga di codice abbia uno scopo pratico.',
    cta: 'Parla con un esperto',
  },
  solutionsSuite: {
    heading: 'Tecnologia che organizza la tua operazione.',
    description: 'Oltre al sito, consegniamo strumenti che aiutano a gestire e far crescere il business.',
    items: {
      antiFraud: {
        title: 'Sicurezza dei Dati',
        description: 'Implementiamo protocolli di sicurezza per proteggere le informazioni della tua azienda e dei tuoi clienti.',
      },
      checkout: {
        title: 'Integrazioni',
        description: 'Colleghiamo sito o sistema agli strumenti che usi gia, come CRM, pagamenti ed ERP.',
      },
      subscriptions: {
        title: 'Scalabilita',
        description: 'Sviluppiamo sistemi pronti a gestire piu traffico e dati senza perdere velocita.',
        badge: '',
      },
    },
  },
  faq: {
    heading: 'Domande frequenti',
    description: 'Risposte dirette su come lavoriamo e cosa puoi aspettarti dai nostri servizi.',
    items: [
      { question: 'Come funziona il processo di creazione?', answer: 'Il processo si divide in quattro fasi: comprensione delle esigenze, design della soluzione, sviluppo del codice e consegna finale con formazione se necessaria.' },
      { question: 'Cosa devo inviare per iniziare?', answer: 'Servono le informazioni sui tuoi servizi, il logo e l accesso al dominio se ne hai gia uno.' },
      { question: 'Offrite supporto dopo la consegna?', answer: 'Si. Offriamo supporto tecnico per correzioni e aggiornamenti, assicurando che la piattaforma continui a funzionare senza interruzioni.' },
      { question: 'Il sito sara ottimizzato per mobile?', answer: 'Si. Tutti i nostri progetti sono responsive e funzionano correttamente su smartphone, tablet e computer.' },
      { question: 'Vi occupate dell hosting?', answer: 'Ti aiutiamo a scegliere e configurare il miglior hosting, ma il servizio viene contratto direttamente da te per mantenere piena autonomia.' },
      { question: 'Create identita visiva o loghi?', answer: 'Ci concentriamo sullo sviluppo digitale. Se non hai un identita visiva, possiamo indicare partner di design o lavorare con cio che hai gia.' },
      { question: 'Come avviene la comunicazione durante il progetto?', answer: 'Usiamo canali diretti come WhatsApp e riunioni programmate per farti seguire ogni fase dello sviluppo.' },
    ],
  },
  finalCTA: {
    heading: 'Pronto a dare vita al tuo progetto?',
    description: 'Parla con uno dei nostri esperti e ricevi un analisi tecnica preliminare per la tua azienda.',
    cta: 'Parla con un esperto',
  },
  footer: {
    columns: {
      support: {
        title: 'Contatto',
        email: 'contact@monfily.com',
        talkToSupport: 'Parla con un esperto',
        joinDiscord: 'Prenota una riunione',
      },
      website: {
        title: 'Risorse',
        products: 'Insight',
        fees: 'Portfolio',
        privacy: 'Privacy',
        terms: 'Termini e condizioni',
        status: 'FAQ',
      },
    },
    copyright: `© ${new Date().getFullYear()} Monfily Digital. Tutti i diritti riservati.`,
  },
};

const singaporeTranslation: DeepPartial<Translations> = {
  header: {
    languages: {
      portugueseBrazil: 'Portuguese (Brazil)',
      portuguesePortugal: 'Portuguese (Portugal)',
      english: 'English',
      spanish: 'Spanish',
      italian: 'Italian',
      singapore: 'English (Singapore)',
      hebrew: 'Hebrew (Israel)',
    },
  },
  seo: {
    title: 'Website Creation, Software & AI Automation in Singapore | Monfily',
    description: 'We build fast websites, custom systems and AI automations for Singapore companies that need operational efficiency and a professional digital presence.',
  },
};

const hebrewTranslation: DeepPartial<Translations> = {
  seo: {
    title: 'בניית אתרים, תוכנה ואוטומציות AI | Monfily',
    description: 'אנחנו מפתחים אתרים מהירים, מערכות מותאמות ואוטומציות AI לעסקים שצריכים יעילות תפעולית ונוכחות דיגיטלית מקצועית.',
  },
  header: {
    languages: {
      portugueseBrazil: 'פורטוגזית (ברזיל)',
      portuguesePortugal: 'פורטוגזית (פורטוגל)',
      english: 'אנגלית',
      spanish: 'ספרדית',
      italian: 'איטלקית',
      singapore: 'אנגלית (סינגפור)',
      hebrew: 'עברית (ישראל)',
    },
    cta: 'דברו עם מומחה',
    ctaMobile: 'יצירת קשר',
  },
  hero: {
    badge: {
      chosenBy: 'נבחר על ידי ',
      clients: '+560 לקוחות ב',
      in: '',
    },
    rotatingTexts: ['קמעונאות ומסחר', 'בריאות ומרפאות', 'נדלן ובניה', 'משפט וייעוץ', 'שירותים וסטארטאפים'],
    heading: {
      line1: 'קוד נקי.',
      line2: 'תוצאות ',
      line3: 'אמיתיות.',
    },
    description: 'תשתית דיגיטלית מלאה לעסק שלך. אנחנו משלבים אתרים מהירים, הנדסת תוכנה, בינה מלאכותית ו-SEO טכני כדי לייצר הכנסות ויעילות.',
    cta: {
      primary: 'להתחלת הפרויקט',
      secondary: 'למה אנחנו?',
    },
    features: {
      performance: {
        title: 'ביצועים',
        description: 'אתרים מהירים שממירים.',
      },
      optimized: {
        title: 'מותאם',
        description: 'מבנה מוכן ל-SEO.',
      },
    },
  },
  trustedBy: {
    label: 'אנחנו משתמשים בטכנולוגיות הטובות ביותר:',
  },
  services: {
    title: 'פתרונות דיגיטליים לשווקים שונים.',
    metrics: {
      projectsDelivered: 'פרויקטים שנמסרו',
      nichesServed: 'תחומים שטופלו',
    },
    items: {
      webDesign: {
        title: 'בניית אתרים',
        description: 'אתרים מהירים ומותאמים למובייל. אנחנו מתמקדים במידע ברור שמקל על לקוחות ליצור קשר.',
      },
      customSoftware: {
        title: 'מערכות מותאמות',
        description: 'אנחנו מפתחים כלים לארגון תהליכים פנימיים או יצירת מוצרים דיגיטליים חדשים, עם דגש על אבטחה ושימושיות.',
      },
      aiAutomation: {
        title: 'אוטומציה עם AI',
        description: 'שילוב עוזרים חכמים לשירות לקוחות ותהליכי עבודה, כדי לצמצם משימות ידניות וחזרתיות.',
      },
      seoGrowth: {
        title: 'SEO טכני',
        description: 'אופטימיזציה של המבנה הטכני של האתר לשיפור הדירוג האורגני במנועי חיפוש.',
      },
    },
  },
  mockup: {
    navigation: {
      services: 'שירותים',
      benefits: 'יתרונות',
      projects: 'פורטפוליו',
      prices: 'הצעת מחיר',
      clients: 'לקוחות',
    },
    badge: 'זמין לפרויקטים חדשים',
    heading: {
      line1: 'פיתוח תוכנה',
      line2: ' לחברות וסטארטאפים',
    },
    description: 'אנחנו מספקים טכנולוגיה בצורה ברורה, עם לוחות זמנים מציאותיים ותמיכה מתמשכת לצמיחה הדיגיטלית שלך.',
    cta: {
      viewPrices: 'צפיה בפורטפוליו',
      scheduleNow: 'קביעת פגישה',
    },
    trust: 'יותר מ-560 חברות קיבלו שירות',
  },
  expertise: {
    label: 'המומחיות שלנו',
    heading: {
      line1: 'פיתוח טכני',
      line2: 'שממוקד בתועלת.',
    },
    description: 'אנחנו לא יוצרים רק מסכים. אנחנו בונים את ההיגיון שמאחורי העסק שלך, כך שלכל שורת קוד יש מטרה מעשית.',
    cta: 'דברו עם מומחה',
  },
  solutionsSuite: {
    heading: 'טכנולוגיה שמארגנת את הפעילות שלך.',
    description: 'מעבר לאתר, אנחנו מספקים כלים שעוזרים לנהל ולהצמיח את העסק.',
    items: {
      antiFraud: {
        title: 'אבטחת מידע',
        description: 'אנחנו מיישמים פרוטוקולי אבטחה להגנה על המידע של החברה ושל הלקוחות.',
      },
      checkout: {
        title: 'אינטגרציות',
        description: 'אנחנו מחברים את האתר או המערכת לכלים שכבר בשימוש, כמו CRM, תשלומים ו-ERP.',
      },
      subscriptions: {
        title: 'סקיילביליות',
        description: 'אנחנו מפתחים מערכות שמוכנות ליותר תנועה ונתונים בלי לאבד מהירות.',
        badge: '',
      },
    },
  },
  faq: {
    heading: 'שאלות נפוצות',
    description: 'תשובות ישירות על הדרך שבה אנחנו עובדים ומה אפשר לצפות מהשירותים שלנו.',
    items: [
      { question: 'איך עובד תהליך הבניה?', answer: 'התהליך מחולק לארבעה שלבים: הבנת הצרכים, עיצוב הפתרון, פיתוח הקוד ומסירה סופית עם הדרכה במידת הצורך.' },
      { question: 'מה צריך לשלוח כדי להתחיל?', answer: 'בעיקר מידע על השירותים שלך, לוגו וגישה לדומיין אם כבר יש לך אחד.' },
      { question: 'האם יש תמיכה אחרי המסירה?', answer: 'כן. אנחנו מספקים תמיכה טכנית לתיקונים ועדכונים כדי שהפלטפורמה תמשיך לעבוד בצורה יציבה.' },
      { question: 'האתר יהיה מותאם למובייל?', answer: 'כן. כל הפרויקטים שלנו נבנים בצורה רספונסיבית ועובדים היטב בסמארטפונים, טאבלטים ומחשבים.' },
      { question: 'אתם מטפלים באחסון האתר?', answer: 'אנחנו עוזרים לבחור ולהגדיר את האחסון המתאים, אבל השירות נרכש ישירות על ידך כדי לשמור על שליטה מלאה.' },
      { question: 'אתם יוצרים מיתוג או לוגו?', answer: 'אנחנו מתמקדים בפיתוח דיגיטלי. אם אין לך זהות חזותית, נוכל להפנות לשותפי עיצוב או לעבוד עם מה שכבר קיים.' },
      { question: 'איך מתנהלת התקשורת במהלך הפרויקט?', answer: 'אנחנו משתמשים בערוצים ישירים כמו WhatsApp ופגישות מתואמות כדי שתהיה לך שקיפות בכל שלב.' },
    ],
  },
  finalCTA: {
    heading: 'מוכנים להוציא את הפרויקט לדרך?',
    description: 'דברו עם אחד המומחים שלנו וקבלו ניתוח טכני ראשוני לעסק שלכם.',
    cta: 'דברו עם מומחה',
  },
  footer: {
    columns: {
      account: {
        title: 'פתרונות',
        signup: 'בניית אתרים',
        login: 'פיתוח תוכנה',
      },
      support: {
        title: 'יצירת קשר',
        email: 'contact@monfily.com',
        talkToSupport: 'דברו עם מומחה',
        joinDiscord: 'קביעת פגישה',
      },
      website: {
        title: 'משאבים',
        products: 'תובנות',
        fees: 'פורטפוליו',
        privacy: 'פרטיות',
        terms: 'תנאים והגבלות',
        status: 'FAQ',
      },
      ai: {
        title: 'AI',
        chat: 'עוזר AI',
        llms: 'מודלים ו-LLMs',
      },
    },
    copyright: `© ${new Date().getFullYear()} Monfily Digital. כל הזכויות שמורות.`,
  },
};

export const translations: Record<Language, Translations> = {
  'pt-br': mergeDeep({ ...baseTranslations['pt-br'], whatsappNumber: getWhatsAppNumber('pt-br') }, {
    header: {
      languages: {
        english: 'Ingles',
        italian: 'Italiano',
        singapore: 'Ingles (Singapura)',
        hebrew: 'Hebraico (Israel)',
      },
    },
  }),
  'pt-pt': mergeDeep({ ...baseTranslations['pt-pt'], whatsappNumber: getWhatsAppNumber('pt-pt') }, {
    header: {
      languages: {
        english: 'Ingles',
        italian: 'Italiano',
        singapore: 'Ingles (Singapura)',
        hebrew: 'Hebraico (Israel)',
      },
    },
  }),
  en: mergeDeep({ ...baseTranslations.en, whatsappNumber: getWhatsAppNumber('en') }, {
    header: {
      languages: {
        english: 'English',
        italian: 'Italian',
        singapore: 'English (Singapore)',
        hebrew: 'Hebrew (Israel)',
      },
    },
  }),
  es: mergeDeep({ ...baseTranslations.es, whatsappNumber: getWhatsAppNumber('es') }, {
    header: {
      languages: {
        english: 'Ingles',
        italian: 'Italiano',
        singapore: 'Ingles (Singapur)',
        hebrew: 'Hebreo (Israel)',
      },
    },
  }),
  it: mergeDeep({ ...baseTranslations.en, whatsappNumber: getWhatsAppNumber('it') }, italianTranslation),
  sg: mergeDeep({ ...baseTranslations.en, whatsappNumber: getWhatsAppNumber('sg') }, singaporeTranslation),
  he: mergeDeep({ ...baseTranslations.en, whatsappNumber: getWhatsAppNumber('he') }, hebrewTranslation),
};
