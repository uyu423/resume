---
name: release-ready
description: Prepare a new release (patch/minor/major) - version bump, quality checks (typecheck, lint, build), static build verification, README documentation verification against code changes, git commit & tag. Analyzes code changes since last tag to ensure README reflects actual features and structure. Push is intentionally omitted (human's domain).
---

# Release Ready

Prepare a new version release for resume-nextjs. This skill:

1. Bumps the version in project files
2. Runs typecheck, lint, and build
3. Verifies build succeeds (build output is gitignored, not committed)
4. **Analyzes code changes since last tag**
5. **Verifies README documentation is up-to-date**
6. **Offers to auto-update README** if needed
7. Creates git commit and tag

**Push is intentionally omitted** — that is the human's domain.

## Step 1: Determine next version

Read the current version from `package.json`. Ask the user which semver component to bump using `AskUserQuestion`:

- **patch** (default): bug fixes, minor tweaks (e.g., 2.0.0 -> 2.0.1)
- **minor**: new features, backward-compatible changes (e.g., 2.0.0 -> 2.1.0)
- **major**: breaking changes (e.g., 2.0.0 -> 3.0.0)

Announce the next version to the user before proceeding.

## Step 2: Update version in files

The version string appears in **2 locations**:

| File | Location |
|------|----------|
| `package.json` | `"version": "X.Y.Z"` (line 4) |
| `package-lock.json` | Two occurrences (root + packages entry) |

Use the `Edit` tool for `package.json`. For `package-lock.json`, run `npm install --package-lock-only` after updating `package.json` to let npm regenerate it.

**Important**: The version `1.3.1` also appears in `README.md`, `MIGRATION_V1_TO_V2.md`, and `strategies/` files as a reference to the `v1.3.1-eol` tag. **Do NOT modify these** — they are historical references, not the current version.

**Verify** after editing:

```bash
node -e "const p = require('./package.json'); console.log('package.json:', p.version)"
node -e "const p = require('./package-lock.json'); console.log('package-lock.json:', p.version)"
```

## Step 3: Quality checks

Run in sequence:

```bash
npm run typecheck
npm run lint
```

Both must pass. If either fails, report the error and ask the user whether to auto-fix or abort. For lint, `npm run lint:fix` is available.

## Step 4: Build and verify

```bash
npm run build
```

This runs `next build` (output: `docs/`) followed by `shellwork.js` (postbuild: creates `docs/.nojekyll` and conditionally `docs/CNAME`).

**Verify build output:**

```bash
# docs/ exists and contains index.html
ls docs/index.html

# .nojekyll exists
ls docs/.nojekyll

# Check build size (warn if > 50MB)
du -sh docs/
```

If build fails, stop and report.

## Step 5: Verify and Update README Documentation

**This step runs after build verification, before git commit.**

### 5.1: Analyze changes since last tag

```bash
LAST_TAG=$(git tag --sort=-version:refname | head -1)

if [ -z "$LAST_TAG" ]; then
  echo "No previous tags found. Treating all current code as new."
  LAST_TAG=$(git rev-list --max-parents=0 HEAD)
fi

# Commits since last tag
git log ${LAST_TAG}..HEAD --oneline

# New/modified component directories
git diff ${LAST_TAG}..HEAD --diff-filter=A --name-only -- 'component/'

# New/modified payload files
git diff ${LAST_TAG}..HEAD --name-only -- 'payload/'

# New/modified type files
git diff ${LAST_TAG}..HEAD --name-only -- 'types/'

# Changes to package.json dependencies
git diff ${LAST_TAG}..HEAD -- package.json | grep "^[+-]" | grep -v "^[+-][+-]"

# Changes to commands (scripts)
git diff ${LAST_TAG}..HEAD -- package.json | grep '"scripts"' -A 20
```

**Categorize changes:**

1. **New sections added** (new `component/` dirs + `payload/` files + `types/` files) -> README Structure and Payload Description sections need updates
2. **Commands changed** (package.json scripts) -> README Commands table needs updates
3. **Dependencies changed** (major framework versions) -> README Introduce section needs updates
4. **New features** (dark mode, nav, print, etc.) -> README Features section needs updates
5. **Structure changes** (new directories) -> README Structure tree needs updates
6. **No significant changes** -> README update not needed

### 5.2: Verify README is up-to-date

**Section verification:**

- Read all directories under `component/` that have an `index.tsx`
- Check each section appears in README's "Payload Description" subsections
- Flag any missing sections

**Commands verification:**

- Extract all scripts from `package.json`
- Check each appears in README's "Commands" table
- Flag any missing or outdated commands

**Structure verification:**

- Check README's directory tree matches actual project structure
- Flag any missing directories

**Tech stack verification:**

- Compare README's version claims (Next.js, React, TypeScript, Bootstrap) against `package.json` dependencies
- Flag any version mismatches

### 5.3: Auto-update README.md (without approval)

**If updates are needed, directly update README.md.** This step happens AUTOMATICALLY without asking first.

Common updates:

1. **Tech stack versions** in Introduce section
2. **New section entries** in Payload Description
3. **Commands table** if scripts changed
4. **Structure tree** if new directories added
5. **Features section** if new user-facing features added

### 5.4: Show changes and ask for review

After updating README.md, show the diff:

```bash
git diff README.md
```

Ask for approval using `AskUserQuestion`:

- **Approve** - Accept README changes
- **Revise** - User will manually edit, then re-run this skill
- **Revert** - Undo README changes completely

**If choice = Revise**: Report and exit the skill (do not proceed to commit).

**If choice = Revert**:

```bash
git checkout README.md
```

Proceed to next step without staging README.

**If no updates needed** (from 5.2): Report "README is up-to-date." and proceed.

## Step 6: Git commit & tag

Create a release commit and tag. **Do NOT push.**

```bash
# Stage version files
git add package.json package-lock.json

# Stage README if approved in Step 5
# (skip if reverted or no updates)

# docs/ is gitignored — CI builds and deploys to gh-pages branch

# Verify staged files
git status --short

# Create commit and tag
git commit -m "chore(release): vX.Y.Z"
git tag vX.Y.Z
```

Commit message format: `chore(release): v{version}`

## Step 7: Summary

```
============================================================
  Release Ready: v{version}
============================================================
  Version bump:      {old} -> {new}
  Typecheck:         PASS
  Lint:              PASS
  Build:             PASS (docs/ {size})

  README verification:
    - Commits since {last_tag}: {count}
    - README.md: {UPDATED | UP-TO-DATE | REVERTED}

  Git commit:        {sha}
  Git tag:           v{version}
------------------------------------------------------------
  Next steps:
    git push origin {branch}
    git push origin v{version}

  Note: master push triggers GitHub Actions CI/CD
  which auto-deploys to GitHub Pages.
============================================================
```

## Important

- **NEVER** push to remote. This is explicitly the human's domain.
- **NEVER** modify version references in README.md, MIGRATION_V1_TO_V2.md, or strategies/ that refer to the `v1.3.1-eol` historical tag.
- **ALWAYS** update README.md first, THEN ask user to review.
- **ALWAYS** show git diff of README.md changes before asking for approval.
- **ALWAYS** provide revert option if user doesn't like the changes.
- If any step fails, stop immediately and report with actionable guidance.
- README updates are based on **actual code changes** (new sections, commands, dependencies), not git commit messages.
- If README is already up-to-date, skip the update step entirely.
