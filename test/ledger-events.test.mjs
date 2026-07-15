import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import {
  LedgerConflictError,
  actionEventShardRelativePath,
  loadActionLedger,
  sortActionEventsCausally,
} from "../scripts/ledger-events.mjs";
import {
  actionEventId,
  actionEventKey,
  actionEventSemanticSha256,
  stableJson,
} from "../scripts/ledger-schema.mjs";
import { actionEvent, tempRoot, writeShard } from "./ledger-fixtures.mjs";

test("ledger loading fails closed on malformed JSONL lines", (context) => {
  const root = tempRoot(context);
  const event = actionEvent();
  const file = writeShard(root, [event]);
  fs.writeFileSync(file, `${JSON.stringify(event)}\n{broken\n`, "utf8");

  assert.throws(() => loadActionLedger(root), /:2: malformed JSON/);
});

test("ledger loading preserves operation and attempt identity", (context) => {
  const root = tempRoot(context);
  const event = actionEvent();
  writeShard(root, [event]);

  const [loaded] = loadActionLedger(root).events;
  assert.equal(loaded.operation_id, event.operation_id);
  assert.equal(loaded.attempt_id, event.attempt_id);
  assert.equal(loaded.parent_event_id, null);
  assert.equal(loaded.phase_seq, 1);
  assert.equal(loaded.idempotency_key_sha256, event.idempotency_key_sha256);
  assert.equal(loaded.occurred_at_source, "source");
});

test("ledger loading rejects duplicate JSON object members", (context) => {
  const root = tempRoot(context);
  const event = actionEvent();
  const file = writeShard(root, [event]);
  const statusMember = `"status":${JSON.stringify(event.action.status)}`;
  const line = JSON.stringify(event).replace(
    statusMember,
    `${statusMember},"\\u0073tatus":${JSON.stringify(event.action.status)}`,
  );
  assert.notEqual(line, JSON.stringify(event));
  fs.writeFileSync(file, `${line}\n`, "utf8");

  assert.throws(() => loadActionLedger(root), /duplicate JSON member "status"/);
});

test("ledger loading rejects invalid UTF-8 before parsing", (context) => {
  const root = tempRoot(context);
  const event = actionEvent();
  const file = writeShard(root, [event]);
  fs.writeFileSync(
    file,
    Buffer.concat([
      Buffer.from(JSON.stringify(event), "utf8"),
      Buffer.from([0xff, 0x0a]),
    ]),
  );

  assert.throws(() => loadActionLedger(root), /invalid UTF-8/);
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
  assert.throws(() => loadActionLedger(unsafeValueRoot), /attributes\.model/);
});

test("ledger loading rejects privacy-unsafe values outside attributes", () => {
  for (const status of [
    "secret@example.com",
    "https://internal.local",
    "https://localhost",
    "file:///var/lib/secret",
    "fd00::1",
    "169.254.169.254",
    "10.0.0.1:22",
    "ssh://alice:secret@10.0.0.1",
    "prefix:169.254.169.254",
    "file+ssh://10.0.0.1",
    "error:/home/alice/project",
    "endpoint:fd00::1",
    "tcp:fe80::1",
    "host:localhost",
    "host:localhost.",
    "host:cache.internal.local:443",
    "host:0:0:0:0:0:0:0:1",
    "host:127.1",
    "host:2130706433",
    "host:0x7f000001",
    "host:100.64.0.1",
    "host:0.0.0.0",
    "host:::ffff:127.0.0.1",
    ..."pousr".split("").map((kind) => `gh${kind}_${"a".repeat(36)}`),
    `github_pat_${"a".repeat(36)}`,
  ]) {
    assert.throws(
      () =>
        actionEvent({
          action: {
            name: "review",
            status,
            retryable: false,
            mutation: false,
          },
        }),
      /privacy-unsafe/,
    );
  }
});

