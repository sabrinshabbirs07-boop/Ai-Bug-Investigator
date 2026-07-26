# AI Bug Investigator — Implementation Blueprint (Days 2, 4–11)

**Updated Day 3** — day numbers have been relabeled to match the actual AB Talks challenge day numbers. The original 10-day blueprint (Days 1–10) is now Days 1–2 + 4–11, because Day 3 (Project Setup & Foundation) was run as its own full challenge day rather than folded into Day 2. No content, scope, or timeline length changed — only the labels. Day 2 also reflects two approved refinements from the Day 2 System Design session: (1) centralized backend error-handling middleware, and (2) a collapsible IDE-style sidebar consolidating the Sample Error Library and History panel. See `docs/ARCHITECTURE.md`, `docs/SCHEMA.md`, `docs/API.md`, `docs/UI-WIREFRAMES.md`, and `docs/PROJECT-STRUCTURE.md` for full Day 2 design detail, and `docs/DAY3-SUMMARY.md` for what was completed on Day 3.

**This document is the single source of truth for the rest of the capstone.** Each day is written so that a fresh AI conversation (or you working solo) can pick it up with zero prior context and continue building without redesigning or re-planning anything. Do not skip ahead or improvise architecture — if you want to change something, update this document first.

## Project Snapshot (carry this into every new AI conversation)

- **Project:** AI Bug Investigator — paste an error/stack trace (+ optional code), get AI-powered root cause, severity + confidence, debugging steps, fix with code, prevention tips, and doc links.
- **Stack:** Node.js + Express backend, vanilla HTML/CSS/JS frontend, Groq API for AI, no database (browser localStorage for history only), no login.
- **Hosting:** Frontend → Vercel. Backend → Render.
- **Design language:** Dark, IDE-inspired "debugging workspace" — analysis cards, severity badges, syntax-highlighted code blocks. Not a chatbot UI.
- **Explicitly out of scope for v1.0:** auth/accounts, database persistence, repo analysis, screenshot/OCR error detection, IDE plugins.
- **Repo name suggestion:** `ai-bug-investigator`

---

## Day 2 — Technical Design & Project Setup ✅ COMPLETED

### 🎯 Objective
Lock in the technical architecture and produce full system design documentation, plus a working, empty full-stack skeleton pushed to GitHub — frontend and backend folders ready for feature work.

### What actually happened Day 2 (summary)
- GitHub repository created (`Ai-Bug-Investigator`), cloned locally, initial `client/`, `server/`, `docs/` structure created.
- Tech stack formally confirmed: vanilla HTML/CSS/JS, Node.js + Express, Groq API, no database/auth in v1.0, Vercel + Render hosting, `dotenv` + `cors` + `highlight.js` (CDN).
- Full system architecture designed and documented (component diagram, data flow, request lifecycle, AI interaction, external services) — see `docs/ARCHITECTURE.md`.
- Confirmed no database is needed for v1.0; three data shapes documented instead (AI response schema, localStorage history record, share-link payload) — see `docs/SCHEMA.md`.
- Full API design completed for both v1.0 endpoints (`GET /api/health`, `POST /api/analyze`) — see `docs/API.md`.
- User flow, screen flow, wireframes, and navigation designed — see `docs/UI-WIREFRAMES.md`.
- Project folder structure finalized — see `docs/PROJECT-STRUCTURE.md`.
- Day 3 readiness check passed — no scope creep, timeline unchanged.

