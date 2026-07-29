import { useEffect, useState } from "react";
import { useLanguage } from "@/hooks/use-language";

export function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const { isReady } = useLanguage();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const startFade = window.setTimeout(() => {
      setIsFadingOut(true);
      window.setTimeout(() => {
        setIsVisible(false);
        document.body.style.overflow = "";
      }, 300);
    }, isReady ? 160 : 1800);

    return () => window.clearTimeout(startFade);
  }, [isReady]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[99999] grid place-items-center bg-[#0B0B0D] transition-opacity duration-300 ${
        isFadingOut ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      aria-hidden="true"
    >
      <div className="h-7 w-7 animate-spin rounded-full border-[3px] border-white/10 border-t-[#2869D6]" />
    </div>
  );
}
