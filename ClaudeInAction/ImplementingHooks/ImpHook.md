# Implementing a Hook — Block `.env` Access

> A practical example of using a PreToolUse hook to prevent Claude from reading sensitive files.

---

## ⚙️ Hook Configuration

Add this to `.claude/settings.local.json`:

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Read|Grep",
        "hooks": [
          {
            "type": "command",
            "command": "node ./hooks/read_hook.js"
          }
        ]
      }
    ]
  }
}
```

- `Read|Grep` — the `|` acts as OR, triggers on either tool
- `PreToolUse` — intercepts before the tool executes

---

## 📦 Tool Call Data

When Claude calls a tool, your hook receives this JSON via **stdin**:

```json
{
  "session_id": "2d6a1e4d-6...",
  "transcript_path": "/Users/sg/...",
  "hook_event_name": "PreToolUse",
  "tool_name": "Read",
  "tool_input": {
    "file_path": "/code/queries/.env"
  }
}
```

---

## 🛠️ Hook Script

Create `./hooks/read_hook.js`:

```js
async function main() {
  const chunks = [];
  for await (const chunk of process.stdin) {
    chunks.push(chunk);
  }

  const toolArgs = JSON.parse(Buffer.concat(chunks).toString());

  // Extract file path from tool input
  const readPath =
    toolArgs.tool_input?.file_path || toolArgs.tool_input?.path || "";

  // Block access to .env files
  if (readPath.includes(".env")) {
    console.error("You cannot read the .env file");
    process.exit(2);
  }
}

main();
```

| Exit Code | Effect |
|-----------|--------|
| `0` | Allow tool call to proceed |
| `2` | Block + send `stderr` message to Claude |

---

## 🧪 Testing

1. Save config and hook script
2. **Restart Claude Code**
3. Ask Claude to read your `.env` file
4. Claude will be blocked and explain why

> Works for both `Read` and `Grep` operations.

---

## ✅ Key Benefits

| Benefit | Detail |
|---------|--------|
| **Proactive** | Blocks before sensitive data is read |
| **Transparent** | Claude understands why it was blocked |
| **Flexible** | Extend to any file pattern or directory |
| **Clear feedback** | Meaningful error messages via stderr |