test("ledger loading accepts ordinary repository-relative path segments", (context) => {
  for (const recordPath of [
    "records/home/report.md",
    "docs/private/index.md",
    "tmp/report.md",
  ]) {
    const baseline = actionEvent();
    const event = actionEvent({
        subject: {
          ...baseline.subject,
          record_path: recordPath,
        },
        evidence: baseline.evidence.map((evidence) => ({
          ...evidence,
          report_path: recordPath,
        })),
      });
    const root = tempRoot(context);
    writeShard(root, [event]);
    assert.doesNotThrow(() => loadActionLedger(root));
  }
});

test("ledger loading accepts embedded public hosts and IPv6-looking machine values", () => {
  for (const status of [
    "host:github.com",
    "endpoint:2606:4700:4700::1111",
    "https://github.com/openclaw/clawsweeper/actions/runs/123",
  ]) {
    assert.doesNotThrow(() =>
      actionEvent({
        action: {
          name: "review",
          status,
          retryable: false,
          mutation: false,
        },
      }),
    );
  }
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

  assert.throws(() => loadActionLedger(root), /shard producer identity/);
});

test("ledger loading rejects one producer identity across partition dates", (context) => {
  const root = tempRoot(context);
  const first = actionEvent();
  const second = actionEvent({
    event_key: actionEventKey("review.second", { number: 43 }),
    occurred_at: "2026-07-13T10:00:00.000Z",
    subject: {
      ...first.subject,
      number: 43,
    },
  });
  writeShard(root, [first], { partitionDate: "2026-07-12" });
  writeShard(root, [second], { partitionDate: "2026-07-13" });

  assert.throws(() => loadActionLedger(root), /producer identity already uses partition/);
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
  assert.throws(() => loadActionLedger(invalidTimestampRoot), /occurred_at:/);

  const incompleteTimestampRoot = tempRoot(context);
  const incompleteTimestampFile = writeShard(incompleteTimestampRoot, [event]);
  fs.writeFileSync(
    incompleteTimestampFile,
    `${JSON.stringify({ ...event, occurred_at: "2026-07-12" })}\n`,
    "utf8",
  );
  assert.throws(() => loadActionLedger(incompleteTimestampRoot), /occurred_at:/);

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
    repository: completed.producer.repository,
    sha: completed.producer.sha,
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
  assert.match(
    actionEventShardRelativePath(identity, [completed], 1, 2),
    /^ledger\/v1\/events\/2026\/07\/12\/openclaw-clawsweeper\/review\/100-1-review-3-[a-f0-9]{12}-part-000001-of-000002\.jsonl$/,
  );

  const root = tempRoot(context);
  writeShard(root, [earlier, completed], { partitionDate: "2026-07-12" });
  const loaded = loadActionLedger(root);
  assert.equal(loaded.source.shards[0].partition_date, "2026-07-12");
  assert.equal(loaded.events[0].occurred_at, "2026-07-11T23:59:00.000Z");
});

test("ledger loading requires complete and consistent multipart shard sets", (context) => {
  const incompleteRoot = tempRoot(context);
  writeShard(incompleteRoot, [actionEvent()], { shardIndex: 1, shardCount: 2 });
  assert.throws(() => loadActionLedger(incompleteRoot), /incomplete multipart shard set/);

  const inconsistentRoot = tempRoot(context);
  writeShard(inconsistentRoot, [actionEvent()], { shardIndex: 1, shardCount: 2 });
  writeShard(inconsistentRoot, [actionEvent()], { shardIndex: 2, shardCount: 3 });
  assert.throws(() => loadActionLedger(inconsistentRoot), /multipart shard count 3 conflicts/);
});

test("aggregate ledger loading rejects dangling causal parents", (context) => {
  const root = tempRoot(context);
  const event = actionEvent({ parent_event_id: "e".repeat(64) }, false);
  event.event_id = actionEventId(event.subject.repository, event.event_key);
  event.semantic_sha256 = actionEventSemanticSha256(event);
  writeShard(root, [event]);

  assert.throws(() => loadActionLedger(root), /references missing causal parent/);
});

