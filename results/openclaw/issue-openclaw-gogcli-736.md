---
repo: "openclaw/gogcli"
cluster_id: "issue-openclaw-gogcli-736"
mode: "autonomous"
run_id: "27274859265"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/27274859265"
head_sha: "eb2f304346618b374d9319908edbededaf6e759b"
workflow_conclusion: "failure"
result_status: "planned"
published_at: "2026-06-10T12:21:18.013Z"
canonical: "https://github.com/openclaw/gogcli/issues/736"
canonical_issue: "https://github.com/openclaw/gogcli/issues/736"
canonical_pr: null
actions_total: 3
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 0
apply_skipped: 0
needs_human_count: 0
---

# issue-openclaw-gogcli-736

Repo: openclaw/gogcli

Run: [https://github.com/openclaw/clawsweeper/actions/runs/27274859265](https://github.com/openclaw/clawsweeper/actions/runs/27274859265)

Workflow conclusion: failure

Worker result: planned

Canonical: https://github.com/openclaw/gogcli/issues/736

## Summary

Source inspection confirms the synthetic newline comes from `MarkdownToDocsRequests` rendering every `MDParagraph` as a terminated paragraph. The safe fix belongs only in range replacement: detect a single inline paragraph, remove its final delimiter, and clamp formatting ranges to the shortened insertion while preserving structural and multiline markdown.

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
| #736 | keep_canonical | planned | canonical | This is the sole canonical report and remains applicable on the preflight main SHA. |
| cluster:issue-openclaw-gogcli-736 | fix_needed | planned |  | A new focused implementation PR is needed; no viable candidate PR exists. |
| cluster:issue-openclaw-gogcli-736 | build_fix_artifact | planned |  | The executor can implement this as one small PR from the configured target branch. |

## Needs Human

- none
