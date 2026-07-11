"use client";

import { useRef, useState } from "react";
import type { TouchEvent } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { GALLERY } from "@/data/wedding";
import { useReveal } from "@/hooks/useReveal";
import { useMounted } from "@/hooks/useMounted";
import { useCarousel } from "@/hooks/useCarousel";

const PER_PAGE = 4;
const PAGE_COUNT = Math.ceil(GALLERY.length / PER_PAGE);
const SWIPE_THRESHOLD_PX = 50;

export const Gallery = () => {
  const sectionRef = useReveal<HTMLElement>();
  const { carouselRef, activePage, scrollByPage, handleScroll } = useCarousel();
  const touchStartX = useRef(0);

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const mounted = useMounted();

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const stepLightbox = (direction: 1 | -1) => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + direction + GALLERY.length) % GALLERY.length);
  };

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (deltaX > SWIPE_THRESHOLD_PX) stepLightbox(-1);
    else if (deltaX < -SWIPE_THRESHOLD_PX) stepLightbox(1);
  };

  return (
    <section ref={sectionRef} className="reveal">
      <div className="section-title">Gallery</div>
      <div className="section-sub">두 사람의 순간들</div>

      <div className="gallery-wrap">
        <button
          type="button"
          className="gallery-arrow left"
          onClick={() => scrollByPage(-1)}
          aria-label="이전 페이지"
        >
          ‹
        </button>
        <div className="gallery-carousel" ref={carouselRef} onScroll={handleScroll}>
          {Array.from({ length: PAGE_COUNT }, (_, page) => (
            <div className="gallery-page" key={page}>
              {GALLERY.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE).map((photo, j) => {
                const index = page * PER_PAGE + j;
                return (
                  <button
                    type="button"
                    className="g-slot"
                    key={photo}
                    onClick={() => openLightbox(index)}
                    aria-label={`사진 ${index + 1} 크게 보기`}
                  >
                    <Image src={photo} alt="" fill sizes="(max-width: 480px) 50vw, 240px" />
                  </button>
                );
              })}
            </div>
          ))}
        </div>
        <button
          type="button"
          className="gallery-arrow right"
          onClick={() => scrollByPage(1)}
          aria-label="다음 페이지"
        >
          ›
        </button>
      </div>

      <div className="gallery-dots">
        {Array.from({ length: PAGE_COUNT }, (_, page) => (
          <span key={page} className={page === activePage ? "active" : undefined} />
        ))}
      </div>
      <div className="gallery-note">사진을 눌러 크게 보기 · 옆으로 슬라이드해서 더 보기</div>

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
            <div className="lightbox-stage" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
              <button
                type="button"
                className="lightbox-arrow left"
                onClick={() => stepLightbox(-1)}
                aria-label="이전 사진"
              >
                ‹
              </button>
              {lightboxIndex !== null && (
                <Image
                  src={GALLERY[lightboxIndex]}
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
                ›
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
