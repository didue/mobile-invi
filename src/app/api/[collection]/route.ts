import { NextRequest, NextResponse } from "next/server";
import { dbInsert, dbList, isCollectionName } from "@/lib/db";

const MAX_FIELD_LENGTH = 5000;

type RouteContext = { params: Promise<{ collection: string }> };

function isPlainRecord(body: unknown): body is Record<string, unknown> {
  return typeof body === "object" && body !== null && !Array.isArray(body);
}

function isWithinFieldLimits(record: Record<string, unknown>): boolean {
  return Object.values(record).every(
    (value) => typeof value !== "string" || value.length <= MAX_FIELD_LENGTH
  );
}

export async function GET(_request: NextRequest, { params }: RouteContext) {
  const { collection } = await params;
  if (!isCollectionName(collection)) {
    return NextResponse.json({ error: "존재하지 않는 컬렉션입니다" }, { status: 404 });
  }

  const records = await dbList(collection);
  return NextResponse.json(records);
}

export async function POST(request: NextRequest, { params }: RouteContext) {
  const { collection } = await params;
  if (!isCollectionName(collection)) {
    return NextResponse.json({ error: "존재하지 않는 컬렉션입니다" }, { status: 404 });
  }

  const body: unknown = await request.json().catch(() => null);
  if (!isPlainRecord(body) || !isWithinFieldLimits(body)) {
    return NextResponse.json({ error: "요청 본문이 올바르지 않습니다" }, { status: 400 });
  }

  const inserted = await dbInsert(collection, body);
  return NextResponse.json(inserted, { status: 201 });
}
