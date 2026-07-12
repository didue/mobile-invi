export const WEDDING_DATE = new Date('2027-01-09T12:40:00+09:00');
export const VENUE_ADDRESS = '서울특별시 영등포구 은행로 30 더파티움 여의도';

export const COUPLE = {
  groom: { 
    name: '배정근', 
    role: 'groom', 
    profile: '/images/profile/HJ2_7888.jpg',
    description : [
      '90년 4월 28일',
      '다정다감 섬세한 ISFJ',
      '',
    ],
  },
  bride: { 
    name: '한지수', 
    role: 'bride', 
    profile: '/images/profile/HJ2_6987.jpg',
    description : [
      '93년 5월 26일',
      '명랑발랄 꼼꼼한 ENTJ',
      '',
    ],
  },
};

// 연락하기 모달 (신랑측/신부측 각각 아버지·어머니·본인)
export const CONTACTS = {
  groom: [
    { 
      name: '배기환', 
      role : 'father',
      rel : '아버지',
      tag: '신랑 아버지', 
      tel: '01000000001', 
      bank: '', 
      account : '', 
      kakaoId: '' 
    },
    { 
      name: '이병애', 
      role : 'mother', 
      rel: '어머니',
      tag: '신랑 어머니', 
      tel: '01000000002', 
      bank: '', 
      account : '', 
      kakaoId: ''  
    },
    { 
      name: '배정근',
      role : 'groom', 
      rel: '차남',
      tag: '신랑', 
      tel: '01052459812', 
      bank: '', 
      account : '', 
      kakaoId: ''  
    },
  ],
  bride: [
    { 
      name: '한창희', 
      role : 'father', 
      rel : '아버지',
      tag: '신부 아버지', 
      tel: '01054026326', 
      bank: '우리은행', 
      account : '', 
      kakaoId: ''  
    },
    { 
      name: '이금이', 
      role : 'mother', 
      rel : '어머니',
      tag: '신부 어머니', 
      tel: '01063217952', 
      bank: '국민은행', 
      account : '', 
      kakaoId: ''  
    },
    { 
      name: '한지수', 
      role : 'bride', 
      rel : '차녀',
      tag: '신부', 
      tel: '01085278040', 
      bank: '우리은행', 
      account : '1002-764-181491', 
      kakaoId: 'lotus526'  
    },
  ],
};

// 마음 전하실 곳(계좌) — 아코디언
export const GIFTS = {
  groom: [
    { name: '배기환', role: 'father', tag: '신랑 아버지', account: '기업은행 000-0000-0000' },
    { name: '이병애', role: 'mother', tag: '신랑 어머니', account: '기업은행 000-0000-0000' },
    { name: '배정근', role: 'groom',  tag: 'GROOM',      account: '우리은행 000-0000-0000' },
  ],
  bride: [
    { name: '한창희', role: 'father', tag: '신부 아버지', account: '우리은행 164-156368-02-008' },
    { name: '이금이', role: 'mother', tag: '신부 어머니', account: '국민은행 714002-01-458084' },
    { name: '한지수', role: 'bride',  tag: 'BRIDE',      account: '우리은행 1002-764-181491' },
  ],
};

export const GALLERY = [
  '/images/gallery/HJ2_7118.jpg',
  '/images/gallery/HJ2_7131.jpg',
  '/images/gallery/HJ2_7351.jpg',
  '/images/gallery/HJ2_7383.jpg',
  '/images/gallery/HJ2_7569.jpg',
  '/images/gallery/HJ2_7633.jpg',
  '/images/gallery/HJ2_7797.jpg',
  '/images/gallery/HJ2_8012.jpg',
  '/images/gallery/HJ2_8460.jpg',
  '/images/gallery/HJ2_8686.jpg',
];

