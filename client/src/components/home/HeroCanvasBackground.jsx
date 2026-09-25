import React, { useEffect, useRef } from 'react';

/**
 * HeroCanvasBackground
 * Interactive multi-color pastel canvas with soft glowing particles, multi-hue ribbon waves,
 * translucent floating glass spheres (pink, peach, mint, sky blue, gold), 3D crystal cubes,
 * and curved orbital lines with real-time mouse parallax.
 */
const HeroCanvasBackground = ({ mousePos = { x: 0, y: 0 } }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle system configuration with Light Multi-Color Pastel tones
    const particleCount = 48;
    const particles = [];

    const colors = [
      'rgba(244, 114, 182, 0.45)', // Soft Pink
      'rgba(251, 146, 60, 0.4)',   // Peach / Light Orange
      'rgba(245, 158, 11, 0.35)',  // Soft Gold
      'rgba(16, 185, 129, 0.38)',  // Mint Green
      'rgba(14, 165, 233, 0.4)',   // Light Sky Blue
    ];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 4 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        alpha: Math.random() * 0.55 + 0.2,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        phase: Math.random() * Math.PI * 2,
        depth: Math.random() * 0.8 + 0.2,
      });
    }

    let time = 0;

    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      // Draw floating pastel particles with mouse parallax
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        const currentAlpha = p.alpha + Math.sin(time * p.pulseSpeed * 60 + p.phase) * 0.2;
        const parallaxX = (mousePos.x * 20) * p.depth;
        const parallaxY = (mousePos.y * 20) * p.depth;

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x + parallaxX, p.y + parallaxY, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color.replace(/[\d.]+\)$/, `${Math.max(0.1, currentAlpha)})`);
        ctx.shadowColor = p.color;
        ctx.shadowBlur = p.radius * 3;
        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mousePos.x, mousePos.y]);

  // Mouse Parallax factor calculation
  const pX = mousePos.x * 25;
  const pY = mousePos.y * 25;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 select-none">
      {/* 1. Base Clean White / Subtle Multi-Pastel Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FFFFFF] via-[#FFFDFE] to-[#FAF8FB]"></div>

      {/* 2. Canvas for particle sparkles and glowing nodes */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-80" />

      {/* 3. Fluid Multi-Color Pastel Waves & Flowing Ribbons (SVG) */}
      <div
        className="absolute inset-0 opacity-80 transition-transform duration-700 ease-out"
        style={{
          transform: `translate3d(${pX * 0.4}px, ${pY * 0.4}px, 0)`,
        }}
      >
        <svg
          className="absolute -bottom-10 left-0 w-full h-[620px] animate-ribbon-wave"
          viewBox="0 0 1440 620"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="multiWaveGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#BAE6FD" stopOpacity="0.4" />   {/* Sky Blue */}
              <stop offset="35%" stopColor="#BBF7D0" stopOpacity="0.35" />  {/* Mint Green */}
              <stop offset="70%" stopColor="#FED7AA" stopOpacity="0.4" />   {/* Peach */}
              <stop offset="100%" stopColor="#FBCFE8" stopOpacity="0.45" /> {/* Pink */}
            </linearGradient>

            <linearGradient id="multiWaveGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFF1F6" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#FEF3C7" stopOpacity="0.4" />  {/* Soft Gold */}
              <stop offset="100%" stopColor="#E0F2FE" stopOpacity="0.5" /> {/* Sky */}
            </linearGradient>

            <linearGradient id="multiRibbonGrad" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.4" />
              <stop offset="30%" stopColor="#4ADE80" stopOpacity="0.4" />
              <stop offset="60%" stopColor="#FB923C" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#F472B6" stopOpacity="0.45" />
            </linearGradient>
          </defs>

          {/* Flowing Back Wave */}
          <path
            d="M0,280 C320,180 580,380 900,240 C1180,120 1340,320 1440,260 L1440,620 L0,620 Z"
            fill="url(#multiWaveGrad1)"
            className="transition-all duration-1000"
          />

          {/* Intersecting Mid Wave */}
          <path
            d="M0,350 C380,480 720,220 1050,370 C1260,460 1380,340 1440,380 L1440,620 L0,620 Z"
            fill="url(#multiWaveGrad2)"
          />

          {/* Dynamic 3D Curved Ribbon Stroke */}
          <path
            d="M-50,220 C280,100 480,440 850,280 C1180,140 1380,390 1500,200"
            stroke="url(#multiRibbonGrad)"
            strokeWidth="36"
            strokeLinecap="round"
            fill="none"
            className="opacity-75 blur-[1px]"
          />
        </svg>
      </div>

      {/* 4. Multi-Color Translucent Floating Glass Spheres */}
      {/* Top Left Sky Blue Sphere */}
      <div
        className="absolute top-16 -left-12 w-60 h-60 rounded-full bg-gradient-to-tr from-sky-200/35 via-sky-100/25 to-white/60 backdrop-blur-xl border border-white/80 shadow-2xl shadow-sky-200/30 animate-float-slow transition-transform duration-500 ease-out"
        style={{
          transform: `translate3d(${pX * 0.7}px, ${pY * 0.7}px, 0)`,
        }}
      >
        <div className="absolute top-6 left-6 w-18 h-18 rounded-full bg-white/70 blur-md"></div>
      </div>

      {/* Top Center-Right Peach / Gold Sphere */}
      <div
        className="absolute top-20 right-1/4 w-36 h-36 rounded-full bg-gradient-to-br from-amber-200/30 via-orange-100/30 to-rose-100/40 backdrop-blur-md border border-white/80 shadow-xl shadow-orange-200/25 animate-float-medium transition-transform duration-500 ease-out"
        style={{
          transform: `translate3d(${-pX * 0.5}px, ${-pY * 0.5}px, 0)`,
        }}
      >
        <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/75 blur-sm"></div>
      </div>

      {/* Far Right Soft Pink / Lavender Orb */}
      <div
        className="absolute top-1/2 -right-16 w-80 h-80 rounded-full bg-gradient-to-tl from-pink-200/35 via-rose-100/30 to-purple-100/20 backdrop-blur-2xl border border-white/70 shadow-2xl shadow-pink-200/30 animate-float-reverse transition-transform duration-500 ease-out"
        style={{
          transform: `translate3d(${pX * 0.6}px, ${pY * 0.6}px, 0)`,
        }}
      >
        <div className="absolute top-8 left-8 w-24 h-24 rounded-full bg-white/60 blur-lg"></div>
      </div>

      {/* Bottom Mint Green Sphere */}
      <div
        className="absolute bottom-20 left-1/3 w-28 h-28 rounded-full bg-gradient-to-tr from-emerald-200/35 via-teal-100/30 to-green-100/30 backdrop-blur-md border border-white/70 shadow-lg shadow-emerald-200/20 animate-float-gentle transition-transform duration-500 ease-out"
        style={{
          transform: `translate3d(${-pX * 0.8}px, ${-pY * 0.8}px, 0)`,
        }}
      />

      {/* 5. Translucent 3D Floating Isometric Cubes & Crystals */}
      {/* Left 3D Cube (Peach/Orange) */}
      <div
        className="absolute top-1/3 left-8 w-16 h-16 animate-cube-spin transition-transform duration-700 ease-out"
        style={{
          perspective: '600px',
          transform: `translate3d(${pX * 0.9}px, ${pY * 0.9}px, 0)`,
        }}
      >
        <div className="relative w-full h-full rounded-2xl bg-gradient-to-tr from-orange-300/45 to-pink-300/40 backdrop-blur-md border border-white/90 shadow-xl shadow-orange-300/25 rotate-12 flex items-center justify-center">
          <div className="w-8 h-8 rounded-lg bg-white/50 blur-xs"></div>
        </div>
      </div>

      {/* Right 3D Crystal Diamond (Mint/Sky) */}
      <div
        className="absolute top-24 right-16 w-14 h-14 animate-cube-spin transition-transform duration-700 ease-out"
        style={{
          perspective: '600px',
          transform: `translate3d(${-pX * 1.1}px, ${-pY * 1.1}px, 0)`,
        }}
      >
        <div className="relative w-full h-full rounded-xl bg-gradient-to-br from-emerald-300/40 to-sky-300/45 backdrop-blur-md border border-white/90 shadow-lg shadow-sky-300/25 -rotate-45 flex items-center justify-center">
          <div className="w-6 h-6 rounded-md bg-white/60 blur-xs"></div>
        </div>
      </div>

      {/* Lower Right 3D Crystal Cube (Gold/Yellow) */}
      <div
        className="absolute bottom-36 right-1/3 w-12 h-12 animate-float-medium transition-transform duration-700 ease-out"
        style={{
          transform: `translate3d(${pX * 0.6}px, ${pY * 0.6}px, 0) rotate(25deg)`,
        }}
      >
        <div className="w-full h-full rounded-xl bg-gradient-to-tr from-amber-300/40 to-yellow-200/50 backdrop-blur-md border border-white/90 shadow-lg shadow-amber-300/25"></div>
      </div>
    </div>
  );
};

export default HeroCanvasBackground;
