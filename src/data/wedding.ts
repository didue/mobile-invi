export const WEDDING_DATE = new Date('2027-01-09T12:40:00+09:00');
export const VENUE_ADDRESS = '서울특별시 영등포구 은행로 30';

// 갤러리 사진은 scripts/optimize-images.mjs 가 생성한 WebP 변환본을 사용한다.
// 격자는 thumb(긴 변 640px), 라이트박스는 full(긴 변 1600px)을 받아 첫 로드 전송량을 줄인다.
// 경로를 파일명에서 생성하므로 확장자 대소문자가 어긋나 Linux 배포 환경에서 404 가 나는 일이 없다.
const GALLERY_FILES = [
  // 'hj2_6880',
  'hj2_7118',
  'hj2_7131',
  'hj2_7889',
  'hj2_7351',
  'hj2_7606',
  'hj2_7642',
  'hj2_8265',
  'hj2_8355',
  'hj2_8290',
  'hj2_7724',
  'hj2_6935',
  'hj2_7383',
  'hj2_7470',
  'hj2_8399',
  'hj2_8282',
  // 'hj2_7633',
  // 'hj2_7906',
  // 'hj2_9514',
  // 'hj2_9879',
  // 'hj2_8460',
  // 'hj2_8686',
  // 'hj2_7797',
  // 'hj2_7974',
  // 'hj2_7279',
  // 'hj2_7867',
  // 'hj2_8247',
];

export type GalleryPhoto = {
  thumb: string;
  full: string;
};

export const GALLERY: GalleryPhoto[] = GALLERY_FILES.map((name) => ({
  thumb: `/assets/images/gallery/thumb/${name}.webp`,
  full: `/assets/images/gallery/full/${name}.webp`,
}));

// 카카오·OG 공유 미리보기 전용 썸네일(800x800). 공유 경로에서 갤러리 원본을 노출하지 않는다.
export const OG_SHARE_IMAGE = '/assets/images/og-share.webp';

export const WEDDING_VENUE = {
  name: '더 파티움 여의도',
  floor : '그랜드 컨벤션홀(B1)',
  address : '서울특별시 영등포구 은행로 30(중소기업중앙회)',
  tel : '050-71346-0181',
  coords : { lat: 37.52810299154129, lng: 126.92278739271629 },
  station : {
    metro : [
      '<span class="line-nine">지하철 9호선</span> 국회의사당역 3번 출구(도보 5분)',
      '<span class="line-five">지하철 5호선</span> 여의나루역 1번 출구(도보 15분)'
    ],
    bus : [
      '5호선 여의나루역 1번출구 <span class="primary">무료 셔틀버스</span> 운영<br/>(5분간격 수시 운행)', 
      '산업은행본점 하차 : [일반]10, [간선]463',
      '여의도순복음 비전센터 하차 : [지선]5534, 5563',
      '<span class="primary">천안 대절버스</span> : 천안시청 봉서홀 앞 주차장 <br/>(산들여행사 / 출발시간 : 오전 10시30분)'
    ],
    car : [
      `<span class='primary'>"더파티움 여의도"</span> 또는 <span class='primary'>"중소기업중앙회"</span> 검색`, 
      `건물 내 지하 주차장 무료 이용 가능 (90분)`,
      `건물 주차장 만차 시 건너편 2주차장(기계산업진흥회 주차장)을 이용해 주세요`,
    ],
  }
};

export const MAPS = {
  kakao: {
    link: () => `https://map.kakao.com/link/search/${encodeURIComponent(VENUE_ADDRESS)}`,
  },
  naver: {
    link: () => `https://map.naver.com/v5/search/${encodeURIComponent(VENUE_ADDRESS)}`,
  },
  tmap: {
    // API 키가 필요 없는 티맵 앱 스킴으로 목적지 좌표를 넘겨 길찾기 화면을 바로 연다(티맵 앱이 설치된 기기에서만 동작).
    link: () => `tmap://route?goalname=${encodeURIComponent(WEDDING_VENUE.name)}&goalx=${WEDDING_VENUE.coords.lng}&goaly=${WEDDING_VENUE.coords.lat}`,
  },
};

