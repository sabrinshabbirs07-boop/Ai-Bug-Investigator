# SCHEMA.md — AI Bug Investigator

**Status:** Approved Day 2 · v1.0
**Note:** v1.0 uses **no backend database** (confirmed against every PRD user story — see Section 4). This document instead defines the three data *shapes* used throughout the application, so the "schema" concept is still fully documented even without a database engine.

---

## 1. AI Response Schema (locked contract between backend and frontend)

This is the exact structure returned by `POST /api/analyze`. It is treated as a locked contract — do not change field names without updating this document and `API.md`.

```json
{
  "language": "string",
  "rootCause": "string",
  "severity": "Critical | High | Medium | Low",
  "confidence": 0,
  "debuggingSteps": ["string"],
  "fix": {
    "explanation": "string",
    "code": "string"
  },
  "preventionTips": ["string"],
  "resources": [
    { "title": "string", "url": "string" }
  ]
}
```

| Field | Type | Required | Notes |
|---|---|---|---|
| `language` | string | Yes | Detected or user-provided language. |
| `rootCause` | string | Yes | Plain-language explanation. |
| `severity` | enum | Yes | One of `Critical`, `High`, `Medium`, `Low`. |
| `confidence` | number | Yes | 0–100. |
| `debuggingSteps` | string[] | Yes | Ordered list. |
| `fix.explanation` | string | Yes | Why the fix works. |
| `fix.code` | string | Yes | Code example. |
| `preventionTips` | string[] | Yes | Best practices to avoid recurrence. |
| `resources` | object[] | No | May be an empty array if nothing relevant is found. |

---

## 2. localStorage History Record Shape

Stored under a single key, e.g. `bugInvestigatorHistory`, as a JSON array capped at the most recent 10–15 entries.

```json
{
  "id": "string (uuid or timestamp-based)",
  "timestamp": "ISO 8601 string",
  "errorSnippet": "string (truncated error message, ~80 chars)",
  "language": "string",
  "severity": "Critical | High | Medium | Low",
  "fullResult": { "...AI Response Schema (Section 1) ..." }
}
```

| Field | Type | Notes |
|---|---|---|
| `id` | string | Unique per entry, used for click-to-reopen. |
| `timestamp` | string | Used for display and potential future sorting. |
| `errorSnippet` | string | Short preview shown in the sidebar history list. |
| `language` | string | Shown as a small tag in the history list. |
| `severity` | enum | Shown as a colored badge in the history list. |
| `fullResult` | object | The complete original AI response, so reopening an entry requires no re-fetch. |

---

## 3. Share-Link Encoded Payload Shape

Generated client-side when the user clicks "Share this result." Serialized to JSON, then base64-encoded, then appended as a URL query parameter (`?result=<encoded>`).

```json
{
  "l": "string (language)",
  "rc": "string (rootCause)",
  "sv": "Critical | High | Medium | Low",
  "cf": 0,
  "ds": ["string"],
  "fx": { "e": "string", "c": "string" },
  "pt": ["string"],
  "rs": [{ "t": "string", "u": "string" }]
}
```

Shortened keys are used deliberately to keep the encoded URL as compact as possible. On page load, if a `?result=` parameter is present, the frontend decodes it, maps the short keys back to the full schema (Section 1), and renders a **read-only** result view instead of the empty state.

---

## 4. Validation Against PRD User Stories

| PRD Requirement | Needs a database? | Reasoning |
|---|---|---|
| FR-1–FR-10 (core analyze flow) | No | Single request/response, no persistence between sessions. |
| FR-11 (sample error library) | No | Static array shipped in frontend JS. |
| FR-12 (copy fix) | No | Pure client-side clipboard action. |
| FR-13 (shareable results) | No | Handled via URL-encoded state (Section 3). |
| FR-14 (local history) | No | `localStorage`-based (Section 2), client-side only. |
| FR-15 (responsive design) | No | Pure frontend concern. |
| FR-16 (error handling) | No | Handled via centralized error middleware (see `ARCHITECTURE.md`). |

**Conclusion:** No tables, collections, or database engine are required for v1.0.

---

## 5. Future-Ready Notes (v2.0 — not built in v1.0)

Planned for a future version, not implemented today:

- **Database:** MongoDB
- **Likely collections:**
  - `users` — `{ _id, email, passwordHash, createdAt }`
  - `analyses` — `{ _id, userId, timestamp, errorMessage, codeSnippet, language, result (AI Response Schema), }`
- **Authentication:** JWT-based, issued on login, validated via `server/middleware/auth.js`.
- **New capabilities unlocked:** cloud-synced history, saved analyses, personalized dashboard.

This section exists purely for forward planning — no schema migration or database work happens in v1.0.
