---
sha: ccf0b96a5635543a4c2e8dafefed1ac38db2faf9
parent: 6e14ef60cf8b69673e0c79b95c6cd244d224535e
repository: openclaw/openclaw
author: "Peter Steinberger"
committer: "Peter Steinberger"
github_author: steipete
github_committer: steipete
co_authors: []
commit_authored_at: "2026-05-10T10:01:01+01:00"
commit_committed_at: "2026-05-10T12:37:10+01:00"
result: findings
confidence: high
highest_severity: low
check_conclusion: neutral
reviewed_at: 2026-05-10T11:45:51Z
---

# Commit ccf0b96a56

## Summary

The runtime/source edits are JSDoc-only deprecation annotations, but the commit’s tracked Plugin SDK API baseline hash is stale for the commit contents. Current `main` has since repaired the API baseline, so this is commit-scoped rather than a current-head repair item.

## Findings

### Low: Plugin SDK API baseline hash does not match the commit source

- Kind: reliability
- File: `docs/.generated/plugin-sdk-api-baseline.sha256`
- Line: 1
- Evidence: In an exact temporary checkout of `ccf0b96a5635543a4c2e8dafefed1ac38db2faf9`, `pnpm plugin-sdk:api:check` fails with `Plugin SDK API baseline drift detected` for `docs/.generated/plugin-sdk-api-baseline.sha256`. Regenerating the baseline for that exact source produces `2ea4afb9... plugin-sdk-api-baseline.json` and `de86533e... plugin-sdk-api-baseline.jsonl`, but the commit records `a25794a9...` and `aeaee849...`.
- Impact: CI or local verification of this SHA fails even though the SDK deprecation annotations appear intentional.
- Suggested fix: For the commit source, rerun `pnpm plugin-sdk:api:gen` and commit the regenerated `docs/.generated/plugin-sdk-api-baseline.sha256`. Current `main` already passes `pnpm plugin-sdk:api:check`.
- Confidence: high

## Details

- Do we have a high-confidence way to reproduce the issue? yes: check out the reviewed SHA, install deps, and run `pnpm plugin-sdk:api:check`.
- Is this the best way to solve the issue? yes: the API baseline generator is the source of truth for this hash file; no runtime code change is indicated.

## Reviewed

- Diff: `6e14ef60cf8b69673e0c79b95c6cd244d224535e..ccf0b96a5635543a4c2e8dafefed1ac38db2faf9`
- Changed files: SDK/API baseline hash, SDK surface report budget, provider/helper JSDoc deprecation annotations under `src/agents`, `src/plugin-sdk`, and `src/plugins`.
- Code read: full diff, scoped AGENTS files, `scripts/plugin-sdk-surface-report.mjs`, `scripts/generate-plugin-sdk-api-baseline.ts`, `src/plugin-sdk/api-baseline.ts`, and current touched-path context.
- Dependencies/web: no external web lookup needed; deps installed locally with `pnpm install`.

## Tests / Live Checks

- `pnpm docs:list`: passed.
- `git diff --check 6e14ef60cf8b69673e0c79b95c6cd244d224535e..ccf0b96a5635543a4c2e8dafefed1ac38db2faf9`: passed.
- Exact commit `pnpm plugin-sdk:api:check`: failed with baseline drift.
- Exact commit `pnpm plugin-sdk:surface:check`: passed.
- Current `main` `pnpm plugin-sdk:api:check`: passed.

## Dependency / Web Checks

- Not applicable; no dependency, lockfile, package metadata, or external API behavior changed.

## Limitations

- Current `main` `pnpm plugin-sdk:surface:check` fails for later SDK surface changes, not this commit; I did not attribute that unrelated current-head failure to `ccf0b96a56`.
