# Claude Code SDK

> Run Claude Code programmatically from TypeScript, Python, or CLI — same tools, same functionality, integrated into your workflows.

---

## ✨ Key Features

- Same Claude Code as the terminal version
- Inherits all settings from `.claude` directory
- Read-only permissions by default
- Best suited for automation, hooks, and larger pipelines

---

## 🚀 Basic Usage (TypeScript)

```ts
import { query } from "@anthropic-ai/claude-code";

const prompt = "Look for duplicate queries in the ./src/queries dir";

for await (const message of query({ prompt })) {
  console.log(JSON.stringify(message, null, 2));
}
```

> Output shows the raw message-by-message conversation — the **last message** contains Claude's final response.

---

## 🔐 Permissions

By default the SDK is **read-only** (files, directories, grep).

**Enable write access:**
```ts
for await (const message of query({
  prompt,
  options: {
    allowedTools: ["Edit"]
  }
})) {
  console.log(JSON.stringify(message, null, 2));
}
```

Or configure project-wide in your `.claude` settings file.

---

## 💡 Practical Use Cases

| Use Case | Description |
|----------|-------------|
| Git hooks | Auto-review code changes before commits |
| Build scripts | Analyze and optimize code during builds |
| Helper commands | Code maintenance and refactoring tasks |
| Documentation | Automated doc generation |
| CI/CD pipelines | Code quality checks on every push |

---

> The SDK lets you add AI-powered intelligence to any part of your dev process that benefits from programmatic access.
