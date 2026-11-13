import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 2592000,
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
      {
        source: "/images/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=2592000" }],
      },
    ];
  },
  async redirects() {
    return [
      "/listing-experiences",
      "/listing-experiences-detail",
      "/listing-experiences-map",
      "/checkout",
      "/pay-done",
      // Tours removed on 2026-11-13, when the site was cut down to the GetYourGuide tours.
      "/tours/evening-desert-safari",
      "/tours/morning-desert-safari",
      "/tours/private-desert-safari",
      "/tours/hatta-mountain-safari",
      "/tours/desert-safari-dune-buggy",
      "/tours/desert-safari-quad-bike",
      "/tours/dune-buggy-drive",
      "/tours/quad-biking",
      "/tours/dune-bashing",
      "/tours/camel-riding",
      "/tours/sand-boarding",
      "/tours/dhow-cruise-marina",
      "/tours/dhow-cruise-creek",
      "/tours/five-star-dhow-dinner",
      "/tours/musandam-dibba-cruise",
      "/tours/dubai-city-tour",
      "/tours/abu-dhabi-city-tour",
      "/tours/sharjah-ajman-city-tour",
      "/tours/al-ain-city-tour",
      "/tours/abu-dhabi-ferrari-world",
      "/tours/burj-khalifa",
      "/tours/atlantis-aquaventure",
    ].map((source) => ({ source, destination: "/tours", permanent: true }));
  },
};

export default nextConfig;
