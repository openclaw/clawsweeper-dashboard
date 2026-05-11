---
sha: f4be39c4f4528f097bda7baafbbfdb56e4e73fbf
parent: 7c7d19ec8481cfb48dc1b3dd55487512b1de068d
repository: openclaw/openclaw
author: "brokemac79"
committer: "Peter Steinberger"
github_author: brokemac79
github_committer: steipete
co_authors: []
commit_authored_at: "2026-05-05T23:23:23+01:00"
commit_committed_at: "2026-05-11T13:16:06+01:00"
result: nothing_found
confidence: high
highest_severity: none
check_conclusion: success
reviewed_at: 2026-05-11T12:22:27Z
---

# Commit f4be39c4f4

Nothing found.

## Details

- Do we have a high-confidence way to reproduce the issue? Not applicable; no actionable issue was found.
- Is this the best way to solve the issue? Not applicable; no fix is recommended.
- The main risk introduced by this commit, model-scoped llama.cpp `/props?model=...` probing, has already been addressed on current `main` by adding `autoload=false` in follow-up commit `29f36e0072`.

## Reviewed

- Diff: `7c7d19ec8481cfb48dc1b3dd55487512b1de068d..f4be39c4f4528f097bda7baafbbfdb56e4e73fbf`
- Changed files: `CHANGELOG.md`, `src/plugins/provider-self-hosted-setup.ts`, `src/plugins/provider-self-hosted-setup.test.ts`
- Code read: full touched helper/test files, `src/plugin-sdk/provider-setup.ts`, `src/plugin-sdk/self-hosted-provider-setup.ts`, vLLM/SGLang/LM Studio caller paths
- Dependencies/web: GitHub issue `#73664` and PR `#74057`; no general web lookup needed
- Commands: `git show`, `git diff`, `rg`, `gh issue view 73664`, `gh pr view 74057`, `pnpm test src/plugins/provider-self-hosted-setup.test.ts -- --reporter=verbose`, `pnpm exec oxlint src/plugins/provider-self-hosted-setup.ts src/plugins/provider-self-hosted-setup.test.ts`, `pnpm exec oxfmt --check --threads=1 CHANGELOG.md src/plugins/provider-self-hosted-setup.ts src/plugins/provider-self-hosted-setup.test.ts`, `git diff --check 7c7d19ec8481cfb48dc1b3dd55487512b1de068d..f4be39c4f4528f097bda7baafbbfdb56e4e73fbf`

## Limitations

- none
