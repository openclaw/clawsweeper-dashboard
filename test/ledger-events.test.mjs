import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import {
  LedgerConflictError,
  actionEventShardRelativePath,
  loadActionLedger,
} from "../scripts/ledger-events.mjs";
import { actionEventId, actionEventKey, stableJson } from "../scripts/ledger-schema.mjs";
import { actionEvent, tempRoot, writeShard } from "./ledger-fixtures.mjs";

test("ledger loading fails closed on malformed JSONL lines", (context) => {
  const root = tempRoot(context);
  const event = actionEvent();
  const file = writeShard(root, [event]);
  fs.writeFileSync(file, `${JSON.stringify(event)}\n{broken\n`, "utf8");

  assert.throws(() => loadActionLedger(root), /:2: malformed JSON/);
});

test("ledger loading rejects semantic digest mismatches", (context) => {
  const root = tempRoot(context);
  const event = actionEvent();
  const file = writeShard(root, [event]);
  fs.writeFileSync(
    file,
    `${JSON.stringify({ ...event, action: { ...event.action, status: "failed" } })}\n`,
    "utf8",
  );

  assert.throws(() => loadActionLedger(root), /semantic_sha256 does not match/);
});

test("generated event keys contain only a stable scope and digest", () => {
  const key = actionEventKey("review.completed", {
    repository: "openclaw/openclaw",
    number: 42,
    source_revision: "abc123",
  });
  assert.equal(
    key,
    actionEventKey("review.completed", {
      source_revision: "abc123",
      number: 42,
      repository: "openclaw/openclaw",
    }),
  );
  assert.match(key, /^review\.completed:[a-f0-9]{64}$/);
  assert.equal(
    actionEventId("OpenClaw/OpenClaw", key),
    actionEventId("openclaw/openclaw", key),
  );
});

test("ledger loading rejects raw event identity keys", (context) => {
  const root = tempRoot(context);
  const event = actionEvent();
  const file = writeShard(root, [event]);
  fs.writeFileSync(
    file,
    `${JSON.stringify({
      ...event,
      event_key: "review.completed:openclaw/openclaw:42:private-value",
    })}\n`,
    "utf8",
  );

  assert.throws(
    () => loadActionLedger(root),
    /event_key: (?:shorter than 66 characters|does not match required pattern)/,
  );
});

test("ledger loading rejects unknown unhashed fields", (context) => {
  const root = tempRoot(context);
  const event = actionEvent();
  const file = writeShard(root, [event]);
  fs.writeFileSync(
    file,
    `${JSON.stringify({ ...event, prompt: "unhashed private text" })}\n`,
    "utf8",
  );

  assert.throws(() => loadActionLedger(root), /unexpected property prompt/);
});

test("ledger loading rejects conflicting duplicate event identities", (context) => {
  const root = tempRoot(context);
  const first = actionEvent();
  const second = actionEvent({
    producer: {
      repository: "openclaw/clawsweeper",
      sha: "def456",
      workflow: "sweep",
      job: "review-4",
      run_id: "101",
      run_attempt: 1,
      component: "review",
    },
    action: {
      name: "review",
      status: "failed",
      reason_code: "model_error",
      retryable: true,
      mutation: false,
    },
  });
  writeShard(root, [first]);
  writeShard(root, [second]);

  assert.throws(() => loadActionLedger(root), LedgerConflictError);
});

test("ledger loading rejects privacy-unsafe attributes", (context) => {
  const unsafeNameRoot = tempRoot(context);
  const base = actionEvent();
  const unsafeNameFile = writeShard(unsafeNameRoot, [base]);
  fs.writeFileSync(
    unsafeNameFile,
    `${JSON.stringify({ ...base, attributes: { comment_body: "redacted" } })}\n`,
    "utf8",
  );
  assert.throws(
    () => loadActionLedger(unsafeNameRoot),
    /attributes: unexpected property comment_body/,
  );

  const unsafeValueRoot = tempRoot(context);
  const unsafeValueFile = writeShard(unsafeValueRoot, [base]);
  fs.writeFileSync(
    unsafeValueFile,
    `${JSON.stringify({ ...base, attributes: { model: "secret@example.com" } })}\n`,
    "utf8",
  );
  assert.throws(() => loadActionLedger(unsafeValueRoot), /privacy-unsafe attribute value/);
});

