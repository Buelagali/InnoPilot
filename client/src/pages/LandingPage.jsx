import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Search,
  BookOpen,
  BarChart3,
  Lightbulb,
  FileCheck2,
  Bot,
  ArrowRight,
  Play,
  Award,
  Zap,
  ShieldCheck,
  Cpu,
  Layers,
  GitBranch,
  CheckCircle,
  FolderKanban
} from 'lucide-react';
import HeroCanvasBackground from '../components/home/HeroCanvasBackground';
import HeroAIInnovationVisual from '../components/home/HeroAIInnovationVisual';

// 6 Floating Flow Cards directly matching the reference bottom strip
const heroFlowCards = [
  {
    step: '01',
    title: 'Discover Problems',
    desc: 'Find relevant and meaningful project ideas from real-world challenges.',
    icon: Search,
    path: '/discover',
    variant: 'violet',
    iconBg: 'bg-aiViolet-100 text-aiViolet-600',
    hoverBorder: 'hover:border-aiViolet-300',
  },
  {
    step: '02',
    title: 'Explore Research',
    desc: 'Browse existing papers, research gaps and student work.',
    icon: BookOpen,
    path: '/research-gap',
    variant: 'sky',
    iconBg: 'bg-aiSky-100 text-aiSky-600',
    hoverBorder: 'hover:border-aiSky-300',
  },
  {
    step: '03',
    title: 'Analyze & Evaluate',
    desc: 'Get AI-powered insights on feasibility, novelty and similarity.',
    icon: BarChart3,
    path: '/analyzer',
    variant: 'mint',
    iconBg: 'bg-aiMint-100 text-emerald-600',
    hoverBorder: 'hover:border-aiMint-300',
  },
  {
    step: '04',
    title: 'Generate Ideas',
    desc: 'Use AI to get creative, practical and innovative project suggestions.',
    icon: Lightbulb,
    path: '/generate',
    variant: 'gold',
    iconBg: 'bg-aiGold-100 text-amber-600',
    hoverBorder: 'hover:border-aiGold-300',
  },
  {
    step: '05',
    title: 'Build Your Capstone',
    desc: 'Plan your proposal, methodology and implementation.',
    icon: FileCheck2,
    path: '/proposal',
    variant: 'cyan',
    iconBg: 'bg-aiCyan-100 text-aiCyan-700',
    hoverBorder: 'hover:border-aiCyan-300',
  },
  {
    step: '06',
    title: 'AI Companion',
    desc: 'Your 24/7 guide for better decisions, stronger projects.',
    icon: Bot,
    path: '/assistant',
    variant: 'pink',
    iconBg: 'bg-aiPink-100 text-aiPink-600',
    hoverBorder: 'hover:border-aiPink-300',
  },
];

