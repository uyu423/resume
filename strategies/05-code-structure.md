# 코드 구조 개선 방안

> 작성일: 2026-02-17
> 대상 프로젝트: resume-nextjs (Next.js 기반 정적 웹 이력서 생성기)

---

## 1. 현재 코드 구조 개요

### 1.1 디렉토리 구조

```
resume-nextjs/
├── asset/                    # 정적 이미지 (favicon, profile, preview)
├── component/                # UI 컴포넌트
│   ├── common/               # 공통 컴포넌트 및 유틸리티
│   │   ├── ICommon.ts        # 공통 Payload 인터페이스 (disable 필드)
│   │   ├── IGlobal.ts        # 글로벌 설정 인터페이스 (SEO, favicon)
│   │   ├── IRow.ts           # CommonRow용 인터페이스 (Left/Right 레이아웃)
│   │   ├── Style.ts          # CSSProperties 인라인 스타일 상수
│   │   ├── Util.ts           # luxon 날짜 포맷팅 유틸리티
│   │   ├── index.tsx          # EmptyRowCol, HrefTargetBlank 공통 컴포넌트
│   │   ├── CommonSection.tsx  # 섹션 제목 + children 래퍼
│   │   ├── CommonRow.tsx      # Left/Right 2컬럼 행 레이아웃
│   │   ├── CommonDescription.tsx  # 재귀 설명 리스트 렌더러
│   │   └── PreProcessingComponent.tsx  # disable 플래그 전처리기
│   ├── profile/              # 프로필 섹션
│   ├── introduce/            # 자기소개 섹션
│   ├── skill/                # 기술 스택 섹션
│   ├── experience/           # 경력 섹션
│   ├── project/              # 프로젝트 섹션
│   ├── openSource/           # 오픈소스 섹션
│   ├── presentation/         # 발표 섹션
│   ├── article/              # 아티클 섹션
│   ├── education/            # 교육 섹션
│   ├── etc/                  # 기타 섹션
│   └── footer/               # 푸터
├── payload/                  # 이력서 데이터
│   ├── index.ts              # Payload 집계 및 인터페이스
│   ├── _global.ts            # 글로벌 설정 (SEO, favicon)
│   ├── profile.ts ~ footer.ts  # 각 섹션별 데이터
├── pages/                    # Next.js 페이지
│   ├── _app.tsx              # 글로벌 CSS import
│   ├── _document.tsx         # HTML 문서 구조
│   └── index.tsx             # 유일한 페이지
└── shellwork.js              # post-export 스크립트
```

### 1.2 데이터 흐름

```
payload/*.ts → payload/index.ts → pages/index.tsx → component/<section>/index.tsx
                  (집계)             (배포)              (렌더링)
```

### 1.3 컴포넌트 패턴 분류

프로젝트 내 컴포넌트는 크게 3가지 패턴으로 나뉩니다:

| 패턴 | 사용 섹션 | 특징 |
|------|----------|------|
| **패턴 A: CommonSection + CommonRow** | project, openSource, presentation, education, etc | `CommonSection`으로 제목, `CommonRow`로 Left/Right 레이아웃. `serialize()` 함수로 데이터 변환 |
| **패턴 B: 독자 렌더링** | profile, introduce, skill, experience | 섹션 고유의 레이아웃. 공통 컴포넌트 미사용 또는 부분 사용 |
| **패턴 C: 최소 래퍼** | article, footer | 단순 래핑. footer는 `PreProcessingComponent`도 미사용 |

---

## 2. 현재 코드 구조의 문제점

### 2.1 보일러플레이트 반복 (심각도: 높음)

**문제**: 11개 섹션 컴포넌트 중 9개가 동일한 `PreProcessingComponent` 래핑 패턴을 반복합니다.

```tsx
// component/project/index.tsx:9-16 (동일 패턴이 9개 파일에 반복)
export const Project = {
  Component: ({ payload }: PropsWithChildren<{ payload: Payload }>) => {
    return PreProcessingComponent<Payload>({
      payload,
      component: Component,
    });
  },
};
```

