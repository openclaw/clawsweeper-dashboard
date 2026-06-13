---
repo: "openclaw/openclaw"
cluster_id: "gitcrawl-17429-clawdhub-login-loop-after-account-deletion-oauth-completes-but-n"
mode: "autonomous"
run_id: "27462675568"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/27462675568"
head_sha: "f398bbc24221f7e5343231eb87f97f3df7c16036"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-06-13T09:20:47.070Z"
canonical: null
canonical_issue: null
canonical_pr: null
actions_total: 9
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 0
apply_skipped: 0
needs_human_count: 0
---

# gitcrawl-17429-clawdhub-login-loop-after-account-deletion-oauth-completes-but-n

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/27462675568](https://github.com/openclaw/clawsweeper/actions/runs/27462675568)

Workflow conclusion: success

Worker result: planned

Canonical: unknown

## Summary

Hydrated preflight state does not contain any open ClawHub account-deletion login-loop issue or PR. All provided candidate refs are already closed, and the representative #1244 is a closed diagnostic-logging PR unrelated to the stated ClawHub OAuth loop. No close, merge, label, or fix-PR action is safe or needed from this stale/misclustered cluster; a fresh cluster should be created from the actual live ClawHub login-loop refs if the bug still exists.

## Impact

| Metric | Count |
| --- | ---: |
| Worker actions | 9 |
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
| #367 | keep_closed | skipped | independent | Already closed and unrelated to the stated cluster root cause. |
| #504 | keep_closed | skipped | independent | Already closed; not a duplicate of the stated ClawHub login-loop cluster. |
| #514 | keep_closed | skipped | fixed_by_candidate | Historical linked fix for #504 only; no action in this cluster. |
| #647 | keep_closed | skipped | independent | Already closed and unrelated. |
| #900 | keep_closed | skipped | independent | Already closed and unrelated. |
| #906 | keep_closed | skipped | independent | Already closed and unrelated. |
| #1116 | keep_closed | skipped | independent | Already closed and unrelated. |
| #1244 | keep_closed | skipped | independent | Canonical hint is obsolete or misclustered; keep closed and do not repair from this PR. |
| #1267 | keep_closed | skipped | independent | Already closed and unrelated. |

## Needs Human

- none
