import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProject } from '../../context/ProjectContext';
import { analysisAPI } from '../../services/api';
import {
  Cpu,
  Sparkles,
  Layers,
  Server,
  Database,
  ArrowRight,
  ShieldAlert,
  Code2,
  GitPullRequest,
  CheckCircle,
} from 'lucide-react';
import { GlassCard } from '../../components/common/GlassCard';
import { Badge } from '../../components/common/Badge';
import WorkflowStepIndicator from '../../components/common/WorkflowStepIndicator';

const ArchitectureGenerator = () => {
  const navigate = useNavigate();
  const { activeProject, analyses, updateAnalysesMap } = useProject();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [archData, setArchData] = useState(analyses?.architecture || null);

  useEffect(() => {
    if (analyses?.architecture) {
      setArchData(analyses.architecture);
    } else if (activeProject?._id) {
      handleRunAnalysis();
    }
  }, [activeProject?._id]);

  const handleRunAnalysis = async () => {
    if (!activeProject?._id) return;
    setLoading(true);
    setError('');

    try {
      const res = await analysisAPI.analyzeArchitecture(activeProject._id);
      if (res.data.success) {
        setArchData(res.data.analysis);
        updateAnalysesMap('architecture', res.data.analysis);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to generate architecture.');
    } finally {
      setLoading(false);
    }
  };

  if (!activeProject) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <GlassCard className="p-8 border-[#f3c5d3]">
          <Cpu className="w-12 h-12 text-[#e91e63] mx-auto mb-3" />
          <h2 className="text-xl font-bold text-[#3a2630]">No Active Project Selected</h2>
          <p className="text-xs text-[#6b5560] max-w-md mx-auto">
            Please select or generate a project first to design its complete system architecture.
          </p>
          <button
            onClick={() => navigate('/library')}
            className="mt-4 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#e91e63] to-[#f43f5e] text-white text-xs font-semibold"
          >
            Go to Project Library
          </button>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6 text-[#3a2630]">
      <WorkflowStepIndicator currentStepId="architecture" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fce4ec] text-[#e91e63] text-xs font-semibold mb-2 border border-[#f3c5d3]">
            <Cpu className="w-3.5 h-3.5" />
            <span>Module 9 • System Architecture Blueprint</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#3a2630] tracking-tight">
            Technical Architecture &amp; Data Flow
          </h1>
          <p className="text-xs sm:text-sm text-[#6b5560] mt-1 max-w-2xl">
            A production-ready decoupled architecture blueprint mapping out client components, Express REST gateways, AI prompt orchestration, and MongoDB persistence.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRunAnalysis}
            disabled={loading}
            className="px-4 py-2 rounded-xl bg-white border border-[#f3c5d3] text-xs text-[#3a2630] hover:bg-[#fff0f5] flex items-center gap-1.5 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#e91e63]" />
            {loading ? 'Designing...' : 'Re-Generate'}
          </button>
          <button
            onClick={() => navigate('/roadmap')}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#e91e63] to-[#f43f5e] text-white text-xs font-semibold shadow-md flex items-center gap-1.5"
          >
            <span>Next: 10-Phase Roadmap</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs sm:text-sm flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {loading && (
        <div className="p-12 text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-[#fce4ec] border border-[#f3c5d3] flex items-center justify-center mx-auto text-[#e91e63] animate-spin">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-[#3a2630]">Synthesizing System Architecture Blueprint...</h3>
          <p className="text-xs text-[#6b5560] max-w-md mx-auto">
            Mapping client-server tiers, middleware guards, data contracts, and ASCII flow diagrams.
          </p>
        </div>
      )}

      {archData && !loading && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
          {/* System Overview Hero */}
          <GlassCard className="p-6 sm:p-8 border-[#f3c5d3] bg-gradient-to-b from-white to-[#fff8fa]">
            <Badge variant="primary" className="mb-2">System Topology Pattern</Badge>
            <h2 className="text-xl sm:text-2xl font-bold text-[#3a2630] mb-2">
              {archData.systemOverview}
            </h2>
            <p className="text-xs text-[#6b5560]">
              Designed for <span className="text-[#e91e63] font-medium">{activeProject.title}</span> (v{activeProject.currentVersion || 1})
            </p>
          </GlassCard>

          {/* 4-Tier Blueprint Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 1. Frontend Tier */}
            <GlassCard className="p-6 border-[#f3c5d3] space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-[#3a2630] flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-[#e91e63]" />
                  Frontend Client Tier
                </h3>
                <Badge variant="primary">Client</Badge>
              </div>
              <div className="space-y-2 text-xs">
                <p className="text-[#6b5560]">
                  <span className="font-semibold text-[#3a2630]">Framework:</span> {archData.frontendTier?.framework}
                </p>
                <p className="text-[#6b5560]">
                  <span className="font-semibold text-[#3a2630]">State Management:</span> {archData.frontendTier?.stateManagement}
                </p>
                <div className="pt-2 border-t border-[#f3c5d3]/50">
                  <span className="font-semibold text-[#3a2630] block mb-1.5">Key UI Modules:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {(archData.frontendTier?.keyModules || []).map((m, i) => (
                      <Badge key={i} variant="default">{m}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* 2. Backend Gateway Tier */}
            <GlassCard className="p-6 border-[#f3c5d3] space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-[#3a2630] flex items-center gap-2">
                  <Server className="w-4 h-4 text-[#d81b60]" />
                  Backend Gateway Tier
                </h3>
                <Badge variant="rose">REST API</Badge>
              </div>
              <div className="space-y-2 text-xs">
                <p className="text-[#6b5560]">
                  <span className="font-semibold text-[#3a2630]">Runtime:</span> {archData.backendTier?.framework}
                </p>
                <div className="pt-2 border-t border-[#f3c5d3]/50">
                  <span className="font-semibold text-[#3a2630] block mb-1.5">Security &amp; Middleware:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {(archData.backendTier?.middleware || []).map((mw, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-[#fdf2f8] text-[#d81b60] border border-[#fbcfe8]">
                        {mw}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* 3. AI Service Pipeline */}
            <GlassCard className="p-6 border-[#f3c5d3] space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-[#3a2630] flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-500" />
                  AI Service Tier
                </h3>
                <Badge variant="success">Inference</Badge>
              </div>
              <div className="space-y-2 text-xs">
                <p className="text-[#6b5560]">
                  <span className="font-semibold text-[#3a2630]">Engine:</span> {archData.aiTier?.engine}
                </p>
                <p className="text-[#6b5560]">
                  <span className="font-semibold text-[#3a2630]">Pipeline:</span> {archData.aiTier?.processingPipeline}
                </p>
                <p className="text-[#6b5560] text-[11px] pt-1">
                  <span className="font-semibold text-[#3a2630]">Resilience:</span> {archData.aiTier?.fallbackStrategy}
                </p>
              </div>
            </GlassCard>

            {/* 4. Database & Persistence Tier */}
            <GlassCard className="p-6 border-[#f3c5d3] space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-[#3a2630] flex items-center gap-2">
                  <Database className="w-4 h-4 text-[#ec407a]" />
                  Database &amp; Storage Tier
                </h3>
                <Badge variant="blush">MongoDB Atlas</Badge>
              </div>
              <div className="space-y-2 text-xs">
                <p className="text-[#6b5560]">
                  <span className="font-semibold text-[#3a2630]">Primary DB:</span> {archData.databaseTier?.primaryDB}
                </p>
                <div className="pt-2 border-t border-[#f3c5d3]/50">
                  <span className="font-semibold text-[#3a2630] block mb-1.5">Collections:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {(archData.databaseTier?.collections || []).map((col, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-[#fff0f5] text-[#e91e63] border border-[#f3c5d3] font-mono">
                        {col}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Step-by-Step Data Flow */}
          <GlassCard className="p-6 border-[#f3c5d3] space-y-4">
            <h3 className="text-sm font-bold text-[#3a2630] flex items-center gap-2">
              <GitPullRequest className="w-4 h-4 text-[#e91e63]" />
              End-to-End Request &amp; Data Flow
            </h3>
            <div className="space-y-2">
              {(archData.dataFlowSteps || []).map((step, i) => (
                <div key={i} className="p-3 rounded-xl bg-[#fff8fa] border border-[#f3c5d3]/60 text-xs text-[#3a2630] flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#fce4ec] text-[#e91e63] flex items-center justify-center font-bold text-[11px] flex-shrink-0 mt-0.5 border border-[#f3c5d3]">
                    {i + 1}
                  </span>
                  <p className="leading-relaxed text-[#6b5560]">{step}</p>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* ASCII Architecture Diagram Box */}
          {archData.asciiDiagram && (
            <GlassCard className="p-6 border-[#f3c5d3] space-y-3">
              <h3 className="text-sm font-bold text-[#3a2630] flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#d81b60]" />
                Text-Based Architecture Diagram
              </h3>
              <pre className="p-4 rounded-xl bg-[#fff8fa] border border-[#f3c5d3] text-[11px] font-mono text-[#e91e63] overflow-x-auto leading-relaxed">
                {archData.asciiDiagram}
              </pre>
            </GlassCard>
          )}
        </div>
      )}
    </div>
  );
};

export default ArchitectureGenerator;
