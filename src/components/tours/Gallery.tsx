"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

// Photo grid with a full-screen viewer: tap a photo, then swipe, use the arrow keys or the buttons.
export default function Gallery({ photos, title }: { photos: string[]; title: string }) {
  const [open, setOpen] = useState<number | null>(null);
  const touchX = useRef<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const step = useCallback(
    (d: number) => setOpen((i) => (i === null ? i : (i + d + photos.length) % photos.length)),
    [photos.length],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open, step]);

  return (
    <>
      <div className="grid grid-cols-3 gap-1.5 sm:gap-[clamp(0.5rem,0.9vw,1rem)]">
        {photos.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setOpen(i)}
            aria-label={`Open photo ${i + 1} of ${photos.length}`}
            className={`group relative aspect-[3/2] cursor-zoom-in overflow-hidden rounded-[clamp(0.75rem,1.4vw,1.5rem)] bg-line ${
              i === 0 ? "col-span-3" : ""
            }`}
          >
            <Image
              src={src}
              alt={`${title}, photo ${i + 1}`}
              fill
              sizes={i === 0 ? "(min-width: 1024px) 55vw, 100vw" : "(min-width: 1024px) 18vw, 33vw"}
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      {open !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${title}: photo ${open + 1} of ${photos.length}`}
          className="fixed inset-0 z-[60] flex flex-col bg-ink/95 text-white backdrop-blur-sm [animation:fade-in_0.2s_ease-out]"
          onClick={(e) => e.target === e.currentTarget && setOpen(null)}
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 40) step(dx < 0 ? 1 : -1);
            touchX.current = null;
          }}
        >
          <div className="flex items-center justify-between px-[var(--gutter)] py-4">
            <span className="text-sm text-white/70">
              {open + 1} / {photos.length}
            </span>
            <button
              ref={closeRef}
              type="button"
              onClick={() => setOpen(null)}
              aria-label="Close photos"
              className="grid h-11 w-11 place-items-center rounded-full bg-white text-ink transition-colors hover:bg-brand"
            >
              <X size={20} />
            </button>
          </div>
          <div className="relative min-h-0 flex-1" onClick={(e) => e.target === e.currentTarget && setOpen(null)}>
            <Image
              key={photos[open]}
              src={photos[open]}
              alt={`${title}, photo ${open + 1}`}
              fill
              sizes="100vw"
              className="object-contain [animation:fade-in_0.25s_ease-out]"
            />
          </div>
          <div className="flex items-center justify-center gap-3 py-5">
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous photo"
              className="grid h-12 w-12 place-items-center rounded-full border border-white/30 transition-colors hover:bg-white hover:text-ink"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next photo"
              className="grid h-12 w-12 place-items-center rounded-full border border-white/30 transition-colors hover:bg-white hover:text-ink"
            >
              <ChevronRight size={22} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
