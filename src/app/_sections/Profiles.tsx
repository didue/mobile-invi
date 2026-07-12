"use client";

import { useState } from "react";
import Image from "next/image";
import { COUPLE, CONTACTS } from "@/data/wedding";
import { formatParentsRel } from "@/lib/family";
import { useReveal } from "@/hooks/useReveal";
import { ContactModal } from "@/app/_sections/ContactModal";

function ProfileColumn({
  photo,
  role,
  name,
  rel,
}: {
  photo: string;
  role: string;
  name: string;
  rel: string;
}) {
  return (
    <div className="profile-col">
      <div className="profile-photo">
        <Image src={photo} alt="" fill sizes="112px" />
      </div>
      <div className="role">{role}</div>
      <div className="name">{name}</div>
      <div className="rel">
        {rel.split("\n").map((line, index) => (
          <span key={line}>
            {index > 0 && <br />}
            {line}
          </span>
        ))}
      </div>
    </div>
  );
}

export const Profiles = () => {
  const sectionRef = useReveal<HTMLElement>();
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <section ref={sectionRef} className="reveal">
      <div className="section-title">신랑 & 신부</div>
      <div className="section-sub">Groom &amp; Bride</div>
      <div className="profile-compact">
        <ProfileColumn
          photo={COUPLE.groom.profile}
          role="GROOM"
          name={COUPLE.groom.name}
          rel={formatParentsRel(CONTACTS.groom, "groom")}
        />
        <ProfileColumn
          photo={COUPLE.bride.profile}
          role="BRIDE"
          name={COUPLE.bride.name}
          rel={formatParentsRel(CONTACTS.bride, "bride")}
        />
      </div>
      <div className="rsvp-trigger-wrap" style={{ marginTop: 56 }}>
        <button type="button" className="rsvp-open-btn" onClick={() => setContactOpen(true)}>
          연락하기
        </button>
      </div>

      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </section>
  );
};
