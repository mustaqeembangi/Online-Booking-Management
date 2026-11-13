"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Images, X } from "lucide-react";

// One full-screen photo viewer per tour page. Any PhotoTrigger inside it opens the viewer at its photo:
// swipe, arrow keys or the buttons move between photos, Esc or a tap outside the photo closes it.

const Ctx = createContext<(index: number) => void>(() => {});

export function PhotoViewer({
  photos,
  title,
  children,
}: {
  photos: string[];
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState<number | null>(null);
  const touchX = useRef<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  const show = useCallback((i: number) => {
    returnFocus.current = document.activeElement as HTMLElement | null;
    setOpen(i);
  }, []);
  const close = useCallback(() => {
    setOpen(null);
    returnFocus.current?.focus();
  }, []);
  const step = useCallback(
    (d: number) => setOpen((i) => (i === null ? i : (i + d + photos.length) % photos.length)),
    [photos.length],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
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
  }, [open, step, close]);

  return (
    <Ctx.Provider value={show}>
      {children}
      {open !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${title}: photo ${open + 1} of ${photos.length}`}
          className="fixed inset-0 z-[60] flex flex-col bg-ink/95 text-white backdrop-blur-sm [animation:fade-in_0.2s_ease-out]"
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 40) step(dx < 0 ? 1 : -1);
            touchX.current = null;
          }}
        >
          <div className="flex items-center justify-between gap-4 px-[var(--gutter)] py-4">
            <p className="min-w-0 truncate text-sm text-white/70">
              <span className="font-semibold text-white">
                {open + 1} / {photos.length}
              </span>
              <span className="ml-3 hidden sm:inline">{title}</span>
            </p>
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              aria-label="Close photos"
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white text-ink transition-[background-color,transform] duration-300 hover:rotate-90 hover:bg-brand active:scale-95"
            >
              <X size={20} />
            </button>
          </div>

          <div className="relative min-h-0 flex-1" onClick={(e) => e.target === e.currentTarget && close()}>
            <Image
              key={photos[open]}
              src={photos[open]}
              alt={`${title}, photo ${open + 1}`}
              fill
              sizes="100vw"
              className="pointer-events-none object-contain px-2 [animation:photo-in_0.35s_cubic-bezier(0.2,0.7,0.2,1)]"
            />
            {/* Load the neighbours in the background so stepping feels instant. */}
            {[-1, 1].map((d) => {
              const n = (open + d + photos.length) % photos.length;
              return <Image key={`pre-${photos[n]}`} src={photos[n]} alt="" fill sizes="100vw" loading="eager" className="invisible" aria-hidden />;
            })}
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous photo"
              className="absolute left-[max(0.75rem,calc(var(--gutter)-1rem))] top-1/2 hidden h-14 w-14 -translate-y-1/2 place-items-center rounded-full border border-white/30 bg-ink/40 backdrop-blur transition-[background-color,color,transform] duration-300 hover:bg-white hover:text-ink active:scale-95 md:grid"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next photo"
              className="absolute right-[max(0.75rem,calc(var(--gutter)-1rem))] top-1/2 hidden h-14 w-14 -translate-y-1/2 place-items-center rounded-full border border-white/30 bg-ink/40 backdrop-blur transition-[background-color,color,transform] duration-300 hover:bg-white hover:text-ink active:scale-95 md:grid"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Thumbnail strip: tap to jump. */}
          <div className="no-scrollbar flex gap-2 overflow-x-auto px-[var(--gutter)] py-4">
            {photos.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => setOpen(i)}
                aria-label={`Show photo ${i + 1}`}
                aria-current={i === open ? "true" : undefined}
                ref={(el) => {
                  if (el && i === open) el.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
                }}
                className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-lg transition-[opacity,transform] duration-300 ${
                  i === open ? "opacity-100 ring-2 ring-brand" : "opacity-50 hover:opacity-90"
                }`}
              >
                <Image src={src} alt="" fill sizes="80px" className="object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </Ctx.Provider>
  );
}

export function PhotoTrigger({
  index,
  label,
  className = "",
  children,
}: {
  index: number;
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  const show = useContext(Ctx);
  return (
    <button type="button" onClick={() => show(index)} aria-label={label} className={`cursor-zoom-in ${className}`}>
      {children}
    </button>
  );
}

// Grid of the tour's other photos. `offset` is the position of the first one in the viewer.
export function GalleryGrid({ photos, offset, title }: { photos: string[]; offset: number; title: string }) {
  return (
    <div className="grid grid-cols-3 gap-1.5 sm:gap-[clamp(0.5rem,0.9vw,1rem)]">
      {photos.map((src, i) => (
        <PhotoTrigger
          key={src}
          index={i + offset}
          label={`Open photo ${i + offset + 1}`}
          className={`reveal group relative aspect-[3/2] overflow-hidden rounded-[clamp(0.75rem,1.4vw,1.5rem)] bg-line transition-transform duration-300 active:scale-[0.97] ${
            i === 0 ? "col-span-3" : ""
          }`}
        >
          <Image
            src={src}
            alt={`${title}, photo ${i + offset + 1}`}
            fill
            sizes={i === 0 ? "(min-width: 1024px) 55vw, 100vw" : "(min-width: 1024px) 18vw, 33vw"}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
        </PhotoTrigger>
      ))}
    </div>
  );
}

export function PhotoCount({ count }: { count: number }) {
  return (
    <span className="pointer-events-none absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full bg-ink/80 px-4 py-2.5 text-sm font-semibold text-white backdrop-blur transition-transform duration-300 group-hover:scale-105">
      <Images size={16} aria-hidden />
      View all {count} photos
    </span>
  );
}
