import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CATEGORIES, getToursByCategory } from "@/data/tours";
import Container from "@/components/ui/Container";

const layout = [
  "sm:col-span-2 lg:col-span-7 lg:row-span-2",
  "lg:col-span-5",
  "lg:col-span-5",
  "lg:col-span-5",
  "sm:col-span-2 lg:col-span-7",
];

export default function CategoryTiles() {
  return (
    <Container as="section" className="section-y">
      <h2 className="display-xl reveal max-w-5xl">
        Pick your kind of <span className="accent-word text-brand-deep">day out</span>
      </h2>
      <div className="mt-[clamp(2rem,5vw,5rem)] grid auto-rows-[clamp(15rem,22vw,27rem)] gap-[clamp(0.75rem,1.2vw,1.5rem)] sm:grid-cols-2 lg:grid-cols-12">
        {CATEGORIES.map((c, i) => {
          const count = getToursByCategory(c.id).length;
          return (
            <Link
              key={c.id}
              href={`/tours?category=${c.id}`}
              className={`reveal group relative isolate overflow-hidden rounded-[var(--radius-card)] bg-ink text-white ${layout[i]}`}
            >
              <Image
                src={c.image}
                alt=""
                fill
                sizes={i === 0 ? "(min-width: 1024px) 58vw, 100vw" : "(min-width: 1024px) 42vw, (min-width: 640px) 50vw, 100vw"}
                className="-z-20 object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
              <div className="flex items-start justify-between p-3.5">
                <span className="inline-flex h-9 items-center rounded-full bg-ink px-3.5 text-sm font-semibold text-white">
                  {count} {count === 1 ? "tour" : "tours"}
                </span>
                <span className="grid h-11 w-11 place-items-center rounded-full bg-white text-ink transition-[background-color,transform] duration-300 group-hover:rotate-45 group-hover:bg-brand">
                  <ArrowUpRight size={20} aria-hidden />
                </span>
              </div>
              <div className="absolute inset-x-0 bottom-0 p-[clamp(1.1rem,2vw,2.25rem)]">
                <h3 className={i === 0 ? "text-[clamp(2rem,4vw,4.5rem)] leading-none" : "text-[clamp(1.6rem,2.6vw,3rem)] leading-none"}>
                  {c.name}
                </h3>
                <p className="mt-2 text-white/80">{c.blurb}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </Container>
  );
}
