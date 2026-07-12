"use client";

import { useState } from "react";
import Image from "next/image";
import { COUPLE, CONTACTS, SECTION_TEXTS } from "@/data/wedding";
import { formatParentsRel } from "@/lib/family";
import { useReveal } from "@/hooks/useReveal";
import { ContactModal } from "@/app/_sections/ContactModal";
import { SectionHeading } from "@/components/common/SectionHeading";

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
          <span key={line}>{line}{' '}</span>
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
      <SectionHeading {...SECTION_TEXTS.profiles} />
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
      <div className="rsvp-trigger-wrap" style={{ marginTop: 25 }}>
        <button type="button" className="rsvp-open-btn shadow-btn" onClick={() => setContactOpen(true)}>
          혼주에게 연락하기
        </button>
      </div>

      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </section>
  );
};
