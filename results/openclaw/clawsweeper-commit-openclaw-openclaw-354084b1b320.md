---
repo: "openclaw/openclaw"
cluster_id: "clawsweeper-commit-openclaw-openclaw-354084b1b320"
mode: "autonomous"
run_id: "25230037102"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25230037102"
head_sha: "2adcf6015a4cdb05370cca2e3cf02502e4e76f6b"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-01T19:55:29.286Z"
canonical: null
canonical_issue: null
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

# clawsweeper-commit-openclaw-openclaw-354084b1b320

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25230037102](https://github.com/openclaw/clawsweeper/actions/runs/25230037102)

Workflow conclusion: success

Worker result: planned

Canonical: unknown

## Summary

The ClawSweeper commit finding is still valid on current main from source inspection. No issue or PR refs are hydrated for this commit-sourced cluster, and no viable canonical PR exists, so the narrow path is a new credited fix PR for provider-runtime alias ownership and in-flight negative-cache suppression.

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
| open_fix_pr | opened | https://github.com/openclaw/openclaw/pull/75397 | clawsweeper/clawsweeper-commit-openclaw-openclaw-354084b1b320 |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #75397 | merge_canonical | blocked | fix_pr | job does not allow merge |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| cluster:clawsweeper-commit-openclaw-openclaw-354084b1b320 | fix_needed | planned |  | No hydrated canonical PR exists, and both reported regressions are still present in current main source. |
| cluster:clawsweeper-commit-openclaw-openclaw-354084b1b320 | build_fix_artifact | planned |  | The fix is narrow and non-security-sensitive; allow_fix_pr is true and allow_merge is false. |

## Needs Human

- none
