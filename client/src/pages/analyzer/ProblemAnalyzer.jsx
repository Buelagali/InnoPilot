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
  CheckCircle,
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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <WorkflowStepIndicator currentStepId="analyzer" />

      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold mb-2">
          <Search className="w-3.5 h-3.5" />
          <span>Module 3 • AI Problem Analyzer</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Analyze Any Problem Statement
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
          Enter a rough problem statement or friction point. The AI performs an architectural critique to identify root causes, data requirements, existing solution limits, and technical feasibility.
        </p>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs sm:text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Input Form Card */}
      <GlassCard className="p-6 sm:p-8 border-indigo-500/20">
        <form onSubmit={handleAnalyze} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Domain / Field
              </label>
              <select
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm bg-slate-900"
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
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Working Title (Optional)
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Rural Clinic Triage Latency"
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Problem Description *
            </label>
            <textarea
              rows={4}
              required
              value={problemText}
              onChange={(e) => setProblemText(e.target.value)}
              placeholder="Describe the operational breakdown, workflow inefficiency, or safety hazard you noticed..."
              className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm leading-relaxed"
            />
          </div>

          {/* Quick Sample Prompts */}
          <div>
            <span className="text-[11px] text-slate-400 block mb-1.5 font-medium">Or try an example problem:</span>
            <div className="flex flex-wrap gap-2">
              {sampleProblems.map((sp, i) => (
                <button
                  type="button"
                  key={i}
                  onClick={() => setProblemText(sp)}
                  className="text-left text-[11px] px-3 py-1.5 rounded-xl bg-slate-900/60 hover:bg-indigo-950/50 text-slate-300 border border-white/5 hover:border-indigo-500/30 transition-all line-clamp-1 max-w-md"
                >
                  "{sp}"
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 text-white font-semibold text-xs sm:text-sm shadow-xl shadow-indigo-600/30 hover:scale-105 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Sparkles className="w-4 h-4 animate-spin" />
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

      {/* Analysis Output Result */}
      {analysisReport && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
          <GlassCard className="p-6 sm:p-8 border-indigo-500/30">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="primary">{domain}</Badge>
                  <Badge
                    variant={
                      analysisReport.technicalComplexity?.level === 'Low'
                        ? 'success'
                        : analysisReport.technicalComplexity?.level === 'Moderate'
                        ? 'primary'
                        : 'warning'
                    }
                  >
                    Complexity: {analysisReport.technicalComplexity?.level || 'Moderate'}
                  </Badge>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Problem Architectural Analysis Report
                </h2>
              </div>

              <button
                onClick={() => navigate(`/generate?problemId=${problemRecord?._id}`)}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs sm:text-sm font-semibold shadow-lg hover:scale-105 transition-all flex items-center gap-1.5"
              >
                <span>Generate Solution Ideas</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Analysis Breakdown Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
              {/* Problem Clarity & Root Cause */}
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> Problem Clarity
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {analysisReport.problemClarity}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5" /> Root Cause
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {analysisReport.rootCause}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5" /> Systemic Impact
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {analysisReport.impact}
                  </p>
                </div>
              </div>

              {/* Users, Limitations, Stakeholders */}
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5" /> Target Users & Stakeholders
                  </span>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {(analysisReport.targetUsers || []).map((u, i) => (
                      <Badge key={i} variant="default">{u}</Badge>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5" /> Limitations of Current Tools
                  </span>
                  <ul className="list-disc list-inside space-y-1 text-xs text-slate-300">
                    {(analysisReport.limitations || []).map((lim, i) => (
                      <li key={i}>{lim}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                    <Database className="w-3.5 h-3.5" /> Required Data & Datasets
                  </span>
                  <ul className="list-disc list-inside space-y-1 text-xs text-slate-300">
                    {(analysisReport.requiredData || []).map((d, i) => (
                      <li key={i}>{d}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Technical Complexity & Solution Directions */}
              <div className="space-y-4 md:col-span-2 lg:col-span-1">
                <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-300 flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5" /> Technical Complexity Rationale
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {analysisReport.technicalComplexity?.rationale}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-500/30 space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-300 block">
                    Possible Solution Directions:
                  </span>
                  <div className="space-y-2">
                    {(analysisReport.solutionDirections || []).map((dir, i) => (
                      <div key={i} className="p-2.5 rounded-lg bg-slate-900/80 text-xs text-slate-200 border border-indigo-500/20">
                        <span className="font-semibold text-indigo-400 block mb-0.5">Direction {i + 1}</span>
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
