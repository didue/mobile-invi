"use client";

import { fireConfetti } from "@/lib/confetti";
import { copyShareLink, shareToKakao } from "@/lib/kakao";

const FOOTER_CONFETTI_EMOJI_SIZE = 60;

export const Footer = () => {
  const handleConfetti = () => {
    fireConfetti(FOOTER_CONFETTI_EMOJI_SIZE);
  };

  return (
    <footer className="flex flex-col items-center gap-4 bg-neutral-100 px-4 py-16 text-center text-neutral-700">
      <p className="footer-msg">
        저희를 지켜봐주시고
        <br />
        응원과 축하의 마음을 전해주신 모든 분들께
        <br />
        진심으로 감사드립니다.
        <br />
        항상 건강하시고 행복하세요.
      </p>

      {/* 공유하기 버튼 영역 [s] */}
      <div className="share-btn-wrap flex gap-2">
        <button
          type="button"
          onClick={copyShareLink}
          className="rounded-full border border-neutral-300 px-6 py-2 text-sm text-neutral-700"
        >
          링크 복사하기
        </button>
        <button
          type="button"
          onClick={shareToKakao}
          className="rounded-full bg-[#FEE500] px-6 py-2 text-sm font-medium text-[#3A1D1D]"
        >
          카카오톡 공유하기
        </button>
      </div>
    </footer>
  );
};
