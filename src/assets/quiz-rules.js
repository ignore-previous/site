// Counting rules for the quiz check on the home page. Plain functions: no DOM, no network, no browser storage.
// The rules and their tell IDs come from the unclank-quiz skill:
//   D09-004  more than one defensible answer (here: two options marked correct, or the same option text twice)
//   D09-001  the key is the longest option
//   D09-003  answer-key position skew
// The skill gives few numbers. Where it says "about a quarter longer", "12 or more items", "8 or more" and "half the
// keys in one position" we use those. Where it only says "far more than its share" or "well above chance", the
// numbers in LIMITS are ours (editorial rules of thumb, like the skill's own quarter cut-off), not figures from the research.

export const LIMITS = {
  positionSetItems: 12,   // D09-003: a set of about 12 or more items
  smallSetMinCount: 5,    // D09-003 under 12 items: half the keys in one position, and at least this many
  heavyFactor: 2,         // D09-003 (ours): "far more than its share" = at least double
  rareFactor: 0.25,       // D09-003 (ours): "almost never used" = a quarter of its share or less
  cycleRepeats: 3,        // D09-003: a fixed order must repeat this many times to count
  longRatio: 1.25,        // D09-001: about a quarter longer than the next-longest option
  longMinGap: 5,          // D09-001 (ours): "a few characters longer is not a hit": the gap must be 5 or more
  nearTie: 2,             // D09-001 (ours): a near-tie is a key level with, or up to 2 characters shorter than, the longest other
  longestSetItems: 8,     // D09-001: across a set of 8 or more
  chanceAlpha: 0.05,      // D09-001 (ours): "well above chance" = a binomial tail below 5%
  maxLetters: 8,          // options A to H
};

const LETTERS = "ABCDEFGH";

// ---------- reading the paste ----------

const ABSTAIN = /^(?:i\s*(?:do\s*not|don'?t)\s+know|(?:i'?m\s+)?not\s+sure|don'?t\s+know|unsure|no\s+idea|prefer\s+not\s+to\s+(?:say|answer))\W*$/i;
export const isAbstention = (text) => ABSTAIN.test(String(text).replace(/[‘’]/g, "'").trim());

const QUESTION = /^(?:q(?:uestion)?\s*)?(\d{1,3})\s*[.):]\s*(.*)$/i;
const OPTION = /^(\*?)\s*\(?([A-Ha-h])\s*[.):]\s*(.*?)\s*(\*{0,2})$/;
const ANSWER = /^(?:answer|ans|key|correct(?:\s+answer)?)\s*[:=\-]\s*(.*)$/i;
const FEEDBACK = /^(?:explanation|why|feedback|rationale|note|source)\s*[:\-]/i;

function answerLetters(rest) {
  const out = [];
  for (const piece of rest.split(/[,;&\/+]|\band\b/i)) {
    const t = piece.trim();
    if (!t) continue;
    const m = /^\(?([A-Ha-h])\)?(?:[\s.:)].*)?$/.exec(t);
    if (!m) return null;
    out.push(m[1].toUpperCase());
  }
  return out.length ? out : null;
}

// Reads the paste format: numbered questions, options A) to H), the key marked with * or an "Answer: B" line.
// Reads forgivingly and returns what it could not read, instead of stopping.
export function parseQuiz(text) {
  const lines = String(text).replace(/^﻿/, "").split(/\r\n|\r|\n/);
  const items = [], problems = [];
  let cur = null;
  const note = (line, msg) => problems.push({ line, text: msg });
  const finish = () => {
    if (!cur) return;
    const it = cur; cur = null;
    const id = `Item ${it.n} (line ${it.line})`;
    if (it.options.length < 2) { note(it.line, `${id} has fewer than two options, so it was left out.`); return; }
    const have = new Set(it.options.map((o) => o.label));
    const fromAnswer = (it.answer || []).filter((l) => have.has(l));
    for (const l of (it.answer || [])) if (!have.has(l)) note(it.answerLine, `${id}: the answer line names ${l}, but there is no option ${l}.`);
    const marks = it.options.filter((o) => o.marked).map((o) => o.label);
    const same = marks.length && fromAnswer.length && marks.join() === [...fromAnswer].sort().join();
    let keys = marks.length ? marks : fromAnswer;
    let state = keys.length === 0 ? "none" : keys.length > 1 ? "multi" : "ok";
    if (marks.length && fromAnswer.length && !same) {
      state = "conflict";
      note(it.line, `${id}: the * marks (${marks.join(", ")}) and the answer line (${fromAnswer.join(", ")}) disagree, so its key was not counted.`);
    } else if (state === "none") {
      note(it.line, `${id} has no key marked, so it was left out of the counts. Mark one with * or an "Answer:" line.`);
    }
    items.push({ n: it.n, line: it.line, stem: it.stem.join(" ").trim(), options: it.options, keys, state });
  };
  lines.forEach((raw, idx) => {
    const ln = idx + 1;
    const t = raw.replace(/[ \t]+/g, " ").trim();
    if (!t) return;
    const clip = t.length > 50 ? t.slice(0, 50) + "…" : t;
    if (cur) {
      const a = ANSWER.exec(t);
      if (a && cur.options.length) {
        const letters = answerLetters(a[1]);
        if (letters) { cur.answer = (cur.answer || []).concat(letters); cur.answerLine = ln; }
        else note(ln, `Line ${ln} ("${clip}") is an answer line, but it does not give a letter such as "Answer: B".`);
        return;
      }
      const o = OPTION.exec(t);
      if (o) {
        const label = o[2].toUpperCase();
        if (cur.options.some((x) => x.label === label)) { note(ln, `Line ${ln}: option ${label} appears twice in item ${cur.n}, so the second one was skipped.`); return; }
        cur.options.push({ label, text: o[3].replace(/\s+/g, " ").trim(), marked: !!(o[1] || o[4]), line: ln });
        return;
      }
    }
    const q = QUESTION.exec(t);
    if (q) {
      finish();
      cur = { n: Number(q[1]), line: ln, stem: [q[2]], options: [], answer: null, answerLine: 0 };
      return;
    }
    if (!cur) { note(ln, `Line ${ln} ("${clip}") came before the first numbered question, so it was skipped.`); return; }
    if (cur.options.length === 0) { cur.stem.push(t); return; }
    if (FEEDBACK.test(t)) return;
    note(ln, `Line ${ln} ("${clip}") in item ${cur.n} was not read. Put each option on one line, starting with A) or B).`);
  });
  finish();
  return { items, problems };
}

