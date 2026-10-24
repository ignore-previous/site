# ignoreprevious.dev

Site and plain guide for Ignore Previous.

## Preview

In PowerShell, from this folder:

1. `npm run preview`
2. Open http://localhost:8137/ in a browser.
3. Press Ctrl+C in the PowerShell window to stop.

## Check

`npm run check` builds the site, scans for the brand phrase and checks each page with and without the analytics beacon. It also checks that the canonical links, `sitemap.xml`, `llms.txt`, the Markdown copies, `security.txt` and `wrangler.jsonc` agree.

## Security headers

`src/_headers` is copied to `dist/` by the build, and Cloudflare reads it. `npm run preview` applies it too, so the strict CSP is tested locally. Pages carry no inline scripts or styles; `npm run check` fails if one comes back. The one exception is the JSON-LD block on the home page: it is data, not a script, so the CSP doesn't apply to it.

## Deploy

The site is a Cloudflare Worker with static assets only (no Worker script), deployed by Workers Builds from this repo with the build command `npm run build`. `wrangler.jsonc` sets:

- `assets.directory`: `./dist`.
- `not_found_handling`: `404-page`, so a missing page gets `404.html` with a 404 status.
- `workers_dev` and `preview_urls`: `false`, so the site is only on its own domain.

The custom domain is set in the Cloudflare dashboard, so the file has no `routes`.

Analytics: set `CF_BEACON_TOKEN` in the build variables to add the Cloudflare Web Analytics beacon. Without it the build leaves out the beacon and the footer line that says we count visits.

## Files for search engines and agents

- `src/robots.txt` and `src/sitemap.xml`.
- `src/llms.txt`, a short index for language models.
- `index.html.md` next to each page, a Markdown copy written by `build.mjs` (`scripts/markdown.mjs` does the conversion).
- `src/.well-known/security.txt` (RFC 9116). Its `Expires` date must be renewed before it passes; `npm run check` fails within 30 days of it.
- Each page has a canonical link and a link to its Markdown copy. The home page has JSON-LD describing the site and both tools.
