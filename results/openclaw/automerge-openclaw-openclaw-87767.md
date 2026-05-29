---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-87767"
mode: "autonomous"
run_id: "26615394871"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/26615394871"
head_sha: "558017d383b7eae02be713280ae75e24d0cb8bd2"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-29T03:32:19.571Z"
canonical: "https://github.com/openclaw/openclaw/pull/87810"
canonical_issue: null
canonical_pr: "https://github.com/openclaw/openclaw/pull/87810"
actions_total: 5
fix_executed: 0
fix_failed: 1
fix_blocked: 1
apply_executed: 0
apply_blocked: 0
apply_skipped: 0
needs_human_count: 0
---

# automerge-openclaw-openclaw-87767

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/26615394871](https://github.com/openclaw/clawsweeper/actions/runs/26615394871)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/pull/87810

## Summary

Classified the automerge cluster without mutating GitHub. The active canonical path is the open writable replacement PR #87810, which preserves #87767 contributor credit but still needs repair before any merge decision because current hydrated checks show check-lint and check-test-types failures plus pending jobs. #87017 is security-sensitive and routed out of ClawSweeper Repair scope; closed refs remain historical evidence only.

## Impact

| Metric | Count |
| --- | ---: |
| Worker actions | 5 |
| Fix executed | 0 |
| Fix failed | 1 |
| Fix blocked | 1 |
| Applied executions | 0 |
| Apply blocked | 0 |
| Apply skipped | 0 |
| Needs human | 0 |

## Fix Execution Actions

| Action | Status | Target | Branch | Reason |
| --- | --- | --- | --- | --- |
| repair_contributor_branch | failed |  |  | source PR #87767 is closed |
| execute_fix | blocked |  |  | Codex fix worker timed out after 1200000ms |
| automerge_repair_outcome_comment | updated | #87810 |  |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| _None_ |  |  |  |  |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #86939 | keep_closed | skipped | fixed_by_candidate | Already closed historical issue; no mutation planned. |
| #87017 | route_security | planned | security_sensitive | Security-sensitive hydrated ref is out of ClawSweeper Repair scope. |
| #87767 | keep_closed | skipped | superseded | Already superseded by the open replacement PR #87810. |
| #87810 | fix_needed | planned | canonical | Canonical PR exists and is writable, but failing and pending relevant checks block merge readiness. |
| cluster:automerge-openclaw-openclaw-87767 | build_fix_artifact | planned |  | Automerge repair needs an executable artifact for the writable canonical replacement branch. |

## Needs Human

- none
