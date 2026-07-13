"use client";

import { useEffect } from "react";

const BACKGROUND_SELECTOR = ".app";

let lockCount = 0;
let savedScrollY = 0;

function lockBackground() {
  lockCount += 1;
  if (lockCount > 1) return;

  savedScrollY = window.scrollY;
  document.querySelector<HTMLElement>(BACKGROUND_SELECTOR)?.setAttribute("inert", "");
  document.body.style.position = "fixed";
  document.body.style.top = `-${savedScrollY}px`;
  document.body.style.width = "100%";
  document.body.style.overflow = "hidden";
}

function unlockBackground() {
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount > 0) return;

  document.querySelector<HTMLElement>(BACKGROUND_SELECTOR)?.removeAttribute("inert");
  document.body.style.position = "";
  document.body.style.top = "";
  document.body.style.width = "";
  document.body.style.overflow = "";
  window.scrollTo(0, savedScrollY);
}

export function useModalBackgroundLock(active: boolean) {
  useEffect(() => {
    if (!active) return;

    lockBackground();
    return unlockBackground;
  }, [active]);
}
