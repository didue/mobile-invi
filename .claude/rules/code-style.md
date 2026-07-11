# 코드 스타일
- typescript strict mode 활성화
- atomic design pattern 사용
- 컴포넌트 구조 : /src/components/이름
  - index.tsx (export)
  - 이름.tsx(구현체)
- Props 인터페이스 정의 필수
- 변수명 : camelCase
- 들여쓰기 : tab 1칸 = 2칸 스페이스 

# Next.js App Router 원칙
## Server Component 우선

App Router의 컴포넌트는 기본적으로 Server Component로 작성한다.
다음 기능이 필요한 경우에만 Client Component를 사용한다.

- useState, useReducer
- useEffect, useLayoutEffect
- 클릭, 입력 등 브라우저 이벤트 처리
- window, document, localStorage 등 브라우저 API
- 클라이언트 전용 커스텀 Hook
- 클라이언트 상태관리 라이브러리
- 브라우저에서만 실행되는 외부 라이브러리

Client Component가 필요한 파일에만 최상단에 선언한다.

'use client';

상위 페이지나 레이아웃 전체를 불필요하게 Client Component로 만들지 않는다.
상호작용이 필요한 가장 작은 단위만 Client Component로 분리한다.

## 서버와 클라이언트 경계
서버 전용 코드를 Client Component에서 import하지 않는다.
Server Component에서 Client Component로 전달하는 props는 직렬화 가능한 값이어야 한다.

## 페이지와 레이아웃
- 라우트 UI는 page.tsx에 작성한다.
- 공통 UI는 layout.tsx에 작성한다.
- 로딩 상태는 loading.tsx를 활용한다.
- 예상하지 못한 오류는 error.tsx 또는 global-error.tsx에서 처리한다.
- 존재하지 않는 리소스는 notFound()와 not-found.tsx로 처리한다.

layout.tsx와 page.tsx에 모든 로직을 집중시키지 않는다.
복잡한 UI, 데이터 처리, 비즈니스 로직은 적절한 컴포넌트와 모듈로 분리한다.

## 라우팅

내부 페이지 이동에는 기본적으로 next/link의 Link를 사용한다.

import Link from 'next/link';

<Link href="/dashboard">대시보드</Link>

단순 페이지 이동을 위해 일반 <a> 태그나 window.location.href를 사용하지 않는다.

프로그래밍 방식의 이동이 필요한 경우에만 useRouter를 사용한다.

## Metadata

<head> 태그를 직접 작성하기보다 Next.js Metadata API를 사용한다.

```
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '페이지 제목',
  description: '페이지 설명',
};
```

동적인 메타데이터가 필요하면 generateMetadata를 사용한다.

## 이미지와 폰트

로컬 이미지 또는 최적화가 필요한 이미지는 기본적으로 next/image를 사용한다.

```
import Image from 'next/image';
```

프로젝트 폰트는 가능하면 next/font를 사용한다.

일반 <img> 태그를 사용해야 한다면 이유가 명확해야 하며 접근성을 위한 alt를 반드시 제공한다.

# 데이터 원칙

이 프로젝트는 백엔드/API가 없는 정적 청첩장 사이트다. 화면에 표시하는 데이터는 `src/data/wedding.ts`의 상수를 그대로 참조한다.
RSVP·방명록·업로드 사진처럼 사용자가 남기는 데이터는 서버 없이 브라우저 저장소(localStorage 등)에 저장한다. 자세한 저장 방식은 `frontend/react.md`의 스토리지 어댑터 절을 따른다.
추후 실제 서버 공유가 필요해져 Route Handler나 외부 API를 도입하게 되면, 그때 입력값 검증·인증·캐시 정책을 다시 정의한다.

# TypeScript 규칙
- 모든 신규 코드는 TypeScript로 작성한다.
- any 사용을 피한다.
- 타입을 피하기 위한 as any, 이중 타입 단언을 사용하지 않는다.
- 외부 입력은 unknown으로 받은 뒤 검증하거나 좁힌다.
- 함수의 입력과 반환 타입을 명확히 한다.
- API 응답 타입을 명시한다.
- 중복 타입은 공통 타입으로 분리한다.
- 문자열 리터럴 집합은 유니온 타입 또는 상수 객체로 관리한다.
- enum은 기존 프로젝트에서 사용하는 경우가 아니면 상수 객체와 유니온 타입을 우선 고려한다.
- 서버 모델과 화면 모델이 다르면 별도의 타입으로 구분한다.
- 타입 오류를 @ts-ignore로 숨기지 않는다.
- 불가피하게 타입 검사 예외가 필요하면 이유를 설명하는 @ts-expect-error를 사용한다.

```
type UserStatus = 'active' | 'inactive' | 'blocked';

interface User {
  id: string;
  name: string;
  status: UserStatus;
}

Props 타입은 컴포넌트 가까이에 정의한다.

interface UserCardProps {
  user: User;
  onSelect?: (userId: string) => void;
}

export function UserCard({ user, onSelect }: UserCardProps) {
  // ...
}
```

