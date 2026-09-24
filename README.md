# InnoPilot — Full-Stack AI Project Discovery & Innovation Platform

> **A production-grade web application that helps students discover real-world problems and transform them into unique, feasible, research-oriented software capstone projects.**

---

## 🌟 Overview & Philosophy

InnoPilot is **NOT** a chatbot or random project title generator. It is a systematic innovation workbench built around the complete engineering lifecycle:

$$\text{Problem Discovery} \longrightarrow \text{Problem Analysis} \longrightarrow \text{Idea Generation} \longrightarrow \text{Evolution} \longrightarrow \text{Similarity Check} \longrightarrow \text{Feasibility Analysis} \longrightarrow \text{Research Gap} \longrightarrow \text{Architecture} \longrightarrow \text{Roadmap} \longrightarrow \text{Proposal}$$

When a student says *"I want to build a major project, but I don't know what problem to solve"*, InnoPilot guides them through targeted probing questions, architectural analysis, version-controlled iterations, empirical novelty validation, and eventually exports a formal, publication-ready Capstone Project Proposal.

---

## 🏗️ Architecture & Technology Stack

```
[ React 18 + Tailwind CSS + Glassmorphism UI ]
                  │
                  ▼ (HTTPS / REST + JWT Bearer Auth)
[ Node.js + Express.js API Gateway ]
   ├── Rate Limiting & Input Sanitization
   ├── JWT Auth & Role-Based Access Control (Student / Admin)
   ├── REST Controllers & Error Handlers
   │
   ├──► [ Dedicated AI Service Layer ]
   │       ├── Google Gemini API (1.5 Flash / 2.0)
   │       ├── Prompt Engineering & Strict JSON Parsers
   │       └── Resilient Offline Simulation Engine
   │
   └──► [ MongoDB Atlas Persistence ]
           ├── Users, Problems, and Project Ideas
           ├── Idea Versions (v1, v2, v3... snapshots)
           ├── Similarity, Feasibility & Research Gap Analyses
           └── 10-Phase Roadmaps & Task State Trackers
```

### Stack Breakdown

| Tier | Technologies |
| :--- | :--- |
| **Frontend** | React.js 18, Tailwind CSS v3 (Glassmorphism), React Router v6, Axios, Lucide React, Vite |
| **Backend** | Node.js, Express.js REST API, JSON Web Tokens (JWT), bcryptjs password hashing, Morgan |
| **Database** | MongoDB Atlas / Local MongoDB, Mongoose ODM with indexed relationships |
| **AI Layer** | Backend AI Service with Google Gemini API (`@google/generative-ai`) and resilient domain simulation fallback |
| **Security** | Rate limiters, bcrypt encryption, CORS security headers, role authorization guards |

---

## 🚀 The 14 Core Modules

1. **Student Profile (Module 1):** Captures academic level, branch, skills, AI/ML knowledge, web dev knowledge, budget, hardware availability, team size, and research interest. The AI uses these constraints in all recommendations.
2. **Problem Discovery (Module 2):** Guided AI conversation asking probing questions about real-world friction and underserved domains to synthesize a formal **Problem Discovery Report**.
3. **AI Problem Analyzer (Module 3):** Deep architectural analysis of raw problem statements evaluating clarity, root cause, target users, existing solution limitations, stakeholders, and technical complexity.
4. **AI Project Idea Generator (Module 4):** Generates 3 non-generic, high-impact project ideas with explicit AI/ML roles, technology stacks, and difficulty levels.
5. **Idea Evolution Engine (Module 5):** Version-controlled iteration ($v1 \to v2 \to v3$). One-click transformation actions: *Make More Innovative*, *Reduce Complexity*, *Make Research-Oriented*, *Add AI*, *Improve Scalability*, *Improve Security*, with version comparison and restore.
6. **Similarity & Novelty Analysis (Module 6):** Evidence-based similarity analysis benchmarking against literature without fake 100% uniqueness claims. Distinguishes commodity components from novel contributions.
7. **360° Feasibility Analyzer (Module 7):** Rigorous evaluation of technical feasibility, MVP vs full capstone timeline, team roles, zero-cost open-source alternatives, hardware specs, and risk matrices.
8. **Research Gap Finder (Module 8):** Identifies academic whitespace, articulates formal research questions (RQ1, RQ2), and suggests empirical evaluation benchmarks for thesis defense.
9. **Project Architecture Generator (Module 9):** Generates a decoupled 3-tier blueprint (Frontend, Backend, AI, Database, Auth, Data Flow) and a text-based ASCII architecture diagram.
10. **10-Phase Project Roadmap (Module 10):** Personalized implementation roadmap with interactive task checkboxes (Not Started $\to$ In Progress $\to$ Completed) and real-time progress calculation.
11. **Project Dashboard (Module 11):** Metrics center tracking problems discovered, ideas saved, evolutions created, capstone readiness score, and quick launchpads.
12. **Project Library (Module 12):** Search, filter by domain/difficulty, duplicate, version history inspect, and manage saved ideas.
13. **Project Proposal Generator (Module 13):** Formal 15-section capstone proposal with one-click Markdown copy and print-ready PDF export.
14. **Contextual AI Companion (Module 14):** Floating and full-page AI mentor aware of active project parameters, requirements, roadmap, and analyses.
15. **Admin Dashboard:** Platform telemetry, user management (promote/demote/disable), problem categories, and system metrics.

---

## 💻 Local Setup & Development Guide

