# ChatGPT facts file (ChatGPT only)

Status at 22 Oct 2026: all 12 topics filled from OpenAI help and release-note pages. The live pages returned HTTP 403, so every page here was read from an archived Wayback copy, as the coordinator authorised. Each row gives the snapshot date it came from.

Conventions:
- Quotes are copied from the fetched text. HTML entities are decoded (&gt; shown as >, &#x27; as '). Curly apostrophes (’) are kept as on the page.
- Source = official URL plus the snapshot date. Checked on = 22 Oct 2026, with the snapshot date.
- STALE? = the snapshot is older than 22 Sep 2026. Listed under gaps.
- Search summaries are not sources and are not used.
- Claims marked NOT FOUND had no official source in the pages I could read.

## Gaps and conflicts

1. **Live pages blocked.** Every direct WebFetch to help.openai.com and openai.com returned HTTP 403 (12 attempts, 0 successes). WebFetch also refuses web.archive.org, so curl downloaded the Wayback snapshots. Re-check the live pages when they are reachable.
2. **Empty or missing snapshots (not used).** Eight saved files are empty: agent, bizbnotes, consumerdata, creatingdocs, entnotes (retry returned 000), finding, gochatgpt, pricing. These pages also gave no usable text: Enterprise and Edu release notes (7 Oct), Business release notes (21 Oct), consumer data handling (14 Oct), ChatGPT agent (12 Oct), finding your chats (2 Oct).
3. **No snapshot at all.** Local work sync (20001548) and the locked-chats article (20001411). Locked-chat facts come from the 20 Oct release note instead.
4. **STALE? sources.** Legacy memory article (2 Jun 2026); Library article (27 Aug 2026); connected-apps account article (6 Sep 2026); Google data-controls FAQ (26 Aug 2026). Claims from these are marked STALE?.
5. **Conflicts (unresolved on the pages read):**
   - a. Temporary chat default personalisation. Release notes (snapshot 21 Oct): "By default, temporary chats are not personalized." Projects article (10 Oct): "Personalization is on by default for temporary chats." The temporary chat article (16 Oct) states no default.
   - b. Custom instructions timing. Custom instructions article (5 Oct): "Updates to custom instructions settings are applied immediately across all chats (including existing conversations)." Its FAQ: "updates to your instructions are reflected only in future conversations."
   - c. Default model on Free and Go. Release notes (7 Oct entry): "Plus, Pro, Business, and Enterprise use GPT-6 Sol; Free and Go use GPT-6 Luna." Go article (16 Oct): "Think uses GPT-5.6 Luna." Free article (12 Oct): "Free users have access to GPT-5.6 Luna." The Free article may be out of date.
   - d. Space and Library. Release notes: "Space replaces Library for accounts with access; your existing Projects remain separate." The Library article (27 Aug, STALE?) does not mention Space.
   - e. Temporary chat files. The Library article (27 Aug, STALE?) says files uploaded in Temporary Chat are not saved to Library. The temporary chat article (16 Oct) says eligible files "may also be saved to Library when you save the chat". These can be read together, but the 27 Aug article is stale.
   - f. Not used: a search summary said Enterprise release notes (16 Oct) retire admin-managed Google Drive sync. The Enterprise notes did not download, so this is unverified.
6. **Not found in official sources (NOT FOUND):**
   - How to delete or archive a chat. The retention article (20 Oct) points to "Deleting and archiving chats in ChatGPT", which was not in the snapshots.
   - Business, Enterprise and Edu prices. The pricing page did not download.
   - Whether the ChatGPT agent has been replaced by Work. The 9 Jul release note has the heading "Introducing ChatGPT Work" but no text on agent removal.
   - The default setting of "Improve the model for everyone" on individual plans. The article says "When enabled, OpenAI may use eligible content to improve the performance and safety of its models." It does not state the default.
   - Whether asking ChatGPT "what do you remember about me?" is a reliable check. The Memory article says only "You can also ask ChatGPT what it remembers about you." and that the summary "may omit details".
   - Settings path for Computer History (macOS). The release note gives no path.
   - Thinking levels per plan (for example, Plus getting Medium and High only).
   - Pro 100 price.
   - Creation of custom GPTs on personal accounts.
7. **Community forum only (not used).** A forum post and staff reply say a Work chat stays locked to Work and cannot switch in place. This is not an official source.

## 1. Chat vs Work

Settings path (desktop): "In the desktop app, select ChatGPT from the top-left menu, then select Work from the toggle at the top of the page." (Work article, archived 12 Oct 2026)
Settings path (mobile): "Select Chat or Work from the dropdown at the top of the screen." (Work article, archived 12 Oct 2026)

| # | Claim | Exact verbatim quote | Source URL | Checked on |
|---|---|---|---|---|
| 1.1 | Chat is for everyday help; Work is for longer, multi-step tasks | "Chat is for fast, conversational assistance and everyday questions. Work is an agent designed for longer, multi-step work and finished deliverables." | https://help.openai.com/en/articles/20001275-chatgpt-work-and-codex (archived 12 Oct 2026) | 22 Oct 2026 (archived copy of 12 Oct 2026) |
| 1.2 | What each mode is for | "Chat: Ask questions, search, brainstorm, or get quick conversational help. Work: Research a topic, analyze information, or create a document, spreadsheet, presentation, report, or Site." | https://help.openai.com/en/articles/20001275-chatgpt-work-and-codex (archived 12 Oct 2026) | 22 Oct 2026 (archived copy of 12 Oct 2026) |
| 1.3 | Work is for eligible paid plans on web and mobile | "Work is available on ChatGPT web and mobile for eligible paid plans." | https://help.openai.com/en/articles/20001275-chatgpt-work-and-codex (archived 12 Oct 2026) | 22 Oct 2026 (archived copy of 12 Oct 2026) |
| 1.4 | Work is not on Free or Go (rollout) | "Work is rolling out to paid plans except Free and Go." | https://help.openai.com/en/articles/6825453-chatgpt-release-notes (archived 21 Oct 2026; release note dated 9 Jul 2026) | 22 Oct 2026 (archived copy of 21 Oct 2026) |
| 1.5 | Work access order by plan (rollout) | "Pro, Pro Lite, Enterprise, and Edu users receive access first" | https://help.openai.com/en/articles/6825453-chatgpt-release-notes (archived 21 Oct 2026; release note dated 9 Jul 2026) | 22 Oct 2026 (archived copy of 21 Oct 2026) |
| 1.6 | Work on web and mobile runs in the cloud | "Work on web and mobile runs in the cloud." | https://help.openai.com/en/articles/20001275-chatgpt-work-and-codex (archived 12 Oct 2026) | 22 Oct 2026 (archived copy of 12 Oct 2026) |
| 1.7 | In the desktop app, Work can use local files with permission | "When allowed by your plan and workspace, Work in the desktop app can also use local files and desktop apps with your permission." | https://help.openai.com/en/articles/20001275-chatgpt-work-and-codex (archived 12 Oct 2026) | 22 Oct 2026 (archived copy of 12 Oct 2026) |
| 1.8 | Chat and Work chats sit together in the sidebar | "Chat and Work chats appear together in Recents, where you can sort, filter, and pin chats." | https://help.openai.com/en/articles/20001275-chatgpt-work-and-codex (archived 12 Oct 2026) | 22 Oct 2026 (archived copy of 12 Oct 2026) |
| 1.9 | Chat is always available | "Chat remains available in every configuration." | https://help.openai.com/en/articles/20001275-chatgpt-work-and-codex (archived 12 Oct 2026) | 22 Oct 2026 (archived copy of 12 Oct 2026) |
| 1.10 | Chat has its own starting model setting | "Chat uses a separate starting default, so changing the Work & Codex setting does not change the starting model for a regular Chat conversation." | https://help.openai.com/en/articles/20001275-chatgpt-work-and-codex (archived 12 Oct 2026) | 22 Oct 2026 (archived copy of 12 Oct 2026) |
| 1.11 | Work usage follows Codex | "Work follows the same usage structure as Codex." | https://help.openai.com/en/articles/20001275-chatgpt-work-and-codex (archived 12 Oct 2026) | 22 Oct 2026 (archived copy of 12 Oct 2026) |
| 1.12 | Work uses models separate from Chat (release note 22 Sep 2026) | "We're introducing GPT-6 Sol and GPT-6 Luna in ChatGPT Work and Codex. These models are separate from the models available in Chat." | https://help.openai.com/en/articles/6825453-chatgpt-release-notes (archived 21 Oct 2026) | 22 Oct 2026 (archived copy of 21 Oct 2026) |
| 1.13 | Work is not available in project-only memory projects (release note 14 Aug 2026) | "ChatGPT Work is not available in projects using project-only memory." | https://help.openai.com/en/articles/6825453-chatgpt-release-notes (archived 21 Oct 2026) | 22 Oct 2026 (archived copy of 21 Oct 2026) |
| 1.14 | On mobile, switch between Chat and Work from the top of the screen | "Select Chat or Work from the dropdown at the top of the screen." | https://help.openai.com/en/articles/20001275-chatgpt-work-and-codex (archived 12 Oct 2026) | 22 Oct 2026 (archived copy of 12 Oct 2026) |

## 2. Memory

Settings path: "Open Settings." "Select Personalization." "Select Memory." (memory article; the steps are on separate lines on the page)
Improved vs legacy: "Select Saved memories to use the legacy experience, or select Try improved memory to return to improved Memory." (same page)

| # | Claim | Exact verbatim quote | Source URL | Checked on |
|---|---|---|---|---|
| 2.1 | Memory can draw on several sources | "Depending on your plan and region, those sources can include:" followed by the list: past chats; saved memories; custom instructions; files in Library; "content from connected apps, such as Gmail" | https://help.openai.com/en/articles/8590148-memory-in-chatgpt (archived 19 Oct 2026) | 22 Oct 2026 (archived copy of 19 Oct 2026) |
| 2.2 | Memory does not keep every detail | "Memory does not retain every detail from every conversation." | https://help.openai.com/en/articles/8590148-memory-in-chatgpt (archived 19 Oct 2026) | 22 Oct 2026 (archived copy of 19 Oct 2026) |
| 2.3 | The memory summary is incomplete | "The memory summary is a high-level view of information that ChatGPT may use to personalize responses. It does not necessarily include every detail or source that Memory can reference." | https://help.openai.com/en/articles/8590148-memory-in-chatgpt (archived 19 Oct 2026) | 22 Oct 2026 (archived copy of 19 Oct 2026) |
| 2.4 | FAQ on the summary | "No. The summary is a high-level view and may omit details that are less relevant, unsuitable for the summary, or derived from sources that are not displayed individually." | https://help.openai.com/en/articles/8590148-memory-in-chatgpt (archived 19 Oct 2026) | 22 Oct 2026 (archived copy of 19 Oct 2026) |
| 2.5 | The article suggests asking ChatGPT what it remembers | "You can also ask ChatGPT what it remembers about you." | https://help.openai.com/en/articles/8590148-memory-in-chatgpt (archived 19 Oct 2026) | 22 Oct 2026 (archived copy of 19 Oct 2026) |
| 2.6 | Turning off Memory keeps past chats | "Turning off Memory does not delete your past chats." | https://help.openai.com/en/articles/8590148-memory-in-chatgpt (archived 19 Oct 2026) | 22 Oct 2026 (archived copy of 19 Oct 2026) |
| 2.7 | "Delete and turn off memory" removes remembered items but keeps chats | "Delete and turn off memory deletes the remembered information shown in the summary and turns Memory off. It does not delete past chats." | https://help.openai.com/en/articles/8590148-memory-in-chatgpt (archived 19 Oct 2026) | 22 Oct 2026 (archived copy of 19 Oct 2026) |
| 2.8 | Deleting a chat does not necessarily delete its memory | "Deleting a chat alone does not necessarily delete a separate saved memory created from that chat." | https://help.openai.com/en/articles/8590148-memory-in-chatgpt (archived 19 Oct 2026) | 22 Oct 2026 (archived copy of 19 Oct 2026) |
| 2.9 | Logs of deleted memories are kept for a time | "OpenAI may retain logs of deleted saved memories for up to 30 days for safety and debugging purposes." | https://help.openai.com/en/articles/8590148-memory-in-chatgpt (archived 19 Oct 2026) | 22 Oct 2026 (archived copy of 19 Oct 2026) |
| 2.10 | Turning off Reference chat history | "If you turn Reference chat history off, information remembered from past chats is scheduled for deletion from OpenAI systems within 30 days. The original chats remain in your history unless you delete them." | https://help.openai.com/en/articles/8590148-memory-in-chatgpt (archived 19 Oct 2026) | 22 Oct 2026 (archived copy of 19 Oct 2026) |
| 2.11 | Turning off Reference chat history keeps saved memories | "Turning off Reference chat history does not delete your saved memories." | https://help.openai.com/en/articles/8590148-memory-in-chatgpt (archived 19 Oct 2026) | 22 Oct 2026 (archived copy of 19 Oct 2026) |
| 2.12 | Legacy memories are an explicit list | "Legacy saved memories use a more explicit list of individual memory items." | https://help.openai.com/en/articles/8590148-memory-in-chatgpt (archived 19 Oct 2026) | 22 Oct 2026 (archived copy of 19 Oct 2026) |
| 2.13 | Switching between improved and legacy Memory | "Select Saved memories to use the legacy experience, or select Try improved memory to return to improved Memory." | https://help.openai.com/en/articles/8590148-memory-in-chatgpt (archived 19 Oct 2026) | 22 Oct 2026 (archived copy of 19 Oct 2026) |
| 2.14 | Temporary chats do not create or update memories | "Temporary chats do not create or update memories, even with personalization on." | https://help.openai.com/en/articles/8590148-memory-in-chatgpt (archived 19 Oct 2026) | 22 Oct 2026 (archived copy of 19 Oct 2026) |
| 2.15 | Memory and model training (personal accounts) | "For personal ChatGPT accounts, OpenAI may use chats and remembered information to improve models when Improve the model for everyone is on." | https://help.openai.com/en/articles/8590148-memory-in-chatgpt (archived 19 Oct 2026) | 22 Oct 2026 (archived copy of 19 Oct 2026) |
| 2.16 | Sources icon shows what a response used (release note 5 May 2026) | "Tap the Sources icon below the response to view relevant saved memories, past chats, and custom instructions." | https://help.openai.com/en/articles/6825453-chatgpt-release-notes (archived 21 Oct 2026; release note dated 5 May 2026) | 22 Oct 2026 (archived copy of 21 Oct 2026) |
| 2.17 | Memories are updated automatically (release note 4 Jun 2026) | "Memories are now updated automatically" | https://help.openai.com/en/articles/6825453-chatgpt-release-notes (archived 21 Oct 2026; release note dated 4 Jun 2026) | 22 Oct 2026 (archived copy of 21 Oct 2026) |
| 2.18 | Rollout of the update (release note 4 Jun 2026) | "This update is rolling out to Plus and Pro users in the US today." | https://help.openai.com/en/articles/6825453-chatgpt-release-notes (archived 21 Oct 2026; release note dated 4 Jun 2026) | 22 Oct 2026 (archived copy of 21 Oct 2026) |
| 2.19 | Plus and Pro get more memory capacity (release note 4 Jun 2026) | "...with twice as much memory capacity" (the rest of that sentence: "For Plus and Pro users, ChatGPT can also remember more useful context,") | https://help.openai.com/en/articles/6825453-chatgpt-release-notes (archived 21 Oct 2026; release note dated 4 Jun 2026) | 22 Oct 2026 (archived copy of 21 Oct 2026) |
| 2.20 | Go gets longer memory | "Longer memory for more personalized responses: Keep conversations flowing with a larger context window." | https://help.openai.com/en/articles/11989085-what-is-chatgpt-go (archived 16 Oct 2026) | 22 Oct 2026 (archived copy of 16 Oct 2026) |
| 2.21 | You can tell ChatGPT that remembered information is wrong | "You can tell ChatGPT that remembered information is incorrect or outdated." | https://help.openai.com/en/articles/8590148-memory-in-chatgpt (archived 19 Oct 2026) | 22 Oct 2026 (archived copy of 19 Oct 2026) |

## 3. Chat history and retention

Settings path (deleting or archiving a chat): NOT FOUND in official sources. The retention article points to "Deleting and archiving chats in ChatGPT", which was not in the snapshots.
Settings path (locking a chat): "To lock a chat, open a chat's more options menu (•••) and select Lock chat." (release note, 20 Oct 2026)

| # | Claim | Exact verbatim quote | Source URL | Checked on |
|---|---|---|---|---|
| 3.1 | Chats stay saved until deleted | "Regular and archived chats remain saved to your account until you delete them or an applicable workspace retention policy removes them." | https://help.openai.com/en/articles/8983778-chat-and-file-retention-in-chatgpt (archived 20 Oct 2026) | 22 Oct 2026 (archived copy of 20 Oct 2026) |
| 3.2 | Archiving does not change retention | "Archiving a chat does not change its retention period." | https://help.openai.com/en/articles/8983778-chat-and-file-retention-in-chatgpt (archived 20 Oct 2026) | 22 Oct 2026 (archived copy of 20 Oct 2026) |
| 3.3 | Deleted chat leaves the account view at once | "ChatGPT removes it from your account view immediately." | https://help.openai.com/en/articles/8983778-chat-and-file-retention-in-chatgpt (archived 20 Oct 2026) | 22 Oct 2026 (archived copy of 20 Oct 2026) |
| 3.4 | Permanent deletion is scheduled | "OpenAI schedules it for permanent deletion from its systems within 30 days, unless the chat was already de-identified and disassociated from your account or OpenAI must retain it longer for security or legal obligations." | https://help.openai.com/en/articles/8983778-chat-and-file-retention-in-chatgpt (archived 20 Oct 2026) | 22 Oct 2026 (archived copy of 20 Oct 2026) |
| 3.5 | Deleted chats cannot be restored | "You cannot restore a deleted chat in ChatGPT or through OpenAI Support." | https://help.openai.com/en/articles/8983778-chat-and-file-retention-in-chatgpt (archived 20 Oct 2026) | 22 Oct 2026 (archived copy of 20 Oct 2026) |
| 3.6 | Temporary chats stay out of history unless saved | "Temporary chats don’t appear in your chat history unless you save them." | https://help.openai.com/en/articles/8983778-chat-and-file-retention-in-chatgpt (archived 20 Oct 2026) | 22 Oct 2026 (archived copy of 20 Oct 2026) |
| 3.7 | Locked chats are hidden from history and search (release note 20 Oct 2026) | "Locked chats let you keep selected conversations in your account while hiding them from regular chat history, pinned chats, and search." | https://help.openai.com/en/articles/6825453-chatgpt-release-notes (archived 21 Oct 2026; release note dated 20 Oct 2026) | 22 Oct 2026 (archived copy of 21 Oct 2026) |
| 3.8 | Locked chats open with a PIN or device authentication | "Open them with your 4-digit account PIN or supported device authentication." | https://help.openai.com/en/articles/6825453-chatgpt-release-notes (archived 21 Oct 2026; release note dated 20 Oct 2026) | 22 Oct 2026 (archived copy of 21 Oct 2026) |
| 3.9 | Locking does not change retention or training | "Your retention and model-improvement settings stay unchanged." | https://help.openai.com/en/articles/6825453-chatgpt-release-notes (archived 21 Oct 2026; release note dated 20 Oct 2026) | 22 Oct 2026 (archived copy of 21 Oct 2026) |
| 3.10 | Locked chats rollout | "Locked chats are rolling out gradually to Free, Go, Plus, and Pro users on the web, in the iOS and Android apps, and in the new ChatGPT desktop app for macOS and Windows." | https://help.openai.com/en/articles/6825453-chatgpt-release-notes (archived 21 Oct 2026; release note dated 20 Oct 2026) | 22 Oct 2026 (archived copy of 21 Oct 2026) |
| 3.11 | Deleting a chat does not delete its Library file | "Deleting a chat does not delete a file that remains saved in Library." | https://help.openai.com/en/articles/8983778-chat-and-file-retention-in-chatgpt (archived 20 Oct 2026) | 22 Oct 2026 (archived copy of 20 Oct 2026) |
| 3.12 | Temporary chat copy kept for safety | "OpenAI may keep a copy for up to 30 days for safety purposes." | https://help.openai.com/en/articles/8983778-chat-and-file-retention-in-chatgpt (archived 20 Oct 2026) | 22 Oct 2026 (archived copy of 20 Oct 2026) |

## 4. Projects

Settings path: "Open the project." "Select the more options menu (•••), then select Project settings." "Under Memory, select Default memory or Project-only memory." "Select Save." (projects article, archived 10 Oct 2026)

| # | Claim | Exact verbatim quote | Source URL | Checked on |
|---|---|---|---|---|
| 4.1 | Project instructions override global custom instructions | "Project instructions apply only within that project and override your global custom instructions." | https://help.openai.com/en/articles/10169521-projects-in-chatgpt (archived 10 Oct 2026) | 22 Oct 2026 (archived copy of 10 Oct 2026) |
| 4.2 | Each project can use default or project-only memory | "Projects can use either default memory or project-only memory." | https://help.openai.com/en/articles/10169521-projects-in-chatgpt (archived 10 Oct 2026) | 22 Oct 2026 (archived copy of 10 Oct 2026) |
| 4.3 | Project-only memory: chats reference the same project only | "Chats can reference other conversations within the same project." | https://help.openai.com/en/articles/10169521-projects-in-chatgpt (archived 10 Oct 2026) | 22 Oct 2026 (archived copy of 10 Oct 2026) |
| 4.4 | Project-only memory: no reference outside the project | "Chats cannot reference conversations outside the project" | https://help.openai.com/en/articles/10169521-projects-in-chatgpt (archived 10 Oct 2026) | 22 Oct 2026 (archived copy of 10 Oct 2026) |
| 4.5 | Saved memories are not used in project chats | "Your previously saved memories are not referenced in project chats." | https://help.openai.com/en/articles/10169521-projects-in-chatgpt (archived 10 Oct 2026) | 22 Oct 2026 (archived copy of 10 Oct 2026) |
| 4.6 | Shared projects always use project-only memory | "Shared projects automatically use project-only memory" (the sentence goes on to say they "cannot access an individual member’s memories or context from outside the project") | https://help.openai.com/en/articles/10169521-projects-in-chatgpt (archived 10 Oct 2026) | 22 Oct 2026 (archived copy of 10 Oct 2026) |
| 4.7 | Project sharing availability | "Project sharing is available on ChatGPT Free, Go, Plus, Pro, Business, Enterprise, and Edu across the web and mobile apps." | https://help.openai.com/en/articles/10169521-projects-in-chatgpt (archived 10 Oct 2026) | 22 Oct 2026 (archived copy of 10 Oct 2026) |
| 4.8 | Collaboration limits, Pro | "Pro users: up to 40 files and 100 collaborators." | https://help.openai.com/en/articles/10169521-projects-in-chatgpt (archived 10 Oct 2026) | 22 Oct 2026 (archived copy of 10 Oct 2026) |
| 4.9 | Collaboration limits, Plus and Go | "Plus and Go users: up to 25 files and 10 collaborators." | https://help.openai.com/en/articles/10169521-projects-in-chatgpt (archived 10 Oct 2026) | 22 Oct 2026 (archived copy of 10 Oct 2026) |
| 4.10 | Collaboration limits, Free | "Free users: up to 5 files and 5 collaborators." | https://help.openai.com/en/articles/10169521-projects-in-chatgpt (archived 10 Oct 2026) | 22 Oct 2026 (archived copy of 10 Oct 2026) |
| 4.11 | Deleting a project removes its chats and project-only files | "Deleting a project permanently removes its chats and instructions, along with files stored only in the project." | https://help.openai.com/en/articles/10169521-projects-in-chatgpt (archived 10 Oct 2026) | 22 Oct 2026 (archived copy of 10 Oct 2026) |
| 4.12 | Files saved in Library survive project deletion | "Files saved separately in Library are not deleted." | https://help.openai.com/en/articles/10169521-projects-in-chatgpt (archived 10 Oct 2026) | 22 Oct 2026 (archived copy of 10 Oct 2026) |
| 4.13 | Project data and training (personal accounts) | "For personal ChatGPT accounts, shared project data may be used to improve models only when the project owner and every contributor have Improve the model for everyone turned on." | https://help.openai.com/en/articles/10169521-projects-in-chatgpt (archived 10 Oct 2026) | 22 Oct 2026 (archived copy of 10 Oct 2026) |
| 4.14 | No single switch for all projects (the FAQ asks) | "Is there a global setting to make all project memory project-only?" (FAQ question; the article answers it in the FAQ) | https://help.openai.com/en/articles/10169521-projects-in-chatgpt (archived 10 Oct 2026) | 22 Oct 2026 (archived copy of 10 Oct 2026) |
| 4.15 | Temporary chats cannot be added to a project | "You cannot add a chat to a project while it is temporary." | https://help.openai.com/en/articles/10169521-projects-in-chatgpt (archived 10 Oct 2026) | 22 Oct 2026 (archived copy of 10 Oct 2026) |

## 5. Uploaded files and Library

Settings path: "To find saved files, open the Library from the left-hand sidebar." (Library article, STALE? archived 27 Aug 2026)

| # | Claim | Exact verbatim quote | Source URL | Checked on |
|---|---|---|---|---|
| 5.1 | Uploaded and created files are saved to Library (STALE?) | "The files you upload to and create in ChatGPT are saved to your Library, so you can find and reuse them later." | https://help.openai.com/en/articles/20001052-file-storage-and-library-in-chatgpt (archived 27 Aug 2026) STALE? | 22 Oct 2026 (archived copy of 27 Aug 2026) STALE? |
| 5.2 | Library files can be saved apart from the chat that used them | "When Library is available, files uploaded to or created in ChatGPT can be saved separately from the conversation that used them." | https://help.openai.com/en/articles/8983778-chat-and-file-retention-in-chatgpt (archived 20 Oct 2026) | 22 Oct 2026 (archived copy of 20 Oct 2026) |
| 5.3 | Library files stay until deleted (STALE?) | "Files are saved to your account until you delete them manually." | https://help.openai.com/en/articles/20001052-file-storage-and-library-in-chatgpt (archived 27 Aug 2026) STALE? | 22 Oct 2026 (archived copy of 27 Aug 2026) STALE? |
| 5.4 | Deleting a chat keeps its Library file | "Deleting a chat does not delete a file that remains saved in Library. Delete the file from Library when you also want to remove the saved Library copy." | https://help.openai.com/en/articles/8983778-chat-and-file-retention-in-chatgpt (archived 20 Oct 2026) | 22 Oct 2026 (archived copy of 20 Oct 2026) |
| 5.5 | Deleted files and projects are scheduled for deletion | "After the GPT, project, or file is deleted, OpenAI schedules the associated data for permanent deletion within 30 days, unless security or legal obligations require longer retention." | https://help.openai.com/en/articles/8983778-chat-and-file-retention-in-chatgpt (archived 20 Oct 2026) | 22 Oct 2026 (archived copy of 20 Oct 2026) |
| 5.6 | Files for a custom GPT are kept until the GPT is deleted | "Files uploaded as knowledge to a custom GPT are retained until the GPT is deleted." | https://help.openai.com/en/articles/8983778-chat-and-file-retention-in-chatgpt (archived 20 Oct 2026) | 22 Oct 2026 (archived copy of 20 Oct 2026) |
| 5.7 | Project files are kept until the project or file is deleted | "Files added to a project, including a shared project, are retained until the project or file is deleted or an applicable workspace retention policy removes them." | https://help.openai.com/en/articles/8983778-chat-and-file-retention-in-chatgpt (archived 20 Oct 2026) | 22 Oct 2026 (archived copy of 20 Oct 2026) |
| 5.8 | Files in Temporary Chat are not saved to Library (STALE?) | "No, files uploaded while using Temporary Chat are not saved to your account or Library." | https://help.openai.com/en/articles/20001052-file-storage-and-library-in-chatgpt (archived 27 Aug 2026) STALE? | 22 Oct 2026 (archived copy of 27 Aug 2026) STALE? |
| 5.9 | Files from a temporary chat may be saved when the chat is saved | "If your temporary chat includes uploaded files, eligible files may also be saved to Library when you save the chat, subject to availability and storage limits." | https://help.openai.com/en/articles/8914046-temporary-chat-in-chatgpt (archived 16 Oct 2026) | 22 Oct 2026 (archived copy of 16 Oct 2026) |
| 5.10 | Free Library storage (STALE?) | "Free users have 500 MB of Library storage." | https://help.openai.com/en/articles/20001052-file-storage-and-library-in-chatgpt (archived 27 Aug 2026) STALE? | 22 Oct 2026 (archived copy of 27 Aug 2026) STALE? |
| 5.11 | Go Library storage (STALE?) | "Go users have 4 GB" | https://help.openai.com/en/articles/20001052-file-storage-and-library-in-chatgpt (archived 27 Aug 2026) STALE? | 22 Oct 2026 (archived copy of 27 Aug 2026) STALE? |
| 5.12 | Plus and Business Library storage (STALE?) | "Plus and Business users have 20 GB" | https://help.openai.com/en/articles/20001052-file-storage-and-library-in-chatgpt (archived 27 Aug 2026) STALE? | 22 Oct 2026 (archived copy of 27 Aug 2026) STALE? |
| 5.13 | Pro Library storage (STALE?) | "Pro users have 100 GB." | https://help.openai.com/en/articles/20001052-file-storage-and-library-in-chatgpt (archived 27 Aug 2026) STALE? | 22 Oct 2026 (archived copy of 27 Aug 2026) STALE? |
| 5.14 | Space replaces Library for accounts with access (conflict, see gap 5d) | "Space replaces Library for accounts with access; your existing Projects remain separate." | https://help.openai.com/en/articles/6825453-chatgpt-release-notes (archived 21 Oct 2026) | 22 Oct 2026 (archived copy of 21 Oct 2026) |
| 5.15 | Box, Dropbox and SharePoint join Library (release note 10 Sep 2026) | "Box, Dropbox, and SharePoint now join Google Drive in ChatGPT Library." | https://help.openai.com/en/articles/6825453-chatgpt-release-notes (archived 21 Oct 2026; release note dated 10 Sep 2026) | 22 Oct 2026 (archived copy of 21 Oct 2026) |

## 6. Connectors and apps

Settings path: "Open Settings > Plugins, and select the app or the plugin that includes it." (connected-apps article, archived 12 Oct 2026)
Older path (STALE?): "Open Settings, then select Apps or Plugins, depending on which option is available." then "Select Disconnect." (account article, archived 6 Sep 2026)

| # | Claim | Exact verbatim quote | Source URL | Checked on |
|---|---|---|---|---|
| 6.1 | App permissions are separate from general settings | "App permissions are separate from settings that apply generally to all conversations in ChatGPT, such as Memory, personalization, data retention, and your choices about whether content may be used" | https://help.openai.com/en/articles/11487775-connected-apps-in-chatgpt (archived 12 Oct 2026) | 22 Oct 2026 (archived copy of 12 Oct 2026) |
| 6.2 | Removing an app's access | "To remove an app's access, disconnect it or ask your workspace administrator to disable it." | https://help.openai.com/en/articles/11487775-connected-apps-in-chatgpt (archived 12 Oct 2026) | 22 Oct 2026 (archived copy of 12 Oct 2026) |
| 6.3 | Admins can disable an app | "Admins and owners can disable an app from Workspace settings." | https://help.openai.com/en/articles/11487775-connected-apps-in-chatgpt (archived 12 Oct 2026) | 22 Oct 2026 (archived copy of 12 Oct 2026) |
| 6.4 | Memory can be used when an app responds | "If you have Memory turned on, when an app is responding to your requests, it may also leverage relevant information from memories to provide more customized and useful interactions for you." | https://help.openai.com/en/articles/11487775-connected-apps-in-chatgpt (archived 12 Oct 2026) | 22 Oct 2026 (archived copy of 12 Oct 2026) |
| 6.5 | Disconnecting stops future access, keeps past chats | "Disconnecting an app prevents future access to that app. It does not delete past conversations that already used app content." | https://help.openai.com/en/articles/8590148-memory-in-chatgpt (archived 19 Oct 2026) | 22 Oct 2026 (archived copy of 19 Oct 2026) |
| 6.6 | Disconnect an account (STALE?) | "Disconnecting stops future access through that account." | https://help.openai.com/en/articles/20001494-connecting-and-managing-app-accounts-in-chatgpt (archived 6 Sep 2026) STALE? | 22 Oct 2026 (archived copy of 6 Sep 2026) STALE? |
| 6.7 | Disconnecting keeps existing data (STALE?) | "Disconnecting an app does not automatically delete existing or archived conversations" (the article continues with saved files, Memory summary and saved memories) | https://help.openai.com/en/articles/20001494-connecting-and-managing-app-accounts-in-chatgpt (archived 6 Sep 2026) STALE? | 22 Oct 2026 (archived copy of 6 Sep 2026) STALE? |
| 6.8 | Google Drive disconnect (STALE?) | "If you disconnect Google Drive, ChatGPT will no longer be able to access files through that connection. Any indexed copy of the connected content will be deleted within 30 days. Your original files remain in Google Drive." | https://help.openai.com/en/articles/10408842-google-app-for-chatgpt-data-controls-faq (archived 26 Aug 2026) STALE? | 22 Oct 2026 (archived copy of 26 Aug 2026) STALE? |
| 6.9 | Synced Google content can be used for Memory (STALE?) | "If you have Memory enabled, this synced content may be used to personalize your ChatGPT" | https://help.openai.com/en/articles/10408842-google-app-for-chatgpt-data-controls-faq (archived 26 Aug 2026) STALE? | 22 Oct 2026 (archived copy of 26 Aug 2026) STALE? |
| 6.10 | Drive files in Library stay linked to the source (STALE?) | "Google Drive files shown in Library remain connected to their original source in Drive, so you can return to the source file when needed." | https://help.openai.com/en/articles/20001052-file-storage-and-library-in-chatgpt (archived 27 Aug 2026) STALE? | 22 Oct 2026 (archived copy of 27 Aug 2026) STALE? |
| 6.11 | Connected Drive files cannot be deleted from ChatGPT (STALE?) | "Connected Google Drive files and folders in Library can’t be deleted from ChatGPT." | https://help.openai.com/en/articles/20001052-file-storage-and-library-in-chatgpt (archived 27 Aug 2026) STALE? | 22 Oct 2026 (archived copy of 27 Aug 2026) STALE? |
| 6.12 | Disconnecting an app to remove what Memory holds | "Disconnect an app that contains the information when you no longer want ChatGPT to access it." | https://help.openai.com/en/articles/8590148-memory-in-chatgpt (archived 19 Oct 2026) | 22 Oct 2026 (archived copy of 19 Oct 2026) |

Not used: the search summary said admin-managed Google Drive sync connectors are retired (Enterprise notes, 16 Oct). The Enterprise notes did not download. See gap 5f.

## 7. Custom instructions and personalisation

Settings path (web): "In your Settings, select Personalization and click on Custom Instructions." Then "Please make sure that Enable customization is toggled ON." Turning off: "Toggle Enable customization OFF." (custom instructions article, archived 5 Oct 2026)
Settings path (mobile): "In your Settings, select Customize ChatGPT." (same article)

| # | Claim | Exact verbatim quote | Source URL | Checked on |
|---|---|---|---|---|
| 7.1 | Custom instructions are on all plans | "Custom instructions are available on all plans on Web, Desktop, iOS, and Android." | https://help.openai.com/en/articles/8096356-chatgpt-custom-instructions (archived 5 Oct 2026) | 22 Oct 2026 (archived copy of 5 Oct 2026) |
| 7.2 | Character limit, Free and Go | "Free and Go users can save up to 1,500 characters in custom instructions." | https://help.openai.com/en/articles/8096356-chatgpt-custom-instructions (archived 5 Oct 2026) | 22 Oct 2026 (archived copy of 5 Oct 2026) |
| 7.3 | Character limit, paid plans | "Plus, Pro, Enterprise, Business, and Education users can save up to 5,000 characters." | https://help.openai.com/en/articles/8096356-chatgpt-custom-instructions (archived 5 Oct 2026) | 22 Oct 2026 (archived copy of 5 Oct 2026) |
| 7.4 | Limit raised (release note 15 Jul 2026) | "Plus, Pro, Enterprise, Business, and Education users can now save up to 5,000 characters, up from 1,500" | https://help.openai.com/en/articles/6825453-chatgpt-release-notes (archived 21 Oct 2026; release note dated 15 Jul 2026) | 22 Oct 2026 (archived copy of 21 Oct 2026) |
| 7.5 | Changes apply to existing chats (article) — CONFLICT with 7.6 | "Updates to custom instructions settings are applied immediately across all chats (including existing conversations)." | https://help.openai.com/en/articles/8096356-chatgpt-custom-instructions (archived 5 Oct 2026) | 22 Oct 2026 (archived copy of 5 Oct 2026) |
| 7.6 | Changes apply only to future conversations (FAQ) — CONFLICT with 7.5 | "updates to your instructions are reflected only in future conversations." | https://help.openai.com/en/articles/8096356-chatgpt-custom-instructions (archived 5 Oct 2026) | 22 Oct 2026 (archived copy of 5 Oct 2026) |
| 7.7 | Custom instructions and model training | "Information from your use of custom instructions will also be used to improve model performance." | https://help.openai.com/en/articles/8096356-chatgpt-custom-instructions (archived 5 Oct 2026) | 22 Oct 2026 (archived copy of 5 Oct 2026) |
| 7.8 | Custom instructions versus Memory | "Custom instructions are direct guidance that you provide about what ChatGPT should know and how it should respond." | https://help.openai.com/en/articles/8590148-memory-in-chatgpt (archived 19 Oct 2026) | 22 Oct 2026 (archived copy of 19 Oct 2026) |
| 7.9 | Project instructions take priority inside a project | "Project instructions apply only within that project and override your global custom instructions." | https://help.openai.com/en/articles/10169521-projects-in-chatgpt (archived 10 Oct 2026) | 22 Oct 2026 (archived copy of 10 Oct 2026) |
| 7.10 | Unpersonalised temporary chats ignore custom instructions | "Unpersonalized: Does not use memory, custom instructions, or plugins." | https://help.openai.com/en/articles/8914046-temporary-chat-in-chatgpt (archived 16 Oct 2026) | 22 Oct 2026 (archived copy of 16 Oct 2026) |

## 8. Desktop app and local folders

Settings path (open a local folder): "In Work or Codex, you can also open a local folder." (Work article, archived 12 Oct 2026)
Settings path (Lockdown Mode, release note 4 Jun 2026): "Personal users can turn it on from Settings > Security."
Settings path (Computer History): NOT FOUND in official sources.

| # | Claim | Exact verbatim quote | Source URL | Checked on |
|---|---|---|---|---|
| 8.1 | Work can use local files on desktop | "Yes, in the desktop app. Open a local folder or project and grant access only to the files the task needs." | https://help.openai.com/en/articles/20001275-chatgpt-work-and-codex (archived 12 Oct 2026) | 22 Oct 2026 (archived copy of 12 Oct 2026) |
| 8.2 | Work on web and mobile cannot reach your files | "Work on web and mobile cannot directly access files on your computer." | https://help.openai.com/en/articles/20001275-chatgpt-work-and-codex (archived 12 Oct 2026) | 22 Oct 2026 (archived copy of 12 Oct 2026) |
| 8.3 | Local work still uses cloud storage for messages | "Messages and task context may be stored in the cloud, even when work runs locally." | https://help.openai.com/en/articles/20001275-chatgpt-work-and-codex (archived 12 Oct 2026) | 22 Oct 2026 (archived copy of 12 Oct 2026) |
| 8.4 | Local chats run on the computer | "Local chats run on your computer." | https://help.openai.com/en/articles/20001275-chatgpt-work-and-codex (archived 12 Oct 2026) | 22 Oct 2026 (archived copy of 12 Oct 2026) |
| 8.5 | Work Local for workspace members | "Work Local: When enabled without Work Cloud, members can work locally in the desktop app but cannot start cloud tasks." | https://help.openai.com/en/articles/20001275-chatgpt-work-and-codex (archived 12 Oct 2026) | 22 Oct 2026 (archived copy of 12 Oct 2026) |
| 8.6 | Codex is a separate view with local folders | "Codex can work with local folders, repositories, terminals, and developer tools." | https://help.openai.com/en/articles/20001275-chatgpt-work-and-codex (archived 12 Oct 2026) | 22 Oct 2026 (archived copy of 12 Oct 2026) |
| 8.7 | Desktop app layout | "The new ChatGPT desktop app includes Chat and Work under ChatGPT" | https://help.openai.com/en/articles/20001276-moving-to-the-new-chatgpt-desktop-app (archived 15 Oct 2026) | 22 Oct 2026 (archived copy of 15 Oct 2026) |
| 8.8 | Old desktop app still available | "ChatGPT Classic: The previous ChatGPT desktop app. You can continue using it; no migration is required at launch." | https://help.openai.com/en/articles/20001276-moving-to-the-new-chatgpt-desktop-app (archived 15 Oct 2026) | 22 Oct 2026 (archived copy of 15 Oct 2026) |
| 8.9 | Apple Messages plugin (release note 20 Aug 2026) | "On Apple silicon Macs, the Apple Messages plugin in the ChatGPT desktop app can read and search iMessage, SMS, and RCS conversations and prepare or send messages through Messages." | https://help.openai.com/en/articles/6825453-chatgpt-release-notes (archived 21 Oct 2026; release note dated 20 Aug 2026) | 22 Oct 2026 (archived copy of 21 Oct 2026) |
| 8.10 | Apple Messages asks for approval | "By default, ChatGPT asks the user to approve the message and recipients before sending." | https://help.openai.com/en/articles/6825453-chatgpt-release-notes (archived 21 Oct 2026; release note dated 20 Aug 2026) | 22 Oct 2026 (archived copy of 21 Oct 2026) |
| 8.11 | Computer History (macOS) is off by default | "It is off by default and requires Memories." | https://help.openai.com/en/articles/6825453-chatgpt-release-notes (archived 21 Oct 2026) | 22 Oct 2026 (archived copy of 21 Oct 2026) |
| 8.12 | Computer History records events, not screenshots | "It records interaction events—not screenshots, screen recordings, microphone input, or system audio—and private browsing is not included." | https://help.openai.com/en/articles/6825453-chatgpt-release-notes (archived 21 Oct 2026) | 22 Oct 2026 (archived copy of 21 Oct 2026) |
| 8.13 | Lockdown Mode for personal users | "Personal users can turn it on from Settings > Security." | https://help.openai.com/en/articles/6825453-chatgpt-release-notes (archived 21 Oct 2026; release note dated 4 Jun 2026) | 22 Oct 2026 (archived copy of 21 Oct 2026) |
| 8.14 | Voice and computer context need OS permissions | "Computer context may also require Screen & Audio Recording and Accessibility permissions." | https://help.openai.com/en/articles/20001275-chatgpt-work-and-codex (archived 12 Oct 2026) | 22 Oct 2026 (archived copy of 12 Oct 2026) |

## 9. Plans (only differences that touch topics 1 to 8 and 10 to 12)

Plans and prices: Business and Enterprise prices NOT FOUND in official sources (pricing page did not download).

| # | Claim | Exact verbatim quote | Source URL | Checked on |
|---|---|---|---|---|
| 9.1 | Go is a low-cost plan | "ChatGPT Go is a low-cost subscription plan" | https://help.openai.com/en/articles/11989085-what-is-chatgpt-go (archived 16 Oct 2026) | 22 Oct 2026 (archived copy of 16 Oct 2026) |
| 9.2 | Free and Go both have unlimited everyday text chats | "Free and Go users both have unlimited everyday text chats." | https://help.openai.com/en/articles/11989085-what-is-chatgpt-go (archived 16 Oct 2026) | 22 Oct 2026 (archived copy of 16 Oct 2026) |
| 9.3 | Go has higher limits for some features | "ChatGPT Go includes higher limits for eligible features such as image generation, file uploads, and data analysis." | https://help.openai.com/en/articles/11989085-what-is-chatgpt-go (archived 16 Oct 2026) | 22 Oct 2026 (archived copy of 16 Oct 2026) |
| 9.4 | Ads may come to Go later | "We may start testing ads in ChatGPT Go in the future." | https://help.openai.com/en/articles/11989085-what-is-chatgpt-go (archived 16 Oct 2026) | 22 Oct 2026 (archived copy of 16 Oct 2026) |
| 9.5 | Go default model (conflict, see gap 5c) | "Think uses GPT-5.6 Luna. ChatGPT Go does not include GPT-5.6 Sol." | https://help.openai.com/en/articles/11989085-what-is-chatgpt-go (archived 16 Oct 2026) | 22 Oct 2026 (archived copy of 16 Oct 2026) |
| 9.6 | Free default model (conflict, see gap 5c) | "Free users have access to GPT-5.6 Luna." | https://help.openai.com/en/articles/9275245-chatgpt-free-tier-faq (archived 12 Oct 2026) | 22 Oct 2026 (archived copy of 12 Oct 2026) |
| 9.7 | Model names by plan (release note 7 Oct 2026) — CONFLICT with 9.5 and 9.6 | "Plus, Pro, Business, and Enterprise use GPT-6 Sol; Free and Go use GPT-6 Luna." | https://help.openai.com/en/articles/6825453-chatgpt-release-notes (archived 21 Oct 2026; release note dated 7 Oct 2026) | 22 Oct 2026 (archived copy of 21 Oct 2026) |
| 9.8 | Ads may appear on Free | "Ads may appear in the Free tier in certain countries." | https://help.openai.com/en/articles/9275245-chatgpt-free-tier-faq (archived 12 Oct 2026) | 22 Oct 2026 (archived copy of 12 Oct 2026) |
| 9.9 | Pro 500 plan | "ChatGPT Pro now offers Pro 500, a new $500/month plan that includes GPT-6 Astra Ultrafast and GPT-6.1 Sol Ultrafast." | https://help.openai.com/en/articles/9793128-about-chatgpt-pro-tiers (archived 11 Oct 2026) | 22 Oct 2026 (archived copy of 11 Oct 2026) |
| 9.10 | Pro 200 is available again | "Pro 200 is also available for new subscriptions again." | https://help.openai.com/en/articles/9793128-about-chatgpt-pro-tiers (archived 11 Oct 2026) | 22 Oct 2026 (archived copy of 11 Oct 2026) |
| 9.11 | Pro includes memory and file uploads | "ChatGPT Pro includes Pro models, Codex, deep research, image creation, memory and file uploads." | https://help.openai.com/en/articles/9793128-about-chatgpt-pro-tiers (archived 11 Oct 2026) | 22 Oct 2026 (archived copy of 11 Oct 2026) |
| 9.12 | Work event triggers are not on Free or Go | "Event-triggered tasks are not available on Free or Go, or in FedRAMP workspaces." | https://help.openai.com/en/articles/20001275-chatgpt-work-and-codex (archived 12 Oct 2026) | 22 Oct 2026 (archived copy of 12 Oct 2026) |
| 9.13 | Scheduled tasks on Free | "Free users can create up to three active scheduled tasks." | https://help.openai.com/en/articles/6825453-chatgpt-release-notes (archived 21 Oct 2026; release note dated 25 Aug 2026) | 22 Oct 2026 (archived copy of 21 Oct 2026) |
| 9.14 | Webhook-triggered tasks not on Free or Go | "Free and Go users cannot create webhook-triggered tasks." | https://help.openai.com/en/articles/6825453-chatgpt-release-notes (archived 21 Oct 2026; release note dated 25 Aug 2026) | 22 Oct 2026 (archived copy of 21 Oct 2026) |
| 9.15 | Training on individual plans | "When you use our services for individuals (Free, Plus, Pro), we may use your content to train our models." | https://help.openai.com/en/articles/5722486-how-your-data-is-used-to-improve-model-performance (archived 19 Oct 2026) | 22 Oct 2026 (archived copy of 19 Oct 2026) |
| 9.16 | Business and Enterprise are not used for training by default | "By default, we don’t use inputs or outputs from ChatGPT Business, ChatGPT Enterprise, ChatGPT Edu, or our API to improve our models." | https://help.openai.com/en/articles/5722486-how-your-data-is-used-to-improve-model-performance (archived 19 Oct 2026) | 22 Oct 2026 (archived copy of 19 Oct 2026) |
| 9.17 | Plus and Pro memory capacity (release note 4 Jun 2026) | "twice as much memory capacity" (see row 2.19) | https://help.openai.com/en/articles/6825453-chatgpt-release-notes (archived 21 Oct 2026; release note dated 4 Jun 2026) | 22 Oct 2026 (archived copy of 21 Oct 2026) |
| 9.18 | Go memory (see row 2.20) | "Longer memory for more personalized responses: Keep conversations flowing with a larger context window." | https://help.openai.com/en/articles/11989085-what-is-chatgpt-go (archived 16 Oct 2026) | 22 Oct 2026 (archived copy of 16 Oct 2026) |
| 9.19 | Project file and collaborator limits by plan | See rows 4.8 to 4.10 | https://help.openai.com/en/articles/10169521-projects-in-chatgpt (archived 10 Oct 2026) | 22 Oct 2026 (archived copy of 10 Oct 2026) |
| 9.20 | Work is not on Free or Go (rollout) | See row 1.4 | https://help.openai.com/en/articles/6825453-chatgpt-release-notes (archived 21 Oct 2026) | 22 Oct 2026 (archived copy of 21 Oct 2026) |

## 10. Temporary Chat

Settings path: "Open a new chat." "Select Temporary." "Choose Personalized or Unpersonalized before you send your first message." (temporary chat article, archived 16 Oct 2026)

| # | Claim | Exact verbatim quote | Source URL | Checked on |
|---|---|---|---|---|
| 10.1 | Temporary chats stay out of history and are not used for training | "A temporary chat stays out of your chat history and is not used to improve OpenAI models while it remains temporary. It can use existing memories, custom instructions, and plugins to personalize responses." | https://help.openai.com/en/articles/8914046-temporary-chat-in-chatgpt (archived 16 Oct 2026) | 22 Oct 2026 (archived copy of 16 Oct 2026) |
| 10.2 | Choose the mode before the first message | "Choose Personalized or Unpersonalized before you send your first message." | https://help.openai.com/en/articles/8914046-temporary-chat-in-chatgpt (archived 16 Oct 2026) | 22 Oct 2026 (archived copy of 16 Oct 2026) |
| 10.3 | Unpersonalised mode | "Unpersonalized: Does not use memory, custom instructions, or plugins." | https://help.openai.com/en/articles/8914046-temporary-chat-in-chatgpt (archived 16 Oct 2026) | 22 Oct 2026 (archived copy of 16 Oct 2026) |
| 10.4 | Personalised mode | "Personalized: Can use your existing memories, custom instructions, and plugins." | https://help.openai.com/en/articles/8914046-temporary-chat-in-chatgpt (archived 16 Oct 2026) | 22 Oct 2026 (archived copy of 16 Oct 2026) |
| 10.5 | No memory is created, and the mode cannot change mid-chat | "Neither option creates or updates memories while the chat remains temporary. You cannot change personalization after the conversation starts." | https://help.openai.com/en/articles/8914046-temporary-chat-in-chatgpt (archived 16 Oct 2026) | 22 Oct 2026 (archived copy of 16 Oct 2026) |
| 10.6 | Saving turns it into a regular chat | "Saving converts it into a regular chat, including when it started without personalization." | https://help.openai.com/en/articles/8914046-temporary-chat-in-chatgpt (archived 16 Oct 2026) | 22 Oct 2026 (archived copy of 16 Oct 2026) |
| 10.7 | An unsaved temporary chat cannot be reopened | "If you do not save a temporary chat, it will not appear in your history and cannot be reopened from history after you leave it." | https://help.openai.com/en/articles/8914046-temporary-chat-in-chatgpt (archived 16 Oct 2026) | 22 Oct 2026 (archived copy of 16 Oct 2026) |
| 10.8 | A copy may be kept for safety | "OpenAI may keep a copy of a temporary chat for up to 30 days for safety purposes." | https://help.openai.com/en/articles/8914046-temporary-chat-in-chatgpt (archived 16 Oct 2026) | 22 Oct 2026 (archived copy of 16 Oct 2026) |
| 10.9 | Not used for training while temporary | "A temporary chat is not used to improve OpenAI models while it remains temporary, whether or not you choose personalization." | https://help.openai.com/en/articles/8914046-temporary-chat-in-chatgpt (archived 16 Oct 2026) | 22 Oct 2026 (archived copy of 16 Oct 2026) |
| 10.10 | Default personalisation (release note 27 Aug 2026) — CONFLICT with 10.11 | "By default, temporary chats are not personalized." | https://help.openai.com/en/articles/6825453-chatgpt-release-notes (archived 21 Oct 2026; release note dated 27 Aug 2026) | 22 Oct 2026 (archived copy of 21 Oct 2026) |
| 10.11 | Default personalisation (Projects article) — CONFLICT with 10.10 | "Personalization is on by default for temporary chats." | https://help.openai.com/en/articles/10169521-projects-in-chatgpt (archived 10 Oct 2026) | 22 Oct 2026 (archived copy of 10 Oct 2026) |
| 10.12 | Safety features still use limited context | "Turning off memory and personalization features does not disable safety features that may use limited, safety-relevant context in rare, high-risk situations to help ChatGPT respond more safely." | https://help.openai.com/en/articles/8914046-temporary-chat-in-chatgpt (archived 16 Oct 2026) | 22 Oct 2026 (archived copy of 16 Oct 2026) |
| 10.13 | Temporary chats do not create memories (see row 2.14) | "Temporary chats do not create or update memories, even with personalization on." | https://help.openai.com/en/articles/8590148-memory-in-chatgpt (archived 19 Oct 2026) | 22 Oct 2026 (archived copy of 19 Oct 2026) |
| 10.14 | Enterprise Compliance API keeps temporary chats 30 days | "For eligible Enterprise customers, temporary chats are available through the Compliance API for 30 days, including when the workspace has a different custom retention period." | https://help.openai.com/en/articles/8914046-temporary-chat-in-chatgpt (archived 16 Oct 2026) | 22 Oct 2026 (archived copy of 16 Oct 2026) |

## 11. Training setting ("Improve the model for everyone")

Settings path (web): "Open your account menu." "Select Settings." "Select Data controls." "Select Improve the model for everyone, turn it off, and select Done." (data controls article, archived 11 Oct 2026)
Settings path (mobile): "Open the sidebar." "Select your profile icon to open Settings." "Select Data controls." "Turn off Improve the model for everyone." (same page)
Settings path (signed out): "When using ChatGPT without signing in, open Settings and turn off Improve the model for everyone. Your choice is saved in that browser." (same page)

| # | Claim | Exact verbatim quote | Source URL | Checked on |
|---|---|---|---|---|
| 11.1 | Off means new chats are not used for training | "When Improve the model for everyone is off, your new conversations won’t be used to train OpenAI models. They can still appear in your chat history." | https://help.openai.com/en/articles/7730893-data-controls-in-chatgpt (archived 11 Oct 2026) | 22 Oct 2026 (archived copy of 11 Oct 2026) |
| 11.2 | Turning it off keeps saved chats | "Turning off Improve the model for everyone does not delete or hide saved chats." | https://help.openai.com/en/articles/7730893-data-controls-in-chatgpt (archived 11 Oct 2026) | 22 Oct 2026 (archived copy of 11 Oct 2026) |
| 11.3 | Archiving does not change training status | "Archiving a chat does not change whether it can be used to train OpenAI models. Your Improve the model for everyone setting continues to apply." | https://help.openai.com/en/articles/7730893-data-controls-in-chatgpt (archived 11 Oct 2026) | 22 Oct 2026 (archived copy of 11 Oct 2026) |
| 11.4 | Privacy Portal alternative | "Do not train on my content in the Privacy Portal. Either option is sufficient for ChatGPT conversations and Codex tasks." | https://help.openai.com/en/articles/7730893-data-controls-in-chatgpt (archived 11 Oct 2026) | 22 Oct 2026 (archived copy of 11 Oct 2026) |
| 11.5 | Feedback can send the whole conversation for training | "If you choose to provide feedback, such as selecting thumbs up or thumbs down on a response, the entire conversation associated with that feedback may be used to train OpenAI models." | https://help.openai.com/en/articles/7730893-data-controls-in-chatgpt (archived 11 Oct 2026) | 22 Oct 2026 (archived copy of 11 Oct 2026) |
| 11.6 | Codex has its own setting | "Codex has a separate Include environments setting in Codex settings that controls whether additional context from your Codex environments can be used to train OpenAI models." | https://help.openai.com/en/articles/7730893-data-controls-in-chatgpt (archived 11 Oct 2026) | 22 Oct 2026 (archived copy of 11 Oct 2026) |
| 11.7 | Business, Enterprise, Edu are not used for training by default | "By default, OpenAI does not use content from ChatGPT Business, Enterprise, Edu, or ChatGPT for Healthcare workspaces to train its models." | https://help.openai.com/en/articles/7730893-data-controls-in-chatgpt (archived 11 Oct 2026) | 22 Oct 2026 (archived copy of 11 Oct 2026) |
| 11.8 | Individual plans may be used for training | "When you use our services for individuals (Free, Plus, Pro), we may use your content to train our models." | https://help.openai.com/en/articles/5722486-how-your-data-is-used-to-improve-model-performance (archived 19 Oct 2026) | 22 Oct 2026 (archived copy of 19 Oct 2026) |
| 11.9 | Default on individual plans | NOT FOUND in official sources (the closest wording is "When enabled, OpenAI may use eligible content to improve the performance and safety of its models.") | https://help.openai.com/en/articles/5722486-how-your-data-is-used-to-improve-model-performance (archived 19 Oct 2026) | 22 Oct 2026 (archived copy of 19 Oct 2026) |
| 11.10 | Temporary chats are not used for training while temporary | "A temporary chat is not used to improve OpenAI models while it remains temporary, whether or not you choose personalization." | https://help.openai.com/en/articles/8914046-temporary-chat-in-chatgpt (archived 16 Oct 2026) | 22 Oct 2026 (archived copy of 16 Oct 2026) |

## 12. Is asking ChatGPT "what do you remember about me?" a reliable check?

Settings path to see the summary: "Open Settings." "Select Personalization." "Select Memory." (memory article, archived 19 Oct 2026)

| # | Claim | Exact verbatim quote | Source URL | Checked on |
|---|---|---|---|---|
| 12.1 | The article suggests asking ChatGPT | "You can also ask ChatGPT what it remembers about you." | https://help.openai.com/en/articles/8590148-memory-in-chatgpt (archived 19 Oct 2026) | 22 Oct 2026 (archived copy of 19 Oct 2026) |
| 12.2 | The summary may leave things out | "The memory summary is a high-level view of information that ChatGPT may use to personalize responses. It does not necessarily include every detail or source that Memory can reference." | https://help.openai.com/en/articles/8590148-memory-in-chatgpt (archived 19 Oct 2026) | 22 Oct 2026 (archived copy of 19 Oct 2026) |
| 12.3 | The FAQ repeats that the summary may omit details | "No. The summary is a high-level view and may omit details that are less relevant, unsuitable for the summary, or derived from sources that are not displayed individually." | https://help.openai.com/en/articles/8590148-memory-in-chatgpt (archived 19 Oct 2026) | 22 Oct 2026 (archived copy of 19 Oct 2026) |
| 12.4 | Whether the chatbot's answer is a reliable check | NOT FOUND in official sources. No page says whether ChatGPT's answer to this question is complete or accurate. | — | 22 Oct 2026 (archived copy of 19 Oct 2026) |

Practical note from the official pages (for the guide, not a claim about reliability): the memory summary under Settings > Personalization > Memory is the place the article describes for reviewing what is remembered, and it may not show everything (rows 2.3 and 2.4).

## Pages read

Read from Wayback snapshots (20 distinct pages), with snapshot dates:
1. 20001275 ChatGPT Work and Codex (12 Oct)
2. 8590148 Memory in ChatGPT (19 Oct)
3. 8983136 What is memory, legacy (2 Jun, STALE?)
4. 8983778 Chat and file retention (20 Oct)
5. 10169521 Projects in ChatGPT (10 Oct)
6. 20001052 File storage and Library (27 Aug, STALE?)
7. 20001494 Connecting and managing app accounts (6 Sep, STALE?)
8. 11487775 Connected apps (12 Oct)
9. 10408842 Google app data controls FAQ (26 Aug, STALE?)
10. 8096356 Custom instructions (5 Oct)
11. 11899719 Customizing your personality (17 Oct) (read, not quoted)
12. 20001276 Moving to the new desktop app (15 Oct)
13. 9793128 About Pro tiers (11 Oct)
14. 11989085 What is ChatGPT Go (16 Oct)
15. 9275245 Free tier FAQ (12 Oct)
16. 8914046 Temporary chat (16 Oct)
17. 7730893 Data controls (11 Oct)
18. 5722486 How your data is used to improve model performance (19 Oct)
19. 6825453 Release notes (21 Oct)
20. 20001354 GPT-6 and other models (22 Oct) (read, not quoted)

Not fetched or not usable: 20001278 (creating documents), 10056348 (finding chats), 20001548 (local work sync, no snapshot), 20001411 (locked chats, no snapshot), 10128477, 11391654, 7039943, 11752874, the pricing page, and the openai.com Go introduction page (all empty or no snapshot).

Model used: claude-haiku-5-5 (Haiku 5.5).

Claim count: 161 table rows across the 12 topics. Of these, 5 are cross-references to rows elsewhere in the file (9.17, 9.18, 9.19, 9.20, 10.13) and 2 are NOT FOUND rows (11.9, 12.4), so 154 rows carry a sourced quote.
