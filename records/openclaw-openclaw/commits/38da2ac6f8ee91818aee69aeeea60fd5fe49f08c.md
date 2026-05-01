---
sha: 38da2ac6f8ee91818aee69aeeea60fd5fe49f08c
parent: 4b98f0952934c26a24a25fb5466920e6542ea61f
repository: openclaw/openclaw
author: "Vignesh"
committer: "GitHub"
github_author: vignesh07
github_committer: web-flow
co_authors: []
commit_authored_at: "2026-04-30T18:57:21-07:00"
commit_committed_at: "2026-05-01T01:57:21Z"
result: findings
confidence: medium
highest_severity: medium
check_conclusion: neutral
reviewed_at: 2026-05-01T02:16:15Z
---

# Commit 38da2ac

## Summary

Found one remaining model-routing bug in the commitment extractor batching path. The single-agent fix works, but mixed-agent batches can still run later agents' hidden extraction on the first queued agent's provider/model.

## Findings

### Medium: Mixed-agent commitment batches use the first agent's model for every item

- Kind: privacy
- File: `src/commitments/runtime.ts`
- Line: 214
- Evidence: `defaultExtractBatch` resolves one model from `first.agentId`, then calls `runEmbeddedPiAgent` once with all `params.items`. `drainCommitmentExtractionQueue` builds each batch from the global queue with `queue.splice(0, batchMaxItems)` and does not partition by agent, config, or resolved model. Current `main` still has the same behavior after the follow-up test refactor, now at `src/commitments/runtime.ts:226`.
- Impact: If two agents enqueue commitment extraction within the default 15s debounce window, the later agent's conversation text is included in a hidden extractor prompt sent through the first agent's configured provider/model. That can violate per-agent provider choices, for example a local-only or Anthropic-configured agent being extracted through another agent's OpenAI/Codex route, and it can also make an otherwise valid agent's extraction fail behind another agent's bad auth/model config.
- Suggested fix: Partition the queue before extraction by at least agent/config or by resolved provider/model, and run `defaultExtractBatch` separately per partition. The safest version is agent-scoped batches, because the prompt already contains raw recent user/assistant text.
- Confidence: medium

## Details

- Do we have a high-confidence way to reproduce the issue? Yes, statically: configure two agents with different `agents.list[].model` values, enable commitments, enqueue turns for both inside one debounce window, and `drainCommitmentExtractionQueue` will pass both items to one `runEmbeddedPiAgent` call using the first item’s `agentId`.
- Is this the best way to solve the issue? Yes. The extractor should not mix items whose model/provider routing differs; grouping before model resolution preserves the commit’s intended fix without changing the extractor prompt contract.

## Reviewed

- Diff: `4b98f0952934c26a24a25fb5466920e6542ea61f..38da2ac6f8ee91818aee69aeeea60fd5fe49f08c`
- Changed files: `CHANGELOG.md`, `src/commitments/runtime.ts`, `src/commitments/runtime.test.ts`
- Code read: `src/commitments/runtime.ts`, `src/commitments/runtime.test.ts`, `src/commitments/config.ts`, `src/commitments/extraction.ts`, `src/commitments/types.ts`, `src/auto-reply/reply/agent-runner.ts`, `src/agents/model-selection.ts`, `src/agents/agent-scope.ts`, `src/agents/pi-embedded-runner/run.ts`, `src/agents/defaults.ts`
- Docs read: `docs/concepts/commitments.md`, `docs/cli/commitments.md`, `docs/automation/index.md`, `docs/gateway/config-agents.md`
- PR/issue: inspected `#75347` and `#75334` with `gh`

## Tests / Live Checks

- `pnpm install` completed after missing `vitest/package.json`.
- `pnpm test src/commitments/runtime.test.ts` passed: 1 file, 6 tests.
- `pnpm exec oxfmt --check --threads=1 src/commitments/runtime.ts src/commitments/runtime.test.ts` passed.
- `git diff --check 4b98f0952934c26a24a25fb5466920e6542ea61f..38da2ac6f8ee91818aee69aeeea60fd5fe49f08c` passed.

## Dependency / Web Checks

- No dependency files changed.
- No external web lookup was needed; the issue is established from repository source, docs, and GitHub issue/PR metadata.

## Limitations

- I did not add or run a new regression test for the mixed-agent batch scenario because this was report-only review work.

https://github.com/openclaw/openclaw/commit/38da2ac6f8ee91818aee69aeeea60fd5fe49f08c
