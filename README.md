# ignoreprevious.dev

Source for ignoreprevious.dev: the home page, What Can My AI See? and Clank Safely. The header nav on every page lists the tools and guides in two groups, Tools and Guides. A new group appears only when its first item ships, and a group label becomes a link to its own page once it has more than about four items.

Built with Claude.

## Preview

In PowerShell, from this folder:

1. `npm run preview`
2. Open http://localhost:8137/ in a browser.
3. Press Ctrl+C in the PowerShell window to stop.

## Check

`npm run check` builds the site, scans for the brand phrase and tests each page with and without the analytics beacon. It also confirms that the canonical links, `sitemap.xml`, `llms.txt`, the Markdown copies, `security.txt` and `wrangler.jsonc` agree.

Terminal output on the site is real `whatsallowed demo` output, shortened. `npm run check` fails if a line shown on a page is missing from `scripts/whatsallowed-demo.txt` or out of order. `npm run check:demo` downloads the latest What's Allowed from npm and fails if its demo output differs from that file. When it does, update the file and the pages together.

## Receipts

The footer on every page says what the page contacts and how to see it in DevTools. The Clank Safely page adds one line on where it runs and what it sends. Both change with the build: they name Cloudflare Web Analytics only when `CF_BEACON_TOKEN` adds the beacon. If analytics or any other network call is ever added, change the footer line and the Clank Safely line in the same PR. `npm run check` fails when a page loads anything from another origin, apart from the beacon script in the beacon build.

Each home tool card shows the tool's version and a date. `data/tool-facts.json` holds them, and `build.mjs` copies them into the cards, so a build never reads the network or the tool repos. To refresh the file after a tool ships, in PowerShell from this folder, with the tool repos fetched: `node scripts/update-tool-facts.mjs ../whatsallowed ../unclank`. For What's Allowed the date is when `eval/results.json` last changed (the accuracy run), and only when it is for the version shown. For Unclank it is the newest "Last reviewed" line in its skills, since Unclank keeps no dated test results.

Every command the site tells a visitor to run names a What's Allowed release. That release is `WHATSALLOWED_VERSION` in `scripts/whatsallowed-version.mjs`. Pages and `llms.txt` write `{{NPX_WHATSALLOWED}}`, and `{{WHATSALLOWED_VERSION}}` where a sentence names the release. The build fills them in. To move to a new release, change the version in that file and run `npm run check`. If `npm run check:demo` reports new demo output, update `scripts/whatsallowed-demo.txt` and the pages together.

## Voice

Copy on the site and in the brand's READMEs follows [VOICE.md](VOICE.md). `npm run check` enforces the rules VOICE.md marks as checked.

## Security headers

`src/_headers` is copied to `dist/` by the build, and Cloudflare reads it. `npm run preview` applies it too, so the strict CSP is tested locally. Pages carry no inline scripts or styles; `npm run check` fails if one comes back. The one exception is the JSON-LD block on the home page. CSP's script rules don't apply to non-executable script types such as `application/ld+json`, so it needs no exception in the policy.

## Deploy

The site is a Cloudflare Worker with static assets only (no Worker script), deployed by Workers Builds from this repo with the build command `npm run build`. `wrangler.jsonc` sets:

- `assets.directory`: `./dist`.
- `not_found_handling`: `404-page`, so a missing page gets `404.html` with a 404 status.
- `workers_dev` and `preview_urls`: `false`, so the site is only on its own domain.

The custom domain is set in the Cloudflare dashboard, so the file has no `routes`.

Analytics: set `CF_BEACON_TOKEN` in the build variables to add the Cloudflare Web Analytics beacon. Without it the build leaves out the beacon and the footer wording that names Cloudflare. The production site sets it on purpose, to count page views.

## Files for search engines and agents

- `src/robots.txt` and `src/sitemap.xml`.
- `src/llms.txt`, a short index for language models.
- `index.html.md` next to each page, a Markdown copy written by `build.mjs` (`scripts/markdown.mjs` does the conversion).
- `src/.well-known/security.txt` (RFC 9116). Its `Expires` date must be renewed before it passes; `npm run check` fails within 30 days of it.
- Each page has a canonical link and a link to its Markdown copy. The home page has JSON-LD describing the site and the two software tools.
