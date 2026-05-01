---
repo: "openclaw/openclaw"
cluster_id: "clawsweeper-commit-openclaw-openclaw-214b3d333676"
mode: "autonomous"
run_id: "25203815918"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25203815918"
head_sha: "f281e759d1cc7a5fd7ce7779ea1ad69e55e5249f"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-01T05:40:04.502Z"
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

# clawsweeper-commit-openclaw-openclaw-214b3d333676

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25203815918](https://github.com/openclaw/clawsweeper/actions/runs/25203815918)

Workflow conclusion: success

Worker result: planned

Canonical: unknown

## Summary

The stat-error rethrow itself is correct, but the same allowlist readers still convert non-`ENOENT` read failures into a missing/empty allowlist after `stat` succeeds. That leaves current `main` with the same silent failure mode for unreadable pairing allowlist files.

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
| open_fix_pr | opened | https://github.com/openclaw/openclaw/pull/75446 | clawsweeper/clawsweeper-commit-openclaw-openclaw-214b3d333676 |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #75446 | merge_canonical | blocked | fix_pr | job does not allow merge |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| cluster:clawsweeper-commit-openclaw-openclaw-214b3d333676 | build_fix_artifact | planned |  | ClawSweeper found an actionable commit-level bug/regression candidate. |

## Needs Human

- none
