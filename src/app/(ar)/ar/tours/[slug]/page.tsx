import TourView, { tourMeta, tourParams, type TourParams } from "@/views/TourView";

export const generateStaticParams = tourParams;

export function generateMetadata({ params }: { params: TourParams }) {
  return tourMeta(params, "ar");
}

export default function Page({ params }: { params: TourParams }) {
  return <TourView params={params} lang="ar" />;
}
