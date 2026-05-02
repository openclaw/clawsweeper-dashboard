---
sha: 127da4c3caa319dbf5aae5cae3784cc46b3e2de0
parent: 803b7ab8085d444d52d42a114490093eade0e00c
repository: openclaw/openclaw
author: "Peter Steinberger"
committer: "Peter Steinberger"
github_author: steipete
github_committer: steipete
co_authors: []
commit_authored_at: "2026-05-02T09:53:19+01:00"
commit_committed_at: "2026-05-02T09:54:09+01:00"
result: findings
confidence: high
highest_severity: low
check_conclusion: neutral
reviewed_at: 2026-05-02T09:13:43Z
---

# Commit 127da4c3ca

## Summary

Found one low-severity incomplete-fix bug: Discord attachment names with special characters can still lose the true original filename because the new call passes `attachment.filename` but ignores Discord's `attachment.title`.

## Findings

### Low: Discord attachment titles with original special-character filenames are ignored

- Kind: bug
- File: `extensions/discord/src/monitor/message-media.ts`
- Line: 298
- Evidence: The commit now passes `attachment.filename` into `saveMediaBuffer`, but `discord-api-types@0.38.47` declares `APIAttachment.title?: string` as the original upload filename with special characters preserved when `filename` is sanitized. Current Discord media code has no attachment `title` handling, while `saveMediaBuffer` already sanitizes and preserves Unicode filename bases safely.
- Impact: Users who upload files with Cyrillic or other special characters can still get a sanitized Discord filename in the saved inbound media path instead of the human-readable original name, so the issue fixed by this commit remains partially unresolved for those attachments.
- Suggested fix: Prefer a normalized `attachment.title` over `attachment.filename` for both the save filename hint and, where appropriate, the fetch path hint, then add a Discord media test with `{ filename: "sanitized.txt", title: "отчет.txt" }` asserting `saveMediaBuffer` receives the title.
- Confidence: high

## Details

- Do we have a high-confidence way to reproduce the issue? yes. Use the existing mocked `resolveMediaList` test shape with an `APIAttachment` containing both `filename` and `title`; current code reaches `saveMediaBuffer(..., attachment.filename)` and never reads `title`.
- Is this the best way to solve the issue? yes. The core media store already sanitizes untrusted original filenames and keeps Unicode letters/numbers, so the narrow Discord-owned fix is to select the dependency-provided original name before crossing into the existing media-save contract.

## Reviewed

- Diff: `803b7ab8085d444d52d42a114490093eade0e00c..127da4c3caa319dbf5aae5cae3784cc46b3e2de0`
- Changed files: `CHANGELOG.md`, `extensions/discord/src/monitor/message-media.ts`, `extensions/discord/src/monitor/message-utils.test.ts`
- Code read: full Discord media resolver, message utility tests, forwarded-message helpers, Discord message handler call path, media fetch helper, media store filename sanitization/preservation path
- Dependencies/web: inspected installed `discord-api-types@0.38.47` declarations and npm tarball metadata; no advisory or package-health check was needed because the commit did not change dependencies
- Related issue: https://github.com/openclaw/openclaw/issues/59744

## Tests / Live Checks

- `pnpm test extensions/discord/src/monitor/message-utils.test.ts` passed: 44 tests
- `pnpm test src/media/store.test.ts` passed: 34 tests
- `git diff --check 803b7ab8085d444d52d42a114490093eade0e00c..127da4c3caa319dbf5aae5cae3784cc46b3e2de0` passed
- `pnpm install` was needed because dependencies were missing; lockfile stayed clean

## Dependency / Web Checks

- `discord-api-types@0.38.47` confirms `APIAttachment.filename: string` and `APIAttachment.title?: string`, where `title` preserves special characters when `filename` is sanitized.
- `APIStickerItem` is only `id`, `name`, and `format_type`, so the same title issue does not apply to stickers.

## Limitations

- No live Discord gateway attachment event was run.
- Focused tests ran under local Node `v24.14.1`, while repo guidance targets Node 22+.
