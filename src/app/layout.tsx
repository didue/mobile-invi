import type { Metadata, Viewport } from "next";
import { COUPLE } from "@/data/wedding";
import { IntroOverlay } from "@/components/common/IntroOverlay";
import { KakaoSdk } from "@/components/common/KakaoSdk";
import "./globals.css";

export const metadata: Metadata = {
  title: `${COUPLE.groom.name} ♥ ${COUPLE.bride.name} 결혼합니다`,
  description: `${COUPLE.groom.name}과 ${COUPLE.bride.name}의 결혼식에 초대합니다.`,
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
          href="https://fonts.googleapis.com/css2?family=Nanum+Myeongjo:wght@400;700;800&family=Noto+Sans+KR:wght@300;400;500;700&family=Dancing+Script:wght@500;700&family=Gowun+Batang:wght@400;700&family=Nanum+Gothic+Coding:wght@400;700&family=Chiron+GoRound+TC:wght@400;700&family=Orbit&family=IBM+Plex+Sans+KR:wght@400;700&display=swap"
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