# React 컴포넌트 규칙
- 함수형 컴포넌트를 사용한다.
- 컴포넌트는 하나의 명확한 책임을 갖도록 작성한다.
- 페이지 컴포넌트에 지나치게 많은 UI와 로직을 넣지 않는다.
- 파생 가능한 값은 별도의 state로 저장하지 않는다.
- useEffect는 외부 시스템과 동기화할 때만 사용한다.
- 렌더링 중 계산 가능한 값을 useEffect로 갱신하지 않는다.
- 이벤트에서 처리할 수 있는 로직을 useEffect로 옮기지 않는다.
- 최적화 목적이 명확하지 않으면 useMemo와 useCallback을 남용하지 않는다.
- 배열 렌더링 시 안정적인 고유 ID를 key로 사용한다.
- 배열 인덱스를 key로 사용하지 않는다. 단, 목록 순서와 항목이 절대 변경되지 않는 경우는 예외로 한다.
- 컴포넌트 내부에 거대한 조건문이 생기면 하위 컴포넌트 또는 함수로 분리한다.
- props drilling이 짧은 범위라면 불필요하게 전역 상태를 도입하지 않는다.

# 상태관리 원칙

상태는 가능한 한 필요한 위치 가까이에 둔다.
우선순위는 다음과 같다.

- Server Component에서 조회 가능한 서버 데이터
- URL 검색 파라미터로 표현 가능한 상태
- 컴포넌트 로컬 상태
- 여러 컴포넌트가 공유하는 Context
- 프로젝트에서 사용하는 전역 상태관리 도구

다음 상태는 URL로 관리하는 것을 우선 고려한다.

- 검색어
- 필터
- 정렬 기준
- 페이지 번호
- 선택된 탭
- 공유하거나 새로고침 후 유지되어야 하는 상태

서버 데이터를 클라이언트 전역 상태에 무조건 복제하지 않는다.

# 폼 및 입력값 검증
- 서버가 없으므로 클라이언트 검증이 유일한 검증이다. 필수값 누락 등 기본 케이스를 빠짐없이 확인한다.
- 프로젝트에 검증 라이브러리가 설치되어 있으면 기존 방식을 사용한다.
- 오류 메시지는 사용자가 해결 방법을 이해할 수 있도록 작성한다(예: `성함을 입력해주세요`).
- 제출 중 중복 요청을 방지한다.
- 성공, 실패, 처리 중 상태를 명확히 제공한다(토스트 등).

# 스타일링 규칙

현재 프로젝트에서 사용 중인 스타일링 방식을 유지한다.
가능한 방식의 예:

- Tailwind CSS
- CSS Modules
- Sass Modules
- 전역 CSS
- CSS-in-JS
- UI 컴포넌트 라이브러리

서로 다른 스타일링 방식을 임의로 혼합하지 않는다.

공통 원칙
- 인라인 스타일은 동적으로 계산되는 값이 아닌 경우 지양한다.
- 반복되는 스타일은 공통 컴포넌트 또는 스타일로 분리한다.
- 모바일, 태블릿, 데스크톱 화면을 고려한다.
- 긴 텍스트, 빈 데이터, 오류 상태, 로딩 상태를 고려한다.
- 기존 디자인 토큰과 CSS 변수가 있으면 사용한다.
- 임의의 색상, 여백, 폰트 크기를 반복해서 추가하지 않는다.
- 다크 모드를 지원하는 프로젝트라면 새 UI도 다크 모드를 지원한다.

# 접근성 규칙
- 시맨틱 HTML을 우선 사용한다.
- 클릭 기능을 <div>에 구현하지 말고 <button> 또는 적절한 요소를 사용한다.
- 모든 입력 요소에 연결된 label을 제공한다.
- 이미지에 적절한 alt를 제공한다.
- 장식용 이미지는 빈 alt를 사용한다.
- 키보드만으로 주요 기능을 사용할 수 있어야 한다.
- 포커스 표시를 제거하지 않는다.
- 모달과 팝업의 포커스 이동 및 복귀를 고려한다.
- 아이콘만 있는 버튼에는 접근 가능한 이름을 제공한다.
- 색상만으로 상태를 구분하지 않는다.
- 오류 메시지는 입력 요소와 연결한다.
- ARIA 속성은 시맨틱 HTML만으로 해결할 수 없을 때 사용한다.

# Import 규칙

프로젝트의 경로 별칭이 설정되어 있다면 별칭을 우선 사용한다.

```
import { Button } from '@/components/ui/Button';
import { getUser } from '@/features/user/services/get-user';
```

과도하게 깊은 상대 경로는 피한다.

// 지양
import { Button } from '../../../../components/ui/Button';

Import는 일반적으로 다음 순서로 정리한다.

- React 및 Next.js
- 외부 라이브러리
- 프로젝트 절대 경로
- 상대 경로
- 타입
- 스타일

프로젝트의 ESLint 또는 formatter 규칙이 있다면 해당 규칙을 우선한다.
순환 참조가 발생하지 않도록 주의한다.

# 주석 및 문서화

주석은 코드가 무엇을 하는지가 아니라 왜 그렇게 작성했는지를 설명한다.
불필요한 주석은 작성하지 않는다.

```
// 사용자 삭제
await deleteUser(userId);
```

위와 같이 코드만 반복하는 주석은 사용하지 않는다.

다음 항목은 필요한 경우 문서화한다.

- 복잡한 비즈니스 규칙
- 일반적이지 않은 기술 선택
- 외부 시스템 제약사항
- 캐시 정책의 이유
- 보안 관련 예외 처리
- 우회 구현과 제거 조건
- 공개 함수의 중요한 입력 및 반환 조건

TODO를 작성한다면 구체적인 작업과 이유를 함께 남긴다.
```
// TODO: RSVP/방명록을 진짜 서버 공유로 바꾸면(react.md §7 옵션 B) localStorage 어댑터를 KV 기반으로 교체한다.
```