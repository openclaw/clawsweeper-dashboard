---
sha: c84b7cbffcc305aafa2b9927c6aadf3579a98e4b
parent: 0131343db8c613ecdbd8853af8044153baa74c04
repository: openclaw/openclaw
author: "Peter Steinberger"
committer: "Peter Steinberger"
github_author: steipete
github_committer: steipete
co_authors: []
commit_authored_at: "2026-05-05T02:28:22+01:00"
commit_committed_at: "2026-05-05T02:28:22+01:00"
result: findings
confidence: high
highest_severity: low
check_conclusion: neutral
reviewed_at: 2026-05-05T01:35:36Z
---

# Commit c84b7cb

## Summary

Found one low-severity release-observability regression: QA release-check failures are intended to become warnings, but the summary job is unlikely to see them as failures after job-level `continue-on-error`.

## Findings

### Low: Advisory QA failures can be hidden from the release-check summary

- Kind: regression
- File: `.github/workflows/openclaw-release-checks.yml`
- Line: 619
- Evidence: The QA jobs now set job-level `continue-on-error: true` at lines 619, 704, 761, 839, and 933. The verifier later decides whether to warn by reading `needs.<qa_job>.result` at lines 1054-1058 and only emits `::warning::` if that result is not `success` or `skipped` at lines 1062-1065. GitHub documents job-level `continue-on-error` as allowing a workflow run to pass when the job fails, and the long-standing Actions behavior is that `needs.<job>.result` can report `success` for a failed job with job-level `continue-on-error`. ([docs.github.com](https://docs.github.com/en/actions/writing-workflows/workflow-syntax-for-github-actions))
- Impact: A failed QA parity/Matrix/Telegram/Slack release lane can become a green `OpenClaw Release Checks` child without the intended warning in `Verify release checks`. That weakens the new “QA is advisory but visible” contract and can make Full Release Validation evidence look cleaner than the actual QA run.
- Suggested fix: Do not rely on `needs.<job>.result` for advisory QA jobs that use job-level `continue-on-error`. Prefer step-level `continue-on-error` plus explicit job outputs/warning steps based on `steps.<id>.outcome`, or have the verifier query the current run’s job conclusions directly and warn on QA job failures while still returning success.
- Confidence: high

## Details

- Do we have a high-confidence way to reproduce the issue? Yes. Force one QA job command to fail under `OpenClaw Release Checks`; with job-level `continue-on-error`, the dependent summary reads `needs.<qa_job>.result`, which is the fragile path described above.
- Is this the best way to solve the issue? Yes: keep advisory semantics, but report advisory failures from step outcomes or raw job conclusions instead of the normalized `needs.result`.

## Reviewed

- Diff: `0131343db8c613ecdbd8853af8044153baa74c04..c84b7cbffcc305aafa2b9927c6aadf3579a98e4b`
- Changed files: release workflows, release docs, `scripts/openclaw-cross-os-release-checks.ts`, and related workflow/script tests
- Code read: full changed workflow sections, cross-OS matrix/filter and command-runner paths, release-check summary logic, relevant docs
- GitHub: no associated PR found for the commit; exact-SHA `Workflow Sanity` succeeded, normal `CI` and `Docs` runs for this SHA were cancelled/superseded
- Dependencies/web: GitHub Actions `continue-on-error` docs and actions/toolkit issue #581

## Tests / Live Checks

- `pnpm test test/scripts/openclaw-cross-os-release-checks.test.ts test/scripts/openclaw-cross-os-release-workflow.test.ts test/scripts/package-acceptance-workflow.test.ts` passed after `pnpm install`
- `git diff --check 0131343db8c613ecdbd8853af8044153baa74c04..c84b7cbffcc305aafa2b9927c6aadf3579a98e4b` passed
- `node --import tsx scripts/openclaw-cross-os-release-checks.ts --resolve-matrix --mode both --ref main --suite-filter windows/packaged-upgrade` produced the expected single Windows packaged-upgrade lane

## Limitations

- I did not dispatch live release workflows or intentionally fail a QA lane in GitHub Actions; the finding is based on workflow code plus documented/known GitHub Actions semantics.
