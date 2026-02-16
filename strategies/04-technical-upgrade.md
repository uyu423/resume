# 기술 업그레이드 전략

> 작성일: 2026-02-17
> 대상 프로젝트: resume-nextjs (Next.js 기반 정적 웹 이력서 생성기)

---

## 1. 현재 기술 스택 분석

### 1.1 핵심 의존성 현황

| 카테고리 | 패키지 | 현재 버전 | 최신 안정 버전 | 버전 격차 | 긴급도 |
|---------|--------|----------|--------------|----------|--------|
| **프레임워크** | Next.js | 10.2.3 | 16.1.x | 6 메이저 | 🔴 Critical |
| **UI 라이브러리** | React | 17.0.2 | 19.2.4 | 2 메이저 | 🔴 Critical |
| **언어** | TypeScript | 4.9.5 | 6.0 Beta (5.9 안정) | 1~2 메이저 | 🟡 Medium |
| **CSS 프레임워크** | Bootstrap | 4.6.0 | 5.3.x | 1 메이저 | 🟡 Medium |
| **CSS-in-JS** | styled-components | 5.3.1 | 6.3.9 | 1 메이저 | 🟢 Low (미사용) |
| **UI 컴포넌트** | reactstrap | 8.9.0 | 9.2.3 | 1 메이저 | 🟡 Medium |
| **날짜 처리** | luxon | 1.28.0 | 3.7.2 | 2 메이저 | 🟡 Medium |
| **SEO** | next-seo | 4.26.0 | 7.2.0 | 3 메이저 | 🟡 Medium |
| **아이콘** | FontAwesome | 5.15.4 | 6.x (v7 출시) | 1~2 메이저 | 🟡 Medium |
| **이미지** | next-images | 1.8.1 | deprecated | - | 🔴 Critical |
| **린트** | ESLint | 6.8.0 | 10.0.0 | 4 메이저 | 🟡 Medium |
| **포매터** | Prettier | 1.19.1 | 3.8.1 | 2 메이저 | 🟡 Medium |
| **TS ESLint** | @typescript-eslint | 2.34.0 | 8.x+ | 6 메이저 | 🟡 Medium |

### 1.2 주요 문제점

#### `--openssl-legacy-provider` 의존성
- **위치**: `package.json:9-12` — 모든 npm scripts에 `NODE_OPTIONS=--openssl-legacy-provider` 설정
- **원인**: Next.js 10이 OpenSSL 3.0과 호환되지 않는 레거시 해시 알고리즘 사용
- **영향**: Node.js 17+ 환경에서 빌드 시 workaround 필수. 보안 위험 내포

#### next-images (deprecated)
- **위치**: `next.config.js:2` — `const withImages = require('next-images')`
- **원인**: Next.js 10+ 에서 `next/image` 빌트인 제공 이후 유지보수 중단
- **영향**: 이미지 최적화 미적용. WebP/AVIF 자동 변환 불가

#### styled-components 미활용
- **분석 결과**: `component/` 디렉토리 전체 검색 시 `import styled` 사용 **0건**
- **위치**: `component/common/Style.ts` — `CSSProperties` 인라인 스타일 객체 사용
- **영향**: 불필요한 의존성. 번들 사이즈 증가

#### jQuery 의존성
- **위치**: `pages/_app.tsx:1` — `import 'jquery/dist/jquery.slim'`
- **원인**: Bootstrap 4의 JavaScript 기능(드롭다운 등)이 jQuery에 의존
- **영향**: 실제 사용되는 Bootstrap JS 기능이 없다면 불필요한 ~30KB 번들 추가

#### 테스트 부재
- **위치**: `package.json:8` — `"test": "echo \"Error: no test specified\" && exit 1"`
- **영향**: 코드 변경 시 회귀 검증 불가. 마이그레이션 시 안전장치 없음

#### CircleCI 설정 구식
- **위치**: `.circleci/config.yml:8` — Node 20.15.1 사용 (현재 LTS는 24.x)
- **영향**: `.nvmrc`의 24.13.0과 CI 환경 불일치

#### 폰트 로딩 비효율
- **위치**: `pages/_document.tsx:12-22` — 외부 CSS 3건 (`fonts.googleapis.com` 2건, `cdn.jsdelivr.net` 1건)
- **영향**: render-blocking CSS. FOUT/FOIT 발생 가능. CLS(Cumulative Layout Shift) 점수 저하

---

## 2. 라이브러리별 업그레이드 분석

