"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { storeSet } from "@/lib/storage";
import { toast } from "@/lib/toast";
import { fireConfetti } from "@/lib/confetti";
import { useMounted } from "@/hooks/useMounted";

const GUESTBOOK_CONFETTI_EMOJI_SIZE = 60;

type GuestbookModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmitted: () => void;
};

export const GuestbookModal = ({ open, onClose, onSubmitted }: GuestbookModalProps) => {
  const mounted = useMounted();
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    const trimmedName = name.trim();
    const trimmedContact = contact.trim();
    const trimmedMessage = message.trim();
    if (!trimmedName || !trimmedContact || !trimmedMessage) {
      toast("이름과 연락처, 메시지를 모두 입력해주세요");
      return;
    }

    const payload = JSON.stringify({
      name: trimmedName,
      contact: trimmedContact,
      msg: trimmedMessage,
      time: new Date().toISOString(),
    });
    const res = await storeSet(`guestbook:${Date.now()}`, payload, true);
    if (!res) return;

    setName("");
    setContact("");
    setMessage("");
    toast("메시지가 등록되었어요");
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
      <div className="modal-sheet">
        <div className="modal-head">
          <div className="modal-title">축하 메시지 남기기</div>
          <button type="button" className="modal-close" onClick={onClose} aria-label="닫기">
            ✕
          </button>
        </div>

        <div className="field">
          <label htmlFor="gbmName">성함</label>
          <input
            type="text"
            id="gbmName"
            placeholder="이름을 입력해주세요"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="gbmContact">연락처 뒷자리</label>
          <input
            type="text"
            id="gbmContact"
            placeholder="동명이인 확인을 위해 연락처 뒷자리를 입력해주세요"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="gbmMsg">축하 메시지</label>
          <textarea
            id="gbmMsg"
            placeholder="두 사람에게 전하고 싶은 말을 남겨주세요"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <button type="button" className="submit-btn" onClick={handleSubmit}>
          메시지 남기기
        </button>
      </div>
    </div>,
    document.body
  );
};
