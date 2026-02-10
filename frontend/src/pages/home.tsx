import { Header } from "@/components/landing/header";
import { Hero } from "@/components/landing/hero";
import { TrustedBy } from "@/components/landing/trusted-by";
import { ServicesSection } from "@/components/landing/services-section";
import { SEOHead } from "@/components/seo-head";
import { useEffect, useRef, useState } from 'react';
import GradualBlur from '@/components/ui/gradual-blur';
import Lenis from 'lenis';

export default function Home() {
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    // Observer to detect when footer is visible to fade out the gradual blurr
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
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    // Expose lenis instance globally for use in other components
    (window as any).lenis = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      (window as any).lenis = undefined;
    };
  }, []);

  return (
    <>
      <div className="min-h-screen bg-white font-sans">
      <SEOHead />
      <section>
        <Header />
      </section>
      <main>
        <section>
          <Hero />
        </section>
        <section>
          <TrustedBy />
        </section>
        <section id="servicos">
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
