
import React from 'react';
import { ChevronDown } from 'lucide-react';
import CountdownTimer from './CountdownTimer';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-radial from-red-500/20 via-transparent to-transparent animate-pulse"></div>
        <img 
          src="../headerbg.png" 
          alt="Background" 
          className="w-full h-full object-cover opacity-75"
          loading="lazy"
        />
      </div>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      <div className="relative z-10 text-center space-y-8 sm:space-y-12 px-4 max-w-6xl mx-auto">
        <div className="animate-float relative group">
          <div className="absolute inset-0 bg-red-500/20 rounded-full blur-xl group-hover:bg-red-500/30 transition-all"></div>
          <div className="relative w-24 sm:w-32 h-24 sm:h-32 mx-auto transform transition-transform group-hover:scale-110">
            <img
              src="../sentinel nobg.png"
              alt="Sentinel Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="text-4xl sm:text-7xl font-bold mt-4 sm:mt-8 animate-glow bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-red-400 to-red-600">
            SENTINEL HACK 5.0
          </h1>
          <p className="text-lg sm:text-2xl text-gray-300 mt-2 sm:mt-4 font-light tracking-wider">
            IF NOT NOW, WHEN?
          </p>
        </div>
        <CountdownTimer />
      </div>
      <div className="absolute bottom-4 sm:bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-6 h-6 sm:w-8 sm:h-8 text-red-500" />
      </div>
    </section>
  );
}
