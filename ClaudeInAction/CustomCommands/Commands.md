# Custom Commands in Claude Code

> Automate repetitive tasks by creating your own slash commands tailored to your project workflow.

---

## 📁 Setup

Create the following folder structure in your project:

```
.claude/
└── commands/
    └── your-command.md   →   becomes /your-command
```

> ⚠️ Restart Claude Code after creating a new command for it to be recognized.

---

## ⚡ Example: `/audit` Command

Create `.claude/commands/audit.md` with steps to:

1. Run `npm audit` — find vulnerable packages
2. Run `npm audit fix` — apply fixes
3. Run tests — verify nothing broke

---

## 🔧 Commands with Arguments

Use the `$ARGUMENTS` placeholder to make commands reusable.

**Example — `.claude/commands/write_tests.md`:**

```
Write comprehensive tests for: $ARGUMENTS

Testing conventions:
- Use Vitest with React Testing Library
- Place test files in __tests__ next to the source file
- Name files as [filename].test.ts(x)
- Use @/ prefix for imports

Coverage:
- Happy paths
- Edge cases
- Error states
```

**Usage:**
```
/write_tests the use-auth.ts file in the hooks directory
```

Arguments can be any string — file paths, feature names, component names, etc.

---

## ✅ Key Benefits

| Benefit | Description |
|---------|-------------|
| **Automation** | Turn multi-step workflows into one command |
| **Consistency** | Same steps followed every time |
| **Context** | Embed project-specific conventions |
| **Flexibility** | `$ARGUMENTS` adapts commands to any input |

---

## 💡 Common Use Cases

- Running project-specific test suites
- Generating boilerplate following team conventions
- Deploying code with predefined steps
- Auditing dependencies or code quality
