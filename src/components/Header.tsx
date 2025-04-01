
import React, { useState } from 'react';
import { Menu, X } from "lucide-react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-black via-red-900/20 to-black border-b border-red-500/20 shadow-lg fixed w-full z-50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-wrap items-center justify-between">
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
          <div className="relative group transform transition-all hover:scale-105">
            <div className="absolute inset-0 bg-red-500/20 rounded-lg blur group-hover:bg-red-500/30"></div>
            <img src="../ksit logo nobg.jpeg.png" alt="KSIT LOGO" className="w-16 h-16 sm:w-20 sm:h-20 relative z-10" />
          </div>
          <div className="transform transition-all hover:scale-105">
            <h1 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-300">K. S. Institute of Technology</h1>
            <p className="text-xs text-gray-300">Department of Computer Science</p>
          </div>
          <div className="relative group transform transition-all hover:scale-105">
            <div className="absolute inset-0 bg-red-500/20 rounded-lg blur group-hover:bg-red-500/30"></div>
            <img src="../25yrs.png" alt="25 Years Logo" className="w-16 h-16 sm:w-20 sm:h-20 relative z-10" />
          </div>
          
          <button 
            className="sm:hidden text-white focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        <nav
          className={`${
            menuOpen ? "flex" : "hidden"
          } sm:flex flex-col sm:flex-row gap-4 text-sm w-full sm:w-auto mt-3 sm:mt-0 text-center`}
        >
          {["Home", "Timer", "About", "Prizes", "Rules", "FAQs", "Sponsors", "Register"].map((item, idx) => (
            <a
              key={idx}
              href={`#${item.toLowerCase()}`}
              className="hover:text-red-500 transition-colors text-white hover:scale-105 transform transition-all px-4 py-2 rounded-lg hover:bg-red-500/10"
            >
              {item}
            </a>
          ))}
        </nav>
      </div>
      
      <div className="bg-black/50 py-2 text-center text-xs text-white">
        <p>In Association with Firefox Club & AICTE SPICES | Presents</p>
      </div>
    </header>
  );
}
