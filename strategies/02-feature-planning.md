# 기능 기획서: 웹 이력서 v2 기능 설계

> 작성일: 2026-02-17
> 선행 문서: `01-marketing-strategy.md` (마케팅 전략), `04-technical-upgrade.md` (기술 업그레이드)
> 대상 프로젝트: resume-nextjs (Next.js 기반 정적 웹 이력서 생성기)

---

## 1. 현재 프로젝트 구조 분석 (개발 가능성 관점)

### 1.1 아키텍처 요약

```
payload/*.ts (데이터) → component/<section>/index.tsx (렌더링) → pages/index.tsx (조합)
```

- **데이터-뷰 분리 구조**: 모든 콘텐츠가 `payload/*.ts`에 집중. 새로운 섹션을 추가하려면 `payload 파일 + 인터페이스 + 컴포넌트 + pages/index.tsx 등록`의 4단계만 필요
- **섹션 단위 모듈화**: 각 섹션이 `component/<section>/` 디렉토리에 독립적으로 존재. 섹션 간 의존성 없음
- **공통 전처리기**: `PreProcessingComponent`가 `disable` 플래그로 섹션 노출을 제어 — 새 섹션도 이 패턴을 따르면 됨
- **공통 Description 구조**: `IRow.Description`이 재귀적 구조(`descriptions?: Description[]`)를 지원하여 다단계 설명 가능

### 1.2 확장 용이성 평가

| 확장 유형 | 난이도 | 근거 |
|-----------|--------|------|
| **새 섹션 추가** | 🟢 낮음 | 기존 패턴(ISection + component + payload) 복제 후 수정 |
| **기존 섹션 필드 추가** | 🟢 낮음 | 인터페이스에 optional 필드 추가 → 컴포넌트에서 조건부 렌더링 |
| **섹션 순서 변경** | 🟢 매우 낮음 | `pages/index.tsx`에서 JSX 순서만 변경 |
| **글로벌 UI 요소 추가** (네비게이션, 다크모드) | 🟡 중간 | `pages/index.tsx` 또는 `_app.tsx` 수준에서 래핑 필요 |
| **SEO/메타데이터 확장** | 🟢 낮음 | `payload/_global.ts` + `pages/index.tsx`의 `<Head>` 영역 수정 |
| **인쇄/PDF 지원** | 🟡 중간 | CSS `@media print` 추가 + 기존 styled-components 미사용이므로 글로벌 CSS 필요 |

### 1.3 제약 사항

| 제약 | 영향 | 비고 |
|------|------|------|
| Next.js 10 (레거시) | 새 기능 구현 시 최신 API 사용 불가 | `04-technical-upgrade.md`에서 16으로 업그레이드 예정 |
| 테스트 부재 | 변경 사항 회귀 검증 불가 | 테스트 환경 구축이 선행되어야 안전한 리팩토링 가능 |
| 단일 페이지 구조 | 다국어 전환 시 URL 기반 라우팅 활용 불가 | 클라이언트 사이드 상태 전환으로 대응 가능 |
| 정적 export | 서버 사이드 기능(API Route 등) 사용 불가 | GitHub 히트맵 등 외부 데이터는 빌드 타임 또는 클라이언트에서 fetch |

---

## 2. 마케팅 전략 → 개발 기능 변환

마케팅 전략 문서의 핵심 아이디어를 개발 가능한 기능 단위로 변환합니다.

### 2.1 기능 목록

| ID | 기능명 | 마케팅 전략 근거 | 카테고리 |
|----|--------|-----------------|----------|
| F-01 | 프로필 히어로 강화 | 전략1: 3초 규칙 — 브랜드 스테이트먼트 + 핵심 수치 | 콘텐츠 구조 |
| F-02 | Highlight 섹션 (핵심 성과 카드) | 전략2: 초두 효과 — 핵심 성과를 최상단에 배치 | 신규 섹션 |
| F-03 | 섹션 순서 재배치 | 전략2: 초두 효과 — 채용담당자 열람 패턴에 맞춤 | 콘텐츠 구조 |
| F-04 | Testimonial 섹션 (추천사) | 전략3: 사회적 증거 — 제3자 검증 | 신규 섹션 |
| F-05 | 플로팅 네비게이션 | 4.1 Priority 1 — 긴 페이지 탐색성 개선 | UI/UX |
| F-06 | 스크롤 진입 애니메이션 | 4.1 Priority 1 — 정적 페이지 생동감 | UI/UX |
| F-07 | 프로필 CTA 버튼 | 4.1 Priority 1 — 채용담당자 즉시 행동 유도 | UI/UX |
| F-08 | PDF/인쇄 최적화 | 4.1 Priority 1 — 채용 프로세스 편의성 | 기능 |
| F-09 | JSON-LD 구조화 데이터 | 5.1 기술적 SEO — 리치 스니펫 | SEO |
| F-10 | OG 메타태그 개인화 | 5.2 소셜미디어 공유 최적화 | SEO |
| F-11 | 다크 모드 | 4.2 Priority 2 — 기술 감각 어필 | UI/UX |
| F-12 | 스킬 시각화 개선 | 4.2 Priority 2 — 직관적 역량 파악 | UI/UX |
| F-13 | 다국어 지원 (i18n) | 4.2 Priority 2 — 글로벌 채용 대응 | 기능 |

---

## 3. 기능별 우선순위 매트릭스

### 3.1 평가 기준

- **User Impact**: 채용담당자/방문자 경험에 미치는 영향 (1~5)
- **Effort**: 개발 노력 (1=반나절, 2=1일, 3=2~3일, 4=3~5일, 5=1주+)
- **Confidence**: 효과에 대한 확신도 (HIGH/MEDIUM/LOW)
- **Priority Score**: Impact / Effort (높을수록 우선)

### 3.2 매트릭스

