import { Building2, Landmark, Sun, Zap } from "lucide-react";
import Link from "next/link";
import { getTours } from "@/data/tours";
import { UI, lp, type Lang } from "@/i18n";
import HeroSlides, { type HeroSlide } from "@/components/home/HeroSlides";
import HeroSearch from "@/components/home/HeroSearch";

const T = "/images/tours/";
// Background photos (they fade slowly from one to the next); alt text comes from UI[lang].hero.slides.
const SLIDES = [
  { src: `${T}evening-tour-quad-camel-bbq.jpg`, href: "/tours/evening-tour-quad-camel-bbq", position: "object-[30%_center]" },
  { src: `${T}red-dune-safari-quad-camel-bbq-4.jpg`, href: "/tours/red-dune-safari-quad-camel-bbq" },
  { src: `${T}safari-quad-camel-bbq-buffet.jpg`, href: "/tours/safari-quad-camel-bbq-buffet", position: "object-[60%_center]" },
  { src: `${T}abu-dhabi-city-tour-qasr-al-watan.jpg`, href: "/tours/abu-dhabi-city-tour-qasr-al-watan" },
];

const CHIPS = [
  { icon: Sun, href: "/tours?category=desert-safari" },
  { icon: Zap, href: "/tours/desert-safari-quad-camel-sandboarding" },
  { icon: Building2, href: "/tours?category=city-tours" },
  { icon: Landmark, href: "/tours/abu-dhabi-tour-sheikh-zayed-mosque" },
];

export default function Hero({ lang }: { lang: Lang }) {
  const t = UI[lang];
  const c = t.classic;
  const slides: HeroSlide[] = SLIDES.map((s, i) => ({ ...s, href: lp(lang, s.href), ...t.hero.slides[[0, 1, 2, 4][i]] }));
  const [line1, w, brand] = c.heroTitle;
  return (
    <section className="on-ink relative isolate overflow-hidden bg-forest text-white">
      <HeroSlides slides={slides} lang={lang} controls={false} />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-ink/85 via-ink/45 to-ink/5 rtl:bg-gradient-to-l" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-1/3 bg-gradient-to-t from-ink/60 to-transparent" />

      <div className="mx-auto max-w-[1240px] px-[var(--gutter)] pb-[clamp(2rem,4vw,3.5rem)] pt-[clamp(2.5rem,7vw,6rem)] xl:px-6">
        <h1 className="hero-title hero-in max-w-3xl">
          {line1}
          <br />
          {w} <span className="accent-word text-brand">{brand}</span>
        </h1>
        <p className="hero-in mt-3 text-[clamp(1.05rem,1.6vw,1.4rem)] font-semibold text-white/95 [animation-delay:100ms]">{c.heroSub}</p>

        <ul className="hero-in mt-6 grid max-w-3xl grid-cols-4 gap-2 [animation-delay:180ms] sm:flex sm:flex-wrap sm:gap-x-6">
          {CHIPS.map(({ icon: Icon, href }, i) => (
            <li key={href}>
              <Link
                href={lp(lang, href)}
                className="group flex flex-col items-center gap-1.5 text-center text-[12.5px] font-semibold sm:flex-row sm:text-[15px]"
              >
                <span className="grid h-10 w-10 place-items-center rounded-full bg-green text-white shadow-lg transition-[scale,background-color] duration-300 group-hover:scale-110 group-hover:bg-brand group-hover:text-ink">
                  <Icon size={19} aria-hidden />
                </span>
                <span className="leading-tight group-hover:text-brand">{c.chips[i]}</span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="hero-in mt-[clamp(1.5rem,3.5vw,2.75rem)] [animation-delay:260ms]">
          <HeroSearch lang={lang} tours={getTours(lang).map((x) => ({ value: x.slug, label: x.title }))} />
        </div>
      </div>
    </section>
  );
}
