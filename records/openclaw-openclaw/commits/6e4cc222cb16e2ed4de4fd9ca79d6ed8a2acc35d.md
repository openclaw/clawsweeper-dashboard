---
sha: 6e4cc222cb16e2ed4de4fd9ca79d6ed8a2acc35d
parent: 7d09ff89ee3a8a517bdac75d704d1770a3a2bf78
repository: openclaw/openclaw
author: "Peter Steinberger"
committer: "Peter Steinberger"
github_author: steipete
github_committer: steipete
co_authors: []
commit_authored_at: "2026-05-16T20:22:03+01:00"
commit_committed_at: "2026-05-16T20:25:07+01:00"
result: findings
confidence: high
highest_severity: medium
check_conclusion: neutral
reviewed_at: 2026-05-16T19:43:57Z
---

# Commit 6e4cc22

## Summary

Found one incomplete xAI catalog refresh issue: the chat picker now removes retired Grok 4.1 Fast slugs, but the XAI tool defaults and setup choices still send those retired models.

## Findings

### Medium: x_search still defaults to a retired xAI model

- Kind: regression
- File: `extensions/xai/src/x-search-shared.ts`
- Line: 15
- Evidence: The commit explicitly prunes retired Grok 4.1 Fast models from the selectable chat catalog in `extensions/xai/model-definitions.ts:193` and documents that Grok 4.1 Fast slugs are retired in `docs/providers/xai.md:61`. However, `XAI_DEFAULT_X_SEARCH_MODEL` remains `grok-4-1-fast-non-reasoning` in `extensions/xai/src/x-search-shared.ts:15`, setup still offers `grok-4-1-fast` in `extensions/xai/src/web-search-provider.runtime.ts:41`, and docs still show `grok-4-1-fast` defaults for x_search/code execution in `docs/providers/xai.md:351` and `docs/providers/xai.md:388`. xAI’s May 15 retirement page says `grok-4-1-fast-non-reasoning` and related Fast models are retired and “will no longer work,” with `grok-4.20-non-reasoning` recommended for non-reasoning workloads. ([docs.x.ai](https://docs.x.ai/developers/migration/may-15-retirement?utm_source=openai))
- Impact: Fresh x_search setup can continue writing and sending a model id the upstream API says is retired, so the default x_search path can fail for users even though the refreshed chat picker no longer exposes that model family.
- Suggested fix: Move XAI tool defaults and setup options to supported current replacements, for example `grok-4.20-beta-latest-non-reasoning` for x_search non-reasoning and `grok-4.3` where reasoning/code behavior is desired; keep old ids only as explicit legacy config compatibility.
- Confidence: high

## Details

- Do we have a high-confidence way to reproduce the issue? yes: `extensions/xai/x-search.test.ts` currently asserts the outgoing x_search request body uses `grok-4-1-fast-non-reasoning`, and xAI’s retirement docs state that exact upstream model is retired/no longer works.
- Is this the best way to solve the issue? yes: the commit’s catalog migration is correct for chat pickers, but the same migration needs to cover XAI-owned tool defaults and docs while preserving explicit legacy configs.

## Reviewed

- Diff: `7d09ff89ee3a8a517bdac75d704d1770a3a2bf78..6e4cc222cb16e2ed4de4fd9ca79d6ed8a2acc35d`
- Changed files: `CHANGELOG.md`, `docs/providers/xai.md`, `extensions/xai/model-definitions.ts`, `extensions/xai/onboard.test.ts`, `extensions/xai/onboard.ts`, `extensions/xai/provider-models.ts`, `extensions/xai/web-search.test.ts`, `extensions/xai/xai-oauth.test.ts`, `src/plugin-sdk/provider-auth-runtime.test.ts`, `src/plugin-sdk/provider-auth-runtime.ts`
- Code read: changed files plus `extensions/xai/index.ts`, `extensions/xai/provider-catalog.ts`, `extensions/xai/provider-policy-api.ts`, `extensions/xai/src/x-search-shared.ts`, `extensions/xai/src/code-execution-shared.ts`, `extensions/xai/src/web-search-shared.ts`, `extensions/xai/src/web-search-provider.runtime.ts`, `src/plugin-sdk/provider-onboard.ts`, and XAI stream/auth call paths.
- Dependencies/web: official xAI model retirement and Grok 4.3 model docs. ([docs.x.ai](https://docs.x.ai/developers/migration/may-15-retirement?utm_source=openai))

## Tests / Live Checks

- `pnpm install`: succeeded; deps were initially missing.
- `node scripts/run-vitest.mjs extensions/xai/onboard.test.ts extensions/xai/web-search.test.ts extensions/xai/xai-oauth.test.ts src/plugin-sdk/provider-auth-runtime.test.ts`: passed, 49 tests.
- `node scripts/run-vitest.mjs extensions/xai/x-search.test.ts extensions/xai/code-execution.test.ts`: passed, 21 tests.
- `git diff --check 7d09ff89ee3a8a517bdac75d704d1770a3a2bf78..6e4cc222cb16e2ed4de4fd9ca79d6ed8a2acc35d`: passed.

## Limitations

- No live xAI API request was run; the default request model is proven locally, and upstream retirement behavior is based on official xAI docs.
- The strongest runtime proof is for x_search’s exact `grok-4-1-fast-non-reasoning` default. Code execution and web_search also retain Grok 4.1 Fast defaults, but those use OpenClaw’s bare `grok-4-1-fast` alias and were not live-verified against xAI.
