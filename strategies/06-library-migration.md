# 라이브러리 마이그레이션 방안

> 작성일: 2026-02-17
> 대상 프로젝트: resume-nextjs (Next.js 기반 정적 웹 이력서 생성기)

---

## 1. 마이그레이션 대상 개요

| # | 현재 라이브러리 | 현재 버전 | 상태 | 마이그레이션 유형 |
|---|---------------|----------|------|-----------------|
| 1 | Next.js | 10.2.3 | EOL | 버전 업그레이드 |
| 2 | React | 17.0.2 | EOL | 버전 업그레이드 |
| 3 | TypeScript | 4.9.5 | EOL | 버전 업그레이드 |
| 4 | Bootstrap 4 + reactstrap 8 | 4.6.0 / 8.9.0 | 구버전 | **대체 또는 업그레이드** |
| 5 | styled-components | 5.3.1 | 유지보수 모드 | **제거** (미사용) |
| 6 | next-images | 1.8.1 | deprecated | **제거** (빌트인 대체) |
| 7 | next-seo | 4.26.0 | 구버전 | **대체 또는 업그레이드** |
| 8 | luxon | 1.28.0 | 구버전 | **대체 또는 업그레이드** |
| 9 | FontAwesome 5 | 5.15.4 | EOL | **대체 또는 업그레이드** |
| 10 | ESLint 6 + Prettier 1.x | 6.8.0 / 1.19.1 | EOL | 버전 업그레이드 + 설정 재작성 |
| 11 | jQuery (slim) | 3.6.0 | 레거시 | **제거** |

---

## 2. UI 프레임워크: Bootstrap 4 + reactstrap 8

### 2.1 대체 후보 비교

| 기준 | 옵션 A: Bootstrap 5 + reactstrap 9 | 옵션 B: Tailwind CSS + shadcn/ui | 옵션 C: Bootstrap 5 + react-bootstrap |
|------|-----------------------------------|----------------------------------|---------------------------------------|
| **마이그레이션 비용** | 🟢 낮음 | 🔴 높음 | 🟡 중간 |
| **API 변경** | 클래스명 일부 변경 (`ml-`→`ms-` 등) | 전체 재작성 (유틸리티 클래스) | 컴포넌트 API 유사하나 props 차이 |
| **jQuery 제거** | ✅ 가능 | ✅ 불필요 | ✅ 가능 |
| **번들 사이즈** | ~25KB (PurgeCSS 시) | ~10KB (JIT) | ~25KB |
| **2026 생태계** | 안정적, 유지보수 | 🔥 최대 성장세, 2026 트렌드 | 안정적 |
| **학습 곡선** | 🟢 최소 | 🔴 높음 (유틸리티 퍼스트 패러다임) | 🟢 낮음 |
| **디자인 자유도** | 중간 (Bootstrap 테마 의존) | 매우 높음 (완전 커스텀) | 중간 |
| **포트폴리오/이력서 생태계** | 일반적 | 풍부한 포트폴리오 템플릿 다수 | 일반적 |

### 2.2 각 옵션의 마이그레이션 상세

#### 옵션 A: Bootstrap 5 + reactstrap 9 (권장 — 최소 비용)

**난이도**: 🟢 하

**작업 범위**:
1. `bootstrap` 4.6.0 → 5.3.x, `reactstrap` 8.9.0 → 9.2.3 업데이트
2. `pages/_app.tsx:1` — `import 'jquery/dist/jquery.slim'` 제거
3. Bootstrap 5 클래스명 마이그레이션:
   - `ml-*` → `ms-*`, `mr-*` → `me-*` (margin)
   - `pl-*` → `ps-*`, `pr-*` → `pe-*` (padding)
   - `text-left` → `text-start`, `text-right` → `text-end`
   - `font-weight-*` → `fw-*`

