---
repo: "openclaw/openclaw-windows-node"
cluster_id: "issue-openclaw-openclaw-windows-node-954"
mode: "autonomous"
run_id: "29049607934"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/29049607934"
head_sha: "3709212459fa2278c93a8fd6396462646ddb2e80"
workflow_conclusion: "failure"
result_status: "planned"
published_at: "2026-07-09T20:59:40.119Z"
canonical: "https://github.com/openclaw/openclaw-windows-node/issues/954"
canonical_issue: "https://github.com/openclaw/openclaw-windows-node/issues/954"
canonical_pr: null
actions_total: 7
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 0
apply_skipped: 0
needs_human_count: 0
---

# issue-openclaw-openclaw-windows-node-954

Repo: openclaw/openclaw-windows-node

Run: [https://github.com/openclaw/clawsweeper/actions/runs/29049607934](https://github.com/openclaw/clawsweeper/actions/runs/29049607934)

Workflow conclusion: failure

Worker result: planned

Canonical: https://github.com/openclaw/openclaw-windows-node/issues/954

## Summary

Verified on current main c8cd9869d828ae9414917add4867aae21d9f517c that #954 remains valid: native chat has a private agent/slot-aware session title formatter, but SessionsPage still renders raw SessionInfo.DisplayName or Key for row names. No GitHub mutation, merge, close, local patch, or validation run was performed; this run emits a narrow fix artifact for the applicator/executor.

## Impact

| Metric | Count |
| --- | ---: |
| Worker actions | 7 |
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
| #954 | keep_canonical | planned | canonical |  |
| #952 | keep_related | planned | related |  |
| #950 | keep_closed | skipped | related |  |
| #951 | keep_closed | skipped | independent |  |
| cluster:issue-openclaw-openclaw-windows-node-954 | fix_needed | planned |  | A narrow new fix PR is needed because #954 is open, valid on current main, non-security-sensitive, and has no viable canonical PR. |
| cluster:issue-openclaw-openclaw-windows-node-954 | build_fix_artifact | planned |  |  |
| cluster:issue-openclaw-openclaw-windows-node-954 | open_fix_pr | blocked |  | Executor must apply the planned patch on a writable checkout, run required validation, then open or update the target branch PR. |

## Needs Human

- none
