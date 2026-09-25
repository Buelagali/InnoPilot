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
  Layers,
  Code2,
  Cpu,
  Database,
  Cloud,
  CheckCircle2,
  ArrowRight,
  Target,
  Users,
  Lightbulb,
  Award
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
        <GlassCard variant="pink" className="p-8 border-[#FBCFE8]">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#F9A8C8]/30 to-[#FED7AA]/30 border border-[#F9A8C8]/40 flex items-center justify-center mx-auto mb-3 text-[#DB2777]">
            <FileCheck2 className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold text-[#2D2530]">No Active Project Selected</h2>
          <p className="text-xs text-[#5E5364] max-w-md mx-auto">
            Please select or generate a project first to synthesize the final capstone proposal document.
          </p>
          <button
            onClick={() => navigate('/library')}
            className="mt-4 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#F9A8C8] via-[#FED7AA] to-[#FDE68A] text-[#2D2530] text-xs font-bold shadow-md shadow-[#F9A8C8]/25 hover:shadow-lg hover:scale-105 transition-all"
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-[#F9A8C8]/20 via-[#FED7AA]/20 to-[#BAE6FD]/20 border border-[#F9A8C8]/40 text-[#DB2777] text-xs font-bold mb-2 shadow-xs">
            <FileCheck2 className="w-3.5 h-3.5 text-[#DB2777]" />
            <span>Module 13 • Final Project Proposal Generator</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#2D2530] tracking-tight">
            Capstone Project Proposal Document
          </h1>
          <p className="text-xs sm:text-sm text-[#5E5364] mt-1 max-w-2xl leading-relaxed">
            A comprehensive, publication-ready academic project proposal combining problem discovery, similarity benchmarking, feasibility analysis, and architecture blueprints.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleCopyMarkdown}
            className="px-3.5 py-2 rounded-xl bg-white border border-[#FED7AA] text-xs text-[#5E5364] hover:text-[#EA580C] hover:border-[#EA580C]/40 hover:bg-[#FED7AA]/10 flex items-center gap-1.5 transition-all shadow-xs"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-[#EA580C]" />}
            <span className="font-semibold">{copied ? 'Copied Markdown!' : 'Copy Markdown'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl bg-white hover:bg-[#BAE6FD]/15 text-[#2D2530] text-xs font-semibold border border-[#BAE6FD] flex items-center gap-1.5 transition-all shadow-xs"
          >
            <Printer className="w-3.5 h-3.5 text-[#0284C7]" />
            <span>Print / PDF Export</span>
          </button>

          <button
            onClick={handleGenerateProposal}
            disabled={loading}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#F9A8C8] via-[#FED7AA] to-[#FDE68A] text-[#2D2530] text-xs font-bold shadow-md shadow-[#F9A8C8]/25 hover:shadow-lg hover:scale-105 transition-all flex items-center gap-1.5 disabled:opacity-50"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#DB2777]" />
            <span>{loading ? 'Synthesizing...' : 'Re-Generate'}</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-rose-50/80 border border-rose-200 text-rose-700 text-xs sm:text-sm flex items-center gap-2 print:hidden shadow-xs">
          <ShieldAlert className="w-4 h-4 flex-shrink-0 text-rose-600" />
          <span>{error}</span>
        </div>
      )}

      {loading && (
        <div className="p-16 text-center space-y-4 print:hidden">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#F9A8C8]/30 via-[#FED7AA]/30 to-[#BAE6FD]/30 border border-[#F9A8C8]/40 flex items-center justify-center mx-auto text-[#DB2777] animate-spin shadow-md">
            <Sparkles className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-[#2D2530]">Synthesizing Formal Capstone Proposal...</h3>
          <p className="text-xs text-[#5E5364] max-w-md mx-auto">
            Synthesizing abstract, problem statement, literature comparison, multi-tier stack, and expected defense metrics.
          </p>
        </div>
      )}

      {/* Formal Printable Document Card */}
      {proposalData && !loading && (
        <div className="bg-white border border-[#F1E4EC] rounded-3xl p-6 sm:p-12 shadow-xl shadow-[#F9A8C8]/10 space-y-8 text-[#2D2530] print:bg-white print:text-black print:p-0 print:border-none print:shadow-none animate-fadeInUp">
          {/* Document Header */}
          <div className="text-center pb-8 border-b border-[#F1E4EC] print:border-black/20">
            <Badge variant="pink" className="mb-3 print:hidden">
              Departmental Major Capstone Proposal
            </Badge>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-[#2D2530] print:text-black tracking-tight leading-tight">
              {proposalData.projectTitle}
            </h1>
            <p className="text-xs sm:text-sm text-[#DB2777] print:text-gray-700 mt-2 font-semibold">
              Domain: {activeProject.domain || 'Software Engineering'} • Final Year Capstone Innovation
            </p>
          </div>

          {/* 1. Abstract */}
          <section className="space-y-2">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#0284C7] print:text-black flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-[#0284C7]" />
              <span>1. Executive Abstract</span>
            </h2>
            <p className="text-xs sm:text-sm leading-relaxed text-[#5E5364] print:text-gray-800 bg-[#BAE6FD]/15 print:bg-gray-50 p-4 rounded-2xl border border-[#BAE6FD]/40 print:border-gray-200">
              {proposalData.abstract}
            </p>
          </section>

          {/* 2. Problem Statement */}
          <section className="space-y-2">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#EA580C] print:text-black flex items-center gap-2">
              <Target className="w-4 h-4 text-[#EA580C]" />
              <span>2. Problem Statement & Context</span>
            </h2>
            <p className="text-xs sm:text-sm leading-relaxed text-[#5E5364] print:text-gray-800 bg-[#FED7AA]/15 p-4 rounded-2xl border border-[#FED7AA]/40 print:border-gray-200">
              {proposalData.problemStatement}
            </p>
          </section>

          {/* 3. Existing System & Proposed System 2-Col Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section className="space-y-2 p-5 rounded-2xl bg-rose-50/70 print:bg-gray-50 border border-rose-200 print:border-gray-200">
              <h2 className="text-xs font-bold uppercase tracking-wider text-rose-600 print:text-black">
                3. Existing System & Bottlenecks
              </h2>
              <p className="text-xs leading-relaxed text-[#5E5364] print:text-gray-800">
                {proposalData.existingSystem}
              </p>
            </section>

            <section className="space-y-2 p-5 rounded-2xl bg-[#BBF7D0]/25 print:bg-gray-50 border border-[#BBF7D0]/60 print:border-gray-200">
              <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-700 print:text-black">
                4. Proposed System & Innovations
              </h2>
              <p className="text-xs leading-relaxed text-[#5E5364] print:text-gray-800">
                {proposalData.proposedSystem}
              </p>
            </section>
          </div>

          {/* 5. Project Objectives */}
          <section className="space-y-3 p-5 rounded-2xl bg-[#FEF3C7]/30 border border-[#FDE68A]/60 print:bg-transparent print:border-none print:p-0">
            <h2 className="text-sm font-bold uppercase tracking-wider text-amber-800 print:text-black flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-700" />
              <span>5. Project Objectives</span>
            </h2>
            <ul className="space-y-2 text-xs sm:text-sm text-[#5E5364] print:text-gray-800">
              {(proposalData.objectives || []).map((obj, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="font-mono font-bold text-amber-700 print:text-black">{i + 1}.</span>
                  <span className="leading-relaxed">{obj}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* 6. Target Users & 7. Major Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section className="space-y-3 p-5 rounded-2xl bg-[#FED7AA]/20 border border-[#FED7AA]/50 print:bg-transparent print:border-none print:p-0">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#EA580C] print:text-black flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" />
                <span>6. Target Stakeholders</span>
              </h2>
              <ul className="space-y-1.5 text-xs text-[#5E5364] print:text-gray-800">
                {(proposalData.targetUsers || []).map((u, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#EA580C]" />
                    <span>{u}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="space-y-3 p-5 rounded-2xl bg-[#BAE6FD]/20 border border-[#BAE6FD]/50 print:bg-transparent print:border-none print:p-0">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#0284C7] print:text-black flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                <span>7. Key Functional Modules</span>
              </h2>
              <ul className="space-y-1.5 text-xs text-[#5E5364] print:text-gray-800">
                {(proposalData.majorFeatures || []).map((f, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0284C7]" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* 8. Technology Stack Specification */}
          <section className="space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#2D2530] print:text-black flex items-center gap-2">
              <Code2 className="w-4 h-4 text-[#DB2777]" />
              <span>8. Multi-Tier Technology Stack</span>
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-[#BAE6FD]/20 print:bg-gray-100 border border-[#BAE6FD]/60">
                <span className="font-bold text-[#0284C7] print:text-gray-800 block mb-0.5">Frontend Client:</span>
                <span className="text-[#5E5364] print:text-gray-700 font-medium">{proposalData.technologyStack?.frontend}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#FED7AA]/20 print:bg-gray-100 border border-[#FED7AA]/60">
                <span className="font-bold text-[#EA580C] print:text-gray-800 block mb-0.5">Backend REST:</span>
                <span className="text-[#5E5364] print:text-gray-700 font-medium">{proposalData.technologyStack?.backend}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#BBF7D0]/25 print:bg-gray-100 border border-[#BBF7D0]/60">
                <span className="font-bold text-emerald-700 print:text-gray-800 block mb-0.5">Database Cluster:</span>
                <span className="text-[#5E5364] print:text-gray-700 font-medium">{proposalData.technologyStack?.database}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#FBCFE8]/25 print:bg-gray-100 border border-[#F9A8C8]/60">
                <span className="font-bold text-[#DB2777] print:text-gray-800 block mb-0.5">AI/ML Intelligence:</span>
                <span className="text-[#5E5364] print:text-gray-700 font-medium">{proposalData.technologyStack?.aiMl}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#FEF3C7]/40 print:bg-gray-100 border border-[#FDE68A]/70 sm:col-span-2">
                <span className="font-bold text-amber-800 print:text-gray-800 block mb-0.5">DevOps & Hosting:</span>
                <span className="text-[#5E5364] print:text-gray-700 font-medium">{proposalData.technologyStack?.devops}</span>
              </div>
            </div>
          </section>

          {/* 9. AI Components & 10. System Architecture */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section className="space-y-2 p-5 rounded-2xl bg-[#FBCFE8]/20 border border-[#F9A8C8]/40">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#DB2777] print:text-black flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5" />
                <span>9. AI & Algorithmic Components</span>
              </h2>
              <p className="text-xs leading-relaxed text-[#5E5364] print:text-gray-800">
                {proposalData.aiComponents}
              </p>
            </section>

            <section className="space-y-2 p-5 rounded-2xl bg-[#BAE6FD]/20 border border-[#BAE6FD]/40">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#0284C7] print:text-black flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5" />
                <span>10. System Architecture Flow</span>
              </h2>
              <p className="text-xs leading-relaxed text-[#5E5364] print:text-gray-800">
                {proposalData.systemArchitecture}
              </p>
            </section>
          </div>

          {/* 11. Expected Results */}
          <section className="space-y-2">
            <h2 className="text-sm font-bold uppercase tracking-wider text-amber-800 print:text-black flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-700" />
              <span>11. Expected Outcomes & Defense Metrics</span>
            </h2>
            <p className="text-xs sm:text-sm leading-relaxed text-[#5E5364] print:text-gray-800 bg-[#FEF3C7]/30 print:bg-gray-50 p-4 rounded-2xl border border-[#FDE68A]/60">
              {proposalData.expectedResults}
            </p>
          </section>

          {/* 12. Advantages & 13. Limitations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section className="space-y-3 p-5 rounded-2xl bg-[#BBF7D0]/20 border border-[#BBF7D0]/50 print:bg-transparent print:border-none print:p-0">
              <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-700 print:text-black">
                12. System Advantages
              </h2>
              <ul className="space-y-1.5 text-xs text-[#5E5364] print:text-gray-800">
                {(proposalData.advantages || []).map((adv, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{adv}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="space-y-3 p-5 rounded-2xl bg-[#FED7AA]/20 border border-[#FED7AA]/50 print:bg-transparent print:border-none print:p-0">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#EA580C] print:text-black">
                13. Identified Limitations
              </h2>
              <ul className="space-y-1.5 text-xs text-[#5E5364] print:text-gray-800">
                {(proposalData.limitations || []).map((lim, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#EA580C]" />
                    <span>{lim}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* 14. Future Scope */}
          <section className="space-y-2 p-5 rounded-2xl bg-gradient-to-r from-[#FBCFE8]/20 via-[#FED7AA]/20 to-[#BAE6FD]/20 border border-[#F1E4EC]">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#DB2777] print:text-black flex items-center gap-2">
              <ArrowRight className="w-4 h-4 text-[#DB2777]" />
              <span>14. Future Research & Extension Scope</span>
            </h2>
            <ul className="space-y-2 text-xs sm:text-sm text-[#5E5364] print:text-gray-800">
              {(proposalData.futureScope || []).map((fs, i) => (
                <li key={i} className="flex items-center gap-2">
                  <ArrowRight className="w-3.5 h-3.5 text-[#0284C7] shrink-0" />
                  <span>{fs}</span>
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
