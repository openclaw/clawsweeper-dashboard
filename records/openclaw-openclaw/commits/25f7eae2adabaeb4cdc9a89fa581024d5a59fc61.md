---
sha: 25f7eae2adabaeb4cdc9a89fa581024d5a59fc61
parent: 257383139f55733e97e9dc0a73b311adf4c13ea2
repository: openclaw/openclaw
author: "Steven Liekens"
committer: "Peter Steinberger"
github_author: sliekens
github_committer: steipete
co_authors: ["Mistral Vibe"]
commit_authored_at: "2026-05-05T23:33:29+02:00"
commit_committed_at: "2026-05-09T06:37:45-04:00"
result: nothing_found
confidence: high
highest_severity: none
check_conclusion: success
reviewed_at: 2026-05-09T10:43:56Z
---

# Commit 25f7eae

Nothing found.

## Details

- Do we have a high-confidence way to reproduce the issue? Not applicable; no actionable issue was found.
- Is this the best way to solve the issue? Not applicable; no fix is recommended.
- Note: the raw reviewed commit added `mistral-medium-3-5` without `reasoning: true`, but current `main` includes follow-up commit `8d70f7e90f` adding that flag. The current row matches OpenClaw’s Mistral reasoning tests and provider docs.

## Reviewed

- Diff: `257383139f55733e97e9dc0a73b311adf4c13ea2..25f7eae2adabaeb4cdc9a89fa581024d5a59fc61`
- Changed files: `extensions/mistral/openclaw.plugin.json`
- Code read: `extensions/mistral/openclaw.plugin.json`, `extensions/mistral/api.ts`, `extensions/mistral/api.test.ts`, `extensions/mistral/model-definitions.ts`, `extensions/mistral/model-definitions.test.ts`, `docs/providers/mistral.md`, `src/agents/model-catalog.types.ts`, `src/plugins/provider-thinking.ts`, `src/plugins/provider-thinking.types.ts`, `src/gateway/session-utils.test.ts`
- Dependencies/web: official Mistral docs list Mistral Medium 3.5 with 256k context and $1.5/$7.5 pricing, and Mistral’s adjustable reasoning docs list `mistral-medium-3-5` as supporting `reasoning_effort`. ([docs.mistral.ai](https://docs.mistral.ai/models/model-cards/mistral-medium-3-5-26-04?utm_source=openai))
- Commands: `pnpm docs:list`; `git show`; `git diff`; `jq`; `node -e JSON.parse(...)`; `pnpm install`; `pnpm test extensions/mistral/model-definitions.test.ts extensions/mistral/api.test.ts` passed 2 files / 15 tests

## Limitations

- No live Mistral API model-list call was run because `MISTRAL_API_KEY` was not present in the environment/profile.
