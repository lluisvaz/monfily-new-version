import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useLocation } from 'wouter';
import type { Language } from '@/lib/translations';
import { detectLanguage, detectLanguageFromBrowser } from '@/lib/geo-location';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  isReady: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [location, setLocation] = useLocation();
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      if (path.startsWith('/en')) return 'en';
      if (path.startsWith('/pt')) return 'pt';
      // Fallback síncrono para o navegador se estivermos na raiz
      return detectLanguageFromBrowser();
    }
    return 'pt';
  });
  const [isReady, setIsReady] = useState(false);

  // Extract language from path and detect location if needed
  useEffect(() => {
    const pathLang = location.startsWith('/en') ? 'en' : location.startsWith('/pt') ? 'pt' : null;
    
    // Se não houver idioma no path e estivermos na raiz, detectamos via IP (mais preciso)
    if (!pathLang && location === '/') {
      detectLanguage().then((detectedLang) => {
        const newPath = detectedLang === 'pt' ? '/pt' : '/en';
        
        // Só redireciona se ainda estivermos na raiz
        if (location === '/') {
          setLocation(newPath);
          setLanguageState(detectedLang);
          // Não marcamos isReady como true aqui, deixamos o próximo ciclo (com o novo path) fazer isso
        }
      }).catch(() => {
        // Em caso de erro, usa português como padrão
        if (location === '/') {
          setLocation('/pt');
          setLanguageState('pt');
        }
      });
    } else if (pathLang) {
      // Se o path já tem idioma, sincronizamos o estado e marcamos como pronto
      if (language !== pathLang) {
        setLanguageState(pathLang);
      }
      setIsReady(true);
    } else {
      // Para outras rotas, marcamos como pronto para não travar o app
      setIsReady(true);
    }
  }, [location, setLocation, language]);

  const setLanguage = (lang: Language) => {
    // Remove current language prefix from path
    const currentPath = location.replace(/^\/(pt|en)/, '') || '/';
    const newPath = lang === 'pt' ? `/pt${currentPath}` : `/en${currentPath}`;
    setLocation(newPath);
    setLanguageState(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, isReady }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

