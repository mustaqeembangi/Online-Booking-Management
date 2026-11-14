import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { UI, lp, type Lang } from "@/i18n";

// v2 inner-page header (OceanAir category page): photo under a navy fade, breadcrumb, eyebrow,
// white title and subtitle, optional stat pills.
export default function PageBanner({
  lang,
  title,
  sub,
  image,
  crumb,
  eyebrow,
  pills,
}: {
  lang: Lang;
  title: string;
  sub?: string;
  image: string;
  crumb: string;
  eyebrow?: string;
  pills?: React.ReactNode;
}) {
  return (
    <section className="on-ink relative isolate overflow-hidden bg-forest text-white">
      <Image src={image} alt="" fill priority sizes="100vw" className="hero-photo -z-20 object-cover" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-forest/90 via-forest/65 to-forest/25 rtl:bg-gradient-to-l" />
      <div className="mx-auto max-w-[1240px] px-[var(--gutter)] pb-[clamp(2.5rem,5vw,4rem)] pt-5 xl:px-6">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[12.5px] text-white/70">
          <Link href={lp(lang, "/")} className="hover:text-white">{UI[lang].classic.nav.home}</Link>
          <ChevronRight size={13} aria-hidden className="rtl:rotate-180" />
          <span className="text-white">{crumb}</span>
        </nav>
        {eyebrow && <p className="hero-in mt-[clamp(1.5rem,4vw,3rem)] text-[12px] font-bold uppercase tracking-[0.2em] text-white/80">{eyebrow}</p>}
        <h1 className={`hero-in max-w-3xl text-[clamp(2rem,4.4vw,3.4rem)] font-semibold leading-[1.1] ${eyebrow ? "mt-3" : "mt-[clamp(1.5rem,4vw,3rem)]"}`}>{title}</h1>
        {sub && <p className="hero-in mt-3 max-w-xl text-[clamp(1rem,1.3vw,1.1rem)] text-white/80 [animation-delay:80ms]">{sub}</p>}
        {pills && <div className="hero-in mt-6 flex flex-wrap gap-2 [animation-delay:150ms]">{pills}</div>}
      </div>
    </section>
  );
}
