"use client";

import { useSyncExternalStore } from "react";
import { WEDDING_DATE } from "@/data/wedding";

export type DdayCell = { n: string; l: string };

const SERVER_SNAPSHOT: DdayCell[] = [
  { n: "--", l: "일" },
  { n: "--", l: "시간" },
  { n: "--", l: "분" },
  { n: "--", l: "초" },
];

function computeDdayCells(): DdayCell[] {
  const diff = WEDDING_DATE.getTime() - Date.now();

  if (diff <= 0) {
    return [{ n: "💐", l: "WEDDING DAY" }];
  }

  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);

  return [
    { n: String(d), l: "일" },
    { n: String(h).padStart(2, "0"), l: "시간" },
    { n: String(m).padStart(2, "0"), l: "분" },
    { n: String(s).padStart(2, "0"), l: "초" },
  ];
}

let lastComputedAtSecond = -1;
let cachedCells: DdayCell[] = SERVER_SNAPSHOT;

function getSnapshot(): DdayCell[] {
  const currentSecond = Math.floor(Date.now() / 1000);
  if (currentSecond !== lastComputedAtSecond) {
    lastComputedAtSecond = currentSecond;
    cachedCells = computeDdayCells();
  }
  return cachedCells;
}

function getServerSnapshot(): DdayCell[] {
  return SERVER_SNAPSHOT;
}

function subscribe(callback: () => void) {
  callback();
  const timer = setInterval(callback, 1000);
  return () => clearInterval(timer);
}

export function useDdayCells(): DdayCell[] {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
