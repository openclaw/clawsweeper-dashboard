---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-76021"
mode: "autonomous"
run_id: "25262025645"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25262025645"
head_sha: "08cd9dbda14b57deec64cf4cefce1b0844246d4e"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-02T21:43:17.673Z"
canonical: "https://github.com/openclaw/openclaw/pull/76021"
canonical_issue: "https://github.com/openclaw/openclaw/issues/47311"
canonical_pr: "https://github.com/openclaw/openclaw/pull/76021"
actions_total: 3
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 1
apply_skipped: 0
needs_human_count: 0
---

# automerge-openclaw-openclaw-76021

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25262025645](https://github.com/openclaw/clawsweeper/actions/runs/25262025645)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/pull/76021

## Summary

#76021 is the canonical repair path for #47311, but it is not merge-ready in the hydrated preflight state because the exact head has an unstable merge state, one failing check shard, one pending check shard, and an earlier Codex inline finding that the repair pass should verify as addressed. Close and merge are blocked by job policy, so the only planned mutation path is a bounded repair of the writable same-repo PR branch.

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
| repair_contributor_branch | pushed | https://github.com/openclaw/openclaw/pull/76021 |  |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #76021 | merge_canonical | blocked | fix_pr | job does not allow merge |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #76021 | fix_needed | planned | canonical | Repair the canonical writable PR branch before automerge can proceed; do not replace it because the same-repo head branch is writable. |
| #47311 | keep_related | planned | fixed_by_candidate | The issue is covered by the canonical PR path but cannot be closed before the fix lands. |
| cluster:automerge-openclaw-openclaw-76021 | build_fix_artifact | planned |  | Executor should fetch and update the writable source PR branch, then rerun review and changed-surface validation. |

## Needs Human

- none
