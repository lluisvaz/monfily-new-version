import { Header } from "@/components/landing/header";
import { Hero } from "@/components/landing/hero";
import { TrustedBy } from "@/components/landing/trusted-by";
import { ServicesSection } from "@/components/landing/services-section";
import { SEOHead } from "@/components/seo-head";

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <SEOHead />
      <Header />
      <main>
        <Hero />
        <TrustedBy />
        <ServicesSection />
      </main>
    </div>
  );
}
