# PROJECT-STRUCTURE.md — AI Bug Investigator

**Status:** Approved Day 2 · v1.0

---

## 1. Folder Tree

```
ai-bug-investigator/
├── client/
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   ├── favicon.ico
│   └── assets/
│       └── (icons, logo mark, etc. if needed)
│
├── server/
│   ├── index.js                    # Express app entry point, mounts routes + error handler
│   ├── package.json
│   ├── .env                        # not committed (in .gitignore)
│   ├── .env.example
│   ├── routes/
│   │   ├── health.js               # GET /api/health
│   │   └── analyze.js              # POST /api/analyze
│   ├── services/
│   │   └── groqService.js          # Groq API call + prompt template
│   ├── middleware/
│   │   └── errorHandler.js         # centralized error handling (Day 2 addition)
│   └── utils/
│       └── parseAIResponse.js      # safe JSON parsing/validation
│
├── docs/
│   ├── ARCHITECTURE.md
│   ├── SCHEMA.md
│   ├── API.md
│   ├── UI-WIREFRAMES.md
│   ├── PROJECT-STRUCTURE.md
│   └── IMPLEMENTATION-BLUEPRINT.md (updated Day 2)
│
├── .gitignore
└── README.md
```

---

## 2. Responsibility of Each Major Folder

| Folder | Responsibility |
|---|---|
| `client/` | Everything shipped to the browser via Vercel — markup, styling, and all frontend logic (form handling, rendering, localStorage, share-link encode/decode, sidebar toggle/drawer). No build step — deploys as-is. |
| `server/routes/` | Thin route handlers only — receive the request, call the right service, pass errors to `next()`. No business logic lives directly in route files. |
| `server/services/` | Where actual logic lives. Currently only the Groq integration (`groqService.js`), but this is where any future integration would go without touching route files. |
| `server/middleware/` | Cross-cutting concerns. Currently just centralized error handling (`errorHandler.js`) — this is also where JWT auth middleware would slot in for v2.0 without restructuring anything. |
| `server/utils/` | Small, pure helper functions (like safe JSON parsing) that don't belong to a specific route or service. |
| `docs/` | All planning and design deliverables from Day 1 and Day 2 — keeps documentation versioned alongside code instead of scattered across chat history. |

---

## 3. Where Future Code Will Live

The structure is deliberately left open for v2.0 additions without requiring reorganization:

| Future need (v2.0) | Where it would go |
|---|---|
| MongoDB models (`users`, `analyses`) | New `server/models/` folder |
| JWT authentication | New `server/middleware/auth.js`, alongside `errorHandler.js` |
| Route logic growing complex | New `server/controllers/` folder, called from thin `routes/` files |
| Environment-specific config | New `server/config/` folder |
| Additional frontend pages (e.g., login, dashboard) | New files under `client/`, or a framework migration if complexity grows significantly — a decision explicitly deferred past v1.0 |

---

## 4. Why This Structure Was Chosen

- **Mirrors the architecture diagram** — routes, services, middleware, and utils map 1:1 to the component responsibilities defined in `ARCHITECTURE.md`, so the code structure and the design documentation stay consistent.
- **Conventional Express layout** — instantly recognizable to any reviewer, recruiter, or collaborator familiar with Node/Express projects; no custom conventions to learn.
- **No unnecessary abstraction for v1.0** — no `controllers/`, `models/`, or `config/` folders are created today, since v1.0's logic is simple enough that routes → services → utils is sufficient. Adding empty scaffolding now would be premature structure for a stateless, no-auth app.
- **Future-ready without present-day complexity** — v2.0 additions (models, auth middleware, controllers) have an obvious, non-disruptive home already implied by the existing pattern, so scaling up later doesn't require restructuring what's already built.
- **`docs/` versioned with code** — keeps the PRD, blueprint, and today's five design documents alongside the implementation, so anyone (including a future AI conversation continuing this project) can find full context in the repository itself, not just in chat history.
