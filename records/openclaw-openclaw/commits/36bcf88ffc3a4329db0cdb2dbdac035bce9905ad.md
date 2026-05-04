---
sha: 36bcf88ffc3a4329db0cdb2dbdac035bce9905ad
parent: 9c3b7b7b151b7ecdf5b18ebbb8967f26886d9346
repository: openclaw/openclaw
author: "Vincent Koc"
committer: "Vincent Koc"
github_author: vincentkoc
github_committer: vincentkoc
co_authors: []
commit_authored_at: "2026-05-03T17:54:46-07:00"
commit_committed_at: "2026-05-03T17:55:03-07:00"
result: findings
confidence: medium
highest_severity: low
check_conclusion: neutral
reviewed_at: 2026-05-04T01:02:18Z
---

# Commit 36bcf88

## Summary

One low-severity QA false-positive risk found in the relaxed Matrix tool-progress error matcher.

## Findings

### Low: Matrix error progress check now accepts wrong target-name suffixes

- Kind: test_gap
- File: `extensions/qa-matrix/src/runners/contract/scenario-runtime-room.ts`
- Line: 964
- Evidence: The new matcher is `\bread\s*:?\s*from\s+\S*missing-matrix-tool-progress-target\.txt\b`. Because `\S*` can consume any non-space prefix immediately before the basename, the scenario accepts a different target such as `Read: from /tmp/qa/workspace/not-missing-matrix-tool-progress-target.txt`. A focused regex smoke check confirmed that string returns `true`.
- Impact: The live Matrix QA error-progress scenario can pass even if the tool progress preview reports a read against a different filename that merely contains the requested target as a suffix. That weakens this release QA check’s ability to prove the prompt drove the expected missing-file read.
- Suggested fix: Keep path-qualified support, but require either no path prefix or a path separator before the exact basename, and require a real terminator after `.txt`, for example an end, whitespace, backtick, or closing punctuation boundary.
- Confidence: medium

## Details

- Do we have a high-confidence way to reproduce the issue? yes; evaluating the committed regex against `Read: from /tmp/qa/workspace/not-missing-matrix-tool-progress-target.txt` returns `true`.
- Is this the best way to solve the issue? yes; tightening only the basename boundary preserves the intended path-qualified Matrix progress acceptance without accepting unrelated suffix filenames.

## Reviewed

- Diff: `9c3b7b7b151b7ecdf5b18ebbb8967f26886d9346..36bcf88ffc3a4329db0cdb2dbdac035bce9905ad`
- Changed files: `CHANGELOG.md`, `extensions/qa-matrix/src/runners/contract/scenario-runtime-room.ts`, `extensions/qa-matrix/src/runners/contract/scenarios.test.ts`
- Code read: Matrix QA tool-progress runtime, prompt builder, adjacent Matrix QA scenario tests, extension scoped instructions.
- Dependencies/web: no external dependency or web lookup needed; this is a local QA regex/test change.

## Tests / Live Checks

- `pnpm docs:list`
- `pnpm install` after missing dev dependencies blocked checks
- `pnpm test extensions/qa-matrix/src/runners/contract/scenarios.test.ts -t "finalizes Matrix tool progress previews after tool errors"` passed
- `pnpm exec oxfmt --check --threads=1 extensions/qa-matrix/src/runners/contract/scenario-runtime-room.ts extensions/qa-matrix/src/runners/contract/scenarios.test.ts CHANGELOG.md` passed
- `git diff --check 9c3b7b7b151b7ecdf5b18ebbb8967f26886d9346..36bcf88ffc3a4329db0cdb2dbdac035bce9905ad` passed

## Limitations

- Did not run the full Matrix live QA harness; the finding is from static/runtime regex evidence and the focused mocked scenario test.
