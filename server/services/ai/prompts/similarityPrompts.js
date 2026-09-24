const similarityPrompts = {
  analyzeSimilarity: (idea, savedProjectsContext = []) => `
You are a peer-review auditor and intellectual property analyst in computer science.
Conduct a realistic, evidence-based similarity and novelty analysis for this project idea:

Project Idea:
${JSON.stringify(idea, null, 2)}

Contextual Internal Knowledge Base / Known Literature:
${JSON.stringify(savedProjectsContext.slice(0, 5), null, 2)}

CRITICAL PRINCIPLES:
1. NEVER claim an idea is "100% unique" or "completely novel" — almost all software combines established algorithms, frameworks, and patterns.
2. Provide an honest, nuanced percentage of concept overlap with existing open-source projects, academic papers, and commercial products.
3. Highlight exact points of convergence (commodity features) and divergence (novel architectural or algorithmic contributions).
4. Clearly state the limitations of the analysis (e.g., evaluated against standard academic corpora and open-source ecosystems).

Return a strict JSON object with this exact structure:
{
  "similarityScore": 38,
  "similarityLevel": "Moderate Overlap",
  "disclaimer": "This analysis is an AI-assisted evaluation based on general academic and open-source software literature. It is not an official patent or copyright clearance.",
  "similarProjects": [
    {
      "name": "Existing Platform / Paradigm A",
      "concept": "Brief description of how they solve a related problem",
      "overlapAreas": ["Feature/stack overlap area 1", "Overlap area 2"]
    },
    {
      "name": "Standard Academic Baseline B",
      "concept": "Traditional methodology in literature",
      "overlapAreas": ["Algorithmic overlap"]
    }
  ],
  "potentiallySimilarComponents": [
    "Common UI/CRUD pattern",
    "Standard JWT auth & database layer",
    "Generic dataset usage"
  ],
  "distinctiveComponents": [
    "Novel domain-specific constraint handling",
    "Custom multi-agent orchestration or pipeline",
    "Tailored metric evaluation mechanism"
  ],
  "differentiatingStrategies": [
    "Strategy 1: How to pivot the data pipeline or architecture to stand out",
    "Strategy 2: How to introduce unique offline/hybrid intelligence",
    "Strategy 3: What specific evaluation benchmark to publish"
  ]
}

similarityScore should be an integer between 15 and 85.
Return ONLY valid JSON.
`,
};

module.exports = similarityPrompts;
