import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Car, Check, Clock, Languages, MessageCircle, Plus, Star, Wallet, X } from "lucide-react";
import Stars from "@/components/ui/Stars";
import Expandable from "@/components/ui/Expandable";
import ReviewList from "@/components/tours/ReviewList";
import { DESCRIPTIONS, type DescBlock } from "@/data/descriptions";
import { DESCRIPTIONS_AR } from "@/data/descriptions-ar";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import TourCard from "@/components/tours/TourCard";
import BookingPanel from "@/components/tours/BookingPanel";
import { Mosaic, PhotoViewer } from "@/components/tours/Gallery";
import { TOURS, getCategories, getTour, getTours, localizeTour } from "@/data/tours";
import { UI, lp, num, type Lang } from "@/i18n";
import { REVIEWS, reviewDate } from "@/data/reviews";
import { SITE } from "@/data/site";
import { whatsappLink } from "@/lib/whatsapp";
import { pageMeta, tourDescription, tourTitle } from "@/lib/seo";

export const tourParams = () => TOURS.map((t) => ({ slug: t.slug }));
export type TourParams = Promise<{ slug: string }>;

export async function tourMeta(params: TourParams, lang: Lang): Promise<Metadata> {
  const { slug } = await params;
  const base = getTour(slug);
  if (!base) return {};
  const tour = localizeTour(base, lang);
  return pageMeta({
    title: tourTitle(tour, lang),
    description: tourDescription(tour, lang),
    path: `/tours/${tour.slug}`,
    lang,
    image: `/tours/${tour.slug}/opengraph-image`,
  });
}

type Mark = "yes" | "no" | "plus" | "dot";

const MARKS: Record<Mark, React.ReactNode> = {
  yes: <Check size={18} strokeWidth={2.75} className="text-brand-deep" />,
  no: <X size={18} strokeWidth={2.75} className="text-dune" />,
  plus: <Plus size={18} strokeWidth={2.75} className="text-brand-deep" />,
  dot: <span className="h-1.5 w-1.5 rounded-full bg-ink" />,
};

function Bullets({ items, mark }: { items: string[]; mark: Mark }) {
  return (
    <ul className="grid gap-3">
      {items.map((i) => (
        <li key={i} className="flex gap-3 text-[17px] leading-snug">
          <span aria-hidden className="grid h-6 w-5 shrink-0 place-items-center">
            {MARKS[mark]}
          </span>
          <span>{i}</span>
        </li>
      ))}
    </ul>
  );
}

function Row({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="reveal grid gap-4 border-t border-line py-[clamp(1.75rem,3vw,2.5rem)] first:border-t-0 first:pt-0 md:grid-cols-[minmax(9rem,12rem)_minmax(0,1fr)] md:gap-10">
      <h2 className="text-[1.35rem] font-semibold leading-tight tracking-[-0.01em]">{title}</h2>
      <div className="min-w-0">{children}</div>
    </section>
  );
}

function SubHead({ children }: { children: React.ReactNode }) {
  return <h3 className="mb-2.5 mt-6 font-body text-[17px] font-semibold first:mt-0">{children}</h3>;
}

function Route({ stops, lang }: { stops: string[]; lang: Lang }) {
  const t = UI[lang].tour;
  const all = [t.pickupStop, ...stops, t.dropoffStop];
  const city = lang === "ar" ? "، أبوظبي" : ", Abu Dhabi";
  return (
    <ol className="relative grid gap-5 before:absolute before:bottom-3 before:start-[9px] before:top-3 before:w-0.5 before:bg-line">
      {all.map((s, i) => {
        const end = i === 0 || i === all.length - 1;
        return (
          <li key={s} className="relative flex items-center gap-4 text-[17px]">
            <span
              aria-hidden
              className={`relative grid h-5 w-5 shrink-0 place-items-center rounded-full ${end ? "bg-ink" : "border-2 border-ink bg-white"}`}
            />
            {end ? (
              <span className="text-ink/60">{s}</span>
            ) : (
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${s}${city}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 font-medium underline decoration-line decoration-2 underline-offset-4 transition-colors hover:text-brand-deep hover:decoration-brand"
              >
                {s}
                <ArrowUpRight size={16} aria-hidden className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
              </a>
            )}
          </li>
        );
      })}
    </ol>
  );
}

