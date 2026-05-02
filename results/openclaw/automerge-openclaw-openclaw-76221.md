---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-76221"
mode: "autonomous"
run_id: "25259904862"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25259904862"
head_sha: "08cd9dbda14b57deec64cf4cefce1b0844246d4e"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-02T19:57:09.091Z"
canonical: "https://github.com/openclaw/openclaw/pull/76221"
canonical_issue: null
canonical_pr: "https://github.com/openclaw/openclaw/pull/76221"
actions_total: 4
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 1
apply_skipped: 0
needs_human_count: 0
---

# automerge-openclaw-openclaw-76221

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25259904862](https://github.com/openclaw/clawsweeper/actions/runs/25259904862)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/pull/76221

## Summary

#76221 is the adopted ClawSweeper automerge canonical PR, but it is not merge-ready. The branch is same-repo and writable, and the hydrated artifact contains a reproducible ClawSweeper review blocker in `extensions/anthropic-vertex/stream-runtime.ts`, so the safe path is an in-place branch repair plus re-review. Linked #43356 and #60888 are already merged/closed context only.

## Impact

| Metric | Count |
| --- | ---: |
| Worker actions | 4 |
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
| repair_contributor_branch | pushed | https://github.com/openclaw/openclaw/pull/76221 |  |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #76221 | merge_canonical | blocked | fix_pr | job does not allow merge |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #43356 | keep_closed | skipped | related | Already closed historical context; no mutation is valid. |
| #60888 | keep_closed | skipped | related | Already closed related context; no mutation is valid. |
| #76221 | fix_needed | planned | canonical | Canonical PR is useful and branch-writable, but ClawSweeper review and relevant checks block merge; emit an in-place repair artifact. |
| cluster:automerge-openclaw-openclaw-76221 | build_fix_artifact | planned |  | Executable in-place repair plan for the canonical PR. |

## Needs Human

- none
