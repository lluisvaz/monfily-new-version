import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useLocation } from 'wouter';
import type { Language } from '@/lib/translations';
import { detectLanguage } from '@/lib/geo-location';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [location, setLocation] = useLocation();
  const [language, setLanguageState] = useState<Language>('pt');

  // Extract language from path and detect location if needed
  useEffect(() => {
    const pathLang = location.startsWith('/en') ? 'en' : location.startsWith('/pt') ? 'pt' : null;
    
    // If no language in path, detect location and redirect
    if (!pathLang && location === '/') {
      // Detecta o idioma pela localização sempre (sem cache)
      detectLanguage().then((detectedLang) => {
        const newPath = detectedLang === 'pt' ? '/pt' : '/en';
        setLocation(newPath);
        setLanguageState(detectedLang);
      }).catch(() => {
        // Em caso de erro, usa português como padrão
        setLocation('/pt');
        setLanguageState('pt');
      });
    } else if (pathLang) {
      setLanguageState(pathLang);
    }
  }, [location, setLocation]);

  const setLanguage = (lang: Language) => {
    // Remove current language prefix from path
    const currentPath = location.replace(/^\/(pt|en)/, '') || '/';
    const newPath = lang === 'pt' ? `/pt${currentPath}` : `/en${currentPath}`;
    setLocation(newPath);
    setLanguageState(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
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

