// Compares the saved demo output (scripts/whatsallowed-demo.txt) with what the latest whatsallowed prints.
// Run with `npm run check:demo`. It downloads whatsallowed from npm, so it is not part of `npm run check`.
// If it fails, update the saved output and the home page's terminal panel together, then run `npm run check`.
import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";

const fixture = "scripts/whatsallowed-demo.txt";
const lines = (t) => t.split(/\r?\n/).map((l) => l.trimEnd()).join("\n").trimEnd();
const saved = lines(readFileSync(fixture, "utf8"));
// A fixed command string, so this works the same with npx.cmd on Windows.
const now = lines(execSync("npx --yes whatsallowed@latest demo", { encoding: "utf8", env: { ...process.env, NO_COLOR: "1" } }));

if (now === saved) {
  console.log(`OK: the latest whatsallowed demo matches ${fixture}.`);
} else {
  const a = saved.split("\n"), b = now.split("\n");
  const i = a.findIndex((l, n) => l !== b[n]);
  const n = i < 0 ? Math.min(a.length, b.length) : i;
  console.error(`FAIL: the latest whatsallowed demo differs from ${fixture}, first at line ${n + 1}.`);
  console.error(`  saved:  ${a[n] ?? "(end)"}`);
  console.error(`  latest: ${b[n] ?? "(end)"}`);
  process.exit(1);
}
