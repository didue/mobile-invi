"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { GALLERY } from "@/data/wedding";

// react.md §5.1: 인트로 배경은 HJ2_7118.jpg 고정 — 현재 GALLERY[0]과 동일한 파일이다.
const INTRO_BG_PHOTO = GALLERY[0];

const WRITE_DELAY_MS = 350;
const HIDE_DELAY_MS = WRITE_DELAY_MS + 1500 + 2000;
const REMOVE_DELAY_MS = HIDE_DELAY_MS + 900;

export const IntroOverlay = () => {
  const [write, setWrite] = useState(false);
  const [hide, setHide] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    const writeTimer = setTimeout(() => setWrite(true), WRITE_DELAY_MS);
    const hideTimer = setTimeout(() => setHide(true), HIDE_DELAY_MS);
    const removeTimer = setTimeout(() => setRemoved(true), REMOVE_DELAY_MS);

    return () => {
      clearTimeout(writeTimer);
      clearTimeout(hideTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (removed) return null;

  return (
    <div className={`intro-overlay${hide ? " hide" : ""}`}>
      <div className="intro-bg">
        <Image src={INTRO_BG_PHOTO} alt="" fill sizes="480px" priority style={{ objectFit: "cover" }} />
      </div>
      <div className="intro-dim" />
      <div className={`intro-text${write ? " write" : ""}`}>
        we are
        <br />
        getting married
      </div>
    </div>
  );
};
