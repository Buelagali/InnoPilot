import React, { useState } from 'react';
import {
  FileText,
  Lightbulb,
  FolderKanban,
  SearchCheck,
  BarChart3,
  GraduationCap,
  Laptop,
  Sparkles,
  BookOpen,
  Layers,
  Cpu
} from 'lucide-react';

/**
 * HeroAIInnovationVisual
 * Directly inspired by the reference illustration:
 * - Friendly futuristic AI Mascot Robot with smiling visor display and glowing chest core
 * - Multi-tiered glowing holographic circular pedestal with ring lights
 * - 5 Floating 3D Holographic Research Cards (Research Papers, Project Ideas, Project Library, Similarity Check, Research Analytics)
 * - 3D Graduation Cap, Floating Books, Laptop, and glowing orbital rings
 */
const HeroAIInnovationVisual = ({ mousePos = { x: 0, y: 0 } }) => {
  const [activeCard, setActiveCard] = useState(null);

  // Parallax offsets
  const pX = mousePos.x * 20;
  const pY = mousePos.y * 20;

  return (
    <div className="relative w-full max-w-[650px] lg:max-w-[700px] h-[540px] sm:h-[600px] md:h-[640px] mx-auto flex items-center justify-center select-none">
      
      {/* 1. Ambient Holographic Sky Lighting */}
      <div className="absolute w-[440px] h-[440px] rounded-full bg-gradient-to-tr from-aiCyan-300/25 via-aiViolet-300/25 to-aiPink-200/30 blur-3xl -z-10 animate-pulse-slow pointer-events-none"></div>
      <div className="absolute w-[280px] h-[280px] rounded-full bg-aiSky-400/20 blur-2xl -z-10 pointer-events-none"></div>

      {/* 2. Multi-tier Orbital Rings */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none transition-transform duration-700 ease-out"
        style={{
          transform: `translate3d(${pX * 0.3}px, ${pY * 0.3}px, 0)`,
        }}
      >
        {/* Outer Elliptical Orbital Path */}
        <div
          className="w-[520px] sm:w-[580px] md:w-[640px] h-[240px] sm:h-[280px] md:h-[310px] rounded-[100%] border border-aiCyan-300/50 border-dashed animate-orbit-spin-slow relative"
          style={{
            transform: 'rotate(-16deg) rotateX(60deg)',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Planetary Bead: Cyan */}
          <div className="absolute -top-2 left-1/4 w-4 h-4 rounded-full bg-gradient-to-tr from-aiCyan-400 to-aiSky-200 shadow-md shadow-aiCyan-400/50 border border-white"></div>
          {/* Planetary Bead: Violet */}
          <div className="absolute -bottom-2 right-1/4 w-4 h-4 rounded-full bg-gradient-to-tr from-aiViolet-500 to-aiLavender-200 shadow-md shadow-aiViolet-400/50 border border-white"></div>
          {/* Planetary Bead: Gold */}
          <div className="absolute top-1/2 -right-2 w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-aiGold-400 to-amber-200 shadow-md border border-white"></div>
        </div>

        {/* Inner Counter-Rotating Ring */}
        <div
          className="absolute w-[380px] sm:w-[440px] md:w-[480px] h-[180px] sm:h-[210px] md:h-[230px] rounded-[100%] border border-aiViolet-300/50 animate-orbit-spin-reverse"
          style={{
            transform: 'rotate(20deg) rotateX(58deg)',
            transformStyle: 'preserve-3d',
          }}
        >
          <div className="absolute -top-1.5 right-1/3 w-3 h-3 rounded-full bg-gradient-to-tr from-aiPink-400 to-aiPeach-200 shadow-sm border border-white"></div>
        </div>
      </div>

      {/* 3. Central AI Mascot Robot & Holographic Platform Assembly */}
      <div
        className="relative z-20 flex flex-col items-center justify-center transition-transform duration-500 ease-out"
        style={{
          transform: `translate3d(${pX * 0.5}px, ${pY * 0.5}px, 0)`,
        }}
      >
        {/* Holographic AI Mascot Robot */}
        <div className="relative z-30 animate-robot-hover flex flex-col items-center">
          {/* Robot Head with Visor & Digital Face */}
          <div className="relative w-28 sm:w-32 h-24 sm:h-28 rounded-3xl bg-white/95 backdrop-blur-md border-2 border-white shadow-2xl shadow-aiViolet-500/20 p-2 flex flex-col items-center justify-center">
            {/* Robot Head Ears/Headset Antenna */}
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-3 h-8 rounded-full bg-gradient-to-b from-aiCyan-400 to-aiViolet-500 border border-white shadow-sm"></div>
            <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-3 h-8 rounded-full bg-gradient-to-b from-aiCyan-400 to-aiViolet-500 border border-white shadow-sm"></div>

            {/* Glowing Digital Cyan Visor Screen */}
            <div className="w-full h-full rounded-2xl bg-gradient-to-b from-[#0F172A] to-[#1E1B4B] p-2 flex items-center justify-center relative overflow-hidden border border-aiCyan-300/40 shadow-inner">
              {/* Animated Cyan Smiling Eyes */}
              <div className="flex items-center gap-4">
                {/* Left Eye Curve */}
                <div className="w-4 h-3.5 border-b-[3.5px] border-l-[2px] border-r-[2px] border-aiCyan-300 rounded-b-full shadow-lg shadow-aiCyan-400/80 animate-pulse"></div>
                {/* Right Eye Curve */}
                <div className="w-4 h-3.5 border-b-[3.5px] border-l-[2px] border-r-[2px] border-aiCyan-300 rounded-b-full shadow-lg shadow-aiCyan-400/80 animate-pulse"></div>
              </div>
              {/* Visor Scanline shimmer */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-aiCyan-400/10 to-transparent opacity-50 pointer-events-none"></div>
            </div>
          </div>

          {/* Robot Neck & Torso */}
          <div className="relative -mt-1 w-20 sm:w-24 h-20 sm:h-24 rounded-3xl bg-gradient-to-b from-white via-slate-50 to-aiViolet-50 border-2 border-white shadow-xl flex flex-col items-center justify-center">
            {/* Floating Arms */}
            <div className="absolute -left-4 top-2 w-4 h-12 rounded-full bg-white border border-slate-200 shadow-md rotate-12"></div>
            <div className="absolute -right-4 top-2 w-4 h-12 rounded-full bg-white border border-slate-200 shadow-md -rotate-12"></div>

            {/* Glowing "AI" Chest Emblem */}
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-aiCyan-500 via-aiViolet-600 to-aiPink-500 flex items-center justify-center text-white font-extrabold text-[11px] shadow-md shadow-aiViolet-500/40 border-2 border-white">
              AI
            </div>
          </div>
        </div>

        {/* 4. Multi-Tier Holographic Circular Platform / Pedestal */}
        <div className="relative -mt-4 flex flex-col items-center">
          {/* Top Platform Disc */}
          <div className="w-56 sm:w-64 h-14 rounded-[100%] bg-gradient-to-r from-white via-aiCyan-100 to-aiViolet-100 border-2 border-white shadow-xl flex items-center justify-center relative">
            <div className="w-48 sm:w-56 h-10 rounded-[100%] border border-aiCyan-400/50 bg-gradient-to-r from-aiCyan-300/20 via-aiViolet-300/30 to-aiPink-300/20 animate-platform-glow"></div>
          </div>

          {/* Mid Layer Platform Ring */}
          <div className="w-64 sm:w-76 h-16 -mt-9 rounded-[100%] bg-gradient-to-r from-aiViolet-200 via-white to-aiCyan-200 border border-white/80 shadow-2xl opacity-95"></div>

          {/* Base Floating Island Pedestal Glow */}
          <div className="w-72 sm:w-88 h-20 -mt-10 rounded-[100%] bg-gradient-to-r from-aiCyan-400/30 via-aiViolet-500/30 to-aiPink-400/30 blur-md"></div>
        </div>
      </div>

      {/* 5. Floating Holographic Card 1 (Top Left): "Research Papers" */}
      <div
        className="absolute top-12 left-2 sm:left-6 z-30 animate-card-float-1 cursor-pointer transition-all duration-300 hover:scale-110"
        onMouseEnter={() => setActiveCard('papers')}
        onMouseLeave={() => setActiveCard(null)}
        style={{ transform: `translate3d(${pX * -0.6}px, ${pY * -0.6}px, 0)` }}
      >
        <div className="pastel-glass-sky rounded-2xl p-3.5 sm:p-4 flex items-center gap-3 backdrop-blur-xl border border-white/95 shadow-xl shadow-aiSky-400/15">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-aiSky-400 to-aiCyan-300 flex items-center justify-center text-white shadow-md shadow-aiSky-400/30">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold text-textDark block">Research Papers</span>
            <span className="text-[10px] text-aiSky-600 font-semibold">IEEE & ACM Indexed</span>
          </div>
        </div>
      </div>

      {/* 6. Floating Holographic Card 2 (Top Right): "Project Ideas" */}
      <div
        className="absolute top-10 right-2 sm:right-6 z-30 animate-card-float-2 cursor-pointer transition-all duration-300 hover:scale-110"
        onMouseEnter={() => setActiveCard('ideas')}
        onMouseLeave={() => setActiveCard(null)}
        style={{ transform: `translate3d(${pX * 0.7}px, ${pY * 0.7}px, 0)` }}
      >
        <div className="pastel-glass-gold rounded-2xl p-3.5 sm:p-4 flex items-center gap-3 backdrop-blur-xl border border-white/95 shadow-xl shadow-aiGold-400/15">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-aiGold-400 to-amber-300 flex items-center justify-center text-amber-950 shadow-md shadow-aiGold-400/30">
            <Lightbulb className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-xs font-bold text-textDark block">Project Ideas</span>
            <span className="text-[10px] text-amber-700 font-semibold">High Innovation Rank</span>
          </div>
        </div>
      </div>

      {/* 7. Floating Holographic Card 3 (Middle Left): "Project Library" */}
      <div
        className="absolute top-[52%] left-0 sm:left-4 z-30 animate-card-float-3 cursor-pointer transition-all duration-300 hover:scale-110"
        onMouseEnter={() => setActiveCard('library')}
        onMouseLeave={() => setActiveCard(null)}
        style={{ transform: `translate3d(${pX * -0.5}px, ${pY * -0.5}px, 0)` }}
      >
        <div className="pastel-glass-mint rounded-2xl p-3.5 sm:p-4 flex items-center gap-3 backdrop-blur-xl border border-white/95 shadow-xl shadow-aiMint-400/15">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-aiMint-400 to-emerald-400 flex items-center justify-center text-white shadow-md shadow-aiMint-400/30">
            <FolderKanban className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold text-textDark block">Project Library</span>
            <span className="text-[10px] text-emerald-700 font-semibold">Version Portfolios</span>
          </div>
        </div>
      </div>

      {/* 8. Floating Holographic Card 4 (Middle Right): "Similarity Check" */}
      <div
        className="absolute top-[38%] right-0 sm:right-4 z-30 animate-card-float-4 cursor-pointer transition-all duration-300 hover:scale-110"
        onMouseEnter={() => setActiveCard('similarity')}
        onMouseLeave={() => setActiveCard(null)}
        style={{ transform: `translate3d(${pX * 0.6}px, ${pY * 0.6}px, 0)` }}
      >
        <div className="pastel-glass-cyan rounded-2xl p-3.5 sm:p-4 flex items-center gap-3 backdrop-blur-xl border border-white/95 shadow-xl shadow-aiCyan-400/15">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-aiCyan-400 to-aiSky-400 flex items-center justify-center text-white shadow-md shadow-aiCyan-400/30">
            <SearchCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold text-textDark block">Similarity Check</span>
            <span className="text-[10px] text-aiCyan-700 font-semibold">0% Duplicate Guarantee</span>
          </div>
        </div>
      </div>

      {/* 9. Floating Holographic Card 5 (Bottom Right): "Research Analytics" */}
      <div
        className="absolute bottom-12 right-4 sm:right-10 z-30 animate-card-float-5 cursor-pointer transition-all duration-300 hover:scale-110"
        onMouseEnter={() => setActiveCard('analytics')}
        onMouseLeave={() => setActiveCard(null)}
        style={{ transform: `translate3d(${pX * 0.5}px, ${pY * 0.5}px, 0)` }}
      >
        <div className="pastel-glass-violet rounded-2xl p-3.5 sm:p-4 flex items-center gap-3 backdrop-blur-xl border border-white/95 shadow-xl shadow-aiViolet-400/15">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-aiViolet-500 to-aiLavender-400 flex items-center justify-center text-white shadow-md shadow-aiViolet-400/30">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold text-textDark block">Research Analytics</span>
            <span className="text-[10px] text-aiViolet-700 font-semibold">Feasibility & Radar</span>
          </div>
        </div>
      </div>

      {/* 10. Educational 3D Accents: Graduation Cap, Laptop, Books, Floating Crystals */}
      {/* 3D Graduation Cap with Golden Tassel (Top Center-Left) */}
      <div
        className="absolute top-8 left-[38%] z-30 animate-float-slow transition-transform"
        style={{ transform: `translate3d(${pX * -0.4}px, ${pY * -0.4}px, 0)` }}
      >
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#1E1B4B] to-[#312E81] border-2 border-white shadow-xl flex items-center justify-center text-aiGold-300 rotate-12">
          <GraduationCap className="w-7 h-7" />
        </div>
      </div>

      {/* 3D Laptop / Code Terminal (Bottom Left) */}
      <div
        className="absolute bottom-16 left-6 sm:left-12 z-30 animate-float-medium transition-transform"
        style={{ transform: `translate3d(${pX * -0.3}px, ${pY * -0.3}px, 0)` }}
      >
        <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-aiSky-400 via-aiViolet-500 to-aiPink-400 p-0.5 shadow-xl border border-white rotate-[-8deg]">
          <div className="w-full h-full rounded-[14px] bg-white flex items-center justify-center text-aiViolet-600">
            <Laptop className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Floating 3D Book Stack (Bottom Right) */}
      <div
        className="absolute bottom-6 right-[35%] z-20 animate-float-reverse transition-transform"
        style={{ transform: `translate3d(${pX * 0.4}px, ${pY * 0.4}px, 0)` }}
      >
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-aiMint-300 via-aiSky-200 to-white border border-white shadow-lg flex items-center justify-center text-emerald-700 rotate-6">
          <BookOpen className="w-5 h-5" />
        </div>
      </div>

      {/* Glowing Crystal Cubes */}
      <div className="absolute top-[22%] left-[28%] w-5 h-5 rounded-lg bg-gradient-to-tr from-aiCyan-400 to-white shadow-md animate-float-slow rotate-45 border border-white"></div>
      <div className="absolute bottom-[28%] right-[25%] w-4 h-4 rounded-md bg-gradient-to-tr from-aiViolet-400 to-white shadow-md animate-float-reverse rotate-12 border border-white"></div>
    </div>
  );
};

export default HeroAIInnovationVisual;