**영향받는 파일**:
- `component/profile/index.tsx:13-19`
- `component/introduce/index.tsx:10-18`
- `component/skill/index.tsx:13-20`
- `component/experience/index.tsx:14-21`
- `component/project/index.tsx:9-16`
- `component/openSource/index.tsx:9-16`
- `component/presentation/index.tsx:9-16`
- `component/article/index.tsx:10-17`
- `component/education/index.tsx:14-21`
- `component/etc/index.tsx:14-21`

**예외**: `component/footer/index.tsx:8-10` — `PreProcessingComponent`를 사용하지 않아 `disable` 기능이 동작하지 않음

### 2.2 serialize() 함수 중복 (심각도: 중간)

**문제**: 패턴 A를 사용하는 5개 섹션에 각각 거의 동일한 `serialize()` 함수가 존재합니다. 이 함수들은 모두 "날짜를 포맷하고 `IRow.Payload`의 `left`/`right` 구조로 매핑"하는 동일한 역할을 수행합니다.

| 파일 | serialize 로직 |
|------|---------------|
| `component/project/row.tsx:19-44` | startedAt/endedAt → left.title, item → right |
| `component/education/index.tsx:41-60` | startedAt/endedAt → left.title, item → right (spread) |
| `component/etc/index.tsx:41-64` | startedAt/endedAt → left.title, item → right (spread) |
| `component/presentation/row.tsx:21-32` | at → left.title, item → right (spread) |
| `component/openSource/row.tsx:19-28` | title → left.title, descriptions → right |

**특히 `education/index.tsx`와 `etc/index.tsx`는 거의 동일한 코드**입니다. etc 컴포넌트의 내부 함수 이름이 `EducationRow`로 되어 있어(`component/etc/index.tsx:31`) 복사-붙여넣기의 흔적이 보입니다.

### 2.3 날짜 포맷팅 로직 산재 (심각도: 중간)

**문제**: luxon `DateTime.fromFormat()` / `toFormat()` 호출이 6개 이상의 파일에 분산되어 있습니다.

| 파일 | 날짜 처리 코드 |
|------|---------------|
| `component/common/Util.ts:16-36` | `getFormattingDuration()` — 기간 계산 |
| `component/experience/index.tsx:54-58` | 총 경력 기간 계산 |
| `component/experience/row.tsx:20-26` | Position별 날짜 파싱 |
| `component/project/row.tsx:21-32` | startedAt/endedAt 포맷팅 |
| `component/education/index.tsx:43-52` | startedAt/endedAt 포맷팅 |
| `component/etc/index.tsx:43-54` | startedAt/endedAt 포맷팅 |
| `component/presentation/row.tsx:23-26` | at 포맷팅 |
| `component/introduce/index.tsx:21-27` | latestUpdated 날짜/경과일 계산 |

각 파일이 `DateTime.fromFormat(str, YYYY_LL)` → `toFormat(YYYY_DOT_LL)` 패턴을 직접 구현하고 있어, 포맷 변경 시 모든 파일을 수정해야 합니다.

### 2.4 declare namespace 타입 패턴의 한계 (심각도: 낮음~중간)

**문제**: 모든 인터페이스가 `declare namespace` 패턴으로 정의되어 있습니다.

```tsx
// component/experience/IExperience.ts:3
export declare namespace IExperience {
  export interface Payload extends ICommon.Payload { ... }
}
```

**한계점**:
- `declare namespace`는 원래 `.d.ts` 선언 파일용으로 설계된 패턴. 런타임 타입 가드나 유틸리티 타입과 조합이 어려움
- ESLint의 `@typescript-eslint/no-namespace` 규칙을 비활성화해야 함 (`.eslintrc.js:32`)
- 현대 TypeScript 생태계에서 비권장 패턴
- 다만, 이 프로젝트에서는 순수 타입 정의 용도로만 사용하고 있어 실제 기능 제약은 제한적

### 2.5 인터페이스와 컴포넌트 간 강결합 (심각도: 중간)

