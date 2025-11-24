import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { SectionLayout } from "./section-layout";
import { MenuIcon } from "@/components/ui/menu-icon";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
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
import { ChevronDown, X, Globe } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { translations } from "@/lib/translations";

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
    <SectionLayout className="flex items-center justify-between px-4 md:px-[32px] h-24 relative z-50 min-w-0">
      {/* Logo */}
      <Link href={`/${language}`} className="flex items-center gap-2 cursor-pointer flex-shrink-0">
        <img 
          src="https://res.cloudinary.com/dopp0v9eq/image/upload/v1763574787/monfily-black-nobg_risk6t.png" 
          alt="Monfily" 
          className="h-10 w-auto select-none"
          draggable="false"
          onContextMenu={(e) => e.preventDefault()}
          onDragStart={(e) => e.preventDefault()}
        />
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
        {/* Navigation */}
        <nav className="flex items-center gap-2">
          {navItems.map((item) => {
            if (navItemsWithDropdown.includes(item)) {
              return (
                <DropdownMenu key={item}>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-1 text-[#1C1C1E] hover:text-[#1C1C1E] font-medium text-[16px] py-2 px-4 transition-colors hover:bg-slate-50 rounded-full whitespace-nowrap focus:outline-none focus-visible:outline-none">
                      {item}
                      <ChevronDown className="w-3 h-3 transition-transform duration-200 data-[state=open]:rotate-180" />
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
                className="text-[#1C1C1E] hover:text-[#1C1C1E] font-medium text-[16px] py-2 px-4 transition-colors hover:bg-slate-50 rounded-full whitespace-nowrap"
              >
                {item}
              </a>
            );
          })}
          <div className="h-6 w-px bg-slate-200 mx-2 flex-shrink-0"></div>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center justify-center py-2 px-2 rounded-full border border-[#E2E7F1] hover:bg-slate-50 transition-colors focus:outline-none focus-visible:outline-none">
                <Globe className="w-5 h-5 text-[#1C1C1E]" />
                <ChevronDown className="w-3 h-3 ml-1 text-[#1C1C1E]" />
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
                {language === 'pt' && <Globe className="w-4 h-4 text-[#1C1C1E]" />}
                <span className={language === 'pt' ? 'text-[#1C1C1E]' : 'text-[#1C1C1E]/70 hover:text-[#1C1C1E]'}>{t.header.languages.portuguese}</span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                className={`flex items-center gap-2 cursor-pointer ${language === 'en' ? 'font-medium bg-slate-50' : ''}`}
                onClick={() => handleLanguageChange('en')}
              >
                {language === 'en' && <Globe className="w-4 h-4 text-[#1C1C1E]" />}
                <span className={language === 'en' ? 'text-[#1C1C1E]' : 'text-[#1C1C1E]/70 hover:text-[#1C1C1E]'}>{t.header.languages.english}</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <button className="bg-[#2869D6] hover:bg-[#1E4A8C] text-white text-[16px] py-2 px-4 rounded-full transition-colors cursor-pointer whitespace-nowrap">
            {t.header.cta}
          </button>
        </div>
      </div>

      {/* Mobile/Tablet Menu */}
      <div className="flex lg:hidden items-center gap-2 flex-shrink-0">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <button className="p-2 text-[#1C1C1E] hover:text-[#1C1C1E] transition-colors flex-shrink-0">
              <MenuIcon size={32} className="text-[#1C1C1E]" />
            </button>
          </SheetTrigger>
          <SheetContent 
            side="right" 
            className="w-full sm:w-[400px] p-0 bg-white overflow-y-auto [&>button]:!hidden !z-[100000]"
          >
            <style>{`
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
                z-index: 99998 !important;
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
                z-index: 100000 !important;
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
                z-index: 100000 !important;
              }
              /* Esconder o botão X padrão do SheetContent */
              [data-radix-dialog-content] > button[data-radix-dialog-close] {
                display: none !important;
              }
            `}</style>
            
            {/* Header do Menu */}
            <div className="flex items-center justify-between px-4 h-24 border-b border-[#E2E7F1]">
              <Link href={`/${language}`} onClick={() => setIsOpen(false)} className="flex items-center gap-2 cursor-pointer flex-shrink-0">
                <img 
                  src="https://res.cloudinary.com/dopp0v9eq/image/upload/v1763574787/monfily-black-nobg_risk6t.png" 
                  alt="Monfily" 
                  className="h-10 w-auto select-none"
                  draggable="false"
                  onContextMenu={(e) => e.preventDefault()}
                  onDragStart={(e) => e.preventDefault()}
                />
              </Link>
              <SheetClose asChild>
                <button className="p-2 text-[#1C1C1E] hover:text-[#1C1C1E] transition-colors flex-shrink-0">
                  <X className="h-8 w-8 text-[#1C1C1E]" />
                </button>
              </SheetClose>
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-col px-6 py-4">
              
              {navItemsWithDropdown.map((item) => (
                <Collapsible key={item} className="nav-item">
                  <CollapsibleTrigger className="flex items-center justify-between w-full text-[#1C1C1E] hover:text-[#1C1C1E] font-medium text-base py-3 transition-colors group">
                    <span>{item}</span>
                    <ChevronDown className="h-4 w-4 transition-all duration-300 ease-out data-[state=open]:rotate-180 data-[state=open]:text-[#2869D6]" />
                  </CollapsibleTrigger>
                  <CollapsibleContent 
                    className="pl-4 pb-2 overflow-hidden"
                  >
                    <div className="flex flex-col gap-2">
                      <a 
                        href="#" 
                        onClick={() => setIsOpen(false)} 
                        className="text-sm text-[#1C1C1E]/70 hover:text-[#1C1C1E] py-1 transition-all duration-200 hover:translate-x-1"
                        style={{
                          animation: 'fadeInSubmenuItem 0.3s ease-out 0.1s both'
                        }}
                      >
                        {t.header.solutionsDropdown.websiteCreation}
                      </a>
                      <a 
                        href="#" 
                        onClick={() => setIsOpen(false)} 
                        className="text-sm text-[#1C1C1E]/70 hover:text-[#1C1C1E] py-1 transition-all duration-200 hover:translate-x-1"
                        style={{
                          animation: 'fadeInSubmenuItem 0.3s ease-out 0.15s both'
                        }}
                      >
                        {t.header.solutionsDropdown.softwareDevelopment}
                      </a>
                      <a 
                        href="#" 
                        onClick={() => setIsOpen(false)} 
                        className="text-sm text-[#1C1C1E]/70 hover:text-[#1C1C1E] py-1 transition-all duration-200 hover:translate-x-1"
                        style={{
                          animation: 'fadeInSubmenuItem 0.3s ease-out 0.2s both'
                        }}
                      >
                        {t.header.solutionsDropdown.artificialIntelligence}
                      </a>
                      <a 
                        href="#" 
                        onClick={() => setIsOpen(false)} 
                        className="text-sm text-[#1C1C1E]/70 hover:text-[#1C1C1E] py-1 transition-all duration-200 hover:translate-x-1"
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
              
              {navItems.filter(item => !navItemsWithDropdown.includes(item)).map((item) => (
                <a
                  key={item}
                  href="#"
                  onClick={() => setIsOpen(false)}
                  className="nav-item text-[#1C1C1E] hover:text-[#1C1C1E] font-medium text-base py-3 transition-colors"
                >
                  {item}
                </a>
              ))}
              
              {/* Separator */}
              <div className="h-px bg-[#E2E7F1] my-4 nav-item"></div>
              
              {/* Language Selector */}
              <Collapsible className="nav-item">
                <CollapsibleTrigger className="flex items-center justify-between w-full text-[#1C1C1E] hover:text-[#1C1C1E] font-medium text-base py-3 transition-colors group">
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    <span>{language === 'pt' ? t.header.languages.portuguese : t.header.languages.english}</span>
                  </div>
                  <ChevronDown className="h-4 w-4 transition-all duration-300 ease-out data-[state=open]:rotate-180 data-[state=open]:text-[#2869D6]" />
                </CollapsibleTrigger>
                <CollapsibleContent 
                  className="pl-4 pb-2 overflow-hidden"
                >
                  <div className="flex flex-col gap-2">
                    <a 
                      href="#" 
                      onClick={(e) => { e.preventDefault(); handleLanguageChange('pt'); }} 
                      className={`text-sm py-1 px-2 rounded transition-all duration-200 hover:translate-x-1 ${language === 'pt' ? 'text-[#1C1C1E] font-medium bg-slate-50' : 'text-[#1C1C1E]/70 hover:text-[#1C1C1E]'}`}
                      style={{
                        animation: 'fadeInSubmenuItem 0.3s ease-out 0.1s both'
                      }}
                    >
                      {t.header.languages.portuguese}
                    </a>
                    <a 
                      href="#" 
                      onClick={(e) => { e.preventDefault(); handleLanguageChange('en'); }} 
                      className={`text-sm py-1 px-2 rounded transition-all duration-200 hover:translate-x-1 ${language === 'en' ? 'text-[#1C1C1E] font-medium bg-slate-50' : 'text-[#1C1C1E]/70 hover:text-[#1C1C1E]'}`}
                      style={{
                        animation: 'fadeInSubmenuItem 0.3s ease-out 0.15s both'
                      }}
                    >
                      {t.header.languages.english}
                    </a>
                  </div>
                </CollapsibleContent>
              </Collapsible>
              
              {/* Falar com Especialista Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="nav-item mt-4 w-full bg-[#2869D6] hover:bg-[#1E4A8C] text-white font-medium text-base py-3 px-4 rounded-lg transition-colors"
              >
                {t.header.cta}
              </button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </SectionLayout>
  );
}
