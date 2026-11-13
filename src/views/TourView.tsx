import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Car, Check, Clock, Languages, MessageCircle, Plus, Star, Wallet, X } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import TourCard from "@/components/tours/TourCard";
import BookingPanel from "@/components/tours/BookingPanel";
import { GalleryGrid, PhotoCount, PhotoTrigger, PhotoViewer } from "@/components/tours/Gallery";
import { TOURS, getCategories, getTour, getTours, localizeTour } from "@/data/tours";
import { UI, lp, num, type Lang } from "@/i18n";
import { REVIEWS, reviewDate } from "@/data/reviews";
import ReviewCard from "@/components/tours/ReviewCard";
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
  return <h3 className="mb-3 mt-7 text-[15px] font-semibold uppercase tracking-[0.06em] text-ink/60 first:mt-0">{children}</h3>;
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
  const has = (re: RegExp) => base.includes.some((i) => re.test(i));
  const quick = [
    tour.duration && { icon: Clock, label: t.duration, value: tour.duration },
    has(/pick-?up/i) && { icon: Car, label: t.pickup, value: t.pickupValue },
    has(/english/i) && { icon: Languages, label: t.guide, value: t.guideValue },
    { icon: Wallet, label: t.payment, value: t.paymentValue },
  ].filter((q): q is { icon: typeof Clock; label: string; value: string } => !!q);

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
    image: (tour.photos ?? [tour.image]).map((src) => `${SITE.url}${src}`),
    url: pageUrl,
    inLanguage: lang,
    touristType: tour.types.length ? tour.types : undefined,
    provider: { "@type": "TravelAgency", name: SITE.name, url: SITE.url },
    ...(tour.price && {
      offers: {
        "@type": "Offer",
        price: tour.price.amount,
        priceCurrency: tour.price.currency,
        url: pageUrl,
      },
    }),
  };

  return (
    <PhotoViewer photos={photos} title={tour.title} lang={lang}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([jsonLd, breadcrumbs]).replace(/</g, "\\u003c"),
        }}
      />
      <section className="on-ink bg-ink text-white">
        <div className="grid lg:min-h-[min(72svh,46rem)] lg:grid-cols-2">
          <div className="relative aspect-[16/11] max-h-[60svh] w-full sm:aspect-[16/9] lg:order-2 lg:aspect-auto lg:max-h-none">
            <PhotoTrigger index={0} label={t.openPhotos(photos.length)} className="group absolute inset-0 overflow-hidden">
              <Image
                src={tour.image}
                alt={tour.title}
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              {photos.length > 1 && <PhotoCount label={t.viewAll(photos.length)} />}
            </PhotoTrigger>
          </div>
          <div className="flex flex-col justify-end px-[var(--gutter)] pb-[clamp(2rem,4vw,4rem)] pt-6 lg:pe-[clamp(2rem,4vw,5rem)] lg:pt-28">
            <nav aria-label={t.breadcrumb} className="text-sm text-white/60">
              <Link href={lp(lang, "/tours")} className="hover:text-white">{t.breadcrumb}</Link>
              {category && (
                <>
                  <span aria-hidden> / </span>
                  <Link href={lp(lang, `/tours?category=${category.id}`)} className="hover:text-white">
                    {category.name}
                  </Link>
                </>
              )}
            </nav>
            <h1 className="mt-3 text-[clamp(2.5rem,min(5vw,9svh),6rem)] leading-[0.98] tracking-[-0.04em]">
              {tour.title}
            </h1>
            {tour.gyg && (
              <a
                href={tour.gyg.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-[15px] text-white/80 hover:text-white"
              >
                <Star size={16} className="fill-brand text-brand" aria-hidden />
                {t.onGyg(tour.gyg.rating.toFixed(1), num(lang, tour.gyg.reviews))}
              </a>
            )}
            <p className="mt-4 max-w-2xl text-[clamp(1.05rem,1.4vw,1.35rem)] leading-snug text-white/85">
              {tour.summary}
            </p>
          </div>
        </div>
      </section>

      <Container className="pb-32 lg:pb-[clamp(5rem,8vw,9rem)]">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(22rem,27rem)] lg:gap-[clamp(3rem,6vw,8rem)]">
          <div className="min-w-0 pt-[clamp(1.75rem,3.5vw,3.5rem)]">
            <ul className="reveal grid grid-cols-2 gap-x-6 gap-y-5 border-b border-line pb-[clamp(1.75rem,3vw,2.5rem)] sm:grid-cols-4">
              {quick.map(({ icon: Icon, label, value }) => (
                <li key={label} className="flex gap-3">
                  <Icon size={22} className="mt-0.5 shrink-0 text-brand-deep" aria-hidden />
                  <div>
                    <p className="text-sm text-ink/60">{label}</p>
                    <p className="font-medium leading-snug">{value}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="pt-[clamp(1.75rem,3vw,2.5rem)]">
              {tour.highlights && (
                <Row title={t.highlights}>
                  <Bullets items={tour.highlights} mark="yes" />
                </Row>
              )}

              {tour.photos && tour.photos.length > 1 && (
                <div className="pb-[clamp(1.75rem,3vw,2.5rem)]">
                  <GalleryGrid photos={tour.photos.slice(1)} offset={1} title={tour.title} lang={lang} />
                </div>
              )}

              {tour.includes.length > 0 && (
                <Row title={t.included}>
                  <Bullets items={tour.includes} mark="yes" />
                  {tour.optionIncludes && (
                    <>
                      <SubHead>{tour.optionIncludes.title}</SubHead>
                      <Bullets items={tour.optionIncludes.items} mark="plus" />
                    </>
                  )}
                  {tour.notIncluded && (
                    <>
                      <SubHead>{t.notIncluded}</SubHead>
                      <Bullets items={tour.notIncluded} mark="no" />
                    </>
                  )}
                </Row>
              )}

              {tour.stops && (
                <Row title={t.route}>
                  <Route stops={tour.stops} lang={lang} />
                </Row>
              )}

              {reviews.length > 0 && tour.gyg && (
                <Row title={r.row}>
                  {r.note && <p className="mb-4 text-ink/60">{r.note}</p>}
                  <div className="grid gap-[clamp(0.75rem,1.2vw,1.25rem)] sm:grid-cols-2">
                    {reviews.map((rv) => (
                      <ReviewCard key={rv.name + rv.date} review={rv} date={reviewDate(rv.date, lang)} labels={{ verified: r.verified, more: r.more, less: r.less }} />
                    ))}
                  </div>
                  <a
                    href={tour.gyg.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group mt-5 inline-flex items-center gap-1.5 font-semibold text-brand-deep underline decoration-2 underline-offset-4 hover:text-ink"
                  >
                    <Star size={16} className="fill-brand text-brand" aria-hidden />
                    {r.all(num(lang, tour.gyg.reviews))}
                    <ArrowUpRight size={16} aria-hidden className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
                  </a>
                </Row>
              )}

              {tour.notSuitableFor && (
                <Row title={t.notSuitable}>
                  <Bullets items={tour.notSuitableFor} mark="no" />
                </Row>
              )}

              {(tour.whatToBring || tour.notes) && (
                <Row title={t.important}>
                  {tour.whatToBring && (
                    <>
                      <SubHead>{t.bring}</SubHead>
                      <Bullets items={tour.whatToBring} mark="yes" />
                    </>
                  )}
                  {tour.notes && tour.notes.length > 0 && (
                    <>
                      <SubHead>{t.goodToKnow}</SubHead>
                      <Bullets items={tour.notes} mark="dot" />
                    </>
                  )}
                </Row>
              )}
            </div>

            {tour.includes.length === 0 && (
              <section className="on-ink mt-[clamp(2.5rem,5vw,4.5rem)] rounded-[var(--radius-card)] bg-ink p-[clamp(1.5rem,3vw,3rem)] text-white first:mt-0">
                <h2 className="text-[clamp(1.75rem,3vw,3rem)] leading-none">{t.fullDetails}</h2>
                <p className="mt-3 max-w-xl text-white/75">{t.fullDetailsText}</p>
                <Button
                  href={whatsappLink(t.askMessage(SITE.name, tour.title))}
                  className="mt-5"
                  icon={<MessageCircle size={18} />}
                >
                  {t.askWhatsapp}
                </Button>
              </section>
            )}
          </div>

          <aside data-booking-panel className="relative z-10 min-w-0 lg:-mt-[clamp(7rem,20svh,14rem)]">
            <BookingPanel tour={tour} lang={lang} />
          </aside>
        </div>

        {related.length > 0 && (
          <section className="mt-[clamp(3rem,6vw,6rem)]">
            <h2 className="display-lg">
              {related.every((x) => x.category === tour.category) && category
                ? t.more(category.name)
                : t.alsoLike}
            </h2>
            <div className="mt-[clamp(1.5rem,3vw,3rem)] grid sm:grid-cols-2 xl:grid-cols-4 gap-[clamp(0.75rem,1.2vw,1.5rem)]">
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
