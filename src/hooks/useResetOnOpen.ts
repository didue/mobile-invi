"use client";

import { useState } from "react";

// 모달이 닫힌 상태에서 열린 상태로 바뀌는 렌더에서 reset 을 한 번 호출한다.
// 닫는 경로(✕·오버레이·제출 성공)가 여러 개라 닫을 때보다 열 때 비우는 편이 누락이 없다.
// useEffect 로 처리하면 지난 입력값이 한 프레임 보였다가 지워지므로 렌더 중에 상태를 맞춘다.
export function useResetOnOpen(open: boolean, reset: () => void): void {
  const [prevOpen, setPrevOpen] = useState(open);
  if (open !== prevOpen) {
    setPrevOpen(open);
    if (open) reset();
  }
}
