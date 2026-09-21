"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useModalBackgroundLock } from "@/hooks/useModalBackgroundLock";

const INTRO_VIDEO = "/intro/envelope.mp4";
const INTRO_POSTER = "/intro/envelope.webp";

// 봉투가 완전히 열리는 시점(초). 영상 길이는 9.33초지만 뒷부분은 정지 화면이라
// 리본이 풀리고 봉투가 열린 직후에 페이드아웃해서 대기 시간을 줄인다.
const FADE_AT_SEC = 5.3;
// .intro-overlay 의 opacity transition(0.9s)이 끝난 뒤 DOM 에서 제거한다.
const REMOVE_DELAY_MS = 900;

export const IntroOverlay = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hide, setHide] = useState(false);
  const [removed, setRemoved] = useState(false);

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
