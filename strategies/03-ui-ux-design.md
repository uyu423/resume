# UI/UX 디자인 개선안: 웹 이력서 v2

> 작성일: 2026-02-17
> 선행 문서: `01-marketing-strategy.md` (마케팅 전략), `02-feature-planning.md` (기능 기획)
> 대상 프로젝트: resume-nextjs (Next.js 기반 정적 웹 이력서 생성기)

---

## 1. 현재 UI/UX 분석

### 1.1 현재 디자인 스택

| 요소 | 현재 상태 |
|------|-----------|
| CSS 프레임워크 | Bootstrap 4 (`reactstrap` 바인딩) |
| 스타일링 방식 | 인라인 스타일 (`Style.ts` 상수) + Bootstrap 유틸리티 클래스 |
| 타이포그래피 | Pretendard (weight 300), Noto Sans KR, Parisienne (서명용) |
| 색상 팔레트 | `#3c78d8` (파란색 1개) + `gray` + `#f5f5f5` (footer 배경) |
| 레이아웃 | Bootstrap Container, 3:9 그리드 비율 (좌: 날짜/카테고리, 우: 내용) |
| 아이콘 | FontAwesome 5 (연락처에만 사용) |
| 애니메이션 | 없음 |
| 반응형 | Bootstrap 기본 breakpoint만 사용 (md: 768px) |

### 1.2 시각적 계층 구조 진단

현재 이력서의 시각적 계층(Visual Hierarchy)을 5단계로 분석합니다:

```
Level 1 (최상위 주목)  : 이름 (h1, #3c78d8)
Level 2 (섹션 제목)    : EXPERIENCE, SKILL 등 (h2, #3c78d8) — Level 1과 동일 색상
Level 3 (항목 제목)    : 회사명, 프로젝트명 (h4, 기본 검정)
Level 4 (보조 정보)    : 날짜, 직책 (h4/span, gray)
Level 5 (본문)        : 설명 텍스트 (li, Pretendard 300)
```

**문제점**: Level 1과 Level 2가 동일한 `#3c78d8` 색상을 사용하여 시각적 구분이 모호합니다. Level 3~5 사이의 타이포그래피 대비도 부족합니다.

### 1.3 핵심 개선 필요 포인트

#### A. 시각적 정체성 부재

| 문제 | 상세 | 심각도 |
|------|------|--------|
| **단색 의존** | 전체 페이지가 `#3c78d8` 하나의 강조색에 의존. 시각적 리듬 없음 | HIGH |
| **타이포그래피 단조** | Pretendard weight 300 단일 사용. 제목/본문 간 대비 부족 | HIGH |
| **섹션 구분 빈약** | `<hr>` + `mt-5` 여백만으로 섹션 구분. 시각적 리듬감 없음 | MEDIUM |
| **기본 Bootstrap 외형** | reactstrap 기본 스타일 그대로 사용. 커스텀 없음 | MEDIUM |

#### B. 첫인상(Above the Fold) 약점

| 문제 | 상세 | 심각도 |
|------|------|--------|
| **히어로 영역 부재** | 프로필이 이름+연락처+공지의 단순 나열. 시각적 임팩트 없음 | HIGH |
| **프로필 사진 처리** | `max-height: 320px`, `img-fluid rounded`만 적용. 시각적 효과 없음 | MEDIUM |
| **이름 영역** | h1에 `#3c78d8` 인라인 스타일만. 직함/태그라인 없음 | HIGH |
| **공지 영역** | Bootstrap `Alert` 기본 스타일. 시각적으로 산만함 | LOW |

#### C. 콘텐츠 가독성

| 문제 | 상세 | 심각도 |
|------|------|--------|
| **스킬 레벨 표현** | 숫자 1/2/3 pill badge만. 직관적이지 않음 | MEDIUM |
| **경력 항목 밀도** | description이 `<li>` 나열. 핵심과 부가 정보 구분 없음 | MEDIUM |
| **Skill Keyword 뱃지** | `Badge color="secondary"` 기본 스타일. 회색 뱃지가 눈에 띄지 않음 | LOW |
| **긴 페이지 탐색** | 10+ 섹션인데 네비게이션 없음. 원하는 정보 탐색 어려움 | MEDIUM |

#### D. 반응형 디자인

| 문제 | 상세 | 심각도 |
|------|------|--------|
| **모바일 레이아웃** | 3:9 그리드가 12:12로 전환될 뿐, 모바일 최적화 없음 | MEDIUM |
| **모바일 프로필** | 사진이 너무 크게 표시 (max-height: 320px) | LOW |
| **모바일 여백** | Bootstrap Container 기본 padding만. 터치 영역 고려 없음 | LOW |
| **breakpoint** | md(768px) 1개만 사용. sm/lg/xl 미활용 | MEDIUM |

---

## 2. 디자인 컨셉

### 2.1 디자인 방향: "Confident Clarity"

**컨셉 키워드**: 자신감 있는 명료함

개발자 이력서는 "나는 신뢰할 수 있는 전문가"라는 메시지를 전달해야 합니다. 화려한 장식이 아닌, **구조적 아름다움**과 **의도적인 여백**으로 전문성을 표현합니다.

```
"The ability to simplify means to eliminate the unnecessary
 so that the necessary may speak." — Hans Hofmann
```

#### 디자인 원칙 4가지

1. **Structured Breathing** — 넉넉한 여백과 명확한 그리드로 정보가 숨 쉬는 레이아웃
2. **Typographic Hierarchy** — 폰트 크기/굵기/색상의 명확한 계층으로 스캔 가능한 구조
3. **Restrained Accent** — 절제된 색상 사용. 강조는 적을수록 강하다
4. **Purposeful Motion** — 모든 애니메이션에는 의미가 있어야 한다

### 2.2 무드보드 방향

#### 톤 & 매너

| 속성 | 방향 | 반대 방향 (피할 것) |
|------|------|-------------------|
| 전체 톤 | 차분하면서 단단한 (Calm & Solid) | 화려하거나 장식적인 |
| 색감 | 모노톤 기반 + 단일 포인트 컬러 | 다색 그라데이션, 네온 |
| 공간감 | 넓은 여백, 시원한 공기감 | 빽빽한 정보 밀도 |
| 서체 | 기하학적 산세리프 (제목) + 휴머니스트 산세리프 (본문) | 필기체, 장식 서체 남용 |
| 인터랙션 | 미묘하고 자연스러운 전환 | 과도한 3D, 패럴랙스 |

