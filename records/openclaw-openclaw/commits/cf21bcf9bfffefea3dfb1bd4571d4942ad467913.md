---
sha: cf21bcf9bfffefea3dfb1bd4571d4942ad467913
parent: a7a6d241473a38b57bf3d470f7925c0ecf8ac20c
repository: openclaw/openclaw
author: "Vincent Koc"
committer: "Vincent Koc"
github_author: vincentkoc
github_committer: vincentkoc
co_authors: []
commit_authored_at: "2026-05-02T11:57:07-07:00"
commit_committed_at: "2026-05-02T12:00:06-07:00"
result: findings
confidence: high
highest_severity: low
check_conclusion: neutral
reviewed_at: 2026-05-02T19:19:24Z
---

# Commit cf21bcf

## Summary

Found one low-severity documentation regression. The code path and targeted tests support the intended behavior: bare plugin specs now go to npm, and explicit `clawhub:` specs stay on ClawHub.

## Findings

### Low: Manage plugins docs still say bare installs use ClawHub first

- Kind: regression
- File: `docs/plugins/manage-plugins.md`
- Line: 42
- Evidence: Current install code only calls ClawHub for explicit `clawhub:` specs at `src/cli/plugins-install-command.ts:750`; otherwise it sends the bare spec to npm at `src/cli/plugins-install-command.ts:777`. But the active docs page still says “Bare package specs try ClawHub first, then npm fallback” at `docs/plugins/manage-plugins.md:42`, lists `openclaw plugins install <package>` under “Users install from ClawHub” at `docs/plugins/manage-plugins.md:124`, and says the bare form still checks ClawHub first at `docs/plugins/manage-plugins.md:131`.
- Impact: Users following this page can unintentionally install from npm when they meant ClawHub, or fail to install a ClawHub-only package. In a name-collision case, that is a wrong-source plugin install.
- Suggested fix: Update `docs/plugins/manage-plugins.md` to match the new launch behavior: bare package specs install from npm by default, `clawhub:<package>` is required for ClawHub resolution, and `npm:` only makes npm explicit.
- Confidence: high

## Details

- Do we have a high-confidence way to reproduce the issue? yes. The mismatch is directly visible by comparing `docs/plugins/manage-plugins.md:42` with the current install branch in `src/cli/plugins-install-command.ts:750` and `src/cli/plugins-install-command.ts:777`.
- Is this the best way to solve the issue? yes. The commit already updates the same wording in other docs; this page needs the same wording pass.

## Reviewed

- Diff: `a7a6d241473a38b57bf3d470f7925c0ecf8ac20c..cf21bcf9bfffefea3dfb1bd4571d4942ad467913`
- Changed files: `CHANGELOG.md`, plugin docs, CLI install helpers/tests, chat `/plugins` install path/tests
- Code read: `src/cli/plugins-install-command.ts`, `src/cli/plugins-command-helpers.ts`, `src/auto-reply/reply/commands-plugins.ts`, `src/cli/plugin-install-plan.ts`, `src/infra/clawhub-spec.ts`, relevant install tests
- Docs read: `docs/AGENTS.md`, changed plugin docs, `docs/plugins/manage-plugins.md`
- Commands: `pnpm docs:list`, `git show`, `git diff`, `rg`, `git diff --check`, targeted `pnpm test`

## Tests / Live Checks

- `pnpm test src/cli/plugins-cli.install.test.ts src/auto-reply/reply/commands-plugins.test.ts src/auto-reply/reply/commands-plugins.install.test.ts` passed after installing missing dependencies.
- Initial targeted test attempt failed because `node_modules` was missing; `pnpm install` completed, then the retry passed.
- `git diff --check a7a6d241473a38b57bf3d470f7925c0ecf8ac20c..cf21bcf9bfffefea3dfb1bd4571d4942ad467913` passed.

## Dependency / Web Checks

- No package manifests or lockfiles changed.
- No external web lookup needed; the finding is a local docs/code mismatch.

## Limitations

- Did not run a full broad gate; this was a focused commit review and the relevant targeted tests passed.
