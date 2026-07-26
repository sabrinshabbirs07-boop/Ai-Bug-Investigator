const REQUIRED_FIELDS = [
  "language",
  "rootCause",
  "severity",
  "confidence",
  "debuggingSteps",
  "fix",
  "preventionTips",
  "resources"
];

const VALID_SEVERITIES = ["Critical", "High", "Medium", "Low"];

function parseAIResponse(rawText) {
  let parsed;

  // Attempt 1: direct parse
  try {
    parsed = JSON.parse(rawText);
  } catch (e) {
    // Attempt 2: extract the first {...} block (in case the model added stray text)
    const match = rawText.match(/\{[\s\S]*\}/);
    if (match) {
      try {
        parsed = JSON.parse(match[0]);
      } catch (e2) {
        parsed = null;
      }
    }
  }

  if (!parsed) {
    const err = new Error("Could not understand the AI's response. Please try again.");
    err.status = 502;
    err.code = "PARSE_FAILURE";
    throw err;
  }

  // Validate required fields exist
  for (const field of REQUIRED_FIELDS) {
    if (!(field in parsed)) {
      const err = new Error("The AI's response was missing required information. Please try again.");
      err.status = 502;
      err.code = "INVALID_SCHEMA";
      throw err;
    }
  }

  // Validate types loosely
  if (!VALID_SEVERITIES.includes(parsed.severity)) {
    parsed.severity = "Medium"; // safe fallback rather than hard failure
  }

  if (typeof parsed.confidence !== "number") {
    const num = parseInt(parsed.confidence, 10);
    parsed.confidence = isNaN(num) ? 50 : num;
  }
  parsed.confidence = Math.max(0, Math.min(100, parsed.confidence));

  if (!Array.isArray(parsed.debuggingSteps)) parsed.debuggingSteps = [];
  if (!Array.isArray(parsed.preventionTips)) parsed.preventionTips = [];
  if (!Array.isArray(parsed.resources)) parsed.resources = [];
  if (typeof parsed.fix !== "object" || parsed.fix === null) {
    parsed.fix = { explanation: "", code: "" };
  }

  return parsed;
}

module.exports = { parseAIResponse };