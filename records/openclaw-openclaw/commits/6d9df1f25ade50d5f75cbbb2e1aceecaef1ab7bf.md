---
sha: 6d9df1f25ade50d5f75cbbb2e1aceecaef1ab7bf
parent: db5f96cdc1e191ceb9e0c04814114f5efb9c0e9b
repository: openclaw/openclaw
author: "Peter Steinberger"
committer: "Peter Steinberger"
github_author: steipete
github_committer: steipete
co_authors: []
commit_authored_at: "2026-05-03T14:32:34+01:00"
commit_committed_at: "2026-05-03T14:32:35+01:00"
result: findings
confidence: high
highest_severity: low
check_conclusion: neutral
reviewed_at: 2026-05-03T13:37:31Z
---

# Commit 6d9df1f25a

## Summary

Found one reliability issue in the new publish retry path. The retry can still fail in the normal concurrent matrix publish case because it rebases from a depth-1 shallow checkout.

## Findings

### Low: shallow retry rebase can conflict before replaying the lane commit

- Kind: reliability
- File: `.github/workflows/openclaw-performance.yml`
- Line: 566
- Evidence: The reports checkout is prepared with `git fetch --depth=1 origin main`, and the retry path repeats `git fetch --depth=1 origin main` before `git rebase FETCH_HEAD`. In a shallow repo, Git may not see the previous `main` tip as the merge base, so `rebase` tries to replay the shallow root commit before replaying the lane's report commit. I reproduced this with a local bare reports repo containing existing `latest-a.json` and `latest-b.json`: lane A updated `latest-a.json` and pushed; lane B updated `latest-b.json`; B's retry ran the same `fetch --depth=1` plus `rebase FETCH_HEAD` sequence and failed with an add/add conflict while applying the old base commit to `latest-a.json`. The real `openclaw/clawgrit-reports` repo currently has `openclaw-performance/main/latest-live-gpt54.json`, `latest-mock-deep-profile.json`, and `latest-mock-provider.json`, so concurrent OpenClaw Performance lanes have the same shape.
- Impact: after one matrix lane publishes, another lane can still fail in the retry block instead of rebasing cleanly, leaving the expensive performance workflow red and some reports unpublished.
- Suggested fix: fetch enough history before rebasing, for example `git fetch --deepen=50 origin main` or `git fetch --unshallow origin main` before `git rebase FETCH_HEAD`. A local simulation with `--depth=2`, `--deepen=50`, and `--unshallow` allowed the disjoint latest-file updates to rebase cleanly.
- Confidence: high

## Details

- Do we have a high-confidence way to reproduce the issue? yes: the local shallow Git simulation above reproduces the failure with the same command sequence added by this commit.
- Is this the best way to solve the issue? no: retrying the push is the right direction, but the retry needs a non-shallow-enough history before rebasing.

## Reviewed

- Diff: `db5f96cdc1e191ceb9e0c04814114f5efb9c0e9b..6d9df1f25ade50d5f75cbbb2e1aceecaef1ab7bf`
- Changed files: `.github/workflows/openclaw-performance.yml`
- Code read: full current workflow, previous publish block from the parent commit, `docs/ci.md` OpenClaw Performance section, workflow sanity script references.
- Dependencies/web: local Git 2.53.0 shallow-rebase behavior; GitHub API read of `openclaw/clawgrit-reports` contents for current latest pointer files.
- Commands: `pnpm docs:list`; `git show`; `git diff`; `git diff --check`; `pnpm check:workflows`; `gh run list`; local shallow Git retry simulations.

## Tests / Live Checks

- `git diff --check db5f96cdc1e191ceb9e0c04814114f5efb9c0e9b..6d9df1f25ade50d5f75cbbb2e1aceecaef1ab7bf`: passed.
- `pnpm check:workflows`: passed.
- Remote exact-SHA `Workflow Sanity`: passed.
- Exact-SHA `CI`: still in progress during review.
- Did not dispatch `OpenClaw Performance` or push to `openclaw/clawgrit-reports`.

## Dependency / Web Checks

- No package dependency changes.
- GitHub API confirmed the target reports repo already has the three `latest-*.json` files that make the shallow-rebase conflict path plausible.

## Limitations

- The finding is based on a faithful local Git simulation rather than a live mutation of the production reports repository.