function Description({ blocks }: { blocks: DescBlock[] }) {
  return (
    <div className="space-y-4 text-[17px] leading-relaxed">
      {blocks.map((b, i) =>
        "h" in b ? (
          <h3 key={i} className="pt-2 font-body text-[17px] font-semibold first:pt-0">{b.h}</h3>
        ) : "p" in b ? (
          <p key={i}>{b.p}</p>
        ) : (
          <ul key={i} className="list-disc space-y-1.5 ps-5 marker:text-ink/40">
            {b.ul.map((li) => <li key={li}>{li}</li>)}
          </ul>
        ),
      )}
    </div>
  );
}

function ScoreBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="grid grid-cols-[minmax(0,8rem)_1fr_auto] items-center gap-3 text-[15px]">
      <span>{label}</span>
      <span className="h-1.5 overflow-hidden rounded-full bg-line">
        <span className="block h-full rounded-full bg-ink" style={{ width: `${(value / 5) * 100}%` }} />
      </span>
      <span className="tabular-nums text-ink/70">{value.toFixed(1)}/5</span>
    </div>
  );
}

export default async function TourView({ params, lang }: { params: TourParams; lang: Lang }) {
  const { slug } = await params;
  const base = getTour(slug);
  if (!base) notFound();
  const tour = localizeTour(base, lang);
  const t = UI[lang].tour;
  const r = UI[lang].reviews;

  const category = getCategories(lang).find((c) => c.id === tour.category);
  const photos = tour.photos ?? [tour.image];
  const reviews = REVIEWS[tour.slug] ?? [];
  const description = (lang === "ar" ? DESCRIPTIONS_AR : DESCRIPTIONS)[tour.slug];

  // Key features, as on GetYourGuide. Pickup and guide are read from the English lists.
  const has = (re: RegExp) => base.includes.some((i) => re.test(i));
  const features = [
    tour.duration && { icon: Clock, title: t.featDuration(tour.duration), sub: t.featDurationSub },
    has(/english/i) && { icon: Languages, title: t.featGuide, sub: t.guideValue },
    has(/pick-?up/i) && { icon: Car, title: t.featPickup, sub: t.featPickupSub },
    { icon: Wallet, title: t.featPay, sub: t.featPaySub },
  ].filter((f): f is { icon: typeof Clock; title: string; sub: string } => !!f);

  const all = getTours(lang);
  const related = [
    ...all.filter((x) => x.category === tour.category && x.slug !== tour.slug),
    ...all.filter((x) => x.category !== tour.category && x.featured && x.slug !== tour.slug),
  ].slice(0, 4);
  const pageUrl = `${SITE.url}${lp(lang, `/tours/${tour.slug}`)}`;

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { name: SITE.name, item: `${SITE.url}${lp(lang, "/")}` },
      { name: t.breadcrumb, item: `${SITE.url}${lp(lang, "/tours")}` },
      { name: tour.title, item: pageUrl },
    ].map((b, i) => ({ "@type": "ListItem", position: i + 1, ...b })),
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: tour.title,
    description: tour.summary,
    image: photos.map((src) => `${SITE.url}${src}`),
    url: pageUrl,
    inLanguage: lang,
    touristType: tour.types.length ? tour.types : undefined,
    provider: { "@type": "TravelAgency", name: SITE.name, url: SITE.url },
    ...(tour.price && {
      offers: { "@type": "Offer", price: tour.price.amount, priceCurrency: tour.price.currency, url: pageUrl },
    }),
  };

  const importantInfo = tour.whatToBring || tour.notAllowed || (tour.notes && tour.notes.length > 0);

  return (
    <PhotoViewer photos={photos} title={tour.title} lang={lang}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([jsonLd, breadcrumbs]).replace(/</g, "\\u003c") }}
      />
      <Container className="pb-32 pt-[clamp(6rem,9vw,8rem)] lg:pb-[clamp(5rem,8vw,8rem)]">
        <nav aria-label={t.breadcrumb} className="text-sm text-ink/60">
          <Link href={lp(lang, "/tours")} className="hover:text-ink">{t.breadcrumb}</Link>
          {category && (
            <>
              <span aria-hidden> / </span>
              <Link href={lp(lang, `/tours?category=${category.id}`)} className="hover:text-ink">
                {category.name}
              </Link>
            </>
          )}
        </nav>
        <h1 className="mt-2 max-w-5xl text-[clamp(1.75rem,3.2vw,2.75rem)] font-bold leading-[1.1] tracking-[-0.02em]">
          {tour.title}
        </h1>
        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[15px]">
          {tour.gyg && (
            <a href="#reviews" className="inline-flex items-center gap-1.5 hover:text-brand-deep">
              <Star size={17} className="fill-dune text-dune" aria-hidden />
              <span className="font-semibold">{tour.gyg.rating.toFixed(1)}</span>
              <span className="underline decoration-1 underline-offset-4">{t.reviewCount(num(lang, tour.gyg.reviews))}</span>
            </a>
          )}
          <span aria-hidden className="text-ink/30">•</span>
          <span className="text-ink/70">
            {t.provider}: {SITE.name}
          </span>
        </div>

        <div className="mt-[clamp(1rem,2vw,1.75rem)] grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(21rem,24rem)] lg:gap-[clamp(2rem,3.5vw,3.5rem)]">
          <div className="min-w-0">
            <Mosaic photos={photos} title={tour.title} lang={lang} />

            <p className="mt-6 max-w-3xl text-[clamp(1.05rem,1.3vw,1.2rem)] leading-relaxed">{tour.summary}</p>

            <ul className="reveal mt-7 grid gap-x-8 gap-y-5 border-b border-line pb-[clamp(1.75rem,3vw,2.5rem)] sm:grid-cols-2">
              {features.map(({ icon: Icon, title, sub }) => (
                <li key={title} className="flex gap-3.5">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-line">
                    <Icon size={21} className="text-ink" aria-hidden />
                  </span>
                  <div>
                    <p className="font-semibold leading-snug">{title}</p>
                    <p className="mt-0.5 text-sm text-ink/60">{sub}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="pt-[clamp(1.75rem,3vw,2.5rem)]">
              {tour.highlights && (
                <Row title={t.highlights}>
                  <Bullets items={tour.highlights} mark="dot" />
                </Row>
              )}

              {description && (
                <Row title={t.fullDescription}>
                  <Expandable more={t.seeMore} less={t.seeLess}>
                    <Description blocks={description} />
                  </Expandable>
                </Row>
              )}

              {tour.includes.length > 0 && (
                <Row title={t.includes}>
                  <Bullets items={tour.includes} mark="yes" />
                  {tour.optionIncludes && (
                    <>
                      <SubHead>{tour.optionIncludes.title}</SubHead>
                      <Bullets items={tour.optionIncludes.items} mark="yes" />
                    </>
                  )}
                  {tour.notIncluded && (
                    <div className="mt-3">
                      <Bullets items={tour.notIncluded} mark="no" />
                    </div>
                  )}
                </Row>
              )}

              {tour.stops && (
                <Row title={t.route}>
                  <Route stops={tour.stops} lang={lang} />
                </Row>
              )}

              {tour.notSuitableFor && (
                <Row title={t.notSuitable}>
                  <Bullets items={tour.notSuitableFor} mark="dot" />
                </Row>
              )}

              {importantInfo && (
                <Row title={t.important}>
                  {tour.whatToBring && (
                    <>
                      <SubHead>{t.bring}</SubHead>
                      <Bullets items={tour.whatToBring} mark="dot" />
                    </>
                  )}
                  {tour.notAllowed && (
                    <>
                      <SubHead>{t.notAllowed}</SubHead>
                      <Bullets items={tour.notAllowed} mark="dot" />
                    </>
                  )}
                  {tour.notes && tour.notes.length > 0 && (
                    <>
                      <SubHead>{t.knowBefore}</SubHead>
                      <Bullets items={tour.notes} mark="dot" />
                    </>
                  )}
                </Row>
              )}
            </div>

            {tour.includes.length === 0 && (
              <section className="on-ink mt-[clamp(2.5rem,5vw,4.5rem)] rounded-[var(--radius-card)] bg-ink p-[clamp(1.5rem,3vw,3rem)] text-white">
                <h2 className="text-[clamp(1.75rem,3vw,3rem)] leading-none">{t.fullDetails}</h2>
                <p className="mt-3 max-w-xl text-white/75">{t.fullDetailsText}</p>
                <Button href={whatsappLink(t.askMessage(SITE.name, tour.title))} className="mt-5" icon={<MessageCircle size={18} />}>
                  {t.askWhatsapp}
                </Button>
              </section>
            )}

            {tour.gyg && reviews.length > 0 && (
              <section id="reviews" className="scroll-mt-28 border-t border-line pt-[clamp(2rem,4vw,3rem)]">
                <div className="grid gap-8 md:grid-cols-[minmax(13rem,16rem)_minmax(0,1fr)] md:gap-10">
                  <div className="reveal">
                    <h2 className="text-[1.6rem] font-bold leading-tight">{r.customer}</h2>
                    <p className="mt-5 font-semibold">{r.overall}</p>
                    <p className="mt-2 font-display text-[2.6rem] font-bold leading-none">
                      {tour.gyg.rating.toFixed(1)}
                      <span className="text-xl text-ink/50">/5</span>
                    </p>
                    <div className="mt-2">
                      <Stars value={tour.gyg.rating} size={30} label={r.stars(tour.gyg.rating)} />
                    </div>
                    <p className="mt-2 text-sm text-ink/60">{r.basedOn(num(lang, tour.gyg.reviews))}</p>
                    {tour.gyg.scores && (
                      <>
                        <p className="mt-6 font-semibold">{r.summary}</p>
                        <div className="mt-3 space-y-2.5">
                          <ScoreBar label={r.guide} value={tour.gyg.scores.guide} />
                          <ScoreBar label={r.transport} value={tour.gyg.scores.transport} />
                          <ScoreBar label={r.value} value={tour.gyg.scores.value} />
                        </div>
                      </>
                    )}
                  </div>
                  <div className="min-w-0">
                    {r.note && <p className="mb-5 text-sm text-ink/60">{r.note}</p>}
                    <ReviewList
                      reviews={reviews}
                      dates={reviews.map((x) => reviewDate(x.date, lang))}
                      labels={{ verified: r.verified, more: r.more, less: r.less, stars: r.stars(5) }}
                    />
                    <a
                      href={tour.gyg.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group mt-6 inline-flex items-center gap-1.5 font-semibold underline decoration-2 underline-offset-4 hover:text-brand-deep"
                    >
                      {r.all(num(lang, tour.gyg.reviews))}
                      <ArrowUpRight size={16} aria-hidden className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
                    </a>
                  </div>
                </div>
              </section>
            )}
          </div>

          <aside data-booking-panel className="relative z-10 min-w-0">
            <BookingPanel tour={tour} lang={lang} />
          </aside>
        </div>

        {related.length > 0 && (
          <section className="mt-[clamp(3rem,6vw,6rem)]">
            <h2 className="display-lg">
              {related.every((x) => x.category === tour.category) && category ? t.more(category.name) : t.alsoLike}
            </h2>
            <div className="mt-[clamp(1.5rem,3vw,3rem)] grid gap-[clamp(0.75rem,1.2vw,1.5rem)] sm:grid-cols-2 xl:grid-cols-4">
              {related.map((x) => (
                <TourCard key={x.slug} tour={x} lang={lang} />
              ))}
            </div>
          </section>
        )}
      </Container>
    </PhotoViewer>
  );
}
