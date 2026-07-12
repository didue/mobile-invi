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
    { name: '배기환', role: 'father', tag: '신랑 아버지', account: 'OO은행 000-0000-0000' },
    { name: '이병애', role: 'mother', tag: '신랑 어머니', account: 'OO은행 000-0000-0000' },
    { name: '배정근', role: 'groom',  tag: 'GROOM',      account: 'OO은행 000-0000-0000' },
  ],
  bride: [
    { name: '한창희', role: 'father', tag: '신부 아버지', account: 'OO은행 000-0000-0000' },
    { name: '이금이', role: 'mother', tag: '신부 어머니', account: 'OO은행 000-0000-0000' },
    { name: '한지수', role: 'bride',  tag: 'BRIDE',      account: 'OO은행 000-0000-0000' },
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

export const NOTICES = [
  {
    title: '안내 사항',
    items: [
      '신부 대기실은 B1 웨딩홀 오른쪽에 위치에 있습니다.',
      '식사는 뷔페식이 아닌 한정식 한 상 차림입니다.',
      '한상차림 외에도 세미 뷔페가 준비되어 있습니다.',
      '갈비탕을 포함하여 음식 리필이 가능합니다. (제외:전복/칠리새우/모듬회) 가까운 직원에게 문의해 주세요.',
      '꼭 4인으로 앉지 않으셔도 됩니다. 합석을 원치 않으시거나 1인상을 원하시는 분께서는 직원에게 편하게 말씀해주세요.',
      '5세 이하의 어린이는 어린이 식권을 받아주시기 바랍니다.(6세 이상의 어린이는 성인과 동일)',
    ],
  },
  { 
    title: '주차안내',
    items: [      
      '예식장 건물 내 90분 무료 주차 가능합니다.',
      '주차 등록은 B1층 안내데스크에 문의해 주세요.',
      '본관 1주차장 만차시 2주차장으로 안내드리고 있습니다. (2주차장 120분 무료)',
      '2주차장 주차시 1주차장에 주차 번호판 등록 후 이동하셔야 정산 가능함을 알려드립니다.'
    ],
   },
  { 
    title: '포토부스',
    items: [
      '소중한 날을 기록할 수 있도록\n 포토부스를 준비했습니다.',
      '방문해주신 하객 분들의 사진을 찍어\n한 장은 방명록에, 한 장은 추억으로 간직해 주세요.'
    ]
  },
];

export const WEDDING_VENUE = {
  floor : '더 파티움 여의도 B1 그랜드 컨벤션홀',
  address : '서울특별시 영등포구 은행로 30(중소기업중앙회)',
  station : {
    metro : [
      '[도보] 지하철 9호선 국회의사당역 3번 출구 (도보 5분)'
    ],
    bus : [
      '[셔틀] 여의나루역 1번 출구 (수시 운행)', 
      '[버스] 여의나루역 2번 출구 마을버스 10번, "기계회관" 정류장 하차'
    ],
    car : ['"더파티움 여의도" 또는 "중소기업중앙회" 검색'],
    parking: ['예식장 건물 내 90분 무료 주차'],
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
    link: () => 'https://tmap.life/2b1f6b',
  },
};