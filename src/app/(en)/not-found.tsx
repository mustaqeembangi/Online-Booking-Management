import NotFoundView, { notFoundMeta } from "@/views/NotFoundView";

export const metadata = notFoundMeta("en");

export default function NotFound() {
  return <NotFoundView lang="en" />;
}