| ID | 기능명 | Impact | Effort | Confidence | Score | 우선순위 |
|----|--------|--------|--------|------------|-------|---------|
| F-10 | OG 메타태그 개인화 | 3 | 1 | HIGH | 3.0 | **P0** |
| F-03 | 섹션 순서 재배치 | 4 | 1 | HIGH | 4.0 | **P0** |
| F-01 | 프로필 히어로 강화 | 5 | 2 | HIGH | 2.5 | **P1** |
| F-09 | JSON-LD 구조화 데이터 | 3 | 1 | MEDIUM | 3.0 | **P1** |
| F-07 | 프로필 CTA 버튼 | 4 | 2 | HIGH | 2.0 | **P1** |
| F-02 | Highlight 섹션 | 5 | 3 | HIGH | 1.7 | **P1** |
| F-08 | PDF/인쇄 최적화 | 3 | 2 | HIGH | 1.5 | **P2** |
| F-05 | 플로팅 네비게이션 | 3 | 2 | MEDIUM | 1.5 | **P2** |
| F-06 | 스크롤 진입 애니메이션 | 2 | 2 | MEDIUM | 1.0 | **P2** |
| F-12 | 스킬 시각화 개선 | 3 | 2 | MEDIUM | 1.5 | **P2** |
| F-04 | Testimonial 섹션 | 4 | 3 | MEDIUM | 1.3 | **P2** |
| F-11 | 다크 모드 | 2 | 4 | LOW | 0.5 | **P3** |
| F-13 | 다국어 지원 (i18n) | 3 | 5 | MEDIUM | 0.6 | **P3** |

### 3.3 우선순위 근거

- **P0 (즉시 실행)**: payload 데이터 수정 또는 JSX 순서 변경만으로 가능. 코드 변경 최소, 임팩트 즉시 체감
- **P1 (핵심 기능)**: 인터페이스 확장 + 컴포넌트 수정/신규 필요. 채용담당자 경험에 직접적 영향
- **P2 (품질 향상)**: UI/UX 개선으로 이력서의 전문성과 완성도를 높이는 기능
- **P3 (차별화)**: 높은 개발 비용 대비 효과 불확실. 핵심 기능 완료 후 검토

---

## 4. 기능별 상세 요구사항

### F-01: 프로필 히어로 강화

#### 사용자/JTBD
- **페르소나**: 채용담당자 (이력서를 6~7초 스캔)
- **JTBD**: "이 사람이 우리 팀에 필요한 사람인지 3초 안에 판단하고 싶다"

#### 가치 가설
IF 프로필에 브랜드 태그라인과 핵심 수치를 추가하면, THEN 채용담당자가 3초 안에 핵심 역량을 파악할 수 있다, BECAUSE 구체적 숫자와 한 줄 정의가 인지 부하를 낮추기 때문이다.

#### 스코프

**In Scope:**
- `IProfile.Payload`에 `tagline` 필드 추가 (한 줄 브랜드 스테이트먼트)
- `IProfile.Payload`에 `headings` 배열 필드 추가 (핵심 수치 카드 3~5개)
- Profile 컴포넌트에서 이름 아래에 태그라인, 수치 카드 렌더링

**NOT In Scope:**
- 프로필 사진 스타일 변경 (디자인 영역)
- 수치의 자동 계산 (experience 데이터에서 경력 연차 추출 등) — v2 이후 검토

#### Payload 데이터 구조 변경

```typescript
// component/profile/IProfile.ts — 추가 필드
export declare namespace IProfile {
  export interface Payload extends ICommon.Payload {
    // ... 기존 필드 유지 ...

    /** 한 줄 브랜드 스테이트먼트 (예: "10년차 백엔드 엔지니어 | 대규모 시스템 설계 전문") */
    tagline?: string;

    /** 핵심 수치 카드 목록 (3~5개 권장) */
    headings?: Heading[];
  }

  interface Heading {
    /** 수치 (예: "10+", "50K", "15") */
    value: string;
    /** 설명 (예: "경력 연차", "GitHub Stars", "완료 프로젝트") */
    label: string;
  }
}
```

#### 성공 지표
- 프로필 영역에서 직함/경력연차/핵심역량을 3초 안에 파악 가능 (정성 평가)

---

### F-02: Highlight 섹션 (핵심 성과 카드)

#### 사용자/JTBD
- **페르소나**: 채용담당자
- **JTBD**: "이 사람이 어떤 성과를 냈는지 핵심만 빠르게 훑고 싶다"

#### 가치 가설
IF 핵심 성과 3~5개를 카드 형태로 프로필 바로 아래에 배치하면, THEN 스크롤 없이 핵심 역량이 전달된다, BECAUSE 초두 효과에 의해 먼저 본 정보가 전체 인상을 결정하기 때문이다.

#### 스코프

**In Scope:**
- 새로운 `component/highlight/` 디렉토리 및 컴포넌트 생성
- `IHighlight.Payload` 인터페이스 정의
- `payload/highlight.ts` 데이터 파일 생성
- `payload/index.ts` 및 `pages/index.tsx`에 등록

**NOT In Scope:**
- 카드에 이미지/아이콘 포함 (텍스트 기반으로 시작)
- 애니메이션 효과 (F-06에서 별도 처리)

#### Payload 데이터 구조 (신규)

```typescript
// component/highlight/IHighlight.ts
import { ICommon } from '../common/ICommon';

export declare namespace IHighlight {
  export interface Payload extends ICommon.Payload {
    /** 핵심 성과 목록 (3~5개 권장) */
    list: Item[];
  }

  interface Item {
    /** 성과 제목 (예: "대규모 트래픽 처리 시스템 설계") */
    title: string;
    /** 성과 설명 (1~2문장) */
    description: string;
    /** 관련 키워드 뱃지 (optional) */
    keywords?: string[];
  }
}
```

#### 성공 지표
- 스크롤 없이 첫 화면(Above the Fold)에서 핵심 성과 최소 2개 이상 노출

---

### F-03: 섹션 순서 재배치

#### 사용자/JTBD
- **페르소나**: 채용담당자
- **JTBD**: "채용에 필요한 정보를 위에서 아래로 자연스럽게 확인하고 싶다"

#### 스코프

**In Scope:**
- `pages/index.tsx`에서 컴포넌트 렌더링 순서 변경

**NOT In Scope:**
- 섹션 순서를 payload에서 동적으로 제어하는 기능 — 과도한 추상화

