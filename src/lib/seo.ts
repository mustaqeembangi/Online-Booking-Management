import type { Metadata } from "next";
import { SITE } from "@/data/site";
import { formatPrice, type Tour } from "@/data/tours";
import { UI, lp, type Lang } from "@/i18n";

export const HOME_DESCRIPTION = UI.en.meta.homeDescription;

function clip(text: string, max = 158) {
  if (text.length <= max) return text;
  return `${text.slice(0, text.lastIndexOf(" ", max - 1)).replace(/[,.;:،]$/, "")}…`;
}

export function tourDescription(tour: Tour, lang: Lang = "en") {
  const tail = UI[lang].meta.tourDescriptionTail(tour.price ? formatPrice(tour.price) : "");
  return `${clip(tour.summary, 158 - tail.length)}${tail}`;
}

const PLACE = /Dubai|Abu Dhabi|Sharjah|Lahbab|دبي|أبوظبي|الشارقة|اللهباب/;

// Long titles drop the brand so search results do not cut them off.
export function tourTitle(tour: Tour, lang: Lang = "en"): string | { absolute: string } {
  const title = PLACE.test(tour.title) ? tour.title : UI[lang].meta.inDubai(tour.title);
  return title.length > 45 ? { absolute: title } : title;
}

// `path` is the English path ("/tours/x"); the Arabic one is derived from it.
export function pageMeta({
  title,
  description,
  path,
  lang = "en",
  image = "/opengraph-image",
}: {
  title: string | { absolute: string };
  description: string;
  path: string;
  lang?: Lang;
  image?: string;
}): Metadata {
  const shareTitle = typeof title === "string" ? `${title} | ${SITE.name}` : title.absolute;
  const url = lp(lang, path);
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: { en: path, ar: lp("ar", path), "x-default": path },
    },
    openGraph: {
      title: shareTitle,
      description,
      url,
      siteName: SITE.name,
      type: "website",
      locale: UI[lang].meta.ogLocale,
      alternateLocale: [UI[lang === "en" ? "ar" : "en"].meta.ogLocale],
      images: [{ url: image, width: 1200, height: 630, alt: SITE.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description,
      images: [image],
    },
  };
}
