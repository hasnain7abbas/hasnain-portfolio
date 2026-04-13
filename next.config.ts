import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/hasnain-portfolio",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
