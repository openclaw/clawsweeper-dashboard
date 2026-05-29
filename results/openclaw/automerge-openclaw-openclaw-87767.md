---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-87767"
mode: "autonomous"
run_id: "26611929212"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/26611929212"
head_sha: "d37dcfb8395b95b1bfa0176108cb94116a0d1b78"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-29T01:42:36.353Z"
canonical: "https://github.com/openclaw/openclaw/pull/87810"
canonical_issue: null
canonical_pr: "https://github.com/openclaw/openclaw/pull/87810"
actions_total: 5
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 1
apply_skipped: 0
needs_human_count: 0
---

# automerge-openclaw-openclaw-87767

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/26611929212](https://github.com/openclaw/clawsweeper/actions/runs/26611929212)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/pull/87810

## Summary

The surviving canonical path is the open writable replacement PR #87810. Source PR #87767 is already closed as superseded, #86939 is already closed, and security-sensitive linked PR #87017 is routed out of repair scope. #87810 is not merge-ready for this worker because merge is blocked by job policy and the hydrated checks still show one failing relevant gate, so the next deterministic action is a focused repair pass on #87810.

## Impact

| Metric | Count |
| --- | ---: |
| Worker actions | 5 |
| Fix executed | 0 |
| Fix failed | 0 |
| Fix blocked | 0 |
| Applied executions | 0 |
| Apply blocked | 1 |
| Apply skipped | 0 |
| Needs human | 0 |

## Fix Execution Actions

| Action | Status | Target | Branch | Reason |
| --- | --- | --- | --- | --- |
| repair_contributor_branch | pushed | https://github.com/openclaw/openclaw/pull/87810 |  |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #87810 | merge_canonical | blocked | fix_pr | job does not allow merge |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #86939 | keep_closed | skipped | fixed_by_candidate | Historical closed issue; no mutation needed. |
| #87017 | route_security | planned | security_sensitive | Security-sensitive linked ref is quarantined to central OpenClaw security handling. |
| #87767 | keep_closed | skipped | superseded | Useful source PR was already superseded by the credited writable replacement. |
| #87810 | fix_needed | planned | canonical | Canonical replacement PR exists but needs a focused repair/validation pass before any later merge-capable applicator can act. |
| cluster:automerge-openclaw-openclaw-87767 | build_fix_artifact | planned |  | A narrow executable repair plan is needed for the open canonical PR. |

## Needs Human

- none
