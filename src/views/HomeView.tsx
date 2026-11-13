import { pageMeta } from "@/lib/seo";
import { SITE } from "@/data/site";
import { UI, type Lang } from "@/i18n";
import Hero from "@/components/home/Hero";
import Marquee from "@/components/home/Marquee";
import CategoryTiles from "@/components/home/CategoryTiles";
import FeaturedTours from "@/components/home/FeaturedTours";
import EveningSequence from "@/components/home/EveningSequence";
import HowBooking from "@/components/home/HowBooking";
import GuestReviews from "@/components/home/GuestReviews";
import ContactBand from "@/components/home/ContactBand";

export const homeMeta = (lang: Lang) =>
  pageMeta({
    title: { absolute: UI[lang].meta.homeTitle(SITE.name) },
    description: UI[lang].meta.homeDescription,
    path: "/",
    lang,
  });

export default function HomeView({ lang }: { lang: Lang }) {
  return (
    <>
      <Hero lang={lang} />
      <Marquee lang={lang} />
      <CategoryTiles lang={lang} />
      <FeaturedTours lang={lang} />
      <EveningSequence lang={lang} />
      <GuestReviews lang={lang} />
      <HowBooking lang={lang} />
      <ContactBand lang={lang} />
    </>
  );
}
