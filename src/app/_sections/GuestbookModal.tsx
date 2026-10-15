"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { apiPost } from "@/lib/api";
import { toast } from "@/lib/toast";
import { fireConfetti } from "@/lib/confetti";
import { useModalBackgroundLock } from "@/hooks/useModalBackgroundLock";
import { useMounted } from "@/hooks/useMounted";
import { useResetOnOpen } from "@/hooks/useResetOnOpen";
import { LoadingOverlay } from "@/components/common/LoadingOverlay";
import {
  GUESTBOOK_CONTACT_MAX_LENGTH,
  GUESTBOOK_MESSAGE_MAX_LENGTH,
  GUESTBOOK_NAME_MAX_LENGTH,
  type GuestbookEntry,
  type GuestbookPayload,
} from "@/types/guestbook";

const GUESTBOOK_CONFETTI_EMOJI_SIZE = 60;

type GuestbookModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmitted: () => void;
};

export const GuestbookModal = ({ open, onClose, onSubmitted }: GuestbookModalProps) => {
  const mounted = useMounted();
  useModalBackgroundLock(open);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useResetOnOpen(open, () => {
    setName("");
    setContact("");
    setMessage("");
  });

  const handleSubmit = async () => {
    if (submitting) return;
    const payload: GuestbookPayload = {
      name: name.trim(),
      contact: contact.trim(),
      message: message.trim(),
    };
    if (!payload.name || !payload.contact || !payload.message) {
      toast("이름과 연락처, 메시지를 모두 입력해주세요");
      return;
    }

    // GAS 가 시트에 쓰는 데 1~2초 걸려 그 사이 중복 탭으로 같은 메시지가 여러 줄 쌓이지 않도록 막는다.
    setSubmitting(true);
    const res = await apiPost<GuestbookEntry>("/guestbook", payload);
    setSubmitting(false);
    if (!res) return;

    toast("메시지가 등록되었어요💌");
    onSubmitted();
    onClose();
    fireConfetti(GUESTBOOK_CONFETTI_EMOJI_SIZE);
  };

  if (!mounted) return null;

  return createPortal(
    <div
      className={`modal-overlay${open ? " show" : ""}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* 로딩 dimm 은 클릭만 막으므로 키보드(Tab/Enter)로 시트를 조작하지 못하게 inert 로 함께 잠근다. */}
      <div className="modal-sheet" inert={submitting}>
        <div className="modal-head">
          <div className="modal-title">축하 메시지 남기기</div>
          <button type="button" className="modal-close" onClick={onClose} aria-label="닫기">
            ✕
          </button>
        </div>

        <div className="field">
          <div className="field-box">
            <label htmlFor="gbmName">성함</label>
            <span className="essential">*</span>
          </div>
          <input
            type="text"
            id="gbmName"
            placeholder="이름을 입력해주세요"
            maxLength={GUESTBOOK_NAME_MAX_LENGTH}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="field">
          <div className="field-box">
            <label htmlFor="gbmContact">연락처 뒷자리</label>
            <span className="essential">*</span>
          </div>
          <input
            type="text"
            id="gbmContact"
            placeholder="동명이인 확인을 위해 연락처 뒷자리를 입력해주세요"
            maxLength={GUESTBOOK_CONTACT_MAX_LENGTH}
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
        </div>
        <div className="field">
          <div className="field-box">
            <label htmlFor="gbmMsg">축하 메시지</label>
            <span className="essential">*</span>
          </div>
          <textarea
            id="gbmMsg"
            placeholder="두 사람에게 전하고 싶은 말을 남겨주세요!"
            maxLength={GUESTBOOK_MESSAGE_MAX_LENGTH}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <button type="button" className="submit-btn" onClick={handleSubmit} disabled={submitting}>
          {submitting ? "전송 중..." : "저장"}
        </button>
      </div>
      <LoadingOverlay show={submitting} message="축하 메시지를<br/> 등록하고 있어요🕊️" />
    </div>,
    document.body
  );
};
