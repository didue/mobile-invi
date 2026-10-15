import { NextRequest, NextResponse } from "next/server";
import { appendRsvpRow } from "@/lib/gas";
import {
  RSVP_ATTENDS,
  RSVP_MAX_COUNT,
  RSVP_MEALS,
  RSVP_MIN_COUNT,
  RSVP_SIDES,
  type RsvpPayload,
} from "@/types/rsvp";

const NAME_MAX_LENGTH = 50;

function isOneOf<T extends string>(options: readonly T[], value: unknown): value is T {
  return typeof value === "string" && (options as readonly string[]).includes(value);
}

function parseRsvpPayload(body: unknown): RsvpPayload | null {
  if (typeof body !== "object" || body === null || Array.isArray(body)) return null;
  const { side, name, attend, count, meal } = body as Record<string, unknown>;

  if (typeof name !== "string") return null;
  const trimmedName = name.trim();
  if (!trimmedName || trimmedName.length > NAME_MAX_LENGTH) return null;

  if (!isOneOf(RSVP_SIDES, side) || !isOneOf(RSVP_ATTENDS, attend) || !isOneOf(RSVP_MEALS, meal)) {
    return null;
  }
  if (
    typeof count !== "number" ||
    !Number.isInteger(count) ||
    count < RSVP_MIN_COUNT ||
    count > RSVP_MAX_COUNT
  ) {
    return null;
  }

  return { side, name: trimmedName, attend, count, meal };
}

export async function POST(request: NextRequest) {
  const body: unknown = await request.json().catch(() => null);
  const payload = parseRsvpPayload(body);
  if (!payload) {
    return NextResponse.json({ error: "요청 본문이 올바르지 않습니다" }, { status: 400 });
  }

  try {
    await appendRsvpRow(payload);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "참석 의사를 저장하지 못했습니다" }, { status: 502 });
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