**문제**: 인터페이스 파일(`I*.ts`)이 `component/<section>/` 디렉토리 안에 위치하면서, payload 데이터가 컴포넌트 디렉토리의 타입을 import합니다.

```tsx
// payload/experience.ts:1
import { IExperience } from '../component/experience/IExperience';
```

**영향**:
- **데이터 레이어가 UI 레이어에 의존**: payload(데이터) → component(UI)로의 역방향 의존. 관심사 분리 위반
- payload 디렉토리만 분리하여 재사용하기 어려움 (예: 다른 테마, API 서버)
- 총 11개 payload 파일이 모두 component 디렉토리의 인터페이스를 import

### 2.6 CommonDescription의 조건부 렌더링 복잡도 (심각도: 중간)

**문제**: `component/common/CommonDescription.tsx:63-112`의 `Description` 컴포넌트에서 `href`, `postImage`, `postHref`의 조합에 따라 6가지 분기가 존재합니다.

```tsx
// component/common/CommonDescription.tsx:66-109
const component = (() => {
  if (href && postImage) { ... }      // 분기 1
  if (href) { ... }                    // 분기 2
  if (postHref && postImage) { ... }   // 분기 3
  if (postHref) { ... }               // 분기 4
  if (postImage) { ... }              // 분기 5
  return ( ... );                      // 분기 6 (기본)
})();
```

**영향**:
- 새로운 속성 추가 시 분기 조합이 기하급수적으로 증가
- 모든 분기에서 `<li>` 태그 내부 구조만 미세하게 다름 — 조합 가능한 구조로 변환 가능
- `meta` 태그가 기본 분기(`line:105`)에만 있어 의도가 불명확

### 2.7 React Key 사용 및 Fragment 문제 (심각도: 낮음)

**문제**: `CommonDescription.tsx:17-28`에서 Fragment(`<>...</>`)에 key가 없고, 동일 깊이에서 두 요소에 같은 key가 할당됩니다.

```tsx
// component/common/CommonDescription.tsx:17-28
{descriptions.map((description, descIndex) => {
  return (
    <>  {/* ← Fragment에 key 없음 */}
      <Description description={description} key={descIndex.toString()} />
      {description.descriptions ? (
        <DescriptionRecursion
          descriptions={description.descriptions}
          key={descIndex.toString()}  {/* ← 동일 key */}
        />
      ) : ''}
    </>
  );
})}
```

**영향**: React 경고 발생 가능. 리렌더링 시 예상치 못한 동작 가능성

### 2.8 Hooks 규칙 위반 (심각도: 높음)

**문제**: `component/skill/index.tsx:47-48`에서 `useState`가 조건부 함수 `createTooltip()` 내부에서 호출됩니다.

```tsx
// component/skill/index.tsx:42-48
function createTooltip(content?: string) {
  if (!content) {
    return '';  // ← 이 조건이 true면 아래 useState가 실행되지 않음
  }
  const [tooltipOpen, setTooltipOpen] = useState(false);  // ← 조건부 Hook 호출!
  const toggle = () => setTooltipOpen(!tooltipOpen);
  ...
}
```

**영향**: React Hooks 규칙 ("Hooks는 항상 동일한 순서로 호출되어야 한다") 위반. `content`의 유무에 따라 Hook 호출 순서가 달라져 런타임 오류 발생 가능

### 2.9 IExperience.Position.descriptions 타입 불일치 (심각도: 낮음)

**문제**: `IExperience.Position.descriptions`가 `string[]`인 반면, 다른 섹션들은 `IRow.Description[]`을 사용합니다.

```tsx
// component/experience/IExperience.ts:53-54
descriptions: string[];  // ← string[]

// component/project/IProject.ts:44
descriptions: IRow.Description[];  // ← IRow.Description[] (다른 섹션들)
```

소스코드의 TODO 주석(`IExperience.ts:52`)에도 `@todo IRow.Description[]으로 변경`이라고 명시되어 있습니다.

**영향**: Experience 섹션에서만 하이퍼링크, 볼드 등 리치 텍스트 기능을 사용할 수 없음

### 2.10 IFooter가 ICommon.Payload를 extends하지 않음 (심각도: 낮음)

