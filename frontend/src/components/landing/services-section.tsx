import { SectionLayout } from "./section-layout";
import { FigmaIcon } from "@/components/ui/figma-icon";
import { CodeXmlIcon } from "@/components/ui/code-xml-icon";
import { BrainIcon } from "@/components/ui/brain-icon";
import { ChartNoAxesCombinedIcon } from "@/components/ui/chart-no-axes-combined-icon";
import { useLanguage } from "@/hooks/use-language";
import { translations } from "@/lib/translations";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { ArrowRight, ShieldCheck, CircleDollarSign, CalendarDays, RefreshCw, Plus, Instagram, Twitter, Youtube } from "lucide-react";
import SpotlightCard from "@/components/ui/spotlight-card";

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
        <div className="relative w-full" style={{ height: '71px' }}>
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

      {/* Large Striped Divider (below Expertise Section) */}
      <LargeStripedDivider />

      {/* Solutions Suite Section */}
      <SolutionsSuiteSection />

      {/* Large Striped Divider (below Solutions Suite Section) */}
      <LargeStripedDivider />

      {/* FAQ Section */}
      <FAQSection />

      {/* Large Striped Divider (below FAQ Section) */}
      <LargeStripedDivider />

      {/* Final CTA Section */}
      <FinalCTASection />

      {/* Large Striped Divider (below Final CTA Section) */}
      <LargeStripedDivider />

      {/* Footer Section */}
      <FooterSection />
    </>
  );
}

// Spotlight Button Component
const SpotlightButton = ({ 
  children, 
  className, 
  style, 
  spotlightColor = "rgba(255, 255, 255, 0.25)" 
}: { 
  children: React.ReactNode; 
  className?: string; 
  style?: React.CSSProperties;
  spotlightColor?: string;
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <button
      className={`group relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      style={style}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              circle at ${mouseX}px ${mouseY}px,
              ${spotlightColor},
              transparent 80%
            )
          `,
        }}
      />
      <div className={`relative z-10 flex items-center w-full h-full gap-3 ${className?.includes('justify-start') ? 'justify-start' : 'justify-center'}`}>
        {children}
      </div>
    </button>
  );
};

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
    <SectionLayout showStripes={false} showTopBorder={false} className="relative pt-0 pb-0 md:pb-0 px-6 md:px-16 lg:px-28">
      <div ref={sectionRef} className="relative z-10">
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
        <div className="flex flex-col md:hidden items-start text-left space-y-6 pt-[64px] pb-[64px] relative">
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
          <SpotlightButton
            className={`group bg-[#2869D6] text-white text-base py-4 px-8 rounded-full transition-all flex items-center justify-start gap-3 cursor-pointer w-auto relative z-10 ${isVisible ? 'services-blur-animate' : ''}`}
            style={{ animationDelay: '0.4s', opacity: isVisible ? 0 : 0 }}
          >
            {t.expertise.cta}
            <div className="bg-white rounded-full p-1 flex items-center justify-center transition-transform group-hover:translate-x-1">
              <ArrowRight className="w-3 h-3 text-[#2869D6]" />
            </div>
          </SpotlightButton>
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
          <SpotlightButton
            className={`group bg-[#2869D6] text-white text-base py-4 px-8 rounded-full transition-all flex items-center justify-center gap-3 cursor-pointer relative z-10 ${isVisible ? 'services-blur-animate' : ''}`}
            style={{ animationDelay: '0.4s', opacity: isVisible ? 0 : 0 }}
          >
            {t.expertise.cta}
            <div className="bg-white rounded-full p-1 flex items-center justify-center transition-transform group-hover:translate-x-1">
              <ArrowRight className="w-3 h-3 text-[#2869D6]" />
            </div>
          </SpotlightButton>
        </div>
      </div>
    </SectionLayout>
  );
};

const SolutionsSuiteSection = () => {
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

    return () => observer.disconnect();
  }, []);

  const renderHeading = () => {
    const heading = t.solutionsSuite.heading;
    const target = language === 'pt' ? 'soluções' : 'solutions';
    const parts = heading.split(target);

    if (parts.length === 2) {
      return (
        <>
          {parts[0]}
          <span className="relative inline-block">
            {target}
            <svg viewBox="0 0 100 40" className="absolute -left-4 -right-4 -top-2 -bottom-2 w-[calc(100%+32px)] h-[calc(100%+16px)] pointer-events-none" preserveAspectRatio="none">
              <motion.path
                d="M5,20 Q5,5 50,5 Q95,5 95,20 Q95,35 50,35 Q5,35 5,20"
                fill="none"
                stroke="#4ADE80"
                strokeWidth="1.5"
                initial={{ pathLength: 0 }}
                animate={isVisible ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{ duration: 1, ease: "easeInOut", delay: 0.5 }}
              />
            </svg>
          </span>
          {parts[1]}
        </>
      );
    }
    return heading;
  };

  const cards = [
    {
      title: t.solutionsSuite.items.antiFraud.title,
      description: t.solutionsSuite.items.antiFraud.description,
      icon: (
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Isometric Platform */}
          <div className="absolute w-32 h-16 bg-white rounded-[100%] border border-[#E2E7F1] transform -rotate-[15deg] shadow-lg flex items-center justify-center">
            <div className="w-24 h-12 bg-[#4ADE80]/10 rounded-[100%] blur-md" />
          </div>
          <div className="relative z-10 transform -translate-y-4">
            <div className="relative">
              <ShieldCheck size={48} className="text-[#4ADE80] fill-[#4ADE80]/10" />
              <RefreshCw size={20} className="text-[#4ADE80] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            </div>
          </div>
        </div>
      )
    },
    {
      title: t.solutionsSuite.items.checkout.title,
      description: t.solutionsSuite.items.checkout.description,
      icon: (
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Isometric Platform */}
          <div className="absolute w-32 h-16 bg-white rounded-[100%] border border-[#E2E7F1] transform -rotate-[15deg] shadow-lg flex items-center justify-center">
            <div className="w-24 h-12 bg-[#4ADE80]/10 rounded-[100%] blur-md" />
          </div>
          <div className="relative z-10 transform -translate-y-4">
            <CircleDollarSign size={48} className="text-[#4ADE80] fill-[#4ADE80]/10" />
          </div>
        </div>
      )
    },
    {
      title: t.solutionsSuite.items.subscriptions.title,
      description: t.solutionsSuite.items.subscriptions.description,
      badge: t.solutionsSuite.items.subscriptions.badge,
      icon: (
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Isometric Platform */}
          <div className="absolute w-32 h-16 bg-white rounded-[100%] border border-[#E2E7F1] transform -rotate-[15deg] shadow-lg flex items-center justify-center">
            <div className="w-24 h-12 bg-[#4ADE80]/10 rounded-[100%] blur-md" />
          </div>
          <div className="relative z-10 transform -translate-y-4">
            <div className="relative">
              <div className="w-12 h-12 bg-[#4ADE80] rounded-lg flex items-center justify-center text-white font-bold text-xl">
                31
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <SectionLayout showStripes={false} showTopBorder={false} className="relative pt-16 md:pt-24 pb-0">
      <div ref={sectionRef} className="max-w-[1500px] mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-16 md:mb-24 gap-8 px-6 md:px-16 lg:px-28">
          <h2
            className={`text-4xl md:text-5xl text-[#1C1C1E] max-w-xl ${isVisible ? 'services-blur-animate' : ''}`}
            style={{
              fontFamily: 'Fustat-Bold, sans-serif',
              fontWeight: 'normal',
              lineHeight: '0.9',
              letterSpacing: '-0.06em',
              opacity: isVisible ? 1 : 0
            }}
          >
            {renderHeading()}
          </h2>
          <p
            className={`text-base md:text-lg text-[#1C1C1E] max-w-xl leading-tight ${isVisible ? 'services-blur-animate' : ''}`}
            style={{ animationDelay: '0.2s', opacity: isVisible ? 1 : 0 }}
          >
            {t.solutionsSuite.description}
          </p>
        </div>

        {/* Cards Grid */}
        <div className="relative">
          {/* Grid Lines - Desktop */}
          <div className="absolute top-0 left-0 right-0 h-[0.5px] bg-[#E2E7F1] z-20"></div>
          <div className="absolute hidden md:block left-0 right-0 h-[0.5px] bg-[#E2E7F1] z-20" style={{ top: '320px' }}></div>
          <div className="absolute bottom-0 left-0 right-0 h-[0.5px] bg-[#E2E7F1] z-20"></div>

          <div className="absolute hidden md:block top-0 bottom-0 left-[33.333%] w-[0.5px] bg-[#E2E7F1] z-20"></div>
          <div className="absolute hidden md:block top-0 bottom-0 left-[66.666%] w-[0.5px] bg-[#E2E7F1] z-20"></div>

          {/* Grid Decorations - Top Row */}
          {/* Left Flare */}
          <svg
            viewBox="0 0 20 10"
            className="absolute w-6 h-[12px] fill-[#E2E7F1] pointer-events-none"
            preserveAspectRatio="none"
            style={{
              left: '6px',
              top: '0',
              transform: 'translateY(-50%) translateX(-50%) rotate(-90deg)',
              zIndex: 30
            }}
          >
            <path d="M0 0 Q 9.5 0 9.5 10 L 10.5 10 Q 10.5 0 20 0 Z" />
          </svg>

          {/* Middle Flares (pointing down) */}
          <svg
            viewBox="0 0 20 10"
            className="absolute w-6 h-[12px] fill-[#E2E7F1] pointer-events-none hidden md:block"
            preserveAspectRatio="none"
            style={{
              left: '33.333%',
              top: '0',
              transform: 'translateX(-50%)',
              zIndex: 30
            }}
          >
            <path d="M0 0 Q 9.5 0 9.5 10 L 10.5 10 Q 10.5 0 20 0 Z" />
          </svg>

          <svg
            viewBox="0 0 20 10"
            className="absolute w-6 h-[12px] fill-[#E2E7F1] pointer-events-none hidden md:block"
            preserveAspectRatio="none"
            style={{
              left: '66.666%',
              top: '0',
              transform: 'translateX(-50%)',
              zIndex: 30
            }}
          >
            <path d="M0 0 Q 9.5 0 9.5 10 L 10.5 10 Q 10.5 0 20 0 Z" />
          </svg>

          {/* Right Flare */}
          <svg
            viewBox="0 0 20 10"
            className="absolute w-6 h-[12px] fill-[#E2E7F1] pointer-events-none"
            preserveAspectRatio="none"
            style={{
              right: '6px',
              top: '0',
              transform: 'translateY(-50%) translateX(50%) rotate(90deg)',
              zIndex: 30
            }}
          >
            <path d="M0 0 Q 9.5 0 9.5 10 L 10.5 10 Q 10.5 0 20 0 Z" />
          </svg>

          {/* Grid Decorations - Middle Row */}
          <svg
            viewBox="0 0 20 10"
            className="absolute w-6 h-[12px] fill-[#E2E7F1] pointer-events-none hidden md:block"
            preserveAspectRatio="none"
            style={{
              left: '6px',
              top: '320px',
              transform: 'translateY(-50%) translateX(-50%) rotate(-90deg)',
              zIndex: 30
            }}
          >
            <path d="M0 0 Q 9.5 0 9.5 10 L 10.5 10 Q 10.5 0 20 0 Z" />
          </svg>

          <GridDecoration className="hidden md:flex top-[320px] -mt-[12px] left-[33.333%] -ml-[12px]" />
          <GridDecoration className="hidden md:flex top-[320px] -mt-[12px] left-[66.666%] -ml-[12px]" />

          <svg
            viewBox="0 0 20 10"
            className="absolute w-6 h-[12px] fill-[#E2E7F1] pointer-events-none hidden md:block"
            preserveAspectRatio="none"
            style={{
              right: '6px',
              top: '320px',
              transform: 'translateY(-50%) translateX(50%) rotate(90deg)',
              zIndex: 30
            }}
          >
            <path d="M0 0 Q 9.5 0 9.5 10 L 10.5 10 Q 10.5 0 20 0 Z" />
          </svg>

          {/* Grid Decorations - Bottom Row */}
          <GridDecoration className="hidden md:flex -bottom-[12px] -left-[12px]" />
          {/* Middle Flares (pointing up) */}
          <svg
            viewBox="0 0 20 10"
            className="absolute w-6 h-[12px] fill-[#E2E7F1] pointer-events-none hidden md:block"
            preserveAspectRatio="none"
            style={{
              left: '33.333%',
              bottom: '0',
              transform: 'translateX(-50%) rotate(180deg)',
              zIndex: 30
            }}
          >
            <path d="M0 0 Q 9.5 0 9.5 10 L 10.5 10 Q 10.5 0 20 0 Z" />
          </svg>
          <svg
            viewBox="0 0 20 10"
            className="absolute w-6 h-[12px] fill-[#E2E7F1] pointer-events-none hidden md:block"
            preserveAspectRatio="none"
            style={{
              left: '66.666%',
              bottom: '0',
              transform: 'translateX(-50%) rotate(180deg)',
              zIndex: 30
            }}
          >
            <path d="M0 0 Q 9.5 0 9.5 10 L 10.5 10 Q 10.5 0 20 0 Z" />
          </svg>
          <GridDecoration className="hidden md:flex -bottom-[12px] -right-[12px]" />

          <div className="grid grid-cols-1 md:grid-cols-3 bg-white">
            {cards.map((card, index) => (
              <SpotlightCard
                key={index}
                className={`flex flex-col relative ${isVisible ? 'services-blur-animate' : ''} ${index < 2 ? 'border-b md:border-b-0 border-[#E2E7F1]' : ''}`}
                style={{ animationDelay: `${0.3 + index * 0.1}s`, opacity: isVisible ? 1 : 0 }}
                spotlightColor="rgba(255, 255, 255, 0.2)"
              >
                {/* Mobile flares for stacked cards */}
                {index > 0 && (
                  <>
                    <svg
                      viewBox="0 0 20 10"
                      className="absolute w-6 h-[12px] fill-[#E2E7F1] pointer-events-none md:hidden"
                      preserveAspectRatio="none"
                      style={{
                        left: '6px',
                        top: '0',
                        transform: 'translateY(-50%) translateX(-50%) rotate(-90deg)',
                        zIndex: 30
                      }}
                    >
                      <path d="M0 0 Q 9.5 0 9.5 10 L 10.5 10 Q 10.5 0 20 0 Z" />
                    </svg>
                    <svg
                      viewBox="0 0 20 10"
                      className="absolute w-6 h-[12px] fill-[#E2E7F1] pointer-events-none md:hidden"
                      preserveAspectRatio="none"
                      style={{
                        right: '6px',
                        top: '0',
                        transform: 'translateY(-50%) translateX(50%) rotate(90deg)',
                        zIndex: 30
                      }}
                    >
                      <path d="M0 0 Q 9.5 0 9.5 10 L 10.5 10 Q 10.5 0 20 0 Z" />
                    </svg>
                  </>
                )}
                {/* Card Image/Icon Area */}
                <div className="h-64 md:h-80 relative overflow-hidden bg-[#FAFBFC]">
                  {/* Background Grid */}
                  <div
                    className="absolute inset-0 opacity-[0.15]"
                    style={{
                      backgroundImage: `
                        linear-gradient(#E2E7F1 1px, transparent 1px),
                        linear-gradient(90deg, #E2E7F1 1px, transparent 1px)
                      `,
                      backgroundSize: '24px 24px',
                      backgroundPosition: 'center center'
                    }}
                  />

                  {index === 2 && card.badge && (
                    <div className="absolute top-4 right-4 z-20">
                      <span className="px-3 py-1 bg-[#4ADE80]/20 text-[#166534] text-xs font-semibold rounded-full border border-[#4ADE80]/30">
                        {card.badge}
                      </span>
                    </div>
                  )}

                  <div className="absolute inset-0 flex items-center justify-center">
                    {card.icon}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-8 border-t border-[#E2E7F1]">
                  <h3
                    className="text-xl text-[#1C1C1E] mb-3"
                    style={{
                      fontFamily: 'Fustat-Bold, sans-serif',
                      fontWeight: 'normal'
                    }}
                  >
                    {card.title}
                  </h3>
                  <p className="text-[#6B7280] text-sm leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </div>
    </SectionLayout>
  );
};

// FAQ Section Component
const FAQSection = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <SectionLayout showStripes={false} showTopBorder={false} className="py-24 px-6 md:px-16 lg:px-28">
      <div ref={sectionRef} className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">
        {/* Left Side: Heading and Description */}
        <div className={`flex flex-col space-y-8 ${isVisible ? 'services-blur-animate' : ''}`} style={{ opacity: 0 }}>
          <h2
            className="text-4xl md:text-5xl text-[#1C1C1E] leading-none"
            style={{
              fontFamily: 'Fustat-Bold, sans-serif',
              fontWeight: 'normal',
              lineHeight: '0.9',
              letterSpacing: '-0.06em'
            }}
          >
            {t.faq.heading}
          </h2>
          <p className="text-[#1C1C1E] text-base md:text-lg max-w-md leading-tight">
            {t.faq.description}
          </p>
        </div>

        {/* Right Side: FAQ Accordion */}
        <div className={`flex flex-col border border-[#E2E7F1] rounded-sm bg-white overflow-hidden divide-y divide-[#E2E7F1] ${isVisible ? 'services-blur-animate' : ''}`} style={{ opacity: 0, animationDelay: '0.2s' }}>
          {t.faq.items.map((item, index) => (
            <div key={index} className="flex flex-col">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex items-start gap-4 p-6 md:p-8 text-left hover:bg-slate-50/50 transition-colors group w-full cursor-pointer"
              >
                <div className="flex-shrink-0 mt-1">
                  <Plus
                    className={`w-5 h-5 text-[#4ADE80] transition-transform duration-300 ${openIndex === index ? 'rotate-45' : ''}`}
                  />
                </div>
                <span
                  className="text-[#1C1C1E] text-base md:text-lg flex-1 pr-4"
                  style={{
                    fontFamily: 'Fustat-Bold, sans-serif',
                    fontWeight: 'normal',
                    lineHeight: '1.4'
                  }}
                >
                  {item.question}
                </span>
              </button>

              <motion.div
                initial={false}
                animate={{ height: openIndex === index ? 'auto' : 0, opacity: openIndex === index ? 1 : 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-6 md:px-8 md:pb-8 pt-0 text-[#6B7280] text-base md:text-lg leading-relaxed ml-9 md:ml-12">
                  {item.answer}
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </SectionLayout>
  );
};

// Final CTA Section Component
const FinalCTASection = () => {
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
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <SectionLayout showStripes={false} showTopBorder={false} className="py-24 px-6 md:px-16 lg:px-28">
      <div
        ref={sectionRef}
        className={`relative overflow-hidden rounded-[2.5rem] bg-[#4ADE80] p-10 md:p-20 flex flex-col md:flex-row items-center justify-between gap-12 ${isVisible ? 'services-blur-animate' : ''}`}
        style={{ opacity: 0 }}
      >
        {/* Content Side */}
        <div className="flex flex-col space-y-8 z-10 w-full md:w-3/5">
          <h2
            className="text-[#1C1C1E] leading-[1.1]"
            style={{
              fontSize: 'clamp(40px, 6vw, 64px)',
              fontFamily: 'Fustat-Bold, sans-serif',
              fontWeight: 'normal',
              letterSpacing: '-0.04em'
            }}
          >
            {t.finalCTA.heading}
          </h2>
          <p className="text-[#1C1C1E] text-lg md:text-xl max-w-md leading-tight">
            {t.finalCTA.description}
          </p>

          <div className="pt-4">
            <SpotlightButton 
              className="inline-flex items-center gap-4 bg-white text-[#1C1C1E] px-8 py-5 rounded-full transition-all group active:scale-95"
              spotlightColor="rgba(0, 0, 0, 0.05)"
            >
              <span className="text-xl" style={{ fontFamily: 'Fustat-Bold, sans-serif' }}>{t.finalCTA.cta}</span>
              <div className="w-8 h-8 rounded-full bg-[#1C1C1E] flex items-center justify-center text-white transition-transform group-hover:translate-x-1">
                <ArrowRight className="w-5 h-5" />
              </div>
            </SpotlightButton>
          </div>
        </div>

        {/* Illustration Side */}
        <div className="relative w-full md:w-2/5 flex justify-center md:justify-end">
          <div className="relative w-full max-w-[500px] h-[300px] md:h-[400px]">
            {/* 
                Since we don't have the original asset, we'll use a stylized representation 
                that matches the spirit of the illustration in the image 
            */}
            <svg viewBox="0 0 500 400" className="w-full h-full drop-shadow-xl" preserveAspectRatio="xMidYMid meet">
              {/* Giant Arrow */}
              <path
                d="M50,350 Q100,320 180,250 T450,50"
                fill="none"
                stroke="#1C1C1E"
                strokeWidth="15"
                strokeLinecap="round"
              />
              <path
                d="M450,50 L420,50 L455,40 L460,75 Z"
                fill="#1C1C1E"
                stroke="#1C1C1E"
                strokeWidth="5"
                strokeLinejoin="round"
              />

              {/* Flying Character Stylized */}
              <g transform="translate(280, 160) rotate(-35)">
                {/* Hair */}
                <path d="M-50,-20 Q-70,0 -50,40 Q-30,60 0,40" fill="#1C1C1E" />
                {/* Body/Shirt */}
                <path d="M-30,0 L30,0 L20,60 L-20,60 Z" fill="white" stroke="#1C1C1E" strokeWidth="3" />
                {/* Pants */}
                <path d="M-20,60 L20,60 L30,120 L10,120 L0,80 L-10,120 L-30,120 Z" fill="#1C1C1E" />
                {/* Head */}
                <circle cx="0" cy="-20" r="22" fill="#FFE4E6" stroke="#1C1C1E" strokeWidth="3" />
                {/* Money in hand */}
                <g transform="translate(30, 20) rotate(10)">
                  <rect width="40" height="25" fill="#4ADE80" stroke="#1C1C1E" strokeWidth="2" rx="2" />
                  <rect x="5" y="5" width="40" height="25" fill="#4ADE80" stroke="#1C1C1E" strokeWidth="2" rx="2" />
                  <path d="M10,10 L30,10 M10,15 L35,15" stroke="#1C1C1E" strokeWidth="1" opacity="0.5" />
                </g>
              </g>

              {/* Decorative Floating Money */}
              <g transform="translate(150, 100) rotate(-20)">
                <rect width="25" height="15" fill="#4ADE80" stroke="#1C1C1E" strokeWidth="1.5" rx="1" />
              </g>
              <g transform="translate(80, 200) rotate(15)">
                <rect width="25" height="15" fill="#4ADE80" stroke="#1C1C1E" strokeWidth="1.5" rx="1" />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </SectionLayout>
  );
};

// AbacatePay Logo Component
const AbacatePayLogo = () => (
  <div className="flex items-center gap-2">
    <div className="w-10 h-10 relative">
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm">
        {/* Avocado Outer Body */}
        <path
          d="M50,15 C35,15 20,40 20,65 C20,85 35,95 50,95 C65,95 80,85 80,65 C80,40 65,15 50,15 Z"
          fill="#4ADE80"
        />
        {/* Avocado Pit */}
        <circle cx="50" cy="65" r="18" fill="#166534" />
        {/* Highlight for depth */}
        <path
          d="M40,30 Q30,40 30,60"
          fill="none"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.3"
        />
      </svg>
    </div>
    <span
      className="text-3xl text-[#1C1C1E] tracking-tight"
      style={{ fontFamily: 'Fustat-Bold, sans-serif' }}
    >
      Pay
    </span>
  </div>
);

// Footer Section Component
const FooterSection = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <SectionLayout showStripes={false} showTopBorder={false} className="pt-24 pb-12 px-6 md:px-16 lg:px-28">
      {/* Main footer content */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-24 mb-24">
        {/* Logo Column */}
        <div className="md:col-span-3 flex items-start">
          <div className="flex items-center gap-8 md:gap-12 w-full">
            <a 
              href={`/${language}`}
              onClick={(e) => {
                e.preventDefault();
                window.location.href = `/${language}`;
              }}
              className="flex items-center gap-2 cursor-pointer flex-shrink-0"
            >
              <img 
                src="https://res.cloudinary.com/dopp0v9eq/image/upload/v1763574787/monfily-black-nobg_risk6t.png" 
                alt="Monfily" 
                className="h-10 w-auto select-none"
                draggable="false"
                onContextMenu={(e) => e.preventDefault()}
                onDragStart={(e) => e.preventDefault()}
              />
            </a>
            <div className="hidden md:block w-[0.5px] h-32 bg-[#E2E7F1]"></div>
          </div>
        </div>

        {/* Links Columns */}
        <div className="md:col-span-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16 md:gap-24">
          {/* Account */}
          <div className="flex flex-col space-y-6">
            <h4 className="text-[#1C1C1E] text-lg" style={{ fontFamily: 'Fustat-Bold, sans-serif' }}>
              {t.footer.columns.account.title}
            </h4>
            <ul className="flex flex-col space-y-4">
              <li>
                <a href="#" className="text-[#6B7280] hover:text-[#1C1C1E] transition-colors text-lg">
                  {t.footer.columns.account.signup}
                </a>
              </li>
              <li>
                <a href="#" className="text-[#6B7280] hover:text-[#1C1C1E] transition-colors text-lg">
                  {t.footer.columns.account.login}
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="flex flex-col space-y-6">
            <h4 className="text-[#1C1C1E] text-lg" style={{ fontFamily: 'Fustat-Bold, sans-serif' }}>
              {t.footer.columns.support.title}
            </h4>
            <ul className="flex flex-col space-y-4">
              <li>
                <a href={`mailto:${t.footer.columns.support.email}`} className="text-[#6B7280] hover:text-[#1C1C1E] transition-colors text-lg break-all">
                  {t.footer.columns.support.email}
                </a>
              </li>
              <li>
                <a href="#" className="text-[#6B7280] hover:text-[#1C1C1E] transition-colors text-lg">
                  {t.footer.columns.support.talkToSupport}
                </a>
              </li>
              <li>
                <a href="#" className="text-[#6B7280] hover:text-[#1C1C1E] transition-colors text-lg">
                  {t.footer.columns.support.joinDiscord}
                </a>
              </li>
            </ul>
          </div>

          {/* Website */}
          <div className="flex flex-col space-y-6">
            <h4 className="text-[#1C1C1E] text-lg" style={{ fontFamily: 'Fustat-Bold, sans-serif' }}>
              {t.footer.columns.website.title}
            </h4>
            <ul className="flex flex-col space-y-4">
              <li><a href="#" className="text-[#6B7280] hover:text-[#1C1C1E] transition-colors text-lg">{t.footer.columns.website.docs}</a></li>
              <li><a href="#" className="text-[#6B7280] hover:text-[#1C1C1E] transition-colors text-lg">{t.footer.columns.website.integrations}</a></li>
              <li><a href="#" className="text-[#6B7280] hover:text-[#1C1C1E] transition-colors text-lg">{t.footer.columns.website.products}</a></li>
              <li><a href="#" className="text-[#6B7280] hover:text-[#1C1C1E] transition-colors text-lg">{t.footer.columns.website.fees}</a></li>
              <li><a href="#" className="text-[#6B7280] hover:text-[#1C1C1E] transition-colors text-lg">{t.footer.columns.website.privacy}</a></li>
              <li><a href="#" className="text-[#6B7280] hover:text-[#1C1C1E] transition-colors text-lg">{t.footer.columns.website.terms}</a></li>
              <li><a href="#" className="text-[#6B7280] hover:text-[#1C1C1E] transition-colors text-lg">{t.footer.columns.website.status}</a></li>
            </ul>
          </div>

          {/* A.I */}
          <div className="flex flex-col space-y-6">
            <h4 className="text-[#1C1C1E] text-lg" style={{ fontFamily: 'Fustat-Bold, sans-serif' }}>
              {t.footer.columns.ai.title}
            </h4>
            <ul className="flex flex-col space-y-4">
              <li><a href="#" className="text-[#6B7280] hover:text-[#1C1C1E] transition-colors text-lg">{t.footer.columns.ai.chat}</a></li>
              <li><a href="#" className="text-[#6B7280] hover:text-[#1C1C1E] transition-colors text-lg">{t.footer.columns.ai.llms}</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Dotted Divider & Bottom Bar */}
      <div className="w-full border-t border-dotted border-[#E2E7F1] pt-12 flex flex-col md:flex-row items-center justify-between gap-8">
        <p className="text-[#6B7280] text-lg text-center md:text-left leading-relaxed max-w-4xl">
          {t.footer.copyright}
        </p>
        <div className="flex items-center gap-8">
          <div className="hidden md:block w-px h-6 bg-[#E2E7F1]"></div>
          {/* Social Icons */}
          <div className="flex items-center gap-6">
            <a href="#" className="text-[#1C1C1E] hover:text-[#4ADE80] transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037 19.736 19.736 0 0 0-4.885 1.515.069.069 0 0 0-.032.027C.533 9.048-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
            </a>
            <Instagram className="w-5 h-5 text-[#1C1C1E] hover:text-[#4ADE80] transition-colors cursor-pointer" />
            <Twitter className="w-5 h-5 text-[#1C1C1E] hover:text-[#4ADE80] transition-colors cursor-pointer" />
            <Youtube className="w-5 h-5 text-[#1C1C1E] hover:text-[#4ADE80] transition-colors cursor-pointer" />
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
