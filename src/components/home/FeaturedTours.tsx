import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import TourCard from "@/components/tours/TourCard";
import { getFeaturedTours } from "@/data/tours";

export default function FeaturedTours() {
  const tours = getFeaturedTours();
  return (
    <section className="border-t border-line py-20 sm:py-28">
      <Container>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="max-w-2xl text-3xl font-semibold sm:text-5xl">Popular tours</h2>
          <Button href="/tours" variant="outline">
            See all tours
          </Button>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {tours.map((t) => (
            <TourCard key={t.slug} tour={t} />
          ))}
        </div>
      </Container>
    </section>
  );
}
