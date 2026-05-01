---
repo: openclaw/openclaw
sha: c1a42dce86cba23fb7ceb5994a83ddf82bdd754e
report_repo: openclaw/clawsweeper
report_path: records/openclaw-openclaw/commits/c1a42dce86cba23fb7ceb5994a83ddf82bdd754e.md
decision: security_route_only
prepared_at: 2026-04-29T17:55:06.547Z
---

# Commit Finding c1a42dce86cb

- Decision: `security_route_only`
- Reason: security/privacy/supply-chain signal is routed outside automatic ClawSweeper PR creation
- Phase: prepared
- Commit: https://github.com/openclaw/openclaw/commit/c1a42dce86cba23fb7ceb5994a83ddf82bdd754e
- Report: https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/commits/c1a42dce86cba23fb7ceb5994a83ddf82bdd754e.md
- Latest main at intake: 2a7d83b6ad30fc2b4f310b8ccbe2f07e23dc1dca
- Job: none
- Run dir: none

## Finding Summary

Found one concrete scope-bypass gap in the new `/focus` enforcement: it protects `:subagent:` requester keys, but not ACP sessions that are persisted as subagent envelopes with `subagentControlScope: "none"`.
## Finalize
- Status: `security_route_only`
- Finalized at: 2026-04-29T17:55:06.712Z
- PR: none
