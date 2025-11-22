import { SectionLayout } from "./section-layout";
import { Monitor, Code, Bot, TrendingUp } from "lucide-react";

const services = [
  {
    icon: Monitor,
    title: "Web Design Premium",
    description: "Sites ultra-rápidos e visualmente impactantes. Transformamos visitantes em leads qualificados com UX de ponta."
  },
  {
    icon: Code,
    title: "Software Sob Medida",
    description: "Do sistema interno ao SaaS complexo. Desenvolvemos a ferramenta exata que sua operação precisa para escalar sem travas."
  },
  {
    icon: Bot,
    title: "Automação com IA",
    description: "Reduza custos operacionais. Implementamos agentes inteligentes que trabalham 24/7 no atendimento e processos repetitivos."
  },
  {
    icon: TrendingUp,
    title: "SEO Técnico & Growth",
    description: "Pare de caçar clientes. Posicionamos sua marca no topo do Google para atrair tráfego orgânico e intencional."
  }
];

const DottedGrid = () => (
  <div 
    className="absolute inset-0"
    style={{
      backgroundImage: `radial-gradient(circle, #E2E7F1 1px, transparent 1px)`,
      backgroundSize: '16px 16px',
      backgroundPosition: '0 0',
      opacity: 0.5
    }}
  />
);

export function ServicesSection() {
  return (
    <>
      {/* Mobile Section */}
      <SectionLayout className="flex flex-col md:hidden px-6 py-8">
        <div className="flex flex-col w-full gap-8">
          {/* Header */}
          <div className="flex flex-col gap-6">
            <h2 className="text-3xl font-bold text-[#1C1C1E] leading-tight">
              Soluções validadas em dezenas de mercados.
            </h2>
            
            {/* Metrics */}
            <div className="flex flex-col gap-4">
              <div className="relative">
                <DottedGrid />
                <div className="relative z-10">
                  <div className="text-4xl font-bold text-[#1C1C1E]">
                    <span className="text-[#4ADE80]">+</span> 100
                  </div>
                  <div className="text-sm text-[#6B7280] mt-1">
                    Projetos entregues
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <DottedGrid />
                <div className="relative z-10">
                  <div className="text-4xl font-bold text-[#1C1C1E]">
                    <span className="text-[#4ADE80]">+</span> 50
                  </div>
                  <div className="text-sm text-[#6B7280] mt-1">
                    Nichos atendidos
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-dashed border-[#E2E7F1] my-4"></div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div key={index} className="flex gap-4 relative">
                  {/* Left Green Bar */}
                  <div className="w-1 bg-[#4ADE80] flex-shrink-0"></div>
                  
                  <div className="flex-1 flex flex-col gap-3">
                    <Icon className="w-5 h-5 text-[#1C1C1E]" />
                    <h3 className="text-lg font-bold text-[#1C1C1E]">
                      {service.title}
                    </h3>
                    <p className="text-sm text-[#6B7280] leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </SectionLayout>

      {/* Desktop Section */}
      <SectionLayout className="hidden md:flex flex-col">
        {/* Header Section */}
        <div className="flex flex-row items-start px-8 md:px-16 lg:px-28 py-12 border-b border-dashed border-[#E2E7F1]">
          {/* Left: Title */}
          <div className="flex-1 pr-8">
            <h2 className="text-4xl md:text-5xl font-bold text-[#1C1C1E] leading-tight">
              Soluções validadas em dezenas de mercados.
            </h2>
          </div>

          {/* Right: Metrics */}
          <div className="flex gap-8 md:gap-12">
            <div className="relative min-w-[140px] py-4">
              <DottedGrid />
              <div className="relative z-10">
                <div className="text-5xl md:text-6xl font-bold text-[#1C1C1E]">
                  <span className="text-[#4ADE80]">+</span> 100
                </div>
                <div className="text-sm text-[#6B7280] mt-2">
                  Projetos entregues
                </div>
              </div>
            </div>
            
            <div className="relative min-w-[140px] py-4">
              <DottedGrid />
              <div className="relative z-10">
                <div className="text-5xl md:text-6xl font-bold text-[#1C1C1E]">
                  <span className="text-[#4ADE80]">+</span> 50
                </div>
                <div className="text-sm text-[#6B7280] mt-2">
                  Nichos atendidos
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-4 divide-x divide-dashed divide-[#E2E7F1]">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div key={index} className="flex flex-col px-6 md:px-8 py-8 relative">
                {/* Left Green Bar */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#4ADE80]"></div>
                
                <div className="flex flex-col gap-4">
                  <Icon className="w-6 h-6 text-[#1C1C1E]" />
                  <h3 className="text-lg font-bold text-[#1C1C1E]">
                    {service.title}
                  </h3>
                  <p className="text-sm text-[#6B7280] leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </SectionLayout>
    </>
  );
}

