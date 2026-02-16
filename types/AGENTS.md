<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-02-17 | Updated: 2026-02-17 -->

# types

## Purpose
TypeScript 인터페이스 정의. 각 파일이 대응하는 `payload/` 및 `component/` 섹션의 타입을 정의한다.

## Key Files

| File | Description |
|------|-------------|
| `common.ts` | `CommonPayload` — `disable?`, `printExclude?` 공통 필드 |
| `global.ts` | `GlobalPayload`, `GlobalSeo`, `GlobalOpenGraph`, `GlobalJsonLd` |
| `row.ts` | `RowPayload`, `RowDescription`, `FontWeightType` — 2열 레이아웃 공통 타입 |
| `profile.ts` | `ProfilePayload`, `ProfileContact`, `ProfileHeading`, `ProfileCTA` |
| `experience.ts` | `ExperiencePayload`, `ExperienceItem`, `ExperiencePosition` |
| `skill.ts` | `SkillPayload`, `SkillItem`, `SkillSubItem` (level: 1-3) |
| `project.ts` | `ProjectPayload`, `ProjectItem` |
| `education.ts` | `EducationPayload`, `EducationItem` |
| `highlight.ts` | `HighlightPayload` |
| `article.ts` | `ArticlePayload` |
| `etc.ts` | `EtcPayload` |
| `introduce.ts` | `IntroducePayload` |
| `open-source.ts` | `OpenSourcePayload` |
| `presentation.ts` | `PresentationPayload` |
| `testimonial.ts` | `TestimonialPayload` |
| `footer.ts` | `FooterPayload` |

## For AI Agents

### Working In This Directory
- 모든 섹션 payload는 `CommonPayload` extends
- `RowPayload`는 2열 레이아웃 기반 섹션의 공통 타입
- `RowDescription`은 재귀적 중첩 구조 (`descriptions?: RowDescription[]`)
- 새 섹션 추가 시: 이 디렉토리에 타입 파일 생성 → `payload/`에 데이터 → `component/`에 UI

## Dependencies

### Internal
- `payload/` — 이 타입을 사용하여 데이터 정의
- `component/` — 이 타입을 props로 사용

<!-- MANUAL: -->
