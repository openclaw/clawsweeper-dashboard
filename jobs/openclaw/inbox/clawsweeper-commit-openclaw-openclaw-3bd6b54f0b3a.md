---
repo: openclaw/openclaw
cluster_id: clawsweeper-commit-openclaw-openclaw-3bd6b54f0b3a
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
target_branch: clawsweeper/clawsweeper-commit-openclaw-openclaw-3bd6b54f0b3a
source: clawsweeper_commit
commit_sha: 3bd6b54f0b3a3971b12bd63799fe4fd9b879b323
clawsweeper_report_repo: openclaw/clawsweeper
clawsweeper_report_path: records/openclaw-openclaw/commits/3bd6b54f0b3a3971b12bd63799fe4fd9b879b323.md
---

# ClawSweeper commit finding repair

ClawSweeper Repair should create or update one implementation PR from `clawsweeper/clawsweeper-commit-openclaw-openclaw-3bd6b54f0b3a`
if the finding is still valid on latest `openclaw/openclaw@main`.

## Operator Prompt

Use the ClawSweeper commit report below as the source finding. Do not redo a
broad audit of the commit. Check latest `main`, verify the reported problem is
still present, and make the narrowest safe fix. If latest `main` already fixed
it, make no code changes and report that outcome.

Do not merge. Do not close issues. Do not handle security-sensitive findings in
this lane.

## Commit Finding

- Commit: https://github.com/openclaw/openclaw/commit/3bd6b54f0b3a3971b12bd63799fe4fd9b879b323
- Report: https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/commits/3bd6b54f0b3a3971b12bd63799fe4fd9b879b323.md
- Latest main at intake: 80ec402d0fc61e12ff55ba7873dd714980b97d0d

## ClawSweeper Report

```md
---
sha: 3bd6b54f0b3a3971b12bd63799fe4fd9b879b323
parent: 5a631e1ee9faf049c2bcc194f5240f2a30d21eb4
repository: openclaw/openclaw
author: "clawsweeper[bot]"
committer: "GitHub"
github_author: clawsweeper[bot]
github_committer: web-flow
co_authors: []
commit_authored_at: "2026-04-30T01:52:09+01:00"
commit_committed_at: "2026-04-30T01:52:09+01:00"
result: findings
confidence: high
highest_severity: medium
check_conclusion: neutral
reviewed_at: 2026-04-30T00:55:58+00:00
---

# Commit 3bd6b54

## Summary

Found one regression: the new Google Vertex manifest evidence accepts the Windows `%APPDATA%` ADC path, but the Google Vertex runtime ADC loader still does not read that path.

## Findings

### Medium: APPDATA ADC evidence can mark Google Vertex as authenticated when runtime cannot use it

- Kind: regression
- File: `extensions/google/openclaw.plugin.json`
- Line: 86
- Evidence: This commit adds `"${APPDATA}/gcloud/application_default_credentials.json"` as valid Google Vertex auth evidence, and `src/agents/model-auth-env.ts:35` expands `${APPDATA}`. The actual Google Vertex ADC loader in `extensions/google/vertex-adc.ts:42` still only checks `GOOGLE_APPLICATION_CREDENTIALS` and `${HOME}/.config/gcloud/application_default_credentials.json`. The provider also gates Vertex stream creation on `hasGoogleVertexAuthorizedUserAdcSync()` at `extensions/google/provider-registration.ts:60`, and marker auth resolves headers through the same ADC loader at `extensions/google/transport-stream.ts:604`.
- Impact: On Windows-style setups with only `%APPDATA%/gcloud/application_default_credentials.json`, `resolveEnvApiKey("google-vertex")` reports `{ apiKey: "gcp-vertex-credentials", source: "gcloud adc" }`, so model status/discovery can show Google Vertex auth as available. Runtime then fails to activate/use the Vertex transport because the ADC loader returns false for the same environment.
- Suggested fix: Update `extensions/google/vertex-adc.ts` to use the same fallback path semantics as manifest evidence, including `%APPDATA%/gcloud/application_default_credentials.json` on Windows, and add a transport/runtime test for the APPDATA fallback.
- Confidence: high

## Reviewed

- Diff: `5a631e1ee9faf049c2bcc194f5240f2a30d21eb4..3bd6b54f0b3a3971b12bd63799fe4fd9b879b323`
- Changed files: `docs/plugins/manifest.md`, `extensions/google/openclaw.plugin.json`, `src/agents/model-auth-env.ts`, `src/agents/model-auth.profiles.test.ts`, `src/plugins/manifest.ts`
- Code read: manifest normalization, provider env evidence resolution, model auth resolution, Google Vertex ADC runtime, Google provider registration, Google transport header path, adjacent tests and auth docs
- Dependencies/web: no dependency files changed; no web lookup needed

## Tests / Live Checks

- `pnpm install` because `node_modules` was missing
- `pnpm test src/agents/model-auth.profiles.test.ts` passed: 48 tests
- `pnpm test extensions/google/transport-stream.test.ts` passed: 19 tests
- `pnpm exec oxfmt --check --threads=1 ...` passed for all 5 changed files
- Focused smoke confirmed mismatch: APPDATA-only ADC returned Google Vertex env evidence, while `hasGoogleVertexAuthorizedUserAdcSync(env)` returned `false`

## Limitations

- Did not run the broad changed gate; review stayed focused on the touched auth/manifest paths.
```
