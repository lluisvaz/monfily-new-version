// Lista de países lusófonos (excluindo Portugal que terá tratamento especial)
const PORTUGUESE_SPEAKING_COUNTRIES = [
  'AO', // Angola
  'BR', // Brasil
  'CV', // Cabo Verde
  'GW', // Guiné-Bissau
  'GQ', // Guiné Equatorial
  'MZ', // Moçambique
  'ST', // São Tomé e Príncipe
  'TL', // Timor-Leste
];

// Lista de países hispanofalantes
const SPANISH_SPEAKING_COUNTRIES = [
  'ES', // España
  'MX', // México
  'AR', // Argentina
  'CO', // Colombia
  'PE', // Perú
  'VE', // Venezuela
  'CL', // Chile
  'EC', // Ecuador
  'GT', // Guatemala
  'CU', // Cuba
  'BO', // Bolivia
  'DO', // República Dominicana
  'HN', // Honduras
  'PY', // Paraguay
  'SV', // El Salvador
  'NI', // Nicaragua
  'CR', // Costa Rica
  'PA', // Panamá
  'UY', // Uruguay
  'PR', // Puerto Rico
  'GQ', // Guinea Ecuatorial (también portugués)
];

export type Language = 'pt-br' | 'pt-pt' | 'en' | 'es';

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
 * Retorna 'pt-pt' se o país for Portugal, 'pt-br' se for outro país lusófono, 'en' caso contrário
 */
async function detectLanguageByLocation(): Promise<Language> {
  const countryCode = await detectCountryCode();

  if (countryCode) {
    const upperCode = countryCode.toUpperCase();
    // Portugal recebe pt-pt
    if (upperCode === 'PT') {
      return 'pt-pt';
    }
    // Outros países lusófonos recebem pt-br
    if (PORTUGUESE_SPEAKING_COUNTRIES.includes(upperCode)) {
      return 'pt-br';
    }
    // Países hispanofalantes recebem es
    if (SPANISH_SPEAKING_COUNTRIES.includes(upperCode)) {
      return 'es';
    }
  }

  return 'en';
}

/**
 * Detecta o idioma preferido do navegador
 * Útil como fallback se a API de IP falhar
 */
export function detectLanguageFromBrowser(): Language {
  if (typeof window === 'undefined') return 'pt-br';

  const browserLang = navigator.language || (navigator as any).userLanguage;

  if (browserLang) {
    const lang = browserLang.toLowerCase();
    // pt-PT ou pt (sem região) -> Português Portugal
    if (lang === 'pt-pt' || lang === 'pt') {
      return 'pt-pt';
    }
    // pt-BR -> Português Brasil
    if (lang.startsWith('pt')) {
      return 'pt-br';
    }
    // Espanhol -> es
    if (lang.startsWith('es')) {
      return 'es';
    }
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
      let language: Language = 'en';

      // Portugal recebe pt-pt
      if (upperCode === 'PT') {
        language = 'pt-pt';
      }
      // Outros países lusófonos recebem pt-br
      else if (PORTUGUESE_SPEAKING_COUNTRIES.includes(upperCode)) {
        language = 'pt-br';
      }
      // Países hispanofalantes recebem es
      else if (SPANISH_SPEAKING_COUNTRIES.includes(upperCode)) {
        language = 'es';
      }

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

