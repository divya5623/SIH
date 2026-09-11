"""
test_api.py - Quick end-to-end test of the AWAAZ SARPANCH backend
Run: python test_api.py
"""
import urllib.request
import json
import sys

BASE = "http://localhost:8000"

def get(path):
    r = urllib.request.urlopen(BASE + path)
    return json.loads(r.read())

def post(path, body):
    req = urllib.request.Request(
        BASE + path,
        data=json.dumps(body).encode("utf-8"),
        headers={"Content-Type": "application/json"}
    )
    r = urllib.request.urlopen(req)
    return json.loads(r.read())

print("=" * 50)
print("  AWAAZ SARPANCH - Backend API Tests")
print("=" * 50)

# 1. Health check
print("\n[1] Health Check...")
d = get("/")
print(f"    Status: {d['status']}  v{d['version']}")
assert d["status"] == "running", "FAILED: health"
print("    PASS")

# 2. Classify - Road (English)
print("\n[2] Classify: Road complaint (English)...")
d = post("/api/classify", {"text": "road damaged potholes everywhere", "language": "en-IN"})
print(f"    Category: {d['category']}, Confidence: {d['confidence']}%, Source: {d['source']}")
assert "Roads" in d["category"], f"FAILED: expected Roads, got {d['category']}"
print("    PASS")

# 3. Classify - Water Supply
print("\n[3] Classify: Water supply (English)...")
d = post("/api/classify", {"text": "no drinking water for 3 days pipe leak", "language": "en-IN"})
print(f"    Category: {d['category']}, Confidence: {d['confidence']}%")
assert "Water" in d["category"], f"FAILED: expected Water, got {d['category']}"
print("    PASS")

# 4. Classify - Street Light
print("\n[4] Classify: Street light (Hindi phonetic)...")
d = post("/api/classify", {"text": "bijli nahi street light fused andhera", "language": "hi-IN"})
print(f"    Category: {d['category']}, Confidence: {d['confidence']}%")
assert "Street" in d["category"] or "Light" in d["category"], f"FAILED: got {d['category']}"
print("    PASS")

# 5. Save complaint to DB
print("\n[5] Save Complaint to SQLite Database...")
d = post("/api/complaints", {
    "description": "road damaged potholes everywhere - test complaint",
    "category": "Roads / Infrastructure",
    "department": "Lok Nirman Vibhag / PWD (Roads)",
    "priority": "High Priority",
    "confidence": 95,
    "ward": "Ward 5",
    "gps": "12.8797 N, 74.8509 E",
    "language": "kn-IN"
})
grv_id = d["complaint"]["grv_id"]
print(f"    GRV ID: {grv_id}")
print(f"    Status: {d['complaint']['status']}")
assert d["success"] is True, "FAILED: save"
assert grv_id.startswith("GRV-"), f"FAILED: bad GRV ID: {grv_id}"
print("    PASS")

# 6. Retrieve from DB
print("\n[6] Retrieve Complaints from Database...")
d = get("/api/complaints")
print(f"    Total complaints in DB: {d['count']}")
assert d["count"] >= 1, "FAILED: no complaints"
print("    PASS")

# 7. Get single complaint
print(f"\n[7] Get Complaint by GRV ID: {grv_id}...")
d = get(f"/api/complaints/{grv_id}")
print(f"    Found: {d['complaint']['grv_id']} - {d['complaint']['category']}")
assert d["success"] is True, "FAILED: not found"
print("    PASS")

# 8. Update status
print(f"\n[8] Update Status -> 'In Progress'...")
req = urllib.request.Request(
    f"{BASE}/api/complaints/{grv_id}/status",
    data=json.dumps({"status": "In Progress"}).encode("utf-8"),
    headers={"Content-Type": "application/json"},
    method="PATCH"
)
d = json.loads(urllib.request.urlopen(req).read())
print(f"    New status: {d['new_status']}")
assert d["new_status"] == "In Progress", "FAILED: status update"
print("    PASS")

# 9. Stats
print("\n[9] Dashboard Statistics...")
d = get("/api/stats")
s = d["stats"]
print(f"    Total: {s['total']} | Registered: {s['registered']} | In Progress: {s['in_progress']} | Resolved: {s['resolved']}")
print("    PASS")

print("\n" + "=" * 50)
print("  ALL TESTS PASSED! Backend is fully working.")
print(f"  Swagger UI: {BASE}/docs")
print("=" * 50)
