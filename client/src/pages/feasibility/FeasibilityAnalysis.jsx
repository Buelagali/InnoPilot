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
        <GlassCard className="p-8 border-[#BBF7D0] bg-white">
          <CheckCircle2 className="w-12 h-12 text-[#10B981] mx-auto mb-3" />
          <h2 className="text-xl font-bold text-[#2D2530]">No Active Project Selected</h2>
          <p className="text-xs text-[#5E5364] max-w-md mx-auto">
            Please select or generate a project first to run a 360° feasibility assessment.
          </p>
          <button
            onClick={() => navigate('/library')}
            className="mt-4 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#10B981] to-[#0EA5E9] text-white text-xs font-semibold shadow-md shadow-emerald-500/20"
          >
            Go to Project Library
          </button>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6 text-[#2D2530]">
      <WorkflowStepIndicator currentStepId="feasibility" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F0FDF4] text-[#15803D] border border-[#BBF7D0] text-xs font-semibold mb-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
            <span>Module 7 • 360° Feasibility Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#2D2530] tracking-tight font-heading">
            Comprehensive Feasibility Assessment
          </h1>
          <p className="text-xs sm:text-sm text-[#5E5364] mt-1 max-w-2xl">
            Evaluate whether this project can realistically be built by undergraduate/postgrad students within the required timeline, hardware limits, and open-source budgets.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRunAnalysis}
            disabled={loading}
            className="px-4 py-2 rounded-xl glass-panel text-xs text-[#5E5364] hover:text-[#2D2530] border border-[#F1E4EC] flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#10B981]" />
            {loading ? 'Evaluating...' : 'Re-Evaluate'}
          </button>
          <button
            onClick={() => navigate('/research-gap')}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#E91E63] via-[#FB923C] to-[#F59E0B] hover:opacity-95 text-white text-xs font-semibold shadow-md shadow-orange-500/20 hover:scale-105 transition-all flex items-center gap-1.5"
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
          <div className="w-12 h-12 rounded-2xl bg-[#F0FDF4] border border-[#BBF7D0] flex items-center justify-center mx-auto text-[#10B981] animate-spin">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-[#2D2530]">Analyzing Feasibility Multi-Dimensions...</h3>
          <p className="text-xs text-[#5E5364] max-w-md mx-auto">
            Checking API quotas, computational budgets, team roles, and risk mitigations.
          </p>
        </div>
      )}

      {feasibilityData && !loading && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
          {/* Overall Verdict Banner - Soft Mint */}
          <div className="p-6 rounded-2xl border border-[#BBF7D0] pastel-glass-mint shadow-sm">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#15803D]">
                  Overall Feasibility Score
                </span>
                <div className="flex items-baseline gap-3 mt-1">
                  <span className="text-4xl font-extrabold text-[#2D2530] font-mono">
                    {feasibilityData.overallScore || 85}%
                  </span>
                  <Badge variant="mint">{feasibilityData.overallVerdict}</Badge>
                </div>
                <p className="text-xs text-[#5E5364] mt-2">
                  Targeted for: <span className="text-[#15803D] font-medium">{activeProject.title}</span>
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="p-3 rounded-xl bg-white border border-[#BBF7D0]">
                  <span className="text-xs text-[#5E5364] block">Tech Score</span>
                  <span className="text-lg font-bold text-[#0284C7] font-mono">
                    {feasibilityData.technicalFeasibility?.score || 88}%
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-white border border-[#BBF7D0]">
                  <span className="text-xs text-[#5E5364] block">Time Score</span>
                  <span className="text-lg font-bold text-[#D97706] font-mono">
                    {feasibilityData.timeFeasibility?.score || 82}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Core Feasibility Dimensions 2x2 with Multi-Color Pastel Identities */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 1. Technical & API Feasibility - Light Sky Blue */}
            <div className="p-6 rounded-2xl border border-[#BAE6FD] pastel-glass-sky space-y-4 shadow-2xs">
              <h3 className="text-sm font-bold text-[#2D2530] flex items-center gap-2 font-heading">
                <Cpu className="w-4 h-4 text-[#0EA5E9]" />
                Technical & Infrastructure Feasibility
              </h3>
              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-white border border-[#BAE6FD]">
                  <span className="font-semibold text-[#0284C7] block mb-1">AI / Model Tier:</span>
                  <p className="text-[#5E5364]">{feasibilityData.technicalFeasibility?.aiModelRequirements}</p>
                </div>

                <div className="p-3 rounded-xl bg-white border border-[#BAE6FD]">
                  <span className="font-semibold text-[#0284C7] block mb-1">Dataset Availability:</span>
                  <p className="text-[#5E5364]">{feasibilityData.technicalFeasibility?.datasetRequirements}</p>
                </div>

                <div className="p-3 rounded-xl bg-white border border-[#BAE6FD]">
                  <span className="font-semibold text-[#0284C7] block mb-1">Hosting & Infrastructure:</span>
                  <p className="text-[#5E5364]">{feasibilityData.technicalFeasibility?.infrastructure}</p>
                </div>
              </div>
            </div>

            {/* 2. Timeline & MVP Feasibility - Soft Gold */}
            <div className="p-6 rounded-2xl border border-[#FDE68A] pastel-glass-gold space-y-4 shadow-2xs">
              <h3 className="text-sm font-bold text-[#2D2530] flex items-center gap-2 font-heading">
                <Clock className="w-4 h-4 text-[#F59E0B]" />
                Time Feasibility & Milestones
              </h3>
              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-[#FDE68A]">
                  <div>
                    <span className="font-semibold text-[#D97706] block">MVP Execution:</span>
                    <span className="text-[#5E5364]">{feasibilityData.timeFeasibility?.mvpTimeline}</span>
                  </div>
                  <Badge variant="gold">Core Demo</Badge>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-[#FDE68A]">
                  <div>
                    <span className="font-semibold text-[#D97706] block">Full Capstone Scope:</span>
                    <span className="text-[#5E5364]">{feasibilityData.timeFeasibility?.fullTimeline}</span>
                  </div>
                  <Badge variant="mint">Defense Ready</Badge>
                </div>

                <div className="p-3 rounded-xl bg-white border border-[#FDE68A]">
                  <span className="font-semibold text-[#D97706] block mb-2">Phased Breakdown:</span>
                  <ul className="space-y-1 text-[#5E5364]">
                    {(feasibilityData.timeFeasibility?.milestones || []).map((m, i) => (
                      <li key={i}>• {m}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* 3. Cost & Hardware Requirements - Soft Mint Green */}
            <div className="p-6 rounded-2xl border border-[#BBF7D0] pastel-glass-mint space-y-4 shadow-2xs">
              <h3 className="text-sm font-bold text-[#2D2530] flex items-center gap-2 font-heading">
                <DollarSign className="w-4 h-4 text-[#10B981]" />
                Budget & Hardware Specification
              </h3>
              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-white border border-[#BBF7D0]">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-[#15803D]">Free Tier Viability:</span>
                    <Badge variant={feasibilityData.costAnalysis?.isFreeTierViable ? 'mint' : 'warning'}>
                      {feasibilityData.costAnalysis?.isFreeTierViable ? '100% Free Viable' : 'Paid Required'}
                    </Badge>
                  </div>
                  <ul className="space-y-1 text-[#5E5364] mt-2">
                    {(feasibilityData.costAnalysis?.freeTierAlternatives || []).map((alt, i) => (
                      <li key={i}>✓ {alt}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-3 rounded-xl bg-white border border-[#BBF7D0]">
                  <span className="font-semibold text-[#15803D] block mb-1">Hardware Specs:</span>
                  <p className="text-[#5E5364]">
                    Min: {feasibilityData.hardwareRequirements?.minimumSpecs} | Rec: {feasibilityData.hardwareRequirements?.recommendedSpecs}
                  </p>
                  <p className="text-[11px] text-[#15803D] mt-1 font-medium">{feasibilityData.hardwareRequirements?.notes}</p>
                </div>
              </div>
            </div>

            {/* 4. Team Roles - Light Peach */}
            <div className="p-6 rounded-2xl border border-[#FED7AA] pastel-glass-peach space-y-4 shadow-2xs">
              <h3 className="text-sm font-bold text-[#2D2530] flex items-center gap-2 font-heading">
                <Users className="w-4 h-4 text-[#FB923C]" />
                Recommended Team Breakdown
              </h3>
              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-white border border-[#FED7AA] flex items-center justify-between">
                  <span className="font-semibold text-[#C2410C]">Recommended Size:</span>
                  <Badge variant="peach">{feasibilityData.teamFeasibility?.recommendedTeamSize} Members</Badge>
                </div>

                <div className="p-3 rounded-xl bg-white border border-[#FED7AA] space-y-2">
                  <span className="font-semibold text-[#C2410C] block">Recommended Roles:</span>
                  <ul className="space-y-1.5 text-[#2D2530]">
                    {(feasibilityData.teamFeasibility?.requiredRoles || []).map((role, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FB923C]"></span>
                        <span>{role}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Risk Analysis Matrix */}
          <GlassCard className="p-6 border-[#F1E4EC] bg-white shadow-sm">
            <h3 className="text-sm font-bold text-[#2D2530] mb-4 flex items-center gap-2 font-heading">
              <AlertTriangle className="w-4 h-4 text-[#F59E0B]" />
              Risk Matrix & Mitigation Strategies
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(feasibilityData.riskMatrix || []).map((risk, i) => (
                <div key={i} className="p-4 rounded-xl bg-[#FAF8FB] border border-[#F1E4EC] space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#2D2530]">{risk.category}</span>
                    <Badge variant="warning" className="text-[10px]">Identified Risk</Badge>
                  </div>
                  <p className="text-[#5E5364]">{risk.description}</p>
                  <div className="pt-2 border-t border-[#F1E4EC] text-[#2D2530]">
                    <span className="font-semibold text-[#15803D] block text-[11px]">Mitigation Strategy:</span>
                    <span className="text-[#5E5364]">{risk.mitigation}</span>
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
