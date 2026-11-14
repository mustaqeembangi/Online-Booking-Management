import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PhotoTrigger, PhotoViewer } from "@/components/tours/Gallery";
import PageBanner from "@/components/classic/PageBanner";
import CtaBanner from "@/components/classic/CtaBanner";
import { getTours } from "@/data/tours";
import { pageMeta } from "@/lib/seo";
import { UI, lp, type Lang } from "@/i18n";

export const galleryMeta = (lang: Lang) =>
  pageMeta({ title: UI[lang].classic.galleryTitle, description: UI[lang].classic.gallerySub, path: "/gallery", lang });

// Every tour's photos, grouped by tour. One viewer for the whole page, so arrows go through all photos.
export default function GalleryView({ lang }: { lang: Lang }) {
  const c = UI[lang].classic;
  const g = UI[lang].gallery;
  const tours = getTours(lang);
  const groups = tours.map((x) => x.photos ?? [x.image]);
  const all = groups.flat();
  // Position of each tour's first photo in the page-wide viewer.
  const starts = groups.map((_, i) => groups.slice(0, i).reduce((n, p) => n + p.length, 0));
  return (
    <PhotoViewer photos={all} title={c.galleryTitle} lang={lang}>
      <PageBanner lang={lang} title={c.galleryTitle} sub={c.gallerySub} image="/images/tours/evening-tour-quad-camel-bbq.jpg" crumb={c.galleryTitle} />
      <div className="mx-auto max-w-[1240px] px-[var(--gutter)] xl:px-6">
        {tours.map((x, ti) => {
          const photos = groups[ti];
          const start = starts[ti];
          return (
            <section key={x.slug} className="border-b border-line py-[clamp(2rem,4vw,3rem)] last:border-0">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <h2 className="reveal text-[clamp(1.25rem,2vw,1.6rem)] text-forest">{x.title}</h2>
                <Link
                  href={lp(lang, `/tours/${x.slug}`)}
                  className="inline-flex items-center gap-1.5 rounded-full bg-green px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-forest"
                >
                  {c.bookNow}
                  <ArrowRight size={15} aria-hidden />
                </Link>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
                {photos.map((src, i) => (
                  <PhotoTrigger
                    key={src}
                    index={start + i}
                    label={g.open(start + i + 1)}
                    className="reveal group relative aspect-[4/3] overflow-hidden rounded-xl bg-line"
                  >
                    <Image
                      src={src}
                      alt={g.photo(x.title, i + 1)}
                      fill
                      sizes="(min-width: 1024px) 24vw, (min-width: 640px) 32vw, 48vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                  </PhotoTrigger>
                ))}
              </div>
            </section>
          );
        })}
      </div>
      <CtaBanner lang={lang} />
    </PhotoViewer>
  );
}
