import { getTours } from "@/data/tours";
import { UI, lp, type Lang } from "@/i18n";
import Button from "@/components/ui/Button";
import Rail from "@/components/ui/Rail";
import TourCard from "@/components/tours/TourCard";

export default function FeaturedTours({ lang }: { lang: Lang }) {
  const t = UI[lang].featured;
  return (
    <section className="section-y on-ink bg-ink text-white">
      <Rail
        label={t.label}
        prevLabel={t.prev}
        nextLabel={t.next}
        heading={
          <h2 className="display-xl reveal">
            {t.title[0]} <span className="accent-word text-brand">{t.title[1]}</span>
          </h2>
        }
      >
        {getTours(lang).filter((x) => x.featured).map((x) => (
          <TourCard
            key={x.slug}
            tour={x}
            lang={lang}
            className="w-[min(82vw,22rem)] shrink-0 snap-start lg:w-[clamp(20rem,27vw,30rem)]"
          />
        ))}
      </Rail>
      <div className="mt-[clamp(2rem,4vw,3.5rem)] px-[var(--gutter)]">
        <Button href={lp(lang, "/tours")} size="lg" variant="white">{t.seeAll}</Button>
      </div>
    </section>
  );
}
