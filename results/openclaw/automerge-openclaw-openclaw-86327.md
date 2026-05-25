---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-86327"
mode: "autonomous"
run_id: "26404091820"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/26404091820"
head_sha: "eef3e9ab6847da2b2c2979a3cfa5bc1aeae155ae"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-25T14:38:44.203Z"
canonical: "https://github.com/openclaw/openclaw/pull/86482"
canonical_issue: null
canonical_pr: "https://github.com/openclaw/openclaw/pull/86482"
actions_total: 3
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 1
apply_skipped: 0
needs_human_count: 0
---

# automerge-openclaw-openclaw-86327

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/26404091820](https://github.com/openclaw/clawsweeper/actions/runs/26404091820)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/pull/86482

## Summary

#86482 is the active writable replacement lane for the closed source PR #86327. It already contains the narrow QMD session stem guard, regression coverage, changelog plan, passing checks, and a passed ClawSweeper/Codex review, but GitHub reports the branch as dirty against current main, so the next action is a branch repair/rebase and re-review, not merge or close.

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
| repair_contributor_branch | pushed | https://github.com/openclaw/openclaw/pull/86482 |  |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #86482 | merge_canonical | blocked | fix_pr | job does not allow merge |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #86327 | keep_closed | skipped | superseded | Historical source PR only; keep as credited evidence for the active replacement path. |
| #86482 | fix_needed | planned | canonical | Repair the writable replacement PR by rebasing/resolving the dirty merge state, preserving the existing narrow fix and contributor credit, then rerun review and pnpm check:changed. |
| cluster:automerge-openclaw-openclaw-86327 | build_fix_artifact | planned |  | Produce an executable repair artifact for the ClawSweeper edit pass. |

## Needs Human

- none