**문제**: `component/footer/IFooter.ts:1-6`에서 `ICommon.Payload`를 extends하지 않아 `disable` 필드가 없습니다. 또한 Footer 컴포넌트(`component/footer/index.tsx:8-10`)도 `PreProcessingComponent`를 거치지 않습니다.

```tsx
// component/footer/IFooter.ts
export declare namespace IFooter {
  export interface Payload {  // ← ICommon.Payload를 extends하지 않음
    github: string;
    version: string;
  }
}
```

**영향**: Footer만 `disable: true`로 숨길 수 없는 유일한 섹션

---

## 3. 컴포넌트 아키텍처 개선안

### 3.1 HOC → 합성 패턴으로 전환

**현재**: `PreProcessingComponent`를 함수 호출 방식으로 사용

```tsx
// 현재 패턴 (모든 섹션에서 반복)
export const Project = {
  Component: ({ payload }) => {
    return PreProcessingComponent<Payload>({ payload, component: Component });
  },
};
```

**개선안**: React 합성 패턴(Composition) 사용

```tsx
// 개선안 A: Section 래퍼 컴포넌트
function Section<T extends ICommon.Payload>({
  payload,
  children,
}: {
  payload: T;
  children: (payload: T) => ReactNode;
}) {
  if (payload?.disable) return null;
  return <>{children(payload)}</>;
}

// 사용측
export function ProjectSection({ payload }: { payload: IProject.Payload }) {
  return (
    <Section payload={payload}>
      {(data) => (
        <CommonSection title="PROJECT">
          {data.list.map((item, i) => <ProjectRow key={i} item={item} index={i} />)}
        </CommonSection>
      )}
    </Section>
  );
}
```

**효과**:
- 9개 파일에서 반복되는 보일러플레이트 제거
- `{ Component: ... }` 객체 래핑 불필요 → 표준 React 컴포넌트 패턴
- `PropsWithChildren` 남용 제거

### 3.2 CommonSection 확장으로 섹션 통합

**현재**: `CommonSection`을 사용하는 섹션(5개)과 직접 마크업하는 섹션(4개)이 혼재

**개선안**: 모든 섹션이 `CommonSection`을 사용하도록 통합

```tsx
// 확장된 CommonSection
function CommonSection({
  title,
  badge,         // 선택적 뱃지 (Experience의 총 경력)
  tooltip,       // 선택적 툴팁 (Skill의 기준 설명)
  children,
}: {
  title: string;
  badge?: ReactNode;
  tooltip?: string;
  children: ReactNode;
}) { ... }
```

**적용 대상**:
- `component/experience/index.tsx:35-48` → `<CommonSection title="EXPERIENCE" badge={totalPeriod()}>`
- `component/skill/index.tsx:22-39` → `<CommonSection title="SKILL" tooltip={payload.tooltip}>`
- `component/introduce/index.tsx:29-53` → 고유 레이아웃이라 부분 적용

### 3.3 Description 컴포넌트 리팩토링

**현재**: 6개 조건부 분기 (`CommonDescription.tsx:66-109`)

**개선안**: 조합 가능한 구조로 변환

```tsx
function Description({ description }: { description: IRow.Description }) {
  const { content, href, postImage, postHref, weight } = description;

  const mainContent = href
    ? <HrefTargetBlank url={href} text={content} />
    : content;

  const postContent = (
    <>
      {postHref && <> <HrefTargetBlank url={postHref} text={postHref} /></>}
      {postImage && <> <img src={postImage} alt={postImage} /></>}
    </>
  );

  return (
    <li style={getFontWeight(weight)}>
      {mainContent}
      {postContent}
    </li>
  );
}
```

**효과**:
- 6개 분기 → 2개 독립 결정 (`mainContent`, `postContent`)
- 새로운 속성 추가 시 분기 폭발 방지
- 105행의 의미 불명확한 `<meta name="format-detection">` 제거 가능

### 3.4 Skill 컴포넌트의 Hooks 규칙 수정

