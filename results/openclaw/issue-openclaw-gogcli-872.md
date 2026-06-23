---
repo: "openclaw/gogcli"
cluster_id: "issue-openclaw-gogcli-872"
mode: "autonomous"
run_id: "28009514355"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/28009514355"
head_sha: "df861c9f65e8bd3da4c60a221eb462361cb0d1c7"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-06-23T07:50:39.706Z"
canonical: "https://github.com/openclaw/gogcli/issues/872"
canonical_issue: "https://github.com/openclaw/gogcli/issues/872"
canonical_pr: null
actions_total: 4
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 1
apply_skipped: 0
needs_human_count: 0
---

# issue-openclaw-gogcli-872

Repo: openclaw/gogcli

Run: [https://github.com/openclaw/clawsweeper/actions/runs/28009514355](https://github.com/openclaw/clawsweeper/actions/runs/28009514355)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/gogcli/issues/872

## Summary

Verified current main still returns a generic stored-token JSON decode error and maps only missing keyring entries to re-auth. Planned a narrow new fix PR artifact; local validation could not run because the sandbox filesystem is read-only and Go could not create its module/cache directories.

## Impact

| Metric | Count |
| --- | ---: |
| Worker actions | 4 |
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
| open_fix_pr | opened | https://github.com/openclaw/gogcli/pull/874 | clawsweeper/issue-openclaw-gogcli-872 |  |
| issue_implementation_status_comment | updated | #872 |  |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #874 | merge_canonical | blocked | fix_pr | checks are not clean: windows: IN_PROGRESS |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #872 | fix_needed | planned | canonical | The bug remains valid on current main and has a narrow secrets/googleapi fix path. |
| cluster:issue-openclaw-gogcli-872 | build_fix_artifact | planned |  | A new fix PR is appropriate and allowed by the job frontmatter. |
| #207 | keep_closed | skipped | independent | Closed historical context only. |
| #208 | keep_closed | skipped | independent | Closed unrelated context only. |

## Needs Human

- none
