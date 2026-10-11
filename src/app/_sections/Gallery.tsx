"use client";

import { useEffect, useRef, useState } from "react";
import type { TouchEvent } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { GALLERY, SECTION_TEXTS } from "@/data/wedding";
import { useReveal } from "@/hooks/useReveal";
import { useModalBackgroundLock } from "@/hooks/useModalBackgroundLock";
import { useMounted } from "@/hooks/useMounted";
import { SectionHeading } from "@/components/common/SectionHeading";

// 첫 로드 전송량을 줄이기 위해 3x3 격자 9장만 렌더링하고, 나머지는 더보기로 6장씩 추가한다.
const INITIAL_COUNT = 9;
const LOAD_MORE_COUNT = 6;
const SWIPE_THRESHOLD_PX = 50;
const ARROW_ICON = "/assets/icon/anchor_icon_white.png";
const MORE_ICON = "/assets/icon/anchor_icon_gray.png";
// 라이트박스에서 핀치 확대를 임시로 허용한다. false로 되돌리면 기존 확대 방지(viewport 고정 + touch-action:none)가 다시 적용된다.
const LIGHTBOX_ZOOM_ENABLED = true;
const ZOOMABLE_VIEWPORT = "width=device-width, initial-scale=1";

// 전역 viewport는 layout.tsx에서 확대를 막아 두었으므로, 라이트박스가 열려 있는 동안만 확대 가능한 값으로 바꿨다가 닫히면 되돌린다.
function useZoomableViewport(active: boolean) {
  useEffect(() => {
    if (!active) return;
    const meta = document.querySelector<HTMLMetaElement>('meta[name="viewport"]');
    if (!meta) return;

    const original = meta.content;
    meta.content = ZOOMABLE_VIEWPORT;
    return () => {
      meta.content = original;
    };
  }, [active]);
}

export const Gallery = () => {
  const sectionRef = useReveal<HTMLElement>();
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const touchStartX = useRef(0);
  const multiTouched = useRef(false);

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const mounted = useMounted();
  useModalBackgroundLock(lightboxIndex !== null);
  useZoomableViewport(LIGHTBOX_ZOOM_ENABLED && lightboxIndex !== null);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const stepLightbox = (direction: 1 | -1) => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + direction + GALLERY.length) % GALLERY.length);
  };

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    multiTouched.current = e.touches.length > 1;
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    // 핀치 중이거나 확대된 사진을 끌어 보는 중에는 사진 넘김으로 오인하지 않는다.
    if (e.touches.length > 0 || multiTouched.current || (window.visualViewport?.scale ?? 1) > 1) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (deltaX > SWIPE_THRESHOLD_PX) stepLightbox(-1);
    else if (deltaX < -SWIPE_THRESHOLD_PX) stepLightbox(1);
  };

  return (
    <section ref={sectionRef} className="reveal">
      <SectionHeading {...SECTION_TEXTS.gallery} />

      <div className="gallery-grid">
        {GALLERY.slice(0, visibleCount).map((photo, index) => (
          <button
            type="button"
            className="g-slot"
            key={photo.thumb}
            onClick={() => openLightbox(index)}
            aria-label={`사진 ${index + 1} 크게 보기`}
          >
            <Image src={photo.thumb} alt="" fill sizes="(max-width: 480px) 33vw, 160px" />
          </button>
        ))}
      </div>
      {visibleCount < GALLERY.length && (
        <button
          type="button"
          className="gallery-more"
          onClick={() => setVisibleCount((count) => count + LOAD_MORE_COUNT)}
        >
          더보기
          <Image src={MORE_ICON} alt="" width={12} height={12} />
        </button>
      )}

      {mounted &&
        createPortal(
          <div
            className={`lightbox-overlay${lightboxIndex !== null ? " show" : ""}`}
            onClick={(e) => {
              if (e.target === e.currentTarget) closeLightbox();
            }}
          >
            <button type="button" className="lightbox-close" onClick={closeLightbox} aria-label="닫기">
              ✕
            </button>
            <div
              className={`lightbox-stage${LIGHTBOX_ZOOM_ENABLED ? " zoomable" : ""}`}
              onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
              <button
                type="button"
                className="lightbox-arrow left"
                onClick={() => stepLightbox(-1)}
                aria-label="이전 사진"
              >
                <Image src={ARROW_ICON} alt="" width={18} height={18} />
              </button>
              {lightboxIndex !== null && (
                <Image
                  src={GALLERY[lightboxIndex].full}
                  alt="사진 상세보기"
                  width={900}
                  height={1350}
                  sizes="88vw"
                />
              )}
              <button
                type="button"
                className="lightbox-arrow right"
                onClick={() => stepLightbox(1)}
                aria-label="다음 사진"
              >
                <Image src={ARROW_ICON} alt="" width={18} height={18} />
              </button>
            </div>
            <div className="lightbox-count">
              {lightboxIndex !== null ? `${lightboxIndex + 1} / ${GALLERY.length}` : ""}
            </div>
          </div>,
          document.body
        )}
    </section>
  );
};