**현재**: `createTooltip()` 내부에서 조건부 Hook 호출 (`component/skill/index.tsx:42-48`)

**개선안**: Hook을 컴포넌트 최상위로 이동

```tsx
function Component({ payload }: { payload: Payload }) {
  // Hook은 항상 최상위에서 호출
  const [tooltipOpen, setTooltipOpen] = useState(false);

  return (
    <div className="mt-5">
      <EmptyRowCol>
        <Row className="pb-3">
          <Col>
            <h2>
              <span style={Style.blue}>SKILL</span>
              {payload.tooltip && (
                <SkillTooltip
                  content={payload.tooltip}
                  isOpen={tooltipOpen}
                  toggle={() => setTooltipOpen(!tooltipOpen)}
                />
              )}
            </h2>
          </Col>
        </Row>
        ...
      </EmptyRowCol>
    </div>
  );
}
```

---

## 4. 타입 시스템 개선안

### 4.1 declare namespace → 모듈 타입으로 전환

**현재**: `declare namespace` + 내부 `export interface`

```tsx
// 현재 패턴
export declare namespace IExperience {
  export interface Payload extends ICommon.Payload { ... }
  export interface Item { ... }
  export interface Position { ... }
}
// 사용: IExperience.Payload
```

**개선안**: 일반 `export interface` + 네이밍 컨벤션

```tsx
// 개선안: types/<section>.ts
export interface ExperiencePayload extends CommonPayload {
  list: ExperienceItem[];
  disableTotalPeriod?: boolean;
}

export interface ExperienceItem {
  title: string;
  positions: ExperiencePosition[];
}
```

**Trade-offs**:

| 측면 | declare namespace (현재) | 모듈 export (개선안) |
|------|-------------------------|---------------------|
| 네임스페이스 충돌 | `IExperience.Payload`로 명확 | 이름에 접두사 필요 (`ExperiencePayload`) |
| ESLint 호환 | `@typescript-eslint/no-namespace` 비활성 필요 | 기본 규칙 호환 |
| Tree-shaking | `declare`라 이미 제거됨 | 동일 |
| IDE 자동완성 | `IExperience.` 후 자동완성 | 파일에서 직접 import |
| 모던 TS 생태계 | 비권장 패턴 | 표준 패턴 |

**권장**: 프로젝트 규모가 작고 현재 패턴이 일관적으로 사용되고 있으므로, **기술 업그레이드(Phase 4 ESLint 전환) 시 함께 전환**하는 것이 효율적

### 4.2 날짜 문자열 타입 강화

**현재**: 날짜 필드가 모두 `string` 타입

```tsx
startedAt: string;  // "2018-02" 형식이지만 타입으로 강제하지 않음
```

**개선안**: Template Literal Type 활용

```tsx
/** YYYY-MM 형식의 날짜 문자열 */
type YearMonth = `${number}-${string}`;

// 또는 더 엄격하게
type Month = '01' | '02' | '03' | '04' | '05' | '06'
           | '07' | '08' | '09' | '10' | '11' | '12';
type YearMonth = `${number}-${Month}`;
```

**효과**: payload 작성 시 잘못된 날짜 형식을 타입 수준에서 감지

### 4.3 IRow.Description 타입 정리

**현재**: `IRow.Description`의 `content` 필드가 필수이지만, `href`가 있을 때는 `content`가 링크 텍스트 역할을 하는 이중 의미

**개선안**: 판별 유니온(Discriminated Union) 도입

```tsx
type Description =
  | { type: 'text'; content: string; weight?: FontWeightType; descriptions?: Description[] }
  | { type: 'link'; content: string; href: string; weight?: FontWeightType; descriptions?: Description[] }
  | { type: 'rich'; content: string; postHref?: string; postImage?: string; weight?: FontWeightType; descriptions?: Description[] };
```

**Trade-off**: 기존 payload 데이터의 마이그레이션 비용이 큼. 현재 구조가 단순한 이력서에는 과도할 수 있음. **장기적 개선 사항으로 분류**

### 4.4 IExperience.Position.descriptions 타입 통일

