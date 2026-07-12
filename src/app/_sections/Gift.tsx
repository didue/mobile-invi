"use client";

import { useState } from "react";
import { COUPLE, GIFTS } from "@/data/family";
import { SECTION_TEXTS } from "@/data/wedding";
import { toast } from "@/lib/toast";
import { ROLE_LABEL } from "@/lib/roleLabel";
import { useReveal } from "@/hooks/useReveal";
import { SectionHeading } from "@/components/common/SectionHeading";

type GiftEntry = { name: string; role: string; tag: string; account: string };

function CopyIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="9" y="9" width="11" height="11" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function KakaoIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 3C6.48 3 2 6.58 2 11c0 2.9 1.94 5.44 4.86 6.87-.2.75-.73 2.73-.84 3.15-.13.52.19.51.4.37.17-.11 2.7-1.83 3.8-2.58.58.08 1.18.13 1.78.13 5.52 0 10-3.58 10-8 0-4.42-4.48-8-10-8z" />
    </svg>
  );
}

async function copyAccount(entry: GiftEntry) {
  try {
    await navigator.clipboard.writeText(`${entry.account} (${entry.name})`);
    toast(`${entry.name}님의 계좌번호가 복사되었어요`);
  } catch {
    toast("복사에 실패했어요");
  }
}

async function shareAccount(entry: GiftEntry) {
  const text = `[${COUPLE.groom.name} ♥ ${COUPLE.bride.name} 결혼합니다]\n마음 전하실 곳 - ${entry.name}\n${entry.account}`;

  if (navigator.share) {
    try {
      await navigator.share({ title: "마음 전하실 곳", text });
    } catch {
      // 공유 취소 시 아무 동작 안 함
    }
    return;
  }

  try {
    await navigator.clipboard.writeText(text);
    toast("카카오톡에 붙여넣을 내용이 복사됐어요");
  } catch {
    toast("복사에 실패했어요");
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
        <span className="chev">⌄</span>
      </button>
      <div className="acc-body">
        <div className="contact-group">
          {entries.map((entry) => (
            <div className="contact-row" key={entry.name}>
              <div className="who">
                {ROLE_LABEL[entry.role] ?? entry.role} {entry.name}
                <span className="tag">{entry.account}</span>
              </div>
              <div className="contact-btns">
                <button
                  type="button"
                  className="icon-btn copy"
                  onClick={() => copyAccount(entry)}
                  aria-label="계좌 복사"
                >
                  <CopyIcon />
                </button>
                <button
                  type="button"
                  className="icon-btn kakao"
                  onClick={() => shareAccount(entry)}
                  aria-label="카카오로 보내기"
                >
                  <KakaoIcon />
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
    <section ref={sectionRef} className="reveal">
      <SectionHeading {...SECTION_TEXTS.gift} />

      <GiftGroup
        id="accGroom"
        title="신랑측 계좌번호"
        entries={GIFTS.groom}
        open={openGroups.groom}
        onToggle={() => setOpenGroups((prev) => ({ ...prev, groom: !prev.groom }))}
      />
      <GiftGroup
        id="accBride"
        title="신부측 계좌번호"
        entries={GIFTS.bride}
        open={openGroups.bride}
        onToggle={() => setOpenGroups((prev) => ({ ...prev, bride: !prev.bride }))}
      />
    </section>
  );
};
