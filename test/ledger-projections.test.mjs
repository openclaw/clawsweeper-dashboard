import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { renderActionLedgerDashboard } from "../scripts/ledger-dashboard.mjs";
import { writeActionLedgerIndexes } from "../scripts/ledger-project.mjs";
import { buildActionLedgerProjection } from "../scripts/ledger-projections.mjs";
import { actionEventKey } from "../scripts/ledger-schema.mjs";
import { actionEvent, tempRoot, writeShard } from "./ledger-fixtures.mjs";

test("ledger projections expose source, family, repository, status, and freshness metrics", (context) => {
  const root = tempRoot(context);
  writeShard(root, [
    actionEvent(),
    actionEvent({
      event_key: actionEventKey("apply.executed", {
        repository: "openclaw/openclaw",
        number: 42,
        source_revision: "abc123",
      }),
      event_type: "apply.executed",
      action: {
        name: "close",
        status: "executed",
        reason_code: "implemented_on_main",
        retryable: false,
        mutation: true,
      },
      occurred_at: "2026-07-10T10:00:00.000Z",
    }),
  ]);

  const projection = buildActionLedgerProjection(root, {
    now: "2026-07-12T12:00:00.000Z",
  });

  assert.equal(projection.source.shard_count, 1);
  assert.equal(projection.metrics.by_event_family.review.count, 1);
  assert.equal(projection.metrics.by_event_family.apply.count, 1);
  assert.equal(projection.metrics.by_repository["openclaw/openclaw"].count, 2);
  assert.equal(projection.metrics.by_action_status.completed.count, 1);
  assert.equal(projection.metrics.by_action_status.executed.count, 1);
  assert.equal(projection.metrics.by_freshness.last_24_hours.count, 1);
  assert.equal(projection.metrics.by_freshness.days_1_to_7.count, 1);
});

test("ledger projections compare timestamps as instants", (context) => {
  const root = tempRoot(context);
  writeShard(root, [
    actionEvent({
      event_key: actionEventKey("review.later", { number: 42 }),
      occurred_at: "2026-07-12T10:00:00-05:00",
    }),
    actionEvent({
      event_key: actionEventKey("review.earlier", { number: 43 }),
      occurred_at: "2026-07-12T12:00:00+02:00",
      subject: {
        ...actionEvent().subject,
        number: 43,
      },
    }),
  ]);

  const projection = buildActionLedgerProjection(root, {
    now: "2026-07-12T16:00:00.000Z",
  });
  assert.equal(projection.metrics.oldest_occurred_at, "2026-07-12T12:00:00+02:00");
  assert.equal(projection.metrics.newest_occurred_at, "2026-07-12T10:00:00-05:00");
  assert.equal(
    projection.metrics.by_event_family.review.latest_occurred_at,
    "2026-07-12T10:00:00-05:00",
  );
});

test("ledger projections preserve sub-millisecond ordering", (context) => {
  const root = tempRoot(context);
  writeShard(root, [
    actionEvent({
      event_key: actionEventKey("review.earlier-fraction", { number: 42 }),
      occurred_at: "2026-07-12T10:00:00.0001Z",
    }),
    actionEvent({
      event_key: actionEventKey("review.later-fraction", { number: 43 }),
      occurred_at: "2026-07-12T10:00:00.0009Z",
      subject: {
        ...actionEvent().subject,
        number: 43,
      },
    }),
  ]);

  const projection = buildActionLedgerProjection(root, {
    now: "2026-07-12T12:00:00.000Z",
  });
  assert.equal(projection.metrics.oldest_occurred_at, "2026-07-12T10:00:00.0001Z");
  assert.equal(projection.metrics.newest_occurred_at, "2026-07-12T10:00:00.0009Z");
  assert.equal(
    projection.metrics.by_event_family.review.latest_occurred_at,
    "2026-07-12T10:00:00.0009Z",
  );
});

test("ledger freshness labels include their stated day boundaries", (context) => {
  const root = tempRoot(context);
  const now = "2026-07-31T12:00:00.000Z";
  writeShard(root, [
    actionEvent({
      event_key: actionEventKey("review.seven-days", { number: 42 }),
      occurred_at: "2026-07-24T12:00:00.000Z",
    }),
    actionEvent({
      event_key: actionEventKey("review.thirty-days", { number: 43 }),
      occurred_at: "2026-07-01T12:00:00.000Z",
      subject: { ...actionEvent().subject, number: 43 },
    }),
  ]);

  const projection = buildActionLedgerProjection(root, { now });
  assert.equal(projection.metrics.by_freshness.days_1_to_7.count, 1);
  assert.equal(projection.metrics.by_freshness.days_8_to_30.count, 1);
  assert.equal(projection.metrics.by_freshness.older_than_30_days.count, 0);
});