**현재**: `string[]` (소스 코드에 `@todo IRow.Description[]으로 변경` 주석 존재)

**개선안**: `IRow.Description[]`로 통일

```tsx
// component/experience/IExperience.ts:54
descriptions: IRow.Description[];  // string[] → IRow.Description[]
```

**영향**:
- Experience 섹션에서도 하이퍼링크, 볼드 등 리치 텍스트 사용 가능
- `component/experience/row.tsx:96-98`의 단순 `<li>` 렌더링 → `CommonDescription` 사용으로 변경
- payload 데이터 마이그레이션 필요: `"text"` → `{ content: "text" }`

---

## 5. Payload 데이터 구조 개선안

### 5.1 현재 구조의 강점

- **직관적**: 각 섹션별 파일 분리 → 편집이 쉬움
- **타입 안전**: TypeScript 인터페이스로 payload 구조 강제
- **비개발자 친화**: JavaScript 객체 리터럴 형식으로 진입 장벽 낮음

### 5.2 현재 구조의 약점

#### 5.2.1 날짜 필드 이름 비일관성

| 섹션 | 시작 필드 | 종료 필드 |
|------|----------|----------|
| Experience.Position | `startedAt` | `endedAt` |
| Project.Item | `startedAt` | `endedAt` |
| Education.Item | `startedAt` | `endedAt` |
| Etc.Item | `startedAt` | `endedAt` |
| Presentation.Item | `at` | (없음) |
| Introduce | `latestUpdated` | (없음) |

**Presentation의 `at` 필드만 다른 네이밍** → `presentedAt`이나 `startedAt`으로 통일 가능

#### 5.2.2 섹션 순서 하드코딩

**현재**: `pages/index.tsx:29-40`에서 렌더링 순서가 하드코딩

```tsx
<Profile.Component payload={Payload.profile} />
<Introduce.Component payload={Payload.introduce} />
<Skill.Component payload={Payload.skill} />
...
```

**개선안**: payload에 순서 정보를 포함하거나, 섹션 레지스트리 패턴 도입

```tsx
// 개선안: 섹션 레지스트리
const sections = [
  { key: 'profile', component: ProfileSection, payload: Payload.profile },
  { key: 'introduce', component: IntroduceSection, payload: Payload.introduce },
  // ...
] as const;

// pages/index.tsx
{sections
  .filter(s => !s.payload.disable)
  .map(({ key, component: Comp, payload }) => (
    <Comp key={key} payload={payload} />
  ))
}
```

**Trade-off**: 현재 프로젝트에서는 섹션 순서 변경이 극히 드물어 과도한 추상화일 수 있음. **순서 커스터마이징 기능이 필요할 때만 도입**

#### 5.2.3 공통 기간(Period) 인터페이스 부재

**개선안**: 날짜 관련 공통 인터페이스 추출

```tsx
// types/common.ts
export interface Period {
  startedAt: YearMonth;
  endedAt?: YearMonth;
}

// Experience, Project, Education, Etc에서 extends
export interface ExperiencePosition extends Period {
  title: string;
  descriptions: Description[];
  skillKeywords?: string[];
}
```

### 5.3 JSON/YAML 기반 데이터 분리 검토

**현재**: TypeScript 파일로 payload 정의

**장점** (유지 근거):
- 타입 체크가 즉시 적용
- FontAwesome 아이콘 import 등 JavaScript 기능 사용 가능 (`payload/profile.ts:1-4`)
- IDE 자동완성 지원

**단점**:
- 비개발자가 수정하기 어려움
- CMS 연동 시 전환 비용

**결론**: **현재 TypeScript 기반 유지 권장**. FontAwesome 아이콘 import 등 JS 기능 의존도가 높아 JSON 전환 시 이점이 제한적

---

## 6. 디렉토리 구조 재편안

### 6.1 현재 구조의 문제

1. **타입 정의가 컴포넌트 내부에 위치** → 데이터(payload)가 UI(component)에 의존
2. **공통 모듈이 `common/`에 혼재** → 유틸리티, 스타일, 타입, 컴포넌트가 한 디렉토리
3. **`asset/` 디렉토리 최상위 위치** → Next.js 컨벤션은 `public/`

