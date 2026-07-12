# CLAUDE.md

# 프로젝트 개요
이 프로젝트는 Next.js App router와 Typescript를 사용하는 웹 애플리케이션이다.

프로젝트 작업 전 다음 파일을 우선 확인한다.

프로젝트 설명: @README.md
의존성 및 실행 명령어: @package.json
TypeScript 설정: @tsconfig.json
Next.js 설정: @next.config.ts
환경변수 예시: @.env.example

package.json, 기존 소스 코드, 설정 파일을 프로젝트의 최종 기준으로 사용한다.
이 문서와 실제 프로젝트 설정이 다를 경우 실제 설정을 우선하되, 차이가 크다면 작업 결과에 명시한다

## 현재 진행 상태
기존 CRA(Create React App) 기반 청첩장 앱을 삭제하고 Next.js App Router + TypeScript로 재구축하는 중이다. 작업을 시작하기 전에 아래 사실을 확인한다.

- 위 "우선 확인" 파일들(package.json, tsconfig.json, next.config.ts, README.md, .env.example)은 아직 생성되지 않았다. Next.js 스캐폴딩(`create-next-app` 등)이 완료되기 전까지 npm install/test/build/lint 명령은 동작하지 않는다.

## 기본 작업 원칙
- 아래 `디렉토리 구조`를 확인하여 `.claude/rules` 경로 하위에 있는 md파일의 요청받은 범위 안에서만 수정한다.
- 기존 코드의 구조, 네이밍, 스타일을 우선 존중한다.
- 관련 없는 코드까지 임의로 리팩터링하지 않는다.
- 기존 동작을 변경해야 할 경우 변경 이유와 영향 범위를 확인한다.
- 새로운 라이브러리를 추가하기 전에 기존 의존성으로 구현 가능한지 확인한다.
- 패키지를 임의로 설치하거나 버전을 변경하지 않는다.
- 설정 파일을 변경할 때는 변경 목적과 영향을 명확히 한다.
- 삭제보다는 기존 코드를 활용하거나 최소 범위로 수정한다.
- 임시 코드, 주석 처리된 코드, 사용하지 않는 코드를 남기지 않는다.
- 요구사항이 불명확하더라도 기존 코드에서 의도를 추론하여 가장 보수적으로 구현한다.
- 작업을 완료하기 전에 타입 검사, 린트, 테스트, 빌드를 수행한다.
- 작업을 완료 후에는 `npm run start`를 통하여 로컬 웹 브라우저로 결과를 확인할 수 있도록 서버를 실행한다.

## 기술 스택 기준
- next.js
- app router
- react
- typescript
- server components
- eslint
- 프로젝트에 설정된 스타일링 도구
- 프로젝트에 설치된 테스트 도구

특정 라이브러리의 사용 여부와 버전은 추측하지 말고 package.json에서 확인한다.
예를 들어 다음 도구는 설치된 경우에만 사용한다.

- Tailwind CSS
- Zustand
- Redux Toolkit
- TanStack Query
- React Hook Form
- Zod
- Vitest
- Jest
- Playwright
- Storybook

## 디렉토리 구조
project/
   CLAUDE.md              ← 핵심 지침 (간결하게)
  .claude/rules/
    code-style.md      ← 코드 스타일 규칙
    testing.md          ← 테스트 규칙
    security.md         ← 보안 요구사항
    frontend/
      react.md        ← 프론트엔드 규칙
    backend/
      api-design.md   ← API 설계 규칙
  src
    app
      routes
      api
      layout.tsx
      page.tsx
      loading.tsx
      error.tsx
      not-found.tsx
      globals.css
    components
    features
  lib
  services
  hooks
  types
  utils
  constants
  assets
    images
    styles

디렉터리 역할
- app: 라우트, 레이아웃, 페이지, Route Handler
- components/ui: 재사용 가능한 기본 UI 컴포넌트
- components/common: 여러 기능에서 공통으로 사용하는 컴포넌트
- components/layout: Header, Footer, Sidebar 등 레이아웃 컴포넌트
- features: 특정 비즈니스 기능 단위의 코드
- lib: 외부 라이브러리 설정, 서버 유틸리티, 공통 인스턴스
- services: 외부 API 또는 백엔드 통신 로직
- hooks: 여러 기능에서 공유하는 Client Hook
- types: 전역 공통 타입
- utils: 순수 유틸리티 함수
- constants: 공통 상수
- assets/images : 이미지 요소
- assets/styles : css 스타일 요소

라우트에서만 사용하는 컴포넌트는 해당 라우트 디렉터리에 함께 배치할 수 있다.
여러 라우트에서 재사용되는 경우에만 공통 디렉터리로 이동한다.

## 빌드 및 테스트
- 패키지 매니저 : npm
- 설치: npm install 
- 테스트 : npm test
- 로컬 실행 : npm run start
- 빌드 : npm run build
- 린트 : npm run lint

## 워크플로우 
- 커밋 전 : npm run lint && npm test
- 브랜치 : feature/설명 형식
- import : 알파벳 순으로 정렬

## 금지사항
- .env, .env.local 파일 절대 수정 금지

