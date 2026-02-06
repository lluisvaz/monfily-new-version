import { useLocation } from "wouter";
import { useState, useEffect } from "react";
import { SectionLayout } from "./section-layout";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import * as VisuallyHiddenPrimitive from "@radix-ui/react-visually-hidden";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { NavArrowDown, Xmark, Menu } from "iconoir-react";
import { useLanguage } from "@/hooks/use-language";
import { translations } from "@/lib/translations";
import { SpotlightButton } from "@/components/ui/spotlight-button";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { language } = useLanguage();
  const [location] = useLocation();
  const t = translations[language];

  const navItems = [
    t.header.nav.solutions,
    t.header.nav.about,
    t.header.nav.methodology,
    t.header.nav.support,
    t.header.nav.insights,
  ];
  const navItemsWithDropdown = [t.header.nav.solutions];

  // Adicionar/remover classe no body quando sidebar abre/fecha
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('sidebar-open');
    } else {
      document.body.classList.remove('sidebar-open');
    }
    return () => {
      document.body.classList.remove('sidebar-open');
    };
  }, [isOpen]);

  const handleLanguageChange = (lang: 'pt' | 'en') => {
    // Remove current language prefix from path
    const currentPath = location.replace(/^\/(pt|en)/, '') || '/';
    const newPath = lang === 'pt' ? `/pt${currentPath}` : `/en${currentPath}`;
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
                href={item === t.header.nav.about ? "#servicos" : "#"}
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
                <img
                  src={`https://flagcdn.com/w20/${language === 'pt' ? 'br' : 'us'}.png`}
                  alt={language}
                  className="w-5 h-auto rounded-sm flex-shrink-0"
                />
                <NavArrowDown className="w-3 h-3 ml-1 text-[#1C1C1E]" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              sideOffset={20}
              className="min-w-[200px] border border-[#E2E7F1] bg-white shadow-[0_4px_12px_rgba(0,0,0,0.08)] rounded-lg data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=open]:slide-in-from-top-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=closed]:slide-out-to-top-2"
            >
              <DropdownMenuItem
                className={`flex items-center gap-2 cursor-pointer ${language === 'pt' ? 'font-medium bg-slate-50' : ''}`}
                onClick={() => handleLanguageChange('pt')}
              >
                <img src="https://flagcdn.com/w20/br.png" alt="BR" className="w-4 h-auto rounded-sm" />
                <span className={language === 'pt' ? 'text-[#1C1C1E]' : 'text-[#1C1C1E]/70 hover:text-[#1C1C1E]'}>{t.header.languages.portuguese}</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className={`flex items-center gap-2 cursor-pointer ${language === 'en' ? 'font-medium bg-slate-50' : ''}`}
                onClick={() => handleLanguageChange('en')}
              >
                <img src="https://flagcdn.com/w20/us.png" alt="US" className="w-4 h-auto rounded-sm" />
                <span className={language === 'en' ? 'text-[#1C1C1E]' : 'text-[#1C1C1E]/70 hover:text-[#1C1C1E]'}>{t.header.languages.english}</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <SpotlightButton
            onClick={() => {
              const el = document.getElementById('contato');
              const lenis = (window as any).lenis;
              if (lenis && el) {
                lenis.scrollTo(el, { duration: 1, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
              } else if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }
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
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <button
              className="p-2 text-[#1C1C1E] hover:text-[#1C1C1E] transition-colors flex-shrink-0 header-blur-animate focus:outline-none focus-visible:outline-none cursor-pointer"
              style={{ animationDelay: '0.2s', opacity: 0 }}
              aria-label="Abrir menu de navegação"
            >
              <Menu width={32} height={32} className="text-[#1C1C1E]" />
            </button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-full sm:w-[400px] p-0 bg-white overflow-y-auto [&>button]:!hidden !z-[9999]"
          >
            <VisuallyHiddenPrimitive.Root>
              <SheetTitle>{t.header.nav.menu}</SheetTitle>
              <SheetDescription>
                {t.header.nav.menuDescription}
              </SheetDescription>
            </VisuallyHiddenPrimitive.Root>
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
              .sidebar-blur-animate {
                animation: blurText 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
              }
              @keyframes slideInRight {
                from {
                  transform: translateX(100%);
                  opacity: 0;
                }
                to {
                  transform: translateX(0);
                  opacity: 1;
                }
              }
              @keyframes slideOutRight {
                from {
                  transform: translateX(0);
                  opacity: 1;
                }
                to {
                  transform: translateX(100%);
                  opacity: 0;
                }
              }
              @keyframes fadeInUp {
                from {
                  opacity: 0;
                  transform: translateY(10px);
                }
                to {
                  opacity: 1;
                  transform: translateY(0);
                }
              }
              @keyframes slideDown {
                from {
                  opacity: 0;
                  transform: translateY(-8px);
                  max-height: 0;
                  padding-top: 0;
                  padding-bottom: 0;
                }
                to {
                  opacity: 1;
                  transform: translateY(0);
                  max-height: 200px;
                  padding-top: 0.5rem;
                  padding-bottom: 0.5rem;
                }
              }
              @keyframes slideUp {
                from {
                  opacity: 1;
                  transform: translateY(0);
                  max-height: 200px;
                  padding-top: 0.5rem;
                  padding-bottom: 0.5rem;
                }
                to {
                  opacity: 0;
                  transform: translateY(-8px);
                  max-height: 0;
                  padding-top: 0;
                  padding-bottom: 0;
                }
              }
              @keyframes fadeInSubmenuItem {
                from {
                  opacity: 0;
                  transform: translateX(-6px);
                }
                to {
                  opacity: 1;
                  transform: translateX(0);
                }
              }
              /* Animação suave para CollapsibleContent */
              [data-radix-collapsible-content][data-state="open"] {
                animation: slideDown 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
              }
              [data-radix-collapsible-content][data-state="closed"] {
                animation: slideUp 0.25s cubic-bezier(0.4, 0, 0.2, 1) forwards;
              }
              .nav-item {
                animation: fadeInUp 0.4s ease-out forwards;
                opacity: 0;
              }
              .nav-item:nth-child(1) { animation-delay: 0.1s; }
              .nav-item:nth-child(2) { animation-delay: 0.15s; }
              .nav-item:nth-child(3) { animation-delay: 0.2s; }
              .nav-item:nth-child(4) { animation-delay: 0.25s; }
              .nav-item:nth-child(5) { animation-delay: 0.3s; }
              .nav-item:nth-child(6) { animation-delay: 0.35s; }
              .nav-item:nth-child(7) { animation-delay: 0.4s; }
              .nav-item:nth-child(8) { animation-delay: 0.45s; }
              /* Overlay com blur claro ao invés de escuro */
              [data-radix-dialog-overlay] {
                background: rgba(255, 255, 255, 0.3) !important;
                backdrop-filter: blur(12px) saturate(180%) !important;
                -webkit-backdrop-filter: blur(12px) saturate(180%) !important;
                z-index: 9998 !important;
              }
              /* Reduzir z-index das linhas laterais e grid quando sidebar aberto */
              [data-radix-dialog-overlay][data-state="open"] ~ * [id="section-main-content"],
              [data-radix-dialog-overlay][data-state="open"] ~ * [style*="z-index"] {
                --section-border-z: 1 !important;
                --section-grid-z: 1 !important;
              }
              /* Aplicar z-index reduzido globalmente quando sidebar está aberto */
              body.sidebar-open {
                --section-border-z: 1 !important;
                --section-grid-z: 1 !important;
              }
              [data-radix-dialog-content] {
                z-index: 9999 !important;
                position: fixed !important;
              }
              /* Animação minimalista de fechamento */
              [data-radix-dialog-content][data-state="closed"] {
                animation: slideOutRight 0.25s cubic-bezier(0.4, 0, 0.2, 1) forwards !important;
              }
              [data-radix-dialog-content][data-state="open"] {
                animation: slideInRight 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards !important;
              }
              /* Garantir que o SheetPortal renderize acima de tudo */
              [data-radix-portal] {
                z-index: 9999 !important;
              }
              /* Esconder o botão X padrão do SheetContent */
              [data-radix-dialog-content] > button[data-radix-dialog-close] {
                display: none !important;
              }
            `}</style>

            {/* Sidebar Layout with Margins and Grid Decoration */}
            <div className="w-full h-full flex flex-row relative">
              {/* Top border line */}
              <div className="absolute top-0 left-0 right-0 h-[0.5px] bg-[#E2E7F1]" style={{ zIndex: 10 }}></div>

              {/* Header Bottom Border Line - Infinite line that extends through margins and passes through grid decorations */}
              <div className="absolute left-0 right-0 h-[0.5px] bg-[#E2E7F1] pointer-events-none" style={{ top: '96px', zIndex: 1000 }}></div>

              {/* Left Margin */}
              <div className="flex-1 min-w-[1rem] md:min-w-[2rem] bg-white"></div>

              {/* Main Content */}
              <div className="relative w-full min-w-0 bg-white flex flex-col">
                {/* Left border line */}
                <div className="absolute top-0 bottom-0 left-0 w-[0.5px] bg-[#E2E7F1] pointer-events-none" style={{ zIndex: 1000 }}></div>

                {/* Right border line */}
                <div className="absolute top-0 bottom-0 right-0 w-[0.5px] bg-[#E2E7F1] pointer-events-none" style={{ zIndex: 1000 }}></div>

                {/* Grid Decorations at Header Bottom Corners (where vertical lines meet header bottom border) */}
                <div className="absolute pointer-events-none" style={{ top: '96px', left: 0, right: 0, zIndex: 9995 }}>
                  {/* Left grid decoration */}
                  <div className="absolute w-6 h-6 flex items-center justify-center pointer-events-none" style={{ left: '-12px', top: '-12px', zIndex: 9995 }}>
                    <div className="absolute w-4 h-4 bg-white rounded-full" />
                    <svg viewBox="0 0 24 24" className="w-full h-full fill-[#E2E7F1] relative z-10">
                      <path d="M12 2C12 2 14 10 22 12C14 14 12 22 12 22C12 22 10 14 2 12C10 10 12 2 12 2Z" />
                    </svg>
                  </div>
                  {/* Right grid decoration */}
                  <div className="absolute w-6 h-6 flex items-center justify-center pointer-events-none" style={{ right: '-12px', top: '-12px', zIndex: 9995 }}>
                    <div className="absolute w-4 h-4 bg-white rounded-full" />
                    <svg viewBox="0 0 24 24" className="w-full h-full fill-[#E2E7F1] relative z-10">
                      <path d="M12 2C12 2 14 10 22 12C14 14 12 22 12 22C12 22 10 14 2 12C10 10 12 2 12 2Z" />
                    </svg>
                  </div>
                </div>

                {/* Header do Menu */}
                <div className="flex items-center justify-between px-4 h-24">
                  <a
                    href={`/${language}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setIsOpen(false);
                      window.location.href = `/${language}`;
                    }}
                    className="flex items-center gap-2 cursor-pointer flex-shrink-0 sidebar-blur-animate"
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
                  <SheetClose asChild>
                    <button
                      className="p-2 text-[#1C1C1E] hover:text-[#1C1C1E] transition-colors flex-shrink-0 sidebar-blur-animate focus:outline-none focus-visible:outline-none cursor-pointer"
                      style={{ animationDelay: '0.15s', opacity: 0 }}
                    >
                      <Xmark className="h-8 w-8 text-[#1C1C1E]" />
                    </button>
                  </SheetClose>
                </div>

                {/* Navigation Links */}
                <nav className="flex flex-col px-6 py-4 flex-1 overflow-y-auto">

                  {navItemsWithDropdown.map((item, index) => (
                    <Collapsible key={item} className="sidebar-blur-animate" style={{ animationDelay: `${0.2 + index * 0.05}s`, opacity: 0 }}>
                      <CollapsibleTrigger className="flex items-center justify-between w-full text-[#1C1C1E] hover:text-[#1C1C1E] font-medium text-base py-3 transition-colors group cursor-pointer">
                        <span>{item}</span>
                        <NavArrowDown className="h-4 w-4 transition-all duration-300 ease-out data-[state=open]:rotate-180 data-[state=open]:text-[#2869D6]" />
                      </CollapsibleTrigger>
                      <CollapsibleContent
                        className="pl-4 pb-2 overflow-hidden"
                      >
                        <div className="flex flex-col gap-2">
                          <a
                            href="#"
                            onClick={() => setIsOpen(false)}
                            className="text-sm text-[#1C1C1E]/70 hover:text-[#1C1C1E] py-1 transition-all duration-200 hover:translate-x-1 cursor-pointer"
                            style={{
                              animation: 'fadeInSubmenuItem 0.3s ease-out 0.1s both'
                            }}
                          >
                            {t.header.solutionsDropdown.websiteCreation}
                          </a>
                          <a
                            href="#"
                            onClick={() => setIsOpen(false)}
                            className="text-sm text-[#1C1C1E]/70 hover:text-[#1C1C1E] py-1 transition-all duration-200 hover:translate-x-1 cursor-pointer"
                            style={{
                              animation: 'fadeInSubmenuItem 0.3s ease-out 0.15s both'
                            }}
                          >
                            {t.header.solutionsDropdown.softwareDevelopment}
                          </a>
                          <a
                            href="#"
                            onClick={() => setIsOpen(false)}
                            className="text-sm text-[#1C1C1E]/70 hover:text-[#1C1C1E] py-1 transition-all duration-200 hover:translate-x-1 cursor-pointer"
                            style={{
                              animation: 'fadeInSubmenuItem 0.3s ease-out 0.2s both'
                            }}
                          >
                            {t.header.solutionsDropdown.artificialIntelligence}
                          </a>
                          <a
                            href="#"
                            onClick={() => setIsOpen(false)}
                            className="text-sm text-[#1C1C1E]/70 hover:text-[#1C1C1E] py-1 transition-all duration-200 hover:translate-x-1 cursor-pointer"
                            style={{
                              animation: 'fadeInSubmenuItem 0.3s ease-out 0.25s both'
                            }}
                          >
                            {t.header.solutionsDropdown.technicalSEO}
                          </a>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  ))}

                  {navItems.filter(item => !navItemsWithDropdown.includes(item)).map((item, index) => {
                    const isAboutLink = item === t.header.nav.about;
                    const dropdownCount = navItemsWithDropdown.length;
                    return (
                      <a
                        key={item}
                        href={isAboutLink ? "#servicos" : "#"}
                        data-custom-handler="true"
                        onClick={(e) => {
                          if (isAboutLink) {
                            e.preventDefault();
                            setIsOpen(false);
                            // Wait for menu to close, then scroll
                            setTimeout(() => {
                              const element = document.getElementById('servicos');
                              const lenis = (window as any).lenis;
                              if (lenis && element) {
                                lenis.scrollTo(element, { duration: 1, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
                              } else if (element) {
                                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                              }
                              // Remove hash from URL after scroll
                              if (window.history.replaceState) {
                                window.history.replaceState(null, '', window.location.pathname + window.location.search);
                              }
                            }, 300);
                          } else {
                            setIsOpen(false);
                          }
                        }}
                        className="sidebar-blur-animate text-[#1C1C1E] hover:text-[#1C1C1E] font-medium text-base py-3 transition-colors cursor-pointer"
                        style={{ animationDelay: `${0.2 + dropdownCount * 0.05 + index * 0.05}s`, opacity: 0 }}
                      >
                        {item}
                      </a>
                    );
                  })}

                  {/* Separator */}
                  <div
                    className="h-px bg-[#E2E7F1] my-4 sidebar-blur-animate"
                    style={{ animationDelay: `${0.2 + navItems.length * 0.05}s`, opacity: 0 }}
                  ></div>

                  {/* Language Selector */}
                  <Collapsible
                    className="sidebar-blur-animate"
                    style={{ animationDelay: `${0.25 + navItems.length * 0.05}s`, opacity: 0 }}
                  >
                    <CollapsibleTrigger className="flex items-center justify-between w-full text-[#1C1C1E] hover:text-[#1C1C1E] font-medium text-base py-3 transition-colors group cursor-pointer">
                      <div className="flex items-center gap-2">
                        <img
                          src={`https://flagcdn.com/w20/${language === 'pt' ? 'br' : 'us'}.png`}
                          alt={language}
                          className="w-5 h-auto rounded-sm"
                        />
                        <span>{language === 'pt' ? t.header.languages.portuguese : t.header.languages.english}</span>
                      </div>
                      <NavArrowDown className="h-4 w-4 transition-all duration-300 ease-out data-[state=open]:rotate-180 data-[state=open]:text-[#2869D6]" />
                    </CollapsibleTrigger>
                    <CollapsibleContent
                      className="pl-4 pb-2 overflow-hidden"
                    >
                      <div className="flex flex-col gap-2">
                        <a
                          href="#"
                          onClick={(e) => { e.preventDefault(); handleLanguageChange('pt'); setIsOpen(false); }}
                          className={`text-sm py-2 px-2 rounded transition-all duration-200 hover:translate-x-1 cursor-pointer flex items-center gap-2 ${language === 'pt' ? 'text-[#1C1C1E] font-medium bg-slate-50' : 'text-[#1C1C1E]/70 hover:text-[#1C1C1E]'}`}
                          style={{
                            animation: 'fadeInSubmenuItem 0.3s ease-out 0.1s both'
                          }}
                        >
                          <img src="https://flagcdn.com/w20/br.png" alt="BR" className="w-4 h-auto rounded-sm" />
                          {t.header.languages.portuguese}
                        </a>
                        <a
                          href="#"
                          onClick={(e) => { e.preventDefault(); handleLanguageChange('en'); setIsOpen(false); }}
                          className={`text-sm py-2 px-2 rounded transition-all duration-200 hover:translate-x-1 cursor-pointer flex items-center gap-2 ${language === 'en' ? 'text-[#1C1C1E] font-medium bg-slate-50' : 'text-[#1C1C1E]/70 hover:text-[#1C1C1E]'}`}
                          style={{
                            animation: 'fadeInSubmenuItem 0.3s ease-out 0.15s both'
                          }}
                        >
                          <img src="https://flagcdn.com/w20/us.png" alt="US" className="w-4 h-auto rounded-sm" />
                          {t.header.languages.english}
                        </a>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>

                  {/* Falar com Especialista Button */}
                  <SpotlightButton
                    onClick={() => {
                      setIsOpen(false);
                      setTimeout(() => {
                        const el = document.getElementById('contato');
                        const lenis = (window as any).lenis;
                        if (lenis && el) {
                          lenis.scrollTo(el, { duration: 1, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
                        } else if (el) {
                          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }
                      }, 300);
                    }}
                    className="bg-[#2869D6] text-white py-4 rounded-full font-medium sidebar-blur-animate mt-4 w-full flex items-center justify-center cursor-pointer"
                    style={{ animationDelay: `${0.3 + navItems.length * 0.05}s`, opacity: 0 }}
                  >
                    {t.header.cta}
                  </SpotlightButton>
                </nav>
              </div>

              {/* Right Margin */}
              <div className="flex-1 min-w-[1rem] md:min-w-[2rem] bg-white"></div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </SectionLayout>
  );
}
