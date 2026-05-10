---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-80274"
mode: "autonomous"
run_id: "25629993116"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25629993116"
head_sha: "be33667638c8a7b275a39d1f1b7c6c50f49762c9"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-10T13:35:05.470Z"
canonical: "https://github.com/openclaw/openclaw/pull/80274"
canonical_issue: "https://github.com/openclaw/openclaw/issues/80129"
canonical_pr: "https://github.com/openclaw/openclaw/pull/80274"
actions_total: 3
fix_executed: 1
fix_failed: 0
fix_blocked: 1
apply_executed: 0
apply_blocked: 0
apply_skipped: 0
needs_human_count: 0
---

# automerge-openclaw-openclaw-80274

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25629993116](https://github.com/openclaw/clawsweeper/actions/runs/25629993116)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/pull/80274

## Summary

PR #80274 is the canonical repair path for issue #80129, but it is not merge-ready: the hydrated artifact shows it is draft, has a failing Real behavior proof check, and only has a started ClawSweeper review placeholder rather than a clean completed review. The source branch is same-repo and writable, so the next deterministic action should repair the contributor branch, preserve source credit, run focused auth-profile tests plus `pnpm check:changed`, and leave the PR open because close and merge are blocked by job policy.

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
| repair_contributor_branch | blocked | https://github.com/openclaw/openclaw/pull/80274 |  | source PR #80274 is paused by clawsweeper:human-review; refusing to mutate the PR branch |
| automerge_repair_outcome_comment | executed | #80274 |  |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| _None_ |  |  |  |  |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #80129 | keep_related | planned | fixed_by_candidate | Issue is covered by the canonical PR path, but fix-first and closure gates block closeout. |
| #80274 | fix_needed | planned | canonical | Canonical PR is useful and writable but needs the bounded ClawSweeper repair loop before it can be considered clean. |
| cluster:automerge-openclaw-openclaw-80274 | build_fix_artifact | planned |  | A cluster-scoped executable repair artifact is required for the deterministic executor. |

## Needs Human

- none
