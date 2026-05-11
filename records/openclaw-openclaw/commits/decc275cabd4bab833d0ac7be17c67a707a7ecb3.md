---
sha: decc275cabd4bab833d0ac7be17c67a707a7ecb3
parent: c3de52ab607956673258c2dc9ea9449a8db19970
repository: openclaw/openclaw
author: "@shakkernerd"
committer: "@shakkernerd"
github_author: "shakkernerd"
github_committer: "shakkernerd"
co_authors: []
commit_authored_at: "2026-05-11T02:39:48+01:00"
commit_committed_at: "2026-05-11T02:39:48+01:00"
result: failed
confidence: low
highest_severity: none
check_conclusion: neutral
reviewed_at: 2026-05-11T01:43:17.429Z
---

# Commit decc275cabd4

Commit review failed before a reliable report could be produced.

## Failure

```
exit 1
ipete --since 7d
pnpm commit-reports -- --since 24h --json
```

Results: `nothing_found`, `findings`, `inconclusive`, `failed`,
`skipped_non_code`. One report per SHA; reruns overwrite the SHA-named report.

Manual rerun/backfill:

```bash
gh workflow run commit-review.yml --repo openclaw/clawsweeper \
  -f target_repo=openclaw/openclaw \
  -f commit_sha=<end-sha> \
  -f before_sha=<start-or-parent-sha> \
  -f create_checks=false \
  -f enabled=true
```

Use `create_checks=true` only when the requester explicitly wants target commit Check
Runs. Add `-f additional_prompt="..."` for focused one-off review instructions.

## Sweep Reports

Issue/PR reports live at:

```text
records/<repo-slug>/items/<number>.md
records/<repo-slug>/closed/<number>.md
```

Lead with counts, concrete findings, and report links. Do not post unsolicited
GitHub comments from report-reading work. Public surfaces are markdown reports,
durable ClawSweeper review comments, and optional checks.

PR reports include Codex `/review`-style `reviewFindings` with priority,
confidence, repository-relative file, and line range. Public PR comments show a
short `Review findings:` list when findings exist; full review comments,
evidence links, likely owners, and runtime details stay inside the collapsed
`Review details` block.

Useful commands:

```bash
pnpm run status
pnpm run audit
pnpm run reconcile
pnpm run apply-decisions -- --dry-run
```

## Create One Repair Job

Create a job from issue/PR refs and a maintainer prompt:

```bash
pnpm run repair:create-job -- \
  --repo openclaw/openclaw \
  --refs 123,456 \
  --prompt-file /tmp/clawsweeper-prompt.md
```

Create from an existing ClawSweeper report:

```bash
pnpm run repair:create-job -- \
  --from-report ../clawsweeper/records/openclaw-openclaw/items/123.md
```

The job creator checks for an existing open PR, body match, or remote
`clawsweeper/<cluster-id>` branch before writing another job. Use `--dry-run`
to inspect. Use `--force` only after deciding the duplicate guard is stale.

Validate, commit, then dispatch:

```bash
pnpm run repair:validate-job -- jobs/openclaw/inbox/clawsweeper-openclaw-openclaw-123.md
pnpm run repair:dispatch -- jobs/openclaw/inbox/clawsweeper-openclaw-openclaw-123.md \
  --mode autonomous \
  --runner blacksmith-4vcpu-ubuntu-2404 \
  --execution-runner blacksmith-16vcpu-ubuntu-2404 \
  --model gpt-5.5
```

Do not dispatch a just-created job before the job file is committed and pushed;
the workflow reads the job path from GitHub.

## Replacement PRs

For a useful but uneditable/stale/unsafe source PR, make the maintainer prompt
explicit:

```md
Treat #123 as useful source work. If the source branch cannot be safely updated
because it is uneditable, stale, draft-only, unmergeable, or unsafe, create a
narrow ClawSweeper replacement PR instead of waiting. Preserve the source PR
author as co-author, credit the source PR in the replacement PR body, and close
only that source PR after the replacement PR is opened.
```

The worker should emit `repair_strategy=replace_uneditable_branch` and list the
source PR URL in `source_prs`. The deterministic executor opens or updates
`clawsweeper/<cluster-id>`, adds non-bot source authors as `Co-authored-by`
trailers, and closes superseded source PRs only after replacement exists.

## Gates

Open execution windows intentionally and close them after the run:

```bash
gh variable set CLAWSWEEPER_ALLOW_EXECUTE --repo openclaw/clawsweeper --body 1
gh variable set CLAWSWEEPER_ALLOW_FIX_PR --repo openclaw/clawsweeper --body 1
gh variable set CLAWSWEEPER_ALLOW_MERGE --repo openclaw/clawsweeper --body 1
gh variable set CLAWSWEEPER_ALLOW_AUTOMERGE --repo openclaw/clawsweeper --body 1
```

Reset gates only when explicitly requested; the active maintainer window may intentionally
leave them at `1`.

Important gates:

- `CLAWSWEEPER_ALLOW_EXECUTE`: allows deterministic write lanes.
- `CLAWSWEEPER_ALLOW_FIX_PR`: allows branch repair/replacement PRs.
- `CLAWSWEEPER_ALLOW_MERGE`: allows merge-capable applicators.
- `CLAWSWEEPER_ALLOW_AUTOMERGE`: allows comment-router automerge.
- `CLAWSWEEPER_COMMENT_ROUTER_EXECUTE`: lets scheduled comment routing
  post replies and dispatch repair.

## Maintainer Mentions

Prefer `@clawsweeper` comments for all maintainer-facing control. Slash
commands still parse as compatibility aliases, but examples and live guidance
should use mentions.

```text
@clawsweeper status
@clawsweeper re-review
@clawsweeper review
@clawsweeper fix ci
@clawsweeper address review
@clawsweeper rebase
@clawsweeper autofix
@clawsweeper automerge
@clawsweeper approve
@clawsweeper explain
@clawsweeper stop
@clawsweeper <question or safe action request>
@clawsweeper[bot] re-review
@openclaw-clawsweeper fix ci
@openclaw-clawsweeper[bot] fix ci
```

Accepted aliases: `review`, `re-review`, `rereview`, `review again`,
`rerun review`, and `run review`. `review` and `re-review` dispatch a fresh
ClawSweeper issue/PR review without starting repair. `fix ci`,
`address review`, and `rebase` dispatch the
repair worker only for ClawSweeper PRs or PRs opted into
`clawsweeper:autofix` or `clawsweeper:automerge`. `autofix` runs the bounded
review/fix loop without merging. `automerge` runs the bounded review/fix/merge

ERROR: Reconnecting... 1/5
ERROR: Reconnecting... 2/5
ERROR: Reconnecting... 3/5
ERROR: Reconnecting... 4/5
ERROR: Reconnecting... 5/5
ERROR: stream disconnected before completion: Rate limit reached for gpt-5.5 in organization org-uV7eiQ9Go91bzhgJ7xfsJBZj on tokens per min (TPM): Limit 40000000, Used 40000000, Requested 22853. Please try again in 34ms. Visit https://platform.openai.com/account/rate-limits to learn more.
ERROR: stream disconnected before completion: Rate limit reached for gpt-5.5 in organization org-uV7eiQ9Go91bzhgJ7xfsJBZj on tokens per min (TPM): Limit 40000000, Used 40000000, Requested 22853. Please try again in 34ms. Visit https://platform.openai.com/account/rate-limits to learn more.
tokens used
20,214
```
