import React, { createContext, useContext, useState, useEffect } from 'react';

// ─── 5 Bespoke Theme Definitions with Complete Mood Collaborations ───────────
export const THEMES = {
  'soft-sophisticated': {
    id: 'soft-sophisticated',
    num: 1,
    name: 'Soft & Sophisticated',
    subtitle: 'Rose · Mauve',
    description: 'Elegant, intimate, premium, and comforting.',
    emoji: '🌸',
    lotusColors: {
      primary: '#B76E79',
      secondary: '#D9A6B1',
      dark: '#6E5365',
      deep: '#34343A',
      light: '#F7F3EF',
    },
    swatches: ['#F7F3EF', '#D9A6B1', '#B76E79', '#6E5365', '#34343A'],
    lightest: '#F7F3EF',
    light: '#D9A6B1',
    mid: '#B76E79',
    dark: '#6E5365',
    darkest: '#34343A',
    backdropImage: '/assets/sanctuary-soft-sophisticated.jpg',
    // Full Mood Atmosphere for Background
    mood: {
      title: 'Rose-Quartz Twilight Sanctuary',
      backdropFilter: 'saturate(1.25) contrast(1.08) brightness(0.96)',
      ambientGradient: 'radial-gradient(ellipse at 75% 25%, rgba(217, 166, 177, 0.45) 0%, rgba(183, 110, 121, 0.3) 45%, rgba(42, 25, 45, 0.7) 100%)',
      overlayTint: 'rgba(247, 243, 239, 0.18)',
      auraColor: '#FF75B5',
    },
    vars: {
      '--sakhi-bg': '#F7F3EF',
      '--sakhi-bg-subtle': '#F0E8E6',
      '--sakhi-surface': 'rgba(255, 255, 255, 0.35)',
      '--sakhi-surface-muted': 'rgba(247, 240, 238, 0.4)',
      '--sakhi-border': 'rgba(217, 166, 177, 0.55)',
      '--sakhi-border-strong': '#B76E79',
      '--sakhi-primary': '#B76E79',
      '--sakhi-primary-light': '#D9A6B1',
      '--sakhi-primary-dark': '#6E5365',
      '--sakhi-primary-bg': 'rgba(245, 224, 228, 0.65)',
      '--sakhi-accent': '#B76E79',
      '--sakhi-accent-light': '#D9A6B1',
      '--sakhi-text': '#1F1218',
      '--sakhi-text-muted': '#6E5365',
      '--sakhi-text-subtle': '#B76E79',
      '--sakhi-gradient-from': '#FF75B5',
      '--sakhi-gradient-to': '#8E24AA',
      '--sakhi-shadow': '183, 110, 121',
      '--sakhi-nav-active': '#B76E79',
      '--sakhi-nav-active-text': '#FFFFFF',
      '--sakhi-scrollbar': '#D9A6B1',
      '--sakhi-scrollbar-track': '#F5E0E4',
      '--sakhi-badge-bg': '#D9A6B1',
      '--sakhi-badge-text': '#34343A',
      '--sakhi-emergency': '#C0392B',
      '--sakhi-emergency-bg': '#FEE2E2',
      '--sakhi-theme-overlay': 'rgba(247, 243, 239, 0.25)',
      '--sakhi-glass-bg': 'rgba(255, 255, 255, 0.32)',
      '--sakhi-glass-border': 'rgba(217, 166, 177, 0.55)',
    },
  },

  'warm-earthy': {
    id: 'warm-earthy',
    num: 2,
    name: 'Warm & Earthy',
    subtitle: 'Peach · Terracotta',
    description: 'Human, friendly, grounded, and approachable.',
    emoji: '🍊',
    lotusColors: {
      primary: '#D99070',
      secondary: '#F2D5C0',
      dark: '#9E5B47',
      deep: '#43362F',
      light: '#FFF8F0',
    },
    swatches: ['#FFF8F0', '#F2D5C0', '#D99070', '#9E5B47', '#43362F'],
    lightest: '#FFF8F0',
    light: '#F2D5C0',
    mid: '#D99070',
    dark: '#9E5B47',
    darkest: '#43362F',
    backdropImage: '/assets/sanctuary-warm-earthy.jpg',
    mood: {
      title: 'Golden Sunset Canyon Sanctuary',
      backdropFilter: 'saturate(1.2) contrast(1.08) brightness(1.02)',
      ambientGradient: 'radial-gradient(ellipse at 75% 25%, rgba(242, 213, 192, 0.42) 0%, rgba(217, 144, 112, 0.3) 45%, rgba(67, 54, 47, 0.65) 100%)',
      overlayTint: 'rgba(255, 248, 240, 0.16)',
      auraColor: '#D99070',
    },
    vars: {
      '--sakhi-bg': '#FFF8F0',
      '--sakhi-bg-subtle': '#FCEEE2',
      '--sakhi-surface': 'rgba(255, 255, 255, 0.35)',
      '--sakhi-surface-muted': 'rgba(253, 243, 234, 0.4)',
      '--sakhi-border': 'rgba(242, 213, 192, 0.55)',
      '--sakhi-border-strong': '#D99070',
      '--sakhi-primary': '#D99070',
      '--sakhi-primary-light': '#F2D5C0',
      '--sakhi-primary-dark': '#9E5B47',
      '--sakhi-primary-bg': 'rgba(250, 229, 214, 0.65)',
      '--sakhi-accent': '#D99070',
      '--sakhi-accent-light': '#F2D5C0',
      '--sakhi-text': '#2A180E',
      '--sakhi-text-muted': '#9E5B47',
      '--sakhi-text-subtle': '#D99070',
      '--sakhi-gradient-from': '#F2994A',
      '--sakhi-gradient-to': '#C0392B',
      '--sakhi-shadow': '217, 144, 112',
      '--sakhi-nav-active': '#D99070',
      '--sakhi-nav-active-text': '#FFFFFF',
      '--sakhi-scrollbar': '#D99070',
      '--sakhi-scrollbar-track': '#FCEEE2',
      '--sakhi-badge-bg': '#F2D5C0',
      '--sakhi-badge-text': '#43362F',
      '--sakhi-emergency': '#C0392B',
      '--sakhi-emergency-bg': '#FEE2E2',
      '--sakhi-theme-overlay': 'rgba(255, 248, 240, 0.25)',
      '--sakhi-glass-bg': 'rgba(255, 255, 255, 0.32)',
      '--sakhi-glass-border': 'rgba(242, 213, 192, 0.55)',
    },
  },

  'calm-natural': {
    id: 'calm-natural',
    num: 3,
    name: 'Calm & Natural',
    subtitle: 'Sage · Forest',
    description: 'Peaceful, health-focused, fresh, and reassuring.',
    emoji: '🌿',
    lotusColors: {
      primary: '#89A98F',
      secondary: '#C8D9C5',
      dark: '#4F7667',
      deep: '#293E36',
      light: '#F5F7F2',
    },
    swatches: ['#F5F7F2', '#C8D9C5', '#89A98F', '#4F7667', '#293E36'],
    lightest: '#F5F7F2',
    light: '#C8D9C5',
    mid: '#89A98F',
    dark: '#4F7667',
    darkest: '#293E36',
    backdropImage: '/assets/sanctuary-calm-natural.jpg',
    mood: {
      title: 'Verdant Forest Grove Sanctuary',
      backdropFilter: 'saturate(1.22) contrast(1.08) brightness(0.98)',
      ambientGradient: 'radial-gradient(ellipse at 75% 25%, rgba(200, 217, 197, 0.45) 0%, rgba(79, 118, 103, 0.32) 45%, rgba(25, 45, 36, 0.68) 100%)',
      overlayTint: 'rgba(245, 247, 242, 0.16)',
      auraColor: '#89A98F',
    },
    vars: {
      '--sakhi-bg': '#F5F7F2',
      '--sakhi-bg-subtle': '#EAF0E8',
      '--sakhi-surface': 'rgba(255, 255, 255, 0.35)',
      '--sakhi-surface-muted': 'rgba(237, 243, 235, 0.4)',
      '--sakhi-border': 'rgba(200, 217, 197, 0.55)',
      '--sakhi-border-strong': '#89A98F',
      '--sakhi-primary': '#4F7667',
      '--sakhi-primary-light': '#89A98F',
      '--sakhi-primary-dark': '#293E36',
      '--sakhi-primary-bg': 'rgba(229, 237, 228, 0.65)',
      '--sakhi-accent': '#4F7667',
      '--sakhi-accent-light': '#C8D9C5',
      '--sakhi-text': '#10221A',
      '--sakhi-text-muted': '#4F7667',
      '--sakhi-text-subtle': '#89A98F',
      '--sakhi-gradient-from': '#56ab2f',
      '--sakhi-gradient-to': '#08633c',
      '--sakhi-shadow': '79, 118, 103',
      '--sakhi-nav-active': '#4F7667',
      '--sakhi-nav-active-text': '#FFFFFF',
      '--sakhi-scrollbar': '#89A98F',
      '--sakhi-scrollbar-track': '#EAF0E8',
      '--sakhi-badge-bg': '#C8D9C5',
      '--sakhi-badge-text': '#293E36',
      '--sakhi-emergency': '#D94F4F',
      '--sakhi-emergency-bg': '#FEE2E2',
      '--sakhi-theme-overlay': 'rgba(245, 247, 242, 0.25)',
      '--sakhi-glass-bg': 'rgba(255, 255, 255, 0.32)',
      '--sakhi-glass-border': 'rgba(200, 217, 197, 0.55)',
    },
  },

  'modern-dreamy': {
    id: 'modern-dreamy',
    num: 4,
    name: 'Modern & Dreamy',
    subtitle: 'Lavender · Violet',
    description: 'Distinctive, youthful, tech-forward, and self-care oriented.',
    emoji: '💜',
    lotusColors: {
      primary: '#AC8FD1',
      secondary: '#D9CBF0',
      dark: '#74569A',
      deep: '#382D4A',
      light: '#F8F5FF',
    },
    swatches: ['#F8F5FF', '#D9CBF0', '#AC8FD1', '#74569A', '#382D4A'],
    lightest: '#F8F5FF',
    light: '#D9CBF0',
    mid: '#AC8FD1',
    dark: '#74569A',
    darkest: '#382D4A',
    backdropImage: '/assets/sanctuary-modern-dreamy.jpg',
    mood: {
      title: 'Violet Aurora Nebula Sanctuary',
      backdropFilter: 'saturate(1.28) contrast(1.1) brightness(0.96)',
      ambientGradient: 'radial-gradient(ellipse at 75% 25%, rgba(217, 203, 240, 0.42) 0%, rgba(116, 86, 154, 0.32) 45%, rgba(35, 20, 55, 0.72) 100%)',
      overlayTint: 'rgba(248, 245, 255, 0.16)',
      auraColor: '#AC8FD1',
    },
    vars: {
      '--sakhi-bg': '#F8F5FF',
      '--sakhi-bg-subtle': '#EFE9FC',
      '--sakhi-surface': 'rgba(255, 255, 255, 0.35)',
      '--sakhi-surface-muted': 'rgba(243, 239, 254, 0.4)',
      '--sakhi-border': 'rgba(217, 203, 240, 0.55)',
      '--sakhi-border-strong': '#AC8FD1',
      '--sakhi-primary': '#74569A',
      '--sakhi-primary-light': '#AC8FD1',
      '--sakhi-primary-dark': '#382D4A',
      '--sakhi-primary-bg': 'rgba(232, 223, 246, 0.65)',
      '--sakhi-accent': '#74569A',
      '--sakhi-accent-light': '#D9CBF0',
      '--sakhi-text': '#170E20',
      '--sakhi-text-muted': '#74569A',
      '--sakhi-text-subtle': '#AC8FD1',
      '--sakhi-gradient-from': '#8E2DE2',
      '--sakhi-gradient-to': '#4A00E0',
      '--sakhi-shadow': '116, 86, 154',
      '--sakhi-nav-active': '#74569A',
      '--sakhi-nav-active-text': '#FFFFFF',
      '--sakhi-scrollbar': '#AC8FD1',
      '--sakhi-scrollbar-track': '#EFE9FC',
      '--sakhi-badge-bg': '#D9CBF0',
      '--sakhi-badge-text': '#382D4A',
      '--sakhi-emergency': '#C0392B',
      '--sakhi-emergency-bg': '#FEE2E2',
      '--sakhi-theme-overlay': 'rgba(248, 245, 255, 0.25)',
      '--sakhi-glass-bg': 'rgba(255, 255, 255, 0.32)',
      '--sakhi-glass-border': 'rgba(217, 203, 240, 0.55)',
    },
  },

  'bold-sunlit': {
    id: 'bold-sunlit',
    num: 5,
    name: 'Bold & Sunlit',
    subtitle: 'Butter · Gold',
    description: 'Optimistic, confident, energetic, and independent.',
    emoji: '✨',
    lotusColors: {
      primary: '#D9B95D',
      secondary: '#F0DFA4',
      dark: '#A47C36',
      deep: '#493B27',
      light: '#FFFDF7',
    },
    swatches: ['#FFFDF7', '#F0DFA4', '#D9B95D', '#A47C36', '#493B27'],
    lightest: '#FFFDF7',
    light: '#F0DFA4',
    mid: '#D9B95D',
    dark: '#A47C36',
    darkest: '#493B27',
    backdropImage: '/assets/sanctuary-bold-sunlit.jpg',
    mood: {
      title: 'Solar Dawn Sunrise Sanctuary',
      backdropFilter: 'saturate(1.25) contrast(1.1) brightness(1.05)',
      ambientGradient: 'radial-gradient(ellipse at 75% 25%, rgba(240, 223, 164, 0.45) 0%, rgba(217, 185, 93, 0.32) 45%, rgba(65, 50, 25, 0.68) 100%)',
      overlayTint: 'rgba(255, 253, 247, 0.16)',
      auraColor: '#D9B95D',
    },
    vars: {
      '--sakhi-bg': '#FFFDF7',
      '--sakhi-bg-subtle': '#FDF6DC',
      '--sakhi-surface': 'rgba(255, 255, 255, 0.35)',
      '--sakhi-surface-muted': 'rgba(254, 250, 236, 0.4)',
      '--sakhi-border': 'rgba(240, 223, 164, 0.55)',
      '--sakhi-border-strong': '#D9B95D',
      '--sakhi-primary': '#A47C36',
      '--sakhi-primary-light': '#D9B95D',
      '--sakhi-primary-dark': '#493B27',
      '--sakhi-primary-bg': 'rgba(250, 240, 200, 0.65)',
      '--sakhi-accent': '#A47C36',
      '--sakhi-accent-light': '#F0DFA4',
      '--sakhi-text': '#241908',
      '--sakhi-text-muted': '#A47C36',
      '--sakhi-text-subtle': '#D9B95D',
      '--sakhi-gradient-from': '#F7971E',
      '--sakhi-gradient-to': '#FFD200',
      '--sakhi-shadow': '164, 124, 54',
      '--sakhi-nav-active': '#A47C36',
      '--sakhi-nav-active-text': '#FFFFFF',
      '--sakhi-scrollbar': '#D9B95D',
      '--sakhi-scrollbar-track': '#FDF6DC',
      '--sakhi-badge-bg': '#F0DFA4',
      '--sakhi-badge-text': '#493B27',
      '--sakhi-emergency': '#C0392B',
      '--sakhi-emergency-bg': '#FEE2E2',
      '--sakhi-theme-overlay': 'rgba(255, 253, 247, 0.25)',
      '--sakhi-glass-bg': 'rgba(255, 255, 255, 0.32)',
      '--sakhi-glass-border': 'rgba(240, 223, 164, 0.55)',
    },
  },
};

