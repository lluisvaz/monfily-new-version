import { ArrowRight, CheckCircle, Menu, Phone, Star } from "iconoir-react";
import { translations } from "@/lib/translations";

function MobileStatusIcons() {
  return (
    <span className="flex items-center gap-1 text-white/65" aria-hidden="true">
      <svg viewBox="0 0 12 8" className="h-2 w-3" fill="currentColor">
        <rect x="0" y="5" width="1.5" height="3" rx=".5" />
        <rect x="3" y="3.5" width="1.5" height="4.5" rx=".5" />
        <rect x="6" y="2" width="1.5" height="6" rx=".5" />
        <rect x="9" y=".5" width="1.5" height="7.5" rx=".5" />
      </svg>
      <svg viewBox="0 0 12 8" className="h-2 w-3" fill="none" stroke="currentColor" strokeLinecap="round">
        <path d="M1 2.7a7.2 7.2 0 0 1 10 0M3 4.7a4.4 4.4 0 0 1 6 0M5.2 6.6a1.2 1.2 0 0 1 1.6 0" strokeWidth="1.1" />
      </svg>
      <svg viewBox="0 0 16 8" className="h-2 w-4">
        <rect x=".5" y=".5" width="13" height="7" rx="1.7" fill="none" stroke="currentColor" />
        <rect x="2" y="2" width="9" height="4" rx=".8" fill="currentColor" />
        <rect x="14.2" y="2.3" width="1.3" height="3.4" rx=".6" fill="currentColor" />
      </svg>
    </span>
  );
}

export function WebsiteMockupMobile() {
  const t = translations.en;

  return (
    <div className="flex h-full w-full select-none flex-col overflow-hidden bg-[#101013] text-white" style={{ pointerEvents: "none" }}>
      <div className="flex h-[18px] items-center justify-between px-3 text-[7px] text-white/65">
        <span>9:41</span>
        <MobileStatusIcons />
      </div>

      <header className="flex h-[42px] flex-none items-center justify-between border-b border-white/10 bg-[#101013]/95 px-3">
        <div className="flex items-center gap-1.5">
          <span className="grid h-5 w-5 place-items-center rounded-full bg-[#FF6B35] text-[7px] font-black text-[#0B0B0D]">
            NA
          </span>
          <div>
            <div className="text-[8px] font-bold leading-none">NORTHSTAR AIR</div>
            <div className="mt-0.5 text-[5px] uppercase tracking-[0.14em] text-white/40">Heating &amp; Cooling</div>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="rounded-full bg-[#FF6B35] px-2 py-1 text-[5.5px] font-bold text-[#0B0B0D]">(305) 555</span>
          <Menu className="h-3.5 w-3.5 text-white/70" />
        </div>
      </header>

      <div className="relative h-[155px] flex-none overflow-hidden">
        <img
          src="/hvac-hero.webp"
          alt="HVAC technician servicing a residential system"
          className="h-full w-full object-cover"
          draggable="false"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#101013]/85 via-transparent to-black/15" />
        <div className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full border border-[#FF6B35]/30 bg-[#101013]/80 px-2 py-1 text-[5.5px] font-semibold text-[#FFC4AD] backdrop-blur">
          <span className="h-1 w-1 rounded-full bg-[#FF6B35]" />
          <span>{t.mockup.badge}</span>
        </div>
        <div className="absolute inset-x-2 bottom-2 grid grid-cols-[1.3fr_.7fr] gap-1.5">
          <div className="rounded-lg border border-white/15 bg-[#101013]/85 px-2 py-1.5 backdrop-blur">
            <CheckCircle className="mb-1 h-2.5 w-2.5 text-[#FF6B35]" />
            <div className="text-[5.5px] font-bold text-white">Same-day service</div>
            <div className="mt-0.5 text-[4.5px] text-white/45">Licensed &amp; insured</div>
          </div>
          <div className="rounded-lg border border-[#FF6B35] bg-[#FF6B35] px-2 py-1.5">
            <div className="text-[13px] font-black leading-none text-[#101013]">4.9</div>
            <div className="mt-1 text-[4.5px] font-bold text-[#101013]/65">Google rating</div>
          </div>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col justify-between px-3 py-3">
        <h2 className="text-[18px] leading-[0.9] tracking-[-0.06em]" style={{ fontFamily: "Fustat-Bold, sans-serif" }}>
          {t.mockup.heading.line1}
          <span className="text-white/48">{t.mockup.heading.line2}</span>
        </h2>
        <p className="line-clamp-2 text-[7px] leading-[1.3] text-white/52">{t.mockup.description}</p>

        <div className="flex gap-1">
          <div className="flex flex-1 items-center justify-between rounded-full bg-[#FF6B35] py-1 pl-2.5 pr-1 text-[6.5px] font-normal text-[#0B0B0D]">
            {t.mockup.cta.viewPrices}
            <span className="grid h-4 w-4 place-items-center rounded-full bg-[#101013]">
              <ArrowRight className="h-2.5 w-2.5 text-[#FF6B35]" />
            </span>
          </div>
          <div className="flex items-center gap-1 rounded-full border border-white/15 bg-[#101013]/5 px-2 py-1 text-[6.5px] font-normal">
            <Phone className="h-2.5 w-2.5 text-[#FF6B35]" />
            {t.mockup.cta.scheduleNow}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex -space-x-1">
            {["J", "M", "A"].map((initial) => (
              <span key={initial} className="grid h-4 w-4 place-items-center rounded-full border border-[#101013] bg-[#26262C] text-[4.5px] font-bold text-white">
                {initial}
              </span>
            ))}
          </div>
          <div>
            <div className="flex gap-px">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star key={index} className="h-2 w-2 fill-[#FF6B35] text-[#FF6B35]" />
              ))}
            </div>
            <span className="block text-[5px] leading-none text-white/40">{t.mockup.trust}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
