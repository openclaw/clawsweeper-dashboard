---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-75326"
mode: "autonomous"
run_id: "25198747424"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25198747424"
head_sha: "3ef57c79bce06296ec805a4766d76b90bb3416c4"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-01T02:16:13.917Z"
canonical: "https://github.com/openclaw/openclaw/pull/75326"
canonical_issue: null
canonical_pr: "https://github.com/openclaw/openclaw/pull/75326"
actions_total: 6
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 1
apply_skipped: 0
needs_human_count: 0
---

# automerge-openclaw-openclaw-75326

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25198747424](https://github.com/openclaw/clawsweeper/actions/runs/25198747424)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/pull/75326

## Summary

PR #75326 remains the canonical repair path, but it is not merge-ready because GitHub reports merge conflicts on head 90162fd2c9a318ef5a16fdf00e90b192ffbc31f1. The branch is a same-repo writable head, so the next deterministic action is to repair/rebase the contributor branch, preserve the existing credit, rerun review and changed-surface validation, and leave merge/close decisions to the gated applicator. Security-sensitive linked issue #72338 is quarantined only for central security handling; the other linked performance issues stay open as related broader regressions.

## Impact

| Metric | Count |
| --- | ---: |
| Worker actions | 6 |
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
| repair_contributor_branch | pushed | https://github.com/openclaw/openclaw/pull/75326 |  |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #75326 | merge_canonical | blocked | fix_pr | job does not allow merge |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #72338 | route_security | planned | security_sensitive | Security-sensitive issue is out of ClawSweeper Repair scope and must route to central OpenClaw security handling without mutation. |
| #74404 | keep_related | planned | related | Related surface, but not a true duplicate or fixed-by-candidate closeout for this narrow PR. |
| #75287 | keep_related | planned | related | Related performance family but distinct root cause and fix scope. |
| #75297 | keep_related | planned | related | Related broader regression remains open; #75326 is not sufficient closure proof. |
| #75326 | fix_needed | planned | canonical | Canonical PR is useful and writable but blocked by merge conflicts; repair the contributor branch instead of opening a replacement. |
| cluster:automerge-openclaw-openclaw-75326 | build_fix_artifact | planned |  | Executor needs an actionable repair artifact for the same writable PR branch. |

## Needs Human

- none
