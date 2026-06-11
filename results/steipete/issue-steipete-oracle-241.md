---
repo: "steipete/oracle"
cluster_id: "issue-steipete-oracle-241"
mode: "autonomous"
run_id: "27325429334"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/27325429334"
head_sha: "8a9ba353151c2596bdb1497b81c95ab6d1cbc04f"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-06-11T05:28:51.021Z"
canonical: "https://github.com/steipete/oracle/issues/241"
canonical_issue: "https://github.com/steipete/oracle/issues/241"
canonical_pr: null
actions_total: 4
fix_executed: 0
fix_failed: 0
fix_blocked: 1
apply_executed: 0
apply_blocked: 0
apply_skipped: 0
needs_human_count: 0
---

# issue-steipete-oracle-241

Repo: steipete/oracle

Run: [https://github.com/openclaw/clawsweeper/actions/runs/27325429334](https://github.com/openclaw/clawsweeper/actions/runs/27325429334)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/steipete/oracle/issues/241

## Summary

Current main still rejects authenticated browser sessions when `/backend-api/me` returns a plain 401/403. Plan a narrow fix that uses the cookie-authenticated `/api/auth/session` response as the primary network signal, retains strict login-page/CTA guards and authenticated-DOM fallback behavior, and updates focused tests, browser documentation, and the unreleased changelog.

## Impact

| Metric | Count |
| --- | ---: |
| Worker actions | 4 |
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
| issue_implementation_status_comment | skipped | #241 |  | no existing ClawSweeper issue implementation status comment |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| _None_ |  |  |  |  |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #182 | keep_closed | skipped | related | Related browser context only; no action is permitted or needed. |
| #216 | keep_closed | skipped | related | The merged PR established nearby behavior but does not fix the remaining plain 401/403 false negative. |
| #241 | fix_needed | planned | canonical | The issue is source-reproducible on current main, narrowly scoped, non-security-sensitive, and has no viable open implementation PR. |
| cluster:issue-steipete-oracle-241 | build_fix_artifact | planned |  | A focused implementation and validation plan is available without maintainer product-direction judgment. |

## Needs Human

- none
