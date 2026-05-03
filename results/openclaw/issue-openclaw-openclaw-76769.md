---
repo: "openclaw/openclaw"
cluster_id: "issue-openclaw-openclaw-76769"
mode: "autonomous"
run_id: "25283310037"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25283310037"
head_sha: "0fbf1e65bfcc491df0fb130111ead95d80c9025d"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-03T15:48:59.918Z"
canonical: "https://github.com/openclaw/openclaw/issues/76769"
canonical_issue: "https://github.com/openclaw/openclaw/issues/76769"
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

# issue-openclaw-openclaw-76769

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25283310037](https://github.com/openclaw/clawsweeper/actions/runs/25283310037)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/issues/76769

## Summary

Issue #76769 is the open canonical item. Current main still has the reported bug: plain `openclaw memory status` calls `probeVectorAvailability()`, which initializes the embedding provider path for `provider=auto`; docs already reserve vector and embedding probes for `--deep`. A narrow new fix PR is appropriate. No close or merge action is planned.

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
| open_fix_pr | opened | https://github.com/openclaw/openclaw/pull/76789 | clawsweeper/issue-openclaw-openclaw-76769 |  |
| issue_implementation_status_comment | updated | #76769 |  |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #76789 | merge_canonical | blocked | fix_pr | job does not allow merge |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #76769 | keep_canonical | planned | canonical |  |
| cluster:issue-openclaw-openclaw-76769 | fix_needed | planned |  |  |
| cluster:issue-openclaw-openclaw-76769 | build_fix_artifact | planned |  |  |
| cluster:issue-openclaw-openclaw-76769 | open_fix_pr | planned |  |  |

## Needs Human

- none
