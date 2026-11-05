export type ThemeId = 'sapphire' | 'emerald' | 'sunset' | 'violet';

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  tagline: string;
  primaryColor: string;
  accentColor: string;
  swatchGradient: string;
  dotColor: string;
  ringColor: string;
  gradientCss: string;
  overlayFrom: string;
  overlayMid: string;
  overlayTo: string;
  badgeBg: string;
  badgeText: string;
  buttonClass: string;
}

export const THEMES: ThemeConfig[] = [
  {
    id: 'sapphire',
    name: 'Ocean Sapphire',
    tagline: 'Classic Twilight Blue & Indigo',
    primaryColor: '#2563EB',
    accentColor: '#0A84FF',
    swatchGradient: 'linear-gradient(135deg, #2563EB 0%, #4F46E5 50%, #06B6D4 100%)',
    dotColor: '#2563EB',
    ringColor: 'rgba(37, 99, 235, 0.45)',
    gradientCss: 'linear-gradient(180deg, #2A56DE 0%, #4972EE 20%, #798FEF 40%, #AE9DE5 60%, #E1A4D0 75%, #F8B0B4 88%, #FBD3B8 100%)',
    overlayFrom: 'rgba(26, 62, 168, 0.75)',
    overlayMid: 'rgba(37, 82, 206, 0.40)',
    overlayTo: 'rgba(255, 255, 255, 0.45)',
    badgeBg: 'bg-blue-500/10 border-blue-500/30',
    badgeText: 'text-blue-600',
    buttonClass: 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/25',
  },
  {
    id: 'emerald',
    name: 'Emerald Mint',
    tagline: 'Vibrant Forest Teal & Mint',
    primaryColor: '#059669',
    accentColor: '#10B981',
    swatchGradient: 'linear-gradient(135deg, #059669 0%, #10B981 50%, #14B8A6 100%)',
    dotColor: '#10B981',
    ringColor: 'rgba(16, 185, 129, 0.45)',
    gradientCss: 'linear-gradient(180deg, #064E3B 0%, #047857 20%, #059669 40%, #10B981 60%, #34D399 75%, #6EE7B7 88%, #A7F3D0 100%)',
    overlayFrom: 'rgba(6, 78, 59, 0.82)',
    overlayMid: 'rgba(4, 120, 87, 0.45)',
    overlayTo: 'rgba(255, 255, 255, 0.45)',
    badgeBg: 'bg-emerald-500/10 border-emerald-500/30',
    badgeText: 'text-emerald-600',
    buttonClass: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-500/25',
  },
  {
    id: 'sunset',
    name: 'Sunset Crimson',
    tagline: 'Warm Dusk Rose & Golden Coral',
    primaryColor: '#E11D48',
    accentColor: '#F97316',
    swatchGradient: 'linear-gradient(135deg, #E11D48 0%, #F43F5E 50%, #FB923C 100%)',
    dotColor: '#F43F5E',
    ringColor: 'rgba(225, 29, 72, 0.45)',
    gradientCss: 'linear-gradient(180deg, #881337 0%, #9F1239 20%, #BE123C 40%, #E11D48 60%, #FB7185 75%, #F43F5E 88%, #FDBA74 100%)',
    overlayFrom: 'rgba(136, 19, 55, 0.85)',
    overlayMid: 'rgba(190, 18, 60, 0.45)',
    overlayTo: 'rgba(255, 255, 255, 0.45)',
    badgeBg: 'bg-rose-500/10 border-rose-500/30',
    badgeText: 'text-rose-600',
    buttonClass: 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-500/25',
  },
  {
    id: 'violet',
    name: 'Cyber Violet',
    tagline: 'Obsidian Midnight & Electric Neon',
    primaryColor: '#7C3AED',
    accentColor: '#8B5CF6',
    swatchGradient: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #D946EF 100%)',
    dotColor: '#8B5CF6',
    ringColor: 'rgba(139, 92, 246, 0.45)',
    gradientCss: 'linear-gradient(180deg, #1E1B4B 0%, #312E81 20%, #4338CA 40%, #6366F1 60%, #8B5CF6 75%, #C084FC 88%, #DDD6FE 100%)',
    overlayFrom: 'rgba(30, 27, 75, 0.88)',
    overlayMid: 'rgba(67, 56, 202, 0.48)',
    overlayTo: 'rgba(255, 255, 255, 0.45)',
    badgeBg: 'bg-purple-500/10 border-purple-500/30',
    badgeText: 'text-purple-600',
    buttonClass: 'bg-purple-600 hover:bg-purple-700 text-white shadow-purple-500/25',
  }
];