**영향 파일** (검색 기반):
- `component/profile/index.tsx:43` — `text-md-left` → `text-md-start`
- `component/profile/contact.tsx:12` — `text-right` → `text-end`
- `component/experience/row.tsx:62,84` — `text-md-right` → `text-md-end`
- `component/experience/row.tsx:70,74,149` — `ml-1` → `ms-1`
- `component/skill/row.tsx:29` — `text-md-right` → `text-md-end`
- `component/common/CommonRow.tsx:19` — `text-md-right` → `text-md-end`
- `component/introduce/index.tsx:39,47` — `text-right` → `text-end`
- `component/footer/index.tsx:16` — `text-center` (변경 없음)

**Breaking Changes**:
- reactstrap 9에서 일부 컴포넌트 prop 이름 변경 가능
- Bootstrap 5에서 `data-*` 속성이 `data-bs-*`로 변경 (JS 기능 사용 시)

**장점**: 최소 비용으로 jQuery 제거 + 모던 Bootstrap 전환
**단점**: Bootstrap의 디자인 제약은 유지됨

#### 옵션 B: Tailwind CSS + shadcn/ui (장기 비전)

**난이도**: 🔴 상

**작업 범위**:
1. Tailwind CSS 설치 및 설정 (`tailwind.config.ts`, PostCSS)
2. shadcn/ui 초기화 (`npx shadcn-ui@latest init`)
3. **모든 컴포넌트 마크업 전면 재작성** (~23개 TSX 파일)
4. Bootstrap CSS 및 reactstrap 완전 제거
5. 반응형 브레이크포인트 재설정

**장점**:
- 2026년 기준 최신 트렌드, 풍부한 포트폴리오 템플릿 생태계
- 번들 사이즈 최소화 (JIT 컴파일, 미사용 스타일 자동 제거)
- 디자인 자유도 극대화, UI/UX 개선과 동시 진행 가능
- shadcn/ui는 소스 코드 직접 소유 → vendor lock-in 없음

**단점**:
- 전체 마크업 재작성 필요 (비용 매우 높음)
- 유틸리티 퍼스트 패러다임 학습 필요
- 기존 레이아웃과 1:1 대응이 아닌 UI 재설계 수반

#### 옵션 C: Bootstrap 5 + react-bootstrap

**난이도**: 🟡 중

**작업 범위**:
1. reactstrap → react-bootstrap 컴포넌트 API 전환
2. import 경로 및 컴포넌트 이름 변경
3. reactstrap 전용 prop → react-bootstrap prop 매핑

**장점**: react-bootstrap이 reactstrap보다 활발한 유지보수
**단점**: 옵션 A 대비 추가 마이그레이션 비용 발생, 실질적 이점 제한적

### 2.3 권장 결정

| 시나리오 | 권장 옵션 |
|---------|----------|
| **최소 비용, 빠른 전환** | ✅ 옵션 A: Bootstrap 5 + reactstrap 9 |
| **UI/UX 전면 개편 시** | 옵션 B: Tailwind CSS + shadcn/ui |
| **중간 선택지** (비권장) | 옵션 C: react-bootstrap |

**최종 권장**: **옵션 A**를 기본으로 진행하고, 향후 UI/UX 대규모 개편 시 옵션 B를 별도 프로젝트로 검토

---

## 3. CSS-in-JS: styled-components 5

### 3.1 현황

- **프로젝트 내 사용 현황**: `import styled` 사용 **0건** (코드베이스 전체 검색 결과)
- **styled-components 상태**: 2025년 공식 유지보수 모드(maintenance mode) 진입. 신규 기능/메이저 업데이트 없음
- **현재 스타일링 방식**: `component/common/Style.ts`에서 `CSSProperties` 인라인 객체 사용 + Bootstrap 클래스

### 3.2 대체 후보 비교

| 기준 | 옵션 A: 제거 (현상 유지) | 옵션 B: CSS Modules | 옵션 C: Tailwind CSS |
|------|----------------------|-------------------|---------------------|
| **비용** | 🟢 제로 | 🟡 중간 | 🔴 높음 |
| **번들 영향** | ~15KB 절감 | 런타임 비용 제로 | 런타임 비용 제로 |
| **마이그레이션** | package.json만 수정 | 인라인 스타일 → .module.css 전환 | 전면 마크업 재작성 |

