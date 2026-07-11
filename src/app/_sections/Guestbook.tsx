"use client";

import { useEffect, useState } from "react";
import { storeGet, storeList, storeSet } from "@/lib/storage";
import { toast } from "@/lib/toast";
import { useReveal } from "@/hooks/useReveal";

type GuestbookEntry = {
  name: string;
  msg: string;
  time: string;
};

function formatTime(iso: string): string {
  const date = new Date(iso);
  return `${date.getMonth() + 1}.${date.getDate()}`;
}

async function loadGuestbook(): Promise<GuestbookEntry[]> {
  const keys = await storeList("guestbook:");
  const entries = await Promise.all(
    keys.map(async (key) => {
      const raw = await storeGet(key, true);
      if (!raw) return null;
      try {
        return JSON.parse(raw) as GuestbookEntry;
      } catch {
        return null;
      }
    })
  );

  return entries
    .filter((entry): entry is GuestbookEntry => entry !== null)
    .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
}

export const Guestbook = () => {
  const sectionRef = useReveal<HTMLElement>();
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadGuestbook().then(setEntries);
  }, []);

  const handleSubmit = async () => {
    const trimmedName = name.trim();
    const trimmedMessage = message.trim();
    if (!trimmedName || !trimmedMessage) {
      toast("이름과 메시지를 모두 입력해주세요");
      return;
    }

    const payload = JSON.stringify({
      name: trimmedName,
      msg: trimmedMessage,
      time: new Date().toISOString(),
    });
    const res = await storeSet(`guestbook:${Date.now()}`, payload, true);
    if (!res) return;

    setName("");
    setMessage("");
    toast("메시지가 등록되었어요");
    setEntries(await loadGuestbook());
  };

  return (
    <section ref={sectionRef} className="reveal" id="guestbookSection">
      <div className="section-title">Guestbook</div>
      <div className="section-sub">따뜻한 축하 메시지를 남겨주세요</div>

      <div className="form-card">
        <div className="field">
          <label htmlFor="gbName">성함</label>
          <input
            type="text"
            id="gbName"
            placeholder="이름을 입력해주세요"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="gbMsg">축하 메시지</label>
          <textarea
            id="gbMsg"
            placeholder="두 사람에게 전하고 싶은 말을 남겨주세요"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <button type="button" className="submit-btn" onClick={handleSubmit}>
          메시지 남기기
        </button>
      </div>

      <div className="gb-list">
        {entries.length === 0 ? (
          <div className="gb-empty">첫 번째 축하 메시지를 남겨주세요 🤍</div>
        ) : (
          entries.map((entry) => (
            <div className="gb-item" key={`${entry.name}-${entry.time}`}>
              <div className="gb-top">
                <span className="gb-name">{entry.name}</span>
                <span className="gb-time">{formatTime(entry.time)}</span>
              </div>
              <div className="gb-msg">{entry.msg}</div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};
