---
repo: "openclaw/openclaw"
cluster_id: "gitcrawl-59-memory-wiki-per-agent-vault-path-isolation-for-multi-tenant-depl"
mode: "autonomous"
run_id: "29568070623"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/29568070623"
head_sha: "0a77e4f25c2145c85e6a12fd9b0600b48d078633"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-07-17T09:01:29.184Z"
canonical: "https://github.com/openclaw/openclaw/pull/103349"
canonical_issue: null
canonical_pr: "https://github.com/openclaw/openclaw/pull/103349"
actions_total: 12
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 0
apply_skipped: 0
needs_human_count: 0
---

# gitcrawl-59-memory-wiki-per-agent-vault-path-isolation-for-multi-tenant-depl

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/29568070623](https://github.com/openclaw/clawsweeper/actions/runs/29568070623)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/pull/103349

## Summary

PR #103349 is the landed canonical fix for per-agent Memory Wiki vault isolation. Current main 68c4cb31d2f85ed3f10cf832b9b884c4da5bda58 contains agent-scoped vault resolution, agent-aware prompt/corpus plumbing, CLI --agent selection, isolation tests, and fail-closed handling for missing or unknown agent identity. The two open issues are related follow-ups with distinct remaining scope; the closed security-sensitive PR is quarantined without mutation.

## Impact

| Metric | Count |
| --- | ---: |
| Worker actions | 12 |
| Fix executed | 0 |
| Fix failed | 0 |
| Fix blocked | 0 |
| Applied executions | 0 |
| Apply blocked | 0 |
| Apply skipped | 0 |
| Needs human | 0 |

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
| #55401 | keep_related | planned | related | Broader plugin configuration architecture is related to the landed Memory Wiki fix but is not covered by it. |
| #61123 | keep_closed | skipped | independent | Closed historical context; no action is permitted or needed. |
| #63558 | keep_closed | skipped | independent | Separate UI root cause, already closed and fixed independently. |
| #63829 | keep_closed | skipped | fixed_by_candidate | Already closed after the canonical implementation landed; no further close action is valid. |
| #66003 | keep_closed | skipped | fixed_by_candidate | The landed PR replaces the obsolete closed issue as the canonical path. |
| #66134 | keep_closed | skipped | superseded | Useful historical groundwork, already closed and superseded by the landed complete implementation. |
| #66149 | keep_closed | skipped | superseded | Already closed; the landed agent-vault resolver is the safer canonical solution. |
| #67144 | keep_closed | skipped | independent | Unrelated merged PR; no cluster action. |
| #67584 | route_security | planned | security_sensitive | Quarantine this exact PR for central OpenClaw security handling without affecting classification of the non-security items. |
| #80352 | keep_related | planned | related | A distinct narrower prompt-inclusion policy remains after the canonical vault-isolation fix, so the issue should stay open. |
| #81205 | keep_closed | skipped | fixed_by_candidate | Already closed after the canonical CLI agent selector landed. |
| #103349 | keep_closed | skipped | canonical | This merged PR is the canonical implementation; it is already closed and requires no mutation. |

## Needs Human

- none
