import React from "react";

export const SpotlightButton = ({
  children,
  className,
  onClick,
  style,
  disabled,
  spotlightColor = "rgba(255, 255, 255, 0.2)",
  type = "button"
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
  disabled?: boolean;
  spotlightColor?: string;
  type?: "button" | "submit" | "reset";
}) => {
  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent<HTMLButtonElement>) {
    if (disabled) return;
    const { left, top } = currentTarget.getBoundingClientRect();
    currentTarget.style.setProperty("--spotlight-x", `${clientX - left}px`);
    currentTarget.style.setProperty("--spotlight-y", `${clientY - top}px`);
  }

  return (
    <button
      type={type}
      onMouseMove={handleMouseMove}
      onClick={onClick}
      style={{
        ...style,
        "--spotlight-color": spotlightColor,
      } as React.CSSProperties}
      disabled={disabled}
      className={`relative group overflow-hidden ${className || ""} ${disabled ? 'cursor-not-allowed opacity-70' : ''}`}
    >
      {children}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ease-in-out ${disabled ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'}`}
        style={{
          background:
            "radial-gradient(circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%), var(--spotlight-color), transparent 80%)",
        }}
      />
    </button>
  );
};