test("ledger loading rejects privacy-unsafe values outside attributes", () => {
  assert.throws(
    () =>
      actionEvent({
        action: {
          name: "review",
          status: "secret@example.com",
          retryable: false,
          mutation: false,
        },
      }),
    /privacy-unsafe event data/,
  );
});

test("ledger loading rejects mixed complete producer identities", (context) => {
  const root = tempRoot(context);
  const first = actionEvent();
  const second = actionEvent({
    event_key: actionEventKey("review.second", { number: 43 }),
    occurred_at: "2026-07-12T10:02:00.000Z",
    producer: {
      ...first.producer,
      repository: "openclaw/other",
      sha: "def456",
    },
    subject: {
      ...first.subject,
      number: 43,
    },
  });
  const file = writeShard(root, [first]);
  fs.writeFileSync(file, `${stableJson(first)}\n${stableJson(second)}\n`, "utf8");

  assert.throws(() => loadActionLedger(root), /complete shard producer identity/);
});

test("ledger loading enforces field-specific attribute contracts", (context) => {
  for (const attributes of [
    { completion_reason: "raw prose is not a reason code" },
    { finding_count: 1.5 },
    { attempt: 0 },
    { cached: "true" },
    { coverage_ratio: 1.5 },
    { model: null },
  ]) {
    const root = tempRoot(context);
    const event = actionEvent();
    const file = writeShard(root, [event]);
    fs.writeFileSync(file, `${JSON.stringify({ ...event, attributes })}\n`, "utf8");
    assert.throws(() => loadActionLedger(root), /attributes/);
  }
});

test("ledger loading limits evidence to exact GitHub Actions run URLs", (context) => {
  for (const runUrl of [
    "https://169.254.169.254/latest/meta-data",
    "https://[::1]/actions/runs/100",
    "https://[fc00::1]/actions/runs/100",
    "https://internal.example/actions/runs/100",
    "https://github.com/login/oauth/authorize?client_secret=PLACEHOLDER",
    "https://github.com/openclaw/clawsweeper/actions/runs/100?token=PLACEHOLDER",
    "https://github.com/openclaw/clawsweeper/issues/100",
  ]) {
    const root = tempRoot(context);
    const event = actionEvent();
    const file = writeShard(root, [event]);
    fs.writeFileSync(
      file,
      `${JSON.stringify({
        ...event,
        evidence: [{ kind: "run", run_url: runUrl }],
      })}\n`,
      "utf8",
    );
    assert.throws(() => loadActionLedger(root), /evidence\[0\]\.run_url/);
  }
});

