"use client";

import { MAPS, VENUE_ADDRESS, WEDDING_DATE, WEDDING_VENUE } from "@/data/wedding";
import { formatWeddingDate } from "@/lib/date";
import { useReveal } from "@/hooks/useReveal";

const TRANSIT_GROUPS: { label: string; items: string[] }[] = [
  { label: "지하철", items: WEDDING_VENUE.station.metro },
  { label: "버스", items: WEDDING_VENUE.station.bus },
  { label: "자가용", items: WEDDING_VENUE.station.car },
  { label: "주차", items: WEDDING_VENUE.station.parking },
];

function formatWeddingTime(date: Date): string {
  const hour = date.getHours();
  const minute = date.getMinutes();
  return `낮 ${hour}시 ${minute}분 (하객 입장 ${hour}시부터)`;
}

export const MapSection = () => {
  const sectionRef = useReveal<HTMLElement>();

  return (
    <section ref={sectionRef} className="reveal" id="mapSection">
      <div className="section-title">Location</div>
      <div className="section-sub">오시는 길</div>
      <div className="info-card">
        <div className="info-date">{formatWeddingDate(WEDDING_DATE)}</div>
        <div className="info-time">{formatWeddingTime(WEDDING_DATE)}</div>
        <div className="info-place">{WEDDING_VENUE.floor}</div>
        <div className="info-addr">{WEDDING_VENUE.address}</div>

        <div className="map-illust">
          <svg viewBox="0 0 260 130" width="100%" height="110">
            <rect x="0" y="0" width="260" height="130" rx="14" fill="#FCE8EA" />
            <path
              d="M10,100 C60,60 100,110 150,70 C190,40 220,80 250,50"
              stroke="#FBD3D9"
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
            />
            <circle cx="150" cy="55" r="9" fill="#F59AA5" />
            <path d="M150,55 a9,9 0 1,1 -0.1,0 Z" fill="#F59AA5" />
            <path d="M150,64 L150,80" stroke="#F59AA5" strokeWidth="3" />
          </svg>
        </div>

        <div className="map-btns">
          <a
            className="map-btn"
            href={MAPS.naver.link()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`네이버지도에서 ${VENUE_ADDRESS} 보기`}
          >
            네이버지도
          </a>
          <a
            className="map-btn"
            href={MAPS.kakao.link()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`카카오맵에서 ${VENUE_ADDRESS} 보기`}
          >
            카카오맵
          </a>
          <a
            className="map-btn"
            href={MAPS.tmap.link()}
            target="_blank"
            rel="noopener noreferrer"
          >
            티맵
          </a>
        </div>

        <div className="transit">
          {TRANSIT_GROUPS.flatMap(({ label, items }) =>
            items.map((item, index) => (
              <div key={`${label}-${index}`}>
                <b>{label}</b> — {item}
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};
