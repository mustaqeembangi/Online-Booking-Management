import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, MessageCircle, Star } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import TourCard from "@/components/tours/TourCard";
import BookingPanel from "@/components/tours/BookingPanel";
import { CATEGORIES, TOURS, getTour } from "@/data/tours";
import { SITE } from "@/data/site";
import { whatsappLink } from "@/lib/whatsapp";
import { pageMeta, tourDescription, tourTitle } from "@/lib/seo";

export function generateStaticParams() {
  return TOURS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tour = getTour(slug);
  if (!tour) return {};
  return pageMeta({
    title: tourTitle(tour),
    description: tourDescription(tour),
    path: `/tours/${tour.slug}`,
    image: `/tours/${tour.slug}/opengraph-image`,
  });
}

function List({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="mt-[clamp(2.5rem,5vw,4.5rem)] first:mt-0">
      <h2 className="text-[clamp(1.75rem,3vw,3rem)] leading-none">{title}</h2>
      <ul className="mt-5 grid gap-x-8 sm:grid-cols-2">
        {items.map((i) => (
          <li key={i} className="flex gap-3 border-t border-line py-3.5 text-[17px] leading-snug">
            <span aria-hidden className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-ink text-brand">
              <Check size={13} strokeWidth={3} />
            </span>
            <span>{i}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default async function TourPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tour = getTour(slug);
  if (!tour) notFound();

  const category = CATEGORIES.find((c) => c.id === tour.category);
  const facts = [
    { label: "Duration", value: tour.duration },
    { label: "Departs", value: tour.departs },
    { label: "Returns", value: tour.returns },
    { label: "Minimum guests", value: tour.minGuests ? String(tour.minGuests) : null },
    { label: "Tour types", value: tour.types.length ? tour.types.join(" or ") : null },
  ].filter((f): f is { label: string; value: string } => !!f.value);

  const related = [
    ...TOURS.filter((t) => t.category === tour.category && t.slug !== tour.slug),
    ...TOURS.filter((t) => t.category !== tour.category && t.featured && t.slug !== tour.slug),
  ].slice(0, 4);

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { name: "Home", item: SITE.url },
      { name: "Tours", item: `${SITE.url}/tours` },
      { name: tour.title, item: `${SITE.url}/tours/${tour.slug}` },
    ].map((b, i) => ({ "@type": "ListItem", position: i + 1, ...b })),
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: tour.title,
    description: tour.summary,
    image: `${SITE.url}${tour.image}`,
    url: `${SITE.url}/tours/${tour.slug}`,
    touristType: tour.types.length ? tour.types : undefined,
    provider: { "@type": "TravelAgency", name: SITE.name, url: SITE.url },
    ...(tour.price && {
      offers: {
        "@type": "Offer",
        price: tour.price.amount,
        priceCurrency: tour.price.currency,
        url: `${SITE.url}/tours/${tour.slug}`,
      },
    }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([jsonLd, breadcrumbs]).replace(/</g, "\\u003c"),
        }}
      />
      <section className="on-ink bg-ink text-white">
        <div className="grid lg:min-h-[min(90svh,58rem)] lg:grid-cols-2">
          <div className="relative aspect-[4/3] max-h-[72svh] w-full sm:aspect-[16/9] lg:order-2 lg:aspect-auto lg:max-h-none">
            <Image
              src={tour.image}
              alt={tour.title}
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-end px-[var(--gutter)] pb-[clamp(2.5rem,5vw,5rem)] pt-8 lg:pr-[clamp(2rem,4vw,5rem)] lg:pt-32">
            <nav aria-label="Breadcrumb" className="text-sm text-white/60">
              <Link href="/tours" className="hover:text-white">Tours</Link>
              {category && (
                <>
                  <span aria-hidden> / </span>
                  <Link href={`/tours?category=${category.id}`} className="hover:text-white">
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
                href={SITE.socials.getyourguide}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-[15px] text-white/80 hover:text-white"
              >
                <Star size={16} className="fill-brand text-brand" aria-hidden />
                {tour.gyg.rating.toFixed(1)} on GetYourGuide (
                {tour.gyg.reviews.toLocaleString("en-US")} reviews)
              </a>
            )}
            <p className="mt-4 max-w-2xl text-[clamp(1.05rem,1.4vw,1.35rem)] leading-snug text-white/85">
              {tour.summary}
            </p>
            {facts.length > 0 && (
              <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-white/15 pt-5 sm:grid-cols-3">
                {facts.map((f) => (
                  <div key={f.label}>
                    <dt className="text-sm text-white/55">{f.label}</dt>
                    <dd className="mt-0.5 font-medium">{f.value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        </div>
      </section>

      <Container className="pb-32 lg:pb-[clamp(5rem,8vw,9rem)]">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(22rem,27rem)] lg:gap-[clamp(3rem,6vw,8rem)]">
          <div className="min-w-0 pt-[clamp(2.5rem,5vw,5rem)]">
            {tour.includes.length > 0 && <List title="What's included" items={tour.includes} />}
            {tour.extras && tour.extras.length > 0 && (
              <List title="Available at extra cost" items={tour.extras} />
            )}
            {tour.notes && tour.notes.length > 0 && (
              <List title="Good to know" items={tour.notes} />
            )}

            {tour.includes.length === 0 && (
              <section className="on-ink mt-[clamp(2.5rem,5vw,4.5rem)] rounded-[var(--radius-card)] bg-ink p-[clamp(1.5rem,3vw,3rem)] text-white first:mt-0">
                <h2 className="text-[clamp(1.75rem,3vw,3rem)] leading-none">Want the full details?</h2>
                <p className="mt-3 max-w-xl text-white/75">
                  Send us a message and we will tell you what the tour includes, the
                  timings and the price for your group.
                </p>
                <Button
                  href={whatsappLink(`Hello ${SITE.name}, I would like details about: ${tour.title}`)}
                  className="mt-5"
                  icon={<MessageCircle size={18} />}
                >
                  Ask on WhatsApp
                </Button>
              </section>
            )}
          </div>

          <aside data-booking-panel className="relative z-10 min-w-0 lg:-mt-[clamp(7rem,20svh,14rem)]">
            <BookingPanel tour={tour} />
          </aside>
        </div>

        {related.length > 0 && (
          <section className="mt-[clamp(4rem,8vw,8rem)]">
            <h2 className="display-lg">
              {related.some((t) => t.category === tour.category) && category
                ? `More ${category.name.toLowerCase()}`
                : "You may also like"}
            </h2>
            <div className="mt-[clamp(1.5rem,3vw,3rem)] grid sm:grid-cols-2 xl:grid-cols-4 gap-[clamp(0.75rem,1.2vw,1.5rem)]">
              {related.map((t) => (
                <TourCard key={t.slug} tour={t} />
              ))}
            </div>
          </section>
        )}
      </Container>
    </>
  );
}