### 2.1 Next.js (10.2.3 → 16.x)

**업그레이드 필요성**: 🔴 필수
- 6개 메이저 버전 격차. 보안 패치 및 생태계 지원 종료
- `--openssl-legacy-provider` 제거 가능
- Turbopack (빌드 속도 10x 향상), App Router, Server Components 등 핵심 기능

**주요 Breaking Changes (버전별)**:

| 버전 | 핵심 변경사항 | 이 프로젝트 영향 |
|------|-------------|----------------|
| 11 | `next/image` 기본 제공, ESLint 통합 | `next-images` 제거 필요 |
| 12 | SWC 컴파일러, Middleware 도입 | 빌드 속도 개선 |
| 13 | App Router, React Server Components, `next/font` | Pages Router 유지 가능 (공존) |
| 14 | Turbopack stable, Server Actions | Pages Router 계속 지원 |
| 15 | Async Request APIs, React 19 지원 | `cookies()`, `headers()` async 전환 |
| 16 | Turbopack 기본, Middleware→Proxy 리네임, `next export` 제거 | Static export 방식 변경 필요 |

**난이도**: 🔴 높음
- `next export` 명령이 16에서 제거됨. `output: 'export'` 설정으로 전환 필요
- `next.config.js` → `next.config.ts` 전환 권장
- Webpack 커스텀 설정 → Turbopack 호환 확인 필요

### 2.2 React (17.0.2 → 19.x)

**업그레이드 필요성**: 🔴 필수 (Next.js 16이 React 19 요구)

**주요 변경사항**:
- React 18: Concurrent Features, `createRoot()`, Automatic Batching, Suspense SSR
- React 19: Server Components, `use()` hook, form Actions, `useOptimistic`

**이 프로젝트 영향**:
- `pages/_app.tsx` — `ReactDOM.render` → `createRoot` (Next.js가 자동 처리)
- `component/common/PreProcessingComponent.tsx:4` — `JSX.Element` 반환 타입 → React 19에서 `React.JSX.Element`로 변경 권장
- 전반적으로 Pages Router 패턴은 React 19에서도 호환

**난이도**: 🟡 중간 (Next.js 업그레이드 시 자동 처리되는 부분 많음)

### 2.3 TypeScript (4.9.5 → 5.9.x)

**업그레이드 필요성**: 🟡 권장

**주요 변경사항**:
- TS 5.0: Decorators, `const` Type Parameters, `--moduleResolution bundler`
- TS 5.5+: `isolatedDeclarations`, 더 나은 타입 추론
- TS 6.0 Beta: TS 7.0 (Go 기반 네이티브 컴파일러)로의 브릿지 릴리스

**이 프로젝트 영향**:
- `tsconfig.json` — `"moduleResolution": "node"` → `"bundler"` 전환 가능
- `"target": "es2017"` → `"es2022"` 이상으로 상향 가능
- `declare namespace` 패턴은 계속 지원

**난이도**: 🟢 낮음 (대부분 하위 호환)

### 2.4 Bootstrap/reactstrap (BS4 → BS5, reactstrap 8 → 9)

**업그레이드 필요성**: 🟡 권장

**주요 변경사항**:
- Bootstrap 5: jQuery 의존성 제거, RTL 지원, CSS 변수 기반, 새로운 유틸리티 API
- reactstrap 9: Bootstrap 5 호환

**이 프로젝트 영향**:
- `pages/_app.tsx:1` — `import 'jquery/dist/jquery.slim'` 제거 가능
- Bootstrap 5에서 일부 클래스명 변경: `ml-*`→`ms-*`, `mr-*`→`me-*`, `pl-*`→`ps-*`, `pr-*`→`pe-*`, `text-left`→`text-start`, `text-right`→`text-end`
- `component/profile/index.tsx:43` — `text-md-left` → `text-md-start` 변경 필요

**대안 검토**: react-bootstrap이 Bootstrap 5를 더 잘 지원하지만, 현재 reactstrap 코드량이 적어 reactstrap 9로 업그레이드하는 것이 효율적

**난이도**: 🟡 중간 (클래스명 일괄 치환 필요)

### 2.5 styled-components (5.3.1 → 제거)

**업그레이드 필요성**: 🟢 제거 권장

**근거**:
- 프로젝트 전체에서 `import styled` 사용 건수: **0건**
- `component/common/Style.ts` — 순수 `CSSProperties` 인라인 스타일 객체만 사용
- 번들에서 불필요한 ~15KB 제거 가능

