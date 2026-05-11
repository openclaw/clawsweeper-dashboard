---
sha: cc95d4dd28ebcf0bba542dbc3cf73625ed00cabc
parent: f447e5b9db3df84d74604007dd6d76482fe0110f
repository: openclaw/openclaw
author: "pashpashpash"
committer: "Peter Steinberger"
github_author: pashpashpash
github_committer: steipete
co_authors: []
commit_authored_at: "2026-05-10T20:09:40-07:00"
commit_committed_at: "2026-05-11T12:41:21+01:00"
result: nothing_found
confidence: high
highest_severity: none
check_conclusion: success
reviewed_at: 2026-05-11T12:02:30Z
---

# Commit cc95d4d

Nothing found.

## Details

- Do we have a high-confidence way to reproduce the issue? Not applicable; no actionable issue was found.
- Is this the best way to solve the issue? Not applicable; no fix is recommended.

## Reviewed

- Diff: `f447e5b9db3df84d74604007dd6d76482fe0110f..cc95d4dd28ebcf0bba542dbc3cf73625ed00cabc`
- Changed files: all 28 files in the diff, covering Codex harness auth bridging/run attempts, OpenAI Codex provider setup/manifest, auth profile ordering/usage/runtime-plan flow, embedded runner auth rotation, SDK exports, docs, and focused tests.
- Code read: `src/agents/auth-profiles/*`, `src/agents/pi-embedded-runner/run.ts`, `src/agents/runtime-plan/*`, `src/plugin-sdk/agent-runtime.ts`, `extensions/codex/src/app-server/*`, and `extensions/openai/*`.
- Current-main follow-ups reviewed: `3ae2799e28`, `e310824828`, `95cee42b5b`, `554d80c060`, `30ed0329cb`, `3f05165c47`, and `6ee0c9a696`; these address the main risky edges from the reviewed commit around auto candidates, auth ordering, state scoping, rate-limit candidates, and fallback blocking.
- Dependencies/web: no dependency manifest or lockfile changed; no external web lookup was needed.

## Commands

- `git diff --check f447e5b9db3df84d74604007dd6d76482fe0110f..cc95d4dd28ebcf0bba542dbc3cf73625ed00cabc` passed.
- `pnpm test src/agents/auth-profiles/order.test.ts src/agents/auth-profiles/usage.test.ts extensions/codex/src/app-server/auth-bridge.test.ts extensions/codex/src/app-server/run-attempt.test.ts extensions/openai/openai-codex-provider.test.ts extensions/openai/openclaw.plugin.test.ts src/agents/runtime-plan/build.test.ts src/agents/pi-embedded-runner.run-embedded-pi-agent.auth-profile-rotation.e2e.test.ts -- --reporter=verbose` had 121 passing tests and one timeout in a slow dynamic-tool exposure test.
- `OPENCLAW_VITEST_MAX_WORKERS=1 pnpm test extensions/codex/src/app-server/run-attempt.test.ts -- --reporter=verbose -t "does not expose OpenClaw Tool Search controls through Codex dynamic tools"` passed.
- `git status --short` was clean after review.

## Limitations

- No live OpenAI/Codex account run was performed; review relied on source tracing and focused simulated tests.
- The first combined targeted test command hit a timeout in one slow unrelated test; the isolated rerun passed.
