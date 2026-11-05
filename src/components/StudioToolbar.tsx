import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVersion } from '../versions/VersionContext';
import { useTheme } from '../theme/ThemeContext';
import { ThemeId } from '../theme/types';

export const StudioToolbar: React.FC = () => {
  const { versionId, versions, setVersion } = useVersion();
  const { themeId, themes, setTheme } = useTheme();

  const [isOtherMenuOpen, setIsOtherMenuOpen] = useState(false);
  const otherMenuRef = useRef<HTMLDivElement>(null);

  const otherVersions = versions.filter((v) => v.id !== 'v1' && v.id !== 'v2');
  const isOtherActive = versionId !== 'v1' && versionId !== 'v2';
  const activeVersion = isOtherActive ? 'other' : versionId;

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!isOtherMenuOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (otherMenuRef.current && !otherMenuRef.current.contains(e.target as Node)) {
        setIsOtherMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOtherMenuOpen]);

  const handleVersionClick = (target: 'v1' | 'v2' | 'other') => {
    if (target === 'v1') {
      setIsOtherMenuOpen(false);
      setVersion('v1');
    } else if (target === 'v2') {
      setIsOtherMenuOpen(false);
      setVersion('v2');
    } else {
      if (otherVersions.length <= 1) {
        setIsOtherMenuOpen(false);
        setVersion(otherVersions[0]?.id || 'v3');
      } else {
        if (!isOtherActive) {
          setVersion(otherVersions[0].id);
        }
        setIsOtherMenuOpen((prev) => !prev);
      }
    }
  };

  const versionOptions: Array<{ id: 'v1' | 'v2' | 'other'; label: string }> = [
    { id: 'v1', label: 'v1' },
    { id: 'v2', label: 'v2' },
    { id: 'other', label: 'other' },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-auto select-none">
      <div className="relative flex items-center gap-2 px-2 py-1.5 rounded-full bg-neutral-950/85 backdrop-blur-xl border border-white/10 shadow-2xl text-white">
        {/* Version Switcher: v1, v2, other */}
        <div className="flex items-center gap-0.5 relative" ref={otherMenuRef}>
          {versionOptions.map((opt) => {
            const isActive = activeVersion === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => handleVersionClick(opt.id)}
                className={`relative px-3 py-1 text-xs font-medium rounded-full transition-colors cursor-pointer ${
                  isActive ? 'text-neutral-950 font-semibold' : 'text-neutral-400 hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeVersionPill"
                    className="absolute inset-0 bg-white rounded-full -z-0"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{opt.label}</span>
              </button>
            );
          })}

          {/* Clean dropdown for other versions if > 1 */}
          <AnimatePresence>
            {isOtherMenuOpen && otherVersions.length > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 6, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute bottom-full mb-2 right-0 bg-neutral-950/95 backdrop-blur-xl border border-white/10 rounded-xl p-1 shadow-2xl flex flex-col gap-0.5 min-w-[80px]"
              >
                {otherVersions.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => {
                      setVersion(v.id);
                      setIsOtherMenuOpen(false);
                    }}
                    className={`px-2.5 py-1 text-xs rounded-lg text-left transition-colors cursor-pointer ${
                      versionId === v.id
                        ? 'bg-white/15 text-white font-medium'
                        : 'text-neutral-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {v.id}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Minimal Hairline Divider */}
        <div className="w-px h-3.5 bg-white/15" />

        {/* Color Swatches Only (No Theme Names) */}
        <div className="flex items-center gap-1.5 px-1">
          {themes.map((th) => {
            const isActive = th.id === themeId;
            return (
              <button
                key={th.id}
                onClick={() => setTheme(th.id as ThemeId)}
                title={th.name}
                aria-label={th.name}
                className={`w-3.5 h-3.5 rounded-full transition-all duration-150 cursor-pointer ${
                  isActive
                    ? 'ring-2 ring-white ring-offset-2 ring-offset-neutral-950 scale-110'
                    : 'opacity-50 hover:opacity-100 hover:scale-105'
                }`}
                style={{ backgroundColor: th.primaryColor }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
