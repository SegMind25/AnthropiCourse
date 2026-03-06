# Adding Context in Claude

> Effective context management is the key to getting the best results from Claude on coding projects. The right context improves performance — too much irrelevant context actually hurts it.

---

## Why Context Matters

Your project may have hundreds of files, but Claude only needs the **right** information to help effectively.

| ✅ Right context | ❌ Too much context |
|-----------------|-------------------|
| Faster, accurate responses | Decreased performance |
| Claude focuses on what matters | Noise drowns out the signal |
| Efficient token usage | Slower and less precise |

---

## The `/init` Command

When starting Claude in a new project, run `/init` first. Claude will analyze your entire codebase and understand:

- 📐 The project's **purpose and architecture**
- ⚙️ Important **commands and critical files**
- 🎨 **Coding patterns** and structure

After analysis, Claude creates a summary and writes it to a `CLAUDE.md` file.

> 💡 When Claude asks permission to create files, press **Enter** to approve each one, or **Shift+Tab** to let Claude write files freely throughout the session.

![Init Command Overview](https://everpath-course-content.s3-accelerate.amazonaws.com/instructor%2Fa46l9irobhg0f5webscixp0bs%2Fpublic%2F1750967940%2F004_-_Adding_Context_02.1750967940092.png)

---

## The `CLAUDE.md` File

This file is the backbone of your Claude setup. It serves two main purposes:

| Purpose | Description |
|---------|-------------|
| 📖 **Codebase guide** | Points Claude to important commands, architecture, and coding style |
| 🎛️ **Custom instructions** | Lets you give Claude specific or custom directions |

> 🔁 `CLAUDE.md` is included in **every request** you make — think of it as a persistent system prompt for your project.

---

## `CLAUDE.md` File Locations

Claude recognizes three different `CLAUDE.md` files across three locations:

| File | Location | Purpose |
|------|----------|---------|
| `CLAUDE.md` | Project root | Generated with `/init`, committed to source control, **shared** with your team |
| `CLAUDE.local.md` | Project root | **Not shared** — personal instructions and customizations |
| `~/.claude/CLAUDE.md` | Home directory | Applied to **all projects** on your machine |

![CLAUDE.md File Locations](https://everpath-course-content.s3-accelerate.amazonaws.com/instructor%2Fa46l9irobhg0f5webscixp0bs%2Fpublic%2F1750967941%2F004_-_Adding_Context_05.1750967940882.png)

---

## Adding Custom Instructions

Customize Claude's behavior by adding instructions to `CLAUDE.md`.

Use the `#` command to enter **memory mode** — this lets you edit your `CLAUDE.md` intelligently:

```
# Use comments sparingly. Only comment complex code.
```

Claude will **automatically merge** this instruction into your `CLAUDE.md` file.

---

## File Mentions with `@`

Point Claude to specific files using the `@` symbol followed by the file path:

```
How does the auth system work? @auth
```

Claude will show a list of matching files to choose from, then include the selected file in your conversation automatically.

![File Mentions with @ symbol](https://everpath-course-content.s3-accelerate.amazonaws.com/instructor%2Fa46l9irobhg0f5webscixp0bs%2Fpublic%2F1750967941%2F004_-_Adding_Context_09.1750967941793.png)

---

## Referencing Files Inside `CLAUDE.md`

You can also use `@` syntax directly inside your `CLAUDE.md` to auto-include files in every request:

```
The database schema is defined in the @prisma/schema.prisma file.
Reference it anytime you need to understand the structure of data
stored in the database.
```

> ✅ This means Claude can answer questions about your data structure **immediately** — no need to search for the schema file each time.

---

## Quick Reference

| Tool | Usage | Effect |
|------|-------|--------|
| `/init` | Run at project start | Generates `CLAUDE.md` with codebase summary |
| `#` | Memory mode | Edits `CLAUDE.md` intelligently |
| `@filename` | In chat or `CLAUDE.md` | Includes file contents in the request |
| `Shift+Tab` | During file writes | Approves all writes freely |