export const WEDDING_VENUE = {
  floor : '더 파티움 여의도 B1 그랜드 컨벤션홀',
  address : '서울특별시 영등포구 은행로 30(중소기업중앙회)',
  coords : { lat: 37.52810299154129, lng: 126.92278739271629 },
  station : {
    metro : [
      '지하철 9호선 국회의사당역 3번 출구 (도보 5분)',
      '지하철 5호선 여의나루역 1번 출구'
    ],
    bus : [
      '[셔틀] 여의나루역 1번 출구 (수시 운행)', 
      '[버스] 여의나루역 2번 출구 마을버스 10번, "기계회관" 정류장 하차'
    ],
    car : ['"더파티움 여의도" 또는 "중소기업중앙회" 네비게이션 검색'],
    parking: ['예식장 건물 내 1주차장·2주차장 무료 주차'],
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
    link: () => `https://apis.openapi.sk.com/tmap/app/routes?appKey=${process.env.NEXT_PUBLIC_TMAP_APP_KEY}&goalname=더파티움여의도&goalx=${WEDDING_VENUE.coords.lng}&goaly=${WEDDING_VENUE.coords.lat}`},
};

// 각 섹션의 section-title / section-sub 문구. sub은 줄 단위 배열(빈 배열이면 렌더링하지 않음).
export const SECTION_TEXTS = {
  weddingDay: {
    title: 'WEDDING DAY',
    sub: ['함께해 주실 그 날'],
  },
  profiles: {
    title: '신랑&신부',
    sub: ['Groom & Bride'],
  },
  gallery: {
    title: '갤러리',
    sub: ['두 사람의 순간들'],
  },
  mapSection: {
    title: '오시는 길',
    sub: [] as string[],
  },
  rsvp: {
    title: '참석 여부 전달',
    sub: [
      '소중한 시간을 내어 저희 결혼식',
      '참석해 주시는 모든 분들께 감사드립니다.',
      '참석 여부를 회신해주시면 더욱 감사하겠습니다.',
    ],
  },
  gift: {
    title: '마음 전하실 곳',
    sub: [
      '멀리서도 소중한 축하의 마음을 보내주셔서 감사드리며',
      '따뜻한 마음에 깊이 감사드립니다.',
    ],
  },
  guestbook: {
    title: '축하 메세지',
    sub: ['신랑·신부에게 따뜻한 한마디의 메시지를 남겨주세요! 🫶🏻'],
  },
  notice: {
    title: '안내사항',
    sub: ['참고해주세요'],
  },
};


export const NOTICES = [
  {
    title: '연회장 안내',
    image: '/images/notice/grand-more1-1.jpg',
    items: [
      '신부 대기실은 B1 웨딩홀 오른쪽에 위치에 있습니다.',
      '식사는 뷔페식이 아닌 한정식 한 상 차림으로 제공되고 있습니다.<br/>한상차림 외에도 세미 뷔페가 준비되어 있습니다.',
      '갈비탕을 포함하여 음식 리필이 가능합니다.<br/>가까운 직원에게 편하게 문의해 주세요.',
      '합석을 원치 않으시거나 1인상을 원하시는 분께서는<br/>직원에게 편하게 말씀해주세요.',
      '5세 이하의 어린이는 어린이 식권을 받아주시기 바랍니다.',
    ],
  },
  {
    title: '주차안내',
    image: '/images/notice/grand-more2-1.jpg',
    items: [
      '예식장 건물 내 1주차장 90분 무료 주차 가능합니다.',
      '주차 등록은 B1층 안내데스크에 문의해 주세요.',
      '본관 1주차장 만차시 옆 동의 2주차장으로 안내드리고 있습니다.<br/>(2주차장 120분 무료)',
      '2주차장 이용시, 1주차장에서 주차번호판 등록 후 이동이 하셔야<br/>정상적으로 주차정산 가능하여 양해 부탁드립니다.'
    ],
   },
  {
    title: '포토부스',
    image: '/images/notice/photo-booth.jpg',
    items: [
      '소중한 날을 기록할 수 있도록 포토부스를 준비했습니다.',
      '방문해주신 하객 분들의 사진을 찍어<br/>한 장은 방명록에, 한 장은 추억으로 간직해 주세요.'
    ]
  },
];
