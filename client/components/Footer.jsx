import { FaGithubSquare, FaInstagramSquare } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-800 bg-[#050505] py-8 text-center">
      <div className="flex justify-center gap-6 mb-4">
        <a href="https://github.com/kalaiselvan-mern" target="_blank" rel="noreferrer" className="text-gray-600 hover:text-cyan-400 transition-colors">
          <FaGithubSquare size={30} />
        </a>
        <a href="https://www.instagram.com/chellakutty_kalai" target="_blank" rel="noreferrer" className="text-gray-600 hover:text-pink-500 transition-colors">
          <FaInstagramSquare size={30} />
        </a>
      </div>
      <p className="text-gray-600 text-xs font-mono">
        © {new Date().getFullYear()} KALAI CREATIVE STUDIO
      </p>
    </footer>
  );
}