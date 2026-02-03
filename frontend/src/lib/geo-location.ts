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
    // Usar ipapi.co (gratuita, 1000 requisições/dia)
    // Timeout de 3 segundos para evitar espera longa
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    const response = await fetch('https://ipapi.co/json/', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error('Failed to fetch location from ipapi');
    }

    const data = await response.json();
    if (data.country_code) return data.country_code;
    throw new Error('No country code in response');
  } catch (error) {
    // Fallback para api.country.is
    try {
      const response = await fetch('https://api.country.is', { method: 'GET' });
      if (response.ok) {
        const data = await response.json();
        return data.country || null;
      }
    } catch (e) {
      // ignore
    }
    return null;
  }
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
function detectLanguageFromBrowser(): Language {
  if (typeof window === 'undefined') return 'pt';

  const browserLang = navigator.language || (navigator as any).userLanguage;
  
  // Verifica se o idioma do navegador começa com 'pt'
  if (browserLang && browserLang.toLowerCase().startsWith('pt')) {
    return 'pt';
  }

  return 'en';
}

/**
 * Função principal que detecta o idioma baseado na localização
 * Tenta primeiro pela API de IP, depois pelo navegador
 */
export async function detectLanguage(): Promise<Language> {
  try {
    // Tenta detectar pelo IP primeiro
    const ipLanguage = await detectLanguageByLocation();
    return ipLanguage;
  } catch (error) {
    console.warn('IP geolocation failed, using browser language as fallback:', error);
    // Fallback para detecção pelo navegador
    const browserLang = detectLanguageFromBrowser();
    return browserLang;
  }
}

