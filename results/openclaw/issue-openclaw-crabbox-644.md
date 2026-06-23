---
repo: "openclaw/crabbox"
cluster_id: "issue-openclaw-crabbox-644"
mode: "autonomous"
run_id: "28042083894"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/28042083894"
head_sha: "bd03fe34c0a49e17735186bc15e6e8656d03e2e2"
workflow_conclusion: "success"
result_status: "blocked"
published_at: "2026-06-23T17:08:41.294Z"
canonical: "https://github.com/openclaw/crabbox/issues/644"
canonical_issue: "https://github.com/openclaw/crabbox/issues/644"
canonical_pr: null
actions_total: 3
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 1
apply_skipped: 0
needs_human_count: 0
---

# issue-openclaw-crabbox-644

Repo: openclaw/crabbox

Run: [https://github.com/openclaw/clawsweeper/actions/runs/28042083894](https://github.com/openclaw/clawsweeper/actions/runs/28042083894)

Workflow conclusion: success

Worker result: blocked

Canonical: https://github.com/openclaw/crabbox/issues/644

## Summary

Issue #644 is a valid open canonical bug. Current main still builds the Tart SSH readiness target without SSHConfigProxy, so core readiness can take the raw Go TCP dial path that the reporter showed failing while /usr/bin/ssh succeeds. A narrow provider-local fix is appropriate, but this worker checkout is read-only, so implementation, local branch update, and validation are blocked here.

## Impact

| Metric | Count |
| --- | ---: |
| Worker actions | 3 |
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
| open_fix_pr | opened | https://github.com/openclaw/crabbox/pull/653 | clawsweeper/issue-openclaw-crabbox-644 |  |
| issue_implementation_status_comment | updated | #644 |  |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #653 | merge_canonical | blocked | fix_pr | checks are not clean: Go: IN_PROGRESS, Release Check: IN_PROGRESS |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #644 | fix_needed | planned | canonical | A narrow provider-local implementation is needed and no viable canonical PR exists. |
| cluster:issue-openclaw-crabbox-644 | build_fix_artifact | planned |  | Build a new fix PR for #644; no contributor PR replacement is involved. |
| cluster:issue-openclaw-crabbox-644 | open_fix_pr | blocked |  | Implementation and PR creation require a writable checkout and Go cache paths; this environment is read-only. |

## Needs Human

- none
