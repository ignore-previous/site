# Clank Safely: source check

Checked: 24 Oct 2026. Page: `src/clank-safely/index.html`.

## How the sources were fetched

Every page was fetched raw with `curl -sL`, with no summarising reader. The HTML of each page is JS-heavy, so the text was read from the Markdown copy each docs site serves by adding `.md` to the page URL (`curl -sL <url>.md`, HTTP 200, `content-type: text/markdown`). The raw HTML was also saved, and each page's `<link rel="canonical">` agrees with the address used here. Saved copies are kept outside this repo.

| Page | Fetched as | Redirects |
|---|---|---|
| https://code.claude.com/docs/en/permissions | `.md` | none (200) |
| https://code.claude.com/docs/en/settings | `.md` | none (200) |
| https://code.claude.com/docs/en/settings-reference | `.md` | none (200) |
| https://code.claude.com/docs/en/sandboxing (added) | `.md` | none (200) |
| https://learn.chatgpt.com/docs/agent-approvals-security | `.md` | none (200) |
| https://learn.chatgpt.com/docs/config-file/config-reference | `.md` | none (200) |
| https://learn.chatgpt.com/docs/sandboxing (added) | `.md` | none (200) |
| https://learn.chatgpt.com/docs/windows/windows-sandbox (added) | `.md` | none (200) |
| https://learn.chatgpt.com/docs/agent-configuration/agents-md (added) | `.md` | none (200) |

In the table below, "matches" means the quoted words appear in the raw Markdown, ignoring link markup, backticks and an initial capital at the start of a quoted clause. Page quotes that start mid-sentence are lower case where the source starts a sentence (for example "prompts for permission", source "Prompts for permission"). That is the only difference allowed.

## Codex docs address

Verdict: `https://learn.chatgpt.com/docs/...` is the canonical address. The page links already use it. Evidence (`curl -sIL`):

- `developers.openai.com/codex` returns 308 to `https://learn.chatgpt.com/docs`.
- `developers.openai.com/codex/agent-approvals-security` returns 308 to `https://learn.chatgpt.com/docs/agent-approvals-security`.
- `developers.openai.com/codex/config-reference` returns 308 to `https://learn.chatgpt.com/docs/config-file/config-reference`.
- `developers.openai.com/codex/windows` returns 308 to `https://learn.chatgpt.com/docs/windows/windows-sandbox`.
- `platform.openai.com/docs/codex` returns 301 to `developers.openai.com/codex/cloud`, then 308 to `learn.chatgpt.com/docs/cloud`.
- `learn.chatgpt.com/docs/agent-approvals-security` returns 200, with `<link rel="canonical" href="https://learn.chatgpt.com/docs/agent-approvals-security">` and the same as `og:url`.
- `learn.chatgpt.com/llms.txt` describes itself as the map of "ChatGPT docs for Codex".
- The `openai/codex` README (raw, main branch) still links to the old address `https://developers.openai.com/codex` (and `/codex/ide`, `/codex/auth`), which redirects as above. The GitHub repo's `homepage` field is empty. `openai.com/codex` and `chatgpt.com/codex` return 403 to curl, so they could not be followed; the README's product link is `https://chatgpt.com/codex`.
- For Claude Code, `docs.anthropic.com/en/docs/claude-code/settings` returns 301 to `https://code.claude.com/docs/en/settings`, and the `anthropics/claude-code` repo homepage is `https://code.claude.com/docs/en/overview`. So `code.claude.com` is canonical.

## Claims and quotes

