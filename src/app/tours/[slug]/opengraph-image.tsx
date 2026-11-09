import { OG_SIZE, renderOg } from "@/lib/og";
import { TOURS, formatPrice, getTour } from "@/data/tours";

export const alt = "Ammar Tours, Dubai";
export const size = OG_SIZE;
export const contentType = "image/jpeg";
export const dynamicParams = false;

export function generateStaticParams() {
  return TOURS.map((t) => ({ slug: t.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tour = getTour(slug)!;
  const details = [
    tour.price && `${tour.price.unit ? "" : "From "}${formatPrice(tour.price)}`,
    tour.gyg && `Rated ${tour.gyg.rating.toFixed(1)} on GetYourGuide`,
    tour.duration && !tour.gyg && tour.duration,
  ].filter((d): d is string => !!d);
  const length = tour.title.length;
  return renderOg({
    image: tour.image,
    title: tour.title,
    fontSize: length > 44 ? 66 : length > 26 ? 80 : 104,
    details,
  });
}
