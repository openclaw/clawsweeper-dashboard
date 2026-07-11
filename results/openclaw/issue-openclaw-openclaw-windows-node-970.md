---
repo: "openclaw/openclaw-windows-node"
cluster_id: "issue-openclaw-openclaw-windows-node-970"
mode: "autonomous"
run_id: "29170688119"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/29170688119"
head_sha: "7b2b88c900c1f4cf5b82aa1ff2f2e3de8b498cc8"
workflow_conclusion: "failure"
result_status: "planned"
published_at: "2026-07-11T22:37:31.012Z"
canonical: "https://github.com/openclaw/openclaw-windows-node/issues/970"
canonical_issue: "https://github.com/openclaw/openclaw-windows-node/issues/970"
canonical_pr: null
actions_total: 2
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 0
apply_skipped: 0
needs_human_count: 0
---

# issue-openclaw-openclaw-windows-node-970

Repo: openclaw/openclaw-windows-node

Run: [https://github.com/openclaw/clawsweeper/actions/runs/29170688119](https://github.com/openclaw/clawsweeper/actions/runs/29170688119)

Workflow conclusion: failure

Worker result: planned

Canonical: https://github.com/openclaw/openclaw-windows-node/issues/970

## Summary

Issue #970 remains valid on current main SHA 622c0e27c6b0473c57d087f595581cb9eb29c03b. Snapshot-driven renders reuse the FunctionalUI Border but create and attach a new native session ComboBox each time, which replaces an open picker during thinking/status updates. A narrow new fix PR should retain one ComboBox instance, reconcile its grouped items and selection without unnecessary mutations, and add focused identity/runtime coverage. This read-only worker could not modify the branch or run Windows-only validation and UI proof.

## Impact

| Metric | Count |
| --- | ---: |
| Worker actions | 2 |
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
| #970 | fix_needed | planned | canonical | The source-level reproduction is current and the implementation shape is narrow, but the read-only worker cannot create the locally validated branch required for the PR. |
| cluster:issue-openclaw-openclaw-windows-node-970 | build_fix_artifact | planned |  | Executor work is required to implement the narrow fix, run mandatory Windows validation, collect current-head UI proof, perform rubber-duck review, and open the PR. |

## Needs Human

- none
