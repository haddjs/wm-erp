import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: "standalone",
  async redirects() {
    return [
      {
        source: "/dashboard",
        destination: "/",
        permanent: true,
      },
      {
        source: "/reports",
        destination: "/purchase-records",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
