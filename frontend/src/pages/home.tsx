import { Header } from "@/components/landing/header";
import { Hero } from "@/components/landing/hero";
import { TrustedBy } from "@/components/landing/trusted-by";
import { ServicesSection } from "@/components/landing/services-section";
import { SEOHead } from "@/components/seo-head";

export default function Home() {
  return (
    <div className="site-shell min-h-screen bg-[#0B0B0D] font-sans text-[#F5F7FA]">
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
  );
}
