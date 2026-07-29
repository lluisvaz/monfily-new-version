import { useEffect, useRef } from "react";
import { SectionLayout } from "./section-layout";
import { useLanguage } from "@/hooks/use-language";
import { translations } from "@/lib/translations";
import { GoogleProductIcon, type GoogleProduct } from "@/components/ui/google-product-icon";

const googleProducts = [
  { id: "business-profile", label: "Google Business Profile" },
  { id: "ads", label: "Google Ads" },
  { id: "maps", label: "Google Maps" },
  { id: "local-services", label: "Local Services Ads" },
  { id: "analytics", label: "Google Analytics" },
  { id: "search-console", label: "Search Console" },
] satisfies Array<{ id: GoogleProduct; label: string }>;

function ProductRail() {
  const railRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    let frame = 0;
    let position = 0;
    let previousTime = performance.now();

    const animate = (time: number) => {
      const delta = Math.min(time - previousTime, 32);
      previousTime = time;
      position -= delta * 0.025;
      const half = rail.scrollWidth / 2;
      if (Math.abs(position) >= half) position = 0;
      rail.style.transform = `translate3d(${position}px,0,0)`;
      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  const repeated = [...googleProducts, ...googleProducts];

  return (
    <div
      className="w-full overflow-hidden"
      style={{
        maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
      }}
    >
      <div ref={railRef} className="flex w-max items-center gap-3 px-4 will-change-transform">
        {repeated.map((product, index) => (
          <div
            key={`${product.id}-${index}`}
            className="flex h-12 flex-shrink-0 items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-5 text-sm text-white/70"
          >
            <GoogleProductIcon product={product.id} className="h-5 w-5" />
            {product.label}
          </div>
        ))}
      </div>
    </div>
  );
}

export function TrustedBy() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <SectionLayout className="flex flex-col items-stretch py-7 md:flex-row md:py-0">
      <div className="flex items-center justify-center border-b border-[#2A2A2F] px-6 pb-6 md:w-[260px] md:border-b-0 md:border-r md:py-8">
        <p className="max-w-[220px] text-center text-sm font-medium leading-tight text-white/65">
          {t.trustedBy.label}
        </p>
      </div>
      <div className="flex min-w-0 flex-1 items-center overflow-hidden pt-6 md:py-7">
        <ProductRail />
      </div>
    </SectionLayout>
  );
}
