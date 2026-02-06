import { useMemo, useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/hooks/use-language';
import type { Language } from '@/lib/translations';
import { ArrowRight, ArrowLeft, Check, SystemRestart, WarningCircle, NavArrowDown, Search } from 'iconoir-react';
import { detectCountryCode } from '@/lib/geo-location';
import { SpotlightButton } from '@/components/ui/spotlight-button';
import { AsYouType, getExampleNumber, type CountryCode } from 'libphonenumber-js';
import examples from 'libphonenumber-js/examples.mobile.json';

export type LeadFormData = {
  name: string;
  email: string;
  phone?: string;
  country?: string;
  company?: string;
  website?: string;
  services?: ('website' | 'software' | 'ai' | 'seo' | 'other')[];
  budget?: 'lt5k' | '5to15' | '15to30' | 'gt30' | 'undecided';
  timeframe?: 'urgent' | '1to2' | '3to6' | 'flexible';
  message?: string;
  language?: string;
};

export interface LeadFormProps {
  onSubmit?: (data: LeadFormData) => void | Promise<void>;
  className?: string;
}

const copy = {
  pt: {
    title: 'Comece seu projeto',
    subtitle: 'Deixe seus dados e retornamos em até 1 dia útil.',
    steps: ['Contato', 'Negócio', 'Interesse'],
    labels: {
      name: 'Nome completo',
      email: 'E-mail',
      phone: 'Telefone',
      country: 'País',
      company: 'Empresa',
      website: 'Website (opcional)',
      service: 'Qual serviço procura?',
      budget: 'Orçamento estimado',
      timeframe: 'Prazo desejado',
      message: 'Contexto do projeto'
    },
    services: {
      website: 'Criação de Site',
      software: 'Software Sob Medida',
      ai: 'Automação com IA',
      seo: 'SEO Técnico',
      other: 'Personalizado'
    },
    budgets: {
      lt5k: 'Até R$ 5 mil',
      '5to15': 'R$ 5–15 mil',
      '15to30': 'R$ 15–30 mil',
      gt30: 'Acima de R$ 30 mil',
      undecided: 'A definir'
    },
    timeframes: {
      urgent: 'Urgente (até 2 semanas)',
      '1to2': '1–2 meses',
      '3to6': '3–6 meses',
      flexible: 'Flexível'
    },
    actions: {
      next: 'Continuar',
      back: 'Voltar',
      submit: 'Enviar'
    },
    error: 'Ops! Ocorreu um erro ao tentar enviar o formulário. Tente novamente.',
    limitEmail: 'Você já enviou um formulário com este e-mail nas últimas 24 horas.',
    limitDevice: 'Envios excessivos detectados. Este dispositivo está bloqueado por 15 dias para evitar abusos.',
    success: 'Pronto! Recebemos seus dados.'
  },
  en: {
    title: 'Start your project',
    subtitle: 'Leave your details and we’ll reply within 1 business day.',
    steps: ['Contact', 'Business', 'Interest'],
    labels: {
      name: 'Full name',
      email: 'Email',
      phone: 'Phone',
      country: 'Country',
      company: 'Company',
      website: 'Website (optional)',
      service: 'What do you need?',
      budget: 'Estimated budget',
      timeframe: 'Desired timeframe',
      message: 'Project context'
    },
    services: {
      website: 'Website Creation',
      software: 'Custom Software',
      ai: 'AI Automation',
      seo: 'Technical SEO',
      other: 'Custom'
    },
    budgets: {
      lt5k: 'Up to $1k',
      '5to15': '$1k–3k',
      '15to30': '$3k–6k',
      gt30: 'Over $6k',
      undecided: 'Undecided'
    },
    timeframes: {
      urgent: 'Urgent (up to 2 weeks)',
      '1to2': '1–2 months',
      '3to6': '3–6 months',
      flexible: 'Flexible'
    },
    actions: {
      next: 'Continue',
      back: 'Back',
      submit: 'Send'
    },
    error: 'Oops! An error occurred while trying to send the form. Please try again.',
    limitEmail: 'You have already submitted a form with this email in the last 24 hours.',
    limitDevice: 'Excessive submissions detected. This device is blocked for 15 days to prevent abuse.',
    success: 'Done! We received your info.'
  }
} as const;

const initialData: LeadFormData = {
  name: '',
  email: '',
  phone: '',
  country: '',
  company: '',
  website: '',
  services: [],
  budget: undefined,
  timeframe: undefined,
  message: '',
  language: 'pt'
};

// ISO 3166-1 alpha-2 to E.164 country calling codes
const COUNTRY_CALLING_CODES: Record<string, string> = {
  AF: '+93', AL: '+355', DZ: '+213', AS: '+1', AD: '+376', AO: '+244', AI: '+1', AG: '+1', AR: '+54', AM: '+374', AW: '+297', AU: '+61', AT: '+43', AZ: '+994', BS: '+1', BH: '+973', BD: '+880', BB: '+1', BY: '+375', BE: '+32', BZ: '+501', BJ: '+229', BM: '+1', BT: '+975', BO: '+591', BA: '+387', BW: '+267', BR: '+55', IO: '+246', VG: '+1', BN: '+673', BG: '+359', BF: '+226', BI: '+257', KH: '+855', CM: '+237', CA: '+1', CV: '+238', KY: '+1', CF: '+236', TD: '+235', CL: '+56', CN: '+86', CX: '+61', CC: '+61', CO: '+57', KM: '+269', CK: '+682', CR: '+506', HR: '+385', CU: '+53', CW: '+599', CY: '+357', CZ: '+420', CD: '+243', DK: '+45', DJ: '+253', DM: '+1', DO: '+1', EC: '+593', EG: '+20', SV: '+503', GQ: '+240', ER: '+291', EE: '+372', ET: '+251', FK: '+500', FO: '+298', FJ: '+679', FI: '+358', FR: '+33', GF: '+594', PF: '+689', GA: '+241', GM: '+220', GE: '+995', DE: '+49', GH: '+233', GI: '+350', GR: '+30', GL: '+299', GD: '+1', GP: '+590', GU: '+1', GT: '+502', GG: '+44', GN: '+224', GW: '+245', GY: '+592', HT: '+509', HN: '+504', HK: '+852', HU: '+36', IS: '+354', IN: '+91', ID: '+62', IR: '+98', IQ: '+964', IE: '+353', IM: '+44', IL: '+972', IT: '+39', CI: '+225', JM: '+1', JP: '+81', JE: '+44', JO: '+962', KZ: '+7', KE: '+254', KI: '+686', KW: '+965', KG: '+996', LA: '+856', LV: '+371', LB: '+961', LS: '+266', LR: '+231', LY: '+218', LI: '+423', LT: '+370', LU: '+352', MO: '+853', MK: '+389', MG: '+261', MW: '+265', MY: '+60', MV: '+960', ML: '+223', MT: '+356', MH: '+692', MQ: '+596', MR: '+222', MU: '+230', YT: '+262', MX: '+52', FM: '+691', MD: '+373', MC: '+377', MN: '+976', ME: '+382', MS: '+1', MA: '+212', MZ: '+258', MM: '+95', NA: '+264', NR: '+674', NP: '+977', NL: '+31', NC: '+687', NZ: '+64', NI: '+505', NE: '+227', NG: '+234', NU: '+683', NF: '+672', KP: '+850', MP: '+1', NO: '+47', OM: '+968', PK: '+92', PW: '+680', PS: '+970', PA: '+507', PG: '+675', PY: '+595', PE: '+51', PH: '+63', PN: '+870', PL: '+48', PT: '+351', PR: '+1', QA: '+974', RE: '+262', RO: '+40', RU: '+7', RW: '+250', BL: '+590', SH: '+290', KN: '+1', LC: '+1', MF: '+590', PM: '+508', VC: '+1', WS: '+685', SM: '+378', ST: '+239', SA: '+966', SN: '+221', RS: '+381', SC: '+248', SL: '+232', SG: '+65', SX: '+1', SK: '+421', SI: '+386', SB: '+677', SO: '+252', ZA: '+27', GS: '+500', KR: '+82', SS: '+211', ES: '+34', LK: '+94', SD: '+249', SR: '+597', SJ: '+47', SZ: '+268', SE: '+46', CH: '+41', SY: '+963', TW: '+886', TJ: '+992', TZ: '+255', TH: '+66', TL: '+670', TG: '+228', TK: '+690', TO: '+676', TT: '+1', TN: '+216', TR: '+90', TM: '+993', TC: '+1', TV: '+688', UG: '+256', UA: '+380', AE: '+971', GB: '+44', US: '+1', UY: '+598', VI: '+1', UZ: '+998', VU: '+678', VA: '+379', VE: '+58', VN: '+84', WF: '+681', EH: '+212', YE: '+967', ZM: '+260', ZW: '+263'
};

function getDialCode(country?: string) {
  return country ? COUNTRY_CALLING_CODES[country] || '' : '';
}

export default function LeadForm({ onSubmit, className }: LeadFormProps) {
  const { language } = useLanguage();
  const t = copy[language as Language] ?? copy.pt;

  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState(false);
  const [limitError, setLimitError] = useState<string | null>(null);
  const [data, setData] = useState<LeadFormData>(initialData);
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const countryRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);

  const isPhoneFocused = useRef(false);

  // Check for device block on mount
  useEffect(() => {
    try {
      const history = JSON.parse(localStorage.getItem('monfily_form_history') || '{}');
      if (history.blockedUntil && new Date().getTime() < history.blockedUntil) {
        setLimitError(t.limitDevice);
      }
    } catch (e) {
      console.error('Error reading form history:', e);
    }
  }, [t.limitDevice]);

  // Clear email limit error when email changes
  useEffect(() => {
    if (limitError === t.limitEmail) {
      setLimitError(null);
    }
  }, [data.email, t.limitEmail, limitError]);

  const placeholders = useMemo(() => (
    language === 'pt'
      ? {
          name: 'João Silva',
          email: 'joao@email.com',
          company: 'Minha Empresa Ltda',
          website: 'https://suaempresa.com',
          message: 'Conte brevemente sobre seu projeto.'
        }
      : {
          name: 'Jane Doe',
          email: 'jane@email.com',
          company: 'My Company LLC',
          website: 'https://yourcompany.com',
          message: 'Tell us briefly about your project.'
        }
  ), [language]);

  const phonePlaceholder = useMemo(() => {
    const countryCode = data.country as CountryCode;
    if (countryCode) {
      try {
        const example = getExampleNumber(countryCode, examples);
        if (example) {
          return example.formatInternational();
        }
      } catch (e) {
        console.error('Error getting example number:', e);
      }
    }
    const prefix = getDialCode(data.country) || (language === 'pt' ? '+55' : '+1');
    return language === 'pt' ? `${prefix} 11 91234-5678` : `${prefix} (555) 000-0000`;
  }, [language, data.country]);

  const handlePhoneInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    
    // Garantir que comece com +
    if (!value.startsWith('+')) {
      value = '+' + value.replace(/\D/g, '');
    }

    // Se for apenas "+", permitir
    if (value === '+') {
      setData((d) => ({ ...d, phone: '+' }));
      return;
    }

    // Usar AsYouType para formatar
    const asYouType = new AsYouType(data.country as CountryCode);
    let formatted = asYouType.input(value);
    const detectedCountry = asYouType.getCountry();

    // Se o país for detectado e for diferente do atual, atualiza
    let finalCountry = detectedCountry || data.country;

    // Limitar o comprimento
    const digitsOnly = value.replace(/\D/g, '');
    let maxDigits = 15; // E.164 max fallback

    if (finalCountry) {
      try {
        const example = getExampleNumber(finalCountry as CountryCode, examples);
        if (example) {
          maxDigits = example.formatInternational().replace(/\D/g, '').length;
        }
      } catch (e) {
        // use fallback 15
      }
    }

    if (digitsOnly.length > maxDigits) {
      const keptDigits = digitsOnly.substring(0, maxDigits);
      // Re-formatar com os dígitos limitados
      const freshAsYouType = new AsYouType(finalCountry as CountryCode);
      formatted = freshAsYouType.input('+' + keptDigits);
    }

    setData((d) => ({ 
      ...d, 
      phone: formatted,
      country: finalCountry || d.country 
    }));
  };

  const handlePhoneKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    const caretPos = input.selectionStart ?? 0;

    // Impedir apagar o "+"
    if (e.key === 'Backspace' && caretPos === 1 && input.value === '+') {
      e.preventDefault();
    }
  };

  // Ensure phone always starts with country dial code when country changes
  useEffect(() => {
    if (isPhoneFocused.current) return;
    
    const prefix = getDialCode(data.country);
    if (!prefix) return;

    setData((d) => {
      const current = d.phone ?? '';
      if (current.startsWith(prefix)) return d;
      const rest = current.replace(/^\+[\d\s()\-]*/, '').trim();
      const next = `${prefix}${rest ? ' ' + rest : ''}`;
      return { ...d, phone: next };
    });
  }, [data.country]);

  // Auto-detect country on mount
  useEffect(() => {
    const autoDetect = async () => {
      try {
        const code = await detectCountryCode();
        if (code) {
          setData((prev) => {
            // Se o usuário já selecionou algo ou já foi preenchido, mantém
            if (prev.country && prev.country !== '') return prev;
            return { ...prev, country: code.toUpperCase() };
          });
        }
      } catch (err) {
        console.error('Error auto-detecting country:', err);
      }
    };
    autoDetect();
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    setData(prev => ({ ...prev, language }));
  }, [language]);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isCountryOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    } else if (!isCountryOpen) {
      setSearchTerm('');
    }
  }, [isCountryOpen]);

  // Close country dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (countryRef.current && !countryRef.current.contains(event.target as Node)) {
        setIsCountryOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Countries list (ISO 3166-1 alpha-2)
  const countryCodes = useMemo<string[]>(() => {
    return [
      'AF', 'AL', 'DZ', 'AD', 'AO', 'AG', 'AR', 'AM', 'AU', 'AT', 'AZ', 'BS', 'BH', 'BD', 'BB', 'BY', 'BE', 'BZ', 'BJ', 'BT', 'BO', 'BA', 'BW', 'BR', 'BN', 'BG', 'BF', 'BI', 'KH', 'CM', 'CA', 'CV', 'CF', 'TD', 'CL', 'CN', 'CO', 'KM', 'CG', 'CD', 'CR', 'CI', 'HR', 'CU', 'CY', 'CZ', 'DK', 'DJ', 'DM', 'DO', 'EC', 'EG', 'SV', 'GQ', 'ER', 'EE', 'SZ', 'ET', 'FJ', 'FI', 'FR', 'GA', 'GM', 'GE', 'DE', 'GH', 'GR', 'GD', 'GT', 'GN', 'GW', 'GY', 'HT', 'HN', 'HU', 'IS', 'IN', 'ID', 'IR', 'IQ', 'IE', 'IL', 'IT', 'JM', 'JP', 'JO', 'KZ', 'KE', 'KI', 'KP', 'KR', 'KW', 'KG', 'LA', 'LV', 'LB', 'LS', 'LR', 'LY', 'LI', 'LT', 'LU', 'MG', 'MW', 'MY', 'MV', 'ML', 'MT', 'MH', 'MR', 'MU', 'MX', 'FM', 'MD', 'MC', 'MN', 'ME', 'MA', 'MZ', 'MM', 'NA', 'NR', 'NP', 'NL', 'NZ', 'NI', 'NE', 'NG', 'NO', 'OM', 'PK', 'PW', 'PA', 'PG', 'PY', 'PE', 'PH', 'PL', 'PT', 'QA', 'RO', 'RU', 'RW', 'KN', 'LC', 'VC', 'WS', 'SM', 'ST', 'SA', 'SN', 'RS', 'SC', 'SL', 'SG', 'SK', 'SI', 'SB', 'SO', 'ZA', 'ES', 'LK', 'SD', 'SR', 'SE', 'CH', 'SY', 'TJ', 'TZ', 'TH', 'TL', 'TG', 'TO', 'TT', 'TN', 'TR', 'TM', 'TV', 'UG', 'UA', 'AE', 'GB', 'US', 'UY', 'UZ', 'VU', 'VE', 'VN', 'YE', 'ZM', 'ZW'
    ];
  }, []);

  const regionDisplay = useMemo(() => {
    try {
      return new Intl.DisplayNames([language === 'pt' ? 'pt-BR' : 'en-US'], { type: 'region' });
    } catch {
      return null;
    }
  }, [language]);

  const countries = useMemo(() =>
    countryCodes
      .filter((code) => /^[A-Z]{2}$/.test(code))
      .map((code) => ({ code, name: regionDisplay?.of(code) || code }))
      .sort((a, b) => a.name.localeCompare(b.name))
  , [countryCodes, regionDisplay]);

  const filteredCountries = useMemo(() => {
    if (!searchTerm) return countries;
    const lowerSearch = searchTerm.toLowerCase();
    return countries.filter(c => 
      c.name.toLowerCase().includes(lowerSearch) || 
      c.code.toLowerCase().includes(lowerSearch)
    );
  }, [countries, searchTerm]);


  const canNext = useMemo(() => {
    if (step === 0) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isValidEmail = emailRegex.test(data.email || '');
      return Boolean(data.name && isValidEmail && data.phone && data.country);
    }
    if (step === 1) {
      const isValidWebsite = !data.website || data.website.startsWith('https://');
      return Boolean(data.company && data.message && isValidWebsite);
    }
    if (step === 2) return Boolean((data.services && data.services.length > 0) && data.budget && data.timeframe);
    return false;
  }, [step, data]);

  const handleSubmit = async () => {
    // Check limits again before starting
    const history = JSON.parse(localStorage.getItem('monfily_form_history') || '{}');
    const now = new Date().getTime();

    if (history.blockedUntil && now < history.blockedUntil) {
      setLimitError(t.limitDevice);
      return;
    }

    const emailKey = data.email.toLowerCase().trim();
    if (history.emails && history.emails[emailKey]) {
      const lastSubmission = history.emails[emailKey];
      const twentyFourHours = 24 * 60 * 60 * 1000;
      if (now - lastSubmission < twentyFourHours) {
        setLimitError(t.limitEmail);
        return;
      }
    }

    try {
      setSubmitting(true);
      setError(false);
      setLimitError(null);
      
      if (onSubmit) {
        await onSubmit(data);
      } else {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          const contentType = response.headers.get("content-type");
          let errorData;
          if (contentType && contentType.includes("application/json")) {
            errorData = await response.json().catch(() => ({}));
          } else {
            const text = await response.text().catch(() => "Could not read response body");
            errorData = { message: `Server error (${response.status}): ${text}` };
          }
          console.error('Server validation error details:', errorData);
          throw new Error(errorData.message || 'Failed to submit form');
        }

        const result = await response.json();
        console.log('Form submission successful:', result);
      }
      
      // Update history on success
      const newHistory = {
        ...history,
        emails: {
          ...(history.emails || {}),
          [emailKey]: now
        },
        deviceSubmissions: (history.deviceSubmissions || 0) + 1
      };

      // If sent more than 3 times (successful 4th submission will trigger this if we use >= 3)
      // Actually "mais de 3 vezes" means the 4th one.
      if (newHistory.deviceSubmissions >= 3) {
        const fifteenDays = 15 * 24 * 60 * 60 * 1000;
        newHistory.blockedUntil = now + fifteenDays;
        // We set limitError so the UI shows it immediately after success
        setLimitError(t.limitDevice);
      }

      localStorage.setItem('monfily_form_history', JSON.stringify(newHistory));

      setDone(true);
      
      // Volta para a primeira etapa após 5 segundos
      setTimeout(() => {
        setDone(false);
        setStep(0);
        setData({ ...initialData, language });
      }, 5000);
      
    } catch (err) {
      console.error('Error submitting form:', err);
      setError(true);
    } finally {
      setSubmitting(false);
    }
  };

  const baseCard = 'border border-[#E2E7F1] bg-white rounded-sm';
  const inputClass = 'w-full px-3 py-2 rounded-sm border border-[#E2E7F1] focus:outline-none focus:ring-2 focus:ring-[#2869D6]/30 focus:border-[#2869D6] placeholder-slate-400';
  const labelClass = 'text-sm text-[#1C1C1E]';

  return (
    <div className="flex flex-col w-full">
      <div className={`${baseCard} ${className ?? ''}`}>
      {/* Header */}
      <div className="px-5 py-4 border-b border-[#E2E7F1]">
        <div className="text-base md:text-lg text-[#1C1C1E] mb-1" style={{ fontFamily: 'Fustat-Bold, sans-serif' }}>{t.title}</div>
        <div className="text-sm text-[#6B7280] leading-snug">{t.subtitle}</div>
        {/* Steps */}
        <div className="mt-4 flex items-center gap-2">
          {t.steps.map((label, idx) => (
            <div key={label} className="flex-1 flex items-center gap-2">
              <div className={`h-1 w-full ${idx <= step ? 'bg-[#2869D6]' : 'bg-[#E2E7F1]'}`} />
            </div>
          ))}
        </div>
      </div>

      {/* Body */}
      {!done ? (
        <div className="px-5 py-5 grid gap-4">
          {step === 0 && (
            <>
              <div className="grid gap-2">
                <label className={labelClass}>{t.labels.name}</label>
                <input
                  type="text"
                  required
                  className={inputClass}
                  value={data.name}
                  onChange={(e) => setData((d) => ({ ...d, name: e.target.value }))}
                  placeholder={placeholders.name}
                />
              </div>
              <div className="grid gap-2">
                <label className={labelClass}>{t.labels.email}</label>
                <input
                  type="email"
                  required
                  className={inputClass}
                  value={data.email}
                  onChange={(e) => setData((d) => ({ ...d, email: e.target.value }))}
                  onBlur={() => {
                    if (!data.email) return;
                    try {
                      const history = JSON.parse(localStorage.getItem('monfily_form_history') || '{}');
                      const emailKey = data.email.toLowerCase().trim();
                      if (history.emails && history.emails[emailKey]) {
                        const lastSubmission = history.emails[emailKey];
                        const twentyFourHours = 24 * 60 * 60 * 1000;
                        if (new Date().getTime() - lastSubmission < twentyFourHours) {
                          setLimitError(t.limitEmail);
                        }
                      }
                    } catch (e) {
                      console.error('Error checking email history:', e);
                    }
                  }}
                  placeholder={placeholders.email}
                />
              </div>
              <div className="grid gap-2">
                <label className={labelClass}>{t.labels.phone}</label>
                <input
                  ref={phoneInputRef}
                  type="tel"
                  required
                  className={inputClass}
                  value={data.phone ?? ''}
                  onChange={handlePhoneInputChange}
                  onKeyDown={handlePhoneKeyDown}
                  onFocus={() => { isPhoneFocused.current = true; }}
                  onBlur={() => { isPhoneFocused.current = false; }}
                  placeholder={phonePlaceholder}
                />
              </div>
              <div className="grid gap-2 relative" ref={countryRef}>
                <label className={labelClass}>{t.labels.country}</label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsCountryOpen(!isCountryOpen)}
                    className={`${inputClass} flex items-center justify-between bg-white text-left cursor-pointer`}
                  >
                    <span className="flex items-center gap-2">
                      {data.country ? (
                        <>
                          <img 
                            src={`https://flagcdn.com/w20/${data.country.toLowerCase()}.png`} 
                            alt="" 
                            className="w-5 h-auto rounded-sm"
                          />
                          {countries.find(c => c.code === data.country)?.name}
                        </>
                      ) : (
                        <span className="text-slate-400">
                          {language === 'pt' ? 'Selecione um país' : 'Select a country'}
                        </span>
                      )}
                    </span>
                    <NavArrowDown className={`w-4 h-4 text-slate-400 transition-transform ${isCountryOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isCountryOpen && (
                    <div className="absolute z-50 w-full mt-1 bg-white border border-[#E2E7F1] rounded-sm shadow-lg max-h-60 overflow-y-auto">
                      <div className="sticky top-0 bg-white p-2 border-b border-[#E2E7F1] z-10">
                        <div className="relative">
                          <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input
                            ref={searchInputRef}
                            type="text"
                            className="w-full pl-8 pr-3 py-1.5 text-sm bg-slate-50 border border-[#E2E7F1] rounded-sm focus:outline-none focus:ring-1 focus:ring-[#2869D6] focus:border-[#2869D6]"
                            placeholder={language === 'pt' ? 'Pesquisar país...' : 'Search country...'}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                          />
                        </div>
                      </div>
                      {filteredCountries.length > 0 ? (
                        filteredCountries.map((c) => (
                          <button
                            key={c.code}
                            type="button"
                            className="w-full px-3 py-2 flex items-center gap-2 hover:bg-slate-50 text-sm text-left cursor-pointer"
                            onClick={() => {
                              setData((d) => ({ ...d, country: c.code }));
                              setIsCountryOpen(false);
                            }}
                          >
                            <img 
                              src={`https://flagcdn.com/w20/${c.code.toLowerCase()}.png`} 
                              alt="" 
                              className="w-5 h-auto rounded-sm"
                            />
                            {c.name}
                          </button>
                        ))
                      ) : (
                        <div className="px-3 py-4 text-sm text-slate-400 text-center">
                          {language === 'pt' ? 'Nenhum país encontrado' : 'No country found'}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <div className="grid gap-2">
                <label className={labelClass}>{t.labels.company}</label>
                <input
                  type="text"
                  required
                  className={inputClass}
                  value={data.company ?? ''}
                  onChange={(e) => setData((d) => ({ ...d, company: e.target.value }))}
                  placeholder={placeholders.company}
                />
              </div>
              <div className="grid gap-2">
                <label className={labelClass}>{t.labels.website}</label>
                <input
                  type="url"
                  className={inputClass}
                  value={data.website ?? ''}
                  onChange={(e) => setData((d) => ({ ...d, website: e.target.value }))}
                  placeholder={placeholders.website}
                />
              </div>
              <div className="grid gap-2">
                <label className={labelClass}>{t.labels.message}</label>
                <textarea
                  className={`${inputClass} min-h-[88px]`}
                  required
                  value={data.message ?? ''}
                  onChange={(e) => setData((d) => ({ ...d, message: e.target.value }))}
                  placeholder={placeholders.message}
                />
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="grid gap-2">
                <label className={labelClass}>{t.labels.service}</label>
                <div className="grid grid-cols-2 gap-2">
                  {(['website','software','ai','seo','other'] as const).map((key) => (
                    <button
                      type="button"
                      key={key}
                      onClick={() =>
                        setData((d) => {
                          const current = d.services ?? [];
                          return current.includes(key)
                            ? { ...d, services: current.filter((k) => k !== key) }
                            : { ...d, services: [...current, key] };
                        })
                      }
                      className={`text-sm px-3 py-2 rounded-sm border cursor-pointer ${ (data.services ?? []).includes(key) ? 'border-[#2869D6] bg-[#2869D6]/5 text-[#1C1C1E]' : 'border-[#E2E7F1] text-[#1C1C1E]'}`}
                    >
                      {t.services[key]}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid gap-2">
                <label className={labelClass}>{t.labels.budget}</label>
                <div className="grid grid-cols-2 gap-2">
                  {(['lt5k','5to15','15to30','gt30','undecided'] as const).map((key) => (
                    <button
                      type="button"
                      key={key}
                      onClick={() => setData((d) => ({ ...d, budget: key }))}
                      className={`text-sm px-3 py-2 rounded-sm border cursor-pointer ${data.budget === key ? 'border-[#2869D6] bg-[#2869D6]/5 text-[#1C1C1E]' : 'border-[#E2E7F1] text-[#1C1C1E]'}`}
                    >
                      {t.budgets[key]}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid gap-2">
                <label className={labelClass}>{t.labels.timeframe}</label>
                <div className="grid grid-cols-2 gap-2">
                  {(['urgent','1to2','3to6','flexible'] as const).map((key) => (
                    <button
                      type="button"
                      key={key}
                      onClick={() => setData((d) => ({ ...d, timeframe: key }))}
                      className={`text-sm px-3 py-2 rounded-sm border cursor-pointer ${data.timeframe === key ? 'border-[#2869D6] bg-[#2869D6]/5 text-[#1C1C1E]' : 'border-[#E2E7F1] text-[#1C1C1E]'}`}
                    >
                      {t.timeframes[key]}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="px-5 py-20 flex flex-col items-center justify-center text-center gap-4 text-[#1C1C1E]">
          <div className="bg-[#4ADE80] text-white rounded-full p-2">
            <Check className="w-8 h-8" />
          </div>
          <div className="text-lg" style={{ fontFamily: 'Fustat-Bold, sans-serif' }}>{t.success}</div>
        </div>
      )}

      {/* Footer actions */}
      {!done && (
        <div className="px-5 py-4 border-t border-[#E2E7F1] flex items-center justify-between">
          <button
            type="button"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            className={`flex items-center gap-2 text-sm text-[#1C1C1E] cursor-pointer ${step === 0 ? 'opacity-40 pointer-events-none' : ''}`}
          >
            <ArrowLeft className="w-4 h-4" /> {t.actions.back}
          </button>

          {step < 2 ? (
            <SpotlightButton
              onClick={() => setStep((s) => Math.min(2, s + 1))}
              disabled={!canNext}
              className={`group bg-[#2869D6] text-white text-sm py-3 px-6 rounded-full transition-all flex items-center justify-center gap-3 cursor-pointer`}
            >
              {t.actions.next}
              <div className="bg-white rounded-full p-1 flex items-center justify-center transition-transform group-hover:translate-x-1">
                <ArrowRight className="w-3 h-3 text-[#2869D6]" />
              </div>
            </SpotlightButton>
          ) : (
            <SpotlightButton
              onClick={handleSubmit}
              disabled={!canNext || submitting || !!limitError}
              className={`group bg-[#2869D6] text-white text-sm py-3 px-6 rounded-full transition-all flex items-center justify-center gap-3 cursor-pointer min-w-[120px] ${!!limitError ? 'opacity-50 grayscale' : ''}`}
            >
              {submitting ? (
                <SystemRestart className="w-4 h-4 animate-spin mx-auto" />
              ) : (
                <>
                  {t.actions.submit}
                  <div className="bg-white rounded-full p-1 flex items-center justify-center transition-transform group-hover:translate-x-1">
                    <ArrowRight className="w-3 h-3 text-[#2869D6]" />
                  </div>
                </>
              )}
            </SpotlightButton>
          )}
        </div>
      )}
    </div>
    
    {(error || limitError) && (
      <div className="mt-4 flex items-center justify-center gap-2 text-red-500 animate-in fade-in slide-in-from-top-2 duration-300">
        <WarningCircle className="w-5 h-5" />
        <span className="text-sm font-medium">{limitError || t.error}</span>
      </div>
    )}
  </div>
);
}
