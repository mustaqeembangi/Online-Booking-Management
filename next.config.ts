import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      "/listing-experiences",
      "/listing-experiences-detail",
      "/listing-experiences-map",
      "/checkout",
      "/pay-done",
    ].map((source) => ({ source, destination: "/tours", permanent: true }));
  },
};

export default nextConfig;
