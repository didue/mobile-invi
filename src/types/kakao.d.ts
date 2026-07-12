export {};

interface KakaoShareLink {
  mobileWebUrl: string;
  webUrl: string;
}

interface KakaoShareFeedSettings {
  objectType: "feed";
  content: {
    title: string;
    description: string;
    imageUrl: string;
    link: KakaoShareLink;
  };
  buttons?: {
    title: string;
    link: KakaoShareLink;
  }[];
}

interface KakaoSDK {
  init: (jsKey: string) => void;
  isInitialized: () => boolean;
  Share: {
    sendDefault: (settings: KakaoShareFeedSettings) => void;
  };
}

declare global {
  interface Window {
    Kakao?: KakaoSDK;
  }
}
