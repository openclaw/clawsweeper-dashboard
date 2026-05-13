---
sha: b7e0decf0cd3cef742c02b9e8ad58cefd3c8c3a9
parent: e3a428078814bb7865ded1b6473fcbaa63d45c9a
repository: openclaw/openclaw
author: "Pavan Kumar Gondhi"
committer: "GitHub"
github_author: pgondhi987
github_committer: web-flow
co_authors: []
commit_authored_at: "2026-05-13T07:16:27+05:30"
commit_committed_at: "2026-05-13T07:16:27+05:30"
result: findings
confidence: high
highest_severity: low
check_conclusion: neutral
reviewed_at: 2026-05-13T01:52:37+00:00
---

# Commit b7e0dec

## Summary

The code change correctly narrows iMessage sender allowlist matching and the focused regression tests pass. I found one remaining public-docs/config contract mismatch from the same behavior change.

## Findings

### Low: Config reference still shows `chat_id` in iMessage `allowFrom`

- Kind: compatibility
- File: `docs/gateway/config-channels.md`
- Line: 604
- Evidence: The config reference still documents `allowFrom: ["+15555550123", "user@example.com", "chat_id:123"]`. This commit changes setup validation to reject chat-target entries in `allowFrom` (`extensions/imessage/src/setup-core.ts:55`) and changes sender matching so conversation targets no longer prove sender identity (`extensions/imessage/src/targets.ts:168`). The updated iMessage channel page now says `allowFrom` must identify senders and chat targets belong in `groupAllowFrom` or `groups` (`docs/channels/imessage.md:220`), so the gateway config reference contradicts the new contract.
- Impact: Operators following the config reference can copy a now-invalid or ineffective `allowFrom` entry. Under the new runtime, `chat_id:123` will not authorize DM sender checks or owner-command sender identity, which is a migration/config regression rather than a security widening.
- Suggested fix: Update the iMessage example in `docs/gateway/config-channels.md` to keep `allowFrom` to sender handles/access groups, and add `groupAllowFrom` or `groups` examples for chat targets if needed.
- Confidence: high

## Details

- Do we have a high-confidence way to reproduce the issue? yes. Read the stale config example at `docs/gateway/config-channels.md:604`, then compare it with the new setup/runtime behavior in `extensions/imessage/src/setup-core.ts:55` and `extensions/imessage/src/targets.ts:168`.
- Is this the best way to solve the issue? yes. The code behavior appears intentional and tested; the fix is to align the remaining public config reference.

## Reviewed

- Diff: `e3a428078814bb7865ded1b6473fcbaa63d45c9a..b7e0decf0cd3cef742c02b9e8ad58cefd3c8c3a9`
- Changed files: changelog, iMessage docs/setup/targets/monitor gating, shared chat target matcher, SDK allow-from tests.
- Code read: changed files in full or around relevant call paths; `src/channels/message-access/*` ingress resolver/decision/state/sender gates; iMessage monitor provider and inbound processing.
- GitHub: inspected PR #80898 metadata and prior review comments.
- Dependencies/web: no dependency changes; no external web lookup needed.

## Tests / Live Checks

- `pnpm test extensions/imessage/src/targets.test.ts extensions/imessage/src/monitor.gating.test.ts src/channels/plugins/chat-target-prefixes.test.ts src/plugin-sdk/allow-from.test.ts -- --reporter=verbose` passed: 58 tests across 4 files.
- `pnpm docs:list` ran and confirmed the relevant iMessage/config docs.
- `git diff --check e3a428078814bb7865ded1b6473fcbaa63d45c9a..b7e0decf0cd3cef742c02b9e8ad58cefd3c8c3a9` passed.

## Dependency / Web Checks

- No package or lockfile changes in the reviewed diff.
- No web evidence was needed for the finding.

## Limitations

- I did not run live iMessage/BlueBubbles behavior; this review used source tracing plus focused unit/regression tests.
