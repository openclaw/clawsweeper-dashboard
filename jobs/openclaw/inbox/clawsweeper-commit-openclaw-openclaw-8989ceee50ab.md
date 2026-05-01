---
repo: openclaw/openclaw
cluster_id: clawsweeper-commit-openclaw-openclaw-8989ceee50ab
mode: autonomous
allowed_actions:
  - comment
  - label
  - fix
  - raise_pr
blocked_actions:
  - close
  - merge
require_human_for:
  - close
  - merge
canonical: []
candidates: []
cluster_refs: []
allow_instant_close: false
allow_fix_pr: true
allow_merge: false
allow_unmerged_fix_close: false
allow_post_merge_close: false
require_fix_before_close: false
security_policy: central_security_only
security_sensitive: false
target_branch: clawsweeper/clawsweeper-commit-openclaw-openclaw-8989ceee50ab
source: clawsweeper_commit
commit_sha: 8989ceee50abd77c33352e36468b341f40591a5e
clawsweeper_report_repo: openclaw/clawsweeper
clawsweeper_report_path: records/openclaw-openclaw/commits/8989ceee50abd77c33352e36468b341f40591a5e.md
---

# ClawSweeper commit finding repair

ClawSweeper Repair should create or update one implementation PR from `clawsweeper/clawsweeper-commit-openclaw-openclaw-8989ceee50ab`
if the finding is still valid on latest `openclaw/openclaw@main`.

## Operator Prompt

Use the ClawSweeper commit report below as the source finding. Do not redo a
broad audit of the commit. Check latest `main`, verify the reported problem is
still present, and make the narrowest safe fix. If latest `main` already fixed
it, make no code changes and report that outcome.

Do not merge. Do not close issues. Do not handle security-sensitive findings in
this lane.

## Commit Finding

- Commit: https://github.com/openclaw/openclaw/commit/8989ceee50abd77c33352e36468b341f40591a5e
- Report: https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/commits/8989ceee50abd77c33352e36468b341f40591a5e.md
- Latest main at intake: d0a798663856a72595b49936b8d6042a6a7bcd88

## ClawSweeper Report

```md
---
sha: 8989ceee50abd77c33352e36468b341f40591a5e
parent: ce833acbdba4681ac3c4b12391703492eeee17aa
repository: openclaw/openclaw
author: "Peter Steinberger"
committer: "GitHub"
github_author: steipete
github_committer: web-flow
co_authors: ["Peter Steinberger"]
commit_authored_at: "2026-05-01T03:52:23+01:00"
commit_committed_at: "2026-05-01T02:52:23Z"
result: findings
confidence: high
highest_severity: medium
check_conclusion: neutral
reviewed_at: 2026-05-01T03:11:12Z
---

# Commit 8989cee

## Summary

Found one regression: the commit removes the runtime warning for the default group/channel private-reply behavior, but the new doctor warning only covers the narrower “message tool unavailable” mismatch. A common upgraded config with channels configured and the message tool available still gets no runtime warning and no doctor warning, while normal final replies remain private.

## Findings

### Medium: Doctor no longer warns about the default group/channel private-reply change when the message tool is available

- Kind: regression
- File: `src/commands/doctor/shared/preview-warnings.ts`
- Line: 151
- Evidence: `resolveSourceReplyDeliveryMode` still defaults group/channel turns with no `messages.groupChat.visibleReplies` or global override to `message_tool_only` (`src/auto-reply/reply/source-reply-delivery-mode.ts:27`). The old code emitted a one-shot runtime warning for that default when the message tool was available; this commit removes it. The replacement doctor path first computes unavailable message-tool targets and returns `[]` when there are none (`src/commands/doctor/shared/preview-warnings.ts:151`), and the new test explicitly asserts no warning for a configured Slack channel under `tools.profile: "messaging"` (`src/commands/doctor/shared/preview-warnings.test.ts:473`). A focused live check confirmed the gap: for `{ channels: { slack: {} } }`, `collectVisibleReplyToolPolicyWarnings(...)` returns `[]` while `resolveSourceReplyDeliveryMode(... ChatType: "channel", messageToolAvailable: true)` returns `"message_tool_only"`.
- Impact: users affected by the 4.27+ default change can still see group/channel final replies disappear from the room without either the removed runtime warning or the promised doctor hint, as long as the message tool is available. That is the normal/default policy case, not an edge case.
- Suggested fix: split the warnings. Keep the new mismatch warning for unavailable `message`, but also emit a doctor advisory when group/channel visible replies are defaulted to `"message_tool"` and any channel config exists, regardless of message-tool availability. The advisory should point to `messages.groupChat.visibleReplies: "automatic"` for legacy automatic room posting.
- Confidence: high

## Details

- Do we have a high-confidence way to reproduce the issue? yes: run `pnpm exec tsx -e 'import { collectVisibleReplyToolPolicyWarnings } from "./src/commands/doctor/shared/preview-warnings.ts"; import { resolveSourceReplyDeliveryMode } from "./src/auto-reply/reply/source-reply-delivery-mode.ts"; const cfg={channels:{slack:{}}}; console.log(JSON.stringify({warnings: collectVisibleReplyToolPolicyWarnings(cfg as any), mode: resolveSourceReplyDeliveryMode({cfg: cfg as any, ctx:{ChatType:"channel"}, messageToolAvailable:true})}, null, 2));'`. It prints empty warnings and `message_tool_only`.
- Is this the best way to solve the issue? yes: the runtime behavior and the unavailable-tool fallback are separate cases, so doctor should report the default-private behavior independently from the tool-policy mismatch.

## Reviewed

- Diff: `ce833acbdba4681ac3c4b12391703492eeee17aa..8989ceee50abd77c33352e36468b341f40591a5e`
- Changed files: `CHANGELOG.md`, `docs/channels/groups.md`, `docs/gateway/config-channels.md`, `src/auto-reply/reply/source-reply-delivery-mode.ts`, `src/auto-reply/reply/source-reply-delivery-mode.test.ts`, `src/commands/doctor/shared/preview-warnings.ts`, `src/commands/doctor/shared/preview-warnings.test.ts`
- Code read: full changed source/tests, `dispatch-from-config.ts` call path, tool policy helpers, doctor preview/repair flow
- GitHub: PR #75367, related issue #74876 and PR #73046

## Tests / Live Checks

- `pnpm install`
- `pnpm test src/auto-reply/reply/source-reply-delivery-mode.test.ts src/commands/doctor/shared/preview-warnings.test.ts` passed.
- Focused `pnpm exec tsx -e ...` reproduction confirmed the missing warning.

## Limitations

- I did not run broad changed gates; this was a report-only review and focused tests covered the touched runtime/doctor warning path.
```
