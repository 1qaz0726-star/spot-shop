import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 開發時左下角黑色 N 圓鈕是 Next.js 內建指示器，會擋住手機版 Tab
  devIndicators: false,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
    ],
  },
};

export default nextConfig;
