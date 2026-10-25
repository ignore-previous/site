// The quiz check panel on the home page. It reads the pasted text with quiz-rules.js and shows the result.
// Everything stays on the page: no network calls, no browser storage, nothing is kept after you leave.
import { analyse } from "./quiz-rules.js";
import { SAMPLES, FORMAT_EXAMPLE } from "./quiz-samples.js";

const root = document.getElementById("quiz-check");
if (root) {
  const $ = (id) => document.getElementById(id);
  const text = $("qc-text"), sample = $("qc-sample"), status = $("qc-status"), out = $("qc-results");
  const EVIDENCE = "https://github.com/ignore-previous/unclank/blob/main/skills/unclank-quiz/references/evidence.md";
  const SHORT = { "D09-004": "two right answers", "D09-001": "the key is the longest option", "D09-003": "key positions" };
  const BADGE = { found: "Found", clear: "Nothing found", skipped: "Not enough items" };

  const el = (tag, cls, txt) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (txt != null) n.textContent = txt;
    return n;
  };
  const bold = (parent, strong, rest) => { parent.append(el("b", "", strong), document.createTextNode(" " + rest)); return parent; };

  $("qc-format").textContent = FORMAT_EXAMPLE;
  for (const s of SAMPLES) sample.append(Object.assign(el("option", "", s.label), { value: s.id }));

  function block(c) {
    const s = el("section", "qc-res");
    s.dataset.state = c.status;
    const h = el("h5");
    h.append(el("code", "qc-id", c.id), document.createTextNode(c.name), el("span", "qc-badge", BADGE[c.status]));
    s.append(h);
    if (c.summary) s.append(el("p", "", c.summary));
    if (c.found.length) {
      const ul = el("ul");
      for (const f of c.found) ul.append(bold(el("li"), f.where + ".", f.text));
      s.append(ul);
    }
    if (c.tally) s.append(el("p", "fine", c.tally));
    if (c.note) s.append(el("p", "fine", c.note));
    if (c.found.length) s.append(bold(el("p", "qc-fix"), "Fix:", c.fix));
    return s;
  }

  function say(msg) {
    // Clear first so a repeat of the same message is announced again.
    status.textContent = "";
    setTimeout(() => { status.textContent = msg; }, 60);
  }

  function run() {
    out.textContent = "";
    if (!text.value.trim()) { say("Paste a quiz or choose a sample first."); return; }
    const r = analyse(text.value);
    if (!r.items.length) {
      say("No questions found. Number each question (1. 2. 3.) and start each option with A) B) C) D).");
    } else {
      const found = r.checks.filter((c) => c.status === "found");
      const unread = r.problems.length ? ` ${r.problems.length} ${r.problems.length === 1 ? "line or item" : "lines or items"} could not be read.` : "";
      const head = `Read ${r.items.length} ${r.items.length === 1 ? "item" : "items"}, ${r.withKey} with one clear key.`;
      say(found.length ? `${head} Found: ${found.map((c) => SHORT[c.id]).join("; ")}.${unread}` : `${head} These three counts found nothing.${unread}`);
    }
    if (r.problems.length) {
      const s = el("section", "qc-res");
      s.dataset.state = "unread";
      const h = el("h5");
      h.append(document.createTextNode("Could not read"), el("span", "qc-badge", r.problems.length + (r.problems.length === 1 ? " problem" : " problems")));
      const ul = el("ul");
      for (const p of r.problems.slice(0, 8)) ul.append(el("li", "", p.text));
      if (r.problems.length > 8) ul.append(el("li", "", `And ${r.problems.length - 8} more.`));
      s.append(h, ul);
      out.append(s);
    }
    if (r.items.length) {
      for (const c of r.checks) out.append(block(c));
      const foot = el("p", "fine");
      foot.append(
        document.createTextNode("These counts cannot tell whether a key is wrong or an answer is open to argument. The full check reads the questions themselves, with your agent. "),
        Object.assign(el("a", "", "How to install it"), { href: "#unclank-run" }),
        document.createTextNode(". Look up the IDs in "),
        Object.assign(el("a", "", "the skill's evidence file"), { href: EVIDENCE }),
        document.createTextNode(".")
      );
      out.append(foot);
    }
  }

  $("qc-run").addEventListener("click", run);
  $("qc-clear").addEventListener("click", () => {
    text.value = ""; sample.value = ""; out.textContent = ""; status.textContent = "";
    text.focus();
  });
  sample.addEventListener("change", () => {
    const s = SAMPLES.find((x) => x.id === sample.value);
    if (!s) return;
    text.value = s.text;
    run();
  });
  // Editing the text makes the old result stale, so it goes.
  text.addEventListener("input", () => {
    if (out.firstChild) out.textContent = "";
    status.textContent = "";
    if (sample.value) sample.value = "";
  });
}
