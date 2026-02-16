<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-02-17 | Updated: 2026-02-17 -->

# workflows

## Purpose
GitHub Actions CI/CD 워크플로우.

## Key Files

| File | Description |
|------|-------------|
| `ci.yml` | CI — push/PR 시 typecheck, lint, build 실행. master에서 `gh-pages` 브랜치로 자동 배포 |
| `release.yml` | Release — `v*` 태그 시 CI 검증 → 버전 일치 확인 → changelog 생성 → GitHub Release 생성 |

## For AI Agents

### Working In This Directory
- CI: `.nvmrc` 기반 Node 버전 사용
- Release: `requarks/changelog-action` + `ncipollo/release-action` 사용
- 배포: `peaceiris/actions-gh-pages`로 `docs/` artifact를 `gh-pages` 브랜치에 배포

<!-- MANUAL: -->
