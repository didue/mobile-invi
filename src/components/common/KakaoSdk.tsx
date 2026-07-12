"use client";

import Script from "next/script";

const KAKAO_SDK_SRC = "https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js";
const KAKAO_JS_KEY = process.env.NEXT_PUBLIC_KAKAO_JS_KEY;

export const KakaoSdk = () => {
  if (!KAKAO_JS_KEY) return null;
  const jsKey = KAKAO_JS_KEY;

  return (
    <Script
      src={KAKAO_SDK_SRC}
      strategy="afterInteractive"
      onLoad={() => {
        if (!window.Kakao?.isInitialized()) {
          window.Kakao?.init(jsKey);
        }
      }}
    />
  );
};
