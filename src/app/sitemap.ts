import type { MetadataRoute } from "next";
import { SITE } from "@/data/site";
import { TOURS } from "@/data/tours";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/tours", "/about", "/contact"].map((p) => ({
    url: `${SITE.url}${p}`,
  }));
  const tours = TOURS.map((t) => ({ url: `${SITE.url}/tours/${t.slug}` }));
  return [...pages, ...tours];
}
