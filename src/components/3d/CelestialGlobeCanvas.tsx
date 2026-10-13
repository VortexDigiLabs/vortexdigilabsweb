import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Activity, Radio, Cpu, Layers } from 'lucide-react';

interface CelestialGlobeProps {
  className?: string;
}

export default function CelestialGlobeCanvas({ className = '' }: CelestialGlobeProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [fps, setFps] = useState(60);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth;
    let height = container.clientHeight;

    // 1. Scene setup
    const scene = new THREE.Scene();

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0.8, 6.2);

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // 4. Lighting Rig
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const bluePoint = new THREE.PointLight(0x00b6ff, 3.5, 12);
    bluePoint.position.set(-3, 2, 3);
    scene.add(bluePoint);

    const crimsonPoint = new THREE.PointLight(0xff2e2e, 4.0, 12);
    crimsonPoint.position.set(3, -1, 3);
    scene.add(crimsonPoint);

    // 5. Build Celestial Particle Globe
    const globeGroup = new THREE.Group();
    // Tilted axial rotation matching image_9.png
    globeGroup.rotation.z = THREE.MathUtils.degToRad(-18);
    globeGroup.rotation.x = THREE.MathUtils.degToRad(12);
    scene.add(globeGroup);

    // A. Point-Cloud Sphere (Stellar dots)
    const sphereRadius = 1.7;
    const particleCount = 2800;
    const spherePositions = new Float32Array(particleCount * 3);
    const sphereColors = new Float32Array(particleCount * 3);

    const colorWhite = new THREE.Color(0xffffff);
    const colorCyan = new THREE.Color(0x00b6ff);
    const colorCrimson = new THREE.Color(0xff2e2e);

    for (let i = 0; i < particleCount; i++) {
      // Fibonacci sphere distribution for uniform spherical coverage
      const phi = Math.acos(1 - (2 * (i + 0.5)) / particleCount);
      const theta = Math.PI * (1 + 5 ** 0.5) * i;

      // Add slight radial variation for atmospheric depth
      const r = sphereRadius + (Math.random() - 0.5) * 0.08;
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      spherePositions[i * 3] = x;
      spherePositions[i * 3 + 1] = y;
      spherePositions[i * 3 + 2] = z;

      // Gradient color mapping: Cyan on one pole/hemisphere, White in center, Crimson on other
      let vertexColor = colorWhite;
      if (x + z < -0.6) {
        vertexColor = colorCyan;
      } else if (x + z > 0.6) {
        vertexColor = colorCrimson;
      }

      sphereColors[i * 3] = vertexColor.r;
      sphereColors[i * 3 + 1] = vertexColor.g;
      sphereColors[i * 3 + 2] = vertexColor.b;
    }

    const sphereGeometry = new THREE.BufferGeometry();
    sphereGeometry.setAttribute('position', new THREE.BufferAttribute(spherePositions, 3));
    sphereGeometry.setAttribute('color', new THREE.BufferAttribute(sphereColors, 3));

    const sphereMaterial = new THREE.PointsMaterial({
      size: 0.038,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
    });

    const spherePoints = new THREE.Points(sphereGeometry, sphereMaterial);
    globeGroup.add(spherePoints);

    // B. Inner Translucent Atmosphere Shell
    const shellGeo = new THREE.SphereGeometry(sphereRadius * 0.98, 32, 32);
    const shellMat = new THREE.MeshBasicMaterial({
      color: 0x050814,
      transparent: true,
      opacity: 0.55,
    });
    const shellMesh = new THREE.Mesh(shellGeo, shellMat);
    globeGroup.add(shellMesh);

    // C. Outer Glowing Rings / Elliptical Orbits (from image_9.png)
    // Ring 1: Inner Cyan / Blue Glowing Orbital Track
    const ring1Curve = new THREE.EllipseCurve(0, 0, 2.35, 2.35, 0, 2 * Math.PI, false, 0);
    const ring1Points = ring1Curve.getPoints(120);
    const ring1Geo = new THREE.BufferGeometry().setFromPoints(
      ring1Points.map((p) => new THREE.Vector3(p.x, 0, p.y))
    );
    const ring1Mat = new THREE.LineBasicMaterial({
      color: 0x00b6ff,
      transparent: true,
      opacity: 0.85,
      linewidth: 1.5,
    });
    const ring1 = new THREE.Line(ring1Geo, ring1Mat);
    ring1.rotation.x = THREE.MathUtils.degToRad(72);
    ring1.rotation.y = THREE.MathUtils.degToRad(-14);
    globeGroup.add(ring1);

    // Ring 2: Outer Crimson Red Glowing Orbital Track
    const ring2Curve = new THREE.EllipseCurve(0, 0, 2.75, 2.75, 0, 2 * Math.PI, false, 0);
    const ring2Points = ring2Curve.getPoints(140);
    const ring2Geo = new THREE.BufferGeometry().setFromPoints(
      ring2Points.map((p) => new THREE.Vector3(p.x, 0, p.y))
    );
    const ring2Mat = new THREE.LineBasicMaterial({
      color: 0xff2e2e,
      transparent: true,
      opacity: 0.9,
      linewidth: 2,
    });
    const ring2 = new THREE.Line(ring2Geo, ring2Mat);
    ring2.rotation.x = THREE.MathUtils.degToRad(78);
    ring2.rotation.y = THREE.MathUtils.degToRad(-10);
    globeGroup.add(ring2);

    // Ring 3: Fine Silver Harmonic Coordinate Track
    const ring3Curve = new THREE.EllipseCurve(0, 0, 3.1, 3.1, 0, 2 * Math.PI, false, 0);
    const ring3Points = ring3Curve.getPoints(160);
    const ring3Geo = new THREE.BufferGeometry().setFromPoints(
      ring3Points.map((p) => new THREE.Vector3(p.x, 0, p.y))
    );
    const ring3Mat = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.25,
    });
    const ring3 = new THREE.Line(ring3Geo, ring3Mat);
    ring3.rotation.x = THREE.MathUtils.degToRad(82);
    ring3.rotation.y = THREE.MathUtils.degToRad(-6);
    globeGroup.add(ring3);

    // D. Orbiting Telemetry Spark Satellites
    const satCount = 18;
    const satGeo = new THREE.SphereGeometry(0.04, 8, 8);
    const satMatBlue = new THREE.MeshBasicMaterial({ color: 0x00b6ff });
    const satMatCrimson = new THREE.MeshBasicMaterial({ color: 0xff2e2e });

    const satellites: { mesh: THREE.Mesh; orbitRadius: number; speed: number; angle: number; yOffset: number }[] = [];

    for (let s = 0; s < satCount; s++) {
      const isCrimson = s % 2 === 0;
      const mesh = new THREE.Mesh(satGeo, isCrimson ? satMatCrimson : satMatBlue);
      const orbitRadius = 2.1 + (s / satCount) * 1.0;
      const speed = 0.008 + (Math.random() * 0.006);
      const angle = (s / satCount) * Math.PI * 2;
      const yOffset = (Math.random() - 0.5) * 0.4;
      satellites.push({ mesh, orbitRadius, speed, angle, yOffset });
      globeGroup.add(mesh);
    }

    // 6. Interactive Drag / Tilt Controls
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let targetRotationY = 0;
    let targetRotationX = 0;
    let currentRotationY = 0;
    let currentRotationX = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      targetRotationY += deltaX * 0.007;
      targetRotationX += deltaY * 0.005;
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
      targetRotationY += deltaX * 0.009;
      targetRotationX += deltaY * 0.007;
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

    // 7. Resize Observer
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

    // 8. Animation Loop
    let animationFrameId: number;
    let frameCount = 0;
    let lastFpsTime = performance.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // FPS tracking
      frameCount++;
      const now = performance.now();
      if (now - lastFpsTime >= 1000) {
        setFps(Math.round((frameCount * 1000) / (now - lastFpsTime)));
        frameCount = 0;
        lastFpsTime = now;
      }

      // Smooth auto rotation
      if (!isDragging) {
        targetRotationY += 0.0035;
      }

      currentRotationY = THREE.MathUtils.lerp(currentRotationY, targetRotationY, 0.06);
      currentRotationX = THREE.MathUtils.lerp(currentRotationX, targetRotationX, 0.06);

      spherePoints.rotation.y = currentRotationY;
      spherePoints.rotation.x = currentRotationX;

      // Rotate orbital rings subtly
      ring1.rotation.z += 0.002;
      ring2.rotation.z -= 0.0025;

      // Update satellites
      satellites.forEach((sat) => {
        sat.angle += sat.speed;
        sat.mesh.position.x = Math.cos(sat.angle) * sat.orbitRadius;
        sat.mesh.position.z = Math.sin(sat.angle) * sat.orbitRadius;
        sat.mesh.position.y = Math.sin(sat.angle * 2) * sat.yOffset;
      });

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

      [sphereGeometry, shellGeo, ring1Geo, ring2Geo, ring3Geo, satGeo].forEach((g) => g.dispose());
      [sphereMaterial, shellMat, ring1Mat, ring2Mat, ring3Mat, satMatBlue, satMatCrimson].forEach((m) =>
        m.dispose()
      );
      renderer.dispose();
    };
  }, []);

  return (
    <div className={`relative w-full h-full select-none ${className}`}>
      {/* 3D WebGL Canvas */}
      <div
        ref={mountRef}
        className="w-full h-full cursor-grab active:cursor-grabbing touch-none"
        title="Interactive Celestial Particle Globe (Drag to orbit)"
      />

      {/* Floating Glass Telemetry Card 1: Top-Left (matching image_9.png) */}
      <div className="absolute top-6 left-6 pointer-events-none z-10 obsidian-glass-panel px-3.5 py-2.5 rounded-xl text-[11px] font-mono flex flex-col gap-1 shadow-lg border border-white/10">
        <div className="flex items-center gap-2">
          <span className="ping-blue" />
          <span className="text-white font-semibold">Twin Viewport // Online</span>
        </div>
        <div className="flex items-center gap-2 text-slate-400 text-[10px]">
          <Activity className="w-3 h-3 text-[#00B6FF]" />
          <span>Established: 11:50:40</span>
          <span>•</span>
          <span className="text-emerald-400">99.8%</span>
        </div>
      </div>

      {/* Floating Glass Telemetry Card 2: Bottom-Right (matching image_9.png) */}
      <div className="absolute bottom-6 right-6 pointer-events-none z-10 obsidian-glass-panel px-3.5 py-2.5 rounded-xl text-[11px] font-mono flex items-center gap-2.5 shadow-lg border border-white/10">
        <span className="ping-crimson" />
        <span className="text-slate-300">RENDER ENGINE: THREE.JS</span>
        <span className="text-white font-bold">{fps} FPS</span>
      </div>
    </div>
  );
}