// ---------- helpers ----------

const normText = (s) => s.toLowerCase().replace(/[‘’]/g, "'").replace(/[\s.,;:!?]+$/g, "").replace(/\s+/g, " ").trim();
const plural = (n, one, many) => `${n} ${n === 1 ? one : many ?? one + "s"}`;
export const list = (arr) => (arr.length < 2 ? arr.join("") : arr.slice(0, -1).join(", ") + " and " + arr[arr.length - 1]);
const where = (it) => `Item ${it.n} (line ${it.line})`;
const itemWord = (nums) => (nums.length === 1 ? "item " : "items ") + list(nums);

// P(X >= x) for X ~ Binomial(n, p).
export function binomialTail(n, x, p) {
  if (x <= 0) return 1;
  if (x > n) return 0;
  let pmf = Math.pow(1 - p, n), cdf = 0;
  for (let k = 0; k < x; k++) { cdf += pmf; pmf *= ((n - k) / (k + 1)) * (p / (1 - p)); }
  return Math.max(0, 1 - cdf);
}

// The options that count as answers: an abstention such as "Not sure" is left out.
const answerOptions = (it) => it.options.filter((o) => !isAbstention(o.text));
const oneKey = (it) => it.state === "ok" && !isAbstention(it.options.find((o) => o.label === it.keys[0])?.text ?? "");

// ---------- D09-004: more than one defensible answer (mechanical part) ----------

export function checkDoubled(items) {
  const found = [];
  for (const it of items) {
    if (it.state === "multi") {
      found.push({ where: where(it), item: it.n, text: `${list(it.keys)} are ${it.keys.length === 2 ? "both" : "all"} marked correct.` });
    }
    const seen = new Map();
    for (const o of it.options) {
      const k = normText(o.text);
      if (!k) continue;
      if (seen.has(k)) found.push({ where: where(it), item: it.n, text: `Options ${seen.get(k)} and ${o.label} have the same text ("${o.text.length > 40 ? o.text.slice(0, 40) + "…" : o.text}").` });
      else seen.set(k, o.label);
    }
  }
  const nums = [...new Set(found.map((f) => f.item))];
  return {
    id: "D09-004", name: "Two right answers", status: found.length ? "found" : "clear", found,
    summary: found.length ? `Two options can be right in ${itemWord(nums)}.` : `No item has two options marked correct or two options with the same text.`,
    fix: "Keep one right answer: change the other option so it is wrong, or split the question in two.",
  };
}

// ---------- D09-001: the key is the longest option ----------