const workflowSteps = [
  { step: '01', title: 'Problem Discovery', desc: 'Contextual AI mentor questions pinpoint real-world friction and underserved domains.', icon: Search, variant: 'peach' },
  { step: '02', title: 'Deep Analysis', desc: 'Uncover root causes, stakeholder impact, data requirements, and complexity.', icon: BarChart3, variant: 'sky' },
  { step: '03', title: 'Idea Generation', desc: 'Produce non-trivial, AI-powered solution architectures avoiding generic templates.', icon: Lightbulb, variant: 'gold' },
  { step: '04', title: 'Idea Evolution', desc: 'Iterate versions: Add AI, Reduce Complexity, Make Research-Oriented, or Scale.', icon: GitBranch, variant: 'pink' },
  { step: '05', title: 'Evidence Similarity', desc: 'Benchmark against academic corpora without fake 100% uniqueness claims.', icon: ShieldCheck, variant: 'cyan' },
  { step: '06', title: '360° Feasibility', desc: 'Assess technical, hardware, cost, timeline, and risk metrics realistically.', icon: CheckCircle, variant: 'mint' },
  { step: '07', title: 'Research Gap Finder', desc: 'Formulate authentic research questions and empirical novelty opportunities.', icon: BookOpen, variant: 'gold' },
  { step: '08', title: 'Architecture & Roadmap', desc: 'Generate multi-tier system diagrams and an interactive 10-phase milestone plan.', icon: Cpu, variant: 'violet' },
];

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
    <div className="relative overflow-hidden min-h-screen pt-2 sm:pt-4 pb-20 text-textDark">
      
      {/* 1. Live Animated Futuristic Skyscape Background */}
      <HeroCanvasBackground mousePos={mousePos} />

      {/* 2. Split Hero Section (Inspired directly by the Reference Image) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-12 pb-10 sm:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          
          {/* Left Column: Heading, Copy, Pill Badge & CTA Buttons */}
          <div className="lg:col-span-6 text-center lg:text-left z-20">
            
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-aiViolet-50 to-aiPink-50 border border-aiViolet-200/80 text-aiViolet-700 text-xs font-bold mb-6 shadow-xs backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-aiPink-500" />
              <span>The AI Capstone & Research Discovery Engine</span>
            </div>

            {/* Big Hero Heading matching Reference Image typography */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-textDark leading-[1.12] mb-5 font-heading">
              Improve Your Thinking.{' '}
              <span className="block mt-1 hero-gradient-text">
                Build Real-World Innovation.
              </span>
            </h1>

            {/* Slate Description */}
            <p className="max-w-xl mx-auto lg:mx-0 text-sm sm:text-base text-textBody mb-8 leading-relaxed font-normal">
              Say goodbye to generic chatbots and trivial CRUD dashboards. InnoPilot guides engineering students through a rigorous 8-stage pipeline from authentic problem discovery to a publication-ready capstone project proposal.
            </p>

            {/* Pill CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 mb-8">
              {/* Primary Action Button: Cyan to Violet Gradient Pill */}
              <Link
                to="/register"
                className="w-full sm:w-auto px-7 py-3 rounded-full bg-gradient-to-r from-aiCyan-500 via-aiViolet-600 to-aiPink-500 text-white font-bold text-sm shadow-lg shadow-aiViolet-500/25 hover:shadow-aiViolet-500/40 hover:scale-105 transition-all flex items-center justify-center gap-2 group"
              >
                <span>Start Discovering</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              {/* Secondary Action Button: Frosted Glass Pill */}
              <Link
                to="/discover"
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-white/85 hover:bg-white text-textDark hover:text-aiViolet-700 font-semibold text-sm border border-aiViolet-200 shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 backdrop-blur-md group"
              >
                <Play className="w-3.5 h-3.5 text-aiPink-500 fill-aiPink-500 group-hover:scale-110 transition-transform" />
                <span>Watch Demo</span>
              </Link>
            </div>
          </div>

          {/* Right Column: 3D Futuristic AI Mascot Robot & Holographic Platform */}
          <div className="lg:col-span-6 flex items-center justify-center z-20">
            <HeroAIInnovationVisual mousePos={mousePos} />
          </div>

        </div>
      </section>

      {/* 3. Bottom 6-Card Horizontal Feature Strip (Directly Replicating Reference Image Bottom Row) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
          {heroFlowCards.map((card, idx) => {
            const Icon = card.icon;
            const glassClass = `pastel-glass-${card.variant}`;
            return (
              <Link
                key={idx}
                to={card.path}
                className={`${glassClass} rounded-2xl p-4 flex flex-col justify-between backdrop-blur-xl border border-white/90 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-mono font-bold text-textMuted group-hover:text-textDark transition-colors">
                      {card.step}
                    </span>
                    <div className={`w-8 h-8 rounded-xl ${card.iconBg} flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform`}>
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-textDark mb-1.5 leading-snug group-hover:text-aiViolet-700 transition-colors font-heading">
                    {card.title}
                  </h3>
                  <p className="text-[11px] text-textBody line-clamp-3 leading-relaxed">
                    {card.desc}
                  </p>
                </div>

                <div className="mt-4 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-aiViolet-600">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">Explore</span>
                  <div className="w-6 h-6 rounded-full bg-white/80 border border-slate-200 flex items-center justify-center group-hover:bg-aiViolet-600 group-hover:text-white transition-all shadow-2xs">
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 4. Complete 8-Stage Innovation Lifecycle Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-aiSky-50 text-aiSky-700 border border-aiSky-200 text-xs font-bold mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-aiSky-500" />
            <span>Structured Capstone Pipeline</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-textDark mb-3 font-heading tracking-tight">
            The Complete 8-Stage Innovation Lifecycle
          </h2>
          <p className="text-textBody text-xs sm:text-sm max-w-2xl mx-auto font-normal leading-relaxed">
            Not a disconnected chatbot. Every step connects to your project's active state and generates verified academic artifacts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {workflowSteps.map((s, idx) => {
            const Icon = s.icon;
            const glassClass = `pastel-glass-${s.variant}`;
            return (
              <div
                key={idx}
                className={`${glassClass} flex flex-col justify-between rounded-3xl p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg backdrop-blur-xl border border-white/90`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-extrabold px-2.5 py-0.5 rounded-full bg-white/80 border border-slate-200 text-textDark shadow-2xs">
                      PHASE {s.step}
                    </span>
                    <div className="w-9 h-9 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shadow-xs text-aiViolet-600">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-textDark mb-2 font-heading">{s.title}</h3>
                  <p className="text-xs text-textBody leading-relaxed font-normal">{s.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. Trust & Architecture Highlights */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Academic Integrity */}
          <div className="pastel-glass-sky rounded-3xl p-7 border border-white/90 shadow-md">
            <div className="w-11 h-11 rounded-2xl bg-aiSky-100 text-aiSky-600 flex items-center justify-center mb-4 shadow-xs">
              <Award className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-textDark mb-1 font-heading">Academic Integrity</h4>
            <p className="text-xs text-textBody leading-relaxed font-normal">
              Zero hallucinated citations. Evidence-based similarity analysis with realistic literature baseline benchmarks.
            </p>
          </div>

          {/* Card 2: Interactive Evolution */}
          <div className="pastel-glass-violet rounded-3xl p-7 border border-white/90 shadow-md">
            <div className="w-11 h-11 rounded-2xl bg-aiViolet-100 text-aiViolet-600 flex items-center justify-center mb-4 shadow-xs">
              <Zap className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-textDark mb-1 font-heading">Interactive Evolution</h4>
            <p className="text-xs text-textBody leading-relaxed font-normal">
              Evolve ideas from v1 to v4 with one-click actions: Add AI, Make Research-Oriented, or Reduce Complexity.
            </p>
          </div>

          {/* Card 3: Exportable Proposals */}
          <div className="pastel-glass-mint rounded-3xl p-7 border border-white/90 shadow-md">
            <div className="w-11 h-11 rounded-2xl bg-aiMint-100 text-emerald-600 flex items-center justify-center mb-4 shadow-xs">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-textDark mb-1 font-heading">Exportable Proposals</h4>
            <p className="text-xs text-textBody leading-relaxed font-normal">
              Download formal 15-section Capstone proposals with full system architecture and 10-phase roadmaps.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default LandingPage;
