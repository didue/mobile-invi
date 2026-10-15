import { NextRequest, NextResponse } from "next/server";
import { deleteGuestbookRow } from "@/lib/gas";
import type { GuestbookDeletePayload } from "@/types/guestbook";

type RouteContext = { params: Promise<{ id: string }> };

function parseDeletePayload(body: unknown): GuestbookDeletePayload | null {
  if (typeof body !== "object" || body === null || Array.isArray(body)) return null;
  const { name, contact } = body as Record<string, unknown>;
  if (typeof name !== "string" || typeof contact !== "string") return null;

  const trimmedName = name.trim();
  const trimmedContact = contact.trim();
  if (!trimmedName || !trimmedContact) return null;
  return { name: trimmedName, contact: trimmedContact };
}

export async function DELETE(request: NextRequest, { params }: RouteContext) {
  const { id } = await params;
  const body: unknown = await request.json().catch(() => null);
  const payload = parseDeletePayload(body);
  if (!payload) {
    return NextResponse.json({ error: "요청 본문이 올바르지 않습니다" }, { status: 400 });
  }

  try {
    const result = await deleteGuestbookRow(id, payload);
    if (result === "mismatch") {
      return NextResponse.json({ error: "이름과 연락처가 일치하지 않습니다" }, { status: 403 });
    }
    if (result === "not_found") {
      return NextResponse.json({ error: "해당 항목을 찾을 수 없습니다" }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "방명록을 삭제하지 못했습니다" }, { status: 502 });
  }
}
