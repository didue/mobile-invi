// 클라이언트 모달과 서버 Route Handler 의 입력 검증이 같은 선택지를 쓰도록 한 곳에서 관리한다.
export const RSVP_ATTENDS = ["참석", "불참"] as const;
export const RSVP_SIDES = ["신랑측", "신부측"] as const;
export const RSVP_MEALS = ["식사 예정", "식사 안 함"] as const;

export const RSVP_MIN_COUNT = 1;
export const RSVP_MAX_COUNT = 10;

export type RsvpAttend = (typeof RSVP_ATTENDS)[number];
export type RsvpSide = (typeof RSVP_SIDES)[number];
export type RsvpMeal = (typeof RSVP_MEALS)[number];

export interface RsvpPayload {
  side: RsvpSide;
  name: string;
  attend: RsvpAttend;
  count: number;
  meal: RsvpMeal;
}
