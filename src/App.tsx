import React, { useState } from 'react';
import { ThemeProvider, useTheme } from './theme/ThemeContext';
import { VersionProvider, useVersion } from './versions/VersionContext';
import { StudioToolbar } from './components/StudioToolbar';
import { AgentModal } from './components/AgentModal';

const AppContent: React.FC = () => {
  const { currentVersion } = useVersion();
  const { currentTheme } = useTheme();
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const VersionComponent = currentVersion.component;

  return (
    <div className={`theme-${currentTheme.id} min-h-screen relative`}>
      {/* Active Design Version */}
      <VersionComponent onOpenLogin={() => setIsLoginOpen(true)} />

      {/* Floating Design Studio Switcher Toolbar (Switch Versions & 4 Themes) */}
      <StudioToolbar />

      {/* Global Agent Login Modal */}
      <AgentModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <VersionProvider>
        <AppContent />
      </VersionProvider>
    </ThemeProvider>
  );
};

export default App;
