import { SectionLayout } from "./section-layout";
import { FigmaIcon } from "@/components/ui/figma-icon";
import { CodeXmlIcon } from "@/components/ui/code-xml-icon";
import { BrainIcon } from "@/components/ui/brain-icon";
import { ChartNoAxesCombinedIcon } from "@/components/ui/chart-no-axes-combined-icon";
import PixelBlast from "@/components/ui/pixel-blast";
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
      `}</style>
      <div ref={sectionRef} id="servicos">
      {/* Mobile Section */}
      <SectionLayout showStripes={false} className="flex flex-col md:hidden px-6" containerClassName="overflow-visible">
        <div className="flex flex-col w-full gap-8 py-8" style={{ overflow: 'visible', position: 'relative' }}>
          {/* Header */}
          <div className="flex flex-col gap-6 pt-8 pb-8 relative items-center" style={{ paddingTop: '32px', paddingBottom: '32px' }}>
            <h2 
              className={`text-[#1C1C1E] leading-none relative z-10 text-center ${isVisible ? 'services-blur-animate' : ''}`}
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
              className={`flex flex-row gap-6 mt-8 relative z-10 items-center justify-center ${isVisible ? 'services-blur-animate' : ''}`}
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
        {/* Background Pattern */}
        <div 
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, #E2E7F1 1.5px, transparent 1.5px)',
            backgroundSize: '24px 24px',
            backgroundPosition: '0 0'
          }}
        />

        {/* Mobile Layout */}
        <div className="flex flex-col md:hidden items-start text-left space-y-6 pt-16 pb-8">
          {/* Label Pill */}
          <div 
            className={`inline-flex items-center px-3 py-1 rounded-full border border-[#E2E7F1] text-[#1C1C1E] text-xs ${isVisible ? 'services-blur-animate' : ''}`}
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
            className={`text-[#1C1C1E] leading-none ${isVisible ? 'services-blur-animate' : ''}`}
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
            className={`text-base md:text-lg text-[#1C1C1E] max-w-md leading-tight ${isVisible ? 'services-blur-animate' : ''}`}
            style={{ animationDelay: '0.3s', opacity: isVisible ? 0 : 0 }}
          >
            {t.expertise.description}
          </p>

          {/* CTA Button */}
          <button
            className={`group bg-[#2869D6] hover:bg-[#1E4A8C] text-white text-base py-4 px-8 rounded-full transition-all flex items-center justify-center gap-3 cursor-pointer w-full sm:w-auto ${isVisible ? 'services-blur-animate' : ''}`}
            style={{ animationDelay: '0.4s', opacity: isVisible ? 0 : 0 }}
          >
            {t.expertise.cta}
            <div className="bg-white rounded-full p-1 flex items-center justify-center transition-transform group-hover:translate-x-1">
              <ArrowRight className="w-3 h-3 text-[#2869D6]" />
            </div>
          </button>

          {/* Floating Icons - Mobile */}
          <div className="relative w-full h-80">
            <FloatingIcon name="python" position={{ top: '5%', left: '0%' }} delay={0.5} isVisible={isVisible} />
            <FloatingIcon name="n8n" position={{ top: '25%', left: '5%' }} delay={0.6} isVisible={isVisible} />
            <FloatingIcon name="react" position={{ top: '20%', right: '0%' }} delay={0.7} isVisible={isVisible} />
            <FloatingIcon name="chatgpt" position={{ top: '60%', left: '8%' }} delay={0.8} isVisible={isVisible} />
            <FloatingIcon name="claude" position={{ top: '75%', right: '0%' }} delay={0.9} isVisible={isVisible} />
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:flex flex-col items-center text-center space-y-8 relative pt-[140px] pb-[100px]">
          {/* Label Pill */}
          <div 
            className={`inline-flex items-center px-4 py-1.5 rounded-full border border-[#E2E7F1] text-[#1C1C1E] text-sm ${isVisible ? 'services-blur-animate' : ''}`}
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
            className={`text-4xl md:text-5xl text-[#1C1C1E] leading-none max-w-4xl ${isVisible ? 'services-blur-animate' : ''}`}
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
            className={`text-base md:text-lg text-[#1C1C1E] max-w-2xl leading-tight ${isVisible ? 'services-blur-animate' : ''}`}
            style={{ animationDelay: '0.3s', opacity: isVisible ? 0 : 0 }}
          >
            {t.expertise.description}
          </p>

          {/* CTA Button */}
          <button
            className={`group bg-[#2869D6] hover:bg-[#1E4A8C] text-white text-base py-4 px-8 rounded-full transition-all flex items-center justify-center gap-3 cursor-pointer ${isVisible ? 'services-blur-animate' : ''}`}
            style={{ animationDelay: '0.4s', opacity: isVisible ? 0 : 0 }}
          >
            {t.expertise.cta}
            <div className="bg-white rounded-full p-1 flex items-center justify-center transition-transform group-hover:translate-x-1">
              <ArrowRight className="w-3 h-3 text-[#2869D6]" />
            </div>
          </button>

          {/* Floating Icons - Desktop */}
          <div className="relative w-full h-[500px]">
            <FloatingIcon name="python" position={{ top: '8%', left: '5%' }} delay={0.5} isVisible={isVisible} />
            <FloatingIcon name="n8n" position={{ top: '25%', left: '8%' }} delay={0.6} isVisible={isVisible} />
            <FloatingIcon name="react" position={{ top: '18%', right: '8%' }} delay={0.7} isVisible={isVisible} />
            <FloatingIcon name="chatgpt" position={{ top: '55%', left: '6%' }} delay={0.8} isVisible={isVisible} />
            <FloatingIcon name="claude" position={{ top: '70%', right: '5%' }} delay={0.9} isVisible={isVisible} />
          </div>
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
    switch (name) {
      case 'python':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.5 2.5C14.5 2.5 15.5 2.5 15.5 3.5C15.5 4.5 14.5 5.5 13.5 5.5C12.5 5.5 11.5 4.5 11.5 3.5C11.5 2.5 12.5 1.5 13.5 1.5C14.5 1.5 14.5 2.5 14.5 2.5Z" fill="#3776AB"/>
            <path d="M9.5 21.5C9.5 21.5 8.5 21.5 8.5 20.5C8.5 19.5 9.5 18.5 10.5 18.5C11.5 18.5 12.5 19.5 12.5 20.5C12.5 21.5 11.5 22.5 10.5 22.5C9.5 22.5 9.5 21.5 9.5 21.5Z" fill="#FFD43B"/>
            <path d="M12 2C8.5 2 6 3.5 6 6.5V9H9V8H12V6.5C12 5.5 12.5 5 13.5 5C14.5 5 15 5.5 15 6.5V9H18V6.5C18 3.5 15.5 2 12 2Z" fill="#3776AB"/>
            <path d="M12 22C15.5 22 18 20.5 18 17.5V15H15V16H12V17.5C12 18.5 11.5 19 10.5 19C9.5 19 9 18.5 9 17.5V15H6V17.5C6 20.5 8.5 22 12 22Z" fill="#FFD43B"/>
            <path d="M6 10.5H18V13.5H6V10.5Z" fill="#3776AB"/>
          </svg>
        );
      case 'n8n':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#FF6D5B"/>
            <path d="M2 17L12 22L22 17V12L12 17L2 12V17Z" fill="#FF6D5B"/>
          </svg>
        );
      case 'react':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="2" fill="#61DAFB"/>
            <ellipse cx="12" cy="12" rx="11" ry="4.2" stroke="#61DAFB" strokeWidth="1.5" fill="none"/>
            <ellipse cx="12" cy="12" rx="11" ry="4.2" stroke="#61DAFB" strokeWidth="1.5" fill="none" transform="rotate(60 12 12)"/>
            <ellipse cx="12" cy="12" rx="11" ry="4.2" stroke="#61DAFB" strokeWidth="1.5" fill="none" transform="rotate(120 12 12)"/>
          </svg>
        );
      case 'chatgpt':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21.5 9.5C21.5 9.5 21.5 8.5 20.5 8.5C19.5 8.5 18.5 9.5 18.5 9.5C18.5 9.5 17.5 9.5 17.5 10.5C17.5 11.5 18.5 12.5 18.5 12.5C18.5 12.5 17.5 13.5 17.5 14.5C17.5 15.5 18.5 16.5 18.5 16.5C18.5 16.5 19.5 16.5 20.5 16.5C21.5 16.5 21.5 15.5 21.5 15.5C21.5 15.5 22.5 15.5 22.5 14.5C22.5 13.5 21.5 12.5 21.5 12.5C21.5 12.5 22.5 11.5 22.5 10.5C22.5 9.5 21.5 9.5 21.5 9.5Z" fill="#10A37F"/>
            <path d="M5.5 9.5C5.5 9.5 5.5 8.5 4.5 8.5C3.5 8.5 2.5 9.5 2.5 9.5C2.5 9.5 1.5 9.5 1.5 10.5C1.5 11.5 2.5 12.5 2.5 12.5C2.5 12.5 1.5 13.5 1.5 14.5C1.5 15.5 2.5 16.5 2.5 16.5C2.5 16.5 3.5 16.5 4.5 16.5C5.5 16.5 5.5 15.5 5.5 15.5C5.5 15.5 6.5 15.5 6.5 14.5C6.5 13.5 5.5 12.5 5.5 12.5C5.5 12.5 6.5 11.5 6.5 10.5C6.5 9.5 5.5 9.5 5.5 9.5Z" fill="#10A37F"/>
            <path d="M12 2C12 2 11 2 11 3C11 4 12 5 12 5C12 5 13 5 13 4C13 3 12 2 12 2Z" fill="#10A37F"/>
            <path d="M12 19C12 19 11 19 11 20C11 21 12 22 12 22C12 22 13 22 13 21C13 20 12 19 12 19Z" fill="#10A37F"/>
            <path d="M12 7C8 7 5 10 5 14C5 18 8 21 12 21C16 21 19 18 19 14C19 10 16 7 12 7Z" fill="#10A37F"/>
          </svg>
        );
      case 'claude':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2Z" fill="#D97757"/>
            <path d="M12 6C8.7 6 6 8.7 6 12C6 15.3 8.7 18 12 18C15.3 18 18 15.3 18 12C18 8.7 15.3 6 12 6Z" fill="#F4A261"/>
          </svg>
        );
      default:
        return null;
    }
  };

  const getLabel = () => {
    switch (name) {
      case 'python': return 'Python';
      case 'n8n': return 'n8n';
      case 'react': return 'React';
      case 'chatgpt': return 'ChatGPT';
      case 'claude': return 'Claude';
      default: return '';
    }
  };

  return (
    <div
      className={`absolute flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow ${isVisible ? 'services-blur-animate' : ''}`}
      style={{
        ...position,
        animationDelay: `${delay}s`,
        opacity: isVisible ? 0 : 0,
        zIndex: 10
      }}
    >
      <div className="flex-shrink-0">
        {getIcon()}
      </div>
      <span className="text-sm font-medium text-[#1C1C1E] whitespace-nowrap">{getLabel()}</span>
    </div>
  );
};

