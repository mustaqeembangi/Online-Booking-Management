import type { MetadataRoute } from "next";
import { SITE } from "@/data/site";
import { CATEGORIES, TOURS } from "@/data/tours";
import { LANGS, lp } from "@/i18n";

// Every page in English and Arabic; each entry lists both versions so search engines pair them.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const pages: [string, number][] = [
    ["/", 1],
    ["/tours", 0.9],
    ...CATEGORIES.map((c): [string, number] => [`/tours?category=${c.id}`, 0.8]),
    ...TOURS.map((t): [string, number] => [`/tours/${t.slug}`, t.gyg ? 0.9 : 0.7]),
    ["/about", 0.5],
    ["/contact", 0.5],
  ];
  const abs = (path: string) => `${SITE.url}${path === "/" ? "" : path}`;
  return pages.flatMap(([path, priority]) =>
    LANGS.map((lang) => ({
      url: abs(lp(lang, path)),
      lastModified,
      priority: lang === "en" ? priority : Math.round(priority * 0.9 * 10) / 10,
      alternates: { languages: { en: abs(path), ar: abs(lp("ar", path)) } },
    })),
  );
}
