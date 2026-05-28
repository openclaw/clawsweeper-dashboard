---
repo: "openclaw/openclaw"
cluster_id: "gitcrawl-2791-compaction-summarization-failure-creates-stuck-session-retry-loo"
mode: "autonomous"
run_id: "26567835784"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/26567835784"
head_sha: "ca8a8d4f30a243609adf112ca2b34ee63bceb83b"
workflow_conclusion: "success"
result_status: "needs_human"
published_at: "2026-05-28T10:05:04.672Z"
canonical: "https://github.com/openclaw/openclaw/issues/43661"
canonical_issue: "https://github.com/openclaw/openclaw/issues/43661"
canonical_pr: null
actions_total: 9
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 0
apply_skipped: 0
needs_human_count: 1
---

# gitcrawl-2791-compaction-summarization-failure-creates-stuck-session-retry-loo

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/26567835784](https://github.com/openclaw/clawsweeper/actions/runs/26567835784)

Workflow conclusion: success

Worker result: needs_human

Canonical: https://github.com/openclaw/openclaw/issues/43661

## Summary

Closed representative #42158 is obsolete. #43661 is the best open canonical for the remaining stuck-session compaction timeout family, but the surviving open reports are not safe to close or repair as one broad PR: they split timeout recovery, retry/token burn, loop guard, and generic fallback behavior, and the canonical issue already carries maintainer/product-decision labels.

## Impact

| Metric | Count |
| --- | ---: |
| Worker actions | 9 |
| Fix executed | 0 |
| Fix failed | 0 |
| Fix blocked | 0 |
| Applied executions | 0 |
| Apply blocked | 0 |
| Apply skipped | 0 |
| Needs human | 1 |

## Fix Execution Actions

| Action | Status | Target | Branch | Reason |
| --- | --- | --- | --- | --- |
| _None_ |  |  |  |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| _None_ |  |  |  |  |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #42158 | keep_closed | skipped | superseded | Already closed; do not mutate. |
| #43661 | keep_canonical | planned | canonical | Best surviving open canonical for the residual compaction timeout/stuck-session family. |
| #48238 | keep_related | planned | related | Related follow-up scope; keep open until the canonical fix path is narrowed. |
| #58838 | keep_related | planned | related | Related residual retry/cost issue; not safe to close as duplicate or fixed from the compacted evidence. |
| #64962 | keep_related | planned | related | Related timeout-escalation slice; likely near the current-main timeout recovery path but not proven closed. |
| #67750 | keep_related | planned | related | Related residual user-visible timeout/fallback issue; keep open for focused follow-up. |
| #48183 | keep_independent | planned | independent | Different component and root cause; leave out of this compaction cluster. |
| cluster:gitcrawl-2791-compaction-summarization-failure-creates-stuck-session-retry-loo | fix_needed | blocked | needs_human | A repair PR from this cluster would be broad and product-sensitive without maintainer selection of the exact remaining sub-scope. |
| cluster:gitcrawl-2791-compaction-summarization-failure-creates-stuck-session-retry-loo | build_fix_artifact | blocked | needs_human | Blocked on maintainer choosing one narrow repair slice or authorizing a broader product change. |

## Needs Human

- Choose the next canonical repair slice under #43661: loop-aware saturated-session guard, summarizer-unavailable retry/token burn, timeout-compaction escalation, or user-visible timeout fallback after successful compaction. The cluster is too broad for one safe autonomous repair PR.
