import { HOME_DESCRIPTION, pageMeta } from "@/lib/seo";
import { SITE } from "@/data/site";
import Hero from "@/components/home/Hero";
import Marquee from "@/components/home/Marquee";
import CategoryTiles from "@/components/home/CategoryTiles";
import FeaturedTours from "@/components/home/FeaturedTours";
import EveningSequence from "@/components/home/EveningSequence";
import HowBooking from "@/components/home/HowBooking";
import ContactBand from "@/components/home/ContactBand";

export const metadata = pageMeta({
  title: { absolute: `Dubai Desert Safari & Abu Dhabi City Tours | ${SITE.name}` },
  description: HOME_DESCRIPTION,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <CategoryTiles />
      <FeaturedTours />
      <EveningSequence />
      <HowBooking />
      <ContactBand />
    </>
  );
}
