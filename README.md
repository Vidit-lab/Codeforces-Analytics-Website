<div align="center">

# 🌌 Velorah

### *India's competitive programming story — told cinematically.*

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-Visit_Velorah-6366f1?style=for-the-badge)](https://codeforces-analytics-website.vercel.app/)
[![Dataset](https://img.shields.io/badge/📊_Dataset-~97K_Users-10b981?style=for-the-badge)]()
[![Chapters](https://img.shields.io/badge/📖_Chapters-9_Deep_Dives-f59e0b?style=for-the-badge)]()

</div>

---

## 🎬 What is Velorah?

Velorah turns a dataset of **~97,000 Indian Codeforces users** into a cinematic, chapter-based data storytelling experience. It's not a dashboard — it's a narrative. Dark glassmorphic visuals, fluid animations, and immersive scroll transitions guide you through the rise of competitive programming in India: who's competing, where they're from, how the community has exploded, and what separates beginners from experts at a behavioural level.

> *Data, told well, is more persuasive than data alone.*

---

## 🗺️ Three Spaces, One Story

| 🏠 Landing Page | 📊 Analysis Page | 👤 About Page |
|:---:|:---:|:---:|
| Cinematic entry point | The 9-chapter core journey | Project context & methodology |
| Animated intro, ambient visuals | Scroll-driven narrative with live & precomputed charts | Data sourcing & pipeline story |
| Sets the mood, invites exploration | Static + live data, seamlessly blended | The "why" behind Velorah |

---

## 📖 The 9-Chapter Journey

### 🗂️ Chapters 1–4 — Precomputed Analysis
> *Derived offline from the cleaned CSV dataset & Jupyter notebook. Baked into the frontend for instant render.*

---

**Chapter 1 · 🌏 The Scale of India's Presence**

~97,000 registered Indian users on Codeforces — a community large enough to study at population scale. This chapter opens the story with the sheer size of what we're looking at.

---

**Chapter 2 · 📈 Rating Distribution**

The distribution is steeply right-skewed. The **800–1200 rating band** is where the overwhelming majority of Indian users live. As rating climbs, users become exponentially rarer — a sharp reminder of how hard it is to break through.

---

**Chapter 3 · 🏅 Rank Breakdown**

**Newbies dominate.** Specialists, Experts, and above are progressively smaller fractions. Masters and Grandmasters are vanishingly rare. The rank pyramid is steep — and this chapter makes that viscerally clear.

---

**Chapter 4 · 🚀 Growth Over Time**

Indian participation grew steadily through the 2010s — then **accelerated sharply after 2020**, reflecting the explosive growth of competitive programming culture fuelled by online education and community platforms. The inflection point is unmistakable.

---

### ⚡ Chapters 5–9 — Live Behavioural Analysis
> *Fetched at runtime from MongoDB via the Express API. Reflects real behavioural patterns across skill levels.*

---

**Chapter 5 · 🏙️ City-Level Participation**

**Hyderabad leads all Indian cities** in Codeforces participation. Geography and opportunity are tightly correlated — the map of competitive programming mirrors the map of India's tech ecosystem.

---

**Chapter 6 · 🧩 Problem Difficulty by Rank**

Higher-rated users attempt and solve significantly harder problems. The difficulty curve across ranks is steep, consistent, and unforgiving. This chapter charts exactly where that gap opens up.

---

**Chapter 7 · 🏆 Contest Frequency by Rank**

More skilled users contest more — a lot more. Volume of practice isn't just a consequence of rating; it appears to be a driver. The relationship is strong and consistent across all rank groups.

---

**Chapter 8 · 🌐 3D Performance Space**

Problems solved × contests entered × rating achieved — rendered as a three-dimensional scatter plot using **Three.js**. High performers cluster in a region of behavioural space that lower-rated users simply don't reach. Correlation and separation in one view.

---

**Chapter 9 · 🕸️ Skill Profiles by Rank**

Radar charts surface the **multi-dimensional signature** of each rank group — combining difficulty preference, contest frequency, problem volume, and rating into a single comparative profile. The shape of a Grandmaster looks nothing like the shape of a Newbie.

---

## 🔍 The Key Insights

```
📌  Most users cluster in the 800–1200 rating range
📌  Newbies are the majority — higher ranks are genuinely rare
📌  Growth surges sharply after 2020
📌  Hyderabad is India's competitive programming capital
📌  Behaviour differs measurably and consistently across skill levels
```

---

## 🛠️ Tech Stack

### 🎨 Frontend
| Technology | Role |
|---|---|
| ⚛️ **Next.js + React** | Framework, routing, SSR |
| 🎨 **Tailwind CSS** | Dark glassmorphic design system |
| 🎞️ **Framer Motion** | Cinematic scroll animations & transitions |
| 📊 **Recharts** | Rating distributions, time series, radar charts |
| 🌐 **Three.js** | 3D performance space (Chapter 8) |

### 🔧 Backend
| Technology | Role |
|---|---|
| 🚂 **Express** | REST API server |
| 🍃 **MongoDB + Mongoose** | Behavioural data storage & querying |

### 📡 Data Source
| Source | What it provides |
|---|---|
| 🟠 **Codeforces API** | User profiles, ratings, submission history |

---

## 🔄 Data Pipeline

```
         🟠 Codeforces API
                │
                ▼
     🐍 Python ingestion & cleaning
                │
        ┌───────┴────────┐
        ▼                ▼
   📄 Cleaned CSV    📦 Behavioural Records
        │                │
        ▼                ▼
  📓 Jupyter        🍃 MongoDB
     Notebook            │
        │                ▼
        ▼          🚂 Express API
  Precomputed            │
  chart data             ▼
        │          ⚡ Live charts
        ▼            (Ch. 5–9)
  Static charts
   (Ch. 1–4)
```

Aggregate stats — rating distributions, rank breakdowns, growth curves — are computed offline and baked into the frontend. Individual behavioural records are stored in MongoDB and served live at request time.

---

## 🌐 API Endpoints

| Method | Endpoint | Description |
|:---:|---|---|
| `GET` | `/api/behaviours` | Full behavioural dataset for all analysed users |
| `GET` | `/api/behaviours/summary` | Aggregated stats grouped by rank |
| `GET` | `/api/health` | API + database connectivity check |

---

## 🚀 Live Deployment

Velorah is fully deployed and live — no setup needed.

<div align="center">

### 👉 **[codeforces-analytics-website.vercel.app](https://codeforces-analytics-website.vercel.app/)**

*Frontend on Vercel · Backend + MongoDB hosted separately · API served live for Chapters 5–9*

</div>

---

<div align="center">

Made with 🖤 for the Indian competitive programming community.

</div>
