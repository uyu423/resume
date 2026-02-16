<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-02-17 | Updated: 2026-02-17 -->

# styles

## Purpose
전역 CSS 스타일시트. CSS 변수 기반 디자인 토큰과 다크모드를 포함.

## Key Files

| File | Description |
|------|-------------|
| `globals.css` | 전역 스타일 — 디자인 토큰, 리셋, 컴포넌트 스타일, 다크모드, 인쇄 스타일 |

## For AI Agents

### Working In This Directory
- 디자인 토큰: CSS 변수로 정의 (폰트, 색상, spacing, 애니메이션)
- 폰트: Pretendard (본문), Sora (display), JetBrains Mono (코드), Parisienne (서명)
- 다크모드: `[data-theme="dark"]` 선택자로 오버라이드
- spacing: xs(4px) ~ 3xl(96px), section gap 88px
- 전환 효과: fast(150ms), base(200ms), slow(300ms), enter(800ms)

## Dependencies

### External
- Pretendard, Sora, JetBrains Mono — CDN 폰트 (`pages/_document.tsx`에서 로드)

<!-- MANUAL: -->
