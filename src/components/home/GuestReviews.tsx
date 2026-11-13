import Link from "next/link";
import { ArrowUpRight, Star } from "lucide-react";
import Container from "@/components/ui/Container";
import ReviewCard from "@/components/tours/ReviewCard";
import { HOME_REVIEWS } from "@/data/reviews";
import { GYG_TOTAL_REVIEWS, getTour } from "@/data/tours";
import { SITE } from "@/data/site";

export default function GuestReviews() {
  return (
    <Container as="section" className="section-y">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <h2 className="display-xl reveal max-w-4xl">
          What guests <span className="accent-word text-brand-deep">say</span>
        </h2>
        <a
          href={SITE.socials.getyourguide}
          target="_blank"
          rel="noopener noreferrer"
          className="reveal group inline-flex items-center gap-2 rounded-full border border-ink/25 px-5 py-3 font-semibold transition-[background-color,color,border-color,scale] duration-300 hover:border-ink hover:bg-ink hover:text-white active:scale-[0.97]"
        >
          <Star size={18} className="fill-brand text-brand" aria-hidden />
          {GYG_TOTAL_REVIEWS.toLocaleString("en-US")} reviews on GetYourGuide
          <ArrowUpRight size={18} aria-hidden className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </div>
      <div className="mt-[clamp(1.75rem,4vw,3.5rem)] grid gap-[clamp(0.75rem,1.2vw,1.5rem)] md:grid-cols-3">
        {HOME_REVIEWS.map(({ slug, review }) => {
          const tour = getTour(slug);
          return (
            <ReviewCard
              key={slug}
              review={review}
              footer={
                tour && (
                  <Link
                    href={`/tours/${slug}`}
                    className="group inline-flex items-center gap-1.5 border-t border-line pt-4 text-sm font-semibold text-brand-deep hover:text-ink"
                  >
                    {tour.title}
                    <ArrowUpRight size={16} aria-hidden className="shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Link>
                )
              }
            />
          );
        })}
      </div>
    </Container>
  );
}
