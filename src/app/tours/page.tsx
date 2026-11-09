import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import TourCard from "@/components/tours/TourCard";
import { CATEGORIES, TOURS, type CategoryId } from "@/data/tours";

export const metadata: Metadata = {
  title: "Tours",
  description:
    "Desert safaris, dhow cruises, city tours and attractions in Dubai with Ammar Tours. Pick a tour and send your booking on WhatsApp.",
  alternates: { canonical: "/tours" },
};

export default async function ToursPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const sp = await searchParams;
  const raw = Array.isArray(sp.category) ? sp.category[0] : sp.category;
  const active = CATEGORIES.find((c) => c.id === raw);

  const list = active ? TOURS.filter((t) => t.category === active.id) : TOURS;
  // Tours with a GetYourGuide rating first, then the rest in the order of the data.
  const sorted = [...list].sort((a, b) => Number(!!b.gyg) - Number(!!a.gyg));

  const chip = (isActive: boolean) =>
    `inline-flex h-11 items-center whitespace-nowrap rounded-full px-5 text-[15px] font-semibold transition-colors ${
      isActive
        ? "bg-ink text-white"
        : "border border-line text-ink hover:border-ink"
    }`;

  return (
    <Container className="pb-20 pt-12 sm:pt-16">
      <h1 className="text-4xl font-semibold text-ink sm:text-5xl">
        {active ? active.name : "All tours"}
      </h1>
      <p className="mt-3 max-w-2xl text-lg text-ink/70">
        {active
          ? active.blurb
          : "Pick a tour, choose your date and send us your booking on WhatsApp. We confirm the details with you there."}
      </p>

      <nav
        aria-label="Filter tours by type"
        className="-mx-5 mt-8 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
      >
        <Link
          href="/tours"
          scroll={false}
          aria-current={!active ? "page" : undefined}
          className={chip(!active)}
        >
          All
        </Link>
        {CATEGORIES.map((c) => (
          <Link
            key={c.id}
            href={`/tours?category=${c.id satisfies CategoryId}`}
            scroll={false}
            aria-current={active?.id === c.id ? "page" : undefined}
            className={chip(active?.id === c.id)}
          >
            {c.name}
          </Link>
        ))}
      </nav>

      <p className="mt-6 text-sm text-ink/60" aria-live="polite">
        {sorted.length} {sorted.length === 1 ? "tour" : "tours"}
      </p>

      <div className="mt-4 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((t) => (
          <TourCard key={t.slug} tour={t} />
        ))}
      </div>
    </Container>
  );
}
