import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, SlidersHorizontal, Star, Tag } from "lucide-react";
import TourCard from "@/components/tours/TourCard";
import PageBanner from "@/components/classic/PageBanner";
import { REVIEWS } from "@/data/reviews";
import { aed, formatPrice, getCategories, getTours, type CategoryId } from "@/data/tours";
import { SITE } from "@/data/site";
import { pageMeta } from "@/lib/seo";
import { UI, lp, num, type Lang } from "@/i18n";

export type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const activeCategory = async (searchParams: SearchParams, lang: Lang) => {
  const sp = await searchParams;
  const raw = Array.isArray(sp.category) ? sp.category[0] : sp.category;
  return getCategories(lang).find((c) => c.id === raw);
};

export async function toursMeta(searchParams: SearchParams, lang: Lang): Promise<Metadata> {
  const t = UI[lang].toursPage;
  const active = await activeCategory(searchParams, lang);
  if (active) {
    return pageMeta({
      title: t.categoryMetaTitle(active.name),
      description: t.categoryMetaDescription(active.name, SITE.name, active.blurb),
      path: `/tours?category=${active.id}`,
      lang,
    });
  }
  return pageMeta({ title: t.metaTitle, description: t.metaDescription(getTours(lang).length, SITE.name), path: "/tours", lang });
}

const pill = "inline-flex h-10 items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 text-[13px] font-medium backdrop-blur-md";

