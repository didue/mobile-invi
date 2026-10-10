import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 모든 사진은 scripts/optimize-images.mjs 로 480px 카드에 맞는 WebP(긴 변 640/1600px)로
    // 미리 변환해 두므로 런타임 변환이 필요하지 않다. 켜 두면 Vercel Image Transformation
    // 과금과 원본 재fetch 비용만 발생하므로 끈다.
    unoptimized: true,
  },
};

export default nextConfig;
