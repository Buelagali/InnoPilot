const ideaPrompts = {
  generateIdeas: (problemContext, userProfile) => `
You are a Principal AI Architect and University Capstone Advisor.
Generate 3 distinct, high-impact, technologically credible software project ideas to solve this problem:

Problem Title: ${problemContext.title || problemContext.identifiedProblem}
Problem Summary: ${problemContext.description || problemContext.problemDescription}
Target Domain: ${problemContext.domain || 'Technology'}

Student Profile Constraints:
- Branch: ${userProfile?.branch || 'Computer Science'}
- Skills: ${(userProfile?.skills || []).join(', ') || 'React, Node.js, Python, PyTorch'}
- Programming Languages: ${(userProfile?.programmingLanguages || []).join(', ') || 'JavaScript, Python'}
- Hardware: ${userProfile?.hardwareAvailability || 'Standard Laptop + Cloud'}
- Budget: ${userProfile?.budget || 'Open Source'}
- Project Level: ${userProfile?.preferredProjectType || 'Major Project'}

CRITICAL RULES:
1. STRICTLY FORBIDDEN: Generic chatbots, basic e-commerce, simple attendance systems, generic hospital management, basic portfolio websites, or trivial CRUD dashboards.
2. Every idea MUST have a concrete, purposeful AI/ML or Algorithmic intelligence layer.
3. Every idea must specify clear target users, innovation opportunities, and realistic tech stack matching student profile.

Return a JSON array of 3 project idea objects with this exact schema:
[
  {
    "title": "Creative, compelling project title",
    "problemAddressed": "Direct problem aspect this project tackles",
    "proposedSolution": "Detailed multi-sentence solution mechanism and architecture overview",
    "targetUsers": ["User group 1", "User group 2"],
    "coreFeatures": [
      "Feature 1: Specific algorithmic/intelligent module",
      "Feature 2: Real-time or interactive workflow",
      "Feature 3: Analytics / decision-support interface",
      "Feature 4: Resilient data pipeline or automation"
    ],
    "aiRole": "Explicit explanation of what AI/ML model, LLM agent, or optimization algorithm does and why it cannot be solved by simple rules",
    "techStack": {
      "frontend": ["React", "Tailwind CSS"],
      "backend": ["Node.js / Express", "FastAPI"],
      "database": ["MongoDB Atlas", "Redis / Vector DB"],
      "aiMl": ["PyTorch / HuggingFace", "Gemini API / LangChain / OpenCV"],
      "tools": ["Docker", "Git"]
    },
    "expectedOutcome": "Measurable impact, academic deliverable, or operational benefit",
    "innovationOpportunities": [
      "Key innovation facet 1",
      "Key innovation facet 2"
    ],
    "difficultyLevel": "Advanced",
    "estimatedDevelopmentTime": "3 - 5 Months"
  }
]

Difficulty levels must be one of: "Beginner", "Intermediate", "Advanced", "Research Grade".
Return ONLY valid JSON array.
`,
};

module.exports = ideaPrompts;
