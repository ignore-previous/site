// WCAG 2.x contrast ratios for the text and background pairs the templates use.
// Run `node cards/contrast.mjs` to print the table (Markdown). Body text needs 4.5:1, large text 3:1.
import { fileURLToPath } from "node:url";
import { themes } from "./tokens.mjs";

const channel = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
export function luminance(hex) {
  const n = parseInt(hex.replace("#", ""), 16);
  return 0.2126 * channel((n >> 16) & 255) + 0.7152 * channel((n >> 8) & 255) + 0.0722 * channel(n & 255);
}
export function contrast(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

// fg and bg are token names, looked up in the theme. "large" = 24 px and up, or 19 px and up in bold.
// A hex value can be given instead of a token name.
const T = (theme, fg, bg, size, use) => ({ theme, fg, bg, size, use });
const both = (fg, bg, size, use) => ["light", "dark"].map((t) => T(t, fg, bg, size, use));

export const pairs = {
  terminal: [
    ...both("ink", "bg", "large", "Headline on card"),
    ...both("mute", "bg", "body", "Brand name and URL on card"),
    ...both("termFg", "term", "body", "Terminal output"),
    ...both("termMute", "term", "body", "Terminal prompt and dimmed lines"),
    ...both("accent", "term", "body", "Highlighted finding in terminal"),
  ],
  tell: [
    ...both("mute", "bg", "body", "Brand name and URL on card"),
    ...both("ink", "bg", "large", "Heading on card"),
    ...both("ink", "surface", "large", "Before text"),
    ...both("accentInk", "accent", "large", "After text"),
    ...both("bg", "ink", "body", "Before label"),
    ...both("accent", "accentInk", "body", "After label"),
  ],
  release: [
    ...both("mute", "bg", "body", "Brand name, URL and kicker on card"),
    ...both("ink", "bg", "large", "Product name and one-line summary"),
    ...both("accentInk", "accent", "large", "Version chip"),
  ],
  "banner-wordmark": [
    T("light", "accentInk", "accent", "large", "Headline and second line on yellow"),
  ],
  "banner-terminal": [
    T("dark", "ink", "bg", "large", "Bio line on ink"),
    T("dark", "mute", "bg", "large", "Second line on ink"),
    T("dark", "termFg", "term", "body", "Terminal text"),
    T("dark", "accent", "term", "body", "Highlighted finding"),
  ],
  "banner-pattern": [
    T("light", "accent", "accentInk", "large", "URL chip (yellow on ink)"),
  ],
};

export function table() {
  const rows = [];
  for (const [tpl, list] of Object.entries(pairs)) {
    const groups = new Map();
    for (const p of list) groups.set(p.use, [...(groups.get(p.use) ?? []), p]);
    for (const [use, ps] of groups) {
      const need = ps[0].size === "large" ? 3 : 4.5;
      const cols = [], ratios = [];
      let ok = true;
      for (const p of ps) {
        const t = themes[p.theme];
        const fg = t[p.fg] ?? p.fg, bg = t[p.bg] ?? p.bg;
        const r = contrast(fg, bg);
        if (r < need) ok = false;
        cols.push(`${fg} on ${bg}`);
        ratios.push(`${ps.length > 1 ? p.theme + " " : ""}${r.toFixed(2)}:1`);
      }
      rows.push(`| ${tpl} | ${use} | ${cols.join("; ")} | ${ratios.join("; ")} | ${ps[0].size}, ${need}:1 | ${ok ? "pass" : "FAIL"} |`);
    }
  }
  return ["| Template | Text | Colours | Ratio | Size, needs | Result |", "|---|---|---|---|---|---|", ...rows].join("\n");
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const out = table();
  console.log(out);
  if (out.includes("FAIL")) process.exitCode = 1;
}