### 6.2 권장 구조

```
resume-nextjs/
├── types/                      # 🆕 타입 정의 (component에서 분리)
│   ├── common.ts               # ICommon, IRow, YearMonth 등
│   ├── global.ts               # IGlobal (SEO, favicon)
│   ├── profile.ts              # IProfile
│   ├── experience.ts           # IExperience
│   ├── project.ts              # IProject
│   ├── ...                     # 각 섹션별 타입
│   └── index.ts                # 모든 타입 re-export
│
├── payload/                    # 이력서 데이터 (types만 import)
│   ├── index.ts
│   ├── _global.ts
│   ├── profile.ts ~ footer.ts
│
├── component/                  # UI 컴포넌트 (types와 payload import)
│   ├── common/                 # 공통 UI 컴포넌트만
│   │   ├── Section.tsx         # CommonSection (rename)
│   │   ├── Row.tsx             # CommonRow (rename)
│   │   ├── Description.tsx     # CommonDescription (rename)
│   │   └── index.tsx           # EmptyRowCol, HrefTargetBlank
│   ├── profile/
│   │   └── index.tsx           # (I*.ts 제거 → types/로 이동)
│   ├── ...
│
├── lib/                        # 🆕 유틸리티 (component/common에서 분리)
│   ├── date.ts                 # Util.ts의 날짜 관련 함수
│   └── style.ts                # Style.ts
│
├── public/                     # 정적 자산 (asset/ rename, Next.js 컨벤션)
│   ├── images/
│   │   ├── profile.png
│   │   ├── favicon.ico
│   │   └── preview.jpg
│
├── pages/
│   ├── _app.tsx
│   ├── _document.tsx
│   └── index.tsx
```

### 6.3 의존성 방향 (개선 후)

```
types/  ←── payload/  ←── pages/index.tsx ──→ component/
  ↑                                              ↓
  └──────────────────────────────────────────────┘
```

**핵심 변화**: `payload/` → `component/` 역방향 의존 제거. `types/`가 독립적인 중앙 타입 레이어로 기능

### 6.4 마이그레이션 영향

| 변경 | 영향 파일 수 | 난이도 |
|------|------------|--------|
| `I*.ts` → `types/` 이동 | ~22개 (11 I*.ts + 11 payload + import 수정) | 중간 |
| `Util.ts`, `Style.ts` → `lib/` | ~15개 (import 경로 수정) | 낮음 |
| `asset/` → `public/images/` | ~3개 (import 경로 수정) | 낮음 |
| `Common*` 컴포넌트 rename | ~8개 | 낮음 |

---

## 7. 코드 품질 도구 도입 제안

### 7.1 테스트 (Vitest + React Testing Library)

**우선순위 테스트 대상** (비용 대비 효과 기준):

| 순위 | 대상 | 이유 |
|------|------|------|
| 1 | `lib/date.ts` (Util 함수) | 순수 함수, 엣지 케이스 많음, 버그 이력 있음 (v1.3.1) |
| 2 | Payload 유효성 검증 | 타입만으로 잡을 수 없는 데이터 오류 (날짜 범위, 빈 배열 등) |
| 3 | `PreProcessingComponent` | disable 플래그 동작 검증 |
| 4 | Description 재귀 렌더링 | 깊은 중첩 시 동작 검증 |

### 7.2 Storybook

**이 프로젝트에서의 가치**: 🟡 제한적

- 단일 페이지 앱으로 컴포넌트 수가 ~20개로 적음
- 별도의 디자인 시스템이나 컴포넌트 라이브러리 목적이 아님
- 다만, 섹션별 독립 개발/디버깅에는 유용할 수 있음

**권장**: 도입하지 않음. 대신 `npm run dev`로 충분히 시각적 검증 가능

### 7.3 코드 품질 자동화