// Intro 섹션 초대 문구. acrostic은 각 줄 첫 글자(정·근·지·수)를 굵게 강조하는 세로 머리글 문단이다.
export const INVITATION_MESSAGE = {
  acrostic: [
    '정성스레 쌓아온 우리의 시간 속에서',
    '근사함보다 다정함이 오래 남는다는 것을 배웠습니다.',
    '지금처럼 서로의 하루를 따뜻하게 바라보며',
    '수많은 날을 천천히 함께 걸어가겠습니다.',
  ],
  closing: ['소중한 분들을 초대하오니', '따뜻한 마음으로 축복해 주시면 감사하겠습니다.'],
};

// 각 섹션의 section-title / section-sub 문구. sub은 줄 단위 배열(빈 배열이면 렌더링하지 않음).
export const SECTION_TEXTS = {
  intro: {
    title: 'INVITATION',
    sub: [],
  },
  weddingDay: {
    title: 'WEDDING DAY',
    sub: ['함께해 주실 그 날'],
  },
  profiles: {
    title: 'GROOM & BRIDE',
    sub: ['신랑과 신부를 소개합니다🌿'],
  },
  gallery: {
    title: 'GALLERY',
    sub: [
      // '두 사람의 순간들,',
      '사진을 클릭하시면 전체화면 보기가 가능합니다'
    ],
  },
  mapSection: {
    title: 'LOCATION',
    sub: [
      '소중한 시간을 내어 저희 결혼식에',
      '축하의 발걸음을 해주시는 모든 분들의',
      '따뜻한 마음에 깊이 감사드립니다'
    ] as string[],
  },
  rsvp: {
    title: 'RSVP',
    sub: [
      '모든 분들을 소중히 모실 수 있도록',
      '참석 여부를 회신해주시면 더욱 감사하겠습니다💐',
    ],
  },
  gift: {
    title: '마음 전하실 곳',
    sub: [
      '참석이 어려우신 분들을 위해 기재하였습니다',
      '너그러운 마음으로 양해 부탁드립니다',
    ],
  },
  guestbook: {
    title: 'MESSAGE',
    sub: ['신랑&신부에게 따뜻한 한마디의 메시지를 남겨주세요! 🫶🏻'],
  },
  notice: {
    title: 'INFOMATION',
    sub: ['예식에 관한 사전 안내를 드립니다']
  },
};


export const NOTICES = [
  {
    title: '주차안내',
    image: '/assets/images/notice/grand-more1-1.webp',
    items: [
      '주차 등록은 B1층 안내데스크에 문의해 주세요',
      '예식장 건물 내 1주차장 90분 무료 주차 가능합니다',
      '건너편 2주차장 이용시, 1주차장에서 주차번호판 등록 후 이동이 하셔야 정상적으로 주차정산 가능하여 양해 부탁드립니다'
      // '본관 1주차장 만차시 옆 동의 2주차장으로 안내드리고 있습니다.<br/>(2주차장 120분 무료)',
    ],
  },
  {
    title: '연회장 안내',
    image: '/assets/images/notice/grand-more2-1.webp',
    items: [
      '신부 대기실은 B1 웨딩홀 오른쪽에 위치에 있습니다.<br/>연회장은 웨딩홀과 같은 B1층에 있습니다',
      '5세 이하의 어린이는 어린이(소인) 식사권을 요청해 주세요',
      '식사는 4인 한정식 한 상 차림과 작은 뷔페가 준비되어 있습니다',
      '갈비탕을 포함하여 음식 리필이 가능합니다.<br/>가까운 직원에게 편하게 문의해 주세요',
      '좌석을 합석을 하지 않으셔도 괜찮습니다.직원에게 편하게 말씀해 주세요',
    ],
  },
  {
    title: '포토부스',
    image: '/assets/images/notice/photo-booth.webp',
    items: [
      '소중한 날을 기록할 수 있도록 포토부스를 준비했습니다',
      '방문해주신 하객 분들의 사진을 찍어<br/>한 장은 방명록에, 한 장은 추억으로 간직해 주세요',
    ]
  },
];
