import { useEffect, useRef } from "react";
import { SectionLayout } from "./section-layout";
import { useLanguage } from "@/hooks/use-language";
import { translations } from "@/lib/translations";

const clientLogos = [
  "https://res.cloudinary.com/dopp0v9eq/image/upload/v1785361061/4_sgobb4.png",
  "https://res.cloudinary.com/dopp0v9eq/image/upload/v1785361061/8_rbwwd0.png",
  "https://res.cloudinary.com/dopp0v9eq/image/upload/v1785361061/6_o83roe.png",
  "https://res.cloudinary.com/dopp0v9eq/image/upload/v1785361061/7_dich2m.png",
  "https://res.cloudinary.com/dopp0v9eq/image/upload/v1785361060/1_ld8ufy.png",
  "https://res.cloudinary.com/dopp0v9eq/image/upload/v1785361060/5_vp0rf3.png",
  "https://res.cloudinary.com/dopp0v9eq/image/upload/v1785361060/2_ahmf4t.png",
  "https://res.cloudinary.com/dopp0v9eq/image/upload/v1785361060/3_dk1ztg.png",
  "https://res.cloudinary.com/dopp0v9eq/image/upload/v1785361060/9_nnj7tf.png",
  "https://res.cloudinary.com/dopp0v9eq/image/upload/v1785361060/10_mmzbez.png",
];

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

  const repeated = [...clientLogos, ...clientLogos];

  return (
    <div
      className="w-full overflow-hidden"
      style={{
        maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
      }}
    >
      <div ref={railRef} className="flex w-max items-center gap-10 px-6 will-change-transform md:gap-14 md:px-8">
        {repeated.map((src, index) => (
          <img
            key={`${src}-${index}`}
            src={src}
            alt={`Client logo ${(index % clientLogos.length) + 1}`}
            className="h-10 w-auto max-w-[132px] flex-shrink-0 object-contain md:h-12 md:max-w-[160px]"
            draggable="false"
          />
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
