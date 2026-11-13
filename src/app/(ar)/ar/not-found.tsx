import NotFoundView, { notFoundMeta } from "@/views/NotFoundView";

export const metadata = notFoundMeta("ar");

export default function NotFound() {
  return <NotFoundView lang="ar" />;
}
