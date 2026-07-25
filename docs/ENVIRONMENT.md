# ENVIRONMENT.md — AI Bug Investigator

**Status:** Day 3 · v1.0

---

## 1. Environment Variables

Defined in `server/.env` (not committed to Git). A template with no real values lives in `server/.env.example` (committed).

| Variable | Required | Example / Default | Description |
|---|---|---|---|
| `PORT` | No | `5000` | Port the Express server listens on locally. Render assigns this dynamically in production (see Day 8 deployment notes) — the code reads `process.env.PORT` with a fallback to `5000` for local dev. |
| `GROQ_API_KEY` | Yes (from Day 4 onward) | *(secret — never commit)* | Authenticates requests to the Groq API. Used in `services/groqService.js`, built Day 4. |

### `.env.example` (safe to commit, no real values)
```
PORT=5000
GROQ_API_KEY=your_groq_api_key_here
```

---

## 2. Development Tools & Versions

| Tool | Version confirmed working | Notes |
|---|---|---|
| Node.js | v23.11.0 | Any current LTS or newer is expected to work. |
| npm | 10.9.2 | Bundled with Node. |
| Git | 2.50.1 | |
| VS Code | Latest | Recommended editor. |

---

## 3. VS Code Extensions

| Extension | Publisher | Purpose |
|---|---|---|
| ESLint | Microsoft | Real-time JS error/pattern detection |
| Prettier - Code formatter | Prettier | Consistent code formatting |
| DotENV | mikestead | Syntax highlighting for `.env` files |
| Thunder Client | Ranga Vadhineni | In-editor REST API testing (used Day 4+ for `/api/analyze`) |

---

## 4. Backend Dependencies (`server/package.json`)

| Package | Purpose |
|---|---|
| `express` | Web server framework — defines and handles all `/api/*` routes. |
| `cors` | Allows the frontend (different origin) to call the backend without browser blocking. |
| `dotenv` | Loads `.env` values into `process.env` at runtime. |

No frontend dependencies exist — `client/` is plain HTML/CSS/JS with zero build step, by design (per Day 2 tech stack decision).

---

## 5. Configuration Files

| File | Purpose |
|---|---|
| `server/package.json` | Backend dependency list + npm scripts (`start`, `dev`). |
| `server/.env` | Real secrets — local only, gitignored. |
| `server/.env.example` | Template of required variables, committed. |
| `.gitignore` (project root) | Excludes `node_modules/` and `.env` from version control (Node template, confirmed Day 2/3). |

---

## 6. npm Scripts

Defined in `server/package.json`:

```json
"scripts": {
  "start": "node index.js",
  "dev": "node index.js"
}
```

Run with:
```bash
npm start
```

*(Note: `dev` currently runs the same as `start`. Optional upgrade path: install `nodemon` as a dev dependency and update `dev` to `nodemon index.js` for auto-restart on file changes — not required for v1.0, can be added anytime without affecting other files.)*

---

## 7. Future Environment Variables (v2.0 — not needed for v1.0)

Documented here for forward planning only, per the Day 2 future-ready notes:

| Variable | Purpose (v2.0) |
|---|---|
| `MONGODB_URI` | Connection string for the planned v2.0 MongoDB database. |
| `JWT_SECRET` | Signing secret for JWT-based authentication. |