import { useEffect, useRef } from 'react';

export default function TimeWarp() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const c = canvas.getContext('2d');
    if (!c) return;

    let animationFrameId: number;
    let particleCount = 750;
    let mouse = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };
    let isMouseDown = false;
    let timer = 0;
    let opacity = 1;
    let speed = 0.0005;
    let colors = [
      "#0952BD",
      "#A5BFF0",
      "#118CD6",
      "#1AAEE8",
      "#F2E8C9"
    ];

    class LightParticle {
      x: number;
      y: number;
      radius: number;
      color: string;

      constructor(x: number, y: number, radius: number, color: string) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
      }

      update() {
        this.draw();
      }

      draw() {
        if (!c) return;
        c.save();
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.shadowColor = this.color;
        c.shadowBlur = 15;
        c.shadowOffsetX = 0;
        c.shadowOffsetY = 0;
        c.fillStyle = this.color;
        c.fill();
        c.closePath();
        c.restore();
      }
    }

    let lightParticles: LightParticle[] = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      lightParticles = [];
      initializeParticles();
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = event.clientX - canvas.width / 2;
      mouse.y = event.clientY - canvas.height / 2;
    };

    const handleMouseDown = () => {
      isMouseDown = true;
    };

    const handleMouseUp = () => {
      isMouseDown = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    
    // For touch devices
    window.addEventListener("touchstart", handleMouseDown);
    window.addEventListener("touchend", handleMouseUp);

    function initializeParticles() {
      if (!canvas) return;
      for (let i = 0; i < particleCount; i++) {
        let randomColorIndex = Math.floor(Math.random() * colors.length);
        let randomRadius = Math.random() * 2;

        // Ensure particles are spawned past screen width and height so
        // there will be no missing stars when rotating canvas
        let x = (Math.random() * (canvas.width + 200)) - (canvas.width + 200) / 2;
        let y = (Math.random() * (canvas.width + 200)) - (canvas.width + 200) / 2;
        lightParticles.push(new LightParticle(x, y, randomRadius, colors[randomColorIndex]));
      }
    }

    function animate() {
      animationFrameId = window.requestAnimationFrame(animate);
      if (!canvas || !c) return;

      c.save();
      if (isMouseDown) {
        // Ease into the new opacity
        let desiredOpacity = 0.01;
        opacity += (desiredOpacity - opacity) * 0.03;
        c.fillStyle = "rgba(0, 0, 0," + opacity + ")";

        // Ease into the new speed
        let desiredSpeed = 0.012;
        speed += (desiredSpeed - speed) * 0.01;
        timer += speed;
      } else {
        // Ease back to the original opacity
        let originalOpacity = 1;
        opacity += (originalOpacity - opacity) * 0.01;
        c.fillStyle = "rgba(0, 0, 0, " + opacity + ")";

        // Ease back to the original speed
        let originalSpeed = 0.001;
        speed += (originalSpeed - speed) * 0.01;
        timer += speed;
      }

      c.fillRect(0, 0, canvas.width, canvas.height);
      c.translate(canvas.width / 2, canvas.height / 2);
      c.rotate(timer);

      for (let i = 0; i < lightParticles.length; i++) {
        lightParticles[i].update();
      }

      c.restore();
    }

    initializeParticles();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchstart", handleMouseDown);
      window.removeEventListener("touchend", handleMouseUp);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-[#000000]">
      <canvas ref={canvasRef} className="block w-full h-full" />
      <p className="absolute top-24 left-4 sm:left-8 text-white/50 font-mono text-sm sm:text-base animate-pulse pointer-events-none z-10">
        Hold mouse down to enter time warp
      </p>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-charcoal/30 to-charcoal pointer-events-none z-10" />
    </div>
  );
}