#### 레퍼런스 스타일

- **에디토리얼 매거진**: Monocle, Kinfolk 같은 미니멀 매거진의 타이포그래피 중심 레이아웃
- **테크 기업 채용 페이지**: Stripe, Linear, Vercel의 깔끔한 정보 구조
- **이력서 베스트 프랙티스**: 좌우 분할 레이아웃의 현대적 해석

### 2.3 현재 디자인 vs 제안 디자인 비교

```
현재:
┌──────────────────────────────────┐
│ [사진]  이름                      │ ← 단조로운 프로필
│         연락처, 연락처, ...       │
│         ⚠ 공지                   │
├──────────────────────────────────┤
│ INTRODUCE                        │ ← 장문 텍스트 벽
│ 긴 영문 단락...                   │
├──────────────────────────────────┤
│ SKILL                            │ ← 숫자 나열
│ ① TypeScript  ② React  ...      │
├──────────────────────────────────┤
│ ...이하 동일 패턴 반복...          │
└──────────────────────────────────┘

제안:
┌──────────────────────────────────┐
│                                  │
│     [원형 사진]                   │
│     이름                         │ ← 강화된 히어로
│     한 줄 태그라인                │
│     ┌─────┬─────┬─────┐         │
│     │10+년│50+건│15+개│         │ ← 핵심 수치 카드
│     └─────┴─────┴─────┘         │
│     [이메일] [PDF 다운로드]       │ ← CTA 버튼
│                                  │
├──────────────────────────────────┤
│                                  │
│ ┌ HIGHLIGHT ──────────────────┐  │
│ │ ■ 핵심 성과 1               │  │ ← 3초 안에 핵심 전달
│ │ ■ 핵심 성과 2               │  │
│ │ ■ 핵심 성과 3               │  │
│ └─────────────────────────────┘  │
│                                  │
├──────────────────────────────────┤
│ EXPERIENCE                       │
│ ┃ 2020~현재  회사A  ■재직 중     │ ← 타임라인 강조
│ ┃            CTO                 │
│ ┃            · 성과 중심 설명     │
│ ┃                                │
│ ┃ 2017~2020 회사B                │
│ ...                              │
├──────────────────────────────────┤
│ PROJECT                          │
│ SKILL ──── ●●●○ 시각화          │ ← 도트 레벨
│ OPEN SOURCE                      │
│ ...                              │
├──────────────────────────────────┤
│ ◉ 플로팅 네비게이션 (우측)        │
│ ◉ 스크롤 진입 애니메이션          │
└──────────────────────────────────┘
```

---

## 3. 타이포그래피 시스템

### 3.1 폰트 선정

| 용도 | 현재 | 제안 | 근거 |
|------|------|------|------|
| **제목 (Display)** | Pretendard 300 | **Pretendard** weight 700~800 | 기존 폰트 유지하되 weight 계층화. 추가 네트워크 요청 없음 |
| **본문 (Body)** | Pretendard 300 | **Pretendard** weight 300~400 | 가독성 유지 |
| **수치/강조 (Data)** | 없음 | **Pretendard** weight 600 + tabular numerals | 숫자 정렬 및 강조 |
| **서명 (Signature)** | Parisienne | **Parisienne** | 유지 — 개성 포인트로 적합 |
| **코드/기술명** | 없음 | **JetBrains Mono** (optional) | 기술 스택, 키워드 뱃지에 모노스페이스 적용. 개발자 정체성 표현 |

> **설계 원칙**: 폰트 종류를 늘리지 않고, weight 계층화로 시각적 리듬을 만든다. Pretendard는 weight 100~900을 모두 지원하므로 추가 폰트 로딩 불필요.

### 3.2 타이포그래피 스케일

Material Design의 Type Scale을 참고하되, 이력서 맥락에 맞게 조정합니다.

| 토큰명 | 용도 | 크기 | 굵기 | 행간 | 적용 대상 |
|--------|------|------|------|------|-----------|
| `display-lg` | 이름 | 2.5rem (40px) | 800 | 1.2 | Profile 이름 |
| `display-sm` | 태그라인 | 1.25rem (20px) | 400 | 1.4 | Profile 태그라인 |
| `heading-1` | 섹션 제목 | 1.5rem (24px) | 700 | 1.3 | EXPERIENCE, SKILL 등 |
| `heading-2` | 항목 제목 | 1.125rem (18px) | 600 | 1.4 | 회사명, 프로젝트명 |
| `heading-3` | 보조 제목 | 1rem (16px) | 500 | 1.4 | 직책, 날짜 |
| `body` | 본문 | 0.9375rem (15px) | 300 | 1.8 | 설명 텍스트 |
| `caption` | 보조 텍스트 | 0.8125rem (13px) | 400 | 1.5 | 뱃지 내 텍스트, 기간 |
| `label` | 라벨 | 0.75rem (12px) | 500 | 1.2 | 카테고리명, 레벨 텍스트 |

### 3.3 구현 방향

```css
/* CSS Custom Properties로 관리 */
:root {
  --font-display: 'Pretendard', -apple-system, sans-serif;
  --font-body: 'Pretendard', -apple-system, sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;  /* optional */
  --font-signature: 'Parisienne', cursive;

  --fw-light: 300;
  --fw-regular: 400;
  --fw-medium: 500;
  --fw-semibold: 600;
  --fw-bold: 700;
  --fw-extrabold: 800;
}
```

> **Note**: Noto Sans KR은 Pretendard와 역할이 중복되므로 `_document.tsx`에서 제거를 권장합니다. 네트워크 요청 1건 감소.

---

## 4. 색상 시스템

### 4.1 색상 팔레트 설계

현재의 `#3c78d8` 단일 색상 체계를 의미 기반 팔레트로 확장합니다.

#### 라이트 모드 (기본)

