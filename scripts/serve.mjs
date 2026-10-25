// Local preview of dist/ at http://localhost:8137. Stop with Ctrl+C.
// Applies dist/_headers like Cloudflare Pages does (rules with "*" splats), so the CSP is tested locally.
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { readFileSync, existsSync } from "node:fs";
import { join, extname, normalize } from "node:path";

const ROOT = "dist", PORT = Number(process.env.PORT) || 8137;
const TYPES = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".svg": "image/svg+xml", ".png": "image/png", ".woff2": "font/woff2", ".txt": "text/plain; charset=utf-8", ".json": "application/json", ".md": "text/markdown; charset=utf-8", ".xml": "application/xml", ".ico": "image/x-icon" };

function loadRules() {
  const rules = [];
  if (!existsSync(join(ROOT, "_headers"))) return rules;
  for (const line of readFileSync(join(ROOT, "_headers"), "utf8").split(/\r?\n/)) {
    if (!line.trim() || line.trim().startsWith("#")) continue;
    if (!/^\s/.test(line)) {
      const pattern = line.trim().replace(/[.+^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*").replace(/:[A-Za-z]+/g, "[^/]+");
      rules.push({ re: new RegExp("^" + pattern + "$"), headers: {} });
    } else if (rules.length) {
      const k = line.indexOf(":");
      rules[rules.length - 1].headers[line.slice(0, k).trim()] = line.slice(k + 1).trim();
    }
  }
  return rules;
}
const RULES = loadRules();
const headersFor = (pathname) => Object.assign({}, ...RULES.filter((r) => r.re.test(pathname)).map((r) => r.headers));

createServer(async (req, res) => {
  let path, pathname = "/";
  try { pathname = new URL(req.url, "http://x").pathname; path = normalize(decodeURIComponent(new URL(req.url, "http://x").pathname)).replace(/^[\/\\]+/, ""); }
  catch { res.writeHead(400).end(); return; }
  if (path.startsWith("..")) { res.writeHead(400).end(); return; }
  const extra = headersFor(pathname);
  let file = join(ROOT, path);
  if (path === "_headers") file = join(ROOT, "no-such-file");
  try { if ((await stat(file)).isDirectory()) file = join(file, "index.html"); } catch {}
  try {
    const body = await readFile(file);
    res.writeHead(200, { ...extra, "content-type": TYPES[extname(file)] || "application/octet-stream", "cache-control": "no-store" }).end(body);
  } catch {
    res.writeHead(404, { ...extra, "content-type": TYPES[".html"] }).end(await readFile(join(ROOT, "404.html")));
  }
}).listen(PORT, "127.0.0.1", () => console.log(`Preview: http://localhost:${PORT}/  (Ctrl+C to stop)`));