### Prerequisites
- **Node.js**: v18.0 or newer
- **MongoDB**: Local MongoDB instance or free [MongoDB Atlas](https://www.mongodb.com/atlas) connection URI
- **Gemini API Key** *(Optional)*: Free key from [Google AI Studio](https://aistudio.google.com)

### 1. Clone & Install Dependencies
```bash
# Clone repository
git clone <repo-url>
cd "FSD project"

# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

### 2. Configure Environment Variables
In `server/.env`:
```env
PORT=5001
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/ai-project-discovery
JWT_SECRET=super_secret_jwt_key_innovation_platform_2026_xyz
JWT_EXPIRE=7d
GEMINI_API_KEY=your_gemini_api_key_here
AI_MODEL=gemini-1.5-flash
CLIENT_URL=http://localhost:5173
```
*(Note: If `GEMINI_API_KEY` is left blank, the backend automatically uses its built-in domain-aware simulation engine.)*

### 3. Run Development Servers

**Option A — Separate Terminals:**
```bash
# Terminal 1: Backend Server (runs on http://localhost:5001)
cd server
npm run dev

# Terminal 2: Frontend Client (runs on http://localhost:5173)
cd client
npm run dev
```

**Option B — Using Root Scripts:**
```bash
# From workspace root
npm run server
npm run client
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📡 API Endpoints Reference

### Authentication (`/api/auth`)
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register new student profile | Public |
| `POST` | `/api/auth/login` | Authenticate user & get JWT | Public |
| `GET` | `/api/auth/me` | Get current logged-in user profile | Private |
| `PUT` | `/api/auth/profile` | Update student profile & skills | Private |
| `PUT` | `/api/auth/password` | Change password | Private |

### Problems (`/api/problems`)
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/problems/discover/chat` | AI problem discovery dialogue | Private |
| `POST` | `/api/problems/discover/finalize` | Synthesize Discovery Report | Private |
| `POST` | `/api/problems/analyze-manual` | Analyze raw problem statement | Private |
| `GET` | `/api/problems` | List user's problem reports | Private |
| `GET` | `/api/problems/:id` | Get problem details | Private |

### Projects & Evolution (`/api/projects`)
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/projects/generate` | Generate 3 distinct ideas | Private |
| `GET` | `/api/projects` | Query user's project library | Private |
| `GET` | `/api/projects/:id` | Get single project idea | Private |
| `POST` | `/api/projects/:id/evolve` | Evolve idea version (v1 $\to$ v2) | Private |
| `GET` | `/api/projects/:id/versions` | List all version snapshots | Private |
| `POST` | `/api/projects/:id/restore-version/:versionNumber` | Revert to previous version | Private |
| `POST` | `/api/projects/:id/duplicate` | Clone project idea | Private |
| `DELETE` | `/api/projects/:id` | Delete idea and version tree | Private |

### Analysis Suites (`/api/analysis`)
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/analysis/:projectId` | Get all cached analyses | Private |
| `POST` | `/api/analysis/:projectId/similarity` | Run similarity check | Private |
| `POST` | `/api/analysis/:projectId/feasibility` | Run feasibility assessment | Private |
| `POST` | `/api/analysis/:projectId/research-gap` | Run research gap finder | Private |
| `POST` | `/api/analysis/:projectId/architecture` | Generate system blueprint | Private |
| `POST` | `/api/analysis/:projectId/proposal` | Synthesize formal proposal | Private |

### Roadmap (`/api/roadmaps`)
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/roadmaps/:projectId` | Get 10-phase project roadmap | Private |
| `POST` | `/api/roadmaps/:projectId/generate` | Generate fresh roadmap | Private |
| `PUT` | `/api/roadmaps/:projectId/tasks/:taskId` | Toggle task status | Private |

### Contextual AI Assistant (`/api/ai`)
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/ai/assistant/chat` | Context-aware chat query | Private |
| `GET` | `/api/ai/assistant/history` | Get assistant message history | Private |

### Admin (`/api/admin`)
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/admin/stats` | System telemetry & metrics | Admin Only |
| `GET` | `/api/admin/users` | List and search all users | Admin Only |
| `PUT` | `/api/admin/users/:id` | Update role or toggle status | Admin Only |
| `GET` | `/api/admin/categories` | List problem domains | Public / Private |

---

## 🌐 Production Deployment

The decoupled architecture allows frontend and backend to be deployed independently:

### 1. Backend Deployment (Render / Railway / Fly.io)
1. Push `server/` directory to your GitHub repository.
2. Link the repository on Render / Railway as a Web Service.
3. Set environment variables in the cloud dashboard:
   - `MONGODB_URI`: Your MongoDB Atlas cluster connection string.
   - `JWT_SECRET`: A secure 64-character secret.
   - `GEMINI_API_KEY`: Your Google Gemini API key.
   - `CLIENT_URL`: The production URL of your frontend (e.g., `https://innopilot.vercel.app`).
4. Build Command: `npm install` | Start Command: `npm start`.

### 2. Frontend Deployment (Vercel / Netlify)
1. Link the repository on Vercel.
2. Root Directory: `client`.
3. Build Command: `npm run build` | Output Directory: `dist`.
4. Add rewrite rule for client-side routing in `client/vercel.json` if needed.

---

## 🔒 Security & Academic Integrity

- **Password Hashing:** Stored with salt rounds using `bcryptjs`.
- **JWT Protection:** Authorization via standard `Bearer <token>` HTTP headers.
- **Zero Hallucinated Citations:** Research gap and similarity modules focus on real software paradigms and formal methodology without fabricating author names or DOIs.
- **No API Keys in Frontend:** All AI interactions and keys are strictly contained within backend microservices.

---

## 📄 License

Distributed under the MIT License. Built for university capstone engineering innovation.
