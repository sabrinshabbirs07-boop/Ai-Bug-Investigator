# SETUP.md — AI Bug Investigator

**Status:** Day 3 · v1.0 foundation
**Purpose:** Step-by-step guide to get this project running locally from a clean machine.

---

## 1. Prerequisites

| Tool | Version used | Why it's needed |
|---|---|---|
| [Node.js](https://nodejs.org) | v23.11.0 (any current LTS or newer works) | JavaScript runtime — lets the Express backend run outside the browser. |
| npm | 10.9.2 (bundled with Node) | Installs and manages backend packages (Express, cors, dotenv). |
| [Git](https://git-scm.com) | 2.50.1 | Version control, GitHub connectivity. |
| [VS Code](https://code.visualstudio.com) | Latest | Recommended editor — terminal integration, extension support. |
| A Groq API key | — | Required for AI analysis (used starting Day 4). Get one from the Groq console. |

### Recommended VS Code Extensions
- **ESLint** (Microsoft) — catches JS errors as you type
- **Prettier - Code formatter** (Prettier) — consistent code formatting
- **DotENV** (mikestead) — syntax highlighting for `.env` files
- **Thunder Client** (Ranga Vadhineni) — in-editor API testing (used from Day 4 onward)

---

## 2. Clone the Repository

```bash
git clone https://github.com/sabrinshabbirs07-boop/Ai-Bug-Investigator.git
cd Ai-Bug-Investigator
```

---

## 3. Backend Setup

```bash
cd server
npm install
```

This installs `express`, `cors`, and `dotenv` as listed in `server/package.json`.

### Configure environment variables

1. Copy the example file:
   ```bash
   copy .env.example .env
   ```
   *(On Mac/Linux: `cp .env.example .env`)*
2. Open `.env` and replace the placeholder with your real Groq API key:
   ```
   PORT=5000
   GROQ_API_KEY=your_actual_groq_api_key_here
   ```

See `ENVIRONMENT.md` for full details on every variable.

### Run the backend

```bash
npm start
```

You should see:
```
✅ Server running on http://localhost:5000
```

### Verify the backend

Open a browser to `http://localhost:5000/api/health` — you should see:
```json
{"status":"ok"}
```

---

## 4. Frontend Setup

No installation or build step required — the frontend is plain HTML/CSS/JS.

1. Make sure the backend is running (Step 3 above).
2. Open `client/index.html` directly in your browser (double-click it, or use a "Live Server" VS Code extension if you have one).
3. Click **"Check Backend Connection"** — you should see `✅ Backend says: ok`.

---

## 5. Project Structure Reference

See `PROJECT-STRUCTURE.md` for the full folder tree and the responsibility of each folder.

---

## 6. Git Branching Strategy

- **`main`** — always represents a working, stable state of the project.
- **`dayN-<short-description>`** branches (e.g., `day3-project-setup`) — where each day's work happens, merged into `main` once that day's checklist is verified working.

---

## 7. Common Setup Issues

| Issue | Fix |
|---|---|
| `node -v` / `npm -v` not recognized | Reinstall Node.js from nodejs.org; restart terminal after install. |
| `EADDRINUSE` error when running `npm start` | Port 5000 is already in use — either stop the other process or change `PORT` in `.env`. |
| Frontend button shows "❌ Could not reach backend" | Confirm the backend terminal is still running and shows no errors; confirm `API_BASE` in `client/script.js` matches the backend's actual port. |
| `.env` values not loading | Confirm `require('dotenv').config()` is the very first line executed in `server/index.js`. |