import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Star } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import TourCard from "@/components/tours/TourCard";
import BookingPanel from "@/components/tours/BookingPanel";
import { CATEGORIES, TOURS, getTour } from "@/data/tours";
import { SITE } from "@/data/site";
import { whatsappLink } from "@/lib/whatsapp";

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
  return {
    title: tour.title,
    description: tour.summary,
    alternates: { canonical: `/tours/${tour.slug}` },
    openGraph: {
      title: tour.title,
      description: tour.summary,
      url: `/tours/${tour.slug}`,
      type: "website",
      images: [{ url: tour.image, alt: tour.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: tour.title,
      description: tour.summary,
      images: [tour.image],
    },
  };
}

function List({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-semibold text-ink">{title}</h2>
      <ul className="mt-4 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
        {items.map((i) => (
          <li key={i} className="flex gap-3 text-[16px] text-ink/85">
            <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-deep" />
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
  ].slice(0, 3);

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
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Container className="pb-28 pt-6 sm:pt-10 lg:pb-20">
        <nav aria-label="Breadcrumb" className="mb-5 text-sm text-ink/60">
          <Link href="/tours" className="hover:text-ink hover:underline">
            Tours
          </Link>
          {category && (
            <>
              <span aria-hidden> / </span>
              <Link
                href={`/tours?category=${category.id}`}
                className="hover:text-ink hover:underline"
              >
                {category.name}
              </Link>
            </>
          )}
        </nav>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-14">
          <div className="min-w-0">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-line sm:aspect-[16/10]">
              <Image
                src={tour.image}
                alt={tour.title}
                fill
                priority
                sizes="(min-width: 1280px) 760px, (min-width: 1024px) 60vw, 100vw"
                className="object-cover"
              />
            </div>

            <div className="mt-8">
              {category && (
                <div className="text-sm font-semibold text-brand-deep">{category.name}</div>
              )}
              <h1 className="mt-1 text-3xl font-semibold leading-tight text-ink sm:text-4xl lg:text-[2.75rem]">
                {tour.title}
              </h1>
              {tour.gyg && (
                <a
                  href={SITE.socials.getyourguide}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-2 text-[15px] text-ink/75 hover:text-ink hover:underline"
                >
                  <Star size={16} className="fill-ink text-ink" aria-hidden />
                  {tour.gyg.rating.toFixed(1)} on GetYourGuide (
                  {tour.gyg.reviews.toLocaleString("en-US")} reviews)
                </a>
              )}
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/80">
                {tour.summary}
              </p>
            </div>

            {facts.length > 0 && (
              <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-y border-line py-6 sm:grid-cols-3">
                {facts.map((f) => (
                  <div key={f.label}>
                    <dt className="text-sm text-ink/60">{f.label}</dt>
                    <dd className="mt-0.5 font-semibold text-ink">{f.value}</dd>
                  </div>
                ))}
              </dl>
            )}

            {tour.includes.length > 0 && <List title="What's included" items={tour.includes} />}
            {tour.extras && tour.extras.length > 0 && (
              <List title="Available at extra cost" items={tour.extras} />
            )}
            {tour.notes && tour.notes.length > 0 && (
              <List title="Good to know" items={tour.notes} />
            )}

            {tour.includes.length === 0 && (
              <section className="mt-12 rounded-2xl border border-line p-6">
                <h2 className="text-xl font-semibold text-ink">Want the full details?</h2>
                <p className="mt-2 max-w-xl text-ink/75">
                  Send us a message and we will tell you what the tour includes, the
                  timings and the price for your group.
                </p>
                <Button
                  href={whatsappLink(`Hello ${SITE.name}, I would like details about: ${tour.title}`)}
                  variant="outline"
                  className="mt-4"
                >
                  Ask on WhatsApp
                </Button>
              </section>
            )}
          </div>

          <aside className="min-w-0">
            <BookingPanel tour={tour} />
          </aside>
        </div>

        {related.length > 0 && (
          <section className="mt-20 border-t border-line pt-12">
            <h2 className="text-2xl font-semibold text-ink sm:text-3xl">
              {related.some((t) => t.category === tour.category) && category
                ? `More ${category.name.toLowerCase()}`
                : "You may also like"}
            </h2>
            <div className="mt-8 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
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
