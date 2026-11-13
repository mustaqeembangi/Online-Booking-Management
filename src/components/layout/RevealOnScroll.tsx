"use client";

import { useEffect } from "react";

// Scroll-in animation for browsers without CSS scroll-driven animations (Safari, Firefox).
// Chrome and Edge use the pure-CSS version in globals.css, so this does nothing there.
export default function RevealOnScroll() {
  useEffect(() => {
    if (CSS.supports("animation-timeline: view()")) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -6% 0px" },
    );
    const scan = () => document.querySelectorAll(".reveal:not(.is-in)").forEach((el) => io.observe(el));

    document.documentElement.classList.add("io-reveal");
    scan();
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);
  return null;
}
