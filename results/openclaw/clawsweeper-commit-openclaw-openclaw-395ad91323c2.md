---
repo: "openclaw/openclaw"
cluster_id: "clawsweeper-commit-openclaw-openclaw-395ad91323c2"
mode: "autonomous"
run_id: "25147630750"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25147630750"
head_sha: "79ae43bf0536b54b65c6723d8b5ac3d8cf689322"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-04-30T04:42:19.315Z"
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

# clawsweeper-commit-openclaw-openclaw-395ad91323c2

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25147630750](https://github.com/openclaw/clawsweeper/actions/runs/25147630750)

Workflow conclusion: success

Worker result: planned

Canonical: unknown

## Summary

One actionable issue found. The new Slack approval update cap uses the generic Slack send limit of 8,000 characters, but Slack’s `chat.update` API documents `msg_too_long` when `text` exceeds 4,000 characters, so approval updates between 4,001 and 8,000 characters can still be rejected and leave stale approval cards.

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
| open_fix_pr | opened | https://github.com/openclaw/openclaw/pull/74855 | clawsweeper/clawsweeper-commit-openclaw-openclaw-395ad91323c2 |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #74855 | merge_canonical | blocked | fix_pr | job does not allow merge |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| cluster:clawsweeper-commit-openclaw-openclaw-395ad91323c2 | build_fix_artifact | planned |  | ClawSweeper found an actionable commit-level bug/regression candidate. |

## Needs Human

- none
