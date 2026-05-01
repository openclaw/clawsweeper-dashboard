---
repo: openclaw/openclaw
cluster_id: clawsweeper-commit-openclaw-openclaw-3c9437ae547a
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
target_branch: clawsweeper/clawsweeper-commit-openclaw-openclaw-3c9437ae547a
source: clawsweeper_commit
commit_sha: 3c9437ae547acd2b26231dac30535e3d90fd7280
clawsweeper_report_repo: openclaw/clawsweeper
clawsweeper_report_path: records/openclaw-openclaw/commits/3c9437ae547acd2b26231dac30535e3d90fd7280.md
---

# ClawSweeper commit finding repair

ClawSweeper Repair should create or update one implementation PR from `clawsweeper/clawsweeper-commit-openclaw-openclaw-3c9437ae547a`
if the finding is still valid on latest `openclaw/openclaw@main`.

## Operator Prompt

Use the ClawSweeper commit report below as the source finding. Do not redo a
broad audit of the commit. Check latest `main`, verify the reported problem is
still present, and make the narrowest safe fix. If latest `main` already fixed
it, make no code changes and report that outcome.

Do not merge. Do not close issues. Do not handle security-sensitive findings in
this lane.

## Commit Finding

- Commit: https://github.com/openclaw/openclaw/commit/3c9437ae547acd2b26231dac30535e3d90fd7280
- Report: https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/commits/3c9437ae547acd2b26231dac30535e3d90fd7280.md
- Latest main at intake: e9d4cb2bb6dc15f8896b13b7e46ede199668c198

## ClawSweeper Report

```md
---
sha: 3c9437ae547acd2b26231dac30535e3d90fd7280
parent: 1ff1fbe6824b41f331a87361263ef69fbfbf7c25
repository: openclaw/openclaw
author: "clawsweeper[bot]"
committer: "GitHub"
github_author: clawsweeper[bot]
github_committer: web-flow
co_authors: ["openclaw-clawsweeper[bot]"]
commit_authored_at: "2026-04-29T22:34:59-07:00"
commit_committed_at: "2026-04-29T22:34:59-07:00"
result: findings
confidence: high
highest_severity: medium
check_conclusion: neutral
reviewed_at: 2026-04-30T05:56:53Z
---

# Commit 3c9437ae54

## Summary

Found one compatibility regression: the runtime fix works, but wrapping the exported WhatsApp schemas in `z.preprocess` changes the public Plugin SDK API surface and leaves the API baseline gate failing.

## Findings

### Medium: WhatsAppConfigSchema changed from an object schema to ZodPipe on a public SDK surface

- Kind: compatibility
- File: `src/config/zod-schema.providers-whatsapp.ts`
- Line: 227
- Evidence: This commit changes `WhatsAppAccountSchema` and `WhatsAppConfigSchema` from exported strict `z.object(...)` schemas into `z.preprocess(...)` wrappers at `src/config/zod-schema.providers-whatsapp.ts:156` and `src/config/zod-schema.providers-whatsapp.ts:227`. Those schemas are re-exported through `src/plugin-sdk/bundled-channel-config-schema.ts:34`, and the deprecated compatibility subpath re-exports that whole surface from `src/plugin-sdk/channel-config-schema-legacy.ts:10`. A live probe showed `WhatsAppConfigSchema` is now a `ZodPipe` and `typeof WhatsAppConfigSchema.extend` is `undefined`. `pnpm plugin-sdk:api:check` now fails with `Plugin SDK API baseline drift detected` for `docs/.generated/plugin-sdk-api-baseline.sha256`.
- Impact: Release/API checks fail on current `main`, and any bundled or compatibility-surface consumer that treated `WhatsAppConfigSchema` like the other exported bundled `ZodObject` config schemas can break at compile time or runtime when using object-specific methods such as `.extend`.
- Suggested fix: Preserve the public `WhatsAppConfigSchema`/`WhatsAppAccountSchema` object-schema shape and put the deprecated-key stripping in an internal validation/runtime wrapper, or explicitly accept the API break by updating the Plugin SDK API baseline and documenting the changed schema type.
- Confidence: high

## Details

- Do we have a high-confidence way to reproduce the issue? yes: run `pnpm plugin-sdk:api:check` on current `main`; it fails with Plugin SDK API baseline drift. A focused probe also confirms `WhatsAppConfigSchema` is now `ZodPipe` with no `.extend`.
- Is this the best way to solve the issue? no: the runtime compatibility behavior is correct, but changing the exported schema class leaks the implementation through a public SDK/compatibility surface.

## Reviewed

- Diff: `1ff1fbe6824b41f331a87361263ef69fbfbf7c25..3c9437ae547acd2b26231dac30535e3d90fd7280`
- Changed files: `src/config/zod-schema.providers-whatsapp.ts`, `src/config/zod-schema.providers-whatsapp.test.ts`
- Code read: WhatsApp schema and tests, current `main` touched files, base-version schema via `git show`, config validation path, bundled channel schema generation, Plugin SDK re-export surfaces, relevant WhatsApp docs.
- PR inspected: `#74667`

## Tests / Live Checks

- `pnpm test src/config/zod-schema.providers-whatsapp.test.ts extensions/whatsapp/src/config-schema.test.ts` passed.
- `pnpm config:channels:check` passed.
- `pnpm exec oxfmt --check --threads=1 src/config/zod-schema.providers-whatsapp.ts src/config/zod-schema.providers-whatsapp.test.ts` passed.
- `pnpm plugin-sdk:api:check` failed with API baseline drift.
- Live validation probe confirmed root/account `exposeErrorText` is accepted and stripped, unrelated unknown keys remain rejected, and the generated schema omits `exposeErrorText`.

## Dependency / Web Checks

- Inspected installed `zod` 4.3.6 source/tests for `preprocess`, `ZodPipe`, strict object JSON schema handling, and `toJSONSchema` pipe behavior.
- No external web lookup was needed.

## Limitations

- Did not run the full changed gate; focused schema/runtime checks and the failing Plugin SDK API check covered the touched surface.
```