#### 변경 사항

```
현재: Profile → Introduce → Skill → Experience → Project → OpenSource → Presentation → Article → Education → Etc → Footer
제안: Profile → Highlight(신규) → Experience → Project → Skill → OpenSource → Presentation → Article → Education → Introduce → Etc → Footer
```

**변경 근거:**
- Experience/Project를 Skill보다 앞으로: 채용담당자는 "어디서 일했는지"를 먼저 확인
- Introduce를 하단으로: 긴 자기소개는 관심 있는 사람만 읽음
- Highlight를 Profile 바로 다음: 핵심 성과 즉시 전달

#### 구현
- `pages/index.tsx`에서 `<Component>` 순서만 변경. 코드 변경량 10줄 미만

---

### F-04: Testimonial 섹션 (추천사)

#### 사용자/JTBD
- **페르소나**: 채용담당자
- **JTBD**: "지원자 본인 말고, 주변 사람들은 이 사람을 어떻게 평가하는지 알고 싶다"

#### 가치 가설
IF 동료/상사의 추천사를 이력서에 포함하면, THEN 채용담당자의 신뢰도가 높아진다, BECAUSE 제3자 검증(사회적 증거)은 자기 서술보다 설득력이 높기 때문이다.

#### 스코프

**In Scope:**
- 새로운 `component/testimonial/` 디렉토리 및 컴포넌트 생성
- `ITestimonial.Payload` 인터페이스 정의
- `payload/testimonial.ts` 데이터 파일 생성
- `payload/index.ts` 및 `pages/index.tsx`에 등록

**NOT In Scope:**
- LinkedIn API 연동
- 캐러셀/슬라이더 UI (정적 나열로 시작)

#### Payload 데이터 구조 (신규)

```typescript
// component/testimonial/ITestimonial.ts
import { ICommon } from '../common/ICommon';

export declare namespace ITestimonial {
  export interface Payload extends ICommon.Payload {
    /** 추천사 목록 */
    list: Item[];
  }

  interface Item {
    /** 추천인 이름 */
    name: string;
    /** 추천인 직함/소속 (예: "OO회사 CTO") */
    title: string;
    /** 추천인과의 관계 (예: "전 직장 상사", "프로젝트 동료") */
    relation: string;
    /** 추천 인용문 */
    quote: string;
    /** 추천인 프로필 이미지 URL (optional) */
    image?: string;
  }
}
```

#### 성공 지표
- 추천사 섹션 존재 여부가 이력서 차별화에 기여 (정성 평가)

---

### F-05: 플로팅 네비게이션

#### 사용자/JTBD
- **페르소나**: 채용담당자, 이력서 방문자
- **JTBD**: "긴 이력서에서 관심 있는 섹션으로 바로 이동하고 싶다"

#### 스코프

**In Scope:**
- 우측 고정 네비게이션 (섹션 목차)
- 현재 스크롤 위치에 따라 활성 섹션 하이라이트
- 섹션 클릭 시 스무스 스크롤 이동
- 모바일에서 숨김 (반응형)

**NOT In Scope:**
- 네비게이션 항목 커스터마이징 (payload에서 제어)
- 검색 기능

#### 구현 방향
- `pages/index.tsx` 또는 `_app.tsx`에 네비게이션 컴포넌트 추가
- Intersection Observer API로 현재 섹션 감지
- 각 섹션 컴포넌트에 `id` 속성 추가 (앵커 역할)
- payload에 의존하지 않고, 렌더링된 섹션을 DOM에서 감지

#### Payload 데이터 구조 변경

```typescript
// component/common/ICommon.ts — 확장
export declare namespace ICommon {
  export interface Payload {
    disable?: boolean;
    /** 네비게이션에 표시할 섹션 이름 (미설정 시 기본값 사용) */
    navTitle?: string;
  }
}
```

---

### F-06: 스크롤 진입 애니메이션

#### 스코프

**In Scope:**
- 각 섹션이 뷰포트에 진입할 때 fade-in 효과
- CSS transition 기반 (JS 애니메이션 라이브러리 미사용)
- `prefers-reduced-motion` 미디어 쿼리 존중 (접근성)

**NOT In Scope:**
- 복잡한 스태거(stagger) 애니메이션
- 스크롤 기반 패럴랙스

#### 구현 방향
- `PreProcessingComponent` 또는 공통 래퍼에서 Intersection Observer 적용
- CSS class 토글로 `opacity: 0 → 1`, `translateY(20px) → 0` 전환
- 전역 CSS에 애니메이션 클래스 정의

---

### F-07: 프로필 CTA 버튼

#### 사용자/JTBD
- **페르소나**: 채용담당자
- **JTBD**: "이 사람에게 바로 연락하고 싶다"

#### 스코프

**In Scope:**
- Profile 섹션에 CTA 버튼 1~2개 (예: "이메일 보내기", "이력서 다운로드")
- 버튼 스타일: 기존 Bootstrap 버튼 활용

**NOT In Scope:**
- 연락 폼 (정적 사이트이므로)
- 이력서 PDF 자동 생성 (F-08에서 별도 처리, 여기서는 외부 링크만)

#### Payload 데이터 구조 변경

```typescript
// component/profile/IProfile.ts — 추가 필드
export declare namespace IProfile {
  export interface Payload extends ICommon.Payload {
    // ... 기존 필드 유지 ...

    /** CTA 버튼 목록 (optional, 최대 2개 권장) */
    ctas?: CTA[];
  }

  interface CTA {
    /** 버튼 텍스트 (예: "이메일 보내기") */
    label: string;
    /** 클릭 시 이동할 URL (mailto:, 파일 다운로드 등) */
    link: string;
    /** 버튼 아이콘 (optional) */
    icon?: IconDefinition;
  }
}
```

---

### F-08: PDF/인쇄 최적화 (확장)

#### 사용자/JTBD
- **페르소나 A**: 채용담당자 — "지원자의 이력서를 PDF로 저장해서 면접관에게 전달하고 싶다"
- **페르소나 B**: 이력서 소유자 — "웹 이력서와 동일한 내용을 PDF로도 깔끔하게 제공하고 싶다"

