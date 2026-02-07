export const COUNTRY_TO_CURRENCY: Record<string, string> = {
  AF: 'AFN', AX: 'EUR', AL: 'ALL', DZ: 'DZD', AS: 'USD', AD: 'EUR', AO: 'AOA', AI: 'XCD', AQ: 'ANT', AG: 'XCD',
  AR: 'ARS', AM: 'AMD', AW: 'AWG', AU: 'AUD', AT: 'EUR', AZ: 'AZN', BS: 'BSD', BH: 'BHD', BD: 'BDT', BB: 'BBD',
  BY: 'BYN', BE: 'EUR', BZ: 'BZD', BJ: 'XOF', BM: 'BMD', BT: 'BTN', BO: 'BOB', BA: 'BAM', BW: 'BWP', BV: 'NOK',
  BR: 'BRL', IO: 'USD', BN: 'BND', BG: 'BGN', BF: 'XOF', BI: 'BIF', KH: 'KHR', CM: 'XAF', CA: 'CAD', CV: 'CVE',
  KY: 'KYD', CF: 'XAF', TD: 'XAF', CL: 'CLP', CN: 'CNY', CX: 'AUD', CC: 'AUD', CO: 'COP', KM: 'KMF', CG: 'XAF',
  CD: 'CDF', CK: 'NZD', CR: 'CRC', CI: 'XOF', HR: 'EUR', CU: 'CUP', CY: 'EUR', CZ: 'CZK', DK: 'DKK', DJ: 'DJF',
  DM: 'XCD', DO: 'DOP', EC: 'USD', EG: 'EGP', SV: 'USD', GQ: 'XAF', ER: 'ERN', EE: 'EUR', ET: 'ETB', FK: 'FKP',
  FO: 'DKK', FJ: 'FJD', FI: 'EUR', FR: 'EUR', GF: 'EUR', PF: 'XPF', TF: 'EUR', GA: 'XAF', GM: 'GMD', GE: 'GEL',
  DE: 'EUR', GH: 'GHS', GI: 'GIP', GR: 'EUR', GL: 'DKK', GD: 'XCD', GP: 'EUR', GU: 'USD', GT: 'GTQ', GG: 'GBP',
  GN: 'GNF', GW: 'XOF', GY: 'GYD', HT: 'HTG', HM: 'AUD', VA: 'EUR', HN: 'HNL', HK: 'HKD', HU: 'HUF', IS: 'ISK',
  IN: 'INR', ID: 'IDR', IR: 'IRR', IQ: 'IQD', IE: 'EUR', IM: 'GBP', IL: 'ILS', IT: 'EUR', JM: 'JMD', JP: 'JPY',
  JE: 'GBP', JO: 'JOD', KZ: 'KZT', KE: 'KES', KI: 'AUD', KP: 'KPW', KR: 'KRW', KW: 'KWD', KG: 'KGS', LA: 'LAK',
  LV: 'EUR', LB: 'LBP', LS: 'LSL', LR: 'LRD', LY: 'LYD', LI: 'CHF', LT: 'EUR', LU: 'EUR', MO: 'MOP', MK: 'MKD',
  MG: 'MGA', MW: 'MWK', MY: 'MYR', MV: 'MVR', ML: 'XOF', MT: 'EUR', MH: 'USD', MQ: 'EUR', MR: 'MRU', MU: 'MUR',
  YT: 'EUR', MX: 'MXN', FM: 'USD', MD: 'MDL', MC: 'EUR', MN: 'MNT', ME: 'EUR', MS: 'XCD', MA: 'MAD', MZ: 'MZN',
  MM: 'MMK', NA: 'NAD', NR: 'AUD', NP: 'NPR', NL: 'EUR', NC: 'XPF', NZ: 'NZD', NI: 'NIO', NE: 'XOF', NG: 'NGN',
  NU: 'NZD', NF: 'AUD', MP: 'USD', NO: 'NOK', OM: 'OMR', PK: 'PKR', PW: 'USD', PS: 'ILS', PA: 'PAB', PG: 'PGK',
  PY: 'PYG', PE: 'PEN', PH: 'PHP', PN: 'NZD', PL: 'PLN', PT: 'EUR', PR: 'USD', QA: 'QAR', RE: 'EUR', RO: 'RON',
  RU: 'RUB', RW: 'RWF', BL: 'EUR', SH: 'SHP', KN: 'XCD', LC: 'XCD', MF: 'EUR', PM: 'EUR', VC: 'XCD', WS: 'WST',
  SM: 'EUR', ST: 'STN', SA: 'SAR', SN: 'XOF', RS: 'RSD', SC: 'SCR', SL: 'SLL', SG: 'SGD', SK: 'EUR', SI: 'EUR',
  SB: 'SBD', SO: 'SOS', ZA: 'ZAR', GS: 'GBP', SS: 'SSP', ES: 'EUR', LK: 'LKR', SD: 'SDG', SR: 'SRD', SJ: 'NOK',
  SZ: 'SZL', SE: 'SEK', CH: 'CHF', SY: 'SYP', TW: 'TWD', TJ: 'TJS', TZ: 'TZS', TH: 'THB', TL: 'USD', TG: 'XOF',
  TK: 'NZD', TO: 'TOP', TT: 'TTD', TN: 'TND', TR: 'TRY', TM: 'TMT', TC: 'USD', TV: 'AUD', UG: 'UGX', UA: 'UAH',
  AE: 'AED', GB: 'GBP', US: 'USD', UM: 'USD', UY: 'UYU', UZ: 'UZS', VU: 'VUV', VE: 'VES', VN: 'VND', VG: 'USD',
  VI: 'USD', WF: 'XPF', EH: 'MAD', YE: 'YER', ZM: 'ZMW', ZW: 'ZWL'
};

