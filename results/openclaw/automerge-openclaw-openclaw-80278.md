---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-80278"
mode: "autonomous"
run_id: "25630064913"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25630064913"
head_sha: "be33667638c8a7b275a39d1f1b7c6c50f49762c9"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-10T14:00:45.410Z"
canonical: "https://github.com/openclaw/openclaw/pull/80278"
canonical_issue: "https://github.com/openclaw/openclaw/issues/77857"
canonical_pr: "https://github.com/openclaw/openclaw/pull/80278"
actions_total: 3
fix_executed: 1
fix_failed: 0
fix_blocked: 1
apply_executed: 0
apply_blocked: 0
apply_skipped: 0
needs_human_count: 0
---

# automerge-openclaw-openclaw-80278

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25630064913](https://github.com/openclaw/clawsweeper/actions/runs/25630064913)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/pull/80278

## Summary

PR #80278 is the canonical repair path for #77857, but it is not merge-ready: the hydrated preflight shows it is draft, dirty, and has a failing Real behavior proof check. The branch is same-repo and writable, so ClawSweeper should repair the contributor branch instead of replacing it.

## Impact

| Metric | Count |
| --- | ---: |
| Worker actions | 3 |
| Fix executed | 1 |
| Fix failed | 0 |
| Fix blocked | 1 |
| Applied executions | 0 |
| Apply blocked | 0 |
| Apply skipped | 0 |
| Needs human | 0 |

## Fix Execution Actions

| Action | Status | Target | Branch | Reason |
| --- | --- | --- | --- | --- |
| repair_contributor_branch | blocked | https://github.com/openclaw/openclaw/pull/80278 |  | source PR #80278 is paused by clawsweeper:human-review; refusing to mutate the PR branch |
| automerge_repair_outcome_comment | executed | #80278 |  |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| _None_ |  |  |  |  |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #77857 | keep_related | planned | related | Keep the source issue open while #80278 is repaired; it is not a duplicate cleanup target. |
| #80278 | fix_needed | planned | canonical | Repair the existing contributor branch, address the failing proof/dirty state, rerun review and changed checks, and keep the PR open because merge is disabled. |
| cluster:automerge-openclaw-openclaw-80278 | build_fix_artifact | planned |  | Create an executable repair plan for the applicator to update #80278 without mutating GitHub directly. |

## Needs Human

- none
