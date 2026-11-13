import HomeView, { homeMeta } from "@/views/HomeView";

export const metadata = homeMeta("ar");

export default function Page() {
  return <HomeView lang="ar" />;
}
