---
repo: openclaw/openclaw
cluster_id: clawsweeper-commit-openclaw-openclaw-78f347036848
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
target_branch: clawsweeper/clawsweeper-commit-openclaw-openclaw-78f347036848
source: clawsweeper_commit
commit_sha: 78f347036848b0b27c71e8e6e46ec01b2721d205
clawsweeper_report_repo: openclaw/clawsweeper
clawsweeper_report_path: records/openclaw-openclaw/commits/78f347036848b0b27c71e8e6e46ec01b2721d205.md
---

# ClawSweeper commit finding repair

ClawSweeper Repair should create or update one implementation PR from `clawsweeper/clawsweeper-commit-openclaw-openclaw-78f347036848`
if the finding is still valid on latest `openclaw/openclaw@main`.

## Operator Prompt

Use the ClawSweeper commit report below as the source finding. Do not redo a
broad audit of the commit. Check latest `main`, verify the reported problem is
still present, and make the narrowest safe fix. If latest `main` already fixed
it, make no code changes and report that outcome.

Do not merge. Do not close issues. Do not handle security-sensitive findings in
this lane.

## Commit Finding

- Commit: https://github.com/openclaw/openclaw/commit/78f347036848b0b27c71e8e6e46ec01b2721d205
- Report: https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/commits/78f347036848b0b27c71e8e6e46ec01b2721d205.md
- Latest main at intake: d30b8dccfda391cd5b6eb9d2484676d4d07c1dae

## ClawSweeper Report

```md
---
sha: 78f347036848b0b27c71e8e6e46ec01b2721d205
parent: 5a606947b53a2ecdf60629709bca6a1987024bbd
repository: openclaw/openclaw
author: "Shakker"
committer: "Shakker"
github_author: shakkernerd
github_committer: shakkernerd
co_authors: []
commit_authored_at: "2026-04-29T19:06:20+01:00"
commit_committed_at: "2026-04-30T00:13:12+01:00"
result: findings
confidence: high
highest_severity: medium
check_conclusion: neutral
reviewed_at: 2026-04-29T23:17:27Z
---

# Commit 78f3470368

## Summary

Found one concrete regression in the changed explicit-path handling: valid Unicode credential file paths are normalized as secret material, then rejected authoritatively.

## Findings

### Medium: Explicit ADC paths with Unicode characters are rejected

- Kind: regression
- File: `src/agents/model-auth-env.ts`
- Line: 51
- Evidence: `fileEnvVar` is a credential file path, but `hasLocalFileAuthEvidence()` reads it through `normalizeOptionalSecretInput()`, which strips non-Latin1 characters. With this commit, a present explicit path now returns `fs.existsSync(explicitPath)` immediately, so a corrupted normalized path returns `false` before fallback paths are considered. A focused smoke created both a valid explicit ADC file at `/tmp/.../認証情報/adc.json` and the fallback ADC file, then `resolveEnvApiKey("google-vertex", ...)` returned `null`. Adjacent ADC code already has Unicode-path coverage in `src/plugin-sdk/anthropic-vertex-auth-presence.test.ts:10`.
- Impact: Users with localized/non-ASCII home or credential directories can be reported as unauthenticated for Google Vertex despite a valid `GOOGLE_APPLICATION_CREDENTIALS` file.
- Suggested fix: Normalize `fileEnvVar` values with a path-preserving string trim, not `normalizeOptionalSecretInput()`, then keep the new explicit-path precedence. Add a regression test using a Unicode `GOOGLE_APPLICATION_CREDENTIALS` path.
- Confidence: high

## Reviewed

- Diff: `5a606947b53a2ecdf60629709bca6a1987024bbd..78f347036848b0b27c71e8e6e46ec01b2721d205`
- Changed files: `src/agents/model-auth-env.ts`, `src/agents/model-auth.profiles.test.ts`
- Code read: changed files in full, `src/secrets/provider-env-vars.ts`, `src/agents/model-auth.ts`, `src/commands/models/list.auth-index.ts`, `src/plugins/manifest.ts`, Google plugin manifest, ADC helper/tests, relevant docs.
- Dependencies/web: no dependency changes; no web lookup needed. `gh pr list` found no matching PR.

## Tests / Live Checks

- `git diff --check 5a606947b53a2ecdf60629709bca6a1987024bbd..78f347036848b0b27c71e8e6e46ec01b2721d205` passed.
- Initial targeted test could not start because `node_modules` was missing; ran `pnpm install`, then `pnpm test src/agents/model-auth.profiles.test.ts` passed, 40 tests.
- Focused `pnpm exec tsx -e ...` Unicode ADC smoke reproduced the failing resolver behavior.

## Limitations

- No full-suite/Testbox gate; this was a narrow two-file commit review with focused local checks.
```
