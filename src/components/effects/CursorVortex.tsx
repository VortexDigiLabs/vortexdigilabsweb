import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  radius: number;
  initialRadius: number;
  angle: number;
  angularVelocity: number;
  radialVelocity: number;
  color: string;
  glowColor: string;
  size: number;
  createdAt: number;
  lifeMs: number;
}

const BRAND_COLORS = [
  { color: '#00B6FF', glow: 'rgba(0, 182, 255, 0.8)' }, // Electric Blue
  { color: '#2437FF', glow: 'rgba(36, 55, 255, 0.8)' }, // Deep Electric Blue
  { color: '#FF1E43', glow: 'rgba(255, 30, 67, 0.8)' }, // Crimson Red
  { color: '#FF3E6C', glow: 'rgba(255, 62, 108, 0.8)' }, // Crimson Glow
  { color: '#FFFFFF', glow: 'rgba(255, 255, 255, 0.9)' }, // Chrome White
  { color: '#E2E8F0', glow: 'rgba(226, 232, 240, 0.7)' }, // Metallic Silver
];

export default function CursorVortex() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animId: number;
    let particles: Particle[] = [];
    let lastMoveTime = 0;
    let lastX = 0;
    let lastY = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener('resize', resize);
    resize();

    // Spawns a spiral cluster of 15-30 particles around cursor
    const spawnVortexCluster = (cx: number, cy: number, count = 22) => {
      const now = performance.now();
      for (let i = 0; i < count; i++) {
        const palette = BRAND_COLORS[Math.floor(Math.random() * BRAND_COLORS.length)];
        const initialAngle = Math.random() * Math.PI * 2;
        const initialDistance = 4 + Math.random() * 26; // Initial orbital offset
        const direction = Math.random() > 0.5 ? 1 : -1;
        const angularVelocity = direction * (0.006 + Math.random() * 0.012); // radians per ms
        const radialVelocity = (Math.random() - 0.4) * 0.03; // spiral inward/outward dynamics

        particles.push({
          x: cx + Math.cos(initialAngle) * initialDistance,
          y: cy + Math.sin(initialAngle) * initialDistance,
          originX: cx,
          originY: cy,
          radius: initialDistance,
          initialRadius: initialDistance,
          angle: initialAngle,
          angularVelocity,
          radialVelocity,
          color: palette.color,
          glowColor: palette.glow,
          size: 1.4 + Math.random() * 2.2,
          createdAt: now,
          lifeMs: 1000, // Exactly 1 second (1000ms) lifetime
        });
      }
    };

    // Pointer move listener
    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      let clientX = 0;
      let clientY = 0;

      if ('touches' in e) {
        if (e.touches.length === 0) return;
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      const now = performance.now();
      // Throttle to 24ms (~40Hz spawn rate) to prevent excessive allocations while guaranteeing dense vortex
      if (now - lastMoveTime > 24) {
        const dist = Math.hypot(clientX - lastX, clientY - lastY);
        // Only emit if pointer actually moved
        if (dist > 3) {
          const particleCount = Math.min(30, Math.max(16, Math.floor(dist * 0.8)));
          spawnVortexCluster(clientX, clientY, particleCount);
          lastX = clientX;
          lastY = clientY;
          lastMoveTime = now;
        }
      }
    };

    window.addEventListener('mousemove', onPointerMove, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });

    // Animation Render Loop
    const render = () => {
      animId = requestAnimationFrame(render);
      const now = performance.now();

      // Clear the canvas
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      if (particles.length === 0) return;

      ctx.save();
      ctx.globalCompositeOperation = 'screen';

      const remaining: Particle[] = [];

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const age = now - p.createdAt;

        // Exactly 1000ms lifetime check
        if (age >= p.lifeMs) {
          continue; // discard expired particle
        }

        const progress = age / p.lifeMs; // 0.0 to 1.0
        const lifeRemaining = 1.0 - progress;

        // Vortex physics: spiral tightly while orbiting around origin
        p.angle += p.angularVelocity * 16.6;
        p.radius += p.radialVelocity * 16.6;
        // Dampen radius toward a tighter spiral as it fades
        const currentDist = p.radius * (1 - progress * 0.5);

        p.x = p.originX + Math.cos(p.angle) * currentDist;
        p.y = p.originY + Math.sin(p.angle) * currentDist;

        // Opacity and scale decay
        const alpha = Math.max(0, lifeRemaining * 0.85);
        const currentSize = Math.max(0.4, p.size * (1 - progress * 0.65));

        // Render glowing particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, currentSize, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = alpha;
        ctx.shadowColor = p.glowColor;
        ctx.shadowBlur = 8;
        ctx.fill();

        remaining.push(p);
      }

      ctx.restore();
      particles = remaining;
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('touchmove', onPointerMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999]"
      style={{ width: '100vw', height: '100vh' }}
      aria-hidden="true"
    />
  );
}