test("ledger loading enforces strict timestamps and collection bounds", (context) => {
  const invalidTimestampRoot = tempRoot(context);
  const event = actionEvent();
  const timestampFile = writeShard(invalidTimestampRoot, [event]);
  fs.writeFileSync(
    timestampFile,
    `${JSON.stringify({ ...event, occurred_at: "2026-02-31T10:00:00Z" })}\n`,
    "utf8",
  );
  assert.throws(() => loadActionLedger(invalidTimestampRoot), /occurred_at: invalid date-time/);

  const incompleteTimestampRoot = tempRoot(context);
  const incompleteTimestampFile = writeShard(incompleteTimestampRoot, [event]);
  fs.writeFileSync(
    incompleteTimestampFile,
    `${JSON.stringify({ ...event, occurred_at: "2026-07-12" })}\n`,
    "utf8",
  );
  assert.throws(() => loadActionLedger(incompleteTimestampRoot), /occurred_at: invalid date-time/);

  const evidenceRoot = tempRoot(context);
  const evidenceFile = writeShard(evidenceRoot, [event]);
  fs.writeFileSync(
    evidenceFile,
    `${JSON.stringify({
      ...event,
      evidence: Array.from({ length: 65 }, (_, index) => ({ kind: `evidence_${index}` })),
    })}\n`,
    "utf8",
  );
  assert.throws(() => loadActionLedger(evidenceRoot), /evidence: has more than 64 items/);

  const clusterRoot = tempRoot(context);
  const clusterFile = writeShard(clusterRoot, [event]);
  fs.writeFileSync(
    clusterFile,
    `${JSON.stringify({
      ...event,
      subject: {
        repository: "openclaw/openclaw",
        kind: "cluster",
        cluster_id: "x".repeat(257),
      },
    })}\n`,
    "utf8",
  );
  assert.throws(() => loadActionLedger(clusterRoot), /cluster_id: longer than 256 characters/);

  const fieldsRoot = tempRoot(context);
  const fieldsFile = writeShard(fieldsRoot, [event]);
  fs.writeFileSync(
    fieldsFile,
    `${JSON.stringify({
      ...event,
      privacy: {
        ...event.privacy,
        fields_dropped: Array.from({ length: 65 }, (_, index) => `field_${index}`),
      },
    })}\n`,
    "utf8",
  );
  assert.throws(() => loadActionLedger(fieldsRoot), /fields_dropped: has more than 64 items/);
});

test("shard paths use stable partition identity instead of event ordering", (context) => {
  const completed = actionEvent();
  const earlier = actionEvent({
    event_key: actionEventKey("review.started", {
      repository: "openclaw/openclaw",
      number: 42,
      source_revision: "abc123",
    }),
    event_type: "review.started",
    occurred_at: "2026-07-11T23:59:00.000Z",
    action: {
      name: "review",
      status: "started",
      retryable: true,
      mutation: false,
    },
  });
  const identity = {
    producer: "review",
    workflow: "sweep",
    job: "review-3",
    runId: "100",
    runAttempt: 1,
    partitionDate: "2026-07-12",
  };

  assert.equal(
    actionEventShardRelativePath(identity, [completed]),
    actionEventShardRelativePath(identity, [earlier, completed]),
  );

  const root = tempRoot(context);
  writeShard(root, [earlier, completed], { partitionDate: "2026-07-12" });
  const loaded = loadActionLedger(root);
  assert.equal(loaded.source.shards[0].partition_date, "2026-07-12");
  assert.equal(loaded.events[0].occurred_at, "2026-07-11T23:59:00.000Z");
});

test("shard paths reject invalid partition calendar dates", () => {
  const event = actionEvent();
  assert.throws(
    () =>
      actionEventShardRelativePath(
        {
          producer: "review",
          workflow: "sweep",
          job: "review-3",
          runId: "100",
          runAttempt: 1,
          partitionDate: "2026-02-31",
        },
        [event],
      ),
    /ISO calendar date/,
  );
});

test("ledger dedupe collapses only byte-equivalent event metadata", (context) => {
  const root = tempRoot(context);
  const event = actionEvent();
  writeShard(root, [event, event]);

  const loaded = loadActionLedger(root);

  assert.equal(loaded.source.raw_event_count, 2);
  assert.equal(loaded.source.event_count, 1);
  assert.equal(loaded.source.duplicate_count, 1);
  assert.deepEqual(loaded.events[0], event);
});

test("ledger loading rejects duplicate IDs with conflicting occurrence metadata", () => {
  const first = actionEvent();
  const conflicting = actionEvent({ occurred_at: "2026-07-12T10:00:01.000Z" });

  assert.throws(
    () =>
      actionEventShardRelativePath(
        {
          producer: "review",
          workflow: "sweep",
          job: "review-3",
          runId: "100",
          runAttempt: 1,
          partitionDate: "2026-07-12",
        },
        [first, conflicting],
      ),
    /conflicting duplicate metadata/,
  );
});