/**
 * Taxas de conversão baseadas em 1 BRL.
 * Estes valores podem ser movidos para variáveis de ambiente futuramente.
 */
export const EXCHANGE_RATES: Record<string, number> = {
  BRL: 1.0,
  USD: 0.20,   // US Dollar
  EUR: 0.18,   // Euro
  GBP: 0.15,   // British Pound
  JPY: 30.0,   // Japanese Yen
  AUD: 0.30,   // Australian Dollar
  CAD: 0.27,   // Canadian Dollar
  CHF: 0.17,   // Swiss Franc
  CNY: 1.45,   // Chinese Yuan
  HKD: 1.55,   // Hong Kong Dollar
  NZD: 0.33,   // New Zealand Dollar
  SEK: 2.10,   // Swedish Krona
  KRW: 265.0,  // South Korean Won
  SGD: 0.27,   // Singapore Dollar
  NOK: 2.15,   // Norwegian Krone
  MXN: 3.40,   // Mexican Peso
  INR: 16.5,   // Indian Rupee
  ZAR: 3.75,   // South African Rand
  TRY: 6.50,   // Turkish Lira
  ILS: 0.74,   // Israeli New Shekel
  PLN: 0.80,   // Polish Zloty
  THB: 7.20,   // Thai Baht
  IDR: 3100.0, // Indonesian Rupiah
  CZK: 4.60,   // Czech Koruna
  CLP: 185.0,  // Chilean Peso
  PHP: 11.2,   // Philippine Peso
  AED: 0.73,   // UAE Dirham
  COP: 800.0,  // Colombian Peso
  SAR: 0.75,   // Saudi Riyal
  MYR: 0.95,   // Malaysian Ringgit
  RON: 0.90,   // Romanian Leu
  ARS: 170.0,  // Argentine Peso
  PYG: 1500.0, // Paraguayan Guarani
  UYU: 7.80,   // Uruguayan Peso
  PEN: 0.75,   // Peruvian Sol
};

/**
 * Converte um valor de BRL para a moeda desejada.
 * Se a taxa não estiver definida, usa USD como base intermediária.
 */
export function convertFromBRL(amountBRL: number, targetCurrency: string): number {
  const rate = EXCHANGE_RATES[targetCurrency.toUpperCase()];
  
  if (rate) {
    return amountBRL * rate;
  }

  // Se não temos a taxa direta, usamos USD como fallback proporcional
  // Assumindo que o valor internacional base é 20% do valor em BRL
  return amountBRL * EXCHANGE_RATES.USD;
}

export function getCurrencyForCountry(countryCode: string): string {
  return COUNTRY_TO_CURRENCY[countryCode.toUpperCase()] || 'USD';
}

/**
 * Formata um valor monetário de acordo com o idioma e a moeda.
 * Garante que o símbolo, posição e separadores estejam corretos.
 */
export function formatCurrency(amount: number, currencyCode: string, locale: string = 'pt-BR'): string {
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch (error) {
    console.error('Error formatting currency:', error);
    // Fallback simples
    const symbol = currencyCode === 'BRL' ? 'R$' : (currencyCode === 'USD' ? '$' : currencyCode);
    return `${symbol} ${amount.toLocaleString(locale)}`;
  }
}

export function getCurrencySymbol(currencyCode: string, locale: string = 'en-US'): string {
  try {
    const formatter = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    
    const parts = formatter.formatToParts(0);
    const symbolPart = parts.find(part => part.type === 'currency');
    return symbolPart ? symbolPart.value : (currencyCode === 'USD' ? '$' : currencyCode);
  } catch (error) {
    console.error('Error getting currency symbol:', error);
    return currencyCode === 'BRL' ? 'R$' : (currencyCode === 'USD' ? '$' : currencyCode);
  }
}
