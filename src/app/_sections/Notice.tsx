"use client";

import { useState } from "react";
import Image from "next/image";
import { NOTICES, SECTION_TEXTS } from "@/data/wedding";
import { useReveal } from "@/hooks/useReveal";
import { SectionHeading } from "@/components/common/SectionHeading";

export const Notice = () => {
  const sectionRef = useReveal<HTMLElement>();
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section ref={sectionRef} className="reveal" id="noticeSection">
      <SectionHeading {...SECTION_TEXTS.notice} />

      <div className="tab-bar">
        {NOTICES.map((notice, index) => (
          <button
            type="button"
            key={notice.title}
            className={`tab-btn${index === activeIndex ? " active" : ""}`}
            onClick={() => setActiveIndex(index)}
          >
            {notice.title}
          </button>
        ))}
      </div>

      {NOTICES.map((notice, index) => (
        <div className={`tab-panel${index === activeIndex ? " active" : ""}`} key={notice.title}>
          <div className="notice-image">
            {notice.image ? (
              <Image src={notice.image} alt="" fill sizes="(max-width: 480px) 100vw, 416px" />
            ) : (
              <div className="notice-image-empty">이미지 준비 중</div>
            )}
          </div>
          {notice.items ? (
            <ol className="notice-list">
              {notice.items.map((item, itemIndex) => (
                <li key={item}>
                  <span className="num">{String(itemIndex + 1).padStart(2, "0")}</span>
                  <p dangerouslySetInnerHTML={{__html:item}}/>
                </li>
              ))}
            </ol>
          ) : (
            <div className="tab-empty">추후 업데이트 될 예정입니다.</div>
          )}
        </div>
      ))}
    </section>
  );
};
