import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import {
  actionEventShardRelativePath,
  sortActionEventsCausally,
} from "../scripts/ledger-events.mjs";
import {
  actionEventId,
  actionEventKey,
  actionEventSemanticSha256,
} from "../scripts/ledger-schema.mjs";

export function tempRoot(context) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "clawsweeper-ledger-"));
  context.after(() => fs.rmSync(root, { recursive: true, force: true }));
  return root;
}

export function actionEvent(overrides = {}, seal = true) {
  const event = {
    schema: "clawsweeper.state-ledger-event.v1",
    schema_version: 1,
    event_id: "",
    event_key: actionEventKey("review.completed", {
      repository: "openclaw/openclaw",
      number: 42,
      source_revision: "abc123",
    }),
    operation_id: "b".repeat(64),
    attempt_id: "c".repeat(64),
    parent_event_id: null,
    phase_seq: 1,
    idempotency_key_sha256: "d".repeat(64),
    semantic_sha256: "",
    occurred_at: "2026-07-12T10:00:00.000Z",
    occurred_at_source: "source",
    recorded_at: "2026-07-12T10:01:00.000Z",
    event_type: "review.completed",
    producer: {
      repository: "openclaw/clawsweeper",
      sha: "abc123",
      workflow: "sweep",
      job: "review-3",
      run_id: "100",
      run_attempt: 1,
      component: "review",
    },
    subject: {
      repository: "openclaw/openclaw",
      kind: "pull_request",
      number: 42,
      source_revision: "abc123",
      record_path: "records/openclaw-openclaw/items/42.md",
    },
    action: {
      name: "review",
      status: "completed",
      reason_code: "keep_open",
      retryable: false,
      mutation: false,
    },
    evidence: [
      {
        kind: "review_record",
        sha256: "a".repeat(64),
        report_path: "records/openclaw-openclaw/items/42.md",
        run_url: "https://github.com/openclaw/clawsweeper/actions/runs/100",
      },
    ],
    attributes: {
      cached: false,
      finding_count: 2,
      review_mode: "full",
    },
    privacy: {
      classification: "internal",
      redaction_version: "v1",
      fields_dropped: ["body", "prompt"],
    },
    ...overrides,
  };
  if (!seal) return event;
  event.event_id = actionEventId(event.subject.repository, event.event_key);
  event.semantic_sha256 = actionEventSemanticSha256(event);
  return event;
}

export function writeShard(root, events, options = {}) {
  const unique = [...new Map(events.map((event) => [event.event_id, event])).values()];
  const rank = new Map(
    sortActionEventsCausally(unique).map((event, index) => [event.event_id, index]),
  );
  const ordered = [...events].sort((left, right) => rank.get(left.event_id) - rank.get(right.event_id));
  const identity = {
    repository: ordered[0].producer.repository,
    sha: ordered[0].producer.sha,
    producer: ordered[0].producer.component,
    workflow: ordered[0].producer.workflow,
    job: ordered[0].producer.job,
    runId: ordered[0].producer.run_id,
    runAttempt: ordered[0].producer.run_attempt,
    partitionDate: options.partitionDate ?? "2026-07-12",
  };
  const relative = actionEventShardRelativePath(
    identity,
    ordered,
    options.shardIndex,
    options.shardCount,
  );
  const file = path.join(root, relative);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(
    file,
    `${ordered.map((event) => JSON.stringify(event)).join("\n")}\n`,
    "utf8",
  );
  return file;
}
