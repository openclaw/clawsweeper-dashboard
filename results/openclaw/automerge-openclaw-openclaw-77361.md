---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-77361"
mode: "autonomous"
run_id: "25350187372"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25350187372"
head_sha: "16cced2111e718370e89245ce21131529feef340"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-05T00:01:45.422Z"
canonical: "https://github.com/openclaw/openclaw/pull/77361"
canonical_issue: "https://github.com/openclaw/openclaw/issues/77343"
canonical_pr: "https://github.com/openclaw/openclaw/pull/77361"
actions_total: 2
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 0
apply_skipped: 0
needs_human_count: 0
---

# automerge-openclaw-openclaw-77361

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25350187372](https://github.com/openclaw/clawsweeper/actions/runs/25350187372)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/pull/77361

## Summary

No repair artifact is needed for this automerge-adopted PR. The hydrated artifact shows #77361 is the focused canonical fix for #77343, has a passed ClawSweeper/Codex review, no hydrated review comments, no security-sensitive signal, and green relevant checks at head 826c847fa01e951584fee5effa97f7467222298e. Merge and close actions are blocked by job policy, so the plan keeps the PR canonical and keeps the linked issue open until the canonical PR lands.

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
| automerge_repair_outcome_comment | updated | #77361 |  |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| _None_ |  |  |  |  |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #77361 | keep_canonical | planned | canonical | Canonical PR is already the narrow fix candidate and no ClawSweeper repair marker, failing relevant check, rebase instruction, or actionable review finding is present. Merge is not emitted because blocked_actions includes merge and allow_merge=false. |
| #77343 | keep_related | planned | fixed_by_candidate | Issue is covered by the open canonical PR but must remain open until the fix lands and a permitted post-merge closeout run reclassifies it. |

## Needs Human

- none
