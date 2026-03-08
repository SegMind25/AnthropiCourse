# Useful Hooks for Claude Code

> Automated feedback loops that catch common Claude Code weaknesses — type errors and code duplication.

---

## 🔍 Hook 1: TypeScript Type Checker

**Problem:** Claude updates a function signature but misses all the call sites, causing type errors.

**Solution:** A `PostToolUse` hook that runs `tsc --noEmit` after every file edit.

```
File edited → tsc --noEmit → Errors found → Fed back to Claude → Claude fixes call sites
```

**Config:**
```json
"PostToolUse": [{
  "matcher": "Write|Edit|MultiEdit",
  "hooks": [{
    "type": "command",
    "command": "node $PWD/hooks/typecheck_hook.js"
  }]
}]
```

**Hook logic:**
1. Run `tsc --noEmit`
2. Capture output
3. If errors exist → write to stderr + exit `2`
4. Claude receives errors and fixes them automatically

> 💡 Works for any typed language with a type checker. For untyped languages, use automated tests instead.

---

## 🔍 Hook 2: Query Duplication Prevention

**Problem:** On complex multi-step tasks, Claude creates new queries instead of reusing existing ones (e.g. writes a new `getPendingOrders()` instead of using the existing one).

**Solution:** A `PostToolUse` hook that launches a **second Claude instance** to review changes for duplicates.

```
Edit in ./queries → Secondary Claude reviews → Duplicate found → Feedback to primary Claude → Reuses existing code
```

**How it works:**
1. Detects edits to the `./queries` directory
2. Launches a separate Claude Code instance via the TypeScript SDK
3. Secondary Claude compares new code against existing queries
4. If duplicate found → exit `2` + feedback to primary Claude
5. Primary Claude removes the duplicate and reuses existing code

---

## ⚖️ Trade-offs

| Hook | Speed | Cost | Value |
|------|-------|------|-------|
| TypeScript checker | ⚡ Fast | 💚 Low | Prevents broken builds |
| Query deduplication | 🐢 Slower | 🟡 Higher (launches Claude) | Cleaner codebase |

> ✅ Only monitor **critical directories** to minimize overhead on the duplication hook.

---

## 💡 Broader Principles

- Use compiler/linter output as immediate Claude feedback
- Use separate Claude instances for automated code review
- Focus monitoring on high-value directories
- Balance automation benefits against time and API cost
