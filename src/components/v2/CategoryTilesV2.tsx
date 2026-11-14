import Image from "next/image";
import Link from "next/link";
import { UI, lp, type Lang } from "@/i18n";
import SectionHead from "./SectionHead";

const T = "/images/tours/";
// Label i of UI[lang].v2.tiles goes with tile i.
const TILES = [
  { img: `${T}red-dune-safari-quad-camel-bbq.jpg`, href: "/tours?category=desert-safari" },
  { img: `${T}desert-safari-quad-camel-sandboarding.jpg`, href: "/tours/desert-safari-quad-camel-sandboarding" },
  { img: `${T}red-dune-safari-quad-camel-bbq-5.jpg`, href: "/tours/red-dune-safari-quad-camel-bbq" },
  { img: `${T}red-dune-safari-quad-camel-bbq-12.jpg`, href: "/tours/safari-quad-camel-bbq-buffet" },
  { img: `${T}abu-dhabi-city-tour-qasr-al-watan.jpg`, href: "/tours?category=city-tours" },
  { img: `${T}abu-dhabi-tour-sheikh-zayed-mosque.jpg`, href: "/tours/abu-dhabi-tour-sheikh-zayed-mosque" },
];

export default function CategoryTilesV2({ lang }: { lang: Lang }) {
  const v = UI[lang].v2;
  return (
    <section className="border-b border-line bg-white">
      <div className="mx-auto max-w-[1240px] px-[var(--gutter)] py-[clamp(2.5rem,4vw,3.5rem)] xl:px-6">
        <SectionHead eyebrow={v.startEyebrow} title={v.startTitle} />
        <ul className="no-scrollbar mt-6 flex gap-4 overflow-x-auto pb-1 sm:grid sm:grid-cols-6 sm:overflow-visible">
          {TILES.map((tile, i) => (
            <li key={tile.href + i} className="reveal w-28 shrink-0 sm:w-auto">
              <Link href={lp(lang, tile.href)} className="group block text-center">
                <span className="relative block aspect-square overflow-hidden rounded-2xl bg-line shadow-[0_10px_22px_-14px_rgb(3_40_54/0.6)]">
                  <Image src={tile.img} alt="" fill sizes="(min-width: 640px) 16vw, 112px" className="object-cover transition-transform duration-500 group-hover:scale-110" />
                </span>
                <span className="mt-2 block text-[13px] font-semibold group-hover:text-brand-deep">{v.tiles[i]}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
