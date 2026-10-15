"use client";

import { useEffect, useState } from "react";
import { SECTION_TEXTS } from "@/data/wedding";
import { apiDelete, apiGet } from "@/lib/api";
import { toast } from "@/lib/toast";
import { useReveal } from "@/hooks/useReveal";
import { GuestbookModal } from "@/app/_sections/GuestbookModal";
import { SectionHeading } from "@/components/common/SectionHeading";
import type { GuestbookEntry } from "@/types/guestbook";

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

// 최신순 정렬은 GAS(Code.gs listGuestbook_)가 시트에서 읽을 때 수행한다.
async function loadGuestbook(): Promise<GuestbookEntry[]> {
  return (await apiGet<GuestbookEntry[]>("/guestbook")) ?? [];
}

function DeleteVerifyForm({
  deleting,
  onCancel,
  onConfirm,
}: {
  deleting: boolean;
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
      <button
        type="button"
        className="confirm"
        disabled={deleting}
        onClick={() => onConfirm(name.trim(), contact.trim())}
      >
        {deleting ? "삭제 중..." : "확인"}
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
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [modalOpen, setModalOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    loadGuestbook().then((loaded) => {
      setEntries(loaded);
      setLoading(false);
    });
  }, []);

  const handleConfirmDelete = async (entry: GuestbookEntry, name: string, contact: string) => {
    if (deleting) return;
    if (!name || !contact) {
      toast("이름과 연락처를 입력해주세요");
      return;
    }

    setDeleting(true);
    const status = await apiDelete(`/guestbook/${entry.id}`, { name, contact });
    setDeleting(false);

    if (status === 403) {
      toast("이름과 연락처가 일치하지 않아요");
      return;
    }
    if (status !== 200 && status !== 404) {
      toast("삭제에 실패했어요. 다시 시도해주세요.");
      return;
    }
    setDeletingId(null);
    toast(status === 200 ? "메시지가 삭제되었어요" : "이미 삭제된 메시지예요");
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
        {loading ? (
          <div className="gb-empty">축하 메시지를 불러오고 있어요</div>
        ) : entries.length === 0 ? (
          <div className="gb-empty">첫 번째 축하 메시지를 남겨주세요 🤍</div>
        ) : (
          visibleEntries.map((entry) => (
            <div className="gb-item" key={entry.id}>
              <div className="gb-top">
                <span className="gb-name">{entry.name}</span>
                <span className="gb-meta">
                  <span className="gb-time">{formatTime(entry.timestamp)}</span>
                  <button
                    type="button"
                    className="gb-delete"
                    onClick={() => setDeletingId(entry.id === deletingId ? null : entry.id)}
                  >
                    삭제
                  </button>
                </span>
              </div>
              <div className="gb-msg">{entry.message}</div>
              {deletingId === entry.id && (
                <DeleteVerifyForm
                  deleting={deleting}
                  onCancel={() => setDeletingId(null)}
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
