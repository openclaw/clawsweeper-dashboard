---
repo: "openclaw/openclaw"
cluster_id: "clawsweeper-commit-openclaw-openclaw-45082aaed3d0"
mode: "autonomous"
run_id: "25147029786"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25147029786"
head_sha: "d0cc0197088e5456cd9de63ef3cb3053e94bd35e"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-04-30T04:20:38.148Z"
canonical: null
canonical_issue: null
canonical_pr: null
actions_total: 1
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 1
apply_skipped: 0
needs_human_count: 0
---

# clawsweeper-commit-openclaw-openclaw-45082aaed3d0

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25147029786](https://github.com/openclaw/clawsweeper/actions/runs/25147029786)

Workflow conclusion: success

Worker result: planned

Canonical: unknown

## Summary

Found one actionable issue: the new guard is tested against a direct mock shape, but the real `openclaw doctor` call path drops the gateway payload’s `embedding.checked: false`, so the false-positive warning from issue #74608 still fires.

## Impact

| Metric | Count |
| --- | ---: |
| Worker actions | 1 |
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
| open_fix_pr | opened | https://github.com/openclaw/openclaw/pull/74836 | clawsweeper/clawsweeper-commit-openclaw-openclaw-45082aaed3d0 |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #74836 | merge_canonical | blocked | fix_pr | job does not allow merge |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| cluster:clawsweeper-commit-openclaw-openclaw-45082aaed3d0 | build_fix_artifact | planned |  | ClawSweeper found an actionable commit-level bug/regression candidate. |

## Needs Human

- none
