import React from 'react';
import { SparklesIcon } from '@heroicons/react/24/solid';

interface NavbarProps {
  onOpenLogin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenLogin }) => {
  return (
    <header className="absolute top-0 left-0 right-0 z-40 bg-transparent">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
        <div className="flex items-center justify-between h-20">
          {/* Brand Identity with subtle pill icon */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 text-white shadow-sm group-hover:scale-105 transition-transform">
              <SparklesIcon className="w-4 h-4 fill-white" />
            </div>
            <span className="font-bold text-white text-xl tracking-tight">
              goyo
            </span>
            <span className="ml-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/20 text-white/90 border border-white/25 backdrop-blur-sm">
              V1 Original
            </span>
          </a>

          {/* Right Action Links */}
          <nav className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm font-medium">
            <a href="#partners" className="px-3 py-1.5 text-white/80 hover:text-white transition-colors">
              Partners
            </a>
            <a href="#benefits" className="px-3 py-1.5 text-white/80 hover:text-white transition-colors">
              Benefits
            </a>
            <a
              href="#products"
              className="px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/25 shadow-sm hover:bg-white/30 transition-all"
            >
              Products
            </a>
            <a href="#faq" className="px-3 py-1.5 text-white/80 hover:text-white transition-colors">
              FAQ
            </a>
            <button
              onClick={onOpenLogin}
              className="ml-2 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all text-xs font-semibold cursor-pointer"
            >
              Agent Login
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};
