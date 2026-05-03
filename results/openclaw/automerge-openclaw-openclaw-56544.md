---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-56544"
mode: "autonomous"
run_id: "25266240443"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25266240443"
head_sha: "753ebcf63747a0daba7275759b90f41b4b3d3398"
workflow_conclusion: "failure"
result_status: "planned"
published_at: "2026-05-03T01:39:15.391Z"
canonical: "https://github.com/openclaw/openclaw/pull/76330"
canonical_issue: null
canonical_pr: "https://github.com/openclaw/openclaw/pull/76330"
actions_total: 4
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 0
apply_skipped: 0
needs_human_count: 0
---

# automerge-openclaw-openclaw-56544

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25266240443](https://github.com/openclaw/clawsweeper/actions/runs/25266240443)

Workflow conclusion: failure

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/pull/76330

## Summary

Classified the adopted Slack DM preview streaming repair cluster. #76330 is the open canonical repair path replacing closed source PR #56544, with contributor credit preserved for @HangGlidersRule. Merge/close are blocked by job policy and exact-head CI is not clean, so the next deterministic step is branch repair or CI-disposition work on #76330, followed by re-review and `pnpm check:changed`.

## Impact

| Metric | Count |
| --- | ---: |
| Worker actions | 4 |
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
| #56480 | keep_closed | skipped | related | Closed historical context only; keep closed while #76330 owns the current repair path. |
| #56544 | keep_closed | skipped | superseded | Original contributor PR was useful but uneditable; it has already been superseded by the writable same-repo replacement #76330. |
| #76330 | fix_needed | planned | canonical | Canonical PR exists and is writable, but exact-head CI/check disposition blocks automerge; repair or rerun/failure triage is needed before re-review and any router merge decision. |
| cluster:automerge-openclaw-openclaw-56544 | build_fix_artifact | planned |  | A structured repair artifact is needed so the executor can update or rerun the writable #76330 branch without mutating GitHub from this worker. |

## Needs Human

- none