| 토큰명 | 색상 | HEX | 용도 |
|--------|------|-----|------|
| `--color-primary` | 딥 네이비 | `#1a1a2e` | 이름, 섹션 제목, 주요 텍스트 |
| `--color-accent` | 인디고 블루 | `#4361ee` | 링크, CTA 버튼, 강조 포인트 |
| `--color-accent-hover` | 미디엄 블루 | `#3a56d4` | 호버 상태 |
| `--color-text` | 차콜 | `#2d2d2d` | 본문 텍스트 |
| `--color-text-secondary` | 슬레이트 | `#64748b` | 날짜, 보조 텍스트 |
| `--color-text-muted` | 라이트 그레이 | `#94a3b8` | 비활성, 메타 정보 |
| `--color-border` | 연한 경계 | `#e2e8f0` | 구분선, 카드 테두리 |
| `--color-bg` | 화이트 | `#ffffff` | 기본 배경 |
| `--color-bg-subtle` | 쿨 그레이 | `#f8fafc` | 교차 섹션 배경, 카드 배경 |
| `--color-bg-highlight` | 인디고 틴트 | `#eef2ff` | 하이라이트 카드, 호버 배경 |
| `--color-success` | 그린 | `#10b981` | "재직 중" 뱃지 |
| `--color-info` | 스카이 블루 | `#0ea5e9` | 기간 뱃지 |

#### 다크 모드

| 토큰명 | HEX | 비고 |
|--------|-----|------|
| `--color-primary` | `#e2e8f0` | 밝은 텍스트 |
| `--color-accent` | `#818cf8` | 더 밝은 인디고 |
| `--color-text` | `#cbd5e1` | |
| `--color-text-secondary` | `#94a3b8` | |
| `--color-bg` | `#0f172a` | 다크 네이비 |
| `--color-bg-subtle` | `#1e293b` | |
| `--color-border` | `#334155` | |

### 4.2 색상 설계 근거

