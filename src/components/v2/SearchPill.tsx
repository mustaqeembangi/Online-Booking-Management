"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Star } from "lucide-react";

export interface SearchItem {
  slug: string;
  title: string;
  image: string;
  meta: string;
  price: string;
  href: string;
  words: string; // everything searchable, in both languages
}

// OceanAir-style pill search: type to see matching tours with photo, rating and price.
export default function SearchPill({
  items,
  label,
  placeholder,
  empty,
  popular,
  allHref,
}: {
  items: SearchItem[];
  label: string;
  placeholder: string;
  empty: string;
  popular: string;
  allHref: string;
}) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const found = useMemo(() => {
    const words = q.toLowerCase().trim().split(/\s+/).filter(Boolean);
    return words.length ? items.filter((it) => words.every((w) => it.words.includes(w))) : items;
  }, [q, items]);

  return (
    <div
      ref={box}
      className="relative max-w-3xl"
      onBlur={(e) => !box.current?.contains(e.relatedTarget as Node) && setOpen(false)}
    >
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          router.push(found.length === 1 ? found[0].href : allHref);
        }}
      >
        <label className="sr-only" htmlFor="tour-search">{label}</label>
        <div className="flex h-14 items-center gap-3 rounded-full border border-white/30 bg-white/15 px-5 backdrop-blur-md transition-colors focus-within:bg-white focus-within:text-ink">
          <Search size={20} aria-hidden className="shrink-0 opacity-80" />
          <input
            id="tour-search"
            type="search"
            autoComplete="off"
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            placeholder={placeholder}
            className="h-full min-w-0 flex-1 bg-transparent text-[15px] outline-none placeholder:text-current placeholder:opacity-70"
          />
        </div>
      </form>
      {open && (
        <div className="absolute inset-x-0 top-[calc(100%+0.5rem)] z-30 max-h-[60svh] overflow-y-auto rounded-2xl bg-white p-2 text-ink shadow-2xl [animation:fade-in_0.15s_ease-out]">
          {!q && <p className="eyebrow px-3 pb-1 pt-2">{popular}</p>}
          {found.length === 0 ? (
            <p className="px-3 py-4 text-[14px] text-ink/60">{empty}</p>
          ) : (
            <ul>
              {found.map((it) => (
                <li key={it.slug}>
                  <Link href={it.href} className="flex items-center gap-3 rounded-xl p-2 hover:bg-mist focus:bg-mist focus:outline-none">
                    <span className="relative h-14 w-20 shrink-0 overflow-hidden rounded-lg bg-line">
                      <Image src={it.image} alt="" fill sizes="80px" className="object-cover" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="line-clamp-1 text-[14px] font-semibold">{it.title}</span>
                      <span className="mt-0.5 flex items-center gap-1 text-[12.5px] text-ink/60">
                        <Star size={12} className="fill-brand-deep text-brand-deep" aria-hidden />
                        {it.meta}
                      </span>
                    </span>
                    <span className="shrink-0 text-[13px] font-bold text-forest">{it.price}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