#### 가치 가설
IF 웹 이력서를 인쇄/PDF로 출력할 때 인터랙티브 요소가 깔끔한 정적 레이아웃으로 자동 전환된다면, THEN 하나의 데이터 소스로 웹과 인쇄 양쪽을 모두 커버할 수 있다, BECAUSE 채용 프로세스에서 PDF 전달은 여전히 필수적이기 때문이다.

#### 스코프

**In Scope:**
- `@media print` CSS로 웹 → 인쇄 자동 전환
- 인쇄 시 인터랙티브 요소(플로팅 네비, 애니메이션, 다크모드 토글, CTA 버튼) 숨김
- 인쇄 시 링크 URL을 텍스트로 표시
- A4 비율 최적화 및 페이지 분할 제어
- 빌드 타임 PDF 자동 생성 (CI/CD 통합)

**NOT In Scope:**
- PDF 전용 별도 디자인/레이아웃 (웹 레이아웃 기반 인쇄 최적화로 충분)
- 실시간 PDF 생성 API (정적 사이트 제약)

#### 웹 vs 인쇄 이중 렌더링 전략

##### 핵심 원칙: "하나의 payload, 두 개의 렌더링 모드"

```
payload/*.ts (단일 데이터 소스)
    │
    ├── [웹 모드] component/<section>/index.tsx → 인터랙티브 렌더링
    │     - 애니메이션, 플로팅 네비, 다크모드, CTA 버튼
    │     - 반응형 레이아웃 (모바일/태블릿/데스크탑)
    │
    └── [인쇄 모드] 동일 컴포넌트 + @media print CSS → 정적 렌더링
          - 애니메이션/인터랙션 제거
          - 단일 컬럼 정적 레이아웃
          - A4 비율 최적화, 페이지 분할 제어
```

**장점**: 컴포넌트 코드 중복 없음. CSS만으로 모드 전환. payload 변경 시 웹/PDF 동시 반영.

##### 요소별 웹/인쇄 동작 매핑

| 요소 | 웹 모드 | 인쇄 모드 |
|------|---------|----------|
| 플로팅 네비게이션 (F-05) | 표시, 스크롤 추적 | `display: none` |
| 스크롤 애니메이션 (F-06) | fade-in 효과 | 즉시 표시 (`opacity: 1`) |
| CTA 버튼 (F-07) | 클릭 가능 | `display: none` |
| 다크 모드 (F-11) | 토글 가능 | 강제 라이트 모드 |
| 프로필 사진 | 반응형 크기 | 고정 크기 (100x100px) |
| 하이퍼링크 | 클릭 가능 텍스트 | 텍스트 + URL 표시 (`::after { content: " (" attr(href) ")" }`) |
| Highlight 카드 (F-02) | 카드 그리드 | 단순 리스트 |
| 스킬 시각화 (F-12) | 프로그레스 바/도트 | 텍스트 레벨 표기 |
| 외부 뱃지 이미지 (OpenSource) | 이미지 로드 | `display: none` (인쇄 시 깨질 수 있음) |
| Footer | GitHub 링크 등 | 간소화된 텍스트 버전 |

#### 구현 접근법 비교

##### 접근법 A: CSS `@media print` (권장)

```css
/* print.css */
@media print {
  /* 인터랙티브 요소 숨김 */
  .floating-nav, .cta-button, .dark-mode-toggle,
  .scroll-animation { display: none !important; }

  /* 강제 라이트 모드 */
  html[data-theme="dark"] { /* 라이트 색상 강제 적용 */ }

  /* 애니메이션 제거 */
  * { animation: none !important; transition: none !important;
      opacity: 1 !important; transform: none !important; }

  /* A4 레이아웃 */
  body { width: 210mm; margin: 0; padding: 10mm; font-size: 11pt; }
  .container { max-width: 100%; padding: 0; }

  /* 페이지 분할 제어 */
  .section-experience, .section-project { page-break-inside: avoid; }
  h2 { page-break-after: avoid; }

  /* 링크 URL 표시 */
  a[href^="http"]::after { content: " (" attr(href) ")"; font-size: 0.8em; color: #666; }

  /* 외부 이미지 뱃지 숨김 (인쇄 시 깨짐 방지) */
  img[src^="https://img.shields.io"] { display: none; }
}
```

| 장점 | 단점 |
|------|------|
| 구현 비용 최소 (CSS 파일 1개) | 복잡한 레이아웃 제어 한계 |
| 컴포넌트 코드 변경 없음 | 브라우저별 인쇄 렌더링 차이 |
| payload 변경 즉시 반영 | 페이지 분할 정밀 제어 어려움 |
| 유지보수 비용 매우 낮음 | PDF 품질이 브라우저에 의존 |

**적합도**: 이 프로젝트에 **가장 적합**. 단일 페이지 정적 이력서에서 CSS `@media print`만으로 충분한 인쇄 품질 달성 가능.

##### 접근법 B: 빌드 타임 PDF 생성 (Puppeteer/Playwright)

```javascript
// scripts/generate-pdf.js (빌드 후 실행)
const { chromium } = require('playwright');

async function generatePDF() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('file:///.../docs/index.html');
  await page.pdf({
    path: 'docs/resume.pdf',
    format: 'A4',
    margin: { top: '10mm', bottom: '10mm', left: '10mm', right: '10mm' },
    printBackground: true,
  });
  await browser.close();
}
```

| 장점 | 단점 |
|------|------|
| 일관된 PDF 출력 품질 | Chromium 의존성 (~280MB) |
| CI/CD 자동화 가능 | 빌드 시간 증가 |
| 정밀한 페이지 분할 제어 | 로컬 개발 환경에 무거운 의존성 |
| CTA 버튼에서 직접 다운로드 제공 가능 | `@media print` CSS는 어차피 필요 |

**적합도**: Phase 3 이후 선택적 도입. CI/CD에서만 실행하여 로컬 환경에 부담 없이 PDF 자동 생성.

##### 접근법 C: PDF 전용 레이아웃 (별도 페이지)

