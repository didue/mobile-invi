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
            네이버지도
          </a>
          <a
            className="map-btn shadow-btn"
            href={MAPS.kakao.link()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`카카오맵에서 ${VENUE_ADDRESS} 보기`}
          >
            카카오맵
          </a>
          <a
            className="map-btn shadow-btn"
            href={MAPS.tmap.link()}
            target="_blank"
            rel="noopener noreferrer"
          >
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
