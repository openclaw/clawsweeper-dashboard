---
sha: becb6e8bbbc2faaba3d46b36352e62417db32fe8
parent: 7e1afc0fea5b955d14a472c41f039d9bc683fa65
repository: openclaw/openclaw
author: "Ayaan Zaidi"
committer: "Ayaan Zaidi"
github_author: obviyus
github_committer: obviyus
co_authors: []
commit_authored_at: "2026-05-11T14:58:07+05:30"
commit_committed_at: "2026-05-11T15:02:36+05:30"
result: findings
confidence: high
highest_severity: medium
check_conclusion: neutral
reviewed_at: 2026-05-11T09:39:18+00:00
---

# Commit becb6e8bbb

## Summary

Found two actionable regressions in the Mantis Telegram Desktop proof workflow: the new trusted wrapper likely loses its harness path under the unprivileged Codex user, and the documented PR comment trigger no longer matches the workflow trigger.

## Findings

### Medium: trusted proof wrapper depends on `GITHUB_WORKSPACE`, which is not preserved for the Codex user

- Kind: reliability
- File: `.github/workflows/mantis-telegram-desktop-proof.yml`
- Line: 341
- Evidence: the installed wrapper runs with `set -u` and expands `${GITHUB_WORKSPACE}` at execution time. The Codex step uses `safety-strategy: unprivileged-user` / `codex-user: codex`, and the pinned `openai/codex-action@5c3f4cc...` source invokes Codex through `sudo -u <user> --`. The workflow’s sudoers `env_keep` adds `OPENCLAW_TELEGRAM_USER_PROOF_CMD` but not `GITHUB_WORKSPACE` at line 380. A focused local check showed `GITHUB_WORKSPACE=/tmp/example sudo -n -u runner -- bash -lc 'printf "%s\n" "${GITHUB_WORKSPACE-unset}"'` prints `unset`, and the wrapper body fails with `GITHUB_WORKSPACE: unbound variable` when that env var is absent.
- Impact: when the agent follows the prompt and runs `$OPENCLAW_TELEGRAM_USER_PROOF_CMD`, the wrapper can exit before running the proof script, so the job never creates `mantis-evidence.json` and the workflow fails.
- Suggested fix: bake the trusted harness script path into the wrapper at install time instead of resolving `GITHUB_WORKSPACE` at runtime. Adding `GITHUB_WORKSPACE` to `env_keep` would also address the immediate failure, but a literal path in the wrapper better matches the trusted-harness intent.
- Confidence: high

### Low: docs still advertise the old `@Mantis` trigger

- Kind: regression
- File: `docs/concepts/mantis.md`
- Line: 255
- Evidence: the workflow now only triggers issue comments containing `@openclaw-mantis` or `/openclaw-mantis` at `.github/workflows/mantis-telegram-desktop-proof.yml:67` and resolves requests with the same names at `.github/workflows/mantis-telegram-desktop-proof.yml:146`. The docs still instruct maintainers to comment `@Mantis telegram desktop proof` in `docs/concepts/mantis.md:255` and `docs/help/testing.md:349`.
- Impact: a maintainer following the documented command gets a skipped workflow before `resolve_request` runs, with no proof run or evidence comment.
- Suggested fix: either update both docs to the new `@openclaw-mantis telegram desktop proof` command, or keep the old aliases in the workflow until docs and operator habits are migrated.
- Confidence: high

## Details

- Do we have a high-confidence way to reproduce the issue? yes. The wrapper env failure is reproducible with sudo env stripping and the wrapper body; the trigger mismatch is directly visible by comparing workflow trigger conditions with the current docs.
- Is this the best way to solve the issue? yes for embedding the harness path in the wrapper, because it removes dependence on sudo-preserved environment and better guarantees the workflow checkout script is used.

## Reviewed

- Diff: `7e1afc0fea5b955d14a472c41f039d9bc683fa65..becb6e8bbbc2faaba3d46b36352e62417db32fe8`
- Changed files: `.github/codex/prompts/mantis-telegram-desktop-proof.md`, `.github/workflows/mantis-telegram-desktop-proof.yml`, `test/scripts/mantis-telegram-desktop-proof-workflow.test.ts`
- Code read: full touched prompt/test, workflow trigger and proof job, `scripts/e2e/telegram-user-crabbox-proof.ts`, related Mantis docs, pinned `openai/codex-action` unprivileged-user execution path.
- Dependencies/web: fetched pinned `openai/codex-action` source by commit; no package/advisory checks needed because no dependency files changed.

## Tests / Live Checks

- `git diff --check 7e1afc0fea5b955d14a472c41f039d9bc683fa65..becb6e8bbbc2faaba3d46b36352e62417db32fe8` passed.
- `pnpm test test/scripts/mantis-telegram-desktop-proof-workflow.test.ts` passed.
- First targeted test attempt used unsupported `--runInBand` and failed before tests; rerun used the repo-supported command and passed.
- Focused sudo/env checks reproduced the missing `GITHUB_WORKSPACE` behavior.

## Limitations

- Did not run the full GitHub Actions workflow or live Crabbox Telegram proof. The findings are based on static workflow/source inspection plus focused local checks.
