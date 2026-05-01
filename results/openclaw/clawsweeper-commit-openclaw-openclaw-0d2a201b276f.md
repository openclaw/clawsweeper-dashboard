---
repo: "openclaw/openclaw"
cluster_id: "clawsweeper-commit-openclaw-openclaw-0d2a201b276f"
mode: "autonomous"
run_id: "25205023669"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25205023669"
head_sha: "66fc173f2dd4f8d9b2c24e1f8c128c65c5a20fd1"
workflow_conclusion: "skipped"
result_status: "planned"
published_at: "2026-05-01T06:30:59.794Z"
canonical: null
canonical_issue: null
canonical_pr: null
actions_total: 1
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 0
apply_skipped: 0
needs_human_count: 0
---

# clawsweeper-commit-openclaw-openclaw-0d2a201b276f

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25205023669](https://github.com/openclaw/clawsweeper/actions/runs/25205023669)

Workflow conclusion: skipped

Worker result: planned

Canonical: unknown

## Summary

Found one remaining mid-turn retry bug in the changed path. The new retry prompt override is bypassed on normal reply runs that set `transcriptPrompt`, so those runs can still append the original user request after mid-turn recovery.

## Impact

| Metric | Count |
| --- | ---: |
| Worker actions | 1 |
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
| cluster:clawsweeper-commit-openclaw-openclaw-0d2a201b276f | build_fix_artifact | planned |  | ClawSweeper found an actionable commit-level bug/regression candidate. |

## Needs Human

- none
