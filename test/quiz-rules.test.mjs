// Tests for the counting rules behind the quiz check (src/assets/quiz-rules.js). Run with `node --test`.
import { test } from "node:test";
import assert from "node:assert/strict";
import { parseQuiz, analyse, checkDoubled, checkLongest, checkPositions, binomialTail, isAbstention, LIMITS } from "../src/assets/quiz-rules.js";
import { SAMPLES, FORMAT_EXAMPLE } from "../src/assets/quiz-samples.js";

const L = "ABCDEFGH";
// Builds a quiz in the paste format. keys: the key letter of each item. len(i, letter) gives each option's length in characters.
function quiz(keys, { len = () => 10, options = 4 } = {}) {
  return keys.map((k, i) => {
    const rows = [];
    for (let j = 0; j < options; j++) {
      const l = L[j];
      const t = `o${i + 1}${l}`.padEnd(len(i, l), "x");
      rows.push(`${l}) ${t}${l === k ? " *" : ""}`);
    }
    return `${i + 1}. Question ${i + 1}?\n${rows.join("\n")}`;
  }).join("\n\n");
}
const items = (text) => parseQuiz(text).items;
const seq = (str) => str.split("");
const ids = (r) => Object.fromEntries(r.checks.map((c) => [c.id, c.status]));
// One item: the key (option A) is keyLen characters, the others are the given lengths. Each option has different text.
const mk = (keyLen, others) => `1. Q?\nA) ${"k".repeat(keyLen)} *\n${others.map((n, i) => `${"BCD"[i]}) ${"xyz"[i].repeat(n)}`).join("\n")}`;

// ---------- reading the paste ----------

test("reads numbered questions, options and a * key", () => {
  const { items: it, problems } = parseQuiz(FORMAT_EXAMPLE);
  assert.equal(it.length, 2);
  assert.deepEqual(it[0].keys, ["B"]);
  assert.equal(it[0].options[1].text, "Mercury");
  assert.deepEqual(it[1].keys, ["A"]);
  assert.equal(problems.length, 0);
});

test("reads forgivingly: Q1:, (a), lowercase letters, CRLF, wrapped stems, leading * and Answer lines", () => {
  const text = "Q1: Which\r\nof these?\r\n(a) one\r\n(b) two *\r\n\r\n2) Next?\r\n*A. yes\r\nB. no\r\nkey = a\r\n\r\n3. Third?\r\nA) x\r\nB) y\r\nAnswer: (b) y\r\nExplanation: because.";
  const { items: it, problems } = parseQuiz(text);
  assert.equal(it.length, 3);
  assert.equal(it[0].stem, "Which of these?");
  assert.deepEqual(it.map((x) => x.keys), [["B"], ["A"], ["B"]]);
  assert.equal(problems.length, 0);
});

test("says what it could not read, with line numbers", () => {
  const text = "My quiz\n1. First?\nA) a\nB) b *\nthis line wraps an option\n\n2. Second?\nA) a\nB) b\n";
  const { items: it, problems } = parseQuiz(text);
  assert.equal(it.length, 2);
  const msgs = problems.map((p) => p.text).join("\n");
  assert.match(msgs, /Line 1 .*before the first numbered question/);
  assert.match(msgs, /Line 5 .*was not read/);
  assert.match(msgs, /Item 2 \(line 7\) has no key marked/);
  assert.equal(it[1].state, "none");
});

test("an item with fewer than two options is left out and reported", () => {
  const { items: it, problems } = parseQuiz("1. Only one?\nA) lonely *\n\n2. Fine?\nA) a *\nB) b");
  assert.equal(it.length, 1);
  assert.match(problems[0].text, /fewer than two options/);
});

test("a * and an Answer line that disagree are reported and the key is not counted", () => {
  const text = "1. Q?\nA) a *\nB) b\nAnswer: B";
  const { items: it, problems } = parseQuiz(text);
  assert.equal(it[0].state, "conflict");
  assert.match(problems[0].text, /disagree/);
  assert.equal(analyse(text).withKey, 0);
});

