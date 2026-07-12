# Action Ledger State Contract

ClawSweeper State consumes the immutable action-event shards published by
ClawSweeper. The event schema in
[`schema/state-ledger-event.schema.json`](../schema/state-ledger-event.schema.json)
is mirrored byte-for-byte from the writer contract.

## Source And Projections

Hot events are immutable JSONL shards:

```text
ledger/v1/events/YYYY/MM/DD/<producer>/<run-id>-<attempt>-<job>-<digest>.jsonl
```

Every render validates every line, the event schema, semantic digest, event
identity, producer identity, canonical ordering, and shard path. One malformed
or conflicting event fails the whole projection. Event keys contain only a
machine-readable scope plus a SHA-256 identity digest. Valid duplicate replays
are collapsed deterministically only when all event metadata is identical; a
reused event identity with different semantic content or occurrence metadata is
a hard conflict.

Shard partition dates are stable workflow-run identity. They are read from and
validated against the shard path and identity digest; event ordering never
chooses or changes a partition.

Attributes use field-specific contracts: machine-readable strings, booleans,
positive or non-negative integers, or unit-interval values. Evidence URLs are
limited to exact public GitHub Actions run URLs, timestamps must be real
calendar dates, and bounded collections contain at most 64 entries.

`ledger/v1/indexes/current/` is generated output. `source.json` records the
input shard snapshot and digests; `metrics.json` records counts by event family,
subject repository, action status, and freshness. The directory may be deleted
and rebuilt at any time:

```bash
pnpm ledger:project -- --source ../state
```

Indexes, dashboards, comments, and latest-state files are never mutation
authority. Only immutable shards or their verified segment replacements are
ledger source.

## Retention And Compaction

- Hot shards remain authoritative until a compactor has produced a
  digest-verified immutable segment and parity checks prove that rebuilding
  from the segment yields the same event identities, semantic digests, source
  counts, and metrics.
- Segments are immutable, epoch-scoped source artifacts. They must retain the
  original event payloads and enough source metadata to audit which hot shards
  they replace.
- A compactor may remove replaced hot shards only in the same reviewed state
  transition that publishes the verified segment manifest. Partial rollover is
  forbidden.
- Current indexes have no retention guarantee. Writers replace the whole
  `current/` directory so stale files cannot survive a projection rebuild.
- Epoch rollover requires a new schema path, dual-read parity, and an explicit
  migration plan. A new epoch must not reinterpret or rewrite v1 events.

This repository does not yet compact shards or read segments. Hot shards must
therefore remain present. Segment support and the first epoch rollover require
a separate change with backfill and parity fixtures; this foundation must not
delete or rewrite generated state.