```
pages/
├── index.tsx      # 웹 이력서 (인터랙티브)
└── print.tsx      # PDF 전용 (정적, 간소화)
```

| 장점 | 단점 |
|------|------|
| 웹/인쇄 완전 독립 최적화 가능 | 컴포넌트/레이아웃 코드 중복 |
| 인쇄 전용 디자인 자유도 높음 | payload 변경 시 양쪽 모두 테스트 필요 |
| | 유지보수 비용 2배 |

**적합도**: **비권장**. 단일 페이지 이력서에서 별도 인쇄 레이아웃은 과도한 복잡도. 접근법 A로 충분.

#### 권장 구현 전략 (단계적)

```
[1단계] CSS @media print (Phase 3에서 구현)
  └── print.css 작성 → _app.tsx에서 import
  └── 브라우저 인쇄(Ctrl+P) → PDF 저장으로 즉시 사용 가능

[2단계] 빌드 타임 PDF 생성 (Phase 3 이후 선택적)
  └── npm run export 시 Playwright로 PDF 자동 생성
  └── docs/resume.pdf 산출물 → CTA 버튼에서 다운로드 링크 제공
  └── CI/CD (GitHub Actions)에서만 실행하여 로컬 부담 최소화
```

#### Payload 데이터 구조 변경

```typescript
// component/common/IGlobal.ts — 확장
export declare namespace IGlobal {
  export interface Payload {
    // ... 기존 필드 유지 ...

    /** PDF/인쇄 설정 (optional) */
    print?: PrintConfig;
  }

  interface PrintConfig {
    /** PDF 파일명 (다운로드 시 사용, 예: "홍길동_이력서.pdf") */
    fileName?: string;
    /** 인쇄 시 표시할 추가 연락처 (웹에서는 숨김) */
    contactNote?: string;
    /** 인쇄 시 숨길 섹션 ID 목록 */
    hideSections?: string[];
  }
}
```

#### 성공 지표
- 브라우저 인쇄(Ctrl+P)로 A4 PDF 생성 시, 모든 텍스트가 잘리지 않고 읽을 수 있음
- 인터랙티브 요소(네비게이션, 애니메이션, 버튼)가 인쇄 출력에 나타나지 않음
- 동일 payload 수정으로 웹과 PDF가 동시에 업데이트됨

---

### F-09: JSON-LD 구조화 데이터

#### 스코프

**In Scope:**
- `Person` + `ProfilePage` JSON-LD 스키마 추가
- payload 데이터에서 JSON-LD 자동 생성
- `pages/index.tsx`의 `<Head>` 영역에 `<script type="application/ld+json">` 삽입

**NOT In Scope:**
- 별도 빌드 스크립트로 JSON-LD 생성
- 다수의 스키마 타입 (Organization, Article 등)

#### Payload 데이터 구조 변경

```typescript
// component/common/IGlobal.ts — 확장
export declare namespace IGlobal {
  export interface Payload {
    // ... 기존 필드 유지 ...

    /** JSON-LD 구조화 데이터용 정보 (optional) */
    jsonLd?: JsonLd;
  }

  interface JsonLd {
    /** 성명 */
    name: string;
    /** 직함 */
    jobTitle: string;
    /** 현재 소속 */
    worksFor: string;
    /** 이력서 URL */
    url: string;
    /** 소셜 프로필 URL 목록 (GitHub, LinkedIn 등) */
    sameAs?: string[];
    /** 핵심 기술 키워드 */
    knowsAbout?: string[];
  }
}
```

#### 구현 방향
- `pages/index.tsx`에서 `Payload._global.jsonLd` 존재 시 JSON-LD `<script>` 태그 생성
- `@type: "ProfilePage"` + `mainEntity: { @type: "Person" }` 구조

---

### F-10: OG 메타태그 개인화

#### 스코프

**In Scope:**
- `payload/_global.ts`에서 OG 메타태그 값을 실제 이력서 소유자 정보로 변경
- `og:title`, `og:description`, `profile:first_name/last_name` 개인화
- 가이드 코멘트 추가 (사용자가 쉽게 수정할 수 있도록)

**NOT In Scope:**
- OG 이미지 자동 생성 (`@vercel/og` 등) — P3로 분류
- 소셜 공유 버튼 UI

#### 구현
- `payload/_global.ts`의 샘플 값을 의미 있는 플레이스홀더로 변경
- 코드 변경량: 파일 1개, 20줄 미만

---

### F-11: 다크 모드

#### 스코프

**In Scope:**
- 다크/라이트 모드 토글 버튼
- CSS 변수 기반 테마 시스템
- 시스템 설정(`prefers-color-scheme`) 감지 및 자동 적용
- `localStorage`로 사용자 선택 기억

**NOT In Scope:**
- 커스텀 테마 색상 선택
- 다크 모드 전용 프로필 이미지

#### 구현 방향
- `Style.ts`의 하드코딩 색상을 CSS 변수로 전환
- `<html data-theme="dark">` 토글 방식
- Bootstrap 5의 `data-bs-theme="dark"` 네이티브 다크 모드 활용 (BS5 업그레이드 후)

#### 가정 (검증 필요)
- 다크 모드가 개발자 이력서의 기술 감각에 긍정적 영향을 미친다 — **신뢰도: LOW**

---

### F-12: 스킬 시각화 개선

#### 스코프

**In Scope:**
- 숫자 레벨(1~3)을 시각적 프로그레스 표시로 변환
- 도트 표시(예: ●●○) 또는 간단한 바 형태
- 기존 뱃지 색상 구분 유지하면서 시각 요소 추가

**NOT In Scope:**
- 인터랙티브 스킬 맵/그래프
- 레벨 체계 변경 (1~3 유지)

#### Payload 데이터 구조 변경
- 없음 (기존 `ISkill.Item.level` 필드 활용)
- 컴포넌트 렌더링 로직만 변경

---

### F-13: 다국어 지원 (i18n)

#### 스코프

**In Scope:**
- 한국어 ↔ 영어 토글 기능
- payload 데이터를 언어별로 분리 (`payload/ko/`, `payload/en/`)
- UI 라벨(섹션 제목 등) 다국어 대응
- 토글 버튼 UI

