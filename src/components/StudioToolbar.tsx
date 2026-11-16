import React from 'react';
import { motion } from 'framer-motion';
import { useVersion } from '../versions/VersionContext';

// Floating version switcher (v1 / v2 / v3): a vertical pill pinned to the bottom-left corner.
export const StudioToolbar: React.FC = () => {
  const { versionId, versions, setVersion } = useVersion();

  return (
    <div className="fixed bottom-4 left-2 z-50 pointer-events-auto select-none sm:bottom-6 sm:left-3">
      <div className="flex flex-col items-center gap-0.5 px-1 py-1.5 rounded-full bg-neutral-950/85 backdrop-blur-xl border border-white/10 shadow-2xl text-white">
        {versions.map((v) => {
          const isActive = versionId === v.id;
          return (
            <button
              key={v.id}
              onClick={() => setVersion(v.id)}
              aria-pressed={isActive}
              className={`relative w-9 py-1.5 text-xs font-medium rounded-full transition-colors cursor-pointer ${
                isActive ? 'text-neutral-950 font-semibold' : 'text-neutral-400 hover:text-white'
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="activeVersionPill"
                  className="absolute inset-0 bg-white rounded-full"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{v.id}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
