import Link from "next/link";
import { ArrowRight, ArrowUpRight, Star } from "lucide-react";
import Stars from "@/components/ui/Stars";
import ReviewList from "@/components/tours/ReviewList";
import PageBanner from "@/components/classic/PageBanner";
import CtaBanner from "@/components/classic/CtaBanner";
import { REVIEWS, reviewDate } from "@/data/reviews";
import { GYG_TOTAL_REVIEWS, getTours } from "@/data/tours";
import { SITE } from "@/data/site";
import { pageMeta } from "@/lib/seo";
import { UI, lp, num, type Lang } from "@/i18n";

export const reviewsMeta = (lang: Lang) =>
  pageMeta({ title: UI[lang].classic.reviewsTitle, description: UI[lang].classic.reviewsSub, path: "/reviews", lang });

export default function ReviewsView({ lang }: { lang: Lang }) {
  const c = UI[lang].classic;
  const r = UI[lang].reviews;
  const tours = getTours(lang).filter((x) => x.gyg);
  // Average of the tours' GetYourGuide ratings, weighted by how many reviews each has.
  const avg = tours.reduce((s, x) => s + x.gyg!.rating * x.gyg!.reviews, 0) / GYG_TOTAL_REVIEWS;
  return (
    <>
      <PageBanner lang={lang} title={c.reviewsTitle} sub={c.reviewsSub} image="/images/tours/desert-safari-quad-camel-sandboarding-11.jpg" crumb={c.reviewsTitle} />
      <div className="mx-auto max-w-[1240px] px-[var(--gutter)] py-[clamp(2rem,4vw,3rem)] xl:px-6">
        <section className="reveal grid gap-6 rounded-2xl border border-line p-[clamp(1.25rem,3vw,2rem)] shadow-[0_14px_34px_-24px_rgb(11_18_14/0.5)] md:grid-cols-[14rem_1fr]">
          <div>
            <p className="font-semibold">{r.overall}</p>
            <p className="mt-1 font-display text-5xl font-bold leading-none text-forest">
              {avg.toFixed(1)}
              <span className="text-xl text-ink/50">/5</span>
            </p>
            <div className="mt-2"><Stars value={avg} size={26} label={r.stars(Number(avg.toFixed(1)))} /></div>
            <p className="mt-2 text-sm text-ink/60">{r.basedOn(num(lang, GYG_TOTAL_REVIEWS))}</p>
            <a
              href={SITE.socials.getyourguide}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1 text-sm font-semibold underline decoration-2 underline-offset-4 hover:text-green"
            >
              GetYourGuide
              <ArrowUpRight size={14} aria-hidden />
            </a>
          </div>
          <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
            {tours.map((x) => (
              <li key={x.slug}>
                <Link href={`#${x.slug}`} className="flex items-start justify-between gap-3 rounded-xl px-2 py-1.5 hover:bg-line/60">
                  <span className="text-[15px] font-semibold leading-snug">{x.title}</span>
                  <span className="inline-flex shrink-0 items-center gap-1 text-sm">
                    <Star size={15} className="fill-gold text-gold" aria-hidden />
                    <span className="font-semibold">{x.gyg!.rating.toFixed(1)}</span>
                    <span className="text-ink/60">({num(lang, x.gyg!.reviews)})</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {r.note && <p className="mt-6 text-sm text-ink/60">{r.note}</p>}

        {tours.map((x) => {
          const list = REVIEWS[x.slug] ?? [];
          if (!list.length) return null;
          return (
            <section key={x.slug} id={x.slug} className="scroll-mt-32 border-b border-line py-[clamp(2rem,4vw,3rem)] last:border-0">
              <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
                <div>
                  <h2 className="text-[clamp(1.25rem,2vw,1.6rem)] text-forest">{x.title}</h2>
                  <p className="mt-1 inline-flex items-center gap-2 text-sm">
                    <Stars value={x.gyg!.rating} size={16} label={r.stars(x.gyg!.rating)} />
                    <span className="font-semibold">{x.gyg!.rating.toFixed(1)}</span>
                    <span className="text-ink/60">{r.basedOn(num(lang, x.gyg!.reviews))}</span>
                  </p>
                </div>
                <Link
                  href={lp(lang, `/tours/${x.slug}`)}
                  className="inline-flex items-center gap-1.5 rounded-full bg-green px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-forest"
                >
                  {c.bookNow}
                  <ArrowRight size={15} aria-hidden />
                </Link>
              </div>
              <ReviewList
                reviews={list}
                dates={list.map((v) => reviewDate(v.date, lang))}
                labels={{ verified: r.verified, more: r.more, less: r.less, stars: r.stars(5) }}
              />
              <a
                href={x.gyg!.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-1.5 font-semibold underline decoration-2 underline-offset-4 hover:text-green"
              >
                {r.all(num(lang, x.gyg!.reviews))}
                <ArrowUpRight size={16} aria-hidden />
              </a>
            </section>
          );
        })}
      </div>
      <CtaBanner lang={lang} />
    </>
  );
}
