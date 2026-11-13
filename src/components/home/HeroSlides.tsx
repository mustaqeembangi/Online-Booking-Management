"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { UI, type Lang } from "@/i18n";

export interface HeroSlide {
  src: string;
  alt: string;
  href: string;
  label: string;
  position?: string;
}

const EVERY_MS = 6500;

// Crossfading photos with a slow zoom. Each slide links to its tour. Stops on hover, in a hidden tab
// and for people who prefer reduced motion (they can still pick a slide with the buttons).
export default function HeroSlides({ slides, lang }: { slides: HeroSlide[]; lang: Lang }) {
  const chooseLabel = UI[lang].hero.choose;
  const showLabel = UI[lang].hero.show;
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => {
      if (!document.hidden) setI((n) => (n + 1) % slides.length);
    }, EVERY_MS);
    return () => clearInterval(t);
  }, [paused, slides.length]);

  const s = slides[i];
  return (
    <>
      <div
        className="absolute inset-0 -z-20"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {slides.map((sl, n) => (
          <Link
            key={sl.src}
            href={sl.href}
            tabIndex={n === i ? 0 : -1}
            aria-hidden={n !== i}
            aria-label={sl.label}
            className={`absolute inset-0 overflow-hidden transition-opacity duration-[1400ms] ease-out ${
              n === i ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            <Image
              src={sl.src}
              alt={sl.alt}
              fill
              priority={n === 0}
              sizes="100vw"
              quality={75}
              className={`object-cover ${sl.position ?? ""} ${n === i ? "hero-slide-active" : ""}`}
            />
          </Link>
        ))}
      </div>

      <div className="absolute left-[var(--gutter)] right-[var(--gutter)] top-[calc(5.5rem+env(safe-area-inset-top))] z-10 flex items-center gap-3 md:top-28 [@media(max-height:640px)]:hidden">
        <div className="flex gap-1.5" role="group" aria-label={chooseLabel}>
          {slides.map((sl, n) => (
            <button
              key={sl.src}
              type="button"
              onClick={() => setI(n)}
              aria-label={showLabel(sl.label)}
              aria-current={n === i ? "true" : undefined}
              className="group grid h-8 place-items-center"
            >
              <span
                className={`block h-1.5 rounded-full transition-[width,background-color] duration-500 ${
                  n === i ? "w-9 bg-brand" : "w-4 bg-white/45 group-hover:bg-white"
                }`}
              />
            </button>
          ))}
        </div>
        <Link
          key={s.href + i}
          href={s.href}
          className="group inline-flex min-w-0 items-center gap-1.5 text-sm font-medium text-white/85 [animation:fade-in_0.6s_ease-out] hover:text-white"
        >
          <span className="truncate">{s.label}</span>
          <ArrowUpRight size={16} aria-hidden className="shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
        </Link>
      </div>
    </>
  );
}
