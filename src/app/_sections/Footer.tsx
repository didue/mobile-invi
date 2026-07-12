"use client";

import { fireConfetti } from "@/lib/confetti";

const FOOTER_CONFETTI_EMOJI_SIZE = 70;

export const Footer = () => {
  const handleConfetti = () => {
    fireConfetti(FOOTER_CONFETTI_EMOJI_SIZE);
  };

  return (
    <footer className="flex flex-col items-center gap-4 bg-neutral-100 px-8 py-16 text-center text-neutral-700">
      <p>
        항상 저희를 지켜봐주시고 지원해주신 부모님과 가족,
        <br />
        그리고 응원과 축하의 마음을 전해주신 모든 분들께
        <br />
        진심으로 감사드립니다.
        <br />
        항상 건강하시고 행복하세요.
      </p>
      <button
        type="button"
        onClick={handleConfetti}
        className="rounded-full bg-neutral-800 px-6 py-2 text-sm text-white"
      >
        축하해주세요
      </button>
    </footer>
  );
};
