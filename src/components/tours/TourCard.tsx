import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Star } from "lucide-react";
import { aed, formatPrice, type Tour } from "@/data/tours";
import { UI, lp, type Lang } from "@/i18n";

// 45,778 -> "45k+", 955 -> "955"
const compact = (n: number) => (n >= 1000 ? `${Math.floor(n / 1000)}k+` : String(n));

export default function TourCard({ tour, lang, className = "" }: { tour: Tour; lang: Lang; className?: string }) {
  const t = UI[lang];
  const href = lp(lang, `/tours/${tour.slug}`);
  return (
    <article
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-[0_12px_30px_-20px_rgb(11_18_14/0.45)] transition-[translate,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_24px_44px_-22px_rgb(11_18_14/0.55)] ${className}`}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-line">
        <Image
          src={tour.image}
          alt={tour.title}
          fill
          sizes="(min-width: 1280px) 24vw, (min-width: 640px) 45vw, 92vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-display text-[1.05rem] font-bold leading-snug tracking-normal">
          {/* The title link covers the whole card. */}
          <Link href={href} className="after:absolute after:inset-0 after:content-['']">
            {tour.title}
          </Link>
        </h3>
        {tour.tags && <p className="mt-1 text-sm text-ink/60">{tour.tags.join(" • ")}</p>}
        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
          {tour.duration && (
            <span className="inline-flex items-center gap-1 text-ink/70">
              <Clock size={15} aria-hidden />
              {tour.duration}
            </span>
          )}
          {tour.gyg && (
            <span className="inline-flex items-center gap-1">
              <Star size={15} className="fill-gold text-gold" aria-hidden />
              <span className="font-semibold">{tour.gyg.rating.toFixed(1)}</span>
              <span className="text-ink/60">({t.tour.reviewCount(compact(tour.gyg.reviews))})</span>
            </span>
          )}
        </div>
        <div className="mt-auto flex items-end justify-between gap-3 pt-4">
          <p className="leading-tight">
            {tour.price ? (
              <>
                <span className="block text-xs text-ink/60">{t.price.from}</span>
                <span className="whitespace-nowrap font-display text-lg font-bold text-forest">{aed(tour.price)}</span>
                {tour.price.currency === "USD" && (
                  <span className="ms-1.5 text-xs text-ink/50">{UI[lang].classic.approx(formatPrice(tour.price))}</span>
                )}
              </>
            ) : (
              <span className="font-semibold text-forest">{t.price.ask}</span>
            )}
          </p>
          <span aria-hidden className="inline-flex shrink-0 items-center gap-1 rounded-full bg-green px-3.5 py-2 text-[13px] font-semibold text-white transition-colors group-hover:bg-forest">
            {UI[lang].classic.bookNow}
            <ArrowRight size={15} aria-hidden />
          </span>
        </div>
      </div>
    </article>
  );
}
