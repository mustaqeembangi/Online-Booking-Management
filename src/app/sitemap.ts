import type { MetadataRoute } from "next";
import { SITE } from "@/data/site";
import { CATEGORIES, TOURS } from "@/data/tours";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const entry = (path: string, priority: number) => ({
    url: `${SITE.url}${path}`,
    lastModified,
    priority,
  });
  return [
    entry("", 1),
    entry("/tours", 0.9),
    ...CATEGORIES.map((c) => entry(`/tours?category=${c.id}`, 0.8)),
    ...TOURS.map((t) => entry(`/tours/${t.slug}`, t.gyg ? 0.9 : 0.7)),
    entry("/about", 0.5),
    entry("/contact", 0.5),
  ];
}
