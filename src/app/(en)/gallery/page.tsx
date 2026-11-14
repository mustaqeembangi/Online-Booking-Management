import GalleryView, { galleryMeta } from "@/views/GalleryView";

export const metadata = galleryMeta("en");

export default function Page() {
  return <GalleryView lang="en" />;
}