### 3.3 권장 결정

**✅ 옵션 A: 즉시 제거**

근거:
- 프로젝트에서 사용하지 않는 의존성 → 제거만으로 번들 최적화
- `@types/styled-components` (devDependencies)도 함께 제거

**작업 범위**:
```bash
npm uninstall styled-components @types/styled-components
```

**난이도**: 🟢 하 (1분)
**주의사항**: 없음 (미사용 확인 완료)

---

## 4. 이미지 처리: next-images 1.8.1

### 4.1 현황

- `next-images`는 Next.js 10 시절 이미지 import를 위해 사용
- Next.js 11+에서 `next/image` 빌트인 제공 이후 deprecated
- 현재 사용처: `next.config.js:2` — `const withImages = require('next-images')`

### 4.2 대체 방안

| 기준 | 옵션 A: next/image 빌트인 | 옵션 B: Static import (Webpack/Turbopack) |
|------|-------------------------|----------------------------------------|
| **이미지 최적화** | ✅ WebP/AVIF 자동 변환 | ❌ 원본 그대로 |
| **Static Export 호환** | ⚠️ `unoptimized: true` 필요 | ✅ 완전 호환 |
| **마이그레이션 비용** | 🟡 중간 | 🟢 낮음 |

### 4.3 권장 결정

**✅ 옵션 B: next-images 제거 + 기본 이미지 import 유지**

근거:
- Static export (`output: 'export'`) 환경에서 `next/image`의 이미지 최적화는 제한적
- Next.js 16+에서는 Turbopack이 기본으로 이미지 import를 처리
- 프로필 이미지 1장 + favicon + preview 이미지 정도로 최적화 필요성 낮음

**작업 범위**:
1. `next.config.js:2` — `const withImages = require('next-images')` 제거
2. `next.config.js:7` — `module.exports = withImages({...})` → `module.exports = {...}` 변경
3. `next-env.d.ts:3` — `/// <reference types="next-images" />` 제거
4. `npm uninstall next-images`
5. 이미지 import가 정상 동작하는지 빌드 검증

**난이도**: 🟢 하
**주의사항**: `payload/profile.ts:6` — `import image from '../asset/sample_tux.png'` 형태의 static import가 Turbopack/Webpack에서 정상 처리되는지 확인 필요. Next.js 12+에서는 기본 지원

---

## 5. SEO: next-seo 4.26.0

### 5.1 대체 후보 비교

| 기준 | 옵션 A: next-seo 7.x 업그레이드 | 옵션 B: Next.js Metadata API (빌트인) | 옵션 C: 수동 `<Head>` 태그 |
|------|-------------------------------|-------------------------------------|--------------------------|
| **호환성** | Pages Router ✅ / App Router ✅ | App Router 전용 | Pages Router ✅ |
| **마이그레이션 비용** | 🔴 높음 (v7 API 전면 변경) | ⚠️ App Router 전환 전제 | 🟡 중간 |
| **외부 의존성** | 있음 | 없음 (빌트인) | 없음 |
| **기능** | JSON-LD, OpenGraph 등 풍부 | 기본 메타데이터, OG 이미지 생성 | 직접 구현 |
| **2026 생태계** | 활발 유지 | Next.js 공식 권장 | - |

### 5.2 이 프로젝트에서의 사용 현황

```tsx
// pages/index.tsx:5,23
import { NextSeo } from 'next-seo';
<NextSeo {...Payload._global.seo} />

// payload/_global.ts:11-33
seo: {
  title, description,
  openGraph: { title, description, images, type: 'profile', profile: { ... } }
}
```

사용하는 기능:
- `title`, `description` 메타 태그
- OpenGraph 메타 태그 (이미지, 프로필 타입)

### 5.3 권장 결정

**✅ 옵션 C: 수동 `<Head>` 태그 (next-seo 제거)**

