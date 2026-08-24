import { BoltIcon, RocketLaunchIcon } from "@heroicons/react/24/outline";
import { SectionLayout } from "./section-layout";
import ShinyText from "@/components/ui/shiny-text";
import { WebsiteMockup } from "./website-mockup";
import { WebsiteMockupMobile } from "./website-mockup-mobile";
import { Iphone16Pro } from "@/components/ui/iphone-16-pro";
import { useLanguage } from "@/hooks/use-language";
import { translations } from "@/lib/translations";
import { useWhatsAppCta } from "@/hooks/use-whatsapp";
import { ProjectCtaButton } from "@/components/ui/project-cta-button";

export function Hero() {
  const { language } = useLanguage();
  const t = translations[language];
  const { open: openWhatsApp } = useWhatsAppCta();
  return (
    <SectionLayout
      showStripes={false}
      className="grid grid-cols-1 lg:grid-cols-2 gap-12 px-6 md:px-16 lg:px-28 py-12 md:py-20 min-h-[500px] md:min-h-[600px] items-center relative overflow-x-hidden"
    >
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
        .hero-blur-animate {
          animation: blurText 0.8s cubic-bezier(0.4, 0, 0.2, 1) both;
        }
      `}</style>
      {/* Gradient Effect - Desktop Only */}
      <div className="hidden lg:block absolute bottom-0 right-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
        <div
          className="absolute bottom-0 right-0 w-full h-full"
          style={{
            background: 'radial-gradient(ellipse 80% 110% at bottom right, rgba(40,105,214,.32) 0%, rgba(40,105,214,.14) 28%, rgba(40,105,214,.04) 52%, rgba(11,11,13,0) 74%)'
          }}
        ></div>
      </div>

      {/* Gradient Effect - Mobile Only (Bottom Center) */}
      <div className="lg:hidden absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-3/4 pointer-events-none" style={{ zIndex: 0 }}>
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-full"
          style={{
            background: 'radial-gradient(ellipse 120% 85% at bottom center, rgba(40,105,214,.28) 0%, rgba(40,105,214,.10) 38%, rgba(11,11,13,0) 72%)'
          }}
        ></div>
      </div>
      {/* Left Content */}
      <div className="relative flex w-full flex-col items-start justify-center space-y-6 pb-[340px] md:space-y-8 md:pb-[380px] lg:pb-0" style={{ zIndex: 1 }}>
        {/* Badge */}
        <div
          className="inline-flex max-w-full items-center gap-2 rounded-full border border-[#2A2A2F] py-1 pl-1 pr-3 hero-blur-animate"
          style={{ animationDelay: '0.1s' }}
        >
          <div className="rounded-full p-1 border border-[#2A2A2F]">
            <div className="flex -space-x-2 overflow-hidden">
              {/* Avatars */}
              <img
                src="https://framerusercontent.com/images/E3vzjdpFuSWiVeurdyPGMrSWk.png?scale-down-to=64"
                alt=""
                className="inline-block h-4 w-4 rounded-full object-cover ring-2 ring-[#0B0B0D] select-none sm:h-5 sm:w-5"
                draggable="false"
                onContextMenu={(e) => e.preventDefault()}
                onDragStart={(e) => e.preventDefault()}
                style={{ userSelect: 'none', WebkitUserSelect: 'none', pointerEvents: 'none' }}
              />
              <img
                src="https://framerusercontent.com/images/jC7KwluILkhO0KHxk6qWEttOxhE.png?scale-down-to=64"
                alt=""
                className="inline-block h-4 w-4 rounded-full object-cover ring-2 ring-[#0B0B0D] select-none sm:h-5 sm:w-5"
                draggable="false"
                onContextMenu={(e) => e.preventDefault()}
                onDragStart={(e) => e.preventDefault()}
                style={{ userSelect: 'none', WebkitUserSelect: 'none', pointerEvents: 'none' }}
              />
              <img
                src="https://framerusercontent.com/images/cFl24iPInxckRrL32eRgadp9ZJM.png?scale-down-to=64"
                alt=""
                className="inline-block h-4 w-4 rounded-full object-cover ring-2 ring-[#0B0B0D] select-none sm:h-5 sm:w-5"
                draggable="false"
                onContextMenu={(e) => e.preventDefault()}
                onDragStart={(e) => e.preventDefault()}
                style={{ userSelect: 'none', WebkitUserSelect: 'none', pointerEvents: 'none' }}
              />
            </div>
          </div>
          <span
            className="min-w-0 text-[10px] leading-tight text-[#F5F7FA] sm:text-xs"
            style={{
              fontFamily: 'Fustat-Bold, sans-serif',
              fontWeight: 'normal'
            }}
          >
            {t.hero.badge.chosenBy}
          </span>
        </div>

        {/* Heading */}
        <h1
          className="text-[48px] md:text-7xl leading-none text-[#F5F7FA] hero-blur-animate"
          style={{
            animationDelay: '0.2s',
            fontFamily: 'Fustat-Bold, sans-serif',
            fontWeight: 'normal',
            lineHeight: '0.9',
            letterSpacing: '-0.06em'
          }}
        >
          {t.hero.heading.line1} <br />
          <span className="text-[#F5F7FA]" style={{ fontFamily: 'Fustat-Bold, sans-serif', fontWeight: 'normal' }}>{t.hero.heading.line2}</span>
          <ShinyText text={t.hero.heading.line3} speed={3} className="text-[#F5F7FA]" style={{ fontFamily: 'Fustat-Bold, sans-serif', fontWeight: 'normal' }} />
        </h1>

        {/* Description */}
        <p
          className="text-base md:text-lg text-[#F5F7FA] max-w-md leading-tight hero-blur-animate"
          style={{ animationDelay: '0.3s' }}
        >
          {t.hero.description}
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col xl:flex-row items-center gap-6 pt-2 w-full hero-blur-animate"
          style={{ animationDelay: '0.4s' }}
        >
          <ProjectCtaButton
            onClick={openWhatsApp}
            className="xl:w-[260px]"
          >
            {t.hero.cta.primary}
          </ProjectCtaButton>

          <button
            type="button"
            onClick={openWhatsApp}
            className="flex h-12 w-full max-w-[340px] cursor-pointer items-center justify-center whitespace-nowrap rounded-full bg-[#1C1C1E] px-7 text-base font-normal text-white transition-[background-color,transform] duration-300 hover:bg-[#2869D6] active:scale-[0.985] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2869D6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0B0D] xl:w-auto"
          >
            {t.hero.cta.secondary}
          </button>
        </div>

        {/* Features */}
        <div
          className="hidden md:grid grid-cols-2 gap-8 pt-8 w-full max-w-lg hero-blur-animate"
          style={{ animationDelay: '0.5s' }}
        >
          <div className="flex items-start gap-3">
            <div className="bg-[#2869D6]/20 p-2 rounded-full w-10 h-10 flex items-center justify-center text-[#2869D6] mt-1">
              <BoltIcon className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h3
                className="text-[#F5F7FA] text-sm"
                style={{
                  fontFamily: 'Fustat-Bold, sans-serif',
                  fontWeight: 'normal'
                }}
              >
                {t.hero.features.performance.title}
              </h3>
              <p className="text-[#F5F7FA] text-xs mt-1">{t.hero.features.performance.description}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="bg-[#2869D6]/20 p-2 rounded-full w-10 h-10 flex items-center justify-center text-[#2869D6] mt-1">
              <RocketLaunchIcon className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h3
                className="text-[#F5F7FA] text-sm"
                style={{
                  fontFamily: 'Fustat-Bold, sans-serif',
                  fontWeight: 'normal'
                }}
              >
                {t.hero.features.optimized.title}
              </h3>
              <p className="text-[#F5F7FA] text-xs mt-1">{t.hero.features.optimized.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Content (Website Mockup) */}
      <div
        className="relative hidden h-full min-h-[500px] lg:block hero-blur-animate"
        style={{ zIndex: 1, animationDelay: '0.6s' }}
      >
        {/* Website Mockup */}
        <div style={{ userSelect: 'none', pointerEvents: 'none' }}>
          <WebsiteMockup />
        </div>
        {/* iPhone Mockup - Overlay */}
        <div className="website-mockup-iphone absolute bottom-0" style={{ left: '40px', transform: 'translateX(-50%)', zIndex: 50, filter: 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.15))', userSelect: 'none', pointerEvents: 'none' }}>
          <Iphone16Pro
            width={220}
            height={420}
            showIsland={false}
            islandWidth={90}
            islandHeight={20}
            showCamera={false}
            shadow={true}
            rounded={true}
            frameColor="#17171B"
            bezelColor="#101013"
            screenRadius={40}
            hoverAnimation={false}
          >
            <WebsiteMockupMobile />
          </Iphone16Pro>
        </div>
      </div>

      {/* Mobile Mockups - Visible only on mobile, positioned at bottom */}
      <div
        className="absolute bottom-7 left-0 right-0 flex w-screen items-end justify-center overflow-hidden pointer-events-none hero-blur-animate lg:hidden"
        style={{ zIndex: 1, left: '50%', right: '50%', marginLeft: '-50vw', marginRight: '-50vw', animationDelay: '0.6s' }}
      >
        <div className="relative" style={{ transform: 'scale(0.55)', transformOrigin: 'bottom center', pointerEvents: 'none', userSelect: 'none' }}>
          {/* Website Mockup - Scaled down */}
          <div className="relative" style={{ width: '145%', transform: 'scaleX(1)' }}>
            <WebsiteMockup />
          </div>
          {/* iPhone Mockup - Overlay (maintaining desktop position relative to WebsiteMockup) */}
          <div className="absolute bottom-0" style={{ left: '40px', transform: 'translateX(-50%)', zIndex: 50, filter: 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.15))' }}>
            <Iphone16Pro
              width={220}
              height={420}
              showIsland={false}
              islandWidth={90}
              islandHeight={20}
              showCamera={false}
              shadow={true}
              rounded={true}
              frameColor="#17171B"
              bezelColor="#101013"
              screenRadius={40}
              hoverAnimation={false}
            >
              <WebsiteMockupMobile />
            </Iphone16Pro>
          </div>
        </div>
      </div>
    </SectionLayout>
  );
}
