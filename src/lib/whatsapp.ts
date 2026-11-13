import { SITE } from "@/data/site";
import { UI, type Lang } from "@/i18n";
import { getTour, localizeTour } from "@/data/tours";

export interface BookingInput {
  tourTitle: string;
  date: string;
  adults: number;
  children: number;
  tourType?: string;
  pickup: string;
  name: string;
  note?: string;
  estimate?: string;
}

export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${SITE.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

// Arabic messages keep the English tour name too, so the team recognises the tour at a glance.
export function bookingMessage(input: BookingInput, lang: Lang = "en"): string {
  const m = UI[lang].message;
  const lines = [
    m.hello(SITE.name),
    "",
    `${m.tour}: ${input.tourTitle}`,
    `${m.date}: ${input.date}`,
    `${m.adults}: ${input.adults}`,
    `${m.children}: ${input.children}`,
  ];
  if (input.tourType) lines.push(`${m.type}: ${input.tourType}`);
  lines.push(`${m.pickup}: ${input.pickup}`);
  if (input.estimate) lines.push(`${m.estimate}: ${input.estimate}`);
  if (input.note) lines.push(`${m.note}: ${input.note}`);
  lines.push("", `${m.name}: ${input.name}`);
  return lines.join("\n");
}

// Tour name for the booking message: Arabic visitors' messages show the Arabic and the English name.
export function bookingTourTitle(slug: string, lang: Lang) {
  const tour = getTour(slug);
  if (!tour) return slug;
  const local = localizeTour(tour, lang).title;
  return local === tour.title ? tour.title : `${local} (${tour.title})`;
}
