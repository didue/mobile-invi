
# 목표 및 제약
이 문서는 `.claude/rules/reference/wedding-invitation.html`과 픽셀 단위로 동일한 결과물을
Next.js 프로젝트로 구현하기 위한 완전한 명세다. 이 문서만 보고 처음부터 끝까지 재현할 수 있어야 한다.

- 동일 결과: 레이아웃·색상·폰트·애니메이션·인터랙션이 원본 HTML과 동일해야 한다.
- 모바일 전용 UI: 최대 폭 480px 중앙 정렬 카드형(.app). 481px 이상에서 그림자만 추가.
- 단일 페이지: 라우팅 없음. 하나의 스크롤 페이지에 모든 섹션.
- 클라이언트 전용: 애니메이션·업로드·스토리지가 전부 브라우저에서 동작 → 최상위 컴포넌트는 'use client'.
- 정적 배포 가능: next export(output: 'export') 호환. 서버 API 불필요(스토리지 어댑터로 대체, §7).

## 폰트
`app/layout.tsx` `<head>`에 원본과 동일하게 Google Fonts 로드(next/font 대신 link 태그 유지가 안전):

```
Nanum Myeongjo (400,700,800), Noto Sans KR (300,400,500,700), Dancing Script (500,700)
```

preconnect 2줄 포함.

## 뷰 포트
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
→ App Router에서는 export const viewport = { width:'device-width', initialScale:1, maximumScale:1 } 로 지정.

## 상수 및 데이터
- 화면에 표시하는 정보는 `src/data/wedding.ts`의 상수를 참조한다.

---

## 스타일 (globals.css)

**원본 `<style>` 블록 전체를 그대로 이식한다.** 아래는 반드시 유지할 핵심 규칙 요약(누락 방지용 체크리스트):

