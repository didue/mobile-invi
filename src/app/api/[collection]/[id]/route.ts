import { NextRequest, NextResponse } from "next/server";
import { dbDelete, isCollectionName } from "@/lib/db";

type RouteContext = { params: Promise<{ collection: string; id: string }> };

export async function DELETE(_request: NextRequest, { params }: RouteContext) {
  const { collection, id } = await params;
  if (!isCollectionName(collection)) {
    return NextResponse.json({ error: "존재하지 않는 컬렉션입니다" }, { status: 404 });
  }

  const deleted = await dbDelete(collection, id);
  if (!deleted) {
    return NextResponse.json({ error: "해당 항목을 찾을 수 없습니다" }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
