"use client";

import { useState } from "react";
import { useReveal } from "@/hooks/useReveal";
import { RsvpModal, type RsvpResult } from "@/app/_sections/RsvpModal";

export const Rsvp = () => {
  const sectionRef = useReveal<HTMLElement>();
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<RsvpResult | null>(null);

  return (
    <section ref={sectionRef} className="reveal">
      <div className="section-title">RSVP</div>
      <div className="section-sub">참석 여부를 알려주세요</div>
      <div className="rsvp-trigger-wrap">
        <button type="button" className="rsvp-open-btn" onClick={() => setOpen(true)}>
          참석여부 알리기
        </button>
        {status && (
          <div className="rsvp-status">
            <b>{status.name}</b>님, 회답이 전달되었어요 ({status.attend} · {status.count}명)
          </div>
        )}
      </div>

      <RsvpModal open={open} onClose={() => setOpen(false)} onSubmitted={setStatus} />
    </section>
  );
};
