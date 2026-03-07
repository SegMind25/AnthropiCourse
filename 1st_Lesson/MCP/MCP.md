# MCP Servers with Claude Code

> Extend Claude Code's capabilities by connecting external tools and services via MCP (Model Context Protocol) servers.

---

## 🚀 Installing an MCP Server

Run this in your terminal (not inside Claude Code):

```bash
claude mcp add playwright npx @playwright/mcp@latest
```

This names the server `playwright` and starts it locally on your machine.

---

## 🔐 Managing Permissions

To skip permission prompts, pre-approve the server in `.claude/settings.local.json`:

```json
{
  "permissions": {
    "allow": ["mcp__playwright"],
    "deny": []
  }
}
```

> ⚠️ Note the double underscores in `mcp__playwright`

---

## 🌐 Example: Playwright MCP Server

Gives Claude the ability to **control a real browser** — ideal for visual development workflows.

**Example prompt:**
```
Navigate to localhost:3000, generate a basic component,
review the styling, and update the generation prompt at
@src/lib/prompts/generation.tsx to produce better components.
```

**Claude will:**
1. Open browser → navigate to your app
2. Generate a test component
3. Analyze visual styling and code quality
4. Update the generation prompt
5. Test the improved prompt with a new component

**Result:** Instead of generic gradients and standard patterns, Claude produces more creative output like warm sunset gradients, ocean depth themes, asymmetric layouts, and unconventional spacing.

---

## 🧩 MCP Ecosystem

| Category | Examples |
|----------|---------|
| Browser automation | Playwright |
| Database interactions | PostgreSQL, SQLite |
| API testing | REST, GraphQL monitoring |
| File system | Advanced file operations |
| Cloud services | AWS, GitHub, Vercel |
| Dev tools | CI/CD, build automation |

---

## ✅ Key Benefit

Claude can **see actual visual output**, not just code — enabling far more informed decisions about styling, UX, and architecture improvements.
