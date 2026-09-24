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
        <GlassCard className="p-8 border-indigo-500/20">
          <BookOpen className="w-12 h-12 text-indigo-400 mx-auto mb-3" />
          <h2 className="text-xl font-bold text-white">No Active Project Selected</h2>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Please select or generate a project first to identify academic research gaps.
          </p>
          <button
            onClick={() => navigate('/library')}
            className="mt-4 px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-semibold"
          >
            Go to Project Library
          </button>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <WorkflowStepIndicator currentStepId="research" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Module 8 • Research Gap Finder</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Academic Research Gap & Contribution
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Essential for final-year major projects and thesis publications. The AI structures legitimate research questions and novel contributions without fabricating authors or paper titles.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRunAnalysis}
            disabled={loading}
            className="px-4 py-2 rounded-xl glass-panel text-xs text-slate-200 hover:text-white flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            {loading ? 'Analyzing...' : 'Re-Discover Gaps'}
          </button>
          <button
            onClick={() => navigate('/architecture')}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-semibold shadow-md flex items-center gap-1.5"
          >
            <span>Next: Architecture Blueprint</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs sm:text-sm flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {loading && (
        <div className="p-12 text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center mx-auto text-indigo-300 animate-spin">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white">Formulating Academic Research Gaps...</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Contrasting state-of-the-art baselines, articulating empirical novelties, and framing formal research questions.
          </p>
        </div>
      )}

      {gapData && !loading && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
          {/* Observed Research Gap Hero Banner */}
          <GlassCard className="p-6 sm:p-8 border-indigo-500/30 bg-gradient-to-b from-slate-900/90 to-slate-950/90">
            <Badge variant="purple" className="mb-3">
              <GraduationCap className="w-3.5 h-3.5" /> Core Research Whitespace
            </Badge>
            <h2 className="text-xl sm:text-2xl font-bold text-white leading-relaxed">
              {gapData.observedResearchGap}
            </h2>
            <div className="mt-4 p-4 rounded-xl bg-indigo-950/40 border border-indigo-500/20 text-xs text-indigo-200 leading-relaxed">
              <span className="font-bold block mb-1">Proposed Methodological Innovation:</span>
              {gapData.proposedImprovement}
            </div>
          </GlassCard>

          {/* Existing Baselines vs Limitations */}
          <GlassCard className="p-6 border-indigo-500/20">
            <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
              <Layers className="w-4 h-4 text-amber-400" />
              Existing Paradigms & Their Known Limitations
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(gapData.existingApproaches || []).map((app, i) => (
                <div key={i} className="p-4 rounded-xl bg-slate-900/60 border border-white/5 space-y-2 text-xs">
                  <h4 className="font-bold text-white">{app.paradigm}</h4>
                  <p className="text-slate-400 leading-relaxed">{app.mechanism}</p>
                  <div className="pt-2 border-t border-white/5 space-y-1">
                    <span className="font-semibold text-rose-300 block text-[11px]">Known Limitations:</span>
                    <ul className="space-y-0.5 text-slate-300">
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
          <GlassCard className="p-6 border-indigo-500/20 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-indigo-400" />
              Formulated Research Questions (For Thesis Defense)
            </h3>
            <div className="space-y-3">
              {(gapData.researchQuestions || []).map((rq, i) => (
                <div key={i} className="p-4 rounded-xl bg-slate-900/80 border border-indigo-500/20 text-xs text-slate-200 flex items-start gap-3">
                  <span className="font-mono font-bold text-indigo-400 px-2 py-0.5 rounded bg-indigo-950/60 border border-indigo-500/30">
                    RQ{i + 1}
                  </span>
                  <p className="leading-relaxed font-medium mt-0.5">{rq}</p>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Academic Contributions & Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <GlassCard className="p-6 border-indigo-500/20 space-y-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-400" />
                Expected Academic Contributions
              </h3>
              <ul className="space-y-2 text-xs text-slate-300">
                {(gapData.expectedAcademicContribution || []).map((c, i) => (
                  <li key={i} className="p-3 rounded-xl bg-slate-900/50 border border-emerald-500/20 flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>

            <GlassCard className="p-6 border-indigo-500/20 space-y-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-cyan-400" />
                Suggested Benchmark Evaluation Metrics
              </h3>
              <ul className="space-y-2 text-xs text-slate-300">
                {(gapData.suggestedEvaluationMetrics || []).map((m, i) => (
                  <li key={i} className="p-3 rounded-xl bg-slate-900/50 border border-cyan-500/20 flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0 mt-1.5"></span>
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </div>

          {/* Integrity Note */}
          <div className="p-4 rounded-xl bg-slate-900/40 border border-white/5 text-[11px] text-slate-400 text-center">
            {gapData.academicIntegrityNote}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResearchGap;
