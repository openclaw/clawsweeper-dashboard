---
sha: f6adc78f064150fd78e84dde55ccb7a04abefd2e
parent: b480b29dc75c20b3d2225de6d23aa19b61a5f93b
repository: openclaw/openclaw
author: "Ayaan Zaidi"
committer: "Ayaan Zaidi"
github_author: obviyus
github_committer: obviyus
co_authors: []
commit_authored_at: "2026-05-12T15:38:46+05:30"
commit_committed_at: "2026-05-12T15:54:01+05:30"
result: findings
confidence: high
highest_severity: low
check_conclusion: neutral
reviewed_at: 2026-05-12T10:32:00+00:00
---

# Commit f6adc78f06

## Summary

Found one low-severity Telegram rendering regression introduced by removing the durable outbound sanitizer wholesale.

## Findings

### Low: Common structural HTML now renders literally in Telegram replies

- Kind: regression
- File: `extensions/telegram/src/outbound-adapter.ts`
- Line: 164
- Evidence: The parent adapter ran `sanitizeForPlainText` before Telegram chunking, which converts `<br>` to `\n` and `<p>/<div>` to paragraph breaks. This commit removes that hook. A focused probe on current `main` shows `telegramOutbound.chunker?.("hello<br>world", 4000)` now returns `["hello&lt;br&gt;world"]`; with `chunkedTextFormatting: { parseMode: "HTML" }`, Telegram displays that as literal `hello<br>world`. The parent-equivalent path, `telegramOutbound.chunker?.(sanitizeForPlainText("hello<br>world"), 4000)`, returns `["hello\nworld"]`.
- Impact: Models commonly emit simple HTML line/paragraph tags. Telegram supports some HTML tags, but not `<br>` or `<p>`, so users can now see raw markup in durable Telegram replies where the base behavior produced readable line breaks.
- Suggested fix: Replace the removed generic plain-text sanitizer with a Telegram-aware normalization pass: preserve supported Telegram HTML tags, but convert common unsupported structural tags such as `<br>`, `<p>`, and `<div>` into newlines before escaping the remaining unsupported markup.
- Confidence: high

## Details

- Do we have a high-confidence way to reproduce the issue? yes: `pnpm exec tsx -e "import { telegramOutbound } from './extensions/telegram/src/outbound-adapter.ts'; import { sanitizeForPlainText } from './src/infra/outbound/sanitize-text.ts'; const input='hello<br>world'; console.log({ parentChunk: telegramOutbound.chunker?.(sanitizeForPlainText(input),4000), currentChunk: telegramOutbound.chunker?.(input,4000), formatting: telegramOutbound.chunkedTextFormatting });"`
- Is this the best way to solve the issue? unclear: restoring the old sanitizer would regress the intended `<blockquote>`/`<pre>` preservation, so the safer direction is Telegram-specific structural-tag normalization plus the current supported-tag preservation.

## Reviewed

- Diff: `b480b29dc75c20b3d2225de6d23aa19b61a5f93b..f6adc78f064150fd78e84dde55ccb7a04abefd2e`
- Changed files: `extensions/telegram/src/outbound-adapter.ts`, `extensions/telegram/src/outbound-adapter.test.ts`, `extensions/telegram/src/telegram-outbound.test.ts`
- Code read: changed files in full, `extensions/telegram/src/format.ts`, `extensions/telegram/src/send.ts`, `src/infra/outbound/deliver.ts`, `src/infra/outbound/message-plan.ts`, `src/infra/outbound/sanitize-text.ts`, adjacent tests
- Associated PR context: `#80977` body/comments/check summary read with `gh`

## Tests / Live Checks

- `git diff --check b480b29dc75c20b3d2225de6d23aa19b61a5f93b..f6adc78f064150fd78e84dde55ccb7a04abefd2e`
- `pnpm test extensions/telegram/src/outbound-adapter.test.ts extensions/telegram/src/telegram-outbound.test.ts extensions/telegram/src/format.test.ts extensions/telegram/src/send.test.ts` passed: 4 files, 134 tests
- `pnpm test extensions/telegram/src/bot-message-dispatch.test.ts` passed: 1 file, 50 tests
- Focused `tsx` formatter probes confirmed the regression above

## Dependency / Web Checks

- Local `grammy` / `@grammyjs/types` source was inspected after dependency install; `ParseMode` includes `HTML`, and the bundled Telegram Bot API type docs list supported HTML tags but not `<br>`/`<p>`.
- No external web lookup was needed for the finding.

## Limitations

- No live Telegram API call was run during this review; the finding is based on the local Telegram formatter/chunker and the documented local Bot API type surface.
