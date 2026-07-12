"use client";

import { useEffect, useState } from "react";
import { SECTION_TEXTS } from "@/data/wedding";
import { storeDelete, storeGet, storeList } from "@/lib/storage";
import { toast } from "@/lib/toast";
import { useReveal } from "@/hooks/useReveal";
import { GuestbookModal } from "@/app/_sections/GuestbookModal";
import { SectionHeading } from "@/components/common/SectionHeading";

type GuestbookEntry = {
  key: string;
  name: string;
  contact: string;
  msg: string;
  time: string;
};

const PAGE_SIZE = 5;

function formatTime(iso: string): string {
  const date = new Date(iso);
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const hh = String(date.getHours()).padStart(2, "0");
  const mi = String(date.getMinutes()).padStart(2, "0");
  return `${yyyy}.${mm}.${dd} ${hh}:${mi}`;
}

async function loadGuestbook(): Promise<GuestbookEntry[]> {
  const keys = await storeList("guestbook:");
  const entries = await Promise.all(
    keys.map(async (key) => {
      const raw = await storeGet(key, true);
      if (!raw) return null;
      try {
        return { key, ...JSON.parse(raw) } as GuestbookEntry;
      } catch {
        return null;
      }
    })
  );

  return entries
    .filter((entry): entry is GuestbookEntry => entry !== null)
    .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
}

function DeleteVerifyForm({
  onCancel,
  onConfirm,
}: {
  onCancel: () => void;
  onConfirm: (name: string, contact: string) => void;
}) {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");

  return (
    <div className="gb-delete-form">
      <input
        type="text"
        placeholder="성함"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="연락처 뒷자리"
        value={contact}
        onChange={(e) => setContact(e.target.value)}
      />
      <button type="button" className="confirm" onClick={() => onConfirm(name.trim(), contact.trim())}>
        확인
      </button>
      <button type="button" className="cancle" onClick={onCancel}>
        취소
      </button>
    </div>
  );
}

export const Guestbook = () => {
  const sectionRef = useReveal<HTMLElement>();
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [modalOpen, setModalOpen] = useState(false);
  const [deletingKey, setDeletingKey] = useState<string | null>(null);

  useEffect(() => {
    loadGuestbook().then(setEntries);
  }, []);

  const handleConfirmDelete = async (entry: GuestbookEntry, name: string, contact: string) => {
    if (name !== entry.name || contact !== entry.contact) {
      toast("이름과 연락처가 일치하지 않아요");
      return;
    }
    const ok = await storeDelete(entry.key);
    if (!ok) return;
    setDeletingKey(null);
    toast("메시지가 삭제되었어요");
    setEntries(await loadGuestbook());
  };

  const visibleEntries = entries.slice(0, visibleCount);
  const hasMore = visibleCount < entries.length;

  return (
    <section ref={sectionRef} className="reveal" id="guestbookSection">
      <SectionHeading {...SECTION_TEXTS.guestbook} />

      <div className="rsvp-trigger-wrap">
        <button type="button" className="rsvp-open-btn" onClick={() => setModalOpen(true)}>
          축하 메시지 남기기
        </button>
      </div>

      <div className="gb-list">
        {entries.length === 0 ? (
          <div className="gb-empty">첫 번째 축하 메시지를 남겨주세요 🤍</div>
        ) : (
          visibleEntries.map((entry) => (
            <div className="gb-item" key={entry.key}>
              <div className="gb-top">
                <span className="gb-name">{entry.name}</span>
                <span className="gb-meta">
                  <span className="gb-time">{formatTime(entry.time)}</span>
                  <button
                    type="button"
                    className="gb-delete"
                    onClick={() => setDeletingKey(entry.key === deletingKey ? null : entry.key)}
                  >
                    삭제
                  </button>
                </span>
              </div>
              <div className="gb-msg">{entry.msg}</div>
              {deletingKey === entry.key && (
                <DeleteVerifyForm
                  onCancel={() => setDeletingKey(null)}
                  onConfirm={(name, contact) => handleConfirmDelete(entry, name, contact)}
                />
              )}
            </div>
          ))
        )}
      </div>

      {hasMore && (
        <button
          type="button"
          className="gb-load-more"
          onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
        >
          더보기
        </button>
      )}

      <GuestbookModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmitted={async () => setEntries(await loadGuestbook())}
      />
    </section>
  );
};