// v2 tours page, styled after OceanAir's category page.
export default async function ToursView({ searchParams, lang }: { searchParams: SearchParams; lang: Lang }) {
  const v = UI[lang].v2;
  const t = UI[lang].toursPage;
  const categories = getCategories(lang);
  const all = getTours(lang);
  const active = await activeCategory(searchParams, lang);
  const list = active ? all.filter((x) => x.category === active.id) : all;
  const rated = list.filter((x) => x.gyg);
  const avg = rated.reduce((s, x) => s + x.gyg!.rating * x.gyg!.reviews, 0) / Math.max(1, rated.reduce((s, x) => s + x.gyg!.reviews, 0));
  const cheapest = list.filter((x) => x.price).sort((a, b) => a.price!.amount - b.price!.amount)[0];
  const best = [...rated].sort((a, b) => b.gyg!.reviews - a.gyg!.reviews).slice(0, 2);
  const catName = (id: CategoryId) => categories.find((c) => c.id === id)?.name ?? "";

  const chip = (on: boolean) =>
    `inline-flex h-10 shrink-0 items-center gap-1.5 rounded-full border px-4 text-[14px] font-medium transition-colors ${
      on ? "border-forest bg-forest text-white" : "border-line bg-white text-ink hover:border-forest"
    }`;

  return (
    <>
      <PageBanner
        lang={lang}
        eyebrow={active ? `${active.name} · ${v.destinations[active.id === "city-tours" ? "abu-dhabi" : "dubai"]}` : v.toursEyebrow}
        title={active ? active.name : v.toursTitle}
        sub={active ? active.blurb : v.toursText}
        image={active?.id === "city-tours" ? "/images/tours/abu-dhabi-city-tour-qasr-al-watan.jpg" : "/images/tours/safari-quad-camel-bbq-buffet-2.jpg"}
        crumb={active ? active.name : UI[lang].classic.toursBannerTitle}
        pills={
          <>
            <span className={pill}><CalendarDays size={15} aria-hidden />{v.statTours(list.length)}</span>
            {rated.length > 0 && <span className={pill}><Star size={15} className="fill-gold text-gold" aria-hidden />{v.statRating(avg.toFixed(1))}</span>}
            {cheapest?.price && <span className={pill}><Tag size={15} aria-hidden />{v.statFrom(aed(cheapest.price))}</span>}
          </>
        }
      />

      <div className="mx-auto max-w-[1240px] px-[var(--gutter)] xl:px-6">
        {best.length > 0 && (
          <section className="py-[clamp(2rem,4vw,3rem)]">
            <h2 className="text-[clamp(1.4rem,2.2vw,1.8rem)] font-semibold text-forest">{v.bestsellers}</h2>
            <p className="text-[14px] text-ink/60">{v.bestsellersSub(best.length)}</p>
            <div className="mt-5 grid gap-5 lg:grid-cols-2">
              {best.map((x) => {
                const quote = (REVIEWS[x.slug] ?? []).find((r) => r.text.length > 60 && r.text.length < 220);
                return (
                  <Link
                    key={x.slug}
                    href={lp(lang, `/tours/${x.slug}`)}
                    className="reveal group grid overflow-hidden rounded-2xl bg-forest text-white shadow-[0_24px_50px_-30px_rgb(3_40_54/0.8)] sm:grid-cols-2"
                  >
                    <span className="relative block aspect-[4/3] overflow-hidden sm:aspect-auto">
                      <Image src={x.image} alt="" fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                      <span className="absolute start-3 top-3 rounded-full bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-forest">{v.topRated}</span>
                      <span className="absolute bottom-3 start-3 inline-flex items-center gap-1 rounded-full bg-forest/85 px-3 py-1 text-[12px]">
                        <Star size={12} className="fill-gold text-gold" aria-hidden />
                        {x.gyg!.rating.toFixed(1)} · {UI[lang].tour.reviewCount(num(lang, x.gyg!.reviews))}
                      </span>
                    </span>
                    <span className="flex flex-col p-5">
                      <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand">{v.topIn(catName(x.category))}</span>
                      <span className="mt-2 text-lg font-semibold leading-snug">{x.title}</span>
                      {quote && (
                        <span className="mt-3 block border-s-2 border-brand/60 ps-3 text-[13.5px] text-white/80">
                          <span lang="en" dir="ltr" className="line-clamp-3 text-start">“{quote.text}”</span>
                          <span className="mt-1 block text-[12px] text-white/55">{quote.name}{quote.country && ` · ${quote.country}`}</span>
                        </span>
                      )}
                      <span className="mt-auto flex items-end justify-between gap-3 pt-5">
                        <span className="leading-tight">
                          <span className="block text-[11px] text-white/55">{UI[lang].price.from}</span>
                          <span className="whitespace-nowrap text-lg font-bold">{x.price && aed(x.price)}</span>
                          {x.price?.currency === "USD" && <span className="ms-1.5 text-[11px] text-white/50">~{formatPrice(x.price)}</span>}
                        </span>
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-[13px] font-semibold text-forest">
                          {v.viewTour}
                          <ArrowRight size={14} aria-hidden />
                        </span>
                      </span>
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        <nav aria-label={t.filter} className="no-scrollbar sticky top-[4.5rem] z-20 -mx-[var(--gutter)] flex gap-2 overflow-x-auto border-y border-line bg-mist/95 px-[var(--gutter)] py-3 backdrop-blur xl:mx-0 xl:rounded-full xl:border xl:px-3">
          <span className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-full bg-forest px-4 text-[14px] font-semibold text-white">
            <SlidersHorizontal size={15} aria-hidden />
            {v.filters}
          </span>
          <Link href={lp(lang, "/tours")} scroll={false} aria-current={!active ? "page" : undefined} className={chip(!active)}>
            {UI[lang].classic.allTours}
          </Link>
          {categories.map((c) => (
            <Link
              key={c.id}
              href={lp(lang, `/tours?category=${c.id}`)}
              scroll={false}
              aria-current={active?.id === c.id ? "page" : undefined}
              className={chip(active?.id === c.id)}
            >
              {c.name}
            </Link>
          ))}
        </nav>

        <section className="py-[clamp(2rem,4vw,3rem)]">
          <h2 className="text-[clamp(1.3rem,2vw,1.6rem)] font-semibold text-forest">
            {v.allToursTitle} <span className="text-[15px] font-normal text-ink/55">· {v.showing(list.length)}</span>
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {list.map((x) => (
              <TourCard key={x.slug} tour={x} lang={lang} className="reveal" />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
