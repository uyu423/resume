<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-02-17 | Updated: 2026-02-17 -->

# experience

## Purpose
경력 섹션 — 회사별 포지션, 기간, 설명, 스킬 키워드. 총 경력 기간 자동 계산 (회사 간 겹침 제거).

## Key Files

| File | Description |
|------|-------------|
| `index.tsx` | 경력 리스트 + 총 경력 기간 계산 |
| `row.tsx` | 개별 경력 항목 (회사명, 포지션, 기간, 설명, 스킬 키워드 태그) |

## Dependencies

### Internal
- `types/experience.ts` — `ExperiencePayload`, `ExperienceItem`, `ExperiencePosition`
- `component/common/` — Section, CommonSection, CommonRow, CommonDescription, Util

<!-- MANUAL: -->
