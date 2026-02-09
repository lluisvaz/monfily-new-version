import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useLocation } from 'wouter';
import type { Language } from '@/lib/translations';
import { detectLanguageFromBrowser, detectLocationData } from '@/lib/geo-location';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  isReady: boolean;
  detectedCountry: string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

/**
 * Detecta o idioma a partir do path da URL
 */
function getLanguageFromPath(path: string): Language | null {
  if (path.startsWith('/pt-pt')) return 'pt-pt';
  if (path.startsWith('/pt-br')) return 'pt-br';
  if (path.startsWith('/en')) return 'en';
  if (path.startsWith('/es')) return 'es';
  return null;
}

/**
 * Retorna o prefixo da rota para um idioma
 */
function getRoutePrefix(lang: Language): string {
  switch (lang) {
    case 'pt-pt': return '/pt-pt';
    case 'pt-br': return '/pt-br';
    case 'en': return '/en';
    case 'es': return '/es';
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [location, setLocation] = useLocation();
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      const pathLang = getLanguageFromPath(path);
      if (pathLang) return pathLang;
      // Fallback síncrono para o navegador se estivermos na raiz
      return detectLanguageFromBrowser();
    }
    return 'pt-br';
  });
  const [isReady, setIsReady] = useState(false);
  const [detectedCountry, setDetectedCountry] = useState<string>('');

  // Extract language from path and detect location if needed
  useEffect(() => {
    const pathLang = getLanguageFromPath(location);

    // Se ainda não estamos prontos, fazemos a detecção completa (IP + Idioma)
    if (!isReady) {
      detectLocationData().then(({ language: detectedLang, country }) => {
        if (country) {
          const upperCode = country.toUpperCase();
          setDetectedCountry(upperCode);
          console.log(`[LanguageProvider] Country detected: ${upperCode}`);
        }

        if (!pathLang && location === '/') {
          const newPath = getRoutePrefix(detectedLang);

          // Só redireciona se ainda estivermos na raiz
          if (location === '/') {
            setLocation(newPath);
            setLanguageState(detectedLang);
            // O próximo ciclo (com o novo path) marcará isReady como true via bloco 'else' abaixo
          }
        } else {
          // Se o path já tem idioma, sincronizamos o estado
          if (pathLang && language !== pathLang) {
            setLanguageState(pathLang);
          }
          setIsReady(true);
        }
      }).catch((e) => {
        console.error('[LanguageProvider] Detection failed:', e);
        if (!pathLang && location === '/') {
          setLocation('/pt-br');
          setLanguageState('pt-br');
        } else {
          setIsReady(true);
        }
      });
    }
  }, [location, setLocation, language, isReady]);

  const setLanguage = (lang: Language) => {
    // Remove current language prefix from path
    const currentPath = location.replace(/^\/(pt-pt|pt-br|en|es)/, '') || '/';
    const newPath = `${getRoutePrefix(lang)}${currentPath === '/' ? '' : currentPath}`;
    setLocation(newPath);
    setLanguageState(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, isReady, detectedCountry }}>
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
