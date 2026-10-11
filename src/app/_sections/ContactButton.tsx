"use client";

import { useState } from "react";
import { ContactModal } from "@/app/_sections/ContactModal";

// Intro는 서버 컴포넌트로 유지하고, 모달 열림 상태가 필요한 버튼만 클라이언트 컴포넌트로 분리한다.
export const ContactButton = () => {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <>
      <div className="rsvp-trigger-wrap mt-6">
        <button type="button" className="rsvp-open-btn shadow-btn" onClick={() => setContactOpen(true)}>
          혼주에게 연락하기
        </button>
      </div>

      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
};
