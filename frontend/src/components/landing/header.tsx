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
import { SpotlightButton } from "@/components/ui/spotlight-button";

function SplitEnglishFlag({ className = "w-5 h-4" }: { className?: string }) {
  return (
    <span className={`relative inline-flex overflow-hidden rounded-sm border border-[#E2E7F1] bg-white ${className}`}>
      <img src="https://flagcdn.com/w20/us.png" alt="US" className="absolute left-0 top-0 h-full w-1/2 object-cover object-left" />
      <img src="https://flagcdn.com/w20/gb.png" alt="GB" className="absolute right-0 top-0 h-full w-1/2 object-cover object-right" />
    </span>
  );
}

function LanguageFlag({ language, className = "w-5 h-auto" }: { language: Language; className?: string }) {
  if (language === 'en') return <SplitEnglishFlag className={className.includes('h-') ? className : `${className} h-4`} />;

  const country = {
    'pt-br': 'br',
    'pt-pt': 'pt',
    es: 'es',
    it: 'it',
    sg: 'sg',
    he: 'il',
  }[language];

  return <img src={`https://flagcdn.com/w20/${country}.png`} alt={language} className={`${className} rounded-sm flex-shrink-0`} />;
}

export function Header() {
  const { language } = useLanguage();
  const [location] = useLocation();
  const t = translations[language];

  const navItems: string[] = [];
  const navItemsWithDropdown: string[] = [];

  const languageOptions: Array<{ code: Language; label: string }> = [
    { code: 'pt-br', label: t.header.languages.portugueseBrazil },
    { code: 'en', label: t.header.languages.english },
    { code: 'pt-pt', label: t.header.languages.portuguesePortugal },
    { code: 'es', label: t.header.languages.spanish },
    { code: 'it', label: t.header.languages.italian ?? 'Italiano' },
    { code: 'sg', label: t.header.languages.singapore ?? 'English (Singapore)' },
    { code: 'he', label: t.header.languages.hebrew ?? 'Hebrew (Israel)' },
  ];

  const handleLanguageChange = (lang: Language) => {
    // Remove current language prefix from path
    const currentPath = location.replace(/^\/(pt-br|pt-pt|en|es|it|sg|he)/, '') || '/';
    let newPath: string;
    switch (lang) {
      case 'pt-br': newPath = `/pt-br${currentPath === '/' ? '' : currentPath}`; break;
      case 'pt-pt': newPath = `/pt-pt${currentPath === '/' ? '' : currentPath}`; break;
      case 'en': newPath = `/en${currentPath === '/' ? '' : currentPath}`; break;
      case 'es': newPath = `/es${currentPath === '/' ? '' : currentPath}`; break;
      case 'it': newPath = `/it${currentPath === '/' ? '' : currentPath}`; break;
      case 'sg': newPath = `/sg${currentPath === '/' ? '' : currentPath}`; break;
      case 'he': newPath = `/he${currentPath === '/' ? '' : currentPath}`; break;
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
          className="h-10 w-auto select-none"
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
                      className="flex items-center gap-1 text-[#1C1C1E] hover:text-[#1C1C1E] font-medium text-[16px] py-2 px-4 transition-colors hover:bg-slate-50 rounded-full whitespace-nowrap focus:outline-none focus-visible:outline-none header-blur-animate cursor-pointer"
                      style={{ animationDelay: `${0.2 + index * 0.05}s`, opacity: 0 }}
                    >
                      {item}
                      <NavArrowDown className="w-3 h-3 transition-transform duration-200 data-[state=open]:rotate-180" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="start"
                    sideOffset={8}
                    className="min-w-[220px] border border-[#E2E7F1] bg-white shadow-[0_4px_12px_rgba(0,0,0,0.08)] rounded-lg data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=open]:slide-in-from-top-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=closed]:slide-out-to-top-2"
                  >
                    <DropdownMenuItem className="cursor-pointer">
                      <span className="text-[#1C1C1E] hover:text-[#1C1C1E]">{t.header.solutionsDropdown.websiteCreation}</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      <span className="text-[#1C1C1E] hover:text-[#1C1C1E]">{t.header.solutionsDropdown.softwareDevelopment}</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      <span className="text-[#1C1C1E] hover:text-[#1C1C1E]">{t.header.solutionsDropdown.artificialIntelligence}</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      <span className="text-[#1C1C1E] hover:text-[#1C1C1E]">{t.header.solutionsDropdown.technicalSEO}</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              );
            }
            return (
              <a
                key={item}
                href="#"
                className="text-[#1C1C1E] hover:text-[#1C1C1E] font-medium text-[16px] py-2 px-4 transition-colors hover:bg-slate-50 rounded-full whitespace-nowrap header-blur-animate cursor-pointer"
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
                className="flex items-center justify-center h-10 px-3 rounded-full border border-[#E2E7F1] hover:bg-slate-50 transition-colors focus:outline-none focus-visible:outline-none header-blur-animate cursor-pointer"
                style={{ animationDelay: `${0.3 + navItems.length * 0.05}s`, opacity: 0 }}
              >
                <LanguageFlag language={language} className="w-5 h-4" />
                <NavArrowDown className="w-3 h-3 ml-1 text-[#1C1C1E]" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              sideOffset={20}
              className="min-w-[200px] border border-[#E2E7F1] bg-white shadow-[0_4px_12px_rgba(0,0,0,0.08)] rounded-lg data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=open]:slide-in-from-top-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=closed]:slide-out-to-top-2"
            >
              {languageOptions.map((option) => (
                <DropdownMenuItem
                  key={option.code}
                  className={`flex items-center gap-2 cursor-pointer ${language === option.code ? 'font-medium bg-slate-50' : ''}`}
                  onClick={() => handleLanguageChange(option.code)}
                >
                  <LanguageFlag language={option.code} className="w-4 h-3" />
                  <span className={language === option.code ? 'text-[#1C1C1E]' : 'text-[#1C1C1E]/70 hover:text-[#1C1C1E]'}>{option.label}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <SpotlightButton
            onClick={() => {
              window.open(`https://wa.me/${t.whatsappNumber}`, '_blank');
            }}
            className="bg-[#2869D6] text-white h-10 px-6 rounded-full font-medium header-blur-animate flex items-center justify-center cursor-pointer"
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
              className="flex items-center justify-center h-10 px-3 rounded-full border border-[#E2E7F1] hover:bg-slate-50 transition-colors focus:outline-none focus-visible:outline-none header-blur-animate cursor-pointer"
              style={{ animationDelay: '0.15s', opacity: 0 }}
            >
              <LanguageFlag language={language} className="w-5 h-4" />
              <NavArrowDown className="w-3 h-3 ml-1 text-[#1C1C1E]" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            sideOffset={20}
            className="min-w-[200px] border border-[#E2E7F1] bg-white shadow-[0_4px_12px_rgba(0,0,0,0.08)] rounded-lg data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=open]:slide-in-from-top-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=closed]:slide-out-to-top-2"
          >
            {languageOptions.map((option) => (
              <DropdownMenuItem
                key={option.code}
                className={`flex items-center gap-2 cursor-pointer ${language === option.code ? 'font-medium bg-slate-50' : ''}`}
                onClick={() => handleLanguageChange(option.code)}
              >
                <LanguageFlag language={option.code} className="w-4 h-3" />
                <span className={language === option.code ? 'text-[#1C1C1E]' : 'text-[#1C1C1E]/70 hover:text-[#1C1C1E]'}>{option.label}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <SpotlightButton
          onClick={() => {
            window.open(`https://wa.me/${t.whatsappNumber}`, '_blank');
          }}
          className="bg-[#2869D6] text-white h-10 px-5 rounded-full font-medium header-blur-animate flex items-center justify-center cursor-pointer text-sm"
          style={{ animationDelay: '0.2s', opacity: 0 }}
        >
          {t.header.ctaMobile}
        </SpotlightButton>
      </div>
    </SectionLayout>
  );
}
