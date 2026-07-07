import React from 'react';
import { FaGithubSquare, FaInstagramSquare } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-gray-800 text-white text-center py-8 mt-auto w-full">
      <div className="flex justify-center items-center gap-6 mb-6">
        <a 
          href="https://github.com/kalaiselvan-mern" 
          target="_blank" 
          rel="noreferrer" 
          className="text-gray-500 hover:text-white transition-colors duration-300"
        >
          <FaGithubSquare size={32} />
        </a>
        <a 
          href="https://www.instagram.com/chellakutty_kalai" 
          target="_blank" 
          rel="noreferrer" 
          className="text-gray-500 hover:text-pink-500 transition-colors duration-300"
        >
          <FaInstagramSquare size={32} />
        </a>
      </div>
      
      <p className="text-sm font-light text-gray-500">
        © {new Date().getFullYear()} Kalai Creative Studio. All rights reserved.
      </p>
      <p className="text-xs text-gray-700 mt-2 font-mono">
        Built with React, Tailwind & FastAPI ⚡
      </p>
    </footer>
  );
}