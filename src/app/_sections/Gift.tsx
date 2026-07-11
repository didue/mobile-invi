"use client";

import { useState } from "react";
import { COUPLE, GIFTS } from "@/data/wedding";
import { toast } from "@/lib/toast";
import { ROLE_LABEL } from "@/lib/roleLabel";
import { useReveal } from "@/hooks/useReveal";

type GiftEntry = { name: string; role: string; tag: string; account: string };

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
                <span className="tag">{entry.tag}</span>
              </div>
              <div className="contact-btns">
                <button type="button" className="contact-btn fill" onClick={() => copyAccount(entry)}>
                  계좌 복사
                </button>
                <button type="button" className="contact-btn kakao" onClick={() => shareAccount(entry)}>
                  카카오로 보내기
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
      <div className="section-title">Gift</div>
      <div className="section-sub">마음 전하실 곳</div>

      <GiftGroup
        id="accGroom"
        title="신랑측"
        entries={GIFTS.groom}
        open={openGroups.groom}
        onToggle={() => setOpenGroups((prev) => ({ ...prev, groom: !prev.groom }))}
      />
      <GiftGroup
        id="accBride"
        title="신부측"
        entries={GIFTS.bride}
        open={openGroups.bride}
        onToggle={() => setOpenGroups((prev) => ({ ...prev, bride: !prev.bride }))}
      />

      <div className="gallery-note">계좌 복사를 누르면 계좌번호가 복사되고, 카카오로 보내기는 공유 시트를 열어요</div>
    </section>
  );
};
