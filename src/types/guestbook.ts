// 클라이언트 모달과 서버 Route Handler 의 입력 검증이 같은 한도를 쓰도록 한 곳에서 관리한다.
export const GUESTBOOK_NAME_MAX_LENGTH = 50;
export const GUESTBOOK_CONTACT_MAX_LENGTH = 20;
export const GUESTBOOK_MESSAGE_MAX_LENGTH = 500;

// 목록 응답에는 삭제 본인 확인용 연락처를 포함하지 않는다(다른 방문자에게 노출되지 않도록).
export interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  timestamp: string;
}

export interface GuestbookPayload {
  name: string;
  contact: string;
  message: string;
}

export interface GuestbookDeletePayload {
  name: string;
  contact: string;
}

export type GuestbookDeleteResult = "deleted" | "mismatch" | "not_found";
