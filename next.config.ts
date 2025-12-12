import type { NextConfig } from "next";

const repoName = "mediakit";

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: "export",
  images: { unoptimized: true },
  basePath: process.env.NODE_ENV === "production" ? `/${repoName}` : undefined,
  ...(process.env.NODE_ENV === "production"
    ? {
        assetPrefix: `/${repoName}/`,
        trailingSlash: true,
      }
    : {}),
};

export default nextConfig;
