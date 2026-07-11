#!/usr/bin/env node
import path from "node:path";
import { renderActionLedgerDashboard } from "./ledger-dashboard.mjs";
import { renderRepairDashboard } from "./repair-dashboard.mjs";
import { writeText } from "./source.mjs";
import { renderSweepDashboard } from "./sweep-dashboard.mjs";

const args = parseArgs(process.argv.slice(2));
const sourceRoot = path.resolve(args.source ?? process.env.CLAWSWEEPER_STATE ?? "../state");
const output = path.resolve(args.output ?? "README.md");

const body = `# ClawSweeper Dashboard

Generated from the durable state branch for [` +
  `openclaw/clawsweeper](https://github.com/openclaw/clawsweeper).

${renderSweepDashboard(sourceRoot)}

${renderActionLedgerDashboard(sourceRoot)}

${renderRepairDashboard(sourceRoot)}
`;

writeText(output, body);
console.log(JSON.stringify({ output, source: sourceRoot }));

function parseArgs(argv) {
  const parsed = {};
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--") continue;
    if (arg === "--source") parsed.source = requiredValue(argv, ++index, arg);
    else if (arg === "--output") parsed.output = requiredValue(argv, ++index, arg);
    else throw new Error(`Unknown argument: ${arg}`);
  }
  return parsed;
}

function requiredValue(argv, index, flag) {
  const value = argv[index];
  if (!value || value.startsWith("--")) throw new Error(`${flag} requires a value`);
  return value;
}
