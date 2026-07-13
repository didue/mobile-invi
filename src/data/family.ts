export const COUPLE = {
  groom: {
    name: '배정근',
    role: 'groom',
    profile: '/images/profile/IMG_0036.jpg',
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