### Two approved refinements (now part of the locked design)
1. **Centralized error-handling middleware** (`server/middleware/errorHandler.js`) — every route passes errors via `next(err)` instead of ad hoc per-route handling. Always returns `{ error: true, message, code }`. Implemented Day 3 (folded into that day's plan below).
2. **Collapsible IDE-style sidebar** — consolidates the Sample Error Library and History panel into a single component: persistent/collapsible on desktop, slide-out drawer on mobile. Replaces the originally separate "History Panel" concept. Implemented Day 6 (folded into that day's plan below).

### 📂 Final files and folders created Day 2
```
ai-bug-investigator/
├── client/
│   └── .gitkeep              (placeholder — real files start Day 4)
├── server/
│   └── .gitkeep              (placeholder — real files start Day 3)
├── docs/
│   ├── ARCHITECTURE.md
│   ├── SCHEMA.md
│   ├── API.md
│   ├── UI-WIREFRAMES.md
│   ├── PROJECT-STRUCTURE.md
│   └── IMPLEMENTATION-BLUEPRINT.md   (this file)
├── .gitignore                 (Node template)
└── README.md
```

### ✅ End-of-day checklist
- [x] GitHub repo created, cloned, initial structure pushed
- [x] Tech stack confirmed and justified against PRD requirements
- [x] System architecture diagrammed (Mermaid) and documented
- [x] Database decision validated against every PRD user story
- [x] Full API design completed for both v1.0 endpoints
- [x] User flow, wireframes, and navigation designed (including sidebar refinement)
- [x] Project folder structure finalized
- [x] Day 3 readiness check passed — no scope creep
- [x] Five design documents generated and committed to `docs/`

### ➡️ Handoff notes for Day 4
All design decisions are locked and documented in `docs/`. Day 3 builds the project foundation — folder scaffolding, environment setup, a working `server/index.js` and `routes/health.js`, plus a frontend skeleton — all now complete. Day 4 builds the real AI-powered backend: `routes/analyze.js`, `services/groqService.js`, and `utils/parseAIResponse.js`, exactly per the folder structure in `docs/PROJECT-STRUCTURE.md` and the API contract in `docs/API.md`. No further design decisions are needed — implementation can start immediately.

---

## Day 3 — Project Setup & Foundation ✅ COMPLETED

### 🎯 Objective
Turn the Day 2 architecture into a real, running project: verified environment, initialized backend and frontend, foundational files in place, Git workflow established, full-stack "Hello World" verified working.

### What actually happened Day 3 (summary)
- Verified environment: Node.js v23.11.0, npm 10.9.2, Git 2.50.1, VS Code + 4 extensions (ESLint, Prettier, DotENV, Thunder Client).
- Backend initialized (`npm init -y`), installed `express`, `cors`, `dotenv`. `.env` / `.env.example` created.
- Built `server/index.js` (Express entry point), `routes/health.js` (`GET /api/health`), `middleware/errorHandler.js` (scaffolded, to be fully exercised Day 4).
- Built frontend skeleton: `client/index.html`, `style.css`, `script.js` with a minimal API client stub, verified end-to-end against the health check.
- Established Git branching strategy (`main` = stable, `dayN-<description>` branches merged in once verified); created `day3-project-setup`, committed, merged to `main`, pushed.
- Verified live folder structure against `docs/PROJECT-STRUCTURE.md` — no drift.
- Generated and committed: `docs/SETUP.md`, `docs/ENVIRONMENT.md`, `docs/DAY3-SUMMARY.md`, updated `docs/PROJECT-STRUCTURE.md`.

### ✅ End-of-day checklist
- [x] Environment verified and all tools confirmed working
- [x] Backend skeleton runs locally, `/api/health` returns `{"status":"ok"}`
- [x] Frontend skeleton verified talking to backend end-to-end
- [x] Git branching strategy established, day's work merged to `main`
- [x] Project structure verified against Day 2 design — no drift
- [x] Four documentation deliverables generated and committed

### ➡️ Handoff notes for Day 4
Backend and frontend scaffolding are both in place and verified working. Empty folders (`routes/`, `services/`, `middleware/`, `utils/`) are ready for Day 4 to fill in `routes/analyze.js`, `services/groqService.js`, and `utils/parseAIResponse.js`. `middleware/errorHandler.js` exists and is wired into `index.js`, ready to catch real errors starting Day 4. No further setup needed — Day 4 begins implementation immediately.

---

## Day 4 — Groq API Integration & Core Prompt Engineering

### 🎯 Objective
Build the backend's core intelligence: a working `/api/analyze` endpoint that sends a structured prompt to Groq and returns clean, structured JSON matching the PRD's required output fields.

### 📖 What I'll learn
- Prompt engineering for structured, reliable JSON output from an LLM
- Backend API design for AI-powered endpoints
- Handling AI provider errors and timeouts gracefully

### 🛠 Features to build
- `GET /api/health` and `POST /api/analyze` endpoints, per `docs/API.md`
- Groq API call with a structured system prompt
- Response parsing into a fixed JSON shape (`docs/SCHEMA.md` Section 1)
- **Centralized error-handling middleware** (Day 2 addition) — all routes funnel errors through it

### 📝 Step-by-step implementation plan
1. Sign up / confirm access to Groq API, get API key into `server/.env` (already scaffolded Day 2).
2. Choose a Groq-hosted model (a fast Llama 3.x model is a good default for this use case — verify current available models in the Groq console when you get here, since offerings change).
3. Confirm the **fixed JSON response schema** the AI must return — this is already locked in `docs/SCHEMA.md` Section 1:
```json
{
  "language": "JavaScript",
  "rootCause": "string",
  "severity": "Critical | High | Medium | Low",
  "confidence": 0-100,
  "debuggingSteps": ["string", "string"],
  "fix": { "explanation": "string", "code": "string" },
  "preventionTips": ["string", "string"],
  "resources": [{ "title": "string", "url": "string" }]
}
```
4. Write the system prompt instructing the model to: act as an expert debugging assistant, always respond in valid JSON matching the schema above exactly, never include prose outside the JSON, infer the language if not provided, and calibrate severity/confidence honestly rather than defaulting to "High/90%" every time.
5. Build `server/index.js` as the Express entry point: enable CORS, JSON body parsing, mount `routes/health.js` and `routes/analyze.js`, and mount `middleware/errorHandler.js` as the **last** middleware in the chain.
6. Implement `routes/health.js` (`GET /api/health` → `{ status: "ok" }`) and `routes/analyze.js` (`POST /api/analyze`): validate `errorMessage` is present, non-empty, and within length limits (per `docs/API.md`); build the prompt (include code snippet and language if provided); call `services/groqService.js`.
7. Implement `services/groqService.js`: builds the prompt, calls the Groq API, returns the raw completion.
8. Implement `utils/parseAIResponse.js`: attempts direct JSON parse of the Groq response; on failure, attempts a regex-based extraction of the JSON block; on further failure, throws a structured error for the error handler to catch.
9. Implement `middleware/errorHandler.js`: a standard Express 4-argument error-handling middleware `(err, req, res, next)` that inspects the error type/status and always responds with `{ error: true, message, code }` per `docs/ARCHITECTURE.md` Section 7. Route handlers call `next(err)` instead of sending their own error responses.
10. Test the endpoint thoroughly using `curl` or Postman/Thunder Client with at least 5 different real error messages across different languages (e.g., JS `TypeError`, Python `IndexError`, Java `NullPointerException`, a C++ segfault description, a generic SQL error).

### 📂 Files and folders to create or modify
```
server/
├── index.js                 (Express entry point, mounts routes + errorHandler)
├── routes/
│   ├── health.js             (new — GET /api/health)
│   └── analyze.js            (new — POST /api/analyze handler)
├── services/
│   └── groqService.js        (new — Groq API call + prompt template)
├── middleware/
│   └── errorHandler.js       (new — Day 2 addition, centralized error handling)
└── utils/
    └── parseAIResponse.js    (new — safe JSON parsing/validation)
```

### 🔗 APIs, libraries, services, or tools to integrate
- Groq API (chat completions endpoint, JSON-oriented prompting)
- Optional: `groq-sdk` npm package, or plain `fetch`/`axios` to Groq's REST endpoint — pick one and use it consistently

### 🧪 Testing tasks
- Test with a clean, well-known error (e.g., `TypeError: Cannot read properties of undefined`) — confirm sensible, structured output.
- Test with a messy/partial stack trace — confirm the endpoint doesn't crash.
- Test with an empty `errorMessage` — confirm a `400` validation error via the error handler, with the exact `{ error: true, message, code }` shape.
- Test with `language: "auto"` vs. an explicitly provided language — confirm both work.
- Temporarily force a Groq failure (e.g., invalid API key) to confirm the error handler returns a clean `5xx` response, not a crash or raw stack trace.
- Time the response — confirm it's within a few seconds for typical input.

### 🐞 Common issues and debugging tips
- **Model responds with prose before/after the JSON:** tighten the system prompt ("Respond with ONLY valid JSON, no explanation, no markdown fences") and rely on the fallback regex extraction in `parseAIResponse.js` as a safety net.
- **Inconsistent field names from the AI:** be explicit and exhaustive about exact key names and types in the prompt; consider giving a one-shot example in the prompt.
- **Groq rate limits or timeouts:** make sure `groqService.js` throws a typed error that `errorHandler.js` maps to `504`/`502` with a clear "AI service temporarily unavailable" message rather than a raw stack trace to the user.
- **API key errors:** double check `.env` is loaded and the key has no trailing whitespace/quotes.
- **Error handler not catching something:** confirm every route uses `next(err)` on failure rather than calling `res.status().json()` directly — mixing the two patterns is the most common cause of an inconsistent error shape.

### ✅ End-of-day checklist
- [ ] `/api/health` and `/api/analyze` both implemented per `docs/API.md`
- [ ] `/api/analyze` returns correctly structured JSON for at least 5 varied real-world errors
- [ ] Centralized `errorHandler.js` catches validation errors, Groq errors, and parse failures — all return the same `{ error: true, message, code }` shape
- [ ] Empty/invalid input handled gracefully with proper HTTP status codes
- [ ] Response schema matches `docs/SCHEMA.md` exactly (locked for the rest of the build)

### 📸 Expected project state and screenshots to capture
- Postman/Thunder Client/curl screenshot showing a successful `/api/analyze` call and full JSON response
- Postman/Thunder Client/curl screenshot showing an error response (e.g., empty `errorMessage`) in the standard error shape
- Terminal logs showing no unhandled errors during testing

### ➡️ Handoff notes for Day 5
Backend intelligence is complete and stable, including centralized error handling. The locked response schema (`docs/SCHEMA.md`) is the contract the frontend will render against — do not change field names without updating that document. Day 4 shifts entirely to frontend: building the real input form and wiring it to this working `/api/analyze` endpoint (basic styling only; full IDE-themed UI polish comes Day 5-6).

---

## Day 5 — Core Frontend: Input Form & Live Analysis Rendering

### 🎯 Objective
Build the real user-facing input form and connect it end-to-end to the working backend, rendering the AI's structured response on screen in basic (not yet fully styled) form. By end of day, the full core loop works in the browser.

### 📖 What I'll learn
- Building accessible, validated forms in vanilla JS
- Rendering dynamic structured data from an API into the DOM
- Basic loading/error states for async UI

### 🛠 Features to build
- Error message textarea (required)
- Optional code snippet textarea
- Language dropdown with "Auto-detect" default
- "Investigate" button with loading state
- Results section rendering all 7 schema fields (language, root cause, severity, confidence, steps, fix, prevention tips, resources) as plain structured HTML (styling comes later)

### 📝 Step-by-step implementation plan
1. Replace the placeholder health-check UI in `client/index.html` with the real form: labeled textarea for error message, labeled textarea for optional code snippet, a `<select>` for language (include ~10-12 common languages + "Auto-detect"), and an "Investigate" button.
2. In `script.js`, add a submit handler: validate error message is non-empty (show inline message if not), disable the button and show a loading indicator, `POST` to `http://localhost:5000/api/analyze` with the form values as JSON.
3. On success, dynamically render a results section below the form with clearly separated blocks for each schema field — root cause, severity + confidence, debugging steps (as an ordered list), fix (explanation + `<pre><code>` block), prevention tips (as a list), and resources (as links).
4. On error (network failure or backend error response), show a clear, human-readable error message instead of a broken UI.
5. Add a "New Analysis" / reset button to clear the form and results.
6. Move the backend base URL into a single constant (e.g., `const API_BASE = "http://localhost:5000"`) so it's a one-line change when deploying later.
7. Manually test the full loop at least 8-10 times with different real errors, including at least one with a code snippet included and one without.

### 📂 Files and folders to create or modify
```
client/
├── index.html      (form + results container markup)
├── script.js        (form handling, fetch call, dynamic rendering)
└── style.css        (minimal functional styling only — not final theme)
```

### 🔗 APIs, libraries, services, or tools to integrate
- Backend `/api/analyze` endpoint (from Day 4), called locally at this stage

### 🧪 Testing tasks
- Submit with empty error field — confirm validation blocks submission with a clear message.
- Submit with only an error message — confirm full result renders correctly.
- Submit with error message + code snippet — confirm the fix/analysis reflects the code context.
- Submit with an explicit language selected vs. "Auto-detect" — confirm both paths work.
- Simulate a backend error (temporarily stop the backend) — confirm the frontend shows a graceful error, not a silent failure or broken layout.

### 🐞 Common issues and debugging tips
- **Results don't update on second submission:** make sure you're clearing/replacing the results container's content each time, not appending.
- **Button gets stuck in loading state:** ensure the loading state is reset in both the success AND error/catch paths.
- **Code block renders raw HTML from AI output:** escape HTML special characters before inserting code into `<pre><code>` to prevent broken rendering (and as a basic safety measure).
- **CORS reappears:** confirm backend CORS config still allows the frontend's origin.

### ✅ End-of-day checklist
- [ ] Full form-to-result loop works end-to-end locally, every field from the schema is visibly rendered
- [ ] Loading and error states both work correctly
- [ ] Tested with at least 8 varied real errors without a crash
- [ ] Code is committed and pushed to GitHub

### 📸 Expected project state and screenshots to capture
- Screenshot of the filled-in form before submission
- Screenshot of a fully rendered analysis result (basic styling)
- Screenshot of the error state (e.g., backend intentionally stopped)

### ➡️ Handoff notes for Day 6
The core product works end-to-end locally, just unstyled. The DOM structure/IDs used for the results section should stay stable, since Day 5-6 will restyle heavily but should not need to change the JS logic much. Day 5 begins the visual design system: dark IDE-inspired theme, typography, layout, and severity badge styling.

---

## Day 6 — Visual Design System: Dark IDE-Inspired Theme

### 🎯 Objective
Transform the functional-but-plain UI into the polished, dark, IDE-inspired "debugging workspace" described in the PRD — establishing a design system (colors, typography, spacing, components) that the rest of the build will reuse consistently.

### 📖 What I'll learn
- Building a small, consistent design system with CSS custom properties
- Practical dark-mode UI design for developer tools
- Component-based CSS thinking without a framework

### 🛠 Features to build
- Global dark theme (CSS variables for colors, spacing, radius, shadows)
- Styled header/workspace layout (like an IDE panel, not a chat window)
- Styled input panel (textareas, dropdown, button)
- Severity badge component (Critical/High/Medium/Low, each with a distinct color)
- Styled analysis result cards

### 📝 Step-by-step implementation plan
1. Define a CSS variables palette at the top of `style.css`: background layers (e.g., `--bg-primary: #0d1117`, `--bg-panel: #161b22`), text colors, accent color (pick one, e.g., a teal or electric blue), and 4 severity colors (e.g., Critical=red, High=orange, Medium=yellow, Low=green).
2. Choose a font pairing: a monospace font (e.g., `"Fira Code", "JetBrains Mono", monospace` via a CDN or system fallback) for code and a clean sans-serif (e.g., `Inter`, or system-ui) for UI text/body copy.
3. Rebuild the page layout as a workspace: a top bar with the app name/logo mark, a left/top input panel styled like a code editor panel (rounded corners, subtle border, panel background distinct from page background), and a results area styled as a set of distinct "cards" (one per schema field group).
4. Build the severity badge as a small reusable component: colored pill/badge showing the severity text, plus the confidence score displayed next to or below it (e.g., a small horizontal bar or percentage text).
5. Style the code blocks: monospace font, dark code background slightly different from the panel background, rounded corners, padding, subtle border.
6. Style buttons and interactive states: hover, active, disabled, and the loading state from Day 4, using the accent color consistently.
7. Add small polish touches: subtle transitions (0.15-0.2s ease) on hover/interactive elements, consistent spacing scale (e.g., 8px base unit), consistent border-radius across cards/inputs/buttons.
8. Do a full pass comparing every screen state (empty, loading, filled, error) against the design system for consistency.

### 📂 Files and folders to create or modify
```
client/
├── style.css     (major rewrite — design system + component styles)
└── index.html    (adjust markup/classes as needed to support new layout)
```

### 🔗 APIs, libraries, services, or tools to integrate
- Google Fonts or similar CDN for the font pairing (e.g., Inter + JetBrains Mono), or system font stack if you prefer zero external dependencies

### 🧪 Testing tasks
- Visually check all 4 severity badge colors render correctly and are distinguishable (including for common color-blindness types — pair color with the text label, never color alone).
- Check contrast: body text and code text must be clearly readable against dark backgrounds (avoid gray-on-gray).
- Check the layout in both a desktop-width and a narrow browser window (full responsive pass is Day 6, but catch obvious breakage now).
- Click through every interactive state (hover, loading, disabled) to confirm styling applies correctly.

### 🐞 Common issues and debugging tips
- **Severity colors clash with the base theme:** desaturate the base palette slightly so the 4 severity colors stand out as clear signal colors.
- **Monospace font not loading:** confirm the CDN `<link>` is correctly placed in `<head>` and the `font-family` fallback chain includes a safe system monospace font.
- **Low contrast text:** test actual hex values, don't eyeball it — aim for at least 4.5:1 contrast ratio for body text.
- **Layout shifts when loading state appears:** reserve space for the loading indicator so the layout doesn't jump.

### ✅ End-of-day checklist
- [ ] Consistent dark theme applied across the entire app via CSS variables
- [ ] Severity badges implemented with distinct colors + text labels
- [ ] Code blocks styled with monospace font and clear visual separation
- [ ] All interactive states (hover/loading/disabled/error) visually polished
- [ ] Code committed and pushed to GitHub

### 📸 Expected project state and screenshots to capture
- Full-page screenshot of the empty state (form only)
- Full-page screenshot of a completed analysis result showing all card types and a severity badge
- Close-up screenshot of the severity badge component in at least 2 different severity levels

### ➡️ Handoff notes for Day 7
The core visual design system is locked (colors, fonts, spacing, component styles). Day 6 builds the remaining "wow" features (sample error library, copy-to-clipboard, shareable results) using this same design system, and does the full responsive/mobile pass. Do not introduce new colors or fonts on Day 6 — reuse the system established today.

---

## Day 7 — Wow Features: Sample Library, Copy, Share & Responsive Pass

### 🎯 Objective
Add the differentiating "wow" features from the PRD and make the entire app fully responsive across desktop and mobile, using the design system from Day 5.

### 📖 What I'll learn
- Designing small delightful UX details that make a tool feel polished
- Client-side "share" patterns without a backend database
- Practical responsive design techniques (flexbox/grid, breakpoints)

### 🛠 Features to build
- **Collapsible IDE-style sidebar** (Day 2 refinement) containing the Sample Error Library and History — persistent/collapsible on desktop, slide-out drawer on mobile
- Sample error library (5-8 pre-written realistic errors, clickable to instantly populate the form)
- One-click "Copy fix" button with visual confirmation (e.g., "Copied!" toast/label change)
- Shareable analysis results (see implementation note below)
- Local history, living inside the sidebar (localStorage-backed list of recent analyses, click to reopen)
- Full responsive layout for mobile and tablet widths

### 📝 Step-by-step implementation plan
1. **Build the sidebar shell first:** per `docs/UI-WIREFRAMES.md` Section 4, build a single sidebar component with two sections — "Samples" and "History." On desktop, it's a persistent left panel with a collapse/expand toggle (`◂`/`▸`). On mobile, the same markup is repositioned as a slide-out drawer triggered by a hamburger (`☰`) icon in the top bar, closed via an `✕` icon or an outside-tap handler.
2. **Sample error library:** create a small JS array of 6-8 realistic sample errors (mix of languages: JS `TypeError`, Python `KeyError`, Java `NullPointerException`, a React state error, a Node async/await error, a basic SQL syntax error, etc.), each with `errorMessage`, optional `codeSnippet`, and `language`. Render these inside the sidebar's "Samples" section as a clickable list; clicking one populates the form fields (does not auto-submit — let the user click Investigate themselves).
3. **Copy fix button:** add a small copy icon/button next to the fix code block. On click, use `navigator.clipboard.writeText()` to copy the fix code, and briefly change the button label/icon to a confirmation state ("Copied ✓") for ~1.5 seconds before reverting.
4. **Shareable results (no backend/database — keep v1.0 simple):** implement this as **URL-encoded state sharing**, using the compact key shape documented in `docs/SCHEMA.md` Section 3 — when a user clicks "Share," serialize the current analysis result to that shortened-key JSON, base64-encode it, and append it as a URL query parameter (e.g., `?result=<encoded>`); on page load, check for this parameter and if present, decode and render that result directly (read-only view) instead of showing the empty form. Copy this generated URL to the clipboard with a confirmation message.
5. **History, inside the sidebar:** on every successful analysis, save a compact record (per `docs/SCHEMA.md` Section 2: id, timestamp, error snippet, language, severity, full result) to `localStorage` under a single key (e.g., `bugInvestigatorHistory`), capped at the most recent 10-15 entries. Render these inside the sidebar's "History" section, where clicking an entry re-renders that stored result using `fullResult` (no re-fetch needed). Add a "Clear history" action.
6. **Responsive pass:** convert any fixed-width layouts to flexible ones (flexbox/CSS grid with `minmax`/`auto-fit`), implement the sidebar's mobile drawer behavior via a breakpoint (e.g., `@media (max-width: 768px)`), ensure touch targets (buttons, hamburger icon) are large enough on mobile, and confirm text doesn't overflow small screens.
7. Test the entire app on a narrow simulated mobile viewport (browser dev tools device toolbar) end-to-end: open drawer → sample library → form → submit → results → copy → share → history.

### 📂 Files and folders to create or modify
```
client/
├── index.html     (add sidebar shell with Samples + History sections, share/copy buttons markup)
├── script.js       (sample data, sidebar toggle/drawer logic, clipboard logic, URL encode/decode logic, localStorage logic)
└── style.css       (responsive breakpoints, sidebar + drawer styles, chip/list item styles)
```

### 🔗 APIs, libraries, services, or tools to integrate
- Browser `navigator.clipboard` API (copy fix, copy share link)
- Browser `localStorage` API (history)
- `btoa`/`atob` or `encodeURIComponent` + JSON for the share-link encoding scheme

### 🧪 Testing tasks
- Click each sample error and confirm the form populates correctly, then submit and confirm real results.
- Test copy-to-clipboard on the fix code block; confirm the confirmation state appears and reverts.
- Generate a share link, open it in a new tab/incognito window, confirm the shared result renders correctly (and that it degrades gracefully if the encoded parameter is malformed).
- Fill history with several analyses, reload the page, confirm history persists; test "Clear history."
- Resize the browser from desktop down to ~360px width, confirming no horizontal scroll, no overlapping elements, and buttons remain tappable.

### 🐞 Common issues and debugging tips
- **Share URL too long / breaks:** keep the encoded payload minimal (only the fields needed to re-render, not the raw request); consider trimming very long fix code in the shared payload if needed.
- **`navigator.clipboard` fails on non-HTTPS/localhost edge cases:** test in a proper `http://localhost` context; note it will require HTTPS once deployed (Vercel provides this by default).
- **localStorage quota or JSON parse errors on load:** wrap all localStorage reads in try/catch and fall back to an empty history array if corrupted.
- **Responsive layout still overlaps at small widths:** check for any remaining fixed `width`/`min-width` values fighting the flex/grid layout.

### ✅ End-of-day checklist
- [ ] Sample error library implemented and functional
- [ ] Copy-to-clipboard works with clear visual confirmation
- [ ] Shareable link generation and read-only shared view both work correctly
- [ ] Local history panel saves, lists, reopens, and clears entries correctly
- [ ] Full app tested and confirmed responsive at mobile width
- [ ] Code committed and pushed to GitHub

### 📸 Expected project state and screenshots to capture
- Screenshot of the sample error library component
- Screenshot showing the "Copied!" confirmation state
- Screenshot of a shared/read-only result view opened from a generated link
- Mobile-width screenshot of the full app (dev tools device view is fine)

### ➡️ Handoff notes for Day 8
All planned v1.0 features are now functionally complete and running locally, fully styled and responsive. Day 7 is dedicated entirely to structured testing and bug fixing — no new features should be added. Known trouble spots to test hardest: AI JSON parsing edge cases, share-link decoding, and localStorage edge cases.

---

## Day 8 — Structured Testing & Bug Fixing

### 🎯 Objective
Systematically test the entire application, log every bug found, and fix all Critical/High issues before deployment. No new features today — this is a hardening day.

### 📖 What I'll learn
- Writing a lightweight but effective manual test plan
- Triaging bugs by severity (fittingly, using the same Critical/High/Medium/Low scale as the product itself)
- Defensive coding patterns for user input and AI output variability

### 🛠 Features to build
- No new user-facing features. Bug fixes and defensive-coding improvements only.

### 📝 Step-by-step implementation plan
1. Write a simple test plan checklist covering: input validation (empty, extremely long, special characters, non-English text in the error field), all supported languages via the dropdown, auto-detect with ambiguous input, code snippet present vs. absent, sample library entries, copy button, share link (including reloading a shared link, and an intentionally corrupted share link), history panel (add, reopen, clear, persist across reload), and responsive behavior on at least 3 viewport widths.
2. Run through the entire checklist methodically, logging every issue found in a simple `BUGLOG.md` file at the project root with: description, steps to reproduce, severity (Critical/High/Medium/Low), and status (open/fixed).
3. Fix all Critical and High severity bugs first. Re-test each fix in isolation before moving to the next.
4. Specifically stress-test the AI integration: submit unusual or malformed error text, very long stack traces, and non-code text to confirm the backend doesn't crash and the frontend shows a sensible fallback rather than a blank/broken state.
5. Add basic backend input limits (e.g., max character length on `errorMessage`/`codeSnippet`) to protect against abuse and excessive Groq token usage.
6. Do a final visual QA pass: check spacing consistency, font rendering, severity badge colors, and code block formatting across at least 6-8 different result examples.
7. Fix remaining Medium severity bugs if time allows; explicitly document any known Low-severity issues you're consciously deferring past Day 10 (this is normal and expected, not a failure).

### 📂 Files and folders to create or modify
```
├── BUGLOG.md          (new — running list of found/fixed issues)
server/
├── routes/analyze.js   (add input length validation if not already present)
client/
├── script.js            (defensive fixes as needed)
```

### 🔗 APIs, libraries, services, or tools to integrate
- None new — this day is testing/fixing only.

### 🧪 Testing tasks
- Execute the full test plan from step 1 above and log results.
- Specifically re-test the two known-tricky areas flagged Day 6: AI JSON parsing edge cases and share-link decoding.
- Cross-browser spot check if possible (e.g., Chrome + one other browser).

### 🐞 Common issues and debugging tips
- **AI occasionally returns malformed JSON under certain inputs:** revisit the prompt from Day 4, add a stricter instruction and/or a retry-once pattern on parse failure before surfacing an error to the user.
- **Very long stack traces cause slow responses or truncation:** consider trimming extremely long input server-side before sending to Groq, with a note to the user if truncation occurred.
- **Old localStorage entries from earlier days break new history rendering (schema changed since Day 6):** add a version check or defensive parsing so old/malformed entries don't crash the history panel.

### ✅ End-of-day checklist
- [ ] Full test plan executed and logged in `BUGLOG.md`
- [ ] All Critical and High severity bugs fixed and verified
- [ ] Input length limits added on the backend
- [ ] Final visual QA pass completed across multiple result examples
- [ ] Code committed and pushed to GitHub

### 📸 Expected project state and screenshots to capture
- Screenshot or excerpt of `BUGLOG.md` showing tracked and resolved issues
- Screenshot of the app successfully handling a deliberately messy/edge-case input

### ➡️ Handoff notes for Day 9
The application is functionally stable and tested locally. No known Critical/High bugs remain open. Day 8 moves to deployment: getting the backend live on Render and the frontend live on Vercel, and connecting them in production.

---

## Day 9 — Deployment: Backend (Render) & Frontend (Vercel)

### 🎯 Objective
Deploy the backend to Render and the frontend to Vercel, connect them in production, and confirm the full live application works publicly end-to-end.

### 📖 What I'll learn
- Deploying a Node/Express API to Render
- Deploying a static frontend to Vercel
- Managing environment variables and CORS in a production environment
- Debugging cross-origin, production-only issues

### 🛠 Features to build
- No new features — this day is purely deployment and production configuration.

### 📝 Step-by-step implementation plan
1. **Prep for deployment:** confirm `server/package.json` has a proper `start` script (e.g., `"start": "node index.js"`), confirm the server reads `PORT` from `process.env.PORT` (Render assigns this dynamically, don't hardcode 5000 in production), and confirm `.env` is still gitignored.
2. **Deploy backend to Render:** create a new Web Service on Render, connect your GitHub repo, set the root directory to `server/` (if using the monorepo structure above), set the build command (e.g., `npm install`) and start command (`npm start`), and add `GROQ_API_KEY` as an environment variable in Render's dashboard (never in code).
3. Wait for the Render deploy to finish, then test the live backend URL's `/api/health` and `/api/analyze` endpoints directly (via browser or curl/Postman) to confirm they work before touching the frontend.
4. **Update frontend API base URL:** change the `API_BASE` constant in `client/script.js` from `http://localhost:5000` to the live Render URL (e.g., `https://ai-bug-investigator-api.onrender.com`).
5. **Update backend CORS config:** restrict/allow the CORS origin to your soon-to-exist Vercel production URL (you may need to deploy the frontend first to know the exact URL, then update and redeploy the backend — this order is normal).
6. **Deploy frontend to Vercel:** create a new Vercel project, connect the same GitHub repo, set the root directory to `client/` (since it's static HTML/CSS/JS, no build command should be needed — confirm Vercel detects it as a static site), deploy.
7. Once you have the live Vercel URL, go back to Render's environment variables (or a CORS allow-list in code) and update the allowed origin to match exactly, then redeploy the backend if needed.
8. Test the **entire live app** end-to-end at the public Vercel URL: submit a real error, confirm it calls the live Render backend successfully, confirm severity badges/copy/share/history/sample library/responsive layout all still work in production exactly as they did locally.
9. Update `README.md` with the live demo link.

### 📂 Files and folders to create or modify
```
server/
├── package.json     (confirm start script, confirm PORT from env)
client/
├── script.js         (update API_BASE to production URL)
README.md              (add live demo link)
```

### 🔗 APIs, libraries, services, or tools to integrate
- Render (backend hosting)
- Vercel (frontend hosting)
- GitHub (source for both deployments — connect repo to each platform)

### 🧪 Testing tasks
- Confirm live backend health check responds correctly from a browser, not just localhost.
- Confirm a full live analysis request works end-to-end from the deployed frontend.
- Test share links using the live production URL (not localhost) to confirm they resolve correctly for someone else opening the link.
- Test on an actual mobile device if possible, not just dev tools, using the live URL.
- Check Render logs and Vercel deployment logs for any warnings or errors during and after deploy.

### 🐞 Common issues and debugging tips
- **CORS errors only in production, not locally:** the deployed frontend origin differs from `localhost` — make sure the backend's CORS allow-list uses the exact live Vercel URL (including `https://`, no trailing slash mismatch).
- **Render free-tier cold starts:** the first request after inactivity can be slow (10-30+ seconds) as the service spins up — this is expected on Render's free tier; consider adding a loading message that accounts for this possibility.
- **Environment variable not found in production:** confirm it's set directly in Render's dashboard under the service's Environment settings, not just in your local `.env` (which isn't deployed).
- **Vercel serves a blank page:** confirm the root directory setting points to `client/` and that `index.html` is at that path's root, not nested deeper.

### ✅ End-of-day checklist
- [ ] Backend live and responding correctly on Render
- [ ] Frontend live and responding correctly on Vercel
- [ ] Full core flow tested successfully on the live public URL
- [ ] CORS correctly locked to the production frontend origin
- [ ] README updated with the live demo link
- [ ] Code committed and pushed to GitHub

### 📸 Expected project state and screenshots to capture
- Render dashboard showing the live, successfully deployed backend service
- Vercel dashboard showing the live, successfully deployed frontend project
- Screenshot of the full live app working end-to-end at its public URL

### ➡️ Handoff notes for Day 10
The application is fully live and publicly accessible. Both the Render backend URL and Vercel frontend URL should be recorded in the README. Day 9 focuses on final polish, performance/edge-case checks against the live (not local) environment, and preparing all portfolio/presentation materials.

---

## Day 10 — Final Polish, Live QA & Portfolio Prep

### 🎯 Objective
Polish the live product to a truly presentable state, do a final full QA pass against the live URLs (not localhost), and prepare all supporting portfolio materials (README, screenshots, demo script) ahead of Day 10's final presentation/showcase.

### 📖 What I'll learn
- Final-mile product polish and attention to detail
- Writing a strong project README for a portfolio/recruiter audience
- Preparing a live product demo

### 🛠 Features to build
- No major new features. Small polish items only, prioritized by impact (e.g., empty states, favicon, page title/meta tags, minor copywriting improvements).

### 📝 Step-by-step implementation plan
1. Do a full live-site walkthrough exactly as a first-time visitor would: is it immediately clear what the tool does? Is the empty state inviting (not blank/confusing)? Add a short subtitle/tagline and a hint pointing to the sample error library if this isn't already obvious.
2. Add finishing touches: a proper page `<title>`, a simple favicon, meta description (basic SEO/shareability), and confirm the app doesn't show any placeholder text ("Lorem ipsum", "TODO", console.logs left in from debugging).
3. Re-run the Day 7 test plan against the **live production URLs** end-to-end (not local) — production environments occasionally surface issues local testing didn't (timing, cold starts, real network latency).
4. Fix any final Medium-severity issues discovered; do not start new features at this stage.
5. Write/finalize `README.md` with: project name and one-line pitch, problem statement, live demo link, screenshot(s), feature list, tech stack, how it works (brief architecture summary), and clear "Future Scope" section matching the PRD.
6. Prepare a short (60-90 second) live demo script/talking path for Day 11: which sample error to show, what to point out (severity + confidence, structured fix, copy/share), and the one-sentence problem/solution framing to open with.
7. Capture final polished screenshots of: landing/empty state, a completed analysis, the severity badge close-up, and the mobile view — these will be reused in the pitch deck and README.
8. Tag/commit this state clearly in Git (e.g., a `v1.0` commit message or Git tag) marking it as the capstone-complete version.

### 📂 Files and folders to create or modify
```
README.md                 (finalized, portfolio-ready)
client/index.html          (title, favicon, meta description)
client/favicon.ico         (new, simple)
```

### 🔗 APIs, libraries, services, or tools to integrate
- None new.

### 🧪 Testing tasks
- Full end-to-end test plan re-run on the live URLs only.
- Confirm no leftover debug `console.log` statements or placeholder text remain anywhere in the live app.
- Have one other person (friend, classmate) try the live link cold, with zero explanation, and watch where they get confused, if anywhere.
- Time yourself running through the planned demo script to keep it under ~90 seconds.

### 🐞 Common issues and debugging tips
- **Favicon doesn't show up:** confirm the `<link rel="icon">` path is correct relative to the deployed root and redeploy — favicons are sometimes aggressively cached, so hard-refresh when checking.
- **README screenshots look inconsistent:** capture all screenshots in the same browser window size for a cohesive look.
- **Live demo feels slow live:** if Render's cold start is a risk during your actual demo, "warm up" the backend by hitting the health check a minute or two before presenting.

### ✅ End-of-day checklist
- [ ] Live site walkthrough completed with no confusing first-time-user moments
- [ ] Title, favicon, meta description added
- [ ] Full test plan re-verified on live production URLs
- [ ] README finalized and portfolio-ready
- [ ] Demo script written and rehearsed
- [ ] Final screenshots captured for reuse in the pitch deck
- [ ] `v1.0` commit/tag pushed to GitHub

### 📸 Expected project state and screenshots to capture
- Final polished landing/empty state
- Final polished completed-analysis view
- Final README as rendered on GitHub

### ➡️ Handoff notes for Day 11
The product is complete, deployed, tested live, and documented. Day 10 is presentation and wrap-up only — no further building. All materials needed (screenshots, live link, demo script, README, PRD, this blueprint, and the pitch deck) should already exist by the start of Day 10.

---

## Day 11 — Launch Day: Final Showcase & Wrap-Up

### 🎯 Objective
Deliver a confident final presentation of the live, deployed AI Bug Investigator, and formally close out the capstone with all deliverables in place.

### 📖 What I'll learn
- Presenting a technical product clearly to a non-technical or mixed audience
- Reflecting on and articulating technical decisions and trade-offs (great interview practice)

### 🛠 Features to build
- None. Day 10 is presentation, reflection, and light final cleanup only.

### 📝 Step-by-step implementation plan
1. Do one final smoke test of the live URL first thing in the day (confirm Render hasn't broken from inactivity, confirm Groq API key/quota is still valid).
2. Review the Day 9 demo script once more; adjust wording if needed based on any final changes.
3. Deliver the live demo using the rehearsed script: open with the problem statement, show the live app solving a real sample error, highlight the severity/confidence indicator and structured fix as the key differentiators, briefly mention the tech stack and what's intentionally out of scope for v1.0 (framed as roadmap, not limitation).
4. Present the Pitch Deck (generated today, Day 1) alongside or before the live demo as framing.
5. Be ready to answer likely questions: "Why Groq over other providers?", "Why no database/login in v1.0?", "What was the hardest bug you fixed?", "What would you build next?" — use the PRD's Future Scope and this blueprint's bug log as honest, specific answers.
6. After presenting, do a short personal retrospective: what went well, what you'd do differently, and update the README's Future Scope section if new ideas came up during the presentation/Q&A.
7. Make a final commit confirming the repository, README, and live links are all in their finished, presentable state.

### 📂 Files and folders to create or modify
```
README.md   (final touch-ups only, if anything came up during presentation prep)
```

### 🔗 APIs, libraries, services, or tools to integrate
- None new.

### 🧪 Testing tasks
- Final smoke test of the live URL before presenting.
- Dry run of the full demo script at least once, timed.

### 🐞 Common issues and debugging tips
- **Live demo fails unexpectedly during presentation:** always have 2-3 pre-captured screenshots/a short screen recording as a fallback if live internet/hosting has an issue during the actual presentation.
- **Render cold start during the live demo:** warm up the backend a few minutes before presenting, as noted on Day 9.

### ✅ End-of-day checklist
- [ ] Live smoke test passed on presentation day
- [ ] Demo delivered successfully
- [ ] Pitch deck presented
- [ ] Q&A handled using PRD/blueprint as reference material
- [ ] Final commit pushed; repository, README, and live links all finalized
- [ ] Capstone complete 🎉

### 📸 Expected project state and screenshots to capture
- Screenshot/recording of the final live demo, if possible, for future portfolio use

### ➡️ Handoff notes
Capstone complete. AI Bug Investigator is live, deployed, tested, and documented as a v1.0 product. All Future Scope items are captured in the PRD and README for anyone (including a future version of yourself) picking this project back up.