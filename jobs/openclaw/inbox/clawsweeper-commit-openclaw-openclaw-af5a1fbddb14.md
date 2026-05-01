---
repo: openclaw/openclaw
cluster_id: clawsweeper-commit-openclaw-openclaw-af5a1fbddb14
mode: autonomous
allowed_actions:
  - comment
  - label
  - fix
  - raise_pr
blocked_actions:
  - close
  - merge
require_human_for:
  - close
  - merge
canonical: []
candidates: []
cluster_refs: []
allow_instant_close: false
allow_fix_pr: true
allow_merge: false
allow_unmerged_fix_close: false
allow_post_merge_close: false
require_fix_before_close: false
security_policy: central_security_only
security_sensitive: false
target_branch: clawsweeper/clawsweeper-commit-openclaw-openclaw-af5a1fbddb14
source: clawsweeper_commit
commit_sha: af5a1fbddb14a1f1ef2f6e9f3487f108d54ce066
clawsweeper_report_repo: openclaw/clawsweeper
clawsweeper_report_path: records/openclaw-openclaw/commits/af5a1fbddb14a1f1ef2f6e9f3487f108d54ce066.md
---

# ClawSweeper commit finding repair

ClawSweeper Repair should create or update one implementation PR from `clawsweeper/clawsweeper-commit-openclaw-openclaw-af5a1fbddb14`
if the finding is still valid on latest `openclaw/openclaw@main`.

## Operator Prompt

Use the ClawSweeper commit report below as the source finding. Do not redo a
broad audit of the commit. Check latest `main`, verify the reported problem is
still present, and make the narrowest safe fix. If latest `main` already fixed
it, make no code changes and report that outcome.

Do not merge. Do not close issues. Do not handle security-sensitive findings in
this lane.

## Commit Finding

- Commit: https://github.com/openclaw/openclaw/commit/af5a1fbddb14a1f1ef2f6e9f3487f108d54ce066
- Report: https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/commits/af5a1fbddb14a1f1ef2f6e9f3487f108d54ce066.md
- Latest main at intake: e311ffdcb94e760796a0a8a2c7e58fb8223678bf

## ClawSweeper Report

```md
---
sha: af5a1fbddb14a1f1ef2f6e9f3487f108d54ce066
parent: 231e5c618f8ae700d51d080e4182a57588da888b
repository: openclaw/openclaw
author: "Peter Steinberger"
committer: "Peter Steinberger"
github_author: steipete
github_committer: steipete
co_authors: []
commit_authored_at: "2026-04-30T23:16:41+01:00"
commit_committed_at: "2026-04-30T23:16:41+01:00"
result: findings
confidence: high
highest_severity: low
check_conclusion: neutral
reviewed_at: 2026-04-30T22:35:45Z
---

# Commit af5a1fbddb

## Summary

Found one macOS-only Parallels smoke harness regression. The new guest script writer creates a root-owned `700` script, then the macOS lane executes it as the desktop user.

## Findings

### Low: macOS update script is not readable by the user that executes it

- Kind: reliability
- File: `scripts/e2e/parallels/npm-update-smoke.ts`
- Line: 739
- Evidence: `guestMacos()` writes the script via `writeGuestScript(macosVm, ...)`, then runs it through `prlctl exec ... --current-user ... /bin/bash <scriptPath>` or the sudo desktop-user fallback at lines 451-453. But `writeGuestScript()` writes with plain `prlctl exec <vm> /usr/bin/tee <scriptPath>` and then `chmod 700 <scriptPath>` at lines 730-739. The Parallels docs describe `--current-user` as logging in as the current guest OS user, so the write path and execute path are different identities for the macOS lane. ([docs.parallels.com](https://docs.parallels.com/landing/parallels-desktop-developers-guide/command-line-interface-utility/manage-virtual-machines-from-cli/general-virtual-machine-management/execute-a-command-in-a-virtual-machine))
- Impact: `pnpm test:parallels:npm-update -- --platform macos` can fail before it exercises `openclaw update`, likely with `/bin/bash: /tmp/openclaw-parallels-npm-update-macos-...sh: Permission denied`. That breaks the intended release/update smoke coverage on current `main`; no later commit in the touched files fixes it.
- Suggested fix: for macOS, write/chmod the temp script through the same resolved transport used to execute it, or explicitly `chown` it to the resolved desktop user and keep permissions non-world-readable because the script embeds provider credentials. Keep the Linux root-owned path separate.
- Confidence: high

## Details

- Do we have a high-confidence way to reproduce the issue? yes: on a Parallels host with the Tahoe VM, run `timeout --foreground 75m pnpm test:parallels:npm-update -- --platform macos --json` and inspect `macos-update.log`.
- Is this the best way to solve the issue? yes: the bug is the identity mismatch between script creation and execution; fixing ownership or writing through the same transport preserves the transport hardening without exposing embedded secrets.

## Reviewed

- Diff: `231e5c618f8ae700d51d080e4182a57588da888b..af5a1fbddb14a1f1ef2f6e9f3487f108d54ce066`
- Changed files: `scripts/e2e/parallels/npm-update-scripts.ts`, `scripts/e2e/parallels/npm-update-smoke.ts`
- Code read: full changed files, `scripts/AGENTS.md`, Parallels smoke skill, adjacent guest transport helpers, macOS/Linux smoke helpers, package script entrypoint
- Dependencies/web: official Parallels `prlctl exec` docs; no package dependency changes
- Commands: `pnpm docs:list`, `git show`, `git diff`, `git diff --check`, `pnpm install`, `pnpm exec tsx scripts/e2e/parallels/npm-update-smoke.ts --help`, `pnpm exec oxfmt --check --threads=1 ...`

## Tests / Live Checks

- `pnpm exec tsx scripts/e2e/parallels/npm-update-smoke.ts --help`: passed after installing deps
- `pnpm exec oxfmt --check --threads=1 scripts/e2e/parallels/npm-update-scripts.ts scripts/e2e/parallels/npm-update-smoke.ts`: passed
- `git diff --check ...`: passed

## Limitations

- `prlctl` is not installed in this environment, so I could not run the actual VM smoke.
```