근거:
- Pages Router를 유지하므로 Metadata API(옵션 B)는 사용 불가
- next-seo 7은 전면 API 재작성으로 마이그레이션 비용이 높음
- 사용하는 기능이 `title` + `description` + `openGraph`뿐이라 `<Head>` 태그로 충분히 구현 가능
- 외부 의존성 1개 제거

**작업 범위**:
1. `pages/index.tsx` — `<NextSeo>` → `<Head>` 내 `<meta>` 태그로 변환
2. `component/common/IGlobal.ts` — `NextSeoProps` 타입 의존성 제거, 자체 인터페이스 정의
3. `payload/_global.ts` — 기존 seo 데이터 구조 유지 (인터페이스만 교체)
4. `npm uninstall next-seo @types/next-seo`

**예시 변환**:
```tsx
// 변환 전
<NextSeo {...Payload._global.seo} />

// 변환 후
<Head>
  <meta name="description" content={seo.description} />
  <meta property="og:title" content={seo.openGraph.title} />
  <meta property="og:description" content={seo.openGraph.description} />
  <meta property="og:image" content={seo.openGraph.images[0].url} />
  <meta property="og:type" content={seo.openGraph.type} />
</Head>
```

**난이도**: 🟡 중
**주의사항**: JSON-LD 구조화 데이터는 현재 사용하지 않으므로 이슈 없음. 향후 App Router 전환 시 Metadata API로 자연스럽게 전환 가능

---

## 6. 날짜 처리: luxon 1.28.0

### 6.1 대체 후보 비교

| 기준 | 옵션 A: luxon 3.x 업그레이드 | 옵션 B: dayjs | 옵션 C: date-fns |
|------|---------------------------|-------------|-----------------|
| **번들 사이즈** | ~23KB gzipped | ~2KB gzipped | ~5KB (tree-shaking) |
| **API 변경** | 🟢 최소 (하위 호환) | 🔴 전면 재작성 (다른 API) | 🔴 전면 재작성 (함수형) |
| **Duration 포맷** | ✅ 내장 (`Duration.toFormat`) | ⚠️ 플러그인 필요 (`duration`) | ⚠️ `intervalToDuration` + 수동 포맷 |
| **타입스크립트** | ✅ 내장 (3.x) | ⚠️ `@types/dayjs` 필요 | ✅ 내장 |
| **i18n** | ✅ Intl 기반 내장 | ⚠️ 플러그인 (`locale`) | ✅ 내장 |
| **2026 트렌드** | 안정적 | 인기 (경량화 수요) | 인기 (모듈성 수요) |

### 6.2 이 프로젝트에서의 사용 패턴

```tsx
// 주요 사용 패턴 (6개 파일에 분산)
DateTime.fromFormat(str, 'yyyy-LL')          // 날짜 파싱
DateTime.toFormat('yyyy. LL')                // 날짜 포맷팅
Duration.toFormat('y년 M개월')                // 기간 포맷팅
DateTime.diff(other, ['years', 'months'])    // 기간 계산
DateTime.local()                              // 현재 시간
DateTime.min(), DateTime.max()               // 날짜 비교
```

**핵심 의존 기능**: `Duration.toFormat()` — 경력 기간을 `"y년 M개월"` 형식으로 포맷팅

### 6.3 권장 결정

**✅ 옵션 A: luxon 3.x 업그레이드**

근거:
- `Duration.toFormat()`이 프로젝트 핵심 기능인데, dayjs/date-fns에서는 동등한 기능을 구현하기 위해 추가 코드 필요
- luxon 1→3 API 변경이 최소 (하위 호환성 높음)
- 번들 사이즈 차이(~20KB)는 정적 사이트에서 실질적 영향 미미
- `@types/luxon` devDependency 제거 가능 (luxon 3에 타입 내장)

