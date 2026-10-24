// Turns a page of this site into Markdown, for the copies at /<page>/index.html.md (the llms.txt convention).
// Written for this site's own markup, not for HTML in general. No dependencies.
// It keeps the page text (headings, paragraphs, lists, tables, code, links) and leaves out the interface:
// SVG art, buttons, tab strips, the app and plan pickers and anything marked aria-hidden.

const VOID = new Set(["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "source", "track", "wbr"]);
const RAW = new Set(["script", "style"]);
const BLOCK = new Set(["address", "article", "aside", "blockquote", "dd", "details", "div", "dl", "dt", "fieldset", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "li", "main", "nav", "ol", "p", "pre", "section", "summary", "table", "ul"]);

const ENTITIES = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", middot: "·", mdash: "—", ndash: "–", hellip: "…", rsquo: "’", lsquo: "‘", rdquo: "”", ldquo: "“", times: "×", copy: "©" };
const decode = (s) => s.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, e) =>
  e[0] === "#" ? String.fromCodePoint(e[1] === "x" || e[1] === "X" ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10)) : ENTITIES[e.toLowerCase()] ?? m);

// Small HTML parser: elements { tag, attrs, children } and text strings.
export function parse(html) {
  const root = { tag: "#root", attrs: {}, children: [] };
  const stack = [root];
  const re = /<!--[\s\S]*?-->|<!doctype[^>]*>|<\/([a-zA-Z][\w-]*)\s*>|<([a-zA-Z][\w-]*)((?:\s+[^\s=>/]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+))?)*)\s*(\/?)>|([^<]+|<)/gi;
  let m;
  while ((m = re.exec(html))) {
    const top = stack[stack.length - 1];
    if (m[1]) {
      const tag = m[1].toLowerCase();
      const i = stack.map((n) => n.tag).lastIndexOf(tag);
      if (i > 0) stack.length = i;
    } else if (m[2]) {
      const tag = m[2].toLowerCase();
      const attrs = {};
      for (const a of m[3].matchAll(/([^\s=>/]+)(?:\s*=\s*("([^"]*)"|'([^']*)'|([^\s>]+)))?/g))
        attrs[a[1].toLowerCase()] = decode(a[3] ?? a[4] ?? a[5] ?? "");
      const node = { tag, attrs, children: [] };
      top.children.push(node);
      if (RAW.has(tag)) {
        const end = html.toLowerCase().indexOf(`</${tag}`, re.lastIndex);
        node.children.push(html.slice(re.lastIndex, end < 0 ? html.length : end));
        re.lastIndex = end < 0 ? html.length : html.indexOf(">", end) + 1;
      } else if (!VOID.has(tag) && !m[4]) stack.push(node);
    } else if (m[5]) top.children.push(decode(m[5]));
  }
  return root;
}

const cls = (n) => ` ${n.attrs?.class ?? ""} `;
const has = (n, c) => cls(n).includes(` ${c} `);
const find = (n, test) => {
  if (typeof n === "string") return null;
  if (test(n)) return n;
  for (const c of n.children) { const r = find(c, test); if (r) return r; }
  return null;
};
const textOf = (n) => (typeof n === "string" ? n : n.children.map(textOf).join(""));

function skip(n) {
  if (["svg", "script", "style", "button", "input", "noscript", "template"].includes(n.tag)) return true;
  if (n.attrs["aria-hidden"] === "true" || n.attrs.role === "tablist") return true;
  if (n.tag === "fieldset") return true; // the app and plan pickers
  return ["g-statusrow", "g-prompt", "back-wrap", "nojs-note"].some((c) => has(n, c));
}

const isBlock = (n) => typeof n !== "string" && (BLOCK.has(n.tag) || has(n, "cmd") || has(n, "tcmd") || n.attrs.role === "tabpanel");

function abs(href, base) {
  try { return new URL(href, base).href; } catch { return href; }
}

function inline(nodes, ctx) {
  let out = "", prevEl = false;
  for (const n of nodes) {
    if (typeof n === "string") { out += n.replace(/\s+/g, " "); prevEl = false; continue; }
    if (skip(n)) continue;
    // Two elements with no space between them are laid out apart by CSS; keep a space in the text.
    if (prevEl && out && !/[\s([]$/.test(out)) out += " ";
    prevEl = true;
    const inner = () => inline(n.children, ctx);
    switch (n.tag) {
      case "br": out += "  \n"; break;
      case "a": {
        const t = inner().trim();
        const href = n.attrs.href ? abs(n.attrs.href, ctx.base) : "";
        out += href && t ? `[${t}](${href})` : t;
        break;
      }
      case "b": case "strong": { const t = inner().trim(); out += t ? `**${t}**` : ""; break; }
      case "em": case "i": { const t = inner().trim(); out += t ? `_${t}_` : ""; break; }
      case "code": out += "`" + textOf(n).trim() + "`"; break;
      case "label": out += inner(); break;
      default:
        if (has(n, "handle") && /\s/.test(textOf(n).trim())) out += "_" + textOf(n).trim() + "_";
        else if (has(n, "path") || has(n, "handle")) out += "`" + textOf(n).replace(/\s+/g, " ").trim() + "`";
        else if (has(n, "pill") || has(n, "sev")) out += `[${inner().trim()}]`;
        else out += inner();
    }
  }
  return out;
}

const tidy = (s) => s.replace(/[ \t]+/g, " ").replace(/ *\n */g, "\n").trim();

// Blocks: returns Markdown paragraphs joined by blank lines.
function blocks(nodes, ctx) {
  const parts = [];
  let run = [];
  const flush = () => { const t = tidy(inline(run, ctx)); if (t) parts.push(t); run = []; };
  for (const n of nodes) {
    if (typeof n === "string" || (!isBlock(n) && !skip(n))) { run.push(n); continue; }
    flush();
    if (skip(n)) continue;
    const b = block(n, ctx);
    if (b) parts.push(b);
  }
  flush();
  return parts.join("\n\n");
}

function list(n, ctx, ordered) {
  const items = n.children.filter((c) => typeof c !== "string" && c.tag === "li" && !skip(c));
  return items.map((li, i) => {
    const box = find(li, (x) => x.tag === "input" && x.attrs.type === "checkbox");
    const mark = ordered ? `${i + 1}. ` : box ? "- [ ] " : "- ";
    const labelled = find(li, (x) => has(x, "pill") && has(x, "plan"));
    const plan = li.attrs["data-plan"] && ctx.plans && !labelled ? ` _(${ctx.plans(li.attrs["data-plan"])})_` : "";
    const body = blocks(li.children, ctx) + plan;
    return mark + body.replace(/\n/g, "\n" + " ".repeat(mark.length));
  }).join("\n");
}

function table(n, ctx) {
  const rows = [];
  const walk = (x) => { if (typeof x === "string") return; if (x.tag === "tr") rows.push(x); else x.children.forEach(walk); };
  walk(n);
  const cells = rows.map((r) => r.children.filter((c) => typeof c !== "string" && (c.tag === "td" || c.tag === "th"))
    .map((c) => tidy(inline(c.children, ctx)).replace(/\n/g, " ").replace(/\|/g, "\\|")));
  if (!cells.length) return "";
  const w = Math.max(...cells.map((r) => r.length));
  const line = (r) => "| " + Array.from({ length: w }, (_, i) => r[i] ?? "").join(" | ") + " |";
  const cap = find(n, (x) => x.tag === "caption");
  return (cap ? `_${tidy(inline(cap.children, ctx))}_\n\n` : "") +
    [line(cells[0]), "| " + Array(w).fill("---").join(" | ") + " |", ...cells.slice(1).map(line)].join("\n");
}

function pre(n) {
  // Numbered code samples are <span class="ln"><i>1</i><span>code</span></span>; drop the numbers.
  const lines = n.children.filter((c) => typeof c !== "string" && has(c, "ln"));
  const text = lines.length
    ? lines.map((l) => textOf(l.children.find((c) => typeof c !== "string" && c.tag === "span") ?? "")).join("\n")
    : textOf(n);
  return "```\n" + text.replace(/\n$/, "") + "\n```";
}

function block(n, ctx) {
  const app = n.attrs["data-app"];
  if (app && ctx.planSets?.[app]) {
    const map = ctx.planSets[app];
    ctx = { ...ctx, plans: (v) => "for " + v.split(/\s+/).map((k) => map[k] ?? k).join(", ") };
  }
  const h = /^h([1-6])$/.exec(n.tag);
  if (h) return "#".repeat(+h[1]) + " " + tidy(inline(n.children, ctx)).replace(/\n/g, " ");
  if (has(n, "cmd") || has(n, "tcmd")) return "```\n" + textOf(find(n, (x) => x.tag === "code") ?? n).trim() + "\n```";
  if (has(n, "code") && n.tag === "div") {
    // A code sample with a callout between two <pre> halves: code first, then the callout.
    const pres = [], rest = [];
    for (const c of n.children) (typeof c !== "string" && c.tag === "pre" ? pres : rest).push(c);
    const joined = { tag: "pre", attrs: {}, children: pres.flatMap((p) => p.children) };
    return [blocks(rest.filter((c) => typeof c !== "string" && has(c, "tab")), ctx), pre(joined),
      blocks(rest.filter((c) => typeof c === "string" || !has(c, "tab")), ctx)].filter(Boolean).join("\n\n");
  }
  switch (n.tag) {
    case "ul": return list(n, ctx, false);
    case "ol": return list(n, ctx, true);
    case "pre": return pre(n);
    case "table": return table(n, ctx);
    case "dl": return n.children.flatMap((c) => typeof c === "string" ? [] : c.tag === "div" ? c.children : [c])
      .filter((c) => typeof c !== "string")
      .map((c) => c.tag === "dt" ? `**${tidy(inline(c.children, ctx))}**` : blocks(c.children, ctx)).filter(Boolean).join("\n\n");
    case "blockquote": return blocks(n.children, ctx).replace(/^/gm, "> ");
    default: return blocks(n.children, ctx);
  }
}

// Plan labels for a checklist item, from the page's own plan picker, so the Markdown says which plans an item is for.
function planLabels(doc) {
  const sets = {};
  const walk = (x) => {
    if (typeof x === "string") return;
    if (x.tag === "fieldset" && x.attrs["data-plans-for"]) {
      const app = x.attrs["data-plans-for"], map = {};
      const labels = [];
      const lw = (y) => { if (typeof y === "string") return; if (y.tag === "label") labels.push(y); else y.children.forEach(lw); };
      lw(x);
      for (const l of labels) {
        const input = find(l, (y) => y.tag === "input");
        if (input) map[input.attrs.value] = tidy(textOf(l));
      }
      sets[app] = map;
    }
    x.children.forEach(walk);
  };
  walk(doc);
  return sets;
}

function demote(md) {
  let fence = false;
  return md.split("\n").map((l) => {
    if (l.startsWith("```")) fence = !fence;
    return !fence && /^#{1,5} /.test(l) ? "#" + l : l;
  }).join("\n");
}

export function htmlToMarkdown(html, url) {
  const doc = parse(html);
  const title = tidy(textOf(find(doc, (n) => n.tag === "title") ?? ""));
  const desc = find(doc, (n) => n.tag === "meta" && n.attrs.name === "description")?.attrs.content ?? "";
  const main = find(doc, (n) => n.tag === "main");
  if (!main) throw new Error(`${url}: no <main>`);
  const ctx = { base: url, plans: null, planSets: planLabels(doc) };
  const body = blocks(main.children, ctx).replace(/\n{3,}/g, "\n\n");
  const footer = find(doc, (n) => n.tag === "footer");
  const head = `> ${desc}\n>\n> Markdown copy of ${url}`;
  // Put the description and source line under the page's own h1. If the h1 is a slogan rather than the
  // page's name (the home page), the <title> becomes the h1 and the page's headings move down a level.
  const h1 = /^# (.*)/.exec(body)?.[1] ?? "";
  const md = h1 && title.includes(h1) ? body.replace(/^(# .*)/, `$1\n\n${head}`) : `# ${title}\n\n${head}\n\n${demote(body)}`;
  return md + (footer ? "\n\n---\n\n" + blocks(footer.children, ctx) : "") + "\n";
}
