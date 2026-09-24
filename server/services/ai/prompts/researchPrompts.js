const researchPrompts = {
  findResearchGap: (idea) => `
You are a Senior Academic Researcher and Peer Reviewer.
Identify legitimate, authentic Research Gaps and academic contribution potential for this project idea:

Project Idea:
${JSON.stringify(idea, null, 2)}

STRICT RULES:
1. DO NOT fabricate or hallucinate specific authors, fake paper titles, or fictional DOIs.
2. Formulate grounded research questions based on real-world engineering trade-offs (e.g., accuracy vs latency, data scarcity, cold-start problem, explainability, multi-agent coordination).
3. Clearly separate "Established State-of-the-Art Paradigms" from "AI-Proposed Novel Hypotheses".

Return a strict JSON object with this exact structure:
{
  "existingApproaches": [
    {
      "paradigm": "Standard Baseline / Industry Approach 1",
      "mechanism": "How traditional systems operate in this domain",
      "knownLimitations": [
        "Limitation 1 (e.g., high false-positive rate under noise)",
        "Limitation 2 (e.g., computational bottleneck on edge devices)"
      ]
    },
    {
      "paradigm": "Heuristic / Rule-based Approach 2",
      "mechanism": "Manual rule systems or static scoring",
      "knownLimitations": [
        "Inability to generalize to unseen distribution shifts"
      ]
    }
  ],
  "observedResearchGap": "Thorough articulation of the exact whitespace between current tools and real-world needs",
  "proposedImprovement": "The specific algorithmic, architectural, or workflow innovation this project introduces",
  "researchQuestions": [
    "RQ1: How does [Proposed Mechanism] compare against [Standard Baseline] in terms of [Metric]?",
    "RQ2: What is the computational overhead when deploying [Technique] in low-resource environments?"
  ],
  "expectedAcademicContribution": [
    "Contribution 1: Novel hybrid pipeline architecture",
    "Contribution 2: Empirical benchmark on curated domain scenarios",
    "Contribution 3: Open-source reproducible implementation"
  ],
  "suggestedEvaluationMetrics": [
    "F1-Score / Accuracy under noisy inputs",
    "P95 Inference Latency (ms)",
    "User Task Completion Time (sec)",
    "Memory footprint (MB)"
  ],
  "academicIntegrityNote": "All hypotheses should be empirically validated through controlled experiments. References should be verified using Google Scholar, IEEE Xplore, or arXiv."
}

Return ONLY valid JSON.
`,
};

module.exports = researchPrompts;
