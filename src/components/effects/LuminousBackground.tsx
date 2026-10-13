import React, { useEffect, useRef } from 'react';

export default function LuminousBackground() {
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

    let time = 0;

    // Organic luminous blur orb positions
    const orbs = [
      {
        baseX: 0.85,
        baseY: 0.18,
        radius: 460,
        color: 'rgba(0, 182, 255, 0.12)', // Electric Blue
        speedX: 0.0004,
        speedY: 0.0003,
        drift: 90,
      },
      {
        baseX: 0.12,
        baseY: 0.72,
        radius: 440,
        color: 'rgba(255, 30, 67, 0.09)', // Crimson Red
        speedX: -0.0003,
        speedY: 0.0005,
        drift: 80,
      },
      {
        baseX: 0.5,
        baseY: 0.45,
        radius: 520,
        color: 'rgba(36, 55, 255, 0.07)', // Deep Electric Blue
        speedX: 0.0002,
        speedY: -0.0003,
        drift: 110,
      },
      {
        baseX: 0.9,
        baseY: 0.85,
        radius: 380,
        color: 'rgba(255, 62, 108, 0.06)', // Crimson Glow
        speedX: -0.0004,
        speedY: -0.0002,
        drift: 70,
      },
    ];

    const draw = () => {
      animId = requestAnimationFrame(draw);
      time += 0.006;

      ctx.clearRect(0, 0, width, height);

      // 1. Draw Slow Luminous Floating Blur Orbs
      orbs.forEach((orb) => {
        const x = (orb.baseX + Math.sin(time * orb.speedX * 1000) * (orb.drift / width)) * width;
        const y = (orb.baseY + Math.cos(time * orb.speedY * 1000) * (orb.drift / height)) * height;
        const pulse = 1 + Math.sin(time * 0.8 + orb.baseX) * 0.08;

        const grad = ctx.createRadialGradient(x, y, 0, x, y, orb.radius * pulse);
        grad.addColorStop(0, orb.color);
        grad.addColorStop(0.5, orb.color.replace(/[\d\.]+\)$/, '0.04)'));
        grad.addColorStop(1, 'rgba(252, 253, 255, 0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(x, y, orb.radius * pulse, 0, Math.PI * 2);
        ctx.fill();
      });

      // 2. Subtle Undulating Atmospheric Wave Vectors (Opacity kept at 5%-10%)
      ctx.save();
      ctx.strokeStyle = 'rgba(0, 182, 255, 0.07)';
      ctx.lineWidth = 1;

      const waveSteps = 4;
      for (let w = 0; w < waveSteps; w++) {
        const waveY = (height * 0.25) + (w * height * 0.2);
        ctx.beginPath();
        for (let x = 0; x <= width; x += 30) {
          const waveHeight = Math.sin((x * 0.003) + (time * 0.6) + w) * 22;
          const y = waveY + waveHeight;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // Crimson wave counterpart
      ctx.strokeStyle = 'rgba(255, 30, 67, 0.05)';
      for (let w = 0; w < 3; w++) {
        const waveY = (height * 0.35) + (w * height * 0.25);
        ctx.beginPath();
        for (let x = 0; x <= width; x += 30) {
          const waveHeight = Math.cos((x * 0.0025) - (time * 0.4) + w) * 18;
          const y = waveY + waveHeight;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      ctx.restore();
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden bg-[#FCFDFF]">
      {/* 2D Canvas for Organic Floating Orbs & Waves */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ width: '100%', height: '100%' }}
      />

      {/* Decorative Technical Grid Overlay (Silver #E2E8F0, opacity 35%) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.35]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #E2E8F0 1px, transparent 1px),
            linear-gradient(to bottom, #E2E8F0 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />

      {/* Subtle Orbital Geometry Lines */}
      <div className="absolute top-[8%] right-[5%] w-[680px] h-[680px] rounded-full border border-slate-200/50 pointer-events-none opacity-40 animate-[spin_120s_linear_infinite]" />
      <div className="absolute top-[14%] right-[10%] w-[480px] h-[480px] rounded-full border border-dashed border-[#00B6FF]/30 pointer-events-none opacity-45 animate-[spin_90s_linear_infinite_reverse]" />
      <div className="absolute bottom-[10%] left-[2%] w-[580px] h-[580px] rounded-full border border-dashed border-[#FF1E43]/25 pointer-events-none opacity-40 animate-[spin_100s_linear_infinite]" />
      
      {/* Soft Vignette Edge Depth */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(244,246,249,0.5)_100%)]" />
    </div>
  );
}
