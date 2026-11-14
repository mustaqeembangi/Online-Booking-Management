import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { REVIEWS } from "@/data/reviews";
import { getTourIn } from "@/data/tours";
import { UI, lp, type Lang } from "@/i18n";
import Testimonials from "./Testimonials";

// Left: about the company with a photo. Right: real guest reviews, one at a time.
export default function AboutSays({ lang }: { lang: Lang }) {
  const c = UI[lang].classic;
  const quotes = Object.entries(REVIEWS).flatMap(([slug, list]) =>
    list
      .filter((r) => r.text.length > 90 && r.text.length < 420)
      .slice(0, 2)
      .map((r) => ({ text: r.text, name: r.name, country: r.country, tour: getTourIn(slug, lang)?.title ?? "" })),
  );
  return (
    <section className="on-ink bg-forest text-white">
      <div className="mx-auto grid max-w-[1240px] lg:grid-cols-[1.1fr_1fr] xl:px-6">
        <div className="relative isolate overflow-hidden px-[var(--gutter)] py-[clamp(2.5rem,5vw,4rem)] xl:px-0 xl:pe-10">
          <Image
            src="/images/tours/red-dune-safari-quad-camel-bbq-4.jpg"
            alt=""
            fill
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="-z-20 object-cover opacity-40"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-forest via-forest/85 to-forest/40 rtl:bg-gradient-to-l" />
          <h2 className="reveal text-[clamp(1.6rem,2.8vw,2.3rem)]">
            {c.aboutTitle[0]} <span className="accent-word text-brand">{c.aboutTitle[1]}</span>
          </h2>
          <p className="reveal mt-4 max-w-md leading-relaxed text-white/85">{c.aboutText}</p>
          <Link
            href={lp(lang, "/about")}
            className="reveal mt-6 inline-flex items-center gap-2 rounded-full bg-green px-6 py-3 font-semibold text-white transition-colors hover:bg-brand hover:text-ink"
          >
            {c.learnMore}
            <ArrowRight size={18} aria-hidden />
          </Link>
        </div>
        <div className="px-[var(--gutter)] py-[clamp(2.5rem,5vw,4rem)] xl:px-0 xl:ps-10">
          <h2 className="reveal mb-5 text-[clamp(1.4rem,2.2vw,1.8rem)]">{c.saysTitle}</h2>
          <Testimonials quotes={quotes} labels={{ prev: c.prev, next: c.next, stars: UI[lang].reviews.stars(5) }} />
        </div>
      </div>
    </section>
  );
}
