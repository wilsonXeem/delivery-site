import type { NextConfig } from "next";

const distDir =
  process.env.NEXT_DIST_DIR || (process.env.NODE_ENV === "development" ? ".next-dev" : ".next");

const nextConfig: NextConfig = {
  distDir,
  reactStrictMode: true,
  serverExternalPackages: ["mongoose"],
  experimental: {
    devtoolSegmentExplorer: false,
  },
};

export default nextConfig;
