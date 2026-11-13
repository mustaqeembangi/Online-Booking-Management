import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import TourCard from "@/components/tours/TourCard";
import { getCategories, getTours, type CategoryId } from "@/data/tours";
import { UI, lp, type Lang } from "@/i18n";
import { SITE } from "@/data/site";
import { pageMeta } from "@/lib/seo";

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
  return pageMeta({
    title: t.metaTitle,
    description: t.metaDescription(getTours(lang).length, SITE.name),
    path: "/tours",
    lang,
  });
}

export default async function ToursView({ searchParams, lang }: { searchParams: SearchParams; lang: Lang }) {
  const t = UI[lang].toursPage;
  const CATEGORIES = getCategories(lang);
  const TOURS = getTours(lang);
  const active = await activeCategory(searchParams, lang);

  const list = active ? TOURS.filter((x) => x.category === active.id) : TOURS;
  // Tours with a GetYourGuide rating first, then the rest in the order of the data.
  const sorted = [...list].sort((a, b) => Number(!!b.gyg) - Number(!!a.gyg));

  const chip = (isActive: boolean) =>
    `inline-flex h-11 shrink-0 items-center whitespace-nowrap rounded-full px-5 text-[15px] font-medium transition-colors ${
      isActive ? "bg-ink text-white" : "text-ink hover:bg-ink/10"
    }`;

  return (
    <>
      <section className="on-ink bg-ink pb-[clamp(2.5rem,5vw,5rem)] pt-[clamp(8rem,14vw,14rem)] text-white">
        <Container>
          <h1 className="hero-title">
            {active ? active.name : (<>{t.titleAll[0]} <span className="accent-word text-brand">{t.titleAll[1]}</span></>)}
          </h1>
          <p className="mt-5 max-w-2xl text-[clamp(1.05rem,1.4vw,1.35rem)] text-white/75">
            {active
              ? active.blurb
              : t.intro}
          </p>
        </Container>
      </section>

      <Container className="pb-[clamp(4rem,8vw,8rem)]">
        <nav
          aria-label={t.filter}
          className="sticky top-[5.5rem] z-20 -mt-[1.75rem] flex w-fit max-w-full gap-1 overflow-x-auto rounded-full border border-line bg-white/90 p-1 shadow-[0_16px_40px_-20px_rgb(11_18_14/0.45)] backdrop-blur-xl no-scrollbar"
        >
          <Link href={lp(lang, "/tours")} scroll={false} aria-current={!active ? "page" : undefined} className={chip(!active)}>
            {t.all}
          </Link>
          {CATEGORIES.map((c) => (
            <Link
              key={c.id}
              href={lp(lang, `/tours?category=${c.id satisfies CategoryId}`)}
              scroll={false}
              aria-current={active?.id === c.id ? "page" : undefined}
              className={chip(active?.id === c.id)}
            >
              {c.name}
            </Link>
          ))}
        </nav>

        <p className="mt-8 text-sm text-ink/60" aria-live="polite">
          {t.count(sorted.length)}
        </p>

        <div className="mt-4 grid grid-cols-[repeat(auto-fill,minmax(min(100%,19rem),1fr))] gap-[clamp(0.75rem,1.2vw,1.5rem)]">
          {sorted.map((x) => (
            <TourCard key={x.slug} tour={x} lang={lang} />
          ))}
        </div>
      </Container>
    </>
  );
}
