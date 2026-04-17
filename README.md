# Velorah

> *An interactive, cinematic data story about 97,000 Indian Codeforces users.*

**Live →** [codeforces-analytics-website.vercel.app](https://codeforces-analytics-website.vercel.app/)

---

## Overview

Velorah transforms a dataset of ~97,000 Indian Codeforces users into a chapter-based, cinematic data storytelling experience. Rather than presenting raw charts on a static dashboard, it frames the rise of competitive programming in India as a narrative — one with a beginning, an arc, and a payoff. Built on a dark, glassmorphic aesthetic with fluid animations and immersive transitions, Velorah answers questions that matter: Who are India's competitive programmers? Where are they from? How have they grown? And how does behaviour differ across skill levels? The result is a portfolio-grade project that sits at the intersection of data engineering, visual design, and storytelling.

---

## What It Does and Why It Matters

Competitive programming in India has grown dramatically — yet that growth is rarely visualised in a way that feels compelling or accessible. Velorah bridges that gap. It takes data sourced from the Codeforces API, processes it through a Python analytics pipeline, stores behavioural records in MongoDB, and surfaces everything through a Next.js frontend that guides users through nine analytical chapters.

The story it tells is real: most Indian users cluster in the 800–1200 rating band, Newbies form the vast majority of the community, growth surged sharply after 2020, Hyderabad leads all cities in participation, and higher-rated users solve harder problems, compete more frequently, and show measurably different behavioural signatures. Velorah makes all of this visible — and visceral.

---

## Application Structure

The app is organised into three distinct areas:

**Landing Page** — A cinematic entry point that introduces the scale of the dataset and invites the user into the story. Sets the tone with animated text, ambient visuals, and a clear call to begin the analysis journey.

**Analysis Page** — The core of Velorah. A nine-chapter scrollable experience that moves from high-level participation trends down to granular behavioural analysis. Each chapter is a self-contained visual narrative built around a specific question about Indian competitive programming.

**About Page** — Context on the project's motivation, data sourcing methodology, and the pipeline that powers the analysis.

---

## The Nine-Chapter Journey

### Chapters 1–4 · Precomputed Analysis
*Derived from the cleaned CSV dataset and offline notebook; rendered statically on the frontend.*

| # | Chapter | Core Insight |
|---|---------|-------------|
| 1 | **The Scale of India's Codeforces Presence** | ~97,000 registered Indian users — a community large enough to study at population scale. |
| 2 | **Rating Distribution** | Participation is heavily concentrated in the 800–1200 range. The distribution is right-skewed: as rating climbs, users become exponentially rarer. |
| 3 | **Rank Breakdown** | Newbies constitute the clear majority. Specialist, Expert, and above are progressively smaller fractions. Master and Grandmaster are vanishingly rare. |
| 4 | **Growth Over Time** | Indian participation on Codeforces grew steadily through the 2010s, then accelerated sharply after 2020 — reflecting the broader expansion of competitive programming culture in India. |

### Chapters 5–9 · Live Behavioural Analysis
*Fetched at runtime from MongoDB via the Express API; reflects the full behavioural dataset.*

| # | Chapter | Core Insight |
|---|---------|-------------|
| 5 | **City-Level Participation** | Hyderabad leads all Indian cities in Codeforces participation, followed by other major tech hubs. Geography and opportunity are tightly correlated. |
| 6 | **Problem Difficulty by Rank** | Higher-rated users attempt and solve significantly harder problems. The difficulty curve across ranks is steep and consistent. |
| 7 | **Contest Frequency by Rank** | More skilled users contest more. The relationship between rank and contest count is strong, suggesting that volume of practice is a driver — not just a consequence — of rating. |
| 8 | **Performance Correlations & 3D Space** | A three-dimensional view of problems solved, contests entered, and rating achieved reveals distinct clusters. High performers occupy a separate region of the behavioural space entirely. |
| 9 | **Skill Profiles by Rank** | Radar/spider charts surface the multi-dimensional signature of each rank group — combining difficulty preference, contest frequency, problem volume, and rating into a single comparative profile. |

---

## Tech Stack

**Frontend**
- [Next.js](https://nextjs.org/) — React framework with file-based routing and SSR
- [React](https://react.dev/) — Component model
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first styling; dark glassmorphic design system
- [Framer Motion](https://www.framer.com/motion/) — Page transitions, scroll animations, cinematic reveals
- [Recharts](https://recharts.org/) — 2D charts (distributions, time series, bar charts, radar)
- [Three.js](https://threejs.org/) — 3D performance space visualisation in Chapter 8

**Backend**
- [Express](https://expressjs.com/) — Lightweight REST API server
- [MongoDB](https://www.mongodb.com/) + [Mongoose](https://mongoosejs.com/) — Behavioural data storage and querying

**Data Source**
- [Codeforces API](https://codeforces.com/apiHelp) — User profiles, ratings, and submission history

---

## Data Pipeline

```
Codeforces API
      │
      ▼
Python ingestion & cleaning
      │
      ├──► Cleaned CSV  ──► Offline notebook analysis ──► Precomputed charts (Ch. 1–4)
      │
      └──► Behavioural records ──► MongoDB ──► Express API ──► Live charts (Ch. 5–9)
```

Raw user data is fetched from the Codeforces API, cleaned, and split into two outputs. Aggregate statistics (rating distributions, rank breakdowns, growth trends) are computed offline in a Jupyter notebook and baked into the frontend as precomputed data. Individual behavioural records — problem difficulty, contest frequency, performance metrics — are stored in MongoDB and served live through the API at request time.

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/behaviours` | Returns the full behavioural dataset for all analysed users |
| `GET` | `/api/behaviours/summary` | Returns aggregated behavioural statistics grouped by rank |
| `GET` | `/api/health` | Health check — confirms API and database connectivity |

---

## Deployment

Velorah is fully deployed and live.

**→ [codeforces-analytics-website.vercel.app](https://codeforces-analytics-website.vercel.app/)**

Frontend hosted on Vercel. Backend and MongoDB hosted separately; the frontend communicates with the API at runtime for all Chapter 5–9 data.

---

*Built with the conviction that data, told well, is more persuasive than data alone.*
