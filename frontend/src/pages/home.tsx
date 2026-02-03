import { Header } from "@/components/landing/header";
import { Hero } from "@/components/landing/hero";
import { TrustedBy } from "@/components/landing/trusted-by";
import { ServicesSection } from "@/components/landing/services-section";
import { SEOHead } from "@/components/seo-head";
import { useEffect, useRef } from 'react';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let scroll: any;
    let cancelled = false;

    (async () => {
      try {
        const LocomotiveScroll = (await import('locomotive-scroll')).default as any;
        if (!cancelled && containerRef.current) {
          scroll = new LocomotiveScroll({
            el: containerRef.current,
            smooth: true,
            smartphone: { smooth: true },
            tablet: { smooth: true },
          });
        }
      } catch (e) {
        console.warn('LocomotiveScroll failed to init:', e);
      }
    })();

    return () => {
      cancelled = true;
      if (scroll && typeof scroll.destroy === 'function') {
        scroll.destroy();
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans" data-scroll-container ref={containerRef}>
      <SEOHead />
      <Header />
      <main>
        <section data-scroll-section>
          <Hero />
        </section>
        <section data-scroll-section>
          <TrustedBy />
        </section>
        <section data-scroll-section id="servicos">
          <ServicesSection />
        </section>
      </main>
    </div>
  );
}
