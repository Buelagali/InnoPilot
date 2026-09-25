import React, { useEffect, useRef } from 'react';
import heroBgImage from '../../assets/innopilot-hero-bg.jpg';

/**
 * HeroCanvasBackground
 * Uses the uploaded celestial floating AI island image as the direct live animated theme background
 * with real-time mouse parallax, glowing celestial sparkles on canvas, breathing light rays,
 * and seamless soft cloud gradient blending.
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

    // Particle system: glowing celestial sparks & drifting light nodes
    const particleCount = 65;
    const particles = [];

    const colors = [
      'rgba(255, 255, 255, 0.85)', // Pure White Starlight
      'rgba(167, 139, 250, 0.65)', // AI Violet Sparkle
      'rgba(34, 211, 238, 0.65)',  // AI Cyan Glow
      'rgba(56, 189, 248, 0.6)',   // AI Sky Blue
      'rgba(253, 230, 138, 0.65)', // Starlight Gold
      'rgba(244, 114, 182, 0.55)', // Soft Pink
    ];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 3 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25 - 0.1, // gentle upward drift
        alpha: Math.random() * 0.6 + 0.3,
        pulseSpeed: Math.random() * 0.025 + 0.015,
        phase: Math.random() * Math.PI * 2,
        depth: Math.random() * 0.8 + 0.2,
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

        const currentAlpha = p.alpha + Math.sin(time * p.pulseSpeed * 60 + p.phase) * 0.25;
        const parallaxX = (mousePos.x * 25) * p.depth;
        const parallaxY = (mousePos.y * 25) * p.depth;

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

  const pX = mousePos.x * 18;
  const pY = mousePos.y * 18;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 select-none">
      
      {/* 1. Exact Uploaded Celestial Island Theme Background with Parallax & Subtle Breathing Zoom */}
      <div
        className="absolute inset-0 w-full h-[850px] sm:h-[950px] lg:h-[1050px] transition-transform duration-700 ease-out origin-center"
        style={{
          transform: `translate3d(${pX * -0.4}px, ${pY * -0.4}px, 0) scale(1.05)`,
        }}
      >
        <img
          src={heroBgImage}
          alt="InnoPilot AI Floating Citadel Theme"
          className="w-full h-full object-cover object-top opacity-95 filter brightness-[1.02] contrast-[1.02]"
          loading="eager"
        />

        {/* Dynamic Light Beam & Shimmer Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-aiCyan-300/10 via-transparent to-aiViolet-300/10 mix-blend-overlay animate-pulse-slow"></div>
      </div>

      {/* 2. Soft Ambient Lighting Halos */}
      <div
        className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-aiCyan-400/20 via-aiViolet-400/15 to-transparent blur-3xl pointer-events-none transition-transform duration-700"
        style={{ transform: `translate3d(${pX * 0.5}px, ${pY * 0.5}px, 0)` }}
      ></div>

      <div
        className="absolute top-1/3 left-1/6 w-[450px] h-[450px] rounded-full bg-gradient-to-tr from-aiPink-300/15 via-aiSky-400/15 to-transparent blur-3xl pointer-events-none transition-transform duration-700"
        style={{ transform: `translate3d(${pX * -0.3}px, ${pY * -0.3}px, 0)` }}
      ></div>

      {/* 3. Interactive Floating Celestial Starlight Sparkles Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-90" />

      {/* 4. Bottom Ethereal Cloud Fog Gradient Transition (Blends gracefully into the lower content) */}
      <div className="absolute top-[600px] sm:top-[700px] lg:top-[800px] inset-x-0 bottom-0 bg-gradient-to-b from-transparent via-[#F8FAFC]/80 to-[#F8FAFC]"></div>
    </div>
  );
};

export default HeroCanvasBackground;
