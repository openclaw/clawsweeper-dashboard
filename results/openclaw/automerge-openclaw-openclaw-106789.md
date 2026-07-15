---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-106789"
mode: "plan"
run_id: "29380121624"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/29380121624"
head_sha: "923797712890459a866dc7ec905320f34ce9c1c4"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-07-15T00:58:30.677Z"
canonical: "#106789"
canonical_issue: null
canonical_pr: "https://github.com/openclaw/openclaw/pull/106789"
actions_total: 3
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 0
apply_skipped: 0
needs_human_count: 0
---

# automerge-openclaw-openclaw-106789

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/29380121624](https://github.com/openclaw/clawsweeper/actions/runs/29380121624)

Workflow conclusion: success

Worker result: planned

Canonical: #106789

## Summary

Keep the closed contributor PR #104485 as credited historical source and repair canonical PR #106789 in place. Current main still hard-pins changed-gate delegation to Blacksmith Testbox, so the seven-file PR remains substantive and valid. The hydrated PR head is behind main and has one failing exact-head check, so it is not merge-ready until ClawSweeper rebases it, reruns review and changed-surface validation, and resolves or proves the check unrelated.

## Impact

| Metric | Count |
| --- | ---: |
| Worker actions | 3 |
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
| https://github.com/openclaw/openclaw/pull/104485 | keep_closed | skipped | superseded | Historical source PR already superseded by the open, writable canonical replacement. |
| https://github.com/openclaw/openclaw/pull/106789 | fix_needed | planned | canonical | Repair the writable canonical branch in place: rebase onto current main, retain the seven-file provider-precedence fix, rerun Codex review and pnpm check:changed, and resolve only failures attributable to the repaired head. |
| fix-artifact:#106789 | build_fix_artifact | planned |  | Provide the deterministic edit worker with a narrow in-place repair contract and validation plan. |

## Needs Human

- none
