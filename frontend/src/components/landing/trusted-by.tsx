import { SectionLayout } from "./section-layout";
import { useEffect, useRef } from "react";
import { useLanguage } from "@/hooks/use-language";
import { translations } from "@/lib/translations";

const BoneDivider = () => (
  <div className="relative w-px h-auto bg-[#E2E7F1] hidden md:block mx-0 shrink-0 self-stretch">
    {/* Top Flare */}
    <svg
      viewBox="0 0 20 10"
      className="absolute -top-[0px] left-1/2 -translate-x-1/2 w-7 h-[14px] fill-[#E2E7F1] pointer-events-none"
      preserveAspectRatio="none"
      style={{ zIndex: 9990 }}
    >
      <path d="M0 0 Q 9.5 0 9.5 10 L 10.5 10 Q 10.5 0 20 0 Z" />
    </svg>
    
    {/* Bottom Flare */}
    <svg
      viewBox="0 0 20 10"
      className="absolute -bottom-[0px] left-1/2 -translate-x-1/2 w-7 h-[14px] fill-[#E2E7F1] pointer-events-none rotate-180"
      preserveAspectRatio="none"
      style={{ zIndex: 9990 }}
    >
      <path d="M0 0 Q 9.5 0 9.5 10 L 10.5 10 Q 10.5 0 20 0 Z" />
    </svg>
  </div>
);

const logoUrls = [
  "https://res.cloudinary.com/dopp0v9eq/image/upload/v1763560672/docker_logo_tezv1k.png",
  "https://res.cloudinary.com/dopp0v9eq/image/upload/v1763560672/terraform_logo_zpfnxm.png",
  "https://res.cloudinary.com/dopp0v9eq/image/upload/v1763560672/datadog_logo_llg8kx.png",
  "https://res.cloudinary.com/dopp0v9eq/image/upload/v1763560672/digitalocean_logo_e8sdqh.png",
  "https://res.cloudinary.com/dopp0v9eq/image/upload/v1763560672/aws_amazon_web_services_logo_wcepsv.png",
  "https://res.cloudinary.com/dopp0v9eq/image/upload/v1763560672/azure_logo_pcpoq8.png",
  "https://res.cloudinary.com/dopp0v9eq/image/upload/v1763560672/dynatrace_logo_ab5ntw.png"
];

const LogoCarousel = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const carousel = carouselRef.current;
    const scroll = scrollRef.current;
    
    if (!carousel || !scroll) return;

    // Clone logos for infinite scroll
    const logos = Array.from(scroll.children);
    logos.forEach(logo => {
      const clone = logo.cloneNode(true) as HTMLElement;
      scroll.appendChild(clone);
    });

    let position = 0;
    const speed = 30; // 30px per second
    const fps = 60;
    const interval = 1000 / fps;
    const pixelsPerFrame = speed / fps;

    const animate = () => {
      position -= pixelsPerFrame;
      
      // Reset position when first set of logos completely scrolls out
      const scrollWidth = scroll.scrollWidth / 2;
      if (Math.abs(position) >= scrollWidth) {
        position = 0;
      }
      
      scroll.style.transform = `translateX(${position}px)`;
    };

    const animationId = setInterval(animate, interval);

    return () => clearInterval(animationId);
  }, []);

  return (
    <div 
      ref={carouselRef}
      className="relative overflow-hidden w-full max-w-full select-none trusted-blur-animate"
      style={{
        maskImage: 'linear-gradient(to right, transparent 0%, white 12%, white 88%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, white 12%, white 88%, transparent 100%)',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
        msUserSelect: 'none',
        animationDelay: '1.1s',
        opacity: 0
      }}
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
    >
      <div 
        ref={scrollRef}
        className="flex items-center whitespace-nowrap select-none"
        style={{ 
          transform: 'translateX(0px)', 
          padding: '0 2rem',
          userSelect: 'none',
          WebkitUserSelect: 'none',
          MozUserSelect: 'none',
          msUserSelect: 'none'
        }}
        onContextMenu={(e) => e.preventDefault()}
        onDragStart={(e) => e.preventDefault()}
      >
        {logoUrls.map((url, index) => (
          <div 
            key={index} 
            className="flex items-center justify-center px-6 flex-shrink-0 select-none"
            style={{
              userSelect: 'none',
              WebkitUserSelect: 'none',
              MozUserSelect: 'none',
              msUserSelect: 'none'
            }}
            onContextMenu={(e) => e.preventDefault()}
            onDragStart={(e) => e.preventDefault()}
          >
            <img
              src={url}
              alt={`Logo ${index + 1}`}
              className="h-12 max-h-12 object-contain w-auto select-none pointer-events-none"
              style={{ 
                maxWidth: '120px', 
                height: '48px',
                userSelect: 'none',
                WebkitUserSelect: 'none',
                MozUserSelect: 'none',
                msUserSelect: 'none',
                pointerEvents: 'none'
              }}
              loading="lazy"
              draggable="false"
              onContextMenu={(e) => e.preventDefault()}
              onDragStart={(e) => e.preventDefault()}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export function TrustedBy() {
  const { language } = useLanguage();
  const t = translations[language];

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
        .trusted-blur-animate {
          animation: blurText 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
      `}</style>
      {/* Mobile Section */}
      <SectionLayout className="flex flex-col md:hidden px-6 py-[24px]">
        <div className="flex flex-col w-full">
          {/* Text Label */}
          <div 
            className="mb-6 flex items-center justify-center trusted-blur-animate"
            style={{ animationDelay: '0.9s', opacity: 0 }}
          >
            <p className="text-[#1C1C1E] text-base text-center">
              {t.trustedBy.label}
            </p>
          </div>
          
          {/* Logo Carousel */}
          <div className="flex items-center justify-center overflow-hidden">
            <div className="w-full max-w-full">
              <LogoCarousel />
            </div>
          </div>
        </div>
      </SectionLayout>

      {/* Desktop Section */}
      <SectionLayout className="hidden md:flex flex-col md:flex-row items-stretch">
        {/* Left Side: Text Label */}
        <div 
          className="w-full md:w-[220px] p-[24px] md:p-[32px] border-b md:border-b-0 border-[#E2E7F1] flex items-center justify-center trusted-blur-animate"
          style={{ animationDelay: '0.9s', opacity: 0 }}
        >
          <p className="text-[#1C1C1E] font-medium text-sm max-w-[150px] md:max-w-[200px] text-center">
            {t.trustedBy.label}
          </p>
        </div>

        {/* Custom Divider for Desktop */}
        <BoneDivider />

        {/* Right Side: Logo Carousel */}
        <div className="flex-1 p-[24px] md:p-[32px] flex items-center justify-center overflow-hidden">
          <div className="w-full max-w-full">
            <LogoCarousel />
          </div>
        </div>
      </SectionLayout>
    </>
  );
}
