"use client";

import { useReveal } from "@/hooks/useReveal";
import { useDdayCells } from "@/hooks/useDdayCells";

type CalendarCell = { day: number; muted?: boolean; highlight?: boolean };

const CALENDAR_ROWS: CalendarCell[][] = [
  [{ day: 27, muted: true }, { day: 28, muted: true }, { day: 29, muted: true }, { day: 30, muted: true }, { day: 31, muted: true }, { day: 1 }, { day: 2 }],
  [{ day: 3 }, { day: 4 }, { day: 5 }, { day: 6 }, { day: 7 }, { day: 8 }, { day: 9, highlight: true }],
  [{ day: 10 }, { day: 11 }, { day: 12 }, { day: 13 }, { day: 14 }, { day: 15 }, { day: 16 }],
  [{ day: 17 }, { day: 18 }, { day: 19 }, { day: 20 }, { day: 21 }, { day: 22 }, { day: 23 }],
  [{ day: 24 }, { day: 25 }, { day: 26 }, { day: 27 }, { day: 28 }, { day: 29 }, { day: 30 }],
  [{ day: 31 }, { day: 1, muted: true }, { day: 2, muted: true }, { day: 3, muted: true }, { day: 4, muted: true }, { day: 5, muted: true }, { day: 6, muted: true }],
];

const DOW = ["일", "월", "화", "수", "목", "금", "토"];

export const WeddingDay = () => {
  const sectionRef = useReveal<HTMLElement>();
  const cells = useDdayCells();

  return (
    <section ref={sectionRef} className="reveal">
      <div className="section-title">Wedding Day</div>
      <div className="section-sub">함께해 주실 그 날</div>
      <div className="dday-box">
        {cells.map((cell) => (
          <div className="dday-cell" key={cell.l}>
            <div className="dday-num">{cell.n}</div>
            <div className="dday-label">{cell.l}</div>
          </div>
        ))}
      </div>

      <div className="calendar">
        <div className="cal-title">2027 · JANUARY</div>
        <div className="cal-grid">
          {DOW.map((label, i) => (
            <div className={`cal-dow${i === 0 ? " sun" : ""}`} key={label}>
              {label}
            </div>
          ))}
          {CALENDAR_ROWS.flatMap((row, rowIndex) =>
            row.map((cell, colIndex) => {
              const className = [
                "cal-day",
                colIndex === 0 ? "sun" : "",
                cell.muted ? "muted" : "",
                cell.highlight ? "highlight" : "",
              ]
                .filter(Boolean)
                .join(" ");

              return (
                <div className={className} key={`${rowIndex}-${colIndex}`}>
                  <span>{cell.day}</span>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};
