"use client";

import Image from "next/image";
import { useState } from "react";
import { CONTACTS } from "@/data/family";
import { SECTION_TEXTS } from "@/data/wedding";
import { toast } from "@/lib/toast";
import { ROLE_LABEL } from "@/lib/roleLabel";
import { useReveal } from "@/hooks/useReveal";
import { SectionHeading } from "@/components/common/SectionHeading";

const CHEVRON_ICON = "/assets/icon/anchor_icon_gray.png";

type GiftEntry = { name: string; role: string; tag: string; account: string; bank: string; };

function CopyIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="9" y="9" width="11" height="11" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

async function copyAccount(entry: GiftEntry) {
  try {
    // 은행 앱 계좌 입력란에 바로 붙여넣을 수 있도록 하이픈을 제거한다.
    await navigator.clipboard.writeText(entry.account.replace(/-/g, ""));
    toast(`${entry.name}님의 계좌번호가 복사되었어요☺️`);
  } catch {
    toast("복사에 실패했어요 😣");
  }
}

function GiftGroup({
  id,
  title,
  entries,
  open,
  onToggle,
}: {
  id: string;
  title: string;
  entries: GiftEntry[];
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className={`acc-group${open ? " open" : ""}`} id={id}>
      <button type="button" className="acc-head" onClick={onToggle} aria-expanded={open}>
        <span>{title}</span>
        <span className="chev">
          <Image src={CHEVRON_ICON} alt="" width={12} height={12} />
        </span>
      </button>
      <div className="acc-body">
        <div className="contact-group">
          {entries.map((entry) => (
            <div className="contact-row" key={entry.name}>
              <div className="who">
                {ROLE_LABEL[entry.role] ?? entry.role} {entry.name}
                <span className="tag">{entry.bank}  {entry.account}</span>
              </div>
              <div className="contact-btns">
                <button
                  type="button"
                  className="contact-btn copy-btn"
                  onClick={() => copyAccount(entry)}
                >
                  <CopyIcon />
                  복사하기
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export const Gift = () => {
  const sectionRef = useReveal<HTMLElement>();
  const [openGroups, setOpenGroups] = useState({ groom: false, bride: false });

  return (
    <section ref={sectionRef} className="reveal gift-section">
      <SectionHeading {...SECTION_TEXTS.gift} />

      <GiftGroup
        id="accGroom"
        title="신랑측 계좌번호"
        entries={CONTACTS.groom}
        open={openGroups.groom}
        onToggle={() => setOpenGroups((prev) => ({ ...prev, groom: !prev.groom }))}
      />
      <GiftGroup
        id="accBride"
        title="신부측 계좌번호"
        entries={CONTACTS.bride}
        open={openGroups.bride}
        onToggle={() => setOpenGroups((prev) => ({ ...prev, bride: !prev.bride }))}
      />
    </section>
  );
};
