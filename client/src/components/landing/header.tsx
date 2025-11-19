import { Link } from "wouter";
import { useState } from "react";
import { SectionLayout } from "./section-layout";
import { DashboardIcon } from "@/components/ui/dashboard-icon";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navItems = ["Produtos", "Integrações", "Taxas", "Documentação", "Suporte"];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <SectionLayout className="flex items-center justify-between px-4 md:px-[32px] h-24 relative z-50 min-w-0">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 cursor-pointer flex-shrink-0">
        <div className="text-lime-500">
          <DashboardIcon size={24} className="text-lime-500" />
        </div>
        <span className="text-xl font-bold text-slate-800 tracking-tight">Pay</span>
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
        {/* Navigation */}
        <nav className="flex items-center gap-2">
          {navItems.map((item) => (
            <a
              key={item}
              href="#"
              className="text-slate-600 hover:text-slate-900 font-medium text-[16px] py-[6px] px-[16px] transition-colors hover:bg-slate-50 rounded-lg whitespace-nowrap"
            >
              {item}
            </a>
          ))}
          <div className="h-6 w-px bg-slate-200 mx-2 flex-shrink-0"></div>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <a
            href="#"
            className="text-slate-600 hover:text-slate-900 font-medium text-[16px] py-[6px] px-[16px] transition-colors hover:bg-slate-50 rounded-lg whitespace-nowrap"
          >
            Login
          </a>
          <button className="bg-lime-400 hover:bg-lime-500 text-slate-900 font-bold text-[16px] py-[6px] px-[16px] rounded-full transition-colors cursor-pointer shadow-sm hover:shadow-md whitespace-nowrap">
            Cadastre-se
          </button>
        </div>
      </div>

      {/* Mobile/Tablet Menu */}
      <div className="flex lg:hidden items-center gap-2 flex-shrink-0">
        <button className="bg-lime-400 hover:bg-lime-500 text-slate-900 font-bold text-sm py-2 px-3 sm:px-4 rounded-full transition-colors cursor-pointer shadow-sm hover:shadow-md whitespace-nowrap">
          Cadastre-se
        </button>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <button className="p-2 text-slate-600 hover:text-slate-900 transition-colors flex-shrink-0">
              <DashboardIcon size={24} className="text-slate-600" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px]">
            <SheetHeader>
              <SheetTitle className="text-left">Menu</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-4 mt-8">
              {navItems.map((item) => (
                <a
                  key={item}
                  href="#"
                  onClick={() => setIsOpen(false)}
                  className="text-slate-600 hover:text-slate-900 font-medium text-base py-2 px-4 transition-colors hover:bg-slate-50 rounded-lg"
                >
                  {item}
                </a>
              ))}
              <div className="h-px bg-slate-200 my-2"></div>
              <a
                href="#"
                onClick={() => setIsOpen(false)}
                className="text-slate-600 hover:text-slate-900 font-medium text-base py-2 px-4 transition-colors hover:bg-slate-50 rounded-lg"
              >
                Login
              </a>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </SectionLayout>
  );
}
