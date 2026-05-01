---
repo: "openclaw/openclaw"
cluster_id: "clawsweeper-commit-openclaw-openclaw-df0ee092f017"
mode: "autonomous"
run_id: "25200373309"
run_url: "https://github.com/openclaw/clawsweeper/actions/runs/25200373309"
head_sha: "ae9562ec849256f830dee5256685c2ff001f4355"
workflow_conclusion: "success"
result_status: "planned"
published_at: "2026-05-01T03:13:21.376Z"
canonical: null
canonical_issue: null
canonical_pr: null
actions_total: 1
fix_executed: 0
fix_failed: 0
fix_blocked: 0
apply_executed: 0
apply_blocked: 1
apply_skipped: 0
needs_human_count: 0
---

# clawsweeper-commit-openclaw-openclaw-df0ee092f017

Repo: openclaw/openclaw

Run: [https://github.com/openclaw/clawsweeper/actions/runs/25200373309](https://github.com/openclaw/clawsweeper/actions/runs/25200373309)

Workflow conclusion: success

Worker result: planned

Canonical: unknown

## Summary

Found one actionable media-delivery regression: the new Gateway `send.asVoice` field is accepted and converted to `audioAsVoice`, but Telegram’s outbound payload path drops that flag before calling the Telegram sender, so Telegram sends an audio file instead of a voice note.

## Impact

| Metric | Count |
| --- | ---: |
| Worker actions | 1 |
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
| open_fix_pr | opened | https://github.com/openclaw/openclaw/pull/75383 | clawsweeper/clawsweeper-commit-openclaw-openclaw-df0ee092f017 |  |

## Apply Actions

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| #75383 | merge_canonical | blocked | fix_pr | job does not allow merge |

## Worker Action Matrix

| Target | Action | Status | Classification | Reason |
| --- | --- | --- | --- | --- |
| cluster:clawsweeper-commit-openclaw-openclaw-df0ee092f017 | build_fix_artifact | planned |  | ClawSweeper found an actionable commit-level bug/regression candidate. |

## Needs Human

- none
