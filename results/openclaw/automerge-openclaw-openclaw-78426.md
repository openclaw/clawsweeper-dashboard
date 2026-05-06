---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-78426"
mode: "autonomous"
run_id: "25431450671"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25431450671"
head_sha: "1f9fcbc5089921a390e47d48f49e4f2a9b77e6d4"
workflow_conclusion: "failure"
result_status: "planned"
published_at: "2026-05-06T11:11:20.484Z"
canonical: "https://github.com/openclaw/openclaw/pull/78426"
canonical_issue: "https://github.com/openclaw/openclaw/issues/77814"
canonical_pr: "https://github.com/openclaw/openclaw/pull/78426"
actions_total: 3
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 0
apply_skipped: 0
needs_human_count: 0
---

# automerge-openclaw-openclaw-78426

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25431450671](https://github.com/openclaw/clawsweeper/actions/runs/25431450671)

Workflow conclusion: failure

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/pull/78426

## Summary

PR #78426 is the canonical repair path for issue #77814, but it is not merge-ready. The same-repo contributor branch is writable, the diff is small, and the actionable blocker is repairable in place: add after-fix real behavior proof to the PR body, investigate/rerun the failed relevant checks, run changed-surface validation, then request a fresh ClawSweeper review for the exact repaired head.

## Impact

| Metric | Count |
| --- | ---: |
| Worker actions | 3 |
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
| #78426 | fix_needed | planned | canonical | The canonical PR is useful and branch-writable, but ClawSweeper review and CI proof gates are not clean; repair should update the contributor branch/PR body rather than replace it. |
| #77814 | keep_related | planned | fixed_by_candidate | Keep the issue open while the canonical PR is repaired and validated; no closeout is allowed in this job. |
| cluster:automerge-openclaw-openclaw-78426 | build_fix_artifact | planned |  | A bounded repair artifact is needed; merge and close are explicitly blocked by job policy. |

## Needs Human

- none
