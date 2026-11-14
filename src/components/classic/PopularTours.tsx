import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getTours } from "@/data/tours";
import { UI, lp, type Lang } from "@/i18n";
import TourCard from "@/components/tours/TourCard";
import SectionTitle from "./SectionTitle";

export default function PopularTours({ lang }: { lang: Lang }) {
  const c = UI[lang].classic;
  return (
    <section className="mx-auto max-w-[1240px] px-[var(--gutter)] py-[clamp(2.5rem,5vw,4rem)] xl:px-6">
      <SectionTitle>{c.popular}</SectionTitle>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {getTours(lang).map((x) => (
          <TourCard key={x.slug} tour={x} lang={lang} className="reveal" />
        ))}
      </div>
      <div className="mt-8 text-center">
        <Link
          href={lp(lang, "/tours")}
          className="inline-flex items-center gap-2 rounded-full border-2 border-green px-7 py-3 font-semibold text-green transition-colors hover:bg-green hover:text-white"
        >
          {c.allTours}
          <ArrowRight size={18} aria-hidden />
        </Link>
      </div>
    </section>
  );
}
