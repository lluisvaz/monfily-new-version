import { Link } from "wouter";
import { Nut } from "lucide-react";
import { SectionLayout } from "./section-layout";

export function Header() {
  return (
    <SectionLayout className="flex items-center justify-between px-4 md:px-[32px] h-24 relative z-50">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 cursor-pointer">
        <div className="text-lime-500">
          <Nut className="w-6 h-6 fill-current" />
        </div>
        <span className="text-xl font-bold text-slate-800 tracking-tight">Pay</span>
      </Link>

      {/* Right Side Group: Nav + Actions */}
      <div className="flex items-center gap-2">
        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-2">
          {["Produtos", "Integrações", "Taxas", "Documentação", "Suporte"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-slate-600 hover:text-slate-900 font-medium text-[16px] py-[6px] px-[16px] transition-colors hover:bg-slate-50 rounded-lg"
            >
              {item}
            </a>
          ))}
          <div className="h-6 w-px bg-slate-200 mx-2"></div>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <a
            href="#"
            className="text-slate-600 hover:text-slate-900 font-medium text-[16px] py-[6px] px-[16px] transition-colors hidden sm:block hover:bg-slate-50 rounded-lg"
          >
            Login
          </a>
          <button className="bg-lime-400 hover:bg-lime-500 text-slate-900 font-bold text-[16px] py-[6px] px-[16px] rounded-full transition-colors cursor-pointer shadow-sm hover:shadow-md">
            Cadastre-se
          </button>
        </div>
      </div>
    </SectionLayout>
  );
}
