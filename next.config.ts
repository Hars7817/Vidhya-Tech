import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  metadataBase: new URL("https://www.vidhyatech.com"),
  turbopack: {
    root: process.cwd(),
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
