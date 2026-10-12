export const COUPLE = {
  groom: {
    name: '배정근',
    lastName : 'bae',
    firstName : 'jeonggeun',
    role: 'groom',
    profile: '/assets/images/profile/IMG_0036.jpg',
    description : [
      '90년 4월 28일',
      '다정다감 섬세한 ISFJ',
      '',
    ],
  },
  bride: {
    name: '한지수',
    lastName : 'han',
    firstName : 'jisoo',
    role: 'bride',
    profile: '/assets/images/profile/IMG_0040.jpg',
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
      tel: '01027359812',
      bank: '기업은행',
      account : '010-2735-9812',
      kakaoId: ''
    },
    {
      name: '이병애',
      role : 'mother',
      rel: '어머니',
      tag: '신랑 어머니',
      tel: '01038943232',
      bank: '기업은행',
      account : '010-3894-3232',
      kakaoId: ''
    },
    {
      name: '배정근',
      role : 'groom',
      rel: '아들',
      tag: '신랑',
      tel: '01052459812',
      bank: '우리은행',
      account : '1002-162-524423',
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
      account : '164-156368-02-008',
      kakaoId: ''
    },
    {
      name: '이금이',
      role : 'mother',
      rel : '어머니',
      tag: '신부 어머니',
      tel: '01063217952',
      bank: '국민은행',
      account : '714002-01-458084',
      kakaoId: ''
    },
    {
      name: '한지수',
      role : 'bride',
      rel : '딸',
      tag: '신부',
      tel: '01085278040',
      bank: '우리은행',
      account : '1002-764-181491',
      kakaoId: 'lotus526'
    },
  ],
};
