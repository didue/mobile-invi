"use client";

import { useRef, useState } from "react";

export function useCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activePage, setActivePage] = useState(0);

  const scrollByPage = (direction: 1 | -1) => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    carousel.scrollBy({ left: direction * carousel.clientWidth, behavior: "smooth" });
  };

  const handleScroll = () => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    setActivePage(Math.round(carousel.scrollLeft / carousel.clientWidth));
  };

  return { carouselRef, activePage, scrollByPage, handleScroll };
}
