// 사이트 전체 색 테마 전환 지점.
// ACTIVE_THEME 값만 바꾸면 전체 팔레트가 바뀐다(색 정의는 globals.css 의 [data-theme] 블록 참조).

export const THEMES = ["sage", "classic"] as const;
export type Theme = (typeof THEMES)[number];

/**
 * 현재 적용 테마.
 * - "sage"    : 내추럴 세이지 그린
 * - "classic" : 아이보리·브라운 (원래 테마)
 */
export const ACTIVE_THEME: Theme = "sage";