test("an answer line naming a missing option, and a repeated option label, are reported", () => {
  const a = parseQuiz("1. Q?\nA) a\nB) b\nAnswer: D");
  assert.match(a.problems.map((p) => p.text).join(), /no option D/);
  const b = parseQuiz("1. Q?\nA) a *\nA) again\nB) b");
  assert.match(b.problems[0].text, /option A appears twice/);
  assert.equal(b.items[0].options.length, 2);
});

test("an answer line without a letter is reported", () => {
  const { problems } = parseQuiz("1. Q?\nA) a\nB) b\nAnswer: Mercury");
  assert.match(problems.map((p) => p.text).join(), /does not give a letter/);
});

test("empty and junk input give no items and no crash", () => {
  assert.deepEqual(parseQuiz("").items, []);
  const r = analyse("hello\nworld");
  assert.equal(r.items.length, 0);
  assert.equal(r.problems.length, 2);
  assert.ok(r.checks.every((c) => c.found.length === 0));
});

// ---------- D09-004: two right answers ----------

test("D09-004: two * marks on one item are found", () => {
  const r = checkDoubled(items("1. Q?\nA) a *\nB) b *\nC) c\n\n2. Q?\nA) a\nB) b *"));
  assert.equal(r.status, "found");
  assert.equal(r.found.length, 1);
  assert.equal(r.found[0].item, 1);
  assert.match(r.found[0].text, /A and B are both marked correct/);
});

test("D09-004: 'Answer: B, C' and 'Answer: B and C' are two keys", () => {
  assert.equal(checkDoubled(items("1. Q?\nA) a\nB) b\nC) c\nAnswer: B, C")).status, "found");
  assert.equal(checkDoubled(items("1. Q?\nA) a\nB) b\nC) c\nAnswer: B and C")).status, "found");
});

test("D09-004: the same option text twice is found, ignoring case and a trailing full stop", () => {
  const r = checkDoubled(items("1. Q?\nA) Mercury *\nB) mercury.\nC) Mars"));
  assert.equal(r.status, "found");
  assert.match(r.found[0].text, /Options A and B have the same text/);
});

test("D09-004: one key and different options is clear", () => {
  assert.equal(checkDoubled(items(quiz(seq("ABCDABCD")))).status, "clear");
});

// ---------- D09-001: the key is the longest option ----------

test("D09-001: a key a quarter longer than the next-longest is a hit; just under is not", () => {
  assert.equal(checkLongest(items(mk(25, [20, 10, 10]))).found.length, 1); // 1.25 exactly, 5 more
  assert.equal(checkLongest(items(mk(24, [20, 10, 10]))).found.length, 0); // 1.20
  assert.equal(checkLongest(items(mk(88, [41, 39, 44]))).found.length, 1); // the skill's own example
});

test("D09-001: a key only a few characters longer is not a hit on its own", () => {
  assert.equal(checkLongest(items(mk(10, [7, 6, 6]))).found.length, 0); // 1.43 but only 3 more
  assert.equal(checkLongest(items(mk(20, [16, 10, 10]))).found.length, 0); // 1.25 but only 4 more
  assert.equal(LIMITS.longMinGap, 5);
});

test("D09-001: the hit compares with the next-longest option, not the average", () => {
  assert.equal(checkLongest(items(mk(30, [29, 5, 5]))).found.length, 0);
});

test("D09-001: strictly longest and near-ties are counted separately", () => {
  const text = [mk(30, [10, 10, 10]), mk(10, [10, 8, 8]), mk(10, [12, 8, 8]), mk(10, [13, 8, 8]), mk(10, [8, 8, 8])]
    .map((t, i) => t.replace(/^1\./, `${i + 1}.`)).join("\n\n");
  const r = checkLongest(items(text));
  assert.equal(r.stats.n, 5);
  assert.equal(r.stats.strict, 2); // 30 vs 10, and 10 vs 8
  assert.equal(r.stats.near, 2); // level at 10, and 2 short of 12
  assert.match(r.tally, /longest option in 2 of 5 items/);
  assert.match(r.tally, /Near-ties, counted separately: 2/);
});