1. **`#3c78d8` → `#4361ee`로 변경**: 기존 파란색은 Google Docs/Sheets의 기본 색상과 동일하여 "기본값" 인상을 줍니다. `#4361ee`는 더 현대적이고 의도적인 선택입니다.
2. **네이비 기반 Primary**: 순수 검정(#000) 대신 `#1a1a2e` 딥 네이비를 사용하여 부드러우면서도 강한 인상을 줍니다.
3. **슬레이트 계열 그레이**: Bootstrap 기본 `gray` 대신 블루 언더톤의 슬레이트(`#64748b`) 계열을 사용하여 accent 색상과 조화를 이룹니다.
4. **"재직 중" 뱃지 색상 변경**: `primary`(파란색) → `#10b981`(그린). 파란색은 이미 accent로 사용되므로, "현재/활성" 의미를 가진 그린으로 차별화합니다.

### 4.3 구현 방향

```css
:root {
  /* Light Mode (기본) */
  --color-primary: #1a1a2e;
  --color-accent: #4361ee;
  --color-accent-hover: #3a56d4;
  --color-text: #2d2d2d;
  --color-text-secondary: #64748b;
  --color-text-muted: #94a3b8;
  --color-border: #e2e8f0;
  --color-bg: #ffffff;
  --color-bg-subtle: #f8fafc;
  --color-bg-highlight: #eef2ff;
  --color-success: #10b981;
  --color-info: #0ea5e9;
}

[data-theme="dark"] {
  --color-primary: #e2e8f0;
  --color-accent: #818cf8;
  --color-accent-hover: #6366f1;
  --color-text: #cbd5e1;
  --color-text-secondary: #94a3b8;
  --color-text-muted: #64748b;
  --color-border: #334155;
  --color-bg: #0f172a;
  --color-bg-subtle: #1e293b;
  --color-bg-highlight: #1e1b4b;
  --color-success: #34d399;
  --color-info: #38bdf8;
}
```

> **마이그레이션**: `Style.ts`의 인라인 스타일을 점진적으로 CSS 변수 참조로 전환합니다. Phase 1에서는 `Style.ts`에서 CSS 변수를 참조하도록 하여 기존 컴포넌트 코드 변경을 최소화합니다.

---

## 5. 레이아웃 시스템

### 5.1 전체 페이지 구조

```
┌─────────────────────────────────────────────────┐
│                  max-width: 860px                │
│                  (현재: Bootstrap Container)      │
│                                                  │
│  ┌─ Hero Section ─────────────────────────────┐  │
│  │  중앙 정렬, 넉넉한 상하 여백              │  │
│  │  Profile + Headings + CTA                  │  │
│  └────────────────────────────────────────────┘  │
│                                                  │
│  ┌─ Content Sections ─────────────────────────┐  │
│  │  3:9 그리드 유지 (Desktop)                 │  │
│  │  12:12 스택 (Mobile)                       │  │
│  │                                             │  │
│  │  섹션 간: 교차 배경색 (white / bg-subtle)   │  │
│  └────────────────────────────────────────────┘  │
│                                                  │
│  ┌─ Footer ───────────────────────────────────┐  │
│  │  전폭 배경, 중앙 텍스트                    │  │
│  └────────────────────────────────────────────┘  │
│                                                  │
│  ┌─ Floating Nav (Desktop only) ──┐             │
│  │  우측 고정, 현재 섹션 표시      │             │
│  └────────────────────────────────┘             │
└─────────────────────────────────────────────────┘
```

### 5.2 여백 시스템 (Spacing Scale)

Bootstrap 기본 spacing 대신 의도적인 spacing scale을 사용합니다:

| 토큰 | 값 | 용도 |
|------|-----|------|
| `--space-xs` | 4px | 뱃지 간격, 인라인 요소 |
| `--space-sm` | 8px | 아이콘과 텍스트 간격 |
| `--space-md` | 16px | 항목 내부 여백 |
| `--space-lg` | 24px | 항목 간 간격 |
| `--space-xl` | 40px | 섹션 내부 상하 패딩 |
| `--space-2xl` | 64px | 섹션 간 간격 |
| `--space-3xl` | 96px | 히어로 섹션 상하 여백 |

### 5.3 그리드 개선

현재 3:9(md) 비율을 유지하되, breakpoint를 세분화합니다:

| Breakpoint | 레이아웃 | 컬럼 비율 |
|------------|----------|-----------|
| < 576px (xs) | 단일 컬럼, 좌측 정보가 상단에 위치 | 12 |
| 576~767px (sm) | 단일 컬럼, 좌측 정보 인라인 처리 | 12 |
| 768~991px (md) | 2컬럼 | 3:9 (현재와 동일) |
| 992px+ (lg) | 2컬럼 + 플로팅 네비게이션 | 3:9 + 사이드 네비 |

### 5.4 섹션 구분 방식 개선

현재 `<hr>` + `mt-5`를 다음과 같이 개선합니다:

```
방법 1: 교차 배경색 (권장)
┌──────────────── bg: white ─────────────────┐
│  EXPERIENCE                                │
└────────────────────────────────────────────┘
┌──────────────── bg: #f8fafc ───────────────┐
│  PROJECT                                   │
└────────────────────────────────────────────┘
┌──────────────── bg: white ─────────────────┐
│  SKILL                                     │
└────────────────────────────────────────────┘

방법 2: 좌측 액센트 바 (보조)
│ EXPERIENCE          ← 좌측에 2px accent 바
│  회사A
│  회사B
```

**권장**: 방법 1(교차 배경색)을 기본으로, 방법 2(좌측 바)는 Experience의 타임라인 시각화에 활용합니다.

**구현**: Container를 전폭으로 확장하고, 내부 콘텐츠를 `max-width`로 제한합니다.

```
현재: <Container> 안에 모든 섹션 → Container의 max-width에 제한됨
제안: 각 섹션을 전폭 <section>으로 감싸고, 내부에 max-width 래퍼
```

---

## 6. 컴포넌트별 디자인 개선안

### 6.1 Profile (히어로 영역) — F-01, F-07

**현재**: 3:9 그리드에 사진+이름+연락처가 수평 나열
**제안**: 중앙 정렬 히어로 레이아웃으로 전환

#### 레이아웃 변경

```
┌──────────────────────────────────────────┐
│              [여백 96px]                  │
│                                          │
│           ┌──────────┐                   │
│           │          │                   │
│           │  프로필   │  ← 원형, 160px   │
│           │  사진    │     border: 3px   │
│           │          │     accent 색상    │
│           └──────────┘                   │
│                                          │
│            홍 길 동                       │  ← display-lg, 800
│     10년차 백엔드 엔지니어               │  ← display-sm, 400, secondary
│                                          │
│    ┌────────┬────────┬────────┐          │
│    │  10+   │  50+   │  15+   │          │  ← 핵심 수치 카드
│    │ 경력년수│프로젝트 │오픈소스│          │
│    └────────┴────────┴────────┘          │
│                                          │
│    📧 me@email.com  🔗 github.com/xxx   │  ← 연락처 (인라인, 아이콘+텍스트)
│                                          │
│    [✉ 이메일 보내기]  [📄 PDF 다운로드]  │  ← CTA 버튼
│                                          │
│              [여백 64px]                  │
└──────────────────────────────────────────┘
```

#### 프로필 사진 스타일

```css
.profile-image {
  width: 160px;
  height: 160px;
  border-radius: 50%;                    /* 원형 */
  object-fit: cover;
  border: 3px solid var(--color-accent);
  box-shadow: 0 0 0 8px var(--color-bg-highlight); /* 외부 하이라이트 링 */
}
```

#### CTA 버튼 스타일

```css
.cta-primary {
  background: var(--color-accent);
  color: white;
  padding: 10px 24px;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.2s ease;
}
.cta-primary:hover {
  background: var(--color-accent-hover);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(67, 97, 238, 0.3);
}
.cta-secondary {
  background: transparent;
  color: var(--color-accent);
  border: 1.5px solid var(--color-accent);
  padding: 10px 24px;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.2s ease;
}
```

#### 연락처 리디자인

현재 수직 나열 → 수평 인라인 배치로 변경:

```
현재:  📧 me@email.com
       🔗 github.com/xxx
       📱 010-1234-5678

제안:  📧 me@email.com · 🔗 github.com/xxx · 📱 010-1234-5678
```

> **모바일**: 768px 미만에서는 수직 나열로 폴백

#### 공지(Notice) 영역 변경

Bootstrap `Alert` → 커스텀 배너로 변경:

```css
.notice-banner {
  background: var(--color-bg-highlight);
  border-left: 3px solid var(--color-accent);
  padding: 12px 16px;
  border-radius: 0 6px 6px 0;
  font-size: var(--text-caption);
  color: var(--color-text-secondary);
}
```

---

### 6.2 Highlight 섹션 (신규) — F-02

Profile 바로 아래, 첫 번째 콘텐츠 섹션으로 배치됩니다.

#### 레이아웃

```
┌────────────────────────────────────────────┐
│  bg: var(--color-bg-subtle)                │
│                                            │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐   │
│  │ ▎핵심성과1│ │ ▎핵심성과2│ │ ▎핵심성과3│   │  ← 3컬럼 카드
│  │           │ │           │ │           │   │
│  │ 설명 텍스트│ │ 설명 텍스트│ │ 설명 텍스트│   │
│  │           │ │           │ │           │   │
│  │ #keyword  │ │ #keyword  │ │ #keyword  │   │
│  └──────────┘ └──────────┘ └──────────┘   │
│                                            │
└────────────────────────────────────────────┘
```

#### 카드 스타일

```css
.highlight-card {
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-left: 3px solid var(--color-accent);   /* 좌측 액센트 바 */
  border-radius: 0 8px 8px 0;
  padding: 24px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.highlight-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
}
```

#### 반응형

| Breakpoint | 레이아웃 |
|------------|----------|
| lg+ | 3컬럼 (3개 카드 한 줄) |
| md | 2컬럼 + 1컬럼 |
| < md | 1컬럼 스택 |

---

### 6.3 Experience 섹션 개선 — 타임라인 시각화

#### 좌측 타임라인 바 추가

현재의 3:9 그리드를 유지하면서, 좌측 날짜 열에 타임라인 시각 요소를 추가합니다.

```
┌─ 좌측 (3col) ─┬─── 우측 (9col) ──────────────┐
│               │                               │
│  2020.01 ~    │  ● 회사A          ■ 재직 중   │  ← ● = 타임라인 도트
│               │  │ CTO                        │  ← │ = 연결선
│               │  │ · 성과 1                   │
│               │  │ · 성과 2                   │
│               │  │                            │
│  ─ ─ ─ ─ ─ ─ │  │                            │  ← 점선 구분 (hr 대체)
│               │  │                            │
│  2017 ~ 2020  │  ● 회사B          2년 8개월   │
│               │  │ Senior Developer            │
│               │  │ · 성과 1                   │
│               │                               │
└───────────────┴───────────────────────────────┘
```

#### 구현

```css
.experience-timeline {
  position: relative;
}
.experience-timeline::before {
  content: '';
  position: absolute;
  left: 0;  /* 또는 좌측 컬럼 우측 끝 */
  top: 8px;
  bottom: 0;
  width: 2px;
  background: var(--color-border);
}
.experience-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--color-accent);
  border: 2px solid var(--color-bg);
  position: absolute;
  left: -5px; /* 타임라인 바 중앙 */
}
.experience-dot--current {
  background: var(--color-success);
  box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.2); /* 현재 재직 강조 */
}
```

#### "재직 중" 뱃지 리디자인

```css
.badge-current {
  background: var(--color-success);
  color: white;
  font-size: 0.75rem;
  font-weight: 500;
  padding: 2px 8px;
  border-radius: 4px;
}
```

#### Skill Keywords 뱃지 리디자인

```css
.skill-keyword-badge {
  background: var(--color-bg-highlight);
  color: var(--color-accent);
  border: 1px solid var(--color-accent);
  font-size: 0.75rem;
  font-weight: 400;
  padding: 2px 10px;
  border-radius: 4px;
  font-family: var(--font-mono);  /* optional: 기술명에 모노스페이스 */
}
```

---

### 6.4 Skill 섹션 개선 — F-12 시각화

#### 레벨 표현 변경

숫자 뱃지 → 도트 시각화로 변경합니다:

```
현재:   ③ TypeScript     ② React        ① GraphQL
제안:   TypeScript ●●●   React ●●○     GraphQL ●○○
```

#### 도트 스타일

```css
.skill-dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 3px;
}
.skill-dot--filled {
  background: var(--color-accent);
}
.skill-dot--empty {
  background: var(--color-border);
}
```

#### 카테고리 레이아웃 개선

현재 3단 분할 `<ul>` 대신, 태그 클라우드 형태를 고려합니다:

```
현재:
Backend          Frontend         DevOps
· TypeScript     · React          · Docker
· Node.js        · Next.js        · K8s
· Python         · Vue.js         · AWS

제안 (Option A - 현재와 유사하되 도트 추가):
Backend                     Frontend                  DevOps
TypeScript  ●●●             React      ●●●            Docker    ●●●
Node.js     ●●●             Next.js    ●●○            K8s       ●●○
Python      ●●○             Vue.js     ●○○            AWS       ●●●

제안 (Option B - 인라인 태그):
Backend
┌─────────────┐ ┌──────────┐ ┌─────────┐
│ TypeScript●●●│ │ Node.js●●●│ │ Python●●○│
└─────────────┘ └──────────┘ └─────────┘
```

**권장**: Option A. 현재의 리스트 구조와 호환성이 높고, 스캔 가능성도 유지됩니다.

#### Tooltip 개선

현재의 reactstrap Tooltip → 섹션 제목 아래 한 줄 안내 텍스트로 변경:

```
SKILL
● 전문 수준  ●● 실무 적용  ●●● 핵심 역량
```

---

### 6.5 Project 섹션 개선

#### 현재 이슈
- CommonRow 공통 컴포넌트 사용으로 Experience와 시각적으로 동일
- 프로젝트의 독립적 성격이 표현되지 않음

#### 개선 방향

프로젝트를 카드 형태로 표현하되, 현재의 CommonRow 구조를 유지합니다:

```css
.project-item {
  padding: 20px 0;
  border-bottom: 1px solid var(--color-border);
}
.project-item:last-child {
  border-bottom: none;
}
.project-title {
  font-weight: 600;
  color: var(--color-primary);
}
.project-where {
  color: var(--color-text-secondary);
  font-style: italic;
}
```

---

### 6.6 OpenSource 섹션 개선

오픈소스는 이력서의 **차별화 자산**이므로 시각적으로 강조합니다.

#### 뱃지 이미지 레이아웃

```
현재: 뱃지 이미지가 텍스트 옆에 인라인으로 삽입
제안: 뱃지를 별도 행으로 분리하여 시각적 존재감 강화

[프로젝트명]
설명 텍스트
┌─────────────────────────────────────┐
│ ⭐ 1.2k Stars  📦 50k Downloads    │  ← 뱃지 행
└─────────────────────────────────────┘
```

---

### 6.7 Introduce 섹션 리디자인

장문 텍스트 → 구조화된 스토리 레이아웃으로 변경합니다.

```
┌───────────────────────────────────────┐
│                                       │
│  ABOUT ME                             │
│                                       │
│  "복잡한 시스템을 단순하게            │  ← 인용문 스타일
│   만드는 것을 좋아합니다"             │
│                                       │
│  ──────────────────                   │
│                                       │
│  본문 단락 1                          │
│  본문 단락 2                          │
│                                       │
│              ──── 서명 ────           │
│                                       │
│  Latest Updated: 2026.02.17 (D+0)    │  ← 우측 정렬, caption 크기
│                                       │
└───────────────────────────────────────┘
```

#### 인용문 스타일 (첫 문장 강조)

```css
.introduce-quote {
  font-size: 1.25rem;
  font-weight: 400;
  color: var(--color-text-secondary);
  border-left: 3px solid var(--color-accent);
  padding-left: 20px;
  margin-bottom: 24px;
  font-style: italic;
}
```

---

### 6.8 Testimonial 섹션 (신규) — F-04

#### 레이아웃

```
┌────────────────────────────────────────────┐
│  TESTIMONIAL                               │
│                                            │
│  ┌────────────────────────────────────┐    │
│  │ "함께 일할 때 가장 안심이 되는     │    │
│  │  동료였습니다."                    │    │  ← 인용문
│  │                                    │    │
│  │  [사진] 김철수                     │    │  ← 추천인 정보
│  │         OO회사 CTO                │    │
│  │         전 직장 상사               │    │
│  └────────────────────────────────────┘    │
│                                            │
│  ┌────────────────────────────────────┐    │
│  │ "기술적 깊이와 비즈니스 이해를     │    │
│  │  겸비한 엔지니어입니다."           │    │
│  │                                    │    │
│  │  [사진] 이영희                     │    │
│  │         △△회사 VP of Engineering  │    │
│  │         프로젝트 동료              │    │
│  └────────────────────────────────────┘    │
│                                            │
└────────────────────────────────────────────┘
```

#### 인용문 카드 스타일

```css
.testimonial-card {
  background: var(--color-bg-subtle);
  border-radius: 12px;
  padding: 32px;
  margin-bottom: 24px;
  position: relative;
}
.testimonial-card::before {
  content: '\201C';           /* 큰따옴표 " */
  font-size: 4rem;
  color: var(--color-accent);
  opacity: 0.2;
  position: absolute;
  top: 8px;
  left: 16px;
  font-family: Georgia, serif;
  line-height: 1;
}
.testimonial-quote {
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.8;
  color: var(--color-text);
  position: relative;
  z-index: 1;
}
.testimonial-author {
  display: flex;
  align-items: center;
  margin-top: 20px;
  gap: 12px;
}
.testimonial-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
}
```

---

### 6.9 Footer 개선

현재의 미니멀한 footer를 의미 있는 마무리로 변경합니다.

```
현재: v.1.3.1 / Github / Thanks for Outsider
제안:

┌────────────────────────────────────────────┐
│  bg: var(--color-primary)  (다크 배경)      │
│  color: var(--color-bg)                     │
│                                             │
│  Built with Next.js · Designed as Code     │
│  이 이력서도 제 작품입니다                  │
│                                             │
│  v.1.3.1 · GitHub · Outsider              │
│                                             │
└────────────────────────────────────────────┘
```

```css
.footer-cover {
  background: var(--color-primary);
  color: var(--color-bg);
  padding: 40px 0;
  margin-top: 80px;
}
.footer-text {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.6);
}
.footer-link {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: underline;
}
```

---

## 7. 인터랙션 & 마이크로 애니메이션

### 7.1 설계 원칙

| 원칙 | 설명 |
|------|------|
| **의미 있는 움직임** | 모든 애니메이션은 정보 전달을 돕거나 상태 변화를 표현 |
| **자연스러운 물리** | ease-out 커브 기반. 인위적인 바운스/탄성 지양 |
| **접근성 존중** | `prefers-reduced-motion: reduce` 시 애니메이션 비활성화 |
| **성능 우선** | `transform`과 `opacity`만 애니메이션 (composite layer) |

### 7.2 스크롤 진입 애니메이션 — F-06

#### 기본 효과

각 섹션이 뷰포트에 진입할 때 fade-up 효과:

```css
.section-animate {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}
.section-animate.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* 접근성: 움직임 줄이기 설정 존중 */
@media (prefers-reduced-motion: reduce) {
  .section-animate {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
```

#### Intersection Observer 구현

```typescript
// component/common/useScrollAnimation.ts
import { useEffect, useRef, useState } from 'react';

export function useScrollAnimation(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // 한 번만 실행
        }
      },
      { threshold }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}
```

#### 적용 위치

| 섹션 | 애니메이션 | 딜레이 |
|------|-----------|--------|
| Profile (히어로) | 없음 (즉시 표시) | - |
| Highlight 카드 | fade-up, 카드별 stagger 100ms | 0ms, 100ms, 200ms |
| Experience 항목 | fade-up | 0ms |
| 그 외 섹션 | fade-up | 0ms |

### 7.3 호버 인터랙션

| 대상 | 효과 | 속성 |
|------|------|------|
| Highlight 카드 | 살짝 위로 이동 + 그림자 강화 | `translateY(-2px)`, `box-shadow` |
| CTA 버튼 | 살짝 위로 이동 + 그림자 | `translateY(-1px)`, `box-shadow` |
| 링크 텍스트 | 밑줄 색상 전환 | `text-decoration-color` |
| Skill Keyword 뱃지 | 배경색 살짝 진하게 | `background-color` |
| 네비게이션 항목 | 좌측 인디케이터 표시 | `border-left` or `::before` |

### 7.4 전환 타이밍 토큰

```css
:root {
  --transition-fast: 150ms ease-out;
  --transition-base: 200ms ease-out;
  --transition-slow: 300ms ease-out;
  --transition-enter: 600ms ease-out;   /* 스크롤 진입 */
}
```

---

## 8. 플로팅 네비게이션 — F-05

### 8.1 디자인

```
                    ┌──────────────┐
                    │  ○ Profile   │
                    │  ● Highlight │  ← 현재 섹션 강조
                    │  ○ Experience│
                    │  ○ Project   │
                    │  ○ Skill     │
                    │  ○ OpenSource│
                    │  ○ ...       │
                    └──────────────┘
                    우측 고정, 뷰포트 중앙 정렬
```

### 8.2 스타일

```css
.floating-nav {
  position: fixed;
  right: calc((100vw - 860px) / 2 - 120px); /* Container 우측 바깥 */
  top: 50%;
  transform: translateY(-50%);
  z-index: 100;
}
.floating-nav__item {
  display: block;
  padding: 6px 12px;
  font-size: 0.75rem;
  color: var(--color-text-muted);
  text-decoration: none;
  border-left: 2px solid transparent;
  transition: all var(--transition-fast);
  cursor: pointer;
}
.floating-nav__item:hover {
  color: var(--color-text-secondary);
}
.floating-nav__item--active {
  color: var(--color-accent);
  border-left-color: var(--color-accent);
  font-weight: 500;
}
```

### 8.3 반응형 처리

| 조건 | 동작 |
|------|------|
| 뷰포트 > 1200px | 플로팅 네비게이션 표시 |
| 뷰포트 <= 1200px | 숨김 (공간 부족) |
| 인쇄 시 | 숨김 (`@media print`) |

---

## 9. 반응형 디자인 개선안

### 9.1 Breakpoint 전략

| Breakpoint | 대상 | 주요 변경 |
|------------|------|-----------|
| < 576px (xs) | 모바일 세로 | 단일 컬럼, 프로필 사진 120px, 수직 연락처 |
| 576~767px (sm) | 모바일 가로 / 작은 태블릿 | 단일 컬럼, 프로필 사진 140px |
| 768~991px (md) | 태블릿 | 3:9 그리드, 프로필 중앙 정렬 |
| 992~1199px (lg) | 데스크탑 | 3:9 그리드, 풀 레이아웃 |
| 1200px+ (xl) | 와이드 데스크탑 | 3:9 그리드 + 플로팅 네비게이션 |

### 9.2 모바일 최적화 상세

#### Profile (모바일)

```
┌──────────────────────┐
│                      │
│      [원형 사진]      │  ← 120px
│       이름           │  ← display-lg → 2rem으로 축소
│    한 줄 태그라인     │
│                      │
│  ┌──────┬──────┐     │  ← 수치 카드 2열로 변경
│  │ 10+년│ 50+건│     │
│  ├──────┼──────┤     │
│  │ 15+개│      │     │
│  └──────┴──────┘     │
│                      │
│  📧 me@email.com     │  ← 수직 나열
│  🔗 github.com/xxx   │
│                      │
│  [✉ 이메일 보내기]   │  ← 전폭 버튼
│  [📄 PDF 다운로드]   │
│                      │
└──────────────────────┘
```

#### 콘텐츠 섹션 (모바일)

```
┌──────────────────────┐
│  EXPERIENCE          │  ← 좌측 정렬 (text-md-right 해제)
│                      │
│  2020.01 ~           │  ← 날짜가 상단에 위치
│  회사A  ■재직 중     │  ← 회사명 바로 아래
│  CTO                 │
│  · 성과 1            │
│  · 성과 2            │
│                      │
│  ───────────         │
│                      │
│  2017 ~ 2020         │
│  회사B  2년 8개월    │
│  ...                 │
└──────────────────────┘
```

### 9.3 터치 타겟

모바일에서 터치 가능한 요소의 최소 크기를 보장합니다:

```css
@media (max-width: 767px) {
  a, button, .clickable {
    min-height: 44px;     /* Apple HIG 권장 */
    min-width: 44px;
  }
}
```

---

## 10. 인쇄/PDF 최적화 — F-08

### 10.1 인쇄 스타일

```css
@media print {
  /* 불필요한 요소 숨김 */
  .floating-nav,
  .cta-button,
  .dark-mode-toggle,
  .notice-banner {
    display: none !important;
  }

  /* 애니메이션 비활성화 */
  .section-animate {
    opacity: 1 !important;
    transform: none !important;
  }

  /* 배경색/그림자 제거 (잉크 절약) */
  * {
    box-shadow: none !important;
  }
  .highlight-card,
  .testimonial-card {
    border: 1px solid #ddd !important;
    background: white !important;
  }

  /* 링크 URL 표시 */
  a[href^="http"]::after {
    content: " (" attr(href) ")";
    font-size: 0.8em;
    color: #666;
  }

  /* 페이지 분할 제어 */
  .experience-item,
  .project-item {
    break-inside: avoid;
  }
  h2, h3, h4 {
    break-after: avoid;
  }

  /* A4 여백 */
  @page {
    margin: 15mm;
    size: A4;
  }

  /* 폰트 크기 축소 (A4 비율 최적화) */
  body {
    font-size: 11pt;
    line-height: 1.5;
  }
  h1 { font-size: 20pt; }
  h2 { font-size: 14pt; }
  h4 { font-size: 11pt; }

  /* Footer를 마지막 페이지 하단에 고정 */
  .footer-cover {
    margin-top: 20px;
    padding: 10px 0;
    background: #f5f5f5 !important;
    color: #333 !important;
  }
}
```

---

## 11. 다크 모드 — F-11

### 11.1 토글 UI

```
┌──────────────────────────────┐
│                    [☀/🌙]   │  ← 우상단 고정, 토글 버튼
│                              │
│  ...이력서 콘텐츠...          │
└──────────────────────────────┘
```

#### 토글 버튼 스타일

```css
.theme-toggle {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 200;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid var(--color-border);
  background: var(--color-bg);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background var(--transition-base);
  font-size: 1.1rem;
}
```

### 11.2 전환 로직

```typescript
// 1. 시스템 설정 감지
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

// 2. localStorage 확인 (사용자 명시적 선택 우선)
const savedTheme = localStorage.getItem('theme');

// 3. 적용 우선순위: localStorage > 시스템 설정 > 라이트(기본)
const theme = savedTheme || (prefersDark ? 'dark' : 'light');
document.documentElement.setAttribute('data-theme', theme);
```

### 11.3 다크 모드 시 주의사항

| 요소 | 주의 |
|------|------|
| 프로필 사진 | 다크 배경에서 밝은 사진이 과도하게 눈에 띌 수 있음. border를 subtle하게 |
| 뱃지 이미지 | 외부 뱃지(shields.io 등)는 다크 모드 미지원 가능. 필터로 대응 |
| 인쇄 시 | 인쇄는 항상 라이트 모드 강제 (`@media print` 참조) |
| 전환 애니메이션 | 테마 전환 시 `transition: background 0.3s, color 0.3s` 추가 |

---

## 12. 접근성(a11y) 개선

### 12.1 시맨틱 HTML 구조

현재 `<div>` 위주 구조를 시맨틱 태그로 변경합니다:

```html
<!-- 현재 -->
<div class="container">
  <div class="mt-5">...</div>  <!-- Profile -->
  <div class="mt-5">...</div>  <!-- Experience -->
  ...
</div>

<!-- 제안 -->
<main>
  <header role="banner">...</header>           <!-- Profile 히어로 -->
  <section aria-labelledby="highlight-title">  <!-- Highlight -->
    <h2 id="highlight-title">HIGHLIGHT</h2>
    ...
  </section>
  <section aria-labelledby="experience-title"> <!-- Experience -->
    <h2 id="experience-title">EXPERIENCE</h2>
    ...
  </section>
  ...
  <footer role="contentinfo">...</footer>
</main>
<nav aria-label="Section navigation">         <!-- 플로팅 네비게이션 -->
  ...
</nav>
```

### 12.2 ARIA 라벨 추가

| 요소 | 현재 | 추가할 ARIA |
|------|------|------------|
| 프로필 사진 | `alt="Profile"` | `alt="[이름] 프로필 사진"` (구체적으로) |
| 연락처 아이콘 | 아이콘만 | `aria-label="이메일"`, `aria-label="GitHub"` |
| CTA 버튼 | 텍스트만 | `aria-label` (이미 텍스트가 있으면 불필요) |
| 스킬 레벨 도트 | 없음 | `aria-label="TypeScript: 전문 수준 (3/3)"` |
| 플로팅 네비게이션 | 없음 | `aria-label="섹션 네비게이션"`, `aria-current="true"` |
| 다크 모드 토글 | 없음 | `aria-label="다크 모드 전환"`, `aria-pressed="false"` |
| "재직 중" 뱃지 | 텍스트만 | `role="status"` (상태 정보) |

### 12.3 키보드 네비게이션

| 요소 | 키보드 동작 |
|------|------------|
| 플로팅 네비게이션 | `Tab`으로 포커스, `Enter`로 이동 |
| CTA 버튼 | `Tab`으로 포커스, `Enter`/`Space`로 클릭 |
| 다크 모드 토글 | `Tab`으로 포커스, `Enter`/`Space`로 토글 |
| 링크 | `Tab` 순서 자연스러움 (DOM 순서 준수) |

### 12.4 포커스 스타일

```css
:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
  border-radius: 2px;
}

/* 마우스 클릭 시에는 outline 숨김 */
:focus:not(:focus-visible) {
  outline: none;
}
```

### 12.5 색상 대비

WCAG 2.1 AA 기준(4.5:1 이상) 충족 여부:

| 텍스트 | 배경 | 대비율 | 판정 |
|--------|------|--------|------|
| `#1a1a2e` (primary) | `#ffffff` (bg) | 16.3:1 | PASS |
| `#2d2d2d` (text) | `#ffffff` (bg) | 14.1:1 | PASS |
| `#64748b` (secondary) | `#ffffff` (bg) | 4.6:1 | PASS (AA) |
| `#94a3b8` (muted) | `#ffffff` (bg) | 3.1:1 | FAIL — 보조 정보만 사용, 단독 정보 전달 지양 |
| `#4361ee` (accent) | `#ffffff` (bg) | 4.7:1 | PASS (AA) |
| `#e2e8f0` (dark primary) | `#0f172a` (dark bg) | 12.1:1 | PASS |

> **조치**: `--color-text-muted`는 단독 정보 전달에 사용하지 않고, 항상 다른 시각 요소(아이콘, 위치)와 함께 사용합니다.

### 12.6 `prefers-reduced-motion` 존중

모든 애니메이션에 대해 reduced-motion 미디어 쿼리를 적용합니다 (7.2절 참조).

---

## 13. 구현 우선순위 및 마이그레이션 전략

### 13.1 Phase별 디자인 구현

#### Phase 1: 기초 시스템 구축 (기술 업그레이드와 병행)

| 순서 | 작업 | 영향 범위 |
|------|------|-----------|
| 1 | CSS Custom Properties 정의 (색상, 타이포, 여백 토큰) | 글로벌 CSS 신규 |
| 2 | `Style.ts`에서 CSS 변수 참조로 전환 | `Style.ts` 수정 |
| 3 | 시맨틱 HTML 태그 적용 | 각 컴포넌트 래핑 |
| 4 | 인쇄 CSS 추가 | `print.css` 신규 |

#### Phase 2: 핵심 컴포넌트 리디자인

| 순서 | 작업 | 영향 범위 |
|------|------|-----------|
| 1 | Profile 히어로 리디자인 | `profile/` 전체 |
| 2 | Highlight 섹션 신규 | `highlight/` 신규 |
| 3 | Experience 타임라인 스타일 | `experience/row.tsx` |
| 4 | Skill 도트 시각화 | `skill/row.tsx` |
| 5 | 섹션 구분 (교차 배경색) | `pages/index.tsx`, 각 섹션 래퍼 |

#### Phase 3: 인터랙션 & 네비게이션

| 순서 | 작업 | 영향 범위 |
|------|------|-----------|
| 1 | 플로팅 네비게이션 | 신규 컴포넌트 |
| 2 | 스크롤 진입 애니메이션 | 공통 래퍼 / 훅 |
| 3 | Testimonial 섹션 | 신규 컴포넌트 |
| 4 | Footer 리디자인 | `footer/index.tsx` |

#### Phase 4: 테마 & 폴리시

| 순서 | 작업 | 영향 범위 |
|------|------|-----------|
| 1 | 다크 모드 구현 | CSS 변수 + 토글 컴포넌트 |
| 2 | Introduce 리디자인 | `introduce/index.tsx` |
| 3 | 반응형 세부 조정 | 각 컴포넌트 미디어 쿼리 |

### 13.2 기존 코드와의 호환성

디자인 개선은 기존 아키텍처(payload → component → page)를 유지하면서 진행합니다.

| 현재 패턴 | 유지 | 변경 |
|-----------|------|------|
| `PreProcessingComponent` 전처리기 | 유지 | 스크롤 애니메이션 래핑 추가 가능 |
| `CommonSection` / `CommonRow` | 유지 | 스타일만 CSS 변수로 전환 |
| `Style.ts` 인라인 스타일 | 유지 (점진적 전환) | CSS 변수 참조로 값 변경 |
| reactstrap (Bootstrap 4) | 유지 | 커스텀 CSS로 오버라이드 |
| `EmptyRowCol` 헬퍼 | 유지 | 변경 없음 |

---

## 14. NOT DOING (명시적 디자인 제외)

| 제외 항목 | 사유 |
|-----------|------|
| 폰트 교체 (Pretendard 외) | Pretendard의 weight 다양성만으로 충분한 계층화 가능. 추가 폰트 로딩은 성능 저하 |
| CSS-in-JS 전면 전환 | 기존 styled-components + 인라인 스타일 + Bootstrap 유틸리티 혼용 구조에서 전면 전환은 과도한 리팩토링 |
| 복잡한 애니메이션 라이브러리 (Framer Motion 등) | CSS transition + Intersection Observer로 충분. 번들 크기 절약 |
| 인터랙티브 스킬 맵 / D3.js 시각화 | 과도한 복잡도. 이력서의 핵심은 정보 전달 |
| 패럴랙스 스크롤 | 이력서 맥락에서 과도한 장식. 인쇄/PDF 호환성 저하 |
| 3D 효과 / glassmorphism | 트렌드 의존적. 2~3년 후 dated되어 보일 위험 |
| 커스텀 커서 | 접근성 저하, 실용성 없음 |

---

## 15. 핵심 가정 및 검증

| 가정 | 검증 방법 | 신뢰도 |
|------|-----------|--------|
| 중앙 정렬 히어로가 3:9 그리드보다 임팩트가 있다 | A/B 테스트 또는 채용담당자 피드백 | MEDIUM |
| 교차 배경색이 `<hr>`보다 섹션 구분에 효과적이다 | 사용자 테스트 (스크롤 깊이 비교) | HIGH |
| 도트 레벨 시각화가 숫자보다 직관적이다 | 5초 인지 테스트 | HIGH |
| 다크 모드가 개발자 이력서에 긍정적 인상을 준다 | 사용자 설문 | LOW |
| fade-up 애니메이션이 전문성 인상을 높인다 | 정성 평가 | MEDIUM |
| Pretendard weight 계층화만으로 충분한 타이포그래피 대비가 된다 | 시각 테스트 (디자인 리뷰) | HIGH |

---

*이 문서는 `01-marketing-strategy.md`(마케팅 전략)와 `02-feature-planning.md`(기능 기획)을 기반으로, 현재 codebase 분석 결과를 반영하여 작성된 UI/UX 디자인 개선안입니다. 구현 시 기술 업그레이드 문서(`04-technical-upgrade.md`)의 일정과 연동하여 진행합니다.*
