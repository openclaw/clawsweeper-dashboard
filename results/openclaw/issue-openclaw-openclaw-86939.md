---
repo: "openclaw/openclaw"
cluster_id: "issue-openclaw-openclaw-86939"
mode: "autonomous"
run_id: "27261797101"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/27261797101"
head_sha: "fc19c926f04cee78383e0bacb7a884725bdaabc5"
workflow_conclusion: "failure"
result_status: "planned"
published_at: "2026-06-10T08:04:27.463Z"
canonical: "https://github.com/openclaw/openclaw/pull/87017"
canonical_issue: "https://github.com/openclaw/openclaw/issues/86939"
canonical_pr: "https://github.com/openclaw/openclaw/pull/87017"
actions_total: 3
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 0
apply_skipped: 0
needs_human_count: 0
---

# issue-openclaw-openclaw-86939

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/27261797101](https://github.com/openclaw/clawsweeper/actions/runs/27261797101)

Workflow conclusion: failure

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/pull/87017

## Summary

Current main already contains the webchat stale-running-row fix for #86939, so no new fix artifact or PR is needed. #86954 is an open, dirty ClawSweeper PR for the same already-fixed issue and should receive a non-closing superseded-status comment only; #87017 is quarantined to central security routing per the preflight artifact.

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
| #86939 | keep_closed | skipped | fixed_by_candidate | Already closed and fixed on current main; closure is also blocked by job frontmatter. |
| #86954 | comment | planned | superseded | Open PR is superseded by current main, but close is blocked by the job; comment-only update is allowed. |
| #87017 | route_security | planned | security_sensitive | Preflight artifact explicitly requires central security routing for #87017. |

## Needs Human

- none
