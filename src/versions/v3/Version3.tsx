import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  SparklesIcon,
  ShieldCheckIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  DocumentTextIcon,
  UserGroupIcon,
  AcademicCapIcon,
  ArrowUpRightIcon
} from '@heroicons/react/24/outline';
import { partnersData } from '../../data/portalData';
import { AgentModal } from '../../components/AgentModal';
import { VersionProps } from '../types';
import { useTheme } from '../../theme/ThemeContext';

export const Version3: React.FC<VersionProps> = ({ onOpenLogin }) => {
  const { currentTheme } = useTheme();
  const [internalLoginOpen, setInternalLoginOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'students' | 'visas' | 'universities'>('students');

  const handleOpenLogin = () => {
    if (onOpenLogin) {
      onOpenLogin();
    } else {
      setInternalLoginOpen(true);
    }
  };

  return (
    <div className="bg-[#FAF9F5] text-stone-900 font-sans min-h-screen selection:bg-stone-900 selection:text-white">
      {/* Editorial Header */}
      <header className="border-b border-stone-200/80 bg-[#FAF9F5]/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-serif text-3xl font-bold tracking-tight text-stone-900">
              goyo.
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-widest bg-stone-200 text-stone-700">
              V3 Editorial
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-wider font-semibold text-stone-600">
            <a href="#manifesto" className="hover:text-stone-900 transition-colors">Manifesto</a>
            <a href="#providers" className="hover:text-stone-900 transition-colors">Signatories</a>
            <a href="#journey" className="hover:text-stone-900 transition-colors">The Journey</a>
            <a href="#studio-guide" className="hover:text-stone-900 transition-colors">Canvas Guide</a>
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={handleOpenLogin}
              className="text-xs uppercase tracking-wider font-semibold px-4 py-2 border border-stone-900 rounded-full hover:bg-stone-900 hover:text-white transition-all cursor-pointer"
            >
              Agent Login
            </button>
          </div>
        </div>
      </header>

      {/* Hero Manifesto */}
      <section id="manifesto" className="py-20 sm:py-28 max-w-7xl mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-baseline">
          <div className="lg:col-span-8">
            <div className="text-xs font-mono uppercase tracking-widest text-stone-500 mb-6 flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full inline-block animate-pulse"
                style={{ backgroundColor: currentTheme.primaryColor }}
              />
              Australian Immigration Condition 8501
            </div>

            <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-normal tracking-tight text-stone-950 leading-[1.02]">
              The direct route to Australian residency &amp; study.
            </h1>

            <p className="mt-8 text-lg sm:text-xl text-stone-600 max-w-2xl leading-relaxed font-light">
              We eliminated the layers of intermediaries between international students, Australian universities, and official government deed insurers. One unified standard. Zero markups.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <button
                onClick={handleOpenLogin}
                className="px-8 py-4 bg-stone-950 text-white rounded-full text-sm font-semibold tracking-wide hover:bg-stone-800 transition-all flex items-center gap-2 cursor-pointer shadow-lg"
              >
                <span>Issue Policy Now</span>
                <ArrowRightIcon className="w-4 h-4" />
              </button>
              <a
                href="#studio-guide"
                className="px-8 py-4 border border-stone-300 rounded-full text-sm font-semibold text-stone-800 hover:border-stone-900 transition-colors"
              >
                Design Version Guide &darr;
              </a>
            </div>
          </div>

          {/* Right Column: Key Stats in Editorial Box */}
          <div className="lg:col-span-4 border-l border-stone-300 pl-8 space-y-8">
            <div>
              <div className="text-4xl font-serif font-bold text-stone-900">100%</div>
              <div className="text-xs font-mono uppercase tracking-wider text-stone-500 mt-1">
                Deed Parity Guarantee
              </div>
              <p className="text-xs text-stone-600 mt-1">
                Direct wholesale rates bound by Australian Government legislation.
              </p>
            </div>

            <div>
              <div className="text-4xl font-serif font-bold text-stone-900">&lt; 3 Sec</div>
              <div className="text-xs font-mono uppercase tracking-wider text-stone-500 mt-1">
                Certificate Generation
              </div>
              <p className="text-xs text-stone-600 mt-1">
                Stamped ImmiAccount ready PDF issued instantly upon confirmation.
              </p>
            </div>

            <div>
              <div className="text-4xl font-serif font-bold text-stone-900">150,000+</div>
              <div className="text-xs font-mono uppercase tracking-wider text-stone-500 mt-1">
                Visas Supported
              </div>
              <p className="text-xs text-stone-600 mt-1">
                Covering student 500, graduate 485, visitor 600 &amp; TSS 482.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Providers Ribbon */}
      <section id="providers" className="border-y border-stone-200 py-10 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="text-xs font-mono uppercase tracking-widest text-stone-400 mb-6 text-center">
            Signatories to the Australian Government OSHC Deed
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-8 items-center justify-items-center opacity-85 hover:opacity-100 transition-opacity">
            {partnersData.map((p) => (
              <img
                key={p.name}
                src={p.logo}
                alt={p.name}
                className="max-h-7 max-w-[120px] object-contain filter grayscale contrast-125 hover:grayscale-0 transition-all"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Journey Tabs */}
      <section id="journey" className="py-20 max-w-7xl mx-auto px-6 sm:px-10">
        <div className="border-b border-stone-300 pb-4 mb-10 flex items-center justify-between">
          <div className="font-serif text-3xl font-bold">The Three Pillars</div>
          <div className="flex gap-2">
            {(['students', 'visas', 'universities'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                  activeTab === tab
                    ? 'bg-stone-900 text-white'
                    : 'bg-stone-200/70 text-stone-700 hover:bg-stone-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="border border-stone-200 bg-white p-8 rounded-2xl space-y-4 shadow-sm">
            <div className="font-mono text-xs text-stone-400">01 / DISCOVERY</div>
            <h3 className="font-serif text-2xl font-bold text-stone-900">
              Instant Insurer Parity
            </h3>
            <p className="text-sm text-stone-600 leading-relaxed">
              Compare policies from Allianz, Bupa, Medibank, and nib without markups. Every quote includes mandatory DHA hospital, doctor, and ambulance inclusions.
            </p>
          </div>

          <div className="border border-stone-200 bg-white p-8 rounded-2xl space-y-4 shadow-sm">
            <div className="font-mono text-xs text-stone-400">02 / VERIFICATION</div>
            <h3 className="font-serif text-2xl font-bold text-stone-900">
              Condition 8501 Match
            </h3>
            <p className="text-sm text-stone-600 leading-relaxed">
              Automated passport &amp; CoE data validation ensures your policy start and expiry dates perfectly align with your Australian visa grant window.
            </p>
          </div>

          <div className="border border-stone-200 bg-white p-8 rounded-2xl space-y-4 shadow-sm">
            <div className="font-mono text-xs text-stone-400">03 / ISSUANCE</div>
            <h3 className="font-serif text-2xl font-bold text-stone-900">
              ImmiAccount Ready
            </h3>
            <p className="text-sm text-stone-600 leading-relaxed">
              Receive your official digital certificate and unique policy number in real-time, ready for immediate lodgement into the Home Affairs portal.
            </p>
          </div>
        </div>
      </section>

      {/* Developer / Design Canvas Guide Box */}
      <section id="studio-guide" className="py-16 bg-stone-900 text-stone-200">
        <div className="max-w-5xl mx-auto px-6 sm:px-10">
          <div className="border border-stone-700 rounded-3xl p-8 sm:p-10 bg-stone-950">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-400 mb-3">
              <SparklesIcon className="w-4 h-4" />
              <span>Multi-Version Design Canvas</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal">
              How to customize &amp; design on each version
            </h2>
            <p className="mt-4 text-sm text-stone-400 leading-relaxed max-w-2xl">
              You can build completely independent layouts for each version! Here is where each version lives in your project:
            </p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
              <div className="bg-stone-900 border border-stone-800 p-4 rounded-xl">
                <div className="text-blue-400 font-bold mb-1">Version 1</div>
                <div className="text-stone-300">src/versions/v1/</div>
                <div className="text-stone-500 text-[11px] mt-2">Original twilight gradient, 3D card spread &amp; sticky footer.</div>
              </div>
              <div className="bg-stone-900 border border-stone-800 p-4 rounded-xl">
                <div className="text-emerald-400 font-bold mb-1">Version 2</div>
                <div className="text-stone-300">src/versions/v2/</div>
                <div className="text-stone-500 text-[11px] mt-2">Modern bento grid, interactive quote engine &amp; reviews.</div>
              </div>
              <div className="bg-stone-900 border border-stone-800 p-4 rounded-xl">
                <div className="text-purple-400 font-bold mb-1">Version 3</div>
                <div className="text-stone-300">src/versions/v3/</div>
                <div className="text-stone-500 text-[11px] mt-2">Editorial canvas ready for your custom styling.</div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400">
              <span>To add Version 4: create <code className="text-stone-200">src/versions/v4/Version4.tsx</code> and add it to <code className="text-stone-200">src/versions/index.ts</code>.</span>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Footer */}
      <footer className="py-12 border-t border-stone-200 text-xs text-stone-500">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="font-serif text-lg text-stone-900">goyo Ecosystem</div>
          <div>All health policies issued by certified signatories to the Australian Government Deed.</div>
          <div>&copy; {new Date().getFullYear()} goyo</div>
        </div>
      </footer>

      {/* Agent Modal */}
      <AgentModal
        isOpen={internalLoginOpen}
        onClose={() => setInternalLoginOpen(false)}
      />
    </div>
  );
};
