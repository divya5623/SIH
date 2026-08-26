# AWAAZ SARPANCH (आवाज़ सरपंच)
> **"Citizens Speak. AI Understands. Authorities Act."**  
> *Voice-first AI for accessible, transparent and accountable local governance.*

A production-ready, fully responsive React + Vite civic grievance reporting and tracking web application recreating the **AWAAZ SARPANCH** interface with high fidelity.

---

## 🌟 Key Capabilities & Complete 13-Screen Architecture

1. **Screen 1 — Landing Page (`/`)**
   - Hero badge (`Voice-first • AI-Powered • Citizen-Centric`), bold typography (`AWAAZ` in green, `SARPANCH` in navy).
   - Action buttons: `FILE A COMPLAINT`, `AI / AUTHORITY PORTAL`, and `SEE HOW IT WORKS`.
   - Authentic Indian village SVG illustration (banyan tree, Panchayat bhavan, solar lighting, citizen holding smartphone with voice ripples).
   - Statistics card (`12,458+ Received`, `8,745+ Resolved`, `96.2% Satisfaction Rate`, `245+ Active Authorities`).
   - 5-step interactive process breakdown (`Speak or Type`, `AI Understands`, `Authority Identified`, `Track & Actions`, `Resolution Verified`).

2. **Screen 2 — Choose Input (`/report`)**
   - **Card 1 (Speak - Green):** Microphone icon, animated audio waveform, recording state indicator, interactive recording trigger.
   - **Card 2 (Camera - Blue):** Camera icon, sample photo preview with water leakage detection badge.
   - **Card 3 (Type - Purple):** Edit pencil icon, natural grievance text entry area.
   - **Location Card:** Auto-GPS toggle with coordinate detection (`12.8797° N, 74.8509° E • Ward 5, Near Govt School`).
   - Large green `CONTINUE` button.

3. **Screen 3 — AI Understanding Preview (`/report/preview`)**
   - Input preview cards for recorded audio (`00:06` waveform) and evidence image.
   - Structured AI extraction table: Issue, Category, Ward, GPS coordinates, Assigned Department, High Priority, and 94% confidence progress meter.
   - `EDIT DETAILS` and `CONFIRM & SUBMIT` actions.

4. **Screen 4 — Complaint Submitted / Tracking (`/complaint/submitted`)**
   - Registered badge, generated Grievance ID (`GRV-2026-00125`), submission timestamp.
   - 6-stage vertical progress timeline with green milestone checkmarks.
   - Share Grievance card with `COPY ID`, `SMS`, and `Email` share triggers.
   - `VIEW MY COMPLAINTS` button.

5. **Screen 5 — My Complaints (`/complaints`)**
   - Category tabs: `All`, `In Progress`, `Resolved`.
   - Live search filter by ID, issue name, or ward.
   - Color-coded status badges (`In Progress`, `Resolved`, `Closed`, `Escalated`).
   - Bottom 24x7 helpline card (`1800-123-4567`).

6. **Screen 6 — Complaint Details / Citizen View (`/complaints/:id`)**
   - Grievance metadata, priority indicator, assigned department.
   - 6-step progress timeline.
   - Photo evidence and interactive radar map coordinate view.
   - Citizen resolution feedback actions (`YES, RESOLVED` & `NOT YET`).

7. **Screen 7 — Admin Dashboard (`/admin`)**
   - Dark navy vertical sidebar with administrative navigation.
   - 4 Top-level metric cards (`128 Total Complaints`, `24 In Progress`, `86 Resolved`, `7 Escalated`).
   - Donut Chart breakdown for complaints by category (Water Supply, Street Light, Roads, Garbage, Others).
   - Live recent grievance feed.

8. **Screen 8 — All Complaints Admin View (`/admin/complaints`)**
   - Department category filter, status filter, and live text search.
   - Complete table with ID, Issue, Ward, Department, Priority, Status, and Action.
   - Realistic pagination controls (`1 2 3 4 5 ... 26 >`) and result counter.

9. **Screen 9 — Recurring Issues / Cluster Detection (`/admin/recurring`)**
   - Spatial cluster warning alert for repeated neighborhood issues.
   - Hotspot table with complaint volume, trend indicator (`up trend`), and severity badge.
   - AI Preventive governance insight card with `VIEW FULL ANALYTICS` navigation.

10. **Screen 10 — Verify Resolution (`/complaints/:id/verify`)**
    - Multi-choice citizen verification:
      - `YES, RESOLVED` (Green)
      - `NOT COMPLETELY RESOLVED` (Red/Light Red)
      - `NOT RESOLVED` (Blue/Light Blue)
    - Optional citizen feedback comment area and confetti completion animation.

11. **Screen 11 — Login (`/login`)**
    - Split-screen layout with village art and white login card.
    - Role selector (`Citizen` vs `Panchayat Admin`).
    - Password visibility toggle and fast demo login.

12. **Screen 12 & 13 — Identity Verification & Success (`/register`)**
    - Mobile number OTP trigger.
    - 6-digit OTP verification inputs with auto-advance.
    - Citizen ID card issuance (`CIT-IND-000124`) and direct dashboard redirection.

13. **Supporting Navigation Pages:**
    - `/how-it-works`
    - `/features`
    - `/about`
    - `/contact`
    - `/admin/analytics`
    - `/admin/authority`
    - `/admin/reports`
    - `/admin/users`
    - `/admin/settings`

---

## 🎨 Design Tokens & Brand Colors

- **Primary Green:** `#087A55`
- **Dark Green:** `#07563F`
- **Dark Navy:** `#102333`
- **Blue Accent:** `#2366B1`
- **Purple Accent:** `#7150A8`
- **Light Background:** `#F7FAF8`
- **White:** `#FFFFFF`
- **Border:** `#DDE7E2`
- **Success:** `#1D9B61`
- **Warning:** `#F4A62A`
- **Danger:** `#E94B4B`
- **Font Family:** `Inter, sans-serif`

---

## 🚀 Quick Start Guide

1. Navigate to the project directory:
   ```bash
   cd C:\Users\LENOVO\.gemini\antigravity\scratch\awaaz-sarpanch-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```

4. Open your browser at:
   ```
   http://localhost:5173
   ```
