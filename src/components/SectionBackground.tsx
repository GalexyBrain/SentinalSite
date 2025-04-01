
import React, { useEffect, useRef } from 'react';

interface Props {
  variant?: 'grid' | 'circuit' | 'dots' | 'particles';
  color?: string;
}

interface Particle {
  x: number;
  y: number;
  radius: number;
  color: string;
  speedX: number;
  speedY: number;
}

export default function SectionBackground({ variant = 'grid', color = 'red' }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const baseColor = color === 'red' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(255, 255, 255, 0.1)';
  const particles: Particle[] = [];
  let animationFrameId: number;
  let mouseX = 0;
  let mouseY = 0;

  useEffect(() => {
    if (variant === 'particles') {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const handleResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };

      const handleMouseMove = (e: MouseEvent) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
      };

      // Initialize particles
      const initParticles = () => {
        for (let i = 0; i < 100; i++) {
          particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 2 + 1,
            color: `rgba(239, 68, 68, ${Math.random() * 0.5 + 0.2})`,
            speedX: (Math.random() - 0.5) * 2,
            speedY: (Math.random() - 0.5) * 2
          });
        }
      };

      // Animation loop
      const animate = () => {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        particles.forEach((particle) => {
          // Update particle position
          particle.x += particle.speedX;
          particle.y += particle.speedY;

          // Mouse interaction
          const dx = mouseX - particle.x;
          const dy = mouseY - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 100) {
            const angle = Math.atan2(dy, dx);
            particle.x -= Math.cos(angle) * 1;
            particle.y -= Math.sin(angle) * 1;
          }

          // Bounce off walls
          if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
          if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;

          // Draw particle
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
          ctx.fillStyle = particle.color;
          ctx.fill();

          // Draw connections
          particles.forEach((otherParticle) => {
            const dx = particle.x - otherParticle.x;
            const dy = particle.y - otherParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
              ctx.beginPath();
              ctx.strokeStyle = `rgba(239, 68, 68, ${0.2 - distance / 500})`;
              ctx.lineWidth = 0.5;
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              ctx.stroke();
            }
          });
        });

        animationFrameId = requestAnimationFrame(animate);
      };

      handleResize();
      window.addEventListener('resize', handleResize);
      window.addEventListener('mousemove', handleMouseMove);
      initParticles();
      animate();

      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('mousemove', handleMouseMove);
        cancelAnimationFrame(animationFrameId);
      };
    }
  }, [variant]);

  if (variant === 'particles') {
    return (
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: 0.6 }}
      />
    );
  }

  switch (variant) {
    case 'circuit':
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
          <div className="absolute w-full h-full" style={{
            backgroundImage: `
              radial-gradient(${baseColor} 1px, transparent 1px),
              linear-gradient(to right, ${baseColor} 1px, transparent 1px),
              linear-gradient(to bottom, ${baseColor} 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px, 60px 60px, 60px 60px',
            transform: 'rotate(45deg) scale(2)',
          }}/>
        </div>
      );
    
    case 'dots':
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
          <div className="absolute w-full h-full" style={{
            backgroundImage: `radial-gradient(${baseColor} 1px, transparent 1px)`,
            backgroundSize: '30px 30px',
          }}/>
        </div>
      );
    
    default:
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
          <div className="absolute w-full h-full" style={{
            backgroundImage: `linear-gradient(to right, ${baseColor} 1px, transparent 1px),
              linear-gradient(to bottom, ${baseColor} 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}/>
        </div>
      );
  }
}
