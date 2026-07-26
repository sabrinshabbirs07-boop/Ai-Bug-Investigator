# API.md — AI Bug Investigator

**Status:** Approved Day 2 · Implemented & verified Day 4 · v1.0
**API surface:** 2 endpoints, intentionally minimal. No authentication in v1.0.
**Error contract:** All errors, from any endpoint, return the same shape via centralized error-handling middleware:

```json
{ "error": true, "message": "Human-readable message", "code": "OPTIONAL_ERROR_CODE" }
```

---

## `GET /api/health`

| Field | Details |
|---|---|
| **Purpose** | Confirms the backend is running and reachable. Used during setup/testing and to "warm up" Render before a live demo. |
| **Request** | No body, no params, no query string. |
| **Response — 200** | `{ "status": "ok" }` |
| **Validation** | None needed. |
| **Authentication** | None (public). |
| **Error cases** | If the server is down, the request fails at the network level (no JSON returned) — frontend treats this as a network/connection error, not a parsed API error. |

---

## `POST /api/analyze`

**✅ Implemented and tested Day 4** — verified across JavaScript, Python, Java, SQL, and an auto-detect case, plus empty-input validation and a vague-error edge case. All passed.

| Field | Details |
|---|---|
| **Purpose** | Core endpoint. Sends the user's error (+ optional code/language) to Groq and returns structured debugging analysis. |
| **Request body** | ```json { "errorMessage": "string (required)", "codeSnippet": "string (optional)", "language": "string (optional, default: \"auto\")" } ``` |
| **Response — 200** | See full schema in `SCHEMA.md` Section 1: `{ language, rootCause, severity, confidence, debuggingSteps, fix: { explanation, code }, preventionTips, resources[] }` |
| **Validation** | `errorMessage`: required, non-empty, max ~5,000 characters. `codeSnippet`: optional, max ~8,000 characters. `language`: optional string, defaults to `"auto"` if omitted. |
| **Authentication** | None (public, stateless). |
| **Error cases** | `400` — missing/empty `errorMessage`, or input exceeds length limits. `502` — Groq returned an unparseable response even after fallback JSON extraction. `504` — Groq request timed out. `500` — any unexpected server-side failure. |

**Example request:**
```json
POST /api/analyze
Content-Type: application/json

{
  "errorMessage": "TypeError: Cannot read properties of undefined (reading 'name')",
  "codeSnippet": "console.log(user.profile.name);",
  "language": "javascript"
}
```

**Example success response (200):**
```json
{
  "language": "JavaScript",
  "rootCause": "Accessing a property on an object before it has been initialized.",
  "severity": "High",
  "confidence": 88,
  "debuggingSteps": [
    "Log the value of `user` immediately before this line.",
    "Confirm whether `user.profile` is ever undefined at runtime.",
    "Trace where `user` is set to see if it can be null/undefined."
  ],
  "fix": {
    "explanation": "Guard against a missing user or profile before accessing name.",
    "code": "if (!user?.profile) return null;\nconsole.log(user.profile.name);"
  },
  "preventionTips": [
    "Use optional chaining (?.) when accessing nested properties.",
    "Add default values when destructuring uncertain objects."
  ],
  "resources": [
    { "title": "MDN — Optional chaining", "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining" }
  ]
}
```

**Example error response (400):**
```json
{ "error": true, "message": "errorMessage is required and cannot be empty.", "code": "VALIDATION_ERROR" }
```

---

## `GET /api/samples` — explicitly NOT built

| Field | Details |
|---|---|
| **Status** | **Not built, by design.** |
| **Reasoning** | The sample error library (PRD FR-11) is static data that never changes based on server state. It is hardcoded as a JS array in `client/script.js`. A backend endpoint here would add a network round-trip with zero benefit and is explicitly excluded from v1.0. |

---

## Summary

**v1.0 API surface:**
- `GET /api/health`
- `POST /api/analyze`

No authentication, no user-specific endpoints, no database-backed routes — consistent with the stateless v1.0 scope defined in the PRD.