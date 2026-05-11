---
sha: 1debcecc918bc0efd171af7a51461e0fc7bc62f0
parent: 0388b05655a2a6b8f0f06616d74ba9a9fd49395e
repository: openclaw/openclaw
author: "Ayaan Zaidi"
committer: "Ayaan Zaidi"
github_author: obviyus
github_committer: obviyus
co_authors: []
commit_authored_at: "2026-05-11T10:35:07+05:30"
commit_committed_at: "2026-05-11T10:35:53+05:30"
result: findings
confidence: high
highest_severity: medium
check_conclusion: neutral
reviewed_at: 2026-05-11T05:11:21+00:00
---

# Commit 1debcecc91

## Summary

The workflow syntax is valid, but the runner migration breaks the secret-bearing Codex step in live use. On Blacksmith, `openai/codex-action` with `safety-strategy: drop-sudo` cannot prove sudo was removed, so the Telegram desktop proof job exits before running the agent.

## Findings

### Medium: Blacksmith runner keeps passwordless sudo after `drop-sudo`

- Kind: compatibility
- File: `.github/workflows/mantis-telegram-desktop-proof.yml`
- Line: 293
- Evidence: The commit changes `run_telegram_desktop_proof` from `ubuntu-24.04` to `blacksmith-16vcpu-ubuntu-2404`, while the same job invokes `openai/codex-action` with `safety-strategy: drop-sudo` at `.github/workflows/mantis-telegram-desktop-proof.yml:371`. A live run at this exact SHA reached the Blacksmith runner, then failed inside the action with `Expected sudo to be disabled, but sudo succeeded.` after `Used 'deluser runner sudo' to drop sudo privilege.` The pinned action’s own `action.yml` verifies `sudo -n true` and exits with that message when `drop-sudo` did not remove passwordless sudo.
- Impact: Mantis Telegram desktop proof requests now fail before the agent can create the native Telegram evidence manifest, so maintainers cannot use this workflow for the proof it was added to provide.
- Suggested fix: Keep this Codex job on `ubuntu-24.04`, or switch to an action-supported Blacksmith-safe isolation path such as `safety-strategy: unprivileged-user` with explicit user setup and proof that the user cannot sudo. Do not use `unsafe` for this secret-bearing agent step.
- Confidence: high

## Details

- Do we have a high-confidence way to reproduce the issue? yes. Run `mantis-telegram-desktop-proof.yml` at `1debcecc918bc0efd171af7a51461e0fc7bc62f0`; run `25651428954` failed in job `Run agentic native Telegram proof` with the sudo verification error before producing `.artifacts/qa-e2e/mantis/telegram-desktop-proof/mantis-evidence.json`.
- Is this the best way to solve the issue? yes for reverting to `ubuntu-24.04`; unclear for a Blacksmith-compatible replacement, because it needs a runner-specific privilege model check.

## Reviewed

- Diff: `0388b05655a2a6b8f0f06616d74ba9a9fd49395e..1debcecc918bc0efd171af7a51461e0fc7bc62f0`
- Changed files: `.github/workflows/mantis-telegram-desktop-proof.yml`
- Code read: full workflow file, Mantis Discord/Scenario workflow conventions, current `main` around the changed job
- Dependencies/web: inspected pinned `openai/codex-action@5c3f4ccdb2b8790f73d6b21751ac00e602aa0c02` source for `drop-sudo` behavior
- Commands: `git show`, `git diff`, `rg`, `gh run view`, `node scripts/check-workflows.mjs`

## Tests / Live Checks

- `node scripts/check-workflows.mjs` passed.
- Live GitHub Actions run `25651428954` at the reviewed SHA failed in the changed Blacksmith job with the sudo compatibility error.

## Limitations

- I did not dispatch a new workflow run; the existing live run at the reviewed SHA was sufficient to reproduce the regression.
