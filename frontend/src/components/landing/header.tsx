import { useLocation } from "wouter";
import { SectionLayout } from "./section-layout";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NavArrowDown } from "iconoir-react";
import { useLanguage } from "@/hooks/use-language";
import { translations, type Language } from "@/lib/translations";
import { useWhatsAppCta } from "@/hooks/use-whatsapp";
import { SpotlightButton } from "@/components/ui/spotlight-button";

function getEnglishFlagCountry(detectedCountry: string) {
  const country = detectedCountry.toUpperCase();
  if (country === "GB" || country === "UK") return "gb";
  if (country === "SG") return "sg";
  return "us";
}
function LanguageFlag({
  language,
  detectedCountry = "",
  className = "w-5 h-auto",
}: {
  language: Language;
  detectedCountry?: string;
  className?: string;
}) {
  const country = {
    'pt-br': 'br',
    'pt-pt': 'pt',
    en: getEnglishFlagCountry(detectedCountry),
    es: 'es',
    it: 'it',
    sg: 'sg',
  }[language];

  return <img src={`https://flagcdn.com/w20/${country}.png`} alt={language} className={`${className} rounded-sm flex-shrink-0`} />;
}

export function Header() {
  const { language, detectedCountry } = useLanguage();
  const [location] = useLocation();
  const t = translations[language];
  const { open: openWhatsApp } = useWhatsAppCta();

  const navItems: string[] = [];
  const navItemsWithDropdown: string[] = [];

  const portugueseCode: Language = detectedCountry === 'PT' || language === 'pt-pt' ? 'pt-pt' : 'pt-br';
  const portugueseLabel = t.header.languages.portugueseBrazil.replace(/\s*\(.+\)\s*$/, '');
  const englishCode: Language = language === 'sg' || detectedCountry === 'SG' ? 'sg' : 'en';
  const languageOptions: Array<{ code: Language; label: string; activeCodes?: Language[] }> = [
    { code: portugueseCode, label: portugueseLabel, activeCodes: ['pt-br', 'pt-pt'] },
    { code: englishCode, label: t.header.languages.english, activeCodes: ['en', 'sg'] },
    { code: 'es', label: t.header.languages.spanish },
    { code: 'it', label: t.header.languages.italian ?? 'Italiano' },
  ];

  const handleLanguageChange = (lang: Language) => {
    // Remove current language prefix from path
    const currentPath = location.replace(/^\/(pt-br|pt-pt|en|es|it|sg)/, '') || '/';
    let newPath: string;
    switch (lang) {
      case 'pt-br': newPath = `/pt-br${currentPath === '/' ? '' : currentPath}`; break;
      case 'pt-pt': newPath = `/pt-pt${currentPath === '/' ? '' : currentPath}`; break;
      case 'en': newPath = `/en${currentPath === '/' ? '' : currentPath}`; break;
      case 'es': newPath = `/es${currentPath === '/' ? '' : currentPath}`; break;
      case 'it': newPath = `/it${currentPath === '/' ? '' : currentPath}`; break;
      case 'sg': newPath = `/sg${currentPath === '/' ? '' : currentPath}`; break;
    }
    // Reload page for better optimization
    window.location.href = newPath;
  };

  return (
    <SectionLayout className="flex items-center justify-between px-4 md:px-[32px] h-24 relative z-[40] min-w-0">
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
        .header-blur-animate {
          animation: blurText 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        .language-control:focus,
        .language-control:focus-visible,
        .language-option:focus,
        .language-option:focus-visible {
          outline: none !important;
          box-shadow: none !important;
        }
      `}</style>
      {/* Logo */}
      <a
        href={`/${language}`}
        onClick={(e) => {
          e.preventDefault();
          window.location.href = `/${language}`;
        }}
        className="flex items-center gap-2 cursor-pointer flex-shrink-0 header-blur-animate"
        style={{ animationDelay: '0.1s', opacity: 0 }}
      >
        <img
          src="https://res.cloudinary.com/dopp0v9eq/image/upload/f_auto,q_auto,w_120/v1763574787/monfily-black-nobg_risk6t.png"
          alt="Monfily"
          className="h-10 w-auto select-none brightness-0 invert"
          draggable="false"
          onContextMenu={(e) => e.preventDefault()}
          onDragStart={(e) => e.preventDefault()}
        />
      </a>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
        {/* Navigation */}
        <nav className="flex items-center gap-2">
          {navItems.map((item, index) => {
            if (navItemsWithDropdown.includes(item)) {
              return (
                <DropdownMenu key={item}>
                  <DropdownMenuTrigger asChild>
                    <button
                      className="flex items-center gap-1 text-[#F5F7FA] hover:text-[#F5F7FA] font-medium text-[16px] py-2 px-4 transition-colors hover:bg-white/5 rounded-full whitespace-nowrap focus:outline-none focus-visible:outline-none header-blur-animate cursor-pointer"
                      style={{ animationDelay: `${0.2 + index * 0.05}s`, opacity: 0 }}
                    >
                      {item}
                      <NavArrowDown className="w-3 h-3 transition-transform duration-200 data-[state=open]:rotate-180" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="start"
                    sideOffset={8}
                    className="min-w-[220px] border border-[#2A2A2F] bg-[#0B0B0D] shadow-[0_4px_12px_rgba(0,0,0,0.08)] rounded-lg data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=open]:slide-in-from-top-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=closed]:slide-out-to-top-2"
                  >
                    <DropdownMenuItem className="cursor-pointer">
                      <span className="text-[#F5F7FA] hover:text-[#F5F7FA]">{t.header.solutionsDropdown.websiteCreation}</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      <span className="text-[#F5F7FA] hover:text-[#F5F7FA]">{t.header.solutionsDropdown.softwareDevelopment}</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      <span className="text-[#F5F7FA] hover:text-[#F5F7FA]">{t.header.solutionsDropdown.artificialIntelligence}</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      <span className="text-[#F5F7FA] hover:text-[#F5F7FA]">{t.header.solutionsDropdown.technicalSEO}</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              );
            }
            return (
              <a
                key={item}
                href="#"
                className="text-[#F5F7FA] hover:text-[#F5F7FA] font-medium text-[16px] py-2 px-4 transition-colors hover:bg-white/5 rounded-full whitespace-nowrap header-blur-animate cursor-pointer"
                style={{ animationDelay: `${0.2 + index * 0.05}s`, opacity: 0 }}
              >
                {item}
              </a>
            );
          })}
          <div
            className="h-6 w-px bg-slate-200 mx-2 flex-shrink-0 header-blur-animate"
            style={{ animationDelay: `${0.2 + navItems.length * 0.05}s`, opacity: 0 }}
          ></div>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="language-control flex h-12 items-center justify-center rounded-full bg-[#1C1C1E] px-4 transition-colors duration-300 hover:bg-[#151517] focus:outline-none focus-visible:outline-none header-blur-animate cursor-pointer"
                style={{ animationDelay: `${0.3 + navItems.length * 0.05}s`, opacity: 0 }}
              >
                <LanguageFlag language={language} detectedCountry={detectedCountry} className="w-5 h-4" />
                <NavArrowDown className="w-3 h-3 ml-1 text-[#F5F7FA]" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              sideOffset={20}
              className="min-w-[200px] border border-[#2A2A2F] bg-[#0B0B0D] shadow-[0_4px_12px_rgba(0,0,0,0.08)] rounded-lg data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=open]:slide-in-from-top-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=closed]:slide-out-to-top-2"
            >
              {languageOptions.map((option) => {
                const isActive = option.activeCodes?.includes(language) ?? language === option.code;
                return (
                <DropdownMenuItem
                  key={option.code}
                  className={`language-option flex items-center gap-2 cursor-pointer focus:bg-[#151517] focus:text-[#F5F7FA] ${isActive ? 'font-medium bg-white/5' : ''}`}
                  onClick={() => handleLanguageChange(option.code)}
                >
                  <LanguageFlag language={option.code} detectedCountry={detectedCountry} className="w-4 h-3" />
                  <span className={isActive ? 'text-[#F5F7FA]' : 'text-[#F5F7FA]/70 hover:text-[#F5F7FA]'}>{option.label}</span>
                </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
          <SpotlightButton
            onClick={openWhatsApp}
            className="flex h-12 cursor-pointer items-center justify-center rounded-full bg-[#1C1C1E] px-7 font-normal text-white transition-colors duration-300 hover:bg-[#2869D6] header-blur-animate"
            style={{ animationDelay: `${0.35 + navItems.length * 0.05}s`, opacity: 0 }}
          >
            {t.header.cta}
          </SpotlightButton>
        </div>
      </div>

      {/* Mobile/Tablet Menu */}
      <div className="flex lg:hidden items-center gap-2 flex-shrink-0">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="language-control flex h-12 items-center justify-center rounded-full bg-[#1C1C1E] px-4 transition-colors duration-300 hover:bg-[#151517] focus:outline-none focus-visible:outline-none header-blur-animate cursor-pointer"
              style={{ animationDelay: '0.15s', opacity: 0 }}
            >
              <LanguageFlag language={language} detectedCountry={detectedCountry} className="w-5 h-4" />
              <NavArrowDown className="w-3 h-3 ml-1 text-[#F5F7FA]" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            sideOffset={20}
            className="min-w-[200px] border border-[#2A2A2F] bg-[#0B0B0D] shadow-[0_4px_12px_rgba(0,0,0,0.08)] rounded-lg data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=open]:slide-in-from-top-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=closed]:slide-out-to-top-2"
          >
            {languageOptions.map((option) => {
              const isActive = option.activeCodes?.includes(language) ?? language === option.code;
              return (
              <DropdownMenuItem
                key={option.code}
                className={`language-option flex items-center gap-2 cursor-pointer focus:bg-[#151517] focus:text-[#F5F7FA] ${isActive ? 'font-medium bg-white/5' : ''}`}
                onClick={() => handleLanguageChange(option.code)}
              >
                <LanguageFlag language={option.code} detectedCountry={detectedCountry} className="w-4 h-3" />
                <span className={isActive ? 'text-[#F5F7FA]' : 'text-[#F5F7FA]/70 hover:text-[#F5F7FA]'}>{option.label}</span>
              </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>

        <SpotlightButton
          onClick={openWhatsApp}
          className="flex h-12 cursor-pointer items-center justify-center rounded-full bg-[#1C1C1E] px-5 text-sm font-normal text-white transition-colors duration-300 hover:bg-[#2869D6] header-blur-animate"
          style={{ animationDelay: '0.2s', opacity: 0 }}
        >
          {t.header.ctaMobile}
        </SpotlightButton>
      </div>
    </SectionLayout>
  );
}
