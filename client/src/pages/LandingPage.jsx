import React, { useState, useEffect } from 'react';
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
  Award,
  Zap,
} from 'lucide-react';
import HeroCanvasBackground from '../components/home/HeroCanvasBackground';
import HeroAIInnovationVisual from '../components/home/HeroAIInnovationVisual';

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
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2;
      const y = (e.clientY / innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative overflow-hidden min-h-screen pt-4 sm:pt-6 pb-20 text-[#172033]">
      
      {/* 1. Live Animated Background with Pastel Waves, Cubes, Spheres & Particles */}
      <HeroCanvasBackground mousePos={mousePos} />

      {/* 2. Split Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-14 pb-16 sm:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Heading, Copy, Actions & Quote */}
          <div className="lg:col-span-6 text-center lg:text-left z-20">
            
            {/* Small AI Capstone Label */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ede9fe]/90 border border-[#ddd6fe] text-[#6d28d9] text-xs font-semibold mb-6 shadow-xs backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-[#7c3aed]" />
              The AI Capstone & Research Discovery Engine
            </div>

            {/* Main Heading & Gradient Highlight */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-[#172033] leading-[1.12] mb-6 font-heading">
              Improve Your Thinking.{' '}
              <span className="block mt-1 bg-gradient-to-r from-[#7C3AED] via-[#6366F1] to-[#38BDF8] bg-clip-text text-transparent">
                Build Real-World Innovation.
              </span>
            </h1>

            {/* Softer Slate Description */}
            <p className="max-w-2xl mx-auto lg:mx-0 text-base sm:text-lg text-[#475569] mb-8 leading-relaxed font-normal">
              Say goodbye to generic chatbots and trivial CRUD dashboards. InnoPilot guides engineering students through a rigorous 8-stage pipeline from authentic problem discovery to a publication-ready capstone project proposal.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10">
              <Link
                to="/register"
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#6366F1] via-[#7C3AED] to-[#4F46E5] text-white font-semibold text-base shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 group"
              >
                Start Discovering Problems
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/login"
                className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-white/85 hover:bg-white text-[#1e293b] hover:text-[#0f172a] font-semibold text-base border border-slate-200/90 shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 backdrop-blur-md"
              >
                Student Sign In
              </Link>
            </div>

            {/* Student Quote Box */}
            <div className="max-w-xl mx-auto lg:mx-0 pastel-glass-card p-5 rounded-2xl border border-indigo-100/90 text-left flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center flex-shrink-0 text-indigo-600 font-serif text-2xl shadow-xs">
                “
              </div>
              <div>
                <p className="text-[#334155] text-sm italic font-medium">
                  "I want to build a major project, but I don't know what problem to solve."
                </p>
                <p className="text-xs text-[#6366f1] mt-2 font-semibold">
                  → InnoPilot transforms this uncertainty into a structured, validated, research-grade project.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Animated Central AI Innovation 3D Visual */}
          <div className="lg:col-span-6 flex items-center justify-center z-20">
            <HeroAIInnovationVisual mousePos={mousePos} />
          </div>

        </div>
      </section>

      {/* 3. Core Innovation Pipeline Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-4xl font-bold text-[#172033] mb-3 font-heading">
            The Complete 8-Stage Innovation Lifecycle
          </h2>
          <p className="text-[#475569] text-sm sm:text-base max-w-2xl mx-auto font-normal">
            Not a simple chatbot. Every step connects to the same project lifecycle and stores full version history in MongoDB.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {workflowSteps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="pastel-glass-card pastel-glass-card-hover flex flex-col justify-between rounded-2xl p-5 sm:p-6 border border-slate-200/80"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-[#6366f1] bg-[#eef2ff] px-2.5 py-0.5 rounded-full border border-indigo-200/80">
                      STEP {s.step}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-[#6366f1] shadow-xs">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-[#172033] mb-2 font-heading">{s.title}</h3>
                  <p className="text-xs text-[#475569] leading-relaxed font-normal">{s.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Trust & Architecture Highlights */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="rounded-3xl p-8 sm:p-12 border border-indigo-100/90 pastel-glass-card shadow-lg shadow-indigo-100/40">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200/60 flex items-center justify-center mb-4 mx-auto md:mx-0 shadow-xs">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-[#172033] mb-1 font-heading">Academic Integrity</h4>
              <p className="text-xs text-[#475569] leading-relaxed font-normal">
                Zero hallucinated citations. Evidence-based similarity analysis with realistic literature baseline benchmarks.
              </p>
            </div>

            <div>
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-200/60 flex items-center justify-center mb-4 mx-auto md:mx-0 shadow-xs">
                <Zap className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-[#172033] mb-1 font-heading">Interactive Evolution</h4>
              <p className="text-xs text-[#475569] leading-relaxed font-normal">
                Evolve ideas from v1 to v4 with one-click actions: Add AI, Make Research-Oriented, or Reduce Complexity.
              </p>
            </div>

            <div>
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 border border-purple-200/60 flex items-center justify-center mb-4 mx-auto md:mx-0 shadow-xs">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-[#172033] mb-1 font-heading">Exportable Proposals</h4>
              <p className="text-xs text-[#475569] leading-relaxed font-normal">
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
