import React, { useEffect, useRef } from 'react';

interface Props {
  variant?: 'gradient' | 'grid' | 'dots' | 'morph';
  color?: string;
  intensity?: 'low' | 'medium' | 'high';
}

export default function SectionBackground({ variant = 'gradient', color = 'red' }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const gradientRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (variant === 'gradient') {
      const container = containerRef.current;
      const gradient = gradientRef.current;
      if (!container || !gradient) return;

      const handleMouseMove = (e: MouseEvent) => {
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const xPercent = (x / rect.width) * 100;
        const yPercent = (y / rect.height) * 100;

        gradient.style.setProperty('--mouse-x', `${xPercent}%`);
        gradient.style.setProperty('--mouse-y', `${yPercent}%`);
      };

      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, [variant]);

  if (variant === 'gradient') {
    return (
      <div ref={containerRef} className="absolute inset-0 overflow-hidden">
        <div
          ref={gradientRef}
          className="absolute inset-0 transition-transform duration-500 ease-out"
          style={{
            background: `radial-gradient(
              circle 800px at var(--mouse-x, 50%) var(--mouse-y, 50%),
              rgba(239, 68, 68, 0.07),
              rgba(239, 68, 68, 0.03),
              transparent
            )`,
            opacity: 0.8,
            transform: 'translate3d(0, 0, 0)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(
              45deg,
              rgba(239, 68, 68, 0.03) 0%,
              rgba(0, 0, 0, 0) 100%
            )`,
            backgroundSize: '200% 200%',
            animation: 'gradientFlow 15s ease infinite',
          }}
        />
      </div>
    );
  }

  const baseColor = color === 'red' ? 'rgba(239, 68, 68, 0.05)' : 'rgba(255, 255, 255, 0.05)';

  if (variant === 'morph') {
    return (
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-black/30" />
        <div className="absolute inset-0" style={{
          background: `
            radial-gradient(circle at 50% 50%, rgba(239, 68, 68, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 0% 0%, rgba(239, 68, 68, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 100% 0%, rgba(0, 0, 0, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 0% 100%, rgba(239, 68, 68, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 100% 100%, rgba(0, 0, 0, 0.1) 0%, transparent 50%)
          `,
          filter: 'blur(80px)',
          opacity: 0.7,
          animation: 'morphBackground 20s ease-in-out infinite'
        }} />
        <div className="absolute inset-0 backdrop-blur-[100px]" />
      </div>
    );
  }

  switch (variant) {
    case 'dots':
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-full h-full" style={{
            backgroundImage: `radial-gradient(${baseColor} 1px, transparent 1px)`,
            backgroundSize: '30px 30px',
          }}/>
        </div>
      );

    default:
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-full h-full" style={{
            backgroundImage: `linear-gradient(to right, ${baseColor} 1px, transparent 1px),
              linear-gradient(to bottom, ${baseColor} 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}/>
        </div>
      );
  }
}