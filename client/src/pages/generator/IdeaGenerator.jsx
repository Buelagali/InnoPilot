import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { projectAPI, problemAPI } from '../../services/api';
import { useProject } from '../../context/ProjectContext';
import {
  Lightbulb,
  Sparkles,
  ArrowRight,
  GitBranch,
  Layers,
  Cpu,
  Clock,
  Award,
  AlertCircle,
  CheckCircle,
  Code,
} from 'lucide-react';
import { GlassCard } from '../../components/common/GlassCard';
import { Badge } from '../../components/common/Badge';
import WorkflowStepIndicator from '../../components/common/WorkflowStepIndicator';

const IdeaGenerator = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const problemId = searchParams.get('problemId');
  const { selectProject } = useProject();

  const [problemData, setProblemData] = useState(null);
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [domain, setDomain] = useState('Healthcare & Medicine');
  const [customProblemPrompt, setCustomProblemPrompt] = useState('');

  useEffect(() => {
    const fetchProblem = async () => {
      if (problemId) {
        try {
          const res = await problemAPI.getProblemById(problemId);
          if (res.data.success) {
            setProblemData(res.data.problem);
            setDomain(res.data.problem.domain);
            // Auto trigger generation if problem loaded
            handleGenerate(res.data.problem);
          }
        } catch (err) {
          console.error('Failed to load problem', err);
        }
      }
    };

    fetchProblem();
  }, [problemId]);

  const handleGenerate = async (prob = null) => {
    setLoading(true);
    setError('');

    try {
      const payload = {
        problemId: prob?._id || problemId || null,
        domain: prob?.domain || domain,
        problemText: prob?.description || customProblemPrompt || 'Engineering optimization challenge',
        title: prob?.title || `Challenge in ${domain}`,
      };

      const res = await projectAPI.generateIdeas(payload);
      if (res.data.success) {
        setIdeas(res.data.ideas);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to generate ideas. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectIdea = (idea) => {
    selectProject(idea);
    navigate('/evolve');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <WorkflowStepIndicator currentStepId="generator" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fce4ec] text-[#e91e63] border border-[#f3c5d3] text-xs font-semibold mb-2">
            <Lightbulb className="w-3.5 h-3.5 text-[#e91e63]" />
            <span>Module 4 • AI Project Idea Generator</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#3a2630] tracking-tight">
            Generate Architectural Project Ideas
          </h1>
          <p className="text-xs sm:text-sm text-[#6b5560] mt-1 max-w-2xl">
            Strictly non-generic. Every idea integrates purposeful AI/algorithmic intelligence, robust software architecture, and realistic constraints matching your profile.
          </p>
        </div>

        {!problemId && (
          <button
            onClick={() => handleGenerate()}
            disabled={loading}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#e91e63] via-[#ec407a] to-[#f43f5e] hover:from-[#d81b60] hover:to-[#e91e63] text-white font-semibold text-xs sm:text-sm shadow-xl shadow-pink-500/20 hover:scale-105 transition-all flex items-center gap-2 disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4" />
            {loading ? 'Generating...' : 'Generate New Solutions'}
          </button>
        )}
      </div>

      {/* Linked Problem Header Banner */}
      {problemData && (
        <GlassCard className="p-5 border-[#f3c5d3] bg-[#fff8fa] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#e91e63]">
              Anchored Problem Context
            </span>
            <h3 className="text-base font-bold text-[#3a2630] mt-0.5">{problemData.title}</h3>
            <p className="text-xs text-[#6b5560] mt-1 line-clamp-2">{problemData.description}</p>
          </div>
          <Badge variant="pink">{problemData.domain}</Badge>
        </GlassCard>
      )}

      {error && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Standalone Generation Options if no problem linked */}
      {!problemId && ideas.length === 0 && (
        <GlassCard className="p-6 border-[#f3c5d3] bg-white/90">
          <h3 className="text-sm font-bold text-[#3a2630] mb-3">Instant Domain Generation</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#3a2630] mb-1">Select Domain</label>
              <select
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm bg-white text-[#3a2630] border-[#f3c5d3]"
              >
                <option value="Healthcare & Medicine">Healthcare & Medicine</option>
                <option value="Education & Accessibility">Education & Accessibility</option>
                <option value="Agriculture & Food Security">Agriculture & Food Security</option>
                <option value="Environment & Climate Tech">Environment & Climate Tech</option>
                <option value="Transportation & Logistics">Transportation & Logistics</option>
                <option value="Cybersecurity & Privacy">Cybersecurity & Privacy</option>
                <option value="Software Systems & DevOps">Software Systems & DevOps</option>
                <option value="Smart Campus & Community">Smart Campus & Community</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#3a2630] mb-1">
                Specific Sub-theme or Keyword (Optional)
              </label>
              <input
                type="text"
                value={customProblemPrompt}
                onChange={(e) => setCustomProblemPrompt(e.target.value)}
                placeholder="e.g. Offline edge computing, federated learning"
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm text-[#3a2630] placeholder-[#886a7a] border-[#f3c5d3]"
              />
            </div>
          </div>
        </GlassCard>
      )}

      {/* Loading Skeleton */}
      {loading && (
        <div className="p-12 text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-[#fce4ec] border border-[#f3c5d3] flex items-center justify-center mx-auto text-[#e91e63] animate-spin">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-[#3a2630]">Synthesizing Non-Generic Project Architectures...</h3>
          <p className="text-xs text-[#6b5560] max-w-md mx-auto">
            Structuring algorithmic pipelines, assessing edge vs cloud feasibility, and validating novelty.
          </p>
        </div>
      )}

      {/* Ideas Card Grid */}
      {!loading && ideas.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[#6b5560]">
              Generated Solution Architectures ({ideas.length})
            </h2>
            <span className="text-xs text-[#e91e63] font-medium">Saved to Project Library</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {ideas.map((idea, idx) => (
              <GlassCard
                key={idea._id || idx}
                className="p-6 border-[#f3c5d3] bg-white/95 flex flex-col justify-between hover:border-[#e91e63]/60 transition-all group shadow-md shadow-pink-500/5"
              >
                <div className="space-y-4">
                  {/* Card Header Badges */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#f3c5d3]">
                    <Badge variant="pink">{idea.domain || domain}</Badge>
                    <Badge
                      variant={
                        idea.difficultyLevel === 'Advanced' || idea.difficultyLevel === 'Research Grade'
                          ? 'pink'
                          : 'rose'
                      }
                    >
                      {idea.difficultyLevel}
                    </Badge>
                  </div>

                  {/* Title & Problem */}
                  <div>
                    <h3 className="text-base font-bold text-[#3a2630] group-hover:text-[#e91e63] transition-colors">
                      {idea.title}
                    </h3>
                    <p className="text-xs text-[#e91e63] font-medium mt-1">
                      Addresses: {idea.problemAddressed}
                    </p>
                  </div>

                  {/* Solution Narrative */}
                  <p className="text-xs text-[#3a2630] leading-relaxed bg-[#fff8fa] p-3.5 rounded-xl border border-[#f3c5d3]">
                    {idea.proposedSolution}
                  </p>

                  {/* Core Features */}
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#6b5560] block mb-1.5">
                      Core Features:
                    </span>
                    <ul className="space-y-1">
                      {(idea.coreFeatures || []).slice(0, 3).map((feat, fIdx) => (
                        <li key={fIdx} className="text-xs text-[#3a2630] flex items-start gap-2">
                          <CheckCircle className="w-3.5 h-3.5 text-[#e91e63] flex-shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* AI/ML Role */}
                  <div className="p-3 rounded-xl bg-[#fce4ec]/50 border border-[#f3c5d3] text-xs">
                    <span className="font-bold text-[#e91e63] flex items-center gap-1 mb-1">
                      <Cpu className="w-3.5 h-3.5 text-[#e91e63]" /> AI/ML Intelligence Role:
                    </span>
                    <p className="text-[#3a2630] text-[11px] leading-relaxed">{idea.aiRole}</p>
                  </div>

                  {/* Tech Stack Summary */}
                  {idea.techStack && (
                    <div className="text-[11px] text-[#6b5560] flex items-center gap-1.5 flex-wrap">
                      <Code className="w-3.5 h-3.5 text-[#e91e63]" />
                      <span>{[(idea.techStack.frontend || [])[0], (idea.techStack.backend || [])[0], (idea.techStack.aiMl || [])[0]].filter(Boolean).join(' • ')}</span>
                    </div>
                  )}
                </div>

                {/* Card CTA Footer */}
                <div className="mt-6 pt-4 border-t border-[#f3c5d3] flex items-center justify-between gap-3">
                  <div className="flex items-center gap-1 text-[11px] text-[#6b5560]">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{idea.estimatedDevelopmentTime || '3-4 Months'}</span>
                  </div>

                  <button
                    onClick={() => handleSelectIdea(idea)}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#e91e63] via-[#ec407a] to-[#f43f5e] hover:from-[#d81b60] hover:to-[#e91e63] text-white text-xs font-semibold shadow-md shadow-pink-500/20 hover:scale-105 transition-all flex items-center gap-1.5"
                  >
                    <span>Select & Evolve</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default IdeaGenerator;
