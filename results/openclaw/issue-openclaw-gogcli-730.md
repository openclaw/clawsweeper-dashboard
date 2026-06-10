---
repo: "openclaw/gogcli"
cluster_id: "issue-openclaw-gogcli-730"
mode: "autonomous"
run_id: "27273421847"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/27273421847"
head_sha: "b278dc4d9d8b502a11d6d70df4d013f37ec02b6b"
workflow_conclusion: "failure"
result_status: "blocked"
published_at: "2026-06-10T11:43:24.268Z"
canonical: "https://github.com/openclaw/gogcli/issues/730"
canonical_issue: "https://github.com/openclaw/gogcli/issues/730"
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

# issue-openclaw-gogcli-730

Repo: openclaw/gogcli

Run: [https://github.com/openclaw/clawsweeper/actions/runs/27273421847](https://github.com/openclaw/clawsweeper/actions/runs/27273421847)

Workflow conclusion: failure

Worker result: blocked

Canonical: https://github.com/openclaw/gogcli/issues/730

## Summary

Issue #730 is a valid, narrow bug on current main SHA 31fb2e53b1ccb790b5399eddf11112d1d5084941. The table parser preserves HTML break tags literally, while the table inserter already supports newline text and inline formatting. A focused fix artifact is ready, but implementation and validation are blocked because the provided checkout and Go module cache are read-only.

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
| #730 | fix_needed | planned | canonical | No viable implementation PR exists in the hydrated cluster, and the defect remains present on current main. |
| cluster:issue-openclaw-gogcli-730 | build_fix_artifact | planned |  | The fix is small and safe for a new focused PR. |
| cluster:issue-openclaw-gogcli-730 | open_fix_pr | blocked |  | A writable checkout and writable Go cache are required to patch, format, test, and prepare the PR branch. |

## Needs Human

- none
