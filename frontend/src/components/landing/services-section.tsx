import { SectionLayout } from "./section-layout";
import { Monitor, Code, Bot, TrendingUp } from "lucide-react";
import PixelBlast from "@/components/ui/pixel-blast";
import { useLanguage } from "@/hooks/use-language";
import { translations } from "@/lib/translations";
import { useEffect, useRef, useState } from "react";

const HorizontalBoneDivider = () => (
  <div className="relative my-4" style={{ marginLeft: '-24px', marginRight: '-24px' }}>
    <div className="relative w-full" style={{ height: '1px' }}>
      {/* Line that ends exactly at left:0 and right:0 (borders of section-main-content) */}
      <div className="absolute left-0 right-0 bg-[#E2E7F1]" style={{ height: '0.5px', top: '50%', transform: 'translateY(-50%)' }}></div>
      {/* Left Flare - positioned slightly inside to avoid overflow, same size as GridDecoration */}
      <svg
        viewBox="0 0 20 10"
        className="absolute w-6 h-[12px] fill-[#E2E7F1] pointer-events-none"
        preserveAspectRatio="none"
        style={{ 
          left: '6px',
          top: '50%',
          transform: 'translateY(-50%) translateX(-50%) rotate(-90deg)'
        }}
      >
        <path d="M0 0 Q 9.5 0 9.5 10 L 10.5 10 Q 10.5 0 20 0 Z" />
      </svg>
      
      {/* Right Flare - positioned slightly inside to avoid overflow, same size as GridDecoration */}
      <svg
        viewBox="0 0 20 10"
        className="absolute w-6 h-[12px] fill-[#E2E7F1] pointer-events-none"
        preserveAspectRatio="none"
        style={{ 
          right: '5px',
          top: '50%',
          transform: 'translateY(-50%) translateX(50%) rotate(90deg)'
        }}
      >
        <path d="M0 0 Q 9.5 0 9.5 10 L 10.5 10 Q 10.5 0 20 0 Z" />
      </svg>
    </div>
  </div>
);

