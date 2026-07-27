const API_BASE = "https://ai-bug-investigator.onrender.com";
const HISTORY_KEY = "bugInvestigatorHistory";
const MAX_HISTORY = 12;

const SAMPLE_ERRORS = [
  { label: "JS TypeError", errorMessage: "TypeError: Cannot read properties of undefined (reading 'name')", codeSnippet: "console.log(user.profile.name);", language: "javascript" },
  { label: "Python KeyError", errorMessage: "Traceback (most recent call last):\n  File \"app.py\", line 12, in <module>\n    print(data['user'])\nKeyError: 'user'", codeSnippet: "", language: "python" },
  { label: "Java NullPointer", errorMessage: "Exception in thread \"main\" java.lang.NullPointerException: Cannot invoke \"String.length()\" because \"name\" is null", codeSnippet: "", language: "java" },
  { label: "SQL Syntax Error", errorMessage: "ERROR 1064 (42000): You have an error in your SQL syntax near 'FROM users WHERE' at line 1", codeSnippet: "SELECT * FROM users WHERE", language: "sql" },
  { label: "JS Reference Error", errorMessage: "ReferenceError: myFunction is not defined", codeSnippet: "", language: "auto" },
  { label: "Node Async Error", errorMessage: "UnhandledPromiseRejectionWarning: Error: connect ECONNREFUSED 127.0.0.1:5432", codeSnippet: "const data = await db.query('SELECT * FROM users');", language: "javascript" }
];

const form = document.getElementById("analyzeForm");
const errorMessageInput = document.getElementById("errorMessage");
const codeSnippetInput = document.getElementById("codeSnippet");
const languageSelect = document.getElementById("language");
const submitBtn = document.getElementById("submitBtn");
const submitBtnText = document.getElementById("submitBtnText");
const errorBanner = document.getElementById("errorBanner");
const resultsSection = document.getElementById("results");
const newAnalysisBtn = document.getElementById("newAnalysisBtn");
const copyFixBtn = document.getElementById("copyFixBtn");
const shareBtn = document.getElementById("shareBtn");
const heroFraming = document.getElementById("heroFraming");

const severityBadge = document.getElementById("severityBadge");
const confidenceText = document.getElementById("confidenceText");
const confidenceFill = document.getElementById("confidenceFill");
const rootCauseEl = document.getElementById("rootCause");
const debuggingStepsEl = document.getElementById("debuggingSteps");
const fixExplanationEl = document.getElementById("fixExplanation");
const fixCodeEl = document.getElementById("fixCode");
const preventionTipsEl = document.getElementById("preventionTips");
const resourcesEl = document.getElementById("resources");
const resourcesCard = document.getElementById("resourcesCard");

const sidebar = document.getElementById("sidebar");
const sidebarToggle = document.getElementById("sidebarToggle");
const sidebarClose = document.getElementById("sidebarClose");
const sidebarOverlay = document.getElementById("sidebarOverlay");
const sampleListEl = document.getElementById("sampleList");
const historyListEl = document.getElementById("historyList");
const historyEmptyNote = document.getElementById("historyEmptyNote");
const clearHistoryBtn = document.getElementById("clearHistoryBtn");

let currentResult = null;

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

