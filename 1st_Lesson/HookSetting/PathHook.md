# Hook Settings & Absolute Paths

> How the project solves the absolute path requirement for secure hook configuration.

---

## 🔐 Why Absolute Paths?

Claude Code's security recommendations require **absolute paths** for hook scripts to prevent:
- Path interception attacks
- Binary planting attacks

❌ Relative path (not recommended):
```json
"command": "node ./hooks/read_hook.js"
```

✅ Absolute path (recommended):
```json
"command": "node /home/youruser/projects/myapp/hooks/read_hook.js"
```

---

## ⚠️ The Problem

Absolute paths make sharing `settings.json` across machines difficult — the path on your machine will differ from the path on anyone else's machine.

---

## ✅ The Solution

The project uses a **`settings.example.json`** file with a `$PWD` placeholder instead of hardcoded paths:

```json
"command": "node $PWD/hooks/read_hook.js"
```

When you run:
```bash
npm run setup
```

The `scripts/init-claude.js` script automatically:
1. Reads `settings.example.json`
2. Replaces `$PWD` with the **absolute path of your machine**
3. Copies the file and saves it as `settings.local.json`

---

## 📁 Result

```
.claude/
├── settings.json          # shared config (committed)
├── settings.local.json    # generated for your machine (not committed)
└── settings.example.json  # template with $PWD placeholders
```

This is why you see **two `settings.json` files** after running `npm run dev` — one shared, one machine-specific.

---

> 💡 Never manually edit `settings.local.json` — re-run `npm run setup` to regenerate it if needed.
