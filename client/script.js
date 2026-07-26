const API_BASE = "http://localhost:5000";

const form = document.getElementById("analyzeForm");
const errorMessageInput = document.getElementById("errorMessage");
const codeSnippetInput = document.getElementById("codeSnippet");
const languageSelect = document.getElementById("language");
const submitBtn = document.getElementById("submitBtn");
const submitBtnText = document.getElementById("submitBtnText");
const errorBanner = document.getElementById("errorBanner");
const resultsSection = document.getElementById("results");
const newAnalysisBtn = document.getElementById("newAnalysisBtn");

const severityBadge = document.getElementById("severityBadge");
const confidenceText = document.getElementById("confidenceText");
const rootCauseEl = document.getElementById("rootCause");
const debuggingStepsEl = document.getElementById("debuggingSteps");
const fixExplanationEl = document.getElementById("fixExplanation");
const fixCodeEl = document.getElementById("fixCode");
const preventionTipsEl = document.getElementById("preventionTips");
const resourcesEl = document.getElementById("resources");
const resourcesCard = document.getElementById("resourcesCard");

const LANGUAGE_MAP = {
  javascript: "javascript", js: "javascript",
  typescript: "typescript", ts: "typescript",
  python: "python", py: "python",
  java: "java",
  "c#": "csharp", csharp: "csharp",
  "c++": "cpp", cpp: "cpp",
  go: "go", golang: "go",
  php: "php",
  ruby: "ruby",
  sql: "sql"
};

function getHljsLanguage(language) {
  if (!language) return "plaintext";
  const key = language.toLowerCase().trim();
  return LANGUAGE_MAP[key] || "plaintext";
}

function showError(message) {
  errorBanner.textContent = message;
  errorBanner.hidden = false;
}

function hideError() {
  errorBanner.hidden = true;
  errorBanner.textContent = "";
}

function setLoading(isLoading) {
  submitBtn.disabled = isLoading;
  submitBtnText.textContent = isLoading ? "Investigating…" : "Investigate";
  submitBtn.classList.toggle("is-loading", isLoading);
}

function renderResult(result) {
  severityBadge.textContent = result.severity;
  severityBadge.className = `severity-badge severity-${result.severity.toLowerCase()}`;
  confidenceText.textContent = `Confidence: ${result.confidence}%`;

  rootCauseEl.textContent = result.rootCause;

  debuggingStepsEl.innerHTML = "";
  result.debuggingSteps.forEach((step) => {
    const li = document.createElement("li");
    li.textContent = step;
    debuggingStepsEl.appendChild(li);
  });

  fixExplanationEl.textContent = result.fix.explanation;

  fixCodeEl.className = `hljs language-${getHljsLanguage(result.language)}`;
  fixCodeEl.textContent = result.fix.code;
  if (window.hljs) {
    hljs.highlightElement(fixCodeEl);
  }

  preventionTipsEl.innerHTML = "";
  result.preventionTips.forEach((tip) => {
    const li = document.createElement("li");
    li.textContent = tip;
    preventionTipsEl.appendChild(li);
  });

  resourcesEl.innerHTML = "";
  if (result.resources && result.resources.length > 0) {
    resourcesCard.hidden = false;
    result.resources.forEach((res) => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = res.url;
      a.textContent = res.title;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      li.appendChild(a);
      resourcesEl.appendChild(li);
    });
  } else {
    resourcesCard.hidden = true;
  }

  resultsSection.hidden = false;
  form.hidden = true;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  hideError();

  const errorMessage = errorMessageInput.value.trim();
  if (!errorMessage) {
    showError("Please paste an error message or stack trace.");
    return;
  }

  setLoading(true);

  try {
    const response = await fetch(`${API_BASE}/api/analyze`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        errorMessage,
        codeSnippet: codeSnippetInput.value.trim(),
        language: languageSelect.value
      })
    });

    const data = await response.json();

    if (!response.ok) {
      showError(data.message || "Something went wrong. Please try again.");
      return;
    }

    renderResult(data);
  } catch (err) {
    showError("Could not reach the server. Please check your connection and try again.");
    console.error(err);
  } finally {
    setLoading(false);
  }
});

newAnalysisBtn.addEventListener("click", () => {
  form.hidden = false;
  resultsSection.hidden = true;
  form.reset();
  hideError();
});