---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-75423"
mode: "autonomous"
run_id: "25208996146"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25208996146"
head_sha: "4962a4bc359dc56af714ea5eba0849ed589bc335"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-01T09:34:08.298Z"
canonical: "https://github.com/openclaw/openclaw/pull/75423"
canonical_issue: null
canonical_pr: "https://github.com/openclaw/openclaw/pull/75423"
actions_total: 2
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 1
apply_skipped: 0
needs_human_count: 0
---

# automerge-openclaw-openclaw-75423

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25208996146](https://github.com/openclaw/clawsweeper/actions/runs/25208996146)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/pull/75423

## Summary

PR #75423 is the open canonical automerge candidate, but it is not merge-ready: the hydrated preflight shows failing relevant CI checks and unstable merge state on head dc3e9a97a2c655c0c054cddb5a64e7b6fc51dd10. The branch is same-repo writable, so the correct path is an in-place contributor-branch repair, not merge, close, or replacement.

## Impact

| Metric | Count |
| --- | ---: |
| Worker actions | 2 |
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
| repair_contributor_branch | pushed | https://github.com/openclaw/openclaw/pull/75423 |  |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #75423 | merge_canonical | blocked | fix_pr | job does not allow merge |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #75423 | fix_needed | planned | canonical | Canonical PR is useful and writable but has failing relevant checks, so the executor should repair the existing branch and rerun review/validation before automerge can continue. |
| cluster:automerge-openclaw-openclaw-75423 | build_fix_artifact | planned |  | A structured repair artifact is needed so the deterministic executor can fetch/update the writable source branch, fix the failing checks, rerun Codex review, and validate changed surfaces. |

## Needs Human

- none
