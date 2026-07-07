import { FaGithubSquare, FaInstagramSquare } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white text-center py-6 mt-auto w-full">
      <div className="flex justify-center items-center gap-4 mb-4">
        <a 
          href="https://github.com/kalaiselvan-mern" 
          target="_blank" 
          rel="noreferrer" 
          className="text-gray-400 hover:text-white transition-colors"
        >
          <FaGithubSquare size={32} />
        </a>
        <a 
          href="https://www.instagram.com/chellakutty_kalai" 
          target="_blank" 
          rel="noreferrer" 
          className="text-gray-400 hover:text-pink-500 transition-colors"
        >
          <FaInstagramSquare size={32} />
        </a>
      </div>
      
      <p className="text-sm md:text-base font-medium">
        © {new Date().getFullYear()} Kalai Creative Studio. All rights reserved.
      </p>
      <p className="text-xs text-gray-400 mt-2">
        Built with React, Tailwind CSS & FastAPI 🚀
      </p>
    </footer>
  );
}