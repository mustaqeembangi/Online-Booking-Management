import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { UI, lp, type Lang } from "@/i18n";

export default function CtaBanner({ lang }: { lang: Lang }) {
  const c = UI[lang].classic;
  return (
    <section className="mx-auto max-w-[1240px] px-[var(--gutter)] py-[clamp(2rem,4vw,3rem)] xl:px-6">
      <div className="on-ink reveal relative isolate flex flex-col items-start gap-5 overflow-hidden rounded-3xl px-[clamp(1.5rem,4vw,3rem)] py-[clamp(1.75rem,3.5vw,2.75rem)] text-white sm:flex-row sm:items-center sm:justify-between">
        <Image src="/images/tours/red-dune-safari-quad-camel-bbq-4.jpg" alt="" fill sizes="(min-width: 1240px) 1200px, 100vw" className="-z-20 object-cover object-[50%_35%]" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/80 via-ink/55 to-ink/30 rtl:bg-gradient-to-l" />
        <div>
          <h2 className="text-[clamp(1.4rem,2.6vw,2.1rem)]">{c.ctaTitle}</h2>
          <p className="mt-1.5 text-white/90">{c.ctaText}</p>
        </div>
        <Link
          href={lp(lang, "/tours")}
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-green px-8 py-4 text-lg font-semibold text-white shadow-lg transition-[background-color,scale] duration-300 hover:scale-105 hover:bg-forest"
        >
          {c.bookNow}
          <ArrowRight size={20} aria-hidden />
        </Link>
      </div>
    </section>
  );
}
