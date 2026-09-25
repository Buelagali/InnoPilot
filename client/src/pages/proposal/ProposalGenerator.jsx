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
  ShieldAlert,
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
        <GlassCard className="p-8 border-[#f3c5d3]">
          <FileCheck2 className="w-12 h-12 text-[#e91e63] mx-auto mb-3" />
          <h2 className="text-xl font-bold text-[#3a2630]">No Active Project Selected</h2>
          <p className="text-xs text-[#6b5560] max-w-md mx-auto">
            Please select or generate a project first to synthesize the final capstone proposal document.
          </p>
          <button
            onClick={() => navigate('/library')}
            className="mt-4 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#e91e63] to-[#f43f5e] text-white text-xs font-semibold shadow-md shadow-[#e91e63]/20 hover:opacity-95 transition-all"
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fce4ec] text-[#e91e63] border border-[#f3c5d3] text-xs font-semibold mb-2">
            <FileCheck2 className="w-3.5 h-3.5" />
            <span>Module 13 • Final Project Proposal Generator</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#3a2630] tracking-tight">
            Capstone Project Proposal Document
          </h1>
          <p className="text-xs sm:text-sm text-[#6b5560] mt-1 max-w-2xl">
            A comprehensive, publication-ready academic project proposal combining your problem discovery, similarity benchmarking, feasibility analysis, and architecture blueprints.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleCopyMarkdown}
            className="px-3.5 py-2 rounded-xl bg-white border border-[#f3c5d3] text-xs text-[#6b5560] hover:text-[#e91e63] hover:border-[#e91e63]/50 flex items-center gap-1.5 transition-colors shadow-sm"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-[#e91e63]" />}
            <span>{copied ? 'Copied Markdown!' : 'Copy Markdown'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl bg-white hover:bg-[#fff0f5] text-[#3a2630] text-xs font-semibold border border-[#f3c5d3] flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <Printer className="w-3.5 h-3.5 text-[#e91e63]" />
            <span>Print / PDF Export</span>
          </button>

          <button
            onClick={handleGenerateProposal}
            disabled={loading}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#e91e63] via-[#ec407a] to-[#f43f5e] text-white text-xs font-semibold shadow-md shadow-[#e91e63]/20 hover:scale-105 transition-all flex items-center gap-1.5 disabled:opacity-50"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{loading ? 'Synthesizing...' : 'Re-Generate'}</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs sm:text-sm flex items-center gap-2 print:hidden">
          <ShieldAlert className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {loading && (
        <div className="p-16 text-center space-y-4 print:hidden">
          <div className="w-12 h-12 rounded-2xl bg-[#fce4ec] border border-[#f3c5d3] flex items-center justify-center mx-auto text-[#e91e63] animate-spin">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-[#3a2630]">Synthesizing Formal Capstone Proposal...</h3>
          <p className="text-xs text-[#6b5560] max-w-md mx-auto">
            Synthesizing abstract, problem statement, literature comparison, multi-tier stack, and expected defense metrics.
          </p>
        </div>
      )}

      {/* Formal Printable Document Card */}
      {proposalData && !loading && (
        <div className="bg-white border border-[#f3c5d3] rounded-3xl p-6 sm:p-12 shadow-xl shadow-[#fce4ec]/40 space-y-8 text-[#3a2630] print:bg-white print:text-black print:p-0 print:border-none print:shadow-none animate-in fade-in">
          {/* Document Header */}
          <div className="text-center pb-8 border-b border-[#fce4ec] print:border-black/20">
            <Badge variant="primary" className="mb-3 print:hidden">
              Departmental Major Capstone Proposal
            </Badge>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-[#3a2630] print:text-black tracking-tight leading-tight">
              {proposalData.projectTitle}
            </h1>
            <p className="text-xs sm:text-sm text-[#e91e63] print:text-gray-700 mt-2 font-medium">
              Domain: {activeProject.domain || 'Software Engineering'} • Final Year Capstone Innovation
            </p>
          </div>

          {/* 1. Abstract */}
          <section className="space-y-2">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#e91e63] print:text-black flex items-center gap-2">
              1. Executive Abstract
            </h2>
            <p className="text-xs sm:text-sm leading-relaxed text-[#6b5560] print:text-gray-800 bg-[#fff8fa] print:bg-gray-50 p-4 rounded-xl border border-[#fce4ec] print:border-gray-200">
              {proposalData.abstract}
            </p>
          </section>

          {/* 2. Problem Statement */}
          <section className="space-y-2">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#e91e63] print:text-black">
              2. Problem Statement & Context
            </h2>
            <p className="text-xs sm:text-sm leading-relaxed text-[#6b5560] print:text-gray-800">
              {proposalData.problemStatement}
            </p>
          </section>

          {/* 3. Existing System & Proposed System 2-Col Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section className="space-y-2 p-4 rounded-xl bg-rose-50/60 print:bg-gray-50 border border-rose-100 print:border-gray-200">
              <h2 className="text-xs font-bold uppercase tracking-wider text-rose-600 print:text-black">
                3. Existing System & Bottlenecks
              </h2>
              <p className="text-xs leading-relaxed text-[#6b5560] print:text-gray-800">
                {proposalData.existingSystem}
              </p>
            </section>

            <section className="space-y-2 p-4 rounded-xl bg-emerald-50/60 print:bg-gray-50 border border-emerald-100 print:border-gray-200">
              <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-700 print:text-black">
                4. Proposed System & Innovations
              </h2>
              <p className="text-xs leading-relaxed text-[#6b5560] print:text-gray-800">
                {proposalData.proposedSystem}
              </p>
            </section>
          </div>

          {/* 5. Project Objectives */}
          <section className="space-y-2">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#e91e63] print:text-black">
              5. Project Objectives
            </h2>
            <ul className="space-y-1.5 text-xs sm:text-sm text-[#6b5560] print:text-gray-800">
              {(proposalData.objectives || []).map((obj, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="font-mono font-bold text-[#e91e63] print:text-black">•</span>
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* 6. Target Users & 7. Major Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section className="space-y-2">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#d81b60] print:text-black">
                6. Target Stakeholders
              </h2>
              <ul className="space-y-1 text-xs text-[#6b5560] print:text-gray-800">
                {(proposalData.targetUsers || []).map((u, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <span className="text-[#e91e63] font-bold">✓</span> {u}
                  </li>
                ))}
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#e91e63] print:text-black">
                7. Key Functional Modules
              </h2>
              <ul className="space-y-1 text-xs text-[#6b5560] print:text-gray-800">
                {(proposalData.majorFeatures || []).map((f, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <span className="text-[#e91e63] font-bold">✓</span> {f}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* 8. Technology Stack Specification */}
          <section className="space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#e91e63] print:text-black">
              8. Technology Stack
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-[#fff8fa] print:bg-gray-100 border border-[#fce4ec]">
                <span className="font-bold text-[#e91e63] print:text-gray-800 block mb-0.5">Frontend Client:</span>
                <span className="text-[#6b5560] print:text-gray-700">{proposalData.technologyStack?.frontend}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#fff8fa] print:bg-gray-100 border border-[#fce4ec]">
                <span className="font-bold text-[#e91e63] print:text-gray-800 block mb-0.5">Backend REST:</span>
                <span className="text-[#6b5560] print:text-gray-700">{proposalData.technologyStack?.backend}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#fff8fa] print:bg-gray-100 border border-[#fce4ec]">
                <span className="font-bold text-[#e91e63] print:text-gray-800 block mb-0.5">Database Cluster:</span>
                <span className="text-[#6b5560] print:text-gray-700">{proposalData.technologyStack?.database}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#fff8fa] print:bg-gray-100 border border-[#fce4ec]">
                <span className="font-bold text-[#e91e63] print:text-gray-800 block mb-0.5">AI/ML Intelligence:</span>
                <span className="text-[#6b5560] print:text-gray-700">{proposalData.technologyStack?.aiMl}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#fff8fa] print:bg-gray-100 border border-[#fce4ec] sm:col-span-2">
                <span className="font-bold text-[#e91e63] print:text-gray-800 block mb-0.5">DevOps & Hosting:</span>
                <span className="text-[#6b5560] print:text-gray-700">{proposalData.technologyStack?.devops}</span>
              </div>
            </div>
          </section>

          {/* 9. AI Components & 10. System Architecture */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section className="space-y-2">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#e91e63] print:text-black">
                9. AI & Algorithmic Components
              </h2>
              <p className="text-xs leading-relaxed text-[#6b5560] print:text-gray-800">
                {proposalData.aiComponents}
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#d81b60] print:text-black">
                10. System Architecture Flow
              </h2>
              <p className="text-xs leading-relaxed text-[#6b5560] print:text-gray-800">
                {proposalData.systemArchitecture}
              </p>
            </section>
          </div>

          {/* 11. Expected Results */}
          <section className="space-y-2">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#e91e63] print:text-black">
              11. Expected Outcomes & Defense Metrics
            </h2>
            <p className="text-xs sm:text-sm leading-relaxed text-[#6b5560] print:text-gray-800 bg-[#fff8fa] print:bg-gray-50 p-4 rounded-xl border border-[#fce4ec]">
              {proposalData.expectedResults}
            </p>
          </section>

          {/* 12. Advantages & 13. Limitations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section className="space-y-2">
              <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-700 print:text-black">
                12. System Advantages
              </h2>
              <ul className="space-y-1 text-xs text-[#6b5560] print:text-gray-800">
                {(proposalData.advantages || []).map((adv, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <span className="text-emerald-600 font-bold">✓</span> {adv}
                  </li>
                ))}
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-xs font-bold uppercase tracking-wider text-amber-700 print:text-black">
                13. Identified Limitations
              </h2>
              <ul className="space-y-1 text-xs text-[#6b5560] print:text-gray-800">
                {(proposalData.limitations || []).map((lim, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <span className="text-amber-600 font-bold">•</span> {lim}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* 14. Future Scope */}
          <section className="space-y-2">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#e91e63] print:text-black">
              14. Future Research & Extension Scope
            </h2>
            <ul className="space-y-1 text-xs sm:text-sm text-[#6b5560] print:text-gray-800">
              {(proposalData.futureScope || []).map((fs, i) => (
                <li key={i} className="flex items-center gap-1.5">
                  <span className="text-[#e91e63] font-bold">→</span> {fs}
                </li>
              ))}
            </ul>
          </section>
        </div>
      )}
    </div>
  );
};

export default ProposalGenerator;
