# Coding Assistants: How They Work

> A coding assistant is a sophisticated system that combines language models with tools to tackle complex programming tasks.

---

## The Process

When given a task (e.g. *"Got an error. Find and fix the issue"*), the assistant follows three steps:

| Step | Action |
|------|--------|
| 1️⃣ **Gather context** | Understand the error, identify relevant files and codebase areas |
| 2️⃣ **Formulate a plan** | Decide how to fix it — change code, run tests, verify |
| 3️⃣ **Take an action** | Implement the fix by updating files and running commands |

![Coding Assistant Flow Diagram](https://everpath-course-content.s3-accelerate.amazonaws.com/instructor%2Fa46l9irobhg0f5webscixp0bs%2Fpublic%2F1750967940%2F002_-_What_is_a_Coding_Assistant%3F_02.1750967940100.png)

> 💡 Most coding assistants use remotely hosted language models. Claude Code uses the Claude series hosted at Anthropic, AWS, or Google Cloud *(configurable)*.

---

## Tool Use — Bridging the Gap

Language models can only process and return text — they can't read files or run commands on their own. **Tool use** solves this.

**How it works:**
1. User asks: *"What code is in main.go?"*
2. Assistant appends tool instructions: *"If you want to read a file, respond with `ReadFile: name of file`"*
3. Model responds: `ReadFile: main.go`
4. Assistant reads the file and returns contents to the model
5. Model delivers the final answer

![Tool Use Sequence Diagram](https://everpath-course-content.s3-accelerate.amazonaws.com/instructor%2Fa46l9irobhg0f5webscixp0bs%2Fpublic%2F1750967942%2F002_-_What_is_a_Coding_Assistant%3F_14.1750967942536.png)

> 🏆 **The Claude series (Opus, Sonnet, Haiku) are particularly strong at understanding what tools do and using them to complete tasks.**

---

## Why It Matters

| Benefit | Description |
|---------|-------------|
| 🔧 **Harder tasks** | Combines tools to handle complex workflows; adapts to unseen tools |
| 🔌 **Extensible** | Easily add new tools; Claude adapts as your workflow evolves |
| 🔒 **Better security** | Navigates codebases without full indexing — your code stays private |

---

## Key Takeaways

- Coding assistants use language models to complete programming tasks
- Language models **need tools** to interact with the real world
- Not all models use tools equally well — **Claude excels at tool use**
- Strong tool use = better security, customization, and longevity in Claude Code
