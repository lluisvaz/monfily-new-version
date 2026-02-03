import { useMemo, useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/hooks/use-language';
import type { Language } from '@/lib/translations';
import { ArrowRight, ArrowLeft, Check, SystemRestart, WarningCircle, NavArrowDown, Search } from 'iconoir-react';
import { detectCountryCode } from '@/lib/geo-location';
import { SpotlightButton } from '@/components/ui/spotlight-button';

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
      other: 'Outro'
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
      other: 'Other'
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
  message: ''
};

export default function LeadForm({ onSubmit, className }: LeadFormProps) {
  const { language } = useLanguage();
  const t = copy[language as Language] ?? copy.pt;

  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState<LeadFormData>(initialData);
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const countryRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

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
    if (step === 0) return Boolean(data.name && data.email && data.phone && data.country);
    if (step === 1) return Boolean(data.company && data.message);
    if (step === 2) return Boolean((data.services && data.services.length > 0) && data.budget && data.timeframe);
    return false;
  }, [step, data]);

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      setError(false);
      
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
          const errorData = await response.json().catch(() => ({}));
          console.error('Server validation error details:', errorData);
          throw new Error(errorData.message || 'Failed to submit form');
        }

        const result = await response.json();
        console.log('Form submission successful:', result);
      }
      
      setDone(true);
      
      // Volta para a primeira etapa após 5 segundos
      setTimeout(() => {
        setDone(false);
        setStep(0);
        setData(initialData);
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
                  placeholder="Maria Silva"
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
                  placeholder="maria@email.com"
                />
              </div>
              <div className="grid gap-2">
                <label className={labelClass}>{t.labels.phone}</label>
                <input
                  type="tel"
                  required
                  className={inputClass}
                  value={data.phone ?? ''}
                  onChange={(e) => setData((d) => ({ ...d, phone: e.target.value }))}
                  placeholder="(11) 99999-9999"
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
                  placeholder="Minha Empresa Ltda"
                />
              </div>
              <div className="grid gap-2">
                <label className={labelClass}>{t.labels.website}</label>
                <input
                  type="url"
                  className={inputClass}
                  value={data.website ?? ''}
                  onChange={(e) => setData((d) => ({ ...d, website: e.target.value }))}
                  placeholder="https://suaempresa.com"
                />
              </div>
              <div className="grid gap-2">
                <label className={labelClass}>{t.labels.message}</label>
                <textarea
                  className={`${inputClass} min-h-[88px]`}
                  required
                  value={data.message ?? ''}
                  onChange={(e) => setData((d) => ({ ...d, message: e.target.value }))}
                  placeholder="Conte rapidamente sobre seu projeto."
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
            <div className="flex flex-col items-end gap-2">
              {error && (
                <div className="text-xs text-red-500 flex items-center gap-1 mb-1">
                  <WarningCircle className="w-3 h-3" />
                  {t.error}
                </div>
              )}
              <SpotlightButton
                onClick={handleSubmit}
                disabled={!canNext || submitting}
                className={`group bg-[#2869D6] text-white text-sm py-3 px-6 rounded-full transition-all flex items-center justify-center gap-3 cursor-pointer min-w-[120px]`}
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
            </div>
          )}
        </div>
      )}
    </div>
  );
}
