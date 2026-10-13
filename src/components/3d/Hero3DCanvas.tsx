import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Layers, RotateCcw, Cpu, Eye, ShieldAlert, Sparkles } from 'lucide-react';

interface Hero3DCanvasProps {
  onInteract?: () => void;
  className?: string;
  glbModelUrl?: string;
}

export default function Hero3DCanvas({ className = '', glbModelUrl }: Hero3DCanvasProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [wireframeMode, setWireframeMode] = useState(false);
  const [explodedMode, setExplodedMode] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [fps, setFps] = useState(60);

  // References to communicate with Three.js render loop
  const stateRef = useRef({
    wireframe: false,
    exploded: false,
    autoRotate: true,
  });

  useEffect(() => {
    stateRef.current.wireframe = wireframeMode;
    stateRef.current.exploded = explodedMode;
    stateRef.current.autoRotate = autoRotate;
  }, [wireframeMode, explodedMode, autoRotate]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth;
    let height = container.clientHeight;

    // 1. Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050608, 0.04);

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.2, 5.2);

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // 4. Lighting - Technical Studio Dark Rig
    const ambientLight = new THREE.AmbientLight(0x0a101d, 2.5);
    scene.add(ambientLight);

    const cyanKeyLight = new THREE.DirectionalLight(0x00e5ff, 4.0);
    cyanKeyLight.position.set(5, 6, 4);
    scene.add(cyanKeyLight);

    const amberFillLight = new THREE.DirectionalLight(0xf59e0b, 2.8);
    amberFillLight.position.set(-5, -3, -4);
    scene.add(amberFillLight);

    const rimLight = new THREE.PointLight(0x38bdf8, 3.5, 12);
    rimLight.position.set(0, 4, -3);
    scene.add(rimLight);

    // 5. Build Dark Metallic / Carbon Kinetic Twin Model
    const modelGroup = new THREE.Group();
    scene.add(modelGroup);

    // Carbon / Anodized Metallic Materials
    const darkCarbonMat = new THREE.MeshStandardMaterial({
      color: 0x12141a,
      metalness: 0.92,
      roughness: 0.22,
      wireframe: false,
    });

    const gunmetalMat = new THREE.MeshStandardMaterial({
      color: 0x222733,
      metalness: 0.88,
      roughness: 0.35,
    });

    const cyberCyanMat = new THREE.MeshStandardMaterial({
      color: 0x002b36,
      emissive: 0x00e5ff,
      emissiveIntensity: 0.7,
      metalness: 0.8,
      roughness: 0.2,
    });

    const cyberAmberMat = new THREE.MeshStandardMaterial({
      color: 0x2d1a00,
      emissive: 0xf59e0b,
      emissiveIntensity: 0.8,
      metalness: 0.7,
      roughness: 0.2,
    });

    const wireframeAccentMat = new THREE.MeshBasicMaterial({
      color: 0x00e5ff,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });

    // Mesh 1: Outer Kinetic Ring (Carbon composite)
    const outerRingGeo = new THREE.TorusGeometry(1.9, 0.05, 16, 64);
    const outerRing = new THREE.Mesh(outerRingGeo, darkCarbonMat);
    modelGroup.add(outerRing);

    // Wireframe overlay for outer ring
    const outerRingWire = new THREE.Mesh(outerRingGeo, wireframeAccentMat);
    outerRing.add(outerRingWire);

    // Mesh 2: Mid Precision Gimbal Ring (Titanium/Cyan)
    const midRingGeo = new THREE.TorusGeometry(1.45, 0.045, 16, 48);
    const midRing = new THREE.Mesh(midRingGeo, gunmetalMat);
    modelGroup.add(midRing);

    // Mesh 3: Inner Orbital Ring (Amber accents)
    const innerRingGeo = new THREE.TorusGeometry(1.05, 0.04, 16, 36);
    const innerRing = new THREE.Mesh(innerRingGeo, cyberAmberMat);
    modelGroup.add(innerRing);

    // Mesh 4: Central Machined Faceted Core (Icosahedron Digital Twin Reactor)
    const coreGeo = new THREE.IcosahedronGeometry(0.68, 1);
    const core = new THREE.Mesh(coreGeo, darkCarbonMat);
    modelGroup.add(core);

    const coreWire = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.72, 1),
      new THREE.MeshBasicMaterial({
        color: 0x00e5ff,
        wireframe: true,
        transparent: true,
        opacity: 0.6,
      })
    );
    core.add(coreWire);

    // Central pulsing reactor sphere
    const reactorGeo = new THREE.SphereGeometry(0.32, 24, 24);
    const reactor = new THREE.Mesh(reactorGeo, cyberCyanMat);
    core.add(reactor);

    // Satellite Telemetry Sensor Nodes
    const satellites: THREE.Mesh[] = [];
    const satGeo = new THREE.OctahedronGeometry(0.08, 0);
    const satCount = 8;
    for (let i = 0; i < satCount; i++) {
      const angle = (i / satCount) * Math.PI * 2;
      const radius = 2.2;
      const sat = new THREE.Mesh(satGeo, i % 2 === 0 ? cyberCyanMat : cyberAmberMat);
      sat.position.set(Math.cos(angle) * radius, (Math.sin(i * 1.5) * 0.4), Math.sin(angle) * radius);
      modelGroup.add(sat);
      satellites.push(sat);
    }

    // Particle field around the viewport (Target budget < 100 particles for high FPS)
    const particlesGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(140 * 3);
    for (let i = 0; i < 140 * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 8;
      particlePositions[i + 1] = (Math.random() - 0.5) * 8;
      particlePositions[i + 2] = (Math.random() - 0.5) * 8;
    }
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particlesMat = new THREE.PointsMaterial({
      color: 0x00e5ff,
      size: 0.025,
      transparent: true,
      opacity: 0.45,
    });
    const particleSystem = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particleSystem);

    // Track all standard materials for toggling wireframe
    const standardMaterials = [darkCarbonMat, gunmetalMat, cyberCyanMat, cyberAmberMat];

    // 6. Interactive Orbit & Drag Handlers
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let targetRotationX = 0.2;
    let targetRotationY = 0.4;
    let currentRotationX = 0.2;
    let currentRotationY = 0.4;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      targetRotationY += deltaX * 0.008;
      targetRotationX += deltaY * 0.008;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        prevMouseX = e.touches[0].clientX;
        prevMouseY = e.touches[0].clientY;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - prevMouseX;
      const deltaY = e.touches[0].clientY - prevMouseY;
      targetRotationY += deltaX * 0.01;
      targetRotationX += deltaY * 0.01;
      prevMouseX = e.touches[0].clientX;
      prevMouseY = e.touches[0].clientY;
    };

    const onTouchEnd = () => {
      isDragging = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    domElement.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // 7. Window Resize Observer
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // 8. Animation & Render Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();
    let frameCount = 0;
    let lastFpsUpdate = performance.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // FPS tracking
      frameCount++;
      const now = performance.now();
      if (now - lastFpsUpdate >= 1000) {
        setFps(Math.round((frameCount * 1000) / (now - lastFpsUpdate)));
        frameCount = 0;
        lastFpsUpdate = now;
      }

      // Sync wireframe mode
      const isWire = stateRef.current.wireframe;
      standardMaterials.forEach((mat) => {
        if (mat.wireframe !== isWire) mat.wireframe = isWire;
      });

      // Handle Exploded Assembly Animation
      const targetExplodeDistance = stateRef.current.exploded ? 0.75 : 0;
      outerRing.position.z = THREE.MathUtils.lerp(outerRing.position.z, targetExplodeDistance * 1.4, 0.06);
      midRing.position.z = THREE.MathUtils.lerp(midRing.position.z, -targetExplodeDistance * 1.1, 0.06);
      innerRing.position.y = THREE.MathUtils.lerp(innerRing.position.y, targetExplodeDistance * 0.9, 0.06);

      // Auto rotation & inertial damping
      if (stateRef.current.autoRotate && !isDragging) {
        targetRotationY += 0.0035;
      }

      currentRotationX = THREE.MathUtils.lerp(currentRotationX, targetRotationX, 0.08);
      currentRotationY = THREE.MathUtils.lerp(currentRotationY, targetRotationY, 0.08);

      modelGroup.rotation.x = currentRotationX;
      modelGroup.rotation.y = currentRotationY;

      // Gimbal sub-rotations
      outerRing.rotation.z = elapsedTime * 0.15;
      midRing.rotation.x = elapsedTime * 0.25;
      midRing.rotation.y = elapsedTime * 0.12;
      innerRing.rotation.z = -elapsedTime * 0.35;
      core.rotation.y = elapsedTime * 0.5;
      core.rotation.x = Math.sin(elapsedTime * 0.4) * 0.2;

      // Pulse reactor core
      const pulse = 1 + Math.sin(elapsedTime * 4) * 0.15;
      reactor.scale.set(pulse, pulse, pulse);
      cyberCyanMat.emissiveIntensity = 0.5 + Math.sin(elapsedTime * 3) * 0.3;

      // Orbit satellites
      satellites.forEach((sat, idx) => {
        const offset = (idx / satCount) * Math.PI * 2;
        const currentRadius = 2.2 + (stateRef.current.exploded ? 0.6 : 0);
        sat.position.x = Math.cos(elapsedTime * 0.6 + offset) * currentRadius;
        sat.position.z = Math.sin(elapsedTime * 0.6 + offset) * currentRadius;
        sat.position.y = Math.sin(elapsedTime * 1.2 + idx) * 0.5;
        sat.rotation.x += 0.02;
        sat.rotation.y += 0.03;
      });

      // Gentle drift for background particles
      particleSystem.rotation.y = elapsedTime * 0.02;

      renderer.render(scene, camera);
    };

    animate();

    // 9. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      domElement.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      domElement.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);

      if (container.contains(domElement)) {
        container.removeChild(domElement);
      }

      // Dispose geometries and materials
      [outerRingGeo, midRingGeo, innerRingGeo, coreGeo, reactorGeo, satGeo, particlesGeo].forEach(
        (g) => g.dispose()
      );
      [
        darkCarbonMat,
        gunmetalMat,
        cyberCyanMat,
        cyberAmberMat,
        wireframeAccentMat,
        particlesMat,
      ].forEach((m) => m.dispose());
      renderer.dispose();
    };
  }, []);

  return (
    <div className={`relative w-full h-full select-none ${className}`}>
      {/* 3D Canvas Mount Point */}
      <div
        ref={mountRef}
        className="w-full h-full cursor-grab active:cursor-grabbing touch-none"
        title="Interactive 3D Digital Twin Viewport (Drag to orbit, scroll to zoom)"
      />

      {/* High-Tech Telemetry HUD Overlays */}
      <div className="absolute top-4 left-4 pointer-events-none z-10 flex flex-col gap-1.5 font-mono text-[11px] text-silver/60">
        <div className="flex items-center gap-2 px-2.5 py-1 rounded bg-black/60 border border-cyan/30 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-cyan animate-pulse shadow-[0_0_8px_#00e5ff]" />
          <span className="text-cyan font-bold tracking-wider">TWIN VIEWPORT // ONLINE</span>
        </div>
        <div className="flex items-center gap-3 px-2 py-0.5 text-[10px] text-silver/50 tracking-tight">
          <span>SPEC: CAD-STD / 60FPS</span>
          <span>•</span>
          <span>EST. BUDGET: 0.82MB</span>
          <span>•</span>
          <span className="text-cyan font-medium">FPS: {fps}</span>
        </div>
      </div>

      <div className="absolute bottom-4 right-4 pointer-events-auto z-10 flex items-center gap-2">
        {/* Interactive Viewport Controls */}
        <button
          onClick={() => setWireframeMode(!wireframeMode)}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono tracking-wider flex items-center gap-1.5 transition-all border backdrop-blur-md ${
            wireframeMode
              ? 'bg-cyan/20 border-cyan text-cyan shadow-[0_0_12px_rgba(0,229,255,0.3)]'
              : 'bg-black/60 border-white/10 text-silver/70 hover:text-cyan hover:border-cyan/40'
          }`}
          title="Toggle Wireframe Schematic Layer"
        >
          <Layers className="w-3.5 h-3.5" />
          <span>{wireframeMode ? 'SOLID' : 'WIREFRAME'}</span>
        </button>

        <button
          onClick={() => setExplodedMode(!explodedMode)}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono tracking-wider flex items-center gap-1.5 transition-all border backdrop-blur-md ${
            explodedMode
              ? 'bg-amber-500/20 border-amber-500 text-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.3)]'
              : 'bg-black/60 border-white/10 text-silver/70 hover:text-amber-400 hover:border-amber-400/40'
          }`}
          title="Toggle Exploded Assembly Mode"
        >
          <Cpu className="w-3.5 h-3.5" />
          <span>{explodedMode ? 'COLLAPSE' : 'EXPLODE'}</span>
        </button>

        <button
          onClick={() => setAutoRotate(!autoRotate)}
          className={`p-2 rounded-lg text-xs font-mono transition-all border backdrop-blur-md ${
            autoRotate
              ? 'bg-cyan/10 border-cyan/30 text-cyan'
              : 'bg-black/60 border-white/10 text-silver/50 hover:text-white'
          }`}
          title="Toggle Auto Rotation Orbit"
        >
          <RotateCcw className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
        </button>
      </div>

      {/* Orbit Interaction Hint */}
      <div className="absolute bottom-4 left-4 pointer-events-none z-10 hidden sm:flex items-center gap-2 font-mono text-[10px] text-silver/40">
        <Eye className="w-3 h-3 text-cyan/70" />
        <span>CLICK & DRAG TO ORBIT SIMULATOR</span>
      </div>
    </div>
  );
}