export function checkLongest(items) {
  const rows = [];
  for (const it of items) {
    if (!oneKey(it)) continue;
    const key = it.options.find((o) => o.label === it.keys[0]);
    const others = answerOptions(it).filter((o) => o !== key);
    if (!others.length) continue;
    const kl = key.text.length, ol = others.map((o) => o.text.length), max = Math.max(...ol);
    rows.push({ it, kl, ol, max, strict: kl > max, near: kl <= max && max - kl <= LIMITS.nearTie, hit: max > 0 && kl >= LIMITS.longRatio * max && kl - max >= LIMITS.longMinGap, p: 1 / (others.length + 1) });
  }
  const found = rows.filter((r) => r.hit).map((r) => ({ where: where(r.it), item: r.it.n, text: `The key is ${r.kl} characters; the other options are ${list(r.ol.map(String))}.` }));
  const n = rows.length, strict = rows.filter((r) => r.strict).length, near = rows.filter((r) => r.near).length;
  const chance = rows.reduce((s, r) => s + r.p, 0) / (n || 1);
  const expected = chance * n;
  const tally = `The key is the longest option in ${strict} of ${n} items. By chance that would be about ${expected < 10 ? Math.round(expected * 10) / 10 : Math.round(expected)} (${Math.round(chance * 100)}% of items). Near-ties, counted separately: ${near}.`;
  let setHit = false, setNote = "";
  if (n >= LIMITS.longestSetItems) {
    setHit = binomialTail(n, strict, chance) < LIMITS.chanceAlpha;
    if (setHit) found.push({ where: "Whole set", item: null, text: tally });
  } else if (n) setNote = `Under ${LIMITS.longestSetItems} items with one key, so the set tally is not judged.`;
  const nums = found.filter((f) => f.item != null).map((f) => f.item);
  let summary;
  if (!n) summary = "No item had one clear key to measure.";
  else if (found.length) summary = `${nums.length ? `The key is at least a quarter longer than every other option in ${itemWord(nums)}. ` : ""}${setHit ? "Across the set, longest keys are well above chance." : ""}`.trim();
  else summary = "No key stands out for length.";
  return {
    id: "D09-001", name: "Key is the longest option", status: !n ? "skipped" : found.length ? "found" : "clear", found, summary, note: setNote, tally: setHit ? "" : tally, stats: { n, strict, near, chance, setHit },
    fix: "Write the other options at the same length and detail as the key.",
  };
}

// ---------- D09-003: answer-key position skew ----------

export function checkPositions(items) {
  const rows = items.filter(oneKey);
  const n = rows.length;
  const dropped = new Map();
  const letters = new Set();
  for (const it of rows) for (const o of answerOptions(it)) letters.add(o.label);
  for (const it of rows) for (const o of it.options) if (isAbstention(o.text)) dropped.set(o.text.toLowerCase().replace(/\W+$/g, ""), o.text.replace(/\W+$/g, ""));
  const positions = [...letters].sort();
  const k = positions.length;
  const counts = Object.fromEntries(positions.map((l) => [l, 0]));
  for (const it of rows) if (counts[it.keys[0]] !== undefined) counts[it.keys[0]]++;
  const abstentionNote = dropped.size ? `${list([...dropped.values()].map((t) => `"${t}"`))} ${dropped.size === 1 ? "is" : "are"} an abstention option, a design choice and not skew, so it is left out of the count. ${plural(k, "answer option")} remain${k === 1 ? "s" : ""}.` : "";
  const tally = `Keys by position, across ${plural(n, "item")} with one key: ${positions.map((l) => `${l} ${counts[l]}`).join(", ")}.`;
  const out = { id: "D09-003", name: "Answer-key position", found: [], tally, note: abstentionNote, stats: { n, k, counts }, fix: "Shuffle the options (in code if you generate the quiz), then tally the keys again." };
  if (n < LIMITS.smallSetMinCount || k < 2) {
    return { ...out, status: "skipped", summary: `Too few items with one key (${n}) to judge key positions.` };
  }
  const share = n / k;
  const keysOf = (l) => rows.filter((it) => it.keys[0] === l).map((it) => it.n);
  if (n >= LIMITS.positionSetItems) {
    for (const l of positions) {
      const even = Math.round(share * 10) / 10;
      if (counts[l] >= LIMITS.heavyFactor * share) out.found.push({ where: "Whole set", item: null, text: `${l} is the key in ${counts[l]} of ${n} items. An even spread would be about ${even}.` });
      else if (counts[l] <= LIMITS.rareFactor * share) out.found.push({ where: "Whole set", item: null, text: `${l} is almost never the key: ${counts[l]} of ${n} items. An even spread would be about ${even}.` });
    }
    const seq = rows.map((it) => it.keys[0]);
    for (let p = 2; p <= Math.min(k, 6); p++) {
      if (n < LIMITS.cycleRepeats * p) break;
      if (seq.every((v, i) => i < p || v === seq[i - p]) && new Set(seq.slice(0, p)).size > 1) {
        out.found.push({ where: "Whole set", item: null, text: `The keys repeat the fixed order ${seq.slice(0, p).join(", ")} from item ${rows[0].n} to item ${rows[n - 1].n}.` });
        break;
      }
    }
  } else {
    for (const l of positions) {
      if (counts[l] >= LIMITS.smallSetMinCount && counts[l] * 2 >= n) out.found.push({ where: "Whole set", item: null, text: `${l} is the key in ${counts[l]} of ${n} items (${itemWord(keysOf(l))}), half or more.` });
    }
  }
  const small = n < LIMITS.positionSetItems;
  const summary = out.found.length
    ? "The keys are not spread evenly."
    : small ? `Under ${LIMITS.positionSetItems} items, so only an extreme skew is flagged, and none was found.` : "No position is used far more or far less than its share, and no fixed order repeats.";
  return { ...out, status: out.found.length ? "found" : "clear", summary, small };
}

// ---------- the whole check ----------

export function analyse(text) {
  const { items, problems } = parseQuiz(text);
  const checks = [checkDoubled(items), checkLongest(items), checkPositions(items)];
  const hits = checks.reduce((s, c) => s + c.found.length, 0);
  const withKey = items.filter(oneKey).length;
  return { items, problems, checks, hits, withKey };
}
