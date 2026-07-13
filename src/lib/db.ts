import { createClient } from "@supabase/supabase-js";
import { randomUUID } from "crypto";

export const COLLECTIONS = ["guestbook", "rsvp"] as const;
export type CollectionName = (typeof COLLECTIONS)[number];

export type DbRecord = Record<string, unknown> & { id: string };

export function isCollectionName(value: string): value is CollectionName {
  return (COLLECTIONS as readonly string[]).includes(value);
}

// 각 컬렉션은 앱이 주고받는 필드 이름과 실제 테이블 컬럼 이름이 다르므로,
// 컬렉션별로 테이블명·PK 컬럼·앱↔DB 필드 매핑(toDb/fromDb)을 정의한다.
type CollectionConfig = {
  table: string;
  idColumn: string;
  toDb: (record: Record<string, unknown>) => Record<string, unknown>;
  fromDb: (row: Record<string, unknown>) => DbRecord;
};

const ATTEND_TO_YN: Record<string, string> = { 참석: "Y", 불참: "N" };
const YN_TO_ATTEND: Record<string, string> = { Y: "참석", N: "불참" };
const SIDE_TO_GB: Record<string, string> = { 신랑측: "GROOM", 신부측: "BRIDE" };
const GB_TO_SIDE: Record<string, string> = { GROOM: "신랑측", BRIDE: "신부측" };

const COLLECTION_CONFIG: Record<CollectionName, CollectionConfig> = {
  guestbook: {
    table: "guestbook",
    idColumn: "id",
    toDb: ({ id, name, contact, message, timestamp }) => ({
      id: id || randomUUID(),
      name,
      contact,
      message,
      timestamp,
    }),
    fromDb: (row) => ({
      id: row.id as string,
      name: row.name,
      contact: row.contact,
      message: row.message,
      timestamp: row.timestamp,
    }),
  },
  rsvp: {
    table: "rsvp",
    idColumn: "rvspId",
    toDb: ({ id, name, attend, count, side, time }) => ({
      rvspId: id || randomUUID(),
      name,
      attendCnt: count,
      attendYn: ATTEND_TO_YN[attend as string] ?? attend,
      sideGb: SIDE_TO_GB[side as string] ?? side,
      regrDate: time,
    }),
    fromDb: (row) => ({
      id: row.rvspId as string,
      name: row.name,
      count: row.attendCnt,
      attend: YN_TO_ATTEND[row.attendYn as string] ?? row.attendYn,
      side: GB_TO_SIDE[row.sideGb as string] ?? row.sideGb,
      time: row.regrDate,
    }),
  },
};

function getClient() {
  const url = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceRoleKey) {
    throw new Error("SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY 환경변수가 설정되지 않았습니다");
  }
  return createClient(url, serviceRoleKey, {
    auth: { persistSession: false },
    db: { schema: "mvin" },
  });
}

export async function dbList(collection: CollectionName): Promise<DbRecord[]> {
  const config = COLLECTION_CONFIG[collection];
  const { data, error } = await getClient().from(config.table).select("*");
  if (error) throw error;
  return (data as Record<string, unknown>[]).map(config.fromDb);
}

export async function dbInsert(
  collection: CollectionName,
  record: Record<string, unknown>
): Promise<DbRecord> {
  const config = COLLECTION_CONFIG[collection];
  const { data, error } = await getClient()
    .from(config.table)
    .insert(config.toDb(record))
    .select()
    .single();
  if (error) throw error;
  return config.fromDb(data as Record<string, unknown>);
}

export async function dbDelete(collection: CollectionName, id: string): Promise<boolean> {
  const config = COLLECTION_CONFIG[collection];
  const { error, count } = await getClient()
    .from(config.table)
    .delete({ count: "exact" })
    .eq(config.idColumn, id);
  if (error) throw error;
  return (count ?? 0) > 0;
}
