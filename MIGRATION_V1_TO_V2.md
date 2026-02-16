# v1.3.1-eol -> release/v2 Payload 마이그레이션 가이드

이 문서는 **v1 사용자가 v2 브랜치를 머지할 때 `payload/` 충돌을 최소화**하는 데 집중합니다.
핵심 목표는 "v2 구조를 받아오되, 내가 입력한 payload 데이터는 잃지 않는 것"입니다.

## 기준

- 베이스: `upstream` 태그 `v1.3.1-eol`
- 타깃: `upstream/release/v2`
- 공개 upstream(`uyu423/resume-nextjs`) 대응:
  - `v1.3.1-eol` (tag)
  - `resume-nextjs/feature/v2` (branch)

비교 확인:

```bash
git fetch upstream --tags
git diff --name-status v1.3.1-eol...upstream/release/v2 -- payload
```

공개 upstream 기준:

```bash
git fetch resume-nextjs --tags
git diff --name-status v1.3.1-eol...resume-nextjs/feature/v2 -- payload
```

## 왜 payload 충돌이 큰가

v2에서 payload는 단순 텍스트 변경이 아니라 구조 자체가 바뀌었습니다.

1. 타입 import 경로 변경: `component/**/I*.ts` -> `types/*.ts`
2. `experience.descriptions` 구조 변경: `string[]` -> `{ content: string }[]`
3. 신규 payload 파일 추가: `highlight.ts`, `testimonial.ts`
4. `payload/index.ts`에서 새 섹션 import/aggregate 추가
5. `_global.ts`, `profile.ts`에 확장 필드 추가 (`jsonLd`, `tagline/headings/ctas`)

즉, 머지 충돌 해결에서 "ours/theirs만 선택"하면 데이터가 날아가거나 빌드가 깨질 수 있습니다.

## 가장 안전한 작업 순서 (권장)

아래 순서는 **충돌 해결 전에 사용자 데이터 백업 -> v2 구조 수용 -> 사용자 데이터 재적용** 순서입니다.

### 1) 머지 전 payload 백업

```bash
mkdir -p .migration_backup
cp -R payload ".migration_backup/payload-v1"
```

중요: 이 백업이 실제 사용자 입력값 보존본입니다.

### 2) v2 머지 시작 (자동 커밋 금지)

```bash
git merge upstream/release/v2 --no-commit --no-ff
git status
```

### 3) 충돌 파일 우선순위대로 해결

아래 순서로 처리하면 가장 안정적입니다.

1. `payload/index.ts` (최우선)
2. `payload/experience.ts` (구조 breaking)
3. `payload/_global.ts`
4. `payload/profile.ts`
5. 나머지 payload 파일

### 4) "v2 구조 우선"으로 파일 선택 후, 내 데이터를 수동 이식

권장 방식:

```bash
# 예시: v2 파일 구조 채택
git checkout --theirs payload/index.ts
git checkout --theirs payload/experience.ts
git checkout --theirs payload/_global.ts
git checkout --theirs payload/profile.ts
```

그 다음 `.migration_backup/payload-v1`의 내 값만 다시 복사/이식합니다.

## 파일별 마이그레이션 규칙 (핵심)

### 1) payload/index.ts

- v2에서 `highlight`, `testimonial` import/등록이 추가됩니다.
- 규칙: **v2 구조를 유지**하고, 내가 쓰던 payload import/필드만 누락 없이 반영합니다.

필수 체크:

- `highlight`와 `testimonial`이 object/interface 양쪽에 모두 있는지
- type import가 모두 `../types/*`를 가리키는지

### 2) payload/experience.ts (가장 중요한 breaking)

v1:

```ts
descriptions: ['문장1', '문장2'];
```

v2:

```ts
descriptions: [{ content: '문장1' }, { content: '문장2' }];
```

이 변환을 안 하면 v2 컴포넌트 렌더링/타입에서 문제납니다.

### 3) payload/\_global.ts

- 파일/이미지 참조를 문자열 경로로 유지 (`/favicon.ico`, `/preview.jpg`)
- `seo`는 v2 구조 유지
- `jsonLd`는 optional이지만 v2에서는 추가 권장

주의:

- v1의 `asset` import 패턴으로 되돌리면 v2 구성과 어긋날 수 있습니다.

### 4) payload/profile.ts

- v2 구조 유지 후 내 값 이식
- `tagline`, `headings`, `ctas`는 optional
- 당장 필요 없으면 생략 가능

### 5) payload/skill.ts

- `tooltip` 필드는 v2 타입에서 제거됨
- 머지 후 `tooltip`이 남아 있으면 삭제

### 6) 신규 파일 추가

v2 머지 후 아래 파일이 없으면 생성해야 합니다.

- `payload/highlight.ts`
- `payload/testimonial.ts`

둘 다 당장 사용하지 않으면 `disable: true`로 두는 방식도 가능합니다.

## 실제 작업 템플릿 (명령 중심)

```bash
# 0) 백업
mkdir -p .migration_backup
cp -R payload ".migration_backup/payload-v1"

# 1) 머지 시작
git merge upstream/release/v2 --no-commit --no-ff

# 2) 고위험 파일부터 v2 구조 채택
git checkout --theirs payload/index.ts
git checkout --theirs payload/experience.ts
git checkout --theirs payload/_global.ts
git checkout --theirs payload/profile.ts

# 3) 나머지 payload도 v2 구조 채택 (필요시)
git checkout --theirs payload/skill.ts payload/article.ts payload/education.ts payload/etc.ts
git checkout --theirs payload/openSource.ts payload/presentation.ts payload/project.ts payload/footer.ts payload/introduce.ts

# 4) 에디터에서 .migration_backup/payload-v1 를 보면서 내 데이터 재적용
#    - experience.descriptions 변환 필수
#    - skill.tooltip 제거 확인
#    - index.ts의 highlight/testimonial 누락 확인

# 5) 스테이징/검증
git add payload
npm run lint
npm run build

# 6) 머지 완료
git commit -m "merge: migrate payload data from v1.3.1-eol to v2"
```

## 파일별 충돌 위험도

- 높음: `payload/index.ts`, `payload/experience.ts`, `payload/_global.ts`, `payload/profile.ts`
- 중간: `payload/skill.ts`
- 낮음(주로 import/type 경로): `article.ts`, `education.ts`, `etc.ts`, `openSource.ts`, `presentation.ts`, `project.ts`, `footer.ts`, `introduce.ts`
- 신규 추가: `highlight.ts`, `testimonial.ts`

## 마지막 확인 체크리스트

- `payload/experience.ts`의 모든 descriptions가 객체 배열인가?
- `payload/skill.ts`에 `tooltip`이 남아있지 않은가?
- `payload/index.ts`에 `highlight`, `testimonial` import/등록이 모두 있는가?
- `_global.ts`가 v2 스타일(문자열 이미지 경로 + seo 구조)을 유지하는가?
- `npm run lint` / `npm run build`가 성공하는가?

## 실패를 줄이는 원칙

1. 충돌 파일에서 구조는 v2를 따른다.
2. 데이터 값(내 경력/프로젝트/소개문)은 v1 백업에서 가져온다.
3. 한 번에 다 해결하려 하지 말고, `index -> experience -> _global -> profile` 순으로 고정한다.

이 원칙대로 진행하면 payload 충돌이 많아도 안정적으로 v1 -> v2 전환이 가능합니다.
