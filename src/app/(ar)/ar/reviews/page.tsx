import ReviewsView, { reviewsMeta } from "@/views/ReviewsView";

export const metadata = reviewsMeta("ar");

export default function Page() {
  return <ReviewsView lang="ar" />;
}
