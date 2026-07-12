"use client";

import Script from "next/script";
import { useRef } from "react";
import { MAPS, SECTION_TEXTS, VENUE_ADDRESS, WEDDING_DATE, WEDDING_VENUE } from "@/data/wedding";
import { formatWeddingDate } from "@/lib/date";
import { useReveal } from "@/hooks/useReveal";
import { SectionHeading } from "@/components/common/SectionHeading";

const TRANSIT_GROUPS: { label: string; items: string[] }[] = [
  { label: "🚆 지하철", items: WEDDING_VENUE.station.metro },
  { label: "🚌 버스", items: WEDDING_VENUE.station.bus },
  { label: "🚗 자가용", items: WEDDING_VENUE.station.car },
  { label: "🅿️ 주차", items: WEDDING_VENUE.station.parking },
];

const NAVER_MAP_CLIENT_ID = process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID;
const NAVER_MAP_SDK_SRC = NAVER_MAP_CLIENT_ID
  ? `https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${NAVER_MAP_CLIENT_ID}`
  : "";

function NaverMapIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      <rect width="24" height="24" rx="6" fill="#03c75a" />
      <path d="M14.2 6.5v6.2L9.8 6.5H6.5v11h3.3v-6.2l4.4 6.2h3.3v-11z" fill="#fff" />
    </svg>
  );
}

function KakaoMapIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      <rect width="24" height="24" rx="6" fill="#fee500" />
      <path
        d="M12 5.5c-3.87 0-7 2.5-7 5.6 0 1.98 1.29 3.72 3.24 4.72-.14.53-.52 1.94-.6 2.24-.09.36.13.36.28.26.12-.08 1.92-1.3 2.7-1.83.44.06.85.09 1.38.09 3.87 0 7-2.5 7-5.48s-3.13-5.6-7-5.6z"
        fill="#3a1d1d"
      />
    </svg>
  );
}

function TmapIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      <rect width="24" height="24" rx="6" fill="#1e2a5a" />
      <path d="M6.5 8h11v2.4h-4.15V18h-2.7v-7.6H6.5z" fill="#fff" />
    </svg>
  );
}

function formatWeddingTime(date: Date): string {
  const hour = date.getHours();
  const minute = date.getMinutes();
  return `낮 ${hour}시 ${minute}분 (하객 입장 ${hour}시부터)`;
}

export const MapSection = () => {
  const sectionRef = useReveal<HTMLElement>();
  const mapElRef = useRef<HTMLDivElement>(null);

  const initNaverMap = () => {
    const el = mapElRef.current;
    if (!el || !window.naver) return;

    const center = new window.naver.maps.LatLng(WEDDING_VENUE.coords.lat, WEDDING_VENUE.coords.lng);
    const map = new window.naver.maps.Map(el, { center, zoom: 16 });
    new window.naver.maps.Marker({ position: center, map });
  };

  return (
    <section ref={sectionRef} className="reveal" id="mapSection">
      <SectionHeading {...SECTION_TEXTS.mapSection} />
      <div className="info-card">
        <div className="info-place">{WEDDING_VENUE.floor}</div>
        <div className="info-addr">{WEDDING_VENUE.address}</div>

        <div className="map-illust" id="map" ref={mapElRef} />
        {NAVER_MAP_SDK_SRC && (
          <Script src={NAVER_MAP_SDK_SRC} strategy="afterInteractive" onReady={initNaverMap} />
        )}

        <div className="map-btns">
          <a
            className="map-btn shadow-btn"
            href={MAPS.naver.link()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`네이버지도에서 ${VENUE_ADDRESS} 보기`}
          >
            <NaverMapIcon />
            네이버지도
          </a>
          <a
            className="map-btn shadow-btn"
            href={MAPS.kakao.link()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`카카오맵에서 ${VENUE_ADDRESS} 보기`}
          >
            <KakaoMapIcon />
            카카오맵
          </a>
          <a
            className="map-btn shadow-btn"
            href={MAPS.tmap.link()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`티맵에서 ${VENUE_ADDRESS} 보기`}
          >
            <TmapIcon />
            티맵
          </a>
        </div>

        <div className="transit">
          {TRANSIT_GROUPS.flatMap(({ label, items }) =>
            <div className="transit-item" key={`${label}-item`}> 
              <b>{label}</b>
              {items.map((item, index) => (
                <div key={`${label}-${index}`} className="transit-way">
                  <span dangerouslySetInnerHTML={{__html:item}}/>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
