---
repo: "openclaw/openclaw"
cluster_id: "issue-openclaw-openclaw-85831"
mode: "autonomous"
run_id: "26347435016"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/26347435016"
head_sha: "e4ac6029f7972fadbd172553251d08ddc4b0621c"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-24T00:42:33.646Z"
canonical: "https://github.com/openclaw/openclaw/issues/85831"
canonical_issue: "https://github.com/openclaw/openclaw/issues/85831"
canonical_pr: null
actions_total: 2
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 1
apply_skipped: 0
needs_human_count: 0
---

# issue-openclaw-openclaw-85831

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/26347435016](https://github.com/openclaw/clawsweeper/actions/runs/26347435016)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/issues/85831

## Summary

Issue #85831 is a valid, narrow Control UI config-save bug on current main fa39bef3893d02ac7b261901f4a2aa4d7cf831d1. The fix path is to make the Control UI form edit and submit the source/resolved config snapshot instead of the runtime-materialized snapshot so schema-default/runtime-only fields such as models.providers.openai.baseUrl: "" are not persisted back through config.set.

## Impact

| Metric | Count |
| --- | ---: |
| Worker actions | 2 |
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
| open_fix_pr | opened | https://github.com/openclaw/openclaw/pull/85879 | clawsweeper/issue-openclaw-openclaw-85831 |  |
| issue_implementation_status_comment | updated | #85831 |  |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #85879 | merge_canonical | blocked | fix_pr | job does not allow merge |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #85831 | fix_needed | planned | canonical | The source issue reports a reproducible save failure after toggling controls in the Agents tools view when openclaw.json has models.providers.openai.agentRuntime.id but no baseUrl. The current UI form path can round-trip runtime-materialized provider overlay fields into config.set, which makes an omitted optional baseUrl become an invalid empty string. |
| cluster:issue-openclaw-openclaw-85831 | build_fix_artifact | planned |  | A narrow source/resolved snapshot fix with a focused UI controller regression test is appropriate and within allow_fix_pr. |

## Needs Human

- none
