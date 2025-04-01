
import React from 'react';

interface Props {
  variant?: 'grid' | 'circuit' | 'dots';
  color?: string;
}

export default function SectionBackground({ variant = 'grid', color = 'red' }: Props) {
  const baseColor = color === 'red' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(255, 255, 255, 0.1)';
  
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
