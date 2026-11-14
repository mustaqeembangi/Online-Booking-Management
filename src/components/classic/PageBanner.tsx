import Image from "next/image";
import Link from "next/link";
import { ChevronRight, House } from "lucide-react";
import { UI, lp, type Lang } from "@/i18n";

// Inner-page header: photo with a light fade, big title, subtitle and a "Home > Page" pill.
export default function PageBanner({
  lang,
  title,
  sub,
  image,
  crumb,
}: {
  lang: Lang;
  title: string;
  sub?: string;
  image: string;
  crumb: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-white">
      <Image src={image} alt="" fill priority sizes="100vw" className="hero-photo -z-20 object-cover object-[70%_center]" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-white via-white/80 to-white/0 rtl:bg-gradient-to-l" />
      <div className="mx-auto max-w-[1240px] px-[var(--gutter)] py-[clamp(2.5rem,6vw,4.5rem)] xl:px-6">
        <h1 className="hero-in text-[clamp(2.3rem,5vw,4rem)] font-extrabold leading-[1.05] text-forest">{title}</h1>
        {sub && <p className="hero-in mt-2 text-[clamp(1.05rem,1.8vw,1.5rem)] font-semibold text-forest/90 [animation-delay:80ms]">{sub}</p>}
        <nav
          aria-label="Breadcrumb"
          className="hero-in mt-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold shadow-md [animation-delay:150ms]"
        >
          <Link href={lp(lang, "/")} className="inline-flex items-center gap-1.5 hover:text-green">
            <House size={15} aria-hidden />
            {UI[lang].classic.nav.home}
          </Link>
          <ChevronRight size={15} aria-hidden className="text-ink/40" />
          <span>{crumb}</span>
        </nav>
      </div>
    </section>
  );
}
