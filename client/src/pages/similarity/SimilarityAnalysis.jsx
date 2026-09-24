import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProject } from '../../context/ProjectContext';
import { analysisAPI } from '../../services/api';
import {
  CopyCheck,
  Sparkles,
  ShieldAlert,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Award,
  Layers,
  FileCheck2,
} from 'lucide-react';
import { GlassCard } from '../../components/common/GlassCard';
import { Badge } from '../../components/common/Badge';
import WorkflowStepIndicator from '../../components/common/WorkflowStepIndicator';

const SimilarityAnalysis = () => {
  const navigate = useNavigate();
  const { activeProject, analyses, updateAnalysesMap } = useProject();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [similarityData, setSimilarityData] = useState(analyses?.similarity || null);

  useEffect(() => {
    if (analyses?.similarity) {
      setSimilarityData(analyses.similarity);
    } else if (activeProject?._id) {
      handleRunAnalysis();
    }
  }, [activeProject?._id]);

  const handleRunAnalysis = async () => {
    if (!activeProject?._id) return;
    setLoading(true);
    setError('');

    try {
      const res = await analysisAPI.analyzeSimilarity(activeProject._id);
      if (res.data.success) {
        setSimilarityData(res.data.analysis);
        updateAnalysesMap('similarity', res.data.analysis);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to run similarity analysis.');
    } finally {
      setLoading(false);
    }
  };

  if (!activeProject) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <GlassCard className="p-8 border-indigo-500/20">
          <CopyCheck className="w-12 h-12 text-indigo-400 mx-auto mb-3" />
          <h2 className="text-xl font-bold text-white">No Active Project Selected</h2>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Please select or generate a project first to run similarity and uniqueness validation.
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
      <WorkflowStepIndicator currentStepId="similarity" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold mb-2">
            <CopyCheck className="w-3.5 h-3.5" />
            <span>Module 6 • Similarity & Novelty Auditor</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Evidence-Based Similarity Analysis
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            We reject misleading "100% unique" claims. InnoPilot performs a realistic academic literature and architectural benchmark to distinguish commodity components from your genuine novel contributions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRunAnalysis}
            disabled={loading}
            className="px-4 py-2 rounded-xl glass-panel text-xs text-slate-200 hover:text-white flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            {loading ? 'Auditing...' : 'Re-Run Audit'}
          </button>
          <button
            onClick={() => navigate('/feasibility')}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-semibold shadow-md flex items-center gap-1.5"
          >
            <span>Next: Feasibility Analysis</span>
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
          <h3 className="text-base font-bold text-white">Cross-Referencing Academic Software Corpora...</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Comparing system pipelines against known open-source baselines and identifying distinct contributions.
          </p>
        </div>
      )}

      {similarityData && !loading && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
          {/* Top Metric & Disclaimer Bar */}
          <GlassCard className="p-6 border-indigo-500/30 bg-gradient-to-b from-slate-900/80 to-slate-950/80">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-white/10">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Concept Overlap Metric
                </span>
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-extrabold text-white font-mono">
                    {similarityData.similarityScore}%
                  </span>
                  <Badge variant={similarityData.similarityScore < 50 ? 'success' : 'warning'}>
                    {similarityData.similarityLevel}
                  </Badge>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Evaluated on {activeProject.title} (v{activeProject.currentVersion || 1})
                </p>
              </div>

              {/* Integrity Disclaimer */}
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/5 text-[11px] text-slate-400 max-w-md leading-relaxed">
                <span className="font-bold text-indigo-300 block mb-0.5">Academic Integrity Notice:</span>
                {similarityData.disclaimer}
              </div>
            </div>

            {/* Overlap vs Novelty Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
              {/* Potentially Similar Components (Commodity) */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" /> Common / Commodity Components
                </h3>
                <p className="text-xs text-slate-400">
                  Standard architectural patterns shared with typical software systems:
                </p>
                <div className="space-y-2">
                  {(similarityData.potentiallySimilarComponents || []).map((comp, i) => (
                    <div key={i} className="p-3 rounded-xl bg-slate-900/50 border border-amber-500/20 text-xs text-slate-300">
                      • {comp}
                    </div>
                  ))}
                </div>
              </div>

              {/* Distinctive Novel Components */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <Award className="w-4 h-4" /> Genuine Distinctive Innovations
                </h3>
                <p className="text-xs text-slate-400">
                  Unique algorithmic, mathematical, or workflow contributions in your design:
                </p>
                <div className="space-y-2">
                  {(similarityData.distinctiveComponents || []).map((comp, i) => (
                    <div key={i} className="p-3 rounded-xl bg-slate-900/50 border border-emerald-500/20 text-xs text-slate-200 font-medium">
                      ✓ {comp}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Similar Reference Paradigms */}
          {similarityData.similarProjects && similarityData.similarProjects.length > 0 && (
            <GlassCard className="p-6 border-indigo-500/20">
              <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                <Layers className="w-4 h-4 text-purple-400" />
                Existing Baseline Systems & Literature References
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {similarityData.similarProjects.map((proj, i) => (
                  <div key={i} className="p-4 rounded-xl bg-slate-900/60 border border-white/5 space-y-2">
                    <h4 className="text-xs font-bold text-white">{proj.name}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">{proj.concept}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {(proj.overlapAreas || []).map((area, aIdx) => (
                        <span key={aIdx} className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-white/5">
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          )}

          {/* Differentiating Strategies for Defense */}
          <GlassCard className="p-6 border-indigo-500/30 bg-indigo-950/20 space-y-3">
            <h3 className="text-sm font-bold text-indigo-300 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Strategic Recommendations to Differentiate for Capstone Defense
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {(similarityData.differentiatingStrategies || []).map((strat, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-slate-900/80 border border-indigo-500/20 text-xs text-slate-200">
                  <span className="font-bold text-indigo-400 block mb-1">Defense Strategy {i + 1}</span>
                  {strat}
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  );
};

export default SimilarityAnalysis;
