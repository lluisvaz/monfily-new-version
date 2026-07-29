import type { ButtonHTMLAttributes, ReactNode } from "react";
import { ArrowRight } from "iconoir-react";

interface ProjectCtaButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function ProjectCtaButton({
  children,
  className = "",
  type = "button",
  ...props
}: ProjectCtaButtonProps) {
  return (
    <button
      {...props}
      type={type}
      className={`project-cta group relative h-[58px] w-full max-w-[340px] cursor-pointer overflow-hidden rounded-full border border-white/25 bg-[#151519] text-base font-normal transition-[border-color,background-color,box-shadow,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-[#2869D6]/70 hover:bg-[#0B0B0D] hover:shadow-[0_0_0_1px_rgba(40,105,214,0.10),0_12px_32px_rgba(0,0,0,0.28)] active:scale-[0.985] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2869D6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0B0D] ${className}`}
    >
      <span className="project-cta__label absolute bottom-[3px] top-[3px] z-10 flex items-center justify-center whitespace-nowrap rounded-full bg-[#2869D6] px-3 text-center text-white transition-[left,right,background-color,color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
        {children}
      </span>
      <span
        aria-hidden="true"
        className="project-cta__arrow absolute bottom-[3px] top-[3px] z-10 grid w-[50px] place-items-center rounded-full bg-[#4A86E6] text-white transition-[left,background-color,color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
      >
        <ArrowRight
          className="project-cta__arrow-icon h-5 w-5 transition-[transform,color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
          strokeWidth={1.8}
        />
      </span>
    </button>
  );
}
