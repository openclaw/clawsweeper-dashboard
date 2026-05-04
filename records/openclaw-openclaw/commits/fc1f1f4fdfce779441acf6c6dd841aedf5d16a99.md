---
sha: fc1f1f4fdfce779441acf6c6dd841aedf5d16a99
parent: 0b3a86cab01e51eb208c9444ddcb3c711f3db1cd
repository: openclaw/openclaw
author: "Dallin Romney"
committer: "GitHub"
github_author: RomneyDa
github_committer: web-flow
co_authors: []
commit_authored_at: "2026-05-04T21:50:40+08:00"
commit_committed_at: "2026-05-04T21:50:40+08:00"
result: findings
confidence: medium
highest_severity: low
check_conclusion: neutral
reviewed_at: 2026-05-04T13:58:39+00:00
---

# Commit fc1f1f4

## Summary

Found one low-severity edge case in the new code-aware sanitizer: unclosed fenced code blocks are still treated as prose by the sanitizer, even though the TUI markdown renderer treats them as code.

## Findings

### Low: Unclosed fenced code blocks still get long code tokens split

- Kind: bug
- File: `src/tui/tui-formatters.ts`
- Line: 24
- Evidence: `FENCED_CODE_RE` only matches fences that have a later closing fence, and `transformOutsideCode` only exempts those matched segments from `LONG_TOKEN_RE` chunking. The TUI’s `Markdown` component uses `marked`, and a local `Marked().lexer("```bash\n" + "a".repeat(40))` probe tokenized the unclosed fence as a `code` token. A source-level probe with the new regexes transforms ` ```bash\naaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa ` into ` ```bash\naaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaa `.
- Impact: Truncated or malformed assistant output, and streaming states before a closing fence arrives, can still display inserted literal spaces inside code that the renderer considers a code block. That preserves the same copy/paste corruption this commit is trying to eliminate for long camelCase/all-letter code tokens.
- Suggested fix: Treat an opening fenced-code marker as a code segment through EOF when no matching closing fence exists, matching the renderer’s behavior.
- Confidence: medium

## Details

- Do we have a high-confidence way to reproduce the issue? Yes for the source behavior: the new fence regex requires a closing fence, while the local `marked` parser used by `@mariozechner/pi-tui` accepts unclosed fences as code. I did not run a live terminal copy/paste repro.
- Is this the best way to solve the issue? Yes; aligning the sanitizer’s fence partitioning with the renderer avoids broadening copy-sensitive token heuristics further.

## Reviewed

- Diff: `0b3a86cab01e51eb208c9444ddcb3c711f3db1cd..fc1f1f4fdfce779441acf6c6dd841aedf5d16a99`
- Changed files: `CHANGELOG.md`, `src/tui/tui-formatters.ts`, `src/tui/tui-formatters.test.ts`
- Code read: full changed formatter/test files, TUI stream assembler, TUI command/tool output sanitizer callers, `@mariozechner/pi-tui` markdown renderer source
- Dependencies/web: GitHub PR #77335 and issues #48432/#39505 via `gh`; local `marked`/`pi-tui` dependency source only
- Commands: `pnpm docs:list`; `git show`; `git diff`; `gh pr view 77335`; `gh issue view 48432`; `gh issue view 39505`; `pnpm install`; `pnpm test src/tui/tui-formatters.test.ts`; `pnpm test src/tui/tui-formatters.test.ts src/tui/tui-stream-assembler.test.ts src/tui/tui-event-handlers.test.ts src/tui/components/chat-log.test.ts`; `git diff --check ...`; `pnpm exec oxfmt --check --threads=1 ...`; focused Node regex/Marked probes

## Tests / Live Checks

- Formatter tests passed: 47/47.
- Adjacent TUI tests passed: 116/116 across formatter, stream assembler, event handlers, and chat log.
- Formatting and diff whitespace checks passed.

## Limitations

- No live interactive TUI render/copy test was run.
- The direct ad hoc import of `sanitizeRenderableText` with `tsx -e` failed on a package export issue, so the edge probe mirrored the changed sanitizer regex/helper logic rather than importing the private helper path directly.

https://github.com/openclaw/openclaw/pull/77335
