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
    <div className="relative overflow-hidden bg-gradient-to-b from-[#f8faff] via-[#f1f5fd] to-[#fcfaff] text-slate-800 min-h-screen pt-6 pb-20">
      {/* Ambient background glows matching bright pastel palette */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[radial-gradient(circle_at_50%_50%,rgba(165,180,252,0.35),transparent_70%)] -z-10 blur-3xl opacity-80 pointer-events-none"></div>
      <div className="absolute top-1/3 left-1/4 w-[450px] h-[350px] bg-[radial-gradient(circle_at_50%_50%,rgba(186,230,253,0.4),transparent_70%)] -z-10 blur-3xl opacity-70 pointer-events-none"></div>
      <div className="absolute top-1/2 right-1/4 w-[400px] h-[300px] bg-[radial-gradient(circle_at_50%_50%,rgba(244,208,249,0.35),transparent_70%)] -z-10 blur-3xl opacity-70 pointer-events-none"></div>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 text-center pt-12 pb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50/90 border border-indigo-200/80 text-indigo-700 text-xs font-semibold mb-6 shadow-sm shadow-indigo-100/50">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          The AI Capstone & Research Discovery Engine
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight mb-6 font-heading">
          Improve Your Thinking.{' '}
          <span className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">
            Build Real-World Innovation.
          </span>
        </h1>

        <p className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-slate-600 mb-10 leading-relaxed font-normal">
          Say goodbye to generic chatbots and trivial CRUD dashboards. InnoPilot guides engineering students through a rigorous 8-stage pipeline from authentic problem discovery to a publication-ready capstone project proposal.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/register"
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white font-semibold text-base shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/35 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 group"
          >
            Start Discovering Problems
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            to="/login"
            className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-white/85 hover:bg-white text-slate-700 hover:text-slate-900 font-semibold text-base border border-slate-200/90 shadow-sm hover:shadow transition-all flex items-center justify-center gap-2"
          >
            Student Sign In
          </Link>
        </div>

        {/* Student Quote Box */}
        <div className="mt-14 max-w-2xl mx-auto bg-white/75 backdrop-blur-xl p-5 rounded-2xl border border-indigo-100/90 shadow-md shadow-indigo-100/30 text-left flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center flex-shrink-0 text-indigo-600 font-serif text-2xl shadow-xs">
            “
          </div>
          <div>
            <p className="text-slate-700 text-sm italic">
              "I want to build a major project, but I don't know what problem to solve."
            </p>
            <p className="text-xs text-indigo-700 mt-2 font-semibold">
              → InnoPilot transforms this uncertainty into a structured, validated, research-grade project.
            </p>
          </div>
        </div>
      </section>

      {/* Core Innovation Pipeline Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 mb-3 font-heading">
            The Complete 8-Stage Innovation Lifecycle
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto font-normal">
            Not a simple chatbot. Every step connects to the same project lifecycle and stores full version history in MongoDB.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {workflowSteps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="flex flex-col justify-between rounded-2xl bg-white/80 backdrop-blur-xl p-5 sm:p-6 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-indigo-300/70 hover:-translate-y-1 transition-all duration-200"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200/70">
                      STEP {s.step}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-xs">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2 font-heading">{s.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">{s.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Trust & Architecture Highlights */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="rounded-3xl p-8 sm:p-12 border border-indigo-100/90 bg-white/85 backdrop-blur-xl shadow-lg shadow-indigo-100/40">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200/60 flex items-center justify-center mb-4 mx-auto md:mx-0 shadow-xs">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-1 font-heading">Academic Integrity</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Zero hallucinated citations. Evidence-based similarity analysis with realistic literature baseline benchmarks.
              </p>
            </div>

            <div>
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-200/60 flex items-center justify-center mb-4 mx-auto md:mx-0 shadow-xs">
                <Zap className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-1 font-heading">Interactive Evolution</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Evolve ideas from v1 to v4 with one-click actions: Add AI, Make Research-Oriented, or Reduce Complexity.
              </p>
            </div>

            <div>
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 border border-purple-200/60 flex items-center justify-center mb-4 mx-auto md:mx-0 shadow-xs">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-1 font-heading">Exportable Proposals</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Download formal 15-section Capstone proposals with full system architecture and 10-phase roadmaps.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
