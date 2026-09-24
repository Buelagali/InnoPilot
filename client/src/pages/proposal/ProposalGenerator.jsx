import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProject } from '../../context/ProjectContext';
import { analysisAPI } from '../../services/api';
import {
  FileCheck2,
  Sparkles,
  Printer,
  Copy,
  Check,
  ArrowRight,
  ShieldAlert,
  Award,
  BookOpen,
  Layers,
  Cpu,
  CheckCircle2,
  Download,
} from 'lucide-react';
import { GlassCard } from '../../components/common/GlassCard';
import { Badge } from '../../components/common/Badge';
import WorkflowStepIndicator from '../../components/common/WorkflowStepIndicator';

const ProposalGenerator = () => {
  const navigate = useNavigate();
  const { activeProject, analyses, updateAnalysesMap } = useProject();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [proposalData, setProposalData] = useState(analyses?.proposal || null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (analyses?.proposal) {
      setProposalData(analyses.proposal);
    } else if (activeProject?._id) {
      handleGenerateProposal();
    }
  }, [activeProject?._id]);

  const handleGenerateProposal = async () => {
    if (!activeProject?._id) return;
    setLoading(true);
    setError('');

    try {
      const res = await analysisAPI.generateProposal(activeProject._id);
      if (res.data.success) {
        setProposalData(res.data.proposal);
        updateAnalysesMap('proposal', res.data.proposal);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to synthesize proposal.');
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyMarkdown = () => {
    if (!proposalData) return;

    const md = `# CAPSTONE PROJECT PROPOSAL: ${proposalData.projectTitle}

## 1. ABSTRACT
${proposalData.abstract}

## 2. PROBLEM STATEMENT
${proposalData.problemStatement}

## 3. EXISTING SYSTEM & LIMITATIONS
${proposalData.existingSystem}

## 4. PROPOSED SYSTEM & NOVELTY
${proposalData.proposedSystem}

## 5. PROJECT OBJECTIVES
${(proposalData.objectives || []).map((o, i) => `${i + 1}. ${o}`).join('\n')}

## 6. TARGET STAKEHOLDERS
${(proposalData.targetUsers || []).map((u) => `- ${u}`).join('\n')}

## 7. MAJOR FEATURES
${(proposalData.majorFeatures || []).map((f) => `- ${f}`).join('\n')}

## 8. TECHNOLOGY STACK
- **Frontend:** ${proposalData.technologyStack?.frontend || ''}
- **Backend:** ${proposalData.technologyStack?.backend || ''}
- **Database:** ${proposalData.technologyStack?.database || ''}
- **AI/ML Layer:** ${proposalData.technologyStack?.aiMl || ''}
- **DevOps/Deployment:** ${proposalData.technologyStack?.devops || ''}

## 9. AI & ALGORITHMIC INTELLIGENCE
${proposalData.aiComponents}

## 10. SYSTEM ARCHITECTURE
${proposalData.systemArchitecture}

## 11. EXPECTED RESULTS & METRICS
${proposalData.expectedResults}

## 12. ADVANTAGES
${(proposalData.advantages || []).map((a) => `- ${a}`).join('\n')}

## 13. LIMITATIONS
${(proposalData.limitations || []).map((l) => `- ${l}`).join('\n')}

## 14. FUTURE SCOPE
${(proposalData.futureScope || []).map((fs) => `- ${fs}`).join('\n')}
`;

    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  if (!activeProject) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <GlassCard className="p-8 border-indigo-500/20">
          <FileCheck2 className="w-12 h-12 text-indigo-400 mx-auto mb-3" />
          <h2 className="text-xl font-bold text-white">No Active Project Selected</h2>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Please select or generate a project first to synthesize the final capstone proposal document.
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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <div className="print:hidden">
        <WorkflowStepIndicator currentStepId="proposal" />
      </div>

      {/* Header & Export Actions Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 print:hidden">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold mb-2">
            <FileCheck2 className="w-3.5 h-3.5" />
            <span>Module 13 • Final Project Proposal Generator</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Capstone Project Proposal Document
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            A comprehensive, publication-ready academic project proposal combining your problem discovery, similarity benchmarking, feasibility analysis, and architecture blueprints.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleCopyMarkdown}
            className="px-3.5 py-2 rounded-xl glass-panel text-xs text-slate-200 hover:text-white flex items-center gap-1.5 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied Markdown!' : 'Copy Markdown'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-white/10 flex items-center gap-1.5 transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / PDF Export</span>
          </button>

          <button
            onClick={handleGenerateProposal}
            disabled={loading}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-semibold shadow-md hover:scale-105 transition-all flex items-center gap-1.5 disabled:opacity-50"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{loading ? 'Synthesizing...' : 'Re-Generate'}</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs sm:text-sm flex items-center gap-2 print:hidden">
          <ShieldAlert className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {loading && (
        <div className="p-16 text-center space-y-4 print:hidden">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center mx-auto text-indigo-300 animate-spin">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white">Synthesizing Formal Capstone Proposal...</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Synthesizing abstract, problem statement, literature comparison, multi-tier stack, and expected defense metrics.
          </p>
        </div>
      )}

      {/* Formal Printable Document Card */}
      {proposalData && !loading && (
        <div className="bg-slate-900/90 border border-white/10 rounded-3xl p-6 sm:p-12 shadow-2xl space-y-8 text-slate-200 print:bg-white print:text-black print:p-0 print:border-none print:shadow-none animate-in fade-in">
          {/* Document Header */}
          <div className="text-center pb-8 border-b border-white/10 print:border-black/20">
            <Badge variant="primary" className="mb-3 print:hidden">
              Departmental Major Capstone Proposal
            </Badge>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white print:text-black tracking-tight leading-tight">
              {proposalData.projectTitle}
            </h1>
            <p className="text-xs sm:text-sm text-indigo-300 print:text-gray-700 mt-2 font-medium">
              Domain: {activeProject.domain || 'Software Engineering'} • Final Year Capstone Innovation
            </p>
          </div>

          {/* 1. Abstract */}
          <section className="space-y-2">
            <h2 className="text-sm font-bold uppercase tracking-wider text-indigo-400 print:text-blue-900 flex items-center gap-2">
              1. Executive Abstract
            </h2>
            <p className="text-xs sm:text-sm leading-relaxed text-slate-300 print:text-gray-800 bg-slate-950/40 print:bg-gray-50 p-4 rounded-xl border border-white/5 print:border-gray-200">
              {proposalData.abstract}
            </p>
          </section>

          {/* 2. Problem Statement */}
          <section className="space-y-2">
            <h2 className="text-sm font-bold uppercase tracking-wider text-indigo-400 print:text-blue-900">
              2. Problem Statement & Context
            </h2>
            <p className="text-xs sm:text-sm leading-relaxed text-slate-300 print:text-gray-800">
              {proposalData.problemStatement}
            </p>
          </section>

          {/* 3. Existing System & Proposed System 2-Col Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section className="space-y-2 p-4 rounded-xl bg-slate-950/30 print:bg-gray-50 border border-white/5 print:border-gray-200">
              <h2 className="text-xs font-bold uppercase tracking-wider text-rose-400 print:text-red-900">
                3. Existing System & Bottlenecks
              </h2>
              <p className="text-xs leading-relaxed text-slate-300 print:text-gray-800">
                {proposalData.existingSystem}
              </p>
            </section>

            <section className="space-y-2 p-4 rounded-xl bg-slate-950/30 print:bg-gray-50 border border-white/5 print:border-gray-200">
              <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-400 print:text-green-900">
                4. Proposed System & Innovations
              </h2>
              <p className="text-xs leading-relaxed text-slate-300 print:text-gray-800">
                {proposalData.proposedSystem}
              </p>
            </section>
          </div>

          {/* 5. Project Objectives */}
          <section className="space-y-2">
            <h2 className="text-sm font-bold uppercase tracking-wider text-indigo-400 print:text-blue-900">
              5. Project Objectives
            </h2>
            <ul className="space-y-1.5 text-xs sm:text-sm text-slate-300 print:text-gray-800">
              {(proposalData.objectives || []).map((obj, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="font-mono font-bold text-indigo-400 print:text-blue-800">•</span>
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* 6. Target Users & 7. Major Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section className="space-y-2">
              <h2 className="text-xs font-bold uppercase tracking-wider text-purple-400 print:text-purple-900">
                6. Target Stakeholders
              </h2>
              <ul className="space-y-1 text-xs text-slate-300 print:text-gray-800">
                {(proposalData.targetUsers || []).map((u, i) => (
                  <li key={i}>✓ {u}</li>
                ))}
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-xs font-bold uppercase tracking-wider text-cyan-400 print:text-cyan-900">
                7. Key Functional Modules
              </h2>
              <ul className="space-y-1 text-xs text-slate-300 print:text-gray-800">
                {(proposalData.majorFeatures || []).map((f, i) => (
                  <li key={i}>✓ {f}</li>
                ))}
              </ul>
            </section>
          </div>

          {/* 8. Technology Stack Specification */}
          <section className="space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-indigo-400 print:text-blue-900">
              8. Technology Stack
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-950/60 print:bg-gray-100 border border-white/5">
                <span className="font-bold text-indigo-300 print:text-gray-800 block mb-0.5">Frontend Client:</span>
                <span className="text-slate-300 print:text-gray-700">{proposalData.technologyStack?.frontend}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/60 print:bg-gray-100 border border-white/5">
                <span className="font-bold text-indigo-300 print:text-gray-800 block mb-0.5">Backend REST:</span>
                <span className="text-slate-300 print:text-gray-700">{proposalData.technologyStack?.backend}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/60 print:bg-gray-100 border border-white/5">
                <span className="font-bold text-indigo-300 print:text-gray-800 block mb-0.5">Database Cluster:</span>
                <span className="text-slate-300 print:text-gray-700">{proposalData.technologyStack?.database}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/60 print:bg-gray-100 border border-white/5">
                <span className="font-bold text-indigo-300 print:text-gray-800 block mb-0.5">AI/ML Intelligence:</span>
                <span className="text-slate-300 print:text-gray-700">{proposalData.technologyStack?.aiMl}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/60 print:bg-gray-100 border border-white/5 sm:col-span-2">
                <span className="font-bold text-indigo-300 print:text-gray-800 block mb-0.5">DevOps & Hosting:</span>
                <span className="text-slate-300 print:text-gray-700">{proposalData.technologyStack?.devops}</span>
              </div>
            </div>
          </section>

          {/* 9. AI Components & 10. System Architecture */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section className="space-y-2">
              <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-400 print:text-blue-900">
                9. AI & Algorithmic Components
              </h2>
              <p className="text-xs leading-relaxed text-slate-300 print:text-gray-800">
                {proposalData.aiComponents}
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-xs font-bold uppercase tracking-wider text-purple-400 print:text-purple-900">
                10. System Architecture Flow
              </h2>
              <p className="text-xs leading-relaxed text-slate-300 print:text-gray-800">
                {proposalData.systemArchitecture}
              </p>
            </section>
          </div>

          {/* 11. Expected Results */}
          <section className="space-y-2">
            <h2 className="text-sm font-bold uppercase tracking-wider text-indigo-400 print:text-blue-900">
              11. Expected Outcomes & Defense Metrics
            </h2>
            <p className="text-xs sm:text-sm leading-relaxed text-slate-300 print:text-gray-800 bg-slate-950/40 print:bg-gray-50 p-4 rounded-xl border border-white/5">
              {proposalData.expectedResults}
            </p>
          </section>

          {/* 12. Advantages & 13. Limitations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section className="space-y-2">
              <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-400 print:text-green-900">
                12. System Advantages
              </h2>
              <ul className="space-y-1 text-xs text-slate-300 print:text-gray-800">
                {(proposalData.advantages || []).map((adv, i) => (
                  <li key={i}>✓ {adv}</li>
                ))}
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-xs font-bold uppercase tracking-wider text-amber-400 print:text-amber-900">
                13. Identified Limitations
              </h2>
              <ul className="space-y-1 text-xs text-slate-300 print:text-gray-800">
                {(proposalData.limitations || []).map((lim, i) => (
                  <li key={i}>• {lim}</li>
                ))}
              </ul>
            </section>
          </div>

          {/* 14. Future Scope */}
          <section className="space-y-2">
            <h2 className="text-sm font-bold uppercase tracking-wider text-indigo-400 print:text-blue-900">
              14. Future Research & Extension Scope
            </h2>
            <ul className="space-y-1 text-xs sm:text-sm text-slate-300 print:text-gray-800">
              {(proposalData.futureScope || []).map((fs, i) => (
                <li key={i}>→ {fs}</li>
              ))}
            </ul>
          </section>
        </div>
      )}
    </div>
  );
};

export default ProposalGenerator;
