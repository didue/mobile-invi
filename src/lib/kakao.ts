import { COUPLE } from "@/data/family";
import { GALLERY, WEDDING_DATE } from "@/data/wedding";
import { formatWeddingDate } from "@/lib/date";
import { toast } from "@/lib/toast";

export function shareToKakao() {
  if (!window.Kakao?.isInitialized()) {
    toast("카카오 공유를 사용할 수 없어요");
    return;
  }

  const shareUrl = window.location.href;
  const link = { mobileWebUrl: shareUrl, webUrl: shareUrl };

  window.Kakao.Share.sendDefault({
    objectType: "feed",
    content: {
      title: `${COUPLE.groom.name} ♥ ${COUPLE.bride.name} 결혼합니다`,
      description: `${formatWeddingDate(WEDDING_DATE)}에 소중한 시간 함께해주세요`,
      imageUrl: `${window.location.origin}${GALLERY[0]}`,
      link,
    },
    buttons: [{ title: "초대장 보기", link }],
  });
}

export async function copyShareLink() {
  try {
    await navigator.clipboard.writeText(window.location.href);
    toast("링크가 복사되었어요 😉");
  } catch {
    toast("복사에 실패했어요😣");
  }
}
