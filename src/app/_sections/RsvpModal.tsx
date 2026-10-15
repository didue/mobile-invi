"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { apiPost } from "@/lib/api";
import { toast } from "@/lib/toast";
import { useModalBackgroundLock } from "@/hooks/useModalBackgroundLock";
import { useMounted } from "@/hooks/useMounted";
import { LoadingOverlay } from "@/components/common/LoadingOverlay";
import {
  RSVP_MAX_COUNT,
  RSVP_MESSAGE_MAX_LENGTH,
  RSVP_MIN_COUNT,
  type RsvpAttend,
  type RsvpMeal,
  type RsvpPayload,
  type RsvpSide,
} from "@/types/rsvp";

const CLOSE_DELAY_MS = 900;

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
  useModalBackgroundLock(open);
  const [name, setName] = useState("");
  const [attend, setAttend] = useState<RsvpAttend>("참석");
  const [side, setSide] = useState<RsvpSide>("신랑측");
  const [count, setCount] = useState(RSVP_MIN_COUNT);
  const [meal, setMeal] = useState<RsvpMeal>("식사 예정");
  const [message, setMessage] = useState("");
  const [showThanks, setShowThanks] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async () => {
    if (submitting) return;
    const trimmedName = name.trim();
    if (!trimmedName) {
      toast("성함을 입력해주세요");
      return;
    }

    const result: RsvpResult = { name: trimmedName, attend, count, side };
    const payload: RsvpPayload = { ...result, meal, message: message.trim() };
    // GAS 가 시트에 쓰는 데 1~2초 걸려 그 사이 중복 탭으로 같은 회답이 여러 줄 쌓이지 않도록 막는다.
    setSubmitting(true);
    setSaving(true);
    const res = await apiPost("/rsvp", payload);
    setSaving(false);
    if (!res) {
      setSubmitting(false);
      return;
    }

    setShowThanks(true);
    toast("참석 의사가 전달되었어요💌");
    onSubmitted(result);

    setTimeout(() => {
      onClose();
      setShowThanks(false);
      setName("");
      setMessage("");
      setSubmitting(false);
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
      {/* 로딩 dimm 은 클릭만 막으므로 키보드(Tab/Enter)로 시트를 조작하지 못하게 inert 로 함께 잠근다. */}
      <div className="modal-sheet" inert={saving}>
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
            {(["참석", "불참"] as const).map((value) => (
              <button
                type="button"
                key={value}
                className={attend === value ? "active" : undefined}
                onClick={() => setAttend(value)}
              >
                {value === "참석" ? "참석합니다" : "참석이 어려워요"}
              </button>
            ))}
          </div>
        </div>

        <div className="field">
            <label>참석 인원 (본인 포함)</label>
          <div className="stepper">
            <button
              type="button"
              onClick={() => setCount((prev) => Math.max(RSVP_MIN_COUNT, prev - 1))}
              aria-label="인원 줄이기"
            >
              −
            </button>
            <span>{count}</span>
            <button
              type="button"
              onClick={() => setCount((prev) => Math.min(RSVP_MAX_COUNT, prev + 1))}
              aria-label="인원 늘리기"
            >
              +
            </button>
          </div>
        </div>

        <div className="field">
            <label>신랑측 / 신부측</label>
          <div className="seg">
            {(["신랑측", "신부측"] as const).map((value) => (
              <button
                type="button"
                key={value}
                className={side === value ? "active" : undefined}
                onClick={() => setSide(value)}
              >
                {value === "신랑측" ? "신랑측 하객" : "신부측 하객"}
              </button>
            ))}
          </div>
        </div>

        <div className="field">
            <label>식사 여부</label>
          <div className="seg">
            {(["식사 예정", "식사 안 함"] as const).map((value) => (
              <button
                type="button"
                key={value}
                className={meal === value ? "active" : undefined}
                onClick={() => setMeal(value)}
              >
                {value === "식사 예정" ? "식사합니다" : "식사하지 않아요"}
              </button>
            ))}
          </div>
        </div>

        <div className="field">
          <label htmlFor="rsvpMessage">전하실 말씀 (선택)</label>
          <textarea
            id="rsvpMessage"
            placeholder="두 사람에게 전하고 싶은 말이 있다면 남겨주세요"
            maxLength={RSVP_MESSAGE_MAX_LENGTH}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        <button type="button" className="submit-btn" onClick={handleSubmit} disabled={submitting}>
          {submitting ? "전송 중..." : "저장"}
        </button>
        <div className={`thanks-msg${showThanks ? " show" : ""}`}>소중한 회답 감사합니다 💗</div>
      </div>
      <LoadingOverlay show={saving} message="참석 의사를 전달하고 있어요" />
    </div>,
    document.body
  );
};