// --- New: relative time helper for history ---
function timeAgo(isoString) {
  const seconds = Math.floor((Date.now() - new Date(isoString).getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
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
  currentResult = result;
  heroFraming.hidden = true;

  severityBadge.textContent = result.severity;
  severityBadge.className = `severity-badge severity-${result.severity.toLowerCase()}`;
  confidenceText.textContent = `Confidence: ${result.confidence}%`;
  confidenceFill.style.width = `${Math.max(0, Math.min(100, result.confidence))}%`;

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
  if (window.hljs) hljs.highlightElement(fixCodeEl);

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
    saveToHistory(errorMessage, data);
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
  heroFraming.hidden = false;
  form.reset();
  hideError();
});

copyFixBtn.addEventListener("click", async () => {
  if (!currentResult) return;
  try {
    await navigator.clipboard.writeText(currentResult.fix.code);
    const original = copyFixBtn.innerHTML;
    copyFixBtn.innerHTML = "Copied ✓";
    setTimeout(() => { copyFixBtn.innerHTML = original; }, 1500);
  } catch (err) {
    console.error("Clipboard error:", err);
  }
});

function encodeShare(result) {
  const compact = {
    l: result.language, rc: result.rootCause, sv: result.severity, cf: result.confidence,
    ds: result.debuggingSteps, fx: { e: result.fix.explanation, c: result.fix.code },
    pt: result.preventionTips, rs: result.resources
  };
  return btoa(encodeURIComponent(JSON.stringify(compact)));
}
function decodeShare(encoded) {
  const compact = JSON.parse(decodeURIComponent(atob(encoded)));
  return {
    language: compact.l, rootCause: compact.rc, severity: compact.sv, confidence: compact.cf,
    debuggingSteps: compact.ds, fix: { explanation: compact.fx.e, code: compact.fx.c },
    preventionTips: compact.pt, resources: compact.rs || []
  };
}

shareBtn.addEventListener("click", async () => {
  if (!currentResult) return;
  const encoded = encodeShare(currentResult);
  const url = `${window.location.origin}${window.location.pathname}?result=${encoded}`;
  try {
    await navigator.clipboard.writeText(url);
    const original = shareBtn.innerHTML;
    shareBtn.innerHTML = "Link copied ✓";
    setTimeout(() => { shareBtn.innerHTML = original; }, 1500);
  } catch (err) {
    showError("Could not copy the share link. Please copy it manually: " + url);
  }
});

function getHistory() {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}
function saveToHistory(errorMessage, result) {
  const history = getHistory();
  const entry = {
    id: `${Date.now()}`,
    timestamp: new Date().toISOString(),
    errorSnippet: errorMessage.slice(0, 80),
    language: result.language,
    severity: result.severity,
    fullResult: result
  };
  history.unshift(entry);
  const trimmed = history.slice(0, MAX_HISTORY);
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(trimmed));
  } catch (e) { /* storage full or unavailable — fail silently */ }
  renderHistory();
}
function renderHistory() {
  const history = getHistory();
  historyListEl.innerHTML = "";
  if (history.length === 0) {
    historyEmptyNote.hidden = false;
    return;
  }
  historyEmptyNote.hidden = true;
  history.forEach((entry) => {
    const btn = document.createElement("button");
    btn.className = "history-item";
    btn.innerHTML = `
      <div class="hist-top">
        <span>${entry.errorSnippet}</span>
        <span class="hist-sev severity-${entry.severity.toLowerCase()}">${entry.severity}</span>
      </div>
      <span class="hist-time">${timeAgo(entry.timestamp)}</span>
    `;
    btn.addEventListener("click", () => {
      renderResult(entry.fullResult);
      closeSidebarIfMobile();
    });
    historyListEl.appendChild(btn);
  });
}
clearHistoryBtn.addEventListener("click", () => {
  localStorage.removeItem(HISTORY_KEY);
  renderHistory();
});

function renderSamples() {
  sampleListEl.innerHTML = "";
  SAMPLE_ERRORS.forEach((sample) => {
    const btn = document.createElement("button");
    btn.className = "sample-item";
    btn.textContent = sample.label;
    btn.addEventListener("click", () => {
      errorMessageInput.value = sample.errorMessage;
      codeSnippetInput.value = sample.codeSnippet;
      languageSelect.value = sample.language;
      form.hidden = false;
      resultsSection.hidden = true;
      heroFraming.hidden = false;
      hideError();
      closeSidebarIfMobile();
      errorMessageInput.focus();
    });
    sampleListEl.appendChild(btn);
  });
}

function openSidebar() {
  sidebar.classList.add("open");
  sidebarOverlay.hidden = false;
}
function closeSidebar() {
  sidebar.classList.remove("open");
  sidebarOverlay.hidden = true;
}
function closeSidebarIfMobile() {
  if (window.innerWidth < 900) closeSidebar();
}
sidebarToggle.addEventListener("click", openSidebar);
sidebarClose.addEventListener("click", closeSidebar);
sidebarOverlay.addEventListener("click", closeSidebar);

function loadSharedResultIfPresent() {
  const params = new URLSearchParams(window.location.search);
  const encoded = params.get("result");
  if (!encoded) return false;
  try {
    const result = decodeShare(encoded);
    renderResult(result);
    return true;
  } catch (e) {
    console.error("Could not decode shared result:", e);
    return false;
  }
}

renderSamples();
renderHistory();
loadSharedResultIfPresent();