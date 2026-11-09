import Hero from "@/components/home/Hero";
import CategoryTiles from "@/components/home/CategoryTiles";
import FeaturedTours from "@/components/home/FeaturedTours";
import EveningSequence from "@/components/home/EveningSequence";
import HowBooking from "@/components/home/HowBooking";
import ContactBand from "@/components/home/ContactBand";

export default function Page() {
  return (
    <>
      <Hero />
      <CategoryTiles />
      <FeaturedTours />
      <EveningSequence />
      <HowBooking />
      <ContactBand />
    </>
  );
}