**난이도**: 🟢 매우 낮음 (package.json에서 제거만 하면 됨)

### 2.6 luxon (1.28.0 → 3.7.x)

**업그레이드 필요성**: 🟡 권장

**주요 변경사항**:
- luxon 2: ESM 기본, `Duration.toHuman()` 추가
- luxon 3: 더 나은 타입 지원, `@types/luxon` 별도 설치 불필요 (내장)

**이 프로젝트 영향**:
- `component/common/Util.ts` — `DateTime`, `Duration` API는 대부분 하위 호환
- `devDependencies`에서 `@types/luxon` 제거 가능

**난이도**: 🟢 낮음

### 2.7 next-seo (4.26.0 → 7.x)

**업그레이드 필요성**: 🟡 권장

**주요 변경사항**:
- v7: 완전 재작성. API 전면 변경. 더 나은 TypeScript 지원

**이 프로젝트 영향**:
- `pages/index.tsx:5,23` — `<NextSeo {...Payload._global.seo} />` API 변경 필요
- 대안: Next.js 13+의 빌트인 Metadata API 사용 시 next-seo 불필요

**난이도**: 🟡 중간 (API 변경에 따른 코드 수정 필요)

### 2.8 FontAwesome (5.x → 6.x)

**업그레이드 필요성**: 🟡 권장

**주요 변경사항**:
- FA 6: 새로운 아이콘 스타일, 더 작은 번들, Sharp 스타일
- `@fortawesome/react-fontawesome` 3.x: TypeScript 재작성, React 18+ 필수

**이 프로젝트 영향**:
- 아이콘 import 경로 변경: `free-solid-svg-icons` → `@fortawesome/free-solid-svg-icons` (동일 유지)
- 일부 아이콘 이름 변경 가능성 있음 (확인 필요)

**난이도**: 🟢 낮음~중간

### 2.9 ESLint + Prettier (ESLint 6 → 10, Prettier 1 → 3)

**업그레이드 필요성**: 🟡 권장

**주요 변경사항**:
- ESLint 9+: Flat Config 필수 (`.eslintrc.js` → `eslint.config.js`)
- ESLint 10: Node.js 20.19+ 필수, config 탐색 방식 변경
- Prettier 3: ESM 기본
- `prettier/react`, `prettier/@typescript-eslint` — ESLint 8+에서 통합 제거됨

**이 프로젝트 영향**:
- `.eslintrc.js:8-9` — `'prettier/react'`, `'prettier/@typescript-eslint'`는 현재도 deprecated
- `eslint-config-airbnb` → `eslint-config-airbnb-typescript`로 통합 가능
- 전체 ESLint 설정 재작성 필요 (Flat Config)

**난이도**: 🔴 높음 (설정 전면 재작성)

---

## 3. Next.js App Router 마이그레이션 가능성

### 3.1 현재 구조 분석

```
pages/
├── _app.tsx      # 글로벌 레이아웃 (Bootstrap CSS import)
├── _document.tsx  # HTML 문서 구조 (폰트, meta)
└── index.tsx      # 유일한 페이지 (모든 섹션 렌더링)
```

**특성**: 단일 페이지 정적 사이트. 서버 사이드 데이터 fetching 없음. 모든 데이터가 TypeScript 파일에 하드코딩.

### 3.2 App Router 전환 시 변경사항

| 현재 (Pages Router) | App Router 전환 시 |
|---------------------|-------------------|
| `pages/_app.tsx` | `app/layout.tsx` |
| `pages/_document.tsx` | `app/layout.tsx` (통합) |
| `pages/index.tsx` | `app/page.tsx` |
| `next-seo` | `export const metadata` (빌트인) |
| `<Head>` component | `metadata` export |

### 3.3 장단점

**장점**:
- `next-seo` 의존성 제거 가능 (빌트인 Metadata API)
- `next/font` 사용으로 폰트 최적화 (self-hosting, zero layout shift)
- Server Components로 클라이언트 JS 번들 최소화
- `_app.tsx` + `_document.tsx` → `layout.tsx` 통합으로 구조 단순화

**단점**:
- 단일 페이지 앱에서 App Router의 라우팅 이점은 미미
- Bootstrap CSS의 글로벌 import 방식 변경 필요
- 학습 비용 대비 이 프로젝트에서의 실질적 이점 제한적

### 3.4 권장사항

**Pages Router 유지를 권장합니다.**

