# 🇮🇳 Awaaz Sarpanch

### Voice-First AI for Accessible & Accountable Local Governance

> **Smart India Hackathon 2026 — Software**
>
> **Problem Statement ID:** SIH26202  
> **Team ID:** 138406  
> **Team:** Code Nexa

---

## 🚀 Live Prototype

### 🌐 Web Application

**https://sih-lake-sigma.vercel.app/**

### 💻 Source Code

**https://github.com/divya5623/SIH**

---

# 🎯 The Problem

For many citizens, reporting a local problem is still difficult.

Common barriers include:

- Language and literacy limitations
- Difficulty typing long complaints
- Lack of photo or location evidence
- Complaints being treated individually even when many citizens face the same problem
- Difficulty tracking whether a complaint was actually resolved
- Lack of citizen verification after a reported repair

A complaint should not simply be **submitted and forgotten**.

It should move through a complete and accountable lifecycle:

**Report → Understand → Route → Act → Verify → Resolve**

---

# 💡 Our Solution

## Awaaz Sarpanch

Awaaz Sarpanch is a **voice-first AI-assisted civic grievance platform** designed to make local problem reporting simpler and more accountable.

A citizen can:

1. Select their language
2. Describe the problem using voice or text
3. Attach a photo as evidence
4. Provide location context
5. Submit the complaint
6. Track its progress
7. Verify the resolution
8. Reopen the complaint if the problem is not actually fixed

At the Panchayat side, complaints can be:

- Understood and classified
- Routed to the relevant service/department
- Prioritized
- Grouped with similar complaints
- Tracked through resolution
- Verified using completion evidence

---

# 🔄 End-to-End Workflow

```text
┌──────────────────────┐
│      CITIZEN         │
│ Voice / Text Report  │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ Evidence Collection  │
│ Photo + GPS + Time   │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│   AI PROCESSING      │
│ Speech → Text        │
│ Complaint Analysis   │
│ Classification       │
│ Service Identification│
│ Priority / Confidence│
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ PANCHAYAT DASHBOARD  │
│ Review & Route       │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────────┐
│ RECURRING ISSUE ANALYSIS │
│ Ward + Service + Time    │
└──────────┬───────────────┘
           │
           ▼
┌──────────────────────┐
│ PANCHAYAT ACTION     │
│ Repair / Resolution  │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ RESOLUTION EVIDENCE  │
│ Fresh Photo / Proof  │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────────┐
│ CITIZEN VERIFICATION     │
│                          │
│ Fixed → Close            │
│ Not Fixed → Reopen       │
└──────────────────────────┘