**NOT In Scope:**
- 3개 이상 언어 지원
- URL 기반 라우팅 (`/en`, `/ko` — 정적 단일 페이지 제약)
- 자동 번역

#### Payload 데이터 구조 변경

```typescript
// payload/index.ts — 변경
import ko from './ko';
import en from './en';

const Payload = {
  ko,
  en,
  _global, // 글로벌 설정은 언어 무관
};

// 또는 기존 구조 유지하면서 각 payload 파일에 다국어 키 추가
// (구조적으로 전자가 깔끔하나, 마이그레이션 비용이 높음)
```

#### 가정 (검증 필요)
- 영어 이력서 수요가 실제로 존재한다 — **신뢰도: MEDIUM** (글로벌 기업 지원 시)

---

## 5. NOT DOING (명시적 제외)

| 제외 기능 | 제외 사유 |
|-----------|-----------|
| GitHub 히트맵 연동 | 외부 API 의존, 정적 사이트 제약, 유지보수 부담 |
| 기술 블로그 RSS 연동 | 정적 빌드 시점의 데이터만 반영 가능, 실시간성 부족 |
| 커맨드 팔레트 (`Ctrl+K`) | 노벨티는 높으나 실용성 낮음. 개발 비용 대비 효용 불확실 |
| OG 이미지 자동 생성 | `@vercel/og`/`satori` 의존성 추가, 정적 export 호환성 검증 필요. 핵심 기능 완료 후 검토 |
| 방문자 분석 대시보드 | 이력서 본연의 기능과 무관. GA4로 충분히 대체 가능 |
| 인터랙티브 스킬 맵 | D3.js 등 무거운 의존성. 단순 이력서에 과도한 복잡도 |
| 섹션 순서 동적 제어 | payload에서 순서를 지정하는 것은 과도한 추상화. 코드 순서 변경으로 충분 |

---

## 6. 단계별 구현 로드맵

### 전제 조건
- 기술 업그레이드(`04-technical-upgrade.md`)와 병행 또는 이후에 진행
- Phase 1은 현재 기술 스택(Next.js 10)에서도 구현 가능
- Phase 2~3는 기술 업그레이드 완료 후 진행을 권장

---

### Phase 1: Quick Wins — 코드 최소 변경, 즉시 효과 (1~2일)

> **목표**: payload 데이터 수정과 JSX 순서 변경만으로 채용담당자 경험을 즉시 개선

| 순서 | 기능 | 작업 내용 | 변경 파일 |
|------|------|----------|-----------|
| 1 | F-10 | OG 메타태그 개인화 | `payload/_global.ts` |
| 2 | F-03 | 섹션 순서 재배치 | `pages/index.tsx` |
| 3 | F-09 | JSON-LD 구조화 데이터 추가 | `payload/_global.ts`, `pages/index.tsx` |

**검증**: 빌드 성공 확인, OG 태그 미리보기 검증, JSON-LD 구조화 데이터 검증기 통과

---

### Phase 2: 핵심 기능 — 프로필 강화 + 신규 섹션 (3~5일)

> **목표**: "3초 안에 핵심 역량 전달" 달성

| 순서 | 기능 | 작업 내용 | 변경/신규 파일 |
|------|------|----------|---------------|
| 1 | F-01 | `IProfile.Payload`에 `tagline`, `headings` 추가 | `IProfile.ts`, `profile/index.tsx`, `payload/profile.ts` |
| 2 | F-07 | `IProfile.Payload`에 `ctas` 추가 | `IProfile.ts`, `profile/index.tsx`, `payload/profile.ts` |
| 3 | F-02 | Highlight 섹션 신규 생성 | `component/highlight/*` (신규), `payload/highlight.ts` (신규), `payload/index.ts`, `pages/index.tsx` |
| 4 | F-04 | Testimonial 섹션 신규 생성 | `component/testimonial/*` (신규), `payload/testimonial.ts` (신규), `payload/index.ts`, `pages/index.tsx` |

**검증**: 각 섹션 `disable: true`/`false` 토글 정상 동작, 빈 데이터 시 에러 없음

---

### Phase 3: UI/UX 개선 — 탐색성 및 시각화 (3~5일)

> **목표**: 전문적이고 세련된 이력서 인터랙션 구현

| 순서 | 기능 | 작업 내용 | 변경/신규 파일 |
|------|------|----------|---------------|
| 1 | F-05 | 플로팅 네비게이션 | `component/nav/*` (신규), `pages/index.tsx` |
| 2 | F-06 | 스크롤 진입 애니메이션 | `component/common/PreProcessingComponent.tsx` 또는 신규 래퍼 |
| 3 | F-12 | 스킬 시각화 개선 | `component/skill/index.tsx` |
| 4 | F-08 | PDF/인쇄 최적화 | `print.css` (신규), `pages/_app.tsx` |

**검증**: 다양한 브라우저/기기에서 네비게이션 동작, 인쇄 미리보기, `prefers-reduced-motion` 존중

---

### Phase 4: 차별화 기능 (검토 후 진행)

> **전제**: Phase 1~3 완료 + 기술 업그레이드 완료 후

| 순서 | 기능 | 작업 내용 | 비고 |
|------|------|----------|------|
| 1 | F-11 | 다크 모드 | Bootstrap 5 + CSS 변수 기반. BS5 업그레이드 후 진행 |
| 2 | F-13 | 다국어 지원 | payload 구조 대규모 변경 필요. 별도 설계 문서 필요 |

---

## 7. 가정 및 검증 필요 사항

| 가정 | 검증 방법 | 신뢰도 |
|------|-----------|--------|
| 채용담당자는 이력서를 6~7초 스캔한다 | Eye-tracking 연구 문헌 (Ladders, 2018) | HIGH |
| 핵심 성과 카드가 첫인상에 긍정적 영향을 준다 | 채용담당자 피드백 수집 | MEDIUM |
| 섹션 순서 변경이 정보 탐색 효율을 높인다 | GA4 스크롤 깊이 비교 (전/후) | MEDIUM |
| 추천사 섹션이 신뢰도를 높인다 | 채용담당자 인터뷰 | MEDIUM |
| 다크 모드가 기술 감각 인상에 기여한다 | 사용자 설문 | LOW |
| 영어 이력서 수요가 존재한다 | 실제 글로벌 기업 지원 빈도 확인 | MEDIUM |

