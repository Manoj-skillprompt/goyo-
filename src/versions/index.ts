import { VersionConfig } from './types';
import { Version1 } from './v1/Version1';
import { Version2 } from './v2/Version2';
import { Version3 } from './v3/Version3';

export const VERSIONS: VersionConfig[] = [
  {
    id: 'v1',
    label: 'V1',
    title: 'Version 1',
    subtitle: 'Twilight Curtain & 3D Deck',
    badge: 'Original',
    component: Version1
  },
  {
    id: 'v2',
    label: 'V2',
    title: 'Version 2',
    subtitle: 'Modern Bento & Instant Quoter',
    badge: 'Bento',
    component: Version2
  },
  {
    id: 'v3',
    label: 'V3',
    title: 'Version 3',
    subtitle: 'Editorial Studio Canvas',
    badge: 'Canvas',
    component: Version3
  }
];

export * from './types';
