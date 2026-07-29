import { useEffect, useRef } from "react";

export function SmoothCursor() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const query = window.matchMedia("(min-width: 1024px) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!dot || !query.matches || reducedMotion.matches) return;

    let currentX = -40;
    let currentY = -40;
    let targetX = -40;
    let targetY = -40;
    let scale = 1;
    let targetScale = 1;
    let frame = 0;

    const render = () => {
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;
      scale += (targetScale - scale) * 0.18;
      dot.style.transform = `translate3d(${currentX - 6}px, ${currentY - 6}px, 0) scale(${scale})`;

      if (Math.abs(targetX - currentX) > 0.1 || Math.abs(targetY - currentY) > 0.1 || Math.abs(targetScale - scale) > 0.01) {
        frame = requestAnimationFrame(render);
      } else {
        frame = 0;
      }
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };

    const handleMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      targetScale = event.target instanceof Element && event.target.closest("a, button, [role='button']") ? 1.65 : 1;
      dot.dataset.visible = "true";
      schedule();
    };

    const handleLeave = () => {
      dot.dataset.visible = "false";
    };

    window.addEventListener("pointermove", handleMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", handleLeave);

    return () => {
      window.removeEventListener("pointermove", handleMove);
      document.documentElement.removeEventListener("mouseleave", handleLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return <div ref={dotRef} className="smooth-cursor-dot" aria-hidden="true" />;
}