export const THEME_ORDER = [
  'soft-sophisticated',
  'warm-earthy',
  'calm-natural',
  'modern-dreamy',
  'bold-sunlit',
];

const ThemeContext = createContext(null);

function applyTheme(themeId) {
  const theme = THEMES[themeId] || THEMES['soft-sophisticated'];
  const root = document.documentElement;
  Object.entries(theme.vars).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
  root.style.setProperty('--sakhi-backdrop-filter', theme.mood.backdropFilter);
  root.style.setProperty('--sakhi-ambient-gradient', theme.mood.ambientGradient);
  root.style.setProperty('--sakhi-overlay-tint', theme.mood.overlayTint);
  root.style.setProperty('--sakhi-aura-color', theme.mood.auraColor);
  root.style.setProperty('--sakhi-backdrop-image', `url(${theme.backdropImage})`);
  root.style.setProperty('--scrollbar-thumb', theme.vars['--sakhi-scrollbar']);
  root.style.setProperty('--scrollbar-track', theme.vars['--sakhi-scrollbar-track']);
}

export function ThemeProvider({ children }) {
  const [themeId, setThemeId] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('sakhi_theme') || 'soft-sophisticated';
    }
    return 'soft-sophisticated';
  });

  useEffect(() => {
    applyTheme(themeId);
    localStorage.setItem('sakhi_theme', themeId);
  }, [themeId]);

  useEffect(() => {
    applyTheme(themeId);
  }, []);

  const theme = THEMES[themeId] || THEMES['soft-sophisticated'];

  return (
    <ThemeContext.Provider value={{ themeId, setThemeId, theme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider');
  return ctx;
}
