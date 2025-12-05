import { SectionLayout } from "./section-layout";
import { FigmaIcon } from "@/components/ui/figma-icon";
import { CodeXmlIcon } from "@/components/ui/code-xml-icon";
import { BrainIcon } from "@/components/ui/brain-icon";
import { ChartNoAxesCombinedIcon } from "@/components/ui/chart-no-axes-combined-icon";
import { useLanguage } from "@/hooks/use-language";
import { translations } from "@/lib/translations";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

const GridDecoration = ({ className }: { className?: string }) => (
  <div className={`absolute w-6 h-6 flex items-center justify-center pointer-events-none ${className}`} style={{ zIndex: 'var(--section-grid-z, 9999)' }}>
    {/* White background to mask the lines crossing behind it for a cleaner look */}
    <div className="absolute w-4 h-4 bg-white rounded-full" />
    
    {/* Minimalist Star/Cross Shape in border color #E2E7F1 */}
    <svg viewBox="0 0 24 24" className="w-full h-full fill-[#E2E7F1] relative z-10">
      <path d="M12 2C12 2 14 10 22 12C14 14 12 22 12 22C12 22 10 14 2 12C10 10 12 2 12 2Z" />
    </svg>
  </div>
);

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
          right: '6px',
          top: '50%',
          transform: 'translateY(-50%) translateX(50%) rotate(90deg)'
        }}
      >
        <path d="M0 0 Q 9.5 0 9.5 10 L 10.5 10 Q 10.5 0 20 0 Z" />
      </svg>
    </div>
  </div>
);

