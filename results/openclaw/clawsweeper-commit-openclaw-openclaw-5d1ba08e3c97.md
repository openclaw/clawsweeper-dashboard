---
repo: "openclaw/openclaw"
cluster_id: "clawsweeper-commit-openclaw-openclaw-5d1ba08e3c97"
mode: "autonomous"
run_id: "25202885744"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25202885744"
head_sha: "9a9ccde0f63663937b093436af7b4b69421fb37f"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-01T04:56:10.306Z"
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

# clawsweeper-commit-openclaw-openclaw-5d1ba08e3c97

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25202885744](https://github.com/openclaw/clawsweeper/actions/runs/25202885744)

Workflow conclusion: success

Worker result: planned

Canonical: unknown

## Summary

Found one actionable diagnostic gap in the new doctor warning: `group:plugins` is a supported plugin-tool allowlist shape, but this collector ignores it, so the warning can still miss a restrictive `plugins.allow` mismatch.

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
| cluster:clawsweeper-commit-openclaw-openclaw-5d1ba08e3c97 | build_fix_artifact | planned |  | ClawSweeper found an actionable commit-level bug/regression candidate. |

## Needs Human

- none
