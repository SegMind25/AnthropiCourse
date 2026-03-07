# Controlling Context with Claude

> Techniques to keep Claude focused, correct, and productive during complex development sessions.

---

## ⛔ Interrupting with Escape

Press **`Escape`** to stop Claude mid-response and redirect it.

**Best used when:**
- Claude is tackling too many things at once
- The response is heading in the wrong direction
- You want to narrow focus to a single task

---

## 🧠 Combining Escape with Memories

Fix repetitive mistakes across conversations:

1. Press **`Escape`** to stop the current response
2. Use **`#`** to add a memory with the correct approach
3. Continue the conversation with the fix in place

This prevents the same error from recurring in future sessions.

---

## ⏪ Rewinding Conversations

Press **`Escape` twice** to view your message history and jump back to any earlier point.

**Best used when:**
- Debugging tangents have cluttered the context
- You want to keep codebase knowledge but drop irrelevant history
- You need Claude re-focused on the current task

---

## 🛠️ Context Management Commands

| Command | What it does | When to use |
|---------|-------------|-------------|
| `/compact` | Summarizes history, keeps key knowledge | Continuing related tasks in a long conversation |
| `/clear` | Wipes conversation entirely | Switching to a completely unrelated task |

---

## ✅ Quick Reference

| Situation | Technique |
|-----------|-----------|
| Claude doing too much at once | `Escape` to interrupt |
| Repeated mistakes | `Escape` → `#` memory → continue |
| Cluttered but valuable context | `Escape` × 2 to rewind |
| Long session, related next task | `/compact` |
| Switching to unrelated task | `/clear` |
