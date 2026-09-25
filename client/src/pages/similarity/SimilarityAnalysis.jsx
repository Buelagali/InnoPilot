import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProject } from '../../context/ProjectContext';
import { analysisAPI } from '../../services/api';
import {
  CopyCheck,
  Sparkles,
  ShieldAlert,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Award,
  Layers,
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
        <GlassCard className="p-8 border-[#F1E4EC] bg-white">
          <CopyCheck className="w-12 h-12 text-[#0EA5E9] mx-auto mb-3" />
          <h2 className="text-xl font-bold text-[#2D2530]">No Active Project Selected</h2>
          <p className="text-xs text-[#5E5364] max-w-md mx-auto">
            Please select or generate a project first to run similarity and uniqueness validation.
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
      <WorkflowStepIndicator currentStepId="similarity" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F0F9FF] text-[#0284C7] border border-[#BAE6FD] text-xs font-semibold mb-2">
            <CopyCheck className="w-3.5 h-3.5 text-[#0EA5E9]" />
            <span>Module 6 • Similarity & Novelty Auditor</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#2D2530] tracking-tight font-heading">
            Evidence-Based Similarity Analysis
          </h1>
          <p className="text-xs sm:text-sm text-[#5E5364] mt-1 max-w-2xl">
            We reject misleading "100% unique" claims. InnoPilot performs a realistic academic literature and architectural benchmark to distinguish commodity components from your genuine novel contributions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRunAnalysis}
            disabled={loading}
            className="px-4 py-2 rounded-xl glass-panel text-xs text-[#5E5364] hover:text-[#2D2530] border border-[#F1E4EC] flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#0EA5E9]" />
            {loading ? 'Auditing...' : 'Re-Run Audit'}
          </button>
          <button
            onClick={() => navigate('/feasibility')}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#10B981] via-[#4ADE80] to-[#059669] hover:opacity-95 text-white text-xs font-semibold shadow-md shadow-emerald-500/20 hover:scale-105 transition-all flex items-center gap-1.5"
          >
            <span>Next: Feasibility Analysis</span>
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
          <h3 className="text-base font-bold text-[#2D2530]">Cross-Referencing Academic Software Corpora...</h3>
          <p className="text-xs text-[#5E5364] max-w-md mx-auto">
            Comparing system pipelines against known open-source baselines and identifying distinct contributions.
          </p>
        </div>
      )}

      {similarityData && !loading && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
          {/* Top Metric & Disclaimer Bar */}
          <GlassCard className="p-6 border-[#BAE6FD] bg-white shadow-sm">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-[#F1E4EC]">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-[#5E5364]">
                  Concept Overlap Metric
                </span>
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-extrabold text-[#2D2530] font-mono">
                    {similarityData.similarityScore}%
                  </span>
                  <Badge variant={similarityData.similarityScore < 50 ? 'mint' : 'warning'}>
                    {similarityData.similarityLevel}
                  </Badge>
                </div>
                <p className="text-xs text-[#5E5364] mt-1 font-medium">
                  Evaluated on {activeProject.title} (v{activeProject.currentVersion || 1})
                </p>
              </div>

              {/* Integrity Disclaimer */}
              <div className="p-3.5 rounded-xl bg-[#F0F9FF] border border-[#BAE6FD] text-[11px] text-[#5E5364] max-w-md leading-relaxed">
                <span className="font-bold text-[#0284C7] block mb-0.5">Academic Integrity Notice:</span>
                {similarityData.disclaimer}
              </div>
            </div>

            {/* Overlap vs Novelty Grid with Multi-Color Pastel Accents */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
              {/* Potentially Similar Components (Commodity - Soft Gold) */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#D97706] flex items-center gap-1.5 font-heading">
                  <AlertTriangle className="w-4 h-4 text-[#F59E0B]" /> Common / Commodity Components
                </h3>
                <p className="text-xs text-[#5E5364]">
                  Standard architectural patterns shared with typical software systems:
                </p>
                <div className="space-y-2">
                  {(similarityData.potentiallySimilarComponents || []).map((comp, i) => (
                    <div key={i} className="p-3 rounded-xl bg-[#FFFBEB] border border-[#FDE68A] text-xs text-[#2D2530]">
                      • {comp}
                    </div>
                  ))}
                </div>
              </div>

              {/* Distinctive Novel Components (Mint Green) */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#15803D] flex items-center gap-1.5 font-heading">
                  <Award className="w-4 h-4 text-[#10B981]" /> Genuine Distinctive Innovations
                </h3>
                <p className="text-xs text-[#5E5364]">
                  Unique algorithmic, mathematical, or workflow contributions in your design:
                </p>
                <div className="space-y-2">
                  {(similarityData.distinctiveComponents || []).map((comp, i) => (
                    <div key={i} className="p-3 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0] text-xs text-[#2D2530] font-medium">
                      ✓ {comp}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Similar Reference Paradigms */}
          {similarityData.similarProjects && similarityData.similarProjects.length > 0 && (
            <GlassCard className="p-6 border-[#BAE6FD] bg-white shadow-sm">
              <h3 className="text-sm font-bold text-[#2D2530] mb-4 flex items-center gap-2 font-heading">
                <Layers className="w-4 h-4 text-[#0EA5E9]" />
                Existing Baseline Systems & Literature References
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {similarityData.similarProjects.map((proj, i) => (
                  <div key={i} className="p-4 rounded-xl bg-[#F0F9FF] border border-[#BAE6FD] space-y-2">
                    <h4 className="text-xs font-bold text-[#2D2530] font-heading">{proj.name}</h4>
                    <p className="text-xs text-[#5E5364] leading-relaxed">{proj.concept}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {(proj.overlapAreas || []).map((area, aIdx) => (
                        <span key={aIdx} className="text-[10px] px-2 py-0.5 rounded bg-white text-[#0284C7] border border-[#BAE6FD] font-semibold">
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          )}

          {/* Differentiating Strategies for Defense - Soft Gold */}
          <GlassCard className="p-6 border-[#FDE68A] bg-[#FFFBEB] space-y-3 shadow-sm">
            <h3 className="text-sm font-bold text-[#D97706] flex items-center gap-2 font-heading">
              <TrendingUp className="w-4 h-4 text-[#F59E0B]" />
              Strategic Recommendations to Differentiate for Capstone Defense
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {(similarityData.differentiatingStrategies || []).map((strat, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-white border border-[#FDE68A] text-xs text-[#2D2530]">
                  <span className="font-bold text-[#D97706] block mb-1">Defense Strategy {i + 1}</span>
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
