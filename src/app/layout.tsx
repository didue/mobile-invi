import type { Metadata, Viewport } from "next";
import { COUPLE } from "@/data/family";
import { OG_SHARE_IMAGE } from "@/data/wedding";
import { IntroOverlay } from "@/components/common/IntroOverlay";
import { KakaoSdk } from "@/components/common/KakaoSdk";
import "./globals.css";

const SHARE_TITLE = `${COUPLE.groom.name} ♥ ${COUPLE.bride.name} 결혼합니다.`;
const SHARE_DESCRIPTION = `2027년 1월 9일 토요일 오후 12시 40분`;

// og:image 를 절대 URL 로 만들기 위한 기준 주소.
// VERCEL_PROJECT_PRODUCTION_URL 은 Vercel 이 빌드 시 자동 주입하므로 .env 설정이 필요 없다.
const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: SHARE_TITLE,
  description: SHARE_DESCRIPTION,
  icons: {
    icon: { url: "/assets/icon/favicon.webp", type: "image/webp" },
  },
  // 공유 미리보기가 갤러리 원본(수MB)을 긁어가지 않도록 전용 썸네일을 지정한다.
  openGraph: {
    title: SHARE_TITLE,
    description: SHARE_DESCRIPTION,
    type: "website",
    images: [{ url: OG_SHARE_IMAGE, width: 800, height: 800, alt: SHARE_TITLE }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font -- App Router 루트 레이아웃이라 pages/_document 규칙이 적용되지 않는다. react.md 스펙상 next/font 대신 link 태그로 로드한다. */}
        <link
          href="https://fonts.googleapis.com/css2?family=Nanum+Myeongjo:wght@400;700;800&family=Gowun+Batang:wght@400;700&family=IBM+Plex+Sans+KR:wght@400;700&family=Cormorant+Garamond:wght@500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <KakaoSdk />
        <IntroOverlay />
        <div className="app">{children}</div>
      </body>
    </html>
  );
}
