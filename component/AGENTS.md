<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-02-17 | Updated: 2026-02-17 -->

# component

## Purpose
이력서 섹션별 UI 컴포넌트. 각 하위 디렉토리가 하나의 이력서 섹션에 대응한다. 공통 컴포넌트는 `common/`에 위치.

## Subdirectories

| Directory | Purpose |
|-----------|---------|
| `common/` | 공통 컴포넌트 및 유틸리티 (see `common/AGENTS.md`) |
| `profile/` | 프로필 섹션 — 사진, 이름, 연락처, 통계 (see `profile/AGENTS.md`) |
| `experience/` | 경력 섹션 (see `experience/AGENTS.md`) |
| `skill/` | 기술 스택 섹션 (see `skill/AGENTS.md`) |
| `project/` | 프로젝트 섹션 (see `project/AGENTS.md`) |
| `education/` | 학력 섹션 (see `education/AGENTS.md`) |
| `highlight/` | 주요 성과 섹션 (see `highlight/AGENTS.md`) |
| `introduce/` | 자기소개 섹션 (see `introduce/AGENTS.md`) |
| `article/` | 기고/블로그 섹션 (see `article/AGENTS.md`) |
| `openSource/` | 오픈소스 기여 섹션 (see `openSource/AGENTS.md`) |
| `presentation/` | 발표/컨퍼런스 섹션 (see `presentation/AGENTS.md`) |
| `testimonial/` | 추천글 섹션 (see `testimonial/AGENTS.md`) |
| `etc/` | 기타 정보 섹션 (see `etc/AGENTS.md`) |
| `footer/` | 푸터 (see `footer/AGENTS.md`) |
| `nav/` | 플로팅 네비게이션 (see `nav/AGENTS.md`) |

## For AI Agents

### Working In This Directory
- 각 섹션은 동일 패턴: `index.tsx` (메인 컴포넌트) + 선택적 `row.tsx` (개별 항목)
- 모든 섹션은 `common/` 컴포넌트를 사용 (Section, CommonSection, CommonRow, CommonDescription)
- 타입은 `types/` 디렉토리에 정의, payload 데이터는 `payload/`에 정의
- 새 섹션 추가 시: `types/` + `payload/` + `component/<section>/` + `pages/index.tsx` 렌더링 순서 수정 필요

### Common Patterns
- `Section` 래퍼: `disable`, `printExclude` 플래그 체크 → 조건부 렌더링
- `CommonSection`: 섹션 제목 + 진입 애니메이션
- `CommonRow`: 2열 레이아웃 (좌: 제목, 우: 설명)
- `CommonDescription`: 재귀적 중첩 bullet list

## Dependencies

### Internal
- `types/` — 모든 섹션 인터페이스 정의
- `payload/` — 섹션 데이터
- `component/common/` — 공통 UI 컴포넌트

<!-- MANUAL: -->
