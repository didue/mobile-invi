import type { RsvpPayload } from "@/types/rsvp";

interface GasResponse {
  ok: boolean;
  error?: string;
}

function isGasResponse(value: unknown): value is GasResponse {
  return typeof value === "object" && value !== null && typeof (value as { ok?: unknown }).ok === "boolean";
}

// 시트의 '제출시각' 칸은 사람이 바로 읽는 값이라 GAS 기본값(handleRsvp_)과 같은 한국 시각 문자열로 맞춘다.
function formatSubmittedAt(date: Date): string {
  return date.toLocaleString("ko-KR", { timeZone: "Asia/Seoul" });
}

// GAS 웹앱(src/lib/Code.gs)의 doPost 로 RSVP 한 줄을 추가한다.
// /exec 는 POST 에 302 로 응답하고 결과를 리다이렉트된 GET 에서 돌려주므로 fetch 기본값(redirect: follow)에 맡긴다.
// GAS 는 처리 실패도 HTTP 200 + { ok:false } 로 돌려주므로 본문의 ok 로 성공 여부를 판단한다.
export async function appendRsvpRow(payload: RsvpPayload): Promise<void> {
  const endpoint = process.env.GAS_ENDPOINT_URL;
  if (!endpoint) {
    throw new Error("GAS_ENDPOINT_URL 환경변수가 설정되지 않았습니다");
  }

  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({ timestamp: formatSubmittedAt(new Date()), ...payload }),
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`GAS 요청 실패 (${res.status})`);
  }

  const body: unknown = await res.json();
  if (!isGasResponse(body) || !body.ok) {
    throw new Error(`GAS 처리 실패: ${isGasResponse(body) ? body.error : "응답 형식 오류"}`);
  }
}
