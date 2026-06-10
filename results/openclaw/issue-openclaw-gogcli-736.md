---
repo: "openclaw/gogcli"
cluster_id: "issue-openclaw-gogcli-736"
mode: "autonomous"
run_id: "27276513267"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/27276513267"
head_sha: "eb2f304346618b374d9319908edbededaf6e759b"
workflow_conclusion: "failure"
result_status: "blocked"
published_at: "2026-06-10T12:45:57.840Z"
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

Run: [https://github.com/openclaw/clawsweeper/actions/runs/27276513267](https://github.com/openclaw/clawsweeper/actions/runs/27276513267)

Workflow conclusion: failure

Worker result: blocked

Canonical: https://github.com/openclaw/gogcli/issues/736

## Summary

Issue #736 is coherent, non-security-sensitive, and still reproducible at source level on current main SHA 344703bd2791ca37e16bfa0172f6447d8b1a8049. The narrow fix is to suppress MarkdownToDocsRequests' synthetic terminal newline only when a single MDParagraph replaces an inline range that excludes the existing paragraph terminator. Structural and explicit multiline markdown must retain delimiters. Implementation is blocked because the supplied checkout is read-only; focused tests also could not start because Go could not create its module cache.

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
| #736 | keep_canonical | planned | canonical | This issue is the canonical product report and should remain open until its implementation PR merges. |
| cluster:issue-openclaw-gogcli-736 | fix_needed | blocked |  | The supplied target checkout and Go cache location are read-only, so this worker cannot patch or locally validate the required PR branch. |
| cluster:issue-openclaw-gogcli-736 | build_fix_artifact | planned |  | A narrow, executable new-fix-PR plan is available despite the read-only implementation blocker. |

## Needs Human

- none
