"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Stars from "@/components/ui/Stars";

export interface Quote {
  text: string;
  name: string;
  country?: string;
  tour: string;
}

// Real GetYourGuide reviews, one at a time; changes every 7 seconds unless the visitor is using it.
export default function Testimonials({
  quotes,
  labels,
}: {
  quotes: Quote[];
  labels: { prev: string; next: string; stars: string };
}) {
  const [i, setI] = useState(0);
  const [hold, setHold] = useState(false);
  useEffect(() => {
    if (hold || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setI((n) => (n + 1) % quotes.length), 7000);
    return () => clearInterval(id);
  }, [hold, quotes.length]);
  const q = quotes[i];
  const go = (d: number) => {
    setHold(true);
    setI((n) => (n + d + quotes.length) % quotes.length);
  };
  const btn =
    "grid h-10 w-10 place-items-center rounded-full border border-white/30 text-white transition-colors hover:border-brand hover:bg-brand hover:text-ink";
  return (
    <div onMouseEnter={() => setHold(true)} onMouseLeave={() => setHold(false)}>
      <figure key={i} className="min-h-[12rem] rounded-2xl border border-white/15 bg-white/5 p-6 [animation:fade-in_0.5s_ease-out]">
        <blockquote lang="en" dir="ltr" className="line-clamp-6 text-start text-[1.05rem] leading-relaxed text-white/90">
          “{q.text}”
        </blockquote>
        <div className="mt-4">
          <Stars value={5} size={18} label={labels.stars} />
        </div>
        <figcaption className="mt-2 text-sm text-white/70">
          — <span className="font-semibold text-white">{q.name}</span>
          {q.country && `, ${q.country}`} · {q.tour}
        </figcaption>
      </figure>
      <div className="mt-4 flex justify-end gap-2">
        <button type="button" aria-label={labels.prev} onClick={() => go(-1)} className={btn}>
          <ChevronLeft size={20} />
        </button>
        <button type="button" aria-label={labels.next} onClick={() => go(1)} className={btn}>
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
