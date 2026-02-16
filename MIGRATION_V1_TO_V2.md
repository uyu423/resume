# resume-nextjs main(v1) -> release/v2 마이그레이션 가이드

이 문서는 `upstream/resume-nextjs`의 v1 대비 v2 전환 시, 기존 사용자가 실제로 수정해야 하는 항목만 빠르게 반영할 수 있도록 정리한 가이드입니다.

## 0) 비교 기준

- 요청 기준 브랜치: `main (v1)` -> `release/v2`
- 참고: 공개 upstream(`uyu423/resume-nextjs`)에서는 현재 아래 브랜치명에 대응됩니다.
  - `main (v1)` ~= `master`
  - `release/v2` ~= `feature/v2`

브랜치 비교 예시:

```bash
git fetch upstream
git diff --stat upstream/main...upstream/release/v2
```

공개 upstream 기준:

```bash
git fetch resume-nextjs
git diff --stat resume-nextjs/master...resume-nextjs/feature/v2
```

## 1) 한 번에 끝내는 빠른 전환 순서

1. Node 버전을 `24.13.0`으로 맞춥니다 (`.nvmrc`).
2. CI/배포 스크립트에서 `npm run export` 호출을 `npm run build`로 변경합니다.
3. `next-images`/`next-seo`/`styled-components`/`jquery` 의존 제거를 반영합니다.
4. `asset/*` 이미지를 `public/*`로 옮기고, payload 이미지 참조를 문자열 경로(`/sample_tux.png`)로 변경합니다.
5. 타입 import 경로를 `component/**/I*.ts`에서 `types/*.ts`로 전환합니다.
6. `payload/experience.ts`의 `descriptions: string[]`를 `descriptions: { content: string }[]`로 변환합니다.
7. `payload/skill.ts`의 `tooltip` 필드를 제거합니다.
8. 선택적으로 `highlight`, `testimonial`, `profile.tagline/headings/ctas`, `_global.jsonLd`를 추가 적용합니다.

## 2) 사용자 영향이 큰 변경점 (Breaking 중심)

| 영역           | v1                                            | v2                                                        | 사용자 조치                               |
| -------------- | --------------------------------------------- | --------------------------------------------------------- | ----------------------------------------- |
| 런타임         | Next 10 / React 17                            | Next 16 / React 19                                        | Node 24 기반으로 실행/빌드 환경 갱신      |
| 정적 export    | `npm run export` + `next export`              | `next.config.js`의 `output: 'export'` + `distDir: 'docs'` | 배포/자동화 명령을 `npm run build`로 변경 |
| 이미지 처리    | `next-images`, `asset/` import                | `public/` 정적 경로 문자열 사용                           | payload 이미지 경로를 `/...` 형태로 교체  |
| SEO            | `next-seo`의 `NextSeoProps`                   | 기본 meta + `jsonLd`(optional)                            | `_global.seo` 구조와 JSON-LD 값 점검      |
| 타입 구조      | `declare namespace I*` + `component/**/I*.ts` | 모듈 export interface + `types/*.ts`                      | 커스텀 코드 import 경로/타입명 변경       |
| 섹션 렌더링    | `PreProcessingComponent` HOC                  | `Section` 컴포지션                                        | 커스텀 섹션 구현 시 패턴 교체             |
| payload 스키마 | 일부 단순 구조                                | 경험 설명/신규 섹션 등 확장                               | 아래 3장 예시대로 데이터 형식 변환        |

## 3) payload 마이그레이션 상세

### 3-1. 이미지 참조 방식 변경

`next-images` 제거로 인해 이미지 파일 import 대신 `public/` 기반 경로 문자열을 사용합니다.

Before (v1):

```ts
import image from '../asset/sample_tux.png';

const profile = {
  image,
};
```

After (v2):

```ts
const profile = {
  image: '/sample_tux.png',
};
```

### 3-2. Experience descriptions 형식 변경 (필수)

`string[]`에서 `RowDescription[]`로 변경되었습니다.

Before (v1):

