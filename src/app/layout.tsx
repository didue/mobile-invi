import type { Metadata } from "next";
import { COUPLE } from "@/data/wedding";
import "./globals.css";

export const metadata: Metadata = {
  title: `${COUPLE.groom.name} ♥ ${COUPLE.bride.name} 결혼합니다`,
  description: `${COUPLE.groom.name}과 ${COUPLE.bride.name}의 결혼식에 초대합니다.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
