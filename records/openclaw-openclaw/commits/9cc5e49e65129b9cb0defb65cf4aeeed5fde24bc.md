---
sha: 9cc5e49e65129b9cb0defb65cf4aeeed5fde24bc
parent: f05e2222f320fe3d786fbfcb20cf613c70f19e64
repository: openclaw/openclaw
author: "jesse-merhi"
committer: "Jesse Merhi"
github_author: jesse-merhi
github_committer: jesse-merhi
co_authors: []
commit_authored_at: "2026-05-07T14:41:35+10:00"
commit_committed_at: "2026-05-08T01:18:04+10:00"
result: nothing_found
confidence: high
highest_severity: none
check_conclusion: success
reviewed_at: 2026-05-07T15:45:04Z
---

# Commit 9cc5e49

Nothing found.

## Details

- Do we have a high-confidence way to reproduce the issue? Not applicable; no actionable issue was found.
- Is this the best way to solve the issue? Not applicable; no fix is recommended.
- Note: the transient OpenGrep replacement added by this commit is no longer present on current `main`; current `main` moved the managed-proxy runtime mutation guard to CodeQL in `cf9e9cd119`.

## Reviewed

- Diff: `f05e2222f320fe3d786fbfcb20cf613c70f19e64..9cc5e49e65129b9cb0defb65cf4aeeed5fde24bc`
- Changed files: `package.json`, `scripts/check-managed-proxy-runtime-mutation.mjs`, `scripts/lib/callsite-guard.mjs`, `scripts/run-additional-boundary-checks.mjs`, `security/opengrep/precise.yml`, `security/opengrep/rules/openclaw-policy/managed-proxy-runtime-mutation.yml`, `test/scripts/check-managed-proxy-runtime-mutation.test.ts`, `test/scripts/run-additional-boundary-checks.test.ts`
- Code read: changed files, removed guard implementation from base, current `scripts/lib/callsite-guard.mjs`, current boundary runner, current CodeQL replacement, `src/infra/net/proxy/proxy-lifecycle.ts`, `extensions/browser/src/browser/cdp-proxy-bypass.ts`
- Dependencies/web: inspected GitHub PR `77126` and check status with `gh`; no general web lookup was needed.
- Commands: `pnpm docs:list`, `pnpm install`, `pnpm test test/scripts/run-additional-boundary-checks.test.ts`, `pnpm check:opengrep-rule-metadata`, targeted `git show`/`git diff`/`rg` inspections.

## Limitations

- Local `opengrep` and `codeql` CLIs were not installed, so scanner execution was not run locally. Current-main source review, metadata validation, focused test coverage, and PR/check inspection were sufficient for this clean review.
