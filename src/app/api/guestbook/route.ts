import { NextRequest, NextResponse } from "next/server";
import { appendGuestbookRow, listGuestbookEntries } from "@/lib/gas";
import {
  GUESTBOOK_CONTACT_MAX_LENGTH,
  GUESTBOOK_MESSAGE_MAX_LENGTH,
  GUESTBOOK_NAME_MAX_LENGTH,
  type GuestbookPayload,
} from "@/types/guestbook";

function trimWithin(value: unknown, maxLength: number): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed && trimmed.length <= maxLength ? trimmed : null;
}

function parseGuestbookPayload(body: unknown): GuestbookPayload | null {
  if (typeof body !== "object" || body === null || Array.isArray(body)) return null;
  const { name, contact, message } = body as Record<string, unknown>;

  const trimmedName = trimWithin(name, GUESTBOOK_NAME_MAX_LENGTH);
  const trimmedContact = trimWithin(contact, GUESTBOOK_CONTACT_MAX_LENGTH);
  const trimmedMessage = trimWithin(message, GUESTBOOK_MESSAGE_MAX_LENGTH);
  if (!trimmedName || !trimmedContact || !trimmedMessage) return null;

  return { name: trimmedName, contact: trimmedContact, message: trimmedMessage };
}

export async function GET() {
  try {
    return NextResponse.json(await listGuestbookEntries());
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "방명록을 불러오지 못했습니다" }, { status: 502 });
  }
}

export async function POST(request: NextRequest) {
  const body: unknown = await request.json().catch(() => null);
  const payload = parseGuestbookPayload(body);
  if (!payload) {
    return NextResponse.json({ error: "요청 본문이 올바르지 않습니다" }, { status: 400 });
  }

  try {
    return NextResponse.json(await appendGuestbookRow(payload), { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "방명록을 저장하지 못했습니다" }, { status: 502 });
  }
}
