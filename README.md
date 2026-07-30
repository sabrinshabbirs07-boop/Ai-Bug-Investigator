# 🐛 AI Bug Investigator

> **Not just a chatbot. A structured AI debugging assistant that turns confusing errors and stack traces into clear, actionable diagnoses.**

[![Live Demo](https://img.shields.io/badge/Live-Demo-success)](https://ai-bug-investigator.vercel.app)
[![Release](https://img.shields.io/badge/Release-v1.0.0-blue)](https://github.com/sabrinshabbirs07-boop/Ai-Bug-Investigator/releases/tag/v1.0.0)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## 🌐 Live Demo

**Try AI Bug Investigator:**
https://ai-bug-investigator.vercel.app

**GitHub Repository:**
https://github.com/sabrinshabbirs07-boop/Ai-Bug-Investigator

---

## 📌 Overview

**AI Bug Investigator** is an AI-powered debugging assistant designed to help developers understand errors, exceptions, and stack traces.

Instead of returning a generic conversational response, the application analyzes a submitted error and presents the result as a structured debugging report.

The goal is simple:

> **Turn confusing errors into clear explanations and actionable debugging steps.**

---

## 🎯 Problem

Developers frequently encounter error messages and stack traces that are difficult to understand, especially when:

* The error message is unclear
* The stack trace is long
* The root cause is hidden behind multiple calls
* The developer is unfamiliar with the language or framework
* Searching through documentation takes too much time

Traditional debugging often requires jumping between error messages, documentation, search results, and code.

---

## 💡 Solution

AI Bug Investigator provides a focused workflow:

```text
Paste Error / Stack Trace
          ↓
Optional Code Snippet
          ↓
Select / Detect Language
          ↓
AI Analysis
          ↓
Structured Diagnosis
```

The application uses the Groq API to analyze the submitted debugging information and return a structured response.

---

## ✨ Key Features

### 🔍 Structured Error Analysis

The application analyzes errors and presents useful debugging information instead of a generic chat response.

### 🧠 Root Cause Detection

Identifies the likely underlying cause of the reported error.

### 🚦 Severity & Confidence

Provides severity information along with confidence in the diagnosis.

### 🛠️ Debugging Steps

Provides actionable steps that can help investigate and resolve the issue.

### 🔧 Suggested Fix

Provides a practical fix based on the available error and code context.

### 🛡️ Prevention Tips

Highlights ways developers can reduce the chance of encountering similar problems again.

### 🌎 Multi-Language Support

The debugging workflow is designed to work across multiple programming languages through AI-based analysis.

### 📚 Sample Error Library

Users can quickly load example errors to understand how the application works without preparing their own input.

### 🕘 Analysis History

Previous analyses can be accessed through the application's history interface.

### 🔗 Shareable Results

Analysis results can be shared through a dedicated result view.

### ♿ Accessible Interface

The interface includes accessibility-focused considerations to make the debugging workflow easier to use.

### 💻 IDE-Inspired UI

The application uses a developer-focused interface designed around common debugging workflows.

---

## 🖼️ Screenshots

### Empty State

The initial interface where users can enter an error or stack trace.

![AI Bug Investigator Empty State](docs/screenshots/empty-state.jpeg)

### Analysis Result

A completed AI debugging analysis showing the structured diagnosis.

![AI Bug Investigator Analysis Result](docs/screenshots/analysis-result.jpeg)

---

## 🏗️ Architecture

The application follows a lightweight full-stack architecture:

```text
┌─────────────────────────────┐
│        Client / Browser     │
│   HTML + CSS + JavaScript   │
└──────────────┬──────────────┘
               │
               │ HTTP Request
               ▼
┌─────────────────────────────┐
│       Node.js + Express     │
│          Backend            │
└──────────────┬──────────────┘
               │
               │ AI Request
               ▼
┌─────────────────────────────┐
│          Groq API           │
│       AI Model Layer        │
└──────────────┬──────────────┘
               │
               │ Structured Response
               ▼
┌─────────────────────────────┐
│      Analysis Result UI     │
└─────────────────────────────┘
```

The v1.0 architecture is intentionally lightweight and stateless at the backend level, with browser-side storage used for client history.

---

## 🛠️ Tech Stack

### Frontend

* HTML5
* CSS3
* Vanilla JavaScript
* Highlight.js
* Google Fonts

### Backend

* Node.js
* Express.js
* CORS
* dotenv

### AI

* Groq API

### Storage

* Browser localStorage

### Deployment

* Vercel
* Render

### Development

* Git
* GitHub
* VS Code

---

## 📂 Project Structure

```text
Ai-Bug-Investigator/
│
├── client/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── server/
│   ├── routes/
│   ├── services/
│   ├── controllers/
│   ├── middleware/
│   └── utils/
│
├── docs/
│   ├── screenshots/
│   └── summaries/
│       ├── DAY1-SUMMARY.md
│       ├── DAY2-SUMMARY.md
│       ├── DAY3-SUMMARY.md
│       ├── DAY4-SUMMARY.md
│       ├── DAY5-SUMMARY.md
│       ├── DAY6-SUMMARY.md
│       ├── DAY7-SUMMARY.md
│       ├── DAY8-SUMMARY.md
│       ├── DAY9-SUMMARY.md
│       └── DAY10-SUMMARY.md
│
├── future-scope.md
├── challenge-retrospective.md
├── 30-day-growth-plan.md
├── daily-build-prompt.md
├── portfolio-content.md
├── LICENSE
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have installed:

* Node.js
* npm
* Git

You also need a Groq API key for AI analysis.

### 1. Clone the Repository

```bash
git clone https://github.com/sabrinshabbirs07-boop/Ai-Bug-Investigator.git
cd Ai-Bug-Investigator
```

### 2. Install Backend Dependencies

```bash
cd server
npm install
```

### 3. Configure Environment Variables

Create a `.env` file inside the `server` directory:

```env
PORT=5000
GROQ_API_KEY=your_groq_api_key
```

Do not commit your `.env` file to GitHub.

### 4. Start the Backend

```bash
npm start
```

The backend will run on:

```text
http://localhost:5000
```

### 5. Open the Frontend

Open the client application using your local development setup.

---

## 🔌 API

### Health Check

```http
GET /api/health
```

Used to verify that the backend is running.

### Analyze Error

```http
POST /api/analyze
```

The main endpoint used to send debugging information to the AI analysis service.

---

## 🔐 Security & Reliability

The project includes several basic production-focused practices:

* Environment variables for API credentials
* `.env` excluded from Git
* CORS configuration
* Input validation
* Backend error handling
* Separation of frontend and backend responsibilities

---

## 📈 Development Progress

The project was developed as a focused 10-day capstone.

| Day    | Focus                                         |
| ------ | --------------------------------------------- |
| Day 1  | Product Discovery & Sprint Planning           |
| Day 2  | System Design & Architecture                  |
| Day 3  | Project Setup & Foundation                    |
| Day 4  | Core Feature Development                      |
| Day 5  | Continued Feature Development                 |
| Day 6  | MVP Completion & Working Demo                 |
| Day 7  | Testing & Debugging                           |
| Day 8  | Production Optimization                       |
| Day 9  | Release Readiness & Production Launch         |
| Day 10 | Documentation, Graduation & Release Milestone |

Detailed daily summaries are available in [`docs/summaries/`](docs/summaries/).

---

## 🗺️ Future Scope

Potential future improvements include:

### 3-Month Direction

* Persistent analysis history
* Improved language-specific prompt tuning
* User feedback mechanisms
* Additional automated tests
* Improved first-run experience

### 6-Month Direction

* Batch error analysis
* File upload support
* Optional user accounts
* Public API capabilities

### 12-Month Direction

* IDE extension
* CI/CD debugging integration
* Team-level debugging insights
* Aggregated error-pattern analysis

See [`future-scope.md`](future-scope.md) for the complete roadmap.

---

## 📚 Project Documentation

| Document                                                   | Description                              |
| ---------------------------------------------------------- | ---------------------------------------- |
| [`future-scope.md`](future-scope.md)                       | Future product roadmap                   |
| [`challenge-retrospective.md`](challenge-retrospective.md) | 10-day project retrospective             |
| [`30-day-growth-plan.md`](30-day-growth-plan.md)           | Post-capstone development plan           |
| [`daily-build-prompt.md`](daily-build-prompt.md)           | Reusable development prompt              |
| [`portfolio-content.md`](portfolio-content.md)             | Resume, portfolio and interview material |
| [`docs/summaries/`](docs/summaries/)                       | Day 1–10 development summaries           |

---

## 🏆 Release

### v1.0.0

The first official project milestone includes:

* Production-ready AI debugging workflow
* Structured analysis experience
* Documentation overhaul
* Product screenshots
* Portfolio content
* Future development roadmap
* 10-day development summaries
* Official Git tag `v1.0.0`

---

## 📜 License

This project is licensed under the **MIT License**.

See the [`LICENSE`](LICENSE) file for details.

---

## 👨‍💻 Author

**Sabrin Shabbir**

AI Engineer in progress | Full-Stack Developer | AI Builder

---

## ⭐ Project

If you find AI Bug Investigator useful or interesting, consider giving the repository a ⭐ on GitHub.

**Live Demo:**
https://ai-bug-investigator.vercel.app

**GitHub:**
https://github.com/sabrinshabbirs07-boop/Ai-Bug-Investigator
