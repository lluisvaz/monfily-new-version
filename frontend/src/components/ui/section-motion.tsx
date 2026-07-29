import { useEffect } from "react";

export function SectionMotion() {
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-motion-section]"));
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
      sections.forEach((section) => section.classList.add("motion-ready", "is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -8% 0px" },
    );

    const frame = requestAnimationFrame(() => {
      sections.forEach((section) => {
        section.classList.add("motion-ready");
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight * 1.04 && rect.bottom > 0) {
          section.classList.add("is-visible");
        } else {
          observer.observe(section);
        }
      });
    });

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  return null;
}