test("aggregate causal parents stay within one operation attempt", (context) => {
  const parent = actionEvent({
    event_key: actionEventKey("review.parent", { number: 1 }),
    phase_seq: 1,
  });
  for (const [label, overrides] of [
    ["operation", { operation_id: "9".repeat(64) }],
    ["attempt", { attempt_id: "8".repeat(64) }],
  ]) {
    const root = tempRoot(context);
    const child = actionEvent({
      event_key: actionEventKey(`review.cross-${label}`, { number: 2 }),
      parent_event_id: parent.event_id,
      phase_seq: 2,
      ...overrides,
    });
    writeShard(root, [parent, child]);
    assert.throws(
      () => loadActionLedger(root),
      /causal parent outside its operation attempt/,
      label,
    );
  }
});

test("causal ordering uses phase ordinals within an attempt", (context) => {
  const root = tempRoot(context);
  const phaseOne = actionEvent({
    event_key: actionEventKey("review.phase-one", { number: 1 }),
    phase_seq: 1,
    occurred_at: "2026-07-12T11:00:00.000Z",
  });
  const phaseTwo = actionEvent({
    event_key: actionEventKey("review.phase-two", { number: 2 }),
    phase_seq: 2,
    occurred_at: "2026-07-12T10:00:00.000Z",
  });
  writeShard(root, [phaseTwo, phaseOne]);

  assert.deepEqual(
    loadActionLedger(root).events.map((event) => event.phase_seq),
    [1, 2],
  );

  const otherAttempt = actionEvent({
    event_key: actionEventKey("review.other-attempt", { number: 3 }),
    attempt_id: "f".repeat(64),
    occurred_at: "2026-07-12T10:30:00.000Z",
  });
  const permutations = [
    [phaseOne, phaseTwo, otherAttempt],
    [otherAttempt, phaseTwo, phaseOne],
    [phaseTwo, phaseOne, otherAttempt],
  ];
  const orders = permutations.map((events) =>
    sortActionEventsCausally(events, { phaseAware: true, validatePhase: true }).map(
      (event) => event.event_id,
    ),
  );
  assert.deepEqual(orders[1], orders[0]);
  assert.deepEqual(orders[2], orders[0]);
  assert.ok(orders[0].indexOf(phaseOne.event_id) < orders[0].indexOf(phaseTwo.event_id));

  phaseOne.parent_event_id = phaseTwo.event_id;
  phaseOne.semantic_sha256 = actionEventSemanticSha256(phaseOne);
  const invalidRoot = tempRoot(context);
  writeShard(invalidRoot, [phaseTwo, phaseOne]);
  assert.throws(
    () => loadActionLedger(invalidRoot),
    /does not advance its causal parent phase sequence/,
  );
});

test("phase ordering does not couple attempts from different operations", () => {
  const attemptId = "a".repeat(64);
  const operationOne = "1".repeat(64);
  const operationTwo = "2".repeat(64);
  const firstOperationPhaseOne = actionEvent({
    event_key: actionEventKey("review.operation-one-phase-one", { number: 1 }),
    operation_id: operationOne,
    attempt_id: attemptId,
    phase_seq: 1,
    occurred_at: "2026-07-12T09:00:00.000Z",
  });
  const firstOperationPhaseTwo = actionEvent({
    event_key: actionEventKey("review.operation-one-phase-two", { number: 2 }),
    operation_id: operationOne,
    attempt_id: attemptId,
    phase_seq: 2,
    occurred_at: "2026-07-12T10:00:00.000Z",
  });
  const secondOperationPhaseOne = actionEvent({
    event_key: actionEventKey("review.operation-two-phase-one", { number: 3 }),
    operation_id: operationTwo,
    attempt_id: attemptId,
    phase_seq: 1,
    occurred_at: "2026-07-12T11:00:00.000Z",
  });
  const secondOperationPhaseTwo = actionEvent({
    event_key: actionEventKey("review.operation-two-phase-two", { number: 4 }),
    operation_id: operationTwo,
    attempt_id: attemptId,
    phase_seq: 2,
    occurred_at: "2026-07-12T12:00:00.000Z",
  });

  const ordered = sortActionEventsCausally(
    [secondOperationPhaseTwo, firstOperationPhaseTwo, secondOperationPhaseOne, firstOperationPhaseOne],
    { phaseAware: true, validatePhase: true },
  ).map((event) => event.event_id);

  assert.ok(
    ordered.indexOf(firstOperationPhaseTwo.event_id) <
      ordered.indexOf(secondOperationPhaseOne.event_id),
  );
});

