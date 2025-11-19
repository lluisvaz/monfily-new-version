import { ArrowRight, Zap, Shield } from "lucide-react";
import { SectionLayout } from "./section-layout";

export function Hero() {
  return (
    <SectionLayout 
      showStripes={false}
      className="grid grid-cols-1 lg:grid-cols-2 gap-12 px-6 md:px-12 py-20 min-h-[600px] items-center"
    >
      {/* Left Content */}
      <div className="flex flex-col justify-center items-start space-y-8">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-slate-50 rounded-full pl-1 pr-4 py-1 border border-slate-100">
          <div className="bg-white rounded-full p-1 shadow-sm border border-slate-100">
            <div className="flex -space-x-2 overflow-hidden">
              {/* Avatars placeholder */}
              <div className="inline-block h-5 w-5 rounded-full ring-2 ring-white bg-lime-200" />
              <div className="inline-block h-5 w-5 rounded-full ring-2 ring-white bg-orange-200" />
              <div className="inline-block h-5 w-5 rounded-full ring-2 ring-white bg-blue-200" />
            </div>
          </div>
          <span className="text-xs font-semibold text-slate-600">
            Escolhido por +6000 founders
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight text-slate-900">
          Receba fácil. <br />
          <span className="text-lime-500">Cresça rápido.</span>
        </h1>

        {/* Description */}
        <p className="text-lg text-slate-600 max-w-md leading-relaxed">
          Infraestrutura de pagamentos em poucas linhas. Feito para devs, vibe-coders e AI Agents.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-6 pt-2">
          <button className="group bg-lime-400 hover:bg-lime-500 text-slate-900 font-bold text-base py-4 px-8 rounded-full transition-all shadow-sm hover:shadow-md flex items-center gap-2 cursor-pointer">
            Integre ao seu negócio
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          <a href="#" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">
            Por que usar?
          </a>
        </div>

        {/* Features */}
        <div className="grid grid-cols-2 gap-8 pt-8 w-full max-w-md">
          <div className="flex items-start gap-3">
            <div className="bg-lime-100 p-2 rounded-lg text-lime-700 mt-1">
              <Zap className="w-4 h-4 fill-current" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Rápido</h3>
              <p className="text-slate-500 text-xs mt-1">Integre em minutos, não dias.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="bg-lime-100 p-2 rounded-lg text-lime-700 mt-1">
              <Shield className="w-4 h-4 fill-current" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Seguro</h3>
              <p className="text-slate-500 text-xs mt-1">Criptografia de ponta.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Content (Placeholder) */}
      <div className="relative hidden lg:block h-full min-h-[400px]">
        {/* Background gradient blob to simulate the glow in the original image */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-lime-200/40 via-lime-100/20 to-transparent rounded-full blur-3xl -z-10 opacity-70 pointer-events-none"></div>

        {/* Empty placeholder as requested */}
        <div className="w-full h-full rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 flex items-center justify-center">
          <p className="text-slate-400 font-medium text-sm">Visual Mockup Placeholder</p>
        </div>
      </div>
    </SectionLayout>
  );
}
