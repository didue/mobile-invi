import type {
  GuestbookDeletePayload,
  GuestbookDeleteResult,
  GuestbookEntry,
  GuestbookPayload,
} from "@/types/guestbook";
import type { RsvpPayload } from "@/types/rsvp";

interface GasResponse {
  ok: boolean;
  result?: unknown;
  error?: string;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isGasResponse(value: unknown): value is GasResponse {
  return isRecord(value) && typeof value.ok === "boolean";
}

function isGuestbookEntry(value: unknown): value is GuestbookEntry {
  return (
    isRecord(value) &&
    typeof value.id === "string" &&
    typeof value.name === "string" &&
    typeof value.message === "string" &&
    typeof value.timestamp === "string"
  );
}

function getEndpoint(): string {
  const endpoint = process.env.GAS_ENDPOINT_URL;
  if (!endpoint) {
    throw new Error("GAS_ENDPOINT_URL 환경변수가 설정되지 않았습니다");
  }
  return endpoint;
}

// GAS 는 처리 실패도 HTTP 200 + { ok:false } 로 돌려주므로 본문의 ok 로 성공 여부를 판단한다.
async function readGasResult(res: Response): Promise<unknown> {
  if (!res.ok) {
    throw new Error(`GAS 요청 실패 (${res.status})`);
  }

  const body: unknown = await res.json();
  if (!isGasResponse(body) || !body.ok) {
    throw new Error(`GAS 처리 실패: ${isGasResponse(body) ? body.error : "응답 형식 오류"}`);
  }
  return body.result;
}

// /exec 는 POST 에 302 로 응답하고 결과를 리다이렉트된 GET 에서 돌려주므로 fetch 기본값(redirect: follow)에 맡긴다.
async function postToGas(body: Record<string, unknown>): Promise<unknown> {
  const res = await fetch(getEndpoint(), {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(body),
    cache: "no-store",
  });
  return readGasResult(res);
}

// 시트의 '제출시각' 칸은 사람이 바로 읽는 값이라 GAS 기본값(handleRsvp_)과 같은 한국 시각 문자열로 맞춘다.
function formatSubmittedAt(date: Date): string {
  return date.toLocaleString("ko-KR", { timeZone: "Asia/Seoul" });
}

// GAS 웹앱(src/lib/Code.gs)의 doPost 로 RSVP 한 줄을 추가한다.
export async function appendRsvpRow(payload: RsvpPayload): Promise<void> {
  await postToGas({ timestamp: formatSubmittedAt(new Date()), ...payload });
}

// '방명록' 시트를 GAS 가 등록시각 최신순으로 정렬해 돌려준다.
export async function listGuestbookEntries(): Promise<GuestbookEntry[]> {
  const url = new URL(getEndpoint());
  url.searchParams.set("action", "guestbook_list");
  const res = await fetch(url, { cache: "no-store" });
  const result = await readGasResult(res);

  if (!isRecord(result) || !Array.isArray(result.entries)) {
    throw new Error("GAS 처리 실패: 방명록 응답 형식 오류");
  }
  return result.entries.filter(isGuestbookEntry);
}

// 등록시각은 클라이언트 시계 대신 서버 시각을 쓰고, GAS 가 Date 로 저장해 시트에서 정렬 가능한 값이 되도록 ISO 로 보낸다.
export async function appendGuestbookRow(payload: GuestbookPayload): Promise<GuestbookEntry> {
  const entry: GuestbookEntry = {
    id: crypto.randomUUID(),
    name: payload.name,
    message: payload.message,
    timestamp: new Date().toISOString(),
  };
  await postToGas({ action: "guestbook_add", ...entry, contact: payload.contact });
  return entry;
}

// 본인 확인(성함·연락처 뒷자리 일치)은 연락처를 클라이언트에 내려주지 않기 위해 GAS 에서 수행한다.
export async function deleteGuestbookRow(
  id: string,
  payload: GuestbookDeletePayload
): Promise<GuestbookDeleteResult> {
  const result = await postToGas({ action: "guestbook_delete", id, ...payload });
  if (!isRecord(result)) {
    throw new Error("GAS 처리 실패: 방명록 삭제 응답 형식 오류");
  }
  if (result.deleted === true) return "deleted";
  return result.reason === "mismatch" ? "mismatch" : "not_found";
}