---

## 8. 성공 지표

### KPI 트리

```
이력서를 통한 채용 기회 확대
├── 첫인상 (3초 규칙)
│   ├── Profile 영역에서 직함/역량 즉시 파악 가능 여부
│   └── Highlight 섹션 Above the Fold 노출 여부
├── 탐색성
│   ├── 평균 스크롤 깊이 (목표: 70% → 85%)
│   └── 섹션 간 이동 편의성 (플로팅 네비게이션 클릭률)
├── 신뢰도
│   ├── Testimonial 섹션 존재
│   └── JSON-LD 리치 스니펫 노출 여부
└── 전환
    ├── CTA 버튼 클릭률
    ├── 이메일 문의 수
    └── PDF/인쇄 사용 빈도
```

---

## 9. 의존 관계 다이어그램

```
F-10 (OG 메타) ──────────────────────────┐
F-03 (섹션 순서) ────────────────────────┤── Phase 1 (독립 실행 가능)
F-09 (JSON-LD) ──────────────────────────┘

F-01 (히어로 강화) ──┐
F-07 (CTA 버튼) ────┤── Phase 2 (Profile 관련, 순차 진행 권장)
                     │
F-02 (Highlight) ───┤── Phase 2 (독립 실행 가능)
F-04 (Testimonial) ─┘── Phase 2 (독립 실행 가능)

F-05 (네비게이션) ──┐
F-06 (애니메이션) ──┤── Phase 3 (독립 실행 가능)
F-12 (스킬 시각화) ─┤
F-08 (인쇄 최적화) ─┘── Phase 3 (F-05 이후 권장: 인쇄 시 네비 숨김)

F-11 (다크 모드) ───── Phase 4 (Bootstrap 5 업그레이드 의존)
F-13 (다국어) ─────── Phase 4 (payload 구조 변경 필요)
```

---

## 10. PDF/인쇄 출력 전략 (상세)

> 이 프로젝트는 웹 이력서를 지향하지만, **PDF 또는 인쇄 출력물로도 동일한 품질을 제공**해야 합니다.
> 채용 프로세스에서 PDF 전달은 여전히 표준이므로, 웹 경험과 인쇄 경험을 동시에 만족시키는 아키텍처가 필수입니다.

### 10.1 설계 원칙

1. **Single Source of Truth**: 모든 콘텐츠는 `payload/*.ts`에만 존재. 웹과 인쇄 모두 동일 데이터에서 렌더링
2. **Progressive Enhancement 역방향**: 웹에서 추가된 인터랙션을 인쇄 시 우아하게 제거 (Graceful Degradation)
3. **Zero Duplication**: 인쇄 전용 컴포넌트를 만들지 않음. CSS 레이어만으로 모드 전환
4. **자동화 우선**: 빌드 파이프라인에서 PDF를 자동 생성하여 항상 최신 상태 유지

### 10.2 아키텍처: 이중 렌더링 흐름

```
                    payload/*.ts
                        │
                        ▼
              component/<section>/index.tsx
                        │
              ┌─────────┴─────────┐
              ▼                   ▼
        [웹 브라우저]         [@media print]
              │                   │
     인터랙티브 렌더링      정적 렌더링 (CSS 전환)
     - 애니메이션            - 애니메이션 제거
     - 플로팅 네비           - 네비 숨김
     - 다크모드 토글         - 강제 라이트
     - CTA 버튼             - 버튼 숨김
     - 반응형 그리드         - 단일 컬럼
              │                   │
              ▼                   ▼
        웹 이력서 URL       브라우저 인쇄 → PDF
                                  │
                                  ▼ (자동화)
                          빌드 타임 PDF 생성
                          docs/resume.pdf
```

**핵심**: 컴포넌트는 하나. 렌더링 모드만 CSS로 전환. payload 수정 1회로 웹/PDF 동시 업데이트.

### 10.3 각 기능의 인쇄 모드 대응 명세

모든 새 기능(F-01 ~ F-13)은 인쇄 모드에서의 동작을 사전에 정의해야 합니다.

| 기능 | 웹 모드 | 인쇄 모드 | CSS 처리 |
|------|---------|----------|----------|
| **F-01** 프로필 히어로 | 태그라인 + 수치 카드 그리드 | 태그라인 + 수치 인라인 텍스트 | 그리드 → `display: block` |
| **F-02** Highlight 카드 | 3열 카드 레이아웃 | 번호 매긴 리스트 | 카드 스타일 제거, `list-style: decimal` |
| **F-03** 섹션 순서 | 웹 최적화 순서 | 동일 순서 유지 | 변경 없음 |
| **F-04** Testimonial | 인용문 카드 + 추천인 사진 | 인용문 텍스트 + 추천인 이름/직함 | 사진 숨김, 카드 스타일 제거 |
| **F-05** 플로팅 네비 | 우측 고정 표시 | 완전 숨김 | `display: none` |
| **F-06** 스크롤 애니메이션 | fade-in 효과 | 즉시 표시 | `opacity: 1; transform: none` |
| **F-07** CTA 버튼 | 클릭 가능 버튼 | 완전 숨김 | `display: none` |
| **F-08** PDF/인쇄 자체 | — | — | 본 섹션 자체 |
| **F-09** JSON-LD | `<head>` 내 스크립트 | 영향 없음 (비표시 요소) | 변경 없음 |
| **F-10** OG 메타태그 | `<head>` 내 메타 | 영향 없음 (비표시 요소) | 변경 없음 |
| **F-11** 다크 모드 | 토글 가능 | 강제 라이트 모드 + 토글 숨김 | `color-scheme: light` 강제 |
| **F-12** 스킬 시각화 | 프로그레스 바/도트 | 텍스트 레벨 (예: "★★★") | 바 숨김 + 텍스트 표시 fallback |
| **F-13** 다국어 토글 | 토글 버튼 표시 | 토글 숨김, 현재 언어로 고정 | `display: none` |

