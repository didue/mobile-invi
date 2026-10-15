import { createClient } from "@supabase/supabase-js";
import { randomUUID } from "crypto";

// RSVP 는 Google Apps Script(src/lib/gas.ts)로 스프레드시트에 저장하므로 Supabase 컬렉션에서 제외한다.
export const COLLECTIONS = ["guestbook"] as const;
export type CollectionName = (typeof COLLECTIONS)[number];

export type DbRecord = Record<string, unknown> & { id: string };

export function isCollectionName(value: string): value is CollectionName {
  return (COLLECTIONS as readonly string[]).includes(value);
}

// 컬렉션별로 테이블명·PK 컬럼·앱↔DB 필드 매핑(toDb/fromDb)을 정의한다.
type CollectionConfig = {
  table: string;
  idColumn: string;
  toDb: (record: Record<string, unknown>) => Record<string, unknown>;
  fromDb: (row: Record<string, unknown>) => DbRecord;
};

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
