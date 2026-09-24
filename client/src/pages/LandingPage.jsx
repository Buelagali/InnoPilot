import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Compass,
  Lightbulb,
  GitBranch,
  ShieldCheck,
  CheckCircle,
  Cpu,
  BookOpen,
  ArrowRight,
  ChevronRight,
  Award,
  Zap,
} from 'lucide-react';
import { GlassCard } from '../components/common/GlassCard';

const workflowSteps = [
  { step: '01', title: 'Problem Discovery', desc: 'Contextual AI mentor questions pinpoint real-world friction and underserved domains.', icon: Compass },
  { step: '02', title: 'Deep Analysis', desc: 'Uncover root causes, stakeholder impact, data requirements, and complexity.', icon: SearchIcon },
  { step: '03', title: 'Idea Generation', desc: 'Produce non-trivial, AI-powered solution architectures avoiding generic templates.', icon: Lightbulb },
  { step: '04', title: 'Idea Evolution', desc: 'Iterate versions: Add AI, Reduce Complexity, Make Research-Oriented, or Scale.', icon: GitBranch },
  { step: '05', title: 'Evidence Similarity', desc: 'Benchmark against academic corpora without fake 100% uniqueness claims.', icon: ShieldCheck },
  { step: '06', title: '360° Feasibility', desc: 'Assess technical, hardware, cost, timeline, and risk metrics realistically.', icon: CheckCircle },
  { step: '07', title: 'Research Gap Finder', desc: 'Formulate authentic research questions and empirical novelty opportunities.', icon: BookOpen },
  { step: '08', title: 'Architecture & Roadmap', desc: 'Generate multi-tier system diagrams and an interactive 10-phase milestone plan.', icon: Cpu },
];

function SearchIcon(props) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
}

const LandingPage = () => {
  return (
    <div className="relative overflow-hidden pt-6 pb-20">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] ambient-glow-purple -z-10 blur-3xl opacity-70 pointer-events-none"></div>
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[300px] ambient-glow-cyan -z-10 blur-3xl opacity-40 pointer-events-none"></div>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 text-center pt-12 pb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-6 animate-pulse-slow">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          The AI Capstone & Research Discovery Engine
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-white leading-tight mb-6 font-heading">
          Improve Your Thinking.{' '}
          <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
            Build Real-World Innovation.
          </span>
        </h1>

        <p className="max-w-3xl mx-auto text-base sm:text-xl text-slate-300 mb-10 leading-relaxed font-light">
          Say goodbye to generic chatbots and trivial CRUD dashboards. InnoPilot guides engineering students through a rigorous 8-stage pipeline from authentic problem discovery to a publication-ready capstone project proposal.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/register"
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 text-white font-semibold text-base shadow-xl shadow-indigo-600/30 hover:scale-105 transition-all flex items-center justify-center gap-2 group"
          >
            Start Discovering Problems
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            to="/login"
            className="w-full sm:w-auto px-7 py-3.5 rounded-2xl glass-panel text-slate-200 hover:text-white hover:bg-slate-800/80 font-medium text-base border border-white/10 transition-all flex items-center justify-center gap-2"
          >
            Student Sign In
          </Link>
        </div>

        {/* Student Quote Box */}
        <div className="mt-14 max-w-2xl mx-auto glass-panel p-5 rounded-2xl border border-indigo-500/20 text-left flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center flex-shrink-0 text-indigo-300 font-serif text-2xl">
            “
          </div>
          <div>
            <p className="text-slate-300 text-sm italic">
              "I want to build a major project, but I don't know what problem to solve."
            </p>
            <p className="text-xs text-indigo-300 mt-2 font-medium">
              → InnoPilot transforms this uncertainty into a structured, validated, research-grade project.
            </p>
          </div>
        </div>
      </section>

      {/* Core Innovation Pipeline Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-4xl font-bold text-white mb-3">
            The Complete 8-Stage Innovation Lifecycle
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
            Not a simple chatbot. Every step connects to the same project lifecycle and stores full version history in MongoDB.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {workflowSteps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <GlassCard key={idx} interactive className="flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-indigo-400 bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-500/20">
                      STEP {s.step}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-300">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{s.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{s.desc}</p>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </section>

      {/* Trust & Architecture Highlights */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <GlassCard className="p-8 sm:p-12 border-indigo-500/30 bg-gradient-to-b from-slate-900/80 to-slate-950/90">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4 mx-auto md:mx-0">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white mb-1">Academic Integrity</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Zero hallucinated citations. Evidence-based similarity analysis with realistic literature baseline benchmarks.
              </p>
            </div>

            <div>
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-4 mx-auto md:mx-0">
                <Zap className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white mb-1">Interactive Evolution</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Evolve ideas from v1 to v4 with one-click actions: Add AI, Make Research-Oriented, or Reduce Complexity.
              </p>
            </div>

            <div>
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-4 mx-auto md:mx-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white mb-1">Exportable Proposals</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Download formal 15-section Capstone proposals with full system architecture and 10-phase roadmaps.
              </p>
            </div>
          </div>
        </GlassCard>
      </section>
    </div>
  );
};

export default LandingPage;
