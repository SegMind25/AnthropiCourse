# ⚡ Claude Code in Action — Complete Course Notes
> **repo:** `AnthropiCourse/ClaudeInAction` · **branch:** `main` · **author:** [@SegMind25](https://github.com/SegMind25)

[![Claude Code](https://img.shields.io/badge/Claude-Code-orange?style=flat-square)](https://claude.ai/code)
[![Anthropic](https://img.shields.io/badge/Anthropic-Course-blue?style=flat-square)](https://anthropic.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-blue?style=flat-square&logo=typescript)](https://typescriptlang.org)
[![License](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey?style=flat-square)](https://creativecommons.org/licenses/by-nc-sa/4.0/)
[![Status](https://img.shields.io/badge/Status-Completed-brightgreen?style=flat-square)](#)

---

## 🗂️ Module Structure

```
ClaudeInAction/
│
├── 📄 CodingAssistant/          → What is a coding assistant?
├── 📄 MakingChanges/            → Screenshots, Plan Mode, Git
├── 📄 ControllingContext/       → Context management techniques
├── 📄 CustomCommands/           → Building custom slash commands
├── 📄 MCP/                      → MCP server setup & integration
├── 📄 GitHubIntegration/        → GitHub Actions & PR reviews
├── 📄 Hooks/                    → Introduction to hooks
├── 📄 DefiningHooks/            → Hook structure & stdin/stdout
├── 📄 ImplementingHooks/        → Building real hooks
├── 📄 UsefulHooks/              → TypeScript checker & dupe prevention
├── 📄 HookSettings/             → Hook configuration & paths
├── 📄 AllHooks/                 → Complete hooks reference
├── 📄 ClaudeSDK/                → Claude Code SDK (CLI/TS/Python)
├── 🏗️  Project_UIGenerator/     → Project 1: UI Generator App (Next.js)
└── 🏗️  Project_QuerySystem/     → Project 2: E-commerce Query System (TypeScript)
```

---

## 📚 Course Progress

| # | Module | Topic | Status |
|---|--------|--------|--------|
| 01 | `CodingAssistant/` | What is a coding assistant? | ✅ Completed |
| 02 | `MakingChanges/` | Screenshots, Plan Mode, ultrathink, Git | ✅ Completed |
| 03 | `ControllingContext/` | Interrupt, rewind, compact, clear | ✅ Completed |
| 04 | `CustomCommands/` | Slash commands & `$ARGUMENTS` | ✅ Completed |
| 05 | `MCP/` | MCP servers & auto-approve permissions | ✅ Completed |
| 06 | `GitHubIntegration/` | GitHub Actions & PR review automation | ✅ Completed |
| 07 | `Hooks/` | PreToolUse & PostToolUse hooks | ✅ Completed |
| 08 | `DefiningHooks/` | Hook stdin JSON & exit codes | ✅ Completed |
| 09 | `ImplementingHooks/` | Building a `.env` blocking hook | ✅ Completed |
| 10 | `UsefulHooks/` | TypeScript checker & duplicate prevention | ✅ Completed |
| 11 | `HookSettings/` | Hook config paths & scopes | ✅ Completed |
| 12 | `AllHooks/` | Full hook reference | ✅ Completed |
| 13 | `ClaudeSDK/` | Programmatic Claude Code via CLI/TS/Python | ✅ Completed |

---

## 🏗️ Projects Built

| Project | Stack | Description |
|---------|-------|-------------|
| [`Project_UIGenerator/`](./Project_UIGenerator/) | Next.js, TypeScript, Prisma | AI-powered UI generator with auth, file system & live preview |
| [`Project_QuerySystem/`](./Project_QuerySystem/) | TypeScript, Claude SDK | E-commerce query system with hooks for type checking & duplicate prevention |

---

## 📖 Course Notes Reference

> A concise reference covering all key concepts from the Claude Code video course.

---

## 1. 🤖 What is a Coding Assistant?

A coding assistant uses a language model to write code and complete dev tasks. Since LLMs only process text, they rely on a **tool use system** to interact with files, run commands, and access external systems.

**Flow:**
```
Task → LLM gathers context → Formulates plan → Takes action → Returns result
```

Claude's advantage: superior tool use capabilities, extensible architecture, and better security (direct code search vs. external indexing).

---

## 2. ⚡ Claude Code in Action

Claude Code ships with default tools (file read/write, command execution) and supports extension via MCP servers.

| Demo | Result |
|------|--------|
| Chalk JS optimization | 3.9x throughput improvement |
| Churn analysis (CSV) | Iterative Jupyter notebook analysis |
| UI styling (Playwright) | Automated visual iteration |
| GitHub PR review | Auto-detected PII exposure in AWS infrastructure |

---

## 3. 📂 Adding Context

| Tool | Purpose |
|------|---------|
| `/init` | Scans codebase, creates `CLAUDE.md` |
| `@filename` | Inject specific file into request |
| `#` shortcut | Edit `CLAUDE.md` with natural language |

**Three `CLAUDE.md` levels:** Project (shared) → Local (personal) → Machine (global)

> ✅ Always reference critical files (e.g. DB schemas) in `CLAUDE.md` for consistent context.

---

## 4. 🔧 Making Changes

- **Screenshots** → paste with `Ctrl+V` to show Claude exactly what to change
- **Plan Mode** → `Shift + Tab` twice — broad codebase research before acting
- **Thinking Mode** → say `ultrathink` — deep reasoning for complex logic
- **Git** → Claude can stage, commit, and write descriptive commit messages

---

## 5. 🎛️ Controlling Context

| Technique | How | When |
|-----------|-----|------|
| Interrupt | `Escape` | Claude going in wrong direction |
| Fix repeated errors | `Escape` → `#` memory | Same mistake across sessions |
| Rewind | `Escape` × 2 | Skip irrelevant history |
| Summarize | `/compact` | Long session, related next task |
| Fresh start | `/clear` | Switching to unrelated task |

---

## 6. ⚙️ Custom Commands

- Location: `.claude/commands/your-command.md`
- Filename = command name (`audit.md` → `/audit`)
- Use `$ARGUMENTS` placeholder for dynamic input
- Restart Claude Code after creating new commands

---

## 7. 🌐 MCP Servers

Extend Claude with external tools running locally or remotely.

```bash
claude mcp add playwright npx @playwright/mcp@latest
```

Auto-approve permissions in `.claude/settings.local.json`:
```json
{ "permissions": { "allow": ["mcp__playwright"] } }
```

---

## 8. 🐙 GitHub Integration

Setup: run `/install-github-app` → merges PR with two default Actions:

| Action | Trigger | What Claude does |
|--------|---------|-----------------|
| Mention | `@claude` in issue/PR | Plans + executes task |
| PR Review | New pull request | Reviews + posts detailed report |

> ⚠️ In GitHub Actions, all tool permissions must be listed explicitly.

---

## 9. 🪝 Introducing Hooks

Hooks run custom commands before or after Claude uses a tool.

| Type | Timing | Can block? |
|------|--------|------------|
| `PreToolUse` | Before tool runs | ✅ Yes |
| `PostToolUse` | After tool runs | ❌ No |

Config locations: `~/.claude/settings.json` (global) · `.claude/settings.json` (project) · `.claude/settings.local.json` (personal)

---

## 10. 🔩 Defining Hooks

Hook command receives JSON via **stdin**:
```json
{
  "hook_event_name": "PreToolUse",
  "tool_name": "Read",
  "tool_input": { "file_path": "/code/.env" }
}
```

| Exit Code | Meaning |
|-----------|---------|
| `0` | Allow |
| `2` | Block (PreToolUse only) — stderr sent to Claude as feedback |

---

## 11. 🛠️ Implementing a Hook

Example — block `.env` file access:

```json
"PreToolUse": [{
  "matcher": "Read|Grep",
  "hooks": [{ "type": "command", "command": "node ./hooks/read_hook.js" }]
}]
```

```js
// read_hook.js
const input = JSON.parse(data);
if (input.tool_input?.file_path?.includes(".env")) {
  console.error("Blocked: .env access is not allowed.");
  process.exit(2);
}
```

> ⚠️ Restart Claude Code after any hook changes.

---

## 12. 💡 Useful Hooks

**TypeScript Type Checker** (PostToolUse)
- Runs `tsc --no-emit` after file edits
- Feeds type errors back to Claude for auto-fix

**Duplicate Code Prevention** (PostToolUse)
- Watches a critical directory (e.g. `queries/`)
- Launches a secondary Claude instance to detect duplicates
- Exits with code `2` + feedback if duplicate found

---

## 13. 📦 Claude Code SDK

Programmatic interface via CLI, TypeScript, or Python — same tools as the terminal version.

- **Default:** read-only permissions
- **Write access:** enable via `options.allowedTools` or settings file
- **Best for:** hooks, helper scripts, and pipelines — not standalone use
