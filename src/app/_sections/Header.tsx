"use client";

// 예식 시각을 getHours() 로 포맷하므로 빌드 서버(UTC) 시간대가 아닌 방문자 브라우저 시간대로 렌더링되도록 클라이언트 컴포넌트로 둔다.
import Image from "next/image";
import { COUPLE } from "@/data/family";
import { WEDDING_DATE, WEDDING_VENUE } from "@/data/wedding";
import heroPhoto from "@/assets/images/hero.jpg";

function formatHeroDate(date: Date): { datePart: string; restPart: string } {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const dow = new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(date).toUpperCase();
  const hour24 = date.getHours();
  const ampm = hour24 < 12 ? "오전" : "오후";
  const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
  const minute = date.getMinutes();
  return {
    datePart: `${year}. ${month}. ${day}.`,
    restPart: `${dow} · ${ampm} ${hour12}시 ${minute}분`,
  };
}

const heroDate = formatHeroDate(WEDDING_DATE);

export const Header = () => {
  return (
    <section className="hero">
      <div className="hero-bg" />

      <div className="hero-top">WE&apos;RE GETTING MARRIED</div>
      <div className="hero-frame">
        <div className="hero-side">SAVE THE DATE</div>
        <div className="hero-arch">
          <Image
            src={heroPhoto}
            alt={`${COUPLE.groom.firstName} · ${COUPLE.bride.firstName}`}
            fill
            sizes="(max-width: 480px) 85vw, 408px"
            priority
          />
        </div>
        <div className="names hero-side">
          <div className="kr">{COUPLE.groom.firstName.toUpperCase()}</div>
          <div className="amp">&amp;</div>
          <div className="kr">{COUPLE.bride.firstName.toUpperCase()}</div>
        </div>
      </div>
      <div className="hero-date">
        <b>{heroDate.datePart}</b> {heroDate.restPart}
      </div>
      <div className="hero-venue">
        {WEDDING_VENUE.name} {WEDDING_VENUE.floor}
      </div>
    </section>
  );
};
