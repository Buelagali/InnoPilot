import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { projectAPI, problemAPI } from '../../services/api';
import { useProject } from '../../context/ProjectContext';
import {
  Lightbulb,
  Sparkles,
  ArrowRight,
  Cpu,
  Clock,
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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6 text-[#2D2530]">
      <WorkflowStepIndicator currentStepId="generator" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFFBEB] text-[#D97706] border border-[#FDE68A] text-xs font-semibold mb-2">
            <Lightbulb className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>Module 4 • AI Project Idea Generator</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#2D2530] tracking-tight font-heading">
            Generate Architectural Project Ideas
          </h1>
          <p className="text-xs sm:text-sm text-[#5E5364] mt-1 max-w-2xl">
            Strictly non-generic. Every idea integrates purposeful AI/algorithmic intelligence, robust software architecture, and realistic constraints matching your profile.
          </p>
        </div>

        {!problemId && (
          <button
            onClick={() => handleGenerate()}
            disabled={loading}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#E91E63] via-[#FB923C] to-[#F59E0B] text-white font-semibold text-xs sm:text-sm shadow-xl shadow-orange-500/20 hover:scale-105 transition-all flex items-center gap-2 disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4" />
            {loading ? 'Generating...' : 'Generate New Solutions'}
          </button>
        )}
      </div>

      {/* Linked Problem Header Banner */}
      {problemData && (
        <div className="p-5 border border-[#FED7AA] bg-[#FFF7ED] rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xs">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#EA580C]">
              Anchored Problem Context
            </span>
            <h3 className="text-base font-bold text-[#2D2530] mt-0.5 font-heading">{problemData.title}</h3>
            <p className="text-xs text-[#5E5364] mt-1 line-clamp-2">{problemData.description}</p>
          </div>
          <Badge variant="peach">{problemData.domain}</Badge>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Standalone Generation Options if no problem linked */}
      {!problemId && ideas.length === 0 && (
        <GlassCard className="p-6 border-[#FED7AA] bg-white shadow-sm">
          <h3 className="text-sm font-bold text-[#2D2530] mb-3 font-heading">Instant Domain Generation</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#2D2530] mb-1">Select Domain</label>
              <select
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm bg-white text-[#2D2530] border-[#FED7AA]"
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
              <label className="block text-xs font-semibold text-[#2D2530] mb-1">
                Specific Sub-theme or Keyword (Optional)
              </label>
              <input
                type="text"
                value={customProblemPrompt}
                onChange={(e) => setCustomProblemPrompt(e.target.value)}
                placeholder="e.g. Offline edge computing, federated learning"
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm text-[#2D2530] placeholder-[#8E8295] border-[#FED7AA]"
              />
            </div>
          </div>
        </GlassCard>
      )}

      {/* Loading Skeleton */}
      {loading && (
        <div className="p-12 text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-[#FFFBEB] border border-[#FDE68A] flex items-center justify-center mx-auto text-[#D97706] animate-spin">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-[#2D2530]">Synthesizing Non-Generic Project Architectures...</h3>
          <p className="text-xs text-[#5E5364] max-w-md mx-auto">
            Structuring algorithmic pipelines, assessing edge vs cloud feasibility, and validating novelty.
          </p>
        </div>
      )}

      {/* Ideas Card Grid with Multi-Color Pastel Accent Borders */}
      {!loading && ideas.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[#5E5364]">
              Generated Solution Architectures ({ideas.length})
            </h2>
            <span className="text-xs text-[#EA580C] font-semibold">Saved to Project Library</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {ideas.map((idea, idx) => {
              const borderStyles = [
                'border-[#FED7AA] hover:border-[#FB923C]', // Peach
                'border-[#FDE68A] hover:border-[#F59E0B]', // Gold
                'border-[#BBF7D0] hover:border-[#10B981]', // Mint
              ];
              const borderClass = borderStyles[idx % borderStyles.length];

              return (
                <GlassCard
                  key={idea._id || idx}
                  className={`p-6 ${borderClass} bg-white flex flex-col justify-between transition-all group shadow-sm hover:shadow-md`}
                >
                  <div className="space-y-4">
                    {/* Card Header Badges */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#F1E4EC]">
                      <Badge variant={idx % 2 === 0 ? 'peach' : 'gold'}>{idea.domain || domain}</Badge>
                      <Badge
                        variant={
                          idea.difficultyLevel === 'Advanced' || idea.difficultyLevel === 'Research Grade'
                            ? 'gold'
                            : 'mint'
                        }
                      >
                        {idea.difficultyLevel}
                      </Badge>
                    </div>

                    {/* Title & Problem */}
                    <div>
                      <h3 className="text-base font-bold text-[#2D2530] group-hover:text-[#E91E63] transition-colors font-heading">
                        {idea.title}
                      </h3>
                      <p className="text-xs text-[#EA580C] font-semibold mt-1">
                        Addresses: {idea.problemAddressed}
                      </p>
                    </div>

                    {/* Solution Narrative */}
                    <p className="text-xs text-[#2D2530] leading-relaxed bg-[#FAF8FB] p-3.5 rounded-xl border border-[#F1E4EC]">
                      {idea.proposedSolution}
                    </p>

                    {/* Core Features */}
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#5E5364] block mb-1.5">
                        Core Features:
                      </span>
                      <ul className="space-y-1">
                        {(idea.coreFeatures || []).slice(0, 3).map((feat, fIdx) => (
                          <li key={fIdx} className="text-xs text-[#2D2530] flex items-start gap-2">
                            <CheckCircle className="w-3.5 h-3.5 text-[#10B981] flex-shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* AI/ML Role */}
                    <div className="p-3 rounded-xl bg-[#FFFBEB] border border-[#FDE68A] text-xs">
                      <span className="font-bold text-[#D97706] flex items-center gap-1 mb-1">
                        <Cpu className="w-3.5 h-3.5 text-[#F59E0B]" /> AI/ML Intelligence Role:
                      </span>
                      <p className="text-[#2D2530] text-[11px] leading-relaxed">{idea.aiRole}</p>
                    </div>

                    {/* Tech Stack Summary */}
                    {idea.techStack && (
                      <div className="text-[11px] text-[#5E5364] flex items-center gap-1.5 flex-wrap">
                        <Code className="w-3.5 h-3.5 text-[#0284C7]" />
                        <span>{[(idea.techStack.frontend || [])[0], (idea.techStack.backend || [])[0], (idea.techStack.aiMl || [])[0]].filter(Boolean).join(' • ')}</span>
                      </div>
                    )}
                  </div>

                  {/* Card CTA Footer */}
                  <div className="mt-6 pt-4 border-t border-[#F1E4EC] flex items-center justify-between gap-3">
                    <div className="flex items-center gap-1 text-[11px] text-[#5E5364]">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{idea.estimatedDevelopmentTime || '3-4 Months'}</span>
                    </div>

                    <button
                      onClick={() => handleSelectIdea(idea)}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#E91E63] via-[#FB923C] to-[#F59E0B] text-white text-xs font-semibold shadow-md shadow-orange-500/20 hover:scale-105 transition-all flex items-center gap-1.5"
                    >
                      <span>Select & Evolve</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </GlassCard>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default IdeaGenerator;
