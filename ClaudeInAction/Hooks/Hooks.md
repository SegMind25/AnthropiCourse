# Hooks in Claude Code

> Run custom commands before or after Claude uses a tool — automate formatting, testing, access control, and more.

---

## 🔄 How Hooks Fit In

Normal flow:
```
Your query → Claude model → Tool call → Result
```

With hooks:
```
Your query → Claude model → [PreToolUse] → Tool call → [PostToolUse] → Result
```

---

## 🪝 Hook Types

| Type | When it runs | Can block? |
|------|-------------|------------|
| `PreToolUse` | Before tool executes | ✅ Yes |
| `PostToolUse` | After tool executes | ❌ No |

---

## 📁 Configuration Locations

| File | Scope |
|------|-------|
| `~/.claude/settings.json` | Global — all projects |
| `.claude/settings.json` | Project — shared with team |
| `.claude/settings.local.json` | Project — personal only |

> You can write hooks manually or use `/hooks` inside Claude Code.

---

## ⚙️ Configuration Examples

### PreToolUse — Block before read
```json
"PreToolUse": [
  {
    "matcher": "Read",
    "hooks": [
      {
        "type": "command",
        "command": "node /home/hooks/read_hook.ts"
      }
    ]
  }
]
```

### PostToolUse — Format after edit
```json
"PostToolUse": [
  {
    "matcher": "Write|Edit|MultiEdit",
    "hooks": [
      {
        "type": "command",
        "command": "node /home/hooks/edit_hook.ts"
      }
    ]
  }
]
```

---

## 💡 Practical Use Cases

| Use Case | Hook Type |
|----------|-----------|
| Auto-format files after edits | `PostToolUse` |
| Run tests when files change | `PostToolUse` |
| Block access to specific files | `PreToolUse` |
| Run linters and report to Claude | `PostToolUse` |
| Log file access or modifications | `PostToolUse` |
| Enforce naming conventions | `PreToolUse` |

---

## ✅ Summary

- **PreToolUse** → control what Claude *can* do
- **PostToolUse** → enhance what Claude *has done*
