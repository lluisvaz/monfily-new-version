import { Header } from "@/components/landing/header";
import { Hero } from "@/components/landing/hero";
import { TrustedBy } from "@/components/landing/trusted-by";
import { ServicesSection } from "@/components/landing/services-section";
import { SEOHead } from "@/components/seo-head";
import { useEffect, useRef, useState } from 'react';
import GradualBlur from '@/components/ui/gradual-blur';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    // Observer to detect when footer is visible to fade out the gradual blur
    const observer = new IntersectionObserver(
      ([entry]) => {
        setFooterVisible(entry.isIntersecting);
      },
      { threshold: 0.01 } // Trigger as soon as the footer starts to appear
    );

    const footer = document.getElementById('footer');
    if (footer) observer.observe(footer);

    return () => observer.disconnect();
  }, []);

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
    <>
      <div className="min-h-screen bg-white font-sans" data-scroll-container ref={containerRef}>
      <SEOHead />
      <section data-scroll-section>
        <Header />
      </section>
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
    <GradualBlur
      target="page"
      position="bottom"
      height="7rem"
      strength={2}
      divCount={5}
      curve="bezier"
      exponential
      style={{ opacity: footerVisible ? 0 : 1 }}
      animated={true}
      duration="0.5s"
    />
  </>
);
}
