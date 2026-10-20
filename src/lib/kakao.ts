import { COUPLE } from "@/data/family";
import { OG_SHARE_IMAGE, WEDDING_DATE } from "@/data/wedding";
import { formatWeddingDate } from "@/lib/date";
import { isMobileDevice } from "@/lib/device";
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
      imageUrl: `${window.location.origin}${OG_SHARE_IMAGE}`,
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

// 모바일에서는 OS 공유 시트로 보내고, PC나 Web Share API가 없는 브라우저(일부 인앱 브라우저 등)는 링크 복사로 대체한다.
export async function shareInvitationLink() {
  if (!isMobileDevice() || typeof navigator.share !== "function") {
    await copyShareLink();
    return;
  }

  try {
    await navigator.share({
      title: `${COUPLE.groom.name} ♥ ${COUPLE.bride.name} 결혼합니다`,
      url: window.location.href,
    });
  } catch (error) {
    // 사용자가 공유 시트를 닫은 경우는 실패가 아니므로 안내하지 않는다.
    if (error instanceof DOMException && error.name === "AbortError") return;
    await copyShareLink();
  }
}
