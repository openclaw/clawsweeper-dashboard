---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-75423"
mode: "autonomous"
run_id: "25210305887"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25210305887"
head_sha: "4962a4bc359dc56af714ea5eba0849ed589bc335"
workflow_conclusion: "cancelled"
result_status: "planned"
published_at: "2026-05-01T10:15:46.143Z"
canonical: "https://github.com/openclaw/openclaw/pull/75423"
canonical_issue: null
canonical_pr: "https://github.com/openclaw/openclaw/pull/75423"
actions_total: 2
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 0
apply_skipped: 0
needs_human_count: 0
---

# automerge-openclaw-openclaw-75423

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25210305887](https://github.com/openclaw/clawsweeper/actions/runs/25210305887)

Workflow conclusion: cancelled

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/pull/75423

## Summary

#75423 is the open canonical PR and is repairable in place. ClawSweeper review passed on head f7dfc41af791f92efbc469a495816f590155a5db, but the exact-head OpenAI / Opus 4.6 parity gate is failing, so merge is blocked and a narrow contributor-branch repair artifact is needed.

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
| _None_ |  |  |  |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| _None_ |  |  |  |  |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #75423 | fix_needed | planned | canonical | Maintainer opted the PR into ClawSweeper automerge, but merge is blocked by the failing parity gate and the job forbids merge. The correct executable path is to repair the writable contributor branch. |
| cluster:automerge-openclaw-openclaw-75423 | build_fix_artifact | planned |  | A narrow in-place repair artifact is needed so the executor can fetch parity artifacts/logs, fix only the failing surface on #75423, rerun review/checks, and hand the PR back to the automerge router. |

## Needs Human

- none
