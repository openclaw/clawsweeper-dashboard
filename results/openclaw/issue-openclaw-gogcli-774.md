---
repo: "openclaw/gogcli"
cluster_id: "issue-openclaw-gogcli-774"
mode: "autonomous"
run_id: "27460569051"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/27460569051"
head_sha: "5abcd35eb422c1da671dc2719591c4311548b75b"
workflow_conclusion: "failure"
result_status: "blocked"
published_at: "2026-06-13T07:41:27.867Z"
canonical: "https://github.com/openclaw/gogcli/issues/774"
canonical_issue: "https://github.com/openclaw/gogcli/issues/774"
canonical_pr: null
actions_total: 3
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 0
apply_skipped: 0
needs_human_count: 0
---

# issue-openclaw-gogcli-774

Repo: openclaw/gogcli

Run: [https://github.com/openclaw/clawsweeper/actions/runs/27460569051](https://github.com/openclaw/clawsweeper/actions/runs/27460569051)

Workflow conclusion: failure

Worker result: blocked

Canonical: https://github.com/openclaw/gogcli/issues/774

## Summary

Issue #774 is a viable, non-security, narrow implementation request. Current main still has `--body-html-file` for `gmail send` but not for `gmail drafts create` or `gmail drafts update`. A write-enabled executor should apply the planned new-fix PR; this worker could not edit or validate because the filesystem is read-only.

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
| #575 | keep_closed | skipped | related | Already closed historical send-command context; no mutation needed. |
| #774 | fix_needed | planned | canonical | No viable canonical PR exists and the bug/feature gap is still present on current main. |
| cluster:issue-openclaw-gogcli-774 | build_fix_artifact | planned |  | A narrow fix PR is appropriate, but code application and validation require a write-enabled executor. |

## Needs Human

- none
