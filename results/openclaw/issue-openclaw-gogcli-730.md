---
repo: "openclaw/gogcli"
cluster_id: "issue-openclaw-gogcli-730"
mode: "autonomous"
run_id: "27281017954"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/27281017954"
head_sha: "7ad3bd8f972ea5f10f342de9c2be1831a42894d4"
workflow_conclusion: "failure"
result_status: "planned"
published_at: "2026-06-10T13:57:15.218Z"
canonical: "https://github.com/openclaw/gogcli/issues/730"
canonical_issue: "https://github.com/openclaw/gogcli/issues/730"
canonical_pr: null
actions_total: 4
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 0
apply_skipped: 0
needs_human_count: 0
---

# issue-openclaw-gogcli-730

Repo: openclaw/gogcli

Run: [https://github.com/openclaw/clawsweeper/actions/runs/27281017954](https://github.com/openclaw/clawsweeper/actions/runs/27281017954)

Workflow conclusion: failure

Worker result: planned

Canonical: https://github.com/openclaw/gogcli/issues/730

## Summary

Issue #730 is a valid, narrow non-security bug on current main SHA 344703bd2791ca37e16bfa0172f6447d8b1a8049. The table parser preserves HTML break tags verbatim, while table insertion already supports newline text and inline formatting. Plan a focused new fix PR that normalizes case-insensitive <br>, <br/>, and <br /> forms only within parsed table cells, with parser and generated-request regression tests.

## Impact

| Metric | Count |
| --- | ---: |
| Worker actions | 4 |
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
| #730 | keep_canonical | planned | canonical | Keep the source issue open as the canonical bug until the generated fix PR merges. |
| cluster:issue-openclaw-gogcli-730 | fix_needed | planned |  | The defect remains reproducible from current-main source and has a small implementation boundary. |
| cluster:issue-openclaw-gogcli-730 | build_fix_artifact | planned |  | Prepare the narrow implementation and validation plan for the writable executor. |
| cluster:issue-openclaw-gogcli-730 | open_fix_pr | planned |  | A focused fix PR is allowed and no viable existing candidate PR is present. |

## Needs Human

- none
