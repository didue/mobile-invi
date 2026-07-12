"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { CONTACTS } from "@/data/family";
import { ROLE_LABEL } from "@/lib/roleLabel";
import { useMounted } from "@/hooks/useMounted";

type ContactSide = "groom" | "bride";

type ContactModalProps = {
  open: boolean;
  onClose: () => void;
};

function ContactList({ contacts }: { contacts: (typeof CONTACTS)["groom"] }) {
  return (
    <div className="contact-group">
      {contacts.map((contact) => (
        <div className="contact-row" key={contact.name}>
          <div className="who">
            {ROLE_LABEL[contact.role] ?? contact.role} {contact.name}
            {/* <span className="tag">{contact.tag}</span> */}
          </div>
          <div className="contact-btns">
            <a className="contact-btn" href={`tel:${contact.tel}`}>
              전화하기
            </a>
            <a className="contact-btn fill" href={`sms:${contact.tel}`}>
              문자하기
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}

export const ContactModal = ({ open, onClose }: ContactModalProps) => {
  const mounted = useMounted();
  const [side, setSide] = useState<ContactSide>("groom");

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
          <div className="modal-title">연락하기</div>
          <button type="button" className="modal-close" onClick={onClose} aria-label="닫기">
            ✕
          </button>
        </div>

        <div className="tab-bar">
          {(["groom", "bride"] as const).map((value) => (
            <button
              type="button"
              key={value}
              className={`tab-btn${side === value ? " active" : ""}`}
              onClick={() => setSide(value)}
            >
              {value === "groom" ? "신랑측" : "신부측"}
            </button>
          ))}
        </div>

        <div className={`tab-panel${side === "groom" ? " active" : ""}`}>
          <ContactList contacts={CONTACTS.groom} />
        </div>
        <div className={`tab-panel${side === "bride" ? " active" : ""}`}>
          <ContactList contacts={CONTACTS.bride} />
        </div>
      </div>
    </div>,
    document.body
  );
};
