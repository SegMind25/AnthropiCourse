# GitHub Integration with Claude Code

> Run Claude directly inside GitHub Actions — automate code reviews, handle issues, and execute tasks within your GitHub workflow.

---

## ⚙️ Setup

Run this inside Claude Code:

```
/install-github-app
```

This will:
1. Install the Claude Code app on GitHub
2. Add your API key
3. Auto-generate a PR with the workflow files

Merge the PR → workflow files appear in `.github/workflows/`

---

## 🔄 Default Workflows

### `@claude` Mention
Mention Claude in any issue or PR:
- Analyzes the request and creates a task plan
- Executes the task with full codebase access
- Responds with results directly in the issue or PR

### Auto PR Review
On every pull request, Claude automatically:
- Reviews proposed changes
- Analyzes the impact of modifications
- Posts a detailed report on the PR

---

## 🛠️ Customizing Workflows

### Project Setup
```yaml
- name: Project Setup
  run: |
    npm run setup
    npm run dev:daemon
```

### Custom Instructions
```yaml
custom_instructions: |
  The project is already set up with all dependencies installed.
  The server is running at localhost:3000. Logs are in logs.txt.
  Query the db with the 'sqlite3' cli if needed.
  Use mcp__playwright tools to interact with the app in browser.
```

### MCP Server Config
```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": [
        "@playwright/mcp@latest",
        "--allowed-origins",
        "localhost:3000;cdn.tailwindcss.com;esm.sh"
      ]
    }
  }
}
```

### Tool Permissions
> ⚠️ In GitHub Actions, every tool must be listed explicitly — no shortcuts.

```yaml
allowed_tools: "Bash(npm:*),Bash(sqlite3:*),mcp__playwright__browser_snapshot,mcp__playwright__browser_click,..."
```

---

## ✅ Best Practices

| Tip | Detail |
|-----|--------|
| Start simple | Use default workflows before customizing |
| Add context | Use `custom_instructions` for project-specific setup |
| Be explicit | List every tool permission individually for MCP servers |
| Test first | Validate with simple tasks before complex ones |
