import { pageMeta } from "@/lib/seo";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Container from "@/components/ui/Container";
import PageBanner from "@/components/classic/PageBanner";
import TrustStrip from "@/components/classic/TrustStrip";
import Button from "@/components/ui/Button";
import { SITE } from "@/data/site";
import { GYG_TOTAL_REVIEWS } from "@/data/tours";
import { whatsappLink } from "@/lib/whatsapp";
import { UI, lp, num, type Lang } from "@/i18n";

export const aboutMeta = (lang: Lang) =>
  pageMeta({
    title: UI[lang].about.metaTitle,
    description: UI[lang].about.metaDescription(SITE.name),
    path: "/about",
    lang,
  });

const linkCls =
  "font-semibold text-brand-deep underline underline-offset-4 hover:text-ink";

export default function AboutView({ lang }: { lang: Lang }) {
  const t = UI[lang].about;
  const reviews = num(lang, GYG_TOTAL_REVIEWS);
  return (
    <>
      <PageBanner
        lang={lang}
        title={`${t.title[0]} ${t.title[1]}`}
        sub={t.intro(SITE.name)}
        image="/images/tours/red-dune-safari-quad-camel-bbq-20.jpg"
        crumb={UI[lang].classic.nav.about}
      />

      <Container as="section" className="section-y">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-[clamp(3rem,6vw,8rem)]">
          <div>
            <h2 className="display-xl reveal">{t.whatWeDo}</h2>
            <p className="mt-5 max-w-xl text-[clamp(1.05rem,1.4vw,1.35rem)] text-ink/70">
              {t.whatWeDoText}
            </p>
          </div>
          <ul className="grid sm:grid-cols-2 sm:gap-x-8">
            {t.services.map(({ name: s, href }) => {
              return (
                <li key={s} className="reveal border-t border-line py-3.5 text-lg">
                  {href ? (
                    <Link href={lp(lang, href)} className="group inline-flex items-center gap-1.5 font-medium text-brand-deep underline decoration-line decoration-2 underline-offset-4 hover:decoration-brand">
                      {s}
                      <ArrowUpRight size={17} aria-hidden className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
                    </Link>
                  ) : (
                    s
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </Container>

      <section className="on-ink bg-ink text-white">
        <div className="grid lg:grid-cols-2">
          <Link href={lp(lang, "/tours?category=desert-safari")} aria-label={t.dunesLink} className="group relative block aspect-[4/3] overflow-hidden lg:aspect-auto lg:min-h-[min(80svh,48rem)]">
            <Image
              src="/images/tours/desert-safari-quad-camel-sandboarding-3.jpg"
              alt={t.dunesAlt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </Link>
          <div className="flex flex-col justify-center px-[var(--gutter)] py-[clamp(3rem,6vw,6rem)]">
            <h2 className="display-xl reveal">
              {t.dunesTitle[0]} <span className="accent-word text-brand">{t.dunesTitle[1]}</span>
            </h2>
            <p className="mt-5 max-w-xl text-[clamp(1.05rem,1.4vw,1.35rem)] text-white/80">
              {t.dunesText}
            </p>
            <p className="mt-4 max-w-xl text-white/70">
              {t.reviewsBefore(reviews)}
              <a href={SITE.socials.getyourguide} target="_blank" rel="noopener noreferrer" className="font-medium text-brand underline underline-offset-4 hover:text-white">
                {t.readOnGyg}
              </a>
              {t.orFind}
              <a href={SITE.socials.tripadvisor} target="_blank" rel="noopener noreferrer" className="font-medium text-brand underline underline-offset-4 hover:text-white">
                TripAdvisor
              </a>
              .
            </p>
            <div className="mt-7 flex flex-wrap gap-2.5">
              <Button href={lp(lang, "/tours")} size="lg">{t.seeTours}</Button>
              <Button href={whatsappLink()} variant="glass" size="lg">{UI[lang].tour.askWhatsapp}</Button>
            </div>
          </div>
        </div>
      </section>

      <TrustStrip lang={lang} tone="white" />

      <Container className="py-[clamp(2.5rem,4vw,4rem)]">
        <p className="text-lg">
          {t.visit(SITE.address)}
          <Link href={lp(lang, "/contact")} className={linkCls}>
            {t.contactPage}
          </Link>
          .
        </p>
      </Container>
    </>
  );
}