**작업 범위**:
1. `npm install luxon@3` (메이저 업데이트)
2. `npm uninstall @types/luxon` (타입 내장)
3. ESM import 방식 확인 (luxon 2+에서 ESM 기본)
4. `component/common/Util.ts` — API 호환 확인 (대부분 동일)

**난이도**: 🟢 하
**주의사항**:
- luxon 2에서 `Settings.throwOnInvalid` 기본값이 `false`로 변경 (기존과 동일)
- luxon 3에서 `Duration.toFormat()`의 동작은 동일

---

## 7. 아이콘: FontAwesome 5

### 7.1 대체 후보 비교

| 기준 | 옵션 A: FontAwesome 6 업그레이드 | 옵션 B: Lucide Icons | 옵션 C: Heroicons |
|------|-------------------------------|---------------------|------------------|
| **아이콘 수** | 2,000+ (무료) / 30,000+ (Pro) | 1,500+ (모두 무료) | 300+ (모두 무료) |
| **번들 사이즈** | 개별 import 시 적음 | ~1KB/아이콘 (SVG) | ~1KB/아이콘 (SVG) |
| **Tree-shaking** | ✅ 개별 import | ✅ 완전 지원 (ES Modules) | ✅ 완전 지원 |
| **React 컴포넌트** | `@fortawesome/react-fontawesome` | `lucide-react` (네이티브) | `@heroicons/react` |
| **마이그레이션 비용** | 🟢 낮음 (아이콘 이름 일부 변경) | 🟡 중간 (전체 import 변경) | 🟡 중간 (전체 import 변경) |
| **디자인 일관성** | 다양한 스타일 (solid, regular, brands) | 일관된 스트로크 기반 디자인 | Tailwind 생태계 통합 |
| **라이선스** | CC BY 4.0 (무료) / 상업 라이선스 | ISC (매우 자유) | MIT |
| **2026 트렌드** | 안정적 (레거시) | 🔥 급성장 | Tailwind 프로젝트에서 인기 |

### 7.2 이 프로젝트에서의 사용 현황

```tsx
// payload/profile.ts:1-4
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faBell } from '@fortawesome/free-regular-svg-icons';

// component/skill/index.tsx:3
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
```

**사용 아이콘 수**: 6개 (`faEnvelope`, `faPhone`, `faFacebook`, `faGithub`, `faBell`, `faQuestionCircle`)
**사용 스타일**: solid, regular, brands (3가지)

### 7.3 권장 결정

**✅ 옵션 A: FontAwesome 6 업그레이드** (최소 비용)

근거:
- 사용 아이콘이 6개로 매우 적음 → 어떤 라이브러리든 번들 영향 미미
- FA 5→6 마이그레이션이 가장 적은 코드 변경
- brands 아이콘(GitHub, Facebook)은 Lucide/Heroicons에 없음 → FA 유지 필요
- `@fortawesome/react-fontawesome` 3.x는 TypeScript 재작성으로 타입 개선

**대안 검토**: Lucide Icons (옵션 B)를 장기적으로 검토할 수 있으나, brands 아이콘 부재로 FA와 혼용이 필요하여 복잡도 증가

**작업 범위**:
1. 패키지 업데이트:
   - `@fortawesome/fontawesome-svg-core` → 6.x
   - `@fortawesome/free-solid-svg-icons` → 6.x
   - `@fortawesome/free-regular-svg-icons` → 6.x
   - `@fortawesome/free-brands-svg-icons` → 6.x
   - `@fortawesome/react-fontawesome` → 3.x (React 18+ 필수)
2. 아이콘 이름 변경 확인 (FA 5→6에서 일부 rename)
3. TypeScript 타입 호환 확인

**난이도**: 🟢 하
**주의사항**:
- `@fortawesome/react-fontawesome` 3.x는 React 18+ 필수 → Next.js 업그레이드 이후 진행
- FA v5는 EOL 선언됨 → 보안 업데이트 없음

---

## 8. ESLint + Prettier

### 8.1 현재 설정의 문제점

