import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import { CATEGORIES } from "@/data/tours";

const layout = [
  "lg:col-span-4 h-72 lg:h-96",
  "lg:col-span-2 h-72 lg:h-96",
  "lg:col-span-2 h-64 lg:h-80",
  "lg:col-span-2 h-64 lg:h-80",
  "sm:col-span-2 lg:col-span-2 h-64 lg:h-80",
];

export default function CategoryTiles() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <h2 className="max-w-2xl text-3xl font-semibold sm:text-5xl">What would you like to do?</h2>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {CATEGORIES.map((c, i) => (
            <Link
              key={c.id}
              href={`/tours?category=${c.id}`}
              className={`group relative block overflow-hidden rounded-2xl bg-ink ${layout[i] ?? "h-64"}`}
            >
              <Image
                src={c.image}
                alt={c.name}
                fill
                sizes={i === 0 ? "(min-width: 1024px) 66vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
                className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                <h3 className="text-2xl font-semibold sm:text-3xl">{c.name}</h3>
                <p className="mt-1 text-[15px] text-white/85">{c.blurb}</p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
