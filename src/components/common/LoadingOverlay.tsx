"use client";

import { createPortal } from "react-dom";
import { useMounted } from "@/hooks/useMounted";

interface LoadingOverlayProps {
  show: boolean;
  message: string;
}

// 모달 위에 덮이는 dimm 이 클릭을 모두 받아 처리 중 다른 액션을 막는다.
// 모달 시트에 transform 애니메이션이 있어 그 안의 fixed 요소가 시트 기준으로 잡히므로 body 로 포털한다.
export const LoadingOverlay = ({ show, message }: LoadingOverlayProps) => {
  const mounted = useMounted();
  if (!mounted || !show) return null;

  return createPortal(
    <div className="loading-overlay" role="status" aria-live="polite">
      <div className="loading-card">
        <p className="loading-text">{message}</p>
        <div className="loading-bar" aria-hidden="true">
          <span />
        </div>
      </div>
    </div>,
    document.body
  );
};