```ts
descriptions: ['Linux 커널 패치 적용', '배포 자동화'];
```

After (v2):

```ts
descriptions: [{ content: 'Linux 커널 패치 적용' }, { content: '배포 자동화' }];
```

### 3-3. Skill tooltip 제거

`payload/skill.ts`의 `tooltip` 속성은 v2 타입에서 제거되었습니다.

Before (v1):

```ts
const skill = {
  disable: false,
  skills: [...],
  tooltip: '1: 기초, 2: 실무, 3: 전문가',
};
```

After (v2):

```ts
const skill = {
  disable: false,
  skills: [...],
};
```

### 3-4. Global SEO + JSON-LD

`next-seo` 의존이 제거되어 `_global.seo`는 내부 타입(`GlobalSeo`)으로 관리됩니다.
선택적으로 `_global.jsonLd`를 추가해 구조화 데이터를 넣을 수 있습니다.

```ts
export const _global = {
  headTitle: 'Your Name | Web Resume',
  favicon: '/favicon.ico',
  seo: {
    title: 'Your Name | Web Resume',
    description: 'Web resume',
    openGraph: {
      title: 'Your Name | Web Resume',
      description: 'Web resume',
      images: [{ url: '/preview.jpg', width: 800, height: 600 }],
      type: 'profile',
      profile: { firstName: 'Your', lastName: 'Name', username: 'yourname' },
    },
  },
  jsonLd: {
    name: 'Your Name',
    jobTitle: 'Software Engineer',
    worksFor: 'Company Name',
    url: 'https://your-resume-url.com',
    sameAs: ['https://github.com/yourname'],
  },
};
```

### 3-5. 신규 payload (선택)

v2에서는 `highlight`, `testimonial` 섹션이 추가되었습니다.

- 사용하지 않을 경우 `disable: true`로 두거나, `pages/index.tsx`에서 렌더링하지 않으면 됩니다.
- 기존 v1 UI와 최대한 유사하게 유지하려면 우선 두 섹션을 비활성화 후 점진 도입을 권장합니다.

## 4) 커스텀 코드 마이그레이션 포인트

### 4-1. 타입 import 경로 변경

Before (v1):

```ts
import { IProfile } from '../component/profile/IProfile';
type Payload = IProfile.Payload;
```

After (v2):

```ts
import { ProfilePayload } from '../types/IProfile';
type Payload = ProfilePayload;
```

### 4-2. 섹션 렌더링 패턴 변경

Before (v1): `PreProcessingComponent` 기반

After (v2):

```tsx
import { Section } from '../common/Section';

export function FooSection({ payload }: { payload: FooPayload }) {
  return (
    <Section payload={payload}>
      <FooContent payload={payload} />
    </Section>
  );
}
```

## 5) 배포/CI 스크립트 변경 체크

- `npm run export` 제거 여부 확인
- `npm run build`만으로 `docs/` 정적 산출물이 생성되는지 확인
- GitHub Pages 배포가 `docs/` 경로를 계속 바라보는지 확인
- `shellwork.js`는 `homepage`가 비어 있으면 실패(exit 1)하므로 `package.json.homepage` 필드를 유지

## 6) 검증 체크리스트

```bash
nvm use 24.13.0
npm ci
npm run lint
npm run build
```

성공 기준:

- lint 오류 없음
- `docs/index.html` 생성됨
- 브라우저에서 프로필 이미지/OG 이미지가 404 없이 출력됨
- Experience 섹션 설명 목록이 정상 렌더링됨

## 7) v1 사용자 최소 변경 템플릿

"일단 빌드만 통과"가 목표라면 아래 4가지만 먼저 적용하세요.

1. Node 24 + 의존성 업데이트
2. 이미지 경로를 `public/` 문자열 경로로 변경
3. `experience.descriptions`를 객체 배열로 변경
4. `npm run export` -> `npm run build`로 변경

이후 `highlight/testimonial`, `jsonLd`, 다크모드/플로팅 네비게이션 등은 선택적으로 순차 도입하면 됩니다.
