import { ArrowRight, Zap, Shield } from "lucide-react";
import { SectionLayout } from "./section-layout";
import ShinyText from "@/components/ui/shiny-text";
import TextType from "@/components/ui/text-type";
import { WebsiteMockup } from "./website-mockup";
import { WebsiteMockupMobile } from "./website-mockup-mobile";
import { Iphone16Pro } from "@/components/ui/iphone-16-pro";
import { useLanguage } from "@/hooks/use-language";
import { translations } from "@/lib/translations";

export function Hero() {
  const { language } = useLanguage();
  const t = translations[language];
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
          animation: blurText 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
      `}</style>
      {/* Gradient Effect - Desktop Only */}
      <div className="hidden lg:block absolute bottom-0 right-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
        <div 
          className="absolute bottom-0 right-0 w-full h-full"
          style={{
            background: 'radial-gradient(ellipse 100% 150% at bottom right, #2869D6 0%, #2869D6 20%, rgba(40, 105, 214, 0.9) 30%, rgba(40, 105, 214, 0.7) 40%, rgba(40, 105, 214, 0.5) 48%, rgba(40, 105, 214, 0.3) 55%, rgba(40, 105, 214, 0.15) 62%, rgba(255, 255, 255, 0.8) 70%, white 80%, white 100%)'
          }}
        ></div>
        <div className="absolute bottom-6 right-6 w-3 h-3 bg-[#2869D6] rounded-full"></div>
      </div>

      {/* Gradient Effect - Mobile Only (Bottom Center) */}
      <div className="lg:hidden absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-3/4 pointer-events-none" style={{ zIndex: 0 }}>
        <div 
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-full"
          style={{
            background: 'radial-gradient(ellipse 120% 100% at bottom center, #2869D6 0%, #2869D6 20%, rgba(40, 105, 214, 0.9) 30%, rgba(40, 105, 214, 0.7) 40%, rgba(40, 105, 214, 0.5) 48%, rgba(40, 105, 214, 0.3) 55%, rgba(40, 105, 214, 0.15) 62%, rgba(255, 255, 255, 0.8) 70%, white 80%, white 100%)'
          }}
        ></div>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#2869D6] rounded-full"></div>
      </div>
      {/* Left Content */}
      <div className="flex flex-col justify-center items-start space-y-6 md:space-y-8 w-full relative lg:pb-0 pb-[240px] md:pb-[280px]" style={{ zIndex: 1 }}>
        {/* Badge */}
        <div 
          className="inline-flex items-center gap-2 rounded-full pl-1 pr-4 py-1 border border-[#E2E7F1] hero-blur-animate"
          style={{ animationDelay: '0.1s', opacity: 0 }}
        >
          <div className="rounded-full p-1 border border-[#E2E7F1]">
            <div className="flex -space-x-2 overflow-hidden">
              {/* Avatars */}
              <img 
                src="https://framerusercontent.com/images/E3vzjdpFuSWiVeurdyPGMrSWk.png?scale-down-to=512&width=1200&height=992" 
                alt="Founder 1" 
                className="inline-block h-5 w-5 rounded-full ring-2 ring-white object-cover"
              />
              <img 
                src="https://framerusercontent.com/images/jC7KwluILkhO0KHxk6qWEttOxhE.png?scale-down-to=512&width=1200&height=1200" 
                alt="Founder 2" 
                className="inline-block h-5 w-5 rounded-full ring-2 ring-white object-cover"
              />
              <img 
                src="https://framerusercontent.com/images/cFl24iPInxckRrL32eRgadp9ZJM.png?scale-down-to=512&width=1200&height=1200" 
                alt="Founder 3" 
                className="inline-block h-5 w-5 rounded-full ring-2 ring-white object-cover"
              />
            </div>
          </div>
          <span className="text-xs font-semibold text-[#1C1C1E]">
            <span className="hidden lg:inline">{t.hero.badge.chosenBy}</span>{t.hero.badge.clients}
            <TextType
              text={t.hero.rotatingTexts}
              typingSpeed={75}
              pauseDuration={1500}
              showCursor={true}
              cursorCharacter="|"
              as="span"
              className="font-bold"
            />
          </span>
        </div>

        {/* Heading */}
        <h1 
          className="text-[48px] md:text-7xl font-bold leading-none tracking-tight text-[#1C1C1E] hero-blur-animate"
          style={{ animationDelay: '0.2s', opacity: 0 }}
        >
          {t.hero.heading.line1} <br />
          <span className="text-[#1C1C1E]">{t.hero.heading.line2}</span>
          <ShinyText text={t.hero.heading.line3} speed={3} className="text-[#1C1C1E]" />
        </h1>

        {/* Description */}
        <p 
          className="text-base md:text-lg text-[#1C1C1E] max-w-md leading-tight hero-blur-animate"
          style={{ animationDelay: '0.3s', opacity: 0 }}
        >
          {language === 'pt' ? (
            <>
              A infraestrutura digital completa para o seu negócio. Unimos design de{' '}
              <strong>Criação de Sites de Alta Performance</strong>,{' '}
              <strong>Engenharia de Software</strong>,{' '}
              <strong>Inteligência Artificial (IA)</strong> e{' '}
              <strong>SEO Técnico</strong> para gerar receita e eficiência.
            </>
          ) : (
            <>
              Complete digital infrastructure for your business. We combine high-performance{' '}
              <strong>Website Creation</strong> design,{' '}
              <strong>Software Engineering</strong>,{' '}
              <strong>Artificial Intelligence (AI)</strong>, and{' '}
              <strong>Technical SEO</strong> to generate revenue and efficiency.
            </>
          )}
        </p>

        {/* CTAs */}
        <div 
          className="flex flex-col sm:flex-row items-center gap-6 pt-2 w-full hero-blur-animate"
          style={{ animationDelay: '0.4s', opacity: 0 }}
        >
          <button className="group bg-[#2869D6] hover:bg-[#1E4A8C] text-white text-base py-4 px-8 rounded-full transition-all flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto">
            {t.hero.cta.primary}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          <a href="#" className="text-[#1C1C1E] hover:text-[#1C1C1E] font-medium transition-colors w-full sm:w-auto text-center sm:text-left">
            {t.hero.cta.secondary}
          </a>
        </div>

        {/* Features */}
        <div 
          className="hidden md:grid grid-cols-2 gap-8 pt-8 w-full max-w-lg hero-blur-animate"
          style={{ animationDelay: '0.5s', opacity: 0 }}
        >
          <div className="flex items-start gap-3">
            <div className="bg-[#2869D6]/20 p-2 rounded-full w-10 h-10 flex items-center justify-center text-[#2869D6] mt-1">
              <Zap className="w-4 h-4 fill-current" />
            </div>
            <div>
              <h3 className="font-bold text-[#1C1C1E] text-sm">{t.hero.features.performance.title}</h3>
              <p className="text-[#1C1C1E] text-xs mt-1">{t.hero.features.performance.description}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="bg-[#2869D6]/20 p-2 rounded-full w-10 h-10 flex items-center justify-center text-[#2869D6] mt-1">
              <Shield className="w-4 h-4 fill-current" />
            </div>
            <div>
              <h3 className="font-bold text-[#1C1C1E] text-sm">{t.hero.features.optimized.title}</h3>
              <p className="text-[#1C1C1E] text-xs mt-1">{t.hero.features.optimized.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Content (Website Mockup) */}
      <div 
        className="relative hidden lg:block h-full min-h-[400px] hero-blur-animate" 
        style={{ zIndex: 1, animationDelay: '0.6s', opacity: 0 }}
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
            showIsland={true}
            islandWidth={90}
            islandHeight={20}
            showCamera={false}
            shadow={true}
            rounded={true}
            screenRadius={40}
            hoverAnimation={false}
          >
            <WebsiteMockupMobile />
          </Iphone16Pro>
        </div>
      </div>

      {/* Mobile Mockups - Visible only on mobile, positioned at bottom */}
      <div 
        className="lg:hidden absolute bottom-0 left-0 right-0 w-screen flex justify-center items-end overflow-hidden pointer-events-none hero-blur-animate" 
        style={{ zIndex: 1, left: '50%', right: '50%', marginLeft: '-50vw', marginRight: '-50vw', animationDelay: '0.6s', opacity: 0 }}
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
              showIsland={true}
              islandWidth={90}
              islandHeight={20}
              showCamera={false}
              shadow={true}
              rounded={true}
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
