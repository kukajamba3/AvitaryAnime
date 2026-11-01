import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" }
    ],
    formats: ["image/avif", "image/webp"],
  },
  output: "standalone",
};

export default nextConfig;
