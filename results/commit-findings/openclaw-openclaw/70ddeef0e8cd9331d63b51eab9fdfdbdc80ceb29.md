---
repo: openclaw/openclaw
sha: 70ddeef0e8cd9331d63b51eab9fdfdbdc80ceb29
report_repo: openclaw/clawsweeper
report_path: records/openclaw-openclaw/commits/70ddeef0e8cd9331d63b51eab9fdfdbdc80ceb29.md
decision: queued_for_repair
prepared_at: 2026-04-30T00:22:52.855Z
---

# Commit Finding 70ddeef0e8cd

- Decision: `queued_for_repair`
- Reason: finding is eligible for ClawSweeper repair
- Phase: prepared
- Commit: https://github.com/openclaw/openclaw/commit/70ddeef0e8cd9331d63b51eab9fdfdbdc80ceb29
- Report: https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/commits/70ddeef0e8cd9331d63b51eab9fdfdbdc80ceb29.md
- Latest main at intake: fabfab2b84d23bf3089a3fae6859f71f93bfc40e
- Job: `jobs/openclaw/inbox/clawsweeper-commit-openclaw-openclaw-70ddeef0e8cd.md`
- Run dir: `.clawsweeper-repair/runs/clawsweeper-commit-openclaw-openclaw-70ddeef0e8cd-commit-finding-2026-04-30T00-22-52-855Z`

## Finding Summary

The commit updates test expectations, but the checked-out code still returns `available: false` for the affected unauthenticated model-list rows. The focused test file now fails on `main`.
## Finalize
- Status: `success`
- Finalized at: 2026-04-30T00:27:52.760Z
- PR: https://github.com/openclaw/openclaw/pull/74695
- Worker summary: The commit updates test expectations, but the checked-out code still returns `available: false` for the affected unauthenticated model-list rows. The focused test file now fails on `main`.
