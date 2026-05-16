import { useEffect } from 'react';
import { useLanguage } from '@/hooks/use-language';
import { translations } from '@/lib/translations';

const HTML_LANG_BY_LANGUAGE = {
  'pt-br': 'pt-BR',
  'pt-pt': 'pt-PT',
  en: 'en-US',
  es: 'es-ES',
  it: 'it-IT',
  sg: 'en-SG',
  he: 'he-IL',
} as const;

const OG_LOCALE_BY_LANGUAGE = {
  'pt-br': 'pt_BR',
  'pt-pt': 'pt_PT',
  en: 'en_US',
  es: 'es_ES',
  it: 'it_IT',
  sg: 'en_SG',
  he: 'he_IL',
} as const;

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
    document.documentElement.lang = HTML_LANG_BY_LANGUAGE[language];
    document.documentElement.dir = 'ltr';

    // Update Open Graph tags
    updateMetaTag('og:title', t.seo.title, 'property');
    updateMetaTag('og:description', t.seo.description, 'property');
    updateMetaTag('og:locale', OG_LOCALE_BY_LANGUAGE[language], 'property');

    // Update Twitter Card tags
    updateMetaTag('twitter:title', t.seo.title);
    updateMetaTag('twitter:description', t.seo.description);

    // Disable Google Translate automatic translation
    updateMetaTag('google', 'notranslate');
  }, [language, t]);

  return null;
}

