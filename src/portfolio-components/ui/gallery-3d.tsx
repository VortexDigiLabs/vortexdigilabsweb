"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { cn } from "../../lib/utils";

export interface GalleryItem {
  type: 'image' | 'video';
  src: string;
}

interface Gallery3DProps {
  items: GalleryItem[];
  className?: string;
}

export function Gallery3D({ items, className }: Gallery3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  const [openIndex, setOpenIndex] = useState<number>(-1);
  const [hoverIndex, setHoverIndex] = useState<number>(-1);
  const [isHovering, setIsHovering] = useState(false);
  const [shift, setShift] = useState(0);

  const bands = [
    "is-hover-main",
    ["is-left-1", "is-right-1"],
    ["is-left-2", "is-right-2"],
    ["is-left-3", "is-right-3"],
    ["is-left-4", "is-right-4"],
  ];

  const padLeftRef = useRef(0);
  const firstCenterRef = useRef(0);
  const stepRef = useRef(0);
  const epsBaseRef = useRef(12);
  const prevXRef = useRef<number | null>(null);
  const prevTRef = useRef<number>(0);

  const metric = useCallback(() => {
    if (!containerRef.current || !itemsRef.current[0]) return;
    const cs = getComputedStyle(containerRef.current);
    padLeftRef.current = parseFloat(cs.paddingLeft) || 0;
    const w = itemsRef.current[0].offsetWidth || 0;
    const gap = parseFloat(cs.gap) || 0;
    stepRef.current = w + gap;
    firstCenterRef.current = (itemsRef.current[0].offsetLeft || 0) + w / 2;
    epsBaseRef.current = Math.max(10, stepRef.current * 0.08);
  }, []);

  useEffect(() => {
    metric();
    window.addEventListener("resize", metric);
    return () => window.removeEventListener("resize", metric);
  }, [metric]);

  const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

  const indexFromX = (x: number) => {
    if (stepRef.current === 0) return 0;
    return clamp(
      Math.round((x - firstCenterRef.current) / stepRef.current),
      0,
      items.length - 1
    );
  };

  const centerFor = (i: number) => firstCenterRef.current + i * stepRef.current;

  const centerItem = (idx: number) => {
    if (!containerRef.current || !itemsRef.current[idx]) return;
    const wrap = containerRef.current.getBoundingClientRect();
    const it = itemsRef.current[idx]!.getBoundingClientRect();
    const centerX = wrap.left + wrap.width / 2;
    const delta = centerX - (it.left + it.width / 2);
    const maxShift = wrap.width * 0.35;
    const clamped = Math.max(-maxShift, Math.min(maxShift, delta));
    setShift(clamped);
  };

  const openItem = (idx: number) => {
    setOpenIndex(idx);
    centerItem(idx);
  };

  const closeOpen = () => {
    setOpenIndex(-1);
    setShift(0);
  };

  const ensureHoveringOnce = () => {
    if (isHovering) return;
    setIsHovering(true);
    requestAnimationFrame(metric);
  };

  const effectiveEPS = (x: number) => {
    if (prevXRef.current == null) return epsBaseRef.current;
    const dx = Math.abs(x - prevXRef.current);
    const now = performance.now();
    const dt = Math.max(1, now - (prevTRef.current || now));
    const v = dx / dt;
    prevTRef.current = now;
    const k = clamp(1 - v * 0.8, 0.4, 1);
    return epsBaseRef.current * k;
  };

  const handlePointerEnter = () => {
    if (openIndex !== -1) return;
    ensureHoveringOnce();
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (openIndex !== -1) return;
    ensureHoveringOnce();

    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - padLeftRef.current;
    const idxRaw = indexFromX(x);

    let idx = idxRaw;
    if (hoverIndex >= 0) {
      const c = centerFor(hoverIndex);
      const movingRight = prevXRef.current == null ? true : x > prevXRef.current;
      const eps = effectiveEPS(x);
      if (movingRight && x < c + eps) idx = hoverIndex;
      if (!movingRight && x > c - eps) idx = hoverIndex;
    }

    prevXRef.current = x;

    if (idx !== hoverIndex) {
      setHoverIndex(idx);
    }
  };

  const handlePointerLeave = (e: React.PointerEvent) => {
    if (openIndex !== -1) return;
    if (!containerRef.current) return;
    const r = containerRef.current.getBoundingClientRect();
    const M = 48;
    if (
      e.clientX > r.left - M &&
      e.clientX < r.right + M &&
      e.clientY > r.top - M &&
      e.clientY < r.bottom + M
    )
      return;

    setHoverIndex(-1);
    prevXRef.current = null;
    prevTRef.current = 0;
    setIsHovering(false);
  };

  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      if (openIndex !== -1) {
        const openItemEl = itemsRef.current[openIndex];
        if (openItemEl && !openItemEl.contains(e.target as Node)) {
          closeOpen();
        }
      }
    };
    document.addEventListener("click", handleGlobalClick);
    return () => document.removeEventListener("click", handleGlobalClick);
  }, [openIndex]);

  const handleClick = (idx: number) => {
    if (openIndex === idx) closeOpen();
    else openItem(idx);
  };

  const handleKeyDown = (e: React.KeyboardEvent, idx: number) => {
    if ((e.key === "Enter" || e.key === " ") && !e.repeat) {
      e.preventDefault();
      if (openIndex === idx) closeOpen();
      else openItem(idx);
    }
  };

  const handleContainerKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape" && openIndex !== -1) {
      e.preventDefault();
      closeOpen();
    }
  };

  const getItemClasses = (idx: number) => {
    const classes = ["gallery-item"];
    if (openIndex === idx) {
      classes.push("is-open");
    } else if (openIndex === -1 && hoverIndex !== -1) {
      if (idx === hoverIndex) {
        classes.push(bands[0] as string);
      } else {
        for (let d = 1; d < bands.length; d++) {
          const L = hoverIndex - d;
          const R = hoverIndex + d;
          if (idx === L) classes.push(bands[d][0]);
          if (idx === R) classes.push(bands[d][1]);
        }
      }
    }
    return classes.join(" ");
  };

  return (
    <div className={cn("gallery-wrapper", className)}>
      <style dangerouslySetInnerHTML={{ __html: `
        .gallery-wrapper {
          --index: calc(1vw + 1vh);
          --transition: cubic-bezier(.1,.7,0,1);
          --gap-base: .2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: visible;
          width: 100%;
          min-height: 60vh;
        }
        .gallery-items {
          display: flex;
          gap: var(--gap, var(--gap-base));
          perspective: calc(var(--index) * 35);
          perspective-origin: 50% 50%;
          transform-style: preserve-3d;
          will-change: transform;
          overflow: visible;
          transition: transform .6s var(--transition);
          padding-inline: 48px;
          margin-inline: -48px;
        }
        .gallery-items.hovering {
          --gap: calc(var(--gap-base) / 2);
        }
        .gallery-item {
          position: relative;
          width: calc(var(--index) * 3);
          height: calc(var(--index) * 18);
          background: #222 center/cover no-repeat;
          cursor: pointer;
          transition: transform 1.25s var(--transition), width .5s var(--transition);
          transform-style: preserve-3d;
          backface-visibility: hidden;
          will-change: transform, width;
          outline: none;
          border-radius: 100px;
          flex: 0 0 auto;
          user-select: none;
        }
        .gallery-item img,
        .gallery-item video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 100px;
          pointer-events: none;
        }
        .gallery-item.is-hover-main { transform: translateZ(calc(var(--index) * 10)); z-index: 10; }
        .gallery-item.is-right-1   { transform: translateZ(calc(var(--index) * 8.5))  rotateY(35deg);  z-index: 9; }
        .gallery-item.is-right-2   { transform: translateZ(calc(var(--index) * 5.6))  rotateY(40deg);  z-index: 8; }
        .gallery-item.is-right-3   { transform: translateZ(calc(var(--index) * 2.5))  rotateY(30deg);  z-index: 7; }
        .gallery-item.is-right-4   { transform: translateZ(calc(var(--index) * 0.6))  rotateY(15deg);  z-index: 6; }
        .gallery-item.is-left-1    { transform: translateZ(calc(var(--index) * 8.5))  rotateY(-35deg); z-index: 9; }
        .gallery-item.is-left-2    { transform: translateZ(calc(var(--index) * 5.6))  rotateY(-40deg); z-index: 8; }
        .gallery-item.is-left-3    { transform: translateZ(calc(var(--index) * 2.5))  rotateY(-30deg); z-index: 7; }
        .gallery-item.is-left-4    { transform: translateZ(calc(var(--index) * 0.6))  rotateY(-15deg); z-index: 6; }
        .gallery-items.is-open .gallery-item { transition: transform .8s var(--transition), width .6s var(--transition); }
        .gallery-item.is-open {
          width: 20vw;
          z-index: 100;
          transform: translateZ(calc(var(--index) * 10));
        }
      `}} />
      <div
        ref={containerRef}
        className={cn(
          "gallery-items",
          isHovering && "hovering",
          openIndex !== -1 && "is-open"
        )}
        style={{ transform: `translateX(${shift}px)` }}
        onPointerEnter={handlePointerEnter}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onKeyDown={handleContainerKeyDown}
        onDragStart={(e) => e.preventDefault()}
      >
        {items.map((item, idx) => (
          <div
            key={idx}
            ref={(el) => {
              itemsRef.current[idx] = el;
            }}
            className={getItemClasses(idx)}
            tabIndex={0}
            onClick={() => handleClick(idx)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
          >
            {item.type === 'video' ? (
              <video 
                src={item.src} 
                autoPlay 
                loop 
                muted 
                playsInline
              />
            ) : (
              <img 
                src={item.src} 
                alt={`Gallery item ${idx + 1}`}
                referrerPolicy="no-referrer"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
