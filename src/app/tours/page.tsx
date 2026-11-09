import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import TourCard from "@/components/tours/TourCard";
import { CATEGORIES, TOURS, type CategoryId } from "@/data/tours";
import { SITE } from "@/data/site";
import { pageMeta } from "@/lib/seo";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const activeCategory = async (searchParams: SearchParams) => {
  const sp = await searchParams;
  const raw = Array.isArray(sp.category) ? sp.category[0] : sp.category;
  return CATEGORIES.find((c) => c.id === raw);
};

export async function generateMetadata({
  searchParams,
}: {
  searchParams: SearchParams;
}): Promise<Metadata> {
  const active = await activeCategory(searchParams);
  if (active) {
    return pageMeta({
      title: `${active.name} in Dubai`,
      description: `${active.name} in Dubai with ${SITE.name}: ${active.blurb.charAt(0).toLowerCase()}${active.blurb.slice(1)}. Compare the tours and send your booking on WhatsApp.`,
      path: `/tours?category=${active.id}`,
    });
  }
  return pageMeta({
    title: "Dubai Tours & Desert Safaris",
    description: `Browse ${TOURS.length} Dubai tours from ${SITE.name}: desert safaris, quad and buggy rides, dhow cruises, city tours and attractions. Book on WhatsApp.`,
    path: "/tours",
  });
}

export default async function ToursPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const active = await activeCategory(searchParams);

  const list = active ? TOURS.filter((t) => t.category === active.id) : TOURS;
  // Tours with a GetYourGuide rating first, then the rest in the order of the data.
  const sorted = [...list].sort((a, b) => Number(!!b.gyg) - Number(!!a.gyg));

  const chip = (isActive: boolean) =>
    `inline-flex h-11 shrink-0 items-center whitespace-nowrap rounded-full px-5 text-[15px] font-medium transition-colors ${
      isActive ? "bg-ink text-white" : "text-ink hover:bg-ink/10"
    }`;

  return (
    <>
      <section className="on-ink bg-ink pb-[clamp(2.5rem,5vw,5rem)] pt-[clamp(8rem,14vw,14rem)] text-white">
        <Container>
          <h1 className="hero-title">
            {active ? active.name : (<>All <span className="accent-word text-brand">tours</span></>)}
          </h1>
          <p className="mt-5 max-w-2xl text-[clamp(1.05rem,1.4vw,1.35rem)] text-white/75">
            {active
              ? active.blurb
              : "Pick a tour, choose your date and send us your booking on WhatsApp. We confirm the details with you there."}
          </p>
        </Container>
      </section>

      <Container className="pb-[clamp(4rem,8vw,8rem)]">
        <nav
          aria-label="Filter tours by type"
          className="sticky top-[5.5rem] z-20 -mt-[1.75rem] flex w-fit max-w-full gap-1 overflow-x-auto rounded-full border border-line bg-white/90 p-1 shadow-[0_16px_40px_-20px_rgb(11_18_14/0.45)] backdrop-blur-xl no-scrollbar"
        >
          <Link href="/tours" scroll={false} aria-current={!active ? "page" : undefined} className={chip(!active)}>
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

        <p className="mt-8 text-sm text-ink/60" aria-live="polite">
          {sorted.length} {sorted.length === 1 ? "tour" : "tours"}
        </p>

        <div className="mt-4 grid grid-cols-[repeat(auto-fill,minmax(min(100%,19rem),1fr))] gap-[clamp(0.75rem,1.2vw,1.5rem)]">
          {sorted.map((t) => (
            <TourCard key={t.slug} tour={t} />
          ))}
        </div>
      </Container>
    </>
  );
}
