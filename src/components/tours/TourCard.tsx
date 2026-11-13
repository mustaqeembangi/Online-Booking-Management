import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Star } from "lucide-react";
import { formatPrice, type Tour } from "@/data/tours";

export default function TourCard({ tour, className = "" }: { tour: Tour; className?: string }) {
  return (
    <Link
      href={`/tours/${tour.slug}`}
      className={`group relative isolate block aspect-[4/5] overflow-hidden rounded-[var(--radius-card)] bg-ink text-white transition-[translate,scale,box-shadow] duration-500 ease-out hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-30px_rgb(11_18_14/0.6)] active:scale-[0.98] ${className}`}
    >
      <Image
        src={tour.image}
        alt={tour.title}
        fill
        sizes="(min-width: 1280px) 28vw, (min-width: 640px) 45vw, 85vw"
        className="-z-20 object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/95 via-ink/25 to-ink/10" />

      <div className="flex items-start justify-between gap-2 p-3.5">
        <span className="inline-flex h-9 items-center rounded-full bg-ink px-3.5 text-sm font-semibold text-white">
          {tour.price ? (
            <>
              {!tour.price.unit && <span className="mr-1 font-normal text-white/70">From</span>}
              {formatPrice(tour.price)}
            </>
          ) : (
            "Ask for price"
          )}
        </span>
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white text-ink transition-[background-color,transform] duration-300 group-hover:rotate-45 group-hover:bg-brand">
          <ArrowUpRight size={20} aria-hidden />
        </span>
      </div>

      <div className="absolute inset-x-0 bottom-0 p-[clamp(1rem,1.6vw,1.75rem)]">
        <h3 className="text-[clamp(1.3rem,1.75vw,2rem)] leading-[1.08]">{tour.title}</h3>
        <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-white/75">
          {tour.gyg && (
            <span className="inline-flex items-center gap-1 font-medium text-white">
              <Star size={14} className="fill-brand text-brand" aria-hidden />
              {tour.gyg.rating.toFixed(1)}
              <span className="font-normal text-white/70">
                ({tour.gyg.reviews.toLocaleString("en-US")} on GetYourGuide)
              </span>
            </span>
          )}
          {tour.duration && <span>{tour.duration}</span>}
        </div>
      </div>
    </Link>
  );
}
