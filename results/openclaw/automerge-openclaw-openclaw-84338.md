---
repo: "openclaw/openclaw"
cluster_id: "automerge-openclaw-openclaw-84338"
mode: "autonomous"
run_id: "26398324698"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/26398324698"
head_sha: "eef3e9ab6847da2b2c2979a3cfa5bc1aeae155ae"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-25T11:56:27.420Z"
canonical: "https://github.com/openclaw/openclaw/pull/86453"
canonical_issue: "https://github.com/openclaw/openclaw/issues/84337"
canonical_pr: "https://github.com/openclaw/openclaw/pull/86453"
actions_total: 4
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 1
apply_skipped: 0
needs_human_count: 0
---

# automerge-openclaw-openclaw-84338

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/26398324698](https://github.com/openclaw/clawsweeper/actions/runs/26398324698)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/openclaw/pull/86453

## Summary

#86453 is the current canonical repair path for the closed source PR #84338. It is writable but not merge-ready: the preflight shows a dirty merge state, a failed check-dependencies job, and an actionable Codex security-review repair marker. No merge or close is planned because this job blocks those actions.

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
| repair_contributor_branch | pushed | https://github.com/openclaw/openclaw/pull/86453 |  |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #86453 | merge_canonical | blocked | fix_pr | job does not allow merge |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #84337 | route_security | planned | security_sensitive | Quarantine the public security-sensitive issue itself; continue the non-closing repair path for the explicitly opted-in PR. |
| #84338 | keep_closed | skipped | superseded | Historical source PR only; keep it closed and preserve its credit through #86453. |
| #86453 | fix_needed | planned | canonical | Repair the writable replacement PR branch: rebase/resolve drift, address the Codex security-review finding, fix check-dependencies, rerun review and changed checks. |
| cluster:automerge-openclaw-openclaw-84338 | build_fix_artifact | planned |  | Executable repair artifact for the deterministic edit pass. |

## Needs Human

- none
