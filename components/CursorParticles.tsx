'use client'

import { useEffect, useRef } from 'react';

const PARTICLE_COLORS = [
  'rgba(79,195,247,0.7)', // blue
  'rgba(245,0,87,0.6)',   // pink
  'rgba(167,255,235,0.5)',// teal
  'rgba(255,255,255,0.7)',// white
];

function randomColor() {
  return PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)];
}

export default function CursorParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const particles = useRef<any[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      // Add a new particle at the cursor
      particles.current.push({
        x: e.clientX,
        y: e.clientY,
        radius: 7 + Math.random() * 6,
        color: randomColor(),
        alpha: 1,
        life: 0,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    function drawCursor() {
      if (!ctx) return;
      ctx.save();
      ctx.beginPath();
      ctx.arc(mouse.current.x, mouse.current.y, 12, 0, 2 * Math.PI);
      ctx.shadowColor = 'rgba(79,195,247,0.7)';
      ctx.shadowBlur = 16;
      ctx.fillStyle = 'rgba(79,195,247,0.7)';
      ctx.fill();
      ctx.restore();
    }

    function animate() {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Draw particles
      for (let i = 0; i < particles.current.length; i++) {
        const p = particles.current[i];
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.restore();
        // Animate
        p.radius *= 0.97;
        p.alpha *= 0.94;
        p.y -= 0.5 + Math.random();
        p.life++;
      }
      // Remove faded particles
      particles.current = particles.current.filter((p) => p.alpha > 0.05 && p.radius > 1);
      // Draw custom cursor
      drawCursor();
      animationId = requestAnimationFrame(animate);
    }
    animate();
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  // Hide the default cursor
  useEffect(() => {
    document.body.style.cursor = 'none';
    return () => {
      document.body.style.cursor = '';
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    />
  );
} 