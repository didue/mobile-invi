"use client";

import { useState } from "react";
import { SECTION_TEXTS } from "@/data/wedding";
import { useReveal } from "@/hooks/useReveal";
import { RsvpModal, type RsvpResult } from "@/app/_sections/RsvpModal";
import { SectionHeading } from "@/components/common/SectionHeading";

export const Rsvp = () => {
  const sectionRef = useReveal<HTMLElement>();
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<RsvpResult | null>(null);

  return (
    <section ref={sectionRef} className="reveal">
      <SectionHeading {...SECTION_TEXTS.rsvp} />
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
