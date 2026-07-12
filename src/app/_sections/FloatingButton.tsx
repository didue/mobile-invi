"use client";

import { copyShareLink } from "@/lib/kakao";
import { useScrollPastHeader } from "@/hooks/useScrollPastHeader";

function TopIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 19V5" />
      <path d="M5 12l7-7 7 7" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <path d="M8.59 13.51l6.83 3.98" />
      <path d="M15.41 6.51l-6.82 3.98" />
    </svg>
  );
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export const FloatingButton = () => {
  const visible = useScrollPastHeader();

  return (
    <div className="floating-btns">
      <button
        type="button"
        className={`fab-btn${visible ? " show" : ""}`}
        onClick={scrollToTop}
        aria-label="맨 위로 이동"
      >
        <TopIcon />
      </button>
      <button
        type="button"
        className={`fab-btn${visible ? " show" : ""}`}
        onClick={copyShareLink}
        aria-label="링크 공유하기"
      >
        <ShareIcon />
      </button>
    </div>
  );
};
