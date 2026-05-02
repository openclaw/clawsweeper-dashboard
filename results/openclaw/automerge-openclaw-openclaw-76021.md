---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-76021"
mode: "autonomous"
run_id: "25260994989"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25260994989"
head_sha: "08cd9dbda14b57deec64cf4cefce1b0844246d4e"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-02T20:45:22.440Z"
canonical: "https://github.com/openclaw/openclaw/pull/76021"
canonical_issue: "https://github.com/openclaw/openclaw/issues/47311"
canonical_pr: "https://github.com/openclaw/openclaw/pull/76021"
actions_total: 3
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 1
apply_skipped: 0
needs_human_count: 0
---

# automerge-openclaw-openclaw-76021

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25260994989](https://github.com/openclaw/clawsweeper/actions/runs/25260994989)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/pull/76021

## Summary

Canonical PR #76021 is the right repair path for #47311, but it is not merge-ready. The same-repo branch is writable, so ClawSweeper should repair the contributor branch by addressing the MediaRecorder error path, clearing dictation buffers after stop, rebasing/resolving the dirty merge state, and rerunning exact-head review/changed checks. #47311 should stay open until the canonical PR lands.

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
| repair_contributor_branch | pushed | https://github.com/openclaw/openclaw/pull/76021 |  |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #76021 | merge_canonical | blocked | fix_pr | job does not allow merge |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #76021 | fix_needed | planned | canonical | The PR is useful and repairable, but merge is blocked by dirty merge state, failing checks, and unresolved actionable bot/ClawSweeper review findings. |
| #47311 | keep_related | planned | fixed_by_candidate | The issue is covered by the canonical PR path but must remain open until the repaired PR lands. |
| cluster:automerge-openclaw-openclaw-76021 | build_fix_artifact | planned |  | A bounded branch repair artifact is needed so the executor can update #76021 and rerun review/validation. |

## Needs Human

- none
