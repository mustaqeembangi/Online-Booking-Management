"use client";

import { useRef, type ReactNode } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function Rail({
  children,
  label,
  heading,
  prevLabel,
  nextLabel,
}: {
  children: ReactNode;
  label: string;
  heading: ReactNode;
  prevLabel: string;
  nextLabel: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const move = (step: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    const rtl = getComputedStyle(el).direction === "rtl";
    el.scrollBy({ left: (rtl ? -step : step) * el.clientWidth * 0.75, behavior: "smooth" });
  };
  const arrow =
    "grid h-14 w-14 place-items-center rounded-full border border-white/25 text-white transition-colors hover:bg-white hover:text-ink";

  return (
    <div>
      <div className="flex items-end justify-between gap-6 px-[var(--gutter)]">
        {heading}
        <div className="hidden shrink-0 gap-2 md:flex">
          <button type="button" aria-label={prevLabel} className={arrow} onClick={() => move(-1)}>
            <ArrowLeft size={22} />
          </button>
          <button type="button" aria-label={nextLabel} className={arrow} onClick={() => move(1)}>
            <ArrowRight size={22} />
          </button>
        </div>
      </div>
      <div
        ref={ref}
        role="group"
        aria-label={label}
        tabIndex={0}
        className="no-scrollbar mt-[clamp(2rem,4vw,4rem)] flex snap-x snap-mandatory scroll-ps-[var(--gutter)] gap-[clamp(0.75rem,1.2vw,1.5rem)] overflow-x-auto px-[var(--gutter)]"
      >
        {children}
      </div>
    </div>
  );
}
