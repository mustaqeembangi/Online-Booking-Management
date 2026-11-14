import GalleryView, { galleryMeta } from "@/views/GalleryView";

export const metadata = galleryMeta("ar");

export default function Page() {
  return <GalleryView lang="ar" />;
}
