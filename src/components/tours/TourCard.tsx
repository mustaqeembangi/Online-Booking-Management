import Image from "next/image";
import Link from "next/link";
import { CATEGORIES, formatPrice, type Tour } from "@/data/tours";

export default function TourCard({ tour }: { tour: Tour }) {
  const category = CATEGORIES.find((c) => c.id === tour.category);
  return (
    <Link href={`/tours/${tour.slug}`} className="group block">
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-line">
        <Image
          src={tour.image}
          alt={tour.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="pt-4">
        {category && (
          <div className="text-sm font-semibold text-brand-deep">{category.name}</div>
        )}
        <h3 className="mt-1 text-xl font-semibold leading-snug text-ink">{tour.title}</h3>
        <div className="mt-2 flex flex-wrap items-baseline gap-x-3 text-[15px] text-ink/70">
          {tour.duration && <span>{tour.duration}</span>}
          <span className="font-semibold text-dune">
            {tour.price ? (
              <>
                {!tour.price.unit && <span className="font-normal text-ink/60">From </span>}
                {formatPrice(tour.price)}
                {tour.price.unit && (
                  <span className="font-normal text-ink/60"> {tour.price.unit}</span>
                )}
              </>
            ) : (
              "Ask for price"
            )}
          </span>
        </div>
        {tour.gyg && (
          <div className="mt-1.5 text-sm text-ink/60">
            {tour.gyg.rating.toFixed(1)} on GetYourGuide (
            {tour.gyg.reviews.toLocaleString("en-US")} reviews)
          </div>
        )}
      </div>
    </Link>
  );
}
