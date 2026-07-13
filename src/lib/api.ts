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

export async function apiDelete(path: string): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}${path}`, { method: "DELETE" });
    if (!res.ok) throw new Error(`요청에 실패했어요 (${res.status})`);
    return true;
  } catch {
    return false;
  }
}
