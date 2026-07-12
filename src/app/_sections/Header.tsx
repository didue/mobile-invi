"use client";

import { useMemo, type CSSProperties } from "react";
import Image from "next/image";
import { COUPLE, WEDDING_DATE } from "@/data/wedding";
import heroPhoto from "@/assets/images/hero.jpg";
import { useMounted } from "@/hooks/useMounted";

const SNOWFLAKE_COUNT = 24;

type Snowflake = {
  left: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
};

function createSnowflakes(count: number): Snowflake[] {
  return Array.from({ length: count }, () => ({
    left: Math.random() * 100,
    size: 9 + Math.random() * 9,
    duration: 7 + Math.random() * 7,
    delay: Math.random() * 10,
    drift: Math.round(Math.random() * 50 - 25),
  }));
}

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
  const mounted = useMounted();
  const snowflakes = useMemo(() => (mounted ? createSnowflakes(SNOWFLAKE_COUNT) : []), [mounted]);

  return (
    <section className="hero">
      <div className="hero-bg" />
      <div className="eyebrow">Wedding Invitation</div>

      <div className="hero-arch">
        <Image
          src={heroPhoto}
          alt={`${COUPLE.groom.name} · ${COUPLE.bride.name}`}
          fill
          sizes="(max-width: 480px) 80vw, 384px"
          priority
        />
        <div className="snow-layer">
          {snowflakes.map((flake, index) => (
            <div
              key={index}
              className="snowflake"
              style={
                {
                  left: `${flake.left}%`,
                  fontSize: `${flake.size}px`,
                  animationDuration: `${flake.duration}s`,
                  animationDelay: `-${flake.delay}s`,
                  "--drift": `${flake.drift}px`,
                } as CSSProperties
              }
            >
              ❄
            </div>
          ))}
        </div>
      </div>

      <div className="names" style={{ marginTop: 26 }}>
        <div className="kr">{COUPLE.groom.name}</div>
        <div className="amp">&amp;</div>
        <div className="kr">{COUPLE.bride.name}</div>
      </div>
      <div className="hero-date">
        <b>{heroDate.datePart}</b> {heroDate.restPart}
      </div>
    </section>
  );
};
