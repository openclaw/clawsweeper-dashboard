---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-76021"
mode: "autonomous"
run_id: "25262945998"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25262945998"
head_sha: "08cd9dbda14b57deec64cf4cefce1b0844246d4e"
workflow_conclusion: "failure"
result_status: "planned"
published_at: "2026-05-02T22:37:53.290Z"
canonical: "https://github.com/openclaw/openclaw/pull/76021"
canonical_issue: "https://github.com/openclaw/openclaw/issues/47311"
canonical_pr: "https://github.com/openclaw/openclaw/pull/76021"
actions_total: 3
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 0
apply_skipped: 0
needs_human_count: 0
---

# automerge-openclaw-openclaw-76021

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25262945998](https://github.com/openclaw/clawsweeper/actions/runs/25262945998)

Workflow conclusion: failure

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/pull/76021

## Summary

PR #76021 is the canonical repair path for issue #47311, but it is not merge-ready from the hydrated preflight state: the same-repo branch is writable, an actionable Codex review comment remains on ui/src/ui/app.ts, and exact-head CI has relevant failures. Emit a bounded contributor-branch repair artifact; do not merge or close because both actions are blocked by job policy.

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
| #76021 | fix_needed | planned | canonical | The PR is useful and writable, but exact-head CI and an actionable automated review finding require repair before any merge-capable applicator can proceed. |
| #47311 | keep_related | planned | fixed_by_candidate | The issue is covered by the canonical PR but cannot be closed before the repaired PR lands. |
| cluster:automerge-openclaw-openclaw-76021 | build_fix_artifact | planned |  | A narrow branch repair is available and allowed; no new replacement PR is needed. |

## Needs Human

- none
