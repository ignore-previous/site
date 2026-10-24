# ignoreprevious.dev

Site and plain guide for Ignore Previous.

## Preview

In PowerShell, from this folder:

1. `npm run preview`
2. Open http://localhost:8137/ in a browser.
3. Press Ctrl+C in the PowerShell window to stop.

## Check

`npm run check` builds the site, scans for the brand phrase and checks each page with and without the analytics beacon.

## Security headers

`src/_headers` is copied to `dist/` by the build, and Cloudflare Pages reads it. `npm run preview` applies it too, so the strict CSP is tested locally. Pages carry no inline scripts or styles; `npm run check` fails if one comes back.
