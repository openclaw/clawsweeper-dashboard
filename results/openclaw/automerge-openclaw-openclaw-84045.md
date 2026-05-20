---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-84045"
mode: "autonomous"
run_id: "26134663564"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/26134663564"
head_sha: "12e9843e525d13b40695aa3b727180777571ca07"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-20T01:21:36.398Z"
canonical: "https://github.com/openclaw/openclaw/pull/84308"
canonical_issue: null
canonical_pr: "https://github.com/openclaw/openclaw/pull/84308"
actions_total: 3
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 1
apply_skipped: 0
needs_human_count: 0
---

# automerge-openclaw-openclaw-84045

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/26134663564](https://github.com/openclaw/clawsweeper/actions/runs/26134663564)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/pull/84308

## Summary

The original contributor PR #84045 is already closed after ClawSweeper opened the credited replacement #84308. The replacement PR is the canonical repair path, is same-repo/writable, and has a passing Codex review, but it is not merge-ready because the hydrated checks show build-artifacts failed; emit a repair artifact for #84308 and do not merge or close anything in this worker.

## Impact

| Metric | Count |
| --- | ---: |
| Worker actions | 3 |
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
| repair_contributor_branch | pushed | https://github.com/openclaw/openclaw/pull/84308 |  |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #84308 | merge_canonical | blocked | fix_pr | job does not allow merge |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #84045 | keep_closed | skipped | superseded | Already-closed source PR is historical evidence only; keep it closed and continue the repair path in #84308. |
| #84308 | fix_needed | planned | canonical | Canonical replacement PR is useful and writable but not merge-ready due the failing build-artifacts gate. |
| cluster:automerge-openclaw-openclaw-84045 | build_fix_artifact | planned |  | Emit an executable repair artifact for the open canonical PR branch. |

## Needs Human

- none