const LargeStripedDivider = () => {
  const stripeClass = "bg-slate-50/30 bg-[image:repeating-linear-gradient(45deg,#E2E7F1_0px,#E2E7F1_1px,transparent_1px,transparent_12px)]";
  
  return (
    <div className="w-full flex flex-row relative" style={{ marginTop: 0, paddingTop: 0, marginBottom: 0 }}>
      {/* Top horizontal line - spans full width including margins */}
      <div className="absolute top-0 left-0 right-0 h-[0.5px] bg-[#E2E7F1]" style={{ zIndex: 10 }}></div>
      
      {/* Bottom horizontal line - spans full width including margins */}
      <div className="absolute" style={{ top: '70.5px', left: 0, right: 0, height: '0.5px', backgroundColor: '#E2E7F1', zIndex: 10 }}></div>
      
      {/* Left margin - white */}
      <div className="flex-1 min-w-[1rem] md:min-w-[2rem] bg-white"></div>
      
      {/* Main Content Area */}
      <div className="relative w-full min-w-0 max-w-[1500px] mx-auto bg-white">
        {/* Left border line */}
        <div className="absolute top-0 bottom-0 left-0 w-[0.5px] bg-[#E2E7F1] pointer-events-none"></div>
        
        {/* Vertical lines crossing - faint */}
        <div className="absolute top-0 bottom-0 left-[20%] w-[0.5px] bg-[#E2E7F1] pointer-events-none opacity-20"></div>
        <div className="absolute top-0 bottom-0 left-[40%] w-[0.5px] bg-[#E2E7F1] pointer-events-none opacity-20"></div>
        <div className="absolute top-0 bottom-0 left-[60%] w-[0.5px] bg-[#E2E7F1] pointer-events-none opacity-20"></div>
        <div className="absolute top-0 bottom-0 left-[80%] w-[0.5px] bg-[#E2E7F1] pointer-events-none opacity-20"></div>
        
        {/* Divider Structure - larger height */}
        <div className="relative w-full" style={{ height: '200px' }}>
          {/* Central striped area - starts immediately after top line */}
          <div 
            className={`absolute left-0 right-0 ${stripeClass}`}
            style={{
              top: '0.5px',
              height: '70px'
            }}
          ></div>
          
          
          {/* Connection points at intersections with vertical lines */}
          {/* Top left */}
          <svg
            viewBox="0 0 24 24"
            className="absolute w-3 h-3 fill-[#E2E7F1] pointer-events-none opacity-40"
            style={{
              left: '0',
              top: '0',
              transform: 'translate(-50%, -50%)'
            }}
          >
            <path d="M12 2C12 2 14 10 22 12C14 14 12 22 12 22C12 22 10 14 2 12C10 10 12 2 12 2Z" />
          </svg>
          
          {/* Top right */}
          <svg
            viewBox="0 0 24 24"
            className="absolute w-3 h-3 fill-[#E2E7F1] pointer-events-none opacity-40"
            style={{
              right: '0',
              top: '0',
              transform: 'translate(50%, -50%)'
            }}
          >
            <path d="M12 2C12 2 14 10 22 12C14 14 12 22 12 22C12 22 10 14 2 12C10 10 12 2 12 2Z" />
          </svg>
          
          {/* Bottom left */}
          <svg
            viewBox="0 0 24 24"
            className="absolute w-3 h-3 fill-[#E2E7F1] pointer-events-none opacity-40"
            style={{
              left: '0',
              top: '70.5px',
              transform: 'translate(-50%, -50%)'
            }}
          >
            <path d="M12 2C12 2 14 10 22 12C14 14 12 22 12 22C12 22 10 14 2 12C10 10 12 2 12 2Z" />
          </svg>
          
          {/* Bottom right */}
          <svg
            viewBox="0 0 24 24"
            className="absolute w-3 h-3 fill-[#E2E7F1] pointer-events-none opacity-40"
            style={{
              right: '0',
              top: '70.5px',
              transform: 'translate(50%, -50%)'
            }}
          >
            <path d="M12 2C12 2 14 10 22 12C14 14 12 22 12 22C12 22 10 14 2 12C10 10 12 2 12 2Z" />
          </svg>
        </div>
        
        {/* Right border line */}
        <div className="absolute top-0 bottom-0 right-0 w-[0.5px] bg-[#E2E7F1] pointer-events-none"></div>
      </div>
      
      {/* Right margin - white */}
      <div className="flex-1 min-w-[1rem] md:min-w-[2rem] bg-white"></div>
      
      {/* Grid Decorations at Top (this is the bottom line of services section) */}
      <div className="absolute left-0 right-0 pointer-events-none" style={{ top: 0, zIndex: 'var(--section-grid-z, 99999)' }}>
        <div className="flex flex-row w-full">
          <div className="flex-1 min-w-[1rem] md:min-w-[2rem]"></div>
          <div className="relative w-full min-w-0 max-w-[1500px] mx-auto">
            <GridDecoration className="flex -top-[12px] -left-[12px]" />
            <GridDecoration className="flex -top-[12px] -right-[12px]" />
          </div>
          <div className="flex-1 min-w-[1rem] md:min-w-[2rem]"></div>
        </div>
      </div>
      
      {/* Grid Decorations at Bottom (at the bottom horizontal line) */}
      <div className="absolute left-0 right-0 pointer-events-none" style={{ top: '70.5px', zIndex: 'var(--section-grid-z, 99999)' }}>
        <div className="flex flex-row w-full">
          <div className="flex-1 min-w-[1rem] md:min-w-[2rem]"></div>
          <div className="relative w-full min-w-0 max-w-[1500px] mx-auto">
            <GridDecoration className="flex -bottom-[12px] -left-[12px]" />
            <GridDecoration className="flex -bottom-[12px] -right-[12px]" />
          </div>
          <div className="flex-1 min-w-[1rem] md:min-w-[2rem]"></div>
        </div>
      </div>
    </div>
  );
};

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
      icon: null,
      isFigma: true,
      isCodeXml: false,
      isBrain: false,
      isChart: false,
      title: t.services.items.webDesign.title,
      description: t.services.items.webDesign.description
    },
    {
      icon: null,
      isFigma: false,
      isCodeXml: true,
      isBrain: false,
      isChart: false,
      title: t.services.items.customSoftware.title,
      description: t.services.items.customSoftware.description
    },
    {
      icon: null,
      isFigma: false,
      isCodeXml: false,
      isBrain: true,
      isChart: false,
      title: t.services.items.aiAutomation.title,
      description: t.services.items.aiAutomation.description
    },
    {
      icon: null,
      isFigma: false,
      isCodeXml: false,
      isBrain: false,
      isChart: true,
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
        @keyframes pulse-slow-1 {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }
        .animate-pulse-slow-1 {
          animation: pulse-slow-1 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
      <div ref={sectionRef} id="servicos">
      {/* Mobile Section */}
      <SectionLayout showStripes={false} className="flex flex-col md:hidden px-6" containerClassName="overflow-visible">
        <div className="flex flex-col w-full gap-8 py-8" style={{ overflow: 'visible', position: 'relative' }}>
          {/* Header */}
          <div className="flex flex-col gap-6 pt-8 pb-8 relative items-center z-10" style={{ paddingTop: '32px', paddingBottom: '32px' }}>
            {/* Background Pattern - Squares */}
            <div 
              className="absolute opacity-40 pointer-events-none"
              style={{
                top: '-32px',
                left: '-24px',
                right: '-24px',
                height: 'calc(100% + 64px)',
                backgroundImage: `
                  linear-gradient(#CBD5E1 1px, transparent 1px),
                  linear-gradient(90deg, #CBD5E1 1px, transparent 1px)
                `,
                backgroundSize: '24px 24px',
                backgroundPosition: '0 0'
              }}
            />
            {/* Gradient overlay - white intense on sides, transparent in center */}
            <div 
              className="absolute pointer-events-none"
              style={{
                top: '-32px',
                left: '-24px',
                right: '-24px',
                height: 'calc(100% + 64px)',
                background: `
                  linear-gradient(to right, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.9) 8%, rgba(255, 255, 255, 0.6) 15%, rgba(255, 255, 255, 0.3) 25%, transparent 40%),
                  linear-gradient(to left, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.9) 8%, rgba(255, 255, 255, 0.6) 15%, rgba(255, 255, 255, 0.3) 25%, transparent 40%)
                `
              }}
            />
            <h2 
              className={`text-[#1C1C1E] leading-none relative z-20 text-center ${isVisible ? 'services-blur-animate' : ''}`}
              style={{ 
                fontSize: '36px', 
                animationDelay: '0.1s', 
                opacity: isVisible ? 0 : 0,
                fontFamily: 'Fustat-Bold, sans-serif',
                fontWeight: 'normal',
                lineHeight: '0.9',
                letterSpacing: '-0.06em'
              }}
            >
              {t.services.title}
            </h2>
            
            {/* Metrics */}
            <div 
              className={`flex flex-row gap-6 mt-8 relative z-20 items-center justify-center ${isVisible ? 'services-blur-animate' : ''}`}
              style={{ animationDelay: '0.2s', opacity: isVisible ? 0 : 0 }}
            >
              <div className="flex-1 flex flex-col items-center text-center">
                <div 
                  className="text-[#1C1C1E] whitespace-nowrap" 
                  style={{ 
                    fontSize: '32px',
                    fontFamily: 'Fustat-Bold, sans-serif',
                    fontWeight: 'normal'
                  }}
                >
                  <span className="text-[#2869D6]">+</span> 50
                </div>
                <div className="text-base text-[#6B7280] mt-1 whitespace-nowrap">
                  {t.services.metrics.projectsDelivered}
                </div>
              </div>
              
              <div className="flex-1 flex flex-col items-center text-center">
                <div 
                  className="text-[#1C1C1E] whitespace-nowrap" 
                  style={{ 
                    fontSize: '32px',
                    fontFamily: 'Fustat-Bold, sans-serif',
                    fontWeight: 'normal'
                  }}
                >
                  <span className="text-[#2869D6]">+</span> 10
                </div>
                <div className="text-base text-[#6B7280] mt-1 whitespace-nowrap">
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
              return (
                <div 
                  key={index} 
                  className={`flex gap-4 relative ${isVisible ? 'services-blur-animate' : ''} ${index > 0 ? 'border-t border-dashed border-[#E2E7F1] pt-8' : ''}`}
                  style={{
                    ...(index > 0 ? { borderTopWidth: '0.5px' } : {}),
                    animationDelay: `${0.3 + index * 0.1}s`,
                    opacity: isVisible ? 0 : 0
                  }}
                >
                  <div className="flex-1 flex flex-col gap-3">
                    {service.isFigma ? (
                      <FigmaIcon size={20} className="text-[#1C1C1E] self-start" />
                    ) : service.isCodeXml ? (
                      <CodeXmlIcon size={20} className="text-[#1C1C1E] self-start" />
                    ) : service.isBrain ? (
                      <BrainIcon size={20} className="text-[#1C1C1E] self-start" />
                    ) : service.isChart ? (
                      <ChartNoAxesCombinedIcon size={20} className="text-[#1C1C1E] self-start" />
                    ) : null}
                    <h3 
                      className="text-lg text-[#1C1C1E]"
                      style={{ 
                        fontFamily: 'Fustat-Bold, sans-serif',
                        fontWeight: 'normal'
                      }}
                    >
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
        <div className="flex flex-row items-center justify-between px-6 md:px-16 lg:px-28 py-[100px] relative">
          {/* Background Pattern - Squares */}
          <div 
            className="absolute opacity-40 pointer-events-none"
            style={{
              top: 0,
              bottom: 0,
              right: 0,
              left: '50%',
              zIndex: 0,
              backgroundImage: `
                linear-gradient(#CBD5E1 1px, transparent 1px),
                linear-gradient(90deg, #CBD5E1 1px, transparent 1px)
              `,
              backgroundSize: '24px 24px',
              backgroundPosition: '0 0'
            }}
          />
          {/* Gradient overlay - white intense on sides, transparent in center */}
          <div 
            className="absolute pointer-events-none"
            style={{
              top: 0,
              bottom: 0,
              right: 0,
              left: '50%',
              zIndex: 0,
              background: `
                radial-gradient(circle at center, transparent 0%, rgba(255, 255, 255, 0.2) 40%, rgba(255, 255, 255, 0.5) 60%, rgba(255, 255, 255, 0.7) 80%),
                linear-gradient(to bottom, rgba(255, 255, 255, 0.6) 0%, transparent 30%),
                linear-gradient(to top, rgba(255, 255, 255, 0.6) 0%, transparent 30%),
                linear-gradient(to right, rgba(255, 255, 255, 0.6) 0%, transparent 30%),
                linear-gradient(to left, rgba(255, 255, 255, 0.6) 0%, transparent 30%)
              `
            }}
          />
          
          {/* Left: Title */}
          <div 
            className={`max-w-[50%] pr-8 relative z-10 ${isVisible ? 'services-blur-animate' : ''}`}
            style={{ animationDelay: '0.1s', opacity: isVisible ? 0 : 0 }}
          >
            <h2 
              className="text-4xl md:text-5xl text-[#1C1C1E] leading-none"
              style={{ 
                fontFamily: 'Fustat-Bold, sans-serif',
                fontWeight: 'normal',
                lineHeight: '0.9',
                letterSpacing: '-0.06em'
              }}
            >
              {t.services.title}
            </h2>
          </div>

          {/* Right: Metrics */}
          <div 
            className={`flex gap-8 md:gap-12 flex-shrink-0 relative z-10 ${isVisible ? 'services-blur-animate' : ''}`}
            style={{ animationDelay: '0.2s', opacity: isVisible ? 0 : 0 }}
          >
            <div className="min-w-[140px] py-4">
              <div 
                className="text-6xl md:text-7xl text-[#1C1C1E]"
                style={{ 
                  fontFamily: 'Fustat-Bold, sans-serif',
                  fontWeight: 'normal'
                }}
              >
                <span className="text-[#2869D6]">+</span> 50
              </div>
              <div className="text-base md:text-lg text-[#6B7280] mt-2">
                {t.services.metrics.projectsDelivered}
              </div>
            </div>
            
            <div className="min-w-[140px] py-4">
              <div 
                className="text-6xl md:text-7xl text-[#1C1C1E]"
                style={{ 
                  fontFamily: 'Fustat-Bold, sans-serif',
                  fontWeight: 'normal'
                }}
              >
                <span className="text-[#2869D6]">+</span> 10
              </div>
              <div className="text-base md:text-lg text-[#6B7280] mt-2">
                {t.services.metrics.nichesServed}
              </div>
            </div>
          </div>

        </div>

        {/* Top border line for Services Grid with flares */}
        <div className="relative" style={{ height: '1px' }}>
          {/* Line that spans the full width of section-main-content */}
          <div className="absolute left-0 right-0 bg-[#E2E7F1]" style={{ height: '0.5px', top: '50%', transform: 'translateY(-50%)' }}></div>
          {/* Left Flare */}
          <svg
            viewBox="0 0 20 10"
            className="absolute w-7 h-[14px] fill-[#E2E7F1] pointer-events-none"
            preserveAspectRatio="none"
            style={{ 
              left: '7px',
              top: '50%',
              transform: 'translateY(-50%) translateX(-50%) rotate(-90deg)',
              zIndex: 1001
            }}
          >
            <path d="M0 0 Q 9.5 0 9.5 10 L 10.5 10 Q 10.5 0 20 0 Z" />
          </svg>
          
          {/* Right Flare */}
          <svg
            viewBox="0 0 20 10"
            className="absolute w-7 h-[14px] fill-[#E2E7F1] pointer-events-none"
            preserveAspectRatio="none"
            style={{ 
              right: '7px',
              top: '50%',
              transform: 'translateY(-50%) translateX(50%) rotate(90deg)',
              zIndex: 1001
            }}
          >
            <path d="M0 0 Q 9.5 0 9.5 10 L 10.5 10 Q 10.5 0 20 0 Z" />
          </svg>
        </div>

        {/* Services Grid */}        <div className="grid grid-cols-4">
          {services.map((service, index) => {
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
                  {service.isFigma ? (
                    <FigmaIcon size={24} className="text-[#1C1C1E] self-start" />
                  ) : service.isCodeXml ? (
                    <CodeXmlIcon size={24} className="text-[#1C1C1E] self-start" />
                  ) : service.isBrain ? (
                    <BrainIcon size={24} className="text-[#1C1C1E] self-start" />
                  ) : service.isChart ? (
                    <ChartNoAxesCombinedIcon size={24} className="text-[#1C1C1E] self-start" />
                  ) : null}
                  <h3 
                    className="text-lg text-[#1C1C1E]"
                    style={{ 
                      fontFamily: 'Fustat-Bold, sans-serif',
                      fontWeight: 'normal'
                    }}
                  >
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
      
      {/* Large Striped Divider */}
      <LargeStripedDivider />

      {/* Expertise Section */}
      <ExpertiseSection />
    </>
  );
}

// Expertise Section Component
const ExpertiseSection = () => {
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
            observer.disconnect();
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <SectionLayout showStripes={false} showTopBorder={false} className="relative pt-0 pb-16 md:pb-24 px-6 md:px-16 lg:px-28">
      <div ref={sectionRef} className="relative z-10 -mt-[129.5px] md:-mt-[129.5px]">
        {/* Background Pattern - Squares */}
        <div 
          className="absolute opacity-40 pointer-events-none -left-6 -right-6 md:-left-16 md:-right-16 lg:-left-28 lg:-right-28"
          style={{
            top: 0,
            bottom: 0,
            backgroundImage: `
              linear-gradient(#CBD5E1 1px, transparent 1px),
              linear-gradient(90deg, #CBD5E1 1px, transparent 1px)
            `,
            backgroundSize: '24px 24px',
            backgroundPosition: '0 0'
          }}
        />
        {/* Gradient overlay - white intense in center, transparent on sides */}
        <div 
          className="absolute pointer-events-none -left-6 -right-6 md:-left-16 md:-right-16 lg:-left-28 lg:-right-28"
          style={{
            top: 0,
            bottom: 0,
            background: `
              radial-gradient(circle at center, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.9) 20%, rgba(255, 255, 255, 0.7) 40%, rgba(255, 255, 255, 0.4) 60%, rgba(255, 255, 255, 0.1) 80%, transparent 95%)
            `
          }}
        />

        {/* Mobile Layout */}
        <div className="flex flex-col md:hidden items-start text-left space-y-6 pt-16 pb-16 relative">
          {/* Label Pill */}
          <div 
            className={`inline-flex items-center px-3 py-1 rounded-full border border-[#E2E7F1] text-[#1C1C1E] text-xs relative z-10 bg-white ${isVisible ? 'services-blur-animate' : ''}`}
            style={{ 
              animationDelay: '0.1s', 
              opacity: isVisible ? 0 : 0,
              fontFamily: 'Fustat-Bold, sans-serif',
              fontWeight: 'normal'
            }}
          >
            {t.expertise.label}
          </div>

          {/* Heading */}
          <h2 
            className={`text-[#1C1C1E] leading-none relative z-10 ${isVisible ? 'services-blur-animate' : ''}`}
            style={{ 
              animationDelay: '0.2s', 
              opacity: isVisible ? 0 : 0,
              fontSize: '36px',
              fontFamily: 'Fustat-Bold, sans-serif',
              fontWeight: 'normal',
              lineHeight: '0.9',
              letterSpacing: '-0.06em'
            }}
          >
            {t.expertise.heading.line1} {t.expertise.heading.line2}
          </h2>

          {/* Description */}
          <p 
            className={`text-base md:text-lg text-[#1C1C1E] max-w-md leading-tight relative z-10 ${isVisible ? 'services-blur-animate' : ''}`}
            style={{ animationDelay: '0.3s', opacity: isVisible ? 0 : 0 }}
          >
            {t.expertise.description}
          </p>

          {/* CTA Button */}
          <button
            className={`group bg-[#2869D6] hover:bg-[#1E4A8C] text-white text-base py-4 px-8 rounded-full transition-all flex items-center justify-start gap-3 cursor-pointer w-auto relative z-10 ${isVisible ? 'services-blur-animate' : ''}`}
            style={{ animationDelay: '0.4s', opacity: isVisible ? 0 : 0 }}
          >
            {t.expertise.cta}
            <div className="bg-white rounded-full p-1 flex items-center justify-center transition-transform group-hover:translate-x-1">
              <ArrowRight className="w-3 h-3 text-[#2869D6]" />
            </div>
          </button>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:flex flex-col items-center text-center space-y-8 relative pt-[140px] pb-[140px]">
          {/* Floating Icons - Desktop */}
          <div className="absolute inset-0 pointer-events-none">
            <FloatingIcon name="python" position={{ top: '22%', left: '5%' }} delay={0.5} isVisible={isVisible} />
            <FloatingIcon name="n8n" position={{ top: '52%', left: '0%' }} delay={0.6} isVisible={isVisible} />
            <FloatingIcon name="react" position={{ top: '22%', right: '8%' }} delay={0.7} isVisible={isVisible} />
            <FloatingIcon name="nodejs" position={{ top: '52%', right: '0%' }} delay={0.75} isVisible={isVisible} />
            <FloatingIcon name="chatgpt" position={{ top: '82%', left: '6%' }} delay={0.8} isVisible={isVisible} />
            <FloatingIcon name="claude" position={{ top: '82%', right: '5%' }} delay={0.9} isVisible={isVisible} />
          </div>

          {/* Label Pill */}
          <div 
            className={`inline-flex items-center px-4 py-1.5 rounded-full border border-[#E2E7F1] text-[#1C1C1E] text-sm relative z-10 bg-white ${isVisible ? 'services-blur-animate' : ''}`}
            style={{ 
              animationDelay: '0.1s', 
              opacity: isVisible ? 0 : 0,
              fontFamily: 'Fustat-Bold, sans-serif',
              fontWeight: 'normal'
            }}
          >
            {t.expertise.label}
          </div>

          {/* Heading */}
          <h2 
            className={`text-4xl md:text-5xl text-[#1C1C1E] leading-none max-w-4xl relative z-10 ${isVisible ? 'services-blur-animate' : ''}`}
            style={{ 
              animationDelay: '0.2s', 
              opacity: isVisible ? 0 : 0,
              fontFamily: 'Fustat-Bold, sans-serif',
              fontWeight: 'normal',
              lineHeight: '0.9',
              letterSpacing: '-0.06em'
            }}
          >
            {t.expertise.heading.line1}
            <br />
            {t.expertise.heading.line2}
          </h2>

          {/* Description */}
          <p 
            className={`text-base md:text-lg text-[#1C1C1E] max-w-xl leading-tight relative z-10 ${isVisible ? 'services-blur-animate' : ''}`}
            style={{ animationDelay: '0.3s', opacity: isVisible ? 0 : 0 }}
          >
            {t.expertise.description}
          </p>

          {/* CTA Button */}
          <button
            className={`group bg-[#2869D6] hover:bg-[#1E4A8C] text-white text-base py-4 px-8 rounded-full transition-all flex items-center justify-center gap-3 cursor-pointer relative z-10 ${isVisible ? 'services-blur-animate' : ''}`}
            style={{ animationDelay: '0.4s', opacity: isVisible ? 0 : 0 }}
          >
            {t.expertise.cta}
            <div className="bg-white rounded-full p-1 flex items-center justify-center transition-transform group-hover:translate-x-1">
              <ArrowRight className="w-3 h-3 text-[#2869D6]" />
            </div>
          </button>
        </div>
      </div>
    </SectionLayout>
  );
};

// Floating Icon Component
const FloatingIcon = ({ 
  name, 
  position, 
  delay, 
  isVisible 
}: { 
  name: string; 
  position: { top: string; left?: string; right?: string }; 
  delay: number; 
  isVisible: boolean;
}) => {
  const getIcon = () => {
    const iconUrls: Record<string, string> = {
      python: 'https://res.cloudinary.com/dopp0v9eq/image/upload/v1764964166/python_umggwd.png',
      n8n: 'https://res.cloudinary.com/dopp0v9eq/image/upload/v1764964165/n8n_frmmel.png',
      chatgpt: 'https://res.cloudinary.com/dopp0v9eq/image/upload/v1764964165/chatgpt_m0zqpv.png',
      react: 'https://res.cloudinary.com/dopp0v9eq/image/upload/v1764964166/react_y5fogs.png',
      nodejs: 'https://res.cloudinary.com/dopp0v9eq/image/upload/v1764964166/nodejs_qzxzzd.png',
      claude: 'https://res.cloudinary.com/dopp0v9eq/image/upload/v1764964166/claude_kmb9jl.png'
    };

    const iconUrl = iconUrls[name];
    if (!iconUrl) return null;

    return (
      <img 
        src={iconUrl} 
        alt={getLabel()} 
        width={20} 
        height={20}
        style={{ display: 'block' }}
      />
    );
  };

  const getLabel = () => {
    switch (name) {
      case 'python': return 'Python';
      case 'n8n': return 'n8n';
      case 'react': return 'React';
      case 'nodejs': return 'Node.js';
      case 'chatgpt': return 'ChatGPT';
      case 'claude': return 'Claude';
      default: return '';
    }
  };

  return (
    <div
      className={`absolute flex items-center gap-2 bg-white rounded-full border border-[#E2E7F1] shadow-sm hover:shadow-md transition-shadow select-none ${isVisible ? 'services-blur-animate' : ''} animate-pulse-slow-1`}
      style={{
        ...position,
        animationDelay: `${delay}s`,
        opacity: 0,
        zIndex: 10,
        padding: '8px 12px',
        minHeight: '48px',
        userSelect: 'none',
        WebkitUserSelect: 'none'
      }}
    >
      <div className="flex-shrink-0">
        {getIcon()}
      </div>
      <span 
        className="whitespace-nowrap select-none"
        style={{
          fontSize: '20px',
          color: '#121217',
          fontFamily: 'Fustat-Bold, sans-serif',
          fontWeight: 'normal',
          userSelect: 'none',
          WebkitUserSelect: 'none'
        }}
      >
        {getLabel()}
      </span>
    </div>
  );
};

