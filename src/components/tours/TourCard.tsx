import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { aed, destinationOf, formatPrice, type Tour } from "@/data/tours";
import { UI, lp, num, type Lang } from "@/i18n";

// v2 (OceanAir style): photo, "DUBAI · 4 HOURS", title, rating, "From AED 99 ~$27", "View →".
// "Top rated" mirrors GetYourGuide's own label for tours rated 4.9+ with many reviews.
export default function TourCard({ tour, lang, className = "" }: { tour: Tour; lang: Lang; className?: string }) {
  const t = UI[lang];
  const v = t.v2;
  const href = lp(lang, `/tours/${tour.slug}`);
  const topRated = tour.gyg && tour.gyg.rating >= 4.9 && tour.gyg.reviews >= 1000;
  return (
    <article
      className={`group relative flex flex-col overflow-hidden rounded-xl border border-line bg-white transition-[translate,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_18px_40px_-24px_rgb(3_40_54/0.45)] ${className}`}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-line">
        <Image
          src={tour.image}
          alt={tour.title}
          fill
          sizes="(min-width: 1280px) 24vw, (min-width: 640px) 45vw, 92vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {topRated && (
          <span className="absolute start-3 top-3 rounded-full bg-forest/90 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
            {v.topRated}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-brand-deep">
          {v.destinations[destinationOf(tour)]}
          {tour.duration && <span className="ms-2 font-semibold normal-case tracking-normal text-ink/50">{tour.duration}</span>}
        </p>
        <h3 className="mt-1.5 line-clamp-2 text-[15px] font-semibold leading-snug tracking-normal">
          {/* The title link covers the whole card. */}
          <Link href={href} className="after:absolute after:inset-0 after:content-['']">
            {tour.title}
          </Link>
        </h3>
        {tour.gyg && (
          <p className="mt-1.5 inline-flex items-center gap-1 text-[13px]">
            <Star size={13} className="fill-brand-deep text-brand-deep" aria-hidden />
            <span className="font-semibold">{tour.gyg.rating.toFixed(1)}</span>
            <span className="text-ink/50">({num(lang, tour.gyg.reviews)})</span>
          </p>
        )}
        <div className="mt-auto flex items-end justify-between gap-3 pt-4">
          <p className="leading-tight">
            {tour.price ? (
              <>
                <span className="block text-[11px] text-ink/50">{t.price.from}</span>
                <span className="whitespace-nowrap text-[17px] font-bold text-forest">{aed(tour.price)}</span>
                {tour.price.currency === "USD" && (
                  <span className="ms-1.5 text-[11px] text-ink/45">{t.classic.approx(formatPrice(tour.price))}</span>
                )}
              </>
            ) : (
              <span className="font-semibold text-forest">{t.price.ask}</span>
            )}
          </p>
          <span aria-hidden className="inline-flex shrink-0 items-center gap-1 text-[13px] font-bold text-brand-deep">
            {v.view}
            <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
          </span>
        </div>
      </div>
    </article>
  );
}