근거:
1. 단일 페이지 정적 사이트로, App Router의 라우팅/레이아웃 이점을 활용할 수 없음
2. Next.js 16에서도 Pages Router를 완전히 지원
3. 마이그레이션 비용 대비 이점이 적음
4. 다만, `next/font`과 `metadata` API는 Pages Router에서도 부분적으로 사용 가능

---

## 4. 빌드/번들링 최적화 방안

### 4.1 Turbopack 도입

- Next.js 16에서 기본 번들러로 전환
- 개발 서버 시작 시간 ~10x 빠름
- HMR(Hot Module Replacement) ~5x 빠름
- 현재 `next.config.js`의 `withImages` Webpack 플러그인 제거 후 자동 적용

### 4.2 불필요한 의존성 제거

| 패키지 | 이유 | 절약 예상 |
|--------|------|----------|
| `styled-components` | 미사용 | ~15KB |
| `jquery` | Bootstrap 5 전환 시 불필요 | ~30KB |
| `next-images` | `next/image` 빌트인 사용 | ~5KB |
| `debug` | 프로덕션 빌드에서 제거 또는 대체 | ~2KB |
| `chalk` | `shellwork.js`에서만 사용, Node.js 내장 색상 사용 가능 | ~5KB |
| `shelljs` | Node.js `fs`/`child_process`로 대체 가능 | ~10KB |
| `typedoc` | 이력서 프로젝트에 API 문서 불필요 시 제거 | dev only |

### 4.3 Static Export 방식 변경

**현재**: `next export --outdir docs/` (Next.js 16에서 제거됨)

**변경 방안**:
```js
// next.config.ts
const nextConfig = {
  output: 'export',
  distDir: 'docs',
};
```

`shellwork.js`의 `.nojekyll` 및 `CNAME` 생성 로직은 `postbuild` 스크립트로 유지.

### 4.4 이미지 최적화

- `next/image` 빌트인 사용 시 WebP/AVIF 자동 변환
- Static export에서는 `unoptimized: true` 또는 외부 이미지 로더 필요
- 프로필 이미지 등 정적 이미지는 빌드 타임에 최적화 가능

---

## 5. 테스트 환경 구축 제안

### 5.1 권장 스택

| 도구 | 용도 | 선택 이유 |
|------|------|----------|
| **Vitest** | 테스트 러너 | Turbopack/Vite 생태계 친화, Jest 호환 API, ESM 네이티브 |
| **@testing-library/react** | 컴포넌트 테스트 | 사용자 관점 테스트, React 공식 권장 |
| **jsdom** | DOM 환경 | Vitest와 통합 용이 |

### 5.2 테스트 전략 (이 프로젝트에 맞춤)

이 프로젝트는 데이터(payload) → 컴포넌트 → 렌더링의 단순 흐름이므로:

1. **Payload 유효성 테스트** (우선순위: 높음)
   - 각 payload 파일의 타입 준수 여부
   - 필수 필드 존재 여부
   - 날짜 형식(`YYYY-MM`) 유효성

2. **유틸리티 함수 테스트** (우선순위: 높음)
   - `Util.getFormattingDuration()` — 기간 계산 로직
   - 엣지 케이스: 동일 월, 연도 경계, 현재 날짜 기준

3. **컴포넌트 렌더링 테스트** (우선순위: 중간)
   - 각 섹션이 `disable: true`일 때 렌더링되지 않는지
   - 기본 payload로 각 섹션이 에러 없이 렌더링되는지

4. **스냅샷 테스트** (우선순위: 낮음)
   - 마이그레이션 전후 렌더링 결과 비교용

### 5.3 예상 설정

```json
// package.json scripts
{
  "test": "vitest",
  "test:ui": "vitest --ui",
  "test:coverage": "vitest run --coverage"
}
```

---

## 6. CI/CD 개선

### 6.1 CircleCI → GitHub Actions 전환

**권장 이유**:
- 프로젝트가 GitHub에 호스팅되어 있음 (`github.com/uyu423/resume-nextjs`)
- GitHub Pages 배포와 네이티브 통합
- Public 저장소 무제한 무료
- CircleCI 대비 설정 간소화

