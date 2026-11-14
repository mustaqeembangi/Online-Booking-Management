import ReviewsView, { reviewsMeta } from "@/views/ReviewsView";

export const metadata = reviewsMeta("en");

export default function Page() {
  return <ReviewsView lang="en" />;
}
