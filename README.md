# 🇮🇳 Awaaz Sarpanch

### Voice-First AI for Accessible & Accountable Local Governance

> **Smart India Hackathon 2026 — Software**  
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

# 🎯 Problem Statement

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

> **Report → Understand → Route → Act → Verify → Resolve**

---

# 💡 Our Solution

## Awaaz Sarpanch

**Awaaz Sarpanch** is a **voice-first AI-assisted civic grievance platform** designed to make local problem reporting simpler and more accountable.

The platform connects citizens and Panchayats through an end-to-end grievance workflow.

### 👤 Citizen Side

A citizen can:

1. Select their language
2. Describe the problem using voice or text
3. Attach a photo as evidence
4. Attach location context
5. Submit the complaint
6. Track its progress
7. Verify the resolution
8. Reopen the complaint if the problem is not actually fixed

### 🏛️ Panchayat Side

The system supports:

- Complaint review and classification
- Service/department identification
- Priority information
- Similar complaint grouping
- Resolution tracking
- Resolution evidence
- Citizen verification

---

# ⭐ Core Innovation

Awaaz Sarpanch combines five connected ideas:

### 🎙️ 1. Voice-First Reporting

Citizens can describe local problems using voice instead of depending only on typing.

### 📸 2. Evidence-Based Complaints

Complaints can include photo and location context to help the Panchayat understand the issue.

### 📊 3. Recurring Issue Intelligence

Similar complaints can be grouped using location, service, and time context to identify larger recurring problems.

### 🔧 4. Resolution Tracking

The Panchayat can update the complaint as action is taken and provide resolution evidence.

### ✅ 5. Citizen-Verified Resolution

Citizens can verify whether the reported problem has actually been fixed.

If the problem is not fixed, the citizen can reopen the complaint.

> **Key idea: Move from complaint collection to verified resolution.**

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

🧠 AI-Assisted Processing

Awaaz Sarpanch uses AI-assisted processing to convert citizen reports into structured grievance information.

The system supports:

🎙️ Speech-to-text conversion
📝 Complaint understanding
🏷️ Complaint classification
🏛️ Service/department identification
⚡ Priority information
📊 Confidence-aware processing
🔗 Similar complaint grouping

AI assists the workflow while allowing human review where required.

📊 Recurring Issue Intelligence

Individual complaints can sometimes represent the same underlying infrastructure problem.

Awaaz Sarpanch supports grouping similar complaints using:

Ward + Service + Time

Example
37 Complaints
      ↓
   Ward 4
      ↓
Drinking Water
      ↓
Pipeline Leakage
      ↓
Recurring Issue
      ↓
Panchayat Action

Instead of treating every complaint as completely separate, the Panchayat can identify a larger recurring issue and take appropriate action.

This helps shift the workflow from individual complaint handling toward issue-level understanding.

🔧 Resolution & Citizen Verification

Awaaz Sarpanch connects complaint reporting with the resolution process.

Complaint Submitted
        ↓
Panchayat Reviews
        ↓
Action Taken
        ↓
Resolution Evidence Added
        ↓
Citizen Checks Resolution
        ↓
     Is it fixed?
       /     \
     YES      NO
      ↓        ↓
    CLOSE    REOPEN

The complaint does not have to end when the Panchayat marks an issue as resolved.

The citizen can verify the reported repair and reopen the complaint if the issue is still present.

👤 Citizen Experience

The citizen workflow is designed to be simple and accessible:

Select Language
      ↓
Speak or Type
      ↓
Add Photo
      ↓
Add Location Context
      ↓
Submit Complaint
      ↓
Track Status
      ↓
Review Resolution
      ↓
Verify or Reopen

The goal is to reduce dependency on lengthy typing and make local problem reporting easier.

🏛️ Panchayat Dashboard

The Panchayat side provides a structured view of grievances.

It supports:

Complaint review
AI-assisted classification
Service identification
Priority information
Complaint status tracking
Similar complaint grouping
Recurring issue analysis
Resolution updates
Resolution evidence
Citizen verification status

This allows the Panchayat to move from individual complaint handling toward a broader understanding of recurring local issues.

📱 Key Prototype Modules

The prototype demonstrates a web-based grievance workflow including:

Citizen Modules
Landing page
Citizen registration/login
Complaint reporting
Voice/text complaint submission
Photo evidence
Location context
AI-assisted complaint preview
Complaint tracking
My complaints
Complaint details
Resolution verification
Panchayat/Admin Modules
Dashboard
Complaint management
Complaint filtering
Complaint classification
Recurring issue analysis
Resolution management
Resolution verification
Grievance analytics
🏗️ System Architecture
                       CITIZEN
                          │
              Voice / Text / Photo
                          │
                          ▼
                ┌─────────────────┐
                │    FRONTEND     │
                │   React / Vite  │
                └────────┬────────┘
                         │
                         ▼
                ┌─────────────────┐
                │     BACKEND     │
                │     FastAPI     │
                └────────┬────────┘
                         │
             ┌───────────┼───────────┐
             │           │           │
             ▼           ▼           ▼
        Speech-to-Text   AI       Database
                       Analysis      / Data
             │           │           │
             └───────────┼───────────┘
                         │
                         ▼
                PANCHAYAT DASHBOARD
                         │
                         ▼
                Resolution Workflow
                         │
                         ▼
                Citizen Verification
🛠️ Technology Stack
Frontend
React
Vite
JavaScript
CSS
Backend
Python
FastAPI
AI / Processing
Speech-to-Text
AI-assisted complaint analysis
Complaint classification
Indic language/script processing
Database
SQLite
Deployment
Vercel
Render
📂 Project Structure
SIH/
│
├── backend/
│
├── public/
│
├── src/
│
├── .github/
│   └── workflows/
│
├── package.json
├── package-lock.json
├── requirements.txt
├── render.yaml
├── vercel.json
├── README.md
└── start-tunnel.js
🔐 Responsible AI & Accountability

