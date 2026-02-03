import React from "react";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";

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
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  // Compute motion template UNCONDITIONALLY to preserve hook order
  const backgroundTemplate = useMotionTemplate`
    radial-gradient(
      circle at ${mouseX}px ${mouseY}px,
      ${spotlightColor},
      transparent 80%
    )
  `;

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    if (disabled) return;
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <button
      type={type}
      onMouseMove={handleMouseMove}
      onClick={onClick}
      style={style}
      disabled={disabled}
      className={`relative group overflow-hidden ${className || ""} ${disabled ? 'cursor-not-allowed opacity-70' : ''}`}
    >
      {children}
      <motion.div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ease-in-out ${disabled ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'}`}
        style={{
          background: backgroundTemplate,
        }}
      />
    </button>
  );
};
