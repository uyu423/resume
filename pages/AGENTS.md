<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-02-17 | Updated: 2026-02-17 -->

# pages

## Purpose
Next.js Pages Router 페이지. 유일한 라우트(`/`)에서 모든 섹션 컴포넌트를 조합하여 이력서를 렌더링.

## Key Files

| File | Description |
|------|-------------|
| `index.tsx` | 메인 페이지 — Profile, Highlight, Experience, Project, Skill, OpenSource, Presentation, Article, Education, Testimonial, Introduce, Etc, Footer 순서로 렌더링 |
| `_app.tsx` | Next.js App 래퍼 — 전역 스타일 import |
| `_document.tsx` | HTML Document — Pretendard/Sora/JetBrains Mono 폰트 CDN, 다크모드 초기화 스크립트 |

## For AI Agents

### Working In This Directory
- 섹션 렌더링 순서를 변경하려면 `index.tsx`의 컴포넌트 배열 수정
- 새 섹션 추가 시 `index.tsx`에 import + 렌더링 위치 추가
- `_document.tsx`에서 외부 폰트 CDN 관리

## Dependencies

### Internal
- `component/*/` — 모든 섹션 컴포넌트
- `payload/index.ts` — 통합 Payload 객체
- `styles/globals.css` — 전역 스타일

<!-- MANUAL: -->