```js
// .eslintrc.js:8-9 (deprecated)
'prettier/react',                // ESLint 8+에서 제거됨
'prettier/@typescript-eslint',   // ESLint 8+에서 제거됨

// .eslintrc.js — 전체 설정 형식
module.exports = { ... }         // eslintrc 형식 (ESLint 9+에서 deprecated)
```

- `eslint-config-airbnb-typescript` — **2025년 5월 아카이브됨** (유지보수 종료)
- `@typescript-eslint` 2.x — 현재 8.x+ (6 메이저 격차)
- ESLint Flat Config가 v9부터 기본, v10에서 필수

### 8.2 대체 후보 비교

| 기준 | 옵션 A: ESLint 10 + typescript-eslint | 옵션 B: Biome (ESLint + Prettier 통합) |
|------|-------------------------------------|--------------------------------------|
| **설정 형식** | Flat Config (`eslint.config.js`) | `biome.json` (단일 설정) |
| **Airbnb 규칙** | FlatCompat 또는 커스텀 재작성 | 유사 규칙셋 내장 |
| **Prettier 통합** | 별도 설치 (`eslint-config-prettier`) | ✅ 내장 포매터 |
| **성능** | 빠름 | 🔥 매우 빠름 (Rust 기반, 10-20x) |
| **TypeScript 지원** | `@typescript-eslint` 플러그인 | ✅ 내장 |
| **생태계 호환** | 방대한 플러그인 생태계 | 제한적 (자체 규칙만) |
| **2026 트렌드** | 표준 | 급성장 |
| **마이그레이션 비용** | 🟡 중간 (Flat Config 재작성) | 🟡 중간 (전체 전환) |

### 8.3 권장 결정

**✅ 옵션 A: ESLint 10 + @typescript-eslint 8 + Prettier 3**

근거:
- ESLint 생태계가 훨씬 성숙하고 플러그인 풍부
- Next.js 공식 ESLint 설정(`eslint-config-next`) 지원
- Biome은 아직 React/Next.js 전용 규칙이 부족
- 프로젝트 규모가 작아 Biome의 성능 이점은 미미

**작업 범위**:
1. `.eslintrc.js` 삭제 → `eslint.config.js` (Flat Config) 생성
2. 패키지 업데이트:
   ```
   eslint → 10.x
   @typescript-eslint/parser → 8.x (@typescript-eslint로 통합)
   @typescript-eslint/eslint-plugin → 8.x
   prettier → 3.8.x
   eslint-config-prettier → 10.x
   eslint-plugin-prettier → 5.x
   ```
3. `eslint-config-airbnb` 제거 → `eslint-config-next` + 커스텀 규칙
4. `eslint-plugin-react`, `eslint-plugin-react-hooks` 업데이트
5. `eslint-config-airbnb-base`, `eslint-config-airbnb-typescript` 제거 (아카이브됨)

**Flat Config 예시**:
```js
// eslint.config.js
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import prettier from 'eslint-config-prettier';

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  react.configs.flat.recommended,
  reactHooks.configs.flat.recommended,
  prettier,
  {
    rules: {
      'no-underscore-dangle': 'off',
      '@typescript-eslint/no-namespace': 'off', // declare namespace 유지 시
      quotes: ['error', 'single', { avoidEscape: true }],
    },
  },
);
```

**난이도**: 🔴 상 (전면 재작성)
**주의사항**:
- Airbnb 규칙셋이 없어지므로 일부 규칙을 수동으로 추가해야 함
- `FlatCompat`을 브릿지로 사용하여 점진적 전환 가능
- `'prettier/react'`, `'prettier/@typescript-eslint'`는 `eslint-config-prettier`로 통합됨

---

## 9. jQuery

### 9.1 현황

```tsx
// pages/_app.tsx:1
import 'jquery/dist/jquery.slim';
```

Bootstrap 4의 JavaScript 컴포넌트(드롭다운, 모달 등)가 jQuery에 의존하여 import됨.

### 9.2 권장 결정

**✅ Bootstrap 5 전환 시 제거**

