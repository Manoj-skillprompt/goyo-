import React, { createContext, useContext, useState, useEffect } from 'react';
import { VersionConfig, VERSIONS } from './index';

interface VersionContextValue {
  currentVersion: VersionConfig;
  versionId: string;
  versions: VersionConfig[];
  setVersion: (id: string) => void;
}

const VersionContext = createContext<VersionContextValue | undefined>(undefined);

const STORAGE_KEY = 'goyo_portal_version';

export const VersionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [versionId, setVersionId] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlVersion = params.get('v');
      if (urlVersion && VERSIONS.some(v => v.id === urlVersion)) {
        return urlVersion;
      }
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && VERSIONS.some(v => v.id === stored)) {
        return stored;
      }
    }
    return 'v1';
  });

  const currentVersion = VERSIONS.find(v => v.id === versionId) || VERSIONS[0];

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, versionId);
    } catch {
      // storage unavailable
    }
  }, [versionId]);

  const handleSetVersion = (id: string) => {
    setVersionId(id);
    try {
      const url = new URL(window.location.href);
      url.searchParams.set('v', id);
      window.history.replaceState({}, '', url.toString());
      // scroll to top on version change
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      // ignore
    }
  };

  return (
    <VersionContext.Provider
      value={{
        currentVersion,
        versionId,
        versions: VERSIONS,
        setVersion: handleSetVersion,
      }}
    >
      {children}
    </VersionContext.Provider>
  );
};

export const useVersion = (): VersionContextValue => {
  const context = useContext(VersionContext);
  if (!context) {
    throw new Error('useVersion must be used within a VersionProvider');
  }
  return context;
};
