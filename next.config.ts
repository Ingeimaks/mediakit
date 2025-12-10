import type { NextConfig } from "next";

const repoName = "mediakit";

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: "export",
  images: { unoptimized: true },
  basePath: `/${repoName}`,
  ...(process.env.NODE_ENV === "production"
    ? {
        assetPrefix: `/${repoName}/`,
        trailingSlash: true,
      }
    : {}),
};

export default nextConfig;
