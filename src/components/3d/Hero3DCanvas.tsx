import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Layers, RotateCcw, Cpu, Eye } from 'lucide-react';

interface Hero3DCanvasProps {
  onInteract?: () => void;
  className?: string;
}

export default function Hero3DCanvas({ className = '' }: Hero3DCanvasProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [wireframeMode, setWireframeMode] = useState(false);
  const [explodedMode, setExplodedMode] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [fps, setFps] = useState(60);

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

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.1, 5.2);

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
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // 4. Lighting Rig - High-Key Luminous Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.2);
    scene.add(ambientLight);

    const mainKeyLight = new THREE.DirectionalLight(0xffffff, 3.2);
    mainKeyLight.position.set(6, 8, 5);
    scene.add(mainKeyLight);

    // Electric Blue Key Light
    const blueLight = new THREE.DirectionalLight(0x00b6ff, 3.6);
    blueLight.position.set(-5, 4, 3);
    scene.add(blueLight);

    // Crimson Red Rim Light
    const crimsonRimLight = new THREE.PointLight(0xff1e43, 4.0, 14);
    crimsonRimLight.position.set(0, -3, -4);
    scene.add(crimsonRimLight);

    // Subtle Ground Bounce Light
    const groundBounce = new THREE.DirectionalLight(0xf1f5f9, 1.5);
    groundBounce.position.set(0, -6, 2);
    scene.add(groundBounce);

    // 5. Materials: Polished Chrome, Pearlescent White, Glowing Electric Blue & Crimson Red
    const chromeMat = new THREE.MeshStandardMaterial({
      color: 0xf1f5f9,
      metalness: 0.96,
      roughness: 0.12,
    });

    const pearlescentMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.2,
      roughness: 0.18,
    });

    const electricBlueMat = new THREE.MeshStandardMaterial({
      color: 0x0077b6,
      emissive: 0x00b6ff,
      emissiveIntensity: 0.85,
      metalness: 0.8,
      roughness: 0.15,
    });

    const crimsonRedMat = new THREE.MeshStandardMaterial({
      color: 0x99001f,
      emissive: 0xff1e43,
      emissiveIntensity: 0.9,
      metalness: 0.8,
      roughness: 0.15,
    });

    const wireframeAccentMat = new THREE.MeshBasicMaterial({
      color: 0x00b6ff,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });

    // 6. Build Luminous Kinetic Digital Twin Assembly
    const modelGroup = new THREE.Group();
    scene.add(modelGroup);

    // Mesh 1: Outer Chrome Gimbal Ring
    const outerRingGeo = new THREE.TorusGeometry(1.9, 0.05, 16, 64);
    const outerRing = new THREE.Mesh(outerRingGeo, chromeMat);
    modelGroup.add(outerRing);

    const outerRingWire = new THREE.Mesh(outerRingGeo, wireframeAccentMat);
    outerRing.add(outerRingWire);

    // Mesh 2: Mid Glowing Electric Blue Ring
    const midRingGeo = new THREE.TorusGeometry(1.45, 0.045, 16, 48);
    const midRing = new THREE.Mesh(midRingGeo, electricBlueMat);
    modelGroup.add(midRing);

    // Mesh 3: Inner Crimson Red Orbital Trajectory
    const innerRingGeo = new THREE.TorusGeometry(1.05, 0.04, 16, 36);
    const innerRing = new THREE.Mesh(innerRingGeo, crimsonRedMat);
    modelGroup.add(innerRing);

    // Mesh 4: Central Machined Faceted Chrome Cyber-Sphere (Icosahedron)
    const coreGeo = new THREE.IcosahedronGeometry(0.7, 1);
    const core = new THREE.Mesh(coreGeo, chromeMat);
    modelGroup.add(core);

    const coreWire = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.74, 1),
      new THREE.MeshBasicMaterial({
        color: 0xff1e43,
        wireframe: true,
        transparent: true,
        opacity: 0.5,
      })
    );
    core.add(coreWire);

    // Internal Dual-Tone Pulsing Core (Pearlescent Glass Sphere)
    const reactorGeo = new THREE.SphereGeometry(0.34, 24, 24);
    const reactor = new THREE.Mesh(reactorGeo, electricBlueMat);
    core.add(reactor);

    // Orbiting Satellite Telemetry Sensor Nodes (Electric Blue & Crimson)
    const satellites: THREE.Mesh[] = [];
    const satGeo = new THREE.OctahedronGeometry(0.08, 0);
    const satCount = 8;
    for (let i = 0; i < satCount; i++) {
      const angle = (i / satCount) * Math.PI * 2;
      const radius = 2.2;
      const sat = new THREE.Mesh(satGeo, i % 2 === 0 ? electricBlueMat : crimsonRedMat);
      sat.position.set(Math.cos(angle) * radius, Math.sin(i * 1.5) * 0.4, Math.sin(angle) * radius);
      modelGroup.add(sat);
      satellites.push(sat);
    }

    // Fine floating particle clusters in Electric Blue and Crimson
    const particlesGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(120 * 3);
    for (let i = 0; i < 120 * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 7;
      particlePositions[i + 1] = (Math.random() - 0.5) * 7;
      particlePositions[i + 2] = (Math.random() - 0.5) * 7;
    }
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particlesMat = new THREE.PointsMaterial({
      color: 0x00b6ff,
      size: 0.03,
      transparent: true,
      opacity: 0.6,
    });
    const particleSystem = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particleSystem);

    const standardMaterials = [chromeMat, pearlescentMat, electricBlueMat, crimsonRedMat];

    // 7. Interactive Orbit & Drag Handlers
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

    // 8. Resize Observer
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

    // 9. Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();
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

      // Exploded Assembly Mode
      const targetExplodeDistance = stateRef.current.exploded ? 0.75 : 0;
      outerRing.position.z = THREE.MathUtils.lerp(outerRing.position.z, targetExplodeDistance * 1.4, 0.06);
      midRing.position.z = THREE.MathUtils.lerp(midRing.position.z, -targetExplodeDistance * 1.1, 0.06);
      innerRing.position.y = THREE.MathUtils.lerp(innerRing.position.y, targetExplodeDistance * 0.9, 0.06);

      // Auto rotation
      if (stateRef.current.autoRotate && !isDragging) {
        targetRotationY += 0.004;
      }

      currentRotationX = THREE.MathUtils.lerp(currentRotationX, targetRotationX, 0.08);
      currentRotationY = THREE.MathUtils.lerp(currentRotationY, targetRotationY, 0.08);

      modelGroup.rotation.x = currentRotationX;
      modelGroup.rotation.y = currentRotationY;

      // Gimbal sub-rotations
      outerRing.rotation.z = elapsedTime * 0.18;
      midRing.rotation.x = elapsedTime * 0.28;
      midRing.rotation.y = elapsedTime * 0.15;
      innerRing.rotation.z = -elapsedTime * 0.38;
      core.rotation.y = elapsedTime * 0.55;
      core.rotation.x = Math.sin(elapsedTime * 0.4) * 0.2;

      // Pulse reactor core
      const pulse = 1 + Math.sin(elapsedTime * 4) * 0.15;
      reactor.scale.set(pulse, pulse, pulse);
      electricBlueMat.emissiveIntensity = 0.6 + Math.sin(elapsedTime * 3) * 0.35;
      crimsonRedMat.emissiveIntensity = 0.6 + Math.cos(elapsedTime * 3) * 0.35;

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

      particleSystem.rotation.y = elapsedTime * 0.025;

      renderer.render(scene, camera);
    };

    animate();

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

      [outerRingGeo, midRingGeo, innerRingGeo, coreGeo, reactorGeo, satGeo, particlesGeo].forEach((g) =>
        g.dispose()
      );
      [chromeMat, pearlescentMat, electricBlueMat, crimsonRedMat, wireframeAccentMat, particlesMat].forEach(
        (m) => m.dispose()
      );
      renderer.dispose();
    };
  }, []);

  return (
    <div className={`relative w-full h-full select-none ${className}`}>
      {/* 3D Canvas */}
      <div
        ref={mountRef}
        className="w-full h-full cursor-grab active:cursor-grabbing touch-none"
        title="Interactive 3D Chrome & Glass Twin (Drag to orbit)"
      />

      {/* Studio Viewport Telemetry Overlay */}
      <div className="absolute top-12 left-4 pointer-events-none z-10 flex items-center gap-2 px-2.5 py-1 rounded-md bg-white/90 border border-slate-200/90 text-slate-700 shadow-sm backdrop-blur-md text-[11px] font-mono">
        <span className="led-blue" />
        <span className="font-semibold text-slate-800">SPATIAL TWIN</span>
        <span className="text-slate-300">•</span>
        <span className="text-slate-500">{fps} FPS</span>
      </div>

      {/* Viewport Control Buttons */}
      <div className="absolute bottom-4 right-4 pointer-events-auto z-10 flex items-center gap-2">
        <button
          onClick={() => setWireframeMode(!wireframeMode)}
          className={`px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all border backdrop-blur-md cursor-pointer ${
            wireframeMode
              ? 'bg-slate-900 border-slate-900 text-white shadow-sm'
              : 'bg-white/90 border-slate-200 text-slate-700 hover:text-slate-900 hover:border-slate-300'
          }`}
          title="Toggle Wireframe Layer"
        >
          <Layers className="w-3.5 h-3.5" />
          <span>{wireframeMode ? 'Solid' : 'Wireframe'}</span>
        </button>

        <button
          onClick={() => setExplodedMode(!explodedMode)}
          className={`px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all border backdrop-blur-md cursor-pointer ${
            explodedMode
              ? 'bg-slate-900 border-slate-900 text-white shadow-sm'
              : 'bg-white/90 border-slate-200 text-slate-700 hover:text-slate-900 hover:border-slate-300'
          }`}
          title="Toggle Exploded Assembly Mode"
        >
          <Cpu className="w-3.5 h-3.5" />
          <span>{explodedMode ? 'Collapse' : 'Explode'}</span>
        </button>

        <button
          onClick={() => setAutoRotate(!autoRotate)}
          className={`p-1.5 rounded-lg text-xs transition-all border backdrop-blur-md cursor-pointer ${
            autoRotate
              ? 'bg-slate-100 border-slate-300 text-slate-800'
              : 'bg-white/90 border-slate-200 text-slate-400 hover:text-slate-700'
          }`}
          title="Toggle Orbit Rotation"
        >
          <RotateCcw
            className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin' : ''}`}
            style={{ animationDuration: '8s' }}
          />
        </button>
      </div>

      {/* Orbit Interaction Hint */}
      <div className="absolute bottom-4 left-4 pointer-events-none z-10 hidden sm:flex items-center gap-1.5 text-[11px] text-slate-400">
        <Eye className="w-3 h-3 text-slate-400" />
        <span>Drag to inspect 360°</span>
      </div>
    </div>
  );
}
