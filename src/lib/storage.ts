import { toast } from "@/lib/toast";

export interface StorageRecord {
  key: string;
  value: string;
  shared: boolean;
}

const STORAGE_PREFIX = "wedding-invitation:";

function storageKey(key: string) {
  return `${STORAGE_PREFIX}${key}`;
}

export const storage = {
  async get(key: string, shared = false): Promise<StorageRecord | null> {
    const value = window.localStorage.getItem(storageKey(key));
    return value === null ? null : { key, value, shared };
  },

  async set(key: string, value: string, shared = false): Promise<StorageRecord> {
    window.localStorage.setItem(storageKey(key), value);
    return { key, value, shared };
  },

  async list(prefix = ""): Promise<{ keys: string[] }> {
    const keys: string[] = [];
    for (let i = 0; i < window.localStorage.length; i += 1) {
      const rawKey = window.localStorage.key(i);
      if (rawKey?.startsWith(STORAGE_PREFIX)) {
        const key = rawKey.slice(STORAGE_PREFIX.length);
        if (key.startsWith(prefix)) keys.push(key);
      }
    }
    return { keys };
  },

  async delete(key: string): Promise<void> {
    window.localStorage.removeItem(storageKey(key));
  },
};

export async function storeGet(key: string, shared = false): Promise<string | null> {
  try {
    const record = await storage.get(key, shared);
    return record ? record.value : null;
  } catch {
    return null;
  }
}

export async function storeSet(
  key: string,
  value: string,
  shared = false
): Promise<StorageRecord | null> {
  try {
    return await storage.set(key, value, shared);
  } catch {
    toast("저장에 실패했어요. 다시 시도해주세요.");
    return null;
  }
}

export async function storeList(prefix = ""): Promise<string[]> {
  try {
    const record = await storage.list(prefix);
    return record ? record.keys : [];
  } catch {
    return [];
  }
}
