---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-77018"
mode: "autonomous"
run_id: "25359419378"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25359419378"
head_sha: "eae122c38f1ef8c4e74a0bb7d5793897a57190ef"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-05T06:05:03.624Z"
canonical: "https://github.com/openclaw/openclaw/pull/77018"
canonical_issue: null
canonical_pr: "https://github.com/openclaw/openclaw/pull/77018"
actions_total: 3
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 1
apply_skipped: 0
needs_human_count: 0
---

# automerge-openclaw-openclaw-77018

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25359419378](https://github.com/openclaw/clawsweeper/actions/runs/25359419378)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/pull/77018

## Summary

PR #77018 is the canonical adopted repair PR, but it is not merge-ready. The hydrated artifact shows an unresolved ClawSweeper P1, an actionable Copilot review comment, a failing Real behavior proof check, and dirty mergeability. The same-repo branch is writable, so the deterministic executor should repair the contributor branch instead of replacing it. No close or merge action is emitted because both are blocked by job frontmatter.

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
| repair_contributor_branch | pushed | https://github.com/openclaw/openclaw/pull/77018 |  |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #77018 | merge_canonical | blocked | fix_pr | job does not allow merge |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #70044 | keep_closed | skipped | related | Already merged context PR; keep as historical related evidence only. |
| #77018 | fix_needed | planned | canonical | Repairable canonical PR with writable same-repo branch and unresolved review/check blockers. |
| cluster:automerge-openclaw-openclaw-77018 | build_fix_artifact | planned | canonical | A concrete branch repair path exists and is allowed by the job. |

## Needs Human

- none
