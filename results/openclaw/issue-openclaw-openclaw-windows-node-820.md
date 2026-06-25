---
repo: "openclaw/openclaw-windows-node"
cluster_id: "issue-openclaw-openclaw-windows-node-820"
mode: "autonomous"
run_id: "28151879982"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/28151879982"
head_sha: "323f7bdf7236983896641b148e1ea9164f7ba917"
workflow_conclusion: "failure"
result_status: "blocked"
published_at: "2026-06-25T06:45:18.109Z"
canonical: "https://github.com/openclaw/openclaw-windows-node/issues/820"
canonical_issue: "https://github.com/openclaw/openclaw-windows-node/issues/820"
canonical_pr: null
actions_total: 5
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 0
apply_skipped: 0
needs_human_count: 0
---

# issue-openclaw-openclaw-windows-node-820

Repo: openclaw/openclaw-windows-node

Run: [https://github.com/openclaw/clawsweeper/actions/runs/28151879982](https://github.com/openclaw/clawsweeper/actions/runs/28151879982)

Workflow conclusion: failure

Worker result: blocked

Canonical: https://github.com/openclaw/openclaw-windows-node/issues/820

## Summary

Issue #820 is canonical and still valid on main 4e7982bafb86f438f9f38346ac3e36fdefa91cac. A narrow fix PR is appropriate, but this worker checkout is read-only, so no local patch, validation run, branch update, or PR creation could be completed in this run. Emitting a cluster-scoped fix artifact for the applicator.

## Impact

| Metric | Count |
| --- | ---: |
| Worker actions | 5 |
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
| #820 | fix_needed | planned | canonical | A focused implementation is needed to bridge eligible tray toasts into AppNotificationService while preserving existing toast behavior. |
| #611 | keep_closed | skipped | related | Closed context refs are evidence only and must not receive closure actions. |
| #748 | keep_closed | skipped | related | Closed context refs are evidence only and must not receive closure actions. |
| cluster:issue-openclaw-openclaw-windows-node-820 | build_fix_artifact | planned |  |  |
| cluster:issue-openclaw-openclaw-windows-node-820 | open_fix_pr | blocked |  | Implementation and PR creation require a writable checkout and validation-capable environment. |

## Needs Human

- none
