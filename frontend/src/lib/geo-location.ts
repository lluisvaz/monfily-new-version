const PORTUGUESE_SPEAKING_COUNTRIES = [
  'AO',
  'BR',
  'CV',
  'GW',
  'GQ',
  'MZ',
  'ST',
  'TL',
];

const SPANISH_SPEAKING_COUNTRIES = [
  'ES',
  'MX',
  'AR',
  'CO',
  'PE',
  'VE',
  'CL',
  'EC',
  'GT',
  'CU',
  'BO',
  'DO',
  'HN',
  'PY',
  'SV',
  'NI',
  'CR',
  'PA',
  'UY',
  'PR',
  'GQ',
];

export type Language = 'pt-br' | 'pt-pt' | 'en' | 'es' | 'it' | 'sg';

function normalizeCountryCode(value?: string | null): string | null {
  const code = value?.trim().toUpperCase();
  return code && /^[A-Z]{2}$/.test(code) ? code : null;
}

export function getLanguageForCountry(countryCode?: string | null): Language {
  const upperCode = normalizeCountryCode(countryCode);

  if (upperCode === 'IT') return 'it';
  if (upperCode === 'SG') return 'sg';
  if (upperCode === 'PT') return 'pt-pt';
  if (upperCode && PORTUGUESE_SPEAKING_COUNTRIES.includes(upperCode)) return 'pt-br';
  if (upperCode && SPANISH_SPEAKING_COUNTRIES.includes(upperCode)) return 'es';

  return 'en';
}

export async function detectCountryCode(): Promise<string | null> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1500);

    const response = await fetch('https://ipapi.co/json/', {
      method: 'GET',
      headers: { Accept: 'application/json' },
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      const code = normalizeCountryCode(data.country_code);
      if (code) {
        return code;
      }
    }
  } catch {}

  try {
    const response = await fetch('https://freeipapi.com/api/json', { method: 'GET' });
    if (response.ok) {
      const data = await response.json();
      const code = normalizeCountryCode(data.countryCode);
      if (code) {
        return code;
      }
    }
  } catch {}

  try {
    const response = await fetch('https://api.country.is', { method: 'GET' });
    if (response.ok) {
      const data = await response.json();
      const code = normalizeCountryCode(data.country);
      if (code) {
        return code;
      }
    }
  } catch {}

  return null;
}

function detectCountryFromBrowserLocale(): string | null {
  if (typeof navigator === 'undefined') return null;

  const locales = [
    navigator.language,
    ...(Array.isArray(navigator.languages) ? navigator.languages : []),
  ].filter(Boolean);

  for (const locale of locales) {
    try {
      const region = typeof Intl.Locale === 'function'
        ? new Intl.Locale(locale).region
        : locale.split('-')[1];
      const code = normalizeCountryCode(region);
      if (code) return code;
    } catch (e) {}
  }

  return null;
}

export function detectLanguageFromBrowser(): Language {
  if (typeof window === 'undefined') return 'pt-br';

  const browserCountry = detectCountryFromBrowserLocale();
  if (browserCountry) return getLanguageForCountry(browserCountry);

  const browserLang = navigator.language || (navigator as any).userLanguage;

  if (browserLang) {
    const lang = browserLang.toLowerCase();
    if (lang === 'pt-pt' || lang === 'pt') return 'pt-pt';
    if (lang.startsWith('pt')) return 'pt-br';
    if (lang.startsWith('es')) return 'es';
    if (lang.startsWith('it')) return 'it';
    if (lang === 'en-sg') return 'sg';
  }

  return 'en';
}

export async function detectLocationData(): Promise<{ language: Language; country: string | null }> {
  try {
    const countryCode = await detectCountryCode();

    if (countryCode) {
      return { language: getLanguageForCountry(countryCode), country: countryCode };
    }
  } catch {}

  const browserCountry = detectCountryFromBrowserLocale();
  if (browserCountry) {
    return {
      language: getLanguageForCountry(browserCountry),
      country: browserCountry,
    };
  }

  return {
    language: detectLanguageFromBrowser(),
    country: null,
  };
}

export async function detectLanguage(): Promise<Language> {
  const { language } = await detectLocationData();
  return language;
}
