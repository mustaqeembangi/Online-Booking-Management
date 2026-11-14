import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Building2, Compass, Sun } from "lucide-react";
import TourCard from "@/components/tours/TourCard";
import PageBanner from "@/components/classic/PageBanner";
import CtaBanner from "@/components/classic/CtaBanner";
import TrustStrip from "@/components/classic/TrustStrip";
import { getCategories, getTours, type CategoryId } from "@/data/tours";
import { SITE } from "@/data/site";
import { pageMeta } from "@/lib/seo";
import { UI, lp, type Lang } from "@/i18n";

export type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const ICON: Record<CategoryId, typeof Sun> = { "desert-safari": Sun, "city-tours": Building2 };

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

export default async function ToursView({ searchParams, lang }: { searchParams: SearchParams; lang: Lang }) {
  const c = UI[lang].classic;
  const t = UI[lang].toursPage;
  const categories = getCategories(lang);
  const tours = getTours(lang);
  const active = await activeCategory(searchParams, lang);
  const shown = active ? categories.filter((x) => x.id === active.id) : categories;

  const tab = (on: boolean) =>
    `group flex min-w-[7.5rem] flex-1 flex-col items-center gap-2 rounded-2xl border px-4 py-4 text-center text-[15px] font-semibold transition-[background-color,color,translate,box-shadow] duration-300 hover:-translate-y-0.5 sm:flex-none ${
      on
        ? "border-green bg-green text-white shadow-[0_14px_28px_-14px_rgb(31_138_60/0.9)]"
        : "border-line bg-white text-ink shadow-[0_10px_24px_-18px_rgb(11_18_14/0.5)] hover:border-green"
    }`;

  return (
    <>
      <PageBanner
        lang={lang}
        title={c.toursBannerTitle}
        sub={c.toursBannerSub}
        image="/images/tours/red-dune-safari-quad-camel-bbq.jpg"
        crumb={active ? active.name : c.toursBannerTitle}
      />

      <div className="mx-auto max-w-[1240px] px-[var(--gutter)] xl:px-6">
        <nav aria-label={t.filter} className="no-scrollbar -mt-6 flex gap-3 overflow-x-auto pb-2 pt-1 sm:overflow-visible">
          <Link href={lp(lang, "/tours")} scroll={false} aria-current={!active ? "page" : undefined} className={tab(!active)}>
            <Compass size={34} strokeWidth={1.6} aria-hidden className={!active ? "text-white" : "text-green"} />
            {c.allTours}
          </Link>
          {categories.map((cat) => {
            const Icon = ICON[cat.id];
            const on = active?.id === cat.id;
            return (
              <Link
                key={cat.id}
                href={lp(lang, `/tours?category=${cat.id}`)}
                scroll={false}
                aria-current={on ? "page" : undefined}
                className={tab(on)}
              >
                <Icon size={34} strokeWidth={1.6} aria-hidden className={on ? "text-white" : "text-green"} />
                {cat.name}
              </Link>
            );
          })}
        </nav>

        {shown.map((cat, i) => {
          const Icon = ICON[cat.id];
          const intro = c.categoryIntro[cat.id];
          const list = tours.filter((x) => x.category === cat.id);
          return (
            <section
              key={cat.id}
              className={`py-[clamp(2rem,4vw,3rem)] ${i > 0 ? "border-t border-line" : ""}`}
            >
              <div className="reveal mb-6 flex flex-wrap items-center gap-x-5 gap-y-3">
                <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-gold text-forest">
                  <Icon size={32} strokeWidth={1.7} aria-hidden />
                </span>
                <div className="min-w-0 flex-1">
                  <h2 className="text-[clamp(1.4rem,2.4vw,1.9rem)] leading-tight text-forest">{intro.title}</h2>
                  <p className="mt-1 text-ink/70">{intro.text}</p>
                </div>
                {!active && (
                  <Link
                    href={lp(lang, `/tours?category=${cat.id}`)}
                    scroll={false}
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-full border-2 border-green px-4 py-1.5 text-sm font-semibold text-green transition-colors hover:bg-green hover:text-white"
                  >
                    {intro.all}
                    <ArrowRight size={15} aria-hidden />
                  </Link>
                )}
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {list.map((x) => (
                  <TourCard key={x.slug} tour={x} lang={lang} className="reveal" />
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <CtaBanner lang={lang} />
      <TrustStrip lang={lang} tone="white" />
    </>
  );
}
