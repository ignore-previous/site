# Claude facts: "What Can My AI See?" (working name)

Scope: Claude consumer apps only (claude.ai web, Claude Desktop, Claude mobile). Official Anthropic sources only.
Checked on: 22 Oct 2026. Pages fetched: 27 (all loaded). Web searches run: 14 (used only to find pages; search snippets are not cited as claims).
Researcher model: claude-haiku-5-5.

**How to read the quotes.** Quotes were taken from the text returned by WebFetch, which is an extracted version of each page, not a raw HTML copy. A person should spot-check each quote against the live page before publishing. Where a sentence was shortened, "…" marks the cut.

## Gaps and conflicts

1. **Model training default (conflict).** The official pricing page lists model training as "Opt-out" for Free, Pro and Max. The Consumer Terms announcement (fetched) says users are given "the choice" and does not say which way the default goes. The privacy help article on changing the setting also gives no default. Treat "on or off by default" as unresolved. The pricing page is the only official statement and it says opt-out.
2. **Setting name.** The current help page calls the toggle "Help Improve our AI models". Other Anthropic pages say "Help improve Claude" or "Model Improvement". The guide uses the current on-page wording.
3. **Settings paths differ by experience.** Current wording is "Settings > Memory". The import/export article says legacy accounts use "Settings > Capabilities" and "View and edit your memory". Settings > Profile is not a label on the instructions page. That page says to click your initials, then Settings, then "Instructions for Claude". The privacy page links to claude.ai/settings/profile without naming it.
4. **Projects: free or paid?** The personalisation article says "Free users can create a maximum of five projects" and then "(paid plans only)" for project instructions. The projects article and pricing page list projects on Free (up to five). The guide treats projects as available on Free and notes the conflicting wording.
5. **"Personal preferences" and "custom styles" are no longer the names used.** The current personalisation article uses "Instructions for Claude" and "Skills". The incognito FAQ still uses "custom styles, personal preferences". No fetched current page describes custom styles as a feature (see Topic 7).
6. **Research and connector approvals (conflict).** The connectors article says "By default, each action Claude takes on your behalf requires your explicit approval." The research article says "During research, Claude can use tools from your connectors automatically, without asking for approval each time." Reader warning: research mode may use connectors without a prompt.
7. **Incognito retention for consumer accounts.** The incognito article says chats are "retained for either 30 days (default)". The consumer retention page does not mention incognito chats. The 30-day figure is from the incognito article only.
8. **Non-training retention period (not found).** The consumer retention page has a heading "Standard Retention Timeframe" with no text under it. A search snippet said 30 days, but I did not confirm that on a fetched page, so it is not used.
9. **Memory export date (not verified).** A search snippet said legacy memory export ended on 9 Sep 2026. The import/export article does not contain that date. Not used.
10. **Deleted chats and memory (not found).** The delete article does not say whether memories from a deleted chat are removed. Not used.
11. **Recent changes to check.** Cowork is merging into chat: "If you're on a Pro or Max plan and your message box still shows "Chat" and "Cowork" options, you don't have it yet." From 6 Oct 2026, new Cowork tasks on Pro and Max run in the cloud. Memory moved to categorised entries on 10 Jul 2026 and started working across chat and Cowork in the cloud on 25 Aug 2026 (both verified in release notes). Memory from chat history was extended to free users on 2 Mar 2026 (release notes).
12. **Not found in official sources:** memory on Claude for Education; training and retention for Education accounts (the Education page only lists link titles); extended thinking by plan; retention and visibility of uploaded files on consumer plans; a per-chat switch for Instructions for Claude; a "what do you remember about me" check that Anthropic says is reliable.
13. **Desktop sub-pages.** The "Storage folder" and "Trusted folders" items are named but their sub-page path is not given. Folder selection buttons are not named in the fetched pages.
14. **Third-party Claude Desktop docs** (claude.com/docs/third-party/...) are for managed deployments, not consumer apps. Not used.
15. **Covered models policy (June 2026)** applies to Zero Data Retention organisations, not consumer apps. Mentioned only in Topic 3 to rule it out.

---

## Topic 1: Modes (chat, Cowork, Research, extended thinking)

| # | Claim | Quote from source | Source URL | Checked on |
|---|---|---|---|---|
| 1.1 | Claude's new experience removes the separate Chat and Cowork modes, so you ask in one conversation. | "With the new Claude experience, you ask for all of it in the same conversation, with no mode to choose." | https://support.claude.com/en/articles/16761823-claude-cowork-and-chat-are-one-claude | 22 Oct 2026 |
| 1.2 | Some accounts still see separate Chat and Cowork options until the new experience reaches them. | "If you're on a Pro or Max plan and your message box still shows "Chat" and "Cowork" options, you don't have it yet." | https://support.claude.com/en/articles/16761823-claude-cowork-and-chat-are-one-claude | 22 Oct 2026 |
| 1.3 | Cowork is for paid plans only. | "Cowork is available to paid Claude plans (Pro, Max, Team, Enterprise) only." | https://support.claude.com/en/articles/13345190-get-started-with-claude-cowork | 22 Oct 2026 |
| 1.4 | Cowork runs on desktop, web, mobile and in the Chrome side panel. | "Claude Cowork is available on desktop, web, mobile, and in the Claude in Chrome side panel." | https://support.claude.com/en/articles/15520349-use-claude-cowork-on-web-desktop-and-mobile | 22 Oct 2026 |
| 1.5 | Only the desktop app gives the full Cowork experience, including local files and the browser. | "Desktop is the full Cowork experience, where Claude can also use your local files and browser." | https://support.claude.com/en/articles/15520349-use-claude-cowork-on-web-desktop-and-mobile | 22 Oct 2026 |
| 1.6 | From 6 Oct 2026, new Cowork tasks on Pro and Max plans run in the cloud. | "On October 6, 2026, new Cowork tasks on Pro and Max plans run in the cloud." | https://support.claude.com/en/articles/15520349-use-claude-cowork-on-web-desktop-and-mobile | 22 Oct 2026 |
| 1.7 | Computer use (Claude clicking and typing on your screen) is in beta for Pro and Max. | "Computer use is in beta for Pro and Max plans." | https://support.claude.com/en/articles/14128542-let-claude-use-your-computer-in-cowork | 22 Oct 2026 |
| 1.8 | Team and Enterprise plans do not have computer use at present. | "Team and Enterprise plans don't have access to computer use at this time." | https://support.claude.com/en/articles/14128542-let-claude-use-your-computer-in-cowork | 22 Oct 2026 |
| 1.9 | Research is for paid plans (Pro, Max, Team, Enterprise) on web, desktop and mobile. | "Research is available for users with paid Claude plans (Pro, Max, Team, or Enterprise)" | https://support.claude.com/en/articles/11088861-use-research-on-claude | 22 Oct 2026 |
| 1.10 | Research needs web search turned on. | "You must have web search turned on for research to function." | https://support.claude.com/en/articles/11088861-use-research-on-claude | 22 Oct 2026 |
| 1.11 | Research is switched on from the "+" button, then "Research". | "Click the “+” button on the bottom left of your chat interface, then "Research."" | https://support.claude.com/en/articles/11088861-use-research-on-claude | 22 Oct 2026 |
| 1.12 | Research runs several searches, each building on the last, and decides what to look at next. | "It runs multiple searches that build on each other and decides what to look into next based on what it finds." | https://support.claude.com/en/articles/11088861-use-research-on-claude | 22 Oct 2026 |
| 1.13 | Research can use your connectors without asking each time. | "During research, Claude can use tools from your connectors automatically, without asking for approval each time." | https://support.claude.com/en/articles/11088861-use-research-on-claude | 22 Oct 2026 |
| 1.14 | Research started in the mobile app searches only the web, not your connectors. | "When you start research in Claude Mobile, Claude only searches the web and doesn’t use your connectors." | https://support.claude.com/en/articles/11088861-use-research-on-claude | 22 Oct 2026 |
| 1.15 | Research cannot use local MCP servers configured in Claude Desktop. | "Note that research can’t use tools from local MCP servers configured in Claude Desktop." | https://support.claude.com/en/articles/11088861-use-research-on-claude | 22 Oct 2026 |
| 1.16 | Research uses Claude Opus 5.5 (falling back to Opus 4.8) whatever model the chat is set to. | "It uses these models no matter which model you’ve selected for your chat." | https://support.claude.com/en/articles/11088861-use-research-on-claude | 22 Oct 2026 |
| 1.17 | Extended thinking is switched on or off from the model menu next to the send button. | "Click the model name next to the send button." | https://support.claude.com/en/articles/10574485-using-extended-thinking | 22 Oct 2026 |
| 1.18 | Some models always think, so thinking cannot be switched off for them. | "Thinking cannot be turned off in Claude when using Claude Haiku 5.5, Claude Sonnet 5.5, Claude Opus 5.5..." | https://support.claude.com/en/articles/10574485-using-extended-thinking | 22 Oct 2026 |
| 1.19 | Opus 5.5 and Fable 5.1 always think at every effort level. | "On Opus 5.5 and Fable 5.1, thinking is always on at every effort level, including on the Claude API." | https://support.claude.com/en/articles/10574485-using-extended-thinking | 22 Oct 2026 |
| 1.20 | Cowork tasks on the desktop can be changed to ask before each action in the message box. | "A permission setting in the message box controls how independently Claude works" | https://support.claude.com/en/articles/16761823-claude-cowork-and-chat-are-one-claude | 22 Oct 2026 |

