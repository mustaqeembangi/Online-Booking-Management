import ContactView, { contactMeta } from "@/views/ContactView";

export const metadata = contactMeta("ar");

export default function Page() {
  return <ContactView lang="ar" />;
}
