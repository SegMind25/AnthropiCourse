# 🤖 Generative AI Fundamentals
> **module:** `AIFluency/AIGenerative` · **branch:** `main` · **author:** [@SegMind25](https://github.com/SegMind25)

[![Claude](https://img.shields.io/badge/Claude-AI-orange?style=flat-square)](https://claude.ai)
[![Anthropic](https://img.shields.io/badge/Anthropic-Course-blue?style=flat-square)](https://anthropic.com)
[![Framework](https://img.shields.io/badge/Framework-4D%20AI%20Fluency-purple?style=flat-square)](#)
[![License](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey?style=flat-square)](https://creativecommons.org/licenses/by-nc-sa/4.0/)
[![Duration](https://img.shields.io/badge/Video-6%20minutes-blue?style=flat-square)](#)
[![Status](https://img.shields.io/badge/Status-Completed-brightgreen?style=flat-square)](#)

---

## 🎯 What You'll Learn

By the end of this lesson, you'll be able to:

- ✅ **Define generative AI** and how it differs from other AI types
- ✅ **Recognize the key characteristics** and technological foundations of generative AI

---

## 🎬 Lesson Overview

This video introduces the concept of **generative AI**, focusing on its ability to **create new content** rather than just analyzing what already exists.

We walk through how **large language models (LLMs)** like Claude actually work and the technological journey that made them possible — from algorithmic breakthroughs to vast training datasets and powerful computing.

---

## 🧠 What is Generative AI?

Generative AI is a type of artificial intelligence that **creates new content** — text, images, code, audio, video — rather than simply classifying or analyzing existing data.

| AI Type | What It Does | Example |
|---|---|---|
| 🔍 **Analytical AI** | Classifies or predicts from existing data | Spam filters, recommendation engines |
| 🎨 **Generative AI** | Creates new, original content | Claude, ChatGPT, DALL·E, Midjourney |

> *The key difference: generative AI doesn't just recognize patterns — it uses those patterns to produce something new.*

---

## ⚙️ How LLMs Like Claude Actually Work

### 1. 🏗️ The Transformer Architecture
The **transformer** was the algorithmic breakthrough that made modern LLMs possible.

- Introduced in the landmark 2017 paper *"Attention Is All You Need"*
- Allows the model to weigh the importance of different words relative to each other
- Enables understanding of context across long passages of text
- Replaced older sequential models (RNNs) with a parallelizable architecture

### 2. 📚 Training Data
LLMs are trained on **vast datasets** scraped from the internet, books, and other text sources.

- Billions to trillions of tokens (words/subwords)
- The model learns statistical patterns of language from this data
- Quality and diversity of training data directly affects model capability

### 3. 💻 Computing Power
Training large models requires **massive computational resources**.

- Thousands of specialized GPUs/TPUs running for weeks or months
- This is why only a handful of organizations can train frontier models
- Inference (running the model) is cheaper but still resource-intensive

---

## 🔄 How These Systems Learn

### Pre-Training
> The model reads enormous amounts of text and learns to **predict the next token**.

- Learns grammar, facts, reasoning patterns, and world knowledge
- Entirely unsupervised — no human labels required
- Results in a powerful but raw "base model"

### Fine-Tuning
> The base model is refined using **human feedback** to be more helpful, harmless, and honest.

- Humans rate model responses for quality and safety
- Techniques like RLHF (Reinforcement Learning from Human Feedback) are used
- Turns a raw language predictor into a useful assistant like Claude

---

## 🪟 Key Concepts

### Context Window
> The **context window** is the amount of text (input + output) the model can "see" at one time.

| Concept | What It Means |
|---|---|
| 📥 **Input** | Everything you send to Claude (your prompt, documents, history) |
| 📤 **Output** | Claude's response |
| 🪟 **Context window** | The total token limit for input + output combined |

- Larger context windows = Claude can handle longer documents and conversations
- Once the limit is reached, earlier parts of the conversation may be forgotten

### Emergent Capabilities
> **Emergent capabilities** are abilities that appear in large models that were never explicitly trained for.

- As models scale up in size and training data, unexpected skills emerge
- Examples: multi-step reasoning, coding ability, analogical thinking
- These capabilities are not fully understood — even by the researchers who built the models

---

## 📝 My Key Takeaways

- [x] Generative AI *creates* new content — it doesn't just classify existing data
- [x] LLMs like Claude are powered by the transformer architecture (2017 breakthrough)
- [x] Training = pre-training on massive text data + fine-tuning with human feedback
- [x] The context window defines how much Claude can "see" in one conversation
- [x] Emergent capabilities are surprising abilities that appear as models scale up
- [x] Three ingredients made modern LLMs possible: algorithms + data + compute

---

## 💬 Feedback

As you progress through the course, the authors would love to hear how you are using concepts from the course in your life, work, or classes.

👉 [Share your feedback here](https://anthropic.com)

---

## 📜 Acknowledgments & License

Copyright 2025 **Rick Dakan**, **Joseph Feller**, and **Anthropic**.
Released under the [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/) license.

This course is based on **The AI Fluency Framework** by Dakan and Feller.
Supported in part by the **Higher Education Authority, Ireland**, through the National Forum for the Enhancement of Teaching and Learning.

---

## 🔗 Related Modules

- 📘 [Why Do We Need AI Fluency?](../Introduction/IntroductionAInfluency.md)
- 📘 [The 4D Framework](../4DAIFluency/4D.md)
- 📘 [How to Use AI Fluency](../HowToUseAIFluency/HowToUseAIFluency.md)
- 📄 [AI Fluency Vocabulary Cheat Sheet](../Introduction/Ressources/AI_Fluency_vocabulary_cheat_sheet.pdf)
