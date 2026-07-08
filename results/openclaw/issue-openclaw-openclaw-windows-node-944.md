---
repo: "openclaw/openclaw-windows-node"
cluster_id: "issue-openclaw-openclaw-windows-node-944"
mode: "autonomous"
run_id: "28960259287"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/28960259287"
head_sha: "9b7281103ab54ecb97d8d66e5ddf4165ea8469fc"
workflow_conclusion: "failure"
result_status: "planned"
published_at: "2026-07-08T16:56:55.394Z"
canonical: "https://github.com/openclaw/openclaw-windows-node/issues/944"
canonical_issue: "https://github.com/openclaw/openclaw-windows-node/issues/944"
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

# issue-openclaw-openclaw-windows-node-944

Repo: openclaw/openclaw-windows-node

Run: [https://github.com/openclaw/clawsweeper/actions/runs/28960259287](https://github.com/openclaw/clawsweeper/actions/runs/28960259287)

Workflow conclusion: failure

Worker result: planned

Canonical: https://github.com/openclaw/openclaw-windows-node/issues/944

## Summary

Issue #944 remains a viable narrow native-chat session-state bug on current main. The hydrated issue is open, non-security, and includes reporter confirmation that reopened native chat selects a default session from the bottom of the list instead of the last user-selected session. No active implementation PR is present; #897 is already merged and unrelated. Plan a new narrow fix PR from `clawsweeper/issue-openclaw-openclaw-windows-node-944`.

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
| #944 | keep_canonical | planned | canonical | Canonical source issue for the implementation path. |
| #897 | keep_closed | skipped | independent | Already-closed unrelated context. |
| cluster:issue-openclaw-openclaw-windows-node-944 | fix_needed | planned |  | A new narrow fix PR is needed and permitted by the job. |
| cluster:issue-openclaw-openclaw-windows-node-944 | build_fix_artifact | planned |  | Prepare executable PR plan for the applicator/executor. |
| cluster:issue-openclaw-openclaw-windows-node-944 | open_fix_pr | planned |  | After applying and validating the narrow fix, open/update the requested ClawSweeper PR branch. |

## Needs Human

- none
