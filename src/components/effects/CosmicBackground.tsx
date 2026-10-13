import { useEffect, useRef } from 'react';

export default function CosmicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener('resize', resize);
    resize();

    // Create 70-90 subtle floating stellar particles
    const particleCount = 75;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: 0.5 + Math.random() * 1.5,
      speedX: (Math.random() - 0.5) * 0.15,
      speedY: (Math.random() - 0.5) * 0.15,
      opacity: 0.15 + Math.random() * 0.45,
      flickerSpeed: 0.005 + Math.random() * 0.015,
      phase: Math.random() * Math.PI * 2,
    }));

    let time = 0;

    const draw = () => {
      animId = requestAnimationFrame(draw);
      time += 0.01;

      ctx.clearRect(0, 0, width, height);

      // Render floating stellar dust particles
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        const currentOpacity = p.opacity * (0.6 + 0.4 * Math.sin(time * 5 * p.flickerSpeed + p.phase));

        ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#090A0F]" aria-hidden="true">
      {/* 1. Subtle Ambient Nebula Glows matching image_9.png */}
      <div className="absolute top-1/4 right-1/4 w-[650px] h-[650px] bg-[#00B6FF]/6 blur-[160px] rounded-full" />
      <div className="absolute top-1/3 right-10 w-[550px] h-[550px] bg-[#FF2E2E]/8 blur-[170px] rounded-full" />
      <div className="absolute -bottom-20 -left-20 w-[600px] h-[600px] bg-[#FF2E2E]/4 blur-[180px] rounded-full" />

      {/* 2. Dark Cosmic Grid Overlay */}
      <div className="absolute inset-0 cosmic-grid-overlay opacity-60" />

      {/* 3. Floating Stellar Dust Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* 4. Soft Vignette */}
      <div className="absolute inset-0 bg-radial from-transparent via-[#090A0F]/30 to-[#090A0F]/80" />
    </div>
  );
}
