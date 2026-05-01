---
repo: openclaw/openclaw
cluster_id: clawsweeper-commit-openclaw-openclaw-4cba08df01ea
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
target_branch: clawsweeper/clawsweeper-commit-openclaw-openclaw-4cba08df01ea
source: clawsweeper_commit
commit_sha: 4cba08df01ea6691d68046fb3f3297d152ae0219
clawsweeper_report_repo: openclaw/clawsweeper
clawsweeper_report_path: records/openclaw-openclaw/commits/4cba08df01ea6691d68046fb3f3297d152ae0219.md
---

# ClawSweeper commit finding repair

ClawSweeper Repair should create or update one implementation PR from `clawsweeper/clawsweeper-commit-openclaw-openclaw-4cba08df01ea`
if the finding is still valid on latest `openclaw/openclaw@main`.

## Operator Prompt

Use the ClawSweeper commit report below as the source finding. Do not redo a
broad audit of the commit. Check latest `main`, verify the reported problem is
still present, and make the narrowest safe fix. If latest `main` already fixed
it, make no code changes and report that outcome.

Do not merge. Do not close issues. Do not handle security-sensitive findings in
this lane.

## Commit Finding

- Commit: https://github.com/openclaw/openclaw/commit/4cba08df01ea6691d68046fb3f3297d152ae0219
- Report: https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/commits/4cba08df01ea6691d68046fb3f3297d152ae0219.md
- Latest main at intake: 4cba08df01ea6691d68046fb3f3297d152ae0219

## ClawSweeper Report

```md
---
sha: 4cba08df01ea6691d68046fb3f3297d152ae0219
parent: 426107d2f864ae7ef91ad11fa51ae094851eeebc
repository: openclaw/openclaw
author: "Marcus Castro"
committer: "GitHub"
github_author: mcaxtr
github_committer: web-flow
co_authors: []
commit_authored_at: "2026-04-29T20:03:58-03:00"
commit_committed_at: "2026-04-29T20:03:58-03:00"
result: findings
confidence: high
highest_severity: medium
check_conclusion: neutral
reviewed_at: 2026-04-29T23:10:17Z
---

# Commit 4cba08d

## Summary

Found one compatibility regression: configs that used the previously documented WhatsApp `exposeErrorText` key now fail validation instead of being ignored or migrated.

## Findings

### Medium: Removing `exposeErrorText` makes existing WhatsApp configs invalid

- Kind: compatibility
- File: `src/config/zod-schema.providers-whatsapp.ts`
- Line: 159
- Evidence: The commit removes `exposeErrorText` from the shared WhatsApp schema shape, while both `WhatsAppConfigSchema` and `WhatsAppAccountSchema` remain strict. The previous docs documented `channels.whatsapp.exposeErrorText` and per-account `channels.whatsapp.accounts.<id>.exposeErrorText`; the previous schema accepted it. Current read-time compatibility only applies doctor/runtime migrations before validation, but `extensions/whatsapp/doctor-contract-api.ts:8` still exports no legacy rules. A live schema probe confirmed `validateConfigObjectWithPlugins({ channels: { whatsapp: { exposeErrorText: false } } }, { pluginValidation: "skip" })` returns `ok: false` with `channels.whatsapp: Unrecognized key: "exposeErrorText"`, and `findLegacyConfigIssues` returns `[]` for root and account forms.
- Impact: Users who followed the old docs and set this key can have their config rejected after upgrading, blocking gateway startup or config validation before they can benefit from the new unconditional suppression behavior.
- Suggested fix: Keep the key accepted as deprecated/no-op for a removal window, or add a read/doctor compatibility migration that strips `channels.whatsapp.exposeErrorText` and `channels.whatsapp.accounts.*.exposeErrorText` before strict validation, with a clear legacy issue.
- Confidence: high

## Reviewed

- Diff: `426107d2f864ae7ef91ad11fa51ae094851eeebc..4cba08df01ea6691d68046fb3f3297d152ae0219`
- Changed files: WhatsApp runtime/config/docs/tests, generated channel metadata, config type/schema files, changelog
- Code read: `extensions/whatsapp/src/outbound-base.ts`, `extensions/whatsapp/src/auto-reply/monitor/inbound-dispatch.ts`, `extensions/whatsapp/src/accounts.ts`, `extensions/whatsapp/src/account-config.ts`, `extensions/whatsapp/doctor-contract-api.ts`, `src/config/io.ts`, `src/config/validation.ts`, `src/config/legacy.ts`, relevant tests and prior docs/schema via `git show`
- PR inspected: `#74642`

## Tests / Live Checks

- `pnpm install` after missing `node_modules`
- `pnpm test extensions/whatsapp/src/outbound-adapter.sendpayload.test.ts extensions/whatsapp/src/auto-reply/monitor/inbound-dispatch.test.ts extensions/whatsapp/src/config-schema.test.ts src/config/zod-schema.providers-whatsapp.test.ts` passed
- `pnpm config:docs:check && pnpm config:channels:check` passed
- `git diff --check 426107d2f864ae7ef91ad11fa51ae094851eeebc..4cba08df01ea6691d68046fb3f3297d152ae0219` passed
- Live schema probes confirmed the legacy key is rejected and no legacy issue is reported

## Dependency / Web Checks

- No dependency changes.
- No web lookup needed beyond `gh pr view 74642`.

## Limitations

- Did not run the full changed gate; focused tests and generated checks covered the touched WhatsApp/config surfaces.

https://github.com/openclaw/openclaw/pull/74642
```