Bootstrap 5는 jQuery 의존성을 완전히 제거하였으므로, Bootstrap 5로 업그레이드하면 jQuery를 안전하게 제거할 수 있습니다.

**작업 범위**:
1. `pages/_app.tsx:1` — `import 'jquery/dist/jquery.slim'` 삭제
2. `npm uninstall jquery`

**난이도**: 🟢 하 (Bootstrap 5 전환의 부산물)
**주의사항**: Bootstrap 5 전환 **이후**에 제거해야 함 (Bootstrap 4에서 제거하면 JS 기능 오류 가능)

---

## 10. 마이그레이션 순서 및 종합 로드맵

### 10.1 의존성 그래프 기반 순서

```
[Phase 0] styled-components 제거, next-images 제거
    ↓
[Phase 1] Next.js 16 + React 19 + TypeScript 5.9
    ↓
[Phase 2] Bootstrap 5 + reactstrap 9 + jQuery 제거
    ↓
[Phase 3] FontAwesome 6 + luxon 3 + next-seo 제거
    ↓
[Phase 4] ESLint 10 + Prettier 3 (Flat Config)
```

### 10.2 Phase별 상세

#### Phase 0: 즉시 제거 가능 항목 (소요: 0.5일)

| # | 작업 | 난이도 | 영향 |
|---|------|--------|------|
| 0-1 | `styled-components` + `@types/styled-components` 제거 | 🟢 | 번들 ~15KB 절감 |
| 0-2 | `next-images` 제거 + `next.config.js` 수정 | 🟢 | deprecated 의존성 제거 |
| 0-3 | `typedoc` 제거 (선택) | 🟢 | devDependency 정리 |

**빌드 검증**: `npm run build` 및 `npm run export` 정상 동작 확인

#### Phase 1: 핵심 프레임워크 (소요: 2~3일)

| # | 작업 | 난이도 | 비고 |
|---|------|--------|------|
| 1-1 | Next.js 10→12→14→16 단계적 업그레이드 | 🔴 | codemod 활용 |
| 1-2 | React 17→18→19 (Next.js와 함께) | 🟡 | 자동 처리 |
| 1-3 | TypeScript 4.9→5.9 | 🟢 | 하위 호환 |
| 1-4 | Static export: `next export` → `output: 'export'` | 🟡 | Next.js 16 필수 |
| 1-5 | `--openssl-legacy-provider` 제거 | 🟢 | npm scripts 수정 |

#### Phase 2: UI 프레임워크 (소요: 1~2일)

| # | 작업 | 난이도 | 비고 |
|---|------|--------|------|
| 2-1 | Bootstrap 4→5 | 🟡 | CSS 클래스명 변경 |
| 2-2 | reactstrap 8→9 | 🟡 | 컴포넌트 API 확인 |
| 2-3 | jQuery 제거 | 🟢 | Bootstrap 5 전환 후 |
| 2-4 | CSS 클래스명 일괄 치환 | 🟡 | ~10개 파일 |

#### Phase 3: 보조 라이브러리 (소요: 1일)

| # | 작업 | 난이도 | 비고 |
|---|------|--------|------|
| 3-1 | FontAwesome 5→6 | 🟢 | 아이콘 이름 확인 |
| 3-2 | `@fortawesome/react-fontawesome` → 3.x | 🟢 | React 18+ 필수 |
| 3-3 | luxon 1→3 | 🟢 | 하위 호환, `@types/luxon` 제거 |
| 3-4 | next-seo → `<Head>` 수동 전환 | 🟡 | 메타 태그 직접 작성 |
| 3-5 | `@types/node`, `@types/react` 업데이트 | 🟢 | 최신 타입 |

#### Phase 4: 개발 도구 (소요: 1일)

| # | 작업 | 난이도 | 비고 |
|---|------|--------|------|
| 4-1 | ESLint 10 + Flat Config | 🔴 | 전면 재작성 |
| 4-2 | Prettier 1→3 | 🟡 | ESM 전환 |
| 4-3 | `@typescript-eslint` 2→8 | 🟡 | 규칙 호환 확인 |
| 4-4 | airbnb config 제거 → 커스텀 + next config | 🟡 | 아카이브된 패키지 대체 |