**권장 워크플로우**:

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [master]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version-file: '.nvmrc'
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npm run build
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./docs
```

### 6.2 추가 CI 개선사항

| 항목 | 현재 | 개선안 |
|------|------|--------|
| Node.js 버전 | CI: 20.15.1, 로컬: 24.13.0 | `.nvmrc` 통일 참조 |
| 캐싱 | 없음 | `actions/setup-node`의 `cache: 'npm'` |
| 테스트 | 없음 | `npm test` 단계 추가 |
| 타입 체크 | 없음 (빌드에 포함) | `tsc --noEmit` 별도 단계 |
| 의존성 감사 | 없음 | `npm audit` 또는 Dependabot 활성화 |

---

## 7. 성능 최적화

### 7.1 폰트 최적화

**현재 문제**: `pages/_document.tsx:12-22`에서 3개의 외부 CSS를 render-blocking으로 로드

**개선안**: `next/font` 사용 (Next.js 13+)

```tsx
import { Noto_Sans_KR, Parisienne } from 'next/font/google';
import localFont from 'next/font/local';

const pretendard = localFont({
  src: '../public/fonts/PretendardVariable.woff2',
  display: 'swap',
});
```

**효과**:
- 빌드 타임에 폰트 self-hosting → 외부 요청 제거
- `font-display: swap` 자동 적용 → FOUT 방지
- CLS 점수 개선

### 7.2 CSS 최적화

**현재**: Bootstrap 전체 CSS 로드 (`bootstrap/dist/css/bootstrap.min.css` ~190KB)

**개선안**:
- Bootstrap 5 전환 후 사용하는 유틸리티만 import (PurgeCSS 또는 Tailwind CSS 전환)
- 또는 `postcss-purgecss`로 미사용 CSS 자동 제거

### 7.3 이미지 최적화

**현재**: `next-images` 플러그인 (최적화 없음)

**개선안**:
- Static export 시: 빌드 타임 이미지 최적화 (`sharp` 패키지)
- 프로필 이미지를 WebP로 사전 변환
- `loading="lazy"` 적용 (프로필 이미지 제외)

### 7.4 번들 사이즈 최적화

**현재 예상 번들**: React 17 + Bootstrap 4 + jQuery + styled-components + FontAwesome 전체

**최적화 후 예상**:

| 항목 | 절감량 |
|------|--------|
| jQuery 제거 | ~30KB gzipped |
| styled-components 제거 | ~15KB gzipped |
| Bootstrap 4→5 (PurgeCSS) | ~150KB → ~20KB |
| FontAwesome tree-shaking | 이미 개별 import 사용 (양호) |
| **총 예상 절감** | **~175KB gzipped** |

---

## 8. 단계별 마이그레이션 로드맵

### Phase 0: 마이그레이션 준비 (1일)

**목표**: 안전한 마이그레이션 기반 확보

| # | 작업 | 상세 |
|---|------|------|
| 0-1 | Git 브랜치 전략 | `feature/v2` 브랜치에서 작업. 각 Phase별 커밋 |
| 0-2 | 현재 빌드 결과 스냅샷 | `npm run export`로 현재 `docs/` 출력 보관 (비교용) |
| 0-3 | 불필요한 의존성 제거 | `styled-components`, `@types/styled-components` 제거 |
| 0-4 | `typedoc` 제거 검토 | 이력서 프로젝트에 불필요 시 제거 |

### Phase 1: 핵심 프레임워크 업그레이드 (2~3일)

**목표**: Next.js 16 + React 19 + TypeScript 5.9

| # | 작업 | 상세 |
|---|------|------|
| 1-1 | Next.js 단계적 업그레이드 | 10→12→14→16 순서로 (codemod 활용) |
| 1-2 | React 업그레이드 | 17→18→19 (Next.js 업그레이드 시 자동 처리) |
| 1-3 | TypeScript 업그레이드 | 4.9→5.9 |
| 1-4 | `next-images` 제거 | `next.config.js`에서 `withImages` 래퍼 제거 |
| 1-5 | Static export 전환 | `next export` → `output: 'export'` |
| 1-6 | `--openssl-legacy-provider` 제거 | npm scripts에서 `NODE_OPTIONS` 제거 |
| 1-7 | `shellwork.js` 수정 | postbuild 스크립트 호환 확인 |
| 1-8 | 빌드 검증 | `npm run build` 성공 확인 및 출력 비교 |

### Phase 2: UI 라이브러리 업그레이드 (1~2일)

**목표**: Bootstrap 5 + reactstrap 9, jQuery 제거

| # | 작업 | 상세 |
|---|------|------|
| 2-1 | Bootstrap 4→5 | CSS import 변경, 클래스명 마이그레이션 |
| 2-2 | reactstrap 8→9 | API 변경사항 대응 |
| 2-3 | jQuery 제거 | `_app.tsx`에서 import 제거 |
| 2-4 | CSS 클래스명 일괄 치환 | `ml-`→`ms-`, `mr-`→`me-`, `text-left`→`text-start` 등 |
| 2-5 | 시각적 검증 | 개발 서버에서 전체 섹션 렌더링 확인 |

### Phase 3: 보조 라이브러리 업그레이드 (1일)

**목표**: luxon, FontAwesome, next-seo 업그레이드

| # | 작업 | 상세 |
|---|------|------|
| 3-1 | luxon 1→3 | API 호환 확인, `@types/luxon` 제거 |
| 3-2 | FontAwesome 5→6 | 아이콘 이름 변경 확인, 패키지 업데이트 |
| 3-3 | next-seo 업그레이드 또는 제거 | Pages Router에서 빌트인 `<Head>` 활용 또는 next-seo 7로 업데이트 |
| 3-4 | `@types/node`, `@types/react` 업데이트 | 최신 타입 정의 적용 |

### Phase 4: 개발 도구 현대화 (1일)

**목표**: ESLint Flat Config + Prettier 3 + 테스트 환경

| # | 작업 | 상세 |
|---|------|------|
| 4-1 | ESLint 10 + Flat Config | `.eslintrc.js` → `eslint.config.js` 재작성 |
| 4-2 | Prettier 3 업그레이드 | ESM 지원 확인 |
| 4-3 | `@typescript-eslint` 업그레이드 | v8+ 전환 |
| 4-4 | Vitest + Testing Library 설정 | 테스트 환경 초기 구축 |
| 4-5 | 핵심 유틸 함수 테스트 작성 | `Util.getFormattingDuration()` 등 |

### Phase 5: CI/CD 전환 및 성능 최적화 (1일)

**목표**: GitHub Actions 전환, 폰트/CSS 최적화

| # | 작업 | 상세 |
|---|------|------|
| 5-1 | GitHub Actions 워크플로우 작성 | 빌드 + 테스트 + 배포 |
| 5-2 | CircleCI 설정 제거 | `.circleci/` 디렉토리 삭제 |
| 5-3 | 폰트 최적화 | `next/font` 적용 또는 self-hosting |
| 5-4 | CSS 최적화 | 미사용 CSS 제거 |
| 5-5 | 최종 빌드 검증 | Phase 0 스냅샷 대비 시각적 비교 |
| 5-6 | Lighthouse 점수 비교 | 마이그레이션 전후 성능 지표 |

---

## 9. 리스크 및 완화 전략

| 리스크 | 확률 | 영향 | 완화 전략 |
|--------|------|------|----------|
| Bootstrap 5 클래스명 변경으로 레이아웃 깨짐 | 높음 | 중간 | Phase 0에서 스냅샷 촬영, 시각적 비교 |
| `next export` 제거로 Static 빌드 실패 | 중간 | 높음 | `output: 'export'` 설정 사전 검증 |
| Turbopack에서 기존 설정 비호환 | 낮음 | 높음 | Webpack fallback 옵션 유지 가능 |
| FontAwesome 아이콘 이름 변경 | 중간 | 낮음 | 변경된 아이콘 매핑 사전 확인 |
| ESLint Flat Config 전환 복잡도 | 높음 | 낮음 | 기존 규칙 최소한으로 마이그레이션 |

---

## 10. 요약 및 우선순위

### 즉시 실행 (Quick Wins)
1. `styled-components` 제거 (미사용 의존성)
2. `typedoc` 제거 검토

### 필수 업그레이드
3. Next.js 10 → 16 (보안, 성능, 생태계 지원)
4. React 17 → 19 (Next.js 16 필수 요건)
5. `next-images` → `next/image` 빌트인 (deprecated 제거)
6. Static export 방식 전환

### 권장 업그레이드
7. Bootstrap 4 → 5 + jQuery 제거
8. luxon 1 → 3
9. FontAwesome 5 → 6
10. ESLint/Prettier 현대화
11. 테스트 환경 구축

### 장기 검토
12. Pages Router → App Router (현시점에서는 비용 대비 이점 부족)
13. TypeScript 7.0 (Go 기반 네이티브) 전환 (2026 하반기 이후)

---

> **예상 총 소요 기간**: 6~8일 (1인 기준)
> **예상 효과**: 번들 사이즈 ~175KB 절감, 빌드 시간 ~10x 개선, 보안 취약점 해소, 현대적 개발 경험
