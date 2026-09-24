import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProject } from '../../context/ProjectContext';
import { analysisAPI } from '../../services/api';
import {
  CheckCircle2,
  Sparkles,
  Clock,
  Users,
  DollarSign,
  Cpu,
  AlertTriangle,
  ArrowRight,
  ShieldAlert,
  Database,
  Layers,
} from 'lucide-react';
import { GlassCard } from '../../components/common/GlassCard';
import { Badge } from '../../components/common/Badge';
import WorkflowStepIndicator from '../../components/common/WorkflowStepIndicator';

const FeasibilityAnalysis = () => {
  const navigate = useNavigate();
  const { activeProject, analyses, updateAnalysesMap } = useProject();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [feasibilityData, setFeasibilityData] = useState(analyses?.feasibility || null);

  useEffect(() => {
    if (analyses?.feasibility) {
      setFeasibilityData(analyses.feasibility);
    } else if (activeProject?._id) {
      handleRunAnalysis();
    }
  }, [activeProject?._id]);

  const handleRunAnalysis = async () => {
    if (!activeProject?._id) return;
    setLoading(true);
    setError('');

    try {
      const res = await analysisAPI.analyzeFeasibility(activeProject._id);
      if (res.data.success) {
        setFeasibilityData(res.data.analysis);
        updateAnalysesMap('feasibility', res.data.analysis);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to analyze feasibility.');
    } finally {
      setLoading(false);
    }
  };

  if (!activeProject) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <GlassCard className="p-8 border-indigo-500/20">
          <CheckCircle2 className="w-12 h-12 text-indigo-400 mx-auto mb-3" />
          <h2 className="text-xl font-bold text-white">No Active Project Selected</h2>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Please select or generate a project first to run a 360° feasibility assessment.
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
      <WorkflowStepIndicator currentStepId="feasibility" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold mb-2">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Module 7 • 360° Feasibility Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Comprehensive Feasibility Assessment
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Evaluate whether this project can realistically be built by undergraduate/postgrad students within the required timeline, hardware limits, and open-source budgets.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRunAnalysis}
            disabled={loading}
            className="px-4 py-2 rounded-xl glass-panel text-xs text-slate-200 hover:text-white flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            {loading ? 'Evaluating...' : 'Re-Evaluate'}
          </button>
          <button
            onClick={() => navigate('/research-gap')}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-semibold shadow-md flex items-center gap-1.5"
          >
            <span>Next: Research Gap</span>
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
          <h3 className="text-base font-bold text-white">Analyzing Feasibility Multi-Dimensions...</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Checking API quotas, computational budgets, team roles, and risk mitigations.
          </p>
        </div>
      )}

      {feasibilityData && !loading && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
          {/* Overall Verdict Banner */}
          <GlassCard className="p-6 border-indigo-500/30 bg-gradient-to-b from-slate-900/90 to-slate-950/90">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Overall Feasibility Score
                </span>
                <div className="flex items-baseline gap-3 mt-1">
                  <span className="text-4xl font-extrabold text-white font-mono">
                    {feasibilityData.overallScore || 85}%
                  </span>
                  <Badge variant="success">{feasibilityData.overallVerdict}</Badge>
                </div>
                <p className="text-xs text-slate-300 mt-2">
                  Targeted for: <span className="text-indigo-300 font-medium">{activeProject.title}</span>
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="p-3 rounded-xl bg-slate-900/70 border border-white/5">
                  <span className="text-xs text-slate-400 block">Tech Score</span>
                  <span className="text-lg font-bold text-indigo-300 font-mono">
                    {feasibilityData.technicalFeasibility?.score || 88}%
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/70 border border-white/5">
                  <span className="text-xs text-slate-400 block">Time Score</span>
                  <span className="text-lg font-bold text-emerald-300 font-mono">
                    {feasibilityData.timeFeasibility?.score || 82}%
                  </span>
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Core Feasibility Dimensions 2x2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 1. Technical & API Feasibility */}
            <GlassCard className="p-6 border-indigo-500/20 space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Cpu className="w-4 h-4 text-indigo-400" />
                Technical & Infrastructure Feasibility
              </h3>
              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-900/50 border border-white/5">
                  <span className="font-semibold text-slate-300 block mb-1">AI / Model Tier:</span>
                  <p className="text-slate-400">{feasibilityData.technicalFeasibility?.aiModelRequirements}</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/50 border border-white/5">
                  <span className="font-semibold text-slate-300 block mb-1">Dataset Availability:</span>
                  <p className="text-slate-400">{feasibilityData.technicalFeasibility?.datasetRequirements}</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/50 border border-white/5">
                  <span className="font-semibold text-slate-300 block mb-1">Hosting & Infrastructure:</span>
                  <p className="text-slate-400">{feasibilityData.technicalFeasibility?.infrastructure}</p>
                </div>
              </div>
            </GlassCard>

            {/* 2. Timeline & MVP Feasibility */}
            <GlassCard className="p-6 border-indigo-500/20 space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-400" />
                Time Feasibility & Milestones
              </h3>
              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/50 border border-white/5">
                  <div>
                    <span className="font-semibold text-slate-300 block">MVP Execution:</span>
                    <span className="text-slate-400">{feasibilityData.timeFeasibility?.mvpTimeline}</span>
                  </div>
                  <Badge variant="primary">Core Demo</Badge>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/50 border border-white/5">
                  <div>
                    <span className="font-semibold text-slate-300 block">Full Capstone Scope:</span>
                    <span className="text-slate-400">{feasibilityData.timeFeasibility?.fullTimeline}</span>
                  </div>
                  <Badge variant="purple">Defense Ready</Badge>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/50 border border-white/5">
                  <span className="font-semibold text-slate-300 block mb-2">Phased Breakdown:</span>
                  <ul className="space-y-1 text-slate-400">
                    {(feasibilityData.timeFeasibility?.milestones || []).map((m, i) => (
                      <li key={i}>• {m}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </GlassCard>

            {/* 3. Cost & Hardware Requirements */}
            <GlassCard className="p-6 border-indigo-500/20 space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-amber-400" />
                Budget & Hardware Specification
              </h3>
              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-900/50 border border-white/5">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-slate-300">Free Tier Viability:</span>
                    <Badge variant={feasibilityData.costAnalysis?.isFreeTierViable ? 'success' : 'warning'}>
                      {feasibilityData.costAnalysis?.isFreeTierViable ? '100% Free Viable' : 'Paid Required'}
                    </Badge>
                  </div>
                  <ul className="space-y-1 text-slate-400 mt-2">
                    {(feasibilityData.costAnalysis?.freeTierAlternatives || []).map((alt, i) => (
                      <li key={i}>✓ {alt}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/50 border border-white/5">
                  <span className="font-semibold text-slate-300 block mb-1">Hardware Specs:</span>
                  <p className="text-slate-400">
                    Min: {feasibilityData.hardwareRequirements?.minimumSpecs} | Rec: {feasibilityData.hardwareRequirements?.recommendedSpecs}
                  </p>
                  <p className="text-[11px] text-indigo-300 mt-1">{feasibilityData.hardwareRequirements?.notes}</p>
                </div>
              </div>
            </GlassCard>

            {/* 4. Team Roles */}
            <GlassCard className="p-6 border-indigo-500/20 space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-purple-400" />
                Recommended Team Breakdown
              </h3>
              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-900/50 border border-white/5 flex items-center justify-between">
                  <span className="font-semibold text-slate-300">Recommended Size:</span>
                  <Badge variant="purple">{feasibilityData.teamFeasibility?.recommendedTeamSize} Members</Badge>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/50 border border-white/5 space-y-2">
                  <span className="font-semibold text-slate-300 block">Recommended Roles:</span>
                  <ul className="space-y-1.5 text-slate-300">
                    {(feasibilityData.teamFeasibility?.requiredRoles || []).map((role, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                        <span>{role}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Risk Analysis Matrix */}
          <GlassCard className="p-6 border-indigo-500/20">
            <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              Risk Matrix & Mitigation Strategies
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(feasibilityData.riskMatrix || []).map((risk, i) => (
                <div key={i} className="p-4 rounded-xl bg-slate-900/60 border border-white/5 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-rose-300">{risk.category}</span>
                    <Badge variant="danger" className="text-[10px]">Identified Risk</Badge>
                  </div>
                  <p className="text-slate-300">{risk.description}</p>
                  <div className="pt-2 border-t border-white/5 text-emerald-300">
                    <span className="font-semibold block text-[11px]">Mitigation Strategy:</span>
                    <span className="text-slate-400">{risk.mitigation}</span>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  );
};

export default FeasibilityAnalysis;
