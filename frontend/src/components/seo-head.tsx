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
} as const;

const OG_LOCALE_BY_LANGUAGE = {
  'pt-br': 'pt_BR',
  'pt-pt': 'pt_PT',
  en: 'en_US',
  es: 'es_ES',
  it: 'it_IT',
  sg: 'en_SG',
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
    const socialImageUrl = new URL('/og.png', window.location.origin).toString();
    updateMetaTag('og:title', t.seo.title, 'property');
    updateMetaTag('og:description', t.seo.description, 'property');
    updateMetaTag('og:locale', OG_LOCALE_BY_LANGUAGE[language], 'property');
    updateMetaTag('og:type', 'website', 'property');
    updateMetaTag('og:url', window.location.href, 'property');
    updateMetaTag('og:image', socialImageUrl, 'property');
    updateMetaTag('og:image:width', '1200', 'property');
    updateMetaTag('og:image:height', '630', 'property');
    updateMetaTag('og:image:alt', 'Monfily — Google-first growth for U.S. home services', 'property');

    // Update Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', t.seo.title);
    updateMetaTag('twitter:description', t.seo.description);
    updateMetaTag('twitter:image', socialImageUrl);

    // Disable Google Translate automatic translation
    updateMetaTag('google', 'notranslate');
  }, [language, t]);

  return null;
}

