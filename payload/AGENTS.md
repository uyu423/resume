<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-02-17 | Updated: 2026-02-17 -->

# payload

## Purpose
이력서 데이터 파일. 각 파일이 하나의 섹션 데이터를 export한다. 이력서를 커스터마이징하려면 이 디렉토리의 파일만 수정하면 된다.

## Key Files

| File | Description |
|------|-------------|
| `index.ts` | 모든 payload를 통합하여 단일 `Payload` 객체로 export |
| `_global.ts` | 전역 설정 — headTitle, favicon, OG tags, JSON-LD SEO |
| `profile.ts` | 프로필 — 이미지, 이름, 연락처, 공지, 통계, CTA 버튼 |
| `experience.ts` | 경력 목록 — 회사, 포지션, 기간, 설명, 스킬 키워드 |
| `skill.ts` | 기술 분류 — 카테고리별 기술 항목 (level 1-3) |
| `project.ts` | 프로젝트 목록 |
| `education.ts` | 학력 정보 |
| `highlight.ts` | 주요 성과 |
| `article.ts` | 기고/블로그 글 목록 |
| `etc.ts` | 기타 정보 (언어, 자격증 등) |
| `introduce.ts` | 자기소개 텍스트 |
| `openSource.ts` | 오픈소스 기여 |
| `presentation.ts` | 발표/컨퍼런스 목록 |
| `testimonial.ts` | 추천글 |
| `footer.ts` | 푸터 정보 |

## For AI Agents

### Working In This Directory
- 날짜 형식: `YYYY-MM` (e.g., `"2018-02"`)
- 진행 중인 항목: `endedAt`을 생략하면 "현재" 표시
- `disable: true` — 해당 섹션 비활성화
- `printExclude: true` — 인쇄 시 제외
- 타입 정의는 `types/` 디렉토리 참조

## Dependencies

### Internal
- `types/` — 각 payload의 TypeScript 인터페이스

<!-- MANUAL: -->
