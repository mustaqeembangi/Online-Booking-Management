import ToursView, { toursMeta, type SearchParams } from "@/views/ToursView";

export function generateMetadata({ searchParams }: { searchParams: SearchParams }) {
  return toursMeta(searchParams, "en");
}

export default function Page({ searchParams }: { searchParams: SearchParams }) {
  return <ToursView searchParams={searchParams} lang="en" />;
}
