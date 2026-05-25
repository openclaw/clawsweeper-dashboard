---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-84220"
mode: "autonomous"
run_id: "26421027636"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/26421027636"
head_sha: "3f970f0fb25e43edb50e60087b4442072f8149bc"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-25T22:23:47.086Z"
canonical: "https://github.com/openclaw/openclaw/pull/84353"
canonical_issue: "https://github.com/openclaw/openclaw/issues/84193"
canonical_pr: "https://github.com/openclaw/openclaw/pull/84353"
actions_total: 4
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 1
apply_skipped: 0
needs_human_count: 0
---

# automerge-openclaw-openclaw-84220

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/26421027636](https://github.com/openclaw/clawsweeper/actions/runs/26421027636)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/pull/84353

## Summary

Canonical path is the open writable replacement PR #84353, which carries forward source PR #84220 for issue #84193. No merge or close is allowed by this job. #84353 still needs a repair/validation pass because the hydrated preflight shows mergeable_state=unstable, one failing relevant check, and no clean Codex /review merge preflight.

## Impact

| Metric | Count |
| --- | ---: |
| Worker actions | 4 |
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
| repair_contributor_branch | pushed | https://github.com/openclaw/openclaw/pull/84353 |  |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #84353 | merge_canonical | blocked | fix_pr | job does not allow merge |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #84193 | keep_related | planned | fixed_by_candidate | Covered by the open canonical fix path, but not closable in this run. |
| #84220 | keep_closed | skipped | superseded | Already closed source PR; keep as historical credited source for #84353. |
| #84353 | fix_needed | planned | canonical | Repair the existing writable canonical PR branch, address the failing agent check and review gate, then rerun validation/review. Merge remains blocked by job policy. |
| cluster:automerge-openclaw-openclaw-84220 | build_fix_artifact | planned |  | Emit an executable repair artifact for the ClawSweeper edit pass. |

## Needs Human

- none
