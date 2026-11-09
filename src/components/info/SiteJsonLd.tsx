import { SITE } from "@/data/site";

export default function SiteJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: SITE.name,
    url: SITE.url,
    telephone: SITE.phone,
    email: SITE.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "AB Plaza 8, Al Mamzar",
      addressLocality: "Dubai",
      addressCountry: "AE",
    },
    sameAs: Object.values(SITE.socials),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
