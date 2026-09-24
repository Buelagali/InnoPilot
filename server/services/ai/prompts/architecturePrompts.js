const architecturePrompts = {
  generateArchitecture: (idea) => `
You are a Principal Software Architect.
Design a complete, end-to-end technical system architecture for this software project:

Project Idea:
${JSON.stringify(idea, null, 2)}

Provide a comprehensive architectural blueprint covering:
1. Frontend Client Tier
2. API / Backend Microservices Tier
3. AI/ML Inference & Data Pipeline Tier
4. Data Persistence & Caching Tier
5. Authentication & Security Middleware
6. External APIs & Third-party integrations
7. Step-by-step Data Flow
8. Formatted Text-Based / ASCII Flow Diagram

Return a strict JSON object with this exact structure:
{
  "systemOverview": "High-level summary of the architectural pattern (e.g., Decoupled Client-Server with Dedicated AI Microservice)",
  "frontendTier": {
    "framework": "React 18 + Tailwind CSS",
    "stateManagement": "React Context / Zustand",
    "keyModules": ["Auth Views", "Interactive Workflows", "Analytics Dashboards", "Real-time Notifications"]
  },
  "backendTier": {
    "framework": "Node.js + Express REST API",
    "keyRoutes": ["/api/auth", "/api/projects", "/api/ai", "/api/analytics"],
    "middleware": ["JWT Authentication", "Role-Based Access Control", "Rate Limiter", "Input Validator", "Global Error Handler"]
  },
  "aiTier": {
    "engine": "LLM Service + Specialized ML Models",
    "processingPipeline": "Input Sanitization -> Context Retrieval -> Prompt Orchestration -> Schema Enforcement -> Response Post-processing",
    "fallbackStrategy": "Deterministic mock/rule fallback on API degradation"
  },
  "databaseTier": {
    "primaryDB": "MongoDB Atlas",
    "collections": ["users", "problems", "projectIdeas", "ideaVersions", "analyses", "roadmaps"],
    "caching": "In-memory caching / Redis"
  },
  "externalIntegrations": [
    "Gemini / OpenAI API",
    "Authentication / OAuth Providers",
    "Cloud Storage (AWS S3 / Cloudinary if files needed)"
  ],
  "dataFlowSteps": [
    "1. Client initiates request with JWT Bearer token in headers",
    "2. Express middleware validates token and applies rate limits",
    "3. Controller validates payload and passes to AIService / Business Logic",
    "4. AI Service structures prompt and queries LLM provider with fallback handling",
    "5. Results persisted to MongoDB Atlas and returned as standard JSON response to client",
    "6. React client updates local state and renders frosted glass UI components"
  ],
  "asciiDiagram": "Client (React + Glassmorphism UI)\\n      │ (HTTPS / JSON + JWT)\\n      ▼\\nExpress REST API Gateway\\n  ├── Rate Limiter & Security Headers\\n  ├── JWT Auth & Role Middleware\\n  ├── Controllers & Validators\\n  │\\n  ├──► AI Service Layer (Gemini / LLM Providers)\\n  │       └── Prompt Orchestration & JSON Validator\\n  │\\n  └──► MongoDB Atlas Cluster\\n          ├── Users & Preferences\\n          ├── Problems & Idea Versions\\n          └── Roadmaps & Analysis Reports"
}

Return ONLY valid JSON.
`,
};

module.exports = architecturePrompts;
