---
repo: "openclaw/openclaw"
cluster_id: "clawsweeper-commit-openclaw-openclaw-56155e5048a2"
mode: "autonomous"
run_id: "25147192444"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25147192444"
head_sha: "594830debf26f6944a657e365811281569abe6c8"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-04-30T04:30:09.383Z"
canonical: "https://github.com/openclaw/openclaw/commit/56155e5048a250ed2d75e1f6c485b51597eabfeb"
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

# clawsweeper-commit-openclaw-openclaw-56155e5048a2

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25147192444](https://github.com/openclaw/clawsweeper/actions/runs/25147192444)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/commit/56155e5048a250ed2d75e1f6c485b51597eabfeb

## Summary

Verified the ClawSweeper commit finding against current main at 0142c791232e00b619a5dd0068eb2567e776123d. The regression is still present: conformance mode is treated like full/adversarial for diagnostic assertions, while the conformance Docker scenario uses the conformance personality. No GitHub mutations were performed. A narrow fix artifact is needed.

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
| open_fix_pr | opened | https://github.com/openclaw/openclaw/pull/74829 | clawsweeper/clawsweeper-commit-openclaw-openclaw-56155e5048a2 |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #74829 | merge_canonical | blocked | fix_pr | job does not allow merge |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| cluster:clawsweeper-commit-openclaw-openclaw-56155e5048a2 | fix_needed | planned |  | The current main behavior still weakens/inverts the conformance canary, and no viable canonical PR exists in the hydrated artifact. |
| cluster:clawsweeper-commit-openclaw-openclaw-56155e5048a2 | build_fix_artifact | planned |  | Autonomous job allows fix and raise_pr, but this worker cannot mutate GitHub directly; emit artifact for deterministic executor. |

## Needs Human

- none
