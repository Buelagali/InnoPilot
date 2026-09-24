const roadmapPrompts = {
  generateRoadmap: (idea, userProfile) => `
You are an Agile Technical Project Manager and Academic Capstone Mentor.
Create a personalized, 10-phase milestone roadmap for this project:

Project: ${idea.title}
Solution: ${idea.proposedSolution}
Difficulty: ${idea.difficultyLevel || 'Intermediate'}
Student Duration: ${userProfile?.preferredDuration || '3-6 Months'}
Team Size: ${userProfile?.teamSize || 2}

Generate 10 structured phases:
1. Requirement Analysis & Problem Formalization
2. UI/UX Wireframing & Responsive Prototyping
3. Authentication & Security Middleware
4. Database Architecture & Seed Data
5. Core Feature Engineering & REST APIs
6. AI/ML Integration & Pipeline Orchestration
7. Evaluation, Testing & Performance Benchmarking
8. Similarity, Ethics & Safety Verification
9. Production Deployment & Cloud Hosting
10. Final Academic Documentation & Defense Preparation

Return a strict JSON object with this exact structure:
{
  "totalEstimatedWeeks": 16,
  "phases": [
    {
      "phaseNumber": 1,
      "phaseTitle": "Phase 1: Requirement Analysis & Problem Formalization",
      "description": "Solidify problem scope, user personas, and technical constraints",
      "tasks": [
        {
          "title": "Define User Stories and Functional Requirements",
          "description": "Document explicit use cases and acceptance criteria",
          "estimatedDays": 4,
          "deliverables": ["SRS Document", "Scope Checklist"]
        },
        {
          "title": "Data Source & API Feasibility Audit",
          "description": "Verify availability of datasets and LLM/API quotas",
          "estimatedDays": 3,
          "deliverables": ["Data Pipeline Schema"]
        }
      ]
    },
    {
      "phaseNumber": 2,
      "phaseTitle": "Phase 2: UI/UX Wireframing & Glassmorphic Layouts",
      "description": "Design modern mobile-first interfaces and user journeys",
      "tasks": [
        {
          "title": "Create Mobile & Desktop Layout Wireframes",
          "description": "Design responsive navigation, cards, and modal components",
          "estimatedDays": 5,
          "deliverables": ["Component Mockups", "Theme Palette"]
        }
      ]
    },
    {
      "phaseNumber": 3,
      "phaseTitle": "Phase 3: Authentication & Security Architecture",
      "description": "Implement JWT authentication, password hashing, and role-based guards",
      "tasks": [
        {
          "title": "Build Auth API & JWT Middleware",
          "description": "Register, Login, Token validation, and password encryption with bcrypt",
          "estimatedDays": 4,
          "deliverables": ["/api/auth endpoints", "Auth Context"]
        }
      ]
    },
    {
      "phaseNumber": 4,
      "phaseTitle": "Phase 4: Database Modeling & Persistence Layer",
      "description": "Setup MongoDB Mongoose schemas with indexes and relationships",
      "tasks": [
        {
          "title": "Implement Mongoose Models and Relationships",
          "description": "Create schemas for users, ideas, versions, and analyses",
          "estimatedDays": 4,
          "deliverables": ["Mongoose Schemas", "DB Seed Scripts"]
        }
      ]
    },
    {
      "phaseNumber": 5,
      "phaseTitle": "Phase 5: Core Business Logic & REST API Endpoints",
      "description": "Develop controllers, route handlers, and error handling middleware",
      "tasks": [
        {
          "title": "Build Core CRUD and Action Endpoints",
          "description": "Implement project management, versioning, and status update controllers",
          "estimatedDays": 6,
          "deliverables": ["REST API Controllers", "API Documentation"]
        }
      ]
    },
    {
      "phaseNumber": 6,
      "phaseTitle": "Phase 6: AI/ML Service Integration & Prompt Engineering",
      "description": "Integrate LLM service layer with structured output parsing and fallbacks",
      "tasks": [
        {
          "title": "Build Dedicated AI Service Layer",
          "description": "Implement Gemini/LLM API adapter with prompt templates and error resilience",
          "estimatedDays": 6,
          "deliverables": ["AIService Module", "AI Controller Endpoints"]
        }
      ]
    },
    {
      "phaseNumber": 7,
      "phaseTitle": "Phase 7: Comprehensive Testing & Benchmarking",
      "description": "Execute unit, integration, and load tests across frontend and backend",
      "tasks": [
        {
          "title": "API & Frontend Component Testing",
          "description": "Verify error handling, responsive viewports, and edge cases",
          "estimatedDays": 5,
          "deliverables": ["Test Suites", "QA Audit Log"]
        }
      ]
    },
    {
      "phaseNumber": 8,
      "phaseTitle": "Phase 8: Similarity, Security & Ethics Verification",
      "description": "Audit system against baseline plagiarism, data privacy, and security best practices",
      "tasks": [
        {
          "title": "Security & Uniqueness Audit",
          "description": "Verify rate limiting, sanitization, and evidence-based similarity comparison",
          "estimatedDays": 4,
          "deliverables": ["Audit Report", "Sanitization Fixes"]
        }
      ]
    },
    {
      "phaseNumber": 9,
      "phaseTitle": "Phase 9: Production Deployment & CI/CD",
      "description": "Deploy frontend and backend independently to cloud infrastructure",
      "tasks": [
        {
          "title": "Cloud Deployment & Environment Config",
          "description": "Deploy backend to Render/Railway and frontend to Vercel/Netlify with HTTPS",
          "estimatedDays": 4,
          "deliverables": ["Live Production URLs", "CI/CD Pipeline"]
        }
      ]
    },
    {
      "phaseNumber": 10,
      "phaseTitle": "Phase 10: Final Academic Documentation & Defense Prep",
      "description": "Generate comprehensive project report, slide deck, and live demonstration",
      "tasks": [
        {
          "title": "Compile Final Capstone Project Report",
          "description": "Synthesize problem statement, architecture diagrams, results, and proposal",
          "estimatedDays": 5,
          "deliverables": ["Final Project Proposal PDF", "Presentation Deck"]
        }
      ]
    }
  ]
}

Return ONLY valid JSON.
`,
};

module.exports = roadmapPrompts;
