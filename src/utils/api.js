/**
 * api.js — Central API client for AWAAZ SARPANCH
 * Connects frontend to FastAPI backend at localhost:8000
 */

// In development: default to http://localhost:8000
// In production: uses VITE_API_URL environment variable (Render backend)
const BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? "http://localhost:8000" : "");

/**
 * Transcribe audio blob using Bhashini API (via backend)
 * Falls back to browser transcript if backend unavailable
 */
export async function transcribeAudio(audioBlob, language = "kn-IN", browserText = "") {
  try {
    const formData = new FormData();
    formData.append("audio", audioBlob, "recording.webm");
    formData.append("language", language);
    formData.append("browser_text", browserText);

    const response = await fetch(`${BASE_URL}/api/transcribe`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.warn("Backend transcribe failed, using browser text:", err.message);
    // Graceful fallback — use browser's Web Speech API text
    return {
      success: !!browserText,
      text: browserText,
      language,
      source: "browser_speech_api",
      error: err.message,
    };
  }
}

/**
 * Classify grievance text using Gemini AI (via backend)
 */
export async function classifyText(text, language = "kn-IN") {
  try {
    const response = await fetch(`${BASE_URL}/api/classify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, language }),
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (err) {
    console.warn("Backend classify failed, using local classifier:", err.message);
    // Import local keyword classifier as fallback
    const { classifyGrievance } = await import("./aiClassifier.js");
    const local = classifyGrievance(text);
    return {
      success: true,
      text,
      category: local.category,
      department: local.assignedDepartment,
      priority: local.priority,
      confidence: local.confidence,
      source: "keyword_fallback",
      error: err.message,
    };
  }
}

/**
 * Save complaint to SQLite database via backend
 */
export async function saveComplaint(complaintData) {
  try {
    const response = await fetch(`${BASE_URL}/api/complaints`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(complaintData),
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (err) {
    console.warn("Backend save failed, using local storage:", err.message);
    // Fallback: generate local GRV ID and store in sessionStorage
    const grvId = `GRV-${new Date().toISOString().slice(0,10).replace(/-/g,'')}-${Math.random().toString(36).slice(2,6).toUpperCase()}`;
    const localComplaint = { ...complaintData, grv_id: grvId, status: "Registered", created_at: new Date().toISOString() };
    const existing = JSON.parse(sessionStorage.getItem("local_complaints") || "[]");
    sessionStorage.setItem("local_complaints", JSON.stringify([localComplaint, ...existing]));
    return {
      success: true,
      complaint: localComplaint,
      message: `Complaint registered (offline) with ID: ${grvId}`,
      source: "local_storage",
    };
  }
}

/**
 * Get all complaints from backend
 */
export async function getComplaints(filters = {}) {
  try {
    const params = new URLSearchParams();
    if (filters.status) params.append("status", filters.status);
    if (filters.category) params.append("category", filters.category);
    if (filters.ward) params.append("ward", filters.ward);

    const response = await fetch(`${BASE_URL}/api/complaints?${params}`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (err) {
    console.warn("Backend fetch failed, using local storage:", err.message);
    const local = JSON.parse(sessionStorage.getItem("local_complaints") || "[]");
    return { success: true, count: local.length, complaints: local, source: "local_storage" };
  }
}

/**
 * Get a single complaint by GRV ID
 */
export async function getComplaint(grvId) {
  try {
    const response = await fetch(`${BASE_URL}/api/complaints/${grvId}`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (err) {
    console.warn("Backend fetch failed:", err.message);
    return { success: false, error: err.message };
  }
}

/**
 * Update complaint status (admin use)
 */
export async function updateComplaintStatus(grvId, status) {
  try {
    const response = await fetch(`${BASE_URL}/api/complaints/${grvId}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (err) {
    console.warn("Backend update failed:", err.message);
    return { success: false, error: err.message };
  }
}

/**
 * Get dashboard statistics
 */
export async function getStats() {
  try {
    const response = await fetch(`${BASE_URL}/api/stats`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (err) {
    console.warn("Backend stats failed:", err.message);
    return { success: false, stats: {}, error: err.message };
  }
}

export { BASE_URL };
