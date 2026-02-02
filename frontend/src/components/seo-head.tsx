import { useEffect } from 'react';
import { useLanguage } from '@/hooks/use-language';
import { translations } from '@/lib/translations';

export function SEOHead() {
  const { language } = useLanguage();
  const t = translations[language];

  useEffect(() => {
    // Update document title
    document.title = t.seo.title;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, attribute: string = 'name') => {
      let meta = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Update title meta
    updateMetaTag('title', t.seo.title);
    
    // Update description meta
    updateMetaTag('description', t.seo.description);

    // Update html lang attribute
    document.documentElement.lang = language === 'pt' ? 'pt-BR' : 'en-US';

    // Update Open Graph tags
    updateMetaTag('og:title', t.seo.title, 'property');
    updateMetaTag('og:description', t.seo.description, 'property');
    updateMetaTag('og:locale', language === 'pt' ? 'pt_BR' : 'en_US', 'property');

    // Update Twitter Card tags
    updateMetaTag('twitter:title', t.seo.title);
    updateMetaTag('twitter:description', t.seo.description);

    // Disable Google Translate automatic translation
    updateMetaTag('google', 'notranslate');
  }, [language, t]);

  return null;
}

