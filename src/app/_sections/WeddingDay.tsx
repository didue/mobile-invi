"use client";

import { COUPLE, SECTION_TEXTS } from "@/data/wedding";
import { useReveal } from "@/hooks/useReveal";
import { useDdayCells } from "@/hooks/useDdayCells";
import { downloadWeddingCalendarEvent } from "@/lib/calendar";
import { SectionHeading } from "@/components/common/SectionHeading";

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

const groomGivenName = COUPLE.groom.name.slice(1);
const brideGivenName = COUPLE.bride.name.slice(1);

export const WeddingDay = () => {
  const sectionRef = useReveal<HTMLElement>();
  const cells = useDdayCells();
  const daysRemaining = cells.find((cell) => cell.l === "일")?.n;

  return (
    <section ref={sectionRef} className="reveal">
      <SectionHeading {...SECTION_TEXTS.weddingDay} />
      <div className="dday-box">
        {cells.flatMap((cell, index) => {
          const items = [
            <div className="dday-cell" key={cell.l}>
              <div className="dday-num">{cell.n}</div>
              <div className="dday-label">{cell.l}</div>
            </div>,
          ];
          if (index < cells.length - 1) {
            items.push(
              <span className="dday-sep" key={`${cell.l}-sep`} aria-hidden="true">
                :
              </span>
            );
          }
          return items;
        })}
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

      {daysRemaining && (
        <>
          <p className="dday-message">
            {daysRemaining === "0" ? (
              "결혼식 날입니다"
            ) : (
              <>
                {groomGivenName}&{brideGivenName}의 결혼식이{" "}
                <span className="dday-highlight">{daysRemaining}일</span> 남았습니다
              </>
            )}
          </p>
          <button type="button" className="dday-calendar-btn shadow-btn" onClick={downloadWeddingCalendarEvent}>
            캘린더에 추가하기
          </button>
        </>
      )}
    </section>
  );
};
