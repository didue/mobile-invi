import { COUPLE, WEDDING_DATE, WEDDING_VENUE } from "@/data/wedding";

const EVENT_DURATION_MS = 2 * 60 * 60 * 1000;

function formatIcsDate(date: Date): string {
  return `${date.toISOString().replace(/[-:]/g, "").split(".")[0]}Z`;
}

function escapeIcsText(text: string): string {
  return text.replace(/([,;])/g, "\\$1");
}

export function downloadWeddingCalendarEvent() {
  const start = WEDDING_DATE;
  const end = new Date(WEDDING_DATE.getTime() + EVENT_DURATION_MS);
  const title = `${COUPLE.groom.name}·${COUPLE.bride.name} 결혼식`;

  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//wedding-invitation//KO",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    "UID:wedding-ceremony-20270109@wedding-invitation",
    `DTSTAMP:${formatIcsDate(new Date())}`,
    `DTSTART:${formatIcsDate(start)}`,
    `DTEND:${formatIcsDate(end)}`,
    `SUMMARY:${escapeIcsText(title)}`,
    `LOCATION:${escapeIcsText(WEDDING_VENUE.floor)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "wedding.ics";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
