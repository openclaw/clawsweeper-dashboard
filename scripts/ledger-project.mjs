#!/usr/bin/env node
import { randomUUID } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildActionLedgerProjection } from "./ledger-projections.mjs";
import { sortStable } from "./ledger-schema.mjs";

export function writeActionLedgerIndexes(sourceRoot, output, options = {}) {
  const projection = buildActionLedgerProjection(sourceRoot, options);
  const outputDir = path.resolve(
    output ?? path.join(sourceRoot, "ledger", "v1", "indexes", "current"),
  );
  const temporaryDir = `${outputDir}.tmp-${process.pid}-${randomUUID()}`;
  fs.mkdirSync(temporaryDir, { recursive: true });
  try {
    writeJson(path.join(temporaryDir, "source.json"), projection.source);
    writeJson(path.join(temporaryDir, "metrics.json"), projection.metrics);
    fs.rmSync(outputDir, { recursive: true, force: true });
    fs.mkdirSync(path.dirname(outputDir), { recursive: true });
    fs.renameSync(temporaryDir, outputDir);
  } finally {
    fs.rmSync(temporaryDir, { recursive: true, force: true });
  }
  return { output: outputDir, ...projection };
}

function writeJson(file, value) {
  fs.writeFileSync(file, `${JSON.stringify(sortStable(value), null, 2)}\n`, "utf8");
}

function parseArgs(argv) {
  const parsed = {};
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--") continue;
    if (arg === "--source") parsed.source = requiredValue(argv, ++index, arg);
    else if (arg === "--output") parsed.output = requiredValue(argv, ++index, arg);
    else if (arg === "--now") parsed.now = requiredValue(argv, ++index, arg);
    else throw new Error(`Unknown argument: ${arg}`);
  }
  return parsed;
}

function requiredValue(argv, index, flag) {
  const value = argv[index];
  if (!value || value.startsWith("--")) throw new Error(`${flag} requires a value`);
  return value;
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  const args = parseArgs(process.argv.slice(2));
  const source = path.resolve(args.source ?? process.env.CLAWSWEEPER_STATE ?? "../state");
  const result = writeActionLedgerIndexes(source, args.output, { now: args.now });
  console.log(
    JSON.stringify({
      output: result.output,
      source,
      shards: result.source.shard_count,
      events: result.source.event_count,
    }),
  );
}