test("D09-001: the set tally needs 8 items with one key", () => {
  const longKeys = (n) => quiz(seq("ABCDABCDABCD".slice(0, n)), { len: (i, l) => (l === "ABCD"[i % 4] ? 40 : 10) });
  const seven = checkLongest(items(longKeys(7)));
  assert.equal(seven.stats.setHit, false);
  assert.match(seven.note, /Under 8 items/);
  const eight = checkLongest(items(longKeys(8)));
  assert.equal(eight.stats.setHit, true);
  assert.ok(eight.found.some((f) => f.where === "Whole set"));
});

test("D09-001: longest keys at about the chance rate are not a set finding", () => {
  // 12 items, 4 options: the key is the longest in 3 (the chance rate).
  const r = checkLongest(items(quiz(seq("ABCDABCDABCD"), { len: (i, l) => (i < 3 && l === "ABCD"[i % 4] ? 14 : 10) })));
  assert.equal(r.stats.strict, 3);
  assert.equal(r.stats.setHit, false);
  assert.equal(r.status, "clear");
});

test("D09-001: items with two keys or no key are not measured", () => {
  const r = checkLongest(items("1. Q?\nA) aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa *\nB) bb *\nC) cc"));
  assert.equal(r.stats.n, 0);
  assert.equal(r.status, "skipped");
});

test("D09-001: a 'Not sure' option is left out of the comparison and of the chance rate", () => {
  const key = "a much longer key than the rest";
  const r = checkLongest(items(`1. Q?\nA) short one\nB) ${key} *\nC) short two\nD) Not sure`));
  assert.equal(r.found.length, 1);
  assert.match(r.found[0].text, new RegExp(`key is ${key.length} characters; the other options are 9 and 9`));
  assert.ok(Math.abs(r.stats.chance - 1 / 3) < 1e-9); // 3 answer options, not 4
});

// ---------- D09-003: position skew ----------

test("D09-003: under 5 items with one key is not judged", () => {
  assert.equal(checkPositions(items(quiz(seq("BBBB")))).status, "skipped");
});

test("D09-003: under 12 items only an extreme skew is flagged (half or more, and at least 5)", () => {
  assert.equal(checkPositions(items(quiz(seq("BBBBBACDAC")))).status, "found"); // 5 of 10
  assert.equal(checkPositions(items(quiz(seq("BBBBACDA")))).status, "clear"); // 4 of 8: half, but under 5
  assert.equal(checkPositions(items(quiz(seq("BBBACDAC")))).status, "clear");
  const r = checkPositions(items(quiz(seq("BBBBBACDAC"))));
  assert.equal(r.small, true);
  assert.match(r.found[0].text, /B is the key in 5 of 10/);
});

test("D09-003: under 12 items a fixed repeating order is not flagged", () => {
  assert.equal(checkPositions(items(quiz(seq("ACBDACBDACB")))).status, "clear"); // 11 items
});

test("D09-003: with 12 or more items, double the share is flagged and under double is not", () => {
  assert.equal(checkPositions(items(quiz(seq("BBBBBBACDACD")))).status, "found"); // B 6 of 12; share 3
  assert.equal(checkPositions(items(quiz(seq("BBBBBACDCDAD")))).status, "clear"); // B 5 of 12
});

test("D09-003: a position that is almost never the key is flagged (the skill's 9 B's and no D)", () => {
  const r = checkPositions(items(quiz(seq("BBBBBBBBBAAC"))));
  assert.equal(r.status, "found");
  assert.ok(r.found.some((f) => /B is the key in 9 of 12/.test(f.text)));
  assert.ok(r.found.some((f) => /D is almost never the key: 0 of 12/.test(f.text)));
  // D used once in 12: 1 is more than a quarter of the share (3), so it passes. Never used: flagged.
  assert.equal(checkPositions(items(quiz(seq("ABCDABCABCAB")))).found.length, 0);
  assert.ok(checkPositions(items(quiz(seq("ABCABBCACBAC")))).found.some((f) => /D is almost never/.test(f.text)));
});

