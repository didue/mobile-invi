export const WEDDING_DATE = new Date('2027-01-09T12:40:00+09:00');
export const VENUE_ADDRESS = '서울특별시 영등포구 은행로 30 더파티움 여의도';

export const COUPLE = {
  groom: { name: '배정근', role: '신랑', father: '배기환', mother: '이병애', rel: '배기환 · 이병애의\n장남', tel: '01052459812' },
  bride: { name: '한지수', role: '신부', father: '한창희', mother: '이금이', rel: '한창희 · 이금이의\n장녀', tel: '01085278040' },
};

// 연락하기 모달 (신랑측/신부측 각각 아버지·어머니·본인)
export const CONTACTS = {
  groom: [
    { 
      name: '배기환', 
      role : 'father', 
      tag: '신랑 아버지', 
      tel: '01000000001', 
      bank: '', 
      account : '', 
      kakaoId: '' 
    },
    { 
      name: '이병애', 
      role : 'mother', 
      tag: '신랑 어머니', 
      tel: '01000000002', 
      bank: '', 
      account : '', 
      kakaoId: ''  
    },
    { 
      name: '배정근',
      role : 'groom', 
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
      tag: '신부 아버지', 
      tel: '01054026326', 
      bank: '우리은행', 
      account : '', 
      kakaoId: ''  
    },
    { 
      name: '이금이', 
      role : 'mother', 
      tag: '신부 어머니', 
      tel: '01063217952', 
      bank: '국민은행', 
      account : '', 
      kakaoId: ''  
    },
    { 
      name: '한지수', 
      role : 'bride', 
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
    { name: '배기환', tag: '신랑 아버지', account: 'OO은행 000-0000-0000' },
    { name: '이병애', tag: '신랑 어머니', account: 'OO은행 000-0000-0000' },
    { name: '배정근', tag: 'GROOM',      account: 'OO은행 000-0000-0000' },
  ],
  bride: [
    { name: '한창희', tag: '신부 아버지', account: 'OO은행 000-0000-0000' },
    { name: '이금이', tag: '신부 어머니', account: 'OO은행 000-0000-0000' },
    { name: '한지수', tag: 'BRIDE',      account: 'OO은행 000-0000-0000' },
  ],
};

export const GALLERY = [
  'src/assets/images/HJ2_.jpg',
  'src/assets/images/HJ2_.jpg',
  'src/assets/images/HJ2_.jpg',
  'src/assets/images/HJ2_.jpg',
  'src/assets/images/HJ2_.jpg',
  'src/assets/images/HJ2_.jpg',
  'src/assets/images/HJ2_.jpg',
  'src/assets/images/HJ2_.jpg',
  'src/assets/images/HJ2_.jpg',
  'src/assets/images/HJ2_.jpg',
  'src/assets/images/HJ2_.jpg',
  'src/assets/images/HJ2_.jpg',
  'src/assets/images/HJ2_.jpg',
  'src/assets/images/HJ2_.jpg',
  'src/assets/images/HJ2_.jpg',
  'src/assets/images/HJ2_.jpg',
  'src/assets/images/HJ2_.jpg',
  'src/assets/images/HJ2_.jpg',
  'src/assets/images/HJ2_.jpg',
  'src/assets/images/HJ2_.jpg',
];

export const NOTICES = [
  {
    title: '웨딩홀 안내',
    items: [
      '신부대기실은 7층 세인트룸에 위치해있습니다.',
      '식사는 뷔페식이 아닌 함께한상 브랜드의 한정식 한 상 차림입니다.',
      '5세 이하의 어린이는 어린이 식권을 받아주시기 바랍니다. 6세 이상의 어린이는 성인과 동일한 식권을 사용합니다.',
      '병원에 주차하신 분들은 예약실에서 주차권을 수령하시기 바랍니다.',
    ],
  },
  { title: '안내 2', empty: '추후 업데이트될 예정입니다.' },
  { title: '안내 3', empty: '추후 업데이트될 예정입니다.' },
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
  kakao : {
    link : 'https://map.kakao.com/link/search/${encodeURIComponent(VENUE_ADDRESS)}'
  },
  naver : {
    link : 'https://map.naver.com/v5/search/${encodeURIComponent(VENUE_ADDRESS)}'
  }, 
  tmap : {
    link : 'https://tmap.life/2b1f6b'
  }
};