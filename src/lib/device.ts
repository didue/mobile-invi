// iPadOS 13+는 데스크톱 Safari UA를 쓰므로 터치 지원 여부로 함께 판별한다.
export function isMobileDevice(): boolean {
  return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || (/Macintosh/.test(navigator.userAgent) && navigator.maxTouchPoints > 1);
}
