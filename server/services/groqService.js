const SYSTEM_PROMPT = `You are an expert software debugging assistant. A developer will give you an error message or stack trace, optionally with a related code snippet and a programming language.

Your job is to analyze the error and respond with ONLY a valid JSON object — no markdown fences, no explanation before or after, no extra text of any kind. Just the raw JSON object.

The JSON object must match this exact shape:
{
  "language": "string - the detected or provided programming language",
  "rootCause": "string - plain-language explanation of what actually went wrong",
  "severity": "one of: Critical, High, Medium, Low",
  "confidence": "number from 0 to 100 - how confident you are in this diagnosis",
  "debuggingSteps": ["array of strings - ordered, concrete steps to isolate and confirm the issue"],
  "fix": {
    "explanation": "string - why this fix works",
    "code": "string - a concrete code example implementing the fix"
  },
  "preventionTips": ["array of strings - best practices to avoid this class of error in the future"],
  "resources": [{ "title": "string", "url": "string" }]
}

Rules:
- Calibrate severity and confidence honestly. Do not default to "High" and "90" for everything.
- If no code snippet is given, still provide your best debugging steps and fix based on the error alone.
- If the language is not provided, infer it from the error message or code.
- "resources" should contain 0-2 relevant official documentation links. Use an empty array if nothing specific applies.
- Respond with ONLY the JSON object. Nothing else.`;

async function analyzeError({ errorMessage, codeSnippet, language }) {
  console.log("GROQ KEY PRESENT:", !!process.env.GROQ_API_KEY);
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    const err = new Error("Server is missing its AI configuration.");
    err.status = 500;
    err.code = "MISSING_API_KEY";
    throw err;
  }

  const userPrompt = [
    `Error message / stack trace:\n${errorMessage}`,
    codeSnippet ? `\nRelated code snippet:\n${codeSnippet}` : "",
    language && language !== "auto" ? `\nProgramming language: ${language}` : "\nProgramming language: not specified, please detect it."
  ].join("\n");

  let response;
  try {
    response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userPrompt }
        ],
        temperature: 0.3,
        max_tokens: 1500
      })
    });
} catch (networkErr) {
  console.error("GROQ NETWORK ERROR:", networkErr.message);

  const err = new Error("Could not reach the AI service. Please try again.");
  err.status = 504;
  err.code = "GROQ_NETWORK_ERROR";
  throw err;
}
 

  const data = await response.json();
  const rawText = data?.choices?.[0]?.message?.content;

 if (!response.ok) {
  const errorBody = await response.text();

  console.error("GROQ API ERROR:", response.status, errorBody);

  const err = new Error("The AI service returned an error. Please try again.");
  err.status = response.status === 429 ? 429 : 502;
  err.code = "GROQ_API_ERROR";
  throw err;
}

  return rawText;
}

module.exports = { analyzeError };