---
repo: "openclaw/gogcli"
cluster_id: "issue-openclaw-gogcli-774"
mode: "autonomous"
run_id: "27462035081"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/27462035081"
head_sha: "86d0ca37755b3b476a32f6b510a439ce1fa73eea"
workflow_conclusion: "failure"
result_status: "planned"
published_at: "2026-06-13T08:50:26.694Z"
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

Run: [https://github.com/openclaw/clawsweeper/actions/runs/27462035081](https://github.com/openclaw/clawsweeper/actions/runs/27462035081)

Workflow conclusion: failure

Worker result: planned

Canonical: https://github.com/openclaw/gogcli/issues/774

## Summary

Verified #774 against current main 51ad56cc72d15c580b39cafd969a337f1b1c8ef1: gmail send has --body-html-file, but gmail drafts create/update still do not. A narrow new fix PR is appropriate; this worker produced the fix artifact only and did not mutate GitHub or the read-only checkout.

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
| #575 | keep_closed | skipped | related | Closed linked issue is evidence for desired send behavior, not a mutation target. |
| #774 | fix_needed | planned | canonical | The issue is still valid on current main and has a narrow implementation path with no security-sensitive signal. |
| cluster:issue-openclaw-gogcli-774 | build_fix_artifact | planned |  | No viable existing PR is hydrated; a new credited fix PR is the canonical path. |

## Needs Human

- none
