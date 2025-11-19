import { ArrowRight, Zap, Shield } from "lucide-react";
import { SectionLayout } from "./section-layout";
import ShinyText from "@/components/ui/shiny-text";

export function Hero() {
  return (
    <SectionLayout 
      showStripes={false}
      className="grid grid-cols-1 lg:grid-cols-2 gap-12 px-6 md:px-16 lg:px-28 py-20 min-h-[600px] items-center"
    >
      {/* Left Content */}
      <div className="flex flex-col justify-center items-start space-y-8 w-full">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full pl-1 pr-4 py-1 border border-[#E2E7F1]">
          <div className="rounded-full p-1 border border-[#E2E7F1]">
            <div className="flex -space-x-2 overflow-hidden">
              {/* Avatars placeholder */}
              <div className="inline-block h-5 w-5 rounded-full ring-2 ring-white bg-[#2869D6]/30" />
              <div className="inline-block h-5 w-5 rounded-full ring-2 ring-white bg-orange-200" />
              <div className="inline-block h-5 w-5 rounded-full ring-2 ring-white bg-blue-200" />
            </div>
          </div>
          <span className="text-xs font-semibold text-[#1C1C1E]">
            Escolhido por +6000 founders
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-[48px] md:text-7xl font-bold leading-none tracking-tight text-[#1C1C1E]">
          Receba fácil. <br />
          <span className="text-[#1C1C1E]">Cresça </span>
          <ShinyText text="rápido." speed={1.5} className="text-[#1C1C1E]" />
        </h1>

        {/* Description */}
        <p className="text-base md:text-lg text-[#1C1C1E] max-w-md leading-none">
          Infraestrutura de pagamentos em poucas linhas. Feito para devs, vibe-coders e AI Agents.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-6 pt-2 w-full">
          <button className="group bg-[#2869D6] hover:bg-[#1E4A8C] text-white text-base py-4 px-8 rounded-full transition-all flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto">
            Integre ao seu negócio
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          <a href="#" className="text-[#1C1C1E] hover:text-[#1C1C1E] font-medium transition-colors w-full sm:w-auto text-center sm:text-left">
            Por que usar?
          </a>
        </div>

        {/* Features */}
        <div className="hidden md:grid grid-cols-2 gap-8 pt-8 w-full max-w-md">
          <div className="flex items-start gap-3">
            <div className="bg-[#2869D6]/20 p-2 rounded-lg text-[#2869D6] mt-1">
              <Zap className="w-4 h-4 fill-current" />
            </div>
            <div>
              <h3 className="font-bold text-[#1C1C1E] text-sm">Rápido</h3>
              <p className="text-[#1C1C1E] text-xs mt-1">Integre em minutos, não dias.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="bg-[#2869D6]/20 p-2 rounded-lg text-[#2869D6] mt-1">
              <Shield className="w-4 h-4 fill-current" />
            </div>
            <div>
              <h3 className="font-bold text-[#1C1C1E] text-sm">Seguro</h3>
              <p className="text-[#1C1C1E] text-xs mt-1">Criptografia de ponta.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Content (Placeholder) */}
      <div className="relative hidden lg:block h-full min-h-[400px]">
        {/* Background gradient blob to simulate the glow in the original image */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-[#2869D6]/40 via-[#2869D6]/20 to-transparent rounded-full blur-3xl -z-10 opacity-70 pointer-events-none"></div>

        {/* Empty placeholder as requested */}
        <div className="w-full h-full rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 flex items-center justify-center">
          <p className="text-[#1C1C1E] font-medium text-sm">Visual Mockup Placeholder</p>
        </div>
      </div>
    </SectionLayout>
  );
}
