const express = require("express");
const router = express.Router();
const { analyzeError } = require("../services/groqService");
const { parseAIResponse } = require("../utils/parseAIResponse");

const MAX_ERROR_LENGTH = 5000;
const MAX_CODE_LENGTH = 8000;

router.post("/", async (req, res, next) => {
  try {
    const { errorMessage, codeSnippet, language } = req.body || {};

    if (!errorMessage || typeof errorMessage !== "string" || errorMessage.trim().length === 0) {
      const err = new Error("errorMessage is required and cannot be empty.");
      err.status = 400;
      err.code = "VALIDATION_ERROR";
      throw err;
    }

    if (errorMessage.length > MAX_ERROR_LENGTH) {
      const err = new Error(`errorMessage cannot exceed ${MAX_ERROR_LENGTH} characters.`);
      err.status = 400;
      err.code = "VALIDATION_ERROR";
      throw err;
    }

    if (codeSnippet && typeof codeSnippet === "string" && codeSnippet.length > MAX_CODE_LENGTH) {
      const err = new Error(`codeSnippet cannot exceed ${MAX_CODE_LENGTH} characters.`);
      err.status = 400;
      err.code = "VALIDATION_ERROR";
      throw err;
    }

    const rawText = await analyzeError({
      errorMessage: errorMessage.trim(),
      codeSnippet: codeSnippet ? codeSnippet.trim() : "",
      language: language || "auto"
    });

    const result = parseAIResponse(rawText);

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

module.exports = router;