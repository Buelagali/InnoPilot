const proposalPrompts = {
  generateProposal: (idea, analyses = {}, userProfile) => `
You are a Distinguished Academic Dean and Capstone Review Board Chairman.
Synthesize a formal, comprehensive, publication-ready Final Project Proposal for:

Project Idea:
${JSON.stringify(idea, null, 2)}

Available Analysis Context:
- Similarity Analysis: ${JSON.stringify(analyses.similarity || 'Standard academic novelty verified')}
- Feasibility Analysis: ${JSON.stringify(analyses.feasibility || 'Technically & temporally feasible within 16 weeks')}
- Research Gaps: ${JSON.stringify(analyses.research_gap || 'Clear whitespace identified over traditional heuristics')}
- Architecture: ${JSON.stringify(analyses.architecture || 'Decoupled Client-Server with dedicated AI Service')}

Student/Author Profile:
- Author: ${userProfile?.name || 'Student Researcher'}
- Institution: ${userProfile?.college || 'Department of Computer Science & Engineering'}
- Branch: ${userProfile?.branch || 'Computer Science'}

Generate a formal 15-section Capstone Project Proposal structured as follows:

Return a strict JSON object with this exact structure:
{
  "projectTitle": "${idea.title}",
  "abstract": "Dense, authoritative 200-word academic abstract summarizing the domain, problem, proposed technological innovation, and expected impact.",
  "problemStatement": "Detailed formulation of the challenge, root causes, and why current commercial/manual systems fail.",
  "existingSystem": "Comprehensive review of current industry practices, legacy software, and their inherent architectural bottlenecks.",
  "proposedSystem": "Thorough exposition of the proposed solution, its intelligent processing pipeline, and workflow.",
  "objectives": [
    "Specific Objective 1 (e.g. Design and implement a low-latency inference module)",
    "Specific Objective 2 (e.g. Develop a responsive, mobile-first glassmorphic user dashboard)",
    "Specific Objective 3 (e.g. Empirically evaluate system precision and user task completion rate)"
  ],
  "targetUsers": [
    "Primary beneficiary persona",
    "Secondary institutional stakeholder",
    "System administrator / auditor"
  ],
  "majorFeatures": [
    "Feature 1 with technical detail",
    "Feature 2 with technical detail",
    "Feature 3 with technical detail",
    "Feature 4 with technical detail"
  ],
  "technologyStack": {
    "frontend": "${(idea.techStack?.frontend || ['React.js', 'Tailwind CSS']).join(', ')}",
    "backend": "${(idea.techStack?.backend || ['Node.js', 'Express.js']).join(', ')}",
    "database": "${(idea.techStack?.database || ['MongoDB Atlas']).join(', ')}",
    "aiMl": "${(idea.techStack?.aiMl || ['Google Gemini API / LangChain']).join(', ')}",
    "devops": "${(idea.techStack?.tools || ['Docker', 'Vercel / Render']).join(', ')}"
  },
  "aiComponents": "Deep explanation of the AI models, prompt strategies, semantic similarity routines, and algorithmic novelties employed.",
  "systemArchitecture": "Detailed narrative explaining how the React UI, Express Gateway, AI Layer, and MongoDB Atlas interact with JWT security.",
  "expectedResults": "Quantitative and qualitative deliverables, measurable performance criteria, and real-world outcomes.",
  "advantages": [
    "Advantage 1 over existing methods",
    "Advantage 2: Cost-effectiveness and open-source foundation",
    "Advantage 3: Scalability and cross-platform accessibility"
  ],
  "limitations": [
    "Limitation 1: Dependency on network connectivity for cloud inference",
    "Limitation 2: Initial cold-start data requirement"
  ],
  "futureScope": [
    "Future enhancement 1: Federated learning across decentralized nodes",
    "Future enhancement 2: Native mobile app deployment with offline cached models",
    "Future enhancement 3: Multi-language localized speech interface"
  ]
}

Return ONLY valid JSON.
`,
};

module.exports = proposalPrompts;
