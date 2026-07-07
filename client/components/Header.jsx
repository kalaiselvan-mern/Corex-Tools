import React from 'react';

export default function Header() {
  return (
    <header className="w-full bg-[#050505] border-b border-gray-800 py-8 px-4 text-center flex flex-col items-center">
      <h1 className="text-4xl font-extrabold text-white tracking-widest uppercase">
        CoreX <span className="text-cyan-400">Tools</span> 🚀 
      </h1>
      <span className="text-gray-500 text-xs mt-1 font-mono">v1.0.0</span>
      
      <p className="text-gray-400 mt-4 font-medium text-lg tracking-wide border-t border-gray-800 pt-4 w-full max-w-sm">
        Crafted by Kalai Creative Studio
      </p>
    </header>
  );
}