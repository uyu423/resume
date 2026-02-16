# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Next.js 기반 정적 웹 이력서 생성기. `payload/` 디렉토리의 데이터 파일만 수정하면 개인 웹 이력서를 만들 수 있다.

## Commands

```bash
npm run dev          # 개발 서버 (localhost:3000)
npm run build        # 프로덕션 빌드
npm run export       # Static HTML 생성 → docs/ (clean → build → next export → shellwork.js)
npm run lint         # ESLint (component, pages, payload 대상, --fix 포함)
```

- Node.js 버전: `.nvmrc` 참고 (24.13.0). `--openssl-legacy-provider` 옵션이 이미 npm scripts에 포함됨.
- 테스트 스위트 없음.

## Architecture

### 데이터 흐름: Payload → Component → Page

1. **`payload/*.ts`** — 이력서 데이터 (profile, experience, skill 등). 각 파일이 하나의 섹션 데이터를 export.
2. **`payload/index.ts`** — 모든 payload를 집계하여 단일 `Payload` 객체로 export.
3. **`pages/index.tsx`** — 유일한 페이지. `Payload` 객체를 받아 각 섹션 컴포넌트를 순서대로 렌더링. 섹션 순서를 변경하려면 이 파일의 렌더링 순서를 수정해야 함.

### Component 구조

각 섹션은 `component/<section>/` 디렉토리에 동일한 패턴으로 구성:
- **`I<Section>.ts`** — TypeScript namespace로 Payload 인터페이스 정의. `ICommon.Payload`를 extends하여 `disable?: boolean` 필드를 공통 제공.
- **`index.tsx`** — 섹션 렌더링 컴포넌트. `<Section>.Component`로 export.

### 주요 공통 모듈 (`component/common/`)

- **`PreProcessingComponent.tsx`** — `disable` 플래그 체크하여 조건부 렌더링하는 전처리기.
- **`Util.ts`** — luxon 기반 날짜/기간 포맷팅. debug 채널은 `yosume:*` 네임스페이스 사용.
- **`Style.ts`** — 전역 CSS 스타일 상수. 기본 폰트: Pretendard.
- **`IGlobal.ts`** — headTitle, favicon, SEO(next-seo) 설정.

### Static Export & GitHub Pages

- `npm run export` → `docs/` 디렉토리에 Static HTML 생성.
- `shellwork.js` (postexport) — `docs/.nojekyll` 생성 및 `package.json`의 `homepage` 필드 기반 `docs/CNAME` 조건부 생성.
- `next.config.js` — `homepage`에 subpath가 있으면 자동으로 `assetPrefix` 적용.

## Conventions

- ESLint: airbnb + TypeScript + Prettier. 싱글 쿼트 사용.
- 컴포넌트 인터페이스는 TypeScript `declare namespace` 패턴 사용 (e.g., `IExperience.Payload`).
- UI: reactstrap (Bootstrap 4) + styled-components. FontAwesome 아이콘.
- 날짜 형식: `YYYY-MM` (e.g., `"2018-02"`). luxon으로 파싱/포맷.
