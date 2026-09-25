import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { problemAPI } from '../../services/api';
import {
  Compass,
  Sparkles,
  Send,
  ArrowRight,
  Bot,
  User,
  CheckCircle2,
  FileText,
  Lightbulb,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';
import { GlassCard } from '../../components/common/GlassCard';
import { Badge } from '../../components/common/Badge';
import WorkflowStepIndicator from '../../components/common/WorkflowStepIndicator';

const domainCards = [
  { name: 'Healthcare & Clinical Triage', icon: '🩺', desc: 'Rural clinic workflows, triage delays, medical imaging, telemetry' },
  { name: 'Education & Assistive Learning', icon: '🎓', desc: 'Adaptive testing, disability accessibility, lab simulation, evaluation' },
  { name: 'Agriculture & Food Supply', icon: '🌾', desc: 'Crop disease diagnostics, soil telemetry, cold-chain distribution' },
  { name: 'Environment & Climate Tech', icon: '🌿', desc: 'Carbon accounting, flood early warning, acoustic biodiversity monitoring' },
  { name: 'Transportation & Logistics', icon: '🚚', desc: 'Dynamic dispatch, fleet fuel optimization, public transit telemetry' },
  { name: 'Cybersecurity & Privacy', icon: '🛡️', desc: 'Zero-trust authentication, phishing defense, differential privacy sync' },
  { name: 'Software Systems & DevOps', icon: '⚡', desc: 'CI/CD anomaly detection, automated bug localization, memory profiling' },
  { name: 'Smart Campus & Community', icon: '🏛️', desc: 'Lab equipment sharing, peer study matching, hostel resource routing' },
];

const ProblemDiscovery = () => {
  const navigate = useNavigate();
  const [selectedDomain, setSelectedDomain] = useState('');
  const [stage, setStage] = useState('select_domain'); // 'select_domain' | 'chat' | 'report'
  const [conversationId, setConversationId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);
  const [generatedProblem, setGeneratedProblem] = useState(null);
  const [error, setError] = useState('');

  const handleStartDiscovery = async (domainName) => {
    setSelectedDomain(domainName);
    setStage('chat');
    setLoading(true);
    setError('');

    try {
      const res = await problemAPI.discoverChat({
        domain: domainName,
        userMessage: '',
      });

      if (res.data.success) {
        setConversationId(res.data.conversationId);
        setMessages(res.data.messages);
      }
    } catch (err) {
      setError('Failed to initiate problem discovery. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || loading) return;

    const userText = inputMessage;
    setInputMessage('');
    setLoading(true);

    try {
      const res = await problemAPI.discoverChat({
        domain: selectedDomain,
        userMessage: userText,
        conversationId,
      });

      if (res.data.success) {
        setMessages(res.data.messages);
      }
    } catch (err) {
      setError('Failed to send response. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleFinalizeReport = async () => {
    setLoading(true);
    setError('');

    try {
      const res = await problemAPI.finalizeDiscovery({
        conversationId,
        domain: selectedDomain,
      });

      if (res.data.success) {
        setReport(res.data.report);
        setGeneratedProblem(res.data.problem);
        setStage('report');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to synthesize discovery report.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <WorkflowStepIndicator currentStepId="discover" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fce4ec] text-[#e91e63] border border-[#f3c5d3] text-xs font-semibold mb-2">
            <Compass className="w-3.5 h-3.5 text-[#e91e63]" />
            <span>Module 2 • Problem Discovery Studio</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#3a2630] tracking-tight">
            Discover Real-World Problems
          </h1>
          <p className="text-xs sm:text-sm text-[#6b5560] mt-1 max-w-2xl">
            We don't immediately generate random project titles. First, answer probing questions from our AI mentor to uncover an authentic, high-impact societal or engineering pain point.
          </p>
        </div>

        {stage !== 'select_domain' && (
          <button
            onClick={() => {
              setStage('select_domain');
              setMessages([]);
              setConversationId(null);
            }}
            className="px-4 py-2 rounded-xl glass-panel text-xs text-[#6b5560] hover:text-[#3a2630] hover:border-[#f3c5d3] transition-colors"
          >
            ← Change Domain
          </button>
        )}
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Stage 1: Domain Selection Grid */}
      {stage === 'select_domain' && (
        <div className="space-y-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-[#6b5560]">
            Select an Innovation Domain to Explore:
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {domainCards.map((domain, i) => (
              <GlassCard
                key={i}
                interactive
                onClick={() => handleStartDiscovery(domain.name)}
                className="p-5 cursor-pointer flex flex-col justify-between group border border-[#f3c5d3]/60 hover:border-[#e91e63]/50"
              >
                <div>
                  <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">{domain.icon}</div>
                  <h3 className="text-sm font-bold text-[#3a2630] mb-1.5 group-hover:text-[#e91e63] transition-colors">
                    {domain.name}
                  </h3>
                  <p className="text-xs text-[#6b5560] leading-relaxed">{domain.desc}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#f3c5d3]/40 flex items-center justify-between text-xs text-[#e91e63] font-medium">
                  <span>Start Discovery</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      )}

      {/* Stage 2: Guided AI Mentor Conversation */}
      {stage === 'chat' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <GlassCard className="p-5 sm:p-6 border-[#f3c5d3] flex flex-col h-[560px]">
              <div className="flex items-center justify-between pb-3 border-b border-[#f3c5d3] mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></div>
                  <span className="text-xs font-bold text-[#3a2630] uppercase tracking-wider">
                    Discovery Mentor: {selectedDomain}
                  </span>
                </div>
                <Badge variant="pink">{messages.length} exchanges</Badge>
              </div>

              {/* Chat Stream */}
              <div className="flex-1 overflow-y-auto space-y-4 pr-1">
                {messages.map((m, idx) => (
                  <div
                    key={idx}
                    className={`flex gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {m.sender === 'ai' && (
                      <div className="w-7 h-7 rounded-lg bg-[#fce4ec] border border-[#f3c5d3] flex items-center justify-center text-[#e91e63] flex-shrink-0 mt-0.5">
                        <Bot className="w-4 h-4" />
                      </div>
                    )}
                    <div
                      className={`max-w-[85%] p-4 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-line ${
                        m.sender === 'user'
                          ? 'bg-gradient-to-r from-[#e91e63] to-[#ec407a] text-white rounded-br-none shadow-md shadow-pink-500/10'
                          : 'bg-white text-[#3a2630] rounded-bl-none border border-[#f3c5d3] shadow-sm'
                      }`}
                    >
                      {m.text}
                    </div>
                  </div>
                ))}

                {loading && (
                  <div className="flex items-center gap-2 text-[#e91e63] text-xs italic pl-2">
                    <Sparkles className="w-4 h-4 animate-spin text-[#e91e63]" />
                    <span>AI Mentor is analyzing your problem context...</span>
                  </div>
                )}
              </div>

              {/* Chat Input */}
              <form onSubmit={handleSendMessage} className="mt-4 pt-3 border-t border-[#f3c5d3] flex gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Describe who faces this problem and what current tools lack..."
                  className="flex-1 glass-input rounded-xl px-4 py-2.5 text-xs sm:text-sm text-[#3a2630] placeholder-[#886a7a]"
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={loading || !inputMessage.trim()}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#e91e63] to-[#ec407a] hover:from-[#d81b60] hover:to-[#e91e63] text-white text-xs sm:text-sm font-semibold disabled:opacity-50 transition-all shadow-md shadow-pink-500/20 flex items-center gap-1.5"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </GlassCard>
          </div>

          {/* Synthesis Sidebar Action */}
          <div className="space-y-4">
            <GlassCard className="p-6 border-[#f3c5d3]">
              <h3 className="text-sm font-bold text-[#3a2630] mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#e91e63]" />
                Ready to Synthesize?
              </h3>
              <p className="text-xs text-[#6b5560] leading-relaxed mb-4">
                Once you and the mentor have pinpointed the affected users, root causes, and limitations, trigger the formal Problem Discovery Report synthesis.
              </p>

              <button
                onClick={handleFinalizeReport}
                disabled={loading || messages.length < 2}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#e91e63] via-[#ec407a] to-[#f43f5e] hover:from-[#d81b60] hover:via-[#e91e63] hover:to-[#ec407a] text-white text-xs sm:text-sm font-semibold shadow-lg shadow-pink-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-spin" />
                    Synthesizing Report...
                  </>
                ) : (
                  <>
                    <FileText className="w-4 h-4" />
                    Generate Discovery Report
                  </>
                )}
              </button>
            </GlassCard>

            <GlassCard className="p-5 bg-[#fff8fa] border border-[#f3c5d3] text-xs text-[#6b5560] space-y-2">
              <h4 className="font-semibold text-[#3a2630] flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-[#e91e63]" /> Discovery Criteria
              </h4>
              <ul className="list-disc list-inside space-y-1 text-[11px] text-[#6b5560]">
                <li>Clearly identifies who experiences the problem</li>
                <li>Explains why existing workarounds are inadequate</li>
                <li>Provides technical grounds for software intervention</li>
              </ul>
            </GlassCard>
          </div>
        </div>
      )}

      {/* Stage 3: Problem Discovery Report Output */}
      {stage === 'report' && report && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
          <GlassCard className="p-6 sm:p-8 border-[#f3c5d3] bg-white/95 shadow-xl shadow-pink-500/5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#f3c5d3]">
              <div>
                <Badge variant="pink" className="mb-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#e91e63]" /> Problem Discovery Report Validated
                </Badge>
                <h2 className="text-xl sm:text-3xl font-extrabold text-[#3a2630] tracking-tight">
                  {report.identifiedProblem}
                </h2>
                <p className="text-xs text-[#6b5560] mt-1">Domain: {selectedDomain}</p>
              </div>

              <button
                onClick={() => navigate(`/generate?problemId=${generatedProblem?._id}`)}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#e91e63] via-[#ec407a] to-[#f43f5e] hover:from-[#d81b60] hover:to-[#e91e63] text-white font-semibold text-xs sm:text-sm shadow-xl shadow-pink-500/20 hover:scale-105 transition-all flex items-center gap-2"
              >
                <Lightbulb className="w-4 h-4" />
                Generate Project Ideas From This Problem →
              </button>
            </div>

            {/* Structured Report Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#e91e63] mb-1">
                    Problem Description & Context
                  </h4>
                  <p className="text-xs sm:text-sm text-[#3a2630] leading-relaxed bg-[#fff8fa] p-4 rounded-xl border border-[#f3c5d3]">
                    {report.problemDescription}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#ec407a] mb-1">
                    Who Experiences The Problem?
                  </h4>
                  <p className="text-xs sm:text-sm text-[#3a2630] bg-[#fff8fa] p-4 rounded-xl border border-[#f3c5d3]">
                    {report.targetAudience}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#d81b60] mb-1">
                    Why Does It Matter (Impact)?
                  </h4>
                  <p className="text-xs sm:text-sm text-[#3a2630] bg-[#fff8fa] p-4 rounded-xl border border-[#f3c5d3]">
                    {report.whyItMatters}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#e91e63] mb-1">
                    Current Workarounds & Solutions
                  </h4>
                  <p className="text-xs sm:text-sm text-[#3a2630] bg-[#fff8fa] p-4 rounded-xl border border-[#f3c5d3]">
                    {report.currentSolutions}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#ec407a] mb-1">
                    Limitations of Current Approaches
                  </h4>
                  <p className="text-xs sm:text-sm text-[#3a2630] bg-[#fff8fa] p-4 rounded-xl border border-[#f3c5d3]">
                    {report.limitationsOfCurrent}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#d81b60] mb-1">
                    Systemic Innovation Opportunity
                  </h4>
                  <p className="text-xs sm:text-sm text-[#3a2630] bg-[#fff8fa] p-4 rounded-xl border border-[#f3c5d3]">
                    {report.potentialOpportunity}
                  </p>
                </div>
              </div>
            </div>

            {/* Possible Tech Directions */}
            {report.possibleTechDirections && report.possibleTechDirections.length > 0 && (
              <div className="mt-6 pt-6 border-t border-[#f3c5d3]">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#e91e63] mb-3">
                  Possible Technology Directions:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {report.possibleTechDirections.map((dir, i) => (
                    <div key={i} className="p-3.5 rounded-xl bg-[#fff8fa] text-xs text-[#3a2630] border border-[#f3c5d3]">
                      <span className="font-semibold text-[#e91e63] block mb-1">Direction {i + 1}</span>
                      {dir}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </GlassCard>
        </div>
      )}
    </div>
  );
};

export default ProblemDiscovery;
