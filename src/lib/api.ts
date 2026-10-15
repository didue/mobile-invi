import { toast } from "@/lib/toast";

const API_BASE = "/api";

export async function apiGet<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${API_BASE}${path}`);
    if (!res.ok) throw new Error(`요청에 실패했어요 (${res.status})`);
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export async function apiPost<T>(path: string, body: unknown): Promise<T | null> {
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`요청에 실패했어요 (${res.status})`);
    return (await res.json()) as T;
  } catch {
    toast("저장에 실패했어요. 다시 시도해주세요.");
    return null;
  }
}

// 호출 측이 본인 확인 실패(403)·이미 삭제됨(404) 등 상태별로 안내 문구를 고를 수 있도록 상태 코드를 그대로 돌려준다.
// 네트워크 오류로 응답 자체를 받지 못하면 null 을 돌려준다.
export async function apiDelete(path: string, body?: unknown): Promise<number | null> {
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      method: "DELETE",
      headers: body === undefined ? undefined : { "Content-Type": "application/json" },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
    return res.status;
  } catch {
    return null;
  }
}
