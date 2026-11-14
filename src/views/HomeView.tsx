import { pageMeta } from "@/lib/seo";
import { SITE } from "@/data/site";
import { UI, type Lang } from "@/i18n";
import HeroV2 from "@/components/v2/HeroV2";
import CategoryTilesV2 from "@/components/v2/CategoryTilesV2";
import { ByDestination, Spotlight, Standard, WhereWeGo, WhyUs } from "@/components/v2/HomeSections";

export const homeMeta = (lang: Lang) =>
  pageMeta({
    title: { absolute: UI[lang].meta.homeTitle(SITE.name) },
    description: UI[lang].meta.homeDescription,
    path: "/",
    lang,
  });

// v2 home page, styled after oceanairtravels.com (client's reference, 2026-11-14).
export default function HomeView({ lang }: { lang: Lang }) {
  return (
    <>
      <HeroV2 lang={lang} />
      <CategoryTilesV2 lang={lang} />
      <ByDestination lang={lang} />
      <WhereWeGo lang={lang} />
      <Spotlight lang={lang} />
      <Standard lang={lang} />
      <WhyUs lang={lang} />
    </>
  );
}
