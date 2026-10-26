// Refreshes data/tool-facts.json, the version and date shown on each home tool card.
// Run by hand when a tool ships: node scripts/update-tool-facts.mjs <whatsallowed-repo> <unclank-repo> [--ref origin/main]
// It reads the tool repos with git (no network), so fetch them first. build.mjs only reads the JSON file it writes,
// so a site build never depends on the tool repos or the network.
//   whatsallowed: version = package.json "version". Tested = the date of the commit that last changed eval/results.json,
//                 the file `npm run eval` writes. Only used when that file's own version matches package.json.
//   unclank:      version = .claude-plugin/plugin.json "version" (must match .cursor-plugin/plugin.json).
//                 Reviewed = the newest "Last reviewed" date in skills/*/SKILL.md. Unclank keeps no dated test
//                 results in its repo, so it has no "tested" date.
import { execFileSync } from "node:child_process";
import { writeFileSync } from "node:fs";

const args = process.argv.slice(2);
const refAt = args.indexOf("--ref");
const ref = refAt >= 0 ? args.splice(refAt, 2)[1] : "origin/main";
const [waRepo, ucRepo] = args;
if (!waRepo || !ucRepo) { console.error("Usage: node scripts/update-tool-facts.mjs <whatsallowed-repo> <unclank-repo> [--ref origin/main]"); process.exit(1); }

const git = (repo, ...a) => execFileSync("git", ["-c", "safe.directory=*", "-C", repo, ...a], { encoding: "utf8" }).trim();
const show = (repo, path) => git(repo, "show", `${ref}:${path}`);
const semver = /^\d+\.\d+\.\d+$/;
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const facts = {};

// What's Allowed
{
  const version = JSON.parse(show(waRepo, "package.json")).version;
  if (!semver.test(version)) throw new Error(`whatsallowed version ${version} is not x.y.z`);
  const entry = { version };
  const evalVersion = JSON.parse(show(waRepo, "eval/results.json")).version;
  if (evalVersion === version) {
    entry.tested = git(waRepo, "log", "-1", "--no-merges", "--format=%cs", ref, "--", "eval/results.json");
    entry.testedWhat = "accuracy run (eval/results.json, last committed date)";
  } else console.warn(`eval/results.json is for ${evalVersion}, not ${version}: leaving out the tested date.`);
  facts.whatsallowed = entry;
}

// Unclank
{
  const version = JSON.parse(show(ucRepo, ".claude-plugin/plugin.json")).version;
  const cursor = JSON.parse(show(ucRepo, ".cursor-plugin/plugin.json")).version;
  if (version !== cursor) throw new Error(`unclank plugin manifests disagree: ${version} and ${cursor}`);
  if (!semver.test(version)) throw new Error(`unclank version ${version} is not x.y.z`);
  const dates = git(ucRepo, "ls-tree", "-r", "--name-only", ref, "skills").split("\n").filter((p) => p.endsWith("/SKILL.md"))
    .map((p) => (show(ucRepo, p).match(/^Last reviewed: (\d{1,2}) ([A-Z][a-z]{2}) (\d{4})\./m) || []).slice(1))
    .filter((m) => m.length).map(([d, mon, y]) => `${y}-${String(MONTHS.indexOf(mon) + 1).padStart(2, "0")}-${d.padStart(2, "0")}`);
  const entry = { version };
  if (dates.length) { entry.reviewed = dates.sort().at(-1); entry.reviewedWhat = "newest 'Last reviewed' line in skills/*/SKILL.md"; }
  facts.unclank = entry;
}

writeFileSync(new URL("../data/tool-facts.json", import.meta.url), JSON.stringify(facts, null, 2) + "\n");
console.log(`Wrote data/tool-facts.json from ${ref}:\n` + JSON.stringify(facts, null, 2));
