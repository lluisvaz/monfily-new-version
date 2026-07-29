import { ArrowRight, CheckCircle, Phone, Star } from "iconoir-react";
import { translations } from "@/lib/translations";

export function WebsiteMockup() {
  const t = translations.en;

  return (
    <div
      className="relative h-full min-h-[520px] w-[118%] max-w-[118%] ml-20 overflow-hidden rounded-[22px] border border-white/15 bg-[#101013] shadow-[0_32px_100px_rgba(0,0,0,0.55)] select-none"
      style={{ pointerEvents: "none" }}
    >
      <header className="relative z-20 flex items-center justify-between border-b border-white/10 bg-[#101013]/90 px-7 py-5 backdrop-blur-xl">
        <img
          src="https://res.cloudinary.com/dopp0v9eq/image/upload/v1785361060/3_dk1ztg.png"
          alt="Company logo"
          className="h-10 w-auto max-w-[145px] object-contain brightness-0 invert"
          draggable="false"
        />
        <nav className="hidden items-center gap-5 sm:flex">
          {Object.values(t.mockup.navigation).slice(0, 4).map((item) => (
            <span key={item} className="text-xs text-white/55">
              {item}
            </span>
          ))}
        </nav>
        <div className="rounded-full bg-[#F5F7FA] px-3 py-2 text-[11px] font-bold text-[#0B0B0D]">
          (305) 555-0147
        </div>
      </header>

      <div className="relative grid min-h-[447px] grid-cols-[1.03fr_.97fr] overflow-hidden">
        <div className="relative z-10 flex flex-col justify-center px-8 py-8">
          <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1.5">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#F5F7FA]" />
            <span className="text-[11px] font-semibold text-[#F5F7FA]">{t.mockup.badge}</span>
          </div>

          <h2
            className="max-w-[390px] text-[38px] leading-[0.92] tracking-[-0.06em] text-white"
            style={{ fontFamily: "Fustat-Bold, sans-serif" }}
          >
            {t.mockup.heading.line1}
            <span className="text-white/52">{t.mockup.heading.line2}</span>
          </h2>

          <p className="mt-5 max-w-[360px] text-sm leading-[1.35] text-white/58">{t.mockup.description}</p>

          <div className="mt-6 flex items-center gap-2">
            <div className="flex items-center gap-2 rounded-full bg-[#F5F7FA] py-2 pl-4 pr-2 text-xs font-normal text-[#0B0B0D]">
              {t.mockup.cta.viewPrices}
              <span className="grid h-6 w-6 place-items-center rounded-full bg-[#0B0B0D]">
                <ArrowRight className="h-3 w-3 text-[#F5F7FA]" />
              </span>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-white/15 bg-[#0B0B0D]/5 px-4 py-2 text-xs font-normal text-white">
              <Phone className="h-3.5 w-3.5 text-[#F5F7FA]" />
              {t.mockup.cta.scheduleNow}
            </div>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <div className="flex -space-x-2">
              {["J", "M", "A"].map((initial, index) => (
                <span
                  key={initial}
                  className="grid h-7 w-7 place-items-center rounded-full border-2 border-[#101013] bg-[#26262C] text-[9px] font-bold text-white"
                  style={{ transform: `rotate(${index % 2 === 0 ? -3 : 3}deg)` }}
                >
                  {initial}
                </span>
              ))}
            </div>
            <div>
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} className="h-3 w-3 fill-[#F5F7FA] text-[#F5F7FA]" />
                ))}
              </div>
              <span className="text-[10px] text-white/45">{t.mockup.trust}</span>
            </div>
          </div>
        </div>

        <div className="relative min-h-[447px] overflow-hidden">
          <img
            src="/hvac-hero.webp"
            alt="HVAC technician servicing a residential air-conditioning system"
            className="absolute inset-0 h-full w-full object-cover"
            draggable="false"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#101013] via-[#101013]/10 to-transparent" />
          <div className="absolute inset-x-4 bottom-4 grid grid-cols-2 gap-2">
            <div className="rounded-xl border border-white/15 bg-[#0B0B0D]/80 p-3 backdrop-blur-xl">
              <CheckCircle className="mb-2 h-4 w-4 text-[#F5F7FA]" />
              <div className="text-[10px] font-bold text-white">Same-day service</div>
              <div className="mt-0.5 text-[9px] text-white/45">Licensed &amp; insured</div>
            </div>
            <div className="rounded-xl border border-white/15 bg-[#F5F7FA] p-3">
              <div className="text-[22px] font-black leading-none text-[#0B0B0D]">4.9</div>
              <div className="mt-1 text-[9px] font-bold text-[#0B0B0D]/65">Google rating</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

