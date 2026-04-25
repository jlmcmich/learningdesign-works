---
title: VibeCheck
description: A privacy-first platform that collects student reflections on assignments and generates AI-powered Learning Insights Reports, helping instructors see where goals and experiences align or diverge.
pubDate: 2025-01-01
year: 2025
status: Active
role: Creator & Developer
organization: The College of Liberal Arts and Sciences, ASU
tags:
  - AI in Education
  - Learning Analytics
  - EdTech Development
order: 1
externalLinks:
  - label: "ET AI Day Presentation — \"AI & The New Economy of Trust\" (with Kyle Jensen)"
    href: "https://docs.google.com/presentation/d/1AuFkO89-iG0U0VNyhDdekc-J-oym5xnAXVxi9hr5ajw/edit?usp=sharing"
  - label: GitHub Repository
    href: "https://github.com/jlmcmich/vibecheck-lite"
---

VibeCheck is a platform I designed and built to create a safe, low-stakes space for students to reflect on assignments while giving instructors meaningful, aggregated insights about student learning experiences.

## The Problem

Instructors design assignments with specific learning goals, but rarely have a structured way to understand whether students experienced the assignment as intended. Traditional course evaluations are too infrequent and too broad. VibeCheck closes that gap by creating a lightweight feedback loop tied to individual assignments.

## How It Works

1. **Instructor Intentions** — As they finalize an assignment, instructors archive their intended learning goals. Takes less than 3 minutes.
2. **Student Reflection** — Students record brief reflections as they submit the assignment. Takes less than 2 minutes. All responses are anonymized and aggregated.
3. **Learning Insights Report** — Student data is aggregated and analyzed against instructor expectations, producing an actionable report on alignment, performance themes, and areas to address.
4. **Institutional Trend Analysis** — Raw data is stored for cross-course, longitudinal, and institutional analysis, tracking macro changes in learning and student experiences over time.

## Design Philosophy

VibeCheck is grounded in **Situated Learning** and the idea that trust is a prerequisite for collective learning. The tool scaffolds trust through:

- **Mutual engagement** — Instructors and students reflect on the same elements (task, goals, strategies, AI use)
- **Joint enterprise** — A low-stakes way to ensure course goals and intended experiences are shared
- **Shared repertoire** — A common tool and mutual reflection process producing actionable insights

By protecting anonymity, VibeCheck encourages honest communication and gives instructors timely insights into how their expectations align with student experiences — opening space for dialogue and iteration.

## Technical Stack

- **Backend**: Python/Flask with Google Cloud Run
- **Frontend**: React
- **Data**: Google Sheets (privacy-first — student identities and responses are never stored together)
- **AI**: LLM-powered insight generation for Learning Insights Reports
