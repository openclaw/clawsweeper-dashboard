---
repo: "openclaw/gogcli"
cluster_id: "issue-openclaw-gogcli-806"
mode: "autonomous"
run_id: "27505403758"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/27505403758"
head_sha: "a9b17a1e94ca0bc66ea53b6f6ba0e94f260c5d63"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-06-14T17:10:43.194Z"
canonical: "https://github.com/openclaw/gogcli/issues/806"
canonical_issue: "https://github.com/openclaw/gogcli/issues/806"
canonical_pr: null
actions_total: 4
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 1
apply_skipped: 0
needs_human_count: 0
---

# issue-openclaw-gogcli-806

Repo: openclaw/gogcli

Run: [https://github.com/openclaw/clawsweeper/actions/runs/27505403758](https://github.com/openclaw/clawsweeper/actions/runs/27505403758)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/gogcli/issues/806

## Summary

Issue #806 remains valid on main SHA 4a532bb86db273222eb60bb2ca5c3ff07c3e2715: `calendar freebusy` still sends raw `--from/--to` strings to the FreeBusy API, while `calendar events` resolves the same flags through the shared time range parser. No active implementation PR was present in the preflight artifact, so this run emits a narrow new-fix-PR artifact. Local code changes and validation could not be applied because the worker filesystem is read-only.

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
| open_fix_pr | opened | https://github.com/openclaw/gogcli/pull/811 | clawsweeper/issue-openclaw-gogcli-806 |  |
| issue_implementation_status_comment | updated | #806 |  |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #811 | merge_canonical | blocked | fix_pr | checks are not clean: test: IN_PROGRESS, windows: IN_PROGRESS |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #806 | keep_canonical | planned | canonical | Canonical source issue for the requested implementation. |
| cluster:issue-openclaw-gogcli-806 | fix_needed | planned |  | A narrow fix can reuse existing parser behavior and does not require a product decision. |
| cluster:issue-openclaw-gogcli-806 | build_fix_artifact | planned |  | The checkout is read-only, so the correct autonomous output is an executable fix artifact for the repair applicator. |
| cluster:issue-openclaw-gogcli-806 | open_fix_pr | planned |  | Fix PR creation is allowed by the job and no existing implementation PR was hydrated. |

## Needs Human

- none
