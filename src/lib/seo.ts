import type { Metadata } from "next";
import { SITE } from "@/data/site";
import { formatPrice, type Tour } from "@/data/tours";

export const HOME_DESCRIPTION =
  "Book desert safaris, quad biking, dhow cruises and city tours in Dubai with hotel pickup. Rated 4.9 on GetYourGuide. Send your booking on WhatsApp.";

function clip(text: string, max = 158) {
  if (text.length <= max) return text;
  return `${text.slice(0, text.lastIndexOf(" ", max - 1)).replace(/[,.;:]$/, "")}…`;
}

export function tourDescription(tour: Tour) {
  const price = tour.price ? ` From ${formatPrice(tour.price)}.` : "";
  const summary = clip(tour.summary, 158 - price.length - 16);
  return `${summary}${price} Book on WhatsApp.`;
}

const PLACE = /Dubai|Abu Dhabi|Sharjah|Al Ain|Hatta|Musandam|Lahbab/;

// Long titles drop the brand so search results do not cut them off.
export function tourTitle(tour: Tour): string | { absolute: string } {
  const title = PLACE.test(tour.title) ? tour.title : `${tour.title} in Dubai`;
  return title.length > 45 ? { absolute: title } : title;
}

export function pageMeta({
  title,
  description,
  path,
  image = "/opengraph-image",
}: {
  title: string | { absolute: string };
  description: string;
  path: string;
  image?: string;
}): Metadata {
  const shareTitle = typeof title === "string" ? `${title} | ${SITE.name}` : title.absolute;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: shareTitle,
      description,
      url: path,
      siteName: SITE.name,
      type: "website",
      locale: "en_US",
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
