import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { problemAPI } from '../../services/api';
import {
  Search,
  Sparkles,
  ArrowRight,
  AlertCircle,
  Users,
  Layers,
  Database,
  ShieldCheck,
  TrendingUp,
  Cpu,
} from 'lucide-react';
import { GlassCard } from '../../components/common/GlassCard';
import { Badge } from '../../components/common/Badge';
import WorkflowStepIndicator from '../../components/common/WorkflowStepIndicator';

const ProblemAnalyzer = () => {
  const navigate = useNavigate();
  const [problemText, setProblemText] = useState('');
  const [domain, setDomain] = useState('Healthcare & Medicine');
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [analysisReport, setAnalysisReport] = useState(null);
  const [problemRecord, setProblemRecord] = useState(null);
  const [error, setError] = useState('');

  const sampleProblems = [
    "Small rural clinics experience severe diagnostic triage delays during network blackouts, resulting in preventable complications.",
    "Decentralized renewable solar microgrids in rural communities suffer frequent unpredicted battery failures due to lack of local edge telemetry.",
    "University students with visual impairments struggle to interact with real-time dynamic coding diagrams and whiteboard sessions in virtual labs."
  ];

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!problemText.trim() || problemText.length < 15) {
      setError('Please provide at least 15 characters describing the problem.');
      return;
    }

    setError('');
    setLoading(true);
    setAnalysisReport(null);

    try {
      const res = await problemAPI.analyzeManual({
        problemText,
        domain,
        title: title || `Problem in ${domain}`,
      });

      if (res.data.success) {
        setAnalysisReport(res.data.analysisReport);
        setProblemRecord(res.data.problem);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Analysis failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6 text-[#2D2530]">
      <WorkflowStepIndicator currentStepId="analyzer" maxSteps={3} />

      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F0F9FF] text-[#0284C7] border border-[#BAE6FD] text-xs font-semibold mb-2">
          <Search className="w-3.5 h-3.5 text-[#0EA5E9]" />
          <span>Module 3 • AI Problem Analyzer</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#2D2530] tracking-tight font-heading">
          Analyze Any Problem Statement
        </h1>
        <p className="text-xs sm:text-sm text-[#5E5364] mt-1 max-w-2xl">
          Enter a rough problem statement or friction point. The AI performs an architectural critique to identify root causes, data requirements, existing solution limits, and technical feasibility.
        </p>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Input Form Card */}
      <GlassCard className="p-6 sm:p-8 border-[#BAE6FD] bg-white shadow-sm">
        <form onSubmit={handleAnalyze} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#2D2530] mb-1">
                Domain / Field
              </label>
              <select
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm bg-white text-[#2D2530] border-[#BAE6FD]"
              >
                <option value="Healthcare & Medicine">Healthcare & Medicine</option>
                <option value="Education & Accessibility">Education & Accessibility</option>
                <option value="Agriculture & Food Security">Agriculture & Food Security</option>
                <option value="Environment & Climate Tech">Environment & Climate Tech</option>
                <option value="Transportation & Logistics">Transportation & Logistics</option>
                <option value="Cybersecurity & Privacy">Cybersecurity & Privacy</option>
                <option value="Software Engineering & DevOps">Software Engineering & DevOps</option>
                <option value="Smart Campus & Community">Smart Campus & Community</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#2D2530] mb-1">
                Working Title (Optional)
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Rural Clinic Triage Latency"
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm text-[#2D2530] placeholder-[#8E8295] border-[#BAE6FD]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#2D2530] mb-1">
              Problem Description *
            </label>
            <textarea
              rows={4}
              required
              value={problemText}
              onChange={(e) => setProblemText(e.target.value)}
              placeholder="Describe the operational breakdown, workflow inefficiency, or safety hazard you noticed..."
              className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm leading-relaxed text-[#2D2530] placeholder-[#8E8295] border-[#BAE6FD]"
            />
          </div>

          {/* Quick Sample Prompts */}
          <div>
            <span className="text-[11px] text-[#5E5364] block mb-1.5 font-medium">Or try an example problem:</span>
            <div className="flex flex-wrap gap-2">
              {sampleProblems.map((sp, i) => (
                <button
                  type="button"
                  key={i}
                  onClick={() => setProblemText(sp)}
                  className="text-left text-[11px] px-3 py-1.5 rounded-xl bg-[#F0F9FF] hover:bg-[#E0F2FE] text-[#0284C7] border border-[#BAE6FD] transition-all line-clamp-1 max-w-md font-medium"
                >
                  "{sp}"
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-[#0EA5E9] via-[#38BDF8] to-[#0284C7] text-white font-semibold text-xs sm:text-sm shadow-xl shadow-sky-500/20 hover:scale-105 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Sparkles className="w-4 h-4 animate-spin text-white" />
                Analyzing Problem Clarity & Feasibility...
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                Run AI Problem Analysis
              </>
            )}
          </button>
        </form>
      </GlassCard>

      {analysisReport && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
          <GlassCard className="p-6 sm:p-8 border-[#BAE6FD] bg-white shadow-xl shadow-sky-500/5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#F1E4EC]">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="sky">{domain}</Badge>
                  <Badge
                    variant={
                      analysisReport.technicalComplexity?.level === 'Low'
                        ? 'mint'
                        : analysisReport.technicalComplexity?.level === 'Moderate'
                        ? 'sky'
                        : 'gold'
                    }
                  >
                    Complexity: {analysisReport.technicalComplexity?.level || 'Moderate'}
                  </Badge>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#2D2530] font-heading">
                  Problem Architectural Analysis Report
                </h2>
              </div>

              <button
                onClick={() => navigate(`/generate?problemId=${problemRecord?._id}`)}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#E91E63] via-[#FB923C] to-[#F59E0B] text-white text-xs sm:text-sm font-semibold shadow-lg shadow-orange-500/20 hover:scale-105 transition-all flex items-center gap-1.5"
              >
                <span>Generate Solution Ideas</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Analysis Breakdown Grid with Multi-Color Pastel Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
              {/* Column 1: Sky Blue Cards */}
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-[#F0F9FF] border border-[#BAE6FD] space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0284C7] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> Problem Clarity
                  </span>
                  <p className="text-xs text-[#2D2530] leading-relaxed">
                    {analysisReport.problemClarity}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#F0F9FF] border border-[#BAE6FD] space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0369A1] flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5" /> Root Cause
                  </span>
                  <p className="text-xs text-[#2D2530] leading-relaxed">
                    {analysisReport.rootCause}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#F0F9FF] border border-[#BAE6FD] space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0284C7] flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5" /> Systemic Impact
                  </span>
                  <p className="text-xs text-[#2D2530] leading-relaxed">
                    {analysisReport.impact}
                  </p>
                </div>
              </div>

              {/* Column 2: Gold & Peach Cards */}
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-[#FFFBEB] border border-[#FDE68A] space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#D97706] flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5" /> Target Users & Stakeholders
                  </span>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {(analysisReport.targetUsers || []).map((u, i) => (
                      <Badge key={i} variant="gold">{u}</Badge>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#FFF7ED] border border-[#FED7AA] space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#EA580C] flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5" /> Limitations of Current Tools
                  </span>
                  <ul className="list-disc list-inside space-y-1 text-xs text-[#2D2530]">
                    {(analysisReport.limitations || []).map((lim, i) => (
                      <li key={i}>{lim}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-[#FFFBEB] border border-[#FDE68A] space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#B45309] flex items-center gap-1.5">
                    <Database className="w-3.5 h-3.5" /> Required Data & Datasets
                  </span>
                  <ul className="list-disc list-inside space-y-1 text-xs text-[#2D2530]">
                    {(analysisReport.requiredData || []).map((d, i) => (
                      <li key={i}>{d}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Column 3: Mint Green & Solution Directions */}
              <div className="space-y-4 md:col-span-2 lg:col-span-1">
                <div className="p-4 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0] space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#15803D] flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5" /> Technical Complexity Rationale
                  </span>
                  <p className="text-xs text-[#2D2530] leading-relaxed">
                    {analysisReport.technicalComplexity?.rationale}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#FFF1F6] border border-[#FBCFE8] space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#E91E63] block">
                    Possible Solution Directions:
                  </span>
                  <div className="space-y-2">
                    {(analysisReport.solutionDirections || []).map((dir, i) => (
                      <div key={i} className="p-2.5 rounded-lg bg-white text-xs text-[#2D2530] border border-[#FBCFE8]">
                        <span className="font-semibold text-[#E91E63] block mb-0.5">Direction {i + 1}</span>
                        {dir}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  );
};

export default ProblemAnalyzer;
