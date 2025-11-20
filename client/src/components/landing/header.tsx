import { Link } from "wouter";
import { useState } from "react";
import { SectionLayout } from "./section-layout";
import { MenuIcon } from "@/components/ui/menu-icon";
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
        <img 
          src="https://res.cloudinary.com/dopp0v9eq/image/upload/v1763574787/monfily-black-nobg_risk6t.png" 
          alt="Monfily" 
          className="h-10 w-auto select-none"
          draggable="false"
          onContextMenu={(e) => e.preventDefault()}
          onDragStart={(e) => e.preventDefault()}
        />
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
        {/* Navigation */}
        <nav className="flex items-center gap-2">
          {navItems.map((item) => (
            <a
              key={item}
              href="#"
              className="text-[#1C1C1E] hover:text-[#1C1C1E] font-medium text-[16px] py-2 px-4 transition-colors hover:bg-slate-50 rounded-full whitespace-nowrap"
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
            className="text-[#1C1C1E] hover:text-[#1C1C1E] font-medium text-[16px] py-2 px-4 transition-colors hover:bg-slate-50 rounded-full whitespace-nowrap"
          >
            Login
          </a>
          <button className="bg-[#2869D6] hover:bg-[#1E4A8C] text-white text-[16px] py-2 px-4 rounded-full transition-colors cursor-pointer whitespace-nowrap">
            Cadastre-se
          </button>
        </div>
      </div>

      {/* Mobile/Tablet Menu */}
      <div className="flex lg:hidden items-center gap-2 flex-shrink-0">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <button className="p-2 text-[#1C1C1E] hover:text-[#1C1C1E] transition-colors flex-shrink-0">
              <MenuIcon size={32} className="text-[#1C1C1E]" />
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
                  className="text-[#1C1C1E] hover:text-[#1C1C1E] font-medium text-base py-2 px-4 transition-colors hover:bg-slate-50 rounded-full"
                >
                  {item}
                </a>
              ))}
              <div className="h-px bg-slate-200 my-2"></div>
              <a
                href="#"
                onClick={() => setIsOpen(false)}
                className="text-[#1C1C1E] hover:text-[#1C1C1E] font-medium text-base py-2 px-4 transition-colors hover:bg-slate-50 rounded-full"
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
