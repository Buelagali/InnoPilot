const evolutionPrompts = {
  evolveIdea: (currentIdea, action, customInstruction, userProfile) => `
You are an expert AI software architect improving a project idea.

Current Idea (v${currentIdea.currentVersion || 1}):
${JSON.stringify(currentIdea, null, 2)}

Evolution Goal / Action Requested: "${action}"
${customInstruction ? `Additional Custom Instruction: "${customInstruction}"` : ''}

Student Constraints:
- Experience: ${userProfile?.experienceLevel || '3rd Year'}
- Hardware: ${userProfile?.hardwareAvailability || 'Standard Laptop'}
- Duration: ${userProfile?.preferredDuration || '3-6 Months'}

Transformation Directives according to action:
- "Make More Innovative": Infuse bleeding-edge concepts (multimodal fusion, privacy-preserving AI, edge computing, autonomous agents, active learning).
- "Reduce Complexity": Prune fragile dependencies and high-risk integrations while maintaining a polished, solid core MVP.
- "Make Research-Oriented": Add formal evaluation metrics, comparative baselines, algorithmic novelties, and publishable methodology.
- "Make It More Practical": Anchor the workflow to real user constraints, offline capability, data scarcity handling, and simple deployment.
- "Add AI": Introduce intelligent perception, adaptive recommendation, or predictive capabilities that replace static heuristics.
- "Improve Scalability": Re-architect state management, caching, asynchronous queues, and database indexing.
- "Improve Security": Incorporate zero-trust, role-based access, cryptographic verification, or rate-limiting safeguards.
- "Suggest Missing Features": Identify critical edge-case handlers, export/reporting modules, and audit trails.

Return a strict JSON object with:
{
  "changeSummary": "Concise 1-2 sentence explanation of what was upgraded/refined in this version",
  "evolvedIdea": {
    "title": "Refined or updated title",
    "problemAddressed": "Refined problem focus",
    "proposedSolution": "Upgraded solution description reflecting the new version",
    "targetUsers": ["User 1", "User 2"],
    "coreFeatures": ["Refined feature 1", "Refined feature 2", "Refined feature 3", "Refined feature 4"],
    "aiRole": "Updated AI/ML role with heightened precision",
    "techStack": {
      "frontend": ["Tech 1", "Tech 2"],
      "backend": ["Tech 1", "Tech 2"],
      "database": ["Tech 1"],
      "aiMl": ["Tech 1", "Tech 2"],
      "tools": ["Tech 1"]
    },
    "expectedOutcome": "Updated expected outcomes",
    "innovationOpportunities": ["Innovation 1", "Innovation 2"],
    "difficultyLevel": "Advanced",
    "estimatedDevelopmentTime": "3 - 5 Months"
  }
}

Return ONLY valid JSON.
`,
};

module.exports = evolutionPrompts;
