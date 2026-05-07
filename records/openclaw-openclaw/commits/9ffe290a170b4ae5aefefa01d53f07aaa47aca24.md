---
sha: 9ffe290a170b4ae5aefefa01d53f07aaa47aca24
parent: 62ccd8b644ebeade4c12091980b60686cc92e660
repository: openclaw/openclaw
author: "Val Alexander"
committer: "GitHub"
github_author: BunsDev
github_committer: web-flow
co_authors: []
commit_authored_at: "2026-05-07T02:39:01-05:00"
commit_committed_at: "2026-05-07T02:39:01-05:00"
result: findings
confidence: high
highest_severity: low
check_conclusion: neutral
reviewed_at: 2026-05-07T07:45:54Z
---

# Commit 9ffe290

## Summary

Found two low-severity native chat picker regressions around the newly supported provider-specific thinking levels.

## Findings

### Low: macOS drops persisted `max` thinking level on reopen

- Kind: bug
- File: `apps/macos/Sources/OpenClaw/WebChatSwiftUI.swift`
- Line: 366
- Evidence: `onThinkingLevelChanged` persists every selected level to `UserDefaults` at lines 260-263, and this commit makes `max` a valid decoded/picker level. But `persistedThinkingLevel()` only accepts `off`, `minimal`, `low`, `medium`, `high`, `xhigh`, and `adaptive`, so a saved `max` returns `nil` on the next `WebChatSwiftUIWindowController` init.
- Impact: users can select `max` for a supporting provider/model, but macOS will not restore that explicit chat preference after reopening the native chat window or applying it to a fresh session.
- Suggested fix: add `max` to the persisted allowlist, ideally with a small WebChatSwiftUI persistence test.
- Confidence: high

### Low: model switches lose provider-specific thinking options until refresh

- Kind: bug
- File: `apps/shared/OpenClawKit/Sources/OpenClawChatUI/ChatViewModel.swift`
- Line: 1056
- Evidence: after a successful model picker change, `applySuccessfulModelSelection()` updates the local session and immediately calls `syncThinkingLevelOptions()`. `updateCurrentSessionModel()` rebuilds the row with only `modelProvider`, `model`, and `contextTokens`, dropping `thinkingLevels`, `thinkingOptions`, and `thinkingDefault`. For a non-default selected model, `resolvedThinkingLevelOptions()` then cannot use defaults and falls back to base levels plus current. The macOS transport also ignores `sessions.changed`, so no automatic row refresh repairs this.
- Impact: switching the native picker to a model that supports `xhigh`/`max` can leave the thinking picker without those supported options until a manual refresh/reopen, undermining the new gateway-metadata-driven picker.
- Suggested fix: refresh sessions after a successful model patch, or carry resolved thinking metadata in the patch response and update the local row before syncing options.
- Confidence: medium

## Details

- Do we have a high-confidence way to reproduce the issue? Yes by source inspection. The first path is `select max -> UserDefaults stores max -> new controller calls persistedThinkingLevel() -> nil`. The second path is `select non-default model with provider-specific thinking levels -> local row metadata is dropped -> sync falls back to base options`.
- Is this the best way to solve the issue? Yes for the first finding. For the second, a session refresh after model patch is the simplest safe fix unless maintainers want to extend `sessions.patch` to return thinking metadata.

## Reviewed

- Diff: `62ccd8b644ebeade4c12091980b60686cc92e660..9ffe290a170b4ae5aefefa01d53f07aaa47aca24`
- Changed files: `CHANGELOG.md`, `apps/macos/Sources/OpenClaw/WebChatSwiftUI.swift`, `apps/shared/OpenClawKit/Sources/OpenClawChatUI/ChatComposer.swift`, `apps/shared/OpenClawKit/Sources/OpenClawChatUI/ChatSessions.swift`, `apps/shared/OpenClawKit/Sources/OpenClawChatUI/ChatViewModel.swift`, `apps/shared/OpenClawKit/Tests/OpenClawKitTests/ChatViewModelTests.swift`
- Code read: changed Swift files, current gateway `sessions.list`, `chat.history`, `sessions.patch`, session utility types/tests, PR #40878 review context.
- Dependencies/web: no external web lookup needed; no dependency files changed.
- Commands: `pnpm docs:list`, `git show`, `git diff`, `gh pr view 40878`, `git diff --check`, focused Swift test command below.

## Tests / Live Checks

- `git diff --check 62ccd8b644ebeade4c12091980b60686cc92e660..9ffe290a170b4ae5aefefa01d53f07aaa47aca24` passed.
- `swift test --package-path apps/shared/OpenClawKit --filter ChatViewModelTests --no-parallel` could not run on this Linux host because `ElevenLabsKit` imports Apple-only `AudioToolbox`.

## Limitations

- No macOS/iOS runtime check was possible on this Linux review host.
- Swift package test dependencies were fetched during the attempted focused test, but the worktree remains clean.

https://github.com/openclaw/openclaw/commit/9ffe290a170b4ae5aefefa01d53f07aaa47aca24
