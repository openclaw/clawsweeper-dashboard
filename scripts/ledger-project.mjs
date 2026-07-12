#!/usr/bin/env node
import { randomUUID } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildActionLedgerProjection } from "./ledger-projections.mjs";
import { sortStable } from "./ledger-schema.mjs";

export function writeActionLedgerIndexes(sourceRoot, output, options = {}) {
  const resolvedSourceRoot = path.resolve(sourceRoot);
  const projection = buildActionLedgerProjection(resolvedSourceRoot, options);
  const outputDir = path.resolve(
    output ?? path.join(resolvedSourceRoot, "ledger", "v1", "indexes", "current"),
  );
  assertSafeOutputDirectory(resolvedSourceRoot, outputDir);
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

function assertSafeOutputDirectory(sourceRoot, outputDir) {
  assertNoSymlinkedOutputPath(sourceRoot, outputDir);
  const physicalSourceRoot = physicalPath(sourceRoot);
  const physicalOutputDir = physicalPath(outputDir);
  const indexesRoot = physicalPath(path.join(sourceRoot, "ledger", "v1", "indexes"));
  const eventsRoot = physicalPath(path.join(sourceRoot, "ledger", "v1", "events"));
  if (
    physicalOutputDir === indexesRoot ||
    !pathContains(indexesRoot, physicalOutputDir) ||
    pathContains(physicalOutputDir, physicalSourceRoot) ||
    pathContains(physicalOutputDir, eventsRoot) ||
    !pathContains(physicalSourceRoot, physicalOutputDir)
  ) {
    throw new Error(`action ledger output must be a dedicated index directory: ${outputDir}`);
  }
}

function assertNoSymlinkedOutputPath(sourceRoot, outputDir) {
  const boundary = commonAncestor(path.resolve(sourceRoot), path.resolve(outputDir));
  let current = path.resolve(outputDir);
  while (current !== boundary) {
    try {
      if (fs.lstatSync(current).isSymbolicLink()) {
        throw new Error(`action ledger index output contains symlink: ${current}`);
      }
    } catch (error) {
      if (error?.code !== "ENOENT") throw error;
    }
    const parent = path.dirname(current);
    if (parent === current) break;
    current = parent;
  }
}

function commonAncestor(left, right) {
  let candidate = left;
  while (!pathContains(candidate, right)) {
    const parent = path.dirname(candidate);
    if (parent === candidate) return parent;
    candidate = parent;
  }
  return candidate;
}

function physicalPath(value) {
  const resolved = path.resolve(value);
  const missingSegments = [];
  let existing = resolved;
  while (!pathEntryExists(existing)) {
    const parent = path.dirname(existing);
    if (parent === existing) {
      throw new Error(`cannot resolve action ledger path: ${resolved}`);
    }
    missingSegments.unshift(path.basename(existing));
    existing = parent;
  }
  let physical;
  try {
    physical = fs.realpathSync.native(existing);
  } catch (error) {
    throw new Error(`cannot resolve action ledger path: ${resolved}`, { cause: error });
  }
  return path.join(physical, ...missingSegments);
}

function pathEntryExists(value) {
  try {
    fs.lstatSync(value);
    return true;
  } catch (error) {
    if (error?.code === "ENOENT") return false;
    throw error;
  }
}

function pathContains(parent, candidate) {
  const relative = path.relative(parent, candidate);
  return relative === "" || (!relative.startsWith("..") && !path.isAbsolute(relative));
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
