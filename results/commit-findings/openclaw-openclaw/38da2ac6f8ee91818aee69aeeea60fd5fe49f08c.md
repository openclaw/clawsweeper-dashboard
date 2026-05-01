---
repo: openclaw/openclaw
sha: 38da2ac6f8ee91818aee69aeeea60fd5fe49f08c
report_repo: openclaw/clawsweeper
report_path: records/openclaw-openclaw/commits/38da2ac6f8ee91818aee69aeeea60fd5fe49f08c.md
decision: security_route_only
prepared_at: 2026-05-01T02:18:06.314Z
---

# Commit Finding 38da2ac6f8ee

- Decision: `security_route_only`
- Reason: security/privacy/supply-chain signal is routed outside automatic ClawSweeper PR creation
- Phase: prepared
- Commit: https://github.com/openclaw/openclaw/commit/38da2ac6f8ee91818aee69aeeea60fd5fe49f08c
- Report: https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/commits/38da2ac6f8ee91818aee69aeeea60fd5fe49f08c.md
- Latest main at intake: 6bc3458222aa9d096519b4b36776be4a50146252
- Job: none
- Run dir: none

## Finding Summary

Found one remaining model-routing bug in the commitment extractor batching path. The single-agent fix works, but mixed-agent batches can still run later agents' hidden extraction on the first queued agent's provider/model.
## Finalize
- Status: `security_route_only`
- Finalized at: 2026-05-01T02:18:06.550Z
- PR: none
