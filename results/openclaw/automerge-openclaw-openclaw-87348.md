---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-87348"
mode: "autonomous"
run_id: "26594972523"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/26594972523"
head_sha: "8db024ba0503b6c8368d0b699367e0f321d740b1"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-28T19:24:19.704Z"
canonical: "https://github.com/openclaw/openclaw/pull/87423"
canonical_issue: "https://github.com/openclaw/openclaw/issues/86871"
canonical_pr: "https://github.com/openclaw/openclaw/pull/87423"
actions_total: 4
fix_executed: 0
fix_failed: 1
fix_blocked: 0
apply_executed: 0
apply_blocked: 1
apply_skipped: 0
needs_human_count: 0
---

# automerge-openclaw-openclaw-87348

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/26594972523](https://github.com/openclaw/clawsweeper/actions/runs/26594972523)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/pull/87423

## Summary

Canonical repair path is open PR #87423, the writable ClawSweeper replacement for closed source PR #87348. Current main at e8f29087ae5b5580b07e3120ebb68263fc3d8ea2 still has the three unforced TUI final-event requestRender() calls, and #87423 is narrow but not merge-ready in this job because merge is disallowed and the hydrated PR still shows failing relevant checks/unstable state. Emit a repair artifact for the existing writable branch; do not close or merge anything.

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
| repair_contributor_branch | failed |  |  | source PR #87348 is closed |
| open_fix_pr | opened | https://github.com/openclaw/openclaw/pull/87423 | clawsweeper/automerge-openclaw-openclaw-87348 |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #87423 | merge_canonical | blocked | fix_pr | job does not allow merge |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #86871 | keep_canonical | planned | canonical | Canonical issue remains open and is covered by candidate PR #87423, but closure is blocked until the fix lands and this job forbids close actions. |
| #87348 | keep_closed | skipped | superseded | Already closed source PR, superseded by hydrated replacement PR #87423. |
| #87423 | fix_needed | planned | canonical | Repair the existing writable replacement PR branch, address failing relevant checks and any still-actionable conflict signal, then rerun review/validation. Merge is explicitly disallowed in this job. |
| cluster:automerge-openclaw-openclaw-87348 | build_fix_artifact | planned |  | A narrow fix artifact is needed so the executor can make #87423 merge-ready without mutating GitHub from this worker. |

## Needs Human

- none
