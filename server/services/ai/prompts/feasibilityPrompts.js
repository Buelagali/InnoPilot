const feasibilityPrompts = {
  analyzeFeasibility: (idea, userProfile) => `
You are a Principal Engineering Lead and Academic Project Evaluator.
Perform a rigorous, 360-degree Feasibility Assessment for this project idea:

Project Idea:
${JSON.stringify(idea, null, 2)}

Student Profile Constraints:
- Experience Level: ${userProfile?.experienceLevel || '3rd Year Undergrad'}
- Team Size: ${userProfile?.teamSize || 2}
- Hardware: ${userProfile?.hardwareAvailability || 'Standard Laptop'}
- Budget: ${userProfile?.budget || 'Zero Budget (Open Source)'}
- Duration: ${userProfile?.preferredDuration || '3-6 Months'}

Return a strict JSON object with this exact structure:
{
  "overallScore": 84,
  "overallVerdict": "Highly Feasible with Recommended Scope Adjustments",
  "technicalFeasibility": {
    "score": 85,
    "requiredTechnologies": ["Tech 1", "Tech 2", "Tech 3"],
    "apiRequirements": ["API 1 (Free tier available)", "API 2"],
    "aiModelRequirements": "Exact model family (e.g. lightweight quantized LLM or open-source transformer)",
    "datasetRequirements": "Public datasets, Kaggle sources, or synthetic generation protocol",
    "infrastructure": "Local dev + free hosting (Vercel/Render/Atlas)"
  },
  "timeFeasibility": {
    "score": 80,
    "mvpTimeline": "4 - 6 Weeks (Core workflow + basic UI)",
    "fullTimeline": "12 - 16 Weeks (Complete testing, fine-tuning & documentation)",
    "milestones": [
      "Week 1-3: Dataset pipeline & backend prototype",
      "Week 4-7: AI integration & core business logic",
      "Week 8-11: Responsive frontend & glassmorphism UI",
      "Week 12-16: Evaluation benchmarks & paper/proposal writeup"
    ]
  },
  "teamFeasibility": {
    "score": 90,
    "recommendedTeamSize": ${userProfile?.teamSize || 2},
    "requiredRoles": [
      "Full-Stack Lead (UI/UX + API integration)",
      "AI/ML & Data Engineer (Pipelines, prompts/models & benchmarks)"
    ]
  },
  "costAnalysis": {
    "isFreeTierViable": true,
    "freeTierAlternatives": [
      "MongoDB Atlas M0 Free Cluster",
      "Google Gemini Free Tier / Groq Free Tier / Hugging Face Spaces",
      "Vercel / Render free deployment tier"
    ],
    "potentialPaidCosts": "Optional domain ($10) or compute burst ($15) if dataset exceeds local memory"
  },
  "hardwareRequirements": {
    "minimumSpecs": "8GB RAM, Quad-Core CPU",
    "recommendedSpecs": "16GB RAM, Dedicated GPU (CUDA) or Google Colab Pro",
    "isHardwareMandatory": false,
    "notes": "Can execute inference via cloud APIs without requiring heavy local GPU"
  },
  "riskMatrix": [
    {
      "category": "Technical Risk",
      "description": "API rate limits or dependency deprecation",
      "mitigation": "Implement local caching and fallback mock adapters"
    },
    {
      "category": "Data Risk",
      "description": "Scarcity of labelled niche training data",
      "mitigation": "Use few-shot prompt engineering or synthetic data generation"
    },
    {
      "category": "AI Hallucination Risk",
      "description": "AI generating unverified facts",
      "mitigation": "Ground generation with strict JSON schemas and validation regex"
    },
    {
      "category": "Deployment Risk",
      "description": "Cold start latency on free-tier servers",
      "mitigation": "Use health check pingers and lightweight container images"
    }
  ]
}

Return ONLY valid JSON.
`,
};

module.exports = feasibilityPrompts;
