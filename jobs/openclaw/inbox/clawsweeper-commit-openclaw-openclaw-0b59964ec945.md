---
repo: openclaw/openclaw
cluster_id: clawsweeper-commit-openclaw-openclaw-0b59964ec945
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
target_branch: clawsweeper/clawsweeper-commit-openclaw-openclaw-0b59964ec945
source: clawsweeper_commit
commit_sha: 0b59964ec945adaf05d75d1b1a67d510f7208ffa
clawsweeper_report_repo: openclaw/clawsweeper
clawsweeper_report_path: records/openclaw-openclaw/commits/0b59964ec945adaf05d75d1b1a67d510f7208ffa.md
---

# ClawSweeper commit finding repair

ClawSweeper Repair should create or update one implementation PR from `clawsweeper/clawsweeper-commit-openclaw-openclaw-0b59964ec945`
if the finding is still valid on latest `openclaw/openclaw@main`.

## Operator Prompt

Use the ClawSweeper commit report below as the source finding. Do not redo a
broad audit of the commit. Check latest `main`, verify the reported problem is
still present, and make the narrowest safe fix. If latest `main` already fixed
it, make no code changes and report that outcome.

Do not merge. Do not close issues. Do not handle security-sensitive findings in
this lane.

## Commit Finding

- Commit: https://github.com/openclaw/openclaw/commit/0b59964ec945adaf05d75d1b1a67d510f7208ffa
- Report: https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/commits/0b59964ec945adaf05d75d1b1a67d510f7208ffa.md
- Latest main at intake: 70ddeef0e8cd9331d63b51eab9fdfdbdc80ceb29

## ClawSweeper Report

```md
---
sha: 0b59964ec945adaf05d75d1b1a67d510f7208ffa
parent: 601596bfe292739993c7c883fa173f2f6a97f79c
repository: openclaw/openclaw
author: "Peter Steinberger"
committer: "Peter Steinberger"
github_author: steipete
github_committer: steipete
co_authors: []
commit_authored_at: "2026-04-30T01:13:19+01:00"
commit_committed_at: "2026-04-30T01:13:25+01:00"
result: findings
confidence: high
highest_severity: medium
check_conclusion: neutral
reviewed_at: 2026-04-30T00:18:44Z
---

# Commit 0b59964

## Summary

Found two compatibility regressions in the new Google Vertex REST fallback. The intended `authorized_user` ADC path is covered by the new unit test, but the custom stream is selected based only on the presence of an authorized-user ADC file and does not preserve all `@google/genai` Vertex URL/model semantics.

## Findings

### Medium: Authorized-user ADC presence hijacks supported Vertex API-key auth

- Kind: regression
- File: `extensions/google/provider-registration.ts`
- Line: 60
- Evidence: `createStreamFn` switches every `model.api === "google-vertex"` run to `createGoogleVertexTransportStreamFn()` whenever `hasGoogleVertexAuthorizedUserAdcSync()` sees an authorized-user ADC file. That decision happens before the resolved runtime credential is known. Later, `buildGoogleVertexHeaders()` still accepts a real `GOOGLE_CLOUD_API_KEY`, but `buildGoogleVertexRequestUrl()` always requires project/location and always emits `/v1/projects/{project}/locations/{location}/publishers/google/models/{model}:streamGenerateContent`. The installed `@google/genai` 1.50.1 source intentionally treats Vertex API-key auth differently: when `clientOptions.apiKey` is set, `shouldPrependVertexProjectPath()` returns false, so project/location is not prepended.
- Impact: A user with a valid `GOOGLE_CLOUD_API_KEY` and an unrelated local `authorized_user` ADC file now gets the custom ADC REST transport instead of the SDK API-key path. If `GOOGLE_CLOUD_PROJECT` or `GOOGLE_CLOUD_LOCATION` is absent, the request fails locally before sending. Even when both are set, it uses a different project-scoped URL than the SDK’s API-key Vertex path.
- Suggested fix: Only use the custom Vertex REST stream when the resolved runtime credential is the ADC marker or absent because ADC is the intended auth source. If API-key auth is resolved, leave the SDK path in place or mirror the SDK’s API-key URL behavior.
- Confidence: high

### Low: Vertex fallback corrupts full resource or publisher-qualified model IDs

- Kind: compatibility
- File: `extensions/google/transport-stream.ts`
- Line: 256
- Evidence: `buildGoogleVertexRequestUrl()` always does `encodeURIComponent(model.id)` and appends it after `publishers/google/models/`. The installed `@google/genai` `tModel()` preserves `projects/...`, `publishers/...`, and `models/...` model IDs, and only prefixes bare IDs. OpenClaw’s model ref parser also preserves nested model IDs after the provider prefix.
- Impact: A configured model such as `google-vertex/projects/p/locations/global/publishers/google/models/gemini-...` or `google-vertex/publishers/google/models/gemini-...` worked with the SDK path but will now be sent as `.../publishers/google/models/projects%2Fp%2Flocations...`, producing an invalid Vertex request whenever the authorized-user ADC fallback is selected.
- Suggested fix: Add Vertex model-path normalization equivalent to the SDK’s `tModel()` behavior: preserve `projects/` paths, prefix `publishers/` paths with project/location only when needed, and only use `publishers/google/models/{id}` for bare model IDs.
- Confidence: high

## Reviewed

- Diff: `601596bfe292739993c7c883fa173f2f6a97f79c..0b59964ec945adaf05d75d1b1a67d510f7208ffa`
- Changed files: `CHANGELOG.md`, `extensions/google/provider-registration.ts`, `extensions/google/transport-stream.test.ts`, `extensions/google/transport-stream.ts`, `extensions/google/vertex-adc.ts`
- Code read: changed files in full; Google provider policy/registration paths; model auth marker/evidence paths; provider stream resolution; OpenClaw model-ref parsing; adjacent Anthropic Vertex ADC helpers
- Issue read: `https://github.com/openclaw/openclaw/issues/74628`
- Dependencies checked: local `@google/genai` 1.50.1 source and `google-auth-library` 10.6.2 source
- Docs read: `docs/providers/google.md`, `docs/concepts/model-providers.md`

## Tests / Live Checks

- `pnpm install`
- `pnpm test extensions/google/transport-stream.test.ts` passed: 19 tests
- `pnpm exec oxfmt --check --threads=1 CHANGELOG.md extensions/google/provider-registration.ts extensions/google/transport-stream.test.ts extensions/google/transport-stream.ts extensions/google/vertex-adc.ts` passed
- `git diff --check 601596bfe292739993c7c883fa173f2f6a97f79c..0b59964ec945adaf05d75d1b1a67d510f7208ffa -- ...` passed

## Limitations

- No live Google Vertex request was run; this environment does not provide usable Google Vertex credentials.
```
