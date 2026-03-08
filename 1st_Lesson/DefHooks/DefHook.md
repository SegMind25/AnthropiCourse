# Defining Hooks in Claude Code

> Fine-grained control over tool calls — intercept, inspect, allow, or block what Claude does in your environment.

---

## 🏗️ Building a Hook — 4 Steps

1. Choose **PreToolUse** or **PostToolUse**
2. Specify which **tool types** to watch
3. Write a **command** that receives tool call JSON via stdin
4. Use **exit codes** to allow or block the operation

![Hook Building Steps](https://everpath-course-content.s3-accelerate.amazonaws.com/instructor%2Fa46l9irobhg0f5webscixp0bs%2Fpublic%2F1752618153%2F011_-_Defining_Hooks_05.1752618152864.png)

---

## 🔧 Available Tools

Claude Code provides several built-in tools you can monitor:

![Available Tools](https://everpath-course-content.s3-accelerate.amazonaws.com/instructor%2Fa46l9irobhg0f5webscixp0bs%2Fpublic%2F1752618153%2F011_-_Defining_Hooks_07.1752618153492.png)

> 💡 Ask Claude directly for a full list — available tools can change when MCP servers are added.

---

## 📦 Tool Call Data Structure

When a hook triggers, Claude sends this JSON to your command via **stdin**:

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

![Data Structure](https://everpath-course-content.s3-accelerate.amazonaws.com/instructor%2Fa46l9irobhg0f5webscixp0bs%2Fpublic%2F1752618154%2F011_-_Defining_Hooks_11.1752618154320.png)

Your command reads this, parses it, and decides whether to allow or block.

---

## 🚦 Exit Codes

| Exit Code | Meaning |
|-----------|---------|
| `0` | Allow the tool call to proceed |
| `2` | Block the tool call *(PreToolUse only)* |

> When exiting with code `2`, write your reason to **stderr** — Claude receives it as feedback.

![Exit Codes](https://everpath-course-content.s3-accelerate.amazonaws.com/instructor%2Fa46l9irobhg0f5webscixp0bs%2Fpublic%2F1752618154%2F011_-_Defining_Hooks_16.1752618154725.png)

---

## 🔒 Example: Block `.env` File Access

A common use case — prevent Claude from reading sensitive files:

- Monitor both `Read` and `Grep` tools (both can access file contents)
- Check if `tool_input.file_path` matches restricted paths like `*.env`
- Exit with code `2` and write a message to stderr explaining the block

```json
"PreToolUse": [
  {
    "matcher": "Read|Grep",
    "hooks": [
      {
        "type": "command",
        "command": "node /home/hooks/block_env.ts"
      }
    ]
  }
]
```

---

## ✅ Summary

- **stdin** → receives tool call JSON
- **exit 0** → allow
- **exit 2** → block + send stderr message to Claude
