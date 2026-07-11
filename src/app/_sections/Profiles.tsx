"use client";

import { useEffect, useState } from "react";
import { COUPLE } from "@/data/wedding";
import { resizeImageToDataUrl } from "@/lib/image";
import { storeGet, storeSet } from "@/lib/storage";
import { toast } from "@/lib/toast";
import { useReveal } from "@/hooks/useReveal";
import { ContactModal } from "@/app/_sections/ContactModal";

const PROFILE_RESIZE_MAX_WIDTH = 600;
const PROFILE_RESIZE_QUALITY = 0.78;

type ProfileKey = "groom" | "bride";

function ProfileColumn({
  profileKey,
  photo,
  role,
  name,
  rel,
  onUpload,
}: {
  profileKey: ProfileKey;
  photo: string | null;
  role: string;
  name: string;
  rel: string;
  onUpload: (key: ProfileKey, file: File | undefined) => void;
}) {
  return (
    <div className="profile-col">
      <label className="profile-photo">
        {photo ? (
          // eslint-disable-next-line @next/next/no-img-element -- 업로드된 로컬 데이터 URL이라 next/image로 최적화할 수 없다.
          <img src={photo} alt="" />
        ) : (
          <div className="plus">
            ＋
            <br />
            사진 추가
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => onUpload(profileKey, e.target.files?.[0])}
        />
      </label>
      <div className="role">{role}</div>
      <div className="name">{name}</div>
      <div className="rel">
        {rel.split("\n").map((line, index) => (
          <span key={line}>
            {index > 0 && <br />}
            {line}
          </span>
        ))}
      </div>
    </div>
  );
}

export const Profiles = () => {
  const sectionRef = useReveal<HTMLElement>();
  const [photos, setPhotos] = useState<Record<ProfileKey, string | null>>({
    groom: null,
    bride: null,
  });
  const [contactOpen, setContactOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const [groom, bride] = await Promise.all([
        storeGet("profile:groom", true),
        storeGet("profile:bride", true),
      ]);
      if (cancelled) return;
      setPhotos({ groom, bride });
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleUpload = async (key: ProfileKey, file: File | undefined) => {
    if (!file) return;
    try {
      const dataUrl = await resizeImageToDataUrl(file, PROFILE_RESIZE_MAX_WIDTH, PROFILE_RESIZE_QUALITY);
      setPhotos((prev) => ({ ...prev, [key]: dataUrl }));
      await storeSet(`profile:${key}`, dataUrl, true);
      toast("프로필 사진이 저장되었어요");
    } catch {
      toast("저장에 실패했어요. 다시 시도해주세요.");
    }
  };

  return (
    <section ref={sectionRef} className="reveal">
      <div className="section-title">신랑 & 신부</div>
      <div className="section-sub">Groom &amp; Bride</div>
      <div className="profile-compact">
        <ProfileColumn
          profileKey="groom"
          photo={photos.groom}
          role="GROOM"
          name={COUPLE.groom.name}
          rel={COUPLE.groom.rel}
          onUpload={handleUpload}
        />
        <ProfileColumn
          profileKey="bride"
          photo={photos.bride}
          role="BRIDE"
          name={COUPLE.bride.name}
          rel={COUPLE.bride.rel}
          onUpload={handleUpload}
        />
      </div>
      <div className="rsvp-trigger-wrap" style={{ marginTop: 56 }}>
        <button type="button" className="rsvp-open-btn" onClick={() => setContactOpen(true)}>
          연락하기
        </button>
      </div>

      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </section>
  );
};
