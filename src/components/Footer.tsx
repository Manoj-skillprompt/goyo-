import React from 'react';
import { SparklesIcon } from '@heroicons/react/24/solid';

interface FooterProps {
  onOpenLogin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLogin }) => {
  return (
    <footer className="site-footer-sticky bg-black text-neutral-400 py-16 text-xs border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-neutral-900">
          {/* Branding & Socials */}
          <div className="lg:col-span-5 space-y-4">
            {/* Brand Logo & Name */}
            <a href="#" className="inline-flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/20 text-white shadow-sm group-hover:scale-105 group-hover:border-white/40 transition-all">
                <SparklesIcon className="w-4 h-4 fill-white" />
              </div>
              <span className="font-bold text-white text-lg tracking-tight">goyo</span>
            </a>

            <p className="text-neutral-400 leading-relaxed max-w-sm text-xs">
              Australia&rsquo;s unified ecosystem integrating student health cover, visitor medical insurance, and university admissions.
            </p>

            {/* Ecosystem Sub-Brand Logos (Dark Mode) */}
            <div className="flex items-center gap-3 pt-1">
              <img
                src="/youroshc_dark_mode.png"
                alt="yourOSHC"
                className="h-4 sm:h-5 w-auto object-contain opacity-75 hover:opacity-100 transition-opacity"
              />
              <span className="text-neutral-700">&bull;</span>
              <img
                src="/yourovhc_dark_mode.png"
                alt="yourOVHC"
                className="h-4 sm:h-5 w-auto object-contain opacity-75 hover:opacity-100 transition-opacity"
              />
              <span className="text-neutral-700">&bull;</span>
              <img
                src="/youradmission_dark_mode.png"
                alt="yourADMISSION"
                className="h-4 sm:h-5 w-auto object-contain opacity-75 hover:opacity-100 transition-opacity"
              />
            </div>
          </div>

          {/* Products Column */}
          <div className="lg:col-span-2">
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px] mb-4">
              Products
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#products" className="hover:text-white transition-colors">
                  YourOSHC (Student 500)
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-white transition-colors">
                  YourOVHC (Visitor 600)
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-white transition-colors">
                  YourOVHC (Graduate 485)
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-white transition-colors">
                  YourADMISSION
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-white transition-colors">
                  OrbitProtect (NZ)
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-2">
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px] mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button
                  onClick={onOpenLogin}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Agent Portal Login
                </button>
              </li>
              <li>
                <a href="#products" className="hover:text-white transition-colors">
                  Explore Products
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  FAQ &amp; Documentation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Us Column */}
          <div className="lg:col-span-3">
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px] mb-4">
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <span
                  className="w-5 h-5 rounded bg-neutral-900 border border-neutral-800 text-[10px] font-mono font-medium text-neutral-400 flex items-center justify-center shrink-0 mt-0.5"
                  title="Address"
                >
                  a
                </span>
                <span className="text-neutral-300 leading-relaxed">
                  Suite 109, Level 1, 83 York Street, Sydney NSW 2000
                </span>
              </li>
              <li>
                <a
                  href="tel:+61478818283"
                  className="flex items-center gap-2.5 text-neutral-300 hover:text-white transition-colors group"
                >
                  <span
                    className="w-5 h-5 rounded bg-neutral-900 border border-neutral-800 text-[10px] font-mono font-medium text-neutral-400 group-hover:text-white group-hover:border-neutral-700 flex items-center justify-center shrink-0 transition-colors"
                    title="Mobile"
                  >
                    m
                  </span>
                  <span className="font-mono text-[13px] tracking-tight">+61 478 81 82 83</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+61275005800"
                  className="flex items-center gap-2.5 text-neutral-300 hover:text-white transition-colors group"
                >
                  <span
                    className="w-5 h-5 rounded bg-neutral-900 border border-neutral-800 text-[10px] font-mono font-medium text-neutral-400 group-hover:text-white group-hover:border-neutral-700 flex items-center justify-center shrink-0 transition-colors"
                    title="Telephone"
                  >
                    t
                  </span>
                  <span className="font-mono text-[13px] tracking-tight">+61 2 7500 5800</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:support@youroshc.com.au"
                  className="flex items-center gap-2.5 text-neutral-300 hover:text-white transition-colors group"
                >
                  <span
                    className="w-5 h-5 rounded bg-neutral-900 border border-neutral-800 text-[10px] font-mono font-medium text-neutral-400 group-hover:text-white group-hover:border-neutral-700 flex items-center justify-center shrink-0 transition-colors"
                    title="Email"
                  >
                    e
                  </span>
                  <span className="underline underline-offset-4 decoration-neutral-700 hover:decoration-white transition-colors">
                    support@youroshc.com.au
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Left: Copyright, Middle: Social Media Links, Right: Terms & Privacy */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-neutral-400 gap-5 text-xs border-t border-neutral-900/60 mt-4">
          {/* Left: Copyright */}
          <div className="text-center md:text-left order-3 md:order-1">
            <p>&copy; 2026 goyo. All rights reserved.</p>
          </div>

          {/* Middle: Social Media Links */}
          <div className="flex items-center gap-2.5 order-1 md:order-2">
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-neutral-700 hover:bg-neutral-800 hover:scale-120 active:scale-95 transition-all duration-200 origin-center"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
            {/* Facebook */}
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-neutral-700 hover:bg-neutral-800 hover:scale-120 active:scale-95 transition-all duration-200 origin-center"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            {/* Instagram */}
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-neutral-700 hover:bg-neutral-800 hover:scale-120 active:scale-95 transition-all duration-200 origin-center"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            {/* X (Twitter) */}
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (formerly Twitter)"
              className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-neutral-700 hover:bg-neutral-800 hover:scale-120 active:scale-95 transition-all duration-200 origin-center"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            {/* YouTube */}
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-neutral-700 hover:bg-neutral-800 hover:scale-120 active:scale-95 transition-all duration-200 origin-center"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
          </div>

          {/* Right: Terms of Service & Privacy Policy */}
          <div className="flex items-center gap-4 order-2 md:order-3 text-neutral-400">
            <a href="#terms" className="hover:text-white transition-colors">
              Terms of Service
            </a>
            <span className="text-neutral-700">&bull;</span>
            <a href="#privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
