import { SITE } from "@/data/site";

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

export function bookingMessage(input: BookingInput): string {
  const lines = [
    `Hello ${SITE.name}, I would like to book:`,
    "",
    `Tour: ${input.tourTitle}`,
    `Date: ${input.date}`,
    `Adults: ${input.adults}`,
    `Children: ${input.children}`,
  ];
  if (input.tourType) lines.push(`Type: ${input.tourType}`);
  lines.push(`Pickup: ${input.pickup}`);
  if (input.estimate) lines.push(`Estimated total: ${input.estimate}`);
  if (input.note) lines.push(`Note: ${input.note}`);
  lines.push("", `Name: ${input.name}`);
  return lines.join("\n");
}
