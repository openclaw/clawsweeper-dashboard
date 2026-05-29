---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-83042"
mode: "autonomous"
run_id: "26631757169"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/26631757169"
head_sha: "beb50640445a7699b711ffaf8b27ca39a82c5b3c"
workflow_conclusion: "failure"
result_status: "planned"
published_at: "2026-05-29T11:04:04.981Z"
canonical: "https://github.com/openclaw/openclaw/pull/84814"
canonical_issue: "https://github.com/openclaw/openclaw/issues/48680"
canonical_pr: "https://github.com/openclaw/openclaw/pull/84814"
actions_total: 4
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 0
apply_skipped: 0
needs_human_count: 0
---

# automerge-openclaw-openclaw-83042

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/26631757169](https://github.com/openclaw/clawsweeper/actions/runs/26631757169)

Workflow conclusion: failure

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/pull/84814

## Summary

Canonical repair path is open PR #84814, the writable ClawSweeper replacement for closed source PR #83042. The PR is not merge-ready because it is dirty against main and has relevant failing checks, so this result emits a repair artifact only; no close or merge actions are planned.

## Impact

| Metric | Count |
| --- | ---: |
| Worker actions | 4 |
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
| #48680 | keep_canonical | planned | canonical | Keep the root issue open until the canonical repair PR lands and validation is green. |
| #83042 | keep_closed | skipped | superseded | Closed source PR is historical evidence only; repair continues in #84814. |
| #84814 | fix_needed | planned | canonical | Repair the writable replacement PR branch in place, then rerun focused validation and review. Merge is explicitly blocked for this worker. |
| cluster:automerge-openclaw-openclaw-83042 | build_fix_artifact | planned |  | Canonical PR exists but is not merge-ready; emit an executable repair artifact instead of merge or close actions. |

## Needs Human

- none
