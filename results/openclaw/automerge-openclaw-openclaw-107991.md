---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-107991"
mode: "autonomous"
run_id: "29517105802"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/29517105802"
head_sha: "4e6521dd9e0ef29ab7137250cdd7ad35ddf14c0e"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-07-16T16:58:04.726Z"
canonical: "https://github.com/openclaw/openclaw/pull/107991"
canonical_issue: null
canonical_pr: "https://github.com/openclaw/openclaw/pull/107991"
actions_total: 3
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 0
apply_skipped: 0
needs_human_count: 0
---

# automerge-openclaw-openclaw-107991

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/29517105802](https://github.com/openclaw/clawsweeper/actions/runs/29517105802)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/pull/107991

## Summary

Quarantine the security-sensitive historical PR #106090, keep unrelated Crabbox PR #106789 independent, and repair the writable canonical branch for #107991 before any merge decision because its hydrated exact-head CI still contains a failing compact test lane and failed CI gate.

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
| https://github.com/openclaw/openclaw/pull/106090 | route_security | planned | security_sensitive | This item is explicitly security-sensitive and outside ClawSweeper Repair's mutation scope. |
| https://github.com/openclaw/openclaw/pull/106789 | keep_independent | planned | independent | The PR belongs to a different implementation and failure surface and should remain outside this repair cluster. |
| https://github.com/openclaw/openclaw/pull/107991 | fix_needed | planned | canonical | Repair and refresh the contributor branch, inspect the exact failing compact lane, and make only a narrow relevant correction; merge remains blocked and requires a later exact-head passing verdict. |

## Needs Human

- none
