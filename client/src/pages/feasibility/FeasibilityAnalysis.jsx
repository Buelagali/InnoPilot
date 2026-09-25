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
        <GlassCard className="p-8 border-[#f3c5d3] bg-white/95">
          <CheckCircle2 className="w-12 h-12 text-[#e91e63] mx-auto mb-3" />
          <h2 className="text-xl font-bold text-[#3a2630]">No Active Project Selected</h2>
          <p className="text-xs text-[#6b5560] max-w-md mx-auto">
            Please select or generate a project first to run a 360° feasibility assessment.
          </p>
          <button
            onClick={() => navigate('/library')}
            className="mt-4 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#e91e63] to-[#ec407a] text-white text-xs font-semibold shadow-md shadow-pink-500/20"
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fce4ec] text-[#e91e63] border border-[#f3c5d3] text-xs font-semibold mb-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#e91e63]" />
            <span>Module 7 • 360° Feasibility Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#3a2630] tracking-tight">
            Comprehensive Feasibility Assessment
          </h1>
          <p className="text-xs sm:text-sm text-[#6b5560] mt-1 max-w-2xl">
            Evaluate whether this project can realistically be built by undergraduate/postgrad students within the required timeline, hardware limits, and open-source budgets.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRunAnalysis}
            disabled={loading}
            className="px-4 py-2 rounded-xl glass-panel text-xs text-[#6b5560] hover:text-[#3a2630] border border-[#f3c5d3] flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#e91e63]" />
            {loading ? 'Evaluating...' : 'Re-Evaluate'}
          </button>
          <button
            onClick={() => navigate('/research-gap')}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#e91e63] via-[#ec407a] to-[#f43f5e] hover:from-[#d81b60] hover:to-[#e91e63] text-white text-xs font-semibold shadow-md shadow-pink-500/20 hover:scale-105 transition-all flex items-center gap-1.5"
          >
            <span>Next: Research Gap</span>
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
          <div className="w-12 h-12 rounded-2xl bg-[#fce4ec] border border-[#f3c5d3] flex items-center justify-center mx-auto text-[#e91e63] animate-spin">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-[#3a2630]">Analyzing Feasibility Multi-Dimensions...</h3>
          <p className="text-xs text-[#6b5560] max-w-md mx-auto">
            Checking API quotas, computational budgets, team roles, and risk mitigations.
          </p>
        </div>
      )}

      {feasibilityData && !loading && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
          {/* Overall Verdict Banner */}
          <GlassCard className="p-6 border-[#f3c5d3] bg-white/95 shadow-xl shadow-pink-500/5">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#6b5560]">
                  Overall Feasibility Score
                </span>
                <div className="flex items-baseline gap-3 mt-1">
                  <span className="text-4xl font-extrabold text-[#3a2630] font-mono">
                    {feasibilityData.overallScore || 85}%
                  </span>
                  <Badge variant="pink">{feasibilityData.overallVerdict}</Badge>
                </div>
                <p className="text-xs text-[#6b5560] mt-2">
                  Targeted for: <span className="text-[#e91e63] font-medium">{activeProject.title}</span>
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="p-3 rounded-xl bg-[#fff8fa] border border-[#f3c5d3]">
                  <span className="text-xs text-[#6b5560] block">Tech Score</span>
                  <span className="text-lg font-bold text-[#e91e63] font-mono">
                    {feasibilityData.technicalFeasibility?.score || 88}%
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-[#fff8fa] border border-[#f3c5d3]">
                  <span className="text-xs text-[#6b5560] block">Time Score</span>
                  <span className="text-lg font-bold text-[#ec407a] font-mono">
                    {feasibilityData.timeFeasibility?.score || 82}%
                  </span>
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Core Feasibility Dimensions 2x2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 1. Technical & API Feasibility */}
            <GlassCard className="p-6 border-[#f3c5d3] bg-white/95 space-y-4">
              <h3 className="text-sm font-bold text-[#3a2630] flex items-center gap-2">
                <Cpu className="w-4 h-4 text-[#e91e63]" />
                Technical & Infrastructure Feasibility
              </h3>
              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-[#fff8fa] border border-[#f3c5d3]">
                  <span className="font-semibold text-[#3a2630] block mb-1">AI / Model Tier:</span>
                  <p className="text-[#6b5560]">{feasibilityData.technicalFeasibility?.aiModelRequirements}</p>
                </div>

                <div className="p-3 rounded-xl bg-[#fff8fa] border border-[#f3c5d3]">
                  <span className="font-semibold text-[#3a2630] block mb-1">Dataset Availability:</span>
                  <p className="text-[#6b5560]">{feasibilityData.technicalFeasibility?.datasetRequirements}</p>
                </div>

                <div className="p-3 rounded-xl bg-[#fff8fa] border border-[#f3c5d3]">
                  <span className="font-semibold text-[#3a2630] block mb-1">Hosting & Infrastructure:</span>
                  <p className="text-[#6b5560]">{feasibilityData.technicalFeasibility?.infrastructure}</p>
                </div>
              </div>
            </GlassCard>

            {/* 2. Timeline & MVP Feasibility */}
            <GlassCard className="p-6 border-[#f3c5d3] bg-white/95 space-y-4">
              <h3 className="text-sm font-bold text-[#3a2630] flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#ec407a]" />
                Time Feasibility & Milestones
              </h3>
              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#fff8fa] border border-[#f3c5d3]">
                  <div>
                    <span className="font-semibold text-[#3a2630] block">MVP Execution:</span>
                    <span className="text-[#6b5560]">{feasibilityData.timeFeasibility?.mvpTimeline}</span>
                  </div>
                  <Badge variant="pink">Core Demo</Badge>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-[#fff8fa] border border-[#f3c5d3]">
                  <div>
                    <span className="font-semibold text-[#3a2630] block">Full Capstone Scope:</span>
                    <span className="text-[#6b5560]">{feasibilityData.timeFeasibility?.fullTimeline}</span>
                  </div>
                  <Badge variant="rose">Defense Ready</Badge>
                </div>

                <div className="p-3 rounded-xl bg-[#fff8fa] border border-[#f3c5d3]">
                  <span className="font-semibold text-[#3a2630] block mb-2">Phased Breakdown:</span>
                  <ul className="space-y-1 text-[#6b5560]">
                    {(feasibilityData.timeFeasibility?.milestones || []).map((m, i) => (
                      <li key={i}>• {m}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </GlassCard>

            {/* 3. Cost & Hardware Requirements */}
            <GlassCard className="p-6 border-[#f3c5d3] bg-white/95 space-y-4">
              <h3 className="text-sm font-bold text-[#3a2630] flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-[#e91e63]" />
                Budget & Hardware Specification
              </h3>
              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-[#fff8fa] border border-[#f3c5d3]">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-[#3a2630]">Free Tier Viability:</span>
                    <Badge variant={feasibilityData.costAnalysis?.isFreeTierViable ? 'pink' : 'warning'}>
                      {feasibilityData.costAnalysis?.isFreeTierViable ? '100% Free Viable' : 'Paid Required'}
                    </Badge>
                  </div>
                  <ul className="space-y-1 text-[#6b5560] mt-2">
                    {(feasibilityData.costAnalysis?.freeTierAlternatives || []).map((alt, i) => (
                      <li key={i}>✓ {alt}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-3 rounded-xl bg-[#fff8fa] border border-[#f3c5d3]">
                  <span className="font-semibold text-[#3a2630] block mb-1">Hardware Specs:</span>
                  <p className="text-[#6b5560]">
                    Min: {feasibilityData.hardwareRequirements?.minimumSpecs} | Rec: {feasibilityData.hardwareRequirements?.recommendedSpecs}
                  </p>
                  <p className="text-[11px] text-[#e91e63] mt-1">{feasibilityData.hardwareRequirements?.notes}</p>
                </div>
              </div>
            </GlassCard>

            {/* 4. Team Roles */}
            <GlassCard className="p-6 border-[#f3c5d3] bg-white/95 space-y-4">
              <h3 className="text-sm font-bold text-[#3a2630] flex items-center gap-2">
                <Users className="w-4 h-4 text-[#ec407a]" />
                Recommended Team Breakdown
              </h3>
              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-[#fff8fa] border border-[#f3c5d3] flex items-center justify-between">
                  <span className="font-semibold text-[#3a2630]">Recommended Size:</span>
                  <Badge variant="pink">{feasibilityData.teamFeasibility?.recommendedTeamSize} Members</Badge>
                </div>

                <div className="p-3 rounded-xl bg-[#fff8fa] border border-[#f3c5d3] space-y-2">
                  <span className="font-semibold text-[#3a2630] block">Recommended Roles:</span>
                  <ul className="space-y-1.5 text-[#3a2630]">
                    {(feasibilityData.teamFeasibility?.requiredRoles || []).map((role, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#e91e63]"></span>
                        <span>{role}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Risk Analysis Matrix */}
          <GlassCard className="p-6 border-[#f3c5d3] bg-white/95">
            <h3 className="text-sm font-bold text-[#3a2630] mb-4 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-[#e91e63]" />
              Risk Matrix & Mitigation Strategies
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(feasibilityData.riskMatrix || []).map((risk, i) => (
                <div key={i} className="p-4 rounded-xl bg-[#fff8fa] border border-[#f3c5d3] space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#e91e63]">{risk.category}</span>
                    <Badge variant="rose" className="text-[10px]">Identified Risk</Badge>
                  </div>
                  <p className="text-[#3a2630]">{risk.description}</p>
                  <div className="pt-2 border-t border-[#f3c5d3] text-[#3a2630]">
                    <span className="font-semibold text-[#ec407a] block text-[11px]">Mitigation Strategy:</span>
                    <span className="text-[#6b5560]">{risk.mitigation}</span>
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
