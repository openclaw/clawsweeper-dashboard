---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-106789"
mode: "autonomous"
run_id: "29480379882"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/29480379882"
head_sha: "ea8931e1aaa59e96eec88e3f532bb290e426c5ef"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-07-16T07:40:43.911Z"
canonical: "#106789"
canonical_issue: null
canonical_pr: "https://github.com/openclaw/openclaw/pull/106789"
actions_total: 4
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 0
apply_skipped: 0
needs_human_count: 0
---

# automerge-openclaw-openclaw-106789

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/29480379882](https://github.com/openclaw/clawsweeper/actions/runs/29480379882)

Workflow conclusion: success

Worker result: planned

Canonical: #106789

## Summary

Keep the credited source PR #104485 closed, repair canonical PR #106789 in place, and keep #107991 as a separate related CI fix. Current main still hardcodes Blacksmith Testbox delegation, so #106789 remains necessary, but its writable branch currently conflicts with main and has failing exact-head type-check/CI gates. Direct merge and close actions are blocked by the job.

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
| https://github.com/openclaw/openclaw/pull/104485 | keep_closed | skipped | superseded | Historical source PR already superseded by the open canonical replacement #106789. |
| https://github.com/openclaw/openclaw/pull/106789 | fix_needed | planned | canonical | Resolve current-main conflicts and the exact-head type-check/CI failures on the adopted canonical branch, then rerun review and validation. |
| https://github.com/openclaw/openclaw/pull/106789 | build_fix_artifact | planned | canonical | Give the deterministic executor a bounded in-place conflict, type-check, review, and validation contract. |
| https://github.com/openclaw/openclaw/pull/107991 | keep_related | planned | related | Related CI context, but a distinct root cause and repair surface that must remain in its own cluster. |

## Needs Human

- none
