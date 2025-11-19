import React from "react";

interface SectionLayoutProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  showStripes?: boolean;
}

const GridDecoration = ({ className }: { className?: string }) => (
  <div className={`absolute w-6 h-6 z-20 flex items-center justify-center pointer-events-none ${className}`}>
    {/* White background to mask the lines crossing behind it for a cleaner look */}
    <div className="absolute w-4 h-4 bg-white rounded-full" />
    
    {/* Minimalist Star/Cross Shape in border color #E2E7F1 */}
    <svg viewBox="0 0 24 24" className="w-full h-full fill-[#E2E7F1] relative z-10">
      <path d="M12 2C12 2 14 10 22 12C14 14 12 22 12 22C12 22 10 14 2 12C10 10 12 2 12 2Z" />
    </svg>
  </div>
);

export function SectionLayout({ 
  children, 
  className = "", 
  containerClassName = "",
  showStripes = true 
}: SectionLayoutProps) {
  // Adjusted to user requested color #E2E7F1 for a more subtle look
  const stripeClass = "bg-slate-50/30 bg-[image:repeating-linear-gradient(45deg,#E2E7F1_0px,#E2E7F1_1px,transparent_1px,transparent_12px)]";
  const noStripeClass = "bg-white";

  return (
    <div className={`w-full flex flex-row relative ${containerClassName}`}>
      {/* Top border line - very thin */}
      <div className="absolute top-0 left-0 right-0 h-[0.5px] bg-[#E2E7F1] z-10"></div>
      
      {/* Left Decor - Hidden on mobile */}
      <div className={`hidden md:block flex-1 min-w-0 md:min-w-[2rem] ${showStripes ? stripeClass : noStripeClass}`}></div>

      {/* Main Content */}
      <div className={`relative w-full min-w-0 max-w-[1500px] mx-auto bg-white md:border-l-[0.5px] md:border-r-[0.5px] md:border-[#E2E7F1] ${className}`}>
        {children}
        
        {/* Grid Decorations at Bottom Corners - Centered on the intersection */}
        <GridDecoration className="flex -bottom-[12px] -left-[12px]" />
        <GridDecoration className="flex -bottom-[12px] -right-[12px]" />
      </div>

      {/* Right Decor - Hidden on mobile */}
      <div className={`hidden md:block flex-1 min-w-0 md:min-w-[2rem] ${showStripes ? stripeClass : noStripeClass}`}></div>
    </div>
  );
}
