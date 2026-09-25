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
  { step: '01', title: 'Problem Discovery', desc: 'Contextual AI mentor questions pinpoint real-world friction and underserved domains.', icon: Compass, variant: 'peach', badgeClass: 'bg-[#FFF7ED] text-[#EA580C] border-[#FED7AA]', iconClass: 'bg-[#FFF7ED] text-[#EA580C] border-[#FED7AA]' },
  { step: '02', title: 'Deep Analysis', desc: 'Uncover root causes, stakeholder impact, data requirements, and complexity.', icon: SearchIcon, variant: 'sky', badgeClass: 'bg-[#F0F9FF] text-[#0284C7] border-[#BAE6FD]', iconClass: 'bg-[#F0F9FF] text-[#0284C7] border-[#BAE6FD]' },
  { step: '03', title: 'Idea Generation', desc: 'Produce non-trivial, AI-powered solution architectures avoiding generic templates.', icon: Lightbulb, variant: 'gold', badgeClass: 'bg-[#FFFBEB] text-[#D97706] border-[#FDE68A]', iconClass: 'bg-[#FFFBEB] text-[#D97706] border-[#FDE68A]' },
  { step: '04', title: 'Idea Evolution', desc: 'Iterate versions: Add AI, Reduce Complexity, Make Research-Oriented, or Scale.', icon: GitBranch, variant: 'pink', badgeClass: 'bg-[#FFF1F6] text-[#E91E63] border-[#FBCFE8]', iconClass: 'bg-[#FFF1F6] text-[#E91E63] border-[#FBCFE8]' },
  { step: '05', title: 'Evidence Similarity', desc: 'Benchmark against academic corpora without fake 100% uniqueness claims.', icon: ShieldCheck, variant: 'sky', badgeClass: 'bg-[#F0F9FF] text-[#0369A1] border-[#BAE6FD]', iconClass: 'bg-[#F0F9FF] text-[#0369A1] border-[#BAE6FD]' },
  { step: '06', title: '360° Feasibility', desc: 'Assess technical, hardware, cost, timeline, and risk metrics realistically.', icon: CheckCircle, variant: 'mint', badgeClass: 'bg-[#F0FDF4] text-[#15803D] border-[#BBF7D0]', iconClass: 'bg-[#F0FDF4] text-[#15803D] border-[#BBF7D0]' },
  { step: '07', title: 'Research Gap Finder', desc: 'Formulate authentic research questions and empirical novelty opportunities.', icon: BookOpen, variant: 'gold', badgeClass: 'bg-[#FFFBEB] text-[#B45309] border-[#FDE68A]', iconClass: 'bg-[#FFFBEB] text-[#B45309] border-[#FDE68A]' },
  { step: '08', title: 'Architecture & Roadmap', desc: 'Generate multi-tier system diagrams and an interactive 10-phase milestone plan.', icon: Cpu, variant: 'mint', badgeClass: 'bg-[#F0FDF4] text-[#15803D] border-[#BBF7D0]', iconClass: 'bg-[#F0FDF4] text-[#15803D] border-[#BBF7D0]' },
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
    <div className="relative overflow-hidden min-h-screen pt-4 sm:pt-6 pb-20 text-[#2D2530]">
      
      {/* 1. Live Animated Background with Multi-Color Pastel Waves, Cubes, Spheres & Particles */}
      <HeroCanvasBackground mousePos={mousePos} />

      {/* 2. Split Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-14 pb-16 sm:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Heading, Copy, Actions & Quote */}
          <div className="lg:col-span-6 text-center lg:text-left z-20">
            
            {/* Small AI Capstone Label in Multi-Color Pastel */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF1F6] border border-[#FBCFE8] text-[#E91E63] text-xs font-semibold mb-6 shadow-xs backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-[#FB923C]" />
              The AI Capstone & Research Discovery Engine
            </div>

            {/* Main Heading with Multi-Color Warm Gradient Highlight */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-[#2D2530] leading-[1.12] mb-6 font-heading">
              Improve Your Thinking.{' '}
              <span className="block mt-1 bg-gradient-to-r from-[#E91E63] via-[#FB923C] to-[#F59E0B] bg-clip-text text-transparent">
                Build Real-World Innovation.
              </span>
            </h1>

            {/* Softer Slate-Muted Description */}
            <p className="max-w-2xl mx-auto lg:mx-0 text-base sm:text-lg text-[#5E5364] mb-8 leading-relaxed font-normal">
              Say goodbye to generic chatbots and trivial CRUD dashboards. InnoPilot guides engineering students through a rigorous 8-stage pipeline from authentic problem discovery to a publication-ready capstone project proposal.
            </p>

            {/* CTA Buttons in Pastel Multi-Color Gradients */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10">
              <Link
                to="/register"
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#E91E63] via-[#FB923C] to-[#F59E0B] text-white font-semibold text-base shadow-lg shadow-pink-500/20 hover:shadow-orange-500/30 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 group"
              >
                Start Discovering Problems
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/login"
                className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-white/95 hover:bg-white text-[#2D2530] hover:text-[#E91E63] font-semibold text-base border border-[#F1E4EC] shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 backdrop-blur-md"
              >
                Student Sign In
              </Link>
            </div>

            {/* Student Quote Box */}
            <div className="max-w-xl mx-auto lg:mx-0 pastel-glass-peach p-5 rounded-2xl border border-[#FED7AA] text-left flex items-start gap-4 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-[#FFF7ED] border border-[#FED7AA] flex items-center justify-center flex-shrink-0 text-[#EA580C] font-serif text-2xl shadow-xs">
                “
              </div>
              <div>
                <p className="text-[#2D2530] text-sm italic font-medium">
                  "I want to build a major project, but I don't know what problem to solve."
                </p>
                <p className="text-xs text-[#EA580C] mt-2 font-semibold">
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

      {/* 3. Core Innovation Pipeline Section with Multi-Color Pastel Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F0F9FF] text-[#0284C7] border border-[#BAE6FD] text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Methodology</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-[#2D2530] mb-3 font-heading">
            The Complete 8-Stage Innovation Lifecycle
          </h2>
          <p className="text-[#5E5364] text-sm sm:text-base max-w-2xl mx-auto font-normal">
            Not a simple chatbot. Every step connects to the same project lifecycle and stores full version history in MongoDB.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {workflowSteps.map((s, idx) => {
            const Icon = s.icon;
            const glassClass = `pastel-glass-${s.variant}`;
            return (
              <div
                key={idx}
                className={`${glassClass} flex flex-col justify-between rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-md cursor-pointer`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-full border ${s.badgeClass}`}>
                      STEP {s.step}
                    </span>
                    <div className={`w-9 h-9 rounded-xl border flex items-center justify-center shadow-xs ${s.iconClass}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-[#2D2530] mb-2 font-heading">{s.title}</h3>
                  <p className="text-xs text-[#5E5364] leading-relaxed font-normal">{s.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Trust & Architecture Highlights with Distinct Pastel Identity */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Academic Integrity - Light Sky Blue */}
          <div className="pastel-glass-sky rounded-3xl p-7 border border-[#BAE6FD] shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-[#F0F9FF] text-[#0284C7] border border-[#BAE6FD] flex items-center justify-center mb-4 shadow-xs">
              <Award className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-[#2D2530] mb-1 font-heading">Academic Integrity</h4>
            <p className="text-xs text-[#5E5364] leading-relaxed font-normal">
              Zero hallucinated citations. Evidence-based similarity analysis with realistic literature baseline benchmarks.
            </p>
          </div>

          {/* Card 2: Interactive Evolution - Soft Gold */}
          <div className="pastel-glass-gold rounded-3xl p-7 border border-[#FDE68A] shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-[#FFFBEB] text-[#D97706] border border-[#FDE68A] flex items-center justify-center mb-4 shadow-xs">
              <Zap className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-[#2D2530] mb-1 font-heading">Interactive Evolution</h4>
            <p className="text-xs text-[#5E5364] leading-relaxed font-normal">
              Evolve ideas from v1 to v4 with one-click actions: Add AI, Make Research-Oriented, or Reduce Complexity.
            </p>
          </div>

          {/* Card 3: Exportable Proposals - Mint Green */}
          <div className="pastel-glass-mint rounded-3xl p-7 border border-[#BBF7D0] shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-[#F0FDF4] text-[#15803D] border border-[#BBF7D0] flex items-center justify-center mb-4 shadow-xs">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-[#2D2530] mb-1 font-heading">Exportable Proposals</h4>
            <p className="text-xs text-[#5E5364] leading-relaxed font-normal">
              Download formal 15-section Capstone proposals with full system architecture and 10-phase roadmaps.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default LandingPage;
