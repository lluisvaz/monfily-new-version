import React from "react";

interface SectionLayoutProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  showStripes?: boolean;
  showTopBorder?: boolean;
  id?: string;
}
const GridDecoration = ({ className }: { className?: string }) => (
  <div className={`absolute w-6 h-6 flex items-center justify-center pointer-events-none ${className}`} style={{ zIndex: 'var(--section-grid-z, 9990)' }}>
    {/* Background mask keeps intersections crisp on the dark canvas. */}
    <div className="absolute w-4 h-4 bg-[#0B0B0D] rounded-full" />
    
    {/* Minimalist Star/Cross Shape in border color #2A2A2F */}
    <svg viewBox="0 0 24 24" className="w-full h-full fill-[#2A2A2F] relative z-10">
      <path d="M12 2C12 2 14 10 22 12C14 14 12 22 12 22C12 22 10 14 2 12C10 10 12 2 12 2Z" />
    </svg>
  </div>
);

export function SectionLayout({ 
  children, 
  className = "", 
  containerClassName = "",
  showStripes = true,
  showTopBorder = true,
  id
}: SectionLayoutProps) {
  const stripeClass = "bg-[#0B0B0D] bg-[image:repeating-linear-gradient(45deg,rgba(255,255,255,.055)_0px,rgba(255,255,255,.055)_1px,transparent_1px,transparent_12px)]";
  const noStripeClass = "bg-[#0B0B0D]";

  return (
    <div className={`w-full flex flex-row relative ${containerClassName}`} id={id} data-motion-section>
      {/* Top border line - very thin */}
      {showTopBorder && (
        <div className="absolute top-0 left-0 right-0 h-[0.5px] bg-[#2A2A2F]" style={{ zIndex: 10 }}></div>
      )}
      
      {/* Left Decor - Visible on all screen sizes */}
      <div className={`flex-1 min-w-[1rem] md:min-w-[2rem] ${showStripes ? stripeClass : noStripeClass}`}></div>

      {/* Main Content */}
      <div className={`relative w-full min-w-0 max-w-[1500px] mx-auto bg-[#0B0B0D] ${className}`} data-motion-content>
        {/* Left border line */}
        <div className="absolute top-0 bottom-0 left-0 w-[0.5px] bg-[#2A2A2F] pointer-events-none" style={{ zIndex: 'var(--section-border-z, 1000)' }}></div>
        
        {children}
      </div>
      
      {/* Right border line - positioned using same flex structure */}
      <div className="absolute top-0 bottom-0 pointer-events-none" style={{ 
        left: 0,
        right: 0,
        zIndex: 'var(--section-border-z, 1000)'
      }}>
        <div className="flex flex-row w-full h-full">
          <div className="flex-1 min-w-[1rem] md:min-w-[2rem]"></div>
          <div className="relative w-full min-w-0 max-w-[1500px] mx-auto">
            <div className="absolute top-0 bottom-0 right-0 w-[0.5px] bg-[#2A2A2F]"></div>
          </div>
          <div className="flex-1 min-w-[1rem] md:min-w-[2rem]"></div>
        </div>
      </div>

      {/* Right Decor - Visible on all screen sizes */}
      <div className={`flex-1 min-w-[1rem] md:min-w-[2rem] ${showStripes ? stripeClass : noStripeClass}`}></div>
      
      {/* Grid Decorations at Top Corners - Positioned at the highest level to appear above everything */}
      {/* Using the same flex structure to align with main content */}
      <div className="absolute left-0 right-0 pointer-events-none" style={{ top: 0, zIndex: 'var(--section-grid-z, 9995)' }}>
        <div className="flex flex-row w-full">
          <div className="flex-1 min-w-[1rem] md:min-w-[2rem]"></div>
          <div className="relative w-full min-w-0 max-w-[1500px] mx-auto">
            <GridDecoration className="flex -top-[12px] -left-[12px]" />
            <GridDecoration className="flex -top-[12px] -right-[12px]" />
          </div>
          <div className="flex-1 min-w-[1rem] md:min-w-[2rem]"></div>
        </div>
      </div>
    </div>
  );
}