export function ServicesSection() {
  const { language } = useLanguage();
  const t = translations[language];
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Disconnect after first trigger to prevent re-animation
            observer.disconnect();
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of the section is visible
        rootMargin: '0px 0px -50px 0px' // Trigger slightly before fully visible
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const services = [
    {
      icon: Monitor,
      title: t.services.items.webDesign.title,
      description: t.services.items.webDesign.description
    },
    {
      icon: Code,
      title: t.services.items.customSoftware.title,
      description: t.services.items.customSoftware.description
    },
    {
      icon: Bot,
      title: t.services.items.aiAutomation.title,
      description: t.services.items.aiAutomation.description
    },
    {
      icon: TrendingUp,
      title: t.services.items.seoGrowth.title,
      description: t.services.items.seoGrowth.description
    }
  ];
  return (
    <>
      <style>{`
        @keyframes blurText {
          0% {
            filter: blur(10px);
            opacity: 0;
          }
          100% {
            filter: blur(0px);
            opacity: 1;
          }
        }
        .services-blur-animate {
          animation: blurText 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
      `}</style>
      <div ref={sectionRef}>
      {/* Mobile Section */}
      <SectionLayout showStripes={false} className="flex flex-col md:hidden px-6" containerClassName="overflow-visible">
        <div className="flex flex-col w-full gap-8 py-8" style={{ overflow: 'visible', position: 'relative' }}>
          {/* Header */}
          <div className="flex flex-col gap-6 pt-8 pb-8 relative">
            <h2 
              className={`font-bold text-[#1C1C1E] leading-none relative z-10 ${isVisible ? 'services-blur-animate' : ''}`}
              style={{ fontSize: '36px', animationDelay: '0.1s', opacity: isVisible ? 0 : 0 }}
            >
              {t.services.title}
            </h2>
            
            {/* Metrics */}
            <div 
              className={`flex flex-col gap-4 mt-8 relative z-10 ${isVisible ? 'services-blur-animate' : ''}`}
              style={{ animationDelay: '0.2s', opacity: isVisible ? 0 : 0 }}
            >
              <div>
                <div className="font-bold text-[#1C1C1E]" style={{ fontSize: '32px' }}>
                  <span className="text-[#2869D6]">+</span> 50
                </div>
                <div className="text-base text-[#6B7280] mt-1">
                  {t.services.metrics.projectsDelivered}
                </div>
              </div>
              
              <div>
                <div className="font-bold text-[#1C1C1E]" style={{ fontSize: '32px' }}>
                  <span className="text-[#2869D6]">+</span> 10
                </div>
                <div className="text-base text-[#6B7280] mt-1">
                  {t.services.metrics.nichesServed}
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <HorizontalBoneDivider />

          {/* Services Grid */}
          <div className="grid grid-cols-1 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div 
                  key={index} 
                  className={`flex gap-4 relative ${isVisible ? 'services-blur-animate' : ''}`}
                  style={{ animationDelay: `${0.3 + index * 0.1}s`, opacity: isVisible ? 0 : 0 }}
                >
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
      <SectionLayout showStripes={false} className="hidden md:flex flex-col">
        {/* Header Section */}
        <div className="flex flex-row items-center justify-between px-6 md:px-16 lg:px-28 py-[100px] border-b border-[#E2E7F1] relative" style={{ borderWidth: '0.5px' }}>
          {/* Background PixelBlast */}
          <div style={{ position: 'absolute', top: 0, bottom: 0, right: 0, left: '50%', pointerEvents: 'none', zIndex: 0, opacity: 0.2 }}>
            <PixelBlast
              variant="diamond"
              pixelSize={4}
              color="#1C1C1E"
              patternScale={20}
              patternDensity={1.3}
              pixelSizeJitter={0}
              enableRipples={false}
              liquid
              liquidStrength={0.12}
              liquidRadius={1.2}
              liquidWobbleSpeed={5}
              speed={1.3}
              edgeFade={0.5}
              transparent
            />
          </div>
          
          {/* Left: Title */}
          <div 
            className={`max-w-[50%] pr-8 relative z-10 ${isVisible ? 'services-blur-animate' : ''}`}
            style={{ animationDelay: '0.1s', opacity: isVisible ? 0 : 0 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#1C1C1E] leading-none">
              {t.services.title}
            </h2>
          </div>

          {/* Right: Metrics */}
          <div 
            className={`flex gap-8 md:gap-12 flex-shrink-0 relative z-10 ${isVisible ? 'services-blur-animate' : ''}`}
            style={{ animationDelay: '0.2s', opacity: isVisible ? 0 : 0 }}
          >
            <div className="min-w-[140px] py-4">
              <div className="text-6xl md:text-7xl font-bold text-[#1C1C1E]">
                <span className="text-[#2869D6]">+</span> 50
              </div>
              <div className="text-base md:text-lg text-[#6B7280] mt-2">
                {t.services.metrics.projectsDelivered}
              </div>
            </div>
            
            <div className="min-w-[140px] py-4">
              <div className="text-6xl md:text-7xl font-bold text-[#1C1C1E]">
                <span className="text-[#2869D6]">+</span> 10
              </div>
              <div className="text-base md:text-lg text-[#6B7280] mt-2">
                {t.services.metrics.nichesServed}
              </div>
            </div>
          </div>

          {/* Left Flare - positioned at bottom border, left edge (compensating for padding, slightly inside) */}
          <svg
            viewBox="0 0 20 10"
            className="absolute w-7 h-[14px] fill-[#E2E7F1] pointer-events-none"
            preserveAspectRatio="none"
            style={{ 
              left: '6.5px',
              bottom: 0,
              transform: 'translateX(-50%) translateY(50%) rotate(-90deg)',
              zIndex: 1001
            }}
          >
            <path d="M0 0 Q 9.5 0 9.5 10 L 10.5 10 Q 10.5 0 20 0 Z" />
          </svg>
          
          {/* Right Flare - positioned at bottom border, right edge (compensating for padding, slightly inside) */}
          <svg
            viewBox="0 0 20 10"
            className="absolute w-7 h-[14px] fill-[#E2E7F1] pointer-events-none"
            preserveAspectRatio="none"
            style={{ 
              right: '5.5px',
              bottom: 0,
              transform: 'translateX(50%) translateY(50%) rotate(90deg)',
              zIndex: 1001
            }}
          >
            <path d="M0 0 Q 9.5 0 9.5 10 L 10.5 10 Q 10.5 0 20 0 Z" />
          </svg>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-4">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div 
                key={index} 
                className={`flex flex-col px-6 md:px-8 py-8 relative ${isVisible ? 'services-blur-animate' : ''} ${index > 0 ? 'border-l border-dashed border-[#E2E7F1]' : ''}`}
                style={{
                  ...(index > 0 ? { borderLeftWidth: '0.5px' } : {}),
                  animationDelay: `${0.3 + index * 0.1}s`,
                  opacity: isVisible ? 0 : 0
                }}
              >
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
      </div>
    </>
  );
}

