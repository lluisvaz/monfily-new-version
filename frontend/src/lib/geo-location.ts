// Lista de países lusófonos
const PORTUGUESE_SPEAKING_COUNTRIES = [
  'AO', // Angola
  'BR', // Brasil
  'CV', // Cabo Verde
  'GW', // Guiné-Bissau
  'GQ', // Guiné Equatorial
  'MZ', // Moçambique
  'PT', // Portugal
  'ST', // São Tomé e Príncipe
  'TL', // Timor-Leste
];

export type Language = 'pt' | 'en';

/**
 * Detecta o país do usuário usando uma API de geolocalização por IP
 */
export async function detectCountryCode(): Promise<string | null> {
  try {
    // 1. Tentar ipapi.co (gratuita, 1000 requisições/dia)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    const response = await fetch('https://ipapi.co/json/', {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      if (data.country_code) return data.country_code.toUpperCase();
    }
  } catch (error) {
    console.warn('ipapi.co failed, trying next service...');
  }

  try {
    // 2. Tentar freeipapi.com (gratuito, HTTPS)
    const response = await fetch('https://freeipapi.com/api/json', { method: 'GET' });
    if (response.ok) {
      const data = await response.json();
      if (data.countryCode) return data.countryCode.toUpperCase();
    }
  } catch (error) {
    console.warn('freeipapi.com failed, trying next service...');
  }

  try {
    // 3. Tentar api.country.is
    const response = await fetch('https://api.country.is', { method: 'GET' });
    if (response.ok) {
      const data = await response.json();
      return data.country ? data.country.toUpperCase() : null;
    }
  } catch (e) {
    console.warn('All geolocation services failed.');
  }

  return null;
}

/**
 * Detecta o idioma baseado na localização (usando o código do país)
 * Retorna 'pt' se o país for lusófono, 'en' caso contrário
 */
async function detectLanguageByLocation(): Promise<Language> {
  const countryCode = await detectCountryCode();

  if (countryCode && PORTUGUESE_SPEAKING_COUNTRIES.includes(countryCode.toUpperCase())) {
    return 'pt';
  }

  return 'en';
}

/**
 * Detecta o idioma preferido do navegador
 * Útil como fallback se a API de IP falhar
 */
export function detectLanguageFromBrowser(): Language {
  if (typeof window === 'undefined') return 'pt';

  const browserLang = navigator.language || (navigator as any).userLanguage;
  
  // Verifica se o idioma do navegador começa com 'pt'
  if (browserLang && browserLang.toLowerCase().startsWith('pt')) {
    return 'pt';
  }

  return 'en';
}

/**
 * Função principal que detecta o idioma e o país baseado na localização
 * Tenta primeiro pela API de IP, depois pelo navegador
 */
export async function detectLocationData(): Promise<{ language: Language; country: string | null }> {
  try {
    const countryCode = await detectCountryCode();
    
    if (countryCode) {
      const upperCode = countryCode.toUpperCase();
      const language = PORTUGUESE_SPEAKING_COUNTRIES.includes(upperCode) ? 'pt' : 'en';
      return { language, country: upperCode };
    }
  } catch (error) {
    console.warn('IP geolocation failed, using browser language as fallback:', error);
  }

  // Fallback para detecção pelo navegador
  return { 
    language: detectLanguageFromBrowser(), 
    country: null 
  };
}

/**
 * Função legado para manter compatibilidade, se necessário
 */
export async function detectLanguage(): Promise<Language> {
  const { language } = await detectLocationData();
  return language;
}

