import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import TourCard from "@/components/tours/TourCard";
import { GYG_TOTAL_REVIEWS, destinationOf, getTourIn, getTours } from "@/data/tours";
import { UI, lp, num, type Lang } from "@/i18n";
import SectionHead from "./SectionHead";
import Tabs from "./Tabs";

const wrap = "mx-auto max-w-[1240px] px-[var(--gutter)] xl:px-6";
const DESTS = ["dubai", "abu-dhabi"] as const;
const DEST_IMG = { dubai: "/images/tours/safari-quad-camel-bbq-buffet-2.jpg", "abu-dhabi": "/images/tours/abu-dhabi-tour-sheikh-zayed-mosque-2.jpg" };
const DEST_LINK = { dubai: "/tours?category=desert-safari", "abu-dhabi": "/tours?category=city-tours" };

export function ByDestination({ lang }: { lang: Lang }) {
  const v = UI[lang].v2;
  const tours = getTours(lang);
  return (
    <section className={`${wrap} py-[clamp(2.5rem,5vw,4rem)]`}>
      <SectionHead eyebrow={v.destEyebrow} title={v.destTitle} more={{ href: lp(lang, "/tours"), label: v.viewAll }} />
      <Tabs
        tabs={DESTS.map((d) => ({
          id: d,
          label: v.destinations[d],
          content: (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {tours.filter((x) => destinationOf(x) === d).map((x) => (
                <TourCard key={x.slug} tour={x} lang={lang} />
              ))}
            </div>
          ),
        }))}
      />
    </section>
  );
}

export function WhereWeGo({ lang }: { lang: Lang }) {
  const v = UI[lang].v2;
  const tours = getTours(lang);
  return (
    <section className="border-y border-line bg-white">
      <div className={`${wrap} py-[clamp(2.5rem,5vw,4rem)]`}>
        <SectionHead title={v.goTitle} sub={v.goText} />
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {DESTS.map((d) => (
            <Link key={d} href={lp(lang, DEST_LINK[d])} className="reveal group">
              <span className="relative block aspect-[16/10] overflow-hidden rounded-2xl bg-line">
                <Image src={DEST_IMG[d]} alt="" fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <span className="absolute inset-0 bg-gradient-to-t from-forest/80 via-forest/10 to-transparent" />
                <span className="absolute bottom-4 start-5 text-white">
                  <span className="block text-2xl font-semibold">{v.destinations[d]}</span>
                  <span className="block text-[13px] text-white/80">{v.experiences(tours.filter((x) => destinationOf(x) === d).length)}</span>
                </span>
              </span>
              <span className="mt-2 block text-[13.5px] text-ink/60">{v.destTagline[d]}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Spotlight({ lang }: { lang: Lang }) {
  const v = UI[lang].v2;
  const tour = getTourIn("red-dune-safari-quad-camel-bbq", lang)!;
  return (
    <section className="on-ink relative isolate overflow-hidden bg-forest text-white">
      <Image src="/images/tours/red-dune-safari-quad-camel-bbq-12.jpg" alt="" fill sizes="100vw" className="-z-20 object-cover opacity-50" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-forest via-forest/80 to-forest/30 rtl:bg-gradient-to-l" />
      <div className={`${wrap} grid items-center gap-10 py-[clamp(3rem,6vw,5rem)] lg:grid-cols-[1.2fr_1fr]`}>
        <div className="reveal">
          <p className="eyebrow !text-brand">{v.spotEyebrow}</p>
          <h2 className="mt-3 text-[clamp(1.8rem,3.4vw,2.6rem)] font-semibold leading-tight">{v.spotTitle}</h2>
          <p className="mt-4 max-w-lg text-white/80">{v.spotText}</p>
          <Link
            href={lp(lang, `/tours/${tour.slug}`)}
            className="mt-7 inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 font-semibold backdrop-blur transition-colors hover:bg-white hover:text-forest"
          >
            {v.spotCta}
            <ArrowRight size={17} aria-hidden />
          </Link>
        </div>
        <ul className="reveal grid grid-cols-2 gap-3">
          {v.spotStats.map((s) => (
            <li key={s.big} className="rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-md">
              <span className="block text-2xl font-semibold">{s.big}</span>
              <span className="mt-1 block text-[13px] text-white/75">{s.small(num(lang, tour.gyg?.reviews ?? 0))}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Standard({ lang }: { lang: Lang }) {
  const v = UI[lang].v2;
  return (
    <section className={`${wrap} grid items-center gap-10 py-[clamp(3rem,6vw,5rem)] lg:grid-cols-2`}>
      <div className="reveal">
        <p className="eyebrow">{v.stdEyebrow}</p>
        <h2 className="mt-2 text-[clamp(1.6rem,2.8vw,2.2rem)] font-semibold leading-tight text-forest">{v.stdTitle}</h2>
        <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-ink/70">{v.stdText}</p>
        <ul className="mt-8 grid gap-5 sm:grid-cols-3">
          {v.stdPoints.map((p) => (
            <li key={p.title} className="border-t border-line pt-3">
              <p className="text-[14px] font-semibold text-forest">{p.title}</p>
              <p className="mt-1 text-[13px] leading-relaxed text-ink/60">{p.text}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="reveal relative aspect-[4/3] overflow-hidden rounded-3xl shadow-[0_30px_60px_-30px_rgb(3_40_54/0.6)] lg:aspect-[5/4]">
        <Image src="/images/tours/desert-safari-quad-camel-sandboarding-11.jpg" alt="" fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
        <div className="absolute inset-x-4 bottom-4 flex items-center gap-3 rounded-2xl bg-white/95 p-4 backdrop-blur">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-forest text-sm font-bold text-white">A</span>
          <span>
            <span className="block text-[14px] font-semibold text-forest">{v.stdBadge}</span>
            <span className="block text-[12.5px] text-ink/60">{v.stdBadgeSub}</span>
          </span>
        </div>
      </div>
    </section>
  );
}

export function WhyUs({ lang }: { lang: Lang }) {
  const v = UI[lang].v2;
  const total = num(lang, Math.floor(GYG_TOTAL_REVIEWS / 1000) * 1000);
  return (
    <section className="border-t border-line bg-gradient-to-b from-mist to-white">
      <div className={`${wrap} grid gap-10 py-[clamp(3rem,5vw,4.5rem)] lg:grid-cols-[1.1fr_2fr]`}>
        <div className="reveal">
          <p className="eyebrow">{v.whyEyebrow}</p>
          <h2 className="mt-2 text-[clamp(1.4rem,2.2vw,1.8rem)] font-semibold leading-tight text-forest">{v.whyTitle}</h2>
          <p className="mt-3 text-[14.5px] text-ink/65">{v.whyText}</p>
        </div>
        <ul className="grid gap-8 sm:grid-cols-3">
          {v.whyStats.map((s) => (
            <li key={s.label} className="reveal">
              <span className="block text-[2rem] font-semibold leading-none text-forest">{s.big}</span>
              <span className="mt-2 block text-[14px] font-semibold">{s.label}</span>
              <span className="mt-1 block text-[13px] text-ink/55">{s.sub(total)}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
