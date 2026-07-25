# ARCHITECTURE.md — AI Bug Investigator

**Status:** Approved Day 2 · v1.0
**Source of truth for:** system design, component responsibilities, request lifecycle, AI interaction, external services

---

## 1. Tech Stack Summary

| Layer | Choice | Rationale |
|---|---|---|
| Frontend | Vanilla HTML/CSS/JavaScript | No auth/routing complexity needed; avoids unnecessary build tooling. |
| Backend | Node.js + Express | Familiar stack, simple proxy layer to keep the Groq API key server-side. |
| Database | None (v1.0) | Stateless by design — no accounts in v1.0. |
| Authentication | None (v1.0) | No accounts to authenticate. |
| AI Provider | Groq API | Already available; fast inference fits the "quick investigate" UX goal. |
| Frontend Hosting | Vercel (free tier) | Zero-config static hosting with HTTPS by default. |
| Backend Hosting | Render (free tier) | Simple Node/Express deploys, sufficient for portfolio-scale traffic. |
| Other tools | `dotenv`, `cors`, `highlight.js` (CDN) | Minimal, free, no build-step dependencies. |

---

## 2. Component Diagram

```mermaid
graph TB
    subgraph Client["Client (Browser) — Vercel"]
        UI["index.html / style.css"]
        JS["script.js<br/>(form handling, rendering,<br/>localStorage, share-link logic,<br/>sidebar: samples + history)"]
        HLJS["highlight.js (CDN)<br/>syntax highlighting"]
    end

    subgraph Server["Server — Render"]
        API["Express App"]
        Health["GET /api/health"]
        Analyze["POST /api/analyze"]
        GroqSvc["groqService.js<br/>(prompt builder + API call)"]
        Parser["parseAIResponse.js<br/>(safe JSON parsing)"]
        ErrHandler["errorHandler.js<br/>(centralized error middleware)"]
    end

    subgraph External["External Service"]
        Groq["Groq API<br/>(LLM analysis)"]
    end

    UI --> JS
    JS -->|fetch POST /api/analyze| Analyze
    JS -->|fetch GET /api/health| Health
    Analyze --> GroqSvc
    GroqSvc -->|HTTPS request| Groq
    Groq -->|JSON completion| GroqSvc
    GroqSvc --> Parser
    Parser --> Analyze
    Analyze -->|structured JSON or error| ErrHandler
    ErrHandler -->|consistent JSON response| JS
    JS --> HLJS
    JS -->|save/read| LocalStorage[("Browser localStorage")]
```

---

## 3. Data Flow

```mermaid
flowchart LR
    A[User pastes error<br/>+ optional code + language] --> B[Frontend validates<br/>non-empty error field]
    B --> C[POST /api/analyze<br/>JSON body]
    C --> D[Express validates<br/>request payload]
    D --> E[Build structured prompt]
    E --> F[Call Groq API]
    F --> G{Valid JSON<br/>response?}
    G -->|Yes| H[Return structured result]
    G -->|No| I[Attempt JSON extraction]
    I --> J{Recovered?}
    J -->|Yes| H
    J -->|No| K[Centralized error handler<br/>returns friendly error JSON]
    H --> L[Frontend renders analysis cards]
    L --> M[Save compact record to localStorage]
```

---

## 4. Request Lifecycle

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend (script.js)
    participant B as Backend (Express)
    participant EH as errorHandler.js
    participant G as Groq API

    U->>F: Click "Investigate"
    F->>F: Validate error message not empty
    F->>F: Show loading state, disable button
    F->>B: POST /api/analyze {errorMessage, codeSnippet?, language?}
    B->>B: Validate payload (length, required fields)
    alt Validation fails
        B->>EH: next(err)
        EH-->>F: 400 { error: true, message, code }
    else Validation passes
        B->>G: Chat completion request (structured system prompt)
        G-->>B: JSON-formatted completion
        B->>B: Parse + validate against schema
        alt Parse succeeds
            B-->>F: 200 { language, rootCause, severity, confidence, debuggingSteps, fix, preventionTips, resources }
            F->>F: Render analysis cards + severity badge
            F->>F: Save to localStorage history
        else Parse fails / Groq error / timeout
            B->>EH: next(err)
            EH-->>F: 4xx/5xx { error: true, message, code }
            F->>F: Show friendly error state
        end
    end
    F->>F: Reset button state
```

---

## 5. AI Interaction

```mermaid
flowchart TD
    Prompt["System Prompt:<br/>Role = expert debugging assistant<br/>Output = strict JSON schema only<br/>No prose outside JSON"] --> Input["User input:<br/>errorMessage (required)<br/>codeSnippet (optional)<br/>language (optional/auto)"]
    Input --> Groq["Groq Chat Completions API<br/>(Llama 3.x hosted model)"]
    Groq --> Raw["Raw completion text"]
    Raw --> Extract["Extract JSON block<br/>(direct parse, fallback regex)"]
    Extract --> Validate["Validate required fields exist<br/>and types are correct"]
    Validate --> Output["Locked schema:<br/>language, rootCause, severity,<br/>confidence, debuggingSteps,<br/>fix{explanation, code},<br/>preventionTips, resources[]"]
```

---

## 6. External Services

```mermaid
graph LR
    App["AI Bug Investigator"] --> Groq["Groq API<br/>(AI analysis — required)"]
    App --> Vercel["Vercel<br/>(static frontend hosting)"]
    App --> Render["Render<br/>(backend hosting)"]
    App --> GitHub["GitHub<br/>(source control + deploy trigger)"]
    App --> CDN["jsDelivr/unpkg CDN<br/>(highlight.js — no backend dependency)"]
```

---

## 7. Centralized Error Handling (Day 2 addition)

A single Express error-handling middleware, `server/middleware/errorHandler.js`, sits at the end of the middleware chain. Every route funnels errors through `next(err)` rather than handling errors inconsistently per-route.

**Consistent error response contract:**
```json
{ "error": true, "message": "Human-readable message", "code": "OPTIONAL_ERROR_CODE" }
```

Covers: validation failures, Groq timeouts, malformed AI JSON responses, and unexpected exceptions.

---

## 8. Future-Ready Notes (v2.0 — not built in v1.0)

The architecture intentionally leaves room for a v2.0 without requiring a restructure:

- **Database:** MongoDB, introduced via a new `server/models/` folder. Likely collections: `users`, `analyses`.
- **Authentication:** JWT-based, introduced via `server/middleware/auth.js`, slotting in alongside the existing `errorHandler.js` middleware pattern.
- **New capabilities unlocked by v2.0:** cloud-synced history, saved analyses, personalized dashboard.

None of this is implemented in v1.0 — it is documented here only so future work has a clear, non-disruptive entry point.
