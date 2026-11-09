import { SITE } from "@/data/site";

export default function SiteJsonLd() {
  const data = [
    {
      "@context": "https://schema.org",
      "@type": "TravelAgency",
      "@id": `${SITE.url}/#business`,
      name: SITE.name,
      url: SITE.url,
      logo: `${SITE.url}/images/logo.png`,
      image: `${SITE.url}/opengraph-image`,
      telephone: SITE.phone,
      email: SITE.email,
      areaServed: "United Arab Emirates",
      address: {
        "@type": "PostalAddress",
        streetAddress: "AB Plaza 8, Al Mamzar",
        addressLocality: "Dubai",
        addressCountry: "AE",
      },
      sameAs: Object.values(SITE.socials),
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: SITE.name,
      url: SITE.url,
      publisher: { "@id": `${SITE.url}/#business` },
    },
  ];
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
