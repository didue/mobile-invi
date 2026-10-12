"use client";

import Script from "next/script";
import { useRef } from "react";
import type { MouseEvent } from "react";
import { MAPS, SECTION_TEXTS, VENUE_ADDRESS, WEDDING_VENUE } from "@/data/wedding";
import { useReveal } from "@/hooks/useReveal";
import { toast } from "@/lib/toast";
import { SectionHeading } from "@/components/common/SectionHeading";

// iPadOS 13+는 데스크톱 Safari UA를 쓰므로 터치 지원 여부로 함께 판별한다.
function isMobileDevice(): boolean {
  return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || (/Macintosh/.test(navigator.userAgent) && navigator.maxTouchPoints > 1);
}

// tmap:// 스킴은 PC 브라우저에 처리기가 없어 열리지 않으므로 이동을 막고 안내한다.
const handleTmapClick = (e: MouseEvent<HTMLAnchorElement>) => {
  if (isMobileDevice()) return;
  e.preventDefault();
  toast("티맵 길찾기는 모바일에서 이용할 수 있어요");
};

const TRANSIT_GROUPS: { label: string; items: string[] }[] = [
  { label: "🚆 지하철", items: WEDDING_VENUE.station.metro },
  { label: "🚌 버스", items: WEDDING_VENUE.station.bus },
  { label: "🚗 자가용 및 주차 안내", items: WEDDING_VENUE.station.car },
];

interface MapSectionProps {
  // NEXT_PUBLIC_ 접두사가 없는 환경변수는 클라이언트 번들에 들어가지 않으므로 서버 컴포넌트(page.tsx)에서 읽어 전달받는다.
  naverMapClientId?: string;
}

function PhoneIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

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

export const MapSection = ({ naverMapClientId }: MapSectionProps) => {
  const sectionRef = useReveal<HTMLElement>();
  const mapElRef = useRef<HTMLDivElement>(null);

  const initNaverMap = () => {
    const el = mapElRef.current;
    if (!el || !window.naver) return;

    const center = new window.naver.maps.LatLng(WEDDING_VENUE.coords.lat, WEDDING_VENUE.coords.lng);
    const map = new window.naver.maps.Map(el, { center, zoom: 16, draggable: false });
    new window.naver.maps.Marker({ position: center, map });
  };

  return (
    <section ref={sectionRef} className="reveal" id="mapSection">
      <SectionHeading {...SECTION_TEXTS.mapSection} />
      <div className="info-card">
        <div className="info-place">
          {WEDDING_VENUE.name}
          <a className="info-tel" href={`tel:${WEDDING_VENUE.tel.replace(/-/g, "")}`} aria-label={`${WEDDING_VENUE.name} 전화하기`}>
            <PhoneIcon />
          </a>
        </div>
        <div className="info-floor">{WEDDING_VENUE.floor}</div>
        <div className="info-addr">{WEDDING_VENUE.address}</div>

        <div className="map-illust" id="map" ref={mapElRef} />
        {naverMapClientId && (
          <Script
            src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${naverMapClientId}`}
            strategy="afterInteractive"
            onReady={initNaverMap}
          />
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
            onClick={handleTmapClick}
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
