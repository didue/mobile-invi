"use client";

import Image from "next/image";
import { COUPLE } from "@/data/family";
import { SECTION_TEXTS } from "@/data/wedding";
import { useReveal } from "@/hooks/useReveal";
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
  rel: string[];
}) {
  return (
    <div className="profile-col">
      <div className="profile-photo">
        <Image src={photo} alt="" fill sizes="112px" />
      </div>
      <div className="role">{role}</div>
      <div className="name">{name}</div>
      <div className="rel">
        {rel.map((line, index) => (
          <p key={index}>{line}{' '}</p>
        ))}
      </div>
    </div>
  );
}

export const Profiles = () => {
  const sectionRef = useReveal<HTMLElement>();

  return (
    <section ref={sectionRef} className="reveal">
      <SectionHeading {...SECTION_TEXTS.profiles} />
      <div className="profile-compact">
        <ProfileColumn
          photo={COUPLE.groom.profile}
          role="GROOM"
          name={COUPLE.groom.name}
          rel={COUPLE.groom.description}
        />
        <ProfileColumn
          photo={COUPLE.bride.profile}
          role="BRIDE"
          name={COUPLE.bride.name}
          rel={COUPLE.bride.description}
        />
      </div>
    </section>
  );
};
