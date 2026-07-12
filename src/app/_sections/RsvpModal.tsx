"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { apiPost } from "@/lib/api";
import { toast } from "@/lib/toast";
import { useMounted } from "@/hooks/useMounted";

const MIN_COUNT = 1;
const MAX_COUNT = 10;
const CLOSE_DELAY_MS = 900;

export type RsvpAttend = "Y" | "N";
export type RsvpSide = "groom" | "bride";

export type RsvpResult = {
  name: string;
  attend: RsvpAttend;
  count: number;
  side: RsvpSide;
};

type RsvpModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmitted: (result: RsvpResult) => void;
};

export const RsvpModal = ({ open, onClose, onSubmitted }: RsvpModalProps) => {
  const mounted = useMounted();
  const [name, setName] = useState("");
  const [attend, setAttend] = useState<RsvpAttend>("Y");
  const [side, setSide] = useState<RsvpSide>("groom");
  const [count, setCount] = useState(MIN_COUNT);
  const [showThanks, setShowThanks] = useState(false);

  const handleSubmit = async () => {
    const trimmedName = name.trim();
    if (!trimmedName) {
      toast("성함을 입력해주세요");
      return;
    }

    const result: RsvpResult = { name: trimmedName, attend, count, side };
    const payload = { ...result, time: new Date().toISOString() };
    const res = await apiPost("/rsvp", payload);
    if (!res) return;

    setShowThanks(true);
    toast("회답이 전달되었어요");
    onSubmitted(result);

    setTimeout(() => {
      onClose();
      setShowThanks(false);
      setName("");
    }, CLOSE_DELAY_MS);
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
          <div className="modal-title">참석여부 알리기</div>
          <button type="button" className="modal-close" onClick={onClose} aria-label="닫기">
            ✕
          </button>
        </div>

        <div className="field">
          <div className="field-box">
            <label htmlFor="rsvpName">성함</label>
            <span className="essential">*</span>
          </div>
          <input
            type="text"
            id="rsvpName"
            placeholder="이름을 입력해주세요"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="field">
            <label>참석 여부</label>
          <div className="seg">
            {(["Y", 
            "N"
            ] as const).map((value) => (
              <button
                type="button"
                key={value}
                className={attend === value ? "active" : undefined}
                onClick={() => setAttend(value)}
              >
                {value === "Y" ? "참석합니다" : "참석이 어려워요"}
              </button>
            ))}
          </div>
        </div>

        <div className="field">
            <label>참석 인원 (본인 포함)</label>
          <div className="stepper">
            <button
              type="button"
              onClick={() => setCount((prev) => Math.max(MIN_COUNT, prev - 1))}
              aria-label="인원 줄이기"
            >
              −
            </button>
            <span>{count}</span>
            <button
              type="button"
              onClick={() => setCount((prev) => Math.min(MAX_COUNT, prev + 1))}
              aria-label="인원 늘리기"
            >
              +
            </button>
          </div>
        </div>

        <div className="field">
            <label>신랑측 / 신부측</label>
          <div className="seg">
            {(["groom", "bride"] as const).map((value) => (
              <button
                type="button"
                key={value}
                className={side === value ? "active" : undefined}
                onClick={() => setSide(value)}
              >
                {value === "groom" ? "신랑측 하객" : "신부측 하객"}
              </button>
            ))}
          </div>
        </div>

        <button type="button" className="submit-btn" onClick={handleSubmit}>
          저장
        </button>
        <div className={`thanks-msg${showThanks ? " show" : ""}`}>소중한 회답 감사합니다 💗</div>
      </div>
    </div>,
    document.body
  );
};
