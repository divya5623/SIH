
# AWAAZ SARPANCH 🇮🇳
### Voice-First AI for Accessible, Transparent & Accountable Local Governance

> **Citizens Speak. AI Understands. Authorities Act.**

**Team:** Code Nexa  
**Team ID:** 138406  
**Problem Statement ID:** SIH26202  
**Category:** Smart Automation  
**Theme:** Software / Student Innovation  
**Organization:** AICTE

---

## 📌 About the Project

**Awaaz Sarpanch** is a voice-first, AI-powered civic grievance reporting and tracking platform designed to make local governance more accessible to citizens.

Many citizens face difficulties when reporting civic problems because of:

- Language barriers
- Limited digital literacy
- Uncertainty about the correct department
- Lack of complaint tracking
- Limited visibility into grievance resolution

Awaaz Sarpanch allows citizens to **speak or type their complaints naturally**. The system helps interpret the complaint, identify the relevant service or department, create a trackable grievance, and provide visibility into its progress.

### Our Vision

> Make government services easier to access by allowing citizens to communicate in a natural and familiar way.

---

## 🎯 Key Features

### 👥 Citizen Platform

- Voice-based complaint reporting
- Text-based complaint submission
- Multilingual-friendly interface
- Location and ward information
- AI-assisted complaint understanding
- Complaint tracking with grievance ID
- Complaint status timeline
- Resolution verification and feedback

### 🤖 AI-Assisted Processing

- Speech-to-text input
- Complaint classification
- Service and department identification
- Priority identification
- Confidence-aware processing
- Human verification for uncertain cases
- Recurring issue and complaint-cluster insights

### 🏛️ Administrative Dashboard

- Complaint overview and statistics
- Complaint filtering and searching
- Department-wise complaint information
- Priority and status monitoring
- Recurring issue detection
- Resolution verification
- Administrative analytics

---

## 🧩 How the System Works

```text
Citizen speaks or types a complaint
                ↓
Input captured by the platform
                ↓
Speech-to-text / Text processing
                ↓
AI-based complaint understanding
                ↓
Category and department identification
                ↓
Confidence check and verification
                ↓
Grievance record creation
                ↓
Citizen tracking + Admin dashboard
                ↓
Resolution feedback and monitoring
```

---

## 🏗️ System Architecture

The platform is organised into the following layers:

### 1. Presentation Layer

- React
- Vite
- Responsive user interface
- Citizen and administration screens

### 2. Backend and API Layer

- Python
- FastAPI
- Complaint processing APIs
- Authentication and request handling
- Integration with AI services

### 3. AI and Language Layer

- Speech-to-text processing
- Bhashini integration reference
- AI-assisted natural language understanding
- Indic script and language processing
- Complaint classification and routing

### 4. Data Layer

- Complaint records
- User information
- Grievance status history
- SQLite-based backend storage
- Future scalability through a production database

### 5. Output Layer

- Citizen complaint tracking
- Administrative dashboard
- Complaint analytics
- Recurring issue identification
- Resolution verification

---

## 🖥️ Application Screens

The application includes the following major screens:

| Screen | Purpose |
|---|---|
| Landing Page | Introduces the platform and its capabilities |
| Complaint Reporting | Allows citizens to speak, type, or provide evidence |
| AI Preview | Displays extracted complaint information |
| Complaint Tracking | Shows grievance ID and progress |
| My Complaints | Lists citizen complaints and statuses |
| Complaint Details | Displays complaint information and timeline |
| Admin Dashboard | Provides administrative monitoring |
| Complaint Management | Filters and manages grievances |
| Recurring Issues | Highlights repeated local problems |
| Resolution Verification | Collects citizen feedback |
| Login and Registration | Supports user access and verification |

---

## 🛠️ Technology Stack

### Frontend

- React
- Vite
- JavaScript
- CSS
- Responsive UI design

### Backend

- Python
- FastAPI
- REST APIs

### AI and Language Technologies

- Bhashini API integration reference
- Speech-to-text processing
- Natural language processing
- Indic script classification
- AI-assisted complaint understanding

### Database and Deployment

- SQLite
- Render deployment configuration
- Vercel deployment configuration

> Technology availability, API access, and deployment configuration should be verified before production integration.

---

## 🚀 Getting Started

### Prerequisites

Install the following:

- Node.js
- npm
- Python
- Git

### Clone the Repository

```bash
git clone https://github.com/divya5623/SIH.git
cd SIH
```

### Frontend Setup

```bash
npm install
```

### Start the Frontend

```bash
npm run dev
```

Open the local development URL shown in your terminal.

### Backend Setup

The repository contains a backend directory and Python dependency configuration.

```bash
cd backend
```

Install the backend dependencies using the repository's requirements file:

```bash
pip install -r ../requirements.txt
```

> Configure the required environment variables and external API credentials before starting backend services.

---

## 🌐 Project Links

- **GitHub Repository:**  
  https://github.com/divya5623/SIH

- **Live Application:**  
  https://sih-lake-sigma.vercel.app/

- **Project Category:** Smart Automation

- **Problem Statement ID:** SIH26202

---

## 🔐 Responsible AI and Privacy

The platform is designed with the following considerations:

- Human review for uncertain AI classifications
- Controlled access to administrative information
- Protection of sensitive grievance data
- Avoidance of unsupported government integrations
- Clear distinction between prototype functionality and future deployment
- Verification of external API permissions before production use

---

## 🔮 Future Enhancements

- Support for additional Indian languages
- Improved regional speech recognition
- Government department integrations through authorised APIs
- SMS and messaging notifications
- Advanced grievance analytics
- Offline and store-and-forward support
- Improved security and access control
- Scalable production database infrastructure

---

## 👥 Team Code Nexa

We are building Awaaz Sarpanch to improve communication between citizens and local governance systems through accessible technology, AI-assisted understanding, and transparent grievance tracking.

---

## 📄 Project Status

**Current focus:** AI-assisted civic grievance reporting, tracking, and administrative monitoring.

This repository contains the application implementation, backend configuration, interface screens, and supporting project resources.

---

## ⭐ Support the Project

If you find this project useful, consider starring the repository and sharing your feedback.

**Awaaz Sarpanch — Empowering Citizens. Strengthening Local Governance.**
