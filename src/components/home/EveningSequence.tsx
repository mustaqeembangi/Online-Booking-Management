import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import { getTour } from "@/data/tours";

export default function EveningSequence() {
  const tour = getTour("evening-desert-safari");
  if (!tour) return null;
  return (
    <section className="border-t border-line py-20 sm:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <h2 className="text-3xl font-semibold sm:text-5xl">Your evening in the desert</h2>
              <div className="relative mt-8 aspect-[4/3] overflow-hidden rounded-2xl bg-line">
                <Image
                  src={tour.image}
                  alt="Desert camp and dunes on the evening safari"
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
              <dl className="mt-6 flex gap-10">
                {tour.departs && (
                  <div>
                    <dt className="text-sm text-ink/60">Pickup</dt>
                    <dd className="mt-1 text-lg font-semibold">{tour.departs}</dd>
                  </div>
                )}
                {tour.returns && (
                  <div>
                    <dt className="text-sm text-ink/60">Back at your hotel</dt>
                    <dd className="mt-1 text-lg font-semibold">{tour.returns}</dd>
                  </div>
                )}
              </dl>
              <Link
                href={`/tours/${tour.slug}`}
                className="mt-6 inline-block font-semibold text-brand-deep underline underline-offset-4"
              >
                See the Evening Desert Safari
              </Link>
            </div>
          </div>
          <ol className="lg:col-span-7">
            {tour.includes.map((item, i) => (
              <li key={item} className="flex gap-5 border-t border-line py-5 first:border-t-0 first:pt-0">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink font-display text-base font-semibold text-white">
                  {i + 1}
                </span>
                <span className="pt-1.5 text-lg leading-snug">{item}</span>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
