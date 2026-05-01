---
repo: openclaw/openclaw
cluster_id: clawsweeper-commit-openclaw-openclaw-dec5de8a2cda
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
target_branch: clawsweeper/clawsweeper-commit-openclaw-openclaw-dec5de8a2cda
source: clawsweeper_commit
commit_sha: dec5de8a2cdaa64a4ff7d5412cfeb3fd8e7448ae
clawsweeper_report_repo: openclaw/clawsweeper
clawsweeper_report_path: records/openclaw-openclaw/commits/dec5de8a2cdaa64a4ff7d5412cfeb3fd8e7448ae.md
---

# ClawSweeper commit finding repair

ClawSweeper Repair should create or update one implementation PR from `clawsweeper/clawsweeper-commit-openclaw-openclaw-dec5de8a2cda`
if the finding is still valid on latest `openclaw/openclaw@main`.

## Operator Prompt

Use the ClawSweeper commit report below as the source finding. Do not redo a
broad audit of the commit. Check latest `main`, verify the reported problem is
still present, and make the narrowest safe fix. If latest `main` already fixed
it, make no code changes and report that outcome.

Do not merge. Do not close issues. Do not handle security-sensitive findings in
this lane.

## Commit Finding

- Commit: https://github.com/openclaw/openclaw/commit/dec5de8a2cdaa64a4ff7d5412cfeb3fd8e7448ae
- Report: https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/commits/dec5de8a2cdaa64a4ff7d5412cfeb3fd8e7448ae.md
- Latest main at intake: d30b8dccfda391cd5b6eb9d2484676d4d07c1dae

## ClawSweeper Report

```md
---
sha: dec5de8a2cdaa64a4ff7d5412cfeb3fd8e7448ae
parent: 225620a9b3e9d6a232deeed50b9ba199e00df5a7
repository: openclaw/openclaw
author: "Shakker"
committer: "Shakker"
github_author: shakkernerd
github_committer: shakkernerd
co_authors: []
commit_authored_at: "2026-04-29T18:55:02+01:00"
commit_committed_at: "2026-04-30T00:13:12+01:00"
result: findings
confidence: high
highest_severity: low
check_conclusion: neutral
reviewed_at: 2026-04-29T23:18:43Z
---

# Commit dec5de8

## Summary

Found two low-severity compatibility gaps in the new Google Vertex ADC manifest evidence.

## Findings

### Low: Google Vertex ADC detection ignores `GOOGLE_CLOUD_PROJECT_ID`

- Kind: compatibility
- File: `extensions/google/openclaw.plugin.json`
- Line: 85
- Evidence: the new evidence requires one of `GOOGLE_CLOUD_PROJECT` or `GCLOUD_PROJECT`, but not `GOOGLE_CLOUD_PROJECT_ID`. A production resolver smoke with an ADC file, `GOOGLE_CLOUD_PROJECT_ID=vertex-project`, and `GOOGLE_CLOUD_LOCATION=us-central1` returned `null`. Nearby Vertex code already accepts `GOOGLE_CLOUD_PROJECT_ID` for project resolution in `extensions/anthropic-vertex/region.ts:37`.
- Impact: users with otherwise valid ADC setup using the project-id env alias will not be considered authenticated for `google-vertex`.
- Suggested fix: add `GOOGLE_CLOUD_PROJECT_ID` to `requiresAnyEnv`, and likely to the provider env metadata if setup/status surfaces should display it.
- Confidence: high

### Low: Default gcloud ADC fallback is Unix-only

- Kind: compatibility
- File: `extensions/google/openclaw.plugin.json`
- Line: 84
- Evidence: the manifest only falls back to `${HOME}/.config/gcloud/application_default_credentials.json`, and `src/agents/model-auth-env.ts:31` only expands `${HOME}`. Existing Anthropic Vertex ADC discovery has an explicit Windows `%APPDATA%/gcloud/application_default_credentials.json` path in `extensions/anthropic-vertex/region.ts:76`.
- Impact: Windows users who authenticated with `gcloud auth application-default login` but did not set `GOOGLE_APPLICATION_CREDENTIALS` will not get the new local auth evidence.
- Suggested fix: support platform/env-aware ADC defaults in the evidence resolver, or add a shared GCP ADC evidence helper used by both Google Vertex paths.
- Confidence: medium

## Reviewed

- Diff: `225620a9b3e9d6a232deeed50b9ba199e00df5a7..dec5de8a2cdaa64a4ff7d5412cfeb3fd8e7448ae`
- Changed files: `extensions/google/openclaw.plugin.json`, `src/agents/model-auth.profiles.test.ts`
- Code read: manifest parser, provider env/evidence resolver, model auth resolver, model-list auth index, Google provider metadata, Anthropic Vertex ADC handling, related docs.
- Dependencies/web: no dependency files changed; no web lookup needed.

## Tests / Live Checks

- Passed: `pnpm docs:list`
- Installed missing deps once with `pnpm install`, per repo instructions.
- Passed: `OPENCLAW_VITEST_MAX_WORKERS=1 pnpm test src/agents/model-auth.profiles.test.ts src/secrets/provider-env-vars.dynamic.test.ts src/plugins/manifest-registry.test.ts`
- Passed: JSON parse, targeted `oxfmt --check`, and `git diff --check`
- Passed smoke: `GOOGLE_CLOUD_API_KEY` resolves as `env: GOOGLE_CLOUD_API_KEY`
- Passed smoke: ADC file + `GOOGLE_CLOUD_PROJECT` + `GOOGLE_CLOUD_LOCATION` resolves as `gcloud adc`
- Failed smoke confirming finding: ADC file + `GOOGLE_CLOUD_PROJECT_ID` + `GOOGLE_CLOUD_LOCATION` resolves `null`

## Limitations

- No live Google Vertex network call.
- No Windows host available; Windows ADC fallback finding is based on code-path comparison.
```
