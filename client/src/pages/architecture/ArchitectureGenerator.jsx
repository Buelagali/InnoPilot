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
        <GlassCard className="p-8 border-[#BAE6FD] bg-white">
          <Cpu className="w-12 h-12 text-[#0EA5E9] mx-auto mb-3" />
          <h2 className="text-xl font-bold text-[#2D2530]">No Active Project Selected</h2>
          <p className="text-xs text-[#5E5364] max-w-md mx-auto">
            Please select or generate a project first to design its complete system architecture.
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
      <WorkflowStepIndicator currentStepId="architecture" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F0F9FF] text-[#0284C7] border border-[#BAE6FD] text-xs font-semibold mb-2">
            <Cpu className="w-3.5 h-3.5 text-[#0EA5E9]" />
            <span>Module 9 • System Architecture Blueprint</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#2D2530] tracking-tight font-heading">
            Technical Architecture &amp; Data Flow
          </h1>
          <p className="text-xs sm:text-sm text-[#5E5364] mt-1 max-w-2xl">
            A production-ready decoupled architecture blueprint mapping out client components, Express REST gateways, AI prompt orchestration, and MongoDB persistence.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRunAnalysis}
            disabled={loading}
            className="px-4 py-2 rounded-xl bg-white border border-[#F1E4EC] text-xs text-[#2D2530] hover:bg-[#FAF8FB] flex items-center gap-1.5 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#0EA5E9]" />
            {loading ? 'Designing...' : 'Re-Generate'}
          </button>
          <button
            onClick={() => navigate('/roadmap')}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#10B981] via-[#4ADE80] to-[#059669] text-white text-xs font-semibold shadow-md shadow-emerald-500/20 hover:scale-105 transition-all flex items-center gap-1.5"
          >
            <span>Next: 10-Phase Roadmap</span>
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
          <h3 className="text-base font-bold text-[#2D2530]">Synthesizing System Architecture Blueprint...</h3>
          <p className="text-xs text-[#5E5364] max-w-md mx-auto">
            Mapping client-server tiers, middleware guards, data contracts, and ASCII flow diagrams.
          </p>
        </div>
      )}

      {archData && !loading && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
          {/* System Overview Hero */}
          <GlassCard className="p-6 sm:p-8 border-[#BAE6FD] bg-gradient-to-b from-white to-[#F0F9FF] shadow-sm">
            <Badge variant="sky" className="mb-2">System Topology Pattern</Badge>
            <h2 className="text-xl sm:text-2xl font-bold text-[#2D2530] mb-2 font-heading">
              {archData.systemOverview}
            </h2>
            <p className="text-xs text-[#5E5364]">
              Designed for <span className="text-[#0284C7] font-semibold">{activeProject.title}</span> (v{activeProject.currentVersion || 1})
            </p>
          </GlassCard>

          {/* 4-Tier Multi-Color Pastel Blueprint Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 1. Frontend Tier - Light Sky Blue */}
            <div className="p-6 rounded-2xl border border-[#BAE6FD] pastel-glass-sky space-y-3 shadow-2xs">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-[#2D2530] flex items-center gap-2 font-heading">
                  <Code2 className="w-4 h-4 text-[#0EA5E9]" />
                  Frontend Client Tier
                </h3>
                <Badge variant="sky">Client</Badge>
              </div>
              <div className="space-y-2 text-xs">
                <p className="text-[#5E5364]">
                  <span className="font-semibold text-[#2D2530]">Framework:</span> {archData.frontendTier?.framework}
                </p>
                <p className="text-[#5E5364]">
                  <span className="font-semibold text-[#2D2530]">State Management:</span> {archData.frontendTier?.stateManagement}
                </p>
                <div className="pt-2 border-t border-[#BAE6FD]">
                  <span className="font-semibold text-[#2D2530] block mb-1.5">Key UI Modules:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {(archData.frontendTier?.keyModules || []).map((m, i) => (
                      <Badge key={i} variant="default">{m}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Backend Gateway Tier - Light Peach */}
            <div className="p-6 rounded-2xl border border-[#FED7AA] pastel-glass-peach space-y-3 shadow-2xs">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-[#2D2530] flex items-center gap-2 font-heading">
                  <Server className="w-4 h-4 text-[#FB923C]" />
                  Backend Gateway Tier
                </h3>
                <Badge variant="peach">REST API</Badge>
              </div>
              <div className="space-y-2 text-xs">
                <p className="text-[#5E5364]">
                  <span className="font-semibold text-[#2D2530]">Runtime:</span> {archData.backendTier?.framework}
                </p>
                <div className="pt-2 border-t border-[#FED7AA]">
                  <span className="font-semibold text-[#2D2530] block mb-1.5">Security &amp; Middleware:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {(archData.backendTier?.middleware || []).map((mw, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-white text-[#C2410C] border border-[#FED7AA] font-semibold">
                        {mw}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 3. AI Service Pipeline - Soft Mint Green */}
            <div className="p-6 rounded-2xl border border-[#BBF7D0] pastel-glass-mint space-y-3 shadow-2xs">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-[#2D2530] flex items-center gap-2 font-heading">
                  <Sparkles className="w-4 h-4 text-[#10B981]" />
                  AI Service Tier
                </h3>
                <Badge variant="mint">Inference</Badge>
              </div>
              <div className="space-y-2 text-xs">
                <p className="text-[#5E5364]">
                  <span className="font-semibold text-[#2D2530]">Engine:</span> {archData.aiTier?.engine}
                </p>
                <p className="text-[#5E5364]">
                  <span className="font-semibold text-[#2D2530]">Pipeline:</span> {archData.aiTier?.processingPipeline}
                </p>
                <p className="text-[#5E5364] text-[11px] pt-1">
                  <span className="font-semibold text-[#2D2530]">Resilience:</span> {archData.aiTier?.fallbackStrategy}
                </p>
              </div>
            </div>

            {/* 4. Database & Persistence Tier - Soft Gold */}
            <div className="p-6 rounded-2xl border border-[#FDE68A] pastel-glass-gold space-y-3 shadow-2xs">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-[#2D2530] flex items-center gap-2 font-heading">
                  <Database className="w-4 h-4 text-[#F59E0B]" />
                  Database &amp; Storage Tier
                </h3>
                <Badge variant="gold">MongoDB Atlas</Badge>
              </div>
              <div className="space-y-2 text-xs">
                <p className="text-[#5E5364]">
                  <span className="font-semibold text-[#2D2530]">Primary DB:</span> {archData.databaseTier?.primaryDB}
                </p>
                <div className="pt-2 border-t border-[#FDE68A]">
                  <span className="font-semibold text-[#2D2530] block mb-1.5">Collections:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {(archData.databaseTier?.collections || []).map((col, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-white text-[#D97706] border border-[#FDE68A] font-mono">
                        {col}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step-by-Step Data Flow */}
          <GlassCard className="p-6 border-[#F1E4EC] bg-white space-y-4 shadow-sm">
            <h3 className="text-sm font-bold text-[#2D2530] flex items-center gap-2 font-heading">
              <GitPullRequest className="w-4 h-4 text-[#0EA5E9]" />
              End-to-End Request &amp; Data Flow
            </h3>
            <div className="space-y-2">
              {(archData.dataFlowSteps || []).map((step, i) => (
                <div key={i} className="p-3 rounded-xl bg-[#FAF8FB] border border-[#F1E4EC] text-xs text-[#2D2530] flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#F0F9FF] text-[#0284C7] flex items-center justify-center font-bold text-[11px] flex-shrink-0 mt-0.5 border border-[#BAE6FD]">
                    {i + 1}
                  </span>
                  <p className="leading-relaxed text-[#5E5364]">{step}</p>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* ASCII Architecture Diagram Box */}
          {archData.asciiDiagram && (
            <GlassCard className="p-6 border-[#BAE6FD] bg-[#F0F9FF]/40 space-y-3 shadow-sm">
              <h3 className="text-sm font-bold text-[#2D2530] flex items-center gap-2 font-heading">
                <Layers className="w-4 h-4 text-[#0284C7]" />
                Text-Based Architecture Diagram
              </h3>
              <pre className="p-4 rounded-xl bg-white border border-[#BAE6FD] text-[11px] font-mono text-[#0284C7] overflow-x-auto leading-relaxed">
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
