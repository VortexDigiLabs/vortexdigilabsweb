import React, { useEffect, useRef, useState } from 'react';

export default function InteractiveCanvasBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showControls, setShowControls] = useState(false);

  // Configuration refs to avoid re-renders in the animation loop
  const config = useRef({
    gravity: 0.5,
    friction: 0.938,
    groundFriction: 0.7,
    segmentLength: 11,
    iterations: 10,
    wireCount: 30,
    wireColor: '#222222',
    imgScale: 1.0,
    attachOffsetY: 0.3,
    bgColor: '#000000',
    bgImage: '',
  });

  const [uiState, setUiState] = useState({
    bgColor: '#000000',
    wireColor: '#222222',
    imgScale: 1.0,
    attachOffset: 0.3,
    wireCount: 30,
    gravity: 0.5,
    segmentLength: 11,
    friction: 0.99,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    const mouse = { x: width / 2, y: height / 2 };

    const imgObj = {
      element: new Image(),
      baseWidth: 100,
      baseHeight: 100,
      currentWidth: 100,
      currentHeight: 100,
      loaded: false,
    };

    imgObj.element.src = 'https://iili.io/f8g5R3u.md.png';
    imgObj.element.onload = () => {
      imgObj.loaded = true;
      imgObj.baseWidth = imgObj.element.width;
      imgObj.baseHeight = imgObj.element.height;
      updateImageSize();
      initScene();
    };

    function updateImageSize() {
      if (!imgObj.loaded) return;
      const MAX_BASE = 300;
      let w = imgObj.baseWidth;
      let h = imgObj.baseHeight;

      if (w > MAX_BASE) {
        const ratio = MAX_BASE / w;
        w = MAX_BASE;
        h = h * ratio;
      }

      imgObj.currentWidth = w * config.current.imgScale;
      imgObj.currentHeight = h * config.current.imgScale;
    }

    class Point {
      x: number;
      y: number;
      oldx: number;
      oldy: number;
      pinned: boolean;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.oldx = x;
        this.oldy = y;
        this.pinned = false;
      }

      update() {
        if (this.pinned) return;

        const vx = (this.x - this.oldx) * config.current.friction;
        const vy = (this.y - this.oldy) * config.current.friction;

        this.oldx = this.x;
        this.oldy = this.y;

        this.x += vx;
        this.y += vy;
        this.y += config.current.gravity;

        const floorLevel = height - 2;

        if (this.y >= floorLevel) {
          this.y = floorLevel;
          const velX = this.x - this.oldx;
          this.oldx = this.x - velX * config.current.groundFriction;
        }
      }

      setPos(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.oldx = x;
        this.oldy = y;
      }
    }

    class Stick {
      p1: Point;
      p2: Point;

      constructor(p1: Point, p2: Point) {
        this.p1 = p1;
        this.p2 = p2;
      }

      update() {
        const dx = this.p2.x - this.p1.x;
        const dy = this.p2.y - this.p1.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance === 0) return;

        const difference = config.current.segmentLength - distance;
        const percent = difference / distance / 2;
        const offsetX = dx * percent;
        const offsetY = dy * percent;

        if (!this.p1.pinned) {
          this.p1.x -= offsetX;
          this.p1.y -= offsetY;
        }
        if (!this.p2.pinned) {
          this.p2.x += offsetX;
          this.p2.y += offsetY;
        }
      }
    }

    class Wire {
      index: number;
      total: number;
      points: Point[];
      sticks: Stick[];
      thickness: number;
      anchorOffsetRatio: number;

      constructor(index: number, total: number) {
        this.index = index;
        this.total = total;
        this.points = [];
        this.sticks = [];
        this.thickness = 2 + Math.random() * 3;
        this.anchorOffsetRatio = (Math.random() - 0.5) * 0.7;
        this.initWire();
      }

      initWire() {
        this.points = [];
        this.sticks = [];

        const startX = mouse.x;
        const startY = mouse.y + imgObj.currentHeight * config.current.attachOffsetY;

        const wallZoneHeight = height / 2;
        const step = wallZoneHeight / (this.total > 1 ? this.total - 1 : 1);
        const wallY = wallZoneHeight - this.index * step;
        const endX = width;
        const endY = wallY;

        const dist = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
        const totalLength = Math.max(dist * 1.3, width * 0.8);
        const count = Math.floor(totalLength / config.current.segmentLength);

        for (let i = 0; i <= count; i++) {
          const t = i / count;
          const px = startX + (endX - startX) * t;
          const py = startY + (endY - startY) * t;

          const p = new Point(px, py);
          this.points.push(p);

          if (i > 0) {
            this.sticks.push(new Stick(this.points[i - 1], p));
          }
        }

        this.points[0].pinned = true;
        const last = this.points[this.points.length - 1];
        last.pinned = true;
        last.setPos(endX, endY);
      }

      update() {
        const offsetX = this.anchorOffsetRatio * imgObj.currentWidth;
        const attachX = mouse.x + offsetX;
        const attachY = mouse.y + imgObj.currentHeight * config.current.attachOffsetY;

        this.points[0].setPos(attachX, attachY);

        const wallZoneHeight = height / 2;
        const step = wallZoneHeight / (this.total > 1 ? this.total - 1 : 1);
        const wallY = wallZoneHeight - this.index * step;

        const last = this.points[this.points.length - 1];
        last.setPos(width, wallY);

        for (let i = 0; i < this.points.length; i++) {
          this.points[i].update();
        }
        for (let j = 0; j < config.current.iterations; j++) {
          for (let i = 0; i < this.sticks.length; i++) {
            this.sticks[i].update();
          }
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.strokeStyle = config.current.wireColor;
        ctx.lineWidth = this.thickness;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        ctx.moveTo(this.points[0].x, this.points[0].y);
        for (let i = 1; i < this.points.length; i++) {
          ctx.lineTo(this.points[i].x, this.points[i].y);
        }
        ctx.stroke();
      }
    }

    let wires: Wire[] = [];

    function initScene() {
      resize();
      wires = [];
      for (let i = 0; i < config.current.wireCount; i++) {
        wires.push(new Wire(i, config.current.wireCount));
      }
    }

    let animationFrameId: number;

    function loop() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      wires.forEach((wire) => {
        wire.update();
        wire.draw();
      });

      if (imgObj.loaded) {
        const w = imgObj.currentWidth;
        const h = imgObj.currentHeight;
        ctx.drawImage(imgObj.element, mouse.x - w / 2, mouse.y - h / 2, w, h);
      }

      animationFrameId = requestAnimationFrame(loop);
    }

    function resize() {
      if (!containerRef.current || !canvas) return;
      width = canvas.width = containerRef.current.clientWidth;
      height = canvas.height = containerRef.current.clientHeight;
    }

    const handleResize = () => {
      resize();
      wires.forEach((w) => w.initWire());
    };

    window.addEventListener('resize', handleResize);

    const handleMove = (x: number, y: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouse.x = x - rect.left;
      mouse.y = y - rect.top;
    };

    const handleMouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY);
    const handleTouchMove = (e: TouchEvent) => {
      handleMove(e.touches[0].clientX, e.touches[0].clientY);
      // e.preventDefault(); // Removed to allow scrolling if needed, or keep if it's a full screen section
    };

    if (containerRef.current) {
      containerRef.current.addEventListener('mousemove', handleMouseMove);
      containerRef.current.addEventListener('touchmove', handleTouchMove, { passive: false });
    }

    resize();
    loop();

    // Expose update functions for React state changes
    (window as any).updateCanvasConfig = (newConfig: any) => {
      const oldWireCount = config.current.wireCount;
      const oldSegLength = config.current.segmentLength;
      
      config.current = { ...config.current, ...newConfig };
      
      if (newConfig.imgScale !== undefined) {
        updateImageSize();
      }
      
      if (newConfig.wireCount !== undefined && newConfig.wireCount !== oldWireCount) {
        initScene();
      } else if (newConfig.segmentLength !== undefined && newConfig.segmentLength !== oldSegLength) {
        wires.forEach(w => w.initWire());
      }
    };

    (window as any).updateCanvasImage = (src: string) => {
      const temp = new Image();
      temp.onload = function() {
          imgObj.element.src = temp.src;
          imgObj.baseWidth = temp.width;
          imgObj.baseHeight = temp.height;
          updateImageSize();
          initScene();
      }
      temp.src = src;
    };

    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current) {
        containerRef.current.removeEventListener('mousemove', handleMouseMove);
        containerRef.current.removeEventListener('touchmove', handleTouchMove);
      }
      cancelAnimationFrame(animationFrameId);
      delete (window as any).updateCanvasConfig;
      delete (window as any).updateCanvasImage;
    };
  }, []);

  const handleConfigChange = (key: string, value: any) => {
    setUiState(prev => ({ ...prev, [key]: value }));
    if ((window as any).updateCanvasConfig) {
      (window as any).updateCanvasConfig({ [key]: value });
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, isBg: boolean) => {
    if (!e.target.files?.[0]) return;
    const reader = new FileReader();
    reader.onload = function(event) {
      if (event.target?.result) {
        if (isBg) {
          handleConfigChange('bgImage', event.target.result as string);
        } else {
          if ((window as any).updateCanvasImage) {
            (window as any).updateCanvasImage(event.target.result as string);
          }
        }
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 z-0 overflow-hidden"
      style={{
        backgroundColor: uiState.bgColor,
        backgroundImage: config.current.bgImage ? `url('${config.current.bgImage}')` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        transition: 'background-color 0.2s',
      }}
    >
      <canvas 
        ref={canvasRef} 
        className="block w-full h-full"
        style={{ cursor: 'none' }}
      />

      {/* Overlay to ensure text readability */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-charcoal/30 backdrop-blur-[1px]" />

      {/* Show Button */}
      {!showControls && (
        <button 
          onClick={() => setShowControls(true)}
          className="absolute bottom-5 right-5 px-5 py-2.5 bg-white/90 border border-black/10 rounded-lg cursor-pointer font-semibold text-gray-800 shadow-[0_4px_10px_rgba(0,0,0,0.1)] transition-all hover:-translate-y-0.5 hover:bg-white z-50"
        >
          Settings
        </button>
      )}

      {/* Settings Panel */}
      {showControls && (
        <div className="absolute bottom-5 right-5 w-[340px] max-h-[85vh] overflow-y-auto bg-white/95 p-5 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.25)] backdrop-blur-md select-none border border-white/60 z-50 animate-in slide-in-from-bottom-5">
          <div className="flex justify-between items-center mb-4 border-b border-gray-200 pb-2.5">
            <h3 className="m-0 text-base uppercase tracking-wider text-gray-900 font-bold">Configuration</h3>
            <button 
              onClick={() => setShowControls(false)}
              className="bg-gray-100 border-none px-3 py-1.5 rounded cursor-pointer text-xs font-bold text-gray-600 transition-colors hover:bg-gray-200 hover:text-black"
            >
              Hide
            </button>
          </div>
          
          {/* Colors */}
          <div className="flex justify-between gap-2.5 mb-4">
            <div className="flex-1">
              <label className="flex justify-between text-[13px] mb-1 font-semibold text-gray-800">BG Color</label>
              <input 
                type="color" 
                value={uiState.bgColor}
                onChange={(e) => handleConfigChange('bgColor', e.target.value)}
                className="w-full h-[30px] border border-gray-300 rounded cursor-pointer bg-transparent p-0.5"
              />
            </div>
            <div className="flex-1">
              <label className="flex justify-between text-[13px] mb-1 font-semibold text-gray-800">Wire Color</label>
              <input 
                type="color" 
                value={uiState.wireColor}
                onChange={(e) => handleConfigChange('wireColor', e.target.value)}
                className="w-full h-[30px] border border-gray-300 rounded cursor-pointer bg-transparent p-0.5"
              />
            </div>
          </div>

          {/* Background Image */}
          <div className="mb-4 flex flex-col">
            <label className="flex justify-between text-[13px] mb-1 font-semibold text-gray-800">BG Image (Cover):</label>
            <input 
              type="file" 
              accept="image/*"
              onChange={(e) => handleImageUpload(e, true)}
              className="text-[11px] w-full text-gray-600"
            />
          </div>

          <div className="h-px bg-gray-200 my-4"></div>

          {/* Cursor Object */}
          <div className="mb-4 flex flex-col">
            <label className="flex justify-between text-[13px] mb-1 font-semibold text-gray-800">Cursor Image:</label>
            <input 
              type="file" 
              accept="image/*"
              onChange={(e) => handleImageUpload(e, false)}
              className="text-[11px] w-full text-gray-600"
            />
          </div>

          <div className="mb-4 flex flex-col">
            <label className="flex justify-between text-[13px] mb-1 font-semibold text-gray-800">
              Size Scale: <span>{Math.round(uiState.imgScale * 100)}%</span>
            </label>
            <input 
              type="range" 
              min="0.2" max="3" step="0.1" 
              value={uiState.imgScale}
              onChange={(e) => handleConfigChange('imgScale', parseFloat(e.target.value))}
              className="w-full cursor-pointer h-1.5 bg-gray-300 rounded-full appearance-none accent-gray-800"
            />
          </div>

          <div className="mb-4 flex flex-col">
            <label className="flex justify-between text-[13px] mb-1 font-semibold text-gray-800">
              Connection Y: <span>{uiState.attachOffset === 0.5 ? 'Bottom' : uiState.attachOffset === 0 ? 'Center' : uiState.attachOffset === -0.5 ? 'Top' : Math.round(uiState.attachOffset * 100) + '%'}</span>
            </label>
            <input 
              type="range" 
              min="-0.5" max="0.5" step="0.05" 
              value={uiState.attachOffset}
              onChange={(e) => handleConfigChange('attachOffset', parseFloat(e.target.value))}
              className="w-full cursor-pointer h-1.5 bg-gray-300 rounded-full appearance-none accent-gray-800"
            />
          </div>

          <div className="h-px bg-gray-200 my-4"></div>

          {/* Physics */}
          <div className="mb-4 flex flex-col">
            <label className="flex justify-between text-[13px] mb-1 font-semibold text-gray-800">
              Wire Count: <span>{uiState.wireCount}</span>
            </label>
            <input 
              type="range" 
              min="5" max="100" step="1" 
              value={uiState.wireCount}
              onChange={(e) => handleConfigChange('wireCount', parseInt(e.target.value))}
              className="w-full cursor-pointer h-1.5 bg-gray-300 rounded-full appearance-none accent-gray-800"
            />
          </div>

          <div className="mb-4 flex flex-col">
            <label className="flex justify-between text-[13px] mb-1 font-semibold text-gray-800">
              Gravity: <span>{uiState.gravity}</span>
            </label>
            <input 
              type="range" 
              min="0.1" max="2" step="0.1" 
              value={uiState.gravity}
              onChange={(e) => handleConfigChange('gravity', parseFloat(e.target.value))}
              className="w-full cursor-pointer h-1.5 bg-gray-300 rounded-full appearance-none accent-gray-800"
            />
          </div>

          <div className="mb-4 flex flex-col">
            <label className="flex justify-between text-[13px] mb-1 font-semibold text-gray-800">
              Segment Length: <span>{uiState.segmentLength}</span>
            </label>
            <input 
              type="range" 
              min="5" max="40" step="1" 
              value={uiState.segmentLength}
              onChange={(e) => handleConfigChange('segmentLength', parseInt(e.target.value))}
              className="w-full cursor-pointer h-1.5 bg-gray-300 rounded-full appearance-none accent-gray-800"
            />
          </div>
          
          <div className="mb-4 flex flex-col">
            <label className="flex justify-between text-[13px] mb-1 font-semibold text-gray-800">
              Friction (Air): <span>{uiState.friction}</span>
            </label>
            <input 
              type="range" 
              min="0.90" max="0.999" step="0.001" 
              value={uiState.friction}
              onChange={(e) => handleConfigChange('friction', parseFloat(e.target.value))}
              className="w-full cursor-pointer h-1.5 bg-gray-300 rounded-full appearance-none accent-gray-800"
            />
          </div>
        </div>
      )}
    </div>
  );
}
