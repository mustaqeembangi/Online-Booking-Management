import AboutView, { aboutMeta } from "@/views/AboutView";

export const metadata = aboutMeta("ar");

export default function Page() {
  return <AboutView lang="ar" />;
}
