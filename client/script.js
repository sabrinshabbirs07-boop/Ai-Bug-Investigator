const API_BASE = "http://localhost:5000";

const checkHealthBtn = document.getElementById("checkHealthBtn");
const healthResult = document.getElementById("healthResult");

checkHealthBtn.addEventListener("click", async () => {
  healthResult.textContent = "Checking...";

  try {
    const response = await fetch(`${API_BASE}/api/health`);
    const data = await response.json();

    healthResult.textContent = `✅ Backend says: ${data.status}`;

  } catch (error) {
    healthResult.textContent = "❌ Could not reach backend.";
    console.error(error);
  }
});