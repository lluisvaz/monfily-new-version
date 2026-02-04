import { SectionLayout } from "./section-layout";
import { useLanguage } from "@/hooks/use-language";
import { translations } from "@/lib/translations";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Plus, Instagram, Mail, Whatsapp } from "iconoir-react";
import { WindowIcon, CommandLineIcon, CpuChipIcon, ChartBarIcon } from "@heroicons/react/24/outline";
import SpotlightCard from "@/components/ui/spotlight-card";
import { SpotlightButton } from "@/components/ui/spotlight-button";
import LeadForm from "@/components/forms/lead-form";

const GridDecoration = ({ className }: { className?: string }) => (
  <div className={`absolute w-6 h-6 flex items-center justify-center pointer-events-none ${className}`} style={{ zIndex: 'var(--section-grid-z, 9990)' }}>
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
                        <WindowIcon className="w-5 h-5 text-[#1C1C1E] self-start" />
                      ) : service.isCodeXml ? (
                        <CommandLineIcon className="w-5 h-5 text-[#1C1C1E] self-start" />
                      ) : service.isBrain ? (
                        <CpuChipIcon className="w-5 h-5 text-[#1C1C1E] self-start" />
                      ) : service.isChart ? (
                        <ChartBarIcon className="w-5 h-5 text-[#1C1C1E] self-start" />
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
                      <WindowIcon className="w-6 h-6 text-[#1C1C1E] self-start" />
                    ) : service.isCodeXml ? (
                      <CommandLineIcon className="w-6 h-6 text-[#1C1C1E] self-start" />
                    ) : service.isBrain ? (
                      <CpuChipIcon className="w-6 h-6 text-[#1C1C1E] self-start" />
                    ) : service.isChart ? (
                      <ChartBarIcon className="w-6 h-6 text-[#1C1C1E] self-start" />
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
          className={`absolute opacity-40 pointer-events-none -left-6 -right-6 md:-left-16 md:-right-16 lg:-left-28 lg:-right-28 ${isVisible ? 'services-blur-animate' : ''}`}
          style={{
            top: 0,
            bottom: 0,
            opacity: 0,
            animationDelay: '0.05s',
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
          className={`absolute pointer-events-none -left-6 -right-6 md:-left-16 md:-right-16 lg:-left-28 lg:-right-28 ${isVisible ? 'services-blur-animate' : ''}`}
          style={{
            top: 0,
            bottom: 0,
            opacity: 0,
            animationDelay: '0.1s',
            background: `
              radial-gradient(circle at center, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.9) 20%, rgba(255, 255, 255, 0.7) 40%, rgba(255, 255, 255, 0.4) 60%, rgba(255, 255, 255, 0.1) 80%, transparent 95%)
            `
          }}
        />

        {/* Mobile Layout */}
        <div className={`flex flex-col md:hidden items-start text-left space-y-6 pt-[64px] pb-[64px] relative ${isVisible ? 'services-blur-animate' : ''}`} style={{ opacity: 0, animationDelay: '0.15s' }}>
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
            onClick={() => {
              const el = document.getElementById('contato');
              const scrollInstance = (window as any).locomotiveScroll;
              if (scrollInstance && el) {
                scrollInstance.scrollTo(el, { duration: 1000, easing: [0.25, 0.00, 0.35, 1.00] });
              } else if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }
            }}
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
        <div className={`hidden md:flex flex-col items-center text-center space-y-8 relative pt-[140px] pb-[140px] ${isVisible ? 'services-blur-animate' : ''}`} style={{ opacity: 0, animationDelay: '0.2s' }}>
          {/* Floating Icons - Desktop */}
          <div className={`absolute inset-0 pointer-events-none ${isVisible ? 'services-blur-animate' : ''}`} style={{ opacity: 0, animationDelay: '0.25s' }}>
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
            onClick={() => {
              const el = document.getElementById('contato');
              const scrollInstance = (window as any).locomotiveScroll;
              if (scrollInstance && el) {
                scrollInstance.scrollTo(el, { duration: 1000, easing: [0.25, 0.00, 0.35, 1.00] });
              } else if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }
            }}
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
                stroke="#2869D6"
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
          <motion.div
            className="relative z-10"
            initial={{ y: 0 }}
            animate={{ y: [0, -15, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <svg
              className="w-24 h-32 md:w-[140px] md:h-[180px]"
              viewBox="0 0 94 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                filter: 'drop-shadow(0 0 6px rgba(40, 105, 214, 0.8))'
              }}
            >
              <path d="M62.83 43.5L55.93 36.5601L36.64 17.12L22 14.96L2 12.02V42.3301C2 54.9201 5.26 68.2501 11.8 82.3301C18.33 96.4201 26.61 107.8 36.64 116.49C43.88 118.58 50.21 118.21 55.62 115.38C57.71 114.29 59.66 112.84 61.48 111.02C62.48 110.02 63.41 108.94 64.24 107.8C68.94 101.48 71.28 92.9901 71.28 82.3301V52.02L62.83 43.5ZM49.63 94.1801L41.57 89.52L23.65 79.1801V54.3301L25.41 55.34L27.98 56.8301V51.87C27.98 49.13 28.83 47.2801 30.52 46.3201C32.22 45.3501 34.26 45.5501 36.64 46.9301C37.51 47.4301 38.34 48.04 39.12 48.76C39.69 49.27 40.22 49.8301 40.73 50.4501C41.46 51.3201 42.13 52.3 42.76 53.38C43.09 53.95 43.39 54.53 43.65 55.09C44.75 57.41 45.3 59.67 45.3 61.87V66.8301L49.63 69.3301V94.1801Z" stroke="#2869D6" strokeWidth="1.5" />
              <path d="M45.3001 61.87V62.17L43.6501 62.99L40.9701 64.3301V59.37C40.9701 57.96 40.56 56.54 39.73 55.11C39.02 53.88 38.17 52.93 37.17 52.24C37 52.12 36.82 52.01 36.64 51.9C35.53 51.26 34.59 51.1 33.8 51.42L39.12 48.76C39.69 49.27 40.22 49.8301 40.73 50.4501C41.46 51.3201 42.13 52.3 42.76 53.38C43.09 53.95 43.3901 54.53 43.6501 55.09C44.7501 57.41 45.3001 59.67 45.3001 61.87Z" stroke="#2869D6" strokeWidth="1.5" />
              <path d="M39.12 48.76L33.8 51.4201L33.55 51.5401C32.72 52.0201 32.31 52.96 32.31 54.37V54.6701L27.98 56.8301V51.87C27.98 49.13 28.83 47.2801 30.52 46.3201C32.22 45.3501 34.26 45.5501 36.64 46.9301C37.51 47.4301 38.34 48.04 39.12 48.76Z" stroke="#2869D6" strokeWidth="1.5" />
              <path d="M40.9701 59.37V64.33L32.3101 59.33V54.37C32.3101 52.96 32.7201 52.02 33.5501 51.54L33.8001 51.42C34.5901 51.1 35.5301 51.26 36.6401 51.9C36.8201 52.01 37.0001 52.12 37.1701 52.24C38.1701 52.93 39.0201 53.88 39.7301 55.11C40.5601 56.54 40.9701 57.96 40.9701 59.37Z" stroke="#2869D6" strokeWidth="1.5" />
              <path d="M49.6299 72.63V94.1801L41.5699 89.52L23.6499 79.1801L43.6499 69.1801L49.6299 72.63Z" stroke="#2869D6" strokeWidth="1.5" />
              <path d="M43.6499 62.99V69.1801L23.6499 79.1801V54.3301L25.4099 55.34L27.9799 56.8301L32.3099 54.67V59.3301L40.9699 64.3301L43.6499 62.99Z" stroke="#2869D6" strokeWidth="1.5" />
              <path d="M91.2801 42.02V72.3301C91.2801 84.9201 88.0201 94.48 81.4801 101.02C79.4401 103.06 77.2301 104.64 74.8401 105.77L55.6201 115.38C57.7101 114.29 59.6601 112.84 61.4801 111.02C62.4801 110.02 63.4101 108.94 64.2401 107.8C68.9401 101.48 71.2801 92.9901 71.2801 82.3301V52.02L91.2801 42.02Z" stroke="#2869D6" strokeWidth="1.5" />
              <path d="M91.2799 42.02L71.2799 52.02L62.8299 43.5L55.9299 36.5601L36.6399 17.12L56.6399 7.12L91.2799 42.02Z" stroke="#2869D6" strokeWidth="1.5" />
              <path d="M56.64 7.12L36.64 17.12L22 14.96L2 12.02L22 2.02002L56.64 7.12Z" stroke="#2869D6" strokeWidth="1.5" />
            </svg>
          </motion.div>
        </div>
      )
    },
    {
      title: t.solutionsSuite.items.checkout.title,
      description: t.solutionsSuite.items.checkout.description,
      icon: (
        <div className="relative w-full h-full flex items-center justify-center">
          <motion.div
            className="relative z-10"
            initial={{ y: 0 }}
            animate={{ y: [0, -15, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <svg
              className="w-24 h-32 md:w-[135px] md:h-[180px]"
              viewBox="0 0 92 122"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                filter: 'drop-shadow(0 0 6px rgba(40, 105, 214, 0.8))'
              }}
            >
              <path d="M61.2599 87.6301V92.1601L53.3599 87.6001L60.3299 84.1201C60.9499 85.3001 61.2599 86.4701 61.2599 87.6301Z" stroke="#2869D6" strokeWidth="1.5" />
              <path d="M60.3299 84.1201L53.3599 87.6001V83.0601C53.3599 81.7801 53.7399 80.9201 54.4899 80.4901C55.2499 80.0601 56.1899 80.1701 57.3099 80.8101C58.4299 81.4601 59.3699 82.4301 60.1199 83.7401C60.1899 83.8701 60.2599 83.9901 60.3299 84.1201Z" stroke="#2869D6" strokeWidth="1.5" />
              <path d="M65.2098 44.5703L54.4498 38.3603C56.5898 41.8103 58.3898 45.1403 59.8398 48.3703C61.0198 50.9803 61.9598 53.5203 62.6898 55.9803C64.0198 60.4903 64.8198 64.8503 65.0898 69.0403C65.1598 69.9603 65.1998 70.8703 65.2098 71.7703L62.6198 70.2803L57.3098 67.2103C57.3098 63.3603 56.6298 59.3603 55.2798 55.2203C54.8698 53.9403 54.3998 52.6603 53.8598 51.3603C52.6698 48.4503 51.1898 45.4903 49.4098 42.4703V53.5803L45.6998 51.4403L42.5398 49.6103L41.5098 49.0203V21.8203L61.5098 33.3603L65.2098 35.5003V44.5703Z" stroke="#2869D6" strokeWidth="1.5" />
              <path d="M14.34 26.5902C11.38 29.5302 9.9 33.9402 9.9 39.8402C9.9 43.9202 10.61 48.0902 12.02 52.3402C12.51 53.8002 13.05 55.2402 13.66 56.6502C14.82 59.3702 16.2 62.0102 17.8 64.5702V53.4702L18.83 54.0602L22 55.8902L25.7 58.0302V85.2302L2 71.5402V62.4802L12.76 68.6902C10.88 65.7402 9.22 62.7002 7.8 59.5802C6.68 57.1402 5.7 54.6602 4.86 52.1202C2.95 46.3302 2 40.7202 2 35.2802C2 26.8102 4.24 20.6402 8.71 16.7702C9.74 15.8702 10.84 15.1302 12 14.5602L12.43 14.3502C15.78 12.7702 19.65 12.4602 24.03 13.4102C24.58 13.5302 25.14 13.6702 25.7 13.8302V23.3502C24.42 23.1402 23.21 23.0702 22.06 23.1402C19.06 23.3202 16.49 24.4702 14.34 26.5902Z" stroke="#2869D6" strokeWidth="1.5" />
              <path d="M89.1597 86.7202V109.39L69.1597 119.39V96.7202L89.1597 86.7202Z" stroke="#2869D6" strokeWidth="1.5" />
              <path d="M65.46 94.5801L65.21 94.4401V89.9101C65.21 87.5801 64.54 85.1701 63.18 82.6901C63.09 82.5101 62.99 82.3401 62.89 82.1601C61.52 79.8001 59.91 77.9902 58.05 76.7402C57.81 76.5802 57.56 76.4201 57.31 76.2801C55.36 75.1501 53.67 74.8901 52.22 75.4801L51.73 75.7201C50.18 76.6001 49.41 78.2902 49.41 80.7802V85.3201L45.46 83.0401V105.7L69.16 119.39V96.7202L65.46 94.5801ZM61.26 92.1601L53.36 87.6001V83.0602C53.36 81.7802 53.74 80.9202 54.49 80.4902C55.25 80.0602 56.19 80.1702 57.31 80.8102C58.43 81.4602 59.37 82.4302 60.12 83.7402C60.19 83.8702 60.26 83.9902 60.33 84.1202C60.95 85.3002 61.26 86.4701 61.26 87.6301V92.1601Z" stroke="#2869D6" strokeWidth="1.5" />
              <path d="M89.16 86.7202L69.16 96.7202L65.46 94.5802V94.3202L85.21 84.4402L89.16 86.7202Z" stroke="#2869D6" strokeWidth="1.5" />
              <path d="M85.21 25.5V34.57L79.43 37.46L73.47 40.44L69.41 42.47L68.38 42.99L65.21 44.57V35.5L69.41 33.4L69.83 33.19L75.62 30.3L76.79 29.71L85.21 25.5Z" stroke="#2869D6" strokeWidth="1.5" />
              <path d="M85.2098 25.5001L76.7898 29.7101L75.6198 30.3001L69.8298 33.1901L69.4098 33.4001L65.2098 35.5001L61.5098 33.3601L41.5098 21.8201L61.5098 11.8201L85.2098 25.5001Z" stroke="#2869D6" strokeWidth="1.5" />
              <path d="M85.21 61.7702L76.78 65.9902L69.49 69.6302L65.22 71.7702C65.21 70.8702 65.17 69.9602 65.1 69.0402C64.83 64.8502 64.03 60.4902 62.7 55.9802C61.97 53.5202 61.03 50.9802 59.85 48.3702C58.4 45.1402 56.6 41.8102 54.46 38.3602L65.22 44.5702L68.39 42.9902L69.42 42.4702L73.48 40.4402L79.44 37.4602C80.81 40.4002 81.89 43.2302 82.7 45.9802C84.32 51.4802 85.16 56.7502 85.22 61.7702H85.21Z" stroke="#2869D6" strokeWidth="1.5" />
              <path d="M45.6997 51.4401V75.2301L25.6997 85.2301V58.0301L28.8697 56.4401L30.8297 55.4701L36.6097 52.5701L37.7997 51.9801L42.5397 49.6101L45.6997 51.4401Z" stroke="#2869D6" strokeWidth="1.5" />
              <path d="M42.5398 49.6102L37.7998 51.9802L36.6098 52.5702L30.8298 55.4702L28.8698 56.4402L25.6998 58.0302L21.9998 55.8902L18.8298 54.0602L17.7998 53.4702L27.3898 48.6702L33.2798 45.7302L37.7998 43.4702L41.5098 45.6102V49.0202L42.5398 49.6102Z" stroke="#2869D6" strokeWidth="1.5" />
              <path d="M33.2799 45.7301L27.3899 48.6701L17.7999 53.4701V64.5701C16.1999 62.0101 14.8199 59.3701 13.6599 56.6501C13.0499 55.2401 12.5099 53.8001 12.0199 52.3401C10.6099 48.0901 9.8999 43.9201 9.8999 39.8401C9.8999 33.9401 11.3799 29.5301 14.3399 26.5901C16.4899 24.4701 19.0599 23.3201 22.0599 23.1401C23.2099 23.0701 24.4199 23.1401 25.6999 23.3501L31.7199 20.3401C30.5099 22.9001 29.8999 26.0601 29.8999 29.8401C29.8999 33.9201 30.6099 38.0901 32.0199 42.3401C32.3999 43.4801 32.8199 44.6101 33.2799 45.7301Z" stroke="#2869D6" strokeWidth="1.5" />
              <path d="M45.6997 3.83008V13.3501L31.7197 20.3401L25.6997 23.3501V13.8301L45.6997 3.83008Z" stroke="#2869D6" strokeWidth="1.5" />
              <path d="M45.6997 3.83009L25.6997 13.8301C25.1397 13.6701 24.5797 13.5301 24.0297 13.4101C19.6497 12.4601 15.7797 12.7701 12.4297 14.3501L31.2197 4.98009H31.2397C35.2597 2.63009 40.0797 2.25009 45.6997 3.83009Z" stroke="#2869D6" strokeWidth="1.5" />
              <path d="M53.8602 51.3602L49.4102 53.5802V42.4702C51.1902 45.4902 52.6702 48.4502 53.8602 51.3602Z" stroke="#2869D6" strokeWidth="1.5" />
              <path d="M12.76 68.6901L2 62.4801L7.8 59.5801C9.22 62.7001 10.88 65.7401 12.76 68.6901Z" stroke="#2869D6" strokeWidth="1.5" />
              <path d="M49.41 81.0701V85.3201L45.46 83.0401L49.41 81.0701Z" stroke="#2869D6" strokeWidth="1.5" />
              <path d="M85.2102 79.91V84.44L65.4602 94.32L65.2102 94.44V89.91C65.2102 87.58 64.5402 85.17 63.1802 82.69C63.0902 82.51 62.9902 82.34 62.8902 82.16C61.5202 79.8 59.9102 77.99 58.0502 76.74C57.8102 76.58 57.5602 76.42 57.3102 76.28C55.3602 75.15 53.6702 74.89 52.2202 75.48L62.6202 70.28L65.2102 71.77L69.4802 69.64L76.7702 65.99C76.9402 66.08 77.1202 66.18 77.3002 66.28C79.4702 67.53 81.3302 69.49 82.8802 72.16C84.4302 74.83 85.2002 77.41 85.2002 79.91H85.2102Z" stroke="#2869D6" strokeWidth="1.5" />
            </svg>
          </motion.div>
        </div>
      )
    },
    {
      title: t.solutionsSuite.items.subscriptions.title,
      description: t.solutionsSuite.items.subscriptions.description,
      badge: t.solutionsSuite.items.subscriptions.badge,
      icon: (
        <div className="relative w-full h-full flex items-center justify-center">
          <motion.div
            className="relative z-10"
            initial={{ y: 0 }}
            animate={{ y: [0, -15, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <svg
              className="w-40 h-24 md:w-[200px] md:h-[110px]"
              viewBox="0 0 102 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                filter: 'drop-shadow(0 0 6px rgba(40, 105, 214, 0.8))'
              }}
            >
              <path d="M99.7433 16.5999L79.7433 26.5999L75.4532 24.12L57.7032 13.87L56.5732 13.22L57.1533 12.93L76.5732 3.21997L99.7433 16.5999Z" stroke="#2869D6" strokeWidth="1.5" />
              <path d="M79.7437 26.5999V53.19L72.0237 48.7299V37.21L65.9236 40.69L46.5338 51.74L31.7037 26.15L31.0937 25.0999L27.3137 27.2599L7.92371 38.31L2.51367 28.9799L31.0937 12.47L31.7637 13.6299L37.2037 23.02L46.5338 39.11L60.4837 31.31L66.0137 28.21L66.6137 27.8799L65.4236 27.19L56.5737 22.09V13.22L57.7037 13.87L75.4537 24.12L79.7437 26.5999Z" stroke="#2869D6" strokeWidth="1.5" />
              <path d="M31.7038 26.1499L27.9238 28.3099L7.92383 38.3099L27.3138 27.2599L31.0938 25.0999L31.7038 26.1499Z" stroke="#2869D6" strokeWidth="1.5" />
              <path d="M72.0242 37.21V38.61L66.5342 41.74L46.5342 51.74L65.9241 40.69L72.0242 37.21Z" stroke="#2869D6" strokeWidth="1.5" />
              <path d="M99.7441 16.5999V43.1899L79.7441 53.1899V26.5999L99.7441 16.5999Z" stroke="#2869D6" strokeWidth="1.5" />
              <path d="M66.0138 28.21L60.4838 31.31L46.5338 39.11L37.2037 23.02L31.7638 13.6299L31.0938 12.47L51.0938 2.46997L57.1538 12.93L56.5737 13.22V22.09L65.4237 27.19L66.0138 28.21Z" stroke="#2869D6" strokeWidth="1.5" />
            </svg>
          </motion.div>
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
              opacity: 0
            }}
          >
            {renderHeading()}
          </h2>
          <p
            className={`text-base md:text-lg text-[#1C1C1E] max-w-xl leading-tight ${isVisible ? 'services-blur-animate' : ''}`}
            style={{ animationDelay: '0.2s', opacity: 0 }}
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
              zIndex: 9990
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
              zIndex: 9990
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
              zIndex: 9990
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
              zIndex: 9990
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
              zIndex: 9990
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
              zIndex: 9990
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
              zIndex: 9990
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
              zIndex: 9990
            }}
          >
            <path d="M0 0 Q 9.5 0 9.5 10 L 10.5 10 Q 10.5 0 20 0 Z" />
          </svg>
          <GridDecoration className="hidden md:flex -bottom-[12px] -right-[12px]" />

          <div className="grid grid-cols-1 md:grid-cols-3 bg-white">
            {cards.map((card, index) => (
              <div key={index} className="relative flex flex-col">
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
                        zIndex: 9990
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
                        zIndex: 9990
                      }}
                    >
                      <path d="M0 0 Q 9.5 0 9.5 10 L 10.5 10 Q 10.5 0 20 0 Z" />
                    </svg>
                  </>
                )}
                <SpotlightCard
                  className={`flex-1 flex flex-col relative ${isVisible ? 'services-blur-animate' : ''} ${index < 2 ? 'border-b md:border-b-0 border-[#E2E7F1]' : ''}`}
                  style={{ animationDelay: `${0.3 + index * 0.1}s`, opacity: 0 }}
                  spotlightColor="rgba(255, 255, 255, 0.2)"
                >
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
                        <span className="px-3 py-1 bg-[#2869D6]/20 text-[#1E3A8A] text-xs font-semibold rounded-full border border-[#2869D6]/30">
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
              </div>
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
                    className={`w-5 h-5 text-[#2869D6] transition-transform duration-300 ${openIndex === index ? 'rotate-45' : ''}`}
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
    <SectionLayout id="contato" showStripes={false} showTopBorder={false} className="py-24 px-6 md:px-16 lg:px-28">
      <div
        ref={sectionRef}
        className={`relative flex flex-col md:flex-row items-start justify-between gap-12 ${isVisible ? 'services-blur-animate' : ''}`}
        style={{ opacity: 0 }}
      >
        {/* Content Side */}
        <div className="flex flex-col space-y-8 z-10 w-full md:w-2/5">
          <h2
            className="text-4xl md:text-5xl text-[#1C1C1E] leading-none max-w-md md:max-w-lg"
            style={{
              fontFamily: 'Fustat-Bold, sans-serif',
              fontWeight: 'normal',
              lineHeight: '0.9',
              letterSpacing: '-0.06em'
            }}
          >
            {t.finalCTA.heading}
          </h2>
          <p className="text-[#1C1C1E] text-base md:text-lg max-w-md leading-tight">
            {t.finalCTA.description}
          </p>

        </div>

        {/* Lead Form Side */}
        <div className="w-full md:w-3/5">
          <LeadForm />
        </div>

        {/* Illustration Side */}
        <div className="hidden">
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

// Footer Section Component
const FooterSection = () => {
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
    <SectionLayout showStripes={false} showTopBorder={false} className="pt-24 pb-12 px-6 md:px-16 lg:px-28" id="footer">
      {/* Main footer content */}
      <div ref={sectionRef} className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-24 mb-24">
        {/* Logo Column */}
        <div
          className={`md:col-span-3 flex items-start ${isVisible ? 'services-blur-animate' : ''}`}
          style={{ opacity: 0 }}
        >
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
                src="https://res.cloudinary.com/dopp0v9eq/image/upload/f_auto,q_auto,w_80/v1763574787/monfily-black-nobg_risk6t.png"
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
          <div
            className={`flex flex-col space-y-6 ${isVisible ? 'services-blur-animate' : ''}`}
            style={{ animationDelay: '0.1s', opacity: 0 }}
          >
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
          <div
            className={`flex flex-col space-y-6 ${isVisible ? 'services-blur-animate' : ''}`}
            style={{ animationDelay: '0.2s', opacity: 0 }}
          >
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
          <div
            className={`flex flex-col space-y-6 ${isVisible ? 'services-blur-animate' : ''}`}
            style={{ animationDelay: '0.3s', opacity: 0 }}
          >
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
          <div
            className={`flex flex-col space-y-6 ${isVisible ? 'services-blur-animate' : ''}`}
            style={{ animationDelay: '0.4s', opacity: 0 }}
          >
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
      <div
        className={`w-full border-t border-dotted border-[#E2E7F1] pt-12 flex flex-col md:flex-row items-center justify-between gap-8 ${isVisible ? 'services-blur-animate' : ''}`}
        style={{ animationDelay: '0.5s', opacity: 0 }}
      >
        <p className="text-[#6B7280] text-lg text-center md:text-left leading-relaxed max-w-4xl">
          {t.footer.copyright}
        </p>
        <div className="flex items-center gap-8">
          <div className="hidden md:block w-px h-6 bg-[#E2E7F1]"></div>
          {/* Social Icons */}
          <div className="flex items-center gap-6">
            <a href="https://www.instagram.com/monfilydigital/" target="_blank" rel="noopener noreferrer" className="text-[#1C1C1E] hover:text-[#2869D6] transition-colors" aria-label="Instagram da Monfily">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="mailto:monfilydigital@gmail.com" className="text-[#1C1C1E] hover:text-[#2869D6] transition-colors" aria-label="Enviar e-mail para Monfily">
              <Mail className="w-5 h-5" />
            </a>
            <a href="https://wa.me/5511978267321" target="_blank" rel="noopener noreferrer" className="text-[#1C1C1E] hover:text-[#2869D6] transition-colors" aria-label="WhatsApp da Monfily">
              <Whatsapp className="w-5 h-5" />
            </a>
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
      python: 'https://res.cloudinary.com/dopp0v9eq/image/upload/f_auto,q_auto,w_40/v1764964166/python_umggwd.png',
      n8n: 'https://res.cloudinary.com/dopp0v9eq/image/upload/f_auto,q_auto,w_40/v1764964165/n8n_frmmel.png',
      chatgpt: 'https://res.cloudinary.com/dopp0v9eq/image/upload/f_auto,q_auto,w_40/v1764964165/chatgpt_m0zqpv.png',
      react: 'https://res.cloudinary.com/dopp0v9eq/image/upload/f_auto,q_auto,w_40/v1764964166/react_y5fogs.png',
      nodejs: 'https://res.cloudinary.com/dopp0v9eq/image/upload/f_auto,q_auto,w_40/v1764964166/nodejs_qzxzzd.png',
      claude: 'https://res.cloudinary.com/dopp0v9eq/image/upload/f_auto,q_auto,w_40/v1764964166/claude_kmb9jl.png'
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
