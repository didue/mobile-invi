"use client";

import { useEffect, useState } from "react";

const HEADER_SELECTOR = ".hero";

export function useScrollPastHeader() {
  const [pastHeader, setPastHeader] = useState(false);

  useEffect(() => {
    const header = document.querySelector(HEADER_SELECTOR);
    if (!header) return;

    const observer = new IntersectionObserver(([entry]) => {
      setPastHeader(!entry.isIntersecting);
    });

    observer.observe(header);
    return () => observer.disconnect();
  }, []);

  return pastHeader;
}
