---
repo: "openclaw/clawsweeper"
cluster_id: "issue-openclaw-clawsweeper-507"
mode: "autonomous"
run_id: "29182600574"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/29182600574"
head_sha: "6d204db3299114d14ce3341ccd06d86d12e2b495"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-07-12T06:39:28.412Z"
canonical: "https://github.com/openclaw/clawsweeper/issues/507"
canonical_issue: "https://github.com/openclaw/clawsweeper/issues/507"
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

# issue-openclaw-clawsweeper-507

Repo: openclaw/clawsweeper

Run: [https://github.com/openclaw/clawsweeper/actions/runs/29182600574](https://github.com/openclaw/clawsweeper/actions/runs/29182600574)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/clawsweeper/issues/507

## Summary

The bug remains present at main SHA 6d204db: the source-revision advisory predicate ignores several ClawSweeper-managed namespaces but not maturity:, so adding maturity:stable changes the issue digest. The narrow repair is ready for the executor; local editing and Node 24 validation were unavailable in this read-only Node 20 worker checkout.

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
| open_fix_pr | opened | https://github.com/openclaw/clawsweeper/pull/510 | clawsweeper/issue-openclaw-clawsweeper-507 |  |
| issue_implementation_status_comment | updated | #507 |  |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #510 | merge_canonical | ready | fix_pr | issue implementation PR checks are green; merge intentionally blocked for this lane |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #507 | fix_needed | planned | canonical | A narrow code-and-test fix is viable and no active implementation PR is hydrated. |
| cluster:issue-openclaw-clawsweeper-507 | build_fix_artifact | planned |  | The executor can create or update the requested issue branch and open one narrow fix PR. |

## Needs Human

- none
