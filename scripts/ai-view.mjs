// Turns a built page into the text an AI gets when it fetches the page: tags stripped, everything else kept.
// Hidden elements stay in (a tool that strips tags doesn't know what the page hides), image descriptions show as
// "[image: ...]" and each link shows its address after its text. Scripts, styles, comments and the page's own
// interface art (SVG) are left out. Written for this site's own markup. No dependencies.
//
// The page marks the part that shows this text with data-ai-view-skip, so the text doesn't contain itself.
// An element with data-seen-example is wrapped in START/END, which aiTextToHtml turns into a highlight.
import { parse } from "./markdown.mjs";

export const START = "\u0001", END = "\u0002";

const DROP = new Set(["script", "style", "svg", "template", "head", "noscript"]);
const BREAK = new Set(["address", "article", "aside", "blockquote", "dd", "details", "div", "dl", "dt", "fieldset", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "li", "main", "nav", "ol", "p", "pre", "section", "summary", "table", "tr", "ul", "legend", "caption", "hr"]);
const HEADING = /^h[1-6]$/;

function abs(href, base) {
  try { return new URL(href, base).href; } catch { return href; }
}

const find = (n, tag) => {
  if (typeof n === "string") return null;
  if (n.tag === tag) return n;
  for (const c of n.children) { const r = find(c, tag); if (r) return r; }
  return null;
};
const textOf = (n) => (typeof n === "string" ? n : n.children.map(textOf).join(""));

export function htmlToAiText(html, url) {
  const doc = parse(html);
  let out = "";
  const nl = () => { out = out.replace(/[ \t]+$/, ""); if (out && !out.endsWith("\n")) out += "\n"; };

  const walk = (n) => {
    if (typeof n === "string") {
      const t = n.replace(/\s+/g, " ");
      out += !out || out.endsWith("\n") ? t.trimStart() : t;
      return;
    }
    if (DROP.has(n.tag) || "data-ai-view-skip" in n.attrs) return;
    if (n.tag === "br") { out += "\n"; return; }
    if (n.tag === "img") { if (n.attrs.alt) out += `[image: ${n.attrs.alt}]`; return; }
    if (n.tag === "input") return;
    const block = BREAK.has(n.tag);
    const example = "data-seen-example" in n.attrs;
    if (block) nl();
    if (HEADING.test(n.tag) && out && !out.endsWith("\n\n")) out += "\n";
    if (example) out += START;
    if (n.tag === "a" && n.attrs.href) {
      const before = out.length;
      n.children.forEach(walk);
      const label = out.slice(before).trim();
      out = out.slice(0, before) + (label ? label + " " : "") + `(${abs(n.attrs.href, url)})`;
    } else n.children.forEach(walk);
    if (example) out += END;
    if (block) nl();
  };

  const title = textOf(find(doc, "title") ?? "").replace(/\s+/g, " ").trim();
  walk(find(doc, "body") ?? doc);
  const body = out.replace(/[ \t]+/g, " ").replace(/ *\n */g, "\n").trim();
  return (title ? title + "\n" + url + "\n\n" : "") + body + "\n";
}

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// The text as HTML for a <pre>: escaped, with the planted-example line highlighted.
export function aiTextToHtml(text) {
  return esc(text).split(START).join('<mark class="seen-hit">').split(END).join("</mark>");
}