**Not found in official sources:** which plans include extended thinking. The fetched thinking page has no plan split.

**Settings path (Topic 1):**
- Research: "Click the “+” button on the bottom left of your chat interface, then "Research."" (https://support.claude.com/en/articles/11088861-use-research-on-claude)
- Extended thinking: "Click the model name next to the send button." then "Switch the "Thinking" (or “Extended”) toggle on or off." (https://support.claude.com/en/articles/10574485-using-extended-thinking)
- No single settings path for the chat-versus-Cowork distinction: "With the new Claude experience, you ask for all of it in the same conversation, with no mode to choose."

---

## Topic 2: Memory

| # | Claim | Quote from source | Source URL | Checked on |
|---|---|---|---|---|
| 2.1 | Memory is on by default for Free, Pro and Max on web, desktop and mobile. | "Memory is on by default for Free, Pro, and Max plans on the web, Claude Desktop, and Claude Mobile" | https://support.claude.com/en/articles/11817273-use-claude-s-chat-search-and-memory-to-build-on-previous-context | 22 Oct 2026 |
| 2.2 | On Team and Enterprise, the owner decides whether memory is available, and it starts off for each member. | "owners control whether memory is available, and it's off for each member until they turn it on." | https://support.claude.com/en/articles/11817273-use-claude-s-chat-search-and-memory-to-build-on-previous-context | 22 Oct 2026 |
| 2.3 | Claude saves memory as individual topics while you chat, not as a summary after each conversation ends. | "Claude saves memory as a set of individual topics as you chat, rather than summarizing conversations after they end." | https://support.claude.com/en/articles/11817273-use-claude-s-chat-search-and-memory-to-build-on-previous-context | 22 Oct 2026 |
| 2.4 | You can ask Claude to save something directly. | "you can also tell Claude to "remember this" to save something directly." | https://support.claude.com/en/articles/11817273-use-claude-s-chat-search-and-memory-to-build-on-previous-context | 22 Oct 2026 |
| 2.5 | Memory from chat history was extended to free users on 2 Mar 2026. | "Memory from chat history is now available for all Claude users, including free users." | https://support.claude.com/en/articles/12138966-release-notes | 22 Oct 2026 |
| 2.6 | Memory has been stored as categorised entries since 10 Jul 2026. | "Memory on Claude now works as a set of individual, categorized entries" | https://support.claude.com/en/articles/12138966-release-notes | 22 Oct 2026 |
| 2.7 | Memory works across chat and Cowork when Cowork runs in the cloud (from 25 Aug 2026). | "Memory now works across chat and Cowork in the cloud." | https://support.claude.com/en/articles/12138966-release-notes | 22 Oct 2026 |
| 2.8 | Cowork sessions that run only on your computer do not use memory. | "Cowork sessions that run locally on your computer don't use memory." | https://support.claude.com/en/articles/11817273-use-claude-s-chat-search-and-memory-to-build-on-previous-context | 22 Oct 2026 |
| 2.9 | Everything Claude remembers is listed for you to review. | "Everything Claude remembers is listed under Topics." | https://support.claude.com/en/articles/11817273-use-claude-s-chat-search-and-memory-to-build-on-previous-context | 22 Oct 2026 |
| 2.10 | You can edit or delete any single memory topic. | "Select any topic to read it, then use the edit icon to change it or select "Delete" to remove it." | https://support.claude.com/en/articles/11817273-use-claude-s-chat-search-and-memory-to-build-on-previous-context | 22 Oct 2026 |
| 2.11 | You can change memory by asking Claude in a chat. | "add that information using the “Tell Claude what to change or remove” box, or by asking Claude in chat." | https://support.claude.com/en/articles/12123587-import-and-export-your-memory-from-claude | 22 Oct 2026 |
| 2.12 | Edits you make through the memory box can be reviewed under "Manage edits". | "You can review these edits by clicking “Manage edits.”" | https://support.claude.com/en/articles/12123587-import-and-export-your-memory-from-claude | 22 Oct 2026 |
| 2.13 | "Pause" keeps existing memory but stops Claude using it and stops new memories being made. | "Claude keeps its existing memory… but won't use memory or make new memories." | https://support.claude.com/en/articles/11817273-use-claude-s-chat-search-and-memory-to-build-on-previous-context | 22 Oct 2026 |
| 2.14 | "Reset" permanently deletes all memories, including project memories. | "Permanently deletes all memories including project memories." | https://support.claude.com/en/articles/11817273-use-claude-s-chat-search-and-memory-to-build-on-previous-context | 22 Oct 2026 |
| 2.15 | Memory can be switched off for one chat, but only before the first message is sent. | "You need to turn memory off before you send the first message." | https://support.claude.com/en/articles/11817273-use-claude-s-chat-search-and-memory-to-build-on-previous-context | 22 Oct 2026 |
| 2.16 | Claude can be stopped from searching past chats with a separate toggle. | "navigate to Settings > Memory and switch the toggle next to Search and reference chats off." | https://support.claude.com/en/articles/11817273-use-claude-s-chat-search-and-memory-to-build-on-previous-context | 22 Oct 2026 |
| 2.17 | Sensitive and personal topics are not stored by default. | "By default, Claude does not store topics related to personal or sensitive subject matter" | https://support.claude.com/en/articles/11817273-use-claude-s-chat-search-and-memory-to-build-on-previous-context | 22 Oct 2026 |
| 2.18 | Sensitive topics can be stored by turning on a setting. | "Turn on Include sensitive topics in memory in Settings > Memory." | https://support.claude.com/en/articles/11817273-use-claude-s-chat-search-and-memory-to-build-on-previous-context | 22 Oct 2026 |
| 2.19 | Some kinds of information are never saved, even if you ask. | "This includes government ID numbers, criminal history, financial account numbers, and immigration status." | https://support.claude.com/en/articles/11817273-use-claude-s-chat-search-and-memory-to-build-on-previous-context | 22 Oct 2026 |
| 2.20 | Each project keeps its own memory. | "Each project has its own memory." | https://support.claude.com/en/articles/9519177-how-can-i-create-and-manage-projects | 22 Oct 2026 |
| 2.21 | Account-wide memory can be turned off for one project. | "To keep a project's memory fully separate, turn off "Use account memory" under Memory on the project's page." | https://support.claude.com/en/articles/11817273-use-claude-s-chat-search-and-memory-to-build-on-previous-context | 22 Oct 2026 |
| 2.22 | Turning memory off for a whole Team or Enterprise organisation permanently deletes everyone's memory data. | "Turning off memory at the organization level permanently deletes all memory data for everyone in your organization." | https://support.claude.com/en/articles/11817273-use-claude-s-chat-search-and-memory-to-build-on-previous-context | 22 Oct 2026 |
| 2.23 | Organisation owners cannot view or edit a member's individual memories. | "Owners can't view or edit a user's individual memories." | https://support.claude.com/en/articles/11817273-use-claude-s-chat-search-and-memory-to-build-on-previous-context | 22 Oct 2026 |
| 2.24 | Memory is not available to organisations under HIPAA, public-sector or custom data retention agreements. | "Memory isn't available to organizations with HIPAA, public-sector, or custom data retention agreements." | https://support.claude.com/en/articles/11817273-use-claude-s-chat-search-and-memory-to-build-on-previous-context | 22 Oct 2026 |
| 2.25 | On the legacy experience, memory is viewed under Settings > Capabilities. | "To view your memory exactly how Claude sees it, go to Settings > Capabilities and click “View and edit your memory.”" | https://support.claude.com/en/articles/12123587-import-and-export-your-memory-from-claude | 22 Oct 2026 |

**Not found in official sources:** memory on Claude for Education accounts (see Gaps 12).

**Settings path (Topic 2):**
- New experience: "navigate to Settings > Memory and switch the toggle next to Search and reference chats off." Memory on or off is under "Settings > Memory > "Generate memory from chats"" (fetched page's own description of the toggle).
- Legacy experience: "go to Settings > Capabilities and click “View and edit your memory.”" (https://support.claude.com/en/articles/12123587-import-and-export-your-memory-from-claude)
- Identifying which you have: "If you see Settings > Memory, you’re using the new memory experience" (same page).

---

## Topic 3: Chat history and retention

| # | Claim | Quote from source | Source URL | Checked on |
|---|---|---|---|---|
| 3.1 | Your chats are listed in the left sidebar and the full list is under "Chats and tasks". | "Find the conversation in the left sidebar, or click "Chats and tasks" to see your full chat history." | https://support.claude.com/en/articles/8230524-delete-or-rename-a-conversation | 22 Oct 2026 |
| 3.2 | To delete one chat on the web, use the "⋮" menu and choose "Delete". | "Hover over the conversation and click the "⋮" button on the right side." | https://support.claude.com/en/articles/8230524-delete-or-rename-a-conversation | 22 Oct 2026 |
| 3.3 | A delete must be confirmed a second time. | "If deleting, click "Delete" again in the confirmation prompt." | https://support.claude.com/en/articles/8230524-delete-or-rename-a-conversation | 22 Oct 2026 |
| 3.4 | Several chats can be deleted at once using Select. | "Click "Select."" | https://support.claude.com/en/articles/8230524-delete-or-rename-a-conversation | 22 Oct 2026 |
| 3.5 | Deleted chats leave your history immediately and are removed from back-end storage within 30 days. | "Removed from your chat history immediately" and "Deleted from our back-end storage systems within 30 days" | https://privacy.claude.com/en/articles/10023548-how-long-do-you-store-my-data | 22 Oct 2026 |
| 3.6 | Deleted chats are not used to train future models. | "if you delete a chat from your chat history, it will not be used to train future models." | https://privacy.claude.com/en/articles/10023548-how-long-do-you-store-my-data | 22 Oct 2026 |
| 3.7 | If model training is on, data may be kept in de-identified form for up to five years. | "we may retain your data in a de-identified format for up to 5 years in our model training pipelines" | https://privacy.claude.com/en/articles/10023548-how-long-do-you-store-my-data | 22 Oct 2026 |
| 3.8 | If model training is off, your chats are not used for future training. | "we will not use your previous or new chats or coding sessions for future model training" | https://privacy.claude.com/en/articles/10023548-how-long-do-you-store-my-data | 22 Oct 2026 |
| 3.9 | Turning training off does not remove data already used in training runs in progress or in trained models. | "Your data will still be included in model training runs that are already in progress, or in models that have been trained." | https://privacy.claude.com/en/articles/10023548-how-long-do-you-store-my-data | 22 Oct 2026 |
| 3.10 | Feedback you submit about a response is kept for five years. | "we retain data associated with that submission for 5 years" | https://privacy.claude.com/en/articles/10023548-how-long-do-you-store-my-data | 22 Oct 2026 |
| 3.11 | On Team and Enterprise, chats are kept in the product to give a consistent experience. | "we retain your chats and coding sessions in the product to provide you with a consistent product experience" | https://privacy.claude.com/en/articles/7996866-how-long-do-you-store-my-organization-s-data | 22 Oct 2026 |
| 3.12 | On Team and Enterprise, a deleted chat is removed from the product immediately and from back-end storage within 30 days. | "Removed from your chat history immediately" and "Deleted from our back-end storage systems within 30 days" | https://privacy.claude.com/en/articles/7996866-how-long-do-you-store-my-organization-s-data | 22 Oct 2026 |
| 3.13 | Incognito chats are automatically deleted within 30 days on commercial plans unless flagged as a Usage Policy violation. | "Incognito chats are automatically deleted within 30 days unless flagged as a Usage Policy violation." | https://privacy.claude.com/en/articles/7996866-how-long-do-you-store-my-organization-s-data | 22 Oct 2026 |
| 3.14 | The June 2026 covered-models retention policy does not apply to consumer apps. | "Consumer plans (Claude Free, Pro, and Max) across our web, desktop, and mobile apps" "are unaffected by this update, since we already retain inputs and outputs on these surfaces." | https://support.claude.com/en/articles/15425996-data-retention-practices-for-covered-models | 22 Oct 2026 |

**Not found in official sources:** the retention period for a consumer chat when model training is off (the heading is empty on the fetched page); the custom retention minimum for Enterprise (the fetched page links to an article I did not fetch); what happens to a deleted chat's memories; consumer account-deletion details (not on a fetched page).

**Settings path (Topic 3):** "Click "Chats and tasks" in the left sidebar." (https://support.claude.com/en/articles/8230524-delete-or-rename-a-conversation)

---

## Topic 4: Projects

| # | Claim | Quote from source | Source URL | Checked on |
|---|---|---|---|---|
| 4.1 | Projects are open to all users, and free accounts can have up to five. | "Projects are available to all users, including those with free Claude accounts." and "Free users can create a maximum of five projects." | https://support.claude.com/en/articles/9519177-how-can-i-create-and-manage-projects | 22 Oct 2026 |
| 4.2 | Files added to a project are used across all chats in that project. | "Anything you upload to this space will be used across all of your chats within that project." | https://support.claude.com/en/articles/9519177-how-can-i-create-and-manage-projects | 22 Oct 2026 |
| 4.3 | Project instructions apply to every chat in that project. | "Claude will use these instructions for all the chats within the project." | https://support.claude.com/en/articles/9519177-how-can-i-create-and-manage-projects | 22 Oct 2026 |
| 4.4 | Project instructions apply only to chats inside that project. | "These instructions only apply to chats within that project." | https://support.claude.com/en/articles/10185728-understanding-claude-s-personalization-features | 22 Oct 2026 |
| 4.5 | Context is not shared between chats in a project unless it is added to the project knowledge base. | "Context is not shared across chats within a project unless the information is added into the project knowledge base." | https://support.claude.com/en/articles/9519177-how-can-i-create-and-manage-projects | 22 Oct 2026 |
| 4.6 | A project uses its own memory alongside your account memory from chats outside projects. | "Claude uses the project's memory alongside your memory from chats outside of projects" | https://support.claude.com/en/articles/9519177-how-can-i-create-and-manage-projects | 22 Oct 2026 |
| 4.7 | Project visibility and sharing are available only on Team and Enterprise plans. | "Project visibility and sharing features are available to users on Team or Enterprise plans." | https://support.claude.com/en/articles/9519189-manage-project-visibility-and-sharing | 22 Oct 2026 |
| 4.8 | On Team and Enterprise, a project can be public (everyone in the organisation) or private (invited members only). | "Public: Everyone in your organization can view and use the project." and "Private: Only invited members can view and use the project." | https://support.claude.com/en/articles/9519189-manage-project-visibility-and-sharing | 22 Oct 2026 |
| 4.9 | Chats in a shared project stay private to the person who wrote them. | "Even if a project is public, your chats within that project will be private…" | https://support.claude.com/en/articles/9519189-manage-project-visibility-and-sharing | 22 Oct 2026 |
| 4.10 | A member given view access can see project knowledge and instructions but not edit them. | "Members can see project contents, knowledge, and instructions, and chat within the project, but cannot edit it." | https://support.claude.com/en/articles/9519189-manage-project-visibility-and-sharing | 22 Oct 2026 |
| 4.11 | Cowork does not change a project's contents, so anything to keep must be added to the project by hand. | "Cowork won't change a project's contents, so add anything you want to keep to the project yourself." | https://support.claude.com/en/articles/15520349-use-claude-cowork-on-web-desktop-and-mobile | 22 Oct 2026 |
| 4.12 | Connectors are available only in private projects. | "Connectors are only available in private projects." | https://support.claude.com/en/articles/11176164-use-connectors-to-extend-claude-s-capabilities | 22 Oct 2026 |
| 4.13 | Incognito chats are not available inside projects. | "Incognito mode is currently only available for chats outside of projects" | https://support.claude.com/en/articles/12260368-use-incognito-chats | 22 Oct 2026 |
| 4.14 | On Team and Enterprise, project memory is available only when the owner has enabled memory. | "On Team and Enterprise plans, memory is available when an owner has enabled it." | https://support.claude.com/en/articles/9519177-how-can-i-create-and-manage-projects | 22 Oct 2026 |

**Not found in official sources:** how long project files are kept; whether project files are visible to others on Free, Pro or Max (the sharing page covers Team and Enterprise only).

**Settings path (Topic 4):**
- Create: "Click "+ New Project" in the upper right corner." (https://support.claude.com/en/articles/9519177-how-can-i-create-and-manage-projects)
- Instructions: "Click on "Set project instructions."" then "click "Save instructions."" (same page)
- Add files: "Click on the "+" button to add content to the project." (same page)
- Project memory: "turn off "Use account memory" under Memory on the project's page." (https://support.claude.com/en/articles/11817273-use-claude-s-chat-search-and-memory-to-build-on-previous-context)

---

## Topic 5: Uploaded files

| # | Claim | Quote from source | Source URL | Checked on |
|---|---|---|---|---|
| 5.1 | Documents are read for their text only; Claude does not read embedded images in them. | "Claude extracts text only from these files." and "If they contain embedded images, Claude won't be able to read or interpret them." | https://support.claude.com/en/articles/8241126-upload-files-to-claude | 22 Oct 2026 |
| 5.2 | PDFs of 100 pages or fewer are read for both text and visuals. | "Claude analyzes both text and visual elements (like images, charts, and graphics) in PDFs of 100 pages or fewer." | https://support.claude.com/en/articles/8241126-upload-files-to-claude | 22 Oct 2026 |
| 5.3 | PDFs from 101 to 1000 pages are read for text only. | "For PDFs from 101 to 1000 pages, Claude processes text only and doesn't analyze visual elements." | https://support.claude.com/en/articles/8241126-upload-files-to-claude | 22 Oct 2026 |
| 5.4 | Chat uploads are limited to 20 files per chat; the file size limit is 500MB per file. | "Number of files: Up to 20 files per chat" and "File size: 500MB per file" | https://support.claude.com/en/articles/8241126-upload-files-to-claude | 22 Oct 2026 |
| 5.5 | Project files are limited to 30MB each, and total project content must fit Claude's context window. | "File size: 30MB per file" and "Unlimited, but total content must fit within Claude's context window" | https://support.claude.com/en/articles/8241126-upload-files-to-claude | 22 Oct 2026 |
| 5.6 | Files can be kept in a project's Files section for reference across conversations. | "uploaded to a project's Files section for persistent reference across conversations" | https://support.claude.com/en/articles/8241126-upload-files-to-claude | 22 Oct 2026 |
| 5.7 | Files Claude fetches from the cloud for a Cowork task are copies, and they are deleted when you delete the session. | "When a task needs a file in the cloud, Claude fetches a copy of just that file." and "When you delete a session, the copies Claude fetched are deleted too" | https://support.claude.com/en/articles/15520349-use-claude-cowork-on-web-desktop-and-mobile | 22 Oct 2026 |
| 5.8 | Google Drive files are read as text only. | "When Claude reads a Google Drive file, it extracts text content only." | https://support.claude.com/en/articles/10166901-use-google-workspace-connectors | 22 Oct 2026 |

**Not found in official sources:** how long uploaded chat or project files are kept on consumer plans; who can see a consumer's uploaded files; whether uploads are used for training (the upload page does not say). The team and Enterprise sharing page says "All content within the project (chats, project knowledge, and artifacts) remains inaccessible to other members…" but does not cover consumer uploads.

**Settings path (Topic 5):** Project files: "Click on the "+" button to add content to the project." (https://support.claude.com/en/articles/9519177-how-can-i-create-and-manage-projects). Chat upload location: NOT FOUND in fetched sources.

---

## Topic 6: Connectors and integrations

| # | Claim | Quote from source | Source URL | Checked on |
|---|---|---|---|---|
| 6.1 | Connectors let Claude reach your apps and services, read your data, and take actions in them. | "Connectors let Claude access your apps and services, retrieve your data, and take actions within connected services." | https://support.claude.com/en/articles/11176164-use-connectors-to-extend-claude-s-capabilities | 22 Oct 2026 |
| 6.2 | Claude uses the same permissions you have in the connected service. | "Claude inherits each person's permissions from the connected service." | https://support.claude.com/en/articles/11176164-use-connectors-to-extend-claude-s-capabilities | 22 Oct 2026 |
| 6.3 | The Gmail connector can search and read email, and send, reply to and forward it. | "Search and read emails using natural language queries" and "Send, reply to, and forward emails from Gmail." | https://support.claude.com/en/articles/10166901-use-google-workspace-connectors | 22 Oct 2026 |
| 6.4 | The Gmail connector reads attachment details but not attachment contents. | "Access email metadata, including attachment metadata (not attachment content)" | https://support.claude.com/en/articles/10166901-use-google-workspace-connectors | 22 Oct 2026 |
| 6.5 | The Calendar connector can create, change and delete events. | "Create, update, and delete events with full customization" | https://support.claude.com/en/articles/10166901-use-google-workspace-connectors | 22 Oct 2026 |
| 6.6 | The Drive connector can share, move and trash files. | "Share, move, and trash files in Google Drive." | https://support.claude.com/en/articles/10166901-use-google-workspace-connectors | 22 Oct 2026 |
| 6.7 | By default, Claude asks your approval before each action taken through a Google connector. | "By default, each action Claude takes on your behalf requires your explicit approval." | https://support.claude.com/en/articles/10166901-use-google-workspace-connectors | 22 Oct 2026 |
| 6.8 | Research mode can use connectors without asking each time (conflict with 6.7). | "During research, Claude can use tools from your connectors automatically, without asking for approval each time." | https://support.claude.com/en/articles/11088861-use-research-on-claude | 22 Oct 2026 |
| 6.9 | Anthropic says it does not train its models on Gmail, Drive or Calendar connector data. | "We do not train our models on your Gmail, Drive, or Calendar connector data" | https://support.claude.com/en/articles/10166901-use-google-workspace-connectors | 22 Oct 2026 |
| 6.10 | Text copied or pasted from these services into a chat may be used for training if you have opted in. | "may be used to improve our models." (content copied or pasted from these services, for consumer accounts that have opted into training) | https://support.claude.com/en/articles/10166901-use-google-workspace-connectors | 22 Oct 2026 |
| 6.11 | Raw connector content (for example Google Drive, and remote and local MCP servers) is not part of the training data. | "It does not include raw content from connectors (e.g. Google Drive), including remote and local MCP servers…" | https://privacy.claude.com/en/articles/10023580-is-my-data-used-for-model-training | 22 Oct 2026 |
| 6.12 | Data retrieved through connectors is stored on Anthropic's servers, and deleting the chat deletes it. | "Data retrieved while using connectors is stored on Anthropic servers" and "you can delete any retrieved data by deleting the chat." | https://support.claude.com/en/articles/10166901-use-google-workspace-connectors | 22 Oct 2026 |
| 6.13 | Connectors can be enabled for a single chat by switching them on in that chat. | "Enable the specific services you want Claude to use for that conversation by toggling them on." | https://support.claude.com/en/articles/11176164-use-connectors-to-extend-claude-s-capabilities | 22 Oct 2026 |
| 6.14 | Custom (remote MCP) connectors run from Anthropic's cloud, not from your device. | "Custom connectors connect to your MCP server from Anthropic's cloud, not from your local device." | https://support.claude.com/en/articles/11176164-use-connectors-to-extend-claude-s-capabilities | 22 Oct 2026 |
| 6.15 | Free accounts can add one custom connector. | "Free users are limited to one custom connector." | https://support.claude.com/en/articles/11176164-use-connectors-to-extend-claude-s-capabilities | 22 Oct 2026 |
| 6.16 | Connectors that use local MCP servers work only through the desktop app. | "Local connectors and plugins that include local MCP servers work through the desktop app only." | https://support.claude.com/en/articles/15520349-use-claude-cowork-on-web-desktop-and-mobile | 22 Oct 2026 |
| 6.17 | On Team and Enterprise, an owner must enable connectors for the organisation before members can connect. | "an Owner or Primary Owner must enable these connectors at the organization level before individual users can authenticate" | https://support.claude.com/en/articles/10166901-use-google-workspace-connectors | 22 Oct 2026 |
| 6.18 | You must sign in to Google directly to use the Google connectors. | "You must authenticate directly with your Google account before using these connectors." | https://support.claude.com/en/articles/10166901-use-google-workspace-connectors | 22 Oct 2026 |

**Settings path (Topic 6):**
- Connect: "Click the "+" button next to Connectors." after "Navigate to Customize > Connectors." (https://support.claude.com/en/articles/11176164-use-connectors-to-extend-claude-s-capabilities)
- Disconnect: "Find your Google connector and click on it to view the details." then "Click the "Disconnect" button." (https://support.claude.com/en/articles/10166901-use-google-workspace-connectors)
- Revoke at Google: "disconnect from your Google account settings at myaccount.google.com/connections" (same page)
- Team and Enterprise admin: "Organization settings > Connectors" (same page)

---

## Topic 7: Personal instructions, preferences and styles

| # | Claim | Quote from source | Source URL | Checked on |
|---|---|---|---|---|
| 7.1 | Account-wide instructions apply to all your chats with Claude. | "Any instructions you add here will be applied to all of your conversations with Claude." | https://support.claude.com/en/articles/10185728-understanding-claude-s-personalization-features | 22 Oct 2026 |
| 7.2 | The account-wide setting is called "Instructions for Claude". | "Under "Instructions for Claude," describe your instructions, such as:" | https://support.claude.com/en/articles/10185728-understanding-claude-s-personalization-features | 22 Oct 2026 |
| 7.3 | Global instructions from Cowork carry over into "Instructions for Claude" in the new experience. | "If you used Global instructions in Claude Cowork, they're part of Instructions for Claude…" | https://support.claude.com/en/articles/10185728-understanding-claude-s-personalization-features | 22 Oct 2026 |
| 7.4 | Account-wide instructions are for settings that affect all your interactions; project instructions are for one project. | "Use profile instructions for account-wide settings that affect all your interactions with Claude." | https://support.claude.com/en/articles/10185728-understanding-claude-s-personalization-features | 22 Oct 2026 |
| 7.5 | Skills add specific behaviours or capabilities, and can change how Claude formats its replies. | "Skills add specific behaviors or capabilities to your conversations with Claude." and "Use skills when you want to customize how Claude formats and delivers its responses." | https://support.claude.com/en/articles/10185728-understanding-claude-s-personalization-features | 22 Oct 2026 |
| 7.6 | Your account instructions and style information still apply in an incognito chat. | "Yes, Claude can access this information within an incognito chat." (answering whether Claude can access "custom styles, personal preferences, etc.") | https://support.claude.com/en/articles/12260368-use-incognito-chats | 22 Oct 2026 |
| 7.7 | Project instructions help Claude with the context and requirements of a single project. | "Project instructions help Claude understand the specific context and requirements for a particular project." | https://support.claude.com/en/articles/10185728-understanding-claude-s-personalization-features | 22 Oct 2026 |
| 7.8 | Folder instructions add project-specific context to a Cowork task when you choose a folder on desktop. | "Folder instructions add project-specific context to Cowork when you select a local folder on desktop." | https://support.claude.com/en/articles/13345190-get-started-with-claude-cowork | 22 Oct 2026 |

**Not found in official sources:** a current "custom styles" feature (the current personalisation page does not mention it; the Enterprise guide links to one but I did not fetch it); a per-chat switch to pause Instructions for Claude; a way to set instructions for a single chat without changing the account setting. The answer to "how do I get a clean answer that my instructions can't shape?" is therefore: incognito does not switch them off (7.6), and no official method to pause them for one chat was found.

**Settings path (Topic 7):**
- "Click your initials in the lower left corner." then "Select "Settings."" then "Under "Instructions for Claude," describe your instructions" (https://support.claude.com/en/articles/10185728-understanding-claude-s-personalization-features)
- Profile page URL, as linked from the privacy help article: "Select Settings, or navigate to here" (link: https://claude.ai/settings/profile). The label "Settings > Profile" is not used in the fetched pages.

---

## Topic 8: Claude Desktop app and local folders

| # | Claim | Quote from source | Source URL | Checked on |
|---|---|---|---|---|
| 8.1 | Cowork reaches local files only through the desktop app, and only in folders you have connected. | "Claude reaches only the folders you've connected, through the desktop app, and only while it's open." | https://support.claude.com/en/articles/15520349-use-claude-cowork-on-web-desktop-and-mobile | 22 Oct 2026 |
| 8.2 | The desktop app must be open for tasks that use local files, the built-in browser or computer use. | "Claude reaches your local files, the built-in browser, and computer use only while Claude Desktop is open…" | https://support.claude.com/en/articles/16761823-claude-cowork-and-chat-are-one-claude | 22 Oct 2026 |
| 8.3 | On desktop, Claude can read and write files in connected folders without you uploading or downloading them. | "On desktop, Claude can read from and write to your local files without manual uploads or downloads." | https://support.claude.com/en/articles/13345190-get-started-with-claude-cowork | 22 Oct 2026 |
| 8.4 | Claude can read and write only in folders you have connected. | "Claude can only read and write files in folders you've connected…" | https://support.claude.com/en/articles/13345190-get-started-with-claude-cowork | 22 Oct 2026 |
| 8.5 | Claude asks permission before permanently deleting any file, in every mode. | "When using Cowork, Claude requires your explicit permission before permanently deleting any files." and "Claude always asks before permanently deleting files, in any mode." | https://support.claude.com/en/articles/13364135-use-claude-cowork-safely | 22 Oct 2026 |
| 8.6 | The deletion prompt asks you to select "Allow" before Claude deletes. | "You will see a permission prompt and will need to select "Allow" before Claude is allowed to perform deletion tasks." | https://support.claude.com/en/articles/13345190-get-started-with-claude-cowork | 22 Oct 2026 |
| 8.7 | In "Skip all approvals", nothing checks what Claude does. | "in 'Skip all approvals,' nothing checks its actions" | https://support.claude.com/en/articles/13364135-use-claude-cowork-safely | 22 Oct 2026 |
| 8.8 | The default permission setting is "Manual", and Claude asks before each action. | "Manual (default): Claude asks before it takes actions, and you choose whether to allow each one." | https://support.claude.com/en/articles/16761823-claude-cowork-and-chat-are-one-claude | 22 Oct 2026 |
| 8.9 | You can change the permission mode at any time from the mode selector in the chat box. | "You can change the mode at any time from the mode selector in the chat box." | https://support.claude.com/en/articles/13345190-get-started-with-claude-cowork | 22 Oct 2026 |
| 8.10 | Files processed through the desktop app are handled on Anthropic's servers, not only on your computer. | "including any local files it opens through the desktop app" and "is processed on Anthropic's servers rather than staying on your computer." | https://support.claude.com/en/articles/13364135-use-claude-cowork-safely | 22 Oct 2026 |
| 8.11 | Anthropic suggests a dedicated working folder for Claude rather than broad access. | "Consider creating a dedicated working folder for Claude rather than granting broad access" | https://support.claude.com/en/articles/13364135-use-claude-cowork-safely | 22 Oct 2026 |
| 8.12 | Anthropic advises against giving access to local files with sensitive information. | "Avoid granting access to local files with sensitive information, like financial documents." | https://support.claude.com/en/articles/13364135-use-claude-cowork-safely | 22 Oct 2026 |
| 8.13 | Anthropic advises keeping backups of important files. | "keep backups of important files" | https://support.claude.com/en/articles/13364135-use-claude-cowork-safely | 22 Oct 2026 |
| 8.14 | Anthropic's first-step advice is to start with simple, low-risk tasks. | "Start simple." and "Begin with low-risk tasks like generating summaries or compiling information before automating anything more complex." | https://support.claude.com/en/articles/13364135-use-claude-cowork-safely | 22 Oct 2026 |
| 8.15 | Review Claude's planned actions before it proceeds, especially with sensitive files. | "Review Claude's planned actions before allowing it to proceed, especially when working with sensitive files." | https://support.claude.com/en/articles/13345190-get-started-with-claude-cowork | 22 Oct 2026 |
| 8.16 | Computer use asks permission before Claude accesses each application. | "Claude asks for your permission before accessing each application." | https://support.claude.com/en/articles/14128542-let-claude-use-your-computer-in-cowork | 22 Oct 2026 |
| 8.17 | Some sensitive apps (investment, trading, cryptocurrency) are blocked by default for computer use. | "some sensitive apps (investment and trading platforms, cryptocurrency) are blocked by default." | https://support.claude.com/en/articles/14128542-let-claude-use-your-computer-in-cowork | 22 Oct 2026 |
| 8.18 | Computer use has no sandbox between Claude and your apps. | "Computer use has no sandbox between Claude and your applications." | https://support.claude.com/en/articles/14128542-let-claude-use-your-computer-in-cowork | 22 Oct 2026 |
| 8.19 | Anthropic advises against giving computer use access to banking, healthcare or government apps. | "Do not give computer use permission access to sensitive apps (such as banking, healthcare, government)." | https://support.claude.com/en/articles/14128542-let-claude-use-your-computer-in-cowork | 22 Oct 2026 |
| 8.20 | Desktop Cowork uses a browser built into the app by default. | "On desktop, Claude uses a browser built into the Claude Desktop app by default" | https://support.claude.com/en/articles/15520349-use-claude-cowork-on-web-desktop-and-mobile | 22 Oct 2026 |
| 8.21 | The Cowork desktop app requires the latest version of Claude for Windows (and macOS for the desktop app). | "Cowork requires the latest version of Claude for Windows." and "The Claude Desktop app for macOS or Windows, open and connected." | https://support.claude.com/en/articles/13345190-get-started-with-claude-cowork | 22 Oct 2026 |
| 8.22 | "Only on your computer" was removed from Settings > General on 6 Oct 2026. | "The Only on your computer option in Settings > General was removed." | https://support.claude.com/en/articles/15520349-use-claude-cowork-on-web-desktop-and-mobile | 22 Oct 2026 |
| 8.23 | Folders you gave Cowork access to are listed under Trusted folders. | "Folders you gave Cowork access to are listed under Trusted folders." | https://support.claude.com/en/articles/16761823-claude-cowork-and-chat-are-one-claude | 22 Oct 2026 |
| 8.24 | A Cowork working folder is listed under Storage folder in Settings. | "Look for Storage folder in Settings." | https://support.claude.com/en/articles/16761823-claude-cowork-and-chat-are-one-claude | 22 Oct 2026 |
| 8.25 | Incognito chats cannot create files or run code. | "Incognito chats still work, but they open in the previous experience, so Claude can't create files or run code in them." | https://support.claude.com/en/articles/16761823-claude-cowork-and-chat-are-one-claude | 22 Oct 2026 |

**Not found in official sources:** an explicit list of what the desktop app cannot read or change beyond the folders you grant; the exact button names for choosing a folder; the sub-page path for Trusted folders. The third-party Claude Desktop documents are for managed deployments and are not used.

**Settings path (Topic 8):**
- Storage folder and Trusted folders: "Look for Storage folder in Settings." and "Folders you gave Cowork access to are listed under Trusted folders." (https://support.claude.com/en/articles/16761823-claude-cowork-and-chat-are-one-claude)
- Old local-only option: "The Only on your computer option in Settings > General was removed." (https://support.claude.com/en/articles/15520349-use-claude-cowork-on-web-desktop-and-mobile)
- Permission mode: "You can change the mode at any time from the mode selector in the chat box." (https://support.claude.com/en/articles/13345190-get-started-with-claude-cowork)

---

## Topic 9: Plans (only the differences that touch memory, training, retention and connectors)

| # | Claim | Quote from source | Source URL | Checked on |
|---|---|---|---|---|
| 9.1 | Free plan: $0, memory across conversations, projects up to five, Research not included, model training "Opt-out". | "Free for everyone", "Memory across conversations", "Up to 5", "No", "Opt-out" | https://claude.com/pricing | 22 Oct 2026 |
| 9.2 | Pro plan: $17 a month on annual billing ($200 up front), or $20 a month billed monthly; memory, connectors and Research included; project sharing "No". | "Per month with annual subscription discount ($200 billed up front). $20 if billed monthly." | https://claude.com/pricing | 22 Oct 2026 |
| 9.3 | Max plan: from $100 a month (Max 5x and Max 20x); memory, projects, connectors and Research included. | "From $100" and "Max 5x" / "Max 20x" | https://claude.com/pricing | 22 Oct 2026 |
| 9.4 | Team plan: from $20 a seat a month (annual) or $25 (monthly), no model training on your content by default, project sharing included. | "No model training on your content by default" and "Per seat / month if billed annually. $25 if billed monthly." | https://claude.com/pricing | 22 Oct 2026 |
| 9.5 | Enterprise plan: US$20 a seat a month billed annually, 20-seat minimum, plus usage at API rates; no training by default. | "US$20/seat/month, billed annually, 20 seat minimum." and "None by default" | https://claude.com/pricing | 22 Oct 2026 |
| 9.6 | The Education plan includes projects, advanced models, higher usage limits and file uploads; its feature list does not include memory. | "Projects feature: Create and organize multiple related conversations with shared knowledge bases." and "Increased usage limits: More messages per day compared to individual plans." | https://support.claude.com/en/articles/11139144-use-claude-for-education-at-your-university | 22 Oct 2026 |
| 9.7 | Web connectors are available to all users on Claude, Cowork, desktop and mobile. | "Web connectors are available for all users on Claude, Cowork, Claude Desktop, and Claude Mobile (iOS and Android)." | https://support.claude.com/en/articles/11176164-use-connectors-to-extend-claude-s-capabilities | 22 Oct 2026 |
| 9.8 | Computer use is in beta for Pro and Max only. | "Computer use is in beta for Pro and Max plans." | https://support.claude.com/en/articles/14128542-let-claude-use-your-computer-in-cowork | 22 Oct 2026 |
| 9.9 | This help article covers consumer plans (Free, Pro, Max) and Claude Code use from those accounts. | "This article is about our consumer products such as Claude Free, Pro, Max and when accounts from those plans use Claude Code." | https://privacy.claude.com/en/articles/12109829-how-do-i-change-my-model-improvement-privacy-settings | 22 Oct 2026 |
| 9.10 | Commercial products (Claude for Work, the API) are covered by separate terms. | "For our commercial products such as Claude for Work and the Anthropic API, see here." | https://privacy.claude.com/en/articles/12109829-how-do-i-change-my-model-improvement-privacy-settings | 22 Oct 2026 |

**Not found in official sources:** whether memory is available on Claude for Education (see Gaps 12); whether Education accounts train models or how long they are kept (the Education page lists link titles only); which plan includes extended thinking; Enterprise custom retention minimum (see Topic 3).

**Settings path (Topic 9):** Plan changes: NOT FOUND in fetched sources. The pricing page is the only plan comparison fetched.

---

## Topic 10: Incognito chat

| # | Claim | Quote from source | Source URL | Checked on |
|---|---|---|---|---|
| 10.1 | Incognito chats are temporary and are not saved to chat history or to Claude's memory. | "Incognito chats are temporary conversations that aren't saved to your chat history or to Claude's memory." | https://support.claude.com/en/articles/12260368-use-incognito-chats | 22 Oct 2026 |
| 10.2 | Incognito chats are available on every consumer plan. | "Incognito chats are available to all Claude users (Free, Pro, Max, Team, and Enterprise plans)." | https://support.claude.com/en/articles/12260368-use-incognito-chats | 22 Oct 2026 |
| 10.3 | Starting an incognito chat does not use Claude's existing memory. | "Starting an incognito chat won't use Claude's existing memory." | https://support.claude.com/en/articles/12260368-use-incognito-chats | 22 Oct 2026 |
| 10.4 | Incognito chats are not added to future memory. | "Incognito chats will not be included in future memory entries." | https://support.claude.com/en/articles/12260368-use-incognito-chats | 22 Oct 2026 |
| 10.5 | Claude does not search incognito chats when searching your past conversations. | "Claude won't pull information from incognito chats when searching previous conversations." | https://support.claude.com/en/articles/12260368-use-incognito-chats | 22 Oct 2026 |
| 10.6 | Your instructions and style settings (profile information) still apply in an incognito chat. | "Yes, Claude can access this information within an incognito chat." | https://support.claude.com/en/articles/12260368-use-incognito-chats | 22 Oct 2026 |
| 10.7 | Incognito chats are not available inside projects, so project knowledge does not apply to them. | "Incognito mode is currently only available for chats outside of projects" | https://support.claude.com/en/articles/12260368-use-incognito-chats | 22 Oct 2026 |
| 10.8 | Incognito chats are kept for 30 days by default. | "…retained for either 30 days (default), or longer in accordance with your organization's custom data retention setting" | https://support.claude.com/en/articles/12260368-use-incognito-chats | 22 Oct 2026 |
| 10.9 | Incognito chats are not used for training, even if model improvement is on. | "Your Incognito chats are not used to improve Claude, even if you have enabled Model Improvement in your Privacy Settings." | https://privacy.claude.com/en/articles/10023580-is-my-data-used-for-model-training | 22 Oct 2026 |
| 10.10 | Once an incognito chat is closed it cannot be reopened, and it cannot be converted to a normal chat. | "Once closed, incognito chats cannot be reopened." and "No, once you start an incognito chat, it cannot be converted to a regular chat or saved to your history." | https://support.claude.com/en/articles/12260368-use-incognito-chats | 22 Oct 2026 |
| 10.11 | The ghost icon in the upper right starts an incognito chat, outside a project. | "When starting a new chat with Claude outside of a project, you'll see a ghost icon in the upper right corner of your screen" and "Click the ghost icon to enable incognito mode." | https://support.claude.com/en/articles/12260368-use-incognito-chats | 22 Oct 2026 |
| 10.12 | An incognito chat is marked by a black border and an "Incognito chat" label. | "…you're in an incognito chat with a black border and "Incognito chat" label in the upper left corner." | https://support.claude.com/en/articles/12260368-use-incognito-chats | 22 Oct 2026 |
| 10.13 | Memory can be switched off for one new chat from the "+" menu, but only before the first message is sent. | "Click "Memory" to turn it off for this chat." and "You need to turn memory off before you send the first message." | https://support.claude.com/en/articles/11817273-use-claude-s-chat-search-and-memory-to-build-on-previous-context | 22 Oct 2026 |
| 10.14 | Incognito chats are not used to improve Claude, so they are not in the training data. | "Incognito chats are not used for training." | https://support.claude.com/en/articles/12260368-use-incognito-chats | 22 Oct 2026 |
| 10.15 | In the new experience, incognito chats open in the previous experience and cannot create files or run code. | "If you have the new Claude experience, incognito chats open in the previous chat experience" | https://support.claude.com/en/articles/12260368-use-incognito-chats | 22 Oct 2026 |

**Direct answer to the reader question.** Incognito gives you a chat with no memory, no history, no search of past chats and no training use. It does not switch off Instructions for Claude (see 10.6). To pause memory for a single chat, use the "+" menu before the first message (10.13). To pause memory for all chats, use "Pause memory" under Settings > Memory (Topic 2, row 2.13). No official method was found to pause Instructions for Claude for a single chat.

**Settings path (Topic 10):**
- Start incognito: "Click the ghost icon to enable incognito mode." (https://support.claude.com/en/articles/12260368-use-incognito-chats)
- Switch memory off for one chat: "Click "+" in the message box." then "Click "Memory" to turn it off for this chat." (https://support.claude.com/en/articles/11817273-use-claude-s-chat-search-and-memory-to-build-on-previous-context)
- Pause memory for all chats: "Settings > Memory > "Generate memory from chats"" (fetched page's own description of this toggle).

---

## Topic 11: Training / data-use setting ("Help improve Claude")

| # | Claim | Quote from source | Source URL | Checked on |
|---|---|---|---|---|
| 11.1 | The setting is called "Help Improve our AI models" and is a toggle. | "Under "Help Improve our AI models," click the button to toggle it off/on" | https://privacy.claude.com/en/articles/12109829-how-do-i-change-my-model-improvement-privacy-settings | 22 Oct 2026 |
| 11.2 | The pricing page lists model training as "Opt-out" for Free, Pro and Max. | "Opt-out" (model training row, Free, Pro and Max columns) | https://claude.com/pricing | 22 Oct 2026 |
| 11.3 | On Team and Enterprise, no model training happens on your content by default. | "No model training on your content by default" | https://claude.com/pricing | 22 Oct 2026 |
| 11.4 | Consumer users were given a choice on whether their chats are used to improve Claude, with a deadline of 8 Oct 2025. | "We're now giving users the choice to allow their data to be used to improve Claude" and "you have until October 8, 2025 to accept the updated Consumer Terms and make your decision" | https://www.anthropic.com/news/updates-to-our-consumer-terms | 22 Oct 2026 |
| 11.5 | The Consumer Terms announcement does not state a default, so it does not settle the conflict with 11.2. | "If you're a new user, you can select your preference in the signup process." | https://www.anthropic.com/news/updates-to-our-consumer-terms | 22 Oct 2026 |
| 11.6 | When the setting is on, Anthropic uses chats and coding sessions, including to improve models. | "We will use your chats and coding sessions (including to improve our models) if:" and "You choose to allow us to use your chats and coding sessions to improve Claude" | https://privacy.claude.com/en/articles/10023580-is-my-data-used-for-model-training | 22 Oct 2026 |
| 11.7 | When the setting is on, data may be kept in de-identified form for up to five years in training pipelines. | "we may retain your data in a de-identified format for up to 5 years in our model training pipelines" | https://privacy.claude.com/en/articles/10023548-how-long-do-you-store-my-data | 22 Oct 2026 |
| 11.8 | The five-year period applies only to new or resumed chats after the setting is turned on. | "This retention period only applies to new or resumed chats after the model training setting has been enabled." | https://privacy.claude.com/en/articles/10023548-how-long-do-you-store-my-data | 22 Oct 2026 |
| 11.9 | When the setting is off, your previous and new chats are not used for future training. | "we will not use your previous or new chats or coding sessions for future model training" | https://privacy.claude.com/en/articles/10023548-how-long-do-you-store-my-data | 22 Oct 2026 |
| 11.10 | Turning the setting off does not remove data already in training runs or already-trained models. | "Your data will still be included in model training runs that are already in progress, or in models that have been trained." | https://privacy.claude.com/en/articles/10023548-how-long-do-you-store-my-data | 22 Oct 2026 |
| 11.11 | Chats you delete are not used to train future models. | "if you delete a chat from your chat history, it will not be used to train future models." | https://privacy.claude.com/en/articles/10023548-how-long-do-you-store-my-data | 22 Oct 2026 |
| 11.12 | Feedback you submit is kept for five years, whatever the training setting. | "we retain data associated with that submission for 5 years" | https://privacy.claude.com/en/articles/10023548-how-long-do-you-store-my-data | 22 Oct 2026 |
| 11.13 | Incognito chats are excluded from training even when the setting is on. | "Your Incognito chats are not used to improve Claude, even if you have enabled Model Improvement in your Privacy Settings." | https://privacy.claude.com/en/articles/10023580-is-my-data-used-for-model-training | 22 Oct 2026 |
| 11.14 | Raw content from connectors is excluded from training. | "It does not include raw content from connectors (e.g. Google Drive), including remote and local MCP servers…" | https://privacy.claude.com/en/articles/10023580-is-my-data-used-for-model-training | 22 Oct 2026 |
| 11.15 | Commercial products (Claude for Work, the API) have separate terms. | "For our commercial products such as Claude for Work and the Anthropic API, see here." | https://privacy.claude.com/en/articles/12109829-how-do-i-change-my-model-improvement-privacy-settings | 22 Oct 2026 |
| 11.16 | Even with the setting off, Anthropic may use conversations flagged for safety review, including to train models for its Safeguards team. (Added 24 Oct 2026 from the raw page HTML, to settle an exception a readiness check raised on 23 Oct 2026. The page lists three conditions under "We will use your chats and coding sessions (including to improve our models) if:".) | "Your conversations are flagged for safety review (in which case we may use or analyze them to improve our ability to detect and enforce our Usage Policy, including training models for use by our Safeguards team, consistent with Anthropic’s safety mission)" | https://privacy.claude.com/en/articles/10023580-is-my-data-used-for-model-training | 24 Oct 2026 |
| 11.17 | Anthropic also uses chats where the user explicitly opts in to training in some other way, for example the Trusted Tester Program. (Same list and same date as 11.16.) | "By otherwise explicitly opting in to training (e.g. joining our Trusted Tester Program)" | https://privacy.claude.com/en/articles/10023580-is-my-data-used-for-model-training | 24 Oct 2026 |

**Not found in official sources:** the default state for Free, Pro and Max other than the pricing page's "Opt-out" label; the retention period when the setting is off (the heading on the fetched page is empty); whether Education accounts are covered.

**Settings path (Topic 11):**
- "Select your name from your settings menu and click the drop down button" then "Select Settings, or navigate to here" (link: https://claude.ai/settings/profile) then "Select Privacy, or navigate to here" (link: https://claude.ai/settings/data-privacy-controls) then "Under Help Improve our AI models, click the button to toggle it off/on" (https://privacy.claude.com/en/articles/12109829-how-do-i-change-my-model-improvement-privacy-settings)

---

## Topic 12: Is asking Claude "what do you remember about me?" a reliable check?

| # | Claim | Quote from source | Source URL | Checked on |
|---|---|---|---|---|
| 12.1 | Anthropic's own method to see what Claude remembers is the memory list, not a question to Claude. | "Everything Claude remembers is listed under Topics." | https://support.claude.com/en/articles/11817273-use-claude-s-chat-search-and-memory-to-build-on-previous-context | 22 Oct 2026 |
| 12.2 | Anthropic's import/export help suggests asking Claude to write out its memories verbatim. | "Write out your memories of me verbatim, exactly as they appear in your memory." | https://support.claude.com/en/articles/12123587-import-and-export-your-memory-from-claude | 22 Oct 2026 |
| 12.3 | The official help page does not say whether a reply to that question is complete or accurate (negative finding, so no quote). | None: no official statement on this was found. | https://support.claude.com/en/articles/12123587-import-and-export-your-memory-from-claude | 22 Oct 2026 |

**Verdict.** NO official statement that asking Claude is a reliable check. Anthropic's listed memory page is the reliable place to check (row 12.1), and the chat prompt in 12.2 is a suggestion only.

**Settings path (Topic 12):** "Everything Claude remembers is listed under Topics." under Settings > Memory (new experience) or Settings > Capabilities > "View and edit your memory" (legacy, https://support.claude.com/en/articles/12123587-import-and-export-your-memory-from-claude).

---

## Claim count

177 numbered rows across Topics 1 to 12. 176 are sourced claims with a verbatim quote from a fetched page. 1 (row 12.3) is a negative finding with no quote. Quotes come from WebFetch extracts, so spot-check them before publishing. Rows 11.16 and 11.17 were added on 24 Oct 2026 and their quotes were taken from the raw page HTML (curl), not an extract.
