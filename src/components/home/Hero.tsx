import { MessageCircle, Star } from "lucide-react";
import Button from "@/components/ui/Button";
import { SITE } from "@/data/site";
import { GYG_TOTAL_REVIEWS } from "@/data/tours";
import { whatsappLink } from "@/lib/whatsapp";
import { UI, lp, num, type Lang } from "@/i18n";
import HeroSlides, { type HeroSlide } from "@/components/home/HeroSlides";

const T = "/images/tours/";
// Photos and links; the alt text and labels come from UI[lang].hero.slides, in the same order.
const SLIDES = [
  { src: `${T}evening-tour-quad-camel-bbq.jpg`, href: "/tours/evening-tour-quad-camel-bbq", position: "object-[35%_center]" },
  { src: `${T}red-dune-safari-quad-camel-bbq-4.jpg`, href: "/tours/red-dune-safari-quad-camel-bbq" },
  { src: `${T}safari-quad-camel-bbq-buffet.jpg`, href: "/tours/safari-quad-camel-bbq-buffet", position: "object-[60%_center]" },
  { src: `${T}red-dune-safari-quad-camel-bbq-12.jpg`, href: "/tours/red-dune-safari-quad-camel-bbq" },
  { src: `${T}abu-dhabi-city-tour-qasr-al-watan.jpg`, href: "/tours/abu-dhabi-city-tour-qasr-al-watan" },
];

export default function Hero({ lang }: { lang: Lang }) {
  const t = UI[lang];
  const rounded = Math.floor(GYG_TOTAL_REVIEWS / 10000) * 10000;
  const slides: HeroSlide[] = SLIDES.map((s, i) => ({ ...s, href: lp(lang, s.href), ...t.hero.slides[i] }));
  const [w1, w2, w3] = t.hero.words;
  return (
    <section className="on-ink relative isolate flex min-h-[100svh] items-end overflow-hidden bg-ink text-white">
      <HeroSlides slides={slides} lang={lang} />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/35 to-ink/25" />

      <div className="grid w-full items-end gap-[clamp(1.25rem,3vw,3rem)] px-[var(--gutter)] pb-[clamp(1.5rem,4svh,3.5rem)] pt-24 md:grid-cols-[1fr_minmax(280px,380px)]">
        <h1 className="hero-title hero-in">
          <span className="block">{w1}</span>
          <span className="block">{w2}</span>
          <span className="accent-word block text-brand">{w3}</span>
        </h1>
        <div className="hero-in [animation-delay:150ms]">
          <p className="text-[clamp(1.05rem,1.35vw,1.35rem)] leading-snug text-white/90">{t.hero.text}</p>
          <div className="mt-5 flex flex-wrap gap-2.5">
            <Button href={lp(lang, "/tours")} size="lg">{t.hero.viewTours}</Button>
            <Button href={whatsappLink()} size="lg" variant="glass" icon={<MessageCircle size={20} />}>
              {t.nav.whatsapp}
            </Button>
          </div>
          <a
            href={SITE.socials.getyourguide}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex max-w-[calc(100%-4.5rem)] items-center gap-1.5 text-sm text-white/80 hover:text-white md:max-w-none"
          >
            <Star size={15} className="fill-brand text-brand" aria-hidden />
            {t.hero.moreThan(num(lang, rounded))}
          </a>
        </div>
      </div>
    </section>
  );
}
