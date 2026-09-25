import React, { useState } from 'react';
import {
  Search,
  BookOpen,
  Lightbulb,
  Share2,
  ShieldCheck,
  Code2,
  GraduationCap,
  Laptop,
} from 'lucide-react';

/**
 * HeroAIInnovationVisual
 * Multi-Color Pastel AI Innovation Visual:
 * Glowing crystal brain inside a lightbulb, multi-tier orbital rings with multi-color beads,
 * floating 3D pastel glass tiles (peach, sky blue, gold, mint, pink),
 * and educational 3D props with smooth 60fps animations.
 */
const HeroAIInnovationVisual = ({ mousePos = { x: 0, y: 0 } }) => {
  const [activeCard, setActiveCard] = useState(null);

  // Parallax offsets
  const pX = mousePos.x * 20;
  const pY = mousePos.y * 20;

  return (
    <div className="relative w-full max-w-[620px] lg:max-w-[680px] h-[520px] sm:h-[580px] md:h-[620px] mx-auto flex items-center justify-center select-none">
      
      {/* 1. Ambient Central AI Multi-Color Pastel Glows */}
      <div className="absolute w-[380px] h-[380px] rounded-full bg-gradient-to-tr from-sky-300/20 via-pink-300/20 to-amber-200/25 blur-3xl -z-10 animate-pulse-slow pointer-events-none"></div>
      <div className="absolute w-[220px] h-[220px] rounded-full bg-pink-400/15 blur-2xl -z-10 pointer-events-none"></div>

      {/* 2. 3D Multi-Color Orbital Rings System */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none transition-transform duration-700 ease-out"
        style={{
          transform: `translate3d(${pX * 0.3}px, ${pY * 0.3}px, 0)`,
        }}
      >
        {/* Outer Elliptical Orbital Path */}
        <div
          className="w-[460px] sm:w-[540px] md:w-[600px] h-[220px] sm:h-[260px] md:h-[290px] rounded-[100%] border border-sky-300/40 border-dashed animate-orbit-spin-slow relative"
          style={{
            transform: 'rotate(-18deg) rotateX(62deg)',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Orbiting Planetary Bead 1 - Sky Blue */}
          <div className="absolute -top-2 left-1/4 w-4 h-4 rounded-full bg-gradient-to-tr from-[#0EA5E9] to-[#BAE6FD] shadow-lg shadow-sky-400/40 border border-white"></div>
          {/* Orbiting Planetary Bead 2 - Soft Gold */}
          <div className="absolute -bottom-2 right-1/4 w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-[#F59E0B] to-[#FDE68A] shadow-lg shadow-amber-400/40 border border-white"></div>
          {/* Orbiting Planetary Bead 3 - Mint Green */}
          <div className="absolute top-1/2 -right-2 w-3 h-3 rounded-full bg-gradient-to-tr from-[#10B981] to-[#BBF7D0] shadow-md border border-white"></div>
        </div>

        {/* Mid Elliptical Orbital Ring with Reverse Rotation */}
        <div
          className="absolute w-[360px] sm:w-[420px] md:w-[460px] h-[170px] sm:h-[200px] md:h-[220px] rounded-[100%] border border-pink-300/45 animate-orbit-spin-reverse"
          style={{
            transform: 'rotate(24deg) rotateX(60deg)',
            transformStyle: 'preserve-3d',
          }}
        >
          <div className="absolute -top-1.5 right-1/3 w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-[#E91E63] to-[#FED7AA] shadow-md border border-white"></div>
        </div>

        {/* Inner Luminous Ring */}
        <div
          className="absolute w-[260px] sm:w-[300px] h-[120px] sm:h-[140px] rounded-[100%] border border-amber-300/40 shadow-inner"
          style={{
            transform: 'rotate(-8deg) rotateX(55deg)',
          }}
        />
      </div>

      {/* 3. Central AI Brain & Lightbulb Assembly */}
      <div
        className="relative z-10 flex flex-col items-center justify-center transition-transform duration-500 ease-out"
        style={{
          transform: `translate3d(${pX * 0.5}px, ${pY * 0.5}px, 0)`,
        }}
      >
        {/* Glass Bulb Dome with Glowing AI Brain Inside */}
        <div className="relative w-44 sm:w-52 h-44 sm:h-52 rounded-full flex items-center justify-center">
          {/* Outer Glass Sphere Dome with Refraction */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/80 via-sky-50/40 to-pink-50/50 backdrop-blur-md border border-white/95 shadow-2xl shadow-sky-200/40">
            {/* Glass Highlight Arcs */}
            <div className="absolute top-3 left-6 w-16 h-8 rounded-[100%] bg-white/80 blur-[1px] rotate-[-25deg]"></div>
            <div className="absolute bottom-5 right-6 w-10 h-5 rounded-[100%] bg-white/50 blur-[1px]"></div>
          </div>

          {/* Central Glowing AI Neural Brain / Core (SVG in Multi-Color Gradient) */}
          <div className="relative z-20 animate-brain-glow">
            <svg
              className="w-24 sm:w-28 h-24 sm:h-28 text-[#E91E63] drop-shadow-xl"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="brainMultiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#38BDF8" />
                  <stop offset="35%" stopColor="#FB923C" />
                  <stop offset="70%" stopColor="#E91E63" />
                  <stop offset="100%" stopColor="#F59E0B" />
                </linearGradient>
                <linearGradient id="coreMultiLight" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#BAE6FD" />
                  <stop offset="100%" stopColor="#F472B6" />
                </linearGradient>
              </defs>

              {/* Neural Brain Lobes */}
              {/* Left Hemisphere */}
              <path
                d="M48 20 C32 20 22 30 22 45 C22 55 27 63 32 70 C36 75 42 78 48 80 C48 72 48 30 48 20 Z"
                fill="url(#brainMultiGrad)"
                opacity="0.92"
              />
              {/* Right Hemisphere */}
              <path
                d="M52 20 C68 20 78 30 78 45 C78 55 73 63 68 70 C64 75 58 78 52 80 C52 72 52 30 52 20 Z"
                fill="url(#brainMultiGrad)"
                opacity="0.95"
              />
              {/* Neural Gyri / Curves */}
              <path
                d="M32 35 C38 32 44 38 46 42 M28 48 C34 46 40 50 44 56 M34 62 C40 60 44 65 46 72"
                stroke="#FFFFFF"
                strokeWidth="2.5"
                strokeLinecap="round"
                opacity="0.9"
              />
              <path
                d="M68 35 C62 32 56 38 54 42 M72 48 C66 46 60 50 56 56 M66 62 C60 60 56 65 54 72"
                stroke="#FFFFFF"
                strokeWidth="2.5"
                strokeLinecap="round"
                opacity="0.9"
              />

              {/* Glowing Synaptic Light Nodes */}
              <circle cx="50" cy="50" r="10" fill="url(#coreMultiLight)" className="animate-pulse" />
              <circle cx="50" cy="50" r="5" fill="#FFFFFF" />
              <circle cx="38" cy="36" r="2.5" fill="#BAE6FD" />
              <circle cx="62" cy="36" r="2.5" fill="#FED7AA" />
              <circle cx="34" cy="52" r="2" fill="#BBF7D0" />
              <circle cx="66" cy="52" r="2" fill="#FDE68A" />
            </svg>
          </div>

          {/* Lightbulb Filament Base Glow */}
          <div className="absolute -bottom-2 w-16 h-6 rounded-full bg-gradient-to-t from-[#FB923C]/70 via-[#F472B6]/50 to-transparent blur-xs"></div>
        </div>

        {/* Multi-Tiered Futuristic Base Platform in Pastel Gold, Rose & White */}
        <div className="relative -mt-3 flex flex-col items-center">
          {/* Top Metallic Ring */}
          <div className="w-28 h-5 rounded-full bg-gradient-to-r from-amber-100 via-white to-sky-100 border border-[#F1E4EC] shadow-md flex items-center justify-center">
            <div className="w-20 h-2 rounded-full bg-gradient-to-r from-[#FB923C]/50 to-[#38BDF8]/50 blur-[1px]"></div>
          </div>
          {/* Mid Glowing Ring */}
          <div className="w-36 h-6 -mt-1.5 rounded-full bg-gradient-to-r from-pink-100 via-amber-100 to-sky-100 border border-[#F1E4EC] shadow-lg shadow-pink-200/20 flex items-center justify-center">
            <div className="w-28 h-2 rounded-full bg-gradient-to-r from-[#E91E63] via-[#FB923C] to-[#0EA5E9] animate-pulse"></div>
          </div>
          {/* Base Pedestal Platform */}
          <div className="w-48 sm:w-56 h-8 -mt-2 rounded-full bg-gradient-to-b from-white/95 via-[#FAF8FB] to-[#F0FDF4] backdrop-blur-md border border-white shadow-xl shadow-gray-200/50"></div>
        </div>
      </div>

      {/* 4. Floating 3D Frosted Glass Concept Cards with Distinct Pastel Colors */}

      {/* Card 1: 🔍 Discover Problems (Top Left) — Peach / Light Orange */}
      <div
        className="absolute top-6 sm:top-10 left-2 sm:left-6 z-30 animate-float-slow transition-transform duration-500 ease-out"
        style={{
          transform: `translate3d(${pX * 0.8}px, ${pY * 0.8}px, 0)`,
        }}
        onMouseEnter={() => setActiveCard('discover')}
        onMouseLeave={() => setActiveCard(null)}
      >
        <div className="pastel-glass-peach p-3.5 sm:p-4 rounded-2xl flex flex-col items-center gap-1.5 min-w-[110px] sm:min-w-[124px] cursor-pointer hover:scale-105 transition-all shadow-sm">
          <div className="w-9 h-9 rounded-xl bg-[#FFF7ED] border border-[#FED7AA] flex items-center justify-center text-[#EA580C] shadow-xs">
            <Search className="w-4 h-4" />
          </div>
          <span className="text-[11px] sm:text-xs font-bold text-[#2D2530] text-center leading-tight">
            Discover<br />Problems
          </span>
        </div>
      </div>

      {/* Card 2: 📖 Research (Top Right) — Light Sky Blue */}
      <div
        className="absolute top-4 sm:top-8 right-16 sm:right-28 z-30 animate-float-medium transition-transform duration-500 ease-out"
        style={{
          transform: `translate3d(${-pX * 0.7}px, ${-pY * 0.7}px, 0)`,
        }}
        onMouseEnter={() => setActiveCard('research')}
        onMouseLeave={() => setActiveCard(null)}
      >
        <div className="pastel-glass-sky p-3.5 sm:p-4 rounded-2xl flex flex-col items-center gap-1.5 min-w-[105px] sm:min-w-[118px] cursor-pointer hover:scale-105 transition-all shadow-sm">
          <div className="w-9 h-9 rounded-xl bg-[#F0F9FF] border border-[#BAE6FD] flex items-center justify-center text-[#0284C7] shadow-xs">
            <BookOpen className="w-4 h-4" />
          </div>
          <span className="text-[11px] sm:text-xs font-bold text-[#2D2530] text-center">
            Research
          </span>
        </div>
      </div>

      {/* Card 3: 💡 Generate Ideas (Mid Right) — Soft Gold / Yellow */}
      <div
        className="absolute top-44 sm:top-48 right-0 sm:right-4 z-30 animate-float-reverse transition-transform duration-500 ease-out"
        style={{
          transform: `translate3d(${-pX * 0.9}px, ${-pY * 0.9}px, 0)`,
        }}
        onMouseEnter={() => setActiveCard('ideas')}
        onMouseLeave={() => setActiveCard(null)}
      >
        <div className="pastel-glass-gold p-3.5 sm:p-4 rounded-2xl flex flex-col items-center gap-1.5 min-w-[110px] sm:min-w-[124px] cursor-pointer hover:scale-105 transition-all shadow-sm">
          <div className="w-9 h-9 rounded-xl bg-[#FFFBEB] border border-[#FDE68A] flex items-center justify-center text-[#D97706] shadow-xs">
            <Lightbulb className="w-4 h-4" />
          </div>
          <span className="text-[11px] sm:text-xs font-bold text-[#2D2530] text-center leading-tight">
            Generate<br />Ideas
          </span>
        </div>
      </div>

      {/* Card 4: 🔗 Check Similarity (Mid Left) — Light Sky Blue */}
      <div
        className="absolute top-48 sm:top-52 left-0 sm:left-2 z-30 animate-float-gentle transition-transform duration-500 ease-out"
        style={{
          transform: `translate3d(${pX * 0.75}px, ${pY * 0.75}px, 0)`,
        }}
        onMouseEnter={() => setActiveCard('similarity')}
        onMouseLeave={() => setActiveCard(null)}
      >
        <div className="pastel-glass-sky p-3.5 sm:p-4 rounded-2xl flex flex-col items-center gap-1.5 min-w-[110px] sm:min-w-[124px] cursor-pointer hover:scale-105 transition-all shadow-sm">
          <div className="w-9 h-9 rounded-xl bg-[#F0F9FF] border border-[#BAE6FD] flex items-center justify-center text-[#0369A1] shadow-xs">
            <Share2 className="w-4 h-4" />
          </div>
          <span className="text-[11px] sm:text-xs font-bold text-[#2D2530] text-center leading-tight">
            Check<br />Similarity
          </span>
        </div>
      </div>

      {/* Card 5: 🛡️ Validate (Bottom Left) — Mint Green */}
      <div
        className="absolute bottom-12 sm:bottom-16 left-8 sm:left-16 z-30 animate-float-medium transition-transform duration-500 ease-out"
        style={{
          transform: `translate3d(${pX * 0.65}px, ${pY * 0.65}px, 0)`,
        }}
        onMouseEnter={() => setActiveCard('validate')}
        onMouseLeave={() => setActiveCard(null)}
      >
        <div className="pastel-glass-mint p-3.5 sm:p-4 rounded-2xl flex flex-col items-center gap-1.5 min-w-[100px] sm:min-w-[115px] cursor-pointer hover:scale-105 transition-all shadow-sm">
          <div className="w-9 h-9 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0] flex items-center justify-center text-[#15803D] shadow-xs">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <span className="text-[11px] sm:text-xs font-bold text-[#2D2530] text-center">
            Validate
          </span>
        </div>
      </div>

      {/* Card 6: 💻 Build Projects (Bottom Right) — Soft Pink */}
      <div
        className="absolute bottom-10 sm:bottom-14 right-10 sm:right-16 z-30 animate-float-slow transition-transform duration-500 ease-out"
        style={{
          transform: `translate3d(${-pX * 0.85}px, ${-pY * 0.85}px, 0)`,
        }}
        onMouseEnter={() => setActiveCard('build')}
        onMouseLeave={() => setActiveCard(null)}
      >
        <div className="pastel-glass-pink p-3.5 sm:p-4 rounded-2xl flex flex-col items-center gap-1.5 min-w-[110px] sm:min-w-[124px] cursor-pointer hover:scale-105 transition-all shadow-sm">
          <div className="w-9 h-9 rounded-xl bg-[#FFF1F6] border border-[#FBCFE8] flex items-center justify-center text-[#E91E63] shadow-xs">
            <Code2 className="w-4 h-4" />
          </div>
          <span className="text-[11px] sm:text-xs font-bold text-[#2D2530] text-center leading-tight">
            Build<br />Projects
          </span>
        </div>
      </div>

      {/* 5. 3D Academic & Research Floating Props with Multi-Color Accents */}

      {/* 3D Graduation Cap (Top Right background) */}
      <div
        className="absolute -top-2 right-2 sm:right-6 z-20 animate-float-gentle opacity-95 transition-transform duration-700 ease-out pointer-events-none"
        style={{
          transform: `translate3d(${-pX * 1.1}px, ${-pY * 1.1}px, 0) rotate(8deg)`,
        }}
      >
        <div className="relative w-16 sm:w-20 h-16 sm:h-20 flex items-center justify-center">
          <div className="w-14 sm:w-16 h-14 sm:h-16 rounded-2xl bg-gradient-to-br from-[#FB923C] to-[#E91E63] shadow-xl shadow-pink-400/25 flex items-center justify-center text-white rotate-12 border border-white/80">
            <GraduationCap className="w-8 sm:w-9 h-8 sm:h-9" />
          </div>
        </div>
      </div>

      {/* 3D Stacked Research Books (Bottom Right background) */}
      <div
        className="absolute -bottom-4 right-0 sm:right-4 z-20 animate-float-reverse opacity-95 transition-transform duration-700 ease-out pointer-events-none"
        style={{
          transform: `translate3d(${-pX * 0.95}px, ${-pY * 0.95}px, 0) rotate(-6deg)`,
        }}
      >
        <div className="flex flex-col gap-1">
          <div className="w-14 sm:w-18 h-3.5 rounded-md bg-gradient-to-r from-[#BAE6FD] to-[#38BDF8] shadow-xs border border-white"></div>
          <div className="w-16 sm:w-20 h-4 rounded-md bg-gradient-to-r from-[#FED7AA] to-[#FB923C] shadow-sm border border-white"></div>
        </div>
      </div>

      {/* 3D Laptop Prop (Far Left background) */}
      <div
        className="absolute top-28 -left-6 sm:-left-8 z-10 animate-float-slow opacity-90 transition-transform duration-700 ease-out pointer-events-none"
        style={{
          transform: `translate3d(${pX * 1.2}px, ${pY * 1.2}px, 0) rotate(-15deg)`,
        }}
      >
        <div className="w-12 sm:w-14 h-10 rounded-lg bg-gradient-to-br from-white/95 to-[#F0FDF4] border border-[#BBF7D0] shadow-lg flex items-center justify-center text-[#10B981]">
          <Laptop className="w-6 h-6" />
        </div>
      </div>

    </div>
  );
};

export default HeroAIInnovationVisual;