Awaaz Sarpanch is designed with responsible deployment in mind.

Key principles include:

Human review for uncertain AI results
Controlled access to grievance information
Protection of citizen and complaint data
Evidence-based resolution
Citizen verification before final closure
Clear distinction between prototype functionality and future integrations

The core prototype workflow does not depend on unsupported government integrations.

🌐 Accessibility & Rural-First Design

The platform is designed to reduce common barriers faced by citizens.

The approach includes:

🎙️ Voice-first interaction
🌐 Multilingual-friendly reporting
✍️ Simple complaint submission
📸 Photo-based evidence
📍 Location context
📋 Clear complaint status
✅ Citizen verification
📶 Low-bandwidth-oriented design considerations
🔁 Complete Complaint Lifecycle
┌──────────────────────┐
│   Citizen Reports    │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│    AI Understands    │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│ Complaint Classified  │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│  Service Identified  │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│  Panchayat Reviews   │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│ Similar Issues Grouped│
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│ Panchayat Takes Action│
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│ Resolution Evidence  │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│ Citizen Verification │
└──────────┬───────────┘
           ↓
      ┌───────────┐
      │  Fixed?   │
      └─────┬─────┘
            │
       ┌────┴────┐
       ▼         ▼
      YES        NO
       │         │
       ▼         ▼
     CLOSE     REOPEN
🎯 Key Value Proposition

Awaaz Sarpanch connects:

Citizen Voice

↓

Evidence

↓

AI Understanding

↓

Panchayat Action

↓

Resolution Evidence

↓

Citizen Verification

The focus is not only on collecting complaints, but on helping move complaints toward verified resolution.

🧪 Prototype Scope

The current project demonstrates the core grievance workflow through a web-based prototype.

The prototype focuses on:

Citizen complaint reporting
Voice/text interaction
Complaint processing
AI-assisted understanding
Complaint tracking
Panchayat-side management
Recurring issue analysis
Resolution evidence
Citizen verification

Production deployment would require additional validation, infrastructure, security, scalability, testing, and authorized integrations.

🔮 Future Scope

Future development can include:

🇮🇳 Support for additional Indian languages
🎙️ Improved regional speech recognition
📶 Offline-first complaint submission and synchronization
🔔 Notifications and alerts
📊 Advanced grievance analytics
🗄️ Scalable production database infrastructure
🔗 Authorized government API integrations
🔐 Improved security and access control
📈 Expected Impact

Awaaz Sarpanch is designed to improve the grievance lifecycle by:

For Citizens
Making reporting easier through voice
Reducing dependence on typing
Allowing supporting evidence
Providing complaint status visibility
Giving citizens a way to verify reported resolutions
For Panchayats
Providing structured complaint information
Supporting service/department identification
Highlighting similar complaints
Identifying recurring issues
Supporting resolution tracking
Maintaining resolution evidence
Overall

The platform aims to create a more:

Accessible → Evidence-based → Trackable → Verifiable

grievance workflow.

🚀 Scalability

The prototype architecture is designed so that individual components can be extended as the system grows.

Potential scaling directions include:

Migration from prototype database infrastructure to production-grade databases
Scalable backend deployment
Improved AI processing pipelines
Additional Indian language support
Offline synchronization
Notification services
Advanced analytics
Authorized government system integrations
🧪 Current Prototype vs Future Deployment
Area	Current Prototype	Future Scope
Citizen reporting	✅ Demonstrated	—
Voice/Text input	✅ Demonstrated	Improved regional speech
Photo evidence	✅ Supported	—
Location context	✅ Supported	Enhanced location services
AI-assisted processing	✅ Demonstrated	Improved models
Complaint classification	✅ Supported	Advanced classification
Similar complaint grouping	✅ Demonstrated	Advanced clustering
Panchayat dashboard	✅ Demonstrated	Production deployment
Resolution workflow	✅ Demonstrated	Government workflow integration
Citizen verification	✅ Demonstrated	Enhanced verification
Indian language coverage	Current supported set	More languages
Government APIs	Not required for core prototype	Authorized integration
📌 Project Information
Item	Details
Project Name	Awaaz Sarpanch
Hackathon	Smart India Hackathon 2026
Category	Software
Problem Statement ID	SIH26202
Team ID	138406
Team	Code Nexa
Live Prototype	https://sih-lake-sigma.vercel.app/
Source Code	https://github.com/divya5623/SIH
👥 Team Code Nexa
Smart India Hackathon 2026

Team ID: 138406
Problem Statement: SIH26202
Category: Software

📜 Development Principles

Awaaz Sarpanch follows these development principles:

Accessibility First — reduce barriers to reporting
Evidence First — support complaints with contextual evidence
AI-Assisted, Human-Aware — AI supports the workflow while uncertain cases can receive human review
Accountability — track the grievance lifecycle
Citizen Verification — allow citizens to verify reported resolutions
Responsible Integration — distinguish prototype capabilities from future authorized integrations
🇮🇳 Vision
From a Citizen's Voice to a Verified Resolution.

Awaaz Sarpanch aims to make local grievance reporting:

Simpler. Evidence-based. Transparent. Accountable.

By connecting citizens and Panchayats through an AI-assisted grievance workflow, the platform aims to transform a complaint from a simple report into a trackable path toward resolution.

🚀 Awaaz Sarpanch
Voice → Evidence → AI → Action → Verification → Resolution
