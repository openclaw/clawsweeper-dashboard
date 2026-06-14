---
repo: "openclaw/gogcli"
cluster_id: "issue-openclaw-gogcli-804"
mode: "autonomous"
run_id: "27502238527"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/27502238527"
head_sha: "a9b17a1e94ca0bc66ea53b6f6ba0e94f260c5d63"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-06-14T15:11:29.333Z"
canonical: "https://github.com/openclaw/gogcli/issues/804"
canonical_issue: "https://github.com/openclaw/gogcli/issues/804"
canonical_pr: null
actions_total: 6
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 1
apply_skipped: 0
needs_human_count: 0
---

# issue-openclaw-gogcli-804

Repo: openclaw/gogcli

Run: [https://github.com/openclaw/clawsweeper/actions/runs/27502238527](https://github.com/openclaw/clawsweeper/actions/runs/27502238527)

Workflow conclusion: success

Worker result: planned

Canonical: https://github.com/openclaw/gogcli/issues/804

## Summary

Verified current main at 4a532bb86db273222eb60bb2ca5c3ff07c3e2715. Issue #804 is still valid: draft create/update can build reply metadata but have no draft `--reply-all`, and draft messages still pass only explicit `--to/--cc/--bcc` while allowing missing To. Planned a narrow new fix PR artifact; local patching/validation could not run because this worker filesystem is read-only.

## Impact

| Metric | Count |
| --- | ---: |
| Worker actions | 6 |
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
| open_fix_pr | opened | https://github.com/openclaw/gogcli/pull/805 | clawsweeper/issue-openclaw-gogcli-804 |  |
| issue_implementation_status_comment | updated | #804 |  |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #805 | merge_canonical | blocked | fix_pr | checks are not clean: image: IN_PROGRESS |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #57 | keep_closed | skipped | related | Already closed linked context; not a target for mutation. |
| #488 | keep_closed | skipped | related | Already closed linked context; not a target for mutation. |
| #512 | keep_closed | skipped | related | Already closed linked context; not a target for mutation. |
| #673 | keep_closed | skipped | related | Already closed linked context; not a target for mutation. |
| #804 | fix_needed | planned | canonical | No viable implementation PR exists; a narrow explicit-opt-in draft `--reply-all` fix can satisfy the issue without changing intentional no-recipient draft behavior by default. |
| cluster:issue-openclaw-gogcli-804 | build_fix_artifact | planned |  | Autonomous mode must not mutate GitHub directly; fix artifact is ready for the applicator/executor. |

## Needs Human

- none
