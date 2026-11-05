import React from 'react';

export interface VersionProps {
  onOpenLogin: () => void;
}

export interface VersionConfig {
  id: string; // 'v1', 'v2', 'v3', etc.
  label: string; // 'V1', 'V2', 'V3'
  title: string;
  subtitle: string;
  badge?: string;
  component: React.ComponentType<VersionProps>;
}
