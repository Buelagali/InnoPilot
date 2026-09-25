import React, { useEffect, useRef } from 'react';

/**
 * HeroCanvasBackground
 * Interactive canvas with soft glowing particles, pastel pink ribbons, and 3D floating elements
 * with real-time mouse parallax.
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

    // Particle system configuration with Pink/Rose tones
    const particleCount = 42;
    const particles = [];

    const colors = [
      'rgba(233, 30, 99, 0.4)',   // primary pink
      'rgba(244, 143, 177, 0.45)', // soft blush pink
      'rgba(251, 113, 133, 0.4)',  // rose coral
      'rgba(252, 228, 236, 0.5)',  // light blush
      'rgba(244, 63, 94, 0.35)',   // vibrant rose
    ];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 4 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        alpha: Math.random() * 0.6 + 0.2,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        phase: Math.random() * Math.PI * 2,
        depth: Math.random() * 0.8 + 0.2,
      });
    }

    let time = 0;

    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      // Draw floating particles with mouse parallax
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
      {/* 1. Base Clean White / Warm Blush Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#ffffff] via-[#fffdfd] to-[#fff8fa]"></div>

      {/* 2. Canvas for particle sparkles and glowing nodes */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-80" />

      {/* 3. Fluid Animated Pastel Pink Waves & Flowing Ribbons (SVG) */}
      <div
        className="absolute inset-0 opacity-85 transition-transform duration-700 ease-out"
        style={{
          transform: `translate3d(${pX * 0.4}px, ${pY * 0.4}px, 0)`,
        }}
      >
        <svg
          className="absolute -bottom-10 left-0 w-full h-[600px] animate-ribbon-wave"
          viewBox="0 0 1440 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="waveGradPink1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fce4ec" stopOpacity="0.65" />
              <stop offset="50%" stopColor="#fbcfe8" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#ffe4e6" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id="waveGradPink2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fff1f2" stopOpacity="0.6" />
              <stop offset="60%" stopColor="#fdf2f8" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#fce4ec" stopOpacity="0.45" />
            </linearGradient>
            <linearGradient id="waveRibbonPink" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#f48fb1" stopOpacity="0.5" />
              <stop offset="35%" stopColor="#e91e63" stopOpacity="0.45" />
              <stop offset="70%" stopColor="#fb7185" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#fce4ec" stopOpacity="0.5" />
            </linearGradient>
          </defs>

          {/* Flowing Back Wave */}
          <path
            d="M0,280 C320,180 580,380 900,240 C1180,120 1340,320 1440,260 L1440,600 L0,600 Z"
            fill="url(#waveGradPink1)"
            className="transition-all duration-1000"
          />

          {/* Intersecting Mid Wave */}
          <path
            d="M0,350 C380,480 720,220 1050,370 C1260,460 1380,340 1440,380 L1440,600 L0,600 Z"
            fill="url(#waveGradPink2)"
          />

          {/* Dynamic 3D Curved Ribbon Stroke */}
          <path
            d="M-50,220 C280,100 480,440 850,280 C1180,140 1380,390 1500,200"
            stroke="url(#waveRibbonPink)"
            strokeWidth="38"
            strokeLinecap="round"
            fill="none"
            className="opacity-70 blur-[1px]"
          />
        </svg>
      </div>

      {/* 4. Large Translucent Floating Glass Spheres in Soft Pink */}
      {/* Top Left Sphere */}
      <div
        className="absolute top-16 -left-12 w-64 h-64 rounded-full bg-gradient-to-tr from-pink-300/30 via-rose-200/25 to-pink-100/40 backdrop-blur-xl border border-white/80 shadow-2xl shadow-pink-200/30 animate-float-slow transition-transform duration-500 ease-out"
        style={{
          transform: `translate3d(${pX * 0.7}px, ${pY * 0.7}px, 0)`,
        }}
      >
        <div className="absolute top-6 left-6 w-20 h-20 rounded-full bg-white/70 blur-md"></div>
      </div>

      {/* Top Center-Right Sphere */}
      <div
        className="absolute top-24 right-1/4 w-36 h-36 rounded-full bg-gradient-to-br from-rose-300/30 via-pink-200/30 to-rose-100/40 backdrop-blur-md border border-white/80 shadow-xl shadow-rose-200/25 animate-float-medium transition-transform duration-500 ease-out"
        style={{
          transform: `translate3d(${-pX * 0.5}px, ${-pY * 0.5}px, 0)`,
        }}
      >
        <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/75 blur-sm"></div>
      </div>

      {/* Far Right Large Orb */}
      <div
        className="absolute top-1/2 -right-16 w-80 h-80 rounded-full bg-gradient-to-tl from-pink-200/30 via-rose-200/25 to-pink-100/35 backdrop-blur-2xl border border-white/60 shadow-2xl shadow-pink-200/35 animate-float-reverse transition-transform duration-500 ease-out"
        style={{
          transform: `translate3d(${pX * 0.6}px, ${pY * 0.6}px, 0)`,
        }}
      >
        <div className="absolute top-8 left-8 w-24 h-24 rounded-full bg-white/60 blur-lg"></div>
      </div>

      {/* Bottom Floating Spheres */}
      <div
        className="absolute bottom-24 left-1/3 w-28 h-28 rounded-full bg-gradient-to-tr from-rose-200/35 via-pink-100/30 to-rose-200/30 backdrop-blur-md border border-white/70 shadow-lg animate-float-gentle transition-transform duration-500 ease-out"
        style={{
          transform: `translate3d(${-pX * 0.8}px, ${-pY * 0.8}px, 0)`,
        }}
      />

      {/* 5. Translucent 3D Floating Isometric Cubes in Pink & Rose Glass */}
      {/* Left 3D Cube */}
      <div
        className="absolute top-1/3 left-8 w-16 h-16 animate-cube-spin transition-transform duration-700 ease-out"
        style={{
          perspective: '600px',
          transform: `translate3d(${pX * 0.9}px, ${pY * 0.9}px, 0)`,
        }}
      >
        <div className="relative w-full h-full rounded-2xl bg-gradient-to-tr from-pink-400/40 to-rose-300/50 backdrop-blur-md border border-white/90 shadow-xl shadow-pink-300/30 rotate-12 flex items-center justify-center">
          <div className="w-8 h-8 rounded-lg bg-white/50 blur-xs"></div>
        </div>
      </div>

      {/* Right 3D Crystal Diamond */}
      <div
        className="absolute top-20 right-16 w-14 h-14 animate-cube-spin transition-transform duration-700 ease-out"
        style={{
          perspective: '600px',
          transform: `translate3d(${-pX * 1.1}px, ${-pY * 1.1}px, 0)`,
        }}
      >
        <div className="relative w-full h-full rounded-xl bg-gradient-to-br from-rose-400/40 to-pink-300/50 backdrop-blur-md border border-white/90 shadow-lg shadow-rose-300/30 -rotate-45 flex items-center justify-center">
          <div className="w-6 h-6 rounded-md bg-white/60 blur-xs"></div>
        </div>
      </div>

      {/* Lower Right 3D Crystal Cube */}
      <div
        className="absolute bottom-40 right-1/3 w-12 h-12 animate-float-medium transition-transform duration-700 ease-out"
        style={{
          transform: `translate3d(${pX * 0.6}px, ${pY * 0.6}px, 0) rotate(25deg)`,
        }}
      >
        <div className="w-full h-full rounded-xl bg-gradient-to-tr from-pink-400/35 to-rose-300/45 backdrop-blur-md border border-white/90 shadow-lg shadow-pink-300/25"></div>
      </div>
    </div>
  );
};

export default HeroCanvasBackground;
