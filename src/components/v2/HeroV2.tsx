import Link from "next/link";
import { Check, Star } from "lucide-react";
import { GYG_TOTAL_REVIEWS, TOURS, aed, destinationOf, getTours, localizeTour } from "@/data/tours";
import { UI, lp, num, type Lang } from "@/i18n";
import HeroSlides from "@/components/home/HeroSlides";
import SearchPill from "./SearchPill";

const T = "/images/tours/";
const SLIDES = [
  { src: `${T}safari-quad-camel-bbq-buffet-2.jpg`, href: "/tours/safari-quad-camel-bbq-buffet" },
  { src: `${T}evening-tour-quad-camel-bbq.jpg`, href: "/tours/evening-tour-quad-camel-bbq", position: "object-[30%_center]" },
  { src: `${T}red-dune-safari-quad-camel-bbq-4.jpg`, href: "/tours/red-dune-safari-quad-camel-bbq" },
];
// Quick picks under the search bar, in the order of UI[lang].v2.quick.
const QUICK = [
  "/tours/red-dune-safari-quad-camel-bbq",
  "/tours/evening-tour-quad-camel-bbq",
  "/tours/safari-quad-camel-bbq-buffet",
  "/tours/abu-dhabi-tour-sheikh-zayed-mosque",
  "/tours/abu-dhabi-city-tour-qasr-al-watan",
];

export default function HeroV2({ lang }: { lang: Lang }) {
  const t = UI[lang];
  const v = t.v2;
  const items = getTours(lang).map((x) => {
    const en = localizeTour(TOURS.find((y) => y.slug === x.slug)!, "en");
    const ar = localizeTour(en, "ar");
    return {
      slug: x.slug,
      title: x.title,
      image: x.image,
      meta: `${x.gyg?.rating.toFixed(1) ?? ""} · ${v.destinations[destinationOf(x)]} · ${x.duration ?? ""}`,
      price: x.price ? aed(x.price) : "",
      href: lp(lang, `/tours/${x.slug}`),
      words: [en.title, ar.title, ...(en.tags ?? []), ...(ar.tags ?? []), en.summary, ar.summary].join(" ").toLowerCase(),
    };
  });
  return (
    <section className="on-ink relative isolate -mt-[4.5rem] overflow-hidden bg-forest pt-[4.5rem] text-white">
      <HeroSlides slides={SLIDES.map((s, i) => ({ ...s, href: lp(lang, s.href), ...t.hero.slides[[2, 0, 1][i]] }))} lang={lang} controls={false} />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-forest/70 via-forest/45 to-forest/80" />
      <div className="mx-auto max-w-[1240px] px-[var(--gutter)] pb-[clamp(3rem,7vw,6rem)] pt-[clamp(3rem,9vw,7rem)] xl:px-6">
        <p className="hero-in text-[12px] font-bold uppercase tracking-[0.2em] text-white/85">{v.heroEyebrow}</p>
        <h1 className="hero-in mt-4 max-w-3xl text-[clamp(2.2rem,4.6vw,3.6rem)] font-semibold leading-[1.1] [animation-delay:80ms]">{v.heroTitle}</h1>
        <p className="hero-in mt-4 max-w-xl text-[clamp(1rem,1.3vw,1.1rem)] leading-relaxed text-white/85 [animation-delay:140ms]">{v.heroText}</p>
        <p className="hero-in mt-8 text-[12px] font-bold uppercase tracking-[0.2em] text-white/85 [animation-delay:200ms]">{v.searchLabel}</p>
        <div className="hero-in mt-3 [animation-delay:240ms]">
          <SearchPill
            items={items}
            label={v.searchLabel}
            placeholder={v.searchPlaceholder}
            empty={v.searchEmpty}
            popular={v.popularSearches}
            allHref={lp(lang, "/tours")}
          />
        </div>
        <ul className="hero-in mt-4 flex flex-wrap gap-2 [animation-delay:300ms]">
          {v.quick.map((label, i) => (
            <li key={label}>
              <Link
                href={lp(lang, QUICK[i])}
                className="inline-flex h-9 items-center rounded-full border border-white/30 bg-white/10 px-4 text-[13px] font-medium backdrop-blur-sm transition-colors hover:bg-white hover:text-forest"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="border-t border-white/10 bg-forest/90 backdrop-blur">
        <ul className="mx-auto flex max-w-[1240px] flex-wrap items-center gap-x-8 gap-y-2 px-[var(--gutter)] py-3.5 text-[13px] xl:px-6">
          <li className="inline-flex items-center gap-1.5">
            <Star size={14} className="fill-gold text-gold" aria-hidden />
            <span className="font-bold">4.9</span> {v.strip.reviews(num(lang, Math.floor(GYG_TOTAL_REVIEWS / 1000) * 1000) + "+")}
          </li>
          {[v.strip.pickup, v.strip.pay, v.strip.support].map((s) => (
            <li key={s} className="inline-flex items-center gap-1.5 text-white/85">
              <Check size={14} className="text-brand" aria-hidden />
              {s}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