test("D09-003: a fixed repeating order is a skew too, whatever the length of the cycle", () => {
  const r = checkPositions(items(quiz(seq("ACBDACBDACBD"))));
  assert.equal(r.status, "found");
  assert.match(r.found[0].text, /fixed order A, C, B, D from item 1 to item 12/);
  assert.match(checkPositions(items(quiz(seq("ABABABABABAB")))).found.map((f) => f.text).join(), /fixed order A, B/);
  assert.match(checkPositions(items(quiz(seq("CADCADCADCAD")))).found.map((f) => f.text).join(), /fixed order C, A, D/);
});

test("D09-003: a cycle that breaks once is not a fixed order", () => {
  assert.equal(checkPositions(items(quiz(seq("ACBDACBDACDB")))).found.some((f) => /fixed order/.test(f.text)), false);
});

test("D09-003: an even-looking spread passes and shows its tally", () => {
  const r = checkPositions(items(quiz(seq("CADBBDACDBCB"))));
  assert.equal(r.status, "clear");
  assert.match(r.tally, /A 2, B 4, C 3, D 3/);
});

const withNotSure = (keys) => keys.map((k, i) => `${i + 1}. Q${i + 1}?\n${"ABC".split("").map((l) => `${l}) o${i}${l}${l === k ? " *" : ""}`).join("\n")}\nD) Not sure`).join("\n\n");

test("D09-003: a 'Not sure' option never marked as key is left out; the rest is still checked", () => {
  const even = checkPositions(items(withNotSure(seq("ABCCBAACBBCA"))));
  assert.equal(even.status, "clear");
  assert.equal(even.stats.k, 3);
  assert.match(even.note, /"Not sure" is an abstention option/);
  assert.match(even.note, /3 answer options remain/);
  const skew = checkPositions(items(withNotSure(seq("AAAAAAAABCBC"))));
  assert.equal(skew.status, "found");
  assert.ok(skew.found.some((f) => /A is the key in 8 of 12/.test(f.text)));
  const cycle = checkPositions(items(withNotSure(seq("ABCABCABCABC"))));
  assert.match(cycle.found.map((f) => f.text).join(), /fixed order A, B, C/);
});

test("D09-003: any other option that is never the key still counts", () => {
  const plain = (keys) => keys.map((k, i) => `${i + 1}. Q${i + 1}?\n${"ABCD".split("").map((l) => `${l}) o${i}${l}${l === k ? " *" : ""}`).join("\n")}`).join("\n\n");
  const r = checkPositions(items(plain(seq("ABCCBAACBBCA"))));
  assert.equal(r.status, "found");
  assert.ok(r.found.some((f) => /D is almost never/.test(f.text)));
});

test("an abstention option marked as the key is not counted", () => {
  assert.equal(analyse("1. Q?\nA) a\nB) b\nC) Not sure *").withKey, 0);
});

test("isAbstention knows the usual wordings and nothing else", () => {
  for (const t of ["Not sure", "not sure.", "I don't know", "I don’t know", "I'm not sure", "Unsure", "No idea", "Prefer not to say"]) assert.equal(isAbstention(t), true, t);
  for (const t of ["None of the above", "Pass", "Sure", "Not surely", "Know"]) assert.equal(isAbstention(t), false, t);
});

// ---------- numbers and the samples ----------

test("binomialTail matches known values", () => {
  assert.ok(Math.abs(binomialTail(1, 1, 0.5) - 0.5) < 1e-12);
  assert.ok(Math.abs(binomialTail(8, 5, 0.25) - 0.02729) < 1e-4);
  assert.equal(binomialTail(5, 0, 0.3), 1);
  assert.equal(binomialTail(5, 6, 0.3), 0);
});

test("the flawed sample shows each planted flaw and the clean sample shows none", () => {
  const flawed = analyse(SAMPLES.find((s) => s.id === "flawed").text);
  assert.deepEqual(ids(flawed), { "D09-004": "found", "D09-001": "found", "D09-003": "found" });
  assert.equal(flawed.problems.length, 0);
  assert.equal(flawed.items.length, 14);
  const clean = analyse(SAMPLES.find((s) => s.id === "clean").text);
  assert.deepEqual(ids(clean), { "D09-004": "clear", "D09-001": "clear", "D09-003": "clear" });
  assert.equal(clean.problems.length, 0);
  assert.equal(clean.hits, 0);
});
