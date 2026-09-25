import React, { useState } from 'react';
import {
  Search,
  BookOpen,
  Lightbulb,
  Share2,
  ShieldCheck,
  Code2,
  Sparkles,
  GraduationCap,
  Laptop,
} from 'lucide-react';

/**
 * HeroAIInnovationVisual
 * Recreates the central futuristic AI innovation visual in the new White + Pink/Rose theme:
 * Glowing crystal brain inside a lightbulb, multi-tier orbital rings, floating 3D glass tiles,
 * and academic cap/books elements with full 60fps animations.
 */
const HeroAIInnovationVisual = ({ mousePos = { x: 0, y: 0 } }) => {
  const [activeCard, setActiveCard] = useState(null);

  // Parallax offsets
  const pX = mousePos.x * 20;
  const pY = mousePos.y * 20;

  return (
    <div className="relative w-full max-w-[620px] lg:max-w-[680px] h-[520px] sm:h-[580px] md:h-[620px] mx-auto flex items-center justify-center select-none">
      
      {/* 1. Ambient Central AI Pink Glows */}
      <div className="absolute w-[360px] h-[360px] rounded-full bg-gradient-to-tr from-pink-400/25 via-rose-300/20 to-pink-200/30 blur-3xl -z-10 animate-pulse-slow pointer-events-none"></div>
      <div className="absolute w-[200px] h-[200px] rounded-full bg-pink-500/15 blur-2xl -z-10 pointer-events-none"></div>

      {/* 2. 3D Orbital Rings System in Pink */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none transition-transform duration-700 ease-out"
        style={{
          transform: `translate3d(${pX * 0.3}px, ${pY * 0.3}px, 0)`,
        }}
      >
        {/* Outer Elliptical Orbital Path (tilted 3D) */}
        <div
          className="w-[460px] sm:w-[540px] md:w-[600px] h-[220px] sm:h-[260px] md:h-[290px] rounded-[100%] border border-pink-300/50 border-dashed animate-orbit-spin-slow relative"
          style={{
            transform: 'rotate(-18deg) rotateX(62deg)',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Orbiting Planetary Bead 1 */}
          <div className="absolute -top-2 left-1/4 w-4 h-4 rounded-full bg-gradient-to-tr from-[#e91e63] to-[#f48fb1] shadow-lg shadow-pink-500/50 border border-white"></div>
          {/* Orbiting Planetary Bead 2 */}
          <div className="absolute -bottom-2 right-1/4 w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-[#ec407a] to-[#fbcfe8] shadow-lg shadow-pink-400/50 border border-white"></div>
          {/* Orbiting Planetary Bead 3 */}
          <div className="absolute top-1/2 -right-2 w-3 h-3 rounded-full bg-gradient-to-tr from-[#fb7185] to-[#f43f5e] shadow-md border border-white"></div>
        </div>

        {/* Mid Elliptical Orbital Ring with Reverse Rotation */}
        <div
          className="absolute w-[360px] sm:w-[420px] md:w-[460px] h-[170px] sm:h-[200px] md:h-[220px] rounded-[100%] border border-rose-300/40 animate-orbit-spin-reverse"
          style={{
            transform: 'rotate(24deg) rotateX(60deg)',
            transformStyle: 'preserve-3d',
          }}
        >
          <div className="absolute -top-1.5 right-1/3 w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-[#e91e63] to-[#fda4af] shadow-md border border-white"></div>
        </div>

        {/* Inner Luminous Ring */}
        <div
          className="absolute w-[260px] sm:w-[300px] h-[120px] sm:h-[140px] rounded-[100%] border border-pink-400/50 shadow-inner"
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
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/60 via-pink-100/30 to-rose-100/40 backdrop-blur-md border border-white/90 shadow-2xl shadow-pink-200/50">
            {/* Glass Highlight Arcs */}
            <div className="absolute top-3 left-6 w-16 h-8 rounded-[100%] bg-white/80 blur-[1px] rotate-[-25deg]"></div>
            <div className="absolute bottom-5 right-6 w-10 h-5 rounded-[100%] bg-white/50 blur-[1px]"></div>
          </div>

          {/* Central Glowing AI Neural Brain / Core (SVG in Pink) */}
          <div className="relative z-20 animate-brain-glow">
            <svg
              className="w-24 sm:w-28 h-24 sm:h-28 text-[#e91e63] drop-shadow-xl"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="brainPinkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f48fb1" />
                  <stop offset="50%" stopColor="#e91e63" />
                  <stop offset="100%" stopColor="#c2185b" />
                </linearGradient>
                <linearGradient id="corePinkLight" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fda4af" />
                  <stop offset="100%" stopColor="#e91e63" />
                </linearGradient>
              </defs>

              {/* Neural Brain Lobes */}
              {/* Left Hemisphere */}
              <path
                d="M48 20 C32 20 22 30 22 45 C22 55 27 63 32 70 C36 75 42 78 48 80 C48 72 48 30 48 20 Z"
                fill="url(#brainPinkGrad)"
                opacity="0.92"
              />
              {/* Right Hemisphere */}
              <path
                d="M52 20 C68 20 78 30 78 45 C78 55 73 63 68 70 C64 75 58 78 52 80 C52 72 52 30 52 20 Z"
                fill="url(#brainPinkGrad)"
                opacity="0.95"
              />
              {/* Neural Gyri / Curves */}
              <path
                d="M32 35 C38 32 44 38 46 42 M28 48 C34 46 40 50 44 56 M34 62 C40 60 44 65 46 72"
                stroke="#ffffff"
                strokeWidth="2.5"
                strokeLinecap="round"
                opacity="0.85"
              />
              <path
                d="M68 35 C62 32 56 38 54 42 M72 48 C66 46 60 50 56 56 M66 62 C60 60 56 65 54 72"
                stroke="#ffffff"
                strokeWidth="2.5"
                strokeLinecap="round"
                opacity="0.85"
              />

              {/* Glowing Synaptic Light Nodes */}
              <circle cx="50" cy="50" r="10" fill="url(#corePinkLight)" className="animate-pulse" />
              <circle cx="50" cy="50" r="5" fill="#ffffff" />
              <circle cx="38" cy="36" r="2.5" fill="#ffffff" />
              <circle cx="62" cy="36" r="2.5" fill="#ffffff" />
              <circle cx="34" cy="52" r="2" fill="#fce4ec" />
              <circle cx="66" cy="52" r="2" fill="#fce4ec" />
            </svg>
          </div>

          {/* Lightbulb Filament Base Glow */}
          <div className="absolute -bottom-2 w-16 h-6 rounded-full bg-gradient-to-t from-[#e91e63]/70 via-[#f48fb1]/50 to-transparent blur-xs"></div>
        </div>

        {/* Multi-Tiered Futuristic Base Platform in Warm Rose & White */}
        <div className="relative -mt-3 flex flex-col items-center">
          {/* Top Metallic Ring */}
          <div className="w-28 h-5 rounded-full bg-gradient-to-r from-rose-100 via-white to-rose-100 border border-[#f3c5d3] shadow-md flex items-center justify-center">
            <div className="w-20 h-2 rounded-full bg-[#e91e63]/50 blur-[1px]"></div>
          </div>
          {/* Mid Glowing Ring */}
          <div className="w-36 h-6 -mt-1.5 rounded-full bg-gradient-to-r from-pink-100 via-rose-100 to-pink-100 border border-[#f3c5d3] shadow-lg shadow-pink-300/30 flex items-center justify-center">
            <div className="w-28 h-2 rounded-full bg-gradient-to-r from-[#e91e63] via-[#f48fb1] to-[#ec407a] animate-pulse"></div>
          </div>
          {/* Base Pedestal Platform */}
          <div className="w-48 sm:w-56 h-8 -mt-2 rounded-full bg-gradient-to-b from-white/95 via-[#fff0f5] to-[#fce4ec] backdrop-blur-md border border-white shadow-xl shadow-pink-200/40"></div>
        </div>
      </div>

      {/* 4. Floating 3D Frosted Glass Concept Cards in Pink Theme */}

      {/* Card 1: 🔍 Discover Problems (Top Left) */}
      <div
        className="absolute top-6 sm:top-10 left-2 sm:left-6 z-30 animate-float-slow transition-transform duration-500 ease-out"
        style={{
          transform: `translate3d(${pX * 0.8}px, ${pY * 0.8}px, 0)`,
        }}
        onMouseEnter={() => setActiveCard('discover')}
        onMouseLeave={() => setActiveCard(null)}
      >
        <div className="pastel-glass-card pastel-glass-card-hover p-3.5 sm:p-4 rounded-2xl flex flex-col items-center gap-1.5 min-w-[110px] sm:min-w-[124px] cursor-pointer">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-pink-500/15 to-rose-500/25 border border-[#f3c5d3] flex items-center justify-center text-[#e91e63] shadow-xs">
            <Search className="w-4 h-4" />
          </div>
          <span className="text-[11px] sm:text-xs font-bold text-[#3a2630] text-center leading-tight">
            Discover<br />Problems
          </span>
        </div>
      </div>

      {/* Card 2: 📖 Research (Top Right) */}
      <div
        className="absolute top-4 sm:top-8 right-16 sm:right-28 z-30 animate-float-medium transition-transform duration-500 ease-out"
        style={{
          transform: `translate3d(${-pX * 0.7}px, ${-pY * 0.7}px, 0)`,
        }}
        onMouseEnter={() => setActiveCard('research')}
        onMouseLeave={() => setActiveCard(null)}
      >
        <div className="pastel-glass-card pastel-glass-card-hover p-3.5 sm:p-4 rounded-2xl flex flex-col items-center gap-1.5 min-w-[105px] sm:min-w-[118px] cursor-pointer">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-500/15 to-pink-500/25 border border-[#f3c5d3] flex items-center justify-center text-[#d81b60] shadow-xs">
            <BookOpen className="w-4 h-4" />
          </div>
          <span className="text-[11px] sm:text-xs font-bold text-[#3a2630] text-center">
            Research
          </span>
        </div>
      </div>

      {/* Card 3: 💡 Generate Ideas (Mid Right) */}
      <div
        className="absolute top-44 sm:top-48 right-0 sm:right-4 z-30 animate-float-reverse transition-transform duration-500 ease-out"
        style={{
          transform: `translate3d(${-pX * 0.9}px, ${-pY * 0.9}px, 0)`,
        }}
        onMouseEnter={() => setActiveCard('ideas')}
        onMouseLeave={() => setActiveCard(null)}
      >
        <div className="pastel-glass-card pastel-glass-card-hover p-3.5 sm:p-4 rounded-2xl flex flex-col items-center gap-1.5 min-w-[110px] sm:min-w-[124px] cursor-pointer">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-pink-400/20 to-rose-400/25 border border-[#f3c5d3] flex items-center justify-center text-[#e91e63] shadow-xs">
            <Lightbulb className="w-4 h-4" />
          </div>
          <span className="text-[11px] sm:text-xs font-bold text-[#3a2630] text-center leading-tight">
            Generate<br />Ideas
          </span>
        </div>
      </div>

      {/* Card 4: 🔗 Check Similarity (Mid Left) */}
      <div
        className="absolute top-48 sm:top-52 left-0 sm:left-2 z-30 animate-float-gentle transition-transform duration-500 ease-out"
        style={{
          transform: `translate3d(${pX * 0.75}px, ${pY * 0.75}px, 0)`,
        }}
        onMouseEnter={() => setActiveCard('similarity')}
        onMouseLeave={() => setActiveCard(null)}
      >
        <div className="pastel-glass-card pastel-glass-card-hover p-3.5 sm:p-4 rounded-2xl flex flex-col items-center gap-1.5 min-w-[110px] sm:min-w-[124px] cursor-pointer">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-400/20 to-pink-500/25 border border-[#f3c5d3] flex items-center justify-center text-[#c2185b] shadow-xs">
            <Share2 className="w-4 h-4" />
          </div>
          <span className="text-[11px] sm:text-xs font-bold text-[#3a2630] text-center leading-tight">
            Check<br />Similarity
          </span>
        </div>
      </div>

      {/* Card 5: 🛡️ Validate (Bottom Left) */}
      <div
        className="absolute bottom-12 sm:bottom-16 left-8 sm:left-16 z-30 animate-float-medium transition-transform duration-500 ease-out"
        style={{
          transform: `translate3d(${pX * 0.65}px, ${pY * 0.65}px, 0)`,
        }}
        onMouseEnter={() => setActiveCard('validate')}
        onMouseLeave={() => setActiveCard(null)}
      >
        <div className="pastel-glass-card pastel-glass-card-hover p-3.5 sm:p-4 rounded-2xl flex flex-col items-center gap-1.5 min-w-[100px] sm:min-w-[115px] cursor-pointer">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-pink-500/20 to-rose-600/25 border border-[#f3c5d3] flex items-center justify-center text-[#e91e63] shadow-xs">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <span className="text-[11px] sm:text-xs font-bold text-[#3a2630] text-center">
            Validate
          </span>
        </div>
      </div>

      {/* Card 6: 💻 Build Projects (Bottom Right) */}
      <div
        className="absolute bottom-10 sm:bottom-14 right-10 sm:right-16 z-30 animate-float-slow transition-transform duration-500 ease-out"
        style={{
          transform: `translate3d(${-pX * 0.85}px, ${-pY * 0.85}px, 0)`,
        }}
        onMouseEnter={() => setActiveCard('build')}
        onMouseLeave={() => setActiveCard(null)}
      >
        <div className="pastel-glass-card pastel-glass-card-hover p-3.5 sm:p-4 rounded-2xl flex flex-col items-center gap-1.5 min-w-[110px] sm:min-w-[124px] cursor-pointer">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-400/20 to-pink-500/25 border border-[#f3c5d3] flex items-center justify-center text-[#e91e63] shadow-xs">
            <Code2 className="w-4 h-4" />
          </div>
          <span className="text-[11px] sm:text-xs font-bold text-[#3a2630] text-center leading-tight">
            Build<br />Projects
          </span>
        </div>
      </div>

      {/* 5. 3D Academic & Research Floating Props in Pink */}

      {/* 3D Graduation Cap (Top Right background) */}
      <div
        className="absolute -top-2 right-2 sm:right-6 z-20 animate-float-gentle opacity-95 transition-transform duration-700 ease-out pointer-events-none"
        style={{
          transform: `translate3d(${-pX * 1.1}px, ${-pY * 1.1}px, 0) rotate(8deg)`,
        }}
      >
        <div className="relative w-16 sm:w-20 h-16 sm:h-20 flex items-center justify-center">
          <div className="w-14 sm:w-16 h-14 sm:h-16 rounded-2xl bg-gradient-to-br from-[#e91e63] to-[#ec407a] shadow-xl shadow-pink-400/40 flex items-center justify-center text-white rotate-12 border border-white/80">
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
          <div className="w-14 sm:w-18 h-3.5 rounded-md bg-gradient-to-r from-[#f48fb1] to-[#e91e63] shadow-sm border border-white"></div>
          <div className="w-16 sm:w-20 h-4 rounded-md bg-gradient-to-r from-[#ec407a] to-[#fb7185] shadow-md border border-white"></div>
        </div>
      </div>

      {/* 3D Laptop Prop (Far Left background) */}
      <div
        className="absolute top-28 -left-6 sm:-left-8 z-10 animate-float-slow opacity-90 transition-transform duration-700 ease-out pointer-events-none"
        style={{
          transform: `translate3d(${pX * 1.2}px, ${pY * 1.2}px, 0) rotate(-15deg)`,
        }}
      >
        <div className="w-12 sm:w-14 h-10 rounded-lg bg-gradient-to-br from-white/95 to-[#fce4ec] border border-[#f3c5d3] shadow-lg flex items-center justify-center text-[#e91e63]">
          <Laptop className="w-6 h-6" />
        </div>
      </div>

    </div>
  );
};

export default HeroAIInnovationVisual;
