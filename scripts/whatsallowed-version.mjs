// The What's Allowed release the site tells visitors to run.
// Bump WHATSALLOWED_VERSION to move every visitor command. Pages and llms.txt write the
// tokens below; build.mjs replaces them. Don't type the version into a page.
// npm run check fails if a page contains `npx whatsallowed` itself.
export const WHATSALLOWED_VERSION = "0.2.2";

const semver = /^\d+\.\d+\.\d+(?:[-+][0-9A-Za-z.-]+)?$/;
if (!semver.test(WHATSALLOWED_VERSION)) {
  throw new Error(`WHATSALLOWED_VERSION must be a semver release, found ${WHATSALLOWED_VERSION}`);
}

// Full command, as in a copy button or a prompt.
export const NPX_WHATSALLOWED_TOKEN = "{{NPX_WHATSALLOWED}}";
// The number alone, for a sentence that names the release.
export const WHATSALLOWED_VERSION_TOKEN = "{{WHATSALLOWED_VERSION}}";
export const NPX_WHATSALLOWED = `npx whatsallowed@${WHATSALLOWED_VERSION}`;

export function pinWhatsAllowed(text) {
  return text
    .replaceAll(NPX_WHATSALLOWED_TOKEN, NPX_WHATSALLOWED)
    .replaceAll(WHATSALLOWED_VERSION_TOKEN, WHATSALLOWED_VERSION);
}
