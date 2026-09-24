const llmProvider = require('./llmProvider');
const discoveryPrompts = require('./prompts/discoveryPrompts');
const analyzerPrompts = require('./prompts/analyzerPrompts');
const ideaPrompts = require('./prompts/ideaPrompts');
const evolutionPrompts = require('./prompts/evolutionPrompts');
const similarityPrompts = require('./prompts/similarityPrompts');
const feasibilityPrompts = require('./prompts/feasibilityPrompts');
const researchPrompts = require('./prompts/researchPrompts');
const architecturePrompts = require('./prompts/architecturePrompts');
const roadmapPrompts = require('./prompts/roadmapPrompts');
const proposalPrompts = require('./prompts/proposalPrompts');
const assistantPrompts = require('./prompts/assistantPrompts');

class AIService {
  async getDiscoveryQuestion(domain, history, userProfile) {
    if (!history || history.length === 0) {
      const prompt = discoveryPrompts.getInitialQuestion(domain, userProfile);
      return await llmProvider.generateText(prompt);
    }
    const prompt = discoveryPrompts.getFollowUpQuestion(domain, history, userProfile);
    return await llmProvider.generateText(prompt);
  }

  async generateDiscoveryReport(domain, history, userProfile) {
    const prompt = discoveryPrompts.generateReport(domain, history, userProfile);
    return await llmProvider.generateJSON(prompt);
  }

  async analyzeProblem(problemText, userProfile) {
    const prompt = analyzerPrompts.analyzeProblem(problemText, userProfile);
    return await llmProvider.generateJSON(prompt);
  }

  async generateIdeas(problemContext, userProfile) {
    const prompt = ideaPrompts.generateIdeas(problemContext, userProfile);
    return await llmProvider.generateJSON(prompt);
  }

  async evolveIdea(currentIdea, action, customInstruction, userProfile) {
    const prompt = evolutionPrompts.evolveIdea(currentIdea, action, customInstruction, userProfile);
    return await llmProvider.generateJSON(prompt);
  }

  async analyzeSimilarity(idea, savedProjectsContext = []) {
    const prompt = similarityPrompts.analyzeSimilarity(idea, savedProjectsContext);
    return await llmProvider.generateJSON(prompt);
  }

  async analyzeFeasibility(idea, userProfile) {
    const prompt = feasibilityPrompts.analyzeFeasibility(idea, userProfile);
    return await llmProvider.generateJSON(prompt);
  }

  async findResearchGap(idea) {
    const prompt = researchPrompts.findResearchGap(idea);
    return await llmProvider.generateJSON(prompt);
  }

  async generateArchitecture(idea) {
    const prompt = architecturePrompts.generateArchitecture(idea);
    return await llmProvider.generateJSON(prompt);
  }

  async generateRoadmap(idea, userProfile) {
    const prompt = roadmapPrompts.generateRoadmap(idea, userProfile);
    return await llmProvider.generateJSON(prompt);
  }

  async generateProposal(idea, analyses, userProfile) {
    const prompt = proposalPrompts.generateProposal(idea, analyses, userProfile);
    return await llmProvider.generateJSON(prompt);
  }

  async chatWithAssistant(userMessage, contextData, userProfile) {
    const prompt = assistantPrompts.chatWithContext(userMessage, contextData, userProfile);
    return await llmProvider.generateText(prompt);
  }
}

module.exports = new AIService();
