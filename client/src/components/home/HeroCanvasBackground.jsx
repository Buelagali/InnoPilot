import React, { useEffect, useRef } from 'react';

/**
 * HeroCanvasBackground
 * Interactive futuristic skyscape canvas with floating celestial light particles,
 * multi-hued light beams, orbital holographic rings, floating dreamy cloud layers,
 * and mouse-responsive parallax.
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

    // Particle system: glowing celestial nodes and sparkles
    const particleCount = 55;
    const particles = [];

    const colors = [
      'rgba(167, 139, 250, 0.45)', // AI Violet
      'rgba(34, 211, 238, 0.45)',  // AI Cyan
      'rgba(56, 189, 248, 0.4)',   // AI Sky Blue
      'rgba(244, 114, 182, 0.4)',  // Soft Pink
      'rgba(253, 230, 138, 0.4)',  // Soft Gold
      'rgba(187, 247, 208, 0.35)', // Soft Mint
    ];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 3.5 + 1.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        alpha: Math.random() * 0.55 + 0.25,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        phase: Math.random() * Math.PI * 2,
        depth: Math.random() * 0.75 + 0.25,
      });
    }

    let time = 0;

    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      // Draw floating glowing sparkles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        const currentAlpha = p.alpha + Math.sin(time * p.pulseSpeed * 60 + p.phase) * 0.2;
        const parallaxX = (mousePos.x * 24) * p.depth;
        const parallaxY = (mousePos.y * 24) * p.depth;

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x + parallaxX, p.y + parallaxY, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color.replace(/[\d.]+\)$/, `${Math.max(0.1, currentAlpha)})`);
        ctx.shadowColor = p.color;
        ctx.shadowBlur = p.radius * 4;
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

  const pX = mousePos.x * 25;
  const pY = mousePos.y * 25;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 select-none">
      {/* 1. Base Ethereal Skyscape Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FFFFFF] via-[#F0F9FF] to-[#FAF5FF]"></div>

      {/* 2. Soft Ambient Luminous Sky Gradients */}
      <div className="absolute top-0 right-10 w-[700px] h-[550px] bg-gradient-to-br from-aiSky-200/35 via-aiViolet-200/25 to-transparent rounded-full blur-3xl transform rotate-12"></div>
      <div className="absolute top-20 left-10 w-[550px] h-[450px] bg-gradient-to-tr from-aiPink-200/25 via-aiCyan-200/25 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-1/3 w-[650px] h-[350px] bg-gradient-to-t from-aiMint-100/30 via-aiSky-100/20 to-transparent rounded-full blur-2xl"></div>

      {/* 3. Canvas for Floating Sparks */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-90" />

      {/* 4. Layered Ethereal Atmospheric Cloud Waves (SVG) */}
      <div
        className="absolute inset-0 opacity-85 transition-transform duration-700 ease-out"
        style={{
          transform: `translate3d(${pX * 0.3}px, ${pY * 0.3}px, 0)`,
        }}
      >
        <svg
          className="absolute -bottom-12 left-0 w-full h-[580px]"
          viewBox="0 0 1440 580"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="skyWaveGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E0F2FE" stopOpacity="0.6" />
              <stop offset="40%" stopColor="#F5F3FF" stopOpacity="0.5" />
              <stop offset="80%" stopColor="#FFF1F6" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#ECFEFF" stopOpacity="0.6" />
            </linearGradient>

            <linearGradient id="skyWaveGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
              <stop offset="60%" stopColor="#F0F9FF" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#FAF5FF" stopOpacity="0.8" />
            </linearGradient>

            <linearGradient id="hologramOrbGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.5" />
              <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#EC4899" stopOpacity="0.5" />
            </linearGradient>
          </defs>

          {/* Background Soft Cloud Wave */}
          <path
            d="M0,220 C360,120 620,320 960,180 C1240,60 1360,260 1440,200 L1440,580 L0,580 Z"
            fill="url(#skyWaveGrad1)"
          />

          {/* Foreground Crisp Soft Wave */}
          <path
            d="M0,320 C280,240 540,400 860,280 C1140,160 1320,340 1440,300 L1440,580 L0,580 Z"
            fill="url(#skyWaveGrad2)"
          />
        </svg>
      </div>

      {/* 5. Glowing Floating Holographic Spheres with Glassmorphism */}
      <div
        className="absolute top-28 left-[12%] w-24 h-24 rounded-full bg-gradient-to-tr from-aiCyan-300/30 via-white/80 to-aiViolet-300/30 backdrop-blur-md border border-white/90 shadow-xl shadow-aiCyan-400/10 animate-float-slow transition-transform duration-700"
        style={{ transform: `translate3d(${pX * -0.5}px, ${pY * -0.5}px, 0)` }}
      >
        <div className="absolute top-2 left-3 w-6 h-3 rounded-full bg-white/80 blur-[1px] rotate-[-30deg]"></div>
      </div>

      <div
        className="absolute top-[48%] right-[8%] w-32 h-32 rounded-full bg-gradient-to-tr from-aiPink-300/25 via-white/80 to-aiSky-300/30 backdrop-blur-md border border-white/90 shadow-xl shadow-aiViolet-400/10 animate-float-reverse transition-transform duration-700"
        style={{ transform: `translate3d(${pX * 0.6}px, ${pY * 0.6}px, 0)` }}
      >
        <div className="absolute top-3 left-4 w-8 h-4 rounded-full bg-white/80 blur-[1px] rotate-[-25deg]"></div>
      </div>
    </div>
  );
};

export default HeroCanvasBackground;
