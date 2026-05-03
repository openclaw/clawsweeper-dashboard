---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-73500"
mode: "autonomous"
run_id: "25266234668"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25266234668"
head_sha: "753ebcf63747a0daba7275759b90f41b4b3d3398"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-03T01:17:30.080Z"
canonical: "https://github.com/openclaw/openclaw/pull/76317"
canonical_issue: "https://github.com/openclaw/openclaw/issues/73381"
canonical_pr: "https://github.com/openclaw/openclaw/pull/76317"
actions_total: 4
fix_executed: 0
fix_failed: 1
fix_blocked: 0
apply_executed: 0
apply_blocked: 1
apply_skipped: 0
needs_human_count: 0
---

# automerge-openclaw-openclaw-73500

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25266234668](https://github.com/openclaw/clawsweeper/actions/runs/25266234668)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/pull/76317

## Summary

Hydrated state shows #73500 is already closed and superseded by writable same-repo replacement PR #76317. Current main at e8f13c625e3458e8d97fbc1441a23a8ed9e0a536 still has the over-broad gateway agent send-policy check before delivery intent is evaluated, while #76317 has a passing Codex review but failing exact-head checks. No close or merge action is allowed for this job; the correct next step is a repair artifact for #76317.

## Impact

| Metric | Count |
| --- | ---: |
| Worker actions | 4 |
| Fix executed | 0 |
| Fix failed | 1 |
| Fix blocked | 0 |
| Applied executions | 0 |
| Apply blocked | 1 |
| Apply skipped | 0 |
| Needs human | 0 |

## Fix Execution Actions

| Action | Status | Target | Branch | Reason |
| --- | --- | --- | --- | --- |
| repair_contributor_branch | failed |  |  | source PR #73500 is closed |
| open_fix_pr | opened | https://github.com/openclaw/openclaw/pull/76317 | clawsweeper/automerge-openclaw-openclaw-73500 |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #76317 | merge_canonical | blocked | fix_pr | job does not allow merge |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #73381 | keep_canonical | planned | canonical | Keep the issue open as the canonical user-facing bug while #76317 is repaired and validated. |
| #73500 | keep_closed | skipped | superseded | Already closed source PR, superseded by writable replacement #76317. |
| #76317 | fix_needed | planned | canonical | The replacement PR is the canonical repair path but is not merge-ready because exact-head CI has relevant failures. |
| cluster:automerge-openclaw-openclaw-73500 | build_fix_artifact | planned |  | Emit an executable repair plan for the writable canonical PR branch. |

## Needs Human

- none