### 10.4 인쇄 전용 CSS 설계 상세

```css
/* print.css — 구현 시 참고용 설계 */

@media print {
  /* ===== 1. 전역 초기화 ===== */
  * {
    animation: none !important;
    transition: none !important;
    opacity: 1 !important;
    transform: none !important;
    box-shadow: none !important;
  }

  body {
    width: 210mm;
    margin: 0;
    padding: 10mm 15mm;
    font-size: 11pt;
    line-height: 1.5;
    color: #000 !important;
    background: #fff !important;
  }

  /* ===== 2. 레이아웃 ===== */
  .container {
    max-width: 100%;
    padding: 0;
  }

  /* ===== 3. 인터랙티브 요소 숨김 ===== */
  .floating-nav,
  .cta-button,
  .dark-mode-toggle,
  .scroll-to-top,
  .language-toggle {
    display: none !important;
  }

  /* ===== 4. 페이지 분할 제어 ===== */
  h2, h3 {
    page-break-after: avoid;
  }
  .experience-item,
  .project-item,
  .testimonial-item {
    page-break-inside: avoid;
  }
  .section {
    page-break-before: auto;
  }

  /* ===== 5. 링크 URL 표시 ===== */
  a[href^="http"]::after {
    content: " (" attr(href) ")";
    font-size: 0.8em;
    color: #666;
    word-break: break-all;
  }
  /* 내부 링크(mailto 등)는 URL 표시 제외 */
  a[href^="mailto"]::after { content: ""; }

  /* ===== 6. 외부 리소스 대응 ===== */
  /* shields.io 뱃지 등 외부 이미지는 인쇄 시 깨질 수 있음 */
  img[src*="shields.io"],
  img[src*="badge"] {
    display: none !important;
  }

  /* ===== 7. 카드 레이아웃 → 리스트 전환 ===== */
  .highlight-card {
    display: block;
    border: none;
    padding: 0;
    margin-bottom: 0.5em;
  }

  /* ===== 8. 스킬 시각화 fallback ===== */
  .skill-progress-bar { display: none; }
  .skill-text-level { display: inline; }

  /* ===== 9. 다크 모드 강제 해제 ===== */
  html[data-theme="dark"] * {
    color: #000 !important;
    background-color: #fff !important;
  }
}
```

### 10.5 빌드 타임 PDF 자동 생성 (Phase 3 이후)

#### CI/CD 통합 방안

```yaml
# .github/workflows/deploy.yml 에 추가
- name: Generate PDF
  run: |
    npx playwright install chromium
    node scripts/generate-pdf.js
  env:
    RESUME_URL: file://${{ github.workspace }}/docs/index.html
    OUTPUT_PATH: docs/resume.pdf
```

```javascript
// scripts/generate-pdf.js
const { chromium } = require('playwright');
const path = require('path');

async function generatePDF() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const htmlPath = process.env.RESUME_URL
    || `file://${path.resolve(__dirname, '../docs/index.html')}`;
  const outputPath = process.env.OUTPUT_PATH
    || path.resolve(__dirname, '../docs/resume.pdf');

  await page.goto(htmlPath, { waitUntil: 'networkidle' });
  await page.pdf({
    path: outputPath,
    format: 'A4',
    margin: { top: '10mm', bottom: '10mm', left: '15mm', right: '15mm' },
    printBackground: true,
    displayHeaderFooter: false,
  });

  await browser.close();
  console.log(`PDF generated: ${outputPath}`);
}

generatePDF();
```

#### PDF 생성 흐름

```
npm run export
    │
    ├── 1. Next.js static build → docs/index.html
    ├── 2. shellwork.js → docs/.nojekyll, docs/CNAME
    └── 3. generate-pdf.js → docs/resume.pdf  (추가)
                                    │
                                    ▼
                          CTA 버튼 다운로드 링크
                          <a href="/resume.pdf">이력서 다운로드</a>
```

#### 로컬 vs CI 전략

| 환경 | PDF 생성 방식 | 비고 |
|------|-------------|------|
| **로컬 개발** | 브라우저 인쇄(Ctrl+P) → PDF | Playwright 설치 불필요 |
| **CI/CD** | Playwright 자동 생성 | `docs/resume.pdf` 산출물 포함 |
| **GitHub Pages** | CI에서 생성한 PDF를 함께 배포 | 항상 최신 PDF 유지 |

### 10.6 컴포넌트 개발 가이드라인

새로운 기능(F-01 ~ F-13)을 구현할 때 반드시 지켜야 할 인쇄 호환성 규칙:

1. **인터랙티브 요소에는 반드시 식별 가능한 CSS 클래스를 부여**
   - 인쇄 CSS에서 `display: none`으로 숨길 수 있도록
   - 예: `.floating-nav`, `.cta-button`, `.dark-mode-toggle`

2. **카드/그리드 레이아웃은 `@media print`에서 리스트로 전환**
   - Highlight 카드, Testimonial 카드 등
   - 인쇄 시 3열 그리드 → 단일 컬럼 리스트

3. **스킬 시각화 등 비텍스트 요소는 텍스트 fallback 준비**
   - 프로그레스 바 → 텍스트 레벨
   - 웹: `<div class="skill-progress-bar">`, 인쇄: `<span class="skill-text-level">`
   - 양쪽 모두 렌더링하되 CSS로 한쪽만 표시

4. **외부 이미지 의존 최소화**
   - shields.io 뱃지 등은 인쇄 시 깨질 수 있음
   - 인쇄 CSS에서 숨기고, 텍스트 대체 제공

5. **`page-break-inside: avoid`를 항목 단위로 적용**
   - Experience, Project, Testimonial 등의 개별 항목이 페이지 경계에서 잘리지 않도록

---

*이 문서는 마케팅 전략(`01-marketing-strategy.md`)과 기술 분석(`04-technical-upgrade.md`)을 기반으로 작성된 기능 기획서입니다. 각 기능의 구현 시 디자인 상세는 별도 UI/UX 설계 문서에서 다룹니다.*
