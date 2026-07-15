---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-106789"
mode: "autonomous"
run_id: "29383075386"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/29383075386"
head_sha: "923797712890459a866dc7ec905320f34ce9c1c4"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-07-15T02:06:37.870Z"
canonical: "#106789"
canonical_issue: null
canonical_pr: "https://github.com/openclaw/openclaw/pull/106789"
actions_total: 3
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

Run: [https://github.com/openclaw/clawsweeper/actions/runs/29383075386](https://github.com/openclaw/clawsweeper/actions/runs/29383075386)

Workflow conclusion: success

Worker result: planned

Canonical: #106789

## Summary

Keep the credited source PR #104485 closed and repair canonical PR #106789 in place. Current main still has the hardcoded Blacksmith Testbox behavior, while #106789 is writable and narrowly addresses that behavior. Direct merge and close actions are blocked by the job; exact-head validation must resolve the failing OpenClawKit dead-code check and unknown mergeability first.

## Impact

| Metric | Count |
| --- | ---: |
| Worker actions | 3 |
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
| https://github.com/openclaw/openclaw/pull/104485 | keep_closed | skipped | superseded | Historical source PR already replaced by the open, writable canonical PR #106789. |
| https://github.com/openclaw/openclaw/pull/106789 | fix_needed | planned | canonical | Repair the adopted canonical branch against current main, preserve the reviewed provider-precedence behavior, and obtain clean exact-head validation. |
| https://github.com/openclaw/openclaw/pull/106789 | build_fix_artifact | planned | canonical | Provide the deterministic executor with a bounded in-place repair and validation contract. |

## Needs Human

- none
