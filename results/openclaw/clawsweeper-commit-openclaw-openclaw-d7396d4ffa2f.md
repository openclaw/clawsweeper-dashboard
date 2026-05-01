---
repo: "openclaw/openclaw"
cluster_id: "clawsweeper-commit-openclaw-openclaw-d7396d4ffa2f"
mode: "autonomous"
run_id: "25147023250"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25147023250"
head_sha: "5d5c2d8eadb87b44db91faec8b5567e1ec29378d"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-04-30T04:15:47.628Z"
canonical: null
canonical_issue: null
canonical_pr: null
actions_total: 1
fix_executed: 0
fix_failed: 0
fix_blocked: 1
apply_executed: 0
apply_blocked: 0
apply_skipped: 0
needs_human_count: 0
---

# clawsweeper-commit-openclaw-openclaw-d7396d4ffa2f

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25147023250](https://github.com/openclaw/clawsweeper/actions/runs/25147023250)

Workflow conclusion: success

Worker result: planned

Canonical: unknown

## Summary

Found one concrete gap: the Google Chat portion of the status/read-only SecretRef fix is incomplete. The new Google Chat config accessors avoid credential resolution, but `status --all` still resolves the full Google Chat account before it reaches those accessors and crashes on a SecretRef-backed service account.

## Impact

| Metric | Count |
| --- | ---: |
| Worker actions | 1 |
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

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| _None_ |  |  |  |  |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| cluster:clawsweeper-commit-openclaw-openclaw-d7396d4ffa2f | build_fix_artifact | planned |  | ClawSweeper found an actionable commit-level bug/regression candidate. |

## Needs Human

- none
