---
sha: 22d979f0abcbdfab2de19fb659db20ea229ad52f
parent: a3afd0ac3f4f675e1a0bcb2afc1476ce0098f47f
repository: openclaw/openclaw
author: "Peter Steinberger"
committer: "Peter Steinberger"
github_author: steipete
github_committer: steipete
co_authors: []
commit_authored_at: "2026-05-10T18:26:47+01:00"
commit_committed_at: "2026-05-10T18:26:52+01:00"
result: findings
confidence: high
highest_severity: low
check_conclusion: neutral
reviewed_at: 2026-05-10T17:32:09+00:00
---

# Commit 22d979f

## Summary

One low-severity test regression found. Runtime Slack message-action code was not changed.

## Findings

### Low: Slack block assertions now allow unexpected extra blocks or elements

- Kind: test_gap
- File: `extensions/slack/src/message-action-dispatch.test.ts`
- Line: 73
- Evidence: The old tests used exact array assertions for `action.blocks` and nested `elements`, so extra Slack blocks/elements would fail. The new helpers only check `blockAt(action, 0)`, `blockAt(action, 1)`, and `elementAt(..., 0)` at lines 73-77, 112-118, and 153-155. That preserves ordering checks but no longer asserts the block or element counts.
- Impact: A future regression that duplicates/appends Slack presentation or interactive blocks could still pass these tests, even though `message-action-dispatch.ts` builds `blocks` directly from presentation plus interactive blocks and these cases expect exactly the rendered blocks.
- Suggested fix: Keep the helper style, but add `expect(action.blocks).toHaveLength(...)` and element length checks for the affected cases, or have `blockAt`/a new helper return a typed blocks array after asserting exact length.
- Confidence: high

## Details

- Do we have a high-confidence way to reproduce the issue? yes; by assertion semantics, appending an extra block after the expected blocks would pass the current indexed checks but would have failed the previous exact `toEqual([...])` array assertions.
- Is this the best way to solve the issue? yes; restoring exact count assertions keeps the clearer non-broad matcher style without losing the previous coverage.

## Reviewed

- Diff: `a3afd0ac3f4f675e1a0bcb2afc1476ce0098f47f..22d979f0abcbdfab2de19fb659db20ea229ad52f`
- Changed files: `extensions/slack/src/message-action-dispatch.test.ts`
- Code read: `extensions/slack/src/message-action-dispatch.test.ts`, `extensions/slack/src/message-action-dispatch.ts`, `extensions/slack/src/channel-actions.ts`
- Dependencies/web: no dependency files changed; no web lookup needed.
- Commands: `git show --no-patch --format=fuller 22d979f0abcbdfab2de19fb659db20ea229ad52f`, `git diff --stat ...`, `git diff ... -- extensions/slack/src/message-action-dispatch.test.ts`, `pnpm install`, `pnpm test extensions/slack/src/message-action-dispatch.test.ts -- --reporter=verbose`, `git diff --check ...`

## Tests / Live Checks

- Initial focused test failed because `node_modules` was missing and `vitest/package.json` could not be resolved.
- After `pnpm install`, `pnpm test extensions/slack/src/message-action-dispatch.test.ts -- --reporter=verbose` passed: 17 tests passed.

## Dependency / Web Checks

- No package or lockfile changes in the reviewed commit.
- Web/advisory checks were not relevant to this test-only change.

## Limitations

- I did not run the full suite because the commit only edits one Slack test file and the focused test passed.
