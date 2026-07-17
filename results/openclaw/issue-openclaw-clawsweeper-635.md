---
repo: "openclaw/clawsweeper"
cluster_id: "issue-openclaw-clawsweeper-635"
mode: "autonomous"
run_id: "29550853901"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/29550853901"
head_sha: "5e590dc160047e4f8cf1182bbc988f9ed15ad010"
workflow_conclusion: "failure"
result_status: "planned"
published_at: "2026-07-17T02:55:58.102Z"
canonical: "https://github.com/openclaw/clawsweeper/issues/635"
canonical_issue: "https://github.com/openclaw/clawsweeper/issues/635"
canonical_pr: null
actions_total: 4
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 0
apply_skipped: 0
needs_human_count: 0
---

# issue-openclaw-clawsweeper-635

Repo: openclaw/clawsweeper

Run: [https://github.com/openclaw/clawsweeper/actions/runs/29550853901](https://github.com/openclaw/clawsweeper/actions/runs/29550853901)

Workflow conclusion: failure

Worker result: planned

Canonical: https://github.com/openclaw/clawsweeper/issues/635

## Summary

Issue #635 remains reproducible on main SHA 5e590dc160047e4f8cf1182bbc988f9ed15ad010. The publisher throws when apply-decisions returns an exact-item outcome without durable-sync, terminal, guarded-open, or source-drift proof, before the existing current-tuple deferred-routing path can complete the artifact. Plan a narrow fix and focused regression coverage; do not close or merge.

## Impact

| Metric | Count |
| --- | ---: |
| Worker actions | 4 |
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
| #100 | keep_closed | skipped | independent | Closed historical context with no shared root cause. |
| #634 | keep_closed | skipped | related | Adjacent merged fix, not a candidate implementation for the remaining root cause. |
| #635 | fix_needed | planned | canonical | A narrow code fix can distinguish a missing/mismatched apply report from a known exact-item nonterminal outcome, allowing only the latter to publish its current tuple and use the existing deferred router instead of becoming a retryable publisher failure. |
| cluster:issue-openclaw-clawsweeper-635 | build_fix_artifact | planned |  | No viable open implementation PR exists, and the remaining bug has a narrow repair surface. |

## Needs Human

- none
