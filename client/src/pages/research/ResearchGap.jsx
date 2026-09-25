import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProject } from '../../context/ProjectContext';
import { analysisAPI } from '../../services/api';
import {
  BookOpen,
  Sparkles,
  HelpCircle,
  Award,
  Layers,
  CheckCircle,
  ArrowRight,
  ShieldAlert,
  GraduationCap,
  TrendingUp,
} from 'lucide-react';
import { GlassCard } from '../../components/common/GlassCard';
import { Badge } from '../../components/common/Badge';
import WorkflowStepIndicator from '../../components/common/WorkflowStepIndicator';

const ResearchGap = () => {
  const navigate = useNavigate();
  const { activeProject, analyses, updateAnalysesMap } = useProject();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [gapData, setGapData] = useState(analyses?.research_gap || null);

  useEffect(() => {
    if (analyses?.research_gap) {
      setGapData(analyses.research_gap);
    } else if (activeProject?._id) {
      handleRunAnalysis();
    }
  }, [activeProject?._id]);

  const handleRunAnalysis = async () => {
    if (!activeProject?._id) return;
    setLoading(true);
    setError('');

    try {
      const res = await analysisAPI.analyzeResearchGap(activeProject._id);
      if (res.data.success) {
        setGapData(res.data.analysis);
        updateAnalysesMap('research_gap', res.data.analysis);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to analyze research gaps.');
    } finally {
      setLoading(false);
    }
  };

  if (!activeProject) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <GlassCard className="p-8 border-[#BAE6FD] bg-white">
          <BookOpen className="w-12 h-12 text-[#0284C7] mx-auto mb-3" />
          <h2 className="text-xl font-bold text-[#2D2530]">No Active Project Selected</h2>
          <p className="text-xs text-[#5E5364] max-w-md mx-auto">
            Please select or generate a project first to identify academic research gaps.
          </p>
          <button
            onClick={() => navigate('/library')}
            className="mt-4 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#0EA5E9] via-[#38BDF8] to-[#0284C7] text-white text-xs font-semibold shadow-md shadow-sky-500/20"
          >
            Go to Project Library
          </button>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6 text-[#2D2530]">
      <WorkflowStepIndicator currentStepId="research" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F0F9FF] text-[#0284C7] border border-[#BAE6FD] text-xs font-semibold mb-2">
            <BookOpen className="w-3.5 h-3.5 text-[#0EA5E9]" />
            <span>Module 8 • Research Gap Finder</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#2D2530] tracking-tight font-heading">
            Academic Research Gap & Contribution
          </h1>
          <p className="text-xs sm:text-sm text-[#5E5364] mt-1 max-w-2xl">
            Essential for final-year major projects and thesis publications. The AI structures legitimate research questions and novel contributions without fabricating authors or paper titles.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRunAnalysis}
            disabled={loading}
            className="px-4 py-2 rounded-xl glass-panel text-xs text-[#5E5364] hover:text-[#2D2530] border border-[#F1E4EC] flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#0EA5E9]" />
            {loading ? 'Analyzing...' : 'Re-Discover Gaps'}
          </button>
          <button
            onClick={() => navigate('/architecture')}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#0EA5E9] via-[#38BDF8] to-[#0284C7] hover:opacity-95 text-white text-xs font-semibold shadow-md shadow-sky-500/20 hover:scale-105 transition-all flex items-center gap-1.5"
          >
            <span>Next: Architecture Blueprint</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {loading && (
        <div className="p-12 text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-[#F0F9FF] border border-[#BAE6FD] flex items-center justify-center mx-auto text-[#0284C7] animate-spin">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-[#2D2530]">Formulating Academic Research Gaps...</h3>
          <p className="text-xs text-[#5E5364] max-w-md mx-auto">
            Contrasting state-of-the-art baselines, articulating empirical novelties, and framing formal research questions.
          </p>
        </div>
      )}

      {gapData && !loading && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
          {/* Observed Research Gap Hero Banner - Soft Gold / Sky Blue */}
          <div className="p-6 sm:p-8 rounded-2xl border border-[#FDE68A] pastel-glass-gold shadow-sm">
            <Badge variant="gold" className="mb-3">
              <GraduationCap className="w-3.5 h-3.5 text-[#D97706]" /> Core Research Whitespace
            </Badge>
            <h2 className="text-xl sm:text-2xl font-bold text-[#2D2530] leading-relaxed font-heading">
              {gapData.observedResearchGap}
            </h2>
            <div className="mt-4 p-4 rounded-xl bg-white border border-[#FDE68A] text-xs text-[#2D2530] leading-relaxed">
              <span className="font-bold text-[#D97706] block mb-1">Proposed Methodological Innovation:</span>
              {gapData.proposedImprovement}
            </div>
          </div>

          {/* Existing Baselines vs Limitations */}
          <GlassCard className="p-6 border-[#BAE6FD] bg-white shadow-sm">
            <h3 className="text-sm font-bold text-[#2D2530] mb-4 flex items-center gap-2 font-heading">
              <Layers className="w-4 h-4 text-[#0EA5E9]" />
              Existing Paradigms & Their Known Limitations
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(gapData.existingApproaches || []).map((app, i) => (
                <div key={i} className="p-4 rounded-xl bg-[#F0F9FF] border border-[#BAE6FD] space-y-2 text-xs">
                  <h4 className="font-bold text-[#2D2530] font-heading">{app.paradigm}</h4>
                  <p className="text-[#5E5364] leading-relaxed">{app.mechanism}</p>
                  <div className="pt-2 border-t border-[#BAE6FD] space-y-1">
                    <span className="font-semibold text-[#0284C7] block text-[11px]">Known Limitations:</span>
                    <ul className="space-y-0.5 text-[#5E5364]">
                      {(app.knownLimitations || []).map((lim, lIdx) => (
                        <li key={lIdx}>• {lim}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Formulated Research Questions (RQs) */}
          <GlassCard className="p-6 border-[#F1E4EC] bg-white space-y-4 shadow-sm">
            <h3 className="text-sm font-bold text-[#2D2530] flex items-center gap-2 font-heading">
              <HelpCircle className="w-4 h-4 text-[#0EA5E9]" />
              Formulated Research Questions (For Thesis Defense)
            </h3>
            <div className="space-y-3">
              {(gapData.researchQuestions || []).map((rq, i) => (
                <div key={i} className="p-4 rounded-xl bg-[#FAF8FB] border border-[#F1E4EC] text-xs text-[#2D2530] flex items-start gap-3">
                  <span className="font-mono font-bold text-[#0284C7] px-2 py-0.5 rounded bg-[#F0F9FF] border border-[#BAE6FD]">
                    RQ{i + 1}
                  </span>
                  <p className="leading-relaxed font-medium mt-0.5">{rq}</p>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Academic Contributions & Metrics Grid with Mint & Gold Tokens */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Mint Green Contributions */}
            <div className="p-6 rounded-2xl border border-[#BBF7D0] pastel-glass-mint space-y-3 shadow-2xs">
              <h3 className="text-sm font-bold text-[#2D2530] flex items-center gap-2 font-heading">
                <Award className="w-4 h-4 text-[#10B981]" />
                Expected Academic Contributions
              </h3>
              <ul className="space-y-2 text-xs text-[#2D2530]">
                {(gapData.expectedAcademicContribution || []).map((c, i) => (
                  <li key={i} className="p-3 rounded-xl bg-white border border-[#BBF7D0] flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-[#10B981] flex-shrink-0 mt-0.5" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Soft Gold Metrics */}
            <div className="p-6 rounded-2xl border border-[#FDE68A] pastel-glass-gold space-y-3 shadow-2xs">
              <h3 className="text-sm font-bold text-[#2D2530] flex items-center gap-2 font-heading">
                <TrendingUp className="w-4 h-4 text-[#D97706]" />
                Suggested Benchmark Evaluation Metrics
              </h3>
              <ul className="space-y-2 text-xs text-[#2D2530]">
                {(gapData.suggestedEvaluationMetrics || []).map((m, i) => (
                  <li key={i} className="p-3 rounded-xl bg-white border border-[#FDE68A] flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#F59E0B] flex-shrink-0 mt-1.5"></span>
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Integrity Note */}
          <div className="p-4 rounded-xl bg-[#FAF8FB] border border-[#F1E4EC] text-[11px] text-[#5E5364] text-center">
            {gapData.academicIntegrityNote}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResearchGap;