test("ledger loading preserves canonical causal generated-event order", (context) => {
  const root = tempRoot(context);
  const first = actionEvent({
    event_key: actionEventKey("review.first", { number: 1 }),
    occurred_at_source: "generated",
  });
  const second = actionEvent({
    event_key: actionEventKey("review.second", { number: 2 }),
    occurred_at_source: "generated",
  });
  const [lower, higher] = [first, second].sort((left, right) =>
    left.event_id.localeCompare(right.event_id),
  );
  higher.occurred_at = "2026-07-12T10:00:00.000Z";
  lower.occurred_at = "2026-07-12T10:01:00.000Z";
  lower.parent_event_id = higher.event_id;
  lower.phase_seq = higher.phase_seq + 1;
  lower.semantic_sha256 = actionEventSemanticSha256(lower);
  const file = writeShard(root, [lower, higher]);
  fs.writeFileSync(file, `${stableJson(higher)}\n${stableJson(lower)}\n`, "utf8");

  assert.doesNotThrow(() => loadActionLedger(root));
});

test("shard metadata follows exact timestamp order across offsets and fractions", (context) => {
  const root = tempRoot(context);
  const later = actionEvent({
    event_key: actionEventKey("review.later", { number: 42 }),
    occurred_at: "2026-07-12T10:00:00.0009Z",
  });
  const earlier = actionEvent({
    event_key: actionEventKey("review.earlier", { number: 43 }),
    occurred_at: "2026-07-12T12:00:00.0001+02:00",
    subject: { ...actionEvent().subject, number: 43 },
  });
  writeShard(root, [later, earlier]);

  const loaded = loadActionLedger(root);
  assert.equal(loaded.source.shards[0].first_occurred_at, earlier.occurred_at);
  assert.equal(loaded.source.shards[0].last_occurred_at, later.occurred_at);
  assert.deepEqual(
    loaded.events.map((event) => event.occurred_at),
    [earlier.occurred_at, later.occurred_at],
  );
});

test("ledger loading rejects a symlinked source root segment", (context) => {
  const root = tempRoot(context);
  const external = tempRoot(context);
  writeShard(external, [actionEvent()]);
  fs.mkdirSync(path.join(root, "ledger", "v1"), { recursive: true });
  fs.symlinkSync(
    path.join(external, "ledger", "v1", "events"),
    path.join(root, "ledger", "v1", "events"),
    "dir",
  );

  assert.throws(() => loadActionLedger(root), /source contains symlink/);
});

test("ledger loading rejects a dangling symlinked events root", (context) => {
  const root = tempRoot(context);
  fs.mkdirSync(path.join(root, "ledger", "v1"), { recursive: true });
  fs.symlinkSync(
    path.join(root, "missing-events"),
    path.join(root, "ledger", "v1", "events"),
    "dir",
  );

  assert.throws(() => loadActionLedger(root), /source contains symlink/);
});

test("shard paths reject invalid partition calendar dates", () => {
  const event = actionEvent();
  assert.throws(
    () =>
      actionEventShardRelativePath(
        {
          repository: event.producer.repository,
          sha: event.producer.sha,
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
          repository: first.producer.repository,
          sha: first.producer.sha,
          producer: "review",
          workflow: "sweep",
          job: "review-3",
          runId: "100",
          runAttempt: 1,
          partitionDate: "2026-07-12",
        },
        [first, conflicting],
      ),
    /action ledger event conflict/,
  );
});
