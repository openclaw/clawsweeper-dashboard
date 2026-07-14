---
repo: "openclaw/discrawl"
cluster_id: "issue-openclaw-discrawl-128"
mode: "autonomous"
run_id: "29333817142"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/29333817142"
head_sha: "ecc6d03d1ec73267d434cb1905cfc216c78fcd70"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-07-14T13:00:42.210Z"
canonical: "https://github.com/openclaw/discrawl/issues/128"
canonical_issue: "https://github.com/openclaw/discrawl/issues/128"
canonical_pr: null
actions_total: 2
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 0
apply_skipped: 0
needs_human_count: 0
---

# issue-openclaw-discrawl-128

Repo: openclaw/discrawl

Run: [https://github.com/openclaw/clawsweeper/actions/runs/29333817142](https://github.com/openclaw/clawsweeper/actions/runs/29333817142)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/discrawl/issues/128

## Summary

Issue #128 remains a valid, narrow non-security bug on main SHA 0dc6a87cad9a4652b944eb7366ef020371832f20. No implementation PR exists. Plan a new fix PR that rewrites only os.ErrNotExist from the shared required-service config load and adds focused isolated-HOME/XDG regression coverage.

## Impact

| Metric | Count |
| --- | ---: |
| Worker actions | 2 |
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
| open_fix_pr | opened | https://github.com/openclaw/discrawl/pull/129 | clawsweeper/issue-openclaw-discrawl-128 |  |
| issue_implementation_status_comment | updated | #128 |  |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #129 | merge_canonical | ready | fix_pr | issue implementation PR checks are green; merge intentionally blocked for this lane |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #128 | fix_needed | planned | canonical | The current required-config experience does not provide an actionable recovery path, and the fix can remain limited to the shared CLI boundary and focused tests. |
| cluster:issue-openclaw-discrawl-128 | build_fix_artifact | planned |  | The executor can create or reuse clawsweeper/issue-openclaw-discrawl-128, apply this two-file patch, validate it, and open one credited PR with the required labels. |

## Needs Human

- none