test("ledger projections handle prototype-named statuses", (context) => {
  const root = tempRoot(context);
  writeShard(root, [
    actionEvent({
      action: {
        name: "review",
        status: "constructor",
        retryable: false,
        mutation: false,
      },
    }),
  ]);

  const projection = buildActionLedgerProjection(root, {
    now: "2026-07-12T12:00:00.000Z",
  });
  assert.equal(projection.metrics.by_action_status.constructor.count, 1);
  assert.equal(Number.isFinite(projection.metrics.by_action_status.constructor.count), true);
});

test("ledger current indexes replace stale projection files", (context) => {
  const root = tempRoot(context);
  const output = path.join(root, "ledger", "v1", "indexes", "current");
  writeShard(root, [actionEvent()]);
  fs.mkdirSync(output, { recursive: true });
  fs.writeFileSync(path.join(output, "stale.json"), "{}\n", "utf8");

  writeActionLedgerIndexes(root, output, { now: "2026-07-12T12:00:00.000Z" });

  assert.deepEqual(fs.readdirSync(output).sort(), ["metrics.json", "source.json"]);
  assert.equal(JSON.parse(fs.readFileSync(path.join(output, "source.json"))).event_count, 1);
});

test("ledger index output cannot overlap immutable source data", (context) => {
  const root = tempRoot(context);
  const shard = writeShard(root, [actionEvent()]);

  for (const output of [root, path.join(root, "ledger"), path.dirname(shard)]) {
    assert.throws(
      () => writeActionLedgerIndexes(root, output, { now: "2026-07-12T12:00:00.000Z" }),
      /output overlaps source data/,
    );
    assert.equal(fs.existsSync(shard), true);
  }
});

test("ledger index output cannot enter source data through a symlink alias", (context) => {
  const root = tempRoot(context);
  const aliasRoot = tempRoot(context);
  const shard = writeShard(root, [actionEvent()]);
  const eventsRoot = path.join(root, "ledger", "v1", "events");
  fs.symlinkSync(eventsRoot, path.join(aliasRoot, "events-alias"), "dir");

  assert.throws(
    () =>
      writeActionLedgerIndexes(root, path.join(aliasRoot, "events-alias", "projection"), {
        now: "2026-07-12T12:00:00.000Z",
      }),
    /output contains symlink/,
  );
  assert.equal(fs.existsSync(shard), true);
});

test("ledger index output rejects a symlinked index root before replacement", (context) => {
  const root = tempRoot(context);
  const external = tempRoot(context);
  writeShard(root, [actionEvent()]);
  fs.mkdirSync(path.join(root, "ledger", "v1"), { recursive: true });
  fs.symlinkSync(external, path.join(root, "ledger", "v1", "indexes"), "dir");
  const sentinel = path.join(external, "current", "sentinel.txt");
  fs.mkdirSync(path.dirname(sentinel), { recursive: true });
  fs.writeFileSync(sentinel, "keep\n", "utf8");

  assert.throws(
    () => writeActionLedgerIndexes(root, undefined, { now: "2026-07-12T12:00:00.000Z" }),
    /output contains symlink/,
  );
  assert.equal(fs.readFileSync(sentinel, "utf8"), "keep\n");
});

test("action ledger dashboard renders concise source and metric projections", (context) => {
  const root = tempRoot(context);
  writeShard(root, [actionEvent()]);

  const dashboard = renderActionLedgerDashboard(root, {
    now: "2026-07-12T12:00:00.000Z",
  });

  assert.match(dashboard, /^## Action Ledger/m);
  assert.match(dashboard, /Immutable source: 1 events across 1 JSONL shards/);
  assert.match(dashboard, /\| Review \| 1 \|/);
  assert.match(
    dashboard,
    /\[openclaw\/openclaw\]\(https:\/\/github\.com\/openclaw\/openclaw\)/,
  );
  assert.match(dashboard, /\| completed \| 1 \|/);
  assert.match(dashboard, /\| Last 24 hours \| 1 \|/);
  assert.match(dashboard, /replaceable projections, never mutation authority/);
});
