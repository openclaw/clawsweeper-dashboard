# Vision

ClawSweeper State is the durable, public presentation layer for
[ClawSweeper](https://github.com/openclaw/clawsweeper). It turns operational
records from the `state` branch into a compact dashboard on `main`.

## Product boundaries

- The `state` branch is the durable source. `README.md` is a generated projection,
  not an independently edited source of truth.
- Immutable action-ledger shards are durable source. Current ledger indexes and
  dashboard metrics are disposable projections and never mutation authority.
- Dashboard rows are snapshots. They must state that boundary and link operators
  to the source record and live GitHub item for current status.
- Rendering is read-only. GitHub mutations, repair execution, routing, and state
  production belong in ClawSweeper or an explicitly authorized maintainer flow.
- Record provenance and failure visibility take priority over best-effort output.
  Malformed inputs must fail clearly rather than disappear silently.

## Priorities

1. Correct classification, provenance, and links.
2. Fast recognition of maintainer decisions and failed automation.
3. Fresh, deterministic rendering from the current durable state.
4. Compact output that remains useful at fleet scale.
5. Deterministic ledger replay with fail-closed provenance and privacy checks.

The current state data shape is an integration contract. Renderer changes must
replay against `origin/state`, preserve supported records, and add focused
fixtures for new classifications or edge cases.

## Security and disclosure

This repository and its dashboard are public. Render only state intended for
public disclosure; never add credentials, private artifacts, or unredacted
security-sensitive details. Sensitive routing and remediation stay in approved
private or upstream security workflows.

The action ledger stores bounded machine-readable facts. It rejects raw bodies,
comments, diffs, patches, prompts, logs, local paths, credentials, private
hosts, and email addresses before projection.

## Non-goals

- A live GitHub status oracle or real-time control plane.
- A second mutation engine, task tracker, or replacement for source records.
- Manual curation of generated dashboard output.

## Delivery and releases

The scheduled dashboard workflow validates and deploys `README.md`. Generated
dashboard commits on `main` are deployments, not releases.

The npm package is private and exists only to run repository tooling. Routine npm
publishing and GitHub Releases are unnecessary. Add a versioned release only
when an external consumer needs a stable renderer or state-schema contract, and
only with explicit release authorization.
