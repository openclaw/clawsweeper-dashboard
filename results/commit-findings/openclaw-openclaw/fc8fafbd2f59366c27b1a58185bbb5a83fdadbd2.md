---
repo: openclaw/openclaw
sha: fc8fafbd2f59366c27b1a58185bbb5a83fdadbd2
report_repo: openclaw/clawsweeper
report_path: records/openclaw-openclaw/commits/fc8fafbd2f59366c27b1a58185bbb5a83fdadbd2.md
decision: queued_for_repair
prepared_at: 2026-04-30T02:26:43.686Z
---

# Commit Finding fc8fafbd2f59

- Decision: `queued_for_repair`
- Reason: finding is eligible for ClawSweeper repair
- Phase: prepared
- Commit: https://github.com/openclaw/openclaw/commit/fc8fafbd2f59366c27b1a58185bbb5a83fdadbd2
- Report: https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/commits/fc8fafbd2f59366c27b1a58185bbb5a83fdadbd2.md
- Latest main at intake: 4329cee0c0828c7ee434c5e99d5858f9687e57fd
- Job: `jobs/openclaw/inbox/clawsweeper-commit-openclaw-openclaw-fc8fafbd2f59.md`
- Run dir: `.clawsweeper-repair/runs/clawsweeper-commit-openclaw-openclaw-fc8fafbd2f59-commit-finding-2026-04-30T02-26-43-686Z`

## Finding Summary

Found one likely regression in the new Slack select value cap. The code drops values over 75 characters, but current Slack Block Kit docs list option `value` max as 150 characters, so valid select options can disappear.
## Finalize
- Status: `success`
- Finalized at: 2026-04-30T02:32:40.217Z
- PR: https://github.com/openclaw/openclaw/pull/74755
- Worker summary: Found one likely regression in the new Slack select value cap. The code drops values over 75 characters, but current Slack Block Kit docs list option `value` max as 150 characters, so valid select options can disappear.
