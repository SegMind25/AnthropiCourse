# All Hook Types in Claude Code

> Beyond PreToolUse and PostToolUse — a complete reference for all available hooks.

---

## 🪝 All Hook Types

| Hook | Triggers When |
|------|--------------|
| `PreToolUse` | Before a tool executes |
| `PostToolUse` | After a tool executes |
| `Notification` | Claude needs tool permission, or has been idle 60s |
| `Stop` | Claude finishes responding |
| `SubagentStop` | A subagent ("Task" in UI) finishes |
| `PreCompact` | Before a compact operation (manual or automatic) |
| `UserPromptSubmit` | User submits a prompt, before Claude processes it |
| `SessionStart` | Starting or resuming a session |
| `SessionEnd` | Session ends |

---

## ⚠️ The Challenge: stdin Differs Per Hook

The JSON received via **stdin** changes based on:
- The **hook type** (PreToolUse, Stop, SessionStart, etc.)
- The **tool matched** (for PreToolUse and PostToolUse)

### Example — `PostToolUse` watching `TodoWrite`

```json
{
  "session_id": "9ecf22fa-...",
  "transcript_path": "<path>",
  "hook_event_name": "PostToolUse",
  "tool_name": "TodoWrite",
  "tool_input": {
    "todos": [{ "content": "write a readme", "status": "pending", "priority": "medium", "id": "1" }]
  },
  "tool_response": {
    "oldTodos": [],
    "newTodos": [{ "content": "write a readme", "status": "pending", "priority": "medium", "id": "1" }]
  }
}
```

### Example — `Stop` hook

```json
{
  "session_id": "af9f50b6-...",
  "transcript_path": "<path>",
  "hook_event_name": "Stop",
  "stop_hook_active": false
}
```

---

## 🛠️ Debug Helper: Log stdin to a File

Not sure what data your hook will receive? Use this logger hook first:

```json
"PostToolUse": [
  {
    "matcher": "*",
    "hooks": [
      {
        "type": "command",
        "command": "jq . > post-log.json"
      }
    ]
  }
]
```

- `matcher: "*"` catches **all** tool calls
- `jq .` pretty-prints the JSON
- Output saved to `post-log.json` for inspection

> 💡 Use this technique for any hook type — just swap `PostToolUse` for `Stop`, `SessionStart`, etc. and rename the output file.

---

## ✅ Workflow for Writing a New Hook

1. Add the logger hook with `matcher: "*"`
2. Trigger the relevant action in Claude Code
3. Inspect the generated log file
4. Write your hook logic based on the exact data structure
5. Remove the logger hook when done
