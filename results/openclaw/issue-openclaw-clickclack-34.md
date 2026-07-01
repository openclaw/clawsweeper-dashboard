---
repo: "openclaw/clickclack"
cluster_id: "issue-openclaw-clickclack-34"
mode: "autonomous"
run_id: "28490687566"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/28490687566"
head_sha: "44f0d7ac1222b754e2b2fc5f08c259f83676f84f"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-07-01T03:12:35.777Z"
canonical: "https://github.com/openclaw/clickclack/issues/34"
canonical_issue: "https://github.com/openclaw/clickclack/issues/34"
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

# issue-openclaw-clickclack-34

Repo: openclaw/clickclack

Run: [https://github.com/openclaw/clawsweeper/actions/runs/28490687566](https://github.com/openclaw/clawsweeper/actions/runs/28490687566)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/clickclack/issues/34

## Summary

Verified #34 is still reproducible on current main from source: ProductSite sends every non-localhost, non-loopback hostname to https://app.clickclack.chat. No active implementation PR is present in the checkout, so the canonical path is a new narrow fix PR from clawsweeper/issue-openclaw-clickclack-34.

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
| execute_fix | blocked |  |  | validation_script_missing: required pnpm --filter is unavailable in target checkout |
| issue_implementation_status_comment | updated | #34 |  |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| _None_ |  |  |  |  |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #34 | fix_needed | planned | canonical | The issue describes a deterministic self-host routing bug and the current source still implements the over-broad hosted-app hostname rule. |
| cluster:issue-openclaw-clickclack-34 | build_fix_artifact | planned |  | A narrow source, e2e, and embedded-assets fix is viable and does not require a product or security decision. |
| cluster:issue-openclaw-clickclack-34 | open_fix_pr | planned |  | The job allows fix and raise_pr, no active implementation PR was found, and the implementation is narrow. |

## Needs Human

- none