- CSS 변수(:root): `--bg:#FFFFFF; --blush:#FCE8EA; --pink-soft:#FBD3D9; --pink:#F7B4BD; --rose:#F59AA5; --rose-deep:#C15A68; --ink:#3A322E; --ink-soft:#9C8F94;`
- `html,body`: 배경 `var(--blush)`, `Noto Sans KR` 300, `overflow-x:hidden`, 스크롤바 숨김(webkit/ms/firefox).
- `.app`: `max-width:480px; margin:0 auto; background:#fff; min-height:100vh;` / `@media(min-width:481px)` 그림자.
- `.serif` = Nanum Myeongjo. `section{ padding:72px 32px; }`
- **reveal 애니메이션**: `.reveal{opacity:0;transform:translateY(24px);transition:.9s}` → `.show` 로 노출.
- `.hero` `min-height:100svh`, 방사형 그라디언트 배경(`.hero-bg`), `.eyebrow`(letter-spacing 0.35em).
- **아치 커버**: `.hero-arch{ width:80%; aspect-ratio:3/4.3; border-radius:50% 50% 0 0 / 24% 24% 0 0; box-shadow:0 18px 40px -20px rgba(193,90,104,.35);}`
- **눈꽃**: `.snowflake` + `@keyframes snowfall{0%{translateY(-10%)...opacity:0}12%{opacity:.9}100%{translateY(560%) translateX(var(--drift));opacity:.3}}`
- `.dday-cell`, `.dday-num`(Nanum, 22px, rose-deep).
- 달력 `.cal-grid`(7열 grid), `.cal-dow.sun`/`.cal-day.sun` 붉은색, `.cal-day.muted`(회색 #DCD5CE), `.cal-day.highlight`(rose 배경 흰글씨).
- `.msg-body`(line-height 2.05), `.signature`(Nanum).
- `.profile-photo`(112px, aspect 1/1, dashed 테두리, cursor pointer), `.plus`.
- **연락처/버튼**: `.contact-btn`(라운드, pink 테두리), `.contact-btn.fill`(rose 배경), `.contact-btn.kakao`(#FEE500).
- **아코디언**: `.acc-group`(라운드 박스), `.acc-body{max-height:0;transition:.35s}`, `.acc-group.open .acc-body{max-height:600px}`.
- **갤러리**: `.gallery-carousel`(flex, scroll-snap-x, `margin:0 -32px;padding:0 32px`), `.gallery-page`(2x2 grid), `.g-slot`(aspect 1/1, dashed), `.gallery-dots span.active`.
- **인포카드/지도**: `.info-card`, `.info-date`(Nanum 24px), `.map-btn`, `.transit`.
- **폼/모달**: `.field input/textarea`, `.seg button.active`(rose), `.stepper`, `.submit-btn`(rose).
- `.modal-overlay{position:fixed;inset:0;background:rgba(58,50,46,.45);display:none;align-items:flex-end}` `.show{display:flex}`, `.modal-sheet`(하단 시트, `border-radius:22px 22px 0 0`, `@keyframes sheetUp`, `env(safe-area-inset-bottom)`).
- **줌 방지 blur**: `body.zoom-blur{filter:blur(14px)!important}`.
- **캡처 방지**: `img,.g-slot,.hero-arch{ user-select:none; -webkit-touch-callout:none; -webkit-user-drag:none; }`
- **라이트박스**: `.lightbox-overlay`(z-index 80, 어두운 배경), `.lightbox-stage img{max-width:88%;max-height:78%}`, `.lightbox-arrow`, `.lightbox-count`.
- **방명록**: `.gb-list`(max-height 320 스크롤), `.gb-item`, `.gb-empty`.
- **탭바**: `.tab-btn.active::after`(밑줄), `.tab-panel.active{display:block}`.
- `footer`, `.toast{position:fixed;bottom:26px;left:50%;transform:translateX(-50%)...}` `.show{opacity:.94}`.
- **인트로**: `.intro-overlay{position:fixed;background:rgba(20,24,18,.72);z-index:100;transition:opacity .9s}` `.hide{opacity:0}`, `.intro-text{font-family:'Dancing Script';font-size:38px;clip-path:inset(0 100% 0 0);transition:clip-path 1.5s cubic-bezier(.4,0,.2,1)}` `.write{clip-path:inset(0 0% 0 0)}`.

> React에서 `onClick` 등 인라인 핸들러를 쓰되, **클래스명/구조는 원본 DOM과 동일**하게 유지해야 CSS가 그대로 먹는다.

---

## 5. 컴포넌트별 동작 명세

### 5.1 IntroOverlay
- 마운트 후 타이머로 애니메이션. 문구: `we are<br>getting married`.
- 시퀀스: `350ms` 뒤 `.write` 추가(필기체 드러남) → `350+1500+2000ms` 뒤 `.hide` → `+900ms` 뒤 `display:none`.
- React: `useEffect`에서 `setTimeout` 3개, state로 클래스 토글.
- 메인 이미지 `src/assets/images/HJ2_7118.jpg`를 활용하여 모바일 디바이스 높이 full사이즈 배경 이미지 적용.

### 5.2 Hero
- `.hero-arch` 안에 `<img src={HERO_IMAGE}>` + `.snow-layer`.
- 눈꽃 24개 동적 생성: 각 flake `left`=rand 0~100%, `fontSize`=9~18px, `animationDuration`=7~14s, `animationDelay`=`-`(0~10)s, `--drift`=(-25~25)px. 텍스트 `❄`.
  - React: `useEffect`에서 24개 배열 만들어 렌더하거나 DOM append. **랜덤값은 마운트 시 1회 고정**(SSR 불일치 방지 위해 `useEffect` 내부에서만 생성).
- 이름: `.names`(배정근 / & / 한지수), 날짜: `2027. 01. 09. SAT · 오후 12시 40분`, `.scroll-cue`(SCROLL, 애니메이션 바).

### 5.3 WeddingDay
- **D-day**: `renderDday()`를 `setInterval(...,1000)`로. `diff = WEDDING_DATE - now`.
  - diff>0: `[{DAYS},{HOURS 2자리},{MIN 2자리},{SEC 2자리}]`.
  - diff<=0: `[{n:'💐', l:'WEDDING DAY'}]`.
  - React: `useState`로 cells, `useEffect` interval, 언마운트 clear.
- **달력**: 2027년 1월(제목 `2027 · JANUARY`). 그리드 셀은 원본 그대로 하드코딩(전월 27~31 muted, 1~31, 익월 1~6 muted). 9일 = `.highlight`. 일요일 위치 = `.sun`.

### 5.4 Invitation
- 초대 문구(`.msg-body`, `<b>새로운 하루</b>` 볼드), 서명 2줄, divider SVG(원본 path 그대로).

### 5.5 Profiles
- 2열. 각 열: 프로필 사진(label+file input) / role / name(Nanum) / rel(줄바꿈).
- 사진 업로드 → 캔버스 리사이즈(maxW 600, jpeg 0.78) → `storage.set('profile:'+key, dataUrl, true)`, 토스트 `프로필 사진이 저장되었어요`.
- 마운트 시 `storage.get('profile:'+key)` 있으면 이미지 표시.
- 하단에 `연락하기` 버튼 → ContactModal 오픈.

### 5.6 Gallery
- 업로드 기능 없음(읽기 전용). 슬롯 개수 = `src/data/wedding.ts`의 `GALLERY` 배열 길이, 페이지당 4개(`PER_PAGE=4`) → 캐러셀(2x2 페이지).
- 각 슬롯은 `GALLERY[i]` 경로를 `next/image`로 렌더링. 클릭 시 라이트박스 오픈.
- 캐러셀 스크롤 시 dots active 갱신, `‹ ›` 버튼으로 `scrollBy(±clientWidth)`.
- 라이트박스: `GALLERY` 순서 그대로, `‹ ›`/스와이프(터치 50px)/오버레이 클릭 닫기, `pos+1 / total` 카운트.

### 5.7 MapSection
- 인포카드 텍스트(§3) + 지도 일러스트 SVG(원본 그대로) + 3개 지도앱 링크(a target=_blank) + 교통 3줄.

### 5.8 Rsvp
- `참석여부 알리기` 버튼 → RsvpModal. 제출 후 `.rsvp-status`에 `${name}님, 회답이 전달되었어요 (${attend} · ${count}명)`.

### 5.9 RsvpModal
- 필드: 성함(text), 참석여부 seg(참석/불참, 기본 참석), 인원 stepper(1~10, 기본 1), 신랑측/신부측 seg(기본 신랑측).
- 제출: 성함 없으면 토스트 `성함을 입력해주세요`. 있으면 `storage.set('rsvp:'+Date.now(), JSON.stringify({name,attend,count,side,time:ISO}), true)`.
- 성공 시 `.thanks-msg` 표시, 상태 텍스트 갱신, 토스트 `회답이 전달되었어요`, 900ms 뒤 모달 닫고 초기화.
- 닫기: ✕ 버튼 / 오버레이 클릭.

### 5.10 Gift
- 아코디언 2개(신랑측/신부측). 헤더 클릭 시 `.open` 토글(`toggleAcc`).
- 각 행: 이름+tag / `계좌 복사`(fill) + `카카오로 보내기`(kakao).
- 계좌 복사: `navigator.clipboard.writeText(`${account} (${name})`)` → 토스트 `${name}님의 계좌번호가 복사되었어요` / 실패 `복사에 실패했어요`.
- 카카오로 보내기: 텍스트 `[배정근 ♥ 한지수 결혼합니다]\n마음 전하실 곳 - ${name}\n${account}`.
  `navigator.share` 있으면 공유시트(취소 시 무동작), 없으면 클립보드 복사 + 토스트 `카카오톡에 붙여넣을 내용이 복사됐어요`.
- 하단 안내문: `계좌 복사를 누르면 계좌번호가 복사되고, 카카오로 보내기는 공유 시트를 열어요`.

### 5.11 ContactModal
- 탭(신랑측/신부측). 각 행: `전화하기`(tel:) / `문자하기`(fill, sms:).
- 탭 전환은 스코프 내에서 active 토글. 닫기 ✕/오버레이.

### 5.12 Guestbook
- 폼: 성함(text) + 축하 메시지(textarea) + `메시지 남기기` 버튼.
- 제출: 둘 중 하나라도 비면 토스트 `이름과 메시지를 모두 입력해주세요`.
  `storage.set('guestbook:'+Date.now(), JSON.stringify({name,msg,time:ISO}), true)` → 입력 초기화, 토스트 `메시지가 등록되었어요`, 목록 새로고침.
- 목록: `storage.list('guestbook:', true)` → 각 get → `time` 최신순 정렬 → `.gb-item`(이름 / `M.D` / 메시지). 비면 `첫 번째 축하 메시지를 남겨주세요 🤍`.
- **XSS 방지**: 원본은 `escapeHtml` 사용. React는 기본 이스케이프되므로 `{it.name}`, `{it.msg}` 그대로 렌더하면 됨(dangerouslySetInnerHTML 금지).
- `formatTime(iso)` = `${month+1}.${date}`.

### 5.13 Notice
- 3슬라이드 캐러셀(스크롤 스냅) + dots + `‹ ›`. 슬라이드1은 안내 리스트(번호 01~04), 2·3은 `추후 업데이트될 예정입니다.`
  (원본은 `.notice-carousel` 사용 — 갤러리와 동일한 스크롤/도트 패턴.)

### 5.14 Footer
- `Thank you`(Nanum) + `저희의 새로운 시작을 함께해주셔서 진심으로 감사합니다.`

---

## 6. 전역 이펙트 (page.tsx의 useEffect)

원본의 문서 레벨 리스너들을 마운트 시 등록/언마운트 시 해제:

1. **reveal**: `.reveal` 요소를 IntersectionObserver(threshold 0.15)로 관찰 → 진입 시 `.show` 추가 후 unobserve. (`lib/useReveal.ts` 훅으로 캡슐화, 각 섹션 ref 등록)
2. **핀치줌 방지 + blur**:
   - `gesturestart/gesturechange/gestureend`: `preventDefault`, start시 `body.zoom-blur` 추가/ end시 제거.
   - `touchmove`(passive:false): `touches.length>1`이면 `preventDefault` + blur.
   - `touchend`: 손가락 2개 미만이면 blur 제거.
3. **캡처/저장 방지**:
   - `contextmenu` → `preventDefault`.
   - `dragstart` → IMG면 `preventDefault`.
   - `visibilitychange` → 숨김이면 `body.zoom-blur` 추가, 복귀 시 제거.
4. **인트로**: IntroOverlay 내부에서 처리(§5.1).

> 이 리스너들은 반드시 클라이언트에서만(`useEffect`) 등록. `document`/`window` 접근이 SSR에서 터지지 않도록 주의.

---

## 7. 스토리지 어댑터 (lib/storage.ts)

원본은 아티팩트 런타임이 주입하는 `window.storage`(key-value, `shared` 플래그, 5MB/키) API를 사용한다.
Next.js에는 이 API가 없으므로 **동일 인터페이스의 어댑터**를 만든다:

```ts
// 인터페이스: get(key, shared?) / set(key, value, shared?) / list(prefix?, shared?) / delete(key, shared?)
// 반환 형태: get → {key,value,shared}|null ,  set → {key,value,shared} ,  list → {keys:[]}
```

구현 옵션(둘 중 선택, 기본은 A):

- **A. localStorage 폴백(정적 배포·기본값)**: 모든 값을 `localStorage`에 저장.
  - 주의: 원본 `shared:true`(모든 방문자 공유) 시맨틱은 localStorage로는 “같은 브라우저 내 공유”로만 재현된다.
    RSVP/방명록/갤러리를 **진짜 서버 공유**로 만들려면 옵션 B 필요.
- **B. 서버 KV(진짜 공유)**: `output:'export'`를 포기하고 Route Handler(`app/api/kv/route.ts`) + KV(Upstash Redis, Vercel KV, SQLite 등)로 구현.
  - `get/set/list/delete`를 fetch로 위임. 이때 `next.config`의 `output:'export'` 제거.

원본 헬퍼(`storeGet/storeSet/storeList`)와 동일하게 try/catch로 감싸고, set 실패 시 토스트 `저장에 실패했어요. 다시 시도해주세요.`.

스토리지 키 규칙(원본과 동일 유지):
```
profile:groom / profile:bride      (shared:true)
rsvp:{timestamp}                   (shared:true)
guestbook:{timestamp}             (shared:true)
```

---

## 8. 토스트 (lib/toast.ts + Toast.tsx)

- 전역 단일 토스트. 아무 컴포넌트에서 `toast('메시지')` 호출.
- 구현: 간단한 이벤트버스(CustomEvent) 또는 React Context. `.toast.show` 1800ms 후 자동 해제.

---

## 9. 이미지 리사이즈 유틸 (공통)

프로필 사진 업로드에 사용하는 함수(갤러리는 업로드가 없으므로 해당 없음):
```
FileReader.readAsDataURL → new Image → canvas(maxW로 스케일, jpeg quality 0.78) → dataUrl
```
- 프로필 maxW=600, quality 0.78.

---

## 10. 검증 체크리스트 (완료 기준)

- [ ] 인트로 오버레이가 필기체로 쓰이고 약 3.85초 후 사라진다.
- [ ] 히어로 아치 사진(원본 base64)과 눈꽃 24개가 떨어진다.
- [ ] D-day가 1초마다 갱신되고, 예식일 이후엔 💐 WEDDING DAY 표시.
- [ ] 2027년 1월 달력에서 9일이 rose로 강조.
- [ ] 스크롤 시 각 섹션이 아래에서 위로 페이드인(reveal).
- [ ] 프로필 사진 업로드 후 새로고침해도 유지(스토리지).
- [ ] 갤러리 캐러셀 스와이프/화살표/도트, 사진 클릭 시 라이트박스(스와이프 이동).
- [ ] 지도앱 3버튼 링크가 주소 인코딩되어 열린다.
- [ ] RSVP 모달 제출 → 상태 텍스트 갱신 + 저장.
- [ ] 마음 전하실 곳 아코디언 토글, 계좌 복사/카카오 공유 동작.
- [ ] 방명록 등록/목록/최신순 정렬/빈 상태 문구.
- [ ] 연락하기 모달 탭 전환, tel/sms 링크.
- [ ] 안내사항 3슬라이드 캐러셀.
- [ ] 핀치줌 시 화면 blur, 우클릭/드래그/탭전환 시 캡처 방지 blur.
- [ ] 481px 이상에서 카드 그림자, 그 외 480px 폭 유지.

---

## 11. 이식 시 주의점 (Hydration / SSR)

- 랜덤(눈꽃) · `Date.now()` · `window/document` 접근은 전부 `useEffect` 내부에서만.
- 최상위 페이지에 `'use client'`. 스토리지·업로드·모달 전부 클라이언트 상태.
- `dangerouslySetInnerHTML` 사용 금지(방명록은 React 기본 이스케이프로 충분).
- 클래스명은 원본과 1:1로 유지(globals.css 재사용 위해). 구조를 바꾸지 말 것.
