"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useModalBackgroundLock } from "@/hooks/useModalBackgroundLock";
import { ACTIVE_THEME, type Theme } from "@/data/theme";

// 인트로 영상은 테마별로 다른 클립을 쓴다(각 클립은 해당 테마 색에 맞춰 보정돼 있다).
// classic=envelope(웜 봉투), sage=organza_ribbon_white(세이지 리본).
const INTRO_ASSETS: Record<Theme, { video: string; poster: string }> = {
  classic: { video: "/intro/envelope.mp4", poster: "/intro/envelope.webp" },
  sage: { video: "/intro/organza_ribbon_white.mp4", poster: "/intro/organza_ribbon_white.webp" },
};
const { video: INTRO_VIDEO, poster: INTRO_POSTER } = INTRO_ASSETS[ACTIVE_THEME];

// 봉투/리본이 완전히 열리는 시점(초). 영상 뒷부분은 정지 화면이라
// 리본이 풀리고 봉투가 열린 직후에 페이드아웃해서 대기 시간을 줄인다.
const FADE_AT_SEC = 5.3;
// .intro-overlay 의 opacity transition(0.9s)이 끝난 뒤 DOM 에서 제거한다.
const REMOVE_DELAY_MS = 900;

export const IntroOverlay = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hide, setHide] = useState(false);
  const [removed, setRemoved] = useState(false);

  // 새로고침해도 이전 스크롤 위치로 복원하지 않고 항상 최상단에서 시작한다.
  // 배경 잠금이 현재 scrollY를 저장했다가 인트로가 끝날 때 되돌리므로, 반드시 잠금 effect보다 먼저 실행되어야 한다.
  useEffect(() => {
    history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);

  useModalBackgroundLock(!removed);

  const close = useCallback(() => setHide(true), []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // iOS 저전력 모드 등에서 autoPlay 속성만으로는 재생이 시작되지 않는다.
    // 실패해도 포스터 위에서 탭/건너뛰기로 넘어갈 수 있으므로 오류는 무시한다.
    void video.play().catch(() => undefined);

    let frame = requestAnimationFrame(function check() {
      if (video.currentTime >= FADE_AT_SEC) {
        setHide(true);
        return;
      }
      frame = requestAnimationFrame(check);
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!hide) return;

    const timer = setTimeout(() => setRemoved(true), REMOVE_DELAY_MS);
    return () => clearTimeout(timer);
  }, [hide]);

  if (removed) return null;

  return (
    <div className={`intro-overlay${hide ? " hide" : ""}`}>
      <button type="button" className="intro-open" aria-label="청첩장 열기" onClick={close}>
        <video
          ref={videoRef}
          className="intro-video"
          src={INTRO_VIDEO}
          poster={INTRO_POSTER}
          muted
          playsInline
          autoPlay
          preload="auto"
          onEnded={close}
          onError={close}
        />
      </button>
      <button type="button" className="intro-skip" onClick={close}>
        건너뛰기
      </button>
    </div>
  );
};