| 도구 | 용도 | 우선순위 |
|------|------|---------|
| **husky + lint-staged** | 커밋 전 린트/포맷 자동 실행 | 높음 |
| **TypeScript strict mode** | 이미 활성화됨 (`tsconfig.json:18`) | ✅ 완료 |
| **import 정렬** | `eslint-plugin-import` 또는 Prettier plugin | 낮음 |

---

## 8. 종합 개선 우선순위 및 로드맵

### 즉시 수정 (Quick Fixes) — 기술 업그레이드 전에도 가능

| # | 항목 | 영향 파일 | 난이도 |
|---|------|----------|--------|
| 1 | **Hooks 규칙 위반 수정** (`skill/index.tsx:42-48`) | 1개 | 🟢 |
| 2 | **React Key/Fragment 수정** (`CommonDescription.tsx:17-28`) | 1개 | 🟢 |
| 3 | **etc 내부 함수명 수정** (`EducationRow` → `EtcRow`) (`etc/index.tsx:31`) | 1개 | 🟢 |
| 4 | **Footer에 PreProcessingComponent 적용** + ICommon.Payload extends | 2개 | 🟢 |

### Phase 1: 타입 레이어 분리 (기술 업그레이드 Phase 1과 병행)

| # | 항목 | 영향 파일 | 난이도 |
|---|------|----------|--------|
| 5 | `types/` 디렉토리 생성 및 `I*.ts` 이동 | ~22개 | 🟡 |
| 6 | `IExperience.Position.descriptions` → `IRow.Description[]` 전환 | ~3개 | 🟡 |
| 7 | 날짜 필드 네이밍 통일 (`at` → `presentedAt` 또는 `startedAt`) | ~3개 | 🟢 |
| 8 | `YearMonth` 타입 도입 | ~6개 인터페이스 | 🟢 |

### Phase 2: 컴포넌트 리팩토링 (기술 업그레이드 Phase 2와 병행)

| # | 항목 | 영향 파일 | 난이도 |
|---|------|----------|--------|
| 9 | `PreProcessingComponent` → Section 합성 패턴 전환 | ~10개 | 🟡 |
| 10 | `CommonDescription` 6분기 → 조합 패턴 리팩토링 | 1개 | 🟡 |
| 11 | `serialize()` 함수 공통화 (날짜 포맷팅 헬퍼) | ~5개 | 🟡 |
| 12 | `Util.ts`, `Style.ts` → `lib/` 분리 | ~15개 | 🟢 |

### Phase 3: declare namespace 전환 (기술 업그레이드 Phase 4 ESLint와 병행)

| # | 항목 | 영향 파일 | 난이도 |
|---|------|----------|--------|
| 13 | `declare namespace` → 모듈 export 전환 | ~22개 | 🟡 |
| 14 | `Period` 공통 인터페이스 추출 | ~6개 | 🟢 |

---

## 9. 요약

### 핵심 문제 3가지

1. **보일러플레이트 반복**: 10개 섹션의 동일한 `PreProcessingComponent` 래핑 + 5개 섹션의 유사한 `serialize()` 함수
2. **의존 방향 역전**: `payload/` → `component/` 역방향 의존 (인터페이스가 UI 레이어에 위치)
3. **Hooks 규칙 위반**: `skill/index.tsx`의 조건부 Hook 호출 (런타임 오류 가능)

### 핵심 개선 3가지

1. **타입 레이어 분리** (`types/` 디렉토리): 의존 방향 정상화, payload 재사용성 확보
2. **Section 합성 패턴**: 보일러플레이트 제거, 표준 React 패턴 적용
3. **날짜 유틸리티 중앙화**: 6개 파일에 산재된 날짜 포맷팅 로직을 `lib/date.ts`로 통합

### 기술 업그레이드와의 연계

코드 구조 개선은 기술 업그레이드(`04-technical-upgrade.md`)와 **병행 실행**할 수 있습니다:
- Quick Fixes (#1~#4)는 기술 업그레이드 **이전**에 독립 실행 가능
- Phase 1~3은 기술 업그레이드의 해당 Phase와 **동시 진행**하여 중복 작업 최소화
- `declare namespace` 전환은 ESLint Flat Config 전환과 함께하면 효율적
