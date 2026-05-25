---
repo: "openclaw/clawsweeper"
cluster_id: "issue-openclaw-clawsweeper-191"
mode: "autonomous"
run_id: "26377610596"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/26377610596"
head_sha: "9b0b0b39173365a6d82cb4dbc59b21de3fd54270"
workflow_conclusion: "success"
result_status: "blocked"
published_at: "2026-05-25T00:55:50.992Z"
canonical: "https://github.com/openclaw/clawsweeper/issues/191"
canonical_issue: "https://github.com/openclaw/clawsweeper/issues/191"
canonical_pr: null
actions_total: 3
fix_executed: 0
fix_failed: 0
fix_blocked: 1
apply_executed: 0
apply_blocked: 0
apply_skipped: 0
needs_human_count: 0
---

# issue-openclaw-clawsweeper-191

Repo: openclaw/clawsweeper

Run: [https://github.com/openclaw/clawsweeper/actions/runs/26377610596](https://github.com/openclaw/clawsweeper/actions/runs/26377610596)

Workflow conclusion: success

Worker result: blocked

Canonical: https://github.com/openclaw/clawsweeper/issues/191

## Summary

Issue #191 is the canonical open request. Current main has OpenClaw PR surface file stats, but it does not have the requested schema-validated config-surface decision field, OpenClaw-only prompt/context guidance, or deterministic Config Surface rendering near the PR report stats. A narrow fix artifact is ready, but opening the implementation PR is blocked in this run because the checkout is read-only.

## Impact

| Metric | Count |
| --- | ---: |
| Worker actions | 3 |
| Fix executed | 0 |
| Fix failed | 0 |
| Fix blocked | 1 |
| Applied executions | 0 |
| Apply blocked | 0 |
| Apply skipped | 0 |
| Needs human | 0 |

## Fix Execution Actions

| Action | Status | Target | Branch | Reason |
| --- | --- | --- | --- | --- |
| execute_fix | blocked |  |  | fix artifact is too broad for autonomous execution; split into narrower jobs or explicitly set CLAWSWEEPER_ALLOW_BROAD_FIX_ARTIFACTS=1 |
| issue_implementation_status_comment | updated | #191 |  |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| _None_ |  |  |  |  |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #191 | fix_needed | planned | canonical | The request is still valid and narrow enough for one implementation PR; no viable canonical PR exists in the preflight artifact. |
| cluster:issue-openclaw-clawsweeper-191 | build_fix_artifact | planned |  | Fix PR creation is allowed by job frontmatter, and the issue is concrete enough for a narrow new_fix_pr artifact. |
| cluster:issue-openclaw-clawsweeper-191 | open_fix_pr | blocked |  | Implementation is blocked only by the read-only worker checkout; the fix artifact is ready for a writable executor lane to apply on clawsweeper/issue-openclaw-clawsweeper-191. |

## Needs Human

- none
