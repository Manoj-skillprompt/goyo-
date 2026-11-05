import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeConfig, ThemeId, THEMES } from './types';

interface ThemeContextValue {
  currentTheme: ThemeConfig;
  themeId: ThemeId;
  themes: ThemeConfig[];
  setTheme: (id: ThemeId) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const STORAGE_KEY = 'goyo_portal_theme';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeId, setThemeId] = useState<ThemeId>(() => {
    // Check URL query param first e.g. ?theme=emerald
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlTheme = params.get('theme') as ThemeId;
      if (urlTheme && THEMES.some(t => t.id === urlTheme)) {
        return urlTheme;
      }
      const stored = localStorage.getItem(STORAGE_KEY) as ThemeId;
      if (stored && THEMES.some(t => t.id === stored)) {
        return stored;
      }
    }
    return 'sapphire';
  });

  const currentTheme = THEMES.find(t => t.id === themeId) || THEMES[0];

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', themeId);
    root.style.setProperty('--color-primary', currentTheme.primaryColor);
    root.style.setProperty('--color-accent', currentTheme.accentColor);
    root.style.setProperty('--hero-gradient', currentTheme.gradientCss);
    root.style.setProperty('--hero-overlay-from', currentTheme.overlayFrom);
    root.style.setProperty('--hero-overlay-mid', currentTheme.overlayMid);
    root.style.setProperty('--hero-overlay-to', currentTheme.overlayTo);
    root.style.setProperty('--theme-ring', currentTheme.ringColor);

    try {
      localStorage.setItem(STORAGE_KEY, themeId);
    } catch {
      // storage unavailable
    }
  }, [themeId, currentTheme]);

  const handleSetTheme = (id: ThemeId) => {
    setThemeId(id);
    // Optionally update URL search param without refresh
    try {
      const url = new URL(window.location.href);
      url.searchParams.set('theme', id);
      window.history.replaceState({}, '', url.toString());
    } catch {
      // ignore
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        themeId,
        themes: THEMES,
        setTheme: handleSetTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
