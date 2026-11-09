import { getFeaturedTours } from "@/data/tours";
import Button from "@/components/ui/Button";
import Rail from "@/components/ui/Rail";
import TourCard from "@/components/tours/TourCard";

export default function FeaturedTours() {
  return (
    <section className="section-y on-ink bg-ink text-white">
      <Rail
        label="Popular tours"
        heading={
          <h2 className="display-xl reveal">
            A good place <span className="accent-word text-brand">to start</span>
          </h2>
        }
      >
        {getFeaturedTours().map((t) => (
          <TourCard
            key={t.slug}
            tour={t}
            className="w-[min(82vw,22rem)] shrink-0 snap-start lg:w-[clamp(20rem,27vw,30rem)]"
          />
        ))}
      </Rail>
      <div className="mt-[clamp(2rem,4vw,3.5rem)] px-[var(--gutter)]">
        <Button href="/tours" size="lg" variant="white">See all tours</Button>
      </div>
    </section>
  );
}