Every claim row has a stable ID (`clank-1.N` quotes, `clank-2.N` setting names, `clank-3.N` What's Allowed claims, `clank-4.N` points that were Unverified, `clank-5.N` points still unverified). The page carries the matching `data-fact` on each claim. Do not renumber an ID once it is in use; add new rows at the end of a table.

Result key: matches / fixed (quote corrected) / paraphrased (quote marks removed or replaced) / settled (was Unverified) / unverified.

### Quotes (text in quote marks)

| ID | Page text | Source | How | Result |
|---|---|---|---|---|
| clank-1.1 | "prompts for permission on first use of each tool." (`default`) | code.claude.com/docs/en/permissions, Permission modes table | .md | matches |
| clank-1.2 | "reads files and runs read-only shell commands to explore but doesn't edit your source files." (`plan`) | permissions, modes table | .md | matches. The source sentence continues after "files;" with an auto mode clause that the page leaves out. |
| clank-1.3 | "can't carve an exception out of a deny rule." | permissions, Manage permissions | .md | matches |
| clank-1.4 | "automatically accepts file edits and common filesystem commands such as `mkdir`, `touch`, `mv`, and `cp` for paths in the working directory or `additionalDirectories`" (`acceptEdits`) | permissions, modes table | .md | matches |
| clank-1.5 | "provides OS-level enforcement that restricts shell commands' filesystem and network access." | permissions, Sandboxing bullet (subject is "Sandboxing") | .md | matches. The lead-in changed from "it" to "sandboxing". |
| clank-1.6 | "the sandbox boundary substitutes for that whole-tool prompt." | permissions | .md | matches. The source applies it when sandboxing is on and `autoAllowBashIfSandboxed` is at its default `true`; the page now says "with the sandbox on". |
| clank-1.7 | "runs without routine prompts; before actions such as shell commands and network requests run, a background classifier checks that they align with your request." (`auto`) | permissions, modes table (also settings-reference `permissions.defaultMode`) | .md | matches. The source has a link around "classifier". |
| clank-1.8 | "auto-denies every call that would otherwise prompt." (`dontAsk`) | permissions, modes table ("Auto-denies ...") | .md | matches. Capital only. The settings reference has it in lower case. |
| clank-1.9 | "except for the actions no mode auto-approves" (`bypassPermissions`) | permissions, modes table | .md | fixed. The comma was inside the quote marks in the page and is not in the source; moved outside. |
| clank-1.10 | "writes to protected paths such as `.git` and `.claude`" | permissions, warning box | .md | fixed (punctuation outside the quote marks only). Meaning corrected 24 Oct: the full warning says bypassPermissions skips prompts "including for writes to protected paths such as `.git` and `.claude`", so these writes are not an exception. The page said they were; it now says prompts are skipped for them too. |
| clank-1.11 | "still apply even if a prompt injection bypasses Claude's decision-making." | permissions, Sandboxing | .md | matches |
| clank-1.12 | "no other level, including command line arguments, can override a managed permission rule." | permissions, Settings precedence | .md | matches |
| clank-1.13 | "makes managed settings the only settings source of permission rules." (`allowManagedPermissionRulesOnly`) | permissions | .md | matches |
| clank-1.14 | "Permission rules are enforced by Claude Code, not by the model." | permissions, note | .md | matches |
| clank-1.15 | "shape what Claude tries to do, but they don't change what Claude Code allows." | permissions, same note | .md | matches |
| clank-1.16 | "uses an OS-enforced sandbox that limits what it can touch (typically to the current workspace)" | learn.chatgpt.com/docs/agent-approvals-security | .md | matches |
| clank-1.17 | "By default, the agent runs with network access turned off." | approvals | .md | matches |
| clank-1.18 | "OS-level mechanisms enforce sandbox policies" | approvals ("Codex CLI / IDE extension" bullet) | .md | matches. The table row used to cite it together with a Claude Code link, which implied it covered both tools. Now split by tool. |
| clank-1.19 | "Destructive app/MCP tool calls always require approval when the tool advertises a destructive annotation" | approvals | .md | matches. The source has an exception ("unless the tool advertises a read annotation, which takes priority"); the page now says so. Full stop moved outside the quote marks. |
| clank-1.20 | "asks before edits outside the workspace or network use." (`on-request`) | approvals | .md | fixed. Did not match. Now "Codex asks for approval to edit files outside the workspace or to run commands that require network access." (approvals, "Sandbox and approvals" section) |
| clank-1.21 | "No prompts at all. It works with every sandbox mode, and Codex does its best within those limits." (`never`) | approvals, "Run without approval prompts" | .md | fixed. Not in the source. The source says "This option works with all `--sandbox` modes ... Codex makes a best effort within the constraints you set." and the sandboxing page says of `never`: "The agent doesn't stop for approval prompts." The page now quotes those two exact phrases (learn.chatgpt.com/docs/sandboxing, approvals). |
| clank-1.22 | "No sandbox and full network access." (`danger-full-access`) | approvals | .md | fixed. Not in the source. The only nearby text is "No sandbox; no approvals (not recommended)" for the `--dangerously-bypass-approvals-and-sandbox` flag. The sandboxing page says of `danger-full-access`: "The agent runs without sandbox restrictions. This removes the filesystem and network boundaries ...". The page now quotes the first sentence and paraphrases the second. |
| clank-1.23 | `deny` "always wins over `allow`" | approvals, Network policy | .md | matches. The full stop moved outside the quote marks. |
| clank-1.24 | "The agent can inspect files, but it can't edit files or run commands without approval." (`read-only`, new) | learn.chatgpt.com/docs/sandboxing | .md | matches |
| clank-1.25 | "Codex can read files and run commands within the read-only sandbox." (new) | approvals, "Common sandbox and approval combinations" table | .md | matches |
| clank-1.26 | "two layers" (new, AGENTS.md row) | approvals: "Codex security controls come from two layers that work together" | .md | matches |
| clank-1.27 | "On native Windows, Claude Code runs commands unsandboxed." (new) | code.claude.com/docs/en/sandboxing | .md | matches |
| clank-1.28 | "Ask before deleting" (table row heading) | not a doc quote; an example of an instruction a person might write | n/a | not a quotation of a source. No change. |
| clank-1.29 | dontAsk: "File reads in your working directories and other actions that need no approval still run, as do tools pre-approved via `/permissions` or `permissions.allow` rules." (new) | permissions, modes table, `dontAsk` row | .md | matches. Same cell as the auto-deny quote above. The cell also says an installed mod can still approve some calls, and that some tools are denied even if you allowed them. The page now says `dontAsk` does not promise that only listed actions happen, and (24 Oct) names both exceptions: an installed mod can still approve some calls, and some tools are denied even if you allowed them. |

### Setting names and values

All names were found in the raw sources.

| ID | Name or value on the page | Source | Result |
|---|---|---|---|
| clank-2.1 | `permissions.defaultMode` and values `default`, `plan`, `acceptEdits`, `auto`, `dontAsk`, `bypassPermissions` | settings-reference `permissions.defaultMode` (also lists `manual`, an alias for `default`); permissions modes table | matches |
| clank-2.2 | `permissions.deny`, `permissions.allow`, `permissions.additionalDirectories` | settings-reference | matches |
| clank-2.3 | `permissions.disableBypassPermissionsMode`, `permissions.disableAutoMode` set to `"disable"` | permissions; settings-reference ("Type: the string "disable"") | matches |
| clank-2.4 | `Read(./.env)` rule | permissions, "Use specifiers" table | matches |
| clank-2.5 | Read and Edit rules use gitignore-style paths | permissions, "How path patterns match" | matches |
| clank-2.6 | `Bash` and `Bash(*)` match every command | permissions, "Match all uses of a tool" | matches |
| clank-2.7 | "rules that limit a command's arguments are fragile" | permissions: "Bash permission patterns that try to constrain command arguments are fragile." | paraphrase, accurate |
| clank-2.8 | Rules checked deny, then ask, then allow | permissions: "Rules are evaluated in order: deny, then ask, then allow." | paraphrase, accurate |
| clank-2.9 | `autoAllowBashIfSandboxed`, default `true` | settings-reference `sandbox.autoAllowBashIfSandboxed` (Default: `true`) | matches |
| clank-2.10 | `allowManagedPermissionRulesOnly` | settings-reference | matches |
| clank-2.11 | `~/.claude/settings.json`, `.claude/settings.json`; managed file wins | settings: file table; "Settings precedence, highest first: managed settings, command line, project local, shared project, user." | matches |
| clank-2.12 | `auto` and `bypassPermissions` do not take effect from project or local settings | settings ("The file can't set that value ...") and settings-reference `permissions.defaultMode` | matches. This was previously from the 19 Oct notes (v2.1.302); now confirmed on the live pages. |
| clank-2.13 | Project allow rules apply only after trust | permissions, "Project allow rules and workspace trust": "Claude Code applies them only after you accept the workspace trust dialog for that folder." Also settings. | matches. The page said "trust prompt"; now "workspace trust dialog", and the link points to permissions. |
| clank-2.14 | `sandbox.enabled` (default `false`), `/sandbox` command (new) | settings-reference `sandbox.enabled`; sandboxing "What the sandbox restricts": "The sandbox is off by default. To turn it on, run `/sandbox` ... or set `sandbox.enabled` to `true`" | matches |
| clank-2.15 | `sandbox.filesystem.allowWrite`, `.denyWrite`, `.denyRead`; `sandbox.network.allowedDomains`, `.deniedDomains` (new) | settings-reference | matches |
| clank-2.16 | `sandbox_mode` values `read-only`, `workspace-write`, `danger-full-access` | config-reference `sandbox_mode` type; sandboxing page | matches. Source link changed from approvals to config-reference, where the three values are listed together. |
| clank-2.17 | `approval_policy` values `on-request`, `never` | config-reference `approval_policy` type | matches |
| clank-2.18 | `~/.codex/config.toml`; project `.codex/config.toml` read only for trusted projects | config-reference: "Codex loads project-scoped config files only when you trust the project." | matches |
| clank-2.19 | macOS Seatbelt; Linux `bwrap` plus `seccomp` | approvals, OS-level sandbox | matches |
| clank-2.20 | `.git`, `.agents`, `.codex`, `.aws` protected as read-only in a writable root | approvals, "Protected paths in writable roots" | matches. The source says this is the default `workspace-write` policy, and that `.agents`, `.codex` and `.aws` are protected when they exist as directories. |
| clank-2.21 | `sandbox_workspace_write.network_access = true`; `[features.network_proxy]` `enabled = true`, `domains = { "host" = "allow" / "deny" }` (new) | approvals, "Network access" | matches |
| clank-2.22 | Network proxy does not filter web search, app tool calls or MCP server connections (new) | approvals, "Traffic outside the command network proxy" | paraphrase, accurate |
| clank-2.23 | `windows.sandbox` values `mxc`, `elevated`, `unelevated`; `unelevated` has weaker network isolation; WSL2 uses the Linux sandbox (new) | learn.chatgpt.com/docs/windows/windows-sandbox; approvals, "OS-level sandbox" | matches |

### What's Allowed claims (Step 1 and 2)

These cite `github.com/ignore-previous/whatsallowed`, which is not an official vendor page. That repository returns 404 on 24 Oct 2026 (the `ignore-previous` GitHub organisation page itself is 200). The claims were compared with a local copy of the What's Allowed repository (commit 81929de, README.md, package.json, docs/, test/). Matches: reads Claude Code, Codex and Cursor config; file, line and rule ID; Node.js 20 or later; only reads files, no network calls, with `test/no-network.test.ts`; baseline written to `~/.whatsallowed/baseline.json` only by the `baseline` command; the list of ten checks has none for Claude Code sandbox settings; "a configuration check, not a security assessment"; `docs/ACCURACY.md` exists. Every one of those links fails for the public until the repository is public.

| ID | Page claim | Local source | Result |
|---|---|---|---|
| clank-3.1 | Reads the settings files of Claude Code, Codex and Cursor. | README.md line 3 | matches the local copy (first checked 24 Oct 2026 at commit 81929de; file locations noted from the current working copy); the public link fails until the repository is public |
| clank-3.2 | Each finding gives the file, the line and a rule ID. | README.md line 3 | matches the local copy (first checked 24 Oct 2026 at commit 81929de; file locations noted from the current working copy); the public link fails until the repository is public |
| clank-3.3 | Needs Node.js 20 or later. | package.json (`engines.node` `>=20`) | matches the local copy (first checked 24 Oct 2026 at commit 81929de; file locations noted from the current working copy); the public link fails until the repository is public |
| clank-3.4 | Reads config without changing it and makes no network calls; a test checks the network part. | README.md; test/no-network.test.ts | matches the local copy (first checked 24 Oct 2026 at commit 81929de; file locations noted from the current working copy); the public link fails until the repository is public |
| clank-3.5 | Writes `~/.whatsallowed/baseline.json` only when you run the `baseline` command. | README.md line 49 (commands table) | matches the local copy (first checked 24 Oct 2026 at commit 81929de; file locations noted from the current working copy); the public link fails until the repository is public |
| clank-3.6 | Its list of ten checks has none for Claude Code sandbox settings. | README.md line 84; docs/checks.md | matches the local copy (first checked 24 Oct 2026 at commit 81929de; file locations noted from the current working copy); the public link fails until the repository is public |
| clank-3.7 | It is "a configuration check, not a security assessment". | README.md line 9 | matches the local copy (first checked 24 Oct 2026 at commit 81929de; file locations noted from the current working copy); the public link fails until the repository is public |
| clank-3.8 | `docs/ACCURACY.md` exists. | docs/ACCURACY.md | matches the local copy (first checked 24 Oct 2026 at commit 81929de; file locations noted from the current working copy); the public link fails until the repository is public |
| clank-3.9 | It cannot read account settings, such as memory or training, that are stored with your account on the provider's side. | README.md line 3 (reads local settings files only); test/no-network.test.ts (no network calls) | follows from clank-3.1 and clank-3.4 (24 Oct 2026). Where those settings live: claude-2.path and claude-11.path (the "Settings path (Topic 2)" and "Settings path (Topic 11)" notes in claude-facts.md), chatgpt-2.path and chatgpt-11.path (the "Settings path" notes under sections 2 and 11 of chatgpt-facts.md). |

## Unverified points

Before: 7 Unverified marks (2 of them were the definitions in the legend and in "How we checked"). Now: 3 (the same 2 definitions, plus one point).

| ID | Point | Result |
|---|---|---|
| clank-4.1 | Claude Code: the setting that turns the sandbox on, the options for folders and sites | Settled. `sandbox.enabled`, `sandbox.filesystem.allowWrite` / `denyWrite` / `denyRead`, `sandbox.network.allowedDomains` / `deniedDomains`. Labelled Enforced. Sources: code.claude.com/docs/en/sandboxing and /settings-reference. |
| clank-4.2 | Claude Code: does the sandbox run on Windows? | Settled. No on native Windows ("On native Windows, Claude Code runs commands unsandboxed."). It runs on macOS, Linux and WSL2. The settings reference says `sandbox.enabled` turns it on "on macOS, Linux, and WSL2". This matters for the page's stated first audience, so a bullet under Balanced now says so, and a note was added under Isolated Autonomy. No pill on that bullet, because it states a limit rather than a setting someone enforces. Source: sandboxing. |
| clank-4.3 | Codex: does the sandbox work on Windows? | Settled. Yes, natively: `windows.sandbox` is `mxc`, `elevated` or `unelevated` (the first needs compatible Windows 11; `unelevated` has weaker network isolation), and WSL2 uses the Linux sandbox. Labelled Enforced. Sources: learn.chatgpt.com/docs/windows/windows-sandbox and approvals. |
| clank-4.4 | Codex: exactly what `read-only` allows | Partly settled. The sandboxing page says "The agent can inspect files, but it can't edit files or run commands without approval." The approvals page table says "Codex can read files and run commands within the read-only sandbox." The two pages disagree about whether commands run without a prompt. Both are quoted and the page says so. Still Unverified for which commands run without asking. |
| clank-4.5 | Codex: setting names for network site rules | Settled. `sandbox_workspace_write.network_access`, `features.network_proxy` with `enabled` and `domains`. Labelled Enforced. Source: approvals. |
| clank-4.6 | Codex: `AGENTS.md` is guidance only | Settled by inference from two official pages. The AGENTS.md page says Codex concatenates the files into "the combined prompt". The approvals page says its security controls "come from two layers", the sandbox mode and the approval policy. No official page states in one sentence that `AGENTS.md` cannot change what Codex allows, so the page words it as "is the same kind of file ... is neither". Labelled Guidance. |

## Still unverified

1. (clank-5.1) Which commands Codex runs without asking in `read-only` mode: the sandboxing page and the approvals page word it differently.
2. (clank-5.2) No official page says in one sentence that `AGENTS.md` cannot widen what Codex may do. The Guidance label rests on two pages read together.
3. (clank-5.3) What's Allowed claims were checked only against a local copy; the public repository returned 404 on 24 Oct 2026.
4. (clank-5.4) Whether `auto` mode is available to the reader's plan or model was not checked; the page names the mode and quotes the docs, and the docs refer to auto mode being "available to your session", so it may not be on for everyone.
5. (clank-5.5) `chatgpt.com/codex` and `openai.com/codex` returned 403 to curl, so where they redirect was not seen.
