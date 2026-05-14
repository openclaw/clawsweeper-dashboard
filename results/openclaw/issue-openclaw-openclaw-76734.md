---
repo: "openclaw/openclaw"
cluster_id: "issue-openclaw-openclaw-76734"
mode: "autonomous"
run_id: "25842208365"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25842208365"
head_sha: "1558af39eeca02b91e57ae98a885c7871229a8e8"
workflow_conclusion: "failure"
result_status: "planned"
published_at: "2026-05-14T04:58:05.347Z"
canonical: "https://github.com/openclaw/openclaw/pull/76744"
canonical_issue: "https://github.com/openclaw/openclaw/issues/76734"
canonical_pr: "https://github.com/openclaw/openclaw/pull/76744"
actions_total: 3
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 0
apply_skipped: 0
needs_human_count: 0
---

# issue-openclaw-openclaw-76734

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25842208365](https://github.com/openclaw/clawsweeper/actions/runs/25842208365)

Workflow conclusion: failure

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/pull/76744

## Summary

The docs wording request is still valid on current main: `docs/tools/acp-agents.md` contains `persistent behaviour`, while repo guidance requires American spelling. The existing implementation PR #76744 is the canonical path but is dirty/unmergeable and needs the same narrow docs/changelog repair refreshed on the target branch. No close or merge action is planned.

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
| #76734 | keep_closed | skipped | canonical | Already closed in live preflight state; no closure mutation is allowed or needed. |
| #76744 | fix_needed | planned | canonical | Repair the existing ClawSweeper implementation branch with the same narrow docs wording and changelog update; do not merge. |
| cluster:issue-openclaw-openclaw-76734 | build_fix_artifact | planned |  | Emit a deterministic repair plan for the executor to update the existing target branch/PR. |

## Needs Human

- none
