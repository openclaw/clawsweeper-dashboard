import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import {
  LedgerConflictError,
  loadActionLedger,
} from "../scripts/ledger-events.mjs";
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
  assert.throws(() => loadActionLedger(unsafeNameRoot), /attributes\.comment_body/);

  const unsafeValueRoot = tempRoot(context);
  const unsafeValueFile = writeShard(unsafeValueRoot, [base]);
  fs.writeFileSync(
    unsafeValueFile,
    `${JSON.stringify({ ...base, attributes: { model: "/Users/example/private/repo" } })}\n`,
    "utf8",
  );
  assert.throws(() => loadActionLedger(unsafeValueRoot), /privacy-unsafe attribute value/);
});

test("ledger dedupe keeps the deterministic first-writer representative", (context) => {
  const root = tempRoot(context);
  const later = actionEvent({ recorded_at: "2026-07-12T10:02:00.000Z" });
  const earlier = { ...later, recorded_at: "2026-07-12T10:01:00.000Z" };
  writeShard(root, [later, earlier]);

  const loaded = loadActionLedger(root);

  assert.equal(loaded.source.raw_event_count, 2);
  assert.equal(loaded.source.event_count, 1);
  assert.equal(loaded.source.duplicate_count, 1);
  assert.equal(loaded.events[0].recorded_at, "2026-07-12T10:01:00.000Z");
});
