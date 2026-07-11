"use client";

import { NOTICES } from "@/data/wedding";
import { useReveal } from "@/hooks/useReveal";
import { useCarousel } from "@/hooks/useCarousel";

export const Notice = () => {
  const sectionRef = useReveal<HTMLElement>();
  const { carouselRef, activePage, scrollByPage, handleScroll } = useCarousel();

  return (
    <section ref={sectionRef} className="reveal" id="noticeSection">
      <div className="section-title">안내사항</div>
      <div className="section-sub">참고해주세요</div>

      <div className="notice-carousel-wrap">
        <button
          type="button"
          className="gallery-arrow left"
          onClick={() => scrollByPage(-1)}
          aria-label="이전 안내"
        >
          ‹
        </button>
        <div className="notice-carousel" ref={carouselRef} onScroll={handleScroll}>
          {NOTICES.map((notice) => (
            <div className="notice-slide" key={notice.title}>
              <div className="notice-slide-title">{notice.title}</div>
              {notice.items ? (
                <ol className="notice-list">
                  {notice.items.map((item, index) => (
                    <li key={item}>
                      <span className="num">{String(index + 1).padStart(2, "0")}</span>
                      <p>{item}</p>
                    </li>
                  ))}
                </ol>
              ) : (
                <div className="tab-empty">{notice.empty}</div>
              )}
            </div>
          ))}
        </div>
        <button
          type="button"
          className="gallery-arrow right"
          onClick={() => scrollByPage(1)}
          aria-label="다음 안내"
        >
          ›
        </button>
      </div>

      <div className="gallery-dots">
        {NOTICES.map((notice, index) => (
          <span key={notice.title} className={index === activePage ? "active" : undefined} />
        ))}
      </div>
    </section>
  );
};
