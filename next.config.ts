import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/auth/signup", destination: "/login", permanent: true },
      { source: "/register", destination: "/login", permanent: true },
      { source: "/signup", destination: "/login", permanent: true },
    ];
  },
};

export default nextConfig;