### 10.3 종합 의존성 변화

#### 제거되는 패키지 (7개)

| 패키지 | 유형 | 이유 |
|--------|------|------|
| `styled-components` | dependencies | 미사용 |
| `@types/styled-components` | devDependencies | 미사용 |
| `next-images` | dependencies | deprecated → 빌트인 |
| `next-seo` | dependencies | `<Head>` 수동 전환 |
| `@types/next-seo` | devDependencies | next-seo 제거 |
| `jquery` | dependencies | Bootstrap 5에서 불필요 |
| `@types/luxon` | devDependencies | luxon 3에 타입 내장 |

#### 업그레이드되는 패키지 (12개)

| 패키지 | 현재 | 목표 |
|--------|------|------|
| `next` | 10.2.3 | 16.x |
| `react` / `react-dom` | 17.0.2 | 19.x |
| `typescript` | 4.9.5 | 5.9.x |
| `bootstrap` | 4.6.0 | 5.3.x |
| `reactstrap` | 8.9.0 | 9.2.x |
| `luxon` | 1.28.0 | 3.7.x |
| `@fortawesome/*` | 5.x / 1.x | 6.x / 3.x |
| `eslint` | 6.8.0 | 10.x |
| `prettier` | 1.19.1 | 3.8.x |
| `@typescript-eslint/*` | 2.34.0 | 8.x |

#### 최종 의존성 수 변화

- **현재**: dependencies 15개, devDependencies 17개 = **32개**
- **예상**: dependencies 10개, devDependencies 12개 = **22개** (약 31% 감소)

---

## 11. 리스크 매트릭스

| 리스크 | 확률 | 영향 | 완화 전략 |
|--------|------|------|----------|
| Next.js 16 static export 호환 이슈 | 중간 | 높음 | `output: 'export'` + `distDir` 사전 검증 |
| Bootstrap 5 클래스명 누락 변경 | 높음 | 중간 | 검색/치환 후 시각적 비교 |
| FA 6 아이콘 이름 변경 | 중간 | 낮음 | 6개 아이콘만 확인하면 됨 |
| ESLint Flat Config 전환 실패 | 중간 | 낮음 | FlatCompat 브릿지 사용 |
| next-seo 제거 후 SEO 메타 태그 누락 | 낮음 | 중간 | 빌드 후 HTML 소스 확인 |
| 이미지 import 실패 (next-images 제거 후) | 낮음 | 높음 | Next.js 12+에서 기본 지원 확인 |

---

## 12. 요약: 최종 권장 결정표

| 현재 라이브러리 | 권장 결정 | 대체/목표 | 난이도 |
|---------------|----------|----------|--------|
| Bootstrap 4 + reactstrap 8 | **업그레이드** | Bootstrap 5 + reactstrap 9 | 🟡 중 |
| styled-components 5 | **제거** | (미사용) | 🟢 하 |
| next-images | **제거** | Next.js 빌트인 | 🟢 하 |
| next-seo 4 | **제거 + 수동 전환** | `<Head>` 메타 태그 | 🟡 중 |
| luxon 1 | **업그레이드** | luxon 3 | 🟢 하 |
| FontAwesome 5 | **업그레이드** | FontAwesome 6 | 🟢 하 |
| ESLint 6 + Prettier 1 | **업그레이드 + 재작성** | ESLint 10 + Prettier 3 | 🔴 상 |
| jQuery | **제거** | (Bootstrap 5에서 불필요) | 🟢 하 |

> **예상 총 소요**: 5~7일 (기술 업그레이드와 병행 시)
> **패키지 수 감소**: 32개 → 22개 (31% 감소)
> **번들 사이즈 절감**: ~60KB+ (jQuery 30KB + styled-components 15KB + 기타)
