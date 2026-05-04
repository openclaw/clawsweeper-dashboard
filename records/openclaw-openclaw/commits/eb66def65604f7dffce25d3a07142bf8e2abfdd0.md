---
sha: eb66def65604f7dffce25d3a07142bf8e2abfdd0
parent: 5d09b4b92c4d1d03455a6de3e8eb5555eb25755d
repository: openclaw/openclaw
author: "Peter Steinberger"
committer: "Peter Steinberger"
github_author: steipete
github_committer: steipete
co_authors: ["HCL"]
commit_authored_at: "2026-05-04T01:35:14+01:00"
commit_committed_at: "2026-05-04T01:35:58+01:00"
result: findings
confidence: medium
highest_severity: low
check_conclusion: neutral
reviewed_at: 2026-05-04T00:44:22+00:00
---

# Commit eb66def

## Summary

One low-severity regression risk found: route-scoped dedupe now depends on captured text evidence, but caption-only message sends are delivered as visible text without being captured as sent text.

## Findings

### Low: Caption-only message sends can duplicate the final reply

- Kind: bug
- File: `src/agents/pi-embedded-subscribe.handlers.tools.ts`
- Line: 711
- Evidence: The message tool schema exposes `caption`, and `runMessageAction` uses `caption` as the delivered message when `message` is empty (`src/agents/tools/message-tool.ts:114`, `src/infra/outbound/message-action-runner.ts:610`). This commit changed same-route handling from whole-reply suppression to content dedupe, but the Pi tracker only records `content` or `message` as `pendingMessagingTexts`; Codex telemetry similarly reads `text`, `message`, `body`, and `content`, but not `caption` (`extensions/codex/src/app-server/dynamic-tools.ts:230`). A caption-only media send therefore records the matching target/media but no sent text, so a final payload with the same caption is not filtered by `filterMessagingToolDuplicates`.
- Impact: Agents that send media with `caption` and then produce the same caption/final text can now double-post that text to the same channel. The commit’s changelog says it should still dedupe text/media already sent by the tool, so caption-only sends miss that contract.
- Suggested fix: Treat `caption` as sent text evidence in both message-tool telemetry paths, ideally as a fallback after `message`/`content`, and attach it to `MessagingToolSend.text` for route-scoped dedupe.
- Confidence: medium

## Details

- Do we have a high-confidence way to reproduce the issue? Yes from source: use `message(action="send", target/to=..., media/path=..., caption="caption already sent")`, then return final text `caption already sent`. The tool delivery path treats `caption` as visible message text, but the new dedupe evidence does not include it.
- Is this the best way to solve the issue? Yes. Extending the existing sent-text extraction is narrower than restoring broad suppression and preserves the intended distinct-commentary behavior from #76915.

## Reviewed

- Diff: `5d09b4b92c4d1d03455a6de3e8eb5555eb25755d..eb66def65604f7dffce25d3a07142bf8e2abfdd0`
- Changed files: changelog, Codex dynamic tool telemetry, Pi messaging telemetry, auto-reply payload/followup dedupe, and related tests.
- Code read: changed production files plus message-tool schema/execution, origin routing, channel route matching, target normalization, run/followup call sites, and relevant tests.
- GitHub: issue `#76915` and PR `#76948`; commits-to-pulls lookup for this SHA returned no associated PR.
- Dependencies/web: no dependency or lockfile changes; no external web lookup needed.

## Tests / Live Checks

- `pnpm docs:list`
- `git diff --check 5d09b4b92c4d1d03455a6de3e8eb5555eb25755d..eb66def65604f7dffce25d3a07142bf8e2abfdd0`
- `pnpm install` after the first test attempt failed because `node_modules`/`vitest` were missing.
- `pnpm test src/auto-reply/reply/reply-payloads.test.ts src/auto-reply/reply/agent-runner-payloads.test.ts src/auto-reply/reply/followup-delivery.test.ts src/agents/pi-embedded-subscribe.handlers.tools.test.ts extensions/codex/src/app-server/dynamic-tools.test.ts src/agents/openclaw-owned-tool-runtime-contract.test.ts extensions/codex/src/app-server/openclaw-owned-tool-runtime-contract.test.ts`
- `pnpm test src/agents/pi-embedded-helpers.sanitizeuserfacingtext.test.ts src/auto-reply/reply/agent-runner.misc.runreplyagent.test.ts src/auto-reply/reply/followup-runner.test.ts`
- A direct `tsx -e` smoke import was attempted but was blocked by a package export error from `@mariozechner/pi-coding-agent`, so it was not used as proof.

## Dependency / Web Checks

- No package manifests, lockfiles, install scripts, or CI actions changed.
- No advisory or package-health check was needed.

## Limitations

- I did not run a live Telegram/Slack channel send. The finding is based on source-level delivery and dedupe contracts plus focused tests.

https://github.com/openclaw/openclaw/issues/76915
