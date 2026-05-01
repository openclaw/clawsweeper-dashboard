---
sha: ccb8472daf1674e6bba4e7be2e0ba2e6bf120ca2
parent: 4eb30fc13a5b5269a87f216c40f7ce2dba1eac6a
repository: openclaw/openclaw
author: "Vyctor Huggo Przozwski da Silva"
committer: "GitHub"
github_author: vyctorbrzezowski
github_committer: web-flow
co_authors: ["Peter Steinberger"]
commit_authored_at: "2026-04-29T16:16:52-03:00"
commit_committed_at: "2026-04-29T20:16:52+01:00"
result: nothing_found
confidence: high
highest_severity: none
check_conclusion: success
reviewed_at: 2026-04-29T19:20:43Z
---

# Commit ccb8472

Nothing found.

## Reviewed

- Diff: `4eb30fc13a5b5269a87f216c40f7ce2dba1eac6a..ccb8472daf1674e6bba4e7be2e0ba2e6bf120ca2`
- Changed files: `CHANGELOG.md`, `src/agents/anthropic-transport-stream.ts`, `src/agents/anthropic-transport-stream.test.ts`
- Code read: full changed files; Anthropic stream parser, SSE client, subscriber text/thinking event handling, empty-turn fallback tests, QA Anthropic mock stream shape
- Dependencies/web: inspected locked `@anthropic-ai/sdk@0.91.1` source/types; SDK accumulator copies `content_block_start`, appends text/thinking deltas, and replaces `signature` on `signature_delta`. Inspected issue `#74410` and PR `#74557` with `gh`.
- Commands: `pnpm docs:list`; `pnpm install --frozen-lockfile`; `pnpm test src/agents/anthropic-transport-stream.test.ts src/agents/pi-embedded-runner/run.incomplete-turn.test.ts -- --reporter=verbose` passed, 105 tests; `pnpm exec oxfmt --check --threads=1 src/agents/anthropic-transport-stream.ts src/agents/anthropic-transport-stream.test.ts CHANGELOG.md` passed; `git diff --check 4eb30fc13a5b5269a87f216c40f7ce2dba1eac6a..ccb8472daf1674e6bba4e7be2e0ba2e6bf120ca2` passed

## Limitations

- No live Anthropic or Meridian API call was run; the reviewed behavior is covered by the mocked SSE regression and the locked Anthropic SDK source contract.
