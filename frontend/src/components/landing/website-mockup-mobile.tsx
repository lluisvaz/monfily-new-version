import { ArrowRight, Menu, Phone, Star } from "iconoir-react";
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
    <div
      className="flex h-full w-full flex-col overflow-hidden bg-[#101013] text-white select-none"
      style={{ pointerEvents: "none", borderRadius: "40px" }}
    >
      <div className="flex items-center justify-between px-4 pb-1 pt-2 text-[8px] text-white/70">
        <span>9:41</span>
        <MobileStatusIcons />
      </div>

      <header className="flex items-center justify-between border-b border-white/10 px-3 py-2">
        <div className="flex items-center gap-1.5">
          <span className="grid h-5 w-5 place-items-center rounded-full bg-[#FF6B35] text-[7px] font-black text-[#0B0B0D]">
            NA
          </span>
          <div>
            <div className="text-[8px] font-bold leading-none">NORTHSTAR AIR</div>
            <div className="mt-0.5 text-[5px] uppercase tracking-[0.16em] text-white/40">Heating &amp; Cooling</div>
          </div>
        </div>
        <Menu className="h-3.5 w-3.5 text-white/70" />
      </header>

      <div className="relative h-[125px] overflow-hidden">
        <img
          src="/hvac-hero.webp"
          alt="HVAC technician servicing a residential system"
          className="h-full w-full object-cover"
          draggable="false"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#101013] via-transparent to-transparent" />
        <div className="absolute bottom-2 left-2 rounded-full border border-[#FF6B35]/30 bg-[#101013]/75 px-2 py-1 text-[6px] font-semibold text-[#FFC4AD] backdrop-blur">
          {t.mockup.badge}
        </div>
      </div>

      <div className="flex flex-1 flex-col px-3 pb-3 pt-2">
        <h2
          className="text-[19px] leading-[0.9] tracking-[-0.06em]"
          style={{ fontFamily: "Fustat-Bold, sans-serif" }}
        >
          {t.mockup.heading.line1}
          <span className="text-white/48">{t.mockup.heading.line2}</span>
        </h2>
        <p className="mt-2 line-clamp-3 text-[7px] leading-[1.3] text-white/52">{t.mockup.description}</p>

        <div className="mt-2 flex gap-1">
          <div className="flex flex-1 items-center justify-between rounded-full bg-[#FF6B35] px-2 py-1.5 text-[7px] font-bold text-[#0B0B0D]">
            {t.mockup.cta.viewPrices}
            <ArrowRight className="h-2.5 w-2.5" />
          </div>
          <div className="grid h-6 w-6 place-items-center rounded-full border border-white/15 bg-[#0B0B0D]/5">
            <Phone className="h-2.5 w-2.5 text-[#FF6B35]" />
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between pt-2">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star key={index} className="h-2 w-2 fill-[#FF6B35] text-[#FF6B35]" />
            ))}
          </div>
          <span className="text-[6px] text-white/40">{t.mockup.trust}</span>
        </div>
      </div>
    </div>
  );
}

