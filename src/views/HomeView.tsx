import { pageMeta } from "@/lib/seo";
import { SITE } from "@/data/site";
import { UI, type Lang } from "@/i18n";
import Hero from "@/components/home/Hero";
import PopularTours from "@/components/classic/PopularTours";
import TrustStrip from "@/components/classic/TrustStrip";
import AboutSays from "@/components/classic/AboutSays";
import CtaBanner from "@/components/classic/CtaBanner";

export const homeMeta = (lang: Lang) =>
  pageMeta({
    title: { absolute: UI[lang].meta.homeTitle(SITE.name) },
    description: UI[lang].meta.homeDescription,
    path: "/",
    lang,
  });

// Classic tour-company home page (client's sample, 2026-11-14).
export default function HomeView({ lang }: { lang: Lang }) {
  return (
    <>
      <Hero lang={lang} />
      <PopularTours lang={lang} />
      <TrustStrip lang={lang} />
      <AboutSays lang={lang} />
      <CtaBanner lang={lang} />
    </>
  );
}
