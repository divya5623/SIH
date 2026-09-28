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
- Complaints may not always include sufficient photo or location context
- Similar complaints may be treated individually even when they represent the same underlying problem
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
4. Attach location context
5. Submit the complaint
6. Track its progress
7. Verify the resolution
8. Reopen the complaint if the problem is not actually fixed

On the Panchayat side, the system supports:

- Complaint review and classification
- Service/department identification
- Priority information
- Similar complaint grouping
- Resolution tracking
- Resolution verification

---

# 🔄 End-to-End Workflow

```text
┌──────────────────────┐
│       CITIZEN        │
│  Voice / Text Report │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│  EVIDENCE COLLECTION │
│ Photo + Location     │
│ + Timestamp          │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│    AI PROCESSING     │
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
